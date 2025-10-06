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
/*!***********************************!*\
  !*** ./src/js/blocks/bodytext.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_CustomInner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/CustomInner */ "./src/js/blocks/component/CustomInner/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/bodytext.js";




const variations = [{
  name: 'normal',
  title: '通常サイズ',
  className: 'c-text__normal'
}, {
  name: 'titleReg',
  title: '18px',
  className: 'c-text__title-reg'
}, {
  name: 'title',
  title: '18px 太文字',
  className: 'c-text__title'
}, {
  name: 'longHeight',
  title: '行間高め',
  className: 'c-text__long-height'
}];
const fontfamilys = [{
  name: 'jp',
  title: '日本語フォント',
  className: ''
}, {
  name: 'jp2',
  title: '日本語フォント(セリフ)',
  className: 'c-text--jp2'
}, {
  name: 'en',
  title: '英語フォント',
  className: 'c-text--en'
}];
const Familys = ({
  fontfamily,
  setAttributes
}) => {
  return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("select", {
    value: fontfamily,
    onChange: event => setAttributes({
      fontfamily: event.target.value
    }),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }, fontfamilys.map((item, index) => {
    return wp.element.createElement("option", {
      key: index,
      value: item.className,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 13
      }
    }, item.title);
  })));
};
const Variation = ({
  variation,
  setAttributes
}) => {
  return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("select", {
    value: variation,
    onChange: event => setAttributes({
      variation: event.target.value
    }),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }
  }, variations.map((item, index) => {
    return wp.element.createElement("option", {
      key: index,
      value: item.className,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 13
      }
    }, item.title);
  })));
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('portart/bodytext', {
  title: '本文',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    text: {
      type: 'string',
      default: ''
    },
    variation: {
      type: 'string',
      default: 'c-text__normal'
    },
    fontfamily: {
      type: 'string',
      default: ''
    },
    addClassName: {
      type: 'string',
      default: ''
    },
    addId: {
      type: 'string',
      default: ''
    }
  },
  edit: ({
    className,
    attributes,
    attributes: {
      text,
      variation,
      fontfamily,
      addClassName,
      addId
    },
    setAttributes
  }) => {
    const onChangeClass = newText => {
      setAttributes({
        addClassName: newText
      });
    };
    const onChangeId = newId => {
      setAttributes({
        addId: newId
      });
    };
    return wp.element.createElement("div", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 7
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 9
      }
    }, wp.element.createElement(Variation, {
      variation: variation,
      setAttributes: setAttributes,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 11
      }
    }), wp.element.createElement(Familys, {
      fontfamily: fontfamily,
      setAttributes: setAttributes,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 11
      }
    }), wp.element.createElement(_component_CustomInner__WEBPACK_IMPORTED_MODULE_2__.CustomInnerButton, {
      attributes: attributes,
      setAttributes: setAttributes,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 11
      }
    })), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 9
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
      label: "\u8FFD\u52A0class",
      value: addClassName,
      onChange: onChangeClass,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132,
        columnNumber: 11
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
      label: "\u8FFD\u52A0Id",
      value: addId,
      onChange: onChangeId,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 11
      }
    })), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      value: text,
      onChange: newText => setAttributes({
        text: newText
      }),
      tagName: "p",
      placeholder: "\u672C\u6587\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
      keepPlaceholderOnFocus: true,
      className: variation + ' ' + fontfamily,
      inlineToolbar: true,
      id: "attr-text",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 9
      }
    }));
  },
  save: ({
    className,
    attributes: {
      text,
      variation,
      fontfamily,
      addId,
      addClassName
    }
  }) => {
    const fixClass = addClassName.replace(/\n/g, ' ');
    return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      value: text,
      tagName: "p",
      className: fixClass ? fixClass + ' ' + fontfamily : variations + ' c-text__normal ' + fontfamily,
      id: addId,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 9
      }
    }));
  }
});
}();
/******/ })()
;
//# sourceMappingURL=bodytext.js.map