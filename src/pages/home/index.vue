<template>
  <div class="home-wrap">
    <div class="left-menu">
      <div
        :class="[
          'left-menu-item',
          route.path.includes(item.path) ? 'left-menu-item-active' : '',
        ]"
        v-for="item in leftMenu"
        :key="item.path"
        @click="router.push(item.path)"
      >
        {{ item.title }}
      </div>
      <div class="switch-menu">{{ '<<<<<' }}</div>
    </div>
    <div class="home-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
const leftMenu = [
  { title: 'ALIBABA', path: '/home/alibaba' },
  { title: 'BAIDU', path: '/home/baidu' },
  { title: 'TENCENT', path: '/home/tencent' },
];
const route = useRoute();
const router = useRouter();
onMounted(() => {
  console.log('process', process.env, process.env.VUE_APP_MODE);
});
</script>

<style scoped>
.home-wrap {
  height: calc(100% - 50px);
  display: flex;
}
.left-menu {
  width: 300px;
  height: 100%;
  background: #f6f8ff;
  position: relative;
}
.left-menu-item {
  height: 50px;
  line-height: 50px;
  text-indent: 50px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;
}
.left-menu-item-active {
  height: 47px;
  background: radial-gradient(#f6f8ff, greenyellow);
  color: green;
  font-size: 20px;
  font-style: italic;
}
.home-main {
  width: calc(100% - 340px);
  margin: 20px;
  border: 1px solid #ccc;
}
.switch-menu {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  border-top: 1px solid #e8e8e8;
  background: linear-gradient(to left, #00aa55, #1ba39c);
}
</style>
