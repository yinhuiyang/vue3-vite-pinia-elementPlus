// src/api/system/user.ts
import request from "@/utils/request"

export function getUserInfo() {
    return request({
        url: '/getUserInfo',
        method: 'get'
    })
}