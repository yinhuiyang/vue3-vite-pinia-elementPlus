import {
    userStore
} from './user'
const appStore = {}

export const registerStore = () => {
    appStore.userStore = userStore()
}

export default appStore