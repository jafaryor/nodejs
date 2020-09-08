/**
 * Now almost 99% of ES6+ syntax can be used in Node.js.
 * This is where the package called babel shines.
 */
import fs from 'fs';
import csvtojsonV2 from "csvtojson";
import {pipeline} from 'stream';

const csvFilePath = '../node-js/homework-03/nodejs-hw1-ex1.csv';
const txtFileStreamPath = '../node-js/homework-03/nodejs-hw1-ex1.txt';

/**
 * Stream implementation
 * 1. Reads the CSV file line by line.
 * 2. Stringifies the content line by line.
 */
pipeline(
    csvtojsonV2().fromFile(csvFilePath),
    fs.createWriteStream(txtFileStreamPath, 'utf8'),
    (error) => {
        if (error) {
            console.error('Pipeline failed.', error);
        }
    }
);
