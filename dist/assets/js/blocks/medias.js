/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/component/MediaUpload/ImageSelector.js":
/*!**************************************************************!*\
  !*** ./src/js/blocks/component/MediaUpload/ImageSelector.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/component/MediaUpload/ImageSelector.js";



const ImageSelector = ({
  ...props
}) => {
  let attributes = props.attributes;
  const index = props.index;
  const setAttributes = props.setAttributes;
  let count = props.count;
  const slug = props.slug;
  const single = index === undefined;
  const [newMedia, setNewMedia] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(!single ? attributes[index][slug] : attributes[slug]);
  console.log(single);
  const onSelectImage = (media, slug, index) => {
    if (media && media.url) {
      if (!single) {
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
          [slug]: media.url
        });
      }
    }
  };
  const removeMedia = (slug, index) => {
    if (!single) {
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
        [slug]: ''
      });
    }
  };
  if (!single) {
    return wp.element.createElement(wp.element.Fragment, null, newMedia && wp.element.createElement("img", {
      src: newMedia,
      alt: "Uploaded Image",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 20
      }
    }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 7
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
      onSelect: media => onSelectImage(media, slug, index),
      allowedTypes: ['image'],
      value: attributes[index][slug],
      render: ({
        open
      }) => wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        onClick: open,
        isPrimary: true,
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 13
        }
      }, "\u753B\u50CF\u3092\u9078\u629E"),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 9
      }
    })), attributes[slug] !== '' && wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 9
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
      onClick: () => removeMedia(slug, index),
      isLink: true,
      isDestructive: true,
      className: "removeImage",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 11
      }
    }, "\u753B\u50CF\u3092\u524A\u9664")));
  } else {
    return wp.element.createElement(wp.element.Fragment, null, newMedia && wp.element.createElement("img", {
      className: "b-media__img",
      src: newMedia,
      alt: "Uploaded Image",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 22
      }
    }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
      onSelect: media => onSelectImage(media, slug),
      allowedTypes: ['image'],
      value: attributes[slug],
      render: ({
        open
      }) => wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        onClick: open,
        isPrimary: true,
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 15
        }
      }, "\u753B\u50CF\u3092\u9078\u629E"),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 11
      }
    })), attributes[slug] !== '' && wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 11
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
      onClick: () => removeMedia(slug),
      isLink: true,
      isDestructive: true,
      className: "removeImage",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 13
      }
    }, "\u753B\u50CF\u3092\u524A\u9664")));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ImageSelector);

/***/ }),

/***/ "./src/js/blocks/component/MediaUpload/index.js":
/*!******************************************************!*\
  !*** ./src/js/blocks/component/MediaUpload/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageSelector: function() { return /* reexport safe */ _ImageSelector__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   useImageFunctions: function() { return /* reexport safe */ _useImageFunctions__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _ImageSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageSelector */ "./src/js/blocks/component/MediaUpload/ImageSelector.js");
/* harmony import */ var _useImageFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useImageFunctions */ "./src/js/blocks/component/MediaUpload/useImageFunctions.js");



/***/ }),

/***/ "./src/js/blocks/component/MediaUpload/useImageFunctions.js":
/*!******************************************************************!*\
  !*** ./src/js/blocks/component/MediaUpload/useImageFunctions.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const useImageFunctions = (initialImageUrl, initialImageAlt, initialImageId) => {
  const [imageUrl, setImageUrl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initialImageUrl);
  const [imageAlt, setImageAlt] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initialImageAlt);
  const [imageId, setImageId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initialImageId);
  const onSelectImage = media => {
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
  return {
    imageUrl,
    imageAlt,
    imageId,
    onSelectImage,
    removeMedia
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useImageFunctions);

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!*********************************!*\
  !*** ./src/js/blocks/medias.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _component_MediaUpload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/MediaUpload */ "./src/js/blocks/component/MediaUpload/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/medias.js";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }






