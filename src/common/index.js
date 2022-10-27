// 连接路径 局限于 /home 、home 格式的路径
export const connectPath = (path1, path2) => {
    const reg = /^\/.*$/
    if (reg.test(path2)) {
        return path2
    } else {
        return path1 + (path2 ? '/' + path2 : '')
    }
}

// 自定义localStorage 用于防止存储的类型和获取的类型不一致
export const cusLocalStorage = {
    get: (name) => {
        const item = localStorage.getItem(name)
        if (item) {
            const result = JSON.parse(item)
            return result.value
        } else {
            return null
        }
    },
    set: (name, value) => {
        const obj = {
            type: typeof value,
            value: value
        }
        localStorage.setItem(name, JSON.stringify(obj))
    }
}