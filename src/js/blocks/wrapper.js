import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, URLInput } from '@wordpress/block-editor';
import { Button, TextControl, CheckboxControl, TextareaControl, SelectControl } from '@wordpress/components';
import classNames from 'classnames';
import { TAG_OPTIONS } from './tags';

const parseCustomDataAttrs = (input) => {
    const attrs = {};
    const regex = /(data-[\w-]+)=\"([^\"]*)\"/g;
    let match;

    while ((match = regex.exec(input)) !== null) {
        attrs[match[1]] = match[2];
    }

    return attrs;
};

registerBlockType('portart/wrapper', {
    title: 'wrapper',
    icon: 'smiley',
    category: 'layout',
    attributes: {
        wrapToggle: { type: 'boolean', default: false },
        addClassName: { type: 'string', default: '' },
        addId: { type: 'string', default: '' },
        customDataAttrs: { type: 'string', default: '' },
        linkUrl: { type: 'string', default: '' },
        isChecked: { type: 'boolean', default: false },
        display: { type: 'string', default: '' },
        tagName: { type: 'string', default: 'div' }
    },

    edit: ({ attributes, setAttributes }) => {
        const { addClassName, addId, customDataAttrs, linkUrl, wrapToggle, isChecked, display, tagName } = attributes;

        const toggleHandler = () => setAttributes({ wrapToggle: !wrapToggle });

        return (
            <div className='b-wrapper__box'>
                <div className='b-wrapper__box__tool'>
                    <span className='c-text__med b-wrapper__class'>Class名: {addClassName}</span>
                    <Button
                        isSecondary
                        onClick={() => {
                            setAttributes({ display: display === '' ? 'pc' : display === 'pc' ? 'sp' : '' });
                        }}
                    >
                        {display ? `${display}のみ表示` : '両方表示'}
                    </Button>
                    <Button isSecondary onClick={toggleHandler}>
                        {wrapToggle ? '開く' : '折りたたむ'}
                    </Button>
                </div>
                <InspectorControls>
                    <SelectControl
                        label="ラッパータグを選択"
                        value={tagName}
                        options={TAG_OPTIONS}
                        onChange={(newTagName) => setAttributes({ tagName: newTagName })}
                    />
                    <TextareaControl
                        label="追加class"
                        value={addClassName}
                        onChange={(value) => setAttributes({ addClassName: value })}
                    />
                    <TextControl
                        label="追加Id"
                        value={addId}
                        onChange={(value) => setAttributes({ addId: value })}
                    />
                    <TextareaControl
                        label="追加のdata属性（複数可）"
                        value={customDataAttrs}
                        onChange={(value) => setAttributes({ customDataAttrs: value })}
                    />
                    <URLInput
                        label="リンクURL"
                        value={linkUrl}
                        onChange={(value) => setAttributes({ linkUrl: value })}
                    />
                    {linkUrl && (
                        <CheckboxControl
                            label="別タブでリンクを開く"
                            checked={isChecked}
                            onChange={(checked) => setAttributes({ isChecked: checked })}
                        />
                    )}
                </InspectorControls>
                <div style={{ height: wrapToggle ? '0px' : 'auto', overflow: wrapToggle ? 'hidden' : 'unset' }}>
                    <InnerBlocks />
                </div>
            </div>
        );
    },

    save: ({ attributes }) => {
        const { addClassName, addId, customDataAttrs, linkUrl, isChecked, display, tagName } = attributes;

        const dataAttrs = parseCustomDataAttrs(customDataAttrs);
        const fixClass = classNames(addClassName.trim(), display);

        const wrapperAttrs = {
            id: addId || undefined,
            className: fixClass || undefined,
            ...dataAttrs,
        };

        const TagName = tagName || 'div';

        return linkUrl ? (
            <a
                href={linkUrl}
                target={isChecked ? "_blank" : undefined}
                rel={isChecked ? "noopener noreferrer" : undefined}
                {...wrapperAttrs}
            >
                <InnerBlocks.Content />
            </a>
        ) : (
            <TagName {...wrapperAttrs}>
                <InnerBlocks.Content />
            </TagName>
        );
    }
});
