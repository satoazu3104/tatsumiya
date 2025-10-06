/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/tags.js":
/*!*******************************!*\
  !*** ./src/js/blocks/tags.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TAG_OPTIONS: function() { return /* binding */ TAG_OPTIONS; }
/* harmony export */ });
const TAG_OPTIONS = [{
  label: 'div',
  value: 'div'
}, {
  label: 'ul',
  value: 'ul'
}, {
  label: 'li',
  value: 'li'
}, {
  label: 'section',
  value: 'section',
  description: '文書のセクションを示す'
}, {
  label: 'article',
  value: 'article',
  description: '独立したコンテンツを表す'
}, {
  label: 'aside',
  value: 'aside',
  description: 'コンテンツの補足情報'
}, {
  label: 'header',
  value: 'header',
  description: '文書またはセクションのヘッダー'
}, {
  label: 'footer',
  value: 'footer',
  description: '文書またはセクションのフッター'
}, {
  label: 'nav',
  value: 'nav',
  description: 'ナビゲーションリンクの集合'
}, {
  label: 'h1',
  value: 'h1',
  description: '最も重要な見出し'
}, {
  label: 'h2',
  value: 'h2',
  description: '2番目に重要な見出し'
}, {
  label: 'h3',
  value: 'h3',
  description: '3番目に重要な見出し'
}, {
  label: 'h4',
  value: 'h4',
  description: '4番目に重要な見出し'
}, {
  label: 'h5',
  value: 'h5',
  description: '5番目に重要な見出し'
}, {
  label: 'h6',
  value: 'h6',
  description: '6番目に重要な見出し'
}, {
  label: 'main',
  value: 'main',
  description: '文書の主要な内容'
}, {
  label: 'figure',
  value: 'figure',
  description: '画像や図表のコンテナ'
}, {
  label: 'figcaption',
  value: 'figcaption',
  description: 'figureのキャプション'
}, {
  label: 'address',
  value: 'address',
  description: '連絡先情報'
}, {
  label: 'table',
  value: 'table',
  description: 'テーブル'
}, {
  label: 'caption',
  value: 'caption',
  description: 'テーブルのキャプション'
}, {
  label: 'thead',
  value: 'thead',
  description: 'テーブルのヘッダー'
}, {
  label: 'tbody',
  value: 'tbody',
  description: 'テーブルのボディ'
}, {
  label: 'tfoot',
  value: 'tfoot',
  description: 'テーブルのフッター'
}, {
  label: 'tr',
  value: 'tr',
  description: 'テーブルの行'
}, {
  label: 'th',
  value: 'th',
  description: 'テーブルのヘッダーセル'
}, {
  label: 'td',
  value: 'td',
  description: 'テーブルのデータセル'
}, {
  label: 'col',
  value: 'col',
  description: '列の定義'
}, {
  label: 'colgroup',
  value: 'colgroup',
  description: '列のグループ'
}, {
  label: 'details',
  value: 'details',
  description: '詳細情報'
}, {
  label: 'summary',
  value: 'summary',
  description: '詳細の概要'
}, {
  label: 'dialog',
  value: 'dialog',
  description: '対話ボックス'
}, {
  label: 'template',
  value: 'template',
  description: 'テンプレート'
}, {
  label: 'slot',
  value: 'slot',
  description: 'スロット'
}];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/*!**********************************!*\
  !*** ./src/js/blocks/wrapper.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tags */ "./src/js/blocks/tags.js");
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/wrapper.js";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }





