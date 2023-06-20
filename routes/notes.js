const fs = require('fs');
const util = require('util');
// const { readFile, writeFile} = require('fs/promise')

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (location, content) =>
    fs.writeFile(location, JSON.stringify(content, null, 4), (err) =>
    err
    ? console.error(err) 
    : console.info(`successfully written to ${location}`)
    );

const appendToFile = (content , fileLocation) => {
    fs.readFile(fileLocation, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeToFile(fileLocation, parseData)
        }
    });
};

module.exports = { readFromFile, writeToFile, appendToFile };