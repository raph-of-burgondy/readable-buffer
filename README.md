# readable-buffer

## a true streamifying module :)

This  very simple but efficient function transforms a [Buffer](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html) into a [Readable Stream](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_readable_streams)

## Description

```js
function streamify(buf,chunksizemax=16*1024) {
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
```

[buf.slice](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html#buffer_buf_slice_start_end) is memory efficient since "the allocated memory of the two objects _(original and sliced buffer)_ overlap"





## Usage (simplified example in redis cache usage)

I use it especially with [ioredis](https://www.npmjs.com/package/ioredis) which enable to store buffer 

```js
    var Redis = require('ioredis');
    var redis = new Redis();
    const  {streamify} = require('readable-buffer')
    
    
    redis.set(filename, buf)
    
    redis.getBuffer(req.url)
    .then((data)=>{
        if (data==null) {
          //load ressource to cache
        } else {
          streamify(data).pipe(res)
        }
      })
```


## Contributors

....are welcome

## License

no licence. use free.
