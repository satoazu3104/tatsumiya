import { registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, useBlockProps, BlockControls } from '@wordpress/block-editor';

const variations = [
  {
    name: 'normal',
    title: 'ノーマル',
    className: ''
  },
  {
    name: 'align-end',
    title: '右より',
    className: 'wp-block-portart-contentbox--right'
  },
  {
    name: 'column',
    title: 'テキスト横並び',
    className: 'wp-block-portart-contentbox--grid'
  }
];

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

registerBlockType('portart/contentbox', {
  title: 'コンテンツ',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    variation: {
      type: 'string',
      default: '',
    }
  },

  edit: ({ className, attributes: {variation},  setAttributes }) => {
    const MY_TEMPLATE = [
      ['portart/title', {}],
      ['portart/middletext', {}],
      ['portart/bodytext', {}],
    ]
    const blockProps = useBlockProps();
    return (
      <div {...blockProps}>
        <BlockControls>
          <Variation variation={variation} setAttributes={setAttributes} />
        </BlockControls>
        <InnerBlocks
          template={ MY_TEMPLATE }
        />
      </div>
    )
  },
  save: ({ attributes: {variation} }) => {
    const blockProps = useBlockProps.save();
    return (
      <div {...blockProps} className={variation}>
        <InnerBlocks.Content />
      </div>
    )
  },
});