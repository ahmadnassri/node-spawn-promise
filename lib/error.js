'use strict'

const ExtendableError = require('@ahmadnassri/error')

module.exports = class SpawnError extends ExtendableError {
  constructor (code, message, stdout, stderr) {
    super(message)

    this.code = code || 1
    this.stdout = stdout || new Buffer('')
    this.stderr = stderr || new Buffer('')
  }
}
