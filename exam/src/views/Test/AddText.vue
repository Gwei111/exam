<template>
  <div>
    <span class="chuangsub">创建试卷</span>
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
      <span>试卷内容：</span>
      <div class="cen_cen">
        <div class="tabse">
          <div class="tabse_top">
            <span><b>试题列表</b></span>
            <div class="cro">
              总分:{{grossScore}}&emsp;&emsp;
              已添加{{questions.length}}题&emsp;&emsp;
              <el-button>清空</el-button>
            </div>
          </div>
          <div class="tabse_tom">
            <el-button>添加题目</el-button>
            <el-button>批量导入</el-button>
            <el-button @click="impA"> 从题库中导出</el-button>
            <el-dialog v-model="dialogVisible"
                       title="题库列表"
                       width="80%">
              <impData v-model="dialogVisible"></impData>
            </el-dialog>
          </div>
        </div>
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
        <el-button>+创建试题库</el-button>
      </div>
    </div>
    <div class="HeadOne2">
      <span class="One2">4</span>&emsp;
      <span>教室范围</span>
    </div>
    <div class="xuan">
      <span>可见老师：</span>
      <el-button>+选择</el-button>
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
import { AddSub, SubUa, QueList } from "../../api/Test/Test";
// 总分
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
  limits: [{ id: 1 }, { id: 2 }],
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
// 修改数据回显
const huixian = async (id: any) => {
  let res = await SubUa({ id: route.query.id });
  // console.log(res,"修改成功");
  if (res.errCode === 10000) {
    numberValidateForm.id = res.data.id;
    numberValidateForm.title = res.data.title;
    numberValidateForm.questions = res.data.questions;
    numberValidateForm.databaseid = res.data.databaseid;
  }
};
// 页面加载前回显数据
onMounted(() => {
  huixian();

  const id = route.query.id;
});

const Submit = async (id: any) => {
  if (id === 0) {
    let res = await AddSub(numberValidateForm);
    console.log(res, "添加 ");
    if (res.errCode === 10000) {
      ElMessage({
        message: "添加成功",
        type: "success",
      });
      router.push("/subjects");
    }
  } else {
    let res = await AddSub(numberValidateForm);
    console.log(res, "修改");
    if (res.errCode === 10000) {
      ElMessage({
        message: "修改成功",
        type: "success",
      });
      router.push("/subjects");
    }
  }
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

// 从题库中导出
const dialogVisible = ref(false);
const impA = () => {
  dialogVisible.value = true;
};
</script>

<style scoped>
@import url("../../assets/css/Test/Add.css");

</style>