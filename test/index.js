'use strict'

const SpawnError = require('../lib/error')
const spawn = require('../lib')
const test = require('tap').test

test('reject on failure', assert => {
  assert.plan(4)

  let expected = new SpawnError(1, 'command exited with code: 1')

  spawn('sh', ['-c', 'exit 1'])
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => {
      assert.match(err, expected)
      assert.equal(err.path, 'sh')
      assert.equal(err.syscall, 'spawn sh')
      assert.same(err.spawnargs, ['-c', 'exit 1'])
    })
})

test('detect exit code', assert => {
  assert.plan(2)

  let expected = new SpawnError(64, 'command exited with code: 64')

  spawn('sh', ['-c', 'exit 64'])
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => {
      assert.match(err, expected)
      assert.equal(err.code, 64)
    })
})

test('resolve on success', assert => {
  assert.plan(1)

  spawn('sh', ['-c', 'exit 0'])
    .catch(_ => assert.fail('should not fail', _))
    .then(streams => assert.same(streams, { stdout: new Buffer(''), stderr: new Buffer('') }))
})

test('capture stdout', assert => {
  assert.plan(1)

  spawn('node', ['-e', 'console.log("foo")'])
    .catch(_ => assert.fail('should not fail', _))
    .then(streams => assert.same(streams, { stdout: Buffer('foo\n'), stderr: Buffer('') }))
})

test('capture stderr', assert => {
  assert.plan(1)

  spawn('node', ['-e', 'console.error("foo"); process.exit(1)'])
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => assert.same(err.stderr, Buffer('foo\n')))
})

test('capture stdout & stderr on failure', assert => {
  assert.plan(1)

  spawn('node', ['-e', 'console.log("foo"); console.error("bar"); process.exit(1)'])
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => assert.match(err, { stdout: new Buffer('foo\n'), stderr: new Buffer('bar\n') }))
})

test('capture stdout & stderr on success', assert => {
  assert.plan(1)

  spawn('node', ['-e', 'console.log("foo"); console.error("bar");'])
    .catch(_ => assert.fail('should not fail', _))
    .then(streams => assert.same(streams, { stdout: Buffer('foo\n'), stderr: Buffer('bar\n') }))
})

test('forward input stream', assert => {
  assert.plan(1)

  spawn('grep', ['f'], {}, 'foo')
    .catch(_ => assert.fail('should not fail', _))
    .then(streams => assert.same(streams, { stdout: Buffer('foo\n'), stderr: Buffer('') }))
})

test('reject with exit code', assert => {
  assert.plan(8)

  spawn('grep', ['--s'])
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => {
      assert.type(err, SpawnError)
      assert.equal(err.code, 2)
      assert.equal(err.message, 'command exited with code: 2')
      assert.equal(err.syscall, 'spawn grep')
      assert.equal(err.path, 'grep')
      assert.same(err.spawnargs, ['--s'])
      assert.same(err.stdout, new Buffer(''))
      assert.match(err.stderr.toString(), 'Usage: grep [OPTION]')
    })
})
