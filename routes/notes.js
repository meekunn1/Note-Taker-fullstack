const fs = require('fs');
const { readFile, writeFile} = require('fs/promise')

const writeToFile = (location, content) =>
    fs.writeFile(location, JSON.stringify(content, null, 4), (err) =>
    err
    ? console.error(err) 
    : console.info(`successfully written to ${location}`)
    );

const appendToFile = (content , fileLocation) => {
    readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.err(err);
        } else {
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeToFile(fileLocation, parseData)
        }
    });
};

module.exports = {writeToFile, appendToFile };