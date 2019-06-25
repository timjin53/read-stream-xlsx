const { finished, Readable } = require('stream');
const { promisify } = require('util');
const promisifiedFinished = promisify(finished);

const TransformStream = require("./transformStream")
const getWorkbookReader = require("./getWorkbookReader")

const getResultStream = (transformFunc, result) => {
    const resultStream = new TransformStream({
        objectMode: true
    })
    
    resultStream.on('data', (chunk) => {
        result.push(transformFunc(chunk))
    })

    return resultStream
}

const processXlsx = async ({ inputStream, transform }) => {
    if (inputStream instanceof Readable) {
        const result = []
        const resultStream = getResultStream(transform, result)
        const workBookReader = getWorkbookReader(resultStream)

        await promisifiedFinished(inputStream.pipe(workBookReader))

        return result
    }

    throw "Input must be a readable stream"
}

module.exports = { processXlsx } 
