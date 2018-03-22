const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/register',
      load: () => import(/* webpackChunkName: 'register' */ './register'),
    },
    {
      path: '/table',
      load: () => import(/* webpackChunkName: 'table' */ './table'),
    }
  ],

  async action({ next }) {
    const route = await next();

    route.title = 'Test';
    route.description = route.description || '';

    return route;
  },
};


export default routes;
