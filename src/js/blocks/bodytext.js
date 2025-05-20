import { registerBlockType } from '@wordpress/blocks';
import { RichText, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { CustomInnerButton } from './component/CustomInner';
import { TextControl, TextareaControl } from '@wordpress/components';

const variations = [
  {
    name: 'normal',
    title: '通常サイズ',
    className: 'c-text__normal'
  },
  {
    name: 'titleReg',
    title: '18px',
    className: 'c-text__title-reg'
  },
  {
    name: 'title',
    title: '18px 太文字',
    className: 'c-text__title'
  },
  {
    name: 'longHeight',
    title: '行間高め',
    className: 'c-text__long-height'
  }
];

const fontfamilys = [
  {
    name: 'jp',
    title: '日本語フォント',
    className: ''
  },
  {
    name: 'jp2',
    title: '日本語フォント(セリフ)',
    className: 'c-text--jp2'
  },
  {
    name: 'en',
    title: '英語フォント',
    className: 'c-text--en'
  },
];

const Familys = ({ fontfamily, setAttributes }) => {
  return (
    <>
      <select
        value={fontfamily}
        onChange={(event) => setAttributes({ fontfamily: event.target.value })}
      >
        {fontfamilys.map((item, index) => {
          return (
            <option key={index} value={item.className}>
              {item.title}
            </option>
          );
        })}
      </select>
    </>
  )
}

const Variation = ({ variation, setAttributes }) => {
  return (
    <>
      <select
        value={variation}
        onChange={(event) => setAttributes({ variation: event.target.value })}
      >
        {variations.map((item, index) => {
          return (
            <option key={index} value={item.className}>
              {item.title}
            </option>
          );
        })}
      </select>
    </>
  );
};

registerBlockType('portart/bodytext', {
  title: '本文',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    text: {
      type: 'string',
      default: '',
    },
    variation: {
      type: 'string',
      default: 'c-text__normal',
    },
    fontfamily: {
      type: 'string',
      default: ''
    },
    addClassName: {
      type: 'string',
      default: '',
    },
    addId: {
      type: 'string',
      default: '',
    }
  },

  edit: ({ className, attributes, attributes: { text, variation, fontfamily, addClassName, addId }, setAttributes }) => {
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

    return (
      <div>
        <BlockControls>
          <Variation variation={variation} setAttributes={setAttributes} />
          <Familys fontfamily={fontfamily} setAttributes={setAttributes} />
          <CustomInnerButton attributes={attributes} setAttributes={setAttributes} />
        </BlockControls>
        <InspectorControls>
          <TextareaControl
            label="追加class"
            value={addClassName}
            onChange={onChangeClass}
          />
          <TextControl
            label="追加Id"
            value={addId}
            onChange={onChangeId}
          />
        </InspectorControls>
        <RichText
          value={text}
          onChange={newText => setAttributes({ text: newText })}
          tagName='p'
          placeholder="本文を入力してください"
          keepPlaceholderOnFocus={true}
          className={variation + ' ' + fontfamily}
          inlineToolbar={true}
          id="attr-text"
        />
      </div>
    )
  },
  save: ({ className, attributes: { text, variation, fontfamily, addId, addClassName } }) => {
    const fixClass = addClassName.replace(/\n/g, ' ');
    return (
      <>
        <RichText.Content
          value={text}
          tagName='p'
          className={fixClass ? fixClass + ' ' + fontfamily : variations + ' c-text__normal ' + fontfamily}
          id={addId}
        />
      </>
    )
  },
});