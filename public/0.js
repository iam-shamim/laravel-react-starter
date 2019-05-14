(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/validatorjs/src/async.js":
/*!***********************************************!*\
  !*** ./node_modules/validatorjs/src/async.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AsyncResolvers(onFailedOne, onResolvedAll) {
  this.onResolvedAll = onResolvedAll;
  this.onFailedOne = onFailedOne;
  this.resolvers = {};
  this.resolversCount = 0;
  this.passed = [];
  this.failed = [];
  this.firing = false;
}

AsyncResolvers.prototype = {

  /**
   * Add resolver
   *
   * @param {Rule} rule
   * @return {integer}
   */
  add: function(rule) {
    var index = this.resolversCount;
    this.resolvers[index] = rule;
    this.resolversCount++;
    return index;
  },

  /**
   * Resolve given index
   *
   * @param  {integer} index
   * @return {void}
   */
  resolve: function(index) {
    var rule = this.resolvers[index];
    if (rule.passes === true) {
      this.passed.push(rule);
    } else if (rule.passes === false) {
      this.failed.push(rule);
      this.onFailedOne(rule);
    }

    this.fire();
  },

  /**
   * Determine if all have been resolved
   *
   * @return {boolean}
   */
  isAllResolved: function() {
    return (this.passed.length + this.failed.length) === this.resolversCount;
  },

  /**
   * Attempt to fire final all resolved callback if completed
   *
   * @return {void}
   */
  fire: function() {

    if (!this.firing) {
      return;
    }

    if (this.isAllResolved()) {
      this.onResolvedAll(this.failed.length === 0);
    }

  },

  /**
   * Enable firing
   *
   * @return {void}
   */
  enableFiring: function() {
    this.firing = true;
  }

};

module.exports = AsyncResolvers;


/***/ }),

/***/ "./node_modules/validatorjs/src/attributes.js":
/*!****************************************************!*\
  !*** ./node_modules/validatorjs/src/attributes.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var replacements = {

  /**
   * Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  between: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1]
    });
  },

  /**
   * Required_if replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_if: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1]
    });
  },

  /**
   * Required_unless replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_unless: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1]
    });
  },

  /**
   * Required_with replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_with: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Required_with_all replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_with_all: function(template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(', ')
    });
  },

  /**
   * Required_without replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_without: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Required_without_all replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_without_all: function(template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(', ')
    });
  },

 /**
   * After replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  after: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Before replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  before: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before: this._getAttributeName(parameters[0])
    });
  },

  /**
   * After_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  after_or_equal: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after_or_equal: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Before_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  before_or_equal: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before_or_equal: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Same replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  same: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      same: this._getAttributeName(parameters[0])
    });
  },
};

function formatter(attribute) {
  return attribute.replace(/[_\[]/g, ' ').replace(/]/g, '');
}

module.exports = {
  replacements: replacements,
  formatter: formatter
};


/***/ }),

/***/ "./node_modules/validatorjs/src/errors.js":
/*!************************************************!*\
  !*** ./node_modules/validatorjs/src/errors.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Errors = function() {
  this.errors = {};
};

Errors.prototype = {
  constructor: Errors,

  /**
   * Add new error message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */
  add: function(attribute, message) {
    if (!this.has(attribute)) {
      this.errors[attribute] = [];
    }

    if (this.errors[attribute].indexOf(message) === -1) {
      this.errors[attribute].push(message);
    }
  },

  /**
   * Returns an array of error messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of error messages
   */
  get: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute];
    }

    return [];
  },

  /**
   * Returns the first error message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|false} First error message or false
   */
  first: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute][0];
    }

    return false;
  },

  /**
   * Get all error messages from all failing attributes
   *
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */
  all: function() {
    return this.errors;
  },

  /**
   * Determine if there are any error messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */
  has: function(attribute) {
    if (this.errors.hasOwnProperty(attribute)) {
      return true;
    }

    return false;
  }
};

module.exports = Errors;


/***/ }),

/***/ "./node_modules/validatorjs/src/lang.js":
/*!**********************************************!*\
  !*** ./node_modules/validatorjs/src/lang.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var Messages = __webpack_require__(/*! ./messages */ "./node_modules/validatorjs/src/messages.js");

__webpack_require__(/*! ./lang/en */ "./node_modules/validatorjs/src/lang/en.js");

var require_method = require;

var container = {

  messages: {},

  /**
   * Set messages for language
   *
   * @param {string} lang
   * @param {object} rawMessages
   * @return {void}
   */
  _set: function(lang, rawMessages) {
    this.messages[lang] = rawMessages;
  },

  /**
   * Set message for given language's rule.
   *
   * @param {string} lang
   * @param {string} attribute
   * @param {string|object} message
   * @return {void}
   */
  _setRuleMessage: function(lang, attribute, message) {
    this._load(lang);
    if (message === undefined) {
      message = this.messages[lang].def;
    }

    this.messages[lang][attribute] = message;
  },

  /**
   * Load messages (if not already loaded)
   *
   * @param  {string} lang
   * @return {void}
   */
  _load: function(lang) {
    if (!this.messages[lang]) {
      try {
        var rawMessages = __webpack_require__("./node_modules/validatorjs/src/lang sync recursive ^\\.\\/.*$")("./" + lang);
        this._set(lang, rawMessages);
      } catch (e) {}
    }
  },

  /**
   * Get raw messages for language
   *
   * @param  {string} lang
   * @return {object}
   */
  _get: function(lang) {
    this._load(lang);
    return this.messages[lang];
  },

  /**
   * Make messages for given language
   *
   * @param  {string} lang
   * @return {Messages}
   */
  _make: function(lang) {
    this._load(lang);
    return new Messages(lang, this.messages[lang]);
  }

};

