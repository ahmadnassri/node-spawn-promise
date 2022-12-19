## Install

```bash
npm install @ahmadnassri/spawn-promise
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
