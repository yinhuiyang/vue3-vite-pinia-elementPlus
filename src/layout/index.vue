<template>
  <div class="layout" :class="classObj">
    <Sidebar />
    <div class="content">
      <GlobalHeader />
      <Breadcrumb />
      <div class="content_main">
        <app-main />
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { defineComponent, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { layoutStore } from "@/store/layout";
import AppMain from "./components/AppMain";
import Sidebar from "./components/Sidebar";
import GlobalHeader from "./components/GlobalHeader";
import Breadcrumb from "./components/Breadcrumb";

defineComponent({
  AppMain,
  Sidebar,
  GlobalHeader,
  Breadcrumb,
});

const route = useRoute();
const router = useRouter();
const store = layoutStore();
// 初始化tags
const homePath = localStorage.getItem("homePath") || "";
const pathArr = [
  homePath,
  router.resolve(route.path === "/" ? homePath : route.path),
];
const routers = pathArr.map((item) => router.resolve(item));
store.start_tagViews(routers);
// 监听路由变化 每次变化添加一次tag;
watch(
  () => route.path,
  () => {
    if (!route || (route.meta && route.meta.noShowTag)) {
      return;
    }
    store.add_tagViews(route);
  }
);
// 动态获取是否折叠
const classObj = computed(() => {
  return {
    hideSidebar: store.isCollapse,
    sidebar: !store.isCollapse,
  };
});
</script>
  
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.layout {
  display: flex;
  justify-content: left;
  width: 100%;
  height: 100%;
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    &_main {
      background: #f5f5f5;
      padding: 0 15px 15px 15px;
      box-sizing: border-box;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
  