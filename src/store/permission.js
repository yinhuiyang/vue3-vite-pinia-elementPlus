// src/store/modules/permission.ts 
import {
    constantRoutes
} from '@/router';
import {
    listRoutes
} from "@/api/system/menu"; // 获取路由接口

const usePermissionStore = defineStore({
    id: "PermissionStore",
    state: () => ({
        routes: [],
        addRoutes: []
    }),
    actions: {
        setRoutes(routes) {
            this.addRoutes = routes
            // 静态路由 + 动态路由
            this.routes = constantRoutes.concat(routes)
        },
        generateRoutes(roles) {
            return new Promise((resolve, reject) => {
                // API 获取动态路由
                listRoutes().then(response => {
                    const asyncRoutes = response.data
                    let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                    this.setRoutes(accessedRoutes)
                    resolve(accessedRoutes)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})

export default usePermissionStore;