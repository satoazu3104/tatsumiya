/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

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
/*!******************************************************************!*\
  !*** ./src/js/blocks/component/CustomInner/CustomInnerButton.js ***!
  \******************************************************************/
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
}();
/******/ })()
;
//# sourceMappingURL=CustomInnerButton.js.map