import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')
const Redirect = () => import('@/views/redirect/index.vue')
const Login = () => import('@/views/login/index.vue')
const NotPage = () => import('@/views//error/404.vue')
import AboutRouter from './modules/about'
import SystemRouter from './modules/system'
// 首页路由
const homePath = '/home'
localStorage.setItem('homePath', homePath)

/* 
routes 
path: 路由
componet: 组件
name: 组件名称
hidden：是否隐藏
meta: 自定义属性
    title: 标题
    icon：图标
    hiddenParent: 隐藏当前级（当只有一个子元素且为true时只显示children子级的数据）
    noShowTag: 不需要显示在tag上
    roles:["admin"] //权限
*/
export default createRouter({
    history: createWebHashHistory(),
    routes: [{
            path: '/redirect',
            component: Layout,
            hidden: true,
            meta: {},
            children: [{
                path: '/redirect/:path*',
                name: 'Redirect',
                component: Redirect,
                meta: {
                    breadcrumb: false
                }
            }]
        },
        {
            path: '/',
            component: Layout,
            redirect: homePath,
            hidden: true,
            meta: {
                hiddenParent: true
            },
            children: [{
                path: homePath,
                component: Home,
                name: 'Home',
                meta: {
                    title: '主页',
                    icon: 'HomeFilled',
                    breadcrumb: true,
                }
            }]
        },
        {
            path: '/login',
            component: Login,
            hidden: true,
            meta: {
                breadcrumb: false
            }
        },
        {
            path: '/:pathMatch(.*)',
            component: NotPage,
            hidden: true,
            meta: {}
        }
    ]
})

export const asyncRouter = [SystemRouter, AboutRouter]