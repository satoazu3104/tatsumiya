import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, MediaUpload, MediaUploadCheck, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Button, TextControl } from '@wordpress/components';

registerBlockType('portart/listproblem', {
  title: 'お悩みリスト',
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
    },
    addId: {
      type: 'string',
      default: '',
    }
  },
  
  edit: ({ attributes: {blocksData, count, addId}, setAttributes }) => {
    const onChangeId = (newId) => {
      setAttributes({
        addId: newId
      });
    }
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
    const changeText = (newText, label) => {
      setAttributes({
        [label]: newText
      });
    }
    
    return(
      <div>
        <InspectorControls>
          <TextControl 
            label="追加Id"
            value={addId} 
            onChange={onChangeId}
          />
        </InspectorControls>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {blocksData.map((block, index) => (
            <div>
              <div key={block.id} className="dynamic-block">
                <RichText
                  value={block.value}
                  onChange={newText => changeArrayText(newText, index, 'value')}
                  tagName='p'
                  placeholder="テキストを入力してください"
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

  save: ({ className, attributes: { blocksData, addId } }) => {
    return(
      <>
        <ul className='p-wrap__problem--list animation u-anim__fade-in'>
          <div className='p-wrap__problem__dec--list-back animation u-anim__fuwa'></div>
          <div className='p-wrap__problem__dec--dot'>
            <div className='c-fv__wrap--dots__inner'>
              <div className='c-fv__dot'></div>
              <div className='c-fv__dot'></div>
              <div className='c-fv__dot'></div>
              <div className='c-fv__dot'></div>
              <div className='c-fv__dot'></div>
            </div>
          </div>
          <div className='p-wrap__problem__dec--human animation u-anim__scroll-up'></div>
          {blocksData.map((slug, index) => (
            <li className='p-wrap__problem--items'>
              <RichText.Content
                tagName='p'
                value={slug.value}
                className='c-text--bold c-text__title'
              />
            </li>
          ))}
        </ul>
      </>
    )
  },
});