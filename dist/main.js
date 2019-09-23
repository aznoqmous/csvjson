/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/input-file-reader/src/input-file-reader.js":
/*!*****************************************************************!*\
  !*** ./node_modules/input-file-reader/src/input-file-reader.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return InputFileReader; });\nclass InputFileReader{\r\n  constructor(config){\r\n    this.config = Object.assign({\r\n      input: null, // must be declared on class instantiation\r\n      decimals: 0,\r\n\r\n      // callbacks\r\n      onFileSelect: null,\r\n      onProgress: null,\r\n      onLoaded: null\r\n    }, config)\r\n\r\n    this.bind()\r\n  }\r\n\r\n  bind(){\r\n    if(!this.config.input) console.warn('no input !')\r\n    this.config.input.addEventListener('change', (e)=>{\r\n      if(e.target.files.length) {\r\n        this.handleFileSelect(e.target.files[e.target.files.length-1])\r\n      }\r\n    })\r\n  }\r\n\r\n  handleFileSelect(f){\r\n    if(this.config.onFileSelect) this.config.onFileSelect(f)\r\n    this.readFile(f)\r\n  }\r\n\r\n  readFile(file){\r\n    let reader = new FileReader()\r\n    reader.onprogress = (e)=>{\r\n      if(this.config.onProgress) this.config.onProgress({\r\n        loaded: e.loaded,\r\n        total: e.total,\r\n        percent: Math.floor(e.loaded / e.total * Math.pow(10, this.config.decimals + 2) ) * 100 / Math.pow(10, this.config.decimals + 2) + '%'\r\n      })\r\n    }\r\n    reader.onloadend = (e)=>{\r\n      if (e.target.readyState == FileReader.DONE) {\r\n        if(this.config.onLoaded) this.config.onLoaded(e.srcElement.result)\r\n      }\r\n    }\r\n    reader.readAsBinaryString(file)\r\n  }\r\n\r\n\r\n  onFileSelect(callback){\r\n    this.config.onFileSelect = callback\r\n    return this\r\n  }\r\n  onProgress(callback){\r\n    this.config.onProgress = callback\r\n    return this\r\n  }\r\n  onLoaded(callback){\r\n    this.config.onLoaded = callback\r\n    return this\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/input-file-reader/src/input-file-reader.js?");

/***/ }),

/***/ "./src/csvjson.js":
/*!************************!*\
  !*** ./src/csvjson.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CSVJson; });\nclass CSVJson{\r\n  constructor(config){\r\n    this.config = Object.assign({\r\n      eol: '\\n',\r\n      eolToken: 'EOLEOLEOL',\r\n      separator: ';',\r\n      textDelimiter: '\"',\r\n      isFirstLineFieldName: true\r\n    }, config)\r\n\r\n  }\r\n\r\n  getJSON(data){\r\n    this.config.data = data;\r\n    this.init()\r\n    this.do()\r\n    return this.json()\r\n  }\r\n\r\n  init(){\r\n    this.fields = []\r\n    this.rows = []\r\n    this.config.separator = this.guessSeparator(this.config.data)\r\n    this.config.eol = this.guessEndOfLine(this.config.data)\r\n  }\r\n  guessEndOfLine(data){\r\n    if(data.split('\\r\\n').length) return '\\r\\n';\r\n    else return '\\n';\r\n  }\r\n  guessSeparator(data){\r\n    let separators = [',', ';']\r\n    let maxMatchs = 0\r\n    let maxMatchsSeparator = separators[0]\r\n    separators.map( separator => {\r\n      let matchs = data.split(separator).length\r\n      if (matchs > maxMatchs) {\r\n        maxMatchs = matchs\r\n        maxMatchsSeparator = separator\r\n      }\r\n    })\r\n    return maxMatchsSeparator;\r\n  }\r\n\r\n  do(){\r\n    if(this.config.isFirstLineFieldName) this.getFields()\r\n    this.getRows()\r\n  }\r\n\r\n  getFields(){\r\n    let firstLine = this.config.data.split(this.config.eol)[0]\r\n    this.fieldLine = firstLine\r\n    this.fields = this.fieldLine.split(this.config.separator)\r\n\r\n    let fields = []\r\n    this.fields.map(field => {\r\n      if(field == '') field = '_'\r\n      if(fields.includes(field)){\r\n        field += '('+fields.join('').split(field).length+')'\r\n      }\r\n      fields.push(field)\r\n    })\r\n    this.fields = fields\r\n  }\r\n\r\n  getRows(){\r\n    let textContents = this.config.data.match(new RegExp(`${this.config.separator}${this.config.textDelimiter}[^${this.config.separator}]*\\n.*?${this.config.textDelimiter}${this.config.separator}`, 'g'))\r\n    if(textContents) textContents.map( textContent => {\r\n      this.config.data = this.config.data.replace(textContent, textContent.replace(new RegExp('\\n', 'g'), this.config.eolToken))\r\n    } )\r\n\r\n    let rows = this.config.data.split(this.config.eol)\r\n    rows.map( row => {\r\n      if(row != this.fieldLine) this.addRow(row)\r\n    } )\r\n  }\r\n\r\n  addRow(row){\r\n    let values = row.split(this.config.separator)\r\n    let newRow = {}\r\n    this.fields.map( (field, i) => {\r\n      let value = values[i]\r\n      if(typeof(value) == 'string') value = value.replace(new RegExp(this.config.eolToken, 'g'), '\\n')\r\n      newRow[field] = value\r\n    } )\r\n    this.rows.push(newRow)\r\n  }\r\n\r\n  // exports\r\n  csv(){\r\n    let csv = '';\r\n    this.fields.map((field, i)=>{\r\n      csv += field\r\n      if(i < this.fields.length - 1) csv += this.config.separator\r\n    })\r\n    csv += this.config.eol\r\n\r\n    this.rows.map(row=>{\r\n      this.fields.map((field, i) =>{\r\n        csv += row[field]\r\n        if(i < this.fields.length - 1) csv += this.config.separator\r\n      })\r\n      csv += this.config.eol\r\n    })\r\n    return csv\r\n  }\r\n  json(){\r\n    return JSON.stringify(this.rows)\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/csvjson.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _csvjson_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./csvjson.js */ \"./src/csvjson.js\");\n/* harmony import */ var input_file_reader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! input-file-reader */ \"./node_modules/input-file-reader/src/input-file-reader.js\");\n\r\n\r\n\r\nwindow.CSVJson = _csvjson_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] // instatiations\r\nwindow.csvjson = new _csvjson_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]() // direct use\r\n\r\nwindow.InputFileReader = input_file_reader__WEBPACK_IMPORTED_MODULE_1__[\"default\"] // test purpose\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });