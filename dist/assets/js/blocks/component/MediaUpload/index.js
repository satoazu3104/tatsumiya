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

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

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
/*!******************************************************!*\
  !*** ./src/js/blocks/component/MediaUpload/index.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageSelector: function() { return /* reexport safe */ _ImageSelector__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   useImageFunctions: function() { return /* reexport safe */ _useImageFunctions__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _ImageSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageSelector */ "./src/js/blocks/component/MediaUpload/ImageSelector.js");
/* harmony import */ var _useImageFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useImageFunctions */ "./src/js/blocks/component/MediaUpload/useImageFunctions.js");


}();
/******/ })()
;
//# sourceMappingURL=index.js.map