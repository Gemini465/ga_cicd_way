import { defineStore } from 'pinia';

export const ChatStore = defineStore('ChatStore', {
  state: () => ({
    chatObj: {
      chatName: '',
    },
  }),
  getters: {},
  actions: {
    setChatName(name) {
      this.chatObj.chatName = name;
    },
  },
});
