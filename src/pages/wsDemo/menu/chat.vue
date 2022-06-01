<template>
  <div
    :class="['chat-item', v.activeChatId === item.id ? 'chat-item-active' : '']"
    v-for="item in v.chatList"
    :key="item.id"
    @click="enterChat(item)"
  >
    <div class="randomAvatar">
      <div :style="{ background: randomColor() }" class="avatar"></div>
    </div>

    <div class="message">
      <div>{{ item.name }}</div>
      <div>{{ item.message }}</div>
    </div>
    <div class="time">&nbsp;&nbsp;{{ item.time }}&nbsp;&nbsp;</div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { ChatStore } from '@/store';
import { randomColor } from '@/utils/helper';

const store = ChatStore();

const v = reactive({
  chatList: [
    {
      id: 1,
      name: 'John',
      message: 'HeHelloHelloHelloHelloHelloHelloHelloHelloHellollo',
      time: '10:00',
    },
    {
      id: 3,
      name: 'Nash',
      message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
      time: '10:00',
    },
    {
      id: 2,
      name: 'Kert',
      message:
        'Hello world Hello world Hello world Hello world Hello world Hello world',
      time: '10:00',
    },
  ],
  activeChatId: null,
});

const enterChat = (item) => {
  store.setChatName(item.name);
  v.activeChatId = item.id;
};
</script>

<style scoped lang="less">
.chat-item {
  display: flex;
  height: 50px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  .randomAvatar {
    width: 50px;
    height: 50px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 5px;
    }
  }
  .message {
    width: calc(100% - 90px);
    & > div:first-child {
      text-indent: 5px;
      height: 25px;
      line-height: 30px;
      font-size: 16px;
    }
    & > div:last-child {
      text-indent: 5px;
      height: 25px;
      line-height: 20px;
      color: #999;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      //line-clamp: 3;
    }
  }
  .time {
    line-height: 50px;
  }
}
.chat-item-active {
  background: linear-gradient(to right, #92c0e8, #9fcb73);
}
</style>
