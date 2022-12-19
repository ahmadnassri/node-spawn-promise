# Spawn Promise

Child Process Spawn as a Promise, with simple in/out piping

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![semantic][semantic-img]][semantic-url]

## Install

``` bash
npm install @ahmadnassri/spawn-promise
```

## API

### `spawn (command [, args] [, options] [, input])`

identical to \[`child_process.spawn`\]\[node-spawn\] in every way, except:

- writes the `input` value to `stdin`,
- on success returns a Promise that is fulfilled with a simple object containing both `stdout` & `stderr` buffers.
- on failure returns a Promise rejected with a `SpawnError` error object containing both `stdout` & `stderr` buffers.

## Usage

``` js
const spawn = require('@ahmadnassri/spawn-promise')

const options = {
  env: process.env
}

// success
spawn('grep', ['f'], options, 'foo')
  .then(streams => console.log(streams.stdout))
```

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-spawn-promise

[release-url]: https://github.com/ahmadnassri/node-spawn-promise/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/node-spawn-promise

[semantic-url]: https://github.com/ahmadnassri/node-spawn-promise/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
