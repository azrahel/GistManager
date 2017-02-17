module.exports = {
  path: '/login',

  onEnter(nextState, cb) {
    console.log('entering login page')
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/login/login.jsx').default)
    });
  }
}



