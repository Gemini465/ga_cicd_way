<template>
  <div class="container">
    <canvas id="canvas-scrape">浏览器暂不支持canvas</canvas>
    <canvas id="canvas-animation">浏览器暂不支持canvas</canvas>
    <canvas id="canvas-animation1">浏览器暂不支持canvas</canvas>
    <canvas id="canvas-animation2">浏览器暂不支持canvas</canvas>
    <canvas id="canvas-animation3">浏览器暂不支持canvas</canvas>
    <div id="canvas-animation4"></div>
    <div id="canvas-animation5">
      <svg width="300" height="200">
        <g>
          <circle
            id="circle3"
            cx="150"
            cy="100"
            r="70"
            fill="none"
            stroke="#e3e4e5"
            stroke-width="8"
          />
          <circle
            id="circle4"
            cx="150"
            cy="100"
            r="70"
            fill="none"
            stroke="#00838f"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
            :stroke-dasharray="v.circleArray"
          />
          <text x="145" y="100" fill="red">
            {{ v.percent }}
          </text>
        </g>
        <g>
          <path
            id="circle1"
            d="M70 170 A 100 100 0 1 1 230 170"
            fill="none"
            stroke="#ccc"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="circle2"
            d="M70 170 A 100 100 0 1 1 230 170"
            fill="none"
            stroke="#f44336"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dashoffset="0"
            :stroke-dasharray="v.dashArray"
          />
        </g>
      </svg>
    </div>
    <div id="gradient-text"><h1>MULTI COLOR TEXT WITH CSS</h1></div>
  </div>

  <!--  <BubbleSortAnimate :start="v.start" />-->
  <!--  <el-button @click="startSort">startSort</el-button>-->
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';
import BubbleSortAnimate from '@/components/BubbleSortAnimate';

const bsaRef = ref(null);
const v = reactive({
  data: [
    { title: 'a', num: 20 },
    { title: 'b', num: 30 },
    { title: 'c', num: 40 },
    { title: 'd', num: 50 },
    { title: 'e', num: 60 }
  ],
  dashArray: '100 443',
  circleArray: '100 440',
  percent: '0%',
  start: false
});
onMounted(() => {
  scrape();
  // animation();
  animation1();
  // curve();
  circle();
});

const startSort = () => {
  v.start = true;
};

const scrape = () => {
  const canvas = document.getElementById('canvas-scrape');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';

    canvas.onmousedown = e => {
      const ev = e || window.event;
      const x = ev.clientX - canvas.offsetLeft;
      const y = ev.clientY - canvas.offsetTop;

      ctx.moveTo(x, y);

      canvas.onmousemove = e => {
        const ev = e || window.event;
        const x = ev.clientX - canvas.offsetLeft;
        const y = ev.clientY - canvas.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
      };

      canvas.onmouseup = () => {
        canvas.onmousemove = null;
        canvas.onmouseup = null;
      };
    };
  }
};

const animation = () => {
  const canvas = document.getElementById('canvas-animation');
  let raf;
  canvas.addEventListener('mouseover', () => {
    raf = window.requestAnimationFrame(draw);
  });
  canvas.addEventListener('mouseout', () => {
    window.cancelAnimationFrame(raf);
  });
  const draw = () => {
    if (canvas.getContext) {
      /** @type {CanvasRenderingContext2D}
       * canvas 动画
       * 1 绘制图像
       * 2 清除图像
       * 3 更新位置
       * 4 绘制图像
       *  234 234 234
       * */
      const ctx = canvas.getContext('2d');
      ctx.beginPath();

      let x = 0,
        y = 0,
        w = 10,
        h = 10;
      ctx.fillStyle = 'lightgreen';
      ctx.fillRect(x, y, w, h);

      let sx = 2,
        sy = 2;

      setInterval(() => {
        // setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // }, 30);

        x += sx;
        if (x >= canvas.width - w || x <= 0) {
          sx = -sx;
        }
        y += sy;
        if (y >= canvas.height - h || y <= 0) {
          sy = -sy;
        }
        ctx.fillRect(x, y, w, h);
      }, 20);
    }
  };
};

const animation1 = () => {
  const canvas = document.getElementById('canvas-animation1');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let raf;

    const ball = {
      x: 15,
      y: 15,
      sx: 5,
      sy: 2,
      r: 5,
      color: 'blue',
      draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    };

    function draw() {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      ball.draw();
      ball.x += ball.sx;
      ball.y += ball.sy;
      if (ball.x >= canvas.width - ball.r || ball.x - ball.r <= 0) {
        ball.sx = -ball.sx;
      }
      if (ball.y >= canvas.height - ball.r || ball.y - ball.r <= 0) {
        ball.sy = -ball.sy;
      }
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      raf = window.requestAnimationFrame(draw);
    }

    canvas.addEventListener('mouseover', function (e) {
      raf = window.requestAnimationFrame(draw);
    });
    canvas.addEventListener('click', function (e) {
      canvas.onmousemove = null;
      raf = window.requestAnimationFrame(draw);
    });
    // canvas.addEventListener('mousemove', function (e) {
    //   ctx.fillStyle = 'rgba(255,255,255,0.3)';
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
    //   ball.x = e.offsetX;
    //   ball.y = e.offsetY;
    //   ball.draw();
    // });

    canvas.addEventListener('mouseout', function (e) {
      window.cancelAnimationFrame(raf);
    });

    ball.draw();
  }
};

