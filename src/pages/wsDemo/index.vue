<template>
  <div class="container">
    <div class="user">
      <div class="info"></div>
      <div class="status">
        <div>{{ chatObj.chatName }}</div>
        <div>{{ v.wsStatusText[v.wsStatus] }}</div>
      </div>
    </div>
    <div class="chat-wrapper">
      <div class="menu">
        <div
          :class="[
            'menu-item',
            route.path.includes(item.title) ? 'menu-item-active' : '',
          ]"
          v-for="item in v.menu"
          :key="item.title"
          @click="router.replace('/webSocket/' + item.title)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="menu-content">
        <router-view />
      </div>
      <chat-editor name="john" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { ws_host } from '@/utils/api';
import { enCrypto, deCrypto } from '@/utils/helper';
import { useRouter, useRoute } from 'vue-router';
import ChatEditor from '@/pages/wsDemo/chatEditor';
import { storeToRefs } from 'pinia';
import { ChatStore } from '@/store';

const router = useRouter();
const route = useRoute();

const store = ChatStore();
const { chatObj } = storeToRefs(store);

const v = reactive({
  menu: [
    { title: 'chat' },
    { title: 'contact' },
    { title: 'channel' },
    { title: 'setting' },
  ],
  inputMsg: '',
  wsStatus: 3,
  wsStatusText: {
    0: '正在建立连接连接，还没有完成',
    1: '连接成功建立，可以进行通信',
    2: '连接正在进行关闭握手，即将关闭',
    3: '连接已经关闭或者根本没有建立',
  },
  wsArr: new Map(),
});

onMounted(() => {
  // test();
});
const enterRoom = () => {
  const ws = new WebSocket(ws_host);
  v.wsArr.set('adc', ws);
  ws.onopen = () => {
    v.wsStatus = ws.readyState;
  };
  ws.onmessage = (msg) => {
    console.log('msg', msg);
  };
};
const sendMsg = () => {
  v.wsArr.get('adc').send(v.inputMsg);
};
const test = () => {
  const code = 'hello worldworldworldworldworldworldworldworld',
    salt = '123456';
  const a = enCrypto(code, salt);
  console.log(a);
  // const b = deCrypto(a);
  const c = deCrypto(a, salt);
  console.log(c);
};
</script>

<style scoped lang="less">
.container {
  width: 80%;
  height: 80%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px auto;
  .user {
    display: flex;
    border-bottom: 1px solid #ccc;
    .info {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: url('../../assets/417230622.jpg');
      margin: 5px;
    }
    .status {
      width: calc(100% - 60px);
      position: relative;
      & > div:first-child {
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        font-size: 20px;
      }
      & > div:last-child {
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: 50%;
        top: 70%;
        transform: translate(-50%, -50%);
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .chat-wrapper {
    display: flex;
    height: calc(100% - 70px);
    .menu {
      width: 70px;
      height: 100%;
      border-right: 1px solid #ccc;
      .menu-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
      }
      .menu-item-active {
        background: #9fcb73;
        font-style: italic;
        font-size: 18px;
        color: #fff;
      }
    }
    .menu-content {
      width: 300px;
      height: 100%;
      border-right: 1px solid #ccc;
    }
  }
}
</style>
