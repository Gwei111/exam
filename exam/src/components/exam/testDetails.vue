<template>
    <div>
        <el-dialog v-model="props.dialogVisible" :title="props.title" width="90%" :before-close="closedetailsList">
            <div class="top">
                <div class="title">
                    <div class="zong">
                        <span>总分</span>
                        <span>{{ arr.scores }}</span>
                    </div>
                    <div class="zong">
                        <span>通过分数</span>
                        <span>{{ arr.pastscores }}</span>
                    </div>
                    <div class="zong">
                        <span>考试时长</span>
                        <span>{{ arr.begintime == null ? '不限' : arr.begintime + '至' + arr.endtime }}</span>
                    </div>
                    <div class="zong">
                        <span>开放时间</span>
                        <span>{{ arr.begintime == null ? '不限' : arr.begintime + '至' + arr.endtime }}</span>
                    </div>
                </div>
                <div>
                    <el-button @click="execl">导出excel</el-button>
                </div>
            </div>
            <div class="content">
                <div class="titletop" v-for="(item, index) in arr.questions" :key="index">
                    <span> {{ index + 1 }}.{{ item.type }}</span><span> 分值：{{ item.scores }}</span>
                    <p v-html="item.title"></p>
                    <!-- 单选题 -->
                    <div v-if="item.type == '单选题'">
                        <div class="options" v-for="items in item.answers">
                            <div :class="item.answer === items.answerno ? 'options optionsbox' : 'options optionerr'">
                                <div class="round"></div>
                                {{ items.answerno }}:{{ items.content }}
                            </div>
                        </div>
                    </div>
                    <!-- 简答题 -->
                    <div v-if="item.type == '问答题'">
                        <div class="analysis">
                            答案解析：{{ item.explains }}
                        </div>
                    </div>
                    <!-- 判断题 -->
                    <div class="judge" v-if="item.type == '判断题' || item.type == '填空题'">
                        正确答案：{{ item.answer }}
                    </div>
                    <!-- 多选 -->
                    <div v-if="item.type == '多选题'">
                        <div class="checkbox" v-for="items in item.answers">
                            <div :class="item.answer.includes(items.answerno) ? 'checkbox checkone' : 'checkbox checkerr'">
                                <div class="fang"></div>
                                {{ items.answerno }}:{{ items.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testDetails } from '../../api/test'
import { getSubjects, execls } from "../../api/Test/Test";
import {  testExcel} from "../../api/test";
const props = defineProps(['dialogVisible', 'getid', 'title']);//父传子
console.log(props);
const emit = defineEmits(['closedetailsList'])//子传父
const closedetailsList = () => {
    emit('closedetailsList', false)
}
let arr: any = ref({})
const getList = async () => {
    let res: any = await testDetails({ id: props.getid })
    console.log(res);
    arr.value = res.data
}
getList()
// 导出
const execl = async () => {
  let res:any = await testExcel({ id: props.getid });
//   console.log(res);

  let blob = new Blob([res], { type: "application/vnd.ms-excel" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.style.display = "none";
  document.body.appendChild(a);
  a.setAttribute("download", arr.value.title);
  a.click();
  document.body.removeChild(a);
};
</script>

<style scoped lang="less">
.top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .title {
        display: flex;
        .zong {
            display: flex;
            flex-direction: column;
            margin: 0 10px;
            span {
                margin: 5px;
            }
        }
    }
}
.content {
    margin: 10px;
    .titletop {
        p {
            padding: 10px 5px;
    color: #909090;
            font-size: 15px;
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
        .analysis {
            background-color: #f5faff;
            padding: 10px;
            color: #9dadbc;
        }
        .judge {
            padding: 10px;
            color: #70d3b2;
            background-color: #eefaf6;
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
    }
}
</style>
