#!/usr/bin/env node

const { eject } = require('../');

const packageToEject = process.argv[2];
const targetDir = process.argv[3];

async function run() {
  await eject(packageToEject, targetDir);
}

run();
