import { useState } from "@wordpress/element";
const useImageFunctions = (initialImageUrl, initialImageAlt, initialImageId) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [imageAlt, setImageAlt] = useState(initialImageAlt);
  const [imageId, setImageId] = useState(initialImageId);

  const onSelectImage = (media) => {
    if (media && media.url) {
      setImageUrl(media.url);
      setImageAlt(media.alt);
      setImageId(media.id);
    }
  };

  const removeMedia = () => {
    setImageId(0);
    setImageUrl('');
    setImageAlt('');
  };

  return { imageUrl, imageAlt, imageId, onSelectImage, removeMedia };
};

export default useImageFunctions;