module.exports = container;


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ar.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ar.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'الصفة :attribute يجب أن تكون مقبولة',
  after: 'الصفة :attribute يجب أن تكون بعد الصفة :after.',
  after_or_equal: 'الصفة :attribute يجب أن تكون مساوية أو بعد الصفة :after_or_equal.',
  alpha: 'حقل الصفة  :attribute يجب أن تحتوي على أحرف فقط',
  alpha_dash: 'حقل الصفة :attribute مسموح بأن يحتوي على حروف و أرقام و شرطة و شرطة منخفضة',
  alpha_num: 'حقل الصفة :attribute يجب أن يحتوي على أحرف و أرقام',
  before: 'الصفة :attribute يجب أن تكون قبل :before.',
  before_or_equal: 'الصفة :attribute يجب أن تكون مساوية أو قبل الصفة :before_or_equal.',
  between: 'حقل الصفة :attribute يجب أن يكون بين :min و :max.',
  confirmed: 'تأكيد الصفة :attribute غير متطابق.',
  email: 'الصفة :attribute صيغتها غير صحيحة',
  date: 'الصفة :attribute صيغتها ليست تاريخ صحيح',
  def: 'الصفة :attribute تحتوي على أخطاء',
  digits: 'الصفة :attribute يجب أن تكون :digits أرقام.',
  different: 'الصفة :attribute و الصفة :different يجب أن تكونا مختلفتين',
  'in': 'الصفة :attribute المختارة، غير صحيحة.',
  integer: 'الصفة :attribute يجب أن تكون عدد صحيح',
  hex: 'حقل الصفة :attribute يجب أن يحتوي على صيغة هكسيديسمل',
  min: {
    numeric: 'الصفة :attribute يجب أن تكون :min على الأقل',
    string: 'الصفة :attribute يجب أن تكون :min حرف على الأقل.'
  },
  max: {
    numeric: 'الصفة :attribute لا يمكن أن تكون أكبر من  :max.',
    string: 'الصفة :attribute يجب أن لا تكون أكثر من :max حرف.'
  },
  not_in: 'الصفة :attribute المختارة غير صحيحة.',
  numeric: 'الصفة :attribute يجب أن تكون رقما.',
  present: 'حقل الصفة :attribute يجب أن يكون معرفا ، يمكن أن يكون فارغا.',
  required: 'حقل الصفة :attribute مطلوب.',
  required_if: 'حقل الصفة :attribute مطلوب حين تكون قيمة الحقل :other تساوي :value.',
  required_unless: 'حقل الصفة :attribute مطلوب حين تكون قيم الحقل :other لا تساوي :value.',
  required_with: 'حقل الصفة :attribute مطلوب حين يكون الحقا :field غير فارغ.',
  required_with_all: 'حقل الصفة :attribute مطلوب حين تكون الحقول :fields غير فارغة.',
  required_without: 'حقل الصفة :attribute مطلوب حين يكون الحقل :field فارغا.',
  required_without_all: 'حقل الصفة :attribute مطلوب حين تكون الحقول :fields فارغة.',
  same: 'حقل الصفة :attribute و حقل الصفة :same يجب أن يتطابقا.',
  size: {
    numeric: 'الصفة :attribute يجب أن تكون :size.',
    string: 'الصفة :attribute يجب أن تكون :size حرفا.'
  },
  string: 'الصفة :attribute يجب أن تكون نص.',
  url: 'الصفة :attribute صياغتها غير صحيحة.',
  regex: 'الصفة :attribute صياغتها غير صحيحة.',
  attributes: {
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    email: 'البريد الالكتروني',
    website: 'الموقع الالكتروني',
    firstname: 'الاسم الاول',
    lastname: 'الاسم الاخير',
    subject: 'الموضوع',
    city: 'المدينة',
    region: 'المنطقة',
    country: 'الدولة',
    street: 'الشارع',
    zipcode: 'الرمز البريدي',
    phone: 'رقم الهاتف',
    mobile: 'رقم الجوال'
  }
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/az.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/az.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute qəbul edilməlidir',
  active_url: ':attribute doğru URL deyil',
  after: ':attribute :date tarixindən sonra olmalıdır',
  after_or_equal: ':attribute :date tarixi ilə eyni və ya sonra olmalıdır',
  alpha: ':attribute yalnız hərflərdən ibarət ola bilər',
  alpha_dash: ':attribute yalnız hərf, rəqəm və tire simvolundan ibarət ola bilər',
  alpha_num: ':attribute yalnız hərf və rəqəmlərdən ibarət ola bilər',
  array: ':attribute massiv formatında olmalıdır',
  before: ':attribute :date tarixindən əvvəl olmalıdır',
  before_or_equal: ':attribute :date tarixindən əvvəl və ya bərabər olmalıdır',
  between: {
    numeric: ':attribute :min ilə :max arasında olmalıdır',
    file: ':attribute :min ilə :max KB ölçüsü intervalında olmalıdır',
    string: ':attribute :min ilə :max simvolu intervalında olmalıdır',
    array: ':attribute :min ilə :max intervalında hissədən ibarət olmalıdır',
  },
  boolean: ' :attribute doğru və ya yanlış ola bilər',
  confirmed: ' :attribute doğrulanması yanlışdır',
  date: ' :attribute tarix formatında olmalıdır',
  date_format: ' :attribute :format formatında olmalıdır',
  different: ' :attribute və :other fərqli olmalıdır',
  digits: ' :attribute :digits rəqəmli olmalıdır',
  digits_between: ' :attribute :min ilə :max rəqəmləri intervalında olmalıdır',
  dimensions: ' :attribute doğru şəkil ölçülərində deyil',
  distinct: ' :attribute dublikat qiymətlidir',
  email: ' :attribute doğru email formatında deyil',
  exists: ' seçilmiş :attribute yanlışdır',
  file: ' :attribute fayl formatında olmalıdır',
  filled: ' :attribute qiyməti olmalıdır',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: ' :attribute şəkil formatında olmalıdır',
  in: ' seçilmiş :attribute yanlışdır',
  in_array: ' :attribute :other qiymətləri arasında olmalıdır',
  integer: ' :attribute tam ədəd olmalıdır',
  ip: ' :attribute İP adres formatında olmalıdır',
  ipv4: ' :attribute İPv4 adres formatında olmalıdır',
  ipv6: ' :attribute İPv6 adres formatında olmalıdır',
  json: ' :attribute JSON formatında olmalıdır',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: ' :attribute maksiumum :max rəqəmdən ibarət ola bilər',
    file: ' :attribute maksimum :max KB ölçüsündə ola bilər',
    string: ' :attribute maksimum :max simvoldan ibarət ola bilər',
    array: ' :attribute maksimum :max hədd\'dən ibarət ola bilər',
  },
  mimes: ' :attribute :values tipində fayl olmalıdır',
  mimetypes: ' :attribute :values tipində fayl olmalıdır',
  min: {
    numeric: ' :attribute minimum :min rəqəmdən ibarət ola bilər',
    file: ' :attribute minimum :min KB ölçüsündə ola bilər',
    string: ' :attribute minimum :min simvoldan ibarət ola bilər',
    array: ' :attribute minimum :min hədd\'dən ibarət ola bilər',
  },
  not_in: ' seçilmiş :attribute yanlışdır',
  numeric: ' :attribute rəqəmlərdən ibarət olmalıdır',
  present: ' :attribute iştirak etməlidir',
  regex: ' :attribute formatı yanlışdır',
  required: ' :attribute mütləqdir',
  required_if: ' :attribute (:other :value ikən) mütləqdir',
  required_unless: ' :attribute (:other :values \'ə daxil ikən) mütləqdir',
  required_with: ' :attribute (:values var ikən) mütləqdir',
  required_with_all: ' :attribute (:values var ikən) mütləqdir',
  required_without: ' :attribute (:values yox ikən) mütləqdir',
  required_without_all: ' :attribute (:values yox ikən) mütləqdir',
  same: ' :attribute və :other eyni olmalıdır',
  size: {
    numeric: ' :attribute :size ölçüsündə olmalıdır',
    file: ' :attribute :size KB ölçüsündə olmalıdır',
    string: ' :attribute :size simvoldan ibarət olmalıdır',
    array: ' :attribute :size hədd\'dən ibarət olmalıdır',
  },
  string: ' :attribute hərf formatında olmalıdır',
  timezone: ' :attribute ərazi formatında olmalıdır',
  unique: ' :attribute artıq iştirak edib',
  uploaded: ' :attribute yüklənməsi mümkün olmadı',
  url: ' :attribute formatı yanlışdır',

};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/be.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/be.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Вы павінны прыняць :attribute.',
  active_url: 'Поле :attribute утрымлівае несапраўдны URL.',
  after: 'У полі :attribute павінна быць дата пасля :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Поле :attribute можа мець толькі літары.',
  alpha_dash: 'Поле :attribute можа мець толькі літары, лічбы і злучок.',
  alpha_num: 'Поле :attribute можа мець толькі літары і лічбы.',
  array: 'Поле :attribute павінна быць масівам.',
  before: 'У полі :attribute павінна быць дата да :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Поле :attribute павінна быць паміж :min і :max.',
    file: 'Памер файла ў поле :attribute павінен быць паміж :min і :max кілабайт.',
    string: 'Колькасць сiмвалаў у поле :attribute павінна быць паміж :min і :max.',
    array: 'Колькасць элементаў у поле :attribute павінна быць паміж :min і :max.',
  },
  boolean: 'Поле :attribute павінна мець значэнне лагічнага тыпу.',
  confirmed: 'Поле :attribute не супадае з пацвярджэннем.',
  date: 'Поле :attribute не з\'яўляецца датай.',
  date_format: 'Поле :attribute не адпавядае фармату :format.',
  different: 'Палі :attribute і :other павінны адрознівацца.',
  digits: 'Даўжыня лічбавага поля :attribute павінна быць :digits.',
  digits_between: 'Даўжыня лічбавага поля :attribute павінна быць паміж :min і :max.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Поле :attribute павінна быць сапраўдным электронным адрасам.',
  file: 'The :attribute must be a file.',
  filled: 'Поле :attribute абавязкова для запаўнення.',
  exists: 'Выбранае значэнне для :attribute некарэктна.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'Поле :attribute павінна быць малюнкам.',
  in: 'Выбранае значэнне для :attribute памылкова.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Поле :attribute павінна быць цэлым лікам.',
  ip: 'Поле :attribute дпавінна быць сапраўдным IP-адрасам.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'Поле :attribute павінна быць JSON радком.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'Поле :attribute не можа быць больш :max.',
    file: 'Памер файла ў поле :attribute не можа быць больш :max кілабайт).',
    string: 'Колькасць сiмвалаў у поле :attribute не можа перавышаць :max.',
    array: 'Колькасць элементаў у поле :attribute не можа перавышаць :max.',
  },
  mimes: 'Поле :attribute павінна быць файлам аднаго з наступных тыпаў: :values.',
  mimetypes: 'Поле :attribute павінна быць файлам аднаго з наступных тыпаў: :values.',
  min: {
    numeric: 'Поле :attribute павінна быць не менш :min.',
    file: 'Памер файла ў полее :attribute павінен быць не менш :min кілабайт.',
    string: 'Колькасць сiмвалаў у поле :attribute павінна быць не менш :min.',
    array: 'Колькасць элементаў у поле :attribute павінна быць не менш :min.',
  },
  not_in: 'Выбранае значэнне для :attribute памылкова.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Поле :attribute павінна быць лікам.',
  present: 'The :attribute field must be present.',
  regex: 'Поле :attribute мае памылковы фармат.',
  required: 'Поле :attribute абавязкова для запаўнення.',
  required_if: 'Поле :attribute абавязкова для запаўнення, калі :other раўняецца :value.',
  required_unless: 'Поле :attribute абавязкова для запаўнення, калі :other не раўняецца :values.',
  required_with: 'Поле :attribute абавязкова для запаўнення, калі :values ўказана.',
  required_with_all: 'Поле :attribute абавязкова для запаўнення, калі :values ўказана.',
  required_without: 'Поле :attribute абавязкова для запаўнення, калі :values не ўказана.',
  required_without_all: 'Поле :attribute абавязкова для запаўнення, калі ні адно з :values не ўказана.',
  same: 'Значэнне :attribute павінна супадаць з :other.',
  size: {
    numeric: 'Поле :attribute павінна быць :size.',
    file: 'Размер файла в поле :attribute павінен быць :size кілабайт.',
    string: 'Колькасць сiмвалаў у поле :attribute павінна быць :size.',
    array: 'Колькасць элементаў у поле :attribute павінна быць :size.',
  },
  string: 'Поле :attribute павінна быць радком.',
  timezone: 'Поле :attribute павінна быць сапраўдным гадзінным поясам.',
  unique: 'Такое значэнне поля :attribute ўжо існуе.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Поле :attribute мае памылковы фармат.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/bg.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/bg.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Трябва да приемете :attribute.',
  active_url: 'Полето :attribute не е валиден URL адрес.',
  after: 'Полето :attribute трябва да бъде дата след :date.',
  after_or_equal: 'Полето :attribute трябва да бъде дата след или равна на :date.',
  alpha: 'Полето :attribute трябва да съдържа само букви.',
  alpha_dash: 'Полето :attribute трябва да съдържа само букви, цифри, долна черта и тире.',
  alpha_num: 'Полето :attribute трябва да съдържа само букви и цифри.',
  array: 'Полето :attribute трябва да бъде масив.',
  before: 'Полето :attribute трябва да бъде дата преди :date.',
  before_or_equal: 'Полето :attribute трябва да бъде дата преди или равна на :date.',
  between: {
    numeric: 'Полето :attribute трябва да бъде между :min и :max.',
    file: 'Полето :attribute трябва да бъде между :min и :max килобайта.',
    string: 'Полето :attribute трябва да бъде между :min и :max знака.',
    array: 'Полето :attribute трябва да има между :min - :max елемента.',
  },
  boolean: 'Полето :attribute трябва да съдържа Да или Не',
  confirmed: 'Полето :attribute не е потвърдено.',
  date: 'Полето :attribute не е валидна дата.',
  date_format: 'Полето :attribute не е във формат :format.',
  different: 'Полетата :attribute и :other трябва да са различни.',
  digits: 'Полето :attribute трябва да има :digits цифри.',
  digits_between: 'Полето :attribute трябва да има между :min и :max цифри.',
  dimensions: 'Невалидни размери за снимка :attribute.',
  distinct: 'Данните в полето :attribute се дублират.',
  email: 'Полето :attribute е в невалиден формат.',
  exists: 'Избранато поле :attribute вече съществува.',
  file: 'Полето :attribute трябва да бъде файл.',
  filled: 'Полето :attribute е задължително.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'Полето :attribute трябва да бъде изображение.',
  in: 'Избраното поле :attribute е невалидно.',
  in_array: 'Полето :attribute не съществува в :other.',
  integer: 'Полето :attribute трябва да бъде цяло число.',
  ip: 'Полето :attribute трябва да бъде IP адрес.',
  ipv4: 'Полето :attribute трябва да бъде IPv4 адрес.',
  ipv6: 'Полето :attribute трябва да бъде IPv6 адрес.',
  json: 'Полето :attribute трябва да бъде JSON низ.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'Полето :attribute трябва да бъде по-малко от :max.',
    file: 'Полето :attribute трябва да бъде по-малко от :max килобайта.',
    string: 'Полето :attribute трябва да бъде по-малко от :max знака.',
    array: 'Полето :attribute трябва да има по-малко от :max елемента.',
  },
  mimes: 'Полето :attribute трябва да бъде файл от тип: :values.',
  mimetypes: 'Полето :attribute трябва да бъде файл от тип: :values.',
  min: {
    numeric: 'Полето :attribute трябва да бъде минимум :min.',
    file: 'Полето :attribute трябва да бъде минимум :min килобайта.',
    string: 'Полето :attribute трябва да бъде минимум :min знака.',
    array: 'Полето :attribute трябва има минимум :min елемента.',
  },
  not_in: 'Избраното поле :attribute е невалидно.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Полето :attribute трябва да бъде число.',
  present: 'Полето :attribute трябва да съествува.',
  regex: 'Полето :attribute е в невалиден формат.',
  required: 'Полето :attribute е задължително.',
  required_if: 'Полето :attribute се изисква, когато :other е :value.',
  required_unless: 'Полето :attribute се изисква, освен ако :other не е в :values.',
  required_with: 'Полето :attribute се изисква, когато :values има стойност.',
  required_with_all: 'Полето :attribute е задължително, когато :values имат стойност.',
  required_without: 'Полето :attribute се изисква, когато :values няма стойност.',
  required_without_all: 'Полето :attribute се изисква, когато никое от полетата :values няма стойност.',
  same: 'Полетата :attribute и :other трябва да съвпадат.',
  size: {
    numeric: 'Полето :attribute трябва да бъде :size.',
    file: 'Полето :attribute трябва да бъде :size килобайта.',
    string: 'Полето :attribute трябва да бъде :size знака.',
    array: 'Полето :attribute трябва да има :size елемента.',
  },
  string: 'Полето :attribute трябва да бъде знаков низ.',
  timezone: 'Полето :attribute трябва да съдържа валидна часова зона.',
  unique: 'Полето :attribute вече съществува.',
  uploaded: 'Неуспешно качване на :attribute.',
  url: 'Полето :attribute е в невалиден формат.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/bs.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/bs.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Polje :attribute mora biti prihvaćeno.',
  active_url: 'Polje :attribute nije validan URL.',
  after: 'Polje :attribute mora biti datum poslije :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Polje :attribute može sadržati samo slova.',
  alpha_dash: 'Polje :attribute može sadržati samo slova, brojeve i povlake.',
  alpha_num: 'Polje :attribute može sadržati samo slova i brojeve.',
  array: 'Polje :attribute mora biti niz.',
  before: 'Polje :attribute mora biti datum prije :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Polje :attribute mora biti izmedju :min - :max.',
    file: 'Fajl :attribute mora biti izmedju :min - :max kilobajta.',
    string: 'Polje :attribute mora biti izmedju :min - :max karaktera.',
    array: 'Polje :attribute mora biti između :min - :max karaktera.',
  },
  boolean: 'Polje :attribute mora biti tačno ili netačno',
  confirmed: 'Potvrda polja :attribute se ne poklapa.',
  date: 'Polje :attribute nema ispravan datum.',
  date_format: 'Polje :attribute nema odgovarajući format :format.',
  different: 'Polja :attribute i :other moraju biti različita.',
  digits: 'Polje :attribute mora da sadži :digits brojeve.',
  digits_between: 'Polje :attribute mora biti između :min i :max broja.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Format polja :attribute mora biti validan email.',
  exists: 'Odabrano polje :attribute nije validno.',
  file: 'The :attribute must be a file.',
  filled: 'Polje :attribute je obavezno.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'Polje :attribute mora biti slika.',
  in: 'Odabrano polje :attribute nije validno.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Polje :attribute mora biti broj.',
  ip: 'Polje :attribute mora biti validna IP adresa.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'Polje :attribute mora biti manje od :max.',
    file: 'Polje :attribute mora biti manje od :max kilobajta.',
    string: 'Polje :attribute mora sadržati manje od :max karaktera.',
    array: 'Polje :attribute mora sadržati manje od :max karaktera.',
  },
  mimes: 'Polje :attribute mora biti fajl tipa: :values.',
  mimetypes: 'Polje :attribute mora biti fajl tipa: :values.',
  min: {
    numeric: 'Polje :attribute mora biti najmanje :min.',
    file: 'Fajl :attribute mora biti najmanje :min kilobajta.',
    string: 'Polje :attribute mora sadržati najmanje :min karaktera.',
    array: 'Polje :attribute mora sadržati najmanje :min karaktera.',
  },
  not_in: 'Odabrani element polja :attribute nije validan.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Polje :attribute mora biti broj.',
  present: 'The :attribute field must be present.',
  regex: 'Polje :attribute ima neispravan format.',
  required: 'Polje :attribute je obavezno.',
  required_if: 'Polje :attribute je obavezno kada :other je :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Polje :attribute je obavezno kada je :values prikazano.',
  required_with_all: 'Polje :attribute je obavezno kada je :values prikazano.',
  required_without: 'Polje :attribute je obavezno kada :values nije prikazano.',
  required_without_all: 'Polje :attribute je obavezno kada nijedno :values nije prikazano.',
  same: 'Polja :attribute i :other se moraju poklapati.',
  size: {
    numeric: 'Polje :attribute mora biti :size.',
    file: 'Fajl :attribute mora biti :size kilobajta.',
    string: 'Polje :attribute mora biti :size karaktera.',
    array: 'Polje :attribute mora biti :size karaktera.',
  },
  string: 'Polje :attribute mora sadrzavati slova.',
  timezone: 'Polje :attribute mora biti ispravna vremenska zona.',
  unique: 'Polje :attribute već postoji.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Format polja :attribute nije validan.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ca.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ca.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'El camp :attribute pot ser aceptat.',
  after: 'El camp :attribute pot ser una data posterior a :after.',
  alpha: 'El camp :attribute només pot contenir lletras.',
  alpha_dash: 'El camp :attribute només pot contenir lletras, nombres y guions.',
  alpha_num: 'El camp :attribute només pot contenir lletras y nombres.',
  attributes: {},
  between: 'El camp :attribute té que estar entre :min - :max.',
  confirmed: 'La confirmació de :attribute no coincideix.',
  different: 'El camp :attribute y :other poden ser diferents.',
  digits: 'El camp :attribute pot tindre :digits dígitos.',
  email: 'El camp :attribute no es un correu válido.',
  'in': 'El camp :attribute es invàlid.',
  integer: 'El camp :attribute pot ser un nombre enter.',
  hex: 'El camp :attribute hauria de tenir format hexadecimal',
  max: {
    numeric: 'El camp :attribute no pot ser mayor a :max.',
    string: 'El camp :attribute no pot ser mayor que :max caràcters.'
  },
  min: {
    numeric: 'La mida del camp :attribute pot ser de al menys :min.',
    string: 'El camp :attribute pot contenir al menys :min caràcters.'
  },
  not_in: 'El camp :attribute es invàlid.',
  numeric: 'El camp :attribute pot ser numéric.',
  present: 'El camp de :attribute pot estar present (però pot estar buit).',
  regex: 'El format del camp :attribute es invàlid.',
  required: 'El camp :attribute es obligatori.',
  required_if: 'El camp :attribute es obligatori quan :other es :value.',
  same: 'El camp :attribute y :other poden coincidir.',
  size: {
    numeric: 'La mida del camp :attribute pot ser :size.',
    string: 'El camp :attribute pot contenir :size caràcters.'
  },
  url: 'El format de :attribute es invàlid.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/cs.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/cs.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute musí být přijat.',
  active_url: ':attribute není platnou URL adresou.',
  after: ':attribute musí být datum po :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: ':attribute může obsahovat pouze písmena.',
  alpha_dash: ':attribute může obsahovat pouze písmena, číslice, pomlčky a podtržítka. České znaky (á, é, í, ó, ú, ů, ž, š, č, ř, ď, ť, ň) nejsou podporovány.',
  alpha_num: ':attribute může obsahovat pouze písmena a číslice.',
  array: ':attribute musí být pole.',
  before: ':attribute musí být datum před :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: ':attribute musí být hodnota mezi :min a :max.',
    file: ':attribute musí být větší než :min a menší než :max Kilobytů.',
    string: ':attribute musí být delší než :min a kratší než :max znaků.',
    array: ':attribute musí obsahovat nejméně :min a nesmí obsahovat více než :max prvků.',
  },
  boolean: ':attribute musí být true nebo false',
  confirmed: ':attribute nebylo odsouhlaseno.',
  date: ':attribute musí být platné datum.',
  date_format: ':attribute není platný formát data podle :format.',
  different: ':attribute a :other se musí lišit.',
  digits: ':attribute musí být :digits pozic dlouhé.',
  digits_between: ':attribute musí být dlouhé nejméně :min a nejvíce :max pozic.',
  dimensions: ':attribute má neplatné rozměry.',
  distinct: ':attribute má duplicitní hodnotu.',
  email: ':attribute není platný formát.',
  exists: 'Zvolená hodnota pro :attribute není platná.',
  file: ':attribute musí být soubor.',
  filled: ':attribute musí být vyplněno.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: ':attribute musí být obrázek.',
  in: 'Zvolená hodnota pro :attribute je neplatná.',
  in_array: ':attribute není obsažen v :other.',
  integer: ':attribute musí být celé číslo.',
  ip: ':attribute musí být platnou IP adresou.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: ':attribute musí být platný JSON řetězec.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: ':attribute musí být nižší než :max.',
    file: ':attribute musí být menší než :max Kilobytů.',
    string: ':attribute musí být kratší než :max znaků.',
    array: ':attribute nesmí obsahovat více než :max prvků.',
  },
  mimes: ':attribute musí být jeden z následujících datových typů :values.',
  mimetypes: ':attribute musí být jeden z následujících datových typů :values.',
  min: {
    numeric: ':attribute musí být větší než :min.',
    file: ':attribute musí být větší než :min Kilobytů.',
    string: ':attribute musí být delší než :min znaků.',
    array: ':attribute musí obsahovat více než :min prvků.',
  },
  not_in: 'Zvolená hodnota pro :attribute je neplatná.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute musí být číslo.',
  present: ':attribute musí být vyplněno.',
  regex: ':attribute nemá správný formát.',
  required: ':attribute musí být vyplněno.',
  required_if: ':attribute musí být vyplněno pokud :other je :value.',
  required_unless: ':attribute musí být vyplněno dokud :other je v :values.',
  required_with: ':attribute musí být vyplněno pokud :values je vyplněno.',
  required_with_all: ':attribute musí být vyplněno pokud :values je zvoleno.',
  required_without: ':attribute musí být vyplněno pokud :values není vyplněno.',
  required_without_all: ':attribute musí být vyplněno pokud není žádné z :values zvoleno.',
  same: ':attribute a :other se musí shodovat.',
  size: {
    numeric: ':attribute musí být přesně :size.',
    file: ':attribute musí mít přesně :size Kilobytů.',
    string: ':attribute musí být přesně :size znaků dlouhý.',
    array: ':attribute musí obsahovat právě :size prvků.',
  },
  string: ':attribute musí být řetězec znaků.',
  timezone: ':attribute musí být platná časová zóna.',
  unique: ':attribute musí být unikátní.',
  uploaded: 'Nahrávání :attribute se nezdařilo.',
  url: 'Formát :attribute je neplatný.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/cy.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/cy.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Rhaid derbyn :attribute.',
  active_url: 'Nid yw :attribute yn URL dilys.',
  after: 'Rhaid i :attribute fod yn ddyddiad sydd ar ôl :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: "Dim ond llythrennau'n unig gall :attribute gynnwys.",
  alpha_dash: 'Dim ond llythrennau, rhifau a dash yn unig gall :attribute gynnwys.',
  alpha_num: 'Dim ond llythrennau a rhifau yn unig gall :attribute gynnwys.',
  array: 'Rhaid i :attribute fod yn array.',
  before: 'Rhaid i :attribute fod yn ddyddiad sydd cyn :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Rhaid i :attribute fod rhwng :min a :max.',
    file: 'Rhaid i :attribute fod rhwng :min a :max kilobytes.',
    string: 'Rhaid i :attribute fod rhwng :min a :max nodyn.',
    array: 'Rhaid i :attribute fod rhwng :min a :max eitem.',
  },
  boolean: "Rhaid i'r maes :attribute fod yn wir neu gau.",
  confirmed: "Nid yw'r cadarnhad :attribute yn gyfwerth.",
  date: 'Nid yw :attribute yn ddyddiad dilys.',
  date_format: 'Nid yw :attribute yn y fformat :format.',
  different: 'Rhaid i :attribute a :other fod yn wahanol.',
  digits: 'Rhaid i :attribute fod yn :digits digid.',
  digits_between: 'Rhaid i :attribute fod rhwng :min a :max digid.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Rhaid i :attribute fod yn gyfeiriad ebost dilys.',
  file: 'The :attribute must be a file.',
  filled: 'Rhaid cynnwys :attribute.',
  exists: 'Nid yw :attribute yn ddilys.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'Rhaid i :attribute fod yn lun.',
  in: 'Nid yw :attribute yn ddilys.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Rhaid i :attribute fod yn integer.',
  ip: 'Rhaid i :attribute fod yn gyfeiriad IP dilys.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'Ni chai :attribute fod yn fwy na :max.',
    file: 'Ni chai :attribute fod yn fwy na :max kilobytes.',
    string: 'Ni chai :attribute fod yn fwy na :max nodyn.',
    array: 'Ni chai :attribute fod yn fwy na :max eitem.',
  },
  mimes: "Rhaid i :attribute fod yn ffeil o'r math: :values.",
  mimetypes: "Rhaid i :attribute fod yn ffeil o'r math: :values.",
  min: {
    numeric: 'Rhaid i :attribute fod o leiaf :min.',
    file: 'Rhaid i :attribute fod o leiaf :min kilobytes.',
    string: 'Rhaid i :attribute fod o leiaf :min nodyn.',
    array: 'Rhaid i :attribute fod o leiaf :min eitem.',
  },
  not_in: 'Nid yw :attribute yn ddilys.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Rhaid i :attribute fod yn rif.',
  present: 'The :attribute field must be present.',
  regex: 'Nid yw fformat :attribute yn ddilys.',
  required: 'Rhaid cynnwys :attribute.',
  required_if: 'Rhaid cynnwys :attribute pan mae :other yn :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Rhaid cynnwys :attribute pan mae :values yn bresennol.',
  required_with_all: 'Rhaid cynnwys :attribute pan mae :values yn bresennol.',
  required_without: 'Rhaid cynnwys :attribute pan nad oes :values yn bresennol.',
  required_without_all: 'Rhaid cynnwys :attribute pan nad oes :values yn bresennol.',
  same: 'Rhaid i :attribute a :other fod yn gyfwerth.',
  size: {
    numeric: 'Rhaid i :attribute fod yn :size.',
    file: 'Rhaid i :attribute fod yn :size kilobytes.',
    string: 'Rhaid i :attribute fod yn :size nodyn.',
    array: 'Rhaid i :attribute fod yn :size eitem.',
  },
  string: 'The :attribute must be a string.',
  timezone: 'Rhaid i :attribute fod yn timezone dilys.',
  unique: 'Mae :attribute eisoes yn bodoli.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Nid yw fformat :attribute yn ddilys.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/da.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/da.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute skal accepteres.',
  after: ':attribute skal være en dato efter :after.',
  after_or_equal: ':attribute skal være en dato efter eller lig med :after_or_equal.',
  alpha: ':attribute må kun bestå af bogstaver.',
  alpha_dash: ':attribute må kun bestå af bogstaver, tal og bindestreger.',
  alpha_num: ':attribute må kun bestå af bogstaver og tal.',
  before: ':attribute skal være en dato før :before.',
  before_or_equal: ':attribute skal være en dato før eller lig med :before_or_equal.',
  between: ':attribute skal være mellem :min og :max.',
  confirmed: ':attribute er ikke det samme som bekræftelsesfeltet.',
  email: ':attribute skal være en gyldig email.',
  date: ':attribute er ikke en gyldig dato.',
  def: ':attribute attributen har fejl.',
  digits: ':attribute skal have :digits cifre.',
  different: ':attribute og :different skal være forskellige.',
  in: 'Det valgte :attribute er ugyldigt.',
  integer: ':attribute skal være et heltal.',
  hex: ':attribute skal have hexadecimalt format',
  min: {
    numeric: ':attribute skal være mindst :min.',
    string: ':attribute skal være mindst :min tegn.'
  },
  max: {
    numeric: ':attribute skal være højest :max.',
    string: ':attribute skal være højest :max tegn.'
  },
  not_in: 'Den valgte :attribute er ugyldig',
  numeric: ':attribute skal være et tal.',
  present: ':attribute skal være tilstede.',
  required: ':attribute skal udfyldes.',
  required_if: ':attribute skal udfyldes når :other er :value.',
  required_unless: ':attribute er påkrævet medmindre :other findes i :values.',
  required_with: ':attribute skal udfyldes når :field er udfyldt.',
  required_with_all: ':attribute skal udfyldes når :fields er udfyldt.',
  required_without: ':attribute skal udfyldes når :field ikke er udfyldt.',
  required_without_all: ':attribute skal udfyldes når ingen af :fields er udfyldt.',
  same: ':attribute og :same skal være ens.',
  size: {
    numeric: ':attribute skal være :size.',
    string: ':attribute skal være :size tegn lang.'
  },
  string: ':attribute skal være en streng.',
  url: ':attribute formatet er ugyldigt.',
  regex: ':attribute formatet er ugyldigt.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/de.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/de.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Das :attribute Feld muss akzeptiert werden.',
  after: 'Das :attribute muss ein Datum nach dem :after sein.',
  after_or_equal: 'Das :attribute Datum muss kleiner oder gleich dem :after_or_equal sein.',
  alpha: 'Das :attribute Feld darf nur aus Buchstaben bestehen.',
  alpha_dash: 'Das :attribute Feld darf nur aus Buchstaben, Zahlen, Binde- und Unterstrichen bestehen.',
  alpha_num: 'Das :attribute Feld darf nur aus Buchstaben und Zahlen bestehen.',
  before: 'Das :attribute muss ein Datum vor dem :before sein.',
  before_or_equal: 'Das :attribute Datum muss größer oder gleich dem :before_or_equal sein.',
  between: 'Das :attribute Feld muss zwischen :min und :max liegen.',
  confirmed: 'Das :attribute Feld stimmt nicht mit der Bestätigung überein.',
  email: 'Das :attribute Format ist ungültig.',
  date: 'Das :attribute Feld muss ein gültiges Datum sein.',
  def: 'Das :attribute Feld hat Fehler.',
  digits: 'Das :attribute Feld muss :digits Stellen haben.',
  different: 'Die Felder :attribute und :different müssen sich unterscheiden.',
  'in': 'Der gewählte Wert für :attribute ist ungültig.',
  integer: 'Das :attribute Feld muss eine ganze Zahl sein.',
  hex: 'Das :attribute Feld sollte hexadezimal sein',
  min: {
    numeric: 'Das :attribute Feld muss mindestens :min sein.',
    string: 'Das :attribute Feld muss mindestens :min Zeichen lang sein.'
  },
  max: {
    numeric: 'Das :attribute Feld darf maximal :max sein.',
    string: 'Das :attribute Feld darf maximal :max Zeichen haben.'
  },
  not_in: 'Der gewählte Wert für :attribute ist ungültig.',
  numeric: 'Das :attribute Feld muss eine Zahl sein.',
  present: 'Das Feld :attribute muss vorhanden sein (kann aber leer sein).',
  required: 'Das :attribute Feld muss ausgefüllt sein.',
  required_if: 'Das :attribute Feld muss ausgefüllt sein, wenn :other :value ist.',
  same: 'Die Felder :attribute und :same müssen übereinstimmen.',
  size: {
    numeric: 'Das :attribute Feld muss gleich :size sein.',
    string: 'Das :attribute Feld muss :size Zeichen lang sein.'
  },
  string: 'Das :attribute Feld muss ein Satz sein.',
  url: 'Das Format von :attribute ist ungültig.',
  regex: 'Das :attribute Format ist ungültig.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/el.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/el.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Το πεδίο :attribute πρέπει να γίνει αποδεκτό.',
  after: 'Το πεδίο :attribute πρέπει να είναι μία ημερομηνία μετά από :after.',
  alpha: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα.',
  alpha_dash: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα, αριθμούς, και παύλες.',
  alpha_num: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα και αριθμούς.',
  between: 'Το πεδίο :attribute πρέπει να είναι μεταξύ :min και :max.',
  confirmed: 'Η επιβεβαίωση του :attribute δεν ταιριάζει.',
  email: 'Το πεδίο :attribute πρέπει να είναι μία έγκυρη διεύθυνση email.',
  date: 'Το πεδίο :attribute δεν είναι έγκυρη ημερομηνία.',
  def: 'Το πεδίο :attribute περιέχει σφάλματα.',
  digits: 'Το πεδίο :attribute πρέπει να είναι :digits ψηφία.',
  different: 'Το πεδίο :attribute  και :different πρέπει να είναι διαφορετικά.',
  'in': 'Το επιλεγμένο :attribute δεν είναι έγκυρο.',
  integer: 'Το πεδίο :attribute πρέπει να είναι ακέραιος.',
  hex: 'Το πεδίο :attribute πρέπει να είναι σε δεκαεξαδική μορφή.',
  min: {
    numeric: 'Το πεδίο :attribute πρέπει να είναι τουλάχιστον :min.',
    string: 'Το πεδίο :attribute πρέπει να έχει τουλάχιστον :min χαρακτήρες.'
  },
  max: {
    numeric: 'Το πεδίο :attribute δεν μπορεί να είναι μεγαλύτερο από :max.',
    string: 'Το πεδίο :attribute δεν μπορεί να έχει περισσότερους από :max χαρακτήρες.'
  },
  not_in: 'Το επιλεγμένο :attribute δεν είναι αποδεκτό.',
  numeric: 'Το πεδίο :attribute πρέπει να είναι αριθμός.',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'Το πεδίο :attribute είναι απαραίτητο.',
  required_if: 'Το πεδίο :attribute είναι απαραίτητο όταν το πεδίο :other είναι :value.',
  same: 'Τα πεδία :attribute και :same πρέπει να είναι ίδια.',
  size: {
    numeric: 'Το πεδίο :attribute πρέπει να είναι :size.',
    string: 'Το πεδίο :attribute πρέπει να είναι :size χαρακτήρες.'
  },
  string: 'Το πεδίο :attribute πρέπει να είναι αλφαριθμητικό.',
  url: 'Το πεδίο :attribute δεν είναι έγκυρη διεύθυνση URL.',
  regex: 'Η μορφή του :attribute δεν είναι αποδεκτή.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/en.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/en.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'The :attribute must be accepted.',
  after: 'The :attribute must be after :after.',
  after_or_equal: 'The :attribute must be equal or after :after_or_equal.',
  alpha: 'The :attribute field must contain only alphabetic characters.',
  alpha_dash: 'The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.',
  alpha_num: 'The :attribute field must be alphanumeric.',
  before: 'The :attribute must be before :before.',
  before_or_equal: 'The :attribute must be equal or before :before_or_equal.',
  between: 'The :attribute field must be between :min and :max.',
  confirmed: 'The :attribute confirmation does not match.',
  email: 'The :attribute format is invalid.',
  date: 'The :attribute is not a valid date format.',
  def: 'The :attribute attribute has errors.',
  digits: 'The :attribute must be :digits digits.',
  different: 'The :attribute and :different must be different.',
  'in': 'The selected :attribute is invalid.',
  integer: 'The :attribute must be an integer.',
  hex: 'The :attribute field should have hexadecimal format',
  min: {
    numeric: 'The :attribute must be at least :min.',
    string: 'The :attribute must be at least :min characters.'
  },
  max: {
    numeric: 'The :attribute may not be greater than :max.',
    string: 'The :attribute may not be greater than :max characters.'
  },
  not_in: 'The selected :attribute is invalid.',
  numeric: 'The :attribute must be a number.',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'The :attribute field is required.',
  required_if: 'The :attribute field is required when :other is :value.',
  required_unless: 'The :attribute field is required when :other is not :value.',
  required_with: 'The :attribute field is required when :field is not empty.',
  required_with_all: 'The :attribute field is required when :fields are not empty.',
  required_without: 'The :attribute field is required when :field is empty.',
  required_without_all: 'The :attribute field is required when :fields are empty.',
  same: 'The :attribute and :same fields must match.',
  size: {
    numeric: 'The :attribute must be :size.',
    string: 'The :attribute must be :size characters.'
  },
  string: 'The :attribute must be a string.',
  url: 'The :attribute format is invalid.',
  regex: 'The :attribute format is invalid.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/es.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/es.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'El campo :attribute debe ser aceptado.',
  after: 'El campo :attribute debe ser una fecha posterior a :after.',
  alpha: 'El campo :attribute solo debe contener letras.',
  alpha_dash: 'El campo :attribute solo debe contener letras, números y guiones.',
  alpha_num: 'El campo :attribute solo debe contener letras y números.',
  attributes: {},
  between: 'El campo :attribute tiene que estar entre :min - :max.',
  confirmed: 'La confirmación de :attribute no coincide.',
  different: 'El campo :attribute y :other deben ser diferentes.',
  digits: 'El campo :attribute debe tener :digits dígitos.',
  email: 'El campo :attribute no es un correo válido.',
  'in': 'El campo :attribute es inválido.',
  integer: 'El campo :attribute debe ser un número entero.',
  hex: 'El campo :attribute debe tener formato hexadecimal.',
  max: {
    numeric: 'El campo :attribute no debe ser mayor a :max.',
    string: 'El campo :attribute no debe ser mayor que :max caracteres.'
  },
  min: {
    numeric: 'El tamaño del campo :attribute debe ser de al menos :min.',
    string: 'El campo :attribute debe contener al menos :min caracteres.'
  },
  not_in: 'El campo :attribute es inválido.',
  numeric: 'El campo :attribute debe ser numérico.',
  present: 'El campo de :attribute debe estar presente (pero puede estar vacío).',
  regex: 'El formato del campo :attribute es inválido.',
  required: 'El campo :attribute es obligatorio.',
  required_if: 'El campo :attribute es obligatorio cuando :other es :value.',
  same: 'El campo :attribute y :other deben coincidir.',
  size: {
    numeric: 'El tamaño del campo :attribute debe ser :size.',
    string: 'El campo :attribute debe contener :size caracteres.'
  },
  url: 'El formato de :attribute es inválido.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/et.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/et.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute tuleb aktsepteerida.',
  active_url: ':attribute ei ole kehtiv URL.',
  after: ':attribute peab olema kuupäev pärast :date.',
  after_or_equal: ':attribute peab olema kuupäev pärast või samastuma :date.',
  alpha: ':attribute võib sisaldada vaid tähemärke.',
  alpha_dash: ':attribute võib sisaldada vaid tähti, numbreid ja kriipse.',
  alpha_num: ':attribute võib sisaldada vaid tähti ja numbreid.',
  array: ':attribute peab olema massiiv.',
  before: ':attribute peab olema kuupäev enne :date.',
  before_or_equal: ':attribute peab olema kuupäev enne või samastuma :date.',
  between: {
    numeric: ':attribute peab olema :min ja :max vahel.',
    file: ':attribute peab olema :min ja :max kilobaidi vahel.',
    string: ':attribute peab olema :min ja :max tähemärgi vahel.',
    array: ':attribute peab olema :min ja :max kirje vahel.',
  },
  boolean: ':attribute väli peab olema tõene või väär.',
  confirmed: ':attribute kinnitus ei vasta.',
  date: ':attribute pole kehtiv kuupäev.',
  date_format: ':attribute ei vasta formaadile :format.',
  different: ':attribute ja :other peavad olema erinevad.',
  digits: ':attribute peab olema :digits numbrit.',
  digits_between: ':attribute peab olema :min ja :max numbri vahel.',
  dimensions: ':attribute on valed pildi suurused.',
  distinct: ':attribute väljal on topeltväärtus.',
  email: ':attribute peab olema kehtiv e-posti aadress.',
  exists: 'Valitud :attribute on vigane.',
  file: ':attribute peab olema fail.',
  filled: ':attribute väli on nõutav.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: ':attribute peab olema pilt.',
  in: 'Valitud :attribute on vigane.',
  in_array: ':attribute väli ei eksisteeri :other sees.',
  integer: ':attribute peab olema täisarv.',
  ip: ':attribute peab olema kehtiv IP aadress.',
  ipv4: ':attribute peab olema kehtiv IPv4 aadress.',
  ipv6: ':attribute peab olema kehtiv IPv6 aadress.',
  json: ':attribute peab olema kehtiv JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: ':attribute ei tohi olla suurem kui :max.',
    file: ':attribute ei tohi olla suurem kui :max kilobaiti.',
    string: ':attribute ei tohi olla suurem kui :max tähemärki.',
    array: ':attribute ei tohi sisaldada rohkem kui :max kirjet.',
  },
  mimes: ':attribute peab olema :values tüüpi.',
  mimetypes: ':attribute peab olema :values tüüpi.',
  min: {
    numeric: ':attribute peab olema vähemalt :min.',
    file: ':attribute peab olema vähemalt :min kilobaiti.',
    string: ':attribute peab olema vähemalt :min tähemärki.',
    array: ':attribute peab olema vähemalt :min kirjet.',
  },
  not_in: 'Valitud :attribute on vigane.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute peab olema number.',
  present: ':attribute väli peab olema esindatud.',
  regex: ':attribute vorming on vigane.',
  required: ':attribute väli on nõutud.',
  required_if: ':attribute väli on nõutud, kui :other on :value.',
  required_unless: ':attribute väli on nõutud, välja arvatud, kui :other on :values.',
  required_with: ':attribute väli on nõutud, kui :values on esindatud.',
  required_with_all: ':attribute väli on nõutud, kui :values on esindatud.',
  required_without: ':attribute väli on nõutud, kui :values ei ole esindatud.',
  required_without_all: ':attribute väli on nõutud, kui ükski :values pole esindatud.',
  same: ':attribute ja :other peavad sobima.',
  size: {
    numeric: ':attribute peab olema :size.',
    file: ':attribute peab olema :size kilobaiti.',
    string: ':attribute peab olema :size tähemärki.',
    array: ':attribute peab sisaldama :size kirjet.',
  },
  string: ':attribute peab olema string.',
  timezone: ':attribute peab olema kehtiv tsoon.',
  unique: ':attribute on juba hõivatud.',
  uploaded: ':attribute ei õnnestunud laadida.',
  url: ':attribute vorming on vigane.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/eu.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/eu.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute onartua izan behar da.',
  active_url: ':attribute ez da baliozko URL bat.',
  after: ':attribute :date osteko data izan behar da.',
  after_or_equal: ':attribute :date osteko data edo data berdina izan behar da.',
  alpha: ':attribute hizkiak besterik ezin ditu izan.',
  alpha_dash: ':attribute hizkiak, zenbakiak eta marrak besterik ezin ditu izan.',
  alpha_num: ':attribute hizkiak eta zenbakiak besterik ezin ditu izan.',
  array: ':attribute bilduma izan behar da.',
  before: ':attribute :date aurreko data izan behar da.',
  before_or_equal: ':attribute :date aurreko data edo data berdina izan behar da.',
  between: {
    numeric: ':attribute :min eta :max artean egon behar da.',
    file: ':attribute-k :min eta :max kilobyte arteko pisua izan behar du.',
    string: ':attribute :min eta :max karaktere artean egon behar da.',
    array: ':attribute-k :min eta :max arteko ale kantitatea euki behar du.',
  },
  boolean: ':attribute-ren balioa egia edo gezurra izan behar da.',
  confirmed: ':attribute-ren konfirmazioa ez dator bat.',
  date: ':attribute ez da baliozko data.',
  date_format: ':attribute datak ez du :format formatua.',
  different: ':attribute eta :other ezberdinak izan behar dira.',
  digits: ':attribute-k :digits digitu euki behar ditu.',
  digits_between: ':attribute-k :min eta :max arteko digitu kantitatea euki behar du.',
  dimensions: ':attribute-k ez ditu irudi neurri aproposak.',
  distinct: ':attribute-k balio bikoiztua dauka.',
  email: ':attribute-k baliozko posta helbidea euki behar du.',
  exists: 'Hautatutako :attribute baliogabea da.',
  file: ':attribute fitxategi bat izan behar da.',
  filled: ':attribute-k balioren bat euki behar du.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: ':attribute irudi bat izan behar da.',
  in: 'Hautatutako :attribute baliogabea da.',
  in_array: ':attribute ez da :other-en existizen.',
  integer: ':attribute zenbaki osoa izan behar da.',
  ip: ':attribute baliozko IP helbidea izan behar da.',
  ipv4: ':attribute baliozko IPv4 helbidea izan behar da.',
  ipv6: ':attribute baliozko IPv6 helbidea izan behar da.',
  json: ':attribute-k baliozko JSON karaktere-katea euki behar du.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: ':attribute ezin da :max baino handiagoa izan.',
    file: ':attribute-k ezin du :max kilobyte baino gehiagoko pisua euki.',
    string: ':attribute-k ezin du :max karaktere baino gehiago euki.',
    array: ':attribute-k ezin du :max ale baino gehiago euki.',
  },
  mimes: ':attribute :values motatako fitxategia izan behar da.',
  mimetypes: ':attribute :values motatako fitxategia izan behar da.',
  min: {
    numeric: ':attribute-k gutxienez :min-eko tamaina izan behar du.',
    file: ':attribute-k gutxienez :min kilobyteko pisua euki behar du.',
    string: ':attribute-k gutxienez :min karaktere euki behar ditu.',
    array: ':attribute-k gutxienez :min ale euki behar ditu.',
  },
  not_in: 'Hautatutako :attribute baliogabea da.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute zenbaki bat izan behar da.',
  present: ':attribute bertan egon behar da.',
  regex: ':attribute-k ez dauka formatu egokirik.',
  required: ':attribute derrigorrezkoa da.',
  required_if: ':attribute derrigorrezkoa da :other :value denean.',
  required_unless: ':attribute derrigorrezkoa da :other :values-en egon ezean.',
  required_with: ':attribute derrigorrezkoa da :values bertan dagoenean.',
  required_with_all: ':attribute derrigorrezkoa da :values bertan dagoenean.',
  required_without: ':attribute derrigorrezkoa da :values bertan ez dagoenean.',
  required_without_all: ':attribute derrigorrezkoa da :values bertan ez dagoenean.',
  same: ':attribute eta :other bat etorri behar dira.',
  size: {
    numeric: ':attribute-k :size-eko tamaina izan behar du.',
    file: ':attribute-k :size kilobyteko pisua euki behar du.',
    string: ':attribute-k :size karaktere euki beha ditu.',
    array: ':attribute-k :size ale euki behar ditu.',
  },
  string: ':attribute karaktere-katea izan behar da.',
  timezone: ':attribute baliozko gunea izan behar da.',
  unique: ':attribute jadanik erregistratua izan da.',
  uploaded: ':attribute igotzerakoan huts egin du.',
  url: ':attribute-k ez dauka formatu egokirik.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/fa.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/fa.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'فیلد :attribute می بایست تایید شود',
  alpha: 'فیلد :attribute می بایست فقط شامل حروف انگلیسی باشد',
  alpha_dash: 'فیلد :attribute می بایست فقط شامل حروف انگلیسی و خط تیره و زیرخط باشد',
  alpha_num: 'فیلد :attribute می بایست فقط شامل حروف و اعداد باشد',
  between: 'فیلد :attribute می بایست بزرگتر از :min و کوچکتر از :max باشد',
  confirmed: 'تطبیق فیلد :attribute صحیح نمی باشد',
  email: 'فرمت ایمیل وارد شده در :attribute صحیح نمی‌باشد',
  date: 'تاریخ درج شده در فیلد :attribute صحیح نیست',
  def: 'فیلد :attribute اشکال دارد',
  digits: 'فیلد :attribute می بایست شامل :digits رقم باشد',
  different: 'فیلد :attribute می بایست مقداری غیر از :different داشته باشد',
  'in': 'فیلد :attribute انتخاب شده صحیح نمی باشد',
  integer: 'فیلد :attribute می بایست عددی باشد',
  hex: 'فیلد :attribute باید در فرمت مبنای ۱۶ باشد',
  min: {
    numeric: 'فیلد :attribute می بایست از :min بزرگتر باشد',
    string: 'فیلد :attribute بایستی حداقل :min کاراکتر طول داشته باشد'
  },
  max: {
    numeric: 'فیلد :attribute می بایست از :max کوچکتر باشد',
    string: 'فیلد :attribute نباید بیشتر از :max کاراکتر طول داشته باشد'
  },
  not_in: 'فیلد :attribute انتخاب شده صحیح نمی باشد',
  numeric: 'فیلد :attribute می بایست عددی باشد',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'فیلد :attribute الزامی است',
  required_if: 'در صورت دادن :value به :other تکمیل فیلد :attribute الزامی است',
  same: 'فیلد :attribute می بایست با فیلد :same یکی باشد',
  size: {
    numeric: 'فیلد :attribute می بایست :size باشد',
    string: 'فیلد :attribute می بایست :size کاراکتر طول داشته باشد'
  },
  string: 'فیلد :attribute می بایست متنی باشد',
  url: 'آدرس فیلد :attribute صحیح نمی باشد',
  regex: 'فرمت آدرس :attribute صحیح نمی باشد',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/fi.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/fi.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute on oltava hyväksytty.',
  after: ':attribute on oltava :after jälkeen.',
  after_or_equal: ':attribute täytyy olla sama kuin :after_or_equal tai sen jälkeen.',
  alpha: ':attribute kenttä saa sisältää ainoastaan kirjaimia.',
  alpha_dash: ':attribute kenttä saa sisältää ainoastaan kirjaimia tai numeroita, sekä pisteitä ja alaviivoja.',
  alpha_num: ':attribute kenttä saa sisältää ainoastaan kirjaimia tai numeroita.',
  before: ':attribute on oltava ennen kuin :before.',
  before_or_equal: ':attribute on oltava sama tai ennen kuin :before_or_equal.',
  between: ':attribute on oltava :min ja :max väliltä.',
  confirmed: ':attribute vahvistus ei täsmää.',
  email: ':attribute on väärässä muodossa.',
  date: ':attribute ei ole päivämäärä.',
  def: ':attribute sisältää virheitä.',
  digits: ':attribute on oltava :digits numeroa pitkä.',
  different: ':attribute ei saa olla yhtä kuin :different.',
  'in': 'Valittu :attribute ei kelpaa.',
  integer: ':attribute ei ole numero.',
  hex: ':attribute on oltava heksadesimaali.',
  min: {
    numeric: ':attribute on oltava vähintään :min.',
    string: ':attribute on oltava vähintään :min merkkiä pitkä.'
  },
  max: {
    numeric: ':attribute on oltava enintään :max.',
    string: ':attribute on oltava enintään :max merkkiä pitkä.'
  },
  not_in: 'Valittu :attribute ei kelpaa.',
  numeric: ':attribute on oltava numero.',
  present: ':attribute kenttä on oltava (mutta saa olla tyhjä).',
  required: ':attribute kenttä on pakollinen.',
  required_if: ':attribute kenttä on pakollinen, jos kenttä :other on :value.',
  required_unless: ':attribute kenttä on pakollinen, jos kenttä :other ei ole :value.',
  required_with: ':attribute kenttä on pakollinen, jos kenttä :field ei ole tyhjä.',
  required_with_all: ':attribute kenttä on pakollinen, jos kentät :fields eivät ole tyhjiä.',
  required_without: ':attribute kenttä on pakollinen, jos kenttä :field on tyhjä.',
  required_without_all: ':attribute kenttä on pakollinen, jos kentät :fields ovat tyhjiä.',
  same: ':attribute ja :same on oltava samat.',
  size: {
    numeric: ':attribute on oltava :size.',
    string: ':attribute on oltava :size merkkiä pitkä.'
  },
  string: ':attribute on oltava merkkijono.',
  url: ':attribute on väärässä muodossa.',
  regex: ':attribute on väärässä muodossa.',
  attributes: {}
};