(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('portart/medias', {
  title: '画像',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    imageUploadUrl: {
      type: 'string',
      default: ''
    },
    mobileImageUploadUrl: {
      // モバイル用画像URLの属性を追加
      type: 'string',
      default: ''
    },
    addAttr: {
      type: 'string',
      default: ''
    },
    imageUrl: {
      type: 'string',
      default: ''
    },
    mobileImageUrl: {
      // モバイル用画像URLの属性を追加
      type: 'string',
      default: ''
    },
    addClassName: {
      type: 'string',
      default: ''
    }
  },
  edit: ({
    className,
    attributes,
    setAttributes
  }) => {
    const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const onChangeAttr = newAttr => {
      setAttributes({
        addAttr: newAttr
      });
    };
    const ThemeImagesSelector = ({
      onImageSelect,
      imageUrl,
      label
    }) => {
      const [images, setImages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
      const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(true);
      (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
        // REST APIエンドポイントから画像の一覧を取得
        _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
          path: '/mytheme/v1/theme-images/'
        }).then(images => {
          setImages(images);
          setIsLoading(false);
        });
      }, []);
      const value = images.find(image => image.url === portartMedia.themeUrl + imageUrl)?.url || '';
      return isLoading ? wp.element.createElement("p", {
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 9
        }
      }, "Loading...") : wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        label: label ?? "テーマの画像を選択",
        value: value,
        options: [{
          label: '画像を選択',
          value: ''
        },
        // デフォルトの選択肢を追加
        ...images.map(image => ({
          label: image.name,
          value: image.url
        }))],
        onChange: imageURL => onImageSelect(imageURL),
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 9
        }
      });
    };
    const {
      imageUrl,
      mobileImageUrl,
      imageUploadUrl,
      addAttr,
      mobileImageUploadUrl,
      addClassName
    } = attributes;
    const themeDirectoryImageUrl = `${portartMedia.themeUrl}/dist/assets/images/`;

    // メディアライブラリから画像を選択する
    const onImageSelect = imageURL => {
      const relativeUrl = imageURL.replace(new RegExp(`^${portartMedia.themeUrl}`), '');
      setAttributes({
        imageUrl: relativeUrl
      });
    };
    const onMobileImageSelect = imageURL => {
      const relativeUrl = imageURL.replace(new RegExp(`^${portartMedia.themeUrl}`), '');
      setAttributes({
        mobileImageUrl: relativeUrl
      });
    };
    return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99,
        columnNumber: 9
      }
    }, wp.element.createElement("div", {
      className: "components-base-control",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 11
      }
    }, wp.element.createElement("p", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 13
      }
    }, "\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u7528\u753B\u50CF\u306E\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9"), wp.element.createElement(_component_MediaUpload__WEBPACK_IMPORTED_MODULE_3__.ImageSelector, {
      attributes: attributes,
      setAttributes: setAttributes,
      slug: "imageUploadUrl",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 13
      }
    })), wp.element.createElement("div", {
      className: "components-base-control",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 11
      }
    }, wp.element.createElement("p", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 13
      }
    }, "\u30E2\u30D0\u30A4\u30EB\u7528\u753B\u50CF\u306E\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9"), wp.element.createElement(_component_MediaUpload__WEBPACK_IMPORTED_MODULE_3__.ImageSelector, {
      attributes: attributes,
      setAttributes: setAttributes,
      slug: "mobileImageUploadUrl",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 13
      }
    })), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
      label: "\u8FFD\u52A0class",
      value: addClassName,
      onChange: newText => {
        setAttributes({
          addClassName: newText
        });
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 11
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: "\u8FFD\u52A0Attr",
      value: addAttr,
      onChange: onChangeAttr,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 11
      }
    })), isModalOpen && wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
      title: "\u753B\u50CF\u3092\u9078\u629E",
      onRequestClose: closeModal,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 11
      }
    }, wp.element.createElement(ThemeImagesSelector, {
      imageUrl: imageUrl,
      onImageSelect: onImageSelect,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 13
      }
    }), wp.element.createElement(ThemeImagesSelector, {
      label: 'スマホのテーマ画像を選択',
      imageUrl: mobileImageUrl,
      onImageSelect: onMobileImageSelect,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 139,
        columnNumber: 13
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      isPrimary: true,
      onClick: closeModal,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 141,
        columnNumber: 13
      }
    }, "\u9589\u3058\u308B")), wp.element.createElement("div", {
      className: "b-media__group",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 9
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      isPrimary: true,
      onClick: openModal,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 11
      }
    }, "\u30C6\u30FC\u30DE\u30D5\u30A9\u30EB\u30C0\u304B\u3089\u753B\u50CF\u3092\u9078\u629E\u3059\u308B"), wp.element.createElement("div", {
      className: "b-media__group__inner",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 11
      }
    }, (imageUrl || imageUploadUrl) && wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("div", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 17
      }
    }, wp.element.createElement("p", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 19
      }
    }, "PC\u753B\u50CF"), wp.element.createElement("img", {
      className: "b-media__img",
      src: imageUploadUrl ? imageUploadUrl : portartMedia.themeUrl + imageUrl,
      alt: "",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 19
      }
    }))), (mobileImageUrl || mobileImageUploadUrl) && wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("div", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 163,
        columnNumber: 17
      }
    }, wp.element.createElement("p", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 19
      }
    }, "\u30B9\u30DE\u30DB\u753B\u50CF"), wp.element.createElement("img", {
      className: "b-media__img",
      src: mobileImageUploadUrl ? mobileImageUploadUrl : portartMedia.themeUrl + mobileImageUrl,
      alt: "",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 19
      }
    }))))));
  },
  save: ({
    attributes
  }) => {
    const {
      imageUrl,
      mobileImageUrl,
      imageUploadUrl,
      mobileImageUploadUrl,
      addClassName,
      addAttr
    } = attributes;
    const loadClass = addClassName + '\n';
    const fixClass = loadClass.replace(/\n/g, ' ');
    const fixPictureClass = loadClass.replace(/\n/g, '__picture ');
    const attrArray = addAttr.split(' ');
    let attrs = {};
    for (let i = 0; i < attrArray.length; i++) {
      const label = attrArray[i].substr(0, attrArray[i].indexOf('='));
      const value = attrArray[i].substr(attrArray[i].indexOf('=') + 1).replace(/"/g, '');
      attrs[label] = value;
    }
    return wp.element.createElement(wp.element.Fragment, null, (imageUrl || imageUploadUrl) && wp.element.createElement("picture", {
      className: fixPictureClass,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 11
      }
    }, (mobileImageUrl || mobileImageUploadUrl) && wp.element.createElement("source", {
      className: mobileImageUploadUrl ? fixClass : fixClass + 'block-media',
      "data-src": mobileImageUrl,
      srcSet: mobileImageUploadUrl ? mobileImageUploadUrl : '',
      media: "(max-width: 1024px)",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 15
      }
    }), wp.element.createElement("img", _extends({}, attrs, {
      className: imageUploadUrl ? fixClass : fixClass + 'block-media',
      "data-src": imageUrl,
      src: imageUploadUrl ? imageUploadUrl : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
      alt: "media",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 195,
        columnNumber: 13
      }
    }))));
  }
});
}();
/******/ })()
;
//# sourceMappingURL=medias.js.map