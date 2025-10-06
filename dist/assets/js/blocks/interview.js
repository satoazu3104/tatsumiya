/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!************************************!*\
  !*** ./src/js/blocks/interview.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/interview.js";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// src/js/blocks/interview/index.js




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('portart/interview', {
  title: 'Interview',
  icon: 'admin-users',
  category: 'layout',
  attributes: {
    iconUrl: {
      type: 'string',
      default: '' // 回答前に表示するアイコン
    },
    qaList: {
      type: 'array',
      default: [{
        question: '',
        answer: ''
      }]
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      iconUrl,
      qaList
    } = attributes;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();

    // アイテム追加
    const addItem = () => {
      setAttributes({
        qaList: [...qaList, {
          question: '',
          answer: ''
        }]
      });
    };
    // アイテム削除
    const removeItem = idx => {
      const newList = qaList.filter((_, i) => i !== idx);
      setAttributes({
        qaList: newList
      });
    };
    // 質問・回答の変更
    const updateItem = (idx, key, val) => {
      const newList = qaList.map((item, i) => i === idx ? {
        ...item,
        [key]: val
      } : item);
      setAttributes({
        qaList: newList
      });
    };
    return wp.element.createElement("div", _extends({}, blockProps, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 13
      }
    }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 17
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: "\u56DE\u7B54\u30A2\u30A4\u30B3\u30F3",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 21
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 25
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
      onSelect: media => setAttributes({
        iconUrl: media.url
      }),
      allowedTypes: ['image'],
      value: iconUrl,
      render: ({
        open
      }) => iconUrl ? wp.element.createElement("div", {
        style: {
          textAlign: 'center'
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 41
        }
      }, wp.element.createElement("img", {
        src: iconUrl,
        style: {
          maxWidth: '100%',
          height: 'auto'
        },
        alt: "",
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 45
        }
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        isLink: true,
        isDestructive: true,
        onClick: () => setAttributes({
          iconUrl: ''
        }),
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 45
        }
      }, "\u524A\u9664")) : wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        onClick: open,
        isPrimary: true,
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 41
        }
      }, "\u30A2\u30A4\u30B3\u30F3\u3092\u9078\u629E"),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 29
      }
    })))), qaList.map((item, idx) => wp.element.createElement("div", {
      key: idx,
      style: {
        border: '1px solid #ddd',
        padding: '1rem',
        marginBottom: '1rem'
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99,
        columnNumber: 21
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: `質問 #${idx + 1}`,
      value: item.question,
      onChange: val => updateItem(idx, 'question', val),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 25
      }
    }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      tagName: "p",
      className: "interview-answer__text",
      placeholder: '回答を入力…',
      value: item.answer,
      onChange: val => updateItem(idx, 'answer', val),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 25
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isLink: true,
      isDestructive: true,
      onClick: () => removeItem(idx),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 25
      }
    }, "\u3053\u306E Q&A \u3092\u524A\u9664"))), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isSecondary: true,
      onClick: addItem,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 17
      }
    }, "Q&A \u3092\u8FFD\u52A0"));
  },
  save: ({
    attributes
  }) => {
    const {
      iconUrl,
      qaList
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
    return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("div", {
      className: "l-list__qa-group",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 17
      }
    }, qaList.map((item, idx) => wp.element.createElement("div", {
      className: "l-list__qa",
      key: idx,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 25
      }
    }, wp.element.createElement("div", {
      className: "c-item__ques js-scroll-up",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 29
      }
    }, wp.element.createElement("div", {
      className: "p-img__ques",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 33
      }
    }), wp.element.createElement("div", {
      className: "l-wrap__ques",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 33
      }
    }, wp.element.createElement("h4", {
      className: "p-text__body",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 150,
        columnNumber: 37
      }
    }, item.question))), wp.element.createElement("div", {
      className: "c-item__answer js-scroll-up",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 29
      }
    }, iconUrl && wp.element.createElement("img", {
      src: iconUrl,
      className: "p-img__answer",
      alt: "",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 37
      }
    }), wp.element.createElement("div", {
      className: "l-wrap__answer",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 33
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      tagName: "p",
      className: "p-text__body",
      value: item.answer,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 37
      }
    })))))));
  }
});
}();
/******/ })()
;
//# sourceMappingURL=interview.js.map