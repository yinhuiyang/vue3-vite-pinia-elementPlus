<template>
  <div class="wscn-http404-container">
    <div class="error-box">
      <img src="@/assets/images/404.png" alt="" />
      <p class="error-info">Error，页面出错啦！！请点击返回首页~</p>
      <el-button type="info" @click="go">返回首页</el-button>
    </div>
  </div>
</template>
  
 <script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const go = () => {
  router.push("/");
};
</script>
  
  <style lang="scss" scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  .error-box {
    text-align: center;
    .error-info {
      font-family: Microsoft YaHei;
      font-size: 25px;
      color: #333;
      margin: 50px 0 40px 0;
    }
  }
}
</style>
  