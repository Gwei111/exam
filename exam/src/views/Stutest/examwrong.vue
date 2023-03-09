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
                <div class="title">{{ item.title }}</div>
                <!-- 问答题 -->
                <div v-if="item.type == '问答题'">
                    <el-input type="textarea" rows="4" placeholder="请输入回答" />
                </div>

                <div class="answerBox" v-for="items, indexs in item.answers">
                    <div class="optionBox" v-if="item.type == '单选题' || item.type == '多选题'">

                        <div
                            :class="item.studentscores && item.answer.includes(items.answerno) ? 'coorect' : (item.studentanswer.includes(items.answerno) ? 'wrong' : 'optionLi')">
                            <div class="left">
                                <div :class="item.type == '单选题' ? 'opt' : 'opt check'">{{ arr[indexs] }}</div>
                                <span style="font-size: 13px;">{{ items.content }}</span>

                            </div>
                            <div class="right">
                                <span style="font-size: 13px; color:#4cc0a4"
                                    v-if="item.studentscores && item.answer.includes(items.answerno)">回答正确</span>
                                <span style="font-size: 13px; color: #e25e61;"
                                    v-if="item.studentscores == 0 && item.studentanswer.includes(items.answerno)">回答错误</span>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="answer">
                        <span>正确答案</span>
                        <div class="an"><span style="color:#fff">{{ item.answer }}</span></div>
                </div>
                <!-- 判断 -->
                <div class="answerBox">
                    <div class="optionBox" v-if="item.type == '判断题'">
                        <div class="optionLi" :class="
                            item.studentanswer === '正确' ? 'optionLi wrong' : 'optionLi'
                        ">
                            <div class="left">
                                <div class="opt">
                                    {{ item.studentanswer === '正确' ? '√' : '' }}

                                </div>
                                <span style="font-size: 13px;">正确</span>
                            </div>
                        </div>
                        <div :class="
                            item.studentanswer === '错误' ? 'optionLi wrong' : 'optionLi'
                        ">
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


            <div class="answerSheet">
                <div class="sheet">答题卡</div>
                <div class="isqwd">
                    <div class="qwdbox"></div>
                    <span>正确</span>
                    <div class="qwdboxwrong"></div>
                    <span>错误</span>
                </div>
                <div class="answerBox">
                    <div :class="itenum.studentanswer === itenum.answer ? 'titlebox' : 'wrong titlebox'"
                        v-for="itenum, iteInd in examInfo.questions" @click="location(iteInd)">{{ iteInd
                            + 1 }}</div>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { useRoute } from "vue-router";
import { testResult } from '../../api/test'
let Route = useRoute()
// console.log(Route.query);

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
})
const { examInfo, arr, answered } = toRefs(data)

const gettestResult = async () => {
    let res: any = await testResult({ testid: Route.query.id })
    console.log(res);
    if (res.errCode == 10000) {
        examInfo.value = res.data
    }

}
gettestResult()
// 锚点定位
const location = (index: number) => {
    // console.log(index);
    let itemTop: any = document.getElementById('id' + index)
    window.scrollTo({ top: itemTop.offsetTop, behavior: 'smooth' })
}
</script>

<style  lang="less" scoped>
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

            .answer {
                height: 30px;
                display: flex;
                align-items: center;
                padding: 0 10px;
                background-color: #f7fbff;

                span {
                    font-size: 15px;
                    color: #90adca;
                }

                div {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #4cc0a4;
                    font-size: 13px;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 10px;
                }
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
                        // background-color: #0089ff;

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

                        .right {
                            color: #e25e61;
                            display: block;

                        }
                    }
                    .coorect{
                        height: 35px;
                        width: 1000px;
                        padding: 0 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-radius: 3px;
                        margin-bottom: 10px;
                        border: 1px solid #fafbfd;
                        background-color: #f0faf6;
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
                        background-color: #fcf3f3;
                        border: 1px solid #0089ff;
                        // background-color: red;
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

                    // background-color: #f0faf6;
                    .left {
                        display: flex;
                        align-items: center;

                        .opt {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            font-size: 12px;
                            border: #d3d4d8 1px solid;
                            color: #e9747f;
                            background-color: #e9747f;
                            margin-right: 5px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .check {
                            border-radius: 5px;
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
                                background-color: #e9747f;
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
                background-color: #eefaf5;

            }

            .qwdboxwrong {
                width: 15px;
                height: 15px;
                background-color: #fcf2f0;
                border: 1px solid #fcf2f0;
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
                background-color: #eefaf5;
                border: 1px solid #e3e3e3;
                color: #97d3af;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 6px;
                margin-bottom: 6px;
                font-size: 14px;
            }

            .wrong {
                width: 35px;
                height: 35px;
                border-radius: 3px;
                border: 1px solid #e3e3e3;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 6px;
                margin-bottom: 6px;
                font-size: 14px;
                background-color: #fcf2f0;
                color: #e9747f;
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
}
</style>s