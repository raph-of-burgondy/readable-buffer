const {streamify} = require('./readable-buffer.js')

const buf = Buffer.from('azertyuiop')

streamify(buf).pipe(process.stdout)