const Nightmare = require('nightmare')
const config = require('./configs/default.js')

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
    // return nightmare.then((d) => {
    //   console.log(d);
    // })
  })

  // console.log(tasks);

  // Iterate through tasks.
  const results = tasks
    // .concat(() => Promise.resolve())
    .reduce((p, c) => {
      return p.then((d) => {
        // console.log(p);
        // console.log(c);
        return c
      })
    }, Promise.resolve(false))
    .then((d) => {
      console.log(d);
      return d
    })
}

run(config)

console.log(config);
