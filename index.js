/**
 * Refactor processXlsx to export a function single function that can be used as per the below "process" function
 * Expectation after refactoring:
 *
 * When running  node index.js the following will be printed
 * Saving to DB:
 * [
    [ 'Person A', 'Attribute of Person A' ],
    [ 'Person B', 'Attribute of Person B' ],
    [ 'Person C', 'Attribute of Person C' ],
    [ 'Person D', 'Attribute of Person D' ],
    [ 'Person E', 'Attribute of Person E' ]
 * ]
 */

const { processXlsx } = require('./processXlsx');
const fs = require("fs");

const fakeSaveToDb = async data => {
    console.log(`Saving to DB: \n${JSON.stringify(data, null, 4)}`);
}

const process = async () => {
    const transformedData = await processXlsx({
        inputStream: fs.createReadStream('interview.xlsx'),
        transform: (row) => {
            //write logic to remove the "<1 empty item>" from each row
            return Object.values(row)
        }
    });
    await fakeSaveToDb(transformedData);
}

process()
    .then(() => console.log('Done Processing'))
    .catch(e => { console.log('!!!!!!!!!Error Processing!!!!!!!!!!!', e) })
