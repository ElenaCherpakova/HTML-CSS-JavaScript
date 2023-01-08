#!/usr/bin/env node
import debounce from 'lodash.debounce';
import chokidar from 'chokidar';
import program from 'caporal';
import fs from 'fs';
import chalk from 'chalk';
import { spawn } from 'child_process';

program
  .version('1.0.0')
  .argument('[filename]', 'Name of a file to execute')
  .action(async ({ filename }) => {
    const name = filename || 'index.js';

    try {
      await fs.Promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }
    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      console.log(chalk.blue('>>>> Starting process...'));
      proc = spawn('node', [name], { stdio: 'inherit' });
    }, 100);

    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });
program.parse(process.argv);
