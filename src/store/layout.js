import {
    defineStore
} from 'pinia'


export const layoutStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: 'layoutStore',
    // state: 返回对象的函数
    state: () => ({
        isCollapse: false, //侧边栏是否收起
        tagViews: [], //tag导航的页面
        caches: [] // 组件缓存（使用组件name）
    }),
    actions: {
        // 是否收起侧边栏
        set_isCollapse(data) {
            this.isCollapse = data
        },
        // 添加tags
        add_tagViews(data) {
            const isExist = this.tagViews.some((item) => {
                return item.path === data.path
            })

            if (isExist) {
                return false
            }
            this.tagViews.push({
                ...data
            })
            this.add_caches(data.name)
        },
        // 删除tags
        remove_tagViews(data) {
            const index = this.tagViews.findIndex((item) => {
                return item.path === data.path
            })
            this.tagViews.splice(index, 1)
            this.remove_caches(data.name)
        },
        start_tagViews(data) {
            this.tagViews = []
            for (let item in data) {
                this.add_tagViews(data[item])
            }
        },

        // 添加缓存
        add_caches(data) {
            const isExist = this.caches.some((item) => {
                return item === data
            })
            if (isExist) {
                return
            }
            this.caches.push(data)
        },
        // 删除缓存
        remove_caches(data) {
            const index = this.caches.findIndex((item) => {
                return item === data
            })
            this.caches.splice(index, 1)
        }
    }
})