<template>
  <div>{{ name }}</div>
  <div>{{ c }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup(props, context) {
    const v = reactive({
      name: 'vue',
      c: 0
    });

    return { ...toRefs(v) };
  }
};
</script>

<style scoped></style>
