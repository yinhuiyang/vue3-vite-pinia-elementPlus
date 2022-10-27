<template>
  <div class="login">
    <div class="login-title">
      <img src="@/assets/images/title.png" alt="" />
    </div>
    <div class="login-form">
      <div class="rightContent">
        <span class="loginTip">账号登陆</span>
        <el-form
          :model="loginForm"
          :hide-required-asterisk="false"
          status-icon
          scroll-to-error
          :rules="rules"
          ref="formRef"
        >
          <el-form-item prop="account">
            <el-input
              v-model="loginForm.account"
              placeholder="请输入手机号"
              :prefix-icon="Iphone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              :prefix-icon="Unlock"
              placeholder="请输入验证码"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              :prefix-icon="Postcard"
              placeholder="请输入短信验证码"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="btn"
              type="primary"
              @click="onLogin"
              >登 陆</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
// import JSEncrypt from 'jsencrypt'
import { layoutStore } from "@/store/layout";
import { Iphone, Unlock, Postcard } from "@element-plus/icons-vue";

import { sessionStorage } from "@/utils/storage";

// import { toLogin, getPublicKey } from '@/api/login'

const router = useRouter();
const store = layoutStore();
console.log(router.options.routes);
// 初始化tags
const homePath = localStorage.getItem("homePath") || "";
console.log(router.getRoutes());
const routers = [router.resolve(homePath)];

store.start_tagViews(routers);

// 验证
const rules = {
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const loginForm = reactive({
  account: "",
  password: "",
});
const formRef = ref(null);
// 登陆
const onLogin = () => {
  if (formRef) {
    formRef.value.validate(async (valid) => {
      if (valid) {
        sessionStorage.set("user", { id: 1 });
        router.push("/");
      }
    });
  }
};
const loading = ref(false);
</script>
  
<style lang="scss">
.login {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background-image: url("@/assets/images/loginBg.png");
  background-repeat: no-repeat;
  background-size: cover;
  &-title {
    font-size: 36px;
    margin-top: 100px;
    margin-bottom: 30px;
  }

  &-form {
    width: 950px;
    height: 480px;
    background-image: url("@/assets/images/formBg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left top;
    position: relative;
    .rightContent {
      width: 250px;
      position: absolute;
      right: 100px;
      top: 100px;
      .loginTip {
        font-size: 18px;
        display: inline-block;
        margin-bottom: 20px;
      }
    }
    .el-input {
      width: 300px;
    }
    .btn {
      width: 300px;
    }
  }
}
</style>
  