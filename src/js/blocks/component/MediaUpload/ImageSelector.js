import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

const ImageSelector = ({...props}) => {
  let attributes = props.attributes;
  const index = props.index;
  const setAttributes = props.setAttributes;
  let count = props.count;
  const slug = props.slug;
  const single = index === undefined;
  
  const [newMedia, setNewMedia] = useState(!single ? attributes[index][slug] : attributes[slug]);
  console.log(single);
  
  const onSelectImage = (media, slug, index) => {
    if (media && media.url) {
      if(!single) {
        let newArray = attributes;
        console.log(newArray);
        newArray[index][slug] = media.url;
        setNewMedia(media.url);
        setAttributes({
          blocksData: newArray,
          count: count++
        });
      } else {
        setNewMedia(media.url);
        setAttributes({
          [slug]: media.url,
        });
      }
    }
  }
  const removeMedia = (slug, index) => {
    if(!single) {
    let newArray = attributes;
    newArray[index][slug] = '';
    setNewMedia('');
    setAttributes({
      blocksData: newArray,
      count: count++
     });
    } else {
      setNewMedia('');
      setAttributes({
        [slug]: '',
      });
    }
  }
  
  if(!single) {
    return(
      <>
      {/* 画像が設定されている場合は表示 */}
      {newMedia && <img src={newMedia} alt="Uploaded Image" />}

      {/* 画像を選択するコンポーネント */}
      <MediaUploadCheck>
        <MediaUpload
          onSelect={(media) => onSelectImage(media, slug, index)}
          allowedTypes={['image']}
          value={attributes[index][slug]}
          render={({ open }) => (
            <Button onClick={open} isPrimary>
              画像を選択
            </Button>
          )}
        />
      </MediaUploadCheck>
      {attributes[slug] !== '' &&
        <MediaUploadCheck>
          <Button
            onClick={() => removeMedia(slug, index)}
            isLink
            isDestructive
            className="removeImage">
            画像を削除
          </Button>
        </MediaUploadCheck>
      }
      </>
    )
  } else {
    return (
      <>
        {/* 画像が設定されている場合は表示 */}
        {newMedia && <img className='b-media__img' src={newMedia} alt="Uploaded Image" />}

        {/* 画像を選択するコンポーネント */}
        <MediaUploadCheck>
          <MediaUpload
            onSelect={(media) => onSelectImage(media, slug)}
            allowedTypes={['image']}
            value={attributes[slug]}
            render={({ open }) => (
              <Button onClick={open} isPrimary>
                画像を選択
              </Button>
            )}
          />
        </MediaUploadCheck>
        {attributes[slug] !== '' &&
          <MediaUploadCheck>
            <Button
              onClick={() => removeMedia(slug)}
              isLink
              isDestructive
              className="removeImage">
              画像を削除
            </Button>
          </MediaUploadCheck>
        }
      </>
    )
  }
}

export default ImageSelector; 