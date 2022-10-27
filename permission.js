// 设置权限
import router, {
    asyncRouter
} from '@/router/index'
import {
    filterRoutes
} from '@/common/permission'
import {
    sessionStorage
} from '@/utils/storage'
import {
    userStore
} from '@/store/user'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

sessionStorage.set('router', true) //判断是否添加了路由
const whiteList = ['/login'] //白名单

NProgress.configure({
    showSpinner: false
})

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (whiteList.includes(to.path)) {
        return next()
    }
    const user = sessionStorage.get('user')
    if (!user) {
        router.push('/login')
    }
    if (sessionStorage.get('router')) {
        // 获取状态
        const roles = ['admin']
        // 动态路由添加
        let routes = []
        if (roles[0] == 'admin') {
            routes = asyncRouter
        } else {
            routes = filterRoutes([...asyncRouter], roles)
        }
        for (let i in routes) {
            router.addRoute(routes[i])
        }
        router.options.routes = router.options.routes.concat(routes)
        sessionStorage.set('router', false)

        // 初始化天翼云oss存储
        const useUserStore = userStore()
        if (!useUserStore.client) {
            useUserStore.setOssType()
        }
        next({
            ...to,
            replace: true
        })
        NProgress.done()
    } else {
        next()
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done()
})