<template>
    <div>
        <el-drawer v-model="props.table" title="的试卷" direction="rtl" size="50%">
            <div class="top">
                <p>得分：9 </p>
                <p>总分：70</p>
                <p>通过分数：60</p>
                <p>考试用时：</p>
                <p>交卷时间</p>
            </div>
            <div class="questionBox">
                <div class="li">
                    <div class="questionstype">
                        <div class="type">
                            <div class="num">1</div>
                            <div class="typetitle">多选题</div>
                        </div>
                        <span class="score">分值：2</span>
                        <div class="getscore">
                            得分：9
                        </div>
                    </div>
                    <div class="tiile">
                        qwq
                    </div>
                    <div class="optionlist">
                        <div class="optionli">
                            <div class="left">
                                <div class="rond">A</div>
                                <span>11111</span>
                            </div>
                            <div class="right">
                                回答正确
                            </div>
                        </div>
                        <div class="optionli correct">
                            <div class="left">
                                <div class="rond">A</div>
                                <span>11111</span>
                            </div>
                            <div class="right">
                                回答正确
                            </div>
                        </div>
                        <div class="optionli error">
                            <div class="left">
                                <div class="rond">A</div>
                                <span>11111</span>
                            </div>
                            <div class="right">
                                回答错误
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-drawer>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'
const props = defineProps(['table'])
const gridData = [
    {
        date: '2016-05-02',
        name: 'Peter Parker',
        address: 'Queens, New York City',
    },
    {
        date: '2016-05-04',
        name: 'Peter Parker',
        address: 'Queens, New York City',
    },
    {
        date: '2016-05-01',
        name: 'Peter Parker',
        address: 'Queens, New York City',
    },
    {
        date: '2016-05-03',
        name: 'Peter Parker',
        address: 'Queens, New York City',
    },
]

</script>

<style scoped lang="less">
.top {
    display: flex;

    p {
        margin: 10px;
    }
}

.questionBox {

    .li {
        border-top: 1px solid #ececec;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        width: 98%;
        padding-bottom: 20px;
        border-bottom: 1px #f0f0f0 solid;
        padding-top: 15px;

        .questionstype {
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

                .typetitle {
                    flex: 1;
                    height: 100%;
                    background-color: #f1f5fb;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #3377f9;
                }
            }

            .score {
                font-size: 12px;
                color: #aca4ab;
                margin: 0 10px
            }

            .getscore {

                height: 16px;
                font-size: 12px;
                border: #ee0000 solid 1px;
                border-radius: 3px;
                color: #e00;
                padding: 0 5px;

            }
        }

        .tiile {
            margin: 20px 0;
        }

        .optionlist {
            .optionli {
                height: 35px;
                width: 100%;
                padding: 0 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 3px;
                margin-bottom: 10px;

                .left {
                    display: flex;

                    .rond {
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
                }

                .right {
                    font-size: 12px;

                }
            }

            .correct {
                background-color: #f0faf6;
                border: 1px solid #f0faf6;

                .right {
                    font-size: 12px;
                    color: #4cc0a4;
                    display: block;
                }
            }

            .error {
                background-color: #fcf3f3;
                border: 1px solid #0089ff;

                .right {
                    font-size: 12px;
                    color: #e25e61;
                    display: block;
                }
            }
        }
    }
}
</style>