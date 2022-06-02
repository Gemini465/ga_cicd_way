<template>
  <div class="wrapper">
    <div class="slider"></div>
  </div>
  <div class="wrapper-v"><div class="slider-v"></div></div>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  const wrapper = document.querySelector('.wrapper');
  const slider = document.querySelector('.slider');
  const wrapperV = document.querySelector('.wrapper-v');
  const sliderV = document.querySelector('.slider-v');

  const w = wrapper.clientWidth - slider.clientWidth - 8;
  const v = wrapperV.clientHeight - sliderV.clientHeight - 8;

  console.log('wrapper', wrapper.clientLeft, wrapper.offsetLeft, wrapper.clientWidth);
  console.log('slider', slider.clientLeft, slider.offsetLeft, slider.clientWidth);
  console.log('wrapperV', wrapperV.clientTop, wrapperV.offsetTop);
  console.log('sliderV', sliderV.clientTop, sliderV.offsetTop);

  slider.onmousedown = e => {
    const disX = e.clientX - slider.offsetLeft;
    slider.onmousemove = e => {
      const l = e.clientX - disX;
      if (l < 0) {
        slider.style.marginLeft = 0;
        sliderV.style.marginTop = 0;
      } else if (l > wrapper.offsetWidth - slider.offsetWidth - 8) {
        slider.style.marginLeft = wrapper.offsetWidth - slider.offsetWidth - 8 + 'px';
        sliderV.style.marginTop = wrapperV.offsetHeight - sliderV.offsetHeight - 8 + 'px';
      } else {
        slider.style.marginLeft = l + 'px';
        sliderV.style.marginTop = (l / w) * v + 'px';
      }
    };
    slider.onmouseup = () => {
      slider.onmousemove = null;
      slider.onmouseup = null;
    };
  };

  sliderV.onmousedown = e => {
    const disY = e.clientY - sliderV.offsetTop;
    sliderV.onmousemove = e => {
      const h = e.clientY - disY;
      if (h < 0) {
        sliderV.style.marginTop = 0;
        slider.style.marginLeft = 0;
      } else if (h > wrapperV.offsetHeight - sliderV.offsetHeight - 8) {
        sliderV.style.marginTop = wrapperV.offsetHeight - sliderV.offsetHeight - 8 + 'px';
        slider.style.marginLeft = wrapper.offsetWidth - slider.offsetWidth - 8 + 'px';
      } else {
        sliderV.style.marginTop = h + 'px';
        slider.style.marginLeft =  (h / v) * w + 'px';
      }
    };
    sliderV.onmouseup = () => {
      sliderV.onmousemove = null;
      sliderV.onmouseup = null;
    };
  };
});
</script>

<style scoped>
.wrapper {
  width: 500px;
  height: 30px;
  background: #f3f3f3;
  border-radius: 15px;
  padding: 4px;
  position: relative;
}
.slider {
  width: 50px;
  height: 100%;
  border-radius: 11px;
  background: #ccc;
  cursor: pointer;
  /* position: absolute; */
}
.wrapper-v {
  height: 400px;
  width: 30px;
  background: #f3f3f3;
  border-radius: 15px;
  padding: 4px;
  position: relative;
  margin-top: 10px;
}
.slider-v {
  height: 50px;
  width: 100%;
  border-radius: 11px;
  background: #ccc;
  cursor: pointer;
  /* position: absolute; */
}
</style>
