const Layout = () => import('@/layout/index.vue')
const About = () => import('@/views/about/index.vue')
export default {
    path: '/about',
    component: Layout,
    meta: {
        title: '关于',
        icon: 'Connection',
        roles: [10],
        breadcrumb: true
    },
    children: [{
        path: '',
        component: About,
        name: 'About',
        meta: {
            title: '关于列表',
            icon: 'Connection',
            roles: [101],
            breadcrumb: true
        }
    }]
}