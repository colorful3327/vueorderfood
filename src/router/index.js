import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import EmpIndex from '../views/EmpIndex.vue'
// import JustTry from '../views/JustTry.vue'
import ManagerPage from '../views/ManagerPage.vue'

import InfoManage from '../views/InfoManage/InfoManage.vue'
import InfoManageOfEmp from '../views/InfoManage/InfoManageOfEmp.vue'
import InfoManageOfDept from '../views/InfoManage/InfoManageOfDept.vue'
import InfoManageOfFood from '../views/InfoManage/InfoManageOfFood.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'home',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/empIndex',
    component: EmpIndex
  },
  {
    path: '/managerPage',
    component: ManagerPage
  },
  {
    path: '/infoManage',
    component: InfoManage,
    redirect: "/infoManageOfEmp",
    children: [
      {
        path: '/infoManageOfEmp',
        component: InfoManageOfEmp
      },
      {
        path: '/infoManageOfDept',
        component: InfoManageOfDept
      },
      {
        path: '/infoManageOfFood',
        component: InfoManageOfFood
      }
    ]
  },
  // {
  //   path: '/justTry',
  //   component: JustTry
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // debugger
  let path = to.fullPath
  // console.log(to)
  // console.log(to.path)
  sessionStorage.setItem("toPath", to.path)
  // console.log(from)
  // 检查 session 中是否有 uname
  // if (path == "/" || (sessionStorage.getItem("uname") != null && sessionStorage.getItem('uname') != '')) {
  //   next()
  //   return
  // }
  if (path == "/") {
    next()
    return
  }
  // if ((path == "/infoManage" || path == "/infoManageOfEmp" || path == "/infoManageOfDept" || path == "/infoManageOfFood") && sessionStorage.getItem("job") == "信息管理") {
  //   next()
  //   return
  // }
  // if ((path == "/empIndex" || path == "/managerPage") && (sessionStorage.getItem("uname") != null && sessionStorage.getItem('uname') != '' && sessionStorage.getItem("job") != "信息管理")) {
  //   next()
  //   return
  // }
  var job = sessionStorage.getItem("job")
  if (job == "普通员工" || job == "部门经理" || job == "订餐管理") {
    if (path == "/empIndex") {
      next()
      return
    }
  } else if (job == "信息管理") {
    if (path == "/infoManage" || path == "/infoManageOfEmp" || path == "/infoManageOfDept" || path == "/infoManageOfFood") {
      next()
      return;
    }
  }
  // 没登录
  next("/")
})

export default router
