(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./resources/js/react/components/UI/AlertUI/AlertUI.js":
/*!*************************************************************!*\
  !*** ./resources/js/react/components/UI/AlertUI/AlertUI.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function (_ref) {
  var msg = _ref.msg;
  console.log('AlertUI render -> ' + new Date().toLocaleTimeString());
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "alert alert-danger",
    role: "alert"
  }, msg, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "close"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7")));
}));

/***/ })

}]);