/***/ }),

/***/ "./node_modules/validatorjs/src/lang/fr.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/fr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Le champ :attribute doit être accepté.',
  alpha: 'Le champ :attribute ne peut contenir que des caractères alphabétiques.',
  alpha_dash: 'Le champ :attribute ne peut contenir que des caractères alphanumériques, des tirets et des underscores.',
  alpha_num: 'Le champ :attribute ne peut contenir que des caractères alphanumériques.',
  between: 'La longueur du champ :attribute doit être comprise entre :min and :max.',
  confirmed: 'Le champ :attribute n\'est pas confirmé.',
  email: 'Le champ :attribute contient un format invalide.',
  def: 'Le champ :attribute contient un attribut erroné.',
  digits: 'Le champ :attribute doit être composé de :digits chiffres.',
  different: 'Les champs :attribute et :different doivent être différents.',
  'in': 'Le champ :attribute est invalide.',
  integer: 'Le champ :attribute doit être un entier.',
  hex: 'Le champ :attribute doit être au format hexadécimal.',
  min: {
    numeric: 'Le champ :attribute doit être supérieur à :min.',
    string: 'Le champ :attribute doit contenir plus de :min caractères.'
  },
  max: {
    numeric: 'Le champ :attribute doit être inférieur à :max.',
    string: 'Le champ :attribute doit contenir moins de :max caractères.'
  },
  not_in: 'Le champ :attribute est invalide.',
  numeric: 'Le champ :attribute doit être un chiffre.',
  present: 'Le champ :attribute doit être présent (mais peut être vide).',
  required: 'Le champ :attribute est requis.',
  required_if: 'Le champ :attribute est requis quand :other est :value.',
  same: 'Les champs :attribute et :same doivent correspondre.',
  size: {
    numeric: 'Le champ :attribute doit être égal à :size.',
    string: 'Le champ :attribute doit contenir :size caractères.'
  },
  url: 'Le format du champ :attribute est invalide.',
  regex: 'Le format du champ :attribute est invalide.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/hr.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/hr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Polje :attribute mora biti prihvaćeno.',
  active_url: 'Polje :attribute nije ispravan URL.',
  after: 'Polje :attribute mora biti datum nakon :date.',
  after_or_equal: 'Polje :attribute mora biti datum veći ili jednak :date.',
  alpha: 'Polje :attribute smije sadržavati samo slova.',
  alpha_dash: 'Polje :attribute smije sadržavati samo slova, brojeve i crtice.',
  alpha_num: 'Polje :attribute smije sadržavati samo slova i brojeve.',
  array: 'Polje :attribute mora biti niz.',
  before: 'Polje :attribute mora biti datum prije :date.',
  before_or_equal: 'Polje :attribute mora biti datum manji ili jednak :date.',
  between: {
    numeric: 'Polje :attribute mora biti između :min - :max.',
    file: 'Polje :attribute mora biti između :min - :max kilobajta.',
    string: 'Polje :attribute mora biti između :min - :max znakova.',
    array: 'Polje :attribute mora imati između :min - :max stavki.',
  },
  boolean: 'Polje :attribute mora biti false ili true.',
  confirmed: 'Potvrda polja :attribute se ne podudara.',
  date: 'Polje :attribute nije ispravan datum.',
  date_format: 'Polje :attribute ne podudara s formatom :format.',
  different: 'Polja :attribute i :other moraju biti različita.',
  digits: 'Polje :attribute mora sadržavati :digits znamenki.',
  digits_between: 'Polje :attribute mora imati između :min i :max znamenki.',
  dimensions: 'Polje :attribute ima neispravne dimenzije slike.',
  distinct: 'Polje :attribute ima dupliciranu vrijednost.',
  email: 'Polje :attribute mora biti ispravna e-mail adresa.',
  exists: 'Odabrano polje :attribute nije ispravno.',
  file: 'Polje :attribute mora biti datoteka.',
  filled: 'Polje :attribute je obavezno.',
  gt: {
    numeric: 'Polje :attribute mora biti veće od :value.',
    file: 'Polje :attribute mora biti veće od :value kilobajta.',
    string: 'Polje :attribute mora biti veće od :value karaktera.',
    array: 'Polje :attribute mora biti veće od :value stavki.',
  },
  gte: {
    numeric: 'Polje :attribute mora biti veće ili jednako :value.',
    file: 'Polje :attribute mora biti veće ili jednako :value kilobajta.',
    string: 'Polje :attribute mora biti veće ili jednako :value znakova.',
    array: 'Polje :attribute mora imati :value stavki ili više.',
  },
  image: 'Polje :attribute mora biti slika.',
  in: 'Odabrano polje :attribute nije ispravno.',
  in_array: 'Polje :attribute ne postoji u :other.',
  integer: 'Polje :attribute mora biti broj.',
  ip: 'Polje :attribute mora biti ispravna IP adresa.',
  ipv4: 'Polje :attribute mora biti ispravna IPv4 adresa.',
  ipv6: 'Polje :attribute mora biti ispravna IPv6 adresa.',
  json: 'Polje :attribute mora biti ispravan JSON string.',
  lt: {
    numeric: 'Polje :attribute mora biti manje od :value.',
    file: 'Polje :attribute mora biti manje od :value kilobajta.',
    string: 'Polje :attribute mora biti manje od :value znakova.',
    array: 'Polje :attribute mora biti manje od :value stavki.',
  },
  lte: {
    numeric: 'Polje :attribute mora biti manje ili jednako :value.',
    file: 'Polje :attribute mora biti manje ili jednako :value kilobajta.',
    string: 'Polje :attribute mora biti manje ili jednako :value znakova.',
    array: 'Polje :attribute ne smije imati više od :value stavki.',
  },
  max: {
    numeric: 'Polje :attribute mora biti manje od :max.',
    file: 'Polje :attribute mora biti manje od :max kilobajta.',
    string: 'Polje :attribute mora sadržavati manje od :max znakova.',
    array: 'Polje :attribute ne smije imati više od :max stavki.',
  },
  mimes: 'Polje :attribute mora biti datoteka tipa: :values.',
  mimetypes: 'Polje :attribute mora biti datoteka tipa: :values.',
  min: {
    numeric: 'Polje :attribute mora biti najmanje :min.',
    file: 'Polje :attribute mora biti najmanje :min kilobajta.',
    string: 'Polje :attribute mora sadržavati najmanje :min znakova.',
    array: 'Polje :attribute mora sadržavati najmanje :min stavki.',
  },
  not_in: 'Odabrano polje :attribute nije ispravno.',
  not_regex: 'Format polja :attribute je neispravan.',
  numeric: 'Polje :attribute mora biti broj.',
  present: 'Polje :attribute mora biti prisutno.',
  regex: 'Polje :attribute se ne podudara s formatom.',
  required: 'Polje :attribute je obavezno.',
  required_if: 'Polje :attribute je obavezno kada polje :other sadrži :value.',
  required_unless: 'Polje :attribute je obavezno osim :other je u :values.',
  required_with: 'Polje :attribute je obavezno kada postoji polje :values.',
  required_with_all: 'Polje :attribute je obavezno kada postje polja :values.',
  required_without: 'Polje :attribute je obavezno kada ne postoji polje :values.',
  required_without_all: 'Polje :attribute je obavezno kada nijedno od polja :values ne postoji.',
  same: 'Polja :attribute i :other se moraju podudarati.',
  size: {
    numeric: 'Polje :attribute mora biti :size.',
    file: 'Polje :attribute mora biti :size kilobajta.',
    string: 'Polje :attribute mora biti :size znakova.',
    array: 'Polje :attribute mora sadržavati :size stavki.',
  },
  string: 'Polje :attribute mora biti string.',
  timezone: 'Polje :attribute mora biti ispravna vremenska zona.',
  unique: 'Polje :attribute već postoji.',
  uploaded: 'Polje :attribute nije uspešno učitano.',
  url: 'Polje :attribute nije ispravnog formata.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/hu.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/hu.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'A(z) :attribute el kell legyen fogadva!',
  active_url: 'A(z) :attribute nem érvényes url!',
  after: 'A(z) :attribute :date utáni dátum kell, hogy legyen!',
  after_or_equal: 'A(z) :attribute nem lehet korábbi dátum, mint :date!',
  alpha: 'A(z) :attribute kizárólag betűket tartalmazhat!',
  alpha_dash: 'A(z) :attribute kizárólag betűket, számokat és kötőjeleket tartalmazhat!',
  alpha_num: 'A(z) :attribute kizárólag betűket és számokat tartalmazhat!',
  array: 'A(z) :attribute egy tömb kell, hogy legyen!',
  before: 'A(z) :attribute :date előtti dátum kell, hogy legyen!',
  before_or_equal: 'A(z) :attribute nem lehet későbbi dátum, mint :date!',
  between: {
    numeric: 'A(z) :attribute :min és :max közötti szám kell, hogy legyen!',
    file: 'A(z) :attribute mérete :min és :max kilobájt között kell, hogy legyen!',
    string: 'A(z) :attribute hossza :min és :max karakter között kell, hogy legyen!',
    array: 'A(z) :attribute :min - :max közötti elemet kell, hogy tartalmazzon!',
  },
  boolean: 'A(z) :attribute mező csak true vagy false értéket kaphat!',
  confirmed: 'A(z) :attribute nem egyezik a megerősítéssel.',
  date: 'A(z) :attribute nem érvényes dátum.',
  date_format: 'A(z) :attribute nem egyezik az alábbi dátum formátummal :format!',
  different: 'A(z) :attribute és :other értékei különbözőek kell, hogy legyenek!',
  digits: 'A(z) :attribute :digits számjegyű kell, hogy legyen!',
  digits_between: 'A(z) :attribute értéke :min és :max közötti számjegy lehet!',
  dimensions: 'A(z) :attribute felbontása nem megfelelő.',
  distinct: 'A(z) :attribute értékének egyedinek kell lennie!',
  email: 'A(z) :attribute nem érvényes email formátum.',
  exists: 'A(z) :attribute már létezik.',
  file: 'A(z) :attribute fájl kell, hogy legyen!',
  filled: 'A(z) :attribute megadása kötelező!',
  gt: {
    numeric: 'A(z) :attribute nagyobb kell, hogy legyen, mint :value!',
    file: 'A(z) :attribute mérete nagyobb kell, hogy legyen, mint :value kilobájt.',
    string: 'A(z) :attribute hosszabb kell, hogy legyen, mint :value karakter.',
    array: 'A(z) :attribute több, mint :value elemet kell, hogy tartalmazzon.',
  },
  gte: {
    numeric: 'A(z) :attribute nagyobb vagy egyenlő kell, hogy legyen, mint :value!',
    file: 'A(z) :attribute mérete nem lehet kevesebb, mint :value kilobájt.',
    string: 'A(z) :attribute hossza nem lehet kevesebb, mint :value karakter.',
    array: 'A(z) :attribute legalább :value elemet kell, hogy tartalmazzon.',
  },
  image: 'A(z) :attribute képfájl kell, hogy legyen!',
  in: 'A kiválasztott :attribute érvénytelen.',
  in_array: 'A(z) :attribute értéke nem található a(z) :other értékek között.',
  integer: 'A(z) :attribute értéke szám kell, hogy legyen!',
  ip: 'A(z) :attribute érvényes IP cím kell, hogy legyen!',
  ipv4: 'A(z) :attribute érvényes IPv4 cím kell, hogy legyen!',
  ipv6: 'A(z) :attribute érvényes IPv6 cím kell, hogy legyen!',
  json: 'A(z) :attribute érvényes JSON szöveg kell, hogy legyen!',
  lt: {
    numeric: 'A(z) :attribute kisebb kell, hogy legyen, mint :value!',
    file: 'A(z) :attribute mérete kisebb kell, hogy legyen, mint :value kilobájt.',
    string: 'A(z) :attribute rövidebb kell, hogy legyen, mint :value karakter.',
    array: 'A(z) :attribute kevesebb, mint :value elemet kell, hogy tartalmazzon.',
  },
  lte: {
    numeric: 'A(z) :attribute kisebb vagy egyenlő kell, hogy legyen, mint :value!',
    file: 'A(z) :attribute mérete nem lehet több, mint :value kilobájt.',
    string: 'A(z) :attribute hossza nem lehet több, mint :value karakter.',
    array: 'A(z) :attribute legfeljebb :value elemet kell, hogy tartalmazzon.',
  },
  max: {
    numeric: 'A(z) :attribute értéke nem lehet nagyobb, mint :max!',
    file: 'A(z) :attribute mérete nem lehet több, mint :max kilobájt.',
    string: 'A(z) :attribute hossza nem lehet több, mint :max karakter.',
    array: 'A(z) :attribute legfeljebb :max elemet kell, hogy tartalmazzon.',
  },
  mimes: 'A(z) :attribute kizárólag az alábbi fájlformátumok egyike lehet: :values.',
  mimetypes: 'A(z) :attribute kizárólag az alábbi fájlformátumok egyike lehet: :values.',
  min: {
    numeric: 'A(z) :attribute értéke nem lehet kisebb, mint :min!',
    file: 'A(z) :attribute mérete nem lehet kevesebb, mint :min kilobájt.',
    string: 'A(z) :attribute hossza nem lehet kevesebb, mint :min karakter.',
    array: 'A(z) :attribute legalább :min elemet kell, hogy tartalmazzon.',
  },
  not_in: 'A(z) :attribute értéke érvénytelen.',
  not_regex: 'A(z) :attribute formátuma érvénytelen.',
  numeric: 'A(z) :attribute szám kell, hogy legyen!',
  present: 'A(z) :attribute mező nem található!',
  regex: 'A(z) :attribute formátuma érvénytelen.',
  required: 'A(z) :attribute megadása kötelező!',
  required_if: 'A(z) :attribute megadása kötelező, ha a(z) :other értéke :value!',
  required_unless: 'A(z) :attribute megadása kötelező, ha a(z) :other értéke nem :values!',
  required_with: 'A(z) :attribute megadása kötelező, ha a(z) :values érték létezik.',
  required_with_all: 'A(z) :attribute megadása kötelező, ha a(z) :values értékek léteznek.',
  required_without: 'A(z) :attribute megadása kötelező, ha a(z) :values érték nem létezik.',
  required_without_all: 'A(z) :attribute megadása kötelező, ha egyik :values érték sem létezik.',
  same: 'A(z) :attribute és :other mezőknek egyezniük kell!',
  size: {
    numeric: 'A(z) :attribute értéke :size kell, hogy legyen!',
    file: 'A(z) :attribute mérete :size kilobájt kell, hogy legyen!',
    string: 'A(z) :attribute hossza :size karakter kell, hogy legyen!',
    array: 'A(z) :attribute :size elemet kell tartalmazzon!',
  },
  string: 'A(z) :attribute szöveg kell, hogy legyen.',
  timezone: 'A(z) :attribute nem létező időzona.',
  unique: 'A(z) :attribute már foglalt.',
  uploaded: 'A(z) :attribute feltöltése sikertelen.',
  url: 'A(z) :attribute érvénytelen link.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/id.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/id.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute harus disetujui.',
  after: ':attribute harus setelah :after.',
  after_or_equal: ':attribute harus sama dengan atau setelah :after_or_equal.',
  alpha: ':attribute hanya boleh berisi huruf.',
  alpha_dash: ':attribute hanya boleh berisi huruf, - atau _.',
  alpha_num: ':attribute hanya boleh berisi huruf dan angka.',
  before: ':attribute harus sebelum :before.',
  before_or_equal: ':attribute harus sama dengan atau sebelum :before_or_equal.',
  between: ':attribute harus berisi antara :min dan :max.',
  confirmed: ':attribute konfirmasi tidak sama.',
  email: ':attribute harus berupa email.',
  date: ':attribute format tanggal tidak benar.',
  def: ':attribute attribute has errors.',
  digits: ':attribute harus :digits digit.',
  different: ':attribute dan :different harus berbeda.',
  'in': ':attribute tidak benar.',
  integer: ':attribute harus berupa angka.',
  hex: ':attribute harus berformat heksadesimal',
  min: {
    numeric: ':attribute minimal :min.',
    string: ':attribute minimal :min karakter.'
  },
  max: {
    numeric: ':attribute harus lebih kecil :max.',
    string: ':attribute maksimal :max karakter.'
  },
  not_in: ':attribute tidak benar.',
  numeric: ':attribute harus berupa angka.',
  present: ':attribute harus ada (tapi boleh kosong).',
  required: ':attribute tidak boleh kosong.',
  required_if: ':attribute harus di isi jika :other berisi :value.',
  required_unless: ':attribute harus di isi jika :other tidak berisi :value.',
  required_with: ':attribute harus di isi jika :field tidak kosong.',
  required_with_all: ':attribute harus di isi jika :fields tidak kosong.',
  required_without: ':attribute harus di isi jika :field kosong.',
  required_without_all: ':attribute harus di isi jika :fields kosong.',
  same: ':attribute dan :same harus sama.',
  size: {
    numeric: ':attribute harus berisi :size.',
    string: ':attribute harus berisi :size karakter.'
  },
  string: ':attribute harus berupa string.',
  url: ':attribute harus berupa format url.',
  regex: ':attribute format tidak benar.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/it.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/it.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Il campo :attribute deve essere accettato.',
  alpha: 'Il campo :attribute deve contenere sono caratteri alfabetici.',
  alpha_dash: 'Il campo :attribute può contenere solo caratteri alfanumerici oltre a trattini e trattini bassi.',
  alpha_num: 'Il campo :attribute deve essere alfanumerico.',
  between: 'Il campo :attribute deve essere compreso tra :min e :max.',
  confirmed: 'Il campo conferma :attribute non è uguale.',
  email: 'Il formato dell\'attributo :attribute non è valido.',
  def: 'Gli attributi del campo :attribute contengono degli errori.',
  digits: 'Il campo :attribute deve essere di :digits cifre.',
  different: 'Il campo :attribute e :different devo essere diversi.',
  'in': 'Il valore del campo :attribute non è valido.',
  integer: 'Il campo :attribute deve essere un valore intero.',
  hex: 'Il campo :attribute deve essere in formato esadecimale',
  min: {
    numeric: 'Il campo :attribute deve essere maggiore o uguale di :min.',
    string: 'Il campo :attribute deve essere composto da almeno :min caratteri.'
  },
  max: {
    numeric: 'Il campo :attribute deve essere minore o uguale di :max.',
    string: 'Il campo :attribute deve essere composto da massimo :max caratteri.'
  },
  not_in: 'Il campo :attribute non è valido.',
  numeric: 'Il campo :attribute deve essere un numero.',
  present: 'Il campo :attribute deve essere presente (ma può essere vuoto).',
  required: 'Il campo :attribute è richiesto.',
  required_if: 'Il campo :attribute è richiesto quando il campo :other è uguale a :value.',
  same: 'I campi :attribute e :same devono essere uguali.',
  size: {
    numeric: 'La dimensione del campo :attribute deve essere uguale a :size.',
    string: 'Il campo :attribute deve essere di :size caratteri.'
  },
  string: 'Il campo :attribute deve essere una stringa.',
  url: 'Il formato del campo :attribute non è valido.',
  regex: 'Il formato del campo :attribute non è valido.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ja.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ja.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attributeを確認してください。',
  after: ':attributeは:afterより後の日付を入力してください。',
  after_or_equal: ':attributeは:after_or_equal以降の日付を入力してください。',
  alpha: ':attributeは英字のみで入力してください。',
  alpha_dash: ':attributeは英字とダッシュと下線のみで入力してください。',
  alpha_num: ':attributeは英数字のみで入力してください。',
  before: ':attributeは:beforeより前の日付を入力してください。',
  before_or_equal: ':attributeは:before_or_equal以前の日付を入力してください。',
  between: ':attributeは:min〜:max文字で入力してください。',
  confirmed: ':attributeは確認が一致しません。',
  email: ':attributeは正しいメールアドレスを入力してください。',
  date: ':attributeは正しい日付形式を入力してください',
  def: ':attributeは検証エラーが含まれています。',
  digits: ':attributeは:digitsの数字のみで入力してください。',
  different: ':attributeと:differentは同じであってはなりません。',
  'in': '選択された:attributeは無効です。',
  integer: ':attributeは整数で入力してください。',
  hex: ':attributeは16進数で入力してください。',
  min: {
    numeric: ":attributeは:min以上で入力してください。",
    string: ":attributeは:min文字以上で入力してください。"
  },
  max: {
    numeric: ":attributeは:max以下で入力してください。",
    string: ":attributeは:max文字以下で入力してください。"
  },
  not_in: "選択された:attributeは無効です。",
  numeric: ":attributeは数値で入力してください。",
  present: ':attributeを入力してください（空欄も可能です）。',
  required: ":attributeは必須です。",
  required_if: ":otherは:valueになったら:attributeは必須です。",
  required_unless: ':otherが:valueでなければ:attributeは必須です。',
  required_with: ':fieldが空欄でなければ:attributeは必須です。',
  required_with_all: ':fieldsが空欄でなければ:attributeは必須です。',
  required_without: ':fieldが空欄なら:attributeは必須です。',
  required_without_all: ':fieldsが空欄なら:attributeは必須です。',
  same: ":attributeと:sameは同じでなければなりません。",
  size: {
    numeric: ":attributeは:sizeを入力してください。",
    string: ":attributeは:size文字で入力してください。"
  },
  string: ':attributeは文字のみで入力してください。',
  url: ":attributeは正しいURIを入力してください。",
  regex: ":attributeの値はパターンにマッチする必要があります。",
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ka.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ka.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute უნდა იყოს მონიშნული.',
  active_url: ':attribute უნდა იყოს URL მისამართი.',
  after: ':attribute უნდა იყოს :date-ის შემდეგ.',
  after_or_equal: ':attribute უნდა იყოს :date-ის შემდეგ ან მისი ტოლი.',
  alpha: ':attribute უნდა შეიცავდეს მხოლოდ ასოებს.',
  alpha_dash: ':attribute უნდა შეიცავდეს მხოლოდ ასოებს, რიცხვებს და ტირეებს.',
  alpha_num: ':attribute უნდა შეიცავდეს მხოლოდ ასოებს და რიცხვებს.',
  array: ':attribute უნდა იყოს მასივი.',
  before: ':attribute უნდა იყოს :date-მდე.',
  before_or_equal: ':attribute უნდა იყოს :date-მდე ან მისი ტოლი.',
  between: {
    numeric: ':attribute უნდა იყოს :min-სა და :max-ს შორის.',
    file: ':attribute უნდა იყოს :min-სა და :max კილობაიტს შორის.',
    string: ':attribute უნდა იყოს :min-სა და :max სიმბოლოს შორის.',
    array: ':attribute-ის რაოდენობა უნდა იყოს :min-დან :max-მდე.',
  },
  boolean: ':attribute უნდა იყოს true, false, 0 ან 1.',
  confirmed: ':attribute არ ემთხვევა დადასტურებას.',
  date: ':attribute შეიცავს თარიღის არასწორ ფორმატს.',
  date_format: ':attribute არ ემთხვევა თარიღის ფორმატს: :format.',
  different: ':attribute და :other არ უნდა ემთხვეოდეს ერთმანეთს.',
  digits: ':attribute უნდა შედგებოდეს :digits ციფრისგან.',
  digits_between: ':attribute უნდა შედგებოდეს :min-დან :max ციფრამბდე.',
  dimensions: ':attribute შეიცავს სურათის არასწორ ზომებს.',
  distinct: ':attribute უნდა იყოს უნიკალური.',
  email: ':attribute უნდა იყოს სწორი ელ.ფოსტა.',
  exists: 'ასეთი :attribute არ არსებობს.',
  file: ':attribute უნდა იყოს ფაილი.',
  filled: ':attribute აუცილებელია.',
  gt: {
    numeric: ':attribute უნდა იყოს :value-ზე მეტი.',
    file: ':attribute უნდა იყოს :value კილობაიტზე მეტი.',
    string: ':attribute უნდა შეიცავდეს :value სიმბოლოზე მეტს.',
    array: ':attribute უნდა შეიცავლდეს :value ელემენტზე მეტს.',
  },
  gte: {
    numeric: ':attribute უნდა იყოს მინიმუმ :value.',
    file: ':attribute უნდა იყოს მინიმუმ :value კილობაიტი.',
    string: ':attribute უნდა შეიცავდეს მინიმუმ :value სიმბოლოს.',
    array: ':attribute უნდა შეიცავდეს მინიმუმ :value ელემენტს.',
  },
  image: ':attribute უნდა იყოს სურათი.',
  in: 'მითითებული :attribute არასწორია.',
  in_array: ':attribute უნდა არსებობდეს :other-ში.',
  integer: ':attribute უნდა იყოს მთელი რიცხვი.',
  ip: ':attribute უნდა იყოს IP მისამართი.',
  ipv4: ':attribute უნდა იყოს IPv4 მისამართი.',
  ipv6: ':attribute უნდა იყოს IPv6 მისამართი.',
  json: ':attribute უნდა იყოს JSON ტიპის.',
  lt: {
    numeric: ':attribute უნდა იყოს :value-ზე ნაკლები.',
    file: ':attribute უნდა იყოს :value კილობაიტზე ნაკლები.',
    string: ':attribute უნდა შეიცავდეს :value სიმბოლოზე ნაკლებს.',
    array: ':attribute უნდა შეიცავლდეს :value ელემენტზე ნაკლებს.',
  },
  lte: {
    numeric: ':attribute უნდა იყოს მაქსიმუმ :value.',
    file: ':attribute უნდა იყოს მაქსიმუმ :value კილობაიტი.',
    string: ':attribute უნდა შეიცავდეს მაქსიმუმ :value სიმბოლოს.',
    array: ':attribute უნდა შეიცავდეს მაქსიმუმ :value ელემენტს.',
  },
  max: {
    numeric: ':attribute არ უნდა აღემატებოდეს :max-ს.',
    file: ':attribute არ უნდა აღემატებოდეს :max კილობაიტს.',
    string: ':attribute არ უნდა აღემატებოდეს :max სიმბოლოს.',
    array: ':attribute-ის რაოდენობა არ უნდა აღემატებოდეს :max-ს.',
  },
  mimes: ':attribute უნდა იყოს შემდეგი ტიპის: :values.',
  mimetypes: ':attribute უნდა იყოს შემდეგი ტიპის: :values.',
  min: {
    numeric: ':attribute უნდა იყოს მინიმუმ :min.',
    file: ':attribute უნდა იყოს მინიმუმ :min კილობაიტი.',
    string: ':attribute უნდა შეიცავდეს მინიმუმ :min სიმბოლოს.',
    array: ':attribute უნდა იყოს მინიმუმ :min.',
  },
  not_in: 'მითითებული :attribute არასწორია.',
  not_regex: ':attribute არასწორ ფორმატშია.',
  numeric: ':attribute უნდა იყოს რიცხვი.',
  present: ':attribute უნდა არსებობდეს, თუნდაც ცარიელი.',
  regex: ':attribute არ ემთხვევა ფორმატს.',
  required: ':attribute აუცილებელია.',
  required_if: ':attribute აუცილებელია, თუ :other-ის მნიშვნელობა ემთხვევა :value-ს.',
  required_unless: ':attribute აუცილებელია, თუ :values არ შეიცავს :other-ს.',
  required_with: ':attribute აუცილებელია, თუ :values მითითებულია.',
  required_with_all: ':attribute აუცილებელია, თუ :values მითითებულია.',
  required_without: ':attribute აუცილებელია, თუ :values არ არის მითითებული.',
  required_without_all: ':attribute აუცილებელია, თუ :values არ არის მითითებული.',
  same: ':attribute და :other უნდა ემთხვეოდეს ერთმანეთს.',
  size: {
    numeric: ':attribute უნდა იყოს :size-ის ტოლი.',
    file: ':attribute უნდა იყოს :size კილობაიტი.',
    string: ':attribute უნდა შედგებოდეს :size სიმბოლოსგან.',
    array: ':attribute უნდა შეიცავდეს :size ელემენტს.',
  },
  string: ':attribute უნდა იყოს ტექსტი.',
  timezone: ':attribute უნდა იყოს სასაათო სარტყელი.',
  unique: 'ასეთი :attribute უკვე არსებობს.',
  uploaded: ':attribute-ის ატვირთვა ვერ მოხერხდა.',
  url: ':attribute უნდა იყოს URL მისამართი.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ko.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ko.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute을(를) 동의해야 합니다.',
  active_url: ':attribute은(는) 유효한 URL이 아닙니다.',
  after: ':attribute은(는) :date 이후 날짜여야 합니다.',
  after_or_equal: ':attribute은(는) :date 이후 날짜이거나 같은 날짜여야 합니다.',
  alpha: ':attribute은(는) 문자만 포함할 수 있습니다.',
  alpha_dash: ':attribute은(는) 문자, 숫자, 대쉬(-)만 포함할 수 있습니다.',
  alpha_num: ':attribute은(는) 문자와 숫자만 포함할 수 있습니다.',
  array: ':attribute은(는) 배열이어야 합니다.',
  before: ':attribute은(는) :date 이전 날짜여야 합니다.',
  before_or_equal: ':attribute은(는) :date 이전 날짜이거나 같은 날짜여야 합니다.',
  between: {
    numeric: ':attribute은(는) :min에서 :max 사이여야 합니다.',
    file: ':attribute은(는) :min에서 :max 킬로바이트 사이여야 합니다.',
    string: ':attribute은(는) :min에서 :max 문자 사이여야 합니다.',
    array: ':attribute은(는) :min에서 :max 개의 항목이 있어야 합니다.',
  },
  boolean: ':attribute은(는) true 또는 false 이어야 합니다.',
  confirmed: ':attribute 확인 항목이 일치하지 않습니다.',
  date: ':attribute은(는) 유효한 날짜가 아닙니다.',
  date_format: ':attribute이(가) :format 형식과 일치하지 않습니다.',
  different: ':attribute와(과) :other은(는) 서로 달라야 합니다.',
  digits: ':attribute은(는) :digits 자리 숫자여야 합니다.',
  digits_between: ':attribute)은(는) :min에서 :max 자리 사이여야 합니다.',
  dimensions: ':attribute은(는) 유효하지 않는 이미지 크기입니다.',
  distinct: ':attribute 필드에 중복된 값이 있습니다.',
  email: ':attribute은(는) 유효한 이메일 주소여야 합니다.',
  exists: '선택된 :attribute은(는) 유효하지 않습니다.',
  file: ':attribute은(는) 파일이어야 합니다.',
  filled: ':attribute 필드는 값이 있어야 합니다.',
  gt: {
    numeric: ':attribute의 값은 :value보다 커야 합니다.',
    file: ':attribute의 용량은 :value킬로바이트보다 커야 합니다.',
    string: ':attribute의 길이는 :value보다 길어야 합니다.',
    array: ':attribute의 항목수는 :value개 보다 많아야 합니다.',
  },
  gte: {
    numeric: ':attribute의 값은 :value보다 같거나 커야 합니다.',
    file: ':attribute의 용량은 :value킬로바이트보다 같거나 커야 합니다.',
    string: ':attribute의 길이는 :value보다 같거나 길어야 합니다.',
    array: ':attribute의 항목수는 :value개 보다 같거나 많아야 합니다.',
  },
  image: ':attribute은(는) 이미지여야 합니다.',
  in: '선택된 :attribute은(는) 유효하지 않습니다.',
  in_array: ':attribute 필드는 :other에 존재하지 않습니다.',
  integer: ':attribute은(는) 정수여야 합니다.',
  ip: ':attribute은(는) 유효한 IP 주소여야 합니다.',
  ipv4: ':attribute은(는) 유효한 IPv4 주소여야 합니다.',
  ipv6: ':attribute은(는) 유효한 IPv6 주소여야 합니다.',
  json: ':attribute은(는) JSON 문자열이어야 합니다.',
  lt: {
    numeric: ':attribute의 값은 :value보다 작아야 합니다.',
    file: ':attribute의 용량은 :value킬로바이트보다 작아야 합니다.',
    string: ':attribute의 길이는 :value보다 짧아야 합니다.',
    array: ':attribute의 항목수는 :value개 보다 작아야 합니다.',
  },
  lte: {
    numeric: ':attribute의 값은 :value보다 같거나 작아야 합니다.',
    file: ':attribute의 용량은 :value킬로바이트보다 같거나 작아야 합니다.',
    string: ':attribute의 길이는 :value보다 같거나 짧아야 합니다.',
    array: ':attribute의 항목수는 :value개 보다 같거나 작아야 합니다.',
  },
  max: {
    numeric: ':attribute은(는) :max보다 클 수 없습니다.',
    file: ':attribute은(는) :max킬로바이트보다 클 수 없습니다.',
    string: ':attribute은(는) :max자보다 클 수 없습니다.',
    array: ':attribute은(는) :max개보다 많을 수 없습니다.',
  },
  mimes: ':attribute은(는) 다음의 파일 형식이어야 합니다: :values.',
  mimetypes: ':attribute은(는) 다음의 파일 형식이어야 합니다: :values.',
  min: {
    numeric: ':attribute은(는) 최소한 :min이어야 합니다.',
    file: ':attribute은(는) 최소한 :min킬로바이트이어야 합니다.',
    string: ':attribute은(는) 최소한 :min자이어야 합니다.',
    array: ':attribute은(는) 최소한 :min개의 항목이 있어야 합니다.',
  },
  not_in: '선택된 :attribute이(가) 유효하지 않습니다.',
  not_regex: ':attribute의 형식이 올바르지 않습니다.',
  numeric: ':attribute은(는) 숫자여야 합니다.',
  present: ':attribute 필드가 있어야 합니다.',
  regex: ':attribute 형식이 유효하지 않습니다.',
  required: ':attribute 필드는 필수입니다.',
  required_if: ':other이(가) :value 일 때 :attribute 필드는 필수입니다.',
  required_unless: ':other이(가) :value에 없다면 :attribute 필드는 필수입니다.',
  required_with: ':values이(가) 있는 경우 :attribute 필드는 필수입니다.',
  required_with_all: ':values이(가) 모두 있는 경우 :attribute 필드는 필수입니다.',
  required_without: ':values이(가) 없는 경우 :attribute 필드는 필수입니다.',
  required_without_all: ':values이(가) 모두 없는 경우 :attribute 필드는 필수입니다.',
  same: ':attribute와(과) :other은(는) 일치해야 합니다.',
  size: {
    numeric: ':attribute은(는) :size (이)여야 합니다.',
    file: ':attribute은(는) :size킬로바이트여야 합니다.',
    string: ':attribute은(는) :size자여야 합니다.',
    array: ':attribute은(는) :size개의 항목을 포함해야 합니다.',
  },
  string: ':attribute은(는) 문자열이어야 합니다.',
  timezone: ':attribute은(는) 올바른 시간대 이어야 합니다.',
  unique: ':attribute은(는) 이미 사용 중입니다.',
  uploaded: ':attribute을(를) 업로드하지 못했습니다.',
  url: ':attribute 형식은 유효하지 않습니다.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/lt.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/lt.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Laukas :attribute turi būti priimtas.',
  active_url: 'Laukas :attribute nėra galiojantis internetinis adresas.',
  after: 'Lauko :attribute reikšmė turi būti po :date datos.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Laukas :attribute gali turėti tik raides.',
  alpha_dash: 'Laukas :attribute gali turėti tik raides, skaičius ir brūkšnelius.',
  alpha_num: 'Laukas :attribute gali turėti tik raides ir skaičius.',
  array: 'Laukas :attribute turi būti masyvas.',
  before: 'Laukas :attribute turi būti data prieš :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Lauko :attribute reikšmė turi būti tarp :min ir :max.',
    file: 'Failo dydis lauke :attribute turi būti tarp :min ir :max kilobaitų.',
    string: 'Simbolių skaičius lauke :attribute turi būti tarp :min ir :max.',
    array: 'Elementų skaičius lauke :attribute turi turėti nuo :min iki :max.',
  },
  boolean: "Lauko reikšmė :attribute turi būti 'taip' arba 'ne'.",
  confirmed: 'Lauko :attribute patvirtinimas nesutampa.',
  date: 'Lauko :attribute reikšmė nėra galiojanti data.',
  date_format: 'Lauko :attribute reikšmė neatitinka formato :format.',
  different: 'Laukų :attribute ir :other reikšmės turi skirtis.',
  digits: 'Laukas :attribute turi būti sudarytas iš :digits skaitmenų.',
  digits_between: 'Laukas :attribute tuti turėti nuo :min iki :max skaitmenų.',
  dimensions: 'Lauke :attribute įkeltas paveiksliukas neatitinka išmatavimų reikalavimo.',
  distinct: 'Laukas :attribute pasikartoja.',
  email: 'Lauko :attribute reikšmė turi būti galiojantis el. pašto adresas.',
  file: 'The :attribute must be a file.',
  filled: 'Laukas :attribute turi būti užpildytas.',
  exists: 'Pasirinkta negaliojanti :attribute reikšmė.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'Lauko :attribute reikšmė turi būti paveikslėlis.',
  in: 'Pasirinkta negaliojanti :attribute reikšmė.',
  in_array: 'Laukas :attribute neegzistuoja :other lauke.',
  integer: 'Lauko :attribute reikšmė turi būti sveikasis skaičius.',
  ip: 'Lauko :attribute reikšmė turi būti galiojantis IP adresas.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'Lauko :attribute reikšmė turi būti JSON tekstas.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'Lauko :attribute reikšmė negali būti didesnė nei :max.',
    file: 'Failo dydis lauke :attribute reikšmė negali būti didesnė nei :max kilobaitų.',
    string: 'Simbolių kiekis lauke :attribute reikšmė negali būti didesnė nei :max simbolių.',
    array: 'Elementų kiekis lauke :attribute negali turėti daugiau nei :max elementų.',
  },
  mimes: 'Lauko reikšmė :attribute turi būti failas vieno iš sekančių tipų: :values.',
  mimetypes: 'Lauko reikšmė :attribute turi būti failas vieno iš sekančių tipų: :values.',
  min: {
    numeric: 'Lauko :attribute reikšmė turi būti ne mažesnė nei :min.',
    file: 'Failo dydis lauke :attribute turi būti ne mažesnis nei :min kilobaitų.',
    string: 'Simbolių kiekis lauke :attribute turi būti ne mažiau nei :min.',
    array: 'Elementų kiekis lauke :attribute turi būti ne mažiau nei :min.',
  },
  not_in: 'Pasirinkta negaliojanti reikšmė :attribute.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Lauko :attribute reikšmė turi būti skaičius.',
  present: 'Laukas :attribute turi egzistuoti.',
  regex: 'Negaliojantis lauko :attribute formatas.',
  required: 'Privaloma užpildyti lauką :attribute.',
  required_if: 'Privaloma užpildyti lauką :attribute kai :other yra :value.',
  required_unless: 'Laukas :attribute yra privalomas, nebent :other yra tarp :values reikšmių.',
  required_with: 'Privaloma užpildyti lauką :attribute kai pateikta :values.',
  required_with_all: 'Privaloma užpildyti lauką :attribute kai pateikta :values.',
  required_without: 'Privaloma užpildyti lauką :attribute kai nepateikta :values.',
  required_without_all: 'Privaloma užpildyti lauką :attribute kai nepateikta nei viena iš reikšmių :values.',
  same: 'Laukai :attribute ir :other turi sutapti.',
  size: {
    numeric: 'Lauko :attribute reikšmė turi būti :size.',
    file: 'Failo dydis lauke :attribute turi būti :size kilobaitai.',
    string: 'Simbolių skaičius lauke :attribute turi būti :size.',
    array: 'Elementų kiekis lauke :attribute turi būti :size.',
  },
  string: 'Laukas :attribute turi būti tekstinis.',
  timezone: 'Lauko :attribute reikšmė turi būti galiojanti laiko zona.',
  unique: 'Tokia :attribute reikšmė jau pasirinkta.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Negaliojantis lauko :attribute formatas.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/lv.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/lv.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ' :attribute ir jābūt pieņemtam.',
  active_url: ' :attribute ir ar nederīgu linku.',
  after: ' :attribute ir jābūt ar datumu pēc :datums.',
  after_or_equal: ' :attribute ir jābūt ar datumu pēc vai vienādu ar :datums.',
  alpha: ' :attribute var saturēt tikai burtus.',
  alpha_dash: ' :attribute var saturēt tikai burtus, nummurus un atstarpes.',
  alpha_num: ' :attribute var tikai saturēt burtus un nummurus.',
  array: ' :attribute ir jābūt sakārtotam.',
  before: ' :attribute ir jābūt ar datumu pirms :datums.',
  before_or_equal: ' :attribute ir jābūt ar datumu pirms vai vienādu ar :datums.',
  between: {
    numeric: ' :attribute jābūt starp :min un :max.',
    file: ' :attribute jābūt starp :min un :max kilobaiti.',
    string: ' :attribute jābūt no :min līdz :max zīmēm.',
    array: ' :attribute jābūt no :min līdz :max vienībām.',
  },
  boolean: ' :attribute laiciņam jābūt atbilstošam vai neatbilstošam.',
  confirmed: ' :attribute apstiprinājums neatbilst.',
  date: ' :attribute nav derīgs.',
  date_format: ' :attribute neatbilst formātam :format.',
  different: ' :attribute un :other ir jābūt citiem.',
  digits: ' :attribute ir jābūt :digits ciparam.',
  digits_between: ' :attribute ir jābūt :min un :max ciparam.',
  dimensions: ' :attribute ir nederīgs attēla izmērs.',
  distinct: ' :attribute laikam ir dubulta vērtība.',
  email: ' :attribute derīgam e-pastam.',
  exists: 'Izvēlētais :attribute ir nederīgs.',
  file: ' :attribute jābūt failam.',
  filled: ':attribute lauks ir nepieciešams.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: ' :attribute jābūt attēlam.',
  in: 'Izvēlētais :attribute ir nederīgs.',
  in_array: ' :attribute laiks neeksistē :cits.',
  integer: ' :attribute ir jabūt skaitim.',
  ip: ' :attribute jābūt derīgai IP adresei.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: ' :attribute jābūt derīgai JSON virknei.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: ' :attribute nedrīkst pārsniegt :max.',
    file: ' :attribute nedrīkst pārsniegt :max kilobaiti.',
    string: ' :attribute nedrīkst pārsniegt :max zīmes.',
    array: ' :attribute nedrīkst pārsniegt :max vienības.',
  },
  mimes: ' :attribute jābūt faila tipam: :values',
  mimetypes: ' :attribute jābūt faile tipam: :values.',
  min: {
    numeric: ' :attribute jābūt vismaz :min.',
    file: ' :attribute jābūt vismaz :min kilobaiti.',
    string: ' :attribute jābūt vismaz :min zīmes.',
    array: ' :attribute jāsatur vismaz :min vienības.',
  },
  not_in: ' izvēlieties :attribute ir nederīgs.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ' :attribute jābūt skaitlim.',
  present: ' :attribute laikums ir nepieciešams.',
  regex: ' :attribute formāts ir nederīgs.',
  required: ' :attribute laukums ir nepieciešams.',
  required_if: ' :attribute laukums ir nepieciešams, ja vien :other ir :values.',
  required_unless: ' :attribute laukums ir nepieciešams, ja vien :other ir :values.',
  required_with: ' :attribute laukums ir nepieciešams, kad :values ir pieejama.',
  required_with_all: ' :attribute laukums ir nepieciešams, kad :values ir pieejama.',
  required_without: ' :attribute laukums ir nepieciešams, kad :values nav pieejama.',
  required_without_all: ' :attribute laukums ir nepieciešams, kad neviena no :values nav pieejama.',
  same: ' :attribute un :citiem ir jāsakrīt.',
  size: {
    numeric: ' :attribute jābūt :size.',
    file: ' :attribute jābūt :size kilobaiti.',
    string: ' :attribute jābūt :size zīmes.',
    array: ' :attribute jāsatur :size vienības.',
  },
  string: ' :attribute jābūt virknē.',
  timezone: ' :attribute jābūt derīgā zonā.',
  unique: ' :attribute jau ir aizņemts.',
  uploaded: ' :attribute netika augšuplādēts.',
  url: ' :attribute formāts ir nederīgs.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/mk.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/mk.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Полето :attribute мора да биде прифатено.',
  active_url: 'Полето :attribute не е валиден URL.',
  after: 'Полето :attribute мора да биде датум после :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Полето :attribute може да содржи само букви.',
  alpha_dash: 'Полето :attribute може да содржи само букви, цифри, долна црта и тире.',
  alpha_num: 'Полето :attribute може да содржи само букви и цифри.',
  array: 'Полето :attribute мора да биде низа.',
  before: 'Полето :attribute мора да биде датум пред :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Полето :attribute мора да биде помеѓу :min и :max.',
    file: 'Полето :attribute мора да биде помеѓу :min и :max килобајти.',
    string: 'Полето :attribute мора да биде помеѓу :min и :max карактери.',
    array: 'Полето :attribute мора да има помеѓу :min - :max карактери.',
  },
  boolean: 'The :attribute field must be true or false',
  confirmed: 'Полето :attribute не е потврдено.',
  date: 'Полето :attribute не е валиден датум.',
  date_format: 'Полето :attribute не е во формат :format.',
  different: 'Полињата :attribute и :other треба да се различни.',
  digits: 'Полето :attribute треба да има :digits цифри.',
  digits_between: 'Полето :attribute треба да има помеѓу :min и :max цифри.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Полето :attribute не е во валиден формат.',
  exists: 'Избранато поле :attribute веќе постои.',
  file: 'The :attribute must be a file.',
  filled: 'Полето :attribute е задолжително.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'Полето :attribute мора да биде слика.',
  in: 'Избраното поле :attribute е невалидно.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Полето :attribute мора да биде цел број.',
  ip: 'Полето :attribute мора да биде IP адреса.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'Полето :attribute мора да биде помало од :max.',
    file: 'Полето :attribute мора да биде помало од :max килобајти.',
    string: 'Полето :attribute мора да има помалку од :max карактери.',
    array: 'Полето :attribute не може да има повеќе од :max карактери.',
  },
  mimes: 'Полето :attribute мора да биде фајл од типот: :values.',
  mimetypes: 'Полето :attribute мора да биде фајл од типот: :values.',
  min: {
    numeric: 'Полето :attribute мора да биде минимум :min.',
    file: 'Полето :attribute мора да биде минимум :min килобајти.',
    string: 'Полето :attribute мора да има минимум :min карактери.',
    array: 'Полето :attribute мора да има минимум :min карактери.',
  },
  not_in: 'Избраното поле :attribute е невалидно.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Полето :attribute мора да биде број.',
  present: 'The :attribute field must be present.',
  regex: 'Полето :attribute е во невалиден формат.',
  required: 'Полето :attribute е задолжително.',
  required_if: 'Полето :attribute е задолжително, кога :other е :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Полето :attribute е задолжително, кога е внесено :values.',
  required_with_all: 'The :attribute field is required when :values is present.',
  required_without: 'Полето :attribute е задолжително, кога не е внесено :values.',
  required_without_all: 'The :attribute field is required when none of :values are present.',
  same: 'Полињата :attribute и :other треба да совпаѓаат.',
  size: {
    numeric: 'Полето :attribute мора да биде :size.',
    file: 'Полето :attribute мора да биде :size килобајти.',
    string: 'Полето :attribute мора да има :size карактери.',
    array: 'Полето :attribute мора да има :size карактери.',
  },
  string: 'The :attribute must be a string.',
  timezone: 'The :attribute must be a valid zone.',
  unique: 'Полето :attribute веќе постои.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Полето :attribute не е во валиден формат.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/mn.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/mn.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':Attribute баталсан байх шаардлагатай.',
  active_url: ':Attribute талбарт зөв URL хаяг оруулна уу.',
  after: ':Attribute талбарт :date-с хойш огноо оруулна уу.',
  after_or_equal: ':Attribute талбарт :date эсвэл түүнээс хойш огноо оруулна уу.',
  alpha: ':Attribute талбарт латин үсэг оруулна уу.',
  alpha_dash: ':Attribute талбарт латин үсэг, тоо болон зураас оруулах боломжтой.',
  alpha_num: ':Attribute талбарт латин үсэг болон тоо оруулах боломжтой.',
  array: ':Attribute талбар массив байх шаардлагатай.',
  before: ':Attribute талбарт :date-с өмнөх огноо оруулна уу.',
  before_or_equal: ':attribute талбарт :date эсвэл түүнээс өмнөх огноо оруулна уу.',
  between: {
    numeric: ':Attribute талбарт :min-:max хооронд тоо оруулна уу.',
    file: ':Attribute талбарт :min-:max килобайт хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :min-:max урттай текст оруулна уу.',
    array: ':Attribute массивт :min-:max элемэнт байх шаардлагатай.',
  },
  boolean: ':Attribute талбарын утга үнэн эсвэл худал байх шаардлагатай.',
  confirmed: ':Attribute талбарын баталагажуулалт тохирохгүй байна.',
  date: ':Attribute талбарт оруулсан огноо буруу байна.',
  date_format: ':Attribute талбарт :format хэлбэртэй огноо оруулна уу.',
  different: ':Attribute талбарт :other -с өөр утга оруулах шаардлагатай.',
  digits: ':Attribute талбарт дараах цифрүүдээс оруулах боломжтой. :digits.',
  digits_between: ':Attribute талбарт :min-:max хоорондох цифр оруулах боломжтой.',
  dimensions: ':Attribute талбарийн зургийн хэмжээс буруу байна.',
  distinct: ':Attribute талбарт ялгаатай утга оруулах шаардлагатай.',
  email: ':Attribute талбарт зөв и-мэйл хаяг оруулах шаардлагатай.',
  exists: 'Сонгогдсон :attribute буруу байна.',
  file: ':Attribute талбарт файл оруулах шаардлагатай.',
  filled: ':Attribute талбар шаардлагатай.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: ':Attribute талбарт зураг оруулна уу.',
  in: 'Сонгогдсон :attribute буруу байна.',
  in_array: ':Attribute талбарт оруулсан утга :other -д байхгүй байна.',
  integer: ':Attribute талбарт бүхэл тоо оруулах шаардлагатай.',
  ip: ':Attribute талбарт зөв IP хаяг оруулах шаардлагатай.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: ':Attribute талбарт зөв JSON тэмдэгт мөр оруулах шаардлагатай.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: ':Attribute талбарт :max буюу түүнээс бага утга оруулна уу.',
    file: ':Attribute талбарт :max килобайтаас бага хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :max-с бага урттай текст оруулна уу.',
    array: ':Attribute талбарт хамгийн ихдээ :max элемэнт оруулах боломжтой.',
  },
  mimes: ':Attribute талбарт дараах төрлийн файл оруулах боломжтой: :values.',
  mimetypes: ':Attribute талбарт дараах төрлийн файл оруулах боломжтой: :values.',
  min: {
    numeric: ':Attribute талбарт :min буюу түүнээс их тоо оруулна уу.',
    file: ':Attribute талбарт :min килобайтаас их хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :min буюу түүнээс их үсэг бүхий текст оруулна уу.',
    array: ':Attribute талбарт хамгийн багадаа :min элемэнт оруулах боломжтой.',
  },
  not_in: 'Буруу :attribute сонгогдсон байна.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':Attribute талбарт тоон утга оруулна уу.',
  present: ':Attribute талбар байх шаардлагатай.',
  regex: ':Attribute талбарт оруулсан утга буруу байна.',
  required: ':Attribute талбар шаардлагатай.',
  required_if: 'Хэрэв :other :value бол :attribute табларт утга оруулах шаардлагатай.',
  required_unless: ':other :values дотор байхгүй бол :attribute талбарт утга оруулах шаардлагатай.',
  required_with: ':values утгуудийн аль нэг байвал :attribute талбар шаардлагатай.',
  required_with_all: ':values утгууд байвал :attribute талбар шаардлагатай.',
  required_without: 'The :attribute field is required when :values is not present.',
  required_without_all: 'The :attribute field is required when none of :values are present.',
  same: 'The :attribute and :other must match.',
  size: {
    numeric: ':Attribute :size хэмжээтэй байх шаардлагатай.',
    file: ':Attribute :size килобайт хэмжээтэй байх шаардлагатай.',
    string: ':Attribute :size тэмдэгтийн урттай байх шаардлагатай.',
    array: ':Attribute :size элемэнттэй байх шаардлагатай.',
  },
  string: ':Attribute талбарт текст оруулна уу.',
  timezone: ':Attribute талбарт зөв цагийн бүс оруулна уу.',
  unique: 'Оруулсан :attribute аль хэдий нь бүртгэгдсэн байна.',
  uploaded: ':Attribute талбарт оруулсан файлыг хуулхад алдаа гарлаа.',
  url: ':Attribute зөв url хаяг оруулна уу.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ms.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ms.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute mesti diterima pakai.',
  active_url: ':attribute bukan URL yang sah.',
  after: ':attribute mesti tarikh selepas :date.',
  after_or_equal: ':attribute mesti tarikh selepas atau sama dengan :date.',
  alpha: ':attribute hanya boleh mengandungi huruf.',
  alpha_dash: ':attribute boleh mengandungi huruf, nombor, dan sengkang.',
  alpha_num: ':attribute boleh mengandungi huruf dan nombor.',
  array: ':attribute mesti jujukan.',
  before: ':attribute mesti tarikh sebelum :date.',
  before_or_equal: ':attribute mesti tarikh sebelum atau sama dengan :date.',
  between: {
    numeric: ':attribute mesti mengandungi antara :min dan :max.',
    file: ':attribute mesti mengandungi antara :min dan :max kilobait.',
    string: ':attribute mesti mengandungi antara :min dan :max aksara.',
    array: ':attribute mesti mengandungi antara :min dan :max perkara.',
  },
  boolean: ':attribute mesti benar atau salah.',
  confirmed: ':attribute pengesahan yang tidak sepadan.',
  date: ':attribute bukan tarikh yang sah.',
  date_format: ':attribute tidak mengikut format :format.',
  different: ':attribute dan :other mesti berlainan.',
  dimensions: ':attribute tidak sah',
  digits: ':attribute mesti :digits.',
  digits_between: ':attribute mesti mengandungi antara :min dan :max digits.',
  distinct: ':attribute adalah nilai yang berulang',
  email: ':attribute tidak sah.',
  exists: ':attribute tidak sah.',
  file: ':attribute mesti fail yang sah.',
  filled: ':attribute diperlukan.',
  gt: {
    numeric: ':attribute mesti melebihi :value.',
    file: ':attribute mesti melebihi :value kilobait.',
    string: ':attribute mesti melebihi :value aksara.',
    array: ':attribute mesti mengandungi lebih daripada :value perkara.',
  },
  gte: {
    numeric: ':attribute mesti melebihi atau bersamaan :value.',
    file: ':attribute mesti melebihi atau bersamaan :value kilobait.',
    string: ':attribute mesti melebihi atau bersamaan :value aksara.',
    array: ':attribute mesti mengandungi :value perkara atau lebih.',
  },
  image: ':attribute mesti imej.',
  in: ':attribute tidak sah.',
  in_array: ':attribute tidak wujud dalam :other.',
  integer: ':attribute mesti integer.',
  ip: ':attribute mesti alamat IP yang sah.',
  ipv4: ':attribute mesti alamat IPv4 yang sah.',
  ipv6: ':attribute mesti alamat IPv6 yang sah',
  json: ':attribute mesti JSON yang sah.',
  lt: {
    numeric: ':attribute mesti kurang daripada :value.',
    file: ':attribute mesti kurang daripada :value kilobait.',
    string: ':attribute mesti kurang daripada :value aksara.',
    array: ':attribute mesti mengandungi kurang daripada :value perkara.',
  },
  lte: {
    numeric: ':attribute mesti kurang daripada atau bersamaan dengan :value.',
    file: ':attribute mesti kurang daripada atau bersamaan dengan :value kilobait.',
    string: ':attribute mesti kurang daripada atau bersamaan dengan :value aksara.',
    array: ':attribute mesti mengandungi kurang daripada atau bersamaan dengan :value perkara.',
  },
  max: {
    numeric: 'Jumlah :attribute mesti tidak melebihi :max.',
    file: 'Jumlah :attribute mesti tidak melebihi :max kilobait.',
    string: 'Jumlah :attribute mesti tidak melebihi :max aksara.',
    array: 'Jumlah :attribute mesti tidak melebihi :max perkara.',
  },
  mimes: ':attribute mesti fail type: :values.',
  mimetypes: ':attribute mesti fail type: :values.',
  min: {
    numeric: 'Jumlah :attribute mesti sekurang-kurangnya :min.',
    file: 'Jumlah :attribute mesti sekurang-kurangnya :min kilobait.',
    string: 'Jumlah :attribute mesti sekurang-kurangnya :min aksara.',
    array: 'Jumlah :attribute mesti sekurang-kurangnya :min perkara.',
  },
  not_in: ':attribute tidak sah.',
  not_regex: 'Format :attribute adalah tidak sah.',
  numeric: ':attribute mesti nombor.',
  present: ':attribute mesti wujud.',
  regex: 'Format :attribute tidak sah.',
  required: 'Ruangan :attribute diperlukan.',
  required_if: 'Ruangan :attribute diperlukan bila :other sama dengan :value.',
  required_unless: 'Ruangan :attribute diperlukan sekiranya :other ada dalam :values.',
  required_with: 'Ruangan :attribute diperlukan bila :values wujud.',
  required_with_all: 'Ruangan :attribute diperlukan bila :values wujud.',
  required_without: 'Ruangan :attribute diperlukan bila :values tidak wujud.',
  required_without_all: 'Ruangan :attribute diperlukan bila kesemua :values wujud.',
  same: 'Ruangan :attribute dan :other mesti sepadan.',
  size: {
    numeric: 'Saiz :attribute mesti :size.',
    file: 'Saiz :attribute mesti :size kilobait.',
    string: 'Saiz :attribute mesti :size aksara.',
    array: 'Saiz :attribute mesti mengandungi :size perkara.',
  },
  string: ':attribute mesti aksara.',
  timezone: ':attribute mesti zon masa yang sah.',
  unique: ':attribute telah wujud.',
  uploaded: ':attribute gagal dimuat naik.',
  url: ':attribute format tidak sah.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/nb_NO.js":
