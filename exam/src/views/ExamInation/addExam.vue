<template>
    <div class="box">
        <div class="top">
            <h3>创建考试</h3>
        </div>
        <el-form>
            <div class="contet">
                <div class="contentone">
                    <h2>1</h2><span>基本信息</span>
                </div>
                <div class="from">
                    <el-form label-width="100px" :model="form.params" style="max-width: 460px">
                        <el-form-item label="考试名称">
                            <el-input v-model="params.title" />
                        </el-form-item>
                        <el-form-item label="考试说明">
                            <el-input v-model="params.info" type="textarea" />
                        </el-form-item>
                    </el-form>
                </div>
                <div class="contentone">
                    <h2>2</h2><span>内容设置</span>
                </div>
                <div class="from">
                    <el-form label-width="100px" :model="formLabelAlign">
                        <el-form-item label="考试内容">
                            <!-- {{ params.questions.type, 111 }} -->
                            <div class="frombox" style=" width: 1025px;">
                                <div class="title">
                                    <h4>试题列表</h4>
                                    <div class="right">
                                        <span>总分:0</span>
                                        <span>已添加0题</span>
                                        <el-button @click="clear">清空</el-button>
                                    </div>
                                </div>
                                <!-- 左边填分区域 -->
                                    <div class="testContent" v-if="params.questions.length > 0">
                                    <div class="dan" v-if="form.isChoce==true">
                                        <span style="margin-left: 10px;">单选题{{form.numChoce}}道</span>
                                        <p style="margin-left: 10px;">每题
                                            <el-input placeholder="" size="small" clearable @change=""
                                                style="width:50px;"></el-input>分
                                        </p>
                                    </div>
                                    <div class="dan" v-if="form.ischeck==true">
                                        <span style="margin-left: 10px;">多选题{{form.numCheck}}道</span>
                                        <p style="margin-left: 10px;">每题
                                            <el-input placeholder="" size="small" clearable @change=""
                                                style="width:50px;"></el-input>分
                                        </p>
                                    </div>
                                    <div class="dan" v-if="form.isJudge==true">
                                        <span style="margin-left: 10px;">判断题{{form.numJudge}}道</span>
                                        <p style="margin-left: 10px;">每题
                                            <el-input placeholder="" size="small" clearable @change=""
                                                style="width:50px;"></el-input>分
                                        </p>
                                    </div>
                                    <div class="dan" v-if="form.isqust ==true" >
                                        <span style="margin-left: 10px;">问答题{{form.numQuest}}道</span>
                                        <p style="margin-left: 10px;">每题
                                            <el-input placeholder="" size="small" clearable @change=""
                                                style="width:50px;"></el-input>分
                                        </p>
                                    </div>
                                    <div class="dan" v-if="form.iskong==true">
                                        <span style="margin-left: 10px;">填空题{{form.numKong}}道</span>
                                        <p style="margin-left: 10px;">每题
                                            <el-input placeholder="" size="small" clearable @change=""
                                                style="width:50px;"></el-input>分
                                        </p>
                                    </div>
                                </div>
                                <!-- {{ questions.value }} -->
                                <!-- 试题列表 -->
                                <div class="gotContentBox">
                                    <div class="gotContent" v-for="(item, index) in params.questions" :key="index">
                                        <div class="gottop">
                                            <div class="gotleft">
                                                <span>{{ index + 1 }}.{{ item.type }}</span>
                                                <span style="margin: 10px;">分值</span>
                                                <el-input placeholder="" size="normal" clearable @change=""
                                                    style="width: 50px;"></el-input>

                                            </div>
                                            <div class="getright">
                                                <EditPen
                                                    style="width: 1em; height: 1em; margin-right: 8px; color: #299aff; font-size: 20px;" />
                                                <el-icon
                                                    style="width: 1em; height: 1em; margin-right: 8px; color: #299aff; font-size: 20px;">
                                                    <Delete @click="del(index)"/>
                                                </el-icon>
                                            </div>
                                        </div>
                                        <div style="padding: 7px 0 ;">
                                            <span v-html="item.title"></span>
                                        </div>
                                        <!-- 正确答案 -->
                                        <!-- 填空 判断 -->
                                        <div v-if="item.type == '填空题' || item.type == '判断题'">
                                            <div class="judge">
                                                正确答案{{ item.answer }}
                                            </div>
                                            <!-- 答案解析 -->
                                            <div class="jud">
                                                答案解析：
                                            </div>
                                        </div>
                                        <!-- 单选择 -->
                                        <div v-show="item.type == '单选题'">
                                            <div class="options">
                                                <div :class="item.answer === items.answerno ? 'options optionsbox' : 'options optionerr'" v-for="(items, indexs) in item.answers"
                                                    :key="indexs" >
                                                    <div class="round"></div>
                                                    {{ items.answerno }}:{{ items.content }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 多选 -->
                                        <div v-show="item.type == '多选题'">
                                            <div class="checkbox">
                                                <div :class="item.answer.includes(items.answerno)?'checkbox checkone':'checkbox checkerr'"  v-for="(items, indexs) in item.answers" :key="indexs">
                                                    <div class="fang"></div>
                                                    {{ items.answerno }}:{{ items.content }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 简答题 -->
                                        <div v-show="item.type == '简答题'">
                                            <div class="analysis">
                                                答案解析：{{ item.explains }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="froncontent">
                                    <el-button @click="addOne">添加题目</el-button>
                                    <el-button>批量导入</el-button>
                                    <el-button>从题库中导入</el-button>
                                    <el-button>选择已有试卷</el-button>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item label="试题存入题库">
                            <el-select v-model="value" class="m-2" placeholder="请选择题库" size="default">
                                <el-option v-for="item in databaseList" :key="item.id" :label="item.title"
                                    :value="item.id" />
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
                <el-button type="primary" @click="onSubmit(form)">发布</el-button>
                <el-button size="default">保存不发布</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <!-- 抽屉组件 -->
        <Drawers :table="table" v-if="table == true" @Drawerclose="Drawerclose" @adds="DrawerClick"
            @DrawerCancel="DrawerCancel"></Drawers>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref,toRefs,watchEffect } from 'vue'
import { EditPen, Delete, CircleClose } from '@element-plus/icons-vue';
import Drawers from '../../components/exam/drawer.vue';
import { baseList } from '../../api/test';

const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})
const value = ref('')
const value2 = ref('')
const table = ref(false)
// 日期时间
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
const form: any = reactive({//请求添加接口添加的数据
    params: {
        id: 0,//当前考试的id
        title: "",//标题
        info: "",//说明
        admin: "ldq",//登录的用户名
        begintime: "",//开始时间
        endtime: "",//结束时间
        limittime: "",// 限制时长
        scores: 100,//总分
        state: null,
        pastscores: 60, // 通过分数
        qorder: 0,//防作弊试题打乱
        aorder: 0,//防作弊试题打乱-单选多选判断题
        answershow: 1,//交卷后的显示别: 1 ~5
        isshow: 1,//题库是否被他人使用（全部可见1，全部不可见2，部分可见3）
        databaseid: 20,//当前考试的基础id
        limits: [],    // 可见老师
        markteachers: [],// 阅卷老师
        students: [],// 考生范围
        questions: [],// 试题添加数据
    },
    isChoce:false,//单选题
    ischeck:false,////多选题
    iskong:false,//填空题
    isqust:false,//问答题
    isJudge:false,//判断题
    numChoce:0,//单选题数量
    numCheck:0,//多选题数量
    numKong:0,//填空题数量
    numQuest:0,//问答题数量
    numJudge:0,//判断题数量
})
const{params}=toRefs(form)
let databaseList: any = ref([])
const getBaseList = async () => {
    let basequery = {
        page: 1,
        psize: 8
    }
    let res: any = await baseList(basequery)
    // console.log(res);
    if (res.errCode == 10000) {
        databaseList.value = res.data.list
    }

}
getBaseList()
// 点击添加单个试题
const addOne = () => {
    table.value = true
    // console.log(11);

}
// 点击
const Drawerclose = (val: any) => {
    // console.log(val);
    table.value = val
}
// 点击确定
const DrawerClick = (bool: any, val: any) => {
    console.log(val);
    
    table.value = bool
    params.value.questions.push(val)
    console.log(params.value.questions, 2222);

}
// 点击完成
const DrawerCancel = (val: any) => {
    table.value = val
}
// 删除
const del=(index:any)=>{
    params.value.questions.splice(index,1)
}
// 清空
const clear=()=>{
    params.value.questions=[]
}
// 左侧填分区域
const getCount = () => {

}
const onSubmit = (val: any) => {
    // console.log(val)
}

