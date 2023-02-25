<template>
    <div class="box">
        <div class="top">
            <h3>创建考试</h3>
        </div>
        <el-form :model="form" ref="form"  label-width="80px" :inline="false" size="normal">
            <div class="contet">
                <div class="contentone">
                    <h2>1</h2><span>基本信息</span>
                </div>
                <div class="from">
                    <el-form label-width="100px" :model="formLabelAlign" style="max-width: 460px">
                        <el-form-item label="考试名称">
                            <el-input v-model="formLabelAlign.name" />
                        </el-form-item>
                        <el-form-item label="考试说明">
                            <el-input v-model="formLabelAlign.region" type="textarea" />
                        </el-form-item>
                    </el-form>
                </div>
                <div class="contentone">
                    <h2>2</h2><span>内容设置</span>
                </div>
                <div class="from">
                    <el-form label-width="100px" :model="formLabelAlign">
                        <el-form-item label="考试内容">
                            <div class="frombox" style=" width: 1025px;">
                                <div class="title">
                                    <h4>试题列表</h4>
                                    <div class="right">
                                        <span>总分:0</span>
                                        <span>已添加0题</span>
                                        <el-button>清空</el-button>
                                    </div>
                                </div>
                                <div class="froncontent">
                                    <el-button>添加题目</el-button>
                                    <el-button>批量导入</el-button>
                                    <el-button>从题库中导入</el-button>
                                    <el-button>选择已有试卷</el-button>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="试题存入题库">
                            <el-select v-model="value" class="m-2" placeholder="请选择题库" size="default">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-button style=" margin-left: 15px">+创建试题库</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="contentone">
                    <h2>3</h2><span>考试设置</span>
                </div>
                <div class="examset">
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="通过分数：">
                            <el-input v-model.number="form.name" style="width: 79px;" />
                        </el-form-item>
                        <el-form-item label="考试时长">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="不限制时长" />
                                <el-radio label="限制时长" />
                            </el-radio-group>
                            <el-input v-model.number="form.name" style="width: 79px;" />分钟
                        </el-form-item>
                        <el-form-item label="开放时间">
                            <el-date-picker v-model="value2" type="datetimerange" :shortcuts="shortcuts"
                                range-separator="To" start-placeholder="Start date" end-placeholder="End date"
                                style="width:520px;" />
                            <span style="color: #c3c3c3;">不填表示永久</span>
                        </el-form-item>
                        <el-form-item label="答案解析：">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="交卷后显示" />
                                <el-radio label="不允许查看" />
                                <el-radio label="仅可查看对错" />
                                <el-radio label="仅查看错题" />
                                <el-radio label="考试结束后查看" />
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="防作弊">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="试题顺序打乱" name="type" />
                                <el-checkbox label="选项数据打乱(单选题，多选题，判断题)" name="type" />
                            </el-checkbox-group>
                        </el-form-item>

                    </el-form>
                </div>
                <div class="contentone">
                    <h2>4</h2><span>教师范围</span>
                </div>
                <div class="showTeacher">
                    <span>可见老师:</span>
                    <el-button type="defalu" size="default" @click="">+选择</el-button>

                </div>
                <div class="contentone">
                    <h2>5</h2><span>考试学生</span>
                </div>
                <div class="showTeacher">
                    <span>考生范围：</span>
                    <el-button type="defalu" size="default" @click="">+选择</el-button>

                </div>
                <div class="contentone">
                    <h2>6</h2><span>协同设置</span>
                </div>
                <div class="showTeacher">
                    <span>阅卷老师:</span>
                    <el-button type="defalu" size="default" @click="">+选择</el-button>

                </div>
            </div>
            <el-form-item style="margin-top: 50px; margin-left: 120px;">
                <el-button type="primary" @click="onSubmit">发布</el-button>
                <el-button  size="default" @click="">保存不发布</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})
const value = ref('')

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
const value2 = ref('')

const shortcuts = [
    {
        text: 'Last week',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: 'Last month',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: 'Last 3 months',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]
const form = reactive({
    name: 60,
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const onSubmit = () => {
    console.log('submit!')
}
</script>

<style lang="less" scoped>
.box {
    padding: 10px;

    .top {
        h3 {
            font-weight: normal;
        }
    }

    .contet {
        .contentone {
            display: flex;
            width: 100%;
            height: 50px;
            background-color: #f9faff;
            // padding: 5px 10px;
            margin-top: 10px;

            h2 {
                font-weight: normal;
                font-size: 35px;
                color: #c7e5ff;
                align-items: center;
                padding-left: 10px;
            }

            span {
                align-items: center;
                line-height: 50px;
                padding-left: 10px;
            }
        }

        .from {

            margin-top: 10px;
            margin-left: 120px;

            .frombox {
                display: flex;

                flex-direction: column;
                border: 1px solid #eee;

                .title {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    font-size: 15px;
                    border-bottom: 1px solid #eee;

                    h4 {
                        font-size: 16px;
                    }

                    .right {
                        span {
                            color: #90909e;
                            margin: 0 35px;
                        }
                    }
                }

                .froncontent {
                    padding: 10px;
                }
            }
        }

        .examset {

            margin-top: 10px;
            margin-left: 120px;

            .el-input {
                margin-left: 15px;
            }
        }

        /deep/ .el-form-item__content {
            display: inline;
        }

        .showTeacher {
            margin-top: 10px;
            margin-left: 120px;
            
            span {
                font-size: 13px;
                // color: #90909e;
                margin-right: 15px;
            }
        }
    }

}</style>