/*!****************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/nb_NO.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute må være akseptert.',
  alpha: ':attribute feltet kan kun inneholde alfabetiske tegn.',
  alpha_dash: ':attribute feltet kan kun inneholde alfanumeriske tegn, i tillegg til bindestreker og understreker.',
  alpha_num: ':attribute feltet må være alfanumerisk.',
  between: ':attribute feltet må være mellom :min og :max.',
  confirmed: ':attribute feltet stemmer ikke overens med bekreftelsen.',
  email: ':attribute formatet er ugyldig.',
  date: ':attribute er et ugyldig datoformat.',
  def: ':attribute attributtet har feil.',
  digits: ':attribute må være på :digits siffer.',
  different: ':attribute og :different må være forskjellige.',
  'in': 'Den oppgitte verdien for :attribute er ugyldig.',
  integer: ':attribute må være et heltall.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute må minst være :min.',
    string: ':attribute må være på minst :min tegn.'
  },
  max: {
    numeric: ':attribute kan ikke være større enn :max.',
    string: ':attribute kan maks ha :max tegn.'
  },
  'not_in': 'Den oppgitte verdien for :attribute er ugyldig.',
  numeric: ':attribute må være et tall.',
  present: 'The :attribute field must be present (but can be empty).',
  required: ':attribute feltet er påkrevd.',
  required_if: ':attribute er påkrevd når :other er :value.',
  same: ':attribute og :same må være like.',
  size: {
    numeric: ':attribute må ha størrelsen :size.',
    string: ':attribute må ha :size tegn.'
  },
  string: ':attribute må være tekst.',
  url: ':attribute formatet er ugyldig.',
  regex: ':attribute formatet er ugyldig.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/nl.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/nl.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Het :attribute veld moet geaccepteerd worden.',
  after: ':attribute moet een datum na :after zijn.',
  after_or_equal: 'De :attribute datum moet op of na :after_or_equal zijn.',
  alpha: 'Het :attribute veld mag alleen maar letters bevatten.',
  alpha_dash: 'Het :attribute veld mag alleen maar letters, cijfers en (liggende) streepjes bevatten.',
  alpha_num: 'Het :attribute veld mag alleen maar letters en cijfers bevatten.',
  before: ':attribute moet vòòr :before zijn.',
  before_or_equal: ':attribute moet vòòr of op :before_or_equal zijn.',
  between: 'Het :attribute veld moet tussen :min en :max liggen.',
  confirmed: 'Het :attribute veld komt niet met de bevestiging overeen.',
  email: 'Het :attribute formaat is ongeldig.',
  date: 'Het :attribute veld moet een geldige datum zijn.',
  def: 'Het :attribute veld bevat fouten.',
  digits: 'Het :attribute veld moet :digits cijfers hebben.',
  different: 'Het :attribute en :different veld moeten verschillend zijn.',
  'in': 'De gekozen waarde voor :attribute is ongeldig.',
  integer: 'Het :attribute veld moet een geheel getal zijn.',
  hex: 'Het :attribute veld moet hexadecimaal zijn',
  min: {
    numeric: 'Het :attribute veld moet minstens :min zijn.',
    string: 'Het :attribute veld moet minstens :min karakters bevatten.'
  },
  max: {
    numeric: 'Het :attribute veld mag maximaal :max zijn.',
    string: 'Het :attribute veld mag niet meer dan :max karakters bevatten.'
  },
  not_in: 'De gekozen waarde voor :attribute is ongeldig.',
  numeric: 'Het :attribute veld moet een getal zijn.',
  present: 'Het :attribute veld moet aanwezig zijn (maar mag leeg zijn).',
  required: 'Het :attribute veld moet ingevuld zijn.',
  required_if: 'Het :attribute veld moet ingevuld zijn, wanneer :other :value is.',
  required_unless: 'Het :attribute veld moet ingevuld zijn, wanneer :other niet :value is.',
  required_with: 'Het :attribute veld moet ingevuld zijn, wanneer :field niet leeg is.',
  required_with_all: 'Het :attribute veld moet ingevuld zijn, wanneer :fields niet leeg zijn.',
  required_without: 'Het :attribute veld moet ingevuld zijn, wanneer :field leeg is.',
  required_without_all: 'Het :attribute veld moet ingevuld zijn, wanneer :fields leeg zijn.',
  same: 'De :attribute en :same velden moeten overeenkomen.',
  size: {
    numeric: 'Het :attribute veld moet :size zijn.',
    string: 'Het :attribute veld moet :size karakters bevatten.'
  },
  string: 'Het :attribute veld moet een woord of zin zijn.',
  url: 'Het :attribute veld heeft een ongeldig formaat.',
  regex: 'Het :attribute veld heeft een ongeldig formaat.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/pl.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/pl.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Pole :attribute musi być zaakceptowane.',
  alpha: 'Pole :attribute może zawierać tylko litery.',
  alpha_dash: 'Pole :attribute moze zawierać tylko litery, myślnik i podrkeślenie.',
  alpha_num: 'Pole :attribute moze zawierac tylko znaki alfanumeryczne.',
  between: 'Pole :attribute musi mieć długość od :min do :max.',
  confirmed: 'Pole :attribute nie spełnia warunku potwierdzenia.',
  email: 'Pole :attribute ma niepoprawny format adresu email.',
  date: 'Pole :attribute musi mieć poprawny format daty.',
  def: 'Pole :attribute zawiera błędy.',
  digits: 'Pole :attribute może zawierać tylko cyfry ze zbioru :digits.',
  different: 'Pola :attribute i :different muszą się różnić.',
  'in': 'Pole :attribute musi należeć do zbioru :in.',
  integer: 'Pole :attribute musi być liczbą całkowitą.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: 'Pole :attribute musi być równe conajmniej :min.',
    string: 'Pole :attribute musi zawierać conajmniej :min znaków.'
  },
  max: {
    numeric: 'Pole :attribute nie moze być większe :max.',
    string: 'Pole :attribute nie moze być dłuższe niż :max znaków.'
  },
  not_in: 'Pole :attribute nie może należeć do zbioru :not_in.',
  numeric: 'Pole :attribute musi być liczbą.',
  present: 'Polu :attribute musi być obecny (ale może być pusta).',
  required: 'Pole :attribute jest wymagane.',
  required_if: 'Pole :attribute jest wymagane jeśli pole :other jest równe :value.',
  same: 'Pola :attribute i :same muszą być takie same.',
  size: {
    numeric: 'Pole :attribute musi być równe :size.',
    string: 'Pole :attribute musi zawierać :size znaków.'
  },
  string: 'Pole :attribute musi być ciągiem znaków.',
  url: 'Pole :attribute musi być poprawnym adresem URL.',
  regex: 'Pole :attribute nie spełnia warunku.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/pt.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/pt.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'O campo :attribute deverá ser aceite.',
  active_url: 'O campo :attribute não contém um URL válido.',
  after: 'O campo :attribute deverá conter uma data posterior a :date.',
  after_or_equal: 'O campo :attribute deverá conter uma data posterior ou igual a :date.',
  alpha: 'O campo :attribute deverá conter apenas letras.',
  alpha_dash: 'O campo :attribute deverá conter apenas letras, números e traços.',
  alpha_num: 'O campo :attribute deverá conter apenas letras e números .',
  array: 'O campo :attribute deverá conter uma coleção de elementos.',
  before: 'O campo :attribute deverá conter uma data anterior a :date.',
  before_or_equal: 'O Campo :attribute deverá conter uma data anterior ou igual a :date.',
  between: {
    numeric: 'O campo :attribute deverá ter um valor entre :min - :max.',
    file: 'O campo :attribute deverá ter um tamanho entre :min - :max kilobytes.',
    string: 'O campo :attribute deverá conter entre :min - :max caracteres.',
    array: 'O campo :attribute deverá conter entre :min - :max elementos.',
  },
  boolean: 'O campo :attribute deverá conter o valor verdadeiro ou falso.',
  confirmed: 'A confirmação para o campo :attribute não coincide.',
  date: 'O campo :attribute não contém uma data válida.',
  date_format: 'A data indicada para o campo :attribute não respeita o formato :format.',
  different: 'Os campos :attribute e :other deverão conter valores diferentes.',
  digits: 'O campo :attribute deverá conter :digits caracteres.',
  digits_between: 'O campo :attribute deverá conter entre :min a :max caracteres.',
  dimensions: 'O campo :attribute deverá conter uma dimensão de imagem válida.',
  distinct: 'O campo :attribute contém um valor duplicado.',
  email: 'O campo :attribute não contém um endereço de correio eletrónico válido.',
  exists: 'O valor selecionado para o campo :attribute é inválido.',
  file: 'O campo :attribute deverá conter um ficheiro.',
  filled: 'É obrigatória a indicação de um valor para o campo :attribute.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'O campo :attribute deverá conter uma imagem.',
  in: 'O campo :attribute não contém um valor válido.',
  in_array: 'O campo :attribute não existe em :other.',
  integer: 'O campo :attribute deverá conter um número inteiro.',
  ip: 'O campo :attribute deverá conter um IP válido.',
  ipv4: 'O campo :attribute deverá conter um IPv4 válido.',
  ipv6: 'O campo :attribute deverá conter um IPv6 válido.',
  json: 'O campo :attribute deverá conter um texto JSON válido.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'O campo :attribute não deverá conter um valor superior a :max.',
    file: 'O campo :attribute não deverá ter um tamanho superior a :max kilobytes.',
    string: 'O campo :attribute não deverá conter mais de :max caracteres.',
    array: 'O campo :attribute não deverá conter mais de :max elementos.',
  },
  mimes: 'O campo :attribute deverá conter um ficheiro do tipo: :values.',
  mimetypes: 'O campo :attribute deverá conter um ficheiro do tipo: :values.',
  min: {
    numeric: 'O campo :attribute deverá ter um valor superior ou igual a :min.',
    file: 'O campo :attribute deverá ter no mínimo :min kilobytes.',
    string: 'O campo :attribute deverá conter no mínimo :min caracteres.',
    array: 'O campo :attribute deverá conter no mínimo :min elementos.',
  },
  not_in: 'O campo :attribute contém um valor inválido.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'O campo :attribute deverá conter um valor numérico.',
  present: 'O campo :attribute deverá estar presente.',
  regex: 'O formato do valor para o campo :attribute é inválido.',
  required: 'É obrigatória a indicação de um valor para o campo :attribute.',
  required_if: 'É obrigatória a indicação de um valor para o campo :attribute quando o valor do campo :other é igual a :value.',
  required_unless: 'É obrigatória a indicação de um valor para o campo :attribute a menos que :other esteja presente em :values.',
  required_with: 'É obrigatória a indicação de um valor para o campo :attribute quando :values está presente.',
  required_with_all: 'É obrigatória a indicação de um valor para o campo :attribute quando um dos :values está presente.',
  required_without: 'É obrigatória a indicação de um valor para o campo :attribute quando :values não está presente.',
  required_without_all: 'É obrigatória a indicação de um valor para o campo :attribute quando nenhum dos :values está presente.',
  same: 'Os campos :attribute e :other deverão conter valores iguais.',
  size: {
    numeric: 'O campo :attribute deverá conter o valor :size.',
    file: 'O campo :attribute deverá ter o tamanho de :size kilobytes.',
    string: 'O campo :attribute deverá conter :size caracteres.',
    array: 'O campo :attribute deverá conter :size elementos.',
  },
  string: 'O campo :attribute deverá conter texto.',
  timezone: 'O campo :attribute deverá ter um fuso horário válido.',
  unique: 'O valor indicado para o campo :attribute já se encontra registado.',
  uploaded: 'O upload do ficheiro :attribute falhou.',
  url: 'O formato do URL indicado para o campo :attribute é inválido.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/pt_BR.js":
/*!****************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/pt_BR.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'O campo :attribute deve ser aceito.',
  active_url: 'O campo :attribute deve conter uma URL válida.',
  after: 'O campo :attribute deve conter uma data posterior a :date.',
  after_or_equal: 'O campo :attribute deve conter uma data superior ou igual a :date.',
  alpha: 'O campo :attribute deve conter apenas letras.',
  alpha_dash: 'O campo :attribute deve conter apenas letras, números e traços.',
  alpha_num: 'O campo :attribute deve conter apenas letras e números .',
  array: 'O campo :attribute deve conter um array.',
  before: 'O campo :attribute deve conter uma data anterior a :date.',
  before_or_equal: 'O campo :attribute deve conter uma data inferior ou igual a :date.',
  between: {
    numeric: 'O campo :attribute deve conter um número entre :min e :max.',
    file: 'O campo :attribute deve conter um arquivo de :min a :max kilobytes.',
    string: 'O campo :attribute deve conter entre :min a :max caracteres.',
    array: 'O campo :attribute deve conter de :min a :max itens.',
  },
  boolean: 'O campo :attribute deve conter o valor verdadeiro ou falso.',
  confirmed: 'A confirmação para o campo :attribute não coincide.',
  date: 'O campo :attribute não contém uma data válida.',
  date_format: 'A data informada para o campo :attribute não respeita o formato :format.',
  different: 'Os campos :attribute e :other devem conter valores diferentes.',
  digits: 'O campo :attribute deve conter :digits dígitos.',
  digits_between: 'O campo :attribute deve conter entre :min a :max dígitos.',
  dimensions: 'O valor informado para o campo :attribute não é uma dimensão de imagem válida.',
  distinct: 'O campo :attribute contém um valor duplicado.',
  email: 'O campo :attribute não contém um endereço de email válido.',
  exists: 'O valor selecionado para o campo :attribute é inválido.',
  file: 'O campo :attribute deve conter um arquivo.',
  filled: 'O campo :attribute é obrigatório.',
  gt: {
    numeric: 'O campo :attribute deve ser maior que :value.',
    file: 'O arquivo :attribute deve ser maior que :value kilobytes.',
    string: 'O campo :attribute deve ser maior que :value caracteres.',
    array: 'O campo :attribute deve ter mais que :value itens.',
  },
  gte: {
    numeric: 'O campo :attribute deve ser maior ou igual a :value.',
    file: 'O arquivo :attribute deve ser maior ou igual a :value kilobytes.',
    string: 'O campo :attribute deve ser maior ou igual a :value caracteres.',
    array: 'O campo :attribute deve ter :value itens ou mais.',
  },
  image: 'O campo :attribute deve conter uma imagem.',
  in: 'O campo :attribute não contém um valor válido.',
  in_array: 'O campo :attribute não existe em :other.',
  integer: 'O campo :attribute deve conter um número inteiro.',
  ip: 'O campo :attribute deve conter um IP válido.',
  ipv4: 'O campo :attribute deve conter um IPv4 válido.',
  ipv6: 'O campo :attribute deve conter um IPv6 válido.',
  json: 'O campo :attribute deve conter uma string JSON válida.',
  lt: {
    numeric: 'O campo :attribute deve ser menor que :value.',
    file: 'O arquivo :attribute ser menor que :value kilobytes.',
    string: 'O campo :attribute deve ser menor que :value caracteres.',
    array: 'O campo :attribute deve ter menos que :value itens.',
  },
  lte: {
    numeric: 'O campo :attribute deve ser menor ou igual a :value.',
    file: 'O arquivo :attribute ser menor ou igual a :value kilobytes.',
    string: 'O campo :attribute deve ser menor ou igual a :value caracteres.',
    array: 'O campo :attribute não deve ter mais que :value itens.',
  },
  max: {
    numeric: 'O campo :attribute não pode conter um valor superior a :max.',
    file: 'O campo :attribute não pode conter um arquivo com mais de :max kilobytes.',
    string: 'O campo :attribute não pode conter mais de :max caracteres.',
    array: 'O campo :attribute deve conter no máximo :max itens.',
  },
  mimes: 'O campo :attribute deve conter um arquivo do tipo: :values.',
  mimetypes: 'O campo :attribute deve conter um arquivo do tipo: :values.',
  min: {
    numeric: 'O campo :attribute deve conter um número superior ou igual a :min.',
    file: 'O campo :attribute deve conter um arquivo com no mínimo :min kilobytes.',
    string: 'O campo :attribute deve conter no mínimo :min caracteres.',
    array: 'O campo :attribute deve conter no mínimo :min itens.',
  },
  not_in: 'O campo :attribute contém um valor inválido.',
  not_regex: 'O formato do valor :attribute é inválido.',
  numeric: 'O campo :attribute deve conter um valor numérico.',
  present: 'O campo :attribute deve estar presente.',
  regex: 'O formato do valor informado no campo :attribute é inválido.',
  required: 'O campo :attribute é obrigatório.',
  required_if: 'O campo :attribute é obrigatório quando o valor do campo :other é igual a :value.',
  required_unless: 'O campo :attribute é obrigatório a menos que :other esteja presente em :values.',
  required_with: 'O campo :attribute é obrigatório quando :values está presente.',
  required_with_all: 'O campo :attribute é obrigatório quando um dos :values está presente.',
  required_without: 'O campo :attribute é obrigatório quando :values não está presente.',
  required_without_all: 'O campo :attribute é obrigatório quando nenhum dos :values está presente.',
  same: 'Os campos :attribute e :other devem conter valores iguais.',
  size: {
    numeric: 'O campo :attribute deve conter o número :size.',
    file: 'O campo :attribute deve conter um arquivo com o tamanho de :size kilobytes.',
    string: 'O campo :attribute deve conter :size caracteres.',
    array: 'O campo :attribute deve conter :size itens.',
  },
  string: 'O campo :attribute deve ser uma string.',
  timezone: 'O campo :attribute deve conter um fuso horário válido.',
  unique: 'O valor informado para o campo :attribute já está em uso.',
  uploaded: 'Falha no Upload do arquivo :attribute.',
  url: 'O formato da URL informada para o campo :attribute é inválido.',
  url: 'O formato da URL informada para o campo :attribute é inválido.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ro.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ro.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute trebuie acceptat.',
  after: ':attribute trebuie să fie după :after.',
  after_or_equal: ':attribute trebuie să fie egal sau după :after_or_equal.',
  alpha: 'Câmpul :attribute rebuie să conțină numai caractere alfabetice.',
  alpha_dash: 'Câmpul:attribute poate conține numai caractere alfanumerice, precum și liniuțe și subliniere.',
  alpha_num: 'Câmpul :attribute trebuie să fie alfanumeric.',
  before: ':attribute trebuie să fie înainte :before.',
  before_or_equal: ':attribute trebuie să fie egal sau înainte :before_or_equal.',
  between: ':attribute trebuie să fie între :min și :max.',
  confirmed: 'Confirmarea :attribute nu se potrivește.',
  email: 'Formatul :attribute nu este valid.',
  date: ':attribute nu este un format de dată valid.',
  def: 'Atributul :attribute are erori.',
  digits: ':attribute trebuie să aibă  :digits cifre.',
  different: ':attribute și :different trebuie sa fie diferite.',
  'in': 'Atributul selectat :attribute nu este valid.',
  integer: ':attribute trebuie să fie un număr întreg.',
  hex: 'Câmpul :attribute trebuie să aibă format hexazecimal.',
  min: {
    numeric: ':attribute trebuie să fie mai mare de :min.',
    string: ':attribute trebuie să contină cel puțin :min caractere.'
  },
  max: {
    numeric: ':attribute nu trebuie să fie mai mare de :max.',
    string: ':attribute poate să contină maxim :max caractere.'
  },
  not_in: ':attribute selectat nu este valid.',
  numeric: ':attribute trebuie sa fie un număr.',
  present: ':attribute trebuie sa fie prezent(dar poate fi gol).',
  required: ' Câmpul :attribute este obligatoriu.',
  required_if: 'Câmpul :attribute este obligatoriu cănd :other este :value.',
  required_unless: 'Câmpul :attribute este obligatoriu cănd :other nu este :value.',
  required_with: 'Câmpul :attribute este obligatoriu cănd :field este completat.',
  required_with_all: 'Câmpul :attribute este obligatoriu cănd :fields sunt completate.',
  required_without: 'Câmpul :attribute este obligatoriu cănd :field nu este completat.',
  required_without_all: 'Câmpul :attribute este obligatoriu cănd :fields nu sunt completate.',
  same: 'Câmpurile :attribute și :same trebuie să fie egale.',
  size: {
    numeric: ':attribute trebuie să fie :size.',
    string: ':attribute trebuie să contina :size caractere.'
  },
  string: ':attribute trebuie să fie un contina doar caractere alfabetice.',
  url: 'Formatul :attribute nu este valid.',
  regex: 'Formatul :attribute nu este valid.',
  attributes: {}
};
  

/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ru.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ru.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Вы должны принять :attribute.',
  alpha: 'Поле :attribute может содержать только буквы.',
  alpha_dash: 'Поле :attribute может содержать только буквы, цифры, дефисы и символы подчёркивания.',
  alpha_num: 'Поле :attribute может содержать только буквы и цифры.',
  between: 'Поле :attribute должно быть между :min и :max.',
  confirmed: 'Поле :attribute не совпадает с подтверждением.',
  email: 'Поле :attribute должно быть действительным электронным адресом.',
  def: 'Поле :attribute содержит ошибки.',
  digits: 'Длина цифрового поля :attribute должна быть :digits.',
  different: 'Поля :attribute и :different должны различаться.',
  'in': 'Выбранное значение для :attribute ошибочно.',
  integer: 'Поле :attribute должно быть целым числом.',
  hex: 'Поле :attribute должно иметь шестнадцатеричный формат',
  min: {
    numeric: 'Значение поля :attribute должно быть больше или равно :min.',
    string: 'Количество символов в поле :attribute должно быть не менее :min.'
  },
  max: {
    numeric: 'Значение поля :attribute должно быть меньше или равно :max.',
    string: 'Количество символов в поле :attribute не может превышать :max.'
  },
  not_in: 'Выбранное значение для :attribute ошибочно.',
  numeric: 'Поле :attribute должно быть числом.',
  present: 'Поле :attribute должно присутствовать (но может быть пустым).',
  required: 'Поле :attribute обязательно для заполнения.',
  required_if: 'Поле :attribute требуется когда значения поля :other равно :value.',
  same: 'Значение :attribute должно совпадать с :same.',
  size: {
    numeric: 'Значение поля :attribute должно быть равным :size.',
    string: 'Количество символов в поле :attribute должно быть равно :size.'
  },
  url: 'Поле :attribute должно содержать валидный URL.',
  regex: 'Неверный формат поля :attribute.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/sl.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/sl.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute mora biti sprejet.',
  active_url: ':attribute ni pravilen.',
  after: ':attribute mora biti za datumom :date.',
  after_or_equal: ':attribute mora biti za ali enak :date.',
  alpha: ':attribute lahko vsebuje samo črke.',
  alpha_dash: ':attribute lahko vsebuje samo črke, številke in črtice.',
  alpha_num: ':attribute lahko vsebuje samo črke in številke.',
  array: ':attribute mora biti polje.',
  before: ':attribute mora biti pred datumom :date.',
  before_or_equal: ':attribute mora biti pred ali enak :date.',
  between: {
    numeric: ':attribute mora biti med :min in :max.',
    file: ':attribute mora biti med :min in :max kilobajti.',
    string: ':attribute mora biti med :min in :max znaki.',
    array: ':attribute mora imeti med :min in :max elementov.',
  },
  boolean: ':attribute polje mora biti 1 ali 0',
  confirmed: ':attribute potrditev se ne ujema.',
  date: ':attribute ni veljaven datum.',
  date_format: ':attribute se ne ujema z obliko :format.',
  different: ':attribute in :other mora biti drugačen.',
  digits: ':attribute mora imeti :digits cifer.',
  digits_between: ':attribute mora biti med :min in :max ciframi.',
  dimensions: ':attribute ima napačne dimenzije slike.',
  distinct: ':attribute je duplikat.',
  email: ':attribute mora biti veljaven e-poštni naslov.',
  exists: 'izbran :attribute je neveljaven.',
  file: ':attribute mora biti datoteka.',
  filled: ':attribute mora biti izpolnjen.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: ':attribute mora biti slika.',
  in: 'izbran :attribute je neveljaven.',
  in_array: ':attribute ne obstaja v :other.',
  integer: ':attribute mora biti število.',
  ip: ':attribute mora biti veljaven IP naslov.',
  ipv4: ':attribute mora biti veljaven IPv4 naslov.',
  ipv6: ':attribute mora biti veljaven IPv6 naslov.',
  json: ':attribute mora biti veljaven JSON tekst.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: ':attribute ne sme biti večje od :max.',
    file: ':attribute ne sme biti večje :max kilobajtov.',
    string: ':attribute ne sme biti večje :max znakov.',
    array: ':attribute ne smejo imeti več kot :max elementov.',
  },
  mimes: ':attribute mora biti datoteka tipa: :values.',
  mimetypes: ':attribute mora biti datoteka tipa: :values.',
  min: {
    numeric: ':attribute mora biti vsaj dolžine :min.',
    file: ':attribute mora imeti vsaj :min kilobajtov.',
    string: ':attribute mora imeti vsaj :min znakov.',
    array: ':attribute mora imeti vsaj :min elementov.',
  },
  not_in: 'izbran :attribute je neveljaven.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute mora biti število.',
  present: 'Polje :attribute mora biti prisotno.',
  regex: 'Format polja :attribute je neveljaven.',
  required: 'Polje :attribute je obvezno.',
  required_if: 'Polje :attribute je obvezno, če je :other enak :value.',
  required_unless: 'Polje :attribute je obvezno, razen če je :other v :values.',
  required_with: 'Polje :attribute je obvezno, če je :values prisoten.',
  required_with_all: 'Polje :attribute je obvezno, če so :values prisoten.',
  required_without: 'Polje :attribute je obvezno, če :values ni prisoten.',
  required_without_all: 'Polje :attribute je obvezno, če :values niso prisotni.',
  same: 'Polje :attribute in :other se morata ujemati.',
  size: {
    numeric: ':attribute mora biti :size.',
    file: ':attribute mora biti :size kilobajtov.',
    string: ':attribute mora biti :size znakov.',
    array: ':attribute mora vsebovati :size elementov.',
  },
  string: ':attribute mora biti tekst.',
  timezone: ':attribute mora biti časovna cona.',
  unique: ':attribute je že zaseden.',
  uploaded: 'Nalaganje :attribute ni uspelo.',
  url: ':attribute format je neveljaven.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/sq.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/sq.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute duhet të pranohet.',
  active_url: ':attribute nuk është adresë e saktë.',
  after: ':attribute duhet të jetë datë pas :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: ':attribute mund të përmbajë vetëm shkronja.',
  alpha_dash: ':attribute mund të përmbajë vetëm shkronja, numra, dhe viza.',
  alpha_num: ':attribute mund të përmbajë vetëm shkronja dhe numra.',
  array: ':attribute duhet të jetë një bashkësi (array).',
  before: ':attribute duhet të jetë datë para :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: ':attribute duhet të jetë midis :min - :max.',
    file: ':attribute duhet të jetë midis :min - :max kilobajtëve.',
    string: ':attribute duhet të jetë midis :min - :max karaktereve.',
    array: ':attribute duhet të jetë midis :min - :max elementëve.',
  },
  boolean: 'Fusha :attribute duhet të jetë e vërtetë ose e gabuar',
  confirmed: ':attribute konfirmimi nuk përputhet.',
  date: ':attribute nuk është një datë e saktë.',
  date_format: ':attribute nuk i përshtatet formatit :format.',
  different: ':attribute dhe :other duhet të jenë të ndryshme.',
  digits: ':attribute duhet të jetë :digits shifra.',
  digits_between: ':attribute duhet të jetë midis :min dhe :max shifra.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: ':attribute formati është i pasaktë.',
  exists: ':attribute përzgjedhur është i/e pasaktë.',
  file: 'The :attribute must be a file.',
  filled: 'Fusha :attribute është e kërkuar.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: ':attribute duhet të jetë imazh.',
  in: ':attribute përzgjedhur është i/e pasaktë.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: ':attribute duhet të jetë numër i plotë.',
  ip: ':attribute duhet të jetë një IP adresë e saktë.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: ':attribute nuk mund të jetë më tepër se :max.',
    file: ':attribute nuk mund të jetë më tepër se :max kilobajtë.',
    string: ':attribute nuk mund të jetë më tepër se :max karaktere.',
    array: ':attribute nuk mund të ketë më tepër se :max elemente.',
  },
  mimes: ':attribute duhet të jetë një dokument i tipit: :values.',
  mimetypes: ':attribute duhet të jetë një dokument i tipit: :values.',
  min: {
    numeric: ':attribute nuk mund të jetë më pak se :min.',
    file: ':attribute nuk mund të jetë më pak se :min kilobajtë.',
    string: ':attribute nuk mund të jetë më pak se :min karaktere.',
    array: ':attribute nuk mund të ketë më pak se :min elemente.',
  },
  not_in: ':attribute përzgjedhur është i/e pasaktë.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute duhet të jetë një numër.',
  present: 'The :attribute field must be present.',
  regex: 'Formati i :attribute është i pasaktë.',
  required: 'Fusha :attribute është e kërkuar.',
  required_if: 'Fusha :attribute është e kërkuar kur :other është :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Fusha :attribute është e kërkuar kur :values ekziston.',
  required_with_all: 'Fusha :attribute është e kërkuar kur :values ekziston.',
  required_without: 'Fusha :attribute është e kërkuar kur :values nuk ekziston.',
  required_without_all: 'Fusha :attribute është e kërkuar kur nuk ekziston asnjë nga :values.',
  same: ':attribute dhe :other duhet të përputhen.',
  size: {
    numeric: ':attribute duhet të jetë :size.',
    file: ':attribute duhet të jetë :size kilobajtë.',
    string: ':attribute duhet të jetë :size karaktere.',
    array: ':attribute duhet të ketë :size elemente.',
  },
  string: ':attribute duhet të jetë varg.',
  timezone: ':attribute duhet të jetë zonë e saktë.',
  unique: ':attribute është marrë tashmë.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Formati i :attribute është i pasaktë.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/sr.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/sr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Polje :attribute mora biti prihvaćeno.',
  active_url: 'Polje :attribute nije validan URL.',
  after: 'Polje :attribute mora biti datum posle :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Polje :attribute može sadržati samo slova.',
  alpha_dash: 'Polje :attribute može sadržati samo slova, brojeve i povlake.',
  alpha_num: 'Polje :attribute može sadržati samo slova i brojeve.',
  array: 'Polje :attribute mora sadržati nekih niz stavki.',
  before: 'Polje :attribute mora biti datum pre :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Polje :attribute mora biti između :min - :max.',
    file: 'Fajl :attribute mora biti između :min - :max kilobajta.',
    string: 'Polje :attribute mora biti između :min - :max karaktera.',
    array: 'Polje :attribute mora biti između :min - :max stavki.',
  },
  boolean: 'Polje :attribute mora biti tačno ili netačno',
  confirmed: 'Potvrda polja :attribute se ne poklapa.',
  date: 'Polje :attribute nije važeći datum.',
  date_format: 'Polje :attribute ne odgovora prema formatu :format.',
  different: 'Polja :attribute i :other moraju biti različita.',
  digits: 'Polje :attribute mora sadržati :digits šifri.',
  digits_between: 'Polje :attribute mora biti izemđu :min i :max šifri.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Format polja :attribute nije validan.',
  exists: 'Odabrano polje :attribute nije validno.',
  file: 'The :attribute must be a file.',
  filled: 'Polje :attribute je obavezno.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'Polje :attribute mora biti slika.',
  in: 'Odabrano polje :attribute nije validno.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Polje :attribute mora biti broj.',
  ip: 'Polje :attribute mora biti validna IP adresa.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'Polje :attribute mora biti manje od :max.',
    file: 'Polje :attribute mora biti manje od :max kilobajta.',
    string: 'Polje :attribute mora sadržati manje od :max karaktera.',
    array: 'Polje :attribute ne smije da image više od :max stavki.',
  },
  mimes: 'Polje :attribute mora biti fajl tipa: :values.',
  mimetypes: 'Polje :attribute mora biti fajl tipa: :values.',
  min: {
    numeric: 'Polje :attribute mora biti najmanje :min.',
    file: 'Fajl :attribute mora biti najmanje :min kilobajta.',
    string: 'Polje :attribute mora sadržati najmanje :min karaktera.',
    array: 'Polje :attribute mora sadrzati najmanje :min stavku.',
  },
  not_in: 'Odabrani element polja :attribute nije validan.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Polje :attribute mora biti broj.',
  present: 'The :attribute field must be present.',
  regex: 'Format polja :attribute nije validan.',
  required: 'Polje :attribute je obavezno.',
  required_if: 'Polje :attribute je potrebno kada polje :other sadrži :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Polje :attribute je potrebno kada polje :values je prisutan.',
  required_with_all: 'Polje :attribute je obavezno kada je :values prikazano.',
  required_without: 'Polje :attribute je potrebno kada polje :values nije prisutan.',
  required_without_all: 'Polje :attribute je potrebno kada nijedan od sledeći polja :values nisu prisutni.',
  same: 'Polja :attribute i :other se moraju poklapati.',
  size: {
    numeric: 'Polje :attribute mora biti :size.',
    file: 'Fajl :attribute mora biti :size kilobajta.',
    string: 'Polje :attribute mora biti :size karaktera.',
    array: 'Polje :attribute mora sadržati :size stavki.',
  },
  string: 'Polje :attribute mora sadržati slova.',
  timezone: 'Polje :attribute mora biti ispravna vremenska zona.',
  unique: 'Polje :attribute već postoji.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Format polja :attribute ne važi.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/sv.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/sv.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute måste accepteras.',
  active_url: ':attribute är inte en giltig webbadress.',
  after: ':attribute måste vara ett datum efter den :date.',
  after_or_equal: ':attribute måste vara ett datum senare eller samma dag som :date.',
  alpha: ':attribute får endast innehålla bokstäver.',
  alpha_dash: ':attribute får endast innehålla bokstäver, siffror och bindestreck.',
  alpha_num: ':attribute får endast innehålla bokstäver och siffror.',
  array: ':attribute måste vara en array.',
  before: ':attribute måste vara ett datum innan den :date.',
  before_or_equal: ':attribute måste vara ett datum före eller samma dag som :date.',
  between: {
    numeric: ':attribute måste vara en siffra mellan :min och :max.',
    file: ':attribute måste vara mellan :min till :max kilobyte stor.',
    string: ':attribute måste innehålla :min till :max tecken.',
    array: ':attribute måste innehålla mellan :min - :max objekt.',
  },
  boolean: ':attribute måste vara sant eller falskt.',
  confirmed: ':attribute bekräftelsen matchar inte.',
  date: ':attribute är inte ett giltigt datum.',
  date_format: ':attribute matchar inte formatet :format.',
  different: ':attribute och :other får inte vara lika.',
  digits: ':attribute måste vara :digits tecken.',
  digits_between: ':attribute måste vara mellan :min och :max tecken.',
  dimensions: ':attribute har felaktiga bilddimensioner.',
  distinct: ':attribute innehåller fler än en repetition av samma element.',
  email: ':attribute måste innehålla en korrekt e-postadress.',
  exists: ':attribute är ogiltigt.',
  file: ':attribute måste vara en fil.',
  filled: ':attribute är obligatoriskt.',
  gt: {
    numeric: ':attribute måste vara större än :value.',
    file: ':attribute måste vara större än :value kilobyte stor.',
    string: ':attribute måste vara längre än :value tecken.',
    array: ':attribute måste innehålla fler än :value objekt.',
  },
  gte: {
    numeric: ':attribute måste vara lika med eller större än :value.',
    file: ':attribute måste vara lika med eller större än :value kilobyte stor.',
    string: ':attribute måste vara lika med eller längre än :value tecken.',
    array: ':attribute måste innehålla lika många eller fler än :value objekt.',
  },
  image: ':attribute måste vara en bild.',
  in: ':attribute är ogiltigt.',
  in_array: ':attribute finns inte i :other.',
  integer: ':attribute måste vara en siffra.',
  ip: ':attribute måste vara en giltig IP-adress.',
  ipv4: ':attribute måste vara en giltig IPv4-adress.',
  ipv6: ':attribute måste vara en giltig IPv6-adress.',
  json: ':attribute måste vara en giltig JSON-sträng.',
  lt: {
    numeric: ':attribute måste vara mindre än :value.',
    file: ':attribute måste vara mindre än :value kilobyte stor.',
    string: ':attribute måste vara kortare än :value tecken.',
    array: ':attribute måste innehålla färre än :value objekt.',
  },
  lte: {
    numeric: ':attribute måste vara lika med eller mindre än :value.',
    file: ':attribute måste vara lika med eller mindre än :value kilobyte stor.',
    string: ':attribute måste vara lika med eller kortare än :value tecken.',
    array: ':attribute måste innehålla lika många eller färre än :value objekt.',
  },
  max: {
    numeric: ':attribute får inte vara större än :max.',
    file: ':attribute får max vara :max kilobyte stor.',
    string: ':attribute får max innehålla :max tecken.',
    array: ':attribute får inte innehålla mer än :max objekt.',
  },
  mimes: ':attribute måste vara en fil av typen: :values.',
  mimetypes: ':attribute måste vara en fil av typen: :values.',
  min: {
    numeric: ':attribute måste vara större än :min.',
    file: ':attribute måste vara minst :min kilobyte stor.',
    string: ':attribute måste innehålla minst :min tecken.',
    array: ':attribute måste innehålla minst :min objekt.',
  },
  not_in: ':attribute är ogiltigt.',
  not_regex: 'Formatet för :attribute är ogiltigt.',
  numeric: ':attribute måste vara en siffra.',
  present: ':attribute måste finnas med.',
  regex: ':attribute har ogiltigt format.',
  required: ':attribute är obligatoriskt.',
  required_if: ':attribute är obligatoriskt när :other är :value.',
  required_unless: ':attribute är obligatoriskt när inte :other finns bland :values.',
  required_with: ':attribute är obligatoriskt när :values är ifyllt.',
  required_with_all: ':attribute är obligatoriskt när :values är ifyllt.',
  required_without: ':attribute är obligatoriskt när :values ej är ifyllt.',
  required_without_all: ':attribute är obligatoriskt när ingen av :values är ifyllt.',
  same: ':attribute och :other måste vara lika.',
  size: {
    numeric: ':attribute måste vara :size.',
    file: ':attribute får endast vara :size kilobyte stor.',
    string: ':attribute måste innehålla :size tecken.',
    array: ':attribute måste innehålla :size objekt.',
  },
  string: ':attribute måste vara en sträng.',
  timezone: ':attribute måste vara en giltig tidszon.',
  unique: ':attribute används redan.',
  uploaded: ':attribute kunde inte laddas upp.',
  url: ':attribute har ett ogiltigt format.',
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/tr.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/tr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute kabul edilmeli.',
  alpha: ':attribute alanı sadece harflerden oluşabilir.',
  alpha_dash: ':attribute alanı sadece alfa-nümerik, tire ve alt çizgi karakterlerden oluşabilir.',
  alpha_num: ':attribute alanı alfa-nümerik olmalıdır.',
  between: ':attribute alanı :min ile :max arasında olabilir.',
  confirmed: ':attribute uyuşmuyor.',
  email: ':attribute formatı geçersiz.',
  date: ':attribute geöerli bir tarih alanı değil.',
  def: ':attribute hatalar içeriyor.',
  digits: ':attribute sadece rakamlardan oluşabilir.',
  different: ':attribute ve :different farklı olmalı.',
  'in': 'Seçilen :attribute geçerli değil.',
  integer: ':attribute tam sayı olmalı.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute en az :min olmalı.',
    string: ':attribute en az :min karakter uzunluğunda olmalı.'
  },
  max: {
    numeric: ':attribute en çok :max olabilir.',
    string: ':attribute uzunluğu en çok :max karakter uzunluğunda olabilir.'
  },
  not_in: 'Seçilen :attribute geçerli değil.',
  numeric: ':attribute sayı olmalı.',
  present: ':attribute alanı bulunmalıdır (ancak boş olabilir).',
  required: ':attribute alanı gerekli.',
  required_if: ':attribute alanı :other alanı :value olduğunda gerekli.',
  same: ':attribute ve :same aynı olmalı.',
  size: {
    numeric: ':attribute :size olmalı.',
    string: ':attribute :size karakter uzunluğunda olmalı.'
  },
  string: ':attribute alfa-numerik olmalı.',
  url: ':attribute formatı geçersiz.',
  regex: ':attribute formatı geçersiz.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ua.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ua.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute повиннен бути прийнятий.',
  alpha: 'Поле :attribute може складатись тільки з літер.',
  alpha_dash: 'Поле :attribute може складатись тільки з літер, чисел, дефісів та символів підкреслення.',
  alpha_num: 'Поле :attribute може складатись тільки з літер та чисел.',
  between: 'Значення поля :attribute повинно знаходитись між :min і :max.',
  confirmed: 'Поле :attribute не співпадає з підтвердженням.',
  email: 'Значення поля :attribute повинно бути існуючою електронною адресою.',
  def: 'Поле :attribute містить помилки.',
  digits: 'Довжина числового поля :attribute повинна бути :digits.',
  different: 'Поля :attribute і :different повинні відрізнятись.',
  'in': 'Обране значення для :attribute помилкове.',
  integer: 'Значення поля :attribute повинно бути цілим числом.',
  hex: 'Значення поля :attribute повинно бути шістнадцяткового формату',
  min: {
    numeric: 'Значення поля :attribute повинно бути більшим або рівним :min.',
    string: 'Кількість символів в полі :attribute повинна бути не менше :min.'
  },
  max: {
    numeric: 'Значення поля :attribute повинно бути менше або рівне :max.',
    string: 'Кількість символів в полі :attribute не може превищувати :max.'
  },
  not_in: 'Обране значення для :attribute помилкове.',
  numeric: 'Значення поля :attribute повинно бути числом.',
  present: 'Поле :attribute повинно бути присутнім (але може бути пустим).',
  required: 'Поле :attribute обов\'язкове для заповнення.',
  required_if: 'Поле :attribute потрібне у випадку коли значення поля :other рівне :value.',
  same: 'Значеня поля :attribute повинно співпадати з :same.',
  size: {
    numeric: 'Значення поля :attribute повинно бути рівним :size.',
    string: 'Кількість символів в полі :attribute повинна бути рівною :size.'
  },
  url: 'Поле :attribute повинне містити валідний URL.',
  regex: 'Неправильний формат значення :attribute.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/uk.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/uk.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Ви повинні прийняти :attribute.',
  active_url: 'Поле :attribute не є правильним URL.',
  after: 'Поле :attribute має містити дату не раніше :date.',
  after_or_equal: 'Поле :attribute має містити дату не раніше або дорівнюватися :date.',
  alpha: 'Поле :attribute має містити лише літери.',
  alpha_dash: 'Поле :attribute має містити лише літери, цифри та підкреслення.',
  alpha_num: 'Поле :attribute має містити лише літери та цифри.',
  array: 'Поле :attribute має бути масивом.',
  before: 'Поле :attribute має містити дату не пізніше :date.',
  before_or_equal: 'Поле :attribute має містити дату не пізніше або дорівнюватися :date.',
  between: {
    numeric: 'Поле :attribute має бути між :min та :max.',
    file: 'Розмір файлу в полі :attribute має бути не менше :min та не більше :max кілобайт.',
    string: 'Текст в полі :attribute має бути не менше :min та не більше :max символів.',
    array: 'Поле :attribute має містити від :min до :max елементів.',
  },
  boolean: 'Поле :attribute повинне містити логічний тип.',
  confirmed: 'Поле :attribute не збігається з підтвердженням.',
  date: 'Поле :attribute не є датою.',
  date_format: 'Поле :attribute не відповідає формату :format.',
  different: 'Поля :attribute та :other повинні бути різними.',
  digits: 'Довжина цифрового поля :attribute повинна дорівнювати :digits.',
  digits_between: 'Довжина цифрового поля :attribute повинна бути від :min до :max.',
  dimensions: 'Поле :attribute містіть неприпустимі розміри зображення.',
  distinct: 'Поле :attribute містить значення, яке дублюється.',
  email: 'Поле :attribute повинне містити коректну електронну адресу.',
  file: 'Поле :attribute має містити файл.',
  filled: "Поле :attribute є обов'язковим для заповнення.",
  exists: 'Вибране для :attribute значення не коректне.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.',
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.',
  },
  image: 'Поле :attribute має містити зображення.',
  in: 'Вибране для :attribute значення не коректне.',
  in_array: 'Значення поля :attribute не міститься в :other.',
  integer: 'Поле :attribute має містити ціле число.',
  ip: 'Поле :attribute має містити IP адресу.',
  ipv4: 'Поле :attribute має містити IPv4 адресу.',
  ipv6: 'Поле :attribute має містити IPv6 адресу.',
  json: 'Дані поля :attribute мають бути в форматі JSON.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.',
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.',
  },
  max: {
    numeric: 'Поле :attribute має бути не більше :max.',
    file: 'Файл в полі :attribute має бути не більше :max кілобайт.',
    string: 'Текст в полі :attribute повинен мати довжину не більшу за :max.',
    array: 'Поле :attribute повинне містити не більше :max елементів.',
  },
  mimes: 'Поле :attribute повинне містити файл одного з типів: :values.',
  mimetypes: 'Поле :attribute повинне містити файл одного з типів: :values.',
  min: {
    numeric: 'Поле :attribute повинне бути не менше :min.',
    file: 'Розмір файлу в полі :attribute має бути не меншим :min кілобайт.',
    string: 'Текст в полі :attribute повинен містити не менше :min символів.',
    array: 'Поле :attribute повинне містити не менше :min елементів.',
  },
  not_in: 'Вибране для :attribute значення не коректне.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Поле :attribute повинно містити число.',
  present: 'Поле :attribute повинне бути присутнє.',
  regex: 'Поле :attribute має хибний формат.',
  required: "Поле :attribute є обов'язковим для заповнення.",
  required_if: "Поле :attribute є обов'язковим для заповнення, коли :other є рівним :value.",
  required_unless: "Поле :attribute є обов'язковим для заповнення, коли :other відрізняється від :values",
  required_with: "Поле :attribute є обов'язковим для заповнення, коли :values вказано.",
  required_with_all: "Поле :attribute є обов'язковим для заповнення, коли :values вказано.",
  required_without: "Поле :attribute є обов'язковим для заповнення, коли :values не вказано.",
  required_without_all: "Поле :attribute є обов'язковим для заповнення, коли :values не вказано.",
  same: 'Поля :attribute та :other мають співпадати.',
  size: {
    numeric: 'Поле :attribute має бути довжини :size.',
    file: 'Файл в полі :attribute має бути розміром :size кілобайт.',
    string: 'Текст в полі :attribute повинен містити :size символів.',
    array: 'Поле :attribute повинне містити :size елементів.',
  },
  string: 'Поле :attribute повинне містити текст.',
  timezone: 'Поле :attribute повинне містити коректну часову зону.',
  unique: 'Таке значення поля :attribute вже існує.',
  uploaded: 'Завантаження поля :attribute не вдалося.',
  url: 'Формат поля :attribute неправильний.',

};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/vi.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/vi.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute phải được chấp nhận.',
  alpha: 'Trường :attribute phải là ký tự',
  alpha_dash: ':attribute chỉ chấp nhận ký tự chữ cái, số, dấu gạch chéo và gạch dưới.',
  alpha_num: ':attribute phải là ký tự chữ cái hoặc chữ số.',
  between: ':attribute phải nằm trong khoảng :min và :max.',
  confirmed: ':attribute xác nhận không trùng khớp.',
  email: ':attribute không phải là email.',
  date: ':attribute không phải là ngày hợp lệ',
  def: 'Thuộc tính :attribute có lỗi.',
  digits: ':attribute phải là số và có chiều dài bằng :digits.',
  different: 'Giá trị của hai trường :attribute và :different phải khác nhau.',
  'in': 'Giá trị được chọn của :attribute không hợp lệ.',
  integer: ':attribute phải là số nguyên.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute phải lớn hơn hoặc bằng :min.',
    string: ':attribute phải có ít nhất :min ký tự.'
  },
  max: {
    numeric: ':attribute phải nhỏ hơn hoặc bằng :max.',
    string: ':attribute phải có ít hơn :max ký tự.'
  },
  not_in: 'Giá trị được chọn của trường :attribute không hợp lệ.',
  numeric: ':attribute phải là số.',
  present: 'Trường :attribute phải có mặt (nhưng có thể để trống).',
  required: ':attribute bắt buộc nhập.',
  required_if: ':attribute là bắt buộc khi :other có giá trị :value.',
  same: 'Giá trị của :attribute và :same phải như nhau.',
  size: {
    numeric: ':attribute phải có chiều dài của bằng :size.',
    string: 'Số ký tự của :attribute phải là :size ký tự.'
  },
  string: ':attribute không phải là một chuỗi',
  url: ':attribute không phải là một Url hợp lệ.',
  regex: ':attribute không đúng định dạng',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/zh.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/zh.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute必须是可接受的.',
  alpha: ':attribute只能包含字母.',
  alpha_dash: ':attribute只能包含字母,连字符和下划线.',
  alpha_num: ':attribute只能包含字母和数字.',
  between: ':attribute的(大小,长度等)只能在:min和:max之间.',
  confirmed: ':attribute确认不一致.',
  email: ':attribute格式不正确.',
  date: ':attribute日期格式错误.',
  def: ':attribute属性错误.',
  digits: ':attribute必须是:digits位小数.',
  different: ':attribute和:different必须不同.',
  'in': '选择的:attribute无效',
  integer: ':attribute必须是一个整数.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute不能小于:min.',
    string: ':attribute长度不能小于:min.'
  },
  max: {
    numeric: ':attribute不能大于:max.',
    string: ':attribute长度不能大于:max.'
  },
  not_in: '所选的:attribute无效.',
  numeric: ':attribute必须是一个数字.',
  present: 'The :attribute field must be present (but can be empty).',
  required: ':attribute不能为空.',
  required_if: '当:other是:value时,:attribute不能为空.',
  same: ':attribute和:same必须一致.',
  size: {
    numeric: ':attribute必须等于:size.',
    string: ':attribute的长度必须等于:size.'
  },
  string: ':attribute必须是一个字符串.',
  url: ':attribute格式不正确.',
  regex: ':attribute格式不正确.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/zh_TW.js":
/*!****************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/zh_TW.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute必須接受。',
  alpha: ':attribute只能包含字母。',
  alpha_dash: ':attribute只能包含字母，連字符和下划線。',
  alpha_num: ':attribute只能包含字母和數字。',
  between: ':attribute的值只能在:min和:max之間。',
  confirmed: ':attribute與確認輸入不一致。',
  email: ':attribute的格式錯誤。',
  date: ':attribute的日期格式錯誤。',
  def: ':attribute屬性錯誤。',
  digits: ':attribute必須是:digits位小數。',
  different: ':attribute和:different必須不同。',
  'in': '選擇的:attribute無效',
  integer: ':attribute必須是一個整數。',
  hex: ':attribute 必須是十六進位格式',
  min: {
    numeric: ':attribute不能小於:min。',
    string: ':attribute的長度不能小於:min.'
  },
  max: {
    numeric: ':attribute不能大於:max。',
    string: ':attribute的長度不能大於:max.'
  },
  not_in: '所選的:attribute無效。',
  numeric: ':attribute必須是一個數字。',
  present: ':attribute 一定要有值 (可以是空值)。',
  required: ':attribute不能空白。',
  required_if: '當:other是:value時,:attribute不能空白。',
  same: ':attribute和:same必須一致。',
  size: {
    numeric: ':attribute必須等於:size。',
    string: ':attribute的長度必須等於:size.'
  },
  string: ':attribute必須是一個字串。',
  url: ':attribute格式不正確。',
  regex: ':attribute格式不正確。',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/messages.js":
/*!**************************************************!*\
  !*** ./node_modules/validatorjs/src/messages.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Attributes = __webpack_require__(/*! ./attributes */ "./node_modules/validatorjs/src/attributes.js");

