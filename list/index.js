#!/usr/bin/env node
// const fs = require('fs');
// const util = require('util');

import util from 'util';
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
const lstat = util.promisify(fs.lstat);
const log = console.log;

const targetDir = process.argv[2] || process.cwd();

// Method 1
// const { lstat } = fs.promises;

fs.readdir(targetDir, async (err, filenames) => {
  if (err) throw new Error(err);

  // Method 2
  // for (let filename of filenames) {
  //   try {
  //     const stat = await lstat(filename);
  //     console.log(filename, stat.isFile());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // Method 3
  // use Promise.all to wait for all the lstat calls to complete
  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });
  const allStats = await Promise.all(statPromises);
  for (let stats of allStats) {
    const index = allStats.indexOf(stats);
    if (stats.isFile()) {
      log(chalk.green(filenames[index]));
    } else {
      log(chalk.blue(filenames[index]));
    }
  }
});
