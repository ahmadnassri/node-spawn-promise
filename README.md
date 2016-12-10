# Spawn Promise [![version][npm-version]][npm-url] [![License][license-image]][license-url]

> Child Process Spawn as a Promise, with simple in/out piping

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --only=production --save @ahmadnassri/spawn-promise
```

## API

### `spawn (command [, args] [, options] [, input])`

identical to [`child_process.spawn`] in every way, except:

- writes the `input` value to `stdin`,
- on success returns a Promise that is fulfilled with a simple object containing both `stdin` & `stdout` buffers.
- on failure returns a Promise rejected with a `SpawnError` error object containing both `stdin` & `stdout` buffers. 

## Usage

```js
import Spawn from '@ahmadnassri/spawn-promise';

const options = {
  env: process.env 
}

// success
spawn('grep', ['f'], options, 'foo')
    .then(streams => console.log(streams.stdout))
```

----
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &nbsp;&middot;&nbsp;
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/node-spawn-promise.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/node-spawn-promise
[travis-image]: https://img.shields.io/travis/ahmadnassri/node-spawn-promise.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@ahmadnassri/spawn-promise
[npm-version]: https://img.shields.io/npm/v/@ahmadnassri/spawn-promise.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/@ahmadnassri/spawn-promise.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/node-spawn-promise
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/node-spawn-promise.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/node-spawn-promise.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/node-spawn-promise
[david-image]: https://img.shields.io/david/ahmadnassri/node-spawn-promise.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/node-spawn-promise
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/node-spawn-promise/badge?style=flat-square

[node-spawn]: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
