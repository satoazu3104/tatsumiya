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
/*!*************************************!*\
  !*** ./src/js/blocks/linkbutton.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/linkbutton.js";



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('portart/linkbutton', {
  title: 'リンクボタン',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    text: {
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
    },
    linkUrl: {
      type: 'string',
      default: ''
    },
    selectedPage: {
      type: 'object',
      default: null
    }
  },
  edit: ({
    attributes: {
      addClassName,
      addId,
      text,
      linkUrl
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
    const onChangeLinkUrl = newLinkUrl => {
      setAttributes({
        linkUrl: newLinkUrl
      });
    };
    const onSelectPage = page => {
      setAttributes({
        selectedPage: page
      });
    };
    return wp.element.createElement("div", {
      className: "c-button__wrap",
      style: {
        minWidth: 'unset'
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 7
      }
    }, wp.element.createElement("div", {
      className: "c-button",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      value: text,
      onChange: newText => setAttributes({
        text: newText
      }),
      tagName: "p",
      style: {
        color: 'black'
      },
      className: "",
      id: "attr-text",
      placeholder: "\u30DC\u30BF\u30F3\u30C6\u30AD\u30B9\u30C8\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
      keepPlaceholderOnFocus: true,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 11
      }
    })), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 9
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: "\u8FFD\u52A0class",
      value: addClassName,
      onChange: onChangeClass,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 11
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: "\u8FFD\u52A0Id",
      value: addId,
      onChange: onChangeId,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 11
      }
    }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.URLInput, {
      label: "\u30EA\u30F3\u30AFURL",
      value: linkUrl,
      onChange: onChangeLinkUrl,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 11
      }
    })));
  },
  save: ({
    className,
    attributes: {
      addClassName,
      addId,
      text,
      linkUrl
    }
  }) => {
    return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("a", {
      href: linkUrl,
      id: addId,
      className: `c-button__wrap c-button__trigger ${addClassName}`,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 9
      }
    }, wp.element.createElement("div", {
      className: "c-button__before",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 11
      }
    }), wp.element.createElement("div", {
      className: 'c-button__inner',
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99,
        columnNumber: 11
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      className: "p-text__button c-button__text",
      value: text,
      tagName: "p",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 13
      }
    })), wp.element.createElement("div", {
      className: "c-button__after",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 11
      }
    })));
  }
});
}();
/******/ })()
;
//# sourceMappingURL=linkbutton.js.map