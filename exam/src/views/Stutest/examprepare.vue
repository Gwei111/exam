<template>
    <div class="box">
        <div class="content">
            <div class="top">
                <el-page-header @back="goBack">
                    <template #content>
                        <span class="text-large font-600 mr-3">{{testList.title}}</span>
                    </template>
                </el-page-header>
                <div class="timeBox" v-show="!testList.begintime">
                    <p>开放时间</p>
                    <p style="font-size: 13px; margin-top: 5px;">{{ testList.begintime==null?'不限':testList.begintime+'至'+testList.endtime }}</p>
                </div>
            </div>
            <div class="list">
                <div class="countNum">
                    <span class="titleNum">题目数量</span>
                    <span class="num">{{testList.subjectnum}}题</span>
                </div>
                <div class="line"></div>
                <div class="countNum">
                    <span class="titleNum">考试时长</span>
                    <span class="num">{{testList.limittime==0?'不限':testList.limittime+'min'}}</span>
                </div>
                <div class="line"></div>
                <div class="countNum">
                    <span class="titleNum">考试总分</span>
                    <span class="num">{{testList.scores}}分</span>
                </div>
                <div class="line"></div>
                <div class="countNum">
                    <span class="titleNum">通过分数</span>
                    <span class="num">{{testList.pastscores}}分</span>
                </div>
                <!-- <div class="line"></div> -->
            </div>
            <div class="btn">
                <el-button type="primary" @click="getExam" :disabled="testList.begintime?(minutes<0||!isStart?true:false):false">{{testList.begintime
                    ?(minutes<0||!isStart)?
                    !isStart?
                    `${time}开始考试`:
                    '不在开放时间内':
                    '开始考试':
                    '开始考试'}}</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted,reactive,toRefs } from 'vue'
import { useRoute } from "vue-router"
import {testGet} from '../../api/test'
import router from '../../router';
import moment from 'moment';

let Route:any=useRoute()
let testid=Route.query.id
onMounted(() => {
    console.log(Route.query);
    
})

const data:any = reactive({
    testList:{
        begintime:'',
        endtime:''
    },
    time:'',
})
const {testList,time}=toRefs(data)
let getTestlist=async()=>{
    let res:any=await testGet({id:Route.query.id})
    console.log(res);
    if(res.errCode==10000){
        data.testList=res.data
    }
    
}
getTestlist()
let isStart=ref(false)
// 计算时间
let minutes=moment(testList.value.endtime).diff(moment(),'minutes')
// 倒计时
let timer=setInterval(() => {
    let timeing=moment()//获取当前时间
    let start=moment(new Date(testList.value.begintime))//获取开始考试时间
    let diff=start.diff(timeing)//时间差
    time.value=`${moment.duration(diff).hours()}:${moment.duration(diff).minutes()}:${moment.duration(diff).seconds()}`
    // console.log(time);
    
    let awaitTime=Math.floor(diff/1000)
    if(awaitTime<=0){
        clearInterval(timer)
        time.value='00.00'
        isStart.value=true
    }

}, 10);
// 开始考试
const getExam=()=>{
    router.push({path:'/stuExam',query:{testid}})
}
const goBack = () => {
    router.push({path:'/stutest',})
}
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}

.box {

    width: 100%;
    height: 100vh;
    background: url('http://edu.90000p.com/exam/cyx/assets/bg.bdbaa5ee.jfif') no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        width: 650px;
        background-color: #fff;
        padding: 50px 60px;

    }

    .timeBox {
        padding: 0 50px 25px;
        border-bottom: 1px solid #e7e4e4;
        margin-top: 25px;
    }

    .list {
        padding: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .countNum {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .titleNum {
                font-size: 14px;
                color: #999b9d;
            }

            .num {
                font-size: 30px;
            }
        }

        .line {
            width: 1px;
            height: 70px;
            background-color: #e7e4e4;
        }
    }

    .btn {
        width: 100%;
        display: flex;
        justify-content: center;

        button {
            width: 240px;
            height: 45px;
        }
    }
}

.el-main {
    /* --el-main-padding: 20px; */
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    box-sizing: border-box;
    padding: var(--el-main-padding);
}</style>