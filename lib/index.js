'use strict'

const spawn = require('child_process').spawn
const SpawnError = require('./error')

module.exports = function (cmd, args, opts, input) {
  return new Promise((resolve, reject) => {
    let stdout = []
    let stderr = []
    let options = Object.assign({}, opts)

    // ensure no override
    if (options.stdio) {
      delete options.stdio
    }

    let child = spawn(cmd, args, options)

    child.on('error', err => reject(new SpawnError(1, err)))
    child.stdout.on('error', err => reject(new SpawnError(1, err)))
    child.stderr.on('error', err => reject(new SpawnError(1, err)))
    child.stdin.on('error', err => reject(new SpawnError(1, err)))

    child.stdout.on('data', data => stdout.push(data))
    child.stderr.on('data', data => stderr.push(data))

    child.stdin.end(input)

    child.on('close', code => {
      stdout = [undefined, 'buffer'].indexOf(options.encoding) > -1 ? Buffer.concat(stdout) : stdout.join('').trim()
      stderr = [undefined, 'buffer'].indexOf(options.encoding) > -1 ? Buffer.concat(stderr) : stderr.join('').trim()

      if (code === 0) {
        return resolve({ stdout, stderr })
      }

      let error = new SpawnError(code, `command exited with code: ${code}`, stdout, stderr)

      // emulate actual Child Process Errors
      error.path = cmd
      error.syscall = 'spawn ' + cmd
      error.spawnargs = args

      return reject(error)
    })
  })
}