var Messages = function(lang, messages) {
  this.lang = lang;
  this.messages = messages;
  this.customMessages = {};
  this.attributeNames = {};
};

Messages.prototype = {
  constructor: Messages,

  /**
   * Set custom messages
   *
   * @param {object} customMessages
   * @return {void}
   */
  _setCustom: function(customMessages) {
    this.customMessages = customMessages || {};
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   */
  _setAttributeNames: function(attributes) {
    this.attributeNames = attributes;
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  _setAttributeFormatter: function(func) {
    this.attributeFormatter = func;
  },

  /**
   * Get attribute name to display.
   *
   * @param  {string} attribute
   * @return {string}
   */
  _getAttributeName: function(attribute) {
    var name = attribute;
    if (this.attributeNames.hasOwnProperty(attribute)) {
      return this.attributeNames[attribute];
    } else if (this.messages.attributes.hasOwnProperty(attribute)) {
      name = this.messages.attributes[attribute];
    }

    if (this.attributeFormatter) {
      name = this.attributeFormatter(name);
    }

    return name;
  },

  /**
   * Get all messages
   *
   * @return {object}
   */
  all: function() {
    return this.messages;
  },

  /**
   * Render message
   *
   * @param  {Rule} rule
   * @return {string}
   */
  render: function(rule) {
    if (rule.customMessage) {
      return rule.customMessage;
    }
    var template = this._getTemplate(rule);

    var message;
    if (Attributes.replacements[rule.name]) {
      message = Attributes.replacements[rule.name].apply(this, [template, rule]);
    } else {
      message = this._replacePlaceholders(rule, template, {});
    }

    return message;
  },

  /**
   * Get the template to use for given rule
   *
   * @param  {Rule} rule
   * @return {string}
   */
  _getTemplate: function(rule) {

    var messages = this.messages;
    var template = messages.def;
    var customMessages = this.customMessages;
    var formats = [rule.name + '.' + rule.attribute, rule.name];

    for (var i = 0, format; i < formats.length; i++) {
      format = formats[i];
      if (customMessages.hasOwnProperty(format)) {
        template = customMessages[format];
        break;
      } else if (messages.hasOwnProperty(format)) {
        template = messages[format];
        break;
      }
    }

    if (typeof template === 'object') {
      template = template[rule._getValueType()];
    }

    return template;
  },

  /**
   * Replace placeholders in the template using the data object
   *
   * @param  {Rule} rule
   * @param  {string} template
   * @param  {object} data
   * @return {string}
   */
  _replacePlaceholders: function(rule, template, data) {
    var message, attribute;

    data.attribute = this._getAttributeName(rule.attribute);
    data[rule.name] = data[rule.name] || rule.getParameters().join(',');

    if (typeof template === 'string' && typeof data === 'object') {
      message = template;

      for (attribute in data) {
        message = message.replace(new RegExp(':' + attribute, 'g'), data[attribute]);
      }
    }

    return message;
  }

};

module.exports = Messages;


/***/ }),