watchEffect(()=>{
    let choce=0;//单选
    let check=0//多选
    let kong=0//
    let quest=0
    let judge=0
    params.value.questions.forEach((element:any) => {
        // console.log(element);
        if(element.type==='单选题'){
            form.isChoce=true
            choce+=1
        }else if(element.type==='多选题'){
            form.ischeck=true
            check+=1
        }else if(element.type==='填空题'){
            form.iskong=true
            kong+=1
        }else if(element.type=='问答题'){
            form.isqust=true
            quest+=1
        }else if(element.type=='判断题'){
            form.isJudge=true
            judge+=1
        }
        
    });
    form.numCheck=check
    form.numChoce=choce
    form.numKong=kong
    form.numQuest=quest
    form.numJudge=judge
})
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
                position: relative;
                flex-direction: column;
                border: 1px solid #eee;
                height: 100%;

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

                .testContent {
                    width: 120px;
                    color: #848484;
                    position: absolute;
                    left: -145px;
                    top: 50px;

                    .dan {
                        width: 100%;
                        border: 1px solid #ececec;
                        padding: 7px 0px;
                        margin: 7px 0;
                    }
                }

                .gotContentBox {
                    overflow-y: scroll;
                    max-height: 70vh;

                    .gotContent {
                        padding: 20px 15px;
                        overflow: auto;

                        .gottop {
                            display: flex;
                            color: #6a6a6a;
                            justify-content: space-between;
                        }

                        .judge {
                            background-color: #eefaf6;
                            color: #5acda6;
                            padding: 8px
                        }

                        .jud {
                            background-color: #f5faff;
                            color: #9dadbc;
                            padding: 8px;
                            margin-top: 10px;
                        }

                        .options {
                            .optionsbox {
                                display: flex;
                                height: 40px;
                                line-height: 40px;
                                background-color: #eefaf6;

                                .round {
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    border: 1px solid #ccc;
                                    background-color: #fff;
                                    margin: 10px;
                                }
                            }

                            .optionerr {
                                display: flex;
                                height: 40px;
                                line-height: 40px;

                                // background-color: #eefaf6;
                                .round {
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    border: 1px solid #ccc;
                                    background-color: #fff;
                                    margin: 10px;
                                }
                            }
                        }

                        .checkbox {
                            .checkone {
                                display: flex;
                                height: 40px;
                                line-height: 40px;
                                background-color: #eefaf6;

                                .fang {
                                    width: 15px;
                                    height: 15px;
                                    border-radius: 5px;
                                    border: 1px solid #ccc;
                                    background-color: #fff;
                                    margin: 10px;
                                }
                            }
                        }

                        .checkbox {
                            .checkerr {
                                display: flex;
                                height: 40px;
                                line-height: 40px;

                                // background-color: #eefaf6;
                                .fang {
                                    width: 15px;
                                    height: 15px;
                                    border-radius: 5px;
                                    border: 1px solid #ccc;
                                    background-color: #fff;
                                    margin: 10px;
                                }
                            }
                        }

                        .analysis {
                            background-color: #f5faff;
                            padding: 10px;
                            color: #9dadbc;
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

}
</style>