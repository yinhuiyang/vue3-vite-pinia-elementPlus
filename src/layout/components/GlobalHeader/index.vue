<template>
  <div class="head">
    <div class="left">
      <div class="fold">
        <el-icon @click="handleCollapse(false)" v-show="isCollapse">
          <Expand />
        </el-icon>
        <el-icon @click="handleCollapse(true)" v-show="!isCollapse">
          <Fold />
        </el-icon>
      </div>
      <div class="refresh">
        <el-icon @click="handleRefresh" v-show="!isCollapse">
          <Refresh />
        </el-icon>
      </div>
    </div>
    <div class="right">
      <Screenfull id="screenfull" class="right-menu-item hover-effect mr10" />
      <el-icon class="icon-xiaoxi iconfont mr20 messageIcon"></el-icon>
      <span class="roleName mr10">{{ "系统管理员" }}</span>
      <el-dropdown class="drog" @visible-change="handelDrog">
        <span class="el-dropdown-link">
          <img src="@/assets/images/user.png" class="userImg mr5" alt="" />
          <span>{{ name }}</span>
          <el-icon v-show="!drogFlag"><ArrowDown /></el-icon>
          <el-icon v-show="drogFlag"><ArrowUp /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="edit">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- 修改密码 start -->
  <el-dialog
    title="修改密码"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    width="500px"
  >
  </el-dialog>
  <!-- 修改密码 end -->
</template>
  
<script setup>
import { defineComponent, computed, ref, defineAsyncComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { layoutStore } from "@/store/layout";

import Screenfull from "@/components/Screenfull";
import { ElMessageBox, ElMessage } from "element-plus";
import { sessionStorage } from "@/utils/storage";

defineComponent({});

const store = layoutStore();
const router = useRouter();
const route = useRoute();
let drogFlag = ref(false);

// 动态监听收缩侧边栏
const isCollapse = computed(() => {
  return store.isCollapse;
});

// 收缩侧边栏
const handleCollapse = (data) => {
  store.set_isCollapse(data);
};

const handelDrog = (val) => {
  drogFlag.value = val;
};
// 刷新
const handleRefresh = () => {
  store.remove_caches(route.name);
  router.replace("/redirect" + route.path);
};

// 修改密码
let dialogVisible = ref(false);
const edit = () => {
  dialogVisible.value = true;
};

// 退出登录
const logOut = () => {
  ElMessageBox.confirm("您确定要退出登录？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      sessionStorage.remove("token");
      sessionStorage.remove("user");
      router.replace("/login");
    })
    .catch(() => {});
};

// 名字显示
// const user = sessionStorage.get('user')
const name = ref("管理员");
</script>
  
<style lang="scss">
.head {
  display: flex;
  justify-content: space-between;
  height: 60px;
  flex-shrink: 0;
  padding-left: 15px;
  background: #fafafa;
  .left {
    display: flex;
    align-items: center;
    .fold {
      margin-right: 15px;
    }
    i {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .messageIcon {
      font-size: 20px;
    }
    .userImg {
      vertical-align: middle;
    }
    .el-dropdown-link {
      cursor: pointer;
      margin: auto;
    }
  }
}
</style>
  