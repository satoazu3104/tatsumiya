import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, PanelColorSettings, RichText } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { ImageSelector } from './component/MediaUpload';

registerBlockType('portart/pagehead', {
  title: '固定ページのヘッダー画像',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    addClassName: {
      type: 'string',
      default: '',
    },
    addId: {
      type: 'string',
      default: '',
    },
    addAttr: {
      type: 'string',
      default: '',
    },
    title: {
      type: 'string',
      default: '',
    },
    headImage: {
      type: 'string',
      default: '',
    }
  },
  
  edit: ({attributes, attributes: {addClassName, addId, addAttr, title}, setAttributes}) => {

    const onChangeClass = (newText) => {
      setAttributes({
        addClassName: newText
      });
    }
    const onChangeAttr = (newAttr) => {
      setAttributes({
        addAttr: newAttr
      });
    }
    const onChangeId = (newId) => {
      setAttributes({
        addId: newId
      });
    }

    return(
      <div style={{
        position: 'relative'
      }} className='wrapper'>
        <p style={{
          position: 'absolute',
          padding: '4px',
          background: 'gray',
          left: '0px',
          top: '0px',
          margin: '0px',
        }}>{addClassName}</p>

        <ImageSelector
          attributes={attributes}
          setAttributes={setAttributes}
          slug={'headImage'}
        />
        <RichText
          value={title}
          onChange={newText => setAttributes({ title: newText })}
          tagName='h1'
          className='c-text__40-24 c-text--bold'
          id="attr-title"
          placeholder="タイトルを入力してください"
          keepPlaceholderOnFocus={true}
        />

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
          <TextControl 
            label="追加Attr"
            value={addAttr} 
            onChange={onChangeAttr}
          />
        </InspectorControls>

        <InnerBlocks />
      </div>
    )
  },

  save: ({className, attributes: {addClassName, addId, addAttr, headImage, title}}) => {
    const attrArray = addAttr.split(' ');
    let attrs = {};
    for (let i = 0; i < attrArray.length; i++) {
      const label = attrArray[i].substr(0, attrArray[i].indexOf('='));
      const value = attrArray[i].substr((attrArray[i].indexOf('=') + 1)).replace(/"/g, '');
      attrs[label] = value;
    }

    return(
      <div>
        <div id={addId} className={addClassName + ' p-page__head'} {...attrs}>
          <img className='p-page__head__img--main' src={headImage} alt={title} />
          <RichText.Content
            value={title}
            tagName='h1'
            className='c-text--center c-text--white c-text__40-24 c-text--bold p-page__head__text--title c-text--jp2'
          />
          <InnerBlocks.Content />
        </div>
      </div>
    )
  }
})