/***/ "./node_modules/validatorjs/src/rules.js":
/*!***********************************************!*\
  !*** ./node_modules/validatorjs/src/rules.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function leapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function isValidDate(inDate) {
    var valid = true;

    // reformat if supplied as mm.dd.yyyy (period delimiter)
    if (typeof inDate === 'string') {
      var pos = inDate.indexOf('.');
      if ((pos > 0 && pos <= 6)) {
        inDate = inDate.replace(/\./g, '-');
      }
    }

    var testDate = new Date(inDate);
    var yr = testDate.getFullYear();
    var mo = testDate.getMonth();
    var day = testDate.getDate();

    var daysInMonth = [31, (leapYear(yr) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (yr < 1000) { return false; }
    if (isNaN(mo)) { return false; }
    if (mo + 1 > 12) { return false; }
    if (isNaN(day)) { return false; }
    if (day > daysInMonth[mo]) { return false; }

    return valid;
}

var rules = {

  required: function(val) {
    var str;

    if (val === undefined || val === null) {
      return false;
    }

    str = String(val).replace(/\s/g, "");
    return str.length > 0 ? true : false;
  },

  required_if: function(val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) === req[1]) {
      return this.validator.getRule('required').validate(val);
    }

    return true;
  },

  required_unless: function(val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) !== req[1]) {
      return this.validator.getRule('required').validate(val);
    }

    return true;
  },

  required_with: function(val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return this.validator.getRule('required').validate(val);
    }

    return true;
  },

  required_with_all: function(val, req, attribute) {

    req = this.getParameters();

    for(var i = 0; i < req.length; i++) {
      if (!this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule('required').validate(val);
  },

  required_without: function(val, req, attribute) {

    if (this.validator._objectPath(this.validator.input, req)) {
      return true;
    }

    return this.validator.getRule('required').validate(val);
  },

  required_without_all: function(val, req, attribute) {

    req = this.getParameters();

    for(var i = 0; i < req.length; i++) {
      if (this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule('required').validate(val);
  },

  'boolean': function (val) {
    return (
      val === true ||
      val === false ||
      val === 0 ||
      val === 1 ||
      val === '0' ||
      val === '1' ||
      val === 'true' ||
      val === 'false'
    );
  },

  // compares the size of strings
  // with numbers, compares the value
  size: function(val, req, attribute) {
    if (val) {
      req = parseFloat(req);

      var size = this.getSize();

      return size === req;
    }

    return true;
  },

  string: function(val, req, attribute) {
    return typeof val === 'string';
  },

  sometimes: function(val) {
    return true;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  min: function(val, req, attribute) {
    var size = this.getSize();
    return size >= req;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  max: function(val, req, attribute) {
    var size = this.getSize();
    return size <= req;
  },

  between: function(val, req, attribute) {
    req = this.getParameters();
    var size = this.getSize();
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);
    return size >= min && size <= max;
  },

  email: function(val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  },

  numeric: function(val) {
    var num;

    num = Number(val); // tries to convert value to a number. useful if value is coming from form element

    if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
      return true;
    } else {
      return false;
    }
  },

  array: function(val) {
    return val instanceof Array;
  },

  url: function(url) {
    return (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i).test(url);
  },

  alpha: function(val) {
    return (/^[a-zA-Z]+$/).test(val);
  },

  alpha_dash: function(val) {
    return (/^[a-zA-Z0-9_\-]+$/).test(val);
  },

  alpha_num: function(val) {
    return (/^[a-zA-Z0-9]+$/).test(val);
  },

  same: function(val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;

    if (val1 === val2) {
      return true;
    }

    return false;
  },

  different: function(val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;

    if (val1 !== val2) {
      return true;
    }

    return false;
  },

  "in": function(val, req) {
    var list, i;

    if (val) {
      list = this.getParameters();
    }

    if (val && !(val instanceof Array)) {
      var localValue = val;

      for (i = 0; i < list.length; i++) {
        if (typeof list[i] === 'string') {
          localValue = String(val);
        }

        if (localValue === list[i]) {
          return true;
        }
      }

      return false;
    }

    if (val && val instanceof Array) {
      for (i = 0; i < val.length; i++) {
        if (list.indexOf(val[i]) < 0) {
          return false;
        }
      }
    }

    return true;
  },

  not_in: function(val, req) {
    var list = this.getParameters();
    var len = list.length;
    var returnVal = true;

    for (var i = 0; i < len; i++) {
      var localValue = val;

      if (typeof list[i] === 'string') {
        localValue = String(val);
      }

      if (localValue === list[i]) {
        returnVal = false;
        break;
      }
    }

    return returnVal;
  },

  accepted: function(val) {
    if (val === 'on' || val === 'yes' || val === 1 || val === '1' || val === true) {
      return true;
    }

    return false;
  },

  confirmed: function(val, req, key) {
    var confirmedKey = key + '_confirmation';

    if (this.validator.input[confirmedKey] === val) {
      return true;
    }

    return false;
  },

  integer: function(val) {
    return String(parseInt(val, 10)) === String(val);
  },

  digits: function(val, req) {
    var numericRule = this.validator.getRule('numeric');
    if (numericRule.validate(val) && String(val).length === parseInt(req)) {
      return true;
    }

    return false;
  },

  regex: function(val, req) {
    var mod = /[g|i|m]{1,3}$/;
    var flag = req.match(mod);
    flag = flag ? flag[0] : "";
    req = req.replace(mod, "").slice(1, -1);
    req = new RegExp(req, flag);
    return !!req.test(val);
  },

  date: function(val, format) {
    return isValidDate(val);
  },

  present: function(val) {
    return typeof val !== 'undefined';
  },

  after: function(val, req){
    var val1 = this.validator.input[req];
    var val2 = val;

    if(!isValidDate(val1)){ return false;}
    if(!isValidDate(val2)){ return false;}

    if (new Date(val1).getTime() < new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

   after_or_equal: function(val, req){
    var val1 = this.validator.input[req];
    var val2 = val;

    if(!isValidDate(val1)){ return false;}
    if(!isValidDate(val2)){ return false;}

    if (new Date(val1).getTime() <= new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  before: function(val, req){
    var val1 = this.validator.input[req];
    var val2 = val;

    if(!isValidDate(val1)){ return false;}
    if(!isValidDate(val2)){ return false;}

    if (new Date(val1).getTime() > new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

   before_or_equal: function(val, req){
    var val1 = this.validator.input[req];
    var val2 = val;

    if(!isValidDate(val1)){ return false;}
    if(!isValidDate(val2)){ return false;}

    if (new Date(val1).getTime() >= new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  hex: function(val) {
    return (/^[0-9a-f]+$/i).test(val);
  }
};

var missedRuleValidator = function() {
  throw new Error('Validator `' + this.name + '` is not defined!');
};
var missedRuleMessage;

function Rule(name, fn, async) {
  this.name = name;
  this.fn = fn;
  this.passes = null;
  this._customMessage = undefined;
  this.async = async;
}

Rule.prototype = {

  /**
   * Validate rule
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  validate: function(inputValue, ruleValue, attribute, callback) {
    var _this = this;
    this._setValidatingData(attribute, inputValue, ruleValue);
    if (typeof callback === 'function') {
      this.callback = callback;
      var handleResponse = function(passes, message) {
        _this.response(passes, message);
      };

      if (this.async) {
        return this._apply(inputValue, ruleValue, attribute, handleResponse);
      } else {
        return handleResponse(this._apply(inputValue, ruleValue, attribute));
      }
    }
    return this._apply(inputValue, ruleValue, attribute);
  },

  /**
   * Apply validation function
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  _apply: function(inputValue, ruleValue, attribute, callback) {
    var fn = this.isMissed() ? missedRuleValidator : this.fn;

    return fn.apply(this, [inputValue, ruleValue, attribute, callback]);
  },

  /**
   * Set validating data
   *
   * @param {string} attribute
   * @param {mixed} inputValue
   * @param {mixed} ruleValue
   * @return {void}
   */
  _setValidatingData: function(attribute, inputValue, ruleValue) {
    this.attribute = attribute;
    this.inputValue = inputValue;
    this.ruleValue = ruleValue;
  },

  /**
   * Get parameters
   *
   * @return {array}
   */
  getParameters: function() {
    var value = [];

    if (typeof this.ruleValue === 'string') {
      value = this.ruleValue.split(',');
    }

    if (typeof this.ruleValue === 'number') {
      value.push(this.ruleValue);
    }

    if (this.ruleValue instanceof Array) {
      value = this.ruleValue;
    }

    return value;
  },

  /**
   * Get true size of value
   *
   * @return {integer|float}
   */
  getSize: function() {
    var value = this.inputValue;

    if (value instanceof Array) {
      return value.length;
    }

    if (typeof value === 'number') {
      return value;
    }

    if (this.validator._hasNumericRule(this.attribute)) {
      return parseFloat(value, 10);
    }

    return value.length;
  },

  /**
   * Get the type of value being checked; numeric or string.
   *
   * @return {string}
   */
  _getValueType: function() {

    if (typeof this.inputValue === 'number' || this.validator._hasNumericRule(this.attribute)) {
      return 'numeric';
    }

    return 'string';
  },

  /**
   * Set the async callback response
   *
   * @param  {boolean|undefined} passes  Whether validation passed
   * @param  {string|undefined} message Custom error message
   * @return {void}
   */
  response: function(passes, message) {
    this.passes = (passes === undefined || passes === true);
    this._customMessage = message;
    this.callback(this.passes, message);
  },

  /**
   * Set validator instance
   *
   * @param {Validator} validator
   * @return {void}
   */
  setValidator: function(validator) {
    this.validator = validator;
  },

  /**
   * Check if rule is missed
   *
   * @return {boolean}
   */
  isMissed: function() {
    return typeof this.fn !== 'function';
  },

  get customMessage() {
    return this.isMissed() ? missedRuleMessage : this._customMessage;
  }
};