const parseCustomDataAttrs = input => {
  const attrs = {};
  const regex = /(data-[\w-]+)=\"([^\"]*)\"/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('portart/wrapper', {
  title: 'wrapper',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    wrapToggle: {
      type: 'boolean',
      default: false
    },
    addClassName: {
      type: 'string',
      default: ''
    },
    addId: {
      type: 'string',
      default: ''
    },
    customDataAttrs: {
      type: 'string',
      default: ''
    },
    linkUrl: {
      type: 'string',
      default: ''
    },
    isChecked: {
      type: 'boolean',
      default: false
    },
    display: {
      type: 'string',
      default: ''
    },
    tagName: {
      type: 'string',
      default: 'div'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      addClassName,
      addId,
      customDataAttrs,
      linkUrl,
      wrapToggle,
      isChecked,
      display,
      tagName
    } = attributes;
    const toggleHandler = () => setAttributes({
      wrapToggle: !wrapToggle
    });
    return wp.element.createElement("div", {
      className: "b-wrapper__box",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 13
      }
    }, wp.element.createElement("div", {
      className: "b-wrapper__box__tool",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 17
      }
    }, wp.element.createElement("span", {
      className: "c-text__med b-wrapper__class",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 21
      }
    }, "Class\u540D: ", addClassName), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isSecondary: true,
      onClick: () => {
        setAttributes({
          display: display === '' ? 'pc' : display === 'pc' ? 'sp' : ''
        });
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 21
      }
    }, display ? `${display}のみ表示` : '両方表示'), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isSecondary: true,
      onClick: toggleHandler,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 21
      }
    }, wrapToggle ? '開く' : '折りたたむ')), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 17
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: "\u30E9\u30C3\u30D1\u30FC\u30BF\u30B0\u3092\u9078\u629E",
      value: tagName,
      options: _tags__WEBPACK_IMPORTED_MODULE_4__.TAG_OPTIONS,
      onChange: newTagName => setAttributes({
        tagName: newTagName
      }),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 21
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
      label: "\u8FFD\u52A0class",
      value: addClassName,
      onChange: value => setAttributes({
        addClassName: value
      }),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 21
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: "\u8FFD\u52A0Id",
      value: addId,
      onChange: value => setAttributes({
        addId: value
      }),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 21
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
      label: "\u8FFD\u52A0\u306Edata\u5C5E\u6027\uFF08\u8907\u6570\u53EF\uFF09",
      value: customDataAttrs,
      onChange: value => setAttributes({
        customDataAttrs: value
      }),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 21
      }
    }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.URLInput, {
      label: "\u30EA\u30F3\u30AFURL",
      value: linkUrl,
      onChange: value => setAttributes({
        linkUrl: value
      }),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 21
      }
    }), linkUrl && wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
      label: "\u5225\u30BF\u30D6\u3067\u30EA\u30F3\u30AF\u3092\u958B\u304F",
      checked: isChecked,
      onChange: checked => setAttributes({
        isChecked: checked
      }),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 25
      }
    })), wp.element.createElement("div", {
      style: {
        height: wrapToggle ? '0px' : 'auto',
        overflow: wrapToggle ? 'hidden' : 'unset'
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 17
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 21
      }
    })));
  },
  save: ({
    attributes
  }) => {
    const {
      addClassName,
      addId,
      customDataAttrs,
      linkUrl,
      isChecked,
      display,
      tagName
    } = attributes;
    const dataAttrs = parseCustomDataAttrs(customDataAttrs);
    const fixClass = classnames__WEBPACK_IMPORTED_MODULE_3___default()(addClassName.trim(), display);
    const wrapperAttrs = {
      id: addId || undefined,
      className: fixClass || undefined,
      ...dataAttrs
    };
    const TagName = tagName || 'div';
    return linkUrl ? wp.element.createElement("a", _extends({
      href: linkUrl,
      target: isChecked ? "_blank" : undefined,
      rel: isChecked ? "noopener noreferrer" : undefined
    }, wrapperAttrs, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 13
      }
    }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 17
      }
    })) : wp.element.createElement(TagName, _extends({}, wrapperAttrs, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 13
      }
    }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 17
      }
    }));
  }
});
}();
/******/ })()
;
//# sourceMappingURL=wrapper.js.map