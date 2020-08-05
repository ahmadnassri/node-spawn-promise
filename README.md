# Spawn Promise 

[![license][license-img]][license-url]
[![version][npm-img]][npm-url]
[![super linter][super-linter-img]][super-linter-url]
[![test][test-img]][test-url]
[![release][release-img]][release-url]

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-spawn-promise

[npm-url]: https://www.npmjs.com/package/@ahmadnassri/spawn-promise
[npm-img]: https://badgen.net/npm/v/@ahmadnassri/spawn-promise

[super-linter-url]: https://github.com/ahmadnassri/node-spawn-promise/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/node-spawn-promise/workflows/super-linter/badge.svg

[test-url]: https://github.com/ahmadnassri/node-spawn-promise/actions?query=workflow%3Atest
[test-img]: https://github.com/ahmadnassri/node-spawn-promise/workflows/test/badge.svg

[release-url]: https://github.com/ahmadnassri/node-spawn-promise/actions?query=workflow%3Arelease
[release-img]: https://github.com/ahmadnassri/node-spawn-promise/workflows/release/badge.svg 

> Child Process Spawn as a Promise, with simple in/out piping

## Install

```bash
npm install --production --save @ahmadnassri/spawn-promise
```

## API

### `spawn (command [, args] [, options] [, input])`

identical to [`child_process.spawn`][node-spawn] in every way, except:

- writes the `input` value to `stdin`,
- on success returns a Promise that is fulfilled with a simple object containing both `stdout` & `stderr` buffers.
- on failure returns a Promise rejected with a `SpawnError` error object containing both `stdout` & `stderr` buffers.

## Usage

```js
const spawn = require('@ahmadnassri/spawn-promise')

const options = {
  env: process.env
}

// success
spawn('grep', ['f'], options, 'foo')
  .then(streams => console.log(streams.stdout))
```
