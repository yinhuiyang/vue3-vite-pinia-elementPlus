// import { getUserRoles } from '@/api/user'
import {
    defineStore
} from 'pinia'


export const userStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: 'userStore',
    // state: 返回对象的函数
    state: () => ({
        roles: ['1'],
        client: null
    }),
    actions: {
        setRoles(data) {
            let roles = []
            if (data == 'admin') {
                roles = ['admin']
            } else {
                roles = data.split(',').map((item) => {
                    return Number(item)
                })
            }
            this.roles = roles
        },
        // 初始化天翼云oss存储
        setOssType() {
            const OOS = window.OOS
            const config = JSON.parse(
                import.meta.env.VITE_APP_OOS_CONFIG)
            const client = new OOS.S3(config)
            this.client = client
        }
    }
})