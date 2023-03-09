<template>
    <div class="box">
        <div class="top">
            {{ examInfo.title }}
        </div>
        <div class="list">
            <div class="li" :id="'id' + index" v-for="item, index in examInfo.questions">
                <div class="questionType">
                    <div class="type">
                        <div class="num">{{ index + 1 }}</div>
                        <div class="typeTitle">{{ item.type }}</div>
                    </div>
                    <div class="scores">
                        分值：{{ item.scores }}
                    </div>
                </div>
                <div class="title" v-html="item.type == '填空题' ? rep(item.title,index):item.title"></div>
                <!-- 问答题 -->
                <div v-if="item.type == '问答题'">
                    <el-input type="textarea" rows="4" placeholder="请输入回答" v-model="item.studentanswer" />
                </div>
                <!-- 选择 -->
                <div class="answerBox" v-for="items, indexs in item.answers">

                    <div class="optionBox" v-if="item.type == '单选题' || item.type == '多选题'">
                        <!-- 单选题 -->
                        <div v-show="item.type == '单选题'"
                            :class="item.studentanswer === items.answerno ? 'optionLi wrong' : 'optionLi'"
                            @click="getselect(items.answerno, index, item.type)">
                            <div class="left">
                                <div class="opt">{{ arr[indexs] }}</div>
                                <span style="font-size: 13px;">{{ items.content }}</span>
                            </div>
                        </div>
                        <!-- 多选题 -->
                        <div v-show="item.type == '多选题'" :class="item.studentanswer == null ? 'optionLi' : item.studentanswer.indexOf(items.answerno) > -1
                            ? 'optionsli wrong' : 'optionLi'" @click="getselect(items.answerno, index, item.type)">
                            <div class="left">
                                <div class="opt check">{{ arr[indexs] }}</div>
                                <span style="font-size: 13px;">{{ items.content }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 判断 -->
                <div class="answerBox">
                    <div class="optionBox" v-if="item.type == '判断题'">
                        <div class="optionLi" :class="
                            item.studentanswer === '正确' ? 'optionLi wrong' : 'optionLi'
                        " @click="judge('正确', index)">
                            <div class="left">
                                <div class="opt">
                                    {{ item.studentanswer === '正确' ? '√' : '' }}

                                </div>
                                <span style="font-size: 13px;">正确</span>
                            </div>
                        </div>
                        <div :class="
                            item.studentanswer === '错误' ? 'optionli wrong' : 'optionli'
                        " @click="judge('错误', index)">
                            <div class="left">
                                <div class="opt">
                                    {{ item.studentanswer === '错误' ? '√' : '' }}
                                </div>
                                <span style="font-size: 13px;">错误</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="answerSheet">
            <div class="sheet">答题卡</div>
            <div class="isqwd">
                <div class="qwdbox"></div>
                <span>已答</span>
                <div class="qwdboxwrong"></div>
                <span>未答</span>
            </div>
            <div class="answerBox">
                <div :class="itenum.studentanswer ? 'wrong titlebox' : ' titlebox'"
                    v-for="itenum, iteInd in examInfo.questions" @click="location(iteInd)">{{ iteInd
                        + 1 }}</div>
            </div>
            <div class="btnbox">
                <p>共{{ examInfo.questions ? examInfo.questions.length : 0 }}题，剩余{{ examInfo.questions ? data.answered : 0
                }}题未完成
                </p>
                <el-popconfirm :title="'你还有' + (examInfo.questions ? data.answered : 0) + '题未答，确定要提交吗?'" width="200px"
                    @confirm="submit">
                    <template #reference>
                        <el-button type="primary" class="but">交卷</el-button>
                    </template>
                </el-popconfirm>


            </div>
        </div>
        <div class="timeBox" v-if="examInfo.limittime > 0">
            <el-icon>
                <AlarmClock />
            </el-icon>
            <div class="title">倒计时</div>
            <div class="time">{{ data.endTime }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watchEffect } from "vue";
import { RouterLink } from "vue-router";
import { testStart, stuAdd } from '../../api/test'
import { useRoute } from "vue-router";
import router from "../../router";
import { ElMessage } from "element-plus";
import { AlarmClock } from "@element-plus/icons-vue";
let Route = useRoute()
const data: any = reactive({

    examInfo: { limittime: 0 },
    arr: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ],
    answered: 0,//未答题数量
    endTime: '',//倒计时
})
const { examInfo, arr, answered } = toRefs(data)
// 获取考试
const getexamInfo = async () => {
    console.log(Route.query.testid);

    let res: any = await testStart({ testid: Route.query.testid })
    // console.log(res);
    if (res.errCode == 10000) {
        data.examInfo = res.data
        // 处理考试的倒计时
        if (examInfo.value.limittime > 0) {
            var timer = setInterval(() => {//实现定时调用的函数
                //获取当前时间
                var date = new Date();
                var now = Number(date);
                //设置截止时间
                var end =
                    Number(new Date(data.examInfo.studentStartTime)) +
                    examInfo.value.limittime * 60 * 1000;
                //获取截止时间和当前时间的时间差
                var leftTime = end - now;
                //定义变量 d,h,m,s分别保存天数，小时，分钟，秒
                var d: any, h, m, s;
                //判断剩余天数，时，分，秒
                if (leftTime > 0) {
                    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
                    m = Math.floor((leftTime / 1000 / 60) % 60);
                    s = Math.floor((leftTime / 1000) % 60);
                    if (String(h).length === 1) {
                        h = "0" + h;
                    }
                    if (String(m).length === 1) {
                        m = "0" + m;
                    }
                    if (String(s).length === 1) {
                        s = "0" + s;
                    }
                    data.endTime = h + ":" + m + ":" + s;
                } else {
                    data.endTime = "00:00:00";
                    clearInterval(timer);//解除计时器的函数
                    submit();// 到考试时间的时候自动交卷
                }
            }, 1000);
        }
    }
}
getexamInfo()
// 锚点定位
const location = (index: number) => {
    // console.log(index);
    let itemTop: any = document.getElementById('id' + index)
    window.scrollTo({ top: itemTop.offsetTop, behavior: 'smooth' })
}
// 单选多选
const getselect = (val: any, index: number, type: string) => {
    // console.log(val);
    if (type == '单选题') {
        data.examInfo.questions[index].studentanswer = val
    } else if (type == '多选题') {
        if (data.examInfo.questions[index].studentanswer == null) {
            data.examInfo.questions[index].studentanswer = "|" + val
        } else {
            let arrIndex = data.examInfo.questions[index].studentanswer.indexOf(val)
            if (arrIndex > -1) {
                data.examInfo.questions[index].studentanswer = data.examInfo.questions[index].studentanswer.replace('|' + val, '')
            } else {
                data.examInfo.questions[index].studentanswer = data.examInfo.questions[index].studentanswer + '|' + val
            }
        }
    }
}

