<template>
  <div class="light">
    <div :class="['calendar', v.showMonthList ? 'hideHeader' : 'showHeader']">
      <div class="calendar-header">
        <div class="month-picker" @click="v.showMonthList = !v.showMonthList">
          {{ v.months[v.month].slice(0, 3) }}
        </div>
        <div class="year-picker">
          <span class="year-change" @click="prevYear">&nbsp;&lt;&nbsp;</span>
          &nbsp;
          <span id="year">{{ v.year }}</span>
          &nbsp;
          <span class="year-change" @click="nextYear">&nbsp;&gt;&nbsp;</span>
        </div>
      </div>
      <div class="calendar-body">
        <div class="calendar-week-day">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div class="calendar-days" v-for="(item, index) in v.days" :key="index">
          <div
            :class="[
              day.day !== '' ? 'day-item' : 'not-day-item',
              isToday(day.day) ? 'isToday' : ''
            ]"
            v-for="(day, index) in item"
            :key="index + 10"
            @mouseenter="v.showTooltip = true"
            @mouseleave="v.showTooltip = false"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>
    <div :class="['month-list', v.showMonthList ? 'showMonthList' : 'hideMonthList']">
      <div @click="monthPick(index)" v-for="(item, index) in v.months" :key="index + 100">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

const v = reactive({
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  showMonthList: false,
  days: [],
  month: new Date().getMonth(),
  year: new Date().getFullYear()
});

const generateCalendar = (year, month) => {
  const date = new Date(year, month - 1);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstDayWeekDay = firstDay.getDay();
  const lastDayWeekDay = lastDay.getDay();
  const days = [];
  for (let i = 0; i < firstDayWeekDay; i++) {
    days.push({
      day: '',
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    });
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      isToday: false,
      isSelected: false
    });
  }
  for (let i = 0; i < 6 - lastDayWeekDay; i++) {
    days.push({
      day: '',
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    });
  }
  const arr = [];
  for (let i = 0; i < days.length; i += 7) {
    arr.push(days.slice(i, i + 7));
  }
  v.days = arr;
};

const isToday = day => {
  const today = new Date();
  return today.getFullYear() === v.year && today.getMonth() === v.month && today.getDate() === day;
};

const monthPick = val => {
  generateCalendar(v.year, val + 1);
  v.month = val;
  v.showMonthList = false;
};

const prevYear = () => {
  v.year--;
  generateCalendar(v.year, v.month);
};

const nextYear = () => {
  v.year++;
  generateCalendar(v.year, v.month);
};

onMounted(() => {
  generateCalendar(v.year, v.month + 1);
});
</script>

<style scoped lang="less">
.light {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Luckiest Guy', cursive;
  min-height: 150px;
  position: relative;
  .calendar {
    transition: all 0.53s ease;
    .calendar-header {
      display: flex;
      justify-content: space-around;
      height: 50px;
      .month-picker {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        border-radius: 10px;
        width: 100px;
        height: 30px;
        &:hover {
          cursor: pointer;
          background: #f3f3f3;
        }
      }
      .year-picker {
        display: flex;
        justify-content: space-around;
        font-size: 20px;
        font-weight: bold;
        .year-change {
          font-size: 20px;
          font-weight: bold;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          user-select: none;
          &:hover {
            cursor: pointer;
            background: #f3f3f3;
          }
        }
      }
    }
    .calendar-body {
      .calendar-week-day {
        display: flex;
        justify-content: space-around;
        & > div {
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
      }
      .calendar-days {
        display: flex;
        justify-content: space-around;
        .not-day-item {
          width: 40px;
          height: 40px;
        }
        .day-item {
          width: 40px;
          height: 40px;
          user-select: none;
          // border-radius: 50%;
          text-align: center;
          line-height: 40px;
          transition: all 0.53s ease;
          border-left: none;
          position: relative;
          & > span:nth-child(1),
          & > span:nth-child(2),
          & > span:nth-child(3),
          & > span:nth-child(4) {
            width: 0px;
            height: 1px;
            background: lightblue;
            position: absolute;
            transition: all 0.53s ease;
          }
          & > span:nth-child(1) {
            left: 0%;
            bottom: 0%;
            transform: rotate(-90deg);
            transform-origin: left;
          }
          & > span:nth-child(2) {
            left: 0%;
          }
          & > span:nth-child(3) {
            top: 0%;
            right: 0%;
            transform: rotate(-90deg);
            transform-origin: right;
          }
          & > span:nth-child(4) {
            left: 0%;
            bottom: 0;
            transform: rotate(-180deg);
          }
          &:hover {
            cursor: pointer;
            background: #f3f3f3;

            & > span:nth-child(1),
            & > span:nth-child(3),
            & > span:nth-child(2),
            & > span:nth-child(4) {
              width: 40px;
            }
          }
        }
      }
    }
  }
  .month-list {
    position: absolute;
    top: 20px;
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    transition: all 0.53s ease;
    transform: rotateY(180deg);
    margin: 10px 0;
    z-index: 1;
    & > div {
      width: 95px;
      height: 40px;
      border-radius: 10px;
      text-align: center;
      line-height: 40px;
      transition: all 0.53s ease;
      &:hover {
        cursor: pointer;
        background: #f3f3f3;
      }
    }
  }
  .showMonthList {
    visibility: visible;
    opacity: 1;
    transform: scale(1) rotateY(0);
  }
  .hideMonthList {
    visibility: hidden;
    opacity: 0;
  }
  .hideHeader {
    transform: rotateY(-180deg);
    opacity: 0;
  }
  .showHeader {
    transform: rotateY(0deg);
    opacity: 1;
  }
  .isToday {
    background: lightblue !important;
  }
}
</style>