var manager = {

  /**
   * List of async rule names
   *
   * @type {Array}
   */
  asyncRules: [],

  /**
   * Implicit rules (rules to always validate)
   *
   * @type {Array}
   */
  implicitRules: ['required', 'required_if', 'required_unless', 'required_with', 'required_with_all', 'required_without', 'required_without_all', 'accepted', 'present'],

  /**
   * Get rule by name
   *
   * @param  {string} name
   * @param {Validator}
   * @return {Rule}
   */
  make: function(name, validator) {
    var async = this.isAsync(name);
    var rule = new Rule(name, rules[name], async);
    rule.setValidator(validator);
    return rule;
  },

  /**
   * Determine if given rule is async
   *
   * @param  {string}  name
   * @return {boolean}
   */
  isAsync: function(name) {
    for (var i = 0, len = this.asyncRules.length; i < len; i++) {
      if (this.asyncRules[i] === name) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if rule is implicit (should always validate)
   *
   * @param {string} name
   * @return {boolean}
   */
  isImplicit: function(name) {
    return this.implicitRules.indexOf(name) > -1;
  },

  /**
   * Register new rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  register: function(name, fn) {
    rules[name] = fn;
  },

    /**
   * Register new implicit rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerImplicit: function(name, fn) {
    this.register(name, fn);
    this.implicitRules.push(name);
  },

  /**
   * Register async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsync: function(name, fn) {
    this.register(name, fn);
    this.asyncRules.push(name);
  },

  /**
   * Register implicit async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsyncImplicit: function(name, fn) {
    this.registerImplicit(name, fn);
    this.asyncRules.push(name);
  },

  registerMissedRuleValidator: function(fn, message) {
    missedRuleValidator = fn;
    missedRuleMessage = message;
  }
};



module.exports = manager;


/***/ }),

/***/ "./node_modules/validatorjs/src/validator.js":
/*!***************************************************!*\
  !*** ./node_modules/validatorjs/src/validator.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Rules = __webpack_require__(/*! ./rules */ "./node_modules/validatorjs/src/rules.js");
