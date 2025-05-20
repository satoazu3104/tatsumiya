import { registerBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { RichText, MediaUpload, MediaUploadCheck, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { CustomInnerButton } from './component/CustomInner';
import { ImageSelector } from './component/MediaUpload';

const medias = ['kv0', 'kv1', 'kv2'];
const titles = ['title0', 'title1', 'title2'];
const titlesMed = ['titleMed0', 'titleMed1', 'titleMed2'];

registerBlockType('portart/firstview', {
  title: 'ファーストビュー',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    sp: {
      type: 'string',
      default: '',
    },
    pc: {
      type: 'string',
      default: '',
    },
  },
  edit: ({ className, attributes: {kv0, kv1, kv2}, attributes, setAttributes}) => {
    
    return (
      <div>
        <ImageSelector attributes={attributes} setAttributes={setAttributes} slug="pc" />
        <ImageSelector attributes={attributes} setAttributes={setAttributes} slug="sp" />
      </div>
    )
  },
  save: ({ attributes, attributes: {header, pc, sp} }) => {
    return (
      <div className='c-fv__wrap'>
        
        <div className='c-fv__wrap--kv'>
          <img className='c-fv__img--kv pc' src={pc} alt="firstview イメージ画像" />
          <img className='c-fv__img--kv sp' src={sp} alt="firstview イメージ画像" />
        </div>

      </div>
    )
  },
});