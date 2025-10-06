/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/component/CustomInner/CustomInnerButton.js":
/*!******************************************************************!*\
  !*** ./src/js/blocks/component/CustomInner/CustomInnerButton.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/component/CustomInner/CustomInnerButton.js";

const CustomInnerButton = ({
  attributes,
  setAttributes
}) => {
  const Label = () => {
    const selectRich = window.getSelection().focusNode.parentElement.closest('.rich-text');
    const id = selectRich.id;
    const label = id.replace('attr-', '');
    return label;
  };
  const tagDot = (selectedText, name) => {
    const tag = {
      dot: '<span class="c-text--dot">' + selectedText + '</span>',
      mainColor: '<span class="c-text--main">' + selectedText + '</span>',
      subColor: '<span class="c-text--main2">' + selectedText + '</span>',
      accentColor: '<span class="c-text--accent">' + selectedText + '</span>',
      backColor: '<span class="c-text--back">' + selectedText + '</span>',
      backBlackColor: '<span class="c-text--back--black">' + selectedText + '</span>'
    };
    return tag[name];
  };
  const insertCustomTag = name => {
    const selectedText = window.getSelection().toString();
    const selectRich = window.getSelection().focusNode.parentElement.closest('.rich-text');
    if (!selectRich) return;
    const id = selectRich.id;
    const label = id.replace('attr-', '');
    const tag = tagDot(selectedText, name);
    let content = attributes[label];
    const newContent = content.replace(selectedText, tag);
    setAttributes({
      [label]: newContent
    });
  };
  const insertBrTag = className => {
    const label = Label();
    let selectPos = window.getSelection().getRangeAt(0);
    console.log(selectPos);
    const elm = document.createElement('br');
    elm.classList.add(className);
    selectPos.insertNode(elm);
    const content = selectPos.commonAncestorContainer.innerHTML;
    console.log(label, content);
    setAttributes({
      [label]: content
    });
  };
  return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "\u4E0A\u4ED8\u304D\u30C9\u30C3\u30C8\u30BF\u30B0",
    onClick: () => insertCustomTag('dot'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }
  }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "\u30E1\u30A4\u30F3\u30AB\u30E9\u30FC\u30BF\u30B0",
    onClick: () => insertCustomTag('mainColor'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }
  }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "\u30B5\u30D6\u30AB\u30E9\u30FC\u30BF\u30B0",
    onClick: () => insertCustomTag('subColor'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }
  }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "\u30A2\u30AF\u30BB\u30F3\u30C8\u30AB\u30E9\u30FC\u30BF\u30B0",
    onClick: () => insertCustomTag('accentColor'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }
  }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "\u80CC\u666F\u30AB\u30E9\u30FC\u30BF\u30B0",
    onClick: () => insertCustomTag('backColor'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }
  }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "\u80CC\u666F\u9ED2\u30BF\u30B0",
    onClick: () => insertCustomTag('backBlackColor'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }
  }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "PC\u30B5\u30A4\u30BA\u306Bbr\u30BF\u30B0\u3092\u633F\u5165",
    onClick: () => insertBrTag('pc'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 7
    }
  }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "\u30B9\u30DE\u30DB\u30B5\u30A4\u30BA\u306Bbr\u30BF\u30B0\u3092\u633F\u5165",
    onClick: () => insertBrTag('sp'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }
  }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichTextToolbarButton, {
    icon: "editor-code",
    title: "br\u30BF\u30B0\u3092\u633F\u5165",
    onClick: insertBrTag,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomInnerButton);

/***/ }),

/***/ "./src/js/blocks/component/CustomInner/index.js":
/*!******************************************************!*\
  !*** ./src/js/blocks/component/CustomInner/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomInnerButton: function() { return /* reexport safe */ _CustomInnerButton__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _CustomInnerButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomInnerButton */ "./src/js/blocks/component/CustomInner/CustomInnerButton.js");


/***/ }),

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
/*!************************************!*\
  !*** ./src/js/blocks/firstview.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _component_CustomInner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/CustomInner */ "./src/js/blocks/component/CustomInner/index.js");
/* harmony import */ var _component_MediaUpload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/MediaUpload */ "./src/js/blocks/component/MediaUpload/index.js");
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/firstview.js";





const medias = ['kv0', 'kv1', 'kv2'];
const titles = ['title0', 'title1', 'title2'];
const titlesMed = ['titleMed0', 'titleMed1', 'titleMed2'];
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('portart/firstview', {
  title: 'ファーストビュー',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    sp: {
      type: 'string',
      default: ''
    },
    pc: {
      type: 'string',
      default: ''
    }
  },
  edit: ({
    className,
    attributes: {
      kv0,
      kv1,
      kv2
    },
    attributes,
    setAttributes
  }) => {
    return wp.element.createElement("div", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 7
      }
    }, wp.element.createElement(_component_MediaUpload__WEBPACK_IMPORTED_MODULE_4__.ImageSelector, {
      attributes: attributes,
      setAttributes: setAttributes,
      slug: "pc",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 9
      }
    }), wp.element.createElement(_component_MediaUpload__WEBPACK_IMPORTED_MODULE_4__.ImageSelector, {
      attributes: attributes,
      setAttributes: setAttributes,
      slug: "sp",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 9
      }
    }));
  },
  save: ({
    attributes,
    attributes: {
      header,
      pc,
      sp
    }
  }) => {
    return wp.element.createElement("div", {
      className: "c-fv__wrap",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 7
      }
    }, wp.element.createElement("div", {
      className: "c-fv__wrap--kv",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }
    }, wp.element.createElement("img", {
      className: "c-fv__img--kv pc",
      src: pc,
      alt: "firstview \u30A4\u30E1\u30FC\u30B8\u753B\u50CF",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 11
      }
    }), wp.element.createElement("img", {
      className: "c-fv__img--kv sp",
      src: sp,
      alt: "firstview \u30A4\u30E1\u30FC\u30B8\u753B\u50CF",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 11
      }
    })));
  }
});
}();
/******/ })()
;
//# sourceMappingURL=firstview.js.map