<template>
  <canvas id="canvas"></canvas>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { query, params } = useRoute();
console.log(query, params);

onMounted(() => {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    canvas.onmousedown = (e) => {
      const ev = e || window.event;
      const x = ev.clientX - canvas.offsetLeft;
      const y = ev.clientY - canvas.offsetTop;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      canvas.onmousemove = (e) => {
        const ev = e || window.event;
        const x = ev.clientX - canvas.offsetLeft;
        const y = ev.clientY - canvas.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
      };
      canvas.onmouseup = () => {
        canvas.onmousemove = null;
      };
    };
  }
});
</script>

<style scoped>
#canvas {
  width: 700px;
  height: 500px;
  border: 1px solid #000;
  box-shadow: 1px 1px 5px #000;
  margin: 0px auto;
}
#canvas:hover {
  cursor: crosshair;
}
</style>
