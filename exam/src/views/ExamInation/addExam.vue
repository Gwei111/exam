<template>
  <div class="box">
    <div class="top">
      <h3>创建考试</h3>
      <el-form>
        <div class="contet">
          <div class="contentone">
            <h2>1</h2><span>基本信息</span>
          </div>
          <div class="from">
            <el-form label-width="100px" :model="form.params" style="max-width: 460px" size="default">
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
            <el-form label-width="100px" :model="formLabelAlign" >
              <el-form-item label="考试内容">
                <!-- {{ params.questions.type, 111 }} -->
                <div class="frombox" style="width: 1025px;">
                  <div class="title">
                    <h4>试题列表</h4>
                    <div class="right">
                      <span>总分:{{ totalPoints }}</span>
                      <span>已添加: {{ params.questions.length }} 题</span>
                      <el-button @click="clear">清空</el-button>
                    </div>
                  </div>
                  <!-- 左边填分区域 -->
                  <div class="testContent" v-if="params.questions.length > 0">
                    <div class="dan" v-if="form.isChoce == true">
                      <span style="margin-left: 10px;">单选题{{ form.numChoce }}道</span>
                      <p style="margin-left: 10px;">每题
                        <el-input  size="small" clearable style="width:50px;" @input="inp($event, '单选题')"
                          v-model="radioinp"></el-input>分
                      </p>
                    </div>
                    <div class="dan" v-if="form.ischeck == true">
                      <span style="margin-left: 10px;">多选题{{ form.numCheck }}道</span>
                      <p style="margin-left: 10px;">每题
                        <el-input  size="small" clearable style="width:50px;" @input="inp($event, '多选题')"
                          v-model="checkinp"></el-input>分
                      </p>
                    </div>
                    <div class="dan" v-if="form.isJudge == true">
                      <span style="margin-left: 10px;">判断题{{ form.numJudge }}道</span>
                      <p style="margin-left: 10px;">每题
                        <el-input  size="small" clearable style="width:50px;"
                          @input="inp($event, '判断题')"></el-input>分
                      </p>
                    </div>
                    <div class="dan" v-if="form.isqust == true">
                      <span style="margin-left: 10px;">问答题{{ form.numQuest }}道</span>
                      <p style="margin-left: 10px;">每题
                        <el-input  size="small" clearable style="width:50px;" @input="inp($event, '问答题')"
                          v-model="qwdinp"></el-input>分
                      </p>
                    </div>
                    <div class="dan" v-if="form.iskong == true">
                      <span style="margin-left: 10px;">填空题{{ form.numKong }}道</span>
                      <p style="margin-left: 10px;">每题
                        <el-input  size="small" clearable style="width:50px;"
                          @input="inp($event, '填空题')"></el-input>分
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
                          <el-input  type="number" v-model="item.scores" size="normal" clearable style="width: 80px;"></el-input>

                        </div>
                        <div class="getright">
                          <EditPen style="width: 1em; height: 1em; margin-right: 8px; color: #299aff; font-size: 20px;"
                            @click="edit(item, index)" />
                          <el-icon style="width: 1em; height: 1em; margin-right: 8px; color: #299aff; font-size: 20px;">
                            <Delete @click="del(index)" />
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
                          <div :class="item.answer === items.answerno ? 'options optionsbox' : 'options optionerr'"
                            v-for="(items, indexs) in item.answers" :key="indexs">
                            <div class="round"></div>
                            {{ items.answerno }}:{{ items.content }}
                          </div>
                        </div>
                      </div>
                      <!-- 多选 -->
                      <div v-show="item.type == '多选题'">
                        <div class="checkbox">
                          <div :class="item.answer.includes(items.answerno) ? 'checkbox checkone' : 'checkbox checkerr'"
                            v-for="(items, indexs) in item.answers" :key="indexs">
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
                    <el-button @click="Updatadialog = true">批量导入</el-button>
                    <el-button @click="questdialog = true">从题库中导入</el-button>
                    <el-button @click="isshow = true">选择已有试卷</el-button>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="试题存入题库">
                <el-select v-model="value" class="m-2" placeholder="请选择题库" size="default">
                  <el-option v-for="item in databaseList" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
                <el-button style=" margin-left: 15px" @click="dialogVisible2 = true">+创建试题库</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="contentone">
            <h2>3</h2><span>考试设置</span>
          </div>
          <div class="examset">
            <el-form :model="params" label-width="120px">
              <el-form-item label="通过分数：">
                <el-input type="number" v-model="params.pastscores" style="width: 79px;" />
              </el-form-item>
              <el-form-item label="考试时长">
                <el-radio-group v-model="testTime">
                  <el-radio label="1">不限制时长</el-radio>
                  <el-radio label="2">限制时长</el-radio>
                </el-radio-group>
                <div v-show="testTime == 2">
                  <el-input v-model.number="params.limittime" style="width: 79px;" />分钟
                </div>
              </el-form-item>
              <!-- 开放时间 -->
              <el-form-item label="开放时间" style="width: 800px;">
                <el-date-picker v-model="opTime" type="datetimerange" :shortcuts="shortcuts" range-separator="至"
                  format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" start-placeholder="开始时间"
                  end-placeholder="结束时间" @change="getTime" />
                <span style="color: #c3c3c3;">不填表示永久</span>
              </el-form-item>
              <el-form-item label="答案解析：">
                <el-radio-group v-model="resolution">
                  <el-radio label="1">交卷后显示</el-radio>
                  <el-radio label="2">不允许查看</el-radio>
                  <el-radio label="3">仅可查看对错</el-radio>
                  <el-radio label="4">仅查看错题</el-radio>
                  <el-radio label="5">考试结束后查看</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="防作弊">
                <el-checkbox v-model="Disturbance" label="试题顺序打乱" name="type" @change="changeDisturbance" />
                <el-checkbox v-model="optionDisturbance" label="选项数据打乱(单选题，多选题，判断题)" name="type"
                  @change="changeoptionDisturbance" />
              </el-form-item>

            </el-form>
          </div>
          <div class="contentone">
            <h2>4</h2><span>教师范围</span>
          </div>
          <div class="showTeacher">
            <span>可见老师:</span>
            <el-button type="default" size="default" @click="dialogTeacher = true">+选择</el-button>
            <div class="leng">
              <p>{{ params.limits.length }}</p>
            </div>
          </div>
          <div class="contentone">
            <h2>5</h2><span>考试学生</span>
          </div>
          <div class="showTeacher">
            <span>考生范围：</span>
            <el-button type="default" size="default" @click="dialogStudent = true">+选择</el-button>
            <div class="leng">
              <p>{{ params.students.length }}</p>
            </div>
          </div>
          <div class="contentone">
            <h2>6</h2><span>协同设置</span>
          </div>
          <div class="showTeacher">
            <span>阅卷老师:</span>
            <el-button type="default" size="default" @click="dialogyueTeacher = true">+选择</el-button>
            <div class="leng">
              <p>{{ params.markteachers.length }}</p>
            </div>
          </div>
        </div>
        <el-form-item style="margin-top: 50px; margin-left: 120px;">
          <el-button type="primary" v-if="complie == undefined" @click="onSubmit()">发布</el-button>
          <el-button type="primary" v-if="complie !== undefined" @click="onEdit()">编辑</el-button>
          <el-button size="default" @click="save">保存不发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 抽屉组件 -->
      <Drawers :table="table" v-if="table == true" @Drawerclose="Drawerclose" @adds="DrawerClick"
        @DrawerCancel="DrawerCancel" :title="title" :updArr="updArr"></Drawers>
      <!-- 批量添加 -->
      <UploadFiles v-if="Updatadialog == true" v-model="Updatadialog" :UrL="url" @updataFile="updataFile"></UploadFiles>
      <!-- 可见老师 -->
      <el-dialog title="可见老师" v-model="dialogTeacher" v-if="dialogTeacher" width="50%">
        <Teacher v-model="dialogTeacher" @deplenght="teacherdeplenght" @teacherConfirm="Confirm"></Teacher>
      </el-dialog>
      <!-- 学生范围 -->
      <el-dialog title="可见学生" v-model="dialogStudent" v-if="dialogStudent" width="50%">
        <studentList v-model="dialogStudent" @studentConfirm="studentConfirm"></studentList>
      </el-dialog>

      <!-- 阅卷老师 -->
      <el-dialog title="阅卷老师" v-model="dialogyueTeacher" v-if="dialogyueTeacher" width="50%">
        <TascherList v-model="dialogyueTeacher" @deplenght="deplenght" @teacherConfirm="teacherConfirm"></TascherList>
      </el-dialog>

      <!-- 创建试题库 -->
      <el-dialog v-model="dialogVisible2" title="题库添加" width="50%">
        <CreaTi @isadd="isadd" @can="can"></CreaTi>
      </el-dialog>

      <!-- 从题库中导入 -->
      <QuestDislog :questdialog="questdialog" @queshandleClose="queshandleClose" @quesConfirm="quesConfirm"
        @quesCancel="quesCancel"></QuestDislog>
      <!-- 选择已有试卷 -->
      <Testpaperlist :isshow="isshow" @paperhandleClose="paperhandleClose" @paperConfirm="paperConfirm"
        @paperCancel="paperCancel"></Testpaperlist>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watchEffect, onMounted, computed } from "vue";
import { EditPen, Delete, CircleClose } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
import Drawers from "../../components/exam/drawer.vue";
import UploadFiles from "../../components/uploadFiles.vue";
import { baseList, testAdd, testDetails } from "../../api/test";
import Teacher from "../../components/exam/teacher.vue";
import TascherList from "../../components/test/teacherList.vue";
import studentList from "../../components/test/studentList.vue";
import CreaTi from '../../components/CreaTi.vue'
import QuestDislog from '../../components/exam/questDialog.vue'
import Testpaperlist from '../../components/exam/testpaperlist.vue'
import moment from "moment";
import router from "../../router";
// 接收编辑跳转过来的参数
import { useRoute } from "vue-router";
const Updatadialog = ref(false);
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
const value = ref("");
let resolution = ref("1");
const table = ref(false);
const dialogTeacher = ref(false); //可见老师
const dialogyueTeacher = ref(false); //阅卷老师
const Route = useRoute();
let title = ref("");
const size = ref<"default" | "large" | "small"|'mini'|"normal">("default");

// 日期时间
const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

onMounted(() => {
  console.log(Route.query);
});
// 判断是编辑还是添加
let complie: any = ref(null);
complie.value = Route.query.id;

// 数据回显
const gettest = async () => {
  let res: any = await testDetails({ id: Route.query.id });
  console.log(res);
  if (res.errCode == 10000) {
    params.value.title = res.data.title;
    params.value.info = res.data.info;
    params.value.scores = res.data.scores;
    params.value.questions = res.data.questions;
    params.value.limits = res.data.limits;
    params.value.markteachers = res.data.markteachers;
    params.value.students = res.data.students;
    checkone.value = res.data.qorder;
    checktwo.value = res.data.aorder;
    opTime.value.push(res.data.begintime);
    opTime.value.push(res.data.endtime);
    params.value.answershow = res.data.answershow;
    params.value.limits = res.data.limits;
  }
};
gettest();
// 题库
let databaseList: any = ref([]);
const getBaseList = async () => {
  let basequery = {
    page: 1,
    psize: 8,
  };
  let res: any = await baseList(basequery);
  // console.log(res);
  if (res.errCode == 10000) {
    databaseList.value = res.data.list;
  }
};
getBaseList();
// 点击添加单个试题
const addOne = () => {
  title.value = "添加";
  table.value = true;
  // console.log(11);
};
// 点击关闭
const Drawerclose = (val: any) => {
  // console.log(val);
  table.value = val;
};
// ------------------------input
const radioinp = ref('')//单选题分值
const checkinp = ref('')
const qwdinp = ref('')
const inp = (e: any, type: string) => {
  // console.log(e, type); //分数，类型
  if (type == '多选题') {
    params.value.questions.map((item: any) => {
      if (item.type == '多选题') {
        item.scores = e
      }
    })
  } else if (type == '单选题') {
    params.value.questions.map((item: any) => {
      if (item.type == '单选题') {
        item.scores = e
      }
    })
  } else if (type == '填空题') {
    params.value.questions.map((item: any) => {
      if (item.type == '填空题') {
        item.scores = e
      }
    })
  } else if (type == '判断题') {
    params.value.questions.map((item: any) => {
      if (item.type == '判断题') {
        item.scores = e
      }
    })
  } else {
    params.value.questions.map((item: any) => {
      if (item.type == '问答题') {
        item.scores = e
      }
    })
  }
}
// 计算总分
const totalPoints = computed(() => {
  let sum = 0
  for (let i in params.value.questions) {
    sum = sum + Number(params.value.questions[i].scores)
  }
  return sum
})
// 点击确定
const DrawerClick = (bool: any, val: any) => {
  console.log(val);
  table.value = bool;
  if (title.value == "修改") {
    params.value.questions = params.value.questions.map((item: any) => {
      console.log(item);

      if (item.id == val.id) {
        item = val;
      }
      return item;
    });
  } else {
    params.value.questions.push(val);
  }
  // console.log(params.value.questions, 2222);
};
// 点击完成
const DrawerCancel = (val: any) => {
  table.value = val;
};
// 编辑
let updArr: any = ref([]);
const edit: any = (val: any) => {
  console.log(val);
  title.value = "修改";
  table.value = true; //弹出框
  updArr.value = JSON.stringify(val);
};

// 删除
const del = (index: any) => {
  params.value.questions.splice(index, 1);
};
// 清空
const clear = () => {
  params.value.questions = [];
};
// 左侧填分区域
const getCount = () => { };
// 批量添加
let url = "http://estate.eshareedu.cn/exam/api/test/upload";
const updataFile = async (e: any) => {
  params.value.questions = e;
};
// 考试设置
let testTime: any = ref("1");
let time = ref(0); //多少分钟
onMounted(() => {
  if (time.value == 0) {
    testTime.value = "1";
  } else {
    testTime.value = "2";
  }
});

// 开放考试
let opTime: any = ref([]);
const getTime = (val: any) => {
  console.log(val);
  params.value.begintime = moment(val[0]).format("YYYY-MM-DD hh:ss");
  params.value.endtime = moment(val[1]).format("YYYY-MM-DD hh:ss");
};
// 防作弊 试题顺序打乱
let Disturbance = ref(false);
let checkone = ref(0);
const changeDisturbance = (val: any) => {
  // console.log(val);
  if (val == true) {
    checkone.value = 1;
    params.value.qorder = checkone.value;
  } else {
    checkone.value = 0;
  }
};
// 选项顺序打乱
const optionDisturbance = ref(false);
let checktwo = ref(0);
const changeoptionDisturbance = (val: any) => {
  if (val == true) {
    checktwo.value = 1;
    params.value.aorder = checktwo.value;
  } else {
    checktwo.value = 0;
  }
};

// 老师可见穿梭框
const teacherdeplenght = (val: any) => {
  // console.log(val);
  params.value.limits.lenght = val;
};
const Confirm = (bool: any, val: any) => {
  // console.log(val);
  dialogTeacher.value = false
  params.value.limits = val
}
// 阅卷老师穿梭框
const deplenght = (val: any) => {
  // console.log(val);
  params.value.markteachers.length = val;
};
//

// 差号
let paperhandleClose = (val: any) => {
  isshow.value = val
}
// 确定按钮
let paperConfirm = (val: any, data: any) => {
  // console.log(data.value.questions);

  isshow.value = val //关闭弹窗

  params.value.questions = data.value.questions //子组件传过来的数据
}
// 取消按钮
let paperCancel = (val: any) => {
  isshow.value = val
}
// 阅卷老师点击确定
const teacherConfirm = (bool: any, val: any) => {
  // console.log(bool, val);
  dialogyueTeacher.value = false;
  params.value.markteachers = val;
};
// 可见学生
const dialogStudent = ref(false);
let dialogVisible2 = ref(false)
const isadd = (val: any) => {
  dialogVisible2.value = val;
};
const can = (e: any) => {
  // console.log(e);
  dialogVisible2.value = false;
};
// 从题库中导入
const questdialog = ref(false)
// 题库弹窗点击差号关闭弹窗
let queshandleClose = (val: any) => {
  questdialog.value = val
}

