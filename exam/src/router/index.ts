import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import("../views/login.vue"),
    meta: { title: '登录' },
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue'),
    redirect: '/test',
    meta: { title: '首页', isAuth: true },
    children: [
      {
        path: '/test',
        component: () => import('../views/ExamInation/ExamInation.vue'),
        meta: { title: '考试', isAuth: true },
      },
      {
        path: '/testadd',
        component: () => import('../views/ExamInation/addExam.vue'),
        meta: { title: '创建考试', isAuth: true },
      },
      {
        path: "/exam",
        name: 'exam',
        component: () => import('../views/ExamPapers/ExamPapers.vue'),
        meta: { title: '阅卷', isAuth: true },
      },
      {
        path: "/examinationA",
        name: 'examinationA',
        component: () => import('../components/Exams/examinationA.vue'),
        meta: { title: '阅卷', isAuth: true },
      },
      {
        path: '/subjects',
        name: 'subjects',
        component: () => import('../views/Test/TestList.vue'),
        meta: { title: '试卷', isAuth: true },
      },
      {
        path: '/AddText',
        name: 'AddText',
        component: () => import('../views/Test/AddText.vue'),
        meta: { title: '试卷', isAuth: true },
      },
      {
        path: '/databaselist',
        name: 'databaselist',
        component: () => import('../views/QueStion/QueStion.vue'),
        meta: { title: '题库', isAuth: true },
      },
      {
        path: '/questionlist',
        name: 'questionlist',
        component: () => import('../views/QueStion/questionlist.vue'),
        meta: { title: '根据题库id获取试题列表', isAuth: true },
      },
      {
        path: '/department',
        name: 'department',
        component: () => import('../views/DePartMent/DePartMent.vue'),
        meta: { title: '部门', isAuth: true },
      },
      {
        path: '/classes',
        name: 'Class',
        component: () => import('../views/Class/Class.vue'),
        meta: { title: '班级', isAuth: true },
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: () => import('../views/TeaChers/TeaChers.vue'),
        meta: { title: '师资', isAuth: true },
      },
      {
        path: '/student',
        name: 'student',
        component: () => import('../views/StuDent/StuDent.vue'),
        meta: { title: '学员', isAuth: true },
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import('../views/Role/Role.vue'),
        meta: { title: '角色', isAuth: true },
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router