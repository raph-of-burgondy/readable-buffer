const { Readable } = require('stream');

exports.streamify =  function (buf, chunksizemax=16*1024) {

  if (!Buffer.isBuffer(buf)) throw Error('!!!! argument must be a buffer')

  var size = buf.length
  var index = 0
  
  return new Readable({
    read(n) {
      //buf.slice will limit offset to buf.length
      this.push(buf.slice(index,index+n))
      index=index+n
      if (index >= size) this.push(null)},
    
    highWaterMark : chunksizemax
  })
}



/*
const buf = Buffer.from('azertyuiop')

streamify(buf).pipe(process.stdout)
*/