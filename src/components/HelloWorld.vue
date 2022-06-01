<template>
  <div id="hello">
    <input
      ref="inputRef"
      type="file"
      @change="fileChange"
      :style="{ display: 'none' }"
    />

    <div class="avatar">
      <img
        @click="() => $refs.inputRef.click()"
        width="350"
        src="../assets/417230622.jpg"
        alt=""
      />
    </div>
    <div class="progress">
      <div class="progressing"></div>
    </div>
    <div class="time">
      <div>{{ startTime }}</div>
      <div>{{ endTime }}</div>
    </div>

    <div class="option">
      <div class="back"><CustomIcon :back="back" /></div>
      <div class="prev">
        <CustomIcon icon="prev" :prev="prev" />
      </div>
      <div class="pause">
        <CustomIcon icon="play" :play="play" />
      </div>
      <div class="next">
        <CustomIcon icon="next" :next="next" />
      </div>
      <div class="forward">
        <CustomIcon icon="forward" :forward="forward" />
      </div>
    </div>
    <!--    <Animate></Animate>-->
    <button @click="toCanvas">tiaozhuan</button>
  </div>
  <!--  <audio controls><source :src="audioPath" /></audio>-->
  <router-view />
</template>

<script>
import { toRefs, reactive, onMounted } from 'vue';
import CustomIcon from './customIcon';
// import Animate from '@/components/animate';
import { useRouter } from 'vue-router';

import './index.less';

export default {
  name: 'HelloWorld',
  components: {
    CustomIcon,
    // Animate,
  },
  props: {
    msg: String,
  },

  setup() {
    const router = useRouter();
    const data = reactive({
      playList: [],
      audioPath: '',
      showControls: false,
      showList: false,
      startTime: '00:00',
      endTime: '00:00',
      index: 0,
      paused: true,
    });
    onMounted(() => {});

    const methods = {
      back: () => {},
      prev: () => {},
      play: () => {
        const audioCtx = new (window.AudioContext ||
          window.webkitAudioContext)();
        let audioBufferSourceNode = null;
        const analyzer = audioCtx.createAnalyser();
        const fr = new FileReader();
        fr.readAsArrayBuffer(data.playList[data.index]);
        fr.onload = (e) => {
          audioCtx.decodeAudioData(e.target.result).then((buffer) => {
            if (audioBufferSourceNode !== null) {
              audioBufferSourceNode.stop();
            }
            audioBufferSourceNode = null;
            audioBufferSourceNode = audioCtx.createBufferSource();
            audioBufferSourceNode.buffer = buffer;
            audioBufferSourceNode.connect(analyzer);
            audioBufferSourceNode.connect(audioCtx.destination);
            audioBufferSourceNode.loop = false;
            audioCtx.resume();
            audioBufferSourceNode.start();
          });
        };
      },
      next: () => {},
      forward: () => {},
      fileChange: (e) => {
        data.playList.push(e.target.files[0]);
        const fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        fr.onload = (e) => {
          data.audioPath = e.target.result;
        };
      },
      toCanvas: () => {
        router.push({
          path: '/home/second',
          query: { name: 'sdfasdfas', age: 'asdfasdfas' },
        });
        // router.push({
        //   name: 'canvas',
        //   params: { name: 'sdfasdfas', age: 'asdfasdfas' },
        // });
      },
    };

    return {
      ...toRefs(data),
      ...methods,
    };
  },
};
</script>
