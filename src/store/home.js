import {
    defineStore
} from 'pinia'

export const homeStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: 'homeStore',
    // state: 返回对象的函数
    state: () => ({
        name: 'storeName'
    }),
    actions: {
        setName(data) {
            this.name = data
        }
    }
})