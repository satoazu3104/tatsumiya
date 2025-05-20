import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

registerBlockType('portart/middletext', {
  title: '中タイトル',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    text: {
      type: 'string',
      default: '',
    },
  },

  edit: ({ className, attributes: { text }, setAttributes }) => {

    return (
      <div>
        <RichText
          value={text}
          onChange={newText => setAttributes({ text: newText })}
          tagName='h4'
          placeholder="中タイトルを入力してください"
          keepPlaceholderOnFocus={true}
        />
      </div>
    )
  },
  save: ({ attributes: { text } }) => {
    return (
      <div>
        <RichText.Content
          value={text}
          tagName='h4'
          className='c-text__middle'
        />
      </div>
    )
  },
});