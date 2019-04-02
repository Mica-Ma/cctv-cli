import Metalsmith from 'metalsmith'
import consolidate from 'consolidate'
import async from 'async'
import minimatch from 'minimatch'
import rimraf from 'rimraf'
// const rimraf = require('rimraf')

const renderContent = consolidate.swig.render;

const render = () => {
  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata();
    const keys = Object.keys(files)
    async.each(keys, (file, next) => {
      if (!filterFile(file)) {
        return next()
      }
      const str = files[file].contents.toString()
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }
      
      renderContent(str, metadata, (err, res) => {
        if (err) {
          return next(err);
        }
        
        files[file].contents = Buffer.from(res);
        next();
      })
    }, done)
  }
}

const filterFile = (file) => {
  const matchArr = ['package.json', 'README.md']
  return matchArr.some(v => {
    return minimatch(file, v, {
      dot: true
    })
  })
}

export default async (options, src, dest) => {
  Metalsmith(src)
    .metadata(options)
    .clean(false)
    .source('.')
    .destination(dest)
    .use(render())
    .build((err, files) => {
      if (err) {
        rimraf.async(src)
        Promise.reject(err)
      } else {
        Promise.resolve(files)
      }
    })
}