const solarSystem = () => {
  const imgObj = {};
};

const curve = () => {
  const el = document.getElementById('canvas-animation4');
  const echartsEl = echarts.init(el);

  let option;

  let base = +new Date(2014, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 150];
  let now = new Date(base);
  function addData(shift) {
    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
    date.push(now);
    data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
    if (shift) {
      date.shift();
      data.shift();
    }
    now = new Date(+new Date(now) + oneDay);
  }
  for (let i = 1; i < 100; i++) {
    addData();
  }
  option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      boundaryGap: [0, '50%'],
      type: 'value'
    },
    series: [
      {
        name: '成交',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'a',
        areaStyle: {
          normal: {}
        },
        data: data
      }
    ]
  };
  setInterval(function () {
    addData(true);
    echartsEl.setOption({
      xAxis: {
        data: date
      },
      series: [
        {
          name: '成交',
          data: data
        }
      ]
    });
  }, 500);

  option && echartsEl.setOption(option);
};

const circle = () => {
  const e = document.getElementById('canvas-animation5');
  const init = () => {
    const el = document.getElementById('circle1');
    const el3 = document.getElementById('circle3');
    const len = el.getTotalLength();
    const len3 = el3.getTotalLength();
    setInterval(() => {
      v.dashArray = Math.random() * len + ' ' + len;
      const p = Math.random() * len3;
      v.circleArray = p + ' ' + len3;
      v.percent = ((p / len3) * 100).toFixed(2) + '%';
    }, 1000);
  };
  e.onmouseover = init;
};
</script>

<style scoped lang="less">
.container {
  /*height: calc(100vh - 50px);*/
  display: flex;
  /*主轴上对齐方式 flex-start flex-end center space-between space-around*/
  justify-content: flex-start;
  /*主轴方向 row row-reverse column column-reverse; */
  /*flex-direction: row;*/
  /*换行 no-wrap wrap wrap-reverse;*/
  flex-wrap: wrap;
  /*组合 flex-flow: flex-direction flex-wrap; */
  /*交叉轴上对齐方式 flex-start flex-end center baseline stretch*/
  /*align-items: flex-start;*/
  /*多根轴线对齐方式 只有一根轴线不起作用 flex-start flex-end center space-between space-around stretch*/
  /*align-content: center;*/
}
#canvas-scrape {
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  /*排列顺序 数值越小越靠前 默认为0*/
  order: 0;
  /*放大比例 flex-grow: 2;*/
  /*缩小比例 flex-shrink: 0;*/
  /*flex-basis: auto;*/
  /*flex: flex-grow/shrink flex-basis;*/
  /*单独设置对其属性 align-self: auto;*/
  margin-left: 10px;
  margin-top: 10px;
}
#canvas-animation,
#canvas-animation1,
#canvas-animation2,
#canvas-animation3,
#canvas-animation4,
#canvas-animation5,
#gradient-text {
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  margin-left: 10px;
  margin-top: 10px;
}
#circle2 {
  transition: all 0.2s ease-in;
}
#circle4 {
  transform: rotate(-90deg);
  transition: all 0.2s ease-in;
  transform-origin: center;
}
#gradient-text {
  --c1: #01579b;
  --c2: #00838f;
  --c3: #ffd600;
  --c4: #ff4081;
  --c5: #f44336;
  display: grid;
  background: #141414;
  place-items: center;
  h1 {
    font-size: 32px;
    text-transform: uppercase;
    word-spacing: 100vw;
    width: min-content;
    text-align: center;
    font-family: 'Luckiest Guy', cursive;
    line-height: 100%;
    color: transparent;
    background: linear-gradient(
      225deg,
      var(--c1) 0%,
      var(--c1) 9%,
      transparent 9%,
      transparent 10%,
      var(--c2) 10%,
      var(--c2) 19%,
      transparent 19%,
      transparent 20%,
      var(--c3) 20%,
      var(--c3) 29%,
      transparent 29%,
      transparent 30%,
      var(--c4) 30%,
      var(--c4) 39%,
      transparent 39%,
      transparent 40%,
      var(--c5) 40%,
      var(--c5) 49%,
      transparent 49%,
      transparent 50%,
      var(--c1) 50%,
      var(--c1) 59%,
      transparent 59%,
      transparent 60%,
      var(--c2) 60%,
      var(--c2) 69%,
      transparent 69%,
      transparent 70%,
      var(--c3) 70%,
      var(--c3) 79%,
      transparent 79%,
      transparent 80%,
      var(--c4) 80%,
      var(--c4) 89%,
      transparent 89%,
      transparent 90%,
      var(--c5) 90%,
      var(--c5) 99%,
      transparent 99%
    );
    background-clip: text;
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
  @keyframes gradient {
    0% {
      background-position: 0 -100%;
    }
    100% {
      background-position: -100% 0;
    }
  }
}
</style>
