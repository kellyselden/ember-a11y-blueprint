'use strict';

module.exports = {
  name: require('./package').name,

  availableOptions: [
    {
      name: "lang",
      type: String,
      default: "en"
    }
  ],

  locals(options) {
    return {
      lang: options.lang || this.availableOptions.find(o => o.name === 'lang').default
    };
  },

  fileMapTokens(options) {
    return {
      __root__() {
        return options.inAddon ? 'tests/dummy' : '';
      }
    };
  }
};
