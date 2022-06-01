<template>
  <div class="load">
    <div style="--i: 1"></div>
    <div style="--i: 2"></div>
    <div style="--i: 3"></div>
    <div style="--i: 4"></div>
    <div style="--i: 5"></div>
  </div>
  <svg>
    <path
      class="trans"
      d="M0 0 L0 60 L0 60 L 60 60 L 60 60 L 60 0 z"
      fill="none"
      stroke="yellow"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!--    <circle cx="60" cy="60" r="50" stroke="#ccc" stroke-width="5" fill="none" />-->
    <!--    <circle-->
    <!--      cx="60"-->
    <!--      cy="60"-->
    <!--      r="50"-->
    <!--      stroke="yellow"-->
    <!--      stroke-width="5"-->
    <!--      fill="none"-->
    <!--      stroke-dasharray="1110"-->
    <!--      stroke-linecap="round"-->
    <!--      stroke-dashoffset="900"-->
    <!--    />-->
  </svg>
</template>
<script>
import { useRoute } from 'vue-router';

export default {
  name: 'animateSvg',
  setup() {
    const { query } = useRoute();
    console.log('============>>>>>>>>>>>>>>>>', query);
  },
};
</script>

<style scoped lang="less">
.load {
  position: relative;
  margin: 50px auto;
  width: 150px;
  div {
    width: calc(var(--i) * 20px);
    height: calc(var(--i) * 20px);
    position: absolute;
    border: 5px solid #9fcb73;
    left: calc(50% - (var(--i) * 10px));
    top: calc(50% - (var(--i) * 10px));
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: loader 2s ease-in-out infinite calc(var(--i) * 0.1s);
    transform-origin: center;
  }
}
@keyframes loader {
  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
.trans {
  animation: trans 1s ease infinite;
  stroke-dasharray: 10;
}
@keyframes trans {
  0% {
    d: path('M0 0 L0 60 L0 60 L 60 60 L 60 60 L 60 0 z');
    stroke: red;
  }
  25% {
    d: path('M20 0 L0 30 L 20 60 L 40 60 L 60 30 L 40 0 z');
    stroke: orange;
  }
  50% {
    d: path('M30 0 L30 0 L0 60 L 0 60 L 60 60 L 60 60 z');
    stroke: yellow;
  }
  75% {
    d: path('M20 0 L20 60 L20 60 L40 60 L40 60 L 40 0 z');
    stroke: green;
  }
  //90% {
  //  d: path('M30 0 A 30 30 1 0 1 15 15 z');
  //}
  100% {
    d: path('M0 0 L0 60 L0 60 L 60 60 L 60 60 L 60 0 z');
    stroke: blue;
  }
}
</style>
