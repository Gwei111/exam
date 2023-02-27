<template>
  <div>
    <span class="chuangsub">添加试卷</span>
    <div class="HeadOne">
      <span class="One">1</span>&emsp;
      <span>基本信息</span>
    </div>
    <div class="inp">
      <span>考试名称：</span>
      <div class="inp_inp">
        <el-input v-model="numberValidateForm.title" />
      </div>
    </div>
    <div class="HeadOne1">
      <span class="One1">2</span>&emsp;
      <span>内容设置</span>
    </div>
    <div class="cen">

      <div class="dada">
        <span id="neirong">内容时间：</span>
        <div class="munse"
             v-if="data.RadioArr.length>0">
          <span style="margin-left:15px">单选题{{data.RadioArr.length}}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event,'单选题')"
                      v-model="data.RadioVal"
                      style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>
        <!-- 多选题 -->
        <div class="munse2"
             v-if="data.multipleArr.length>0">
          <span style="margin-left:15px">多选题{{data.multipleArr.length}}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event,'多选题')"
                      v-model="data.multipleVal"
                      style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>
        <!-- 判断题 -->
        <div class="munse3"
             v-if="data.judgeArr.length>0">
          <span style="margin-left:15px">判断题{{data.judgeArr.length}}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event,'判断题')"
                      v-model="data.judgeVal"
                      style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>
        <!-- 填空题 -->
        <div class="munse4"
             v-if="data.gapFillingArr.length>0">
          <span style="margin-left:15px">填空题{{data.gapFillingArr.length}}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event,'填空题')"
                      v-model="data.gapFillingVal"
                      style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>
        <!-- 问答题 -->
        <div class="munse5"
             v-if="data.questionsArr.length>0">
          <span style="margin-left:15px">问答题{{data.questionsArr.length}}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event,'问答题')"
                      v-model="data.questionsVal"
                      style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>

      </div>
      <div class="cen_cen">
        <div class="tabse">
          <!-- 问答题 -->
          <div class="tabse_top">
            <span><b>试题列表</b></span>
            <div class="cro">
              总分:{{grossScore}}&emsp;&emsp;
              已添加{{questions.length}}题&emsp;&emsp;
              <el-button @click="questions=[]">清空
              </el-button>
            </div>
          </div>
          <div class="tabse_tom">
            <div style="margin-top:20px"
                 v-for="(item,index) in questions"
                 :key="index">
              <span>{{index+1}} {{item.type}}</span>
              <span>分值：
                <el-input v-model="item.scores"
                          style="width:50px; height:30px" />
              </span>
              <div style="margin-left:20px;font-size:14px"
                   v-html="item.title"></div>
              <div v-for="(items,index) in item.answers"
                   :key="index">
                <div id="tom"
                     style="margin-left:20px; margin-top:10px"
                     :class="item.answer.includes(items.answerno) ? 'yuanF' : ''">
                  &nbsp;<div class="yuan"></div>
                  &emsp;<span id="ei">{{items.answerno}}：{{items.content}}</span>
                </div>
              </div>
              <div class="bg1"
                   v-if="item.type=='填空題' || item.type=='判断题'">
                <span>正确答案&emsp;&emsp;{{item.answer}}</span>
              </div>
            </div>
          </div>
          <div class="btns"
               style="padding:10px">
            <el-button>添加题目</el-button>
            <el-button @click="Updatadialog=true">批量导入</el-button>
            <el-button @click="impA"> 从题库中导出</el-button>
            <el-dialog v-model="dialogVisible"
                       title="题库列表"
                       width="80%">
              <impData v-model="dialogVisible"></impData>
            </el-dialog>
          </div>
        </div>
        <!-- 文件上传，模块 -->
        <UploadFiles v-if="Updatadialog"
                     v-model="Updatadialog"
                     :UrL="url"
                     @updataFile="updataFile"></UploadFiles>
      </div>
    </div>
    <div class="tom">
      <div class="tom_tom">
        <span>试题存入题库：</span>
        <el-select v-model="numberValidateForm.databaseid"
                   class="m-2"
                   placeholder="请选择题库">
          <el-option v-for="item in options"
                     :key="item.title"
                     :label="item.label"
                     :value="item.title" />
        </el-select>&emsp;
        <el-button @click="dialogVisible2 = true">+创建试题库</el-button>
        <!-- 创建试题库模块 -->
        <el-dialog v-model="dialogVisible2"
                   title="题库添加"
                   width="50%"
                   :before-close="handleClose">
          <CreaTi></CreaTi>
        </el-dialog>
      </div>
    </div>
    <div class="HeadOne2">
      <span class="One2">4</span>&emsp;
      <span>教室范围</span>
    </div>
    <div class="xuan">
      <span>可见老师：</span>
      <el-button @click="xuan"> +选择 </el-button>
      <div class="qqqq"><span>{{numberValidateForm.limits.length}}</span></div>
      <el-dialog v-model="dialogVisible1"
                 v-if="dialogVisible1"
                 :title="可见老师"
                 width="50%"
                 :before-close="handleClose">
        <Forth v-model="dialogVisible1"
               @sub="sub"
               @limitss="limitss"
               @valuesss='valuessss'></Forth>
      </el-dialog>
    </div>
    <div class="di">
      <el-button type="primary"
                 @click="Submit">提交</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive, watchEffect, onMounted, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import impData from "../../components/Test/impData.vue";
