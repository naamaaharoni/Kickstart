(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("wix"), require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["wix", "_"], factory);
	else if(typeof exports === 'object')
		exports["wixcode-namespaces"] = factory(require("wix"), require("_"));
	else
		root["wixcode-namespaces"] = factory(root["wix"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserErrors = {
  CLOSE_DIALOG: 'The user closed the login dialog',
  NO_LOGGED_IN: 'No user is currently logged in',
  AWAITING_APPROVAL: 'Member login request has been sent and is awaiting approval'
};

var UserRoles = {
  VISITOR: 'Visitor',
  MEMBER: 'Member',
  ADMIN: 'Admin'
};

var LoginStatus = {
  APPLICANT: 'APPLICANT',
  ACTIVE: 'ACTIVE'
};

exports.UserErrors = UserErrors;
exports.LoginStatus = LoginStatus;
exports.UserRoles = UserRoles;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _consts = __webpack_require__(1);

var _user = __webpack_require__(6);

var _user2 = _interopRequireDefault(_user);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _wixcodeSdk = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _core = _extends({}, _wixcodeSdk.core),
    extendCompSchema = _core.extendCompSchema,
    platformUtils = _core.platformUtils,
    postMessage = _core.postMessage,
    validation = _core.validation;

/**
 * @namespace wix-users
 * @summary The wix-users module contains functionality for working with your
 *  site's users.
 * @description
 *  There are three types of users:
 *
 *  + Visitor - A user who is not logged into your site.
 *  + Member - A user who is logged into your site.
 *  + Admin - The owner of the site.
 *
 *
 *  To use the Users API, import `wixUsers` from the `wix-users` module:
 *
 *    ``` javascript
 *    import wixUsers from 'wix-users';
 *    ```
 *
 * The APIs in `wix-users` can only be used in front-end code.
 *
 * @note
 *  The APIs in `wix-users` are only partially functional when previewing your site.
 *  View a published version of your site to see their complete functionality.
 *
 *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
 *  you must use them in code that is contained in or is called from the
 *  [onReady()]($w.html#onReady) event handler or any element event handler.
 */

/**
 * @class wix-users.User
 * @summary A site user.
 */

/**
 * @member id
 * @label property
 * @syntax get id(): String
 * @summary Gets the user's ID.
 * @type {external:String}
 * @memberof wix-users.User
 * @description
 * The unique ID of the user.
 * @note
 *  The APIs in `wix-users` are only partially functional when previewing your site.
 *  View a published version of your site to see their complete functionality.
 *
 *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
 *  you must use them in code that is contained in or is called from the
 *  [onReady()]($w.html#onReady) event handler or any element event handler.
 * @snippet [User-id.es6=Get the user's ID]
 * @snippet [Users-currentUser.es6=Get the current user's information]
 * @readonly
 */

/**
 * @member loggedIn
 * @label property
 * @syntax get loggedIn(): Boolean
 * @summary Indicates whether the user is logged in or not.
 * @type {external:Boolean}
 * @memberof wix-users.User
 * @description
 *  Gets one of the following:
 *  + `true` — The user is logged in.
 *  + `false` — The user is not logged in.
 *
 *
 * @note
 *  The APIs in `wix-users` are only partially functional when previewing your site.
 *  View a published version of your site to see their complete functionality.
 *
 *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
 *  you must use them in code that is contained in or is called from the
 *  [onReady()]($w.html#onReady) event handler or any element event handler.
 * @snippet [User-loggedIn.es6=Get whether the user is logged in or not]
 * @snippet [Users-currentUser.es6=Get the current user's information]
 * @readonly
 */

/**
 * @member role
 * @label property
 * @syntax get role(): String
 * @summary Gets the user's role.
 * @description
 *  Gets one of the following roles:
 *  + `"Admin"` — The owner of the site.
 *  + `"Member"` — A user who is logged in.
 *  + `"Visitor"` — A user who is not logged in.
 *
 *
 * @note
 *  The APIs in `wix-users` are only partially functional when previewing your site.
 *  View a published version of your site to see their complete functionality.
 *
 *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
 *  you must use them in code that is contained in or is called from the
 *  [onReady()]($w.html#onReady) event handler or any element event handler.
 * @type {external:String}
 * @memberof wix-users.User
 * @snippet [User-role.es6=Get the user's role]
 * @snippet [Users-currentUser.es6=Get the current user's information]
 * @readonly
 */

/**
 * @function getEmail
 * @summary Gets the email of the current user.
 * @syntax
 * function getEmail(): Promise&lt;String&gt;
 * @description
 * The `getEmail()` function returns a Promise that resolves to the email address
 * of the user that is logged in or rejects if the current user is not logged in.
 * @note
 *  The APIs in `wix-users` are only partially functional when previewing your site.
 *  View a published version of your site to see their complete functionality.
 *
 *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
 *  you must use them in code that is contained in or is called from the
 *  [onReady()]($w.html#onReady) event handler or any element event handler.
 * @returns {Promise}
 * @fulfill {external:String} The email address of the user that is logged in.
 * @reject {external:String} Message containing error that the current user is not logged in.
 * @snippet [User-getEmail.es6=Get the user's email address]
 * @snippet [Users-currentUser.es6=Get the current user's information]
 * @memberof wix-users.User
 * @instance
 */

extendCompSchema('Users', {
  mode: {
    schemaType: ['string'],
    enum: ['login', 'signup'],
    validations: {
      type: true
    } },
  lang: {
    schemaType: ['string'],
    maxLength: 2,
    minLength: 2,
    validations: {
      type: true,
      length: true
    } },
  onLogin: {
    schemaType: ['function'],
    validations: {
      type: true
    }
  },
  language: {
    schemaType: ['string'],
    maxLength: 2,
    minLength: 2,
    validations: {
      type: true,
      length: true
    }
  }
});

var Users = function () {
  function Users(appDefId) {
    _classCallCheck(this, Users);

    this.appDefId = appDefId;
  }

  /**
   * @member currentUser
   * @label property
   * @syntax
   * get currentUser(): User
   * @summary Gets the current user viewing the site.
   * @description
   *  Gets a [`User`](wix-users.User.html) object containing information about
   *  the user currently viewing the site.
   * @note
   *  The APIs in `wix-users` are only partially functional when previewing your site.
   *  View a published version of your site to see their complete functionality.
   *
   *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
   *  you must use them in code that is contained in or is called from the
   *  [onReady()]($w.html#onReady) event handler or any element event handler.
   * @snippet [Users-currentUser.es6=Get the current user's information]
   * @type {wix-users.User}
   * @memberof wix-users
   * @readonly
   */


  _createClass(Users, [{
    key: 'promptLogin',


    /**
     * @typedef {external:Object} wix-users~LoginOptions
     * @summary An object used by the `promptLogin()` function to determine how the login dialog box appears.
     * @property {external:String} [mode] What type of login experience to present: `"login"` or `"signup"`. Defaults to the option chosen in the Member Signup Settings panel in the Editor.
     * @property {external:String} [lang] The two letter language code of the language to show the login form in. Defaults to `"en"` if the property doesn't exist or the given language is not one of the languages found in the Permissions tab of the Page Settings panel in the Editor.
     * @snippet [Users-promptLogin_options.es6=Prompt the current user to login]
     * @see [promptLogin( )](#promptLogin)
     */

    /**
     * @function promptLogin
     * @syntax
     * function promptLogin([options: LoginOptions]): Promise&lt;User&gt;
     * @summary Prompts the current site visitor to log in as a site member.
     * @description
     *  The `promptLogin()` function returns a Promise that resolves to the newly
     *  logged in user when the login has completed.
     *
     *  The `promptLogin()` function cannot be called before the page is ready.
     * @note
     *  The APIs in `wix-users` are only partially functional when previewing your site.
     *  View a published version of your site to see their complete functionality.
     *
     *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
     *  you must use them in code that is contained in or is called from the
     *  [onReady()]($w.html#onReady) event handler or any element event handler.
     * @param {wix-users~LoginOptions} options The options that determine how the login dialog box appears.
     * @returns {Promise}
     * @fulfill {wix-users.User} Information about the newly logged in user.
     * @reject {external:String} Message that the dialog was canceled, or any other reason the user failed to log in.
     * @snippet [Users-promptLogin.es6=Prompt the current user to login]
     * @snippet [Users-promptLogin_options.es6=Prompt the current user to login with given options]
     * @see [promptForgotPassword( )](#promptForgotPassword)
     * @memberof wix-users
     */
    value: function promptLogin(options) {
      return new Promise(function (resolve, reject) {
        var requestParams = { callOnCancel: true };
        var language = _lodash2.default.get(options, 'lang');
        var mode = _lodash2.default.get(options, 'mode');

        if (!validation.validate('Users', 'promptLogin', options)) {
          reject();
          return;
        }

        if (mode) {
          requestParams.mode = mode;
        }

        if (language) {
          requestParams.language = language;
        }

        postMessage.sendMessage(postMessage.Intent.WIX_CODE_SITE_API, postMessage.MessageTypes.SM_REQUEST_LOGIN, requestParams, function (data, error) {
          if (error) {
            reject(error);
          } else if (data && data.wasCancelled) {
            reject(_consts.UserErrors.CLOSE_DIALOG);
          } else if (!data || !_lodash2.default.isObject(data.data)) {
            reject(_consts.UserErrors.NO_LOGGED_IN);
          } else if (data.data.status === _consts.LoginStatus.APPLICANT) {
            reject(_consts.UserErrors.AWAITING_APPROVAL);
          } else {
            resolve(new _user2.default({
              uid: data.data.id,
              permissions: data.data.owner
            }));
          }
        });
      });
    }

    /**
     * @function logout
     * @syntax
     * function logout(): void
     * @summary Logs the current user out of the site.
     * @description
     *  The `logout()` function logs the current user out of the site.
     * @note
     *  The APIs in `wix-users` are only partially functional when previewing your site.
     *  View a published version of your site to see their complete functionality.
     *
     *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
     *  you must use them in code that is contained in or is called from the
     *  [onReady()]($w.html#onReady) event handler or any element event handler.
     * @snippet [Users-logout.es6=Log out the current user]
     * @memberof wix-users
     */

  }, {
    key: 'logout',
    value: function logout() {
      return new Promise(function (resolve, reject) {
        postMessage.sendMessage(postMessage.Intent.WIX_CODE_SITE_API, postMessage.MessageTypes.SM_LOGOUT, null, function (data, error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }

    /**
     * @function promptForgotPassword
     * @syntax
     * function promptForgotPassword([language: String]): Promise&lt;void&gt;
     * @summary Prompts the current site visitor with a password reset.
     * @description
     *  The `promptForgotPassword()` function returns a Promise that resolves when
     *  the user has sumbitted the forgot password form.
     *
     *  The `promptForgotPassword()` function cannot be called before the page is ready.
     * @note
     *  The APIs in `wix-users` are only partially functional when previewing your site.
     *  View a published version of your site to see their complete functionality.
     *
     *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
     *  you must use them in code that is contained in or is called from the
     *  [onReady()]($w.html#onReady) event handler or any element event handler.
     * @param {external:String} [language] The language of the reset password form. Defaults to `"English"` if not passed or the given language is not one of the languages found in the Permissions tab of the Page Settings panel in the Editor.
     * @returns {Promise}
     * @fulfill {void}
     * @reject {external:String} Message that the dialog was canceled, user is already logged in, or any other reason the password reset failed.
     * @snippet [Users-promptForgotPassword.es6=Prompt the user with a password reset]
     * @snippet [Users-promptForgotPassword_options.es6=Prompt the current user to login with given language]
     * @see [promptLogin( )](#promptLogin)
     * @memberof wix-users
     */

  }, {
    key: 'promptForgotPassword',
    value: function promptForgotPassword(language) {
      return new Promise(function (resolve, reject) {
        var requestParams = _lodash2.default.isUndefined(language) ? {} : { language: language };

        if (!validation.validate('Users', 'promptForgotPassword', requestParams)) {
          reject();
          return;
        }

        postMessage.sendMessage(postMessage.Intent.WIX_CODE_SITE_API, postMessage.MessageTypes.SM_FORGOT_PASSWORD, requestParams, function (data, error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }

    /**
     * @callback $w.LoginHandler
     * @summary Function that runs when a user has logged in.
     * @param {wix-users.User} user The user that has logged in.
     */

    /**
     * @function onLogin
     * @syntax
     * function onLogin(handler: LoginHandler): void
     * callback LoginHandler(): void
     * @summary Sets the function that runs when a user logs in.
     * @description
     *  Use the `onLogin()` function for code you want to run after a user successfully
     *  logs into your site.
     *
     *  Usually, you want to call the `onLogin()` function in the **Site** tab of the
     *  code panel so that the `onLogin()` event handler will be run no matter which
     *  page on your site a user uses to log in.
     * @note
     *  The APIs in `wix-users` are only partially functional when previewing your site.
     *  View a published version of your site to see their complete functionality.
     *
     *  The APIs in `wix-users` can only be used once the page has loaded. Therefore,
     *  you must use them in code that is contained in or is called from the
     *  [onReady()]($w.html#onReady) event handler or any element event handler.
     * @param {$w.LoginHandler} handler The name of the function or the function expression to run when a user has logged in.
     * @snippet [Users-onLogin.es6=Run code when a user logs in]
     * @memberof wix-users
     *  @eventhandler
     *  @eventtype
     */

  }, {
    key: 'onLogin',
    value: function onLogin(callback) {
      var _this = this;

      if (!validation.validate('Users', 'onLogin', { onLogin: callback })) {
        return;
      }
      var RGI = platformUtils.getRGI();
      RGI.addOnUserLoginCallback(function () {
        callback(_this.currentUser);
      });
    }
  }, {
    key: 'naamaTest',
    value: function naamaTest() {
      console.log(111111111111);
    }
  }, {
    key: 'currentUser',
    get: function get() {
      var RGI = platformUtils.getRGI();
      var siteMemberData = RGI.getSiteMemberData(this.appDefId);
      return new _user2.default(siteMemberData);
    }
  }]);

  return Users;
}();

exports.default = Users;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _wixcodeSdk = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _core = _extends({}, _wixcodeSdk.core),
    _module = _core.module;

_module.register('wix-fo', function A() {
  _classCallCheck(this, A);
}, 'foo');

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _users = __webpack_require__(3);

var _users2 = _interopRequireDefault(_users);

var _wixcodeSdk = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _core = _extends({}, _wixcodeSdk.core),
    _module = _core.module;

_module.register('wix-users', _users2.default, 'user');

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _consts = __webpack_require__(1);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _wixcodeSdk = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(memberData) {
    _classCallCheck(this, User);

    if (memberData.uid) {
      this.id = memberData.uid;
      this.loggedIn = true;
      this.role = memberData.permissions ? _consts.UserRoles.ADMIN : _consts.UserRoles.MEMBER;
    } else {
      var _core = _extends({}, _wixcodeSdk.core),
          platformUtils = _core.platformUtils;

      var RGI = platformUtils.getRGI();
      this.id = _lodash2.default.get(RGI.getSessionInfo(), 'svSession');
      this.loggedIn = false;
      this.role = _consts.UserRoles.VISITOR;
    }
    if (memberData.instance) {
      this.instance = memberData.instance;
    }
    if (memberData.instanceId) {
      this.instanceId = memberData.instanceId;
    }
    this.getEmail = this.getEmail.bind(this);
  }

  _createClass(User, [{
    key: 'getEmail',
    value: function getEmail() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.loggedIn) {
          reject(_consts.UserErrors.NO_LOGGED_IN);
          return;
        }

        var _core2 = _extends({}, _wixcodeSdk.core),
            postMessage = _core2.postMessage;

        postMessage.sendMessage(postMessage.Intent.WIX_CODE_SITE_API, postMessage.MessageTypes.SM_CURRENT_USER_EMAIL, null, function (email, error) {
          if (error) {
            reject(error);
          } else {
            resolve(email);
          }
        });
      });
    }
  }]);

  return User;
}();

exports.default = User;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Foo = exports.Users = undefined;

var _Foo = __webpack_require__(4);

var _Foo2 = _interopRequireDefault(_Foo);

var _Users = __webpack_require__(5);

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Users = _Users2.default;
exports.Foo = _Foo2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=wixcode-namespaces.js.map