let fs = require('fs')

let results = JSON.parse(fs.readFileSync('index.json', 'utf8'));
let specs = []
let start = results.stats.start
let end = results.stats.end

results.suites.suites.forEach((spec)=> {
    let specName = spec.title
    let specTests = spec.suites.map((suite)=> {
        let suiteName = suite.title
        let tests = suite.tests.map((test) => {
          return {title: test.title, state: test.state, duration: test.duration, error: test.err.message}
        })
        return ({expect: suiteName, tests: tests})
    })
    specs.push({name: specName, suites: specTests})
})

let output = {
    start: start,
    end: end,
    specs: specs
}

console.log(JSON.stringify(output))
