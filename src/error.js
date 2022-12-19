const ExtendableError = require('@ahmadnassri/error')

module.exports = class SpawnError extends ExtendableError {
  constructor (code, message, stdout, stderr) {
    super(message)

    /* istanbul ignore next */
    this.code = code || 1
    this.stdout = stdout || Buffer.from('')
    this.stderr = stderr || Buffer.from('')
  }
}
