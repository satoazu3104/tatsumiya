import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, PanelColorSettings, RichText, URLInput, PagePicker } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';

registerBlockType('portart/linkbutton', {
  title: 'リンクボタン',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    text: {
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
    selectedPage: {
      type: 'object',
      default: null,
    },
  },

  edit: ({ attributes: { addClassName, addId, text, linkUrl }, setAttributes }) => {
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

    const onSelectPage = (page) => {
      setAttributes({
        selectedPage: page
      });
    }

    return (
      <div className='c-button__wrap' style={{ minWidth: 'unset' }}>
        <div className='c-button'>
          <RichText
            value={text}
            onChange={newText => setAttributes({ text: newText })}
            tagName='p'
            style={{
              color: 'black'
            }}
            className=''
            id="attr-text"
            placeholder="ボタンテキストを入力してください"
            keepPlaceholderOnFocus={true}
          />
        </div>

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
        </InspectorControls>
      </div>
    )
  },

  save: ({ className, attributes: { addClassName, addId, text, linkUrl } }) => {
    return (
      <>
        <a href={linkUrl} id={addId} className={`c-button__wrap c-button__trigger ${addClassName}`}>
          <div className='c-button__before'></div>
          <div className={'c-button__inner'}>
            <RichText.Content
              className='p-text__button c-button__text'
              value={text}
              tagName='p'
            />
          </div>
          <div className='c-button__after'></div>
        </a>
      </>
    )
  }
})