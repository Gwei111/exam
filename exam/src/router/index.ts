import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/index/ExamInation',
        name: 'ExamInation',
        component: () => import('../views/ExamInation/ExamInation.vue'),
      },
      {
        path: '/index/ExamPapers',
        name: 'ExamPapers',
        component: () => import('../views/ExamPapers/ExamPapers.vue'),
      },
      {
        path: '/Index/Test',
        name: 'Test',
        component: () => import('../views/Test/TestList.vue'),
      },
      {
        path: '/Index/QueStion',
        name: 'QueStion',
        component: () => import('../views/QueStion/QueStion.vue'),
      },
      {
        path: '/Index/DePartMent',
        name: 'DePartMent',
        component: () => import('../views/DePartMent/DePartMent.vue'),
      },
      {
        path: '/Index/Class',
        name: 'Class',
        component: () => import('../views/Class/Class.vue'),
      },
      {
        path: '/Index/TeaChers',
        name: 'TeaChers',
        component: () => import('../views/TeaChers/TeaChers.vue'),
      },
      {
        path: '/Index/StuDent',
        name: 'StuDent',
        component: () => import('../views/StuDent/StuDent.vue'),
      },
      {
        path: '/Index/Role',
        name: 'Role',
        component: () => import('../views/Role/Role.vue'),
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router