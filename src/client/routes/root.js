export default function (stores) {
  return {
    component: 'div',
    childRoutes: [{
      path: '/',
      component: require('components/App').default,
      onEnter: (nextState, replace, callback) => {
        if(stores.authStore.isLoggedIn) {
          if(nextState.location.pathname !== '/dashboard') {
            replace('/dashboard') 
          }
        } else {
          if(nextState.location.pathname !== '/login') {
            replace('/login')
          }
        }

        callback()
      },
      childRoutes: [
        require('./login'),
        require('./dashboard')
      ]
    }]
  }
}