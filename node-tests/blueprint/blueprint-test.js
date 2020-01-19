'use strict';

const path = require('path');
const {
  emberNew: _emberNew,
  emberInit: _emberInit,
  setUpBlueprintMocha
} = require('ember-cli-update-test-helpers');
const chai = require('chai');

chai.use(require('chai-fs'));

const { expect } = chai;

async function emberNew({
  args = []
}) {
  return await _emberNew({
    args: [
      '-sn',
      '-sg',
      ...args
    ]
  });
}

async function emberInit({
  args = [],
  cwd
}) {
  return await _emberInit({
    args: [
      '-sn',
      ...args
    ],
    cwd
  });
}

describe('blueprint', function() {
  this.timeout(10 * 1000);

  setUpBlueprintMocha.call(this);

  it('works with default options', async function() {
    let cwd = await emberNew({
      args: [
        '-b',
        this.blueprintPath
      ]
    });

    expect(path.join(cwd, 'app/index.html'))
      .to.be.a.file().with.contents.that.match(/<html lang="en">/);
  });

  it('works with custom options', async function() {
    let cwd = await emberNew({
      args: [
        '-b',
        this.blueprintPath,
        '--lang=es'
      ]
    });

    expect(path.join(cwd, 'app/index.html'))
      .to.be.a.file().with.contents.that.match(/<html lang="es">/);
  });

  it('works in addon', async function() {
    let cwd = await emberNew({
      args: [
        '-b=addon'
      ]
    });

    await emberInit({
      args: [
        '-b',
        this.blueprintPath
      ],
      cwd
    });

    expect(path.join(cwd, 'tests/dummy/app/index.html'))
      .to.be.a.file().with.contents.that.match(/<html lang="en">/);
  });
});
