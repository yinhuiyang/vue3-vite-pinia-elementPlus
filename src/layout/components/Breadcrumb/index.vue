<template>
  <el-breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' || index === levelList.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
  
<script setup>
import { watch, reactive, ref } from "vue";
import pathToRegexp from "path-to-regexp";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let levelList = ref([]); //存放面包屑数组
const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = route.matched
    .filter((item) => item.meta && item.meta.title)
    .filter(
      (item) =>
        item.meta &&
        item.meta.title &&
        item.meta.breadcrumb &&
        item.path !== "/home"
    );

  // 默认添加首页
  levelList.value = [{ path: "/home", meta: { title: "首页" } }].concat(
    matched
  );
};
const pathCompile = (path) => {
  const { params } = route;
  var toPath = pathToRegexp.compile(path);
  return toPath(params);
};
const handleLink = (item) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompile(path));
};

// 监听路由变化 每次变化添加一次tag;
watch(
  () => route.path,
  () => {
    if (!route || (route.meta && route.meta.breadcrumb)) {
      getBreadcrumb();
      return;
    }
  }
);
// 初始化方法区
getBreadcrumb();
</script>
  
<style lang="scss">
.app-breadcrumb.el-breadcrumb {
  // position: absolute;
  position: relative;
  // top: 40px;
  display: inline-block;
  color: #303133;
  font-size: 12px;
  line-height: 32px;
  padding-left: 15px;
  background: #f2f2f2;
  width: 100%;
  z-index: 2;
  .el-breadcrumb__item {
    display: inline-block;
    height: 32px;
  }

  .no-redirect {
    color: #1d87e5;
    cursor: pointer;
    width: 800px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.bidName {
  // float: right;
  // text-align: right;
  // font-weight: bold;
  // width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-style: initial;
}
</style>
  