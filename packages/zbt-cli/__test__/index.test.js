const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const packageJson = require('../package.json');

const cli = (args, options) => {
  return execa('node', [path.resolve(__dirname, '../lib/cli.js'), ...args], options);
};

describe(`'fix' command`, () => {
  const dir = path.resolve(__dirname, './fixtures/autofix');
  const outputFilePath = path.resolve(dir, './temp/temp.js');
  const errorFileContent = fs.readFileSync(path.resolve(dir, './semi-error.js'), 'utf8');
  const expectedFileContent = fs.readFileSync(path.resolve(dir, './semi-expected.js'), 'utf8');

  beforeEach(() => {
    fs.outputFileSync(outputFilePath, errorFileContent, 'utf8');
  });

  test('should autofix problematic code', async () => {
    await cli(['fix'], {
      cwd: path.dirname(`${dir}/result`),
    });
    expect(fs.readFileSync(outputFilePath, 'utf8')).toEqual(expectedFileContent);
  });

  afterEach(() => {
    fs.removeSync(`${dir}/temp`);
  });
});


