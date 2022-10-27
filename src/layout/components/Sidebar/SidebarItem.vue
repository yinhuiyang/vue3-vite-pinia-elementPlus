<template>
  <template v-if="!item.hidden">
    <!-- 没有子节点 -->
    <el-menu-item v-if="!item.children" :index="basePath">
      <template #title>
        <span>
          {{ item.meta && item.meta.title }}
        </span>
      </template>
    </el-menu-item>
    <!-- 只有一个子节点且 meta.hiddenParent为true 为只有一个节点不显示父节点设置比如首页 -->
    <el-menu-item
      v-else-if="
        item.children.length == 1 && item.meta && item.meta.hiddenParent
      "
      :index="pathResolve(item.children[0].path)"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon" />
      </el-icon>
      <template #title>
        <span>
          {{ item.children[0].meta && item.children[0].meta.title }}
        </span>
      </template>
    </el-menu-item>
    <!-- 有子节点就调用自身组件递归嵌套 -->
    <el-sub-menu v-else :index="basePath">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>
          {{ item.meta && item.meta.title }}
        </span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="pathResolve(child.path)"
        :is-nest="true"
        :item="child"
        :base-path="pathResolve(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </template>
</template>
  
<script setup>
import { connectPath } from "@/common/index";

const prop = defineProps({
  item: {
    type: Object,
    default: {},
  },
  basePath: {
    type: String,
    default: "",
  },
});
const pathResolve = (path) => {
  return connectPath(prop.basePath, path);
};
</script>
  