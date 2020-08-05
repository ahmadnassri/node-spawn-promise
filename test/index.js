'use strict'

const SpawnError = require('../lib/error')
const spawn = require('../lib')
const test = require('tap').test

test('reject on failure', assert => {
  assert.plan(4)

  const expected = new SpawnError(1, 'command exited with code: 1')

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

  const expected = new SpawnError(64, 'command exited with code: 64')

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
    .then(streams => assert.same(streams, { stdout: Buffer.from(''), stderr: Buffer.from('') }))
})

test('don\'t allow stdio overwrites', assert => {
  assert.plan(1)

  spawn('sh', ['-c', 'exit 0'], { stdio: 'ignore' })
    .catch(_ => assert.fail('should not fail', _))
    .then(streams => assert.same(streams, { stdout: Buffer.from(''), stderr: Buffer.from('') }))
})

test('capture stdout', assert => {
  assert.plan(1)

  spawn('node', ['-e', 'console.log("foo")'])
    .catch(_ => assert.fail('should not fail', _))
    .then(streams => assert.same(streams, { stdout: Buffer.from('foo\n'), stderr: Buffer.from('') }))
})

test('capture spawn failure', assert => {
  assert.plan(2)

  spawn('foo')
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => {
      assert.equal(err.errno, -2)
      assert.equal(err.syscall, 'spawn foo')
    })
})

test('capture stderr', assert => {
  assert.plan(1)

  spawn('node', ['-e', 'console.error("foo"); process.exit(1)'])
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => assert.same(err.stderr, Buffer.from('foo\n')))
})

test('capture stdout & stderr on failure', assert => {
  assert.plan(1)

  spawn('node', ['-e', 'console.log("foo"); console.error("bar"); process.exit(1)'])
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => assert.match(err, { stdout: Buffer.from('foo\n'), stderr: Buffer.from('bar\n') }))
})

test('capture stdout & stderr on success', assert => {
  assert.plan(1)

  spawn('node', ['-e', 'console.log("foo"); console.error("bar");'])
    .catch(_ => assert.fail('should not fail', _))
    .then(streams => assert.same(streams, { stdout: Buffer.from('foo\n'), stderr: Buffer.from('bar\n') }))
})

test('forward input stream', assert => {
  assert.plan(1)

  spawn('grep', ['f'], {}, 'foo')
    .catch(_ => assert.fail('should not fail', _))
    .then(streams => assert.same(streams, { stdout: Buffer.from('foo\n'), stderr: Buffer.from('') }))
})

test('reject with exit code', assert => {
  assert.plan(7)

  spawn('grep', ['--s'])
    .then(_ => assert.fail('should not succeed', _))
    .catch(err => {
      assert.type(err, SpawnError)
      assert.equal(err.code, 2)
      assert.equal(err.message, 'command exited with code: 2')
      assert.equal(err.syscall, 'spawn grep')
      assert.equal(err.path, 'grep')
      assert.same(err.spawnargs, ['--s'])
      assert.same(err.stdout, Buffer.from(''))
    })
})
