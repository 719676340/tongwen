<template>
  <div class="content-box">
    <div class="countdown-box">
      <span class="countdown-text">{{countdown}}s</span>
    </div>
    <div class="control-box">
      <div class="input-box">
        <div class="input-text">
          <div class="input-title">目标水分:</div>
          <div>{{ target_water }}%</div>
        </div>
        <div class="input">
          <el-input-number v-model="target_water" step="0.1"/>
        </div>
        <div class="Temperature-text">
          <div class="Temperature-title">滚筒桶温:</div>
          <div>{{ Temperature[Temperature.length-1] }}℃</div>
        </div>
      </div>
      <div class="linegraph-box">
        <div class="linegraph" id="linegraph"></div>
      </div>
    </div>
  </div>
  <!-- <el-button type="primary" @click="init_history_data">Primary</el-button> -->
</template>


<script setup>
import {api_get_Temperature} from '../api/index';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { ElMessage } from 'element-plus'


var countdown=ref(0)
var timer
var myChart 
var Countdownnum=5
var target_water=ref(12)
var datetime=ref([])
var Temperature=ref([])

function startCountdown(Countdownnum) {
  timer=setInterval(()=>{
    if(countdown.value!=0){
      countdown.value--
    }else{
      countdown.value=Countdownnum
      // 插入获取数据的方法
      get_Temperature()
      if(datetime.value.length>10){
        datetime.value.shift()
        Temperature.value.shift()
      }
      myChart.setOption({
        xAxis: {
          data: datetime.value
        },
        series: [
          {
            name: '销量',
            type: 'line',
            smooth: true,
            data: Temperature.value,
            itemStyle : { normal: {label : {show: true}}}
          }
        ]
      })
    }
  },1000)
}

function initecharts(){
  myChart = echarts.init(document.getElementById('linegraph'));
  myChart.setOption({
  title: {
    text: '滚筒桶温'
  },
  tooltip: {},
  xAxis: {
    data: datetime.value
  },
  yAxis: {},
  series: [
    { 
      name: '销量',
      type: 'line',
      smooth: true,
      data: Temperature.value,
      itemStyle : { normal: {label : {show: true}}}
    }
  ]
  });
}

function get_Temperature(){
  var current_time=dayjs().format("YYYY-MM-DD HH:mm:ss")
  // 添加图标日期
  datetime.value.push(current_time)
  api_get_Temperature(target_water.value,current_time).then((res)=>{
    Temperature.value.push(res)
  })
  .catch((err)=>{
    ElMessage.error('获取预测温度失败')
    console.log(err)
  })
}

onMounted(()=>{
  initecharts()
  startCountdown(Countdownnum)
})
onBeforeMount(()=>{
  clearInterval(timer)
  // destroyecharts()
  // myChart.clear()
})
</script>

<style lang="less" scoped>
.content-box{
  height: 100vh;
  padding: 4% 50px 50px;
  box-sizing: border-box;
  .countdown-box{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20%;
    width: 100%;

    .countdown-text{
      font-size: 10vh;
      color: black;
    }
  }
  .control-box{
    display: flex;
    justify-content: center;
    height: 60%;
    padding: 0 5%;
    .input-box{
      display: flex;
      flex-direction: column;
      width: 20%;
      .input-text{
        position:relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5vh;
        height: 30%;
        .input-title{
          position: absolute;
          top:0;
          left: 0;
          font-size: 3vh;
        }
      }
      .input{
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .Temperature-text{
        position: relative;
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5vh;
        .Temperature-title{
          position: absolute;
          top:0;
          left: 0;
          font-size: 3vh;

        }
      }
    }
    .linegraph-box{
      flex: 1;
      // background-color: black;
      .linegraph{
        // width: 800px;
        height: 100%;
      }
    }
  }
}

</style>
