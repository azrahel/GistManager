module.exports = {
  path: '/dashboard',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/dashboard/dashboard.jsx').default)
    })
  },

  onEnter(nextState, cb) {
  }
}