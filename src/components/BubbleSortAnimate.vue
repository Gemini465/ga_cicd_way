<template>
  <svg width="300" height="550">
    <rect
      v-for="(d, i) in v.array"
      :key="i"
      :x="i * 10 + 20"
      :y="550 - d * 10"
      width="10"
      :height="d * 10"
      fill="green"
    />
  </svg>
</template>

<script setup>
import { reactive, defineProps, watch } from 'vue';
import { bubbleSort } from '@/utils/helper';

const props = defineProps(['start']);
console.log(props.start);
const v = reactive({ array: [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48] });

const startBubble = () => {
  const t = bubbleSort(v.array);
  console.log(t);
};

watch(
  () => props.start,
  () => {
    startBubble();
  }
);
</script>

<style scoped lang="less"></style>
