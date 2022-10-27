// src/directive/permission/index.ts

import useStore from "@/store";

/**
 * 按钮权限校验
 */
export const hasPerm = {
    mounted(el, binding) {
        // 「超级管理员」拥有所有的按钮权限
        const {
            user
        } = useStore()
        const roles = user.roles;
        if (roles.includes('ROOT')) {
            return true
        }
        // 「其他角色」按钮权限校验
        const {
            value
        } = binding;
        if (value) {
            const requiredPerms = value; // DOM绑定需要的按钮权限标识

            const hasPerm = user.perms.some(perm => {
                return requiredPerms.includes(perm)
            })

            if (!hasPerm) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error("need perms!");
        }
    }
};