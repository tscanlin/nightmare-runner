#!/usr/bin/env node

const Nightmare = require('nightmare')

// Config.
let configFile = './configs/default.js'
if (process.argv.length) {
  for (var i = 0; i < process.argv.length; i++) {
    switch (process.argv[i]) {
      case '--config':
        configFile = process.argv[i + 1]
      break;
      default:
      break;
    }
  }
}
const config = require(configFile)

// Run function.
function run(conf) {
  const windowKeys = Object.keys(conf.windows)

  // Make tasks.
  const tasks = windowKeys.map((key) => {
    const window = conf.windows[key]
    const nightmare = Nightmare({ show: window.show })

    window.actions.reduce((p, c) => {
      if (c.method) {
        return p[c.method].apply(p, c.args)
      } else {
        return p
      }
    }, nightmare)

    return nightmare
  })

  return new Promise((resolve, reject) => {
    let resultArray = []

    // Iterate through tasks.
    const results = tasks
    // Empty promise at the end for an extra reduce iteration.
    .concat(() => Promise.resolve())
    .reduce((p, c) => {
      return p.then((data) => {
        // Add resolved promise data to the array.
        data && resultArray.push(data)
        return c
      }, (err) => {
        err && resultArray.push(err)
      })
    }, Promise.resolve(false))
    .then((d) => {
      resolve(resultArray)
    })

    return results
  }).then((data) => {
    console.log(data);
  })
}

run(config)
