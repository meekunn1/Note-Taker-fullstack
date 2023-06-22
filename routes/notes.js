const fs = require('fs');
const util = require('util');
// const { readFile, writeFile} = require('fs/promise')

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (location, content) =>
    fs.writeFile(location, JSON.stringify(content, null, 4), (err) =>
    err
    ? console.error(err) 
    : console.info(`Successfully updated ${location}`)
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

const deleteFromFile = (id, fileLocation) => {
    fs.readFile(fileLocation, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parseData = JSON.parse(data);
            const deletedData = parseData.filter((parseData) => parseData.id !== id);
            writeToFile(fileLocation, deletedData);
        }
    });
}

module.exports = { readFromFile, writeToFile, appendToFile, deleteFromFile };