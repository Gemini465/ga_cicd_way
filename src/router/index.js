import { createRouter, createWebHashHistory } from 'vue-router';
// import { defineAsyncComponent } from 'vue';

export const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/alibaba',
    component: () => import('../pages/home/index.vue'),
    meta: {
      title: 'HOME'
    },
    children: [
      {
        path: 'alibaba',
        component: () => import('../pages/home/letfMenu/alibaba.vue')
      },
      {
        path: 'baidu',
        component: () => import('../pages/home/letfMenu/baidu.vue')
      },
      {
        path: 'tencent',
        component: () => import('../pages/home/letfMenu/tencent.vue')
      }
    ]
  },
  {
    path: '/canvas',
    name: 'canvas',
    component: () => import('../pages/canvasDemo/index.vue'),
    meta: {
      title: 'CANVAS'
    }
  },
  {
    path: '/webSocket',
    redirect: '/webSocket/chat',
    component: () => import('../pages/wsDemo/index.vue'),
    meta: {
      title: 'WEBSOCKET'
    },
    children: [
      {
        path: 'chat',
        component: () => import('../pages/wsDemo/menu/chat.vue')
      },
      {
        path: 'contact',
        component: () => import('../pages/wsDemo/menu/contact.vue')
      },
      {
        path: 'channel',
        component: () => import('../pages/wsDemo/menu/channel.vue')
      },
      {
        path: 'setting',
        component: () => import('../pages/wsDemo/menu/setting.vue')
      }
    ]
  },
  {
    path: '/threejs',
    component: () => import('../pages/threeDemo/index.vue'),
    meta: {
      title: 'THREEJS'
    }
  },
  {
    path: '/d3js',
    component: () => import('../pages/d3Demo/index.vue'),
    meta: {
      title: 'D3JS'
    }
  },
  {
    path: '/CSS',
    component: () => import('../pages/cssDemo/index.vue'),
    meta: {
      title: 'CSS'
    }
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
