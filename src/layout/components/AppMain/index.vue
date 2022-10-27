<template>
  <section class="main">
    <el-scrollbar
      :native="false"
      wrap-style=""
      wrap-class=""
      view-class=""
      view-style=""
      :noresize="false"
      tag="section"
      style="height: 100%"
    >
      <router-view v-slot="{ Component }">
        <keep-alive :include="caches" :exclude="['Redirect']">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </keep-alive>
      </router-view>
    </el-scrollbar>
  </section>
</template>
  
<script setup>
import { computed, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { layoutStore } from "@/store/layout";

const route = useRoute();
const key = route.path;
const store = layoutStore();
const caches = computed(() => {
  return store.caches;
});
</script>
  
<style lang="scss" scoped>
.main {
  background: #fff;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
  