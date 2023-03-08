<template>
    <div class="box">
        <div class="content">
            <div class="top">
                <el-page-header @back="goBack">
                    <template #content>
                        <span class="text-large font-600 mr-3">{{ ForResultList.title }}</span>
                    </template>
                </el-page-header>
                <div>
                    <div :class="ForResultList.result == '已通过' ? 'stampBox' : 'stampBox nostampbox'"
                        v-show="ForResultList.result !== '待阅卷'">
                        <div :class="ForResultList.result == '已通过' ? 'stamp' : 'nostamp'">{{ ForResultList.result }}</div>
                    </div>
                </div>
                <div class="time">
                    <span>用时:{{ moment(ForResultList.stuEndTime).diff(ForResultList.studentStartTime, 'minute') }}分钟</span>
                    <div class="line"></div>
                    <span>交卷时间: {{ ForResultList.stuEndTime }}</span>
                    <div class="line"></div>
                    <span>试卷总分: {{ ForResultList.scores }}</span>
                    <div class="line"></div>
                    <span>通过分数: {{ ForResultList.pastscores }}</span>
                </div>
            </div>
            <div class="examNum">
                <span :class="ForResultList.result == '未通过' ? 'nopassNum' : 'passNum'"
                    v-show="ForResultList.result !== '待阅卷'">{{ ForResultList.studentScores
                    }}</span>
                <span class="load" v-show="ForResultList.result == '待阅卷'">待阅卷</span>
                <span class="numTitle" v-if="ForResultList.result == '未通过'">很可惜，未通过</span>
                <span class="numTitle" v-if="ForResultList.result == '已通过'">恭喜，通过考试</span>
            </div>
            <div class="taby">
                <table>
                    <tr style="background-color: rgb(251, 252, 252); height: 40px;">
                        <td></td>
                        <td>单选题({{ data.radioNum }}) </td>
                        <td>多选题({{ data.checkNum }}) </td>
                        <td>判断题{{ data.judgeNum == 0 ? '' : data.judgeNum }}</td>
                        <td>填空题 {{ data.kongNum == 0 ? '' : '(' + data.kongNum + ')' }}</td>
                        <td>问答题{{ data.qadNum == 0 ? '' : data.qadNum }}</td>
                    </tr>
                    <tr style="height: 60px;">
                        <td>正确数 </td>
                        <td>{{ data.radioNumCorrect == 0 ? '--' : data.radioNumCorrect + '题' }}</td>
                        <td>{{ data.checkNumCorrect == 0 ? '--' : data.checkNumCorrect + '题' }}</td>
                        <td>{{ data.judgeNumCorrect == 0 ? '--' : data.judgeNumCorrect + '题' }} </td>
                        <td v-show="ForResultList.result !== '待阅卷'"> {{ data.kongNumCorrect == 0 ? '--' : data.kongNumCorrect
                            + '题' }}</td>
                        <td v-show="ForResultList.result !== '待阅卷'"> {{ data.qadNumCorrect == 0 ? '--' : data.qadNumCorrect +
                            '题' }}</td>
                        <td v-show="ForResultList.result=='待阅卷'" rowspan="2" style="color: red;">等待阅卷</td>
                        <td v-show="ForResultList.result=='待阅卷'" rowspan="2" style="color: red;">等待阅卷</td>
                    </tr>
                    <tr style="height: 60px;">
                        <td>错误数 </td>
                        <td>{{ data.radioNum - data.radioNumCorrect === 0 ? '--' : data.radioNum - data.radioNumCorrect +
                            '题' }} </td>
                        <td>{{ data.checkNum - data.checkNumCorrect === 0 ? '--' : data.checkNum - data.checkNumCorrect +
                            '题' }}</td>
                        <td>{{ data.judgeNum - data.judgeNumCorrect === 0 ? '--' : data.judgeNum - data.judgeNumCorrect +
                            '题' }} </td>
                        <td v-show="ForResultList.result!=='待阅卷'">{{ data.kongNum - data.kongNumCorrect === 0 ? '--' : data.kongNum - data.kongNumCorrect + '题' }}
                        </td>
                        <td v-show="ForResultList.result!=='待阅卷'">{{ data.qadNum - data.qadNumCorrect == 0 ? '--' : data.qadNum - data.qadNumCorrect + '题' }}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="btn" v-show="ForResultList.result !== '待阅卷'">
                <el-button :type="ForResultList.result == '未通过' ? 'danger' : 'success'" class="nopassBtn">查看答卷</el-button>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import { testResult } from '../../api/test'
