/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy small functions
 * @version 1.1.5
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2020.
 */
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

function _errorMessage(condition, message) {
  var isOK = true;

  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      console.error(message);
      isOK = false;
    }
  }

  return isOK;
}

function _objLen(value) {
  return (isArray(value) ? value : Object.keys(value)).length;
} // TODO: ADD COMMENTS
// Strict value object comparison


function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number';
}

function isBool(value) {
  return typeof value === 'boolean';
}

function isObject(value) {
  return _typeof(value) === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isArray(value) {
  return Array.isArray(value);
}

function isPromise(value) {
  if (Promise && Promise.resolve) {
    return Promise.resolve(value) === value;
  }

  return false;
}

function isDate(value) {
  return value instanceof Date;
}
/**
 * It validates if the given value has a length greater or equal to the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @param {boolean} isMoreOnly          - If you want to only validates that the length of value is more than the given size.
 * @returns {boolean}
 */


function moreOrEqual(value, size, isMoreOnly) {
  if (isMoreOnly === void 0) {
    isMoreOnly = false;
  }

  var isOK = _errorMessage(isNumber(value) || isBool(value), 'Only pass an Object, an Array or an String at the first parameter.');

  if (isOK) {
    var comp = isString(value) ? value.trim().length : _objLen(value);
    var res = comp >= size;

    if (isMoreOnly) {
      res = comp > size;
    }

    return res;
  }
}
/**
 * It validates if the given value has a length lower or equal to the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @param {boolean} isLessOnly          - If you want to only validates that the length of value is less than the given size.
 * @returns {boolean}
 */


function lessOrEqual(value, size, isLessOnly) {
  if (isLessOnly === void 0) {
    isLessOnly = false;
  }

  var isOK = _errorMessage(isNumber(value) || isBool(value), 'Only pass an Object, an Array or an String at the first parameter.');

  if (isOK) {
    var comp = isString(value) ? value.trim().length : _objLen(value);
    var res = comp <= size;

    if (isLessOnly) {
      res = comp < size;
    }

    return res;
  }
}
/**
 * It validates if the given value has the exact length as the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
 *
 * @example
 * exactSize([1, 2, 3, 4], 4); // true
 * exactSize({a: { c: 2 }, b: 'hello'}, 2); // true
 *
 * @param {(object|array|string)} value - The value to evaluate.
 * @param {number} size                 - The seed we will use to compare.
 * @returns {boolean}
 */


function exactSize(value, size) {
  var isOK = _errorMessage(isNumber(value) || isBool(value), 'Only pass an Object, an Array or an String at the first parameter.');

  if (isOK) {
    return (isString(value) ? value.length : _objLen(value)) === size;
  }
}
/**
 * It validates if the given value is NaN.
 *
 * @param {any} value - Any value to be checked that is NaN.
 * @returns {boolean}
 */


function nan(value) {
  return String(value) === 'NaN';
}
/**
 * It validates if a value is truthy but with slight modifications for Object and Array.
 *
 * @example
 * | type    | description                     |
 * |---------|---------------------------------|
 * | Objects | "{}" => false. "{a: 2}" => true |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => false. "[2]" => true    |
 * |---------|---------------------------------|
 *
 * @param {any} value - Any value to be checked.
 * @returns {boolean}
 */


function truthy(value) {
  var isTruthy = false;

  if (/^\d+$/.test(value)) {
    value = Number(value);
  }

  if (value && !nan(value)) {
    isTruthy = true;

    if (isObject(value) && Object.keys(value).length) {
      isTruthy = true;
    } else if (isObject(value) && !Object.keys(value).length) {
      isTruthy = false;
    }
  }

  return isTruthy;
}
/**
 * It validates if a value is falsy but with slight modifications for Object and Array.
 *
 * @example
 * | type    |  description                    |
 * |---------|---------------------------------|
 * | Objects | "{}" => true. "{a: 2}" => false |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => true. "[2]" => false    |
 * |---------|---------------------------------|
 *
 * @param {any} value - Any value to be checked
 * @returns {boolean}
 */


function falsy(value) {
  var isFalsy = false;

  if (!isPromise(value) && !value || nan(value)) {
    isFalsy = true;
  } else if (!isPromise(value) && isObject(value)) {
    if (!isDate(value)) {
      // check for dates
      isFalsy = !Boolean(Object.keys(value).length);
    }
  }

  return isFalsy;
}
/**
 * It validates if the given R.U.N is valid. - Chile ID.
 *
 * @param {string} value The given R.U.N.
 * @returns {boolean}
 */


function run(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
    var text = value.toLowerCase().trim().replace(/[.-]/g, '');
    var counter = 2;
    var total = 0;
    var size = text.length - 2;

    for (; size >= 0; size--, counter += 1) {
      if (counter > 7) {
        counter = 2;
      }

      total += Number(text[size]) * counter;
    }

    total = Number(11 - (total - 11 * Math.floor(total / 11)));
    var digit = String(total);

    if (total === 11) {
      digit = '0';
    } else if (total === 10) {
      digit = 'k';
    }

    return digit === text.slice(-1);
  }
}
/**
 * Validates that the given value has only words.
 *
 * @param {string} value - Value to match if it's valid
 * @returns {boolean}
 */


