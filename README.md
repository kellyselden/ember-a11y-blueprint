ember-a11y-blueprint
==============================================================================

[![npm version](https://badge.fury.io/js/ember-a11y-blueprint.svg)](https://badge.fury.io/js/ember-a11y-blueprint)
[![Build Status](https://travis-ci.com/kellyselden/ember-a11y-blueprint.svg?branch=master)](https://travis-ci.com/kellyselden/ember-a11y-blueprint)

A11y enhancements to the default Ember-CLI blueprint

Inspired by the conversation in https://github.com/ember-cli/ember-cli/issues/8599

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember init -b ember-a11y-blueprint
```


Usage
------------------------------------------------------------------------------

### Using custom language with the blueprint

If you want to set a language other than `en` as your default language for your app
you can make use of the `--lang` option with the blueprint.

For example if you want `es` as your default language,
```
ember init -b ember-a11y-blueprint --lang=es
```

For the entire list of available language codes, you can refer [here](https://www.loc.gov/standards/iso639-2/php/English_list.php)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
