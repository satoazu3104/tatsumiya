import { registerBlockType } from '@wordpress/blocks';
import { Button, Modal, TextControl, SelectControl, TextareaControl } from '@wordpress/components';
import { RichText, MediaUpload, MediaUploadCheck, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { ImageSelector, useImageFunctions } from './component/MediaUpload';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

registerBlockType('portart/medias', {
  title: '画像',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    imageUploadUrl: {
      type: 'string',
      default: ''
    },
    mobileImageUploadUrl: { // モバイル用画像URLの属性を追加
      type: 'string',
      default: ''
    },
    addAttr: {
      type: 'string',
      default: '',
    },
    imageUrl: {
      type: 'string',
      default: ''
    },
    mobileImageUrl: { // モバイル用画像URLの属性を追加
      type: 'string',
      default: ''
    },
    addClassName: {
      type: 'string',
      default: '',
    },
  },

  edit: ({ className, attributes, setAttributes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const onChangeAttr = (newAttr) => {
      setAttributes({
        addAttr: newAttr
      });
    }

    const ThemeImagesSelector = ({ onImageSelect, imageUrl, label }) => {
      const [images, setImages] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        // REST APIエンドポイントから画像の一覧を取得
        apiFetch({ path: '/mytheme/v1/theme-images/' }).then((images) => {
          setImages(images);
          setIsLoading(false);
        });
      }, []);

      const value = images.find(image => image.url === portartMedia.themeUrl + imageUrl)?.url || '';

      return isLoading ? (
        <p>Loading...</p>
      ) : (
        <SelectControl
          label={label ?? "テーマの画像を選択"}
          value={value}
          options={[
            { label: '画像を選択', value: '' }, // デフォルトの選択肢を追加
            ...images.map((image) => ({
              label: image.name,
              value: image.url,
            }))
          ]}
          onChange={(imageURL) => onImageSelect(imageURL)}
        />
      );
    };
    const { imageUrl, mobileImageUrl, imageUploadUrl, addAttr, mobileImageUploadUrl, addClassName } = attributes;

    const themeDirectoryImageUrl = `${portartMedia.themeUrl}/dist/assets/images/`;

    // メディアライブラリから画像を選択する
    const onImageSelect = (imageURL) => {
      const relativeUrl = imageURL.replace(new RegExp(`^${portartMedia.themeUrl}`), '');
      setAttributes({ imageUrl: relativeUrl });
    };

    const onMobileImageSelect = (imageURL) => {
      const relativeUrl = imageURL.replace(new RegExp(`^${portartMedia.themeUrl}`), '');
      setAttributes({ mobileImageUrl: relativeUrl });
    };

    return (
      <>
        <InspectorControls>
          <div className='components-base-control'>
            {/* デスクトップ用画像のアップロード */}
            <p>
              デスクトップ用画像のアップロード
            </p>
            <ImageSelector attributes={attributes} setAttributes={setAttributes} slug="imageUploadUrl" />
          </div>

          <div className='components-base-control'>
            {/* モバイル用画像のアップロード */}
            <p>
              モバイル用画像のアップロード
            </p>
            <ImageSelector attributes={attributes} setAttributes={setAttributes} slug="mobileImageUploadUrl" />
          </div>

          <TextareaControl
            label="追加class"
            value={addClassName}
            onChange={(newText) => {
              setAttributes({
                addClassName: newText
              })
            }}
          />
          <TextControl
            label="追加Attr"
            value={addAttr}
            onChange={onChangeAttr}
          />
        </InspectorControls>

        {isModalOpen && (
          <Modal
            title="画像を選択"
            onRequestClose={closeModal}
          >

            <ThemeImagesSelector imageUrl={imageUrl} onImageSelect={onImageSelect} />
            <ThemeImagesSelector label={'スマホのテーマ画像を選択'} imageUrl={mobileImageUrl} onImageSelect={onMobileImageSelect} />

            <Button isPrimary onClick={closeModal}>
              閉じる
            </Button>
          </Modal>
        )}

        <div className='b-media__group'>
          <Button isPrimary onClick={openModal}>
            テーマフォルダから画像を選択する
          </Button>

          <div className='b-media__group__inner'>
            {(imageUrl || imageUploadUrl) && (
              <>
                <div>
                  <p>PC画像</p>
                  <img className='b-media__img' src={imageUploadUrl ? imageUploadUrl : (portartMedia.themeUrl + imageUrl)} alt="" />
                </div>
              </>
            )}
            {(mobileImageUrl || mobileImageUploadUrl) && (
              <>
                <div>
                  <p>スマホ画像</p>
                  <img className='b-media__img' src={mobileImageUploadUrl ? mobileImageUploadUrl : (portartMedia.themeUrl + mobileImageUrl)} alt="" />
                </div>
              </>
            )}
          </div>
        </div>
      </>
    )
  },
  save: ({ attributes }) => {
    const { imageUrl, mobileImageUrl, imageUploadUrl, mobileImageUploadUrl, addClassName, addAttr } = attributes;
    const loadClass = addClassName + '\n';
    const fixClass = loadClass.replace(/\n/g, ' ');
    const fixPictureClass = loadClass.replace(/\n/g, '__picture ');

    const attrArray = addAttr.split(' ');
    let attrs = {};
    for (let i = 0; i < attrArray.length; i++) {
      const label = attrArray[i].substr(0, attrArray[i].indexOf('='));
      const value = attrArray[i].substr((attrArray[i].indexOf('=') + 1)).replace(/"/g, '');
      attrs[label] = value;
    }

    return (
      <>
        {(imageUrl || imageUploadUrl) && (
          <picture className={fixPictureClass}>
            {(mobileImageUrl || mobileImageUploadUrl) && (
              <source className={mobileImageUploadUrl ? fixClass : fixClass + 'block-media'} data-src={mobileImageUrl} srcSet={mobileImageUploadUrl ? mobileImageUploadUrl : ''} media="(max-width: 1024px)" />
            )}
            <img {...attrs} className={imageUploadUrl ? fixClass : fixClass + 'block-media'} data-src={imageUrl} src={imageUploadUrl ? imageUploadUrl : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'} alt="media" />
          </picture>
        )}
      </>
    )
  },
});