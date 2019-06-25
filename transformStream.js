const { Transform } = require('stream')

class TransformStream extends Transform {
  constructor(options, transformFunc) {
    super(options)
    this.transformFunc = transformFunc
  }

  _transform(chunk, _, callback) {
    callback(null, chunk);
  }
} 

module.exports = TransformStream