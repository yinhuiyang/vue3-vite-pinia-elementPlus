const Layout = () => import('@/layout/index.vue')
const Menu = () => import('@/views/system/menu.vue')
const Role = () => import('@/views/system/role.vue')
const Log = () => import('@/views/system/log.vue')
const Dock = () => import('@/views/system/dock.vue')
export default {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    meta: {
        title: '系统管理',
        icon: 'Connection',
        roles: [10],
        breadcrumb: true
    },
    children: [{
            path: '/system/menu',
            component: Menu,
            name: 'Menu',
            meta: {
                title: '菜单管理',
                icon: 'Connection',
                roles: [101],
                breadcrumb: true
            }
        },
        {
            path: '/system/role',
            component: Role,
            name: 'Role',
            meta: {
                title: '角色管理',
                icon: 'Connection',
                roles: [102],
                breadcrumb: true
            }
        },
        {
            path: '/system/log',
            component: Log,
            name: 'Log',
            meta: {
                title: '日志管理',
                icon: 'Connection',
                roles: [103],
                breadcrumb: true
            }
        },
        {
            path: '/system/dock',
            component: Dock,
            name: 'Dock',
            meta: {
                title: '系统对接管理',
                icon: 'Connection',
                roles: [104],
                breadcrumb: true
            }
        }
    ]
}