const fs = require('fs');
const csvtojsonV2 = require("csvtojson");
const {pipeline} = require('stream');

const csvFilePath = './nodejs-hw1-ex1.csv';
const txtFilePath = './nodejs-hw1-ex1-naive.txt';
const txtFileStreamPath = './nodejs-hw1-ex1-stream.txt';

/**
 * Naive implementation
 * 1. Fully loads te CSV file content to RAM
 * 2. Uses the expensive operation JSON.stringify() for the whole content.
 * This implementation will block the event loop for the large files.
 */
csvtojsonV2()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        const jsonString = JSON.stringify(jsonObj)
            .replace(/},{/g, '},\n{') // Adds newline after each array item.
            .replace(/\[|\]/g, ''); // Removes the '[' ']' symbols.

        fs.writeFile(
            txtFilePath,
            jsonString,
            'utf8',
            (error) => {
                if (error) console.error(error);
            });
    });

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
