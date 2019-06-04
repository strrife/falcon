#!/usr/bin/env node

const fs = require('fs');
const { Transform } = require('readable-stream');
const split = require('split2');
const pump = require('pump');
const falconMinimalFactory = require('../');

const pretty = falconMinimalFactory();
const falconMinimalTransport = new Transform({
  objectMode: true,
  transform(chunk, enc, cb) {
    const line = pretty(chunk.toString());
    if (line === undefined) return cb();
    cb(null, line);
  }
});

pump(process.stdin, split(), falconMinimalTransport, process.stdout);

// https://github.com/pinojs/pino/pull/358
if (!process.stdin.isTTY && !fs.fstatSync(process.stdin.fd).isFile()) {
  process.once('SIGINT', function noOp() {});
}
