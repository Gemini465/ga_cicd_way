<template>
  <div class="container">
    <div id="text-scroll">
      <div>
        The most anthologized poem of the last 25 years for a reason. See also: “This is Just to
        Say,” which, among other things, has spawned a host of memes and parodies.
      </div>
    </div>
    <div id="img-scroll">
      <div class="imageList">
        <img :src="aya" alt="" />
        <img :src="moon" alt="" />
        <img :src="aya" alt="" />
        <img :src="moon" alt="" />
        <img :src="aya" alt="" />
        <img :src="moon" alt="" />
        <img :src="aya" alt="" />
        <img :src="moon" alt="" />
        <img :src="aya" alt="" />
      </div>
    </div>
    <div id="calendar">
      <Calendar />
    </div>
    <div id="scrollbar"></div>
    <div id="js-ssh"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import aya from '../../assets/aya.jpg';
import moon from '../../assets/417230622.jpg';
import Calendar from '@/components/calendar';
onMounted(() => {
  // play();
});
const play = () => {
  const imageList = document.querySelector('.imageList');
  imageList.style.transition = 'all 12s ease-in-out';
  imageList.style.marginLeft = '-200px';
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: calc(100vh - 50px);
  #text-scroll {
    height: 100px;
    width: 70%;
    border: 1px solid #ccc;
    overflow: hidden;
    margin: 20px auto;
    & > div {
      line-height: 100px;
      font-size: 60px;
      //writing-mode: vertical-lr;
      white-space: nowrap;
      //word-wrap: break-word;
      animation: scroll-text 20s linear infinite;
    }
  }
  #img-scroll {
    height: 200px;
    width: 200px;
    border: 1px solid #ccc;
    margin: 20px auto;
    overflow: hidden;
    .imageList {
      height: 200px;
      width: 1800px;
      animation: fadeIn 16s ease-in-out alternate infinite;
      &:hover {
        animation-play-state: paused;
      }
      & > img {
        width: 200px;
        height: 100%;
      }
    }
  }
}
@keyframes scroll-text {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-3957px);
  }
}
@keyframes fadeIn {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1600px);
  }
}
</style>
