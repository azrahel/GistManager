module.exports = {
  path: '/login',

  onEnter(nextState, cb) {
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/login/login.jsx').default)
    })
  }
}



