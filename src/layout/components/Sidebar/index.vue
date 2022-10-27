<template>
  <div class="sidebar-container">
    <transition>
      <el-image
        v-if="!isCollapse"
        class="headerLogo logo curp"
        :src="logo"
        fit="fill"
        @click="goHome"
      >
      </el-image>
      <el-image
        v-else
        class="hiddenHeaderLogo logo curp"
        @click="goHome"
        :src="logo2"
        fit="fill"
      >
      </el-image>
    </transition>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :default-active="route.path"
        class="el-menu-vertical-demo menu"
        :collapse="isCollapse"
        :unique-opened="false"
        :router="true"
      >
        <sidebar-item
          v-for="item in menus"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
  
<script setup>
// import path from 'path'
// path.resolve("/a")

// const path = require('path');

import { defineComponent, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { layoutStore } from "@/store/layout";
import SidebarItem from "./SidebarItem.vue";

import logo from "@/assets/images/logo.png";
import logo2 from "@/assets/images/logo2.png";

import color from "@/common/color";

defineComponent({ SidebarItem });

const store = layoutStore();
const route = useRoute();
const router = useRouter();
// 回到首页
const goHome = () => {
  router.push({
    path: "/",
  });
};

// 动态获取是否折叠
const isCollapse = computed(() => {
  return store.isCollapse;
});
// 获取菜单路由
const menus = router.options.routes;
const variables = reactive(color);
</script>
  
<style lang="scss" scoded>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.sidebar-container {
  display: flex;
  flex-direction: column;
  .logo {
    position: fixed;
    left: 0;
    top: 0;
    border: 1px solid #f1f1f1;
  }
  .headerLogo {
    width: 180px;
    height: 60px;
  }
  .hiddenHeaderLogo {
    width: 40px;
    height: 60px;
  }
  .menu {
    flex: 1;
    border: none;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
</style>
  