<template>
  <div class="menu-wrap" v-if="!route.path.includes('login')">
    <div
      :class="[
        'menu-item',
        route.path.includes(item.path) ? 'active-menu' : '',
      ]"
      v-for="item in routerList"
      :key="item.path"
      @click="router.push(item.path)"
    >
      {{ item.meta.title }}
    </div>
    <div class="user-info"><a href="">测试机</a></div>
  </div>
  <router-view />
  <!--  <router-view v-slot="{ Component }">-->
  <!--    <transition> <component :is="Component" /></transition>-->
  <!--  </router-view>-->
</template>

<script setup>
import { routes } from './router';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
// console.log(router);

const routerList = routes.filter((d) => d.meta) ?? [];
</script>

<style scoped>
.menu-wrap {
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  position: relative;
}
.menu-item {
  padding: 0 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s;
}
.active-menu {
  background: linear-gradient(to right, #00aa55, #1ba39c);
  height: 45px;
  border-bottom: 5px green solid;
  color: #fff;
  font-style: italic;
  font-size: 20px;
}
.user-info {
  position: absolute;
  right: 10px;
  height: 50px;
  line-height: 50px;
  color: red;
  font-size: 20px;
  font-style: italic;
}
</style>
