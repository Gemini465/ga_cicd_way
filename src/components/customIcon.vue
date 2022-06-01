<template>
  <svg width="100%" height="100%" @click="activeAnimate">
    <g
      v-if="['back', 'forward'].includes(icon)"
      :style="icon === 'forward' ? commonStyle : null"
      stroke="#fff"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M 10 13 A 15 15 0 1 1 40 22" />
      <polyline points="7,11 8,20 15,12" />
      <circle cx="25" cy="19" r="1" fill="#fff" />
    </g>
    <g
      v-if="['prev', 'next'].includes(icon)"
      :style="icon === 'next' ? commonStyle : null"
      stroke="#fff"
      stroke-width="2"
      stroke-linejoin="round"
      fill="#fff"
    >
      <polygon points="30,5 10,15 30,25 20,15" />
      <polygon points="40,5 25,15 40,25" />
    </g>
    <g v-if="icon === 'play'" fill="#fff" stroke-linejoin="round">
      <path id="pause" d="M 17 10 L 17 50 L 25 50 L 25 10 z" />
      <path id="paused" d="M 43 10 L 43 50 L 35 50 L 35 10 z" />
    </g>
  </svg>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'customIcon',
  props: {
    icon: {
      type: String,
      default: 'back',
    },
    commonStyle: {
      type: Object,
      default: () => ({
        transform: 'rotateY(180deg)',
        transformOrigin: 'center',
      }),
    },
    back: {
      type: Function,
      default: () => {},
    },
    prev: {
      type: Function,
      default: () => {},
    },
    play: {
      type: Function,
      default: () => {},
    },
    next: {
      type: Function,
      default: () => {},
    },
    forward: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const paused = ref(false);
    const activeAnimate = () => {
      const { icon, play } = props;
      if (icon === 'play') {
        play();
        const el1 = document.getElementById('pause');
        const el2 = document.getElementById('paused');
        if (!paused.value) {
          paused.value = true;
          el1.classList.remove('revertPauseLine');
          el2.classList.remove('revertPauseLineRight');
          el1.classList.add('pauseLine');
          el2.classList.add('pauseLineRight');
        } else {
          paused.value = false;
          el1.classList.remove('pauseLine');
          el2.classList.remove('pauseLineRight');
          el1.classList.add('revertPauseLine');
          el2.classList.add('revertPauseLineRight');
        }
      }
    };
    return { activeAnimate };
  },
};
</script>

<style scoped>
.pauseLine {
  animation: pauseLine 0.4s linear forwards;
}
.pauseLineRight {
  animation: pauseLineRight 0.4s linear forwards;
}
.revertPauseLine {
  animation: revertPauseLine 0.4s linear forwards;
}
.revertPauseLineRight {
  animation: revertPauseLineRight 0.4s linear forwards;
}
@keyframes pauseLine {
  0% {
    d: path('M 17 10 L 17 50 L 25 50 L 25 10 z');
    transform: rotateY(90deg);
    transform-origin: center;
  }
  25% {
    d: path('M 17 10 L 17 50 L 33 45 L 33 15 z');
  }
  50% {
    d: path('M 17 10 L 17 43 L 40 40 L 40 20 z');
  }
  75% {
    d: path('M 17 10 L 17 36 L 45 35 L 45 25 z');
  }
  100% {
    d: path('M 17 10 L 17 30 L 50 30 L 50 30 z');
  }
}
@keyframes pauseLineRight {
  0% {
    d: path('M 43 10 L 43 50 L 35 50 L 35 10 z');
    transform: rotateY(90deg);
    transform-origin: center;
  }
  25% {
    d: path('M 50 15  L 17 30 L 17 50 z');
  }
  50% {
    d: path('M 50 20  L 17 38 L 17 45 z');
  }
  75% {
    d: path('M 50 25  L 17 45 L 17 37 z');
  }
  100% {
    d: path('M 50 30 L 17 50 L 17 30 z');
  }
}
@keyframes revertPauseLine {
  0% {
    d: path('M 17 10 L 17 30 L 50 30 L 50 30 z');
    transform: rotateY(-90deg);
    transform-origin: center;
  }
  25% {
    d: path('M 17 10 L 17 36 L 45 35 L 45 25 z');
  }
  50% {
    d: path('M 17 10 L 17 43 L 40 40 L 40 20 z');
  }
  75% {
    d: path('M 17 10 L 17 50 L 33 45 L 33 15 z');
  }
  100% {
    d: path('M 17 10 L 17 50 L 25 50 L 25 10 z');
  }
}
@keyframes revertPauseLineRight {
  0% {
    d: path('M 50 30 L 17 50 L 17 30 z');
    transform: rotateY(-180deg);
    transform-origin: center;
  }
  25% {
    d: path('M 50 25  L 17 45 L 17 37 z');
  }
  50% {
    d: path('M 50 20  L 17 38 L 17 45 z');
  }
  75% {
    d: path('M 50 15  L 17 30 L 17 50 z');
  }
  100% {
    d: path('M 43 10 L 43 50 L 35 50 L 35 10 z');
  }
}
</style>