// 判断题
const judge = (e: string, index: number) => {
    // console.log(e);
    data.examInfo.questions[index].studentanswer = e

}
// 填空题替换方法
const rep = (str: string, index: number) => {
    return str.replace(
        /\[\]/g,
        `<input data-index="${index}" onpaste="return false;" style="margin:0 2px" class="input input${index}" type="text" />`
    );
};
// 提交试卷
const submit = async () => {
    const params = data.examInfo.questions.map((item: any) => {
        // console.log(item);
        let correctNum = 0
        if (item.studentanswer && item.type === '多选题') {
            // 正确答案zhuan数组
            const answerArr = item.answer.split('|')
            // 学生答案
            const studentanswerArr = item.studentanswer.split('|').filter((ite: any) => ite != '')
            // console.log(answerArr,studentanswerArr);
            answerArr.forEach((item: any, index: number) => {
                studentanswerArr.forEach((item2: any, index2: number) => {
                    if (item === item2 && answerArr.length === studentanswerArr.length) {
                        correctNum += 1
                    }
                })
            })

        }
        const studentid = sessionStorage.getItem("studentid")
        return {
            testid: data.examInfo.id,
            studentid: studentid,
            questionid: item.id,
            answer: item.studentanswer == null ? '' : item.studentanswer,
            scores: item.type === '问答题' || item.type == '填空题' ? null : item.type === '单选题' || item.type === '判断题' ? item.studentanswer === item.answer ? item.scores : 0 : !item.studentanswer ? 0 : correctNum === item.answer.split('|').length ? item.scores : 0

        }

    })
    const res: any = await stuAdd(params)
    // console.log(res);
    if (res.errCode === 10000) {
        router.push({ path: '/examresults', query: { id: data.examInfo.id } })
    }

}
watchEffect(() => {
    // 处理未答题数量
    var num: number = 0
    if (data.examInfo.id) {
        data.examInfo.questions.map((item: any) => {
            if (!item.studentanswer) {
                num += 1
            }
        })
    }
    data.answered = num
})
</script>

