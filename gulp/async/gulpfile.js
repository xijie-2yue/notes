// 入口文件

exports.foo = (done) => {
  console.log('foo task working')
  done()
  console.log('foo task after done')
}

exports.error = (done) => {
  console.log('error task working')
  done(new Error('error task failed!'))
}

exports.promise_resolve = () => {
  console.log('promise_resolve task')
  return Promise.resolve()
}

exports.promise_reject = () => {
  console.log('promise_reject task')
  return Promise.reject(new Error('promise_reject task failed!'))
}

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

exports.async = async () => {
  await timeout(1000)
  console.log('async task working')
}
