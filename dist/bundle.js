/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	var MainComponent = (function () {
	    function MainComponent() {
	    }
	    MainComponent.prototype.init = function () {
	        this.el = document.querySelector("my-app");
	        this.render();
	    };
	    MainComponent.prototype.render = function () {
	        this.el.innerHTML = __webpack_require__(7);
	    };
	    return MainComponent;
	}());
	new MainComponent().init();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nbody, h1, h2, h3, p {\n  margin: 0; }\n\nbody {\n  margin: 0;\n  font-family: 'Roboto', \"Yu Gothic\", \"\\6E38\\30B4\\30B7\\30C3\\30AF\", 'Meiryo UI','\\30E1\\30A4\\30EA\\30AA'; }\n\nh1, h2 {\n  font-weight: 300; }\n\n.h2 {\n  font-weight: 400; }\n\nul {\n  margin: 0 0 10px 0; }\n\n.top-panel {\n  background-color: #00bcd4;\n  color: rgba(255, 255, 255, 0.870588);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  padding-bottom: 30px;\n  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; }\n\n.logo {\n  background-image: url(" + __webpack_require__(5) + ");\n  width: 300px;\n  height: 290px; }\n\n.content {\n  padding: 0 10px;\n  max-width: 900px;\n  margin: 20px auto 0 auto; }\n\n.section {\n  padding-top: 10px;\n  border-bottom: 1px solid #e8e8e8; }\n\n.section-body {\n  padding: 6px 0 0 10px; }\n\n.member-header {\n  padding: 6px;\n  display: flex;\n  align-items: center; }\n  .member-header .avatar {\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    margin-right: 10px;\n    background-color: #bcbcbc; }\n  .member-header .member-name {\n    font-size: 24px;\n    font-weight: 300; }\n\n.member-content {\n  padding: 6px;\n  margin-left: 10px; }\n\n.image-card {\n  position: relative;\n  width: 300px;\n  height: 240px;\n  overflow: hidden; }\n  .image-card .image-card-info {\n    position: absolute;\n    left: 0px;\n    right: 0px;\n    bottom: 0px;\n    height: 68px;\n    background: rgba(0, 0, 0, 0.4);\n    color: white;\n    padding: 10px 16px 0 16px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center; }\n    .image-card .image-card-info .image-card-info-title {\n      font-size: 16px;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap; }\n    .image-card .image-card-info .image-card-info-info {\n      font-size: 12px;\n      text-overflow: ellipsis;\n      overflow: hidden; }\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div id=\"app-bar\"></div>\r\n<div class=\"top-panel\">\r\n\t<div class=\"logo\"></div>\r\n\t<h1>Team J</h1>\r\n\t<h2>this is professional programing team by <b>nandemo jikyo J</b></h1>\r\n</div>\r\n<div class=\"content\">\r\n\t<div class=\"section\">\r\n\t\t<h2 class=\"h2\">\r\n\t\t\tAbout\r\n\t\t</h2>\r\n\t\t<div class=\"section-body\">\r\n\t\t\t<ul>\r\n\t\t\t\t<li>なんでも実況Ｊから終結されたプログラマー集団</li>\r\n\t\t\t\t<li>グレーな仕事も軽々とこなす</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"section\">\r\n\t\t<h2 class=\"h2\">\r\n\t\t\t目標\r\n\t\t</h2>\r\n\t\t<div class=\"section-body\">\r\n\t\t\t<dl>\r\n\t\t\t\t<dt class=\"list-title\">Phase.1</dt>\r\n\t\t\t\t<dd>\r\n\t\t\t\t\t<p>知名度を上げるアプリの作成</p>\r\n\t\t\t\t</dd>\r\n\t\t\t</dl>\r\n\r\n\t\t\t<dl>\r\n\t\t\t\t<dt class=\"list-title\">Phase.2</dt>\r\n\t\t\t\t<dd>\r\n\t\t\t\t\t<p>ネット上でプロフェッショナル集団として認知される</p>\r\n\t\t\t\t</dd>\r\n\t\t\t</dl>\r\n\t\t\t<dl>\r\n\t\t\t\t<dt class=\"list-title\">Phase.3</dt>\r\n\t\t\t\t<dd>\r\n\t\t\t\t\t<p>依頼された仕事をこなせるようになる</p>\r\n\t\t\t\t</dd>\r\n\t\t\t</dl>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"section\">\r\n\t\t<h2 class=\"h2\">\r\n\t\t\tMembers\r\n\t\t</h2>\r\n\t\t<div class=\"section-body\">\r\n\t\t\t<div class=\"member\">\r\n\t\t\t\t<div class=\"member-header\">\r\n\t\t\t\t\t<img src=\"./assets/yasuaki.png\" class=\"avatar\" />\r\n\t\t\t\t\t<div class=\"member-name\">yasuaki（リーダー）</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<!--<div class=\"member-content\">\r\n\t\t\t\t\t<dl>\r\n\t\t\t\t\t\t<dt class=\"list-title\">経歴</dt>\r\n\t\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t\t<li>高卒で工場に就職をするも、派遣エンジニアへ転職</li>\r\n\t\t\t\t\t\t\t<li>プログラマー歴9ヵ月</li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</dl>\r\n\t\t\t\t\t<dl>\r\n\t\t\t\t\t\t<dt class=\"list-title\">所持資格</dt>\r\n\t\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t\t<li>第二種電気工事士</li>\r\n\t\t\t\t\t\t\t<li>危険物取扱者乙４類</li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</dl>\r\n\t\t\t\t</div>-->\r\n\t\t\t</div>\r\n\t\t\t<div class=\"member\">\r\n\t\t\t\t<div class=\"member-header\">\r\n\t\t\t\t\t<img src=\"./assets/unti.png\" class=\"avatar\" />\r\n\t\t\t\t\t<div class=\"member-name\">うんち</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"member\">\r\n\t\t\t\t<div class=\"member-header\">\r\n\t\t\t\t\t<img src=\"./assets/user.png\" class=\"avatar\" />\r\n\t\t\t\t\t<div class=\"member-name\">やまだ</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"section\">\r\n\t\t<h2 class=\"h2\">\r\n\t\t\tTasks\r\n\t\t</h2>\r\n\t\t<div class=\"section-body\">\r\n\t\t\t<ul>\r\n\t\t\t\t<li>現代風デザインの2chブラウザの作成</li>\r\n\t\t\t\t<li>プロ野球のデータベースの作成</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"section\">\r\n\t\t<h2 class=\"h2\">\r\n\t\t\t成果物\r\n\t\t</h2>\r\n\t\t<div class=\"section-body\">\r\n\t\t\t<a href=\"http://jcloud.wktk.so/\" target=\"_blank\">\r\n\t\t\t\t<div class=\"image-card\">\r\n\t\t\t\t\t<img src=\"./assets/word_crowd.png\" class=\"image-card-img\" width=\"300px\" />\r\n\t\t\t\t\t<div class=\"image-card-info\">\r\n\t\t\t\t\t\t<div class=\"image-card-info-title\">\r\n\t\t\t\t\t\t\tなんJワーククラウド\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"image-card-info-info\">\r\n\t\t\t\t\t\t\tなんでも実況Jで今話題のワードを表すwebアプリ\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }
/******/ ]);