<style lang="less" scoped>
.optionBox {
    .optionli {
        height: 35px;
        width: 1000px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 3px;
        margin-bottom: 10px;
        border: 1px solid #fafbfd;

        .left {
            display: flex;
            align-items: center;

            .opt {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                font-size: 12px;
                border: #d3d4d8 1px solid;
                color: #777f86;
                background-color: #fff;
                margin-right: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .check {
                border-radius: 5px;
            }
        }

    }

    .wrong {
        height: 35px;
        width: 1000px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 3px;
        margin-bottom: 10px;
        // border: 1px solid #fafbfd;
        background-color: #f1f5fb;
        border: 1px solid #0089ff;

        .left {

            display: flex;
            align-items: center;

            .opt {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                font-size: 12px;
                border: #d3d4d8 1px solid;
                color: #777f86;
                background-color: #fff;
                margin-right: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            // .check {
            //     border-radius: 5px;
            // }

        }
    }
}

.box {
    padding: 0 50px;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background-color: #fafbfd;

    .top {
        font-size: 20px;
        margin-top: 20px;
    }

    .list {
        margin-top: 10px;

        .li {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            width: 1020px;
            padding-bottom: 20px;
            border-top: 1px #f0f0f0 solid;
            padding-top: 20px;

            .questionType {
                display: flex;
                align-items: center;

                .type {
                    height: 20px;
                    width: 80px;
                    border: 1px #3377f9 solid;
                    display: flex;
                    border-radius: 5px;
                    overflow: hidden;
                    font-size: 13px;

                    .num {
                        width: 30%;
                        height: 100%;
                        background-color: #3377f9;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .typeTitle {
                        flex: 1;
                        height: 100%;
                        background-color: #f1f5fb;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #3377f9;
                    }
                }

                .scores {
                    font-size: 12px;
                    color: #aca4ab;
                    margin: 0 10px;
                }
            }

            .title {
                font-size: 15px;
                margin: 20px 0;
            }

            .answerBox {
                .optionBox {
                    .optionLi {
                        height: 35px;
                        width: 1000px;
                        padding: 0 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-radius: 3px;
                        margin-bottom: 10px;
                        border: 1px solid #fafbfd;

                        .left {
                            display: flex;
                            align-items: center;

                            .opt {
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                font-size: 12px;
                                border: #d3d4d8 1px solid;
                                color: #777f86;
                                background-color: #fff;
                                margin-right: 5px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }

                            .check {
                                border-radius: 5px;
                            }
                        }
                    }

                    .wrong {
                        background-color: #f1f5fb;
                        border: 1px solid #0089ff;

                        .left {
                            display: flex;
                            align-items: center;

                            .opt {
                                border: #0089ff 1px solid;
                                color: #fff;
                                background-color: #0089ff;
                            }

                            .check {
                                border-radius: 5px;
                            }
                        }
                    }
                }
            }

            .optionBox {
                .optionLi {
                    height: 35px;
                    width: 1000px;
                    padding: 0 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 3px;
                    margin-bottom: 10px;
                    border: 1px solid #fafbfd;

                    .left {
                        display: flex;
                        align-items: center;

                        .opt {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            font-size: 12px;
                            border: #d3d4d8 1px solid;
                            color: #777f86;
                            background-color: #fff;
                            margin-right: 5px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .check {
                            border-radius: 5px;
                        }
                    }

                }

                .wrong {
                    height: 35px;
                    width: 1000px;
                    padding: 0 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 3px;
                    margin-bottom: 10px;
                    // border: 1px solid #fafbfd;
                    background-color: #f1f5fb;
                    border: 1px solid #0089ff;

                    .left {

                        display: flex;
                        align-items: center;

                        .opt {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            font-size: 12px;
                            border: #d3d4d8 1px solid;
                            color: #777f86;
                            background-color: #fff;
                            margin-right: 5px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        // .check {
                        //     border-radius: 5px;
                        // }

                    }
                }
            }
        }
    }

    .answerSheet {
        position: fixed;
        right: 0;
        top: 0;
        height: 100vh;
        width: 300px;
        background-color: #fff;

        .sheet {
            padding: 25px 24px;
            font-weight: 700;
            font-size: 19px;
        }

        .isqwd {
            display: flex;
            padding: 0 24px 25px;
            align-items: center;

            .qwdbox {
                width: 16px;
                height: 16px;
                background-color: #f0f8ff;

            }

            .qwdboxwrong {
                width: 15px;
                height: 15px;
                border: 1px solid #e9e9e9;
            }

            span {
                font-size: 12px;
                margin: 0 15px 0 5px;
            }
        }

        .answerBox {
            display: flex;
            flex-wrap: wrap;
            padding: 0 18px;

            .titlebox {
                width: 35px;
                height: 35px;
                border-radius: 3px;
                background-color: #fff;
                border: 1px solid #e3e3e3;
                color: #000;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 6px;
                margin-bottom: 6px;
                font-size: 14px;
            }

            .wrong {
                background-color: #f0f8ff;
                color: #aab4fd;
            }
        }

        .btnbox {
            padding: 0 20px;
            position: fixed;
            width: 260px;
            bottom: 20px;
            background-color: #fff;

            p {
                font-size: 12px;
                color: #989a99;
            }

            .but {
                width: 100%;
                font-size: 12px;
                margin-top: 10px;
            }
        }
    }

    .timeBox {
        width: 85px;
        height: 100px;
        border-radius: 5px;
        background-color: #e98478;
        position: fixed;
        top: 20px;
        right: 320px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;

        .el-icon {
            font-size: 28px !important;
            margin-top: 15px;

        }

        .title {
            font-size: 12px;
            margin-top: 5px;
        }

        .time {
            font-size: 13px;
            margin-top: 8px;
        }
    }
}
</style>