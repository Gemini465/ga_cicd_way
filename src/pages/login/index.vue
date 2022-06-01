<template>
  <div class="login-layout">
    <div :class="['login-wrapper', data.signin ? 'form-left' : 'form-right']">
      <div class="status">{{ data.signin ? 'LOGIN' : 'SIGNUP' }}</div>
      <div class="login-form">
        <div class="username" contenteditable="true">username</div>
        <div class="password" contenteditable="true">password</div>
        <div class="login">
          <div v-if="data.signin" @click="router.replace('/home')">登录</div>
          <div @click="toSignup">没有账号？注册</div>
        </div>
      </div>
    </div>
    <div :class="['ball', data.signin ? 'ball-left' : 'ball-right']"></div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
let data = reactive({
  signin: true,
});
const login = () => {
  data.signin = !data.signin;
};
const toSignup = () => {
  data.signin = !data.signin;
};
</script>

<style scoped>
.login-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}
.ball {
  position: absolute;
  width: 2000px;
  height: 2500px;
  border-radius: 50%;
  background: #73b6f1;
  left: -1000px;
  top: -600px;
  transition: all 2s ease-in-out;
}
.ball-left {
  left: -1000px;
}
.ball-right {
  left: 700px;
}
.login-wrapper {
  width: 500px;
  height: 300px;
  position: absolute;
  transition: all 2s ease-in-out;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.form-left {
  left: 1460px;
}
.form-right {
  left: 350px;
}
.login-form {
  width: 400px;
  height: 150px;
  margin: 20px auto;
}

.status {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  letter-spacing: 10px;
  font-size: 30px;
  color: #757070;
  font-style: italic;
}
.username,
.password {
  width: 400px;
  height: 40px;
  border: 1px solid #999;
  line-height: 40px;
  text-indent: 2em;
  margin-bottom: 20px;
  outline: none;
  user-select: none;
  border-radius: 20px;
  color: #757070;
  font-size: 20px;
  font-style: italic;
}
.login {
  width: 400px;
  display: flex;
  justify-content: space-around;
}
.login > div {
  height: 40px;
  line-height: 40px;
  border: 1px solid #999;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 15px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
