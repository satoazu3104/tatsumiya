import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';

registerBlockType('portart/listcompany', {
  title: '会社概要',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    blocksData: {
      type: 'array',
      default: [],
    },
    count: {
      type: 'number',
      default: 1,
    }
  },

  edit: ({ attributes: { blocksData, count, title }, setAttributes }) => {
    // アイテムの追加
    const addBlock = () => {
      const newBlock = { id: blocksData.length + 1, content: `` };
      setAttributes({
        blocksData: [...blocksData, newBlock],
        count: count++
      });
    };

    // アイテムの削除
    const removeBlock = (id) => {
      const updatedBlocksData = blocksData.filter((block) => block.id !== id);
      setAttributes({
        blocksData: updatedBlocksData,
        count: count++
      });
    };

    // テキストの編集
    const changeArrayText = (newText, index, label) => {
      let newArray = blocksData;
      newArray[index][label] = newText;
      setAttributes({
        blocksData: newArray,
        count: count++
      });
    }

    return (
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '24px'
        }}>
          {blocksData.map((block, index) => (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}>
              <div key={block.id} className="dynamic-block">
                <RichText
                  value={block.label}
                  onChange={newText => changeArrayText(newText, index, 'label')}
                  tagName='p'
                  placeholder="ラベルを入力してください"
                  keepPlaceholderOnFocus={true}
                />
                <RichText
                  value={block.value}
                  onChange={newText => changeArrayText(newText, index, 'value')}
                  tagName='p'
                  placeholder="値を入力してください"
                  keepPlaceholderOnFocus={true}
                />
                <Button isDestructive onClick={() => removeBlock(block.id)}>アイテムを削除</Button>
              </div>
            </div>
          ))}
        </div>

        <Button isPrimary onClick={addBlock}>アイテムを追加</Button>
      </div>
    )
  },

  save: ({ className, attributes: { blocksData } }) => {
    return (
      <div>
        <ul className='p-company__list'>
          {blocksData.map((block, index) => (
            <li className='p-company__items'>
              <div className='p-company__inner'>
                <RichText.Content
                  value={block.label}
                  tagName='p'
                  className='p-company__header c-text__title'
                />
                <RichText.Content
                  value={block.value}
                  tagName='p'
                  className='p-company__content c-text__title c-text--reg body'
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  },
});