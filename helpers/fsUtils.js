const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

// code that writes JSON syntax for notes into db.json file
const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

// code that reads data and pushes data into db.json file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const readAndDelete = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            const result = parsedData.filter(note => note.id !== content)
            writeToFile(file, result);
        }
    });
}

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };