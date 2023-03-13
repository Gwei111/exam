<template>
  <div>
    <h3>添加试卷</h3>
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
        <span id="neirong">试卷内容：</span>
        <!-- 单选题 -->
        <div class="munse" v-if="data.RadioArr.length > 0">
          <span style="margin-left:15px">单选题{{ data.RadioArr.length }}道</span>
          <p style="margin-left:10px;padding-top:10px">每题<el-input @input="ipt($event, '单选题')" v-model="data.RadioVal"
              style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>

        <!-- 多选题 -->
        <div class="munse2" v-if="data.multipleArr.length > 0">
          <span style="margin-left:15px">多选题{{ data.multipleArr.length }}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event, '多选题')" v-model="data.multipleVal"
              style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>
        <!-- 判断题 -->
        <div class="munse3" v-if="data.judgeArr.length > 0">
          <span style="margin-left:15px">判断题{{ data.judgeArr.length }}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event, '判断题')" v-model="data.judgeVal"
              style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>
        <!-- 填空题 -->
        <div class="munse4" v-if="data.gapFillingArr.length > 0">
          <span style="margin-left:15px">填空题{{ data.gapFillingArr.length }}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event, '填空题')" v-model="data.gapFillingVal"
              style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>
        <!-- 问答题 -->
        <div class="munse5" v-if="data.questionsArr.length > 0">
          <span style="margin-left:15px">问答题{{ data.questionsArr.length }}道</span>
          <p style="margin-left:10px">每题<el-input @input="ipt($event, '问答题')" v-model="data.questionsVal"
              style="width:40px;margin:0 5px 0 5px"></el-input>分</p>
        </div>
      </div>
      <div class="cen_cen">
        <div class="tabse">
          <!-- 问答题 -->
          <div class="tabse_top">
            <span><b>试题列表</b></span>
            <div class="cro">
              总分:{{ grossScore }}&emsp;&emsp;
              已添加{{ questions.length }}题&emsp;&emsp;
              <el-button
                @click="questions = [], data.multipleArr = [], data.RadioArr = [], data.judgeArr = [], data.gapFillingArr = [], data.questionsArr = []">清空
              </el-button>
            </div>
          </div>
          <div class="tabse_tom">
            <div style="margin-top:20px" v-for="(item, index) in questions" :key="index">
              <span>{{ index + 1 }} {{ item.type }}</span>
              <span>分值：
                <el-input v-model="item.scores" style="width:50px; height:30px" />
              </span>
              <!-- 单个删除 -->
              <span style="margin-left:700px;">
                <EditPen style="width: 1em; height: 1em; margin-right: 18px; color: #299aff; font-size: 20px;"
                  @click="edit(item)" />
                <Delete style="width: 1em; height: 1em; color: #299aff; margin-right: 8px;font-size:16px"
                  @click="Del(index), data.multipleArr = [], data.RadioArr = [], data.judgeArr = [], data.gapFillingArr = [], data.questionsArr = []" />
              </span>
              <div style="margin-left:20px;font-size:14px" v-html="item.title"></div>
              <div v-for="(items, index) in item.answers" :key="index">
                <div id="tom" v-if="item.type == '多选题' || item.type == '单选题'" style="margin-left:20px;margin-top:10px"
                  :class="item.answer.includes(items.answerno) ? 'yuanF' : ''">
                  &nbsp;<div class="yuan"></div>
                  &emsp;<span id="ei">{{ items.answerno }}：{{ items.content }}</span>
                </div>
              </div>
              <div class="bg1" v-if="item.type == '填空題' || item.type == '判断题'">
                <span>正确答案&emsp;&emsp;{{ item.answer }}</span>
              </div>
            </div>
          </div>
          <div class="btns" style="padding:10px">
            <div>
              <el-button @click="addOne">添加题目</el-button>
              <el-button @click="Updatadialog = true">批量导入</el-button>
              <el-button @click="impA"> 从题库中导出</el-button>
            </div>
            <!-- 抽屉组件 -->
            <Drawers :table="table" v-if="table == true" @Drawerclose="Drawerclose" @adds="DrawerClick" :title="title"
              @DrawerCancel="DrawerCancel" :updArr='updArr'></Drawers>
            <el-dialog v-model="dialogVisible" title="题库列表" width="80%">
              <impData v-model="dialogVisible"></impData>
            </el-dialog>
          </div>
        </div>

        <!-- 文件上传，模块 -->
        <UploadFiles v-if="Updatadialog" v-model="Updatadialog" :UrL="url" @updataFile="updataFile"></UploadFiles>
      </div>
      
      
    </div>
    
    <div class="tom">
      <div class="tom_tom">
        <span>试题存入题库：</span>
        <el-select v-model="numberValidateForm.databaseid" class="m-2" placeholder="请选择题库">
          <el-option v-for="item in options" :key="item.title" :label="item.label" :value="item.title" />
        </el-select>&emsp;
        <el-button @click="dialogVisible2 = true">+创建试题库</el-button>
        <!-- 创建试题库模块 -->
        <el-dialog v-model="dialogVisible2" title="题库添加" width="50%">
          <CreaTi @isadd="isadd" @can="can"></CreaTi>
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
      <div class="qqqq"><span>{{ numberValidateForm.limits.length }}</span></div>
      <el-dialog v-model="dialogVisible1" title="可见老师" width="50%">
        <Forth v-model="dialogVisible1" @sub="sub" @limitss="limitss" @valuesss='valuessss'></Forth>
      </el-dialog>
    </div>
    <div class="di">
      <el-button type="primary" @click="Submit">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import {
  ref,
  reactive,
  watchEffect,
  defineEmits,
  onMounted,
  toRefs,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { EditPen, Delete, CircleClose } from "@element-plus/icons-vue";
import impData from "../../components/Test/impData.vue";
import Forth from "../../components/Test/Forth.vue";
import UploadFiles from "../../components/uploadFiles.vue";
import Drawers from "../../components/exam/drawer.vue";
import CreaTi from "../../components/CreaTi.vue";
import { AddSub, SubUa, QueList, databasequestion } from "../../api/Test/Test";
const Updatadialog = ref(false);
// 子传父
let title = ref("");
const emit = defineEmits(["canle"]);
// 总分
const input = ref("");
const grossScore: any = ref("");
const router = useRouter();
const route = useRoute();
const value = ref("");
const numberValidateForm: any = reactive({
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
const form: any = reactive({
  //请求添加接口添加的数据
  params: {
    id: 0, //当前考试的id
    title: "", //标题
    info: "", //说明
    admin: "ldq", //登录的用户名
    begintime: "", //开始时间
    endtime: "", //结束时间
    limittime: "", // 限制时长
    scores: 100, //总分
    state: null,
    pastscores: 60, // 通过分数
    qorder: 0, //防作弊试题打乱
    aorder: 0, //防作弊试题打乱-单选多选判断题
    answershow: 1, //交卷后的显示别: 1 ~5
    isshow: 1, //题库是否被他人使用（全部可见1，全部不可见2，部分可见3）
    databaseid: 20, //当前考试的基础id
    limits: [], // 可见老师
    markteachers: [], // 阅卷老师
    students: [], // 考生范围
    questions: [], // 试题添加数据
  },
  isChoce: false, //单选题
  ischeck: false, ////多选题
  iskong: false, //填空题
  isqust: false, //问答题
  isJudge: false, //判断题
  numChoce: 0, //单选题数量
  numCheck: 0, //多选题数量
  numKong: 0, //填空题数量
  numQuest: 0, //问答题数量
  numJudge: 0, //判断题数量
});
const { questions } = toRefs(numberValidateForm);
const { params } = toRefs(form);
//穿梭框获取到的值
const valuessss = (val: any) => {
  numberValidateForm.limits = val;
};
// 修改数据回显
const huixian = async (id: any) => {
  let res: any = await SubUa({ id: route.query.id });
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
    console.log(data.multipleArr, "123");
  }
};
// 页面加载前回显数据
onMounted(() => {
  huixian(id);
});
const id = route.query.id;
// console.log(id);
const Submit = async (id: any) => {
  if (numberValidateForm.title == "") {
    ElMessage({
      message: "请输入考试名称",
      type: "error",
    });
  } else if (id) {
    console.log(id, "tryuioj");
    let res: any = await AddSub(numberValidateForm);
    if (res.errCode === 10000) {
      ElMessage({
        message: "成功",
        type: "success",
      });
      router.push("/subjects");
    }
  } else {
    let res: any = await AddSub(numberValidateForm);
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
  // console.log(e, "dfghj");
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
  // console.log(item.scores);

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
const options: any = reactive([]);
const GetQueList = async () => {
  let res: any = await QueList({});
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

const can = (e: any) => {
  console.log(e);
  dialogVisible2.value = false;
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
};
// 抽屉
const table = ref(false);
// 点击添加单个试题
const addOne = () => {
  title.value = "添加";
  table.value = true;
};
// 点击完成
const DrawerCancel = (val: any) => {
  table.value = val;
};
const Drawerclose = (val: any) => {
  table.value = val;
};

// 点击确定
const DrawerClick = (bool: any, val: any) => {
  table.value = bool;
  numberValidateForm.questions.push(val);
  console.log(numberValidateForm.questions, 2222);
  // 左侧小框
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
};
const isadd = (val: any) => {
  dialogVisible2.value = val;
};
// 取消按钮
const cancel = () => {
  router.push("/subjects");
};
// 单挑图标删除
const Del = (index: number) => {
  numberValidateForm.questions.splice(index, 1);
};

// 单挑修改
let updArr: any = ref([]);
const edit = (val: any) => {
  title.value = "修改";
  table.value = true; //弹出框
  updArr.value = JSON.stringify(val);

};
</script>

<style scoped>
.chuangsub {

  font-size: 18px;
}

.HeadOne {
  width: 100%;
  height: 50px;
  background-color: #fafbff;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: -10px;
}

.HeadOne1 {
  width: 100%;
  height: 50px;
  background-color: #fafbff;
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-left: -10px;
}

.One {
  color: #c7e5fd;
  margin-left: 15px;
  font-size: 32px;
}

.One1 {
  color: #c7e5fd;
  margin-left: 15px;
  font-size: 32px;
}

.inp {
  width: 700px;
  height: 50px;
  display: flex;
  align-items: center;
  margin-left: 130px;

}

.inp span {
  font-size: 14px;
  color: gray;
}

.inp_inp {
  width: 400px;
}

.yuanF {
  width: 100%;
  margin-left: 5px;
  background-color: #eefaf6;
}

.cen {
  width: 80%;
  margin-top: 10px;
  display: flex;
  /* justify-content: center; */
  margin-left: 137px;
}

.cen span {
  color: gray;
  margin-left: 20px;
  font-size: 14px;
}

.cen_cen {
  width: 990px;
  border: 1px solid #dfdfdf;
  display: flex;
  overflow: hidden;
}

.cen_cen span {
  margin-top: 10px;
}

.tabse {
  width: 990px;
  color: gray;
}

.tabse_top span {
  margin-top: -5px;
  margin-left: 10px;
  color: black;
}

.tabse_top {
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #dbdce1;
}

.cro {
  margin-right: 20px;
}

.tabse_tom .el-button {
  margin-left: 10px;
}

.tabse_tom {
  width: 100%;
  overflow-y: scroll;
  max-height: 50vh;

}

.qqqq {
  position: absolute;
  left: 140px;
  top: -7px;
  width: 15px;
  height: 15px;
  background-color: #46a3ff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btns {
  width: 100%;

}

.qqqq span {
  color: white;
  font-size: 12px;
}

#tom {
  width: 100%;

  display: flex;
  align-items: center;

}

#ei {
  margin-left: -20px;
  font-size: 12px;
}

.tom_tom {
  margin-left: 96px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tom_tom span {
  color: gray;
  font-size: 14px;
}

.HeadOne2 {
  width: 100%;
  height: 50px;
  background-color: #fafbff;
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-left: -10px;

}

.bg1 {
  width: 100%;
  height: 50px;
  background-color: #eefaf6;
  margin-top: 30px;
  font-size: 18px;
  color: #98cdad;
  margin-left: 20px;
}

.bg1 span {
  margin-left: 20px;
  line-height: 50px;
}

.One2 {
  color: #c7e5fd;
  margin-left: 15px;
  font-size: 32px;
}

.xuan {
  position: relative;
  margin-left: 114px;
  margin-top: 20px;

}

.di {
  margin-top: 40px;
  margin-left: 196px;
}

#tom #ei {
  margin-top: 2px;
}

.yuan {
  width: 15px;
  height: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  margin-top: -2px;
  margin-right: 10px;
}

.Ras {
  width: 100%;
  height: 220px;
  background-color: red;
  margin-bottom: 20px;
  margin-top: -80px;
}

.dix {
  margin-top: 15px;
}

.quan {
  width: 20px;
  height: 20px;
  background-color: #f6f6f6;
  border-radius: 20px;
}

.daan {
  display: flex;
}

.daan .an {
  margin-left: 8px;
}

.daan .an1 {
  margin-left: 5px;
}

.munse {
  width: 100px;
  height: 70px;
  border: 1px solid rgb(220, 223, 230);
  font-size: 10px;
  color: #848484;
  margin-right: 10px;
  margin-top: 30px;
  margin-left: -30px;
}

.munse2 {
  width: 100px;
  height: 70px;
  border: 1px solid rgb(220, 223, 230);
  font-size: 10px;
  margin-right: 10px;
  margin-left: -30px;
  color: #848484;

}

.munse3 {
  width: 100px;
  height: 70px;
  border: 1px solid rgb(220, 223, 230);
  font-size: 10px;

  margin-left: -30px;
  color: #848484;

}

.munse4 {
  width: 100px;
  height: 70px;
  border: 1px solid rgb(220, 223, 230);
  font-size: 10px;
  margin-right: 10px;
  color: #848484;
  margin-left: -30px;

}

.munse5 {
  width: 100px;
  height: 70px;
  margin-left: -30px;
  border: 1px solid rgb(220, 223, 230);
  font-size: 10px;
  margin-right: 10px;
  color: #848484;
}

#neirong {
  width: 100px;
  margin-top: 20px;
  margin-left: -10px;
}
</style>