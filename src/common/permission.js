// 筛选路由
export const filterRoutes = (routes, roles) => {
    const results = []
    routes.forEach((item) => {
        const route = {
            ...item
        }
        if (isExist(item.meta.roles, roles)) {
            if (route.children) {
                route.children = filterRoutes(route.children, roles)
            }
            results.push(route)
        }
    })
    return results
}

// 判断是否两个数组是有交集存在
const isExist = (routeRoles, roles) => {
    const isHave = routeRoles.some((item) => roles.includes(item))
    return isHave
}