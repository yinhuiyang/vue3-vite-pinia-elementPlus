// utils/storage.ts
// window.localStorage 浏览器永久缓存
export const localStorage = {
    // 设置永久缓存
    set(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val));
    },
    // 获取永久缓存
    get(key) {
        const json = window.localStorage.getItem(key);
        return JSON.parse(json);
    },
    // 移除永久缓存
    remove(key) {
        window.localStorage.removeItem(key);
    },
    // 移除全部永久缓存
    clear() {
        window.localStorage.clear();
    }
};


// window.sessionStorage 浏览器临时缓存
export const sessionStorage = {
    // 设置临时缓存
    set(key, val) {
        window.sessionStorage.setItem(key, JSON.stringify(val));
    },
    // 获取临时缓存
    get(key) {
        const json = window.sessionStorage.getItem(key);
        return JSON.parse(json);
    },
    // 移除临时缓存
    remove(key) {
        window.sessionStorage.removeItem(key);
    },
    // 移除全部临时缓存
    clear() {
        window.sessionStorage.clear();
    }
};