var Lang = __webpack_require__(/*! ./lang */ "./node_modules/validatorjs/src/lang.js");
var Errors = __webpack_require__(/*! ./errors */ "./node_modules/validatorjs/src/errors.js");
var Attributes = __webpack_require__(/*! ./attributes */ "./node_modules/validatorjs/src/attributes.js");
var AsyncResolvers = __webpack_require__(/*! ./async */ "./node_modules/validatorjs/src/async.js");

var Validator = function (input, rules, customMessages) {
  var lang = Validator.getDefaultLang();
  this.input = input || {};

  this.messages = Lang._make(lang);
  this.messages._setCustom(customMessages);
  this.setAttributeFormatter(Validator.prototype.attributeFormatter);

  this.errors = new Errors();
  this.errorCount = 0;

  this.hasAsync = false;
  this.rules = this._parseRules(rules);
};

Validator.prototype = {

  constructor: Validator,

  /**
   * Default language
   *
   * @type {string}
   */
  lang: 'en',

  /**
   * Numeric based rules
   *
   * @type {array}
   */
  numericRules: ['integer', 'numeric'],

  /**
   * Attribute formatter.
   *
   * @type {function}
   */
  attributeFormatter: Attributes.formatter,

  /**
   * Run validator
   *
   * @return {boolean} Whether it passes; true = passes, false = fails
   */
  check: function () {
    var self = this;

    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);

      if (this._hasRule(attribute, ['sometimes']) && !this._suppliedWithData(attribute)) {
        continue;
      }

      for (var i = 0, len = attributeRules.length, rule, ruleOptions, rulePassed; i < len; i++) {
        ruleOptions = attributeRules[i];
        rule = this.getRule(ruleOptions.name);

        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }

        rulePassed = rule.validate(inputValue, ruleOptions.value, attribute);
        if (!rulePassed) {
          this._addFailure(rule);
        }

        if (this._shouldStopValidating(attribute, rulePassed)) {
          break;
        }
      }
    }

    return this.errorCount === 0;
  },

  /**
   * Run async validator
   *
   * @param {function} passes
   * @param {function} fails
   * @return {void}
   */
  checkAsync: function (passes, fails) {
    var _this = this;
    passes = passes || function () {};
    fails = fails || function () {};

    var failsOne = function (rule, message) {
      _this._addFailure(rule, message);
    };

    var resolvedAll = function (allPassed) {
      if (allPassed) {
        passes();
      } else {
        fails();
      }
    };

    var asyncResolvers = new AsyncResolvers(failsOne, resolvedAll);

    var validateRule = function (inputValue, ruleOptions, attribute, rule) {
      return function () {
        var resolverIndex = asyncResolvers.add(rule);
        rule.validate(inputValue, ruleOptions.value, attribute, function () {
          asyncResolvers.resolve(resolverIndex);
        });
      };
    };

    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);

      if (this._hasRule(attribute, ['sometimes']) && !this._suppliedWithData(attribute)) {
        continue;
      }

      for (var i = 0, len = attributeRules.length, rule, ruleOptions; i < len; i++) {
        ruleOptions = attributeRules[i];

        rule = this.getRule(ruleOptions.name);

        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }

        validateRule(inputValue, ruleOptions, attribute, rule)();
      }
    }

    asyncResolvers.enableFiring();
    asyncResolvers.fire();
  },

  /**
   * Add failure and error message for given rule
   *
   * @param {Rule} rule
   */
  _addFailure: function (rule) {
    var msg = this.messages.render(rule);
    this.errors.add(rule.attribute, msg);
    this.errorCount++;
  },

  /**
   * Flatten nested object, normalizing { foo: { bar: 1 } } into: { 'foo.bar': 1 }
   *
   * @param  {object} nested object
   * @return {object} flattened object
   */
  _flattenObject: function (obj) {
    var flattened = {};

    function recurse(current, property) {
      if (!property && Object.getOwnPropertyNames(current).length === 0) {
        return;
      }
      if (Object(current) !== current || Array.isArray(current)) {
        flattened[property] = current;
      } else {
        var isEmpty = true;
        for (var p in current) {
          isEmpty = false;
          recurse(current[p], property ? property + "." + p : p);
        }
        if (isEmpty) {
          flattened[property] = {};
        }
      }
    }
    if (obj) {
      recurse(obj);
    }
    return flattened;
  },

  /**
   * Extract value from nested object using string path with dot notation
   *
   * @param  {object} object to search in
   * @param  {string} path inside object
   * @return {any|void} value under the path
   */
  _objectPath: function (obj, path) {
    if (Object.prototype.hasOwnProperty.call(obj, path)) {
      return obj[path];
    }

    var keys = path.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "").split(".");
    var copy = {};
    for (var attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        copy[attr] = obj[attr];
      }
    }

    for (var i = 0, l = keys.length; i < l; i++) {
      if (Object.hasOwnProperty.call(copy, keys[i])) {
        copy = copy[keys[i]];
      } else {
        return;
      }
    }
    return copy;
  },

  /**
   * Parse rules, normalizing format into: { attribute: [{ name: 'age', value: 3 }] }
   *
   * @param  {object} rules
   * @return {object}
   */
  _parseRules: function (rules) {

    var parsedRules = {};
    rules = this._flattenObject(rules);

    for (var attribute in rules) {

      var rulesArray = rules[attribute];

      this._parseRulesCheck(attribute, rulesArray, parsedRules);
    }
    return parsedRules;


  },

  _parseRulesCheck: function (attribute, rulesArray, parsedRules, wildCardValues) {
    if (attribute.indexOf('*') > -1) {
      this._parsedRulesRecurse(attribute, rulesArray, parsedRules, wildCardValues);
    } else {
      this._parseRulesDefault(attribute, rulesArray, parsedRules, wildCardValues);
    }
  },

  _parsedRulesRecurse: function (attribute, rulesArray, parsedRules, wildCardValues) {
    var parentPath = attribute.substr(0, attribute.indexOf('*') - 1);
    var propertyValue = this._objectPath(this.input, parentPath);

    if (propertyValue) {
      for (var propertyNumber = 0; propertyNumber < propertyValue.length; propertyNumber++) {
        var workingValues = wildCardValues ? wildCardValues.slice() : [];
        workingValues.push(propertyNumber);
        this._parseRulesCheck(attribute.replace('*', propertyNumber), rulesArray, parsedRules, workingValues);
      }
    }
  },

  _parseRulesDefault: function (attribute, rulesArray, parsedRules, wildCardValues) {
    var attributeRules = [];

    if (rulesArray instanceof Array) {
      rulesArray = this._prepareRulesArray(rulesArray);
    }

    if (typeof rulesArray === 'string') {
      rulesArray = rulesArray.split('|');
    }

    for (var i = 0, len = rulesArray.length, rule; i < len; i++) {
      rule = typeof rulesArray[i] === 'string' ? this._extractRuleAndRuleValue(rulesArray[i]) : rulesArray[i];
      if (rule.value) {
        rule.value = this._replaceWildCards(rule.value, wildCardValues);
        this._replaceWildCardsMessages(wildCardValues);
      }

      if (Rules.isAsync(rule.name)) {
        this.hasAsync = true;
      }
      attributeRules.push(rule);
    }

    parsedRules[attribute] = attributeRules;
  },

  _replaceWildCards: function (path, nums) {

    if (!nums) {
      return path;
    }

    var path2 = path;
    nums.forEach(function (value) {
      if(Array.isArray(path2)){
        path2 = path2[0];
      }
      pos = path2.indexOf('*');
      if (pos === -1) {
        return path2;
      }
      path2 = path2.substr(0, pos) + value + path2.substr(pos + 1);
    });
    if(Array.isArray(path)){
      path[0] = path2;
      path2 = path;
    }
    return path2;
  },

  _replaceWildCardsMessages: function (nums) {
    var customMessages = this.messages.customMessages;
    var self = this;
    Object.keys(customMessages).forEach(function (key) {
      if (nums) {
        var newKey = self._replaceWildCards(key, nums);
        customMessages[newKey] = customMessages[key];
      }
    });

    this.messages._setCustom(customMessages);
  },
  /**
   * Prepare rules if it comes in Array. Check for objects. Need for type validation.
   *
   * @param  {array} rulesArray
   * @return {array}
   */
  _prepareRulesArray: function (rulesArray) {
    var rules = [];

    for (var i = 0, len = rulesArray.length; i < len; i++) {
      if (typeof rulesArray[i] === 'object') {
        for (var rule in rulesArray[i]) {
          rules.push({
            name: rule,
            value: rulesArray[i][rule]
          });
        }
      } else {
        rules.push(rulesArray[i]);
      }
    }

    return rules;
  },

  /**
   * Determines if the attribute is supplied with the original data object.
   *
   * @param  {array} attribute
   * @return {boolean}
   */
  _suppliedWithData: function (attribute) {
    return this.input.hasOwnProperty(attribute);
  },

  /**
   * Extract a rule and a value from a ruleString (i.e. min:3), rule = min, value = 3
   *
   * @param  {string} ruleString min:3
   * @return {object} object containing the name of the rule and value
   */
  _extractRuleAndRuleValue: function (ruleString) {
    var rule = {},
      ruleArray;

    rule.name = ruleString;

    if (ruleString.indexOf(':') >= 0) {
      ruleArray = ruleString.split(':');
      rule.name = ruleArray[0];
      rule.value = ruleArray.slice(1).join(":");
    }

    return rule;
  },

  /**
   * Determine if attribute has any of the given rules
   *
   * @param  {string}  attribute
   * @param  {array}   findRules
   * @return {boolean}
   */
  _hasRule: function (attribute, findRules) {
    var rules = this.rules[attribute] || [];
    for (var i = 0, len = rules.length; i < len; i++) {
      if (findRules.indexOf(rules[i].name) > -1) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if attribute has any numeric-based rules.
   *
   * @param  {string}  attribute
   * @return {Boolean}
   */
  _hasNumericRule: function (attribute) {
    return this._hasRule(attribute, this.numericRules);
  },

  /**
   * Determine if rule is validatable
   *
   * @param  {Rule}   rule
   * @param  {mixed}  value
   * @return {boolean}
   */
  _isValidatable: function (rule, value) {
    if (Rules.isImplicit(rule.name)) {
      return true;
    }

    return this.getRule('required').validate(value);
  },

  /**
   * Determine if we should stop validating.
   *
   * @param  {string} attribute
   * @param  {boolean} rulePassed
   * @return {boolean}
   */
  _shouldStopValidating: function (attribute, rulePassed) {

    var stopOnAttributes = this.stopOnAttributes;
    if (typeof stopOnAttributes === 'undefined' || stopOnAttributes === false || rulePassed === true) {
      return false;
    }

    if (stopOnAttributes instanceof Array) {
      return stopOnAttributes.indexOf(attribute) > -1;
    }

    return true;
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   * @return {void}
   */
  setAttributeNames: function (attributes) {
    this.messages._setAttributeNames(attributes);
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  setAttributeFormatter: function (func) {
    this.messages._setAttributeFormatter(func);
  },

  /**
   * Get validation rule
   *
   * @param  {string} name
   * @return {Rule}
   */
  getRule: function (name) {
    return Rules.make(name, this);
  },

  /**
   * Stop on first error.
   *
   * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
   * @return {void}
   */
  stopOnError: function (attributes) {
    this.stopOnAttributes = attributes;
  },

  /**
   * Determine if validation passes
   *
   * @param {function} passes
   * @return {boolean|undefined}
   */
  passes: function (passes) {
    var async = this._checkAsync('passes', passes);
    if (async) {
      return this.checkAsync(passes);
    }
    return this.check();
  },

  /**
   * Determine if validation fails
   *
   * @param {function} fails
   * @return {boolean|undefined}
   */
  fails: function (fails) {
    var async = this._checkAsync('fails', fails);
    if (async) {
      return this.checkAsync(function () {}, fails);
    }
    return !this.check();
  },

  /**
   * Check if validation should be called asynchronously
   *
   * @param  {string}   funcName Name of the caller
   * @param  {function} callback
   * @return {boolean}
   */
  _checkAsync: function (funcName, callback) {
    var hasCallback = typeof callback === 'function';
    if (this.hasAsync && !hasCallback) {
      throw funcName + ' expects a callback when async rules are being tested.';
    }

    return this.hasAsync || hasCallback;
  }

};

/**
 * Set messages for language
 *
 * @param {string} lang
 * @param {object} messages
 * @return {this}
 */
Validator.setMessages = function (lang, messages) {
  Lang._set(lang, messages);
  return this;
};

/**
 * Get messages for given language
 *
 * @param  {string} lang
 * @return {Messages}
 */
Validator.getMessages = function (lang) {
  return Lang._get(lang);
};

/**
 * Set default language to use
 *
 * @param {string} lang
 * @return {void}
 */
Validator.useLang = function (lang) {
  this.prototype.lang = lang;
};

/**
 * Get default language
 *
 * @return {string}
 */
Validator.getDefaultLang = function () {
  return this.prototype.lang;
};

/**
 * Set the attribute formatter.
 *
 * @param {fuction} func
 * @return {void}
 */
Validator.setAttributeFormatter = function (func) {
  this.prototype.attributeFormatter = func;
};

/**
 * Stop on first error.
 *
 * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
 * @return {void}
 */
Validator.stopOnError = function (attributes) {
  this.prototype.stopOnAttributes = attributes;
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.register = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.register(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerImplicit = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.registerImplicit(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsync = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.registerAsync(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsyncImplicit = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.registerAsyncImplicit(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register validator for missed validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerMissedRuleValidator = function(fn, message) {
  Rules.registerMissedRuleValidator(fn, message);
};

module.exports = Validator;


/***/ })

}]);