import Forth from "../../components/Test/Forth.vue";
import UploadFiles from "../../components/uploadFiles.vue";
import CreaTi from "../../components/CreaTi.vue";
import { AddSub, SubUa, QueList, databasequestion } from "../../api/Test/Test";
const Updatadialog = ref(false);
// 总分
const input = ref("");
const grossScore = ref("");
const router = useRouter();
const route = useRoute();
const value = ref("");
const numberValidateForm = reactive({
  id: 0,
  title: "",
  singles: null,
  multiples: null,
  judges: null,
  blanks: null,
  qas: null,
  scores: "",
  admin: "",
  isshow: 1,
  limits: [],
  databaseid: null,
  questions: [],
  teacherDialog: "",
});

const data: any = reactive({
  multipleArr: [],
  RadioArr: [],
  questionsArr: [],
  judgeArr: [],
  gapFillingArr: [],
  multipleVal: "", //多选值
  RadioVal: "", //单选值
  judgeVal: "", //判断值
  gapFillingVal: "", //填空值
  questionsVal: "", //问答值
  markteachers: "", //可见老师
});
const { questions } = toRefs(numberValidateForm);
//穿梭框获取到的值
const valuessss = (val: any) => {
  numberValidateForm.limits = val;
};
// 修改数据回显
const huixian = async (id: any) => {
  let res = await SubUa({ id: route.query.id });
  // console.log(res,"修改成功");
  if (res.errCode === 10000) {
    numberValidateForm.id = res.data.id;
    numberValidateForm.title = res.data.title;
    numberValidateForm.questions = res.data.questions;
    numberValidateForm.databaseid = res.data.databaseid;
    numberValidateForm.limits = res.data.limits;
    data.multipleArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "多选题");
    data.judgeArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "判断题");
    data.gapFillingArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "填空题");
    data.RadioArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "单选题");
    data.questionsArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "问答题");
      console.log(data.multipleArr,"123");
      
  }
};

// 页面加载前回显数据
onMounted(() => {
  huixian();
});
const id = route.query.id;
console.log(id);
const Submit = async (id: any) => {
  if (id) {
    console.log(id, "tryuioj");
    let res = await AddSub(numberValidateForm);
    if (res.errCode === 10000) {
      ElMessage({
        message: "成功",
        type: "success",
      });
      router.push("/subjects");
    }
  } else {
    let res = await AddSub(numberValidateForm);
    if (res.errCode === 10000) {
      ElMessage({
        message: "成功",
        type: "success",
      });
      router.push("/subjects");
    }
  }
};

const limitss = (e: any) => {
  console.log(e, "dfghj");
  console.log(numberValidateForm.limits);
};
// 总分
const sum = () => {
  let num = 0;
  questions.value.map((item: any) => {
    num = Number(item.scores) + num;
    // console.log(num);
  });
  grossScore.value = num;
  numberValidateForm.scores = num;
  //   console.log(num);
};
watchEffect(() => {
  if (questions.value) {
    // console.log(questions.value);
    sum();
  }
});
sum();

// input事件
const ipt = (e: any, type: string) => {
  //  console.log(item,123233333333);
  // console.log(e, 1231231231);
  console.log(item.scores);

  if (type == "多选题") {
    questions.value.map((item: any) => {
      if (item.type == "多选题") {
        item.scores = e;
      }
    });
  } else if (type == "单选题") {
    questions.value.map((item: any) => {
      if (item.type == "单选题") {
        item.scores = e;
      }
    });
  } else if (type == "填空题") {
    questions.value.map((item: any) => {
      if (item.type == "填空题") {
        item.scores = e;
      }
    });
  } else if (type == "判断题") {
    questions.value.map((item: any) => {
      if (item.type == "判断题") {
        item.scores = e;
      }
    });
  } else {
    questions.value.map((item: any) => {
      if (item.type == "问答题") {
        item.scores = e;
      }
    });
  }
};

// 存入试题库
const options = reactive([]);
const GetQueList = async () => {
  let res = await QueList();
  console.log(res);
  if (res.errCode === 10000) {
    options.push(...res.data.list);
  }
};
GetQueList();
const dialogVisible2 = ref(false);
// 从题库中导出
const dialogVisible = ref(false);
const impA = () => {
  dialogVisible.value = true;
};
// 选择
const dialogVisible1 = ref(false);
const xuan = () => {
  dialogVisible1.value = true;
};
// 子传父
const sub = (e: any) => {
  dialogVisible1.value = false;
};

// 文件上传

const url = ref("http://estate.eshareedu.cn/exam/api/test/upload");
const updataFile = async (e: any) => {
  // 把文件里的所有数据赋值给questions.value
  questions.value = e;
  const res: any = await databasequestion({
    databaseid: route.query.id,
    list: e,
  });
  console.log(res, "wenjianshangchuan");

  if (res.errCode === 10000) {
    data.multipleArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "多选题");
    data.judgeArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "判断题");
    data.gapFillingArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "填空题");
    data.RadioArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "单选题");
    data.questionsArr = questions.value
      .map((item: any) => item)
      .filter((items: any) => items.type == "问答题");
  }
  console.log(res);
};
</script>

<style scoped>
@import url("../../assets/css/Test/Add.css");
</style>