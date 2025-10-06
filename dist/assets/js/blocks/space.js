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
/*!********************************!*\
  !*** ./src/js/blocks/space.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/sato/sato/serve/www/tatsumiya/wp-content/themes/origin/src/js/blocks/space.js";




const variations = {
  316160: {
    pc: 316,
    sp: 104
  },
  217120: {
    pc: 217,
    sp: 120
  },
  19280: {
    pc: 192,
    sp: 80
  },
  160100: {
    pc: 160,
    sp: 80
  },
  14080: {
    pc: 140,
    sp: 80
  },
  12080: {
    pc: 120,
    sp: 64
  },
  10464: {
    pc: 104,
    sp: 48
  },
  8864: {
    pc: 88,
    sp: 48
  },
  8048: {
    pc: 80,
    sp: 48
  },
  7248: {
    pc: 72,
    sp: 48
  },
  6448: {
    pc: 64,
    sp: 40
  },
  48_32: {
    pc: 48,
    sp: 32
  },
  40_24: {
    pc: 40,
    sp: 32
  },
  3248: {
    pc: 32,
    sp: 24
  },
  3216: {
    pc: 32,
    sp: 22
  },
  2216: {
    pc: 22,
    sp: 16
  }
};
const keys = Object.keys(variations);
const Variation = ({
  variation,
  setAttributes,
  setHeight
}) => {
  return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("select", {
    value: variation,
    onChange: event => {
      setAttributes({
        variation: event.target.value
      });
      setHeight(variations[event.target.value].pc);
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 7
    }
  }, keys.map(item => {
    return wp.element.createElement("option", {
      key: item,
      value: item,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 13
      }
    }, `PC:${variations[item].pc}px スマホ:${variations[item].sp}px`);
  })));
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('portart/space', {
  title: 'スペーサー',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    variation: {
      type: 'string',
      default: '4024'
    },
    addPc: {
      type: 'string',
      default: ''
    },
    addSp: {
      type: 'string',
      default: ''
    }
  },
  edit: ({
    className,
    attributes: {
      variation,
      addPc,
      addSp
    },
    setAttributes
  }) => {
    const initheight = addPc ? addPc : variation ? variations[variation].pc : variations['4024'].pc;
    const [height, setHeight] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(initheight);
    return wp.element.createElement("div", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120,
        columnNumber: 7
      }
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 9
      }
    }, wp.element.createElement(Variation, {
      variation: variation,
      setAttributes: setAttributes,
      setHeight: setHeight,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 11
      }
    })), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 9
      }
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: "PC\u30B9\u30DA\u30FC\u30B9",
      value: addPc,
      onChange: newPc => {
        setAttributes({
          addPc: newPc
        });
        setHeight(newPc);
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 11
      }
    }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: "SP\u30B9\u30DA\u30FC\u30B9",
      value: addSp,
      onChange: newSp => {
        setAttributes({
          addSp: newSp
        });
        setHeight(newSp);
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 11
      }
    })), wp.element.createElement("p", {
      style: {
        height: height + 'px',
        background: 'darkgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 9
      }
    }, "\u30B9\u30DA\u30FC\u30B9"));
  },
  save: ({
    className,
    attributes: {
      text,
      variation,
      addPc,
      addSp
    }
  }) => {
    const pc = addPc ? addPc : variation ? variations[variation]['pc'] : '120';
    const sp = addSp ? addSp : variation ? variations[variation]['sp'] : '120';
    return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("div", {
      className: "pc",
      style: {
        height: 'clamp(' + sp + 'px, ' + pc / 1920 * 100 + 'vw, ' + pc + 'px )'
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 9
      }
    }), wp.element.createElement("div", {
      className: "sp",
      style: {
        height: sp + 'px'
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 9
      }
    }));
  }
});
}();
/******/ })()
;
//# sourceMappingURL=space.js.map