import router from "../../router";
let Route = useRoute()
onMounted(() => {
    // console.log(Route.query.id);
})
const data = reactive({
    radioNum: 0,//单选
    radioNumCorrect: 0,
    checkNum: 0,
    checkNumCorrect: 0,
    judgeNum: 0,//判断
    judgeNumCorrect: 0,
    kongNum: 0,
    kongNumCorrect: 0,
    qadNum: 0,
    qadNumCorrect: 0
})
let ForResultList: any = ref([])
let questionslist: any = ref([])
const getForResult = async () => {
    let res: any = await testResult({ testid: Route.query.id })
    console.log(res);
    if (res.errCode == 10000) {
        ForResultList.value = res.data
        res.data.questions.forEach((item: any, index: number) => {
            console.log(item);
            if (item.type == '单选题') {
                data.radioNum = data.radioNum + 1
                if (item.studentscores > 0) {
                    data.radioNumCorrect = data.radioNumCorrect + 1
                }
            } else if (item.type == '多选题') {
                data.checkNum += 1
                if (item.studentscores > 0) {
                    data.checkNumCorrect += 1
                }
            } else if (item.type == '判断题') {
                data.judgeNum += 1
                if (item.studentscores > 0) {
                    data.judgeNumCorrect += 1
                }
            } else if (item.type == '填空题') {
                data.kongNum += 1
                if (item.studentscores > 0) {
                    data.kongNumCorrect += 1
                }
            } else if (item.type == '问答题') {
                data.qadNum += 1
                if (item.studentscores > 0) {
                    data.qadNumCorrect += 1
                }
            }

        }
        )

    }

}
getForResult()
// 返回
const goBack = () => {
    router.push('/stutest')
}
</script>

<style lang="less" scoped>
.box {
    width: 100%;
    height: 100vh;
    background: url('http://edu.90000p.com/exam/cyx/assets/bg.bdbaa5ee.jfif') no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        width: 700px;
        background-color: #fff;
        padding: 50px 60px 30px;
        position: relative;

        .time {
            padding: 0 10px;
            border-bottom: 1px #f1f1f1 solid;
            height: 35px;
            margin-top: 10px;
            display: flex;

            span {
                font-size: 12px;
                color: #a0a5ab;
            }

            .line {
                width: 0.5px;
                height: 13px;
                background-color: #999b9d;
                margin: 2px 12px 0;
            }
        }

        .examNum {
            display: flex;
            flex-direction: column;
            align-items: center;

            .passNum {
                font-size: 70px;
                color: #14bd83;
                margin: 10px 0;
            }

            .nopassNum {
                font-size: 70px;
                color: red;
                margin: 10px 0;
            }

            .load {
                font-size: 70px;
                font-weight: 700;
                color: #f39134;
                margin-top: 20px;
                margin-bottom: 30px;
            }

            .numTitle {
                font-size: 23px;
            }
        }

        .taby {
            table {
                width: 100%;
                border-top: 1px solid #f1f1f1;
                border-left: 1px solid #f1f1f1;
                border-collapse: collapse;
                margin-top: 30px;

                td {
                    border-bottom: 1px solid #f1f1f1;
                    border-right: 1px solid #f1f1f1;
                    text-align: center;
                    font-size: 14px;
                }
            }
        }

        .btn {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 25px;

            .nopassBtn {
                width: 240px;
                height: 45px;
            }

        }

        .stampBox {
            position: absolute;
            right: 70px;
            top: 50px;
            border: 2px solid #14bd83;
            border-radius: 50%;
            width: 96px;
            height: 96px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: rotate(340deg);

            .stamp {
                width: 86px;
                height: 86px;
                border-radius: 50%;
                border: #14bd8229 solid 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 17px;
                color: #14bd83;
            }
        }

        .nostampbox {
            position: absolute;
            right: 70px;
            top: 50px;
            border: 2px solid red;
            border-radius: 50%;
            width: 96px;
            height: 96px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: rotate(340deg);

            .nostamp {
                width: 86px;
                height: 86px;
                border-radius: 50%;
                border: #bd0f0f29 solid 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 17px;
                color: red;
            }
        }
    }
}</style>