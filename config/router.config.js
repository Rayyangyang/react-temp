export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/join',
    component: './Join',
    layout: false,
  },
  {
    path: '/',
    component: './Welcome',
  },

  {
    name: '广告管理',
    icon: 'table',
    path: '/notice',
    routes: [
      {
        name: '待发布广告',
        path: '/notice/wait',
        component: './Notice/Wait',
      },
      {
        name: '已发布广告',
        path: '/notice/published',
        component: './Notice/Published',
      },
      {
        name: '已过期广告',
        path: '/notice/expire',
        component: './Notice/Expire',
      },

    ]
  },
  {
    name: 'exception',
    path: '/exception',
    hideInMenu: true,
    routes: [
      // exception
      {
        path: '/exception/403',
        name: '403',
        component: './Exception/403',
      },
      {
        path: '/exception/404',
        name: '404',
        component: './Exception/404',
      },
      {
        path: '/exception/500',
        name: '500',
        component: './Exception/500',
      }
    ],
  },
  {
    path: '*',
    component: './Exception/404',
  },
]