function alpha(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
    return /^[a-z\sа-яáéíóúäëïöüàèìòùñ]+$/i.test(value);
  }
}
/**
 * Validates if the value is a well formed email.
 *
 * @param {string} value - The email to check if it's valid
 * @returns {boolean}
 */


function email(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
    var isEmail = true;

    if (/^[\w\!#\$%&'.\*\+\-\/\=\?\^`\{\|\}~"\(\),\:;<>@\[\\\]\s]{1,64}@([a-z\d\-\[\]\:]{1,235}|\.[a-z]{1,20})+$/i.test(value.toLowerCase())) {
      var lastPosition = value.lastIndexOf('@');
      var localPart = value.slice(0, lastPosition);
      var domainPart = value.slice(lastPosition + 1, value.length); // Local part

      if (/^[.,]|[.,]$/.test(localPart)) {
        // Forbidden
        isEmail = false;
      } else if (/(\.{2,}|["\(\),\:;<>\[\\\]]|@+?)/g.test(localPart) && localPart.slice(0, 1) !== '"' && localPart.slice(-1) !== '"') {
        // Forbidden
        isEmail = false;
      } // Domain part


      if (isEmail) {
        isEmail = /^[\-]|[\-]$/.test(domainPart) ? false : true;
      }
    } else {
      isEmail = false;
    }

    return isEmail;
  }
}
/**
 * It validates that the given value has only numbers.
 *
 * @param {(string|number)} value Value to match if it's valid.
 * @returns {boolean}
 */


function number(value) {
  var num = Number(String(value).trim().replace(/[.,$]/g, ''));
  return nan(num) ? false : isNumber(num);
}
/**
 * It validates if the value is a valid well formed ip. (IPv4)
 *
 * @param {string} value - The ip to be checked.
 * @return {boolean}
 */


function ip(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
    var sections = value.split('.');

    if (sections.length === 4) {
      isOK = true;
      sections.forEach(function (section) {
        if (!/\b(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\b/.test(section)) {
          isOK = false;
        }
      });
    } else {
      isOK = false;
    }

    return isOK;
  }
}
/**
 * It validates if the value is a valid well formed URL.
 * based on: https://www.w3.org/Addressing/URL/url-spec.txt
 *
 * @example
 * is.url('http://google.cl');
 *
 * @param {string} value - An URL.
 * @return {boolean}
 */


function url(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
    var _a = value.split(':'),
        protocol = _a[0],
        rest = _a.slice(1);

    var isValid = false;

    if (protocol === 'http' || protocol === 'https' || protocol === 'ftp') {
      isValid = /^([0-65536]{2,4}|)\/\/[\w\d+-.]+\.\w+([\/\w\?=%;&]|:[0-65536]{2,4})+/.test(rest.join(':'));
    } else if (protocol === 'mailto') {
      var mailTo = value.replace('mailto', '');
      isValid = /^::[\w\d-+]+@[\w\d-+.]+/.test(mailTo);
    }

    return isValid;
  }
}
/**
 * It will set up a Password Strength Policy.
 * The returned function will check later if a password is valid under that policy.
 *
 * @param {object} rules             - The set of rules for your password
 * @param {number} rules.minLength   - Minimum size of characters
 * @param {number} rules.maxLength   - Maximum size of characters
 * @param {number} rules.minAlpha    - Minimum size of alpha characters
 * @param {number} rules.minNumber   - Minimum of numbers
 * @param {number} rules.minSameChar - Minimum of equal characters
 * @param {boolean} rules.allowSpace - If allow or not whitespace
 * @returns {function(string): any}
 */


function password(rules) {
  if (rules === void 0) {
    rules = null;
  }

  var isValid = {
    minLength: false,
    maxLength: false,
    minAlpha: false,
    minNumber: false,
    minSameChar: true,
    allowSpace: true
  };
  var callback = null;

  if (truthy(rules)) {
    callback = function callback(pwd) {
      if (process.env.NODE_ENV !== 'production') {
        if (rules.minLength < rules.minNumber + rules.minAlpha) {
          console.error("The minLength can't be less than the sum of the minNumber and minAlpha values. It can be equal or more.");
          return;
        }

        if (rules.maxLength < rules.minNumber + rules.minAlpha) {
          console.error("The maxLength can't be less than the sum of the minNumber and minAlpha values. It can be only equal.");
          return;
        }

        if (rules.maxLength < rules.minLength) {
          console.error("The maxLength can't be less than the minLength. It must be more.");
          return;
        }
      }

      var strPwd = pwd;
      isValid.minLength = strPwd.length >= rules.minLength;
      isValid.maxLength = strPwd.length <= rules.maxLength;
      var matchedWords = strPwd.match(/\D+/g).join('');
      isValid.minAlpha = matchedWords.length >= rules.minAlpha;
      var matchedNumbers = strPwd.match(/\d+/g).join('');
      isValid.minNumber = matchedNumbers.length >= rules.minNumber;

      if (rules.minSameChar) {
        var singleKeys = __spreadArrays(new Set(strPwd)).filter(function (s) {
          return !Number(s);
        });

        var size = singleKeys.length;
        var tmpPwd = strPwd.slice();

        while (size) {
          size -= 1;
          isValid.minSameChar = tmpPwd.split(singleKeys[size]).length - 1 >= rules.minSameChar;
        }
      }

      if (!rules.allowSpace) {
        isValid.allowSpace = strPwd.split(/\s+/g).length === 1;
      }

      var isValidPwd = Object.entries(isValid).map(function (_a) {
        var key = _a[0],
            value = _a[1];
        return !value ? {
          rule: key,
          value: value
        } : null;
      }).filter(function (v) {
        return v !== null;
      });
      return isValidPwd.length === 0 || isValidPwd;
    };
  }

  return callback;
} // ----------------------------------------------------------------------------------


var is = {
  moreOrEqual: moreOrEqual,
  lessOrEqual: lessOrEqual,
  exactSize: exactSize,
  password: password,
  truthy: truthy,
  number: number,
  email: email,
  falsy: falsy,
  alpha: alpha,
  nan: nan,
  run: run,
  url: url,
  ip: ip,
  // Base on primitive types
  function: isFunction,
  promise: isPromise,
  string: isString,
  object: isObject,
  array: isArray,
  date: isDate,
  bool: isBool
};
var isNot = new Proxy(is, {
  get: function get(obj, prop) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return !obj[prop].apply(null, args);
    };
  },
  set: function set(obj, prop) {
    if (process.env.NODE_ENV !== 'production') {
      // This will throw an exception when trying to overwrite any attribute of the Object
      return obj[prop];
    }
  }
});
module.exports = new Proxy(is, {
  get: function get(obj, prop) {
    return prop === 'not' ? isNot : obj[prop];
  },
  set: function set(obj, prop) {
    if (process.env.NODE_ENV !== 'production') {
      // This will throw an exception when trying to overwrite any attribute of the Object
      return obj[prop];
    }
  }
});