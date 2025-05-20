import { registerBlockType } from '@wordpress/blocks';
import { RichText, BlockControls, InspectorControls, URLInput } from '@wordpress/block-editor';
import { CustomInnerButton } from './component/CustomInner';
import { TextControl, CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

registerBlockType('portart/title', {
    title: 'セクションタイトル',
    icon: 'smiley',
    category: 'layout',
    attributes: {
        titleEn: {
            type: 'string',
            default: '',
        },
        titleJp: {
            type: 'string',
            default: '',
        },
        addClassName: {
            type: 'string',
            default: '',
        },
        addId: {
            type: 'string',
            default: '',
        },
        linkUrl: {
            type: 'string',
            default: '',
        },
        isChecked: {
            type: 'boolean',
            default: false,
        },
    },

    edit: ({ className, attributes, attributes: { titleEn, titleJp, addClassName, addId, linkUrl, wrapToggle, isChecked }, setAttributes }) => {
        const [toggle, setToggle] = useState(wrapToggle);

        const onChangeClass = (newText) => {
            setAttributes({
                addClassName: newText
            });
        }
        const onChangeId = (newId) => {
            setAttributes({
                addId: newId
            });
        }
        const onChangeLinkUrl = (newLinkUrl) => {
            setAttributes({
                linkUrl: newLinkUrl
            });
        }

        return (
            <div>
                <RichText
                    value={titleEn}
                    onChange={newTitleEn => setAttributes({ titleEn: newTitleEn })}
                    tagName='p'
                    id="attr-titleEn"
                    placeholder="英語のタイトルを入力してください。"
                    keepPlaceholderOnFocus={true}
                    inlineToolbar={true}
                />
                <RichText
                    value={titleJp}
                    onChange={newTitleJp => setAttributes({ titleJp: newTitleJp })}
                    tagName='h3'
                    id="attr-titleJp"
                    placeholder="日本語のタイトルを入力してください。"
                    keepPlaceholderOnFocus={true}
                    inlineToolbar={true}
                />
                <BlockControls>
                    <CustomInnerButton attributes={attributes} setAttributes={setAttributes} />
                </BlockControls>

                <InspectorControls>
                    <TextControl
                        label="追加class"
                        value={addClassName}
                        onChange={onChangeClass}
                    />
                    <TextControl
                        label="追加Id"
                        value={addId}
                        onChange={onChangeId}
                    />
                    <URLInput
                        label="リンクURL"
                        value={linkUrl}
                        onChange={onChangeLinkUrl}
                    />
                    {linkUrl && (
                        <CheckboxControl
                            label="別タブでリンクを開く"
                            checked={isChecked}
                            onChange={(checked) => setAttributes({ isChecked: checked })}
                        />
                    )}
                </InspectorControls>
            </div>
        )
    },
    save: ({ attributes: { titleEn, titleJp, addClassName, addId, linkUrl, isChecked, } }) => {
        const Jp = () => {
            if (titleJp) {
                return (
                    <div className={'p-title__wrap--jp js-scroll-up ' + addClassName} id={addId}>
                        <RichText.Content
                            value={titleJp}
                            tagName='p'
                            className='p-title__jp p-text__section-title-jp'
                        />
                    </div>
                )
            }
        }

        const En = () => {
            if (titleEn) {
                return (
                    <div className={linkUrl ? 'p-title__wrap--en link ' + addClassName : 'p-title__wrap--en ' + addClassName}>
                        <RichText.Content
                            className='p-title__en c-text--en p-text__section-title-en js-split-text'
                            value={titleEn}
                            tagName='h3'
                        />
                    </div>
                )
            }
        }

        if (linkUrl && isChecked) {
            return (
                <a href={linkUrl} target="_blank" rel="noopener noreferrer" className=''>
                    <div className={addClassName + ' p-title__wrap'} id={addId}>
                        <En />
                        <Jp />
                    </div>
                </a>
            )
        } else if (linkUrl) {
            return (
                <a href={linkUrl} className=''>
                    <div className={addClassName + ' p-title__wrap'} id={addId}>
                        <En />
                        <Jp />
                    </div>
                </a>
            )
        } else {
            return (
                <div className=''>
                    <div className={addClassName + ' p-title__wrap'} id={addId}>
                        <En />
                        <Jp />
                    </div>
                </div>
            )
        }
    },
});