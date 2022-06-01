<template>
  <div class="chat-editor">
    <div class="msg-panel">
      <div class="chat-left">
        <div
          :class="[item.targetId === v.id1 ? 'left-side' : 'right-side']"
          v-for="item in v.leftMsg"
          :key="item.date"
        >
          <div class="message-item">
            <div class="message-info">
              {{ item.whoSend }}&nbsp;&nbsp;{{ item.date }}
            </div>
            <div class="message-content">
              {{ deCrypto(item.message, item.targetId) }}
            </div>
          </div>
        </div>
      </div>
      <div class="place-taker"></div>
      <div class="chat-right">
        <div
          :class="[item.targetId === v.id2 ? 'left-side' : 'right-side']"
          v-for="item in v.rightMsg"
          :key="item.date"
        >
          <div class="message-item">
            <div class="message-info">
              {{ item.whoSend }}&nbsp;&nbsp;{{ item.date }}
            </div>
            <div class="message-content">
              {{ deCrypto(item.message, item.targetId) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="edit-panel"
      spellcheck="false"
      contenteditable="true"
      @input="collectMsg"
    />
    <div class="send-btn">
      <el-button size="small" type="primary" @click="toRight"
        >LeftToRight</el-button
      >
      <el-button size="small" type="primary" @click="toLeft"
        >RightToLeft</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import moment from 'moment';
import { ws_host } from '@/utils/api';
import _ from 'lodash';
import { enCrypto, deCrypto } from '@/utils/helper';

const v = reactive({
  id1: '8L7J0n2Lnzic0V-v9UHvM',
  id2: 'iCqD4nfknd0gyK3vOJ88q',
  content: '',
  connMap: new Map(),

  leftMsg: [],
  rightMsg: [],
});

const collectMsg = _.debounce((e) => {
  v.content = e.target.innerHTML;
}, 400);

onMounted(() => {
  initWsConnection();
});

const initWsConnection = () => {
  const johnConn = new WebSocket(ws_host + '/' + v.id1);
  const kertConn = new WebSocket(ws_host + '/' + v.id2);
  johnConn.onopen = () => {
    if (johnConn.readyState === 1) {
      console.log('johnConn is open');
      v.connMap.set(v.id1, johnConn);
      johnConn.onmessage = johnReceiveMsg;

      johnConn.onclose = () => {
        // reconnect
        console.log('========>johnConn is closed');
      };

      johnConn.onerror = () => {
        console.log('========>johnConn error');
      };
    }
  };
  kertConn.onopen = () => {
    if (kertConn.readyState === 1) {
      console.log('kertConn is open');
      v.connMap.set(v.id2, kertConn);
      kertConn.onmessage = kertReceiveMsg;

      kertConn.onclose = () => {
        console.log('========>kertConn is closed');
      };

      kertConn.onerror = () => {
        console.log('========>kertConn error');
      };
    }
  };
};

const johnReceiveMsg = (msg) => {
  v.leftMsg.push(JSON.parse(msg.data));
  console.log('johnReceiveMsg', JSON.parse(msg.data));
};
const kertReceiveMsg = (msg) => {
  v.rightMsg.push(JSON.parse(msg.data));
  console.log('kertReceiveMsg', JSON.parse(msg.data));
};
const toLeft = () => {
  const msg = {
    whoSend: 'Kert',
    targetId: v.id1,
    message: enCrypto(v.content, v.id1),
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
  };
  v.rightMsg.push(msg);
  v.connMap.get(v.id1).send(JSON.stringify(msg));
};
const toRight = () => {
  const msg = {
    whoSend: 'John',
    targetId: v.id2,
    message: enCrypto(v.content, v.id2),
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
  };

  v.leftMsg.push(msg);
  v.connMap.get(v.id2).send(JSON.stringify(msg));
};
</script>

<style scoped lang="less">
.chat-editor {
  height: 100%;
  width: calc(100% - 350px);
  position: relative;
  .msg-panel {
    height: 70%;
    border-bottom: 1px solid #ccc;
    display: flex;
    .chat-left {
      flex: 50;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext y='15' fill='rgba(0,150,150,0.8)' transform='rotate(-30 120 0)'%3EJohn%3C/text%3E%3C/svg%3E");
      overflow-y: scroll;
    }
    .place-taker {
      flex: 1;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    .chat-right {
      flex: 50;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext y='15' fill='rgba(0,150,150,0.8)' transform='rotate(-30 120 0)'%3EKert%3C/text%3E%3C/svg%3E");
      overflow-y: scroll;
    }
    .left-side {
      margin-top: 10px;
      margin-left: 10px;
      .message-item {
        position: relative;
        .message-info {
          height: 15px;
          line-height: 15px;
          background: #fff;
        }
        .message-content {
          background: #fff;
        }
      }
    }
    .message-content {
      width: fit-content;
      max-width: 95%;
      line-height: 15px;
      border: 1px solid #ccc;
      font-size: 13px;
      letter-spacing: 1px;
      padding: 5px;
      border-radius: 10px;
      word-break: break-all;
    }
    .right-side {
      margin-top: 10px;
      margin-left: 10px;
      .message-item {
        .message-info {
          height: 15px;
          line-height: 15px;
          color: #9fcb73;
          background: #fff;
        }
        .message-content {
          background: #9fcb73;
        }
      }
    }
  }
  .edit-panel {
    height: calc(30% - 40px);
    outline: none;
    padding: 5px;
    letter-spacing: 1px;
    font-size: 14px;
  }
  .send-btn {
    height: 20px;
    position: absolute;
    bottom: 10px;
    right: 5px;
  }
}
</style>
