import * as crypto from 'crypto-js';
import * as moment from 'moment';
import { public_salt, ws_host } from '@/utils/api';

export const enCrypto = (arg, salt = public_salt) => {
  return crypto.AES.encrypt(arg, salt).toString();
};

export const deCrypto = (arg, salt = public_salt) => {
  return crypto.AES.decrypt(arg, salt).toString(crypto.enc.Utf8);
};

export const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
};

export const generateWatermark = value => {
  return `data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext y='15' fill='rgba(0,150,150,0.8)' transform='rotate(-30 120 0)'%3E${value}%3C/text%3E%3C/svg%3E`;
};

export const createWsConnection = (url, onOpen, onMessage, onClose, onError) => {};

export const bubbleSort = arr => {
  const len = arr.length;
  const temp = [];
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const t = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = t;
      }
      temp.push({ arr: [...arr], left: j, right: j + 1 });
    }
  }
  return temp;
};

export const getFebDay = year => {
  return year % 100 === 0 && year % 400 === 0 ? 29 : 28;
};