// 点击确定按钮
let quesConfirm = (val: any) => {
  questdialog.value = val
}

// 点击取消按钮
let quesCancel = (val: any) => {
  questdialog.value = val
}
let isshow = ref(false)
// 学生穿梭框
const studentConfirm = (bool: any, val: any) => {
  console.log(bool, val);
  dialogStudent.value = false;
  params.value.students = val;
};
// 请求参数
const form: any = reactive({
  //请求添加接口添加的数据
  params: {
    id: 0, //当前考试的id
    title: "", //标题
    info: "", //说明
    admin: "ldq", //登录的用户名
    begintime: "", //开始时间
    endtime: "", //结束时间
    limittime: time.value, // 限制时长
    scores: 100, //总分
    state: 1,
    pastscores: 60, // 通过分数
    qorder: checkone.value, //防作弊试题打乱
    aorder: checktwo.value, //防作弊试题打乱-单选多选判断题
    answershow: Number(resolution.value), //交卷后的显示别: 1 ~5
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
const { params } = toRefs(form);

// 点击确定添加试题
const onSubmit = async () => {
  console.log(params.value);
  if (params.value.title == '') {
    ElMessage.error('请输入考试名称')
  } else if (params.value.limits.length === 0) {
    ElMessage.error('请选择可见老师')
  } else if (params.value.students.length === 0) {
    ElMessage.error('请选择可见学生')
  } else if (params.value.markteachers.length === 0) {
    ElMessage.error('请选择阅卷老师')
  } else {
    let res: any = await testAdd(params.value)
    // console.log(res);
    if (res.errCode == 10000) {
      ElMessage.success('添加成功')
      router.push("/test");
    }
  }
};
// 编辑
const onEdit = async () => {
  params.value.id = complie.value;
  params.value.checkone = checkone.value;
  params.value.checktwo = checktwo.value;
  console.log(params.value);
  let res: any = await testAdd({ ...params.value, id: params.value.id });
  // console.log(res);

  ElMessage.success("修改成功");
  router.push("/test");

};
// 保存不发布
const save = async () => {
  params.value.state = 2
  let res: any = await testAdd(params.value)
  // console.log(res);
  if (res.errCode == 10000) {
    ElMessage.success('添加成功')
    router.push("/test");
  }
}
watchEffect(() => {
  let choce = 0; //单选
  let check = 0; //多选
  let kong = 0; //
  let quest = 0;
  let judge = 0;
  params.value.questions.forEach((element: any) => {
    // console.log(element);
    if (element.type === "单选题") {
      form.isChoce = true;
      choce += 1;
    } else if (element.type === "多选题") {
      form.ischeck = true;
      check += 1;
    } else if (element.type === "填空题") {
      form.iskong = true;
      kong += 1;
    } else if (element.type == "问答题") {
      form.isqust = true;
      quest += 1;
    } else if (element.type == "判断题") {
      form.isJudge = true;
      judge += 1;
    }
  });
  form.numCheck = check;
  form.numChoce = choce;
  form.numKong = kong;
  form.numQuest = quest;
  form.numJudge = judge;

  // 防作弊
  if (checkone.value == 1) {
    Disturbance.value = true;
  } else {
    Disturbance.value = false;
  }
  if (checktwo.value == 1) {
    optionDisturbance.value = true;
  } else {
    optionDisturbance.value = false;
  }
});
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
              padding: 8px;
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

    .showTeacher {
      margin-top: 10px;
      margin-left: 120px;
      position: relative;

      span {
        font-size: 13px;
        // color: #90909e;
        margin-right: 15px;
      }

      .leng {
        position: absolute;
        left: 129px;
        top: -11px;
        width: 16px;
        height: 16px;
        background-color: var(--el-color-primary);
        border-radius: 50%;
        line-height: 16px;
        text-align: center;
        font-size: 13px;
        color: #fff;
      }
    }
  }
}

:deep(.box .contet[data-v-f73ea39c] .el-form-item__content) {
  display: flex;
}
</style>