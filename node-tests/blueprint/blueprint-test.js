'use strict';

const execa = require('execa');
const { promisify } = require('util');
const newTmpDir = promisify(require('tmp').dir);
const path = require('path');
const chai = require('chai');

chai.use(require('chai-fs'));

const { expect } = chai;

const blueprintPath = path.resolve(__dirname, '../..');
const projectName = 'my-project';

function ember(args, options) {
  let ps = execa('ember', args, {
    preferLocal: true,
    localDir: __dirname,
    stdio: ['pipe', 'pipe', 'inherit'],
    ...options
  });

  ps.stdout.pipe(process.stdout);

  return ps;
}

describe('blueprint', function() {
  this.timeout(5 * 1000);

  beforeEach(async function() {
    this.tmpPath = await newTmpDir();
    this.projectPath = path.join(this.tmpPath, projectName);
  });

  it('works with default options', async function() {
    await ember([
      'new',
      projectName,
      '-sn',
      '-sg',
      '-b',
      blueprintPath
    ], {
      cwd: this.tmpPath
    });

    expect(path.join(this.projectPath, 'app/index.html'))
      .to.be.a.file().with.contents.that.match(/<html lang="en">/);
  });

  it('works with custom options', async function() {
    await ember([
      'new',
      projectName,
      '-sn',
      '-sg',
      '-b',
      blueprintPath,
      '--lang=es'
    ], {
      cwd: this.tmpPath
    });

    expect(path.join(this.projectPath, 'app/index.html'))
      .to.be.a.file().with.contents.that.match(/<html lang="es">/);
  });

  it('works in addon', async function() {
    await ember([
      'addon',
      projectName,
      '-sn',
      '-sg'
    ], {
      cwd: this.tmpPath
    });

    let ps = ember([
      'init',
      '-sn',
      '-b',
      blueprintPath
    ], {
      cwd: this.projectPath
    });

    ps.stdout.on('data', () => {
      // overwrite everything with no regard
      ps.stdin.write('y\n');
    });

    await ps;

    expect(path.join(this.projectPath, 'tests/dummy/app/index.html'))
      .to.be.a.file().with.contents.that.match(/<html lang="en">/);
  });
});
