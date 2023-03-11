<template>
  <div>
    <el-drawer :model-value="props.table" :title="'试题' + props.title" direction="rtl" size="50%"
      :before-close="handleClose">
      <el-form :model="form">
        <el-form-item>
          <el-radio-group v-model="form.type">
            <el-radio label="单选题">单选题</el-radio>
            <el-radio label="多选题">多选题</el-radio>
            <el-radio label="判断题">判断题</el-radio>
            <el-radio label="填空题">填空题</el-radio>
            <el-radio label="简答题">简答题</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题干" size="normal">
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
              mode="small" />
            <Editor v-model="form.title" :defaultConfig="editorConfig" mode="small" @onCreated="handleCreated" />
          </div>
        </el-form-item>
        <!-- 选择题 -->
        <div v-if="form.type == '单选题' || form.type == '多选题'">
          <el-form-item label="选项" size="normal" class="options">
            <div v-for="(item, index) in form.answers" :key="index">{{ data.letter[index] }}:
              <el-input type="textarea" autosize style="width: 400px; height: 32px;"
                v-model="item.content"></el-input><el-icon style="font-size: 22px; color: #f56c6c;">
                <CircleClose @click="delOptions(index)" />
              </el-icon>
            </div>

          </el-form-item>
          <!-- 添加input -->
          <el-form-item label="" size="normal">
            <el-icon style="margin-left: 50px; font-size: 22px; color: #48a2ff;">
              <CirclePlus @click="addOptions" />
            </el-icon>
          </el-form-item>
          <!-- 单选题 -->
          <el-form-item label="正确答案" size="normal" v-if="form.type == '单选题'">
            <el-radio-group v-model="form.answer">
              <el-radio :label="data.letter[index]" v-for="(item, index) in form.answers" :key="index">
                {{ data.letter[index] }}
              </el-radio>

            </el-radio-group>
          </el-form-item>
          <!-- 多选题 -->
          <el-form-item label="正确答案" size="normal" v-if="form.type == '多选题'">
            <el-checkbox-group v-model="check" @change="changeCheckbox">
              <el-checkbox :label="data.letter[index]" v-for="(item, index) in form.answers" :key="index" />
            </el-checkbox-group>
          </el-form-item>
        </div>
        <!-- 判断题 -->
        <div v-if="form.type == '判断题'">
          <el-form-item label="正确答案" size="normal">
            <el-radio-group v-model="form.answer" size="large">
              <el-radio-button label="正确" />
              <el-radio-button label="错误" />
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 填空题 -->
        <div v-if="form.type == '填空题' || form.type == '简答题'">
          <el-form-item label="正确答案" size="normal" v-show="data.leng.length > 0" v-if="form.type == '填空题'">
            <div >
              <el-input size="normal" style="width: 350px;"   v-for="(item, index) in data.leng" v-model="data.leng[index]"  :key="index" 
               ></el-input><br/>
            </div>
          </el-form-item>
          <el-form-item label="解析" size="normal" >
            <el-input placeholder="" type="textarea" size="normal" autosize clearable v-model="form.explains"
              style="width: 350px;"></el-input>
          </el-form-item>
        </div>
        <!-- 分值 -->
        <el-form-item label="分值" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.scores" autocomplete="off" style="width:80px;" />
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="onClick()">保存</el-button>
        <el-button type="primary" plain @click="clickup">保存并继续</el-button>
        <el-button @click="cancelForm">Cancel</el-button>

      </div>

     
  </el-drawer>
</div></template>

<script setup lang="ts">
import { ref, reactive, shallowRef, onBeforeUnmount, onMounted, toRefs, watch, nextTick } from "vue";
import { ElDrawer, ElMessage, ElMessageBox } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar, } from '@wangeditor/editor-for-vue'
import { IEditorConfig } from '@wangeditor/editor'
import WangEditor from 'wangeditor'
import { CirclePlus, CircleClose, List } from '@element-plus/icons-vue';

// 题库的编辑dictionary,题库的id(databaseid)
const props = defineProps(['table','updArr','title','databaseid','dictionary'])
const emit = defineEmits(['Drawerclose', 'adds', 'DrawerCancel'])
watch([props], () => {
  form = props.updArr
})


const formLabelWidth = "80px";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// const toolbarConfig = {}
const toolbarConfig = {
  toolbarKeys: [
    // 菜单 key
    "bold",
    "italic",
    "underline",
    "through",
    "color",
    "bgColor",
    "bulletedList",
    "numberedList",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "insertTable",
    // 继续配置其他菜单...
    {
      key: "group-image", // 必填，要以 group 开头
      title: "图片", // 必填
      menuKeys: ["uploadImage", "insertImage"],
    },
  ],
};
const editorConfig: any = { MENU_CONF: {} };
editorConfig.MENU_CONF["uploadImage"] = {
  server:"http://www.eshareedu.cn/exam/api/upload/editeradd", // 上传图片地址
  timeout: 5 * 1000, // 5s
  fieldName: "file",
  meta: { baseUrl: "" },
  metaWithUrl: true, // 参数拼接到 url 上
  headers: { Authorization: sessionStorage.getItem("token") },

  maxFileSize: 10 * 1024 * 1024, // 10M

  base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

  onBeforeUpload(files: any) {
    console.log("onBeforeUpload", files);
    return files; // 返回哪些文件可以上传
  },
  onProgress(progress: any) {
    console.log("onProgress", progress);
  },
  onSuccess(file: any, res: any) {
    console.log("onSuccess", file, res);
  },
  onFailed(file: any, res: any) {
    alert(res.message);
    console.log("onFailed", file, res);
  },
  onError(file: any, err: any, res: any) {
    alert(err.message);
    console.error("onError", file, err, res);
  },
  // // 用户自定义插入图片
  customInsert(res: any, insertFn: any) {
    var Img = res.data[0].url.slice(1);
    // 自己插入图片
    // console.log('自己插入图片', url)
    // insertFn(url, alt, href)
    insertFn("http://www.eshareedu.cn/exam/upload/" + Img);
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
// const editorConfig = { placeholder: '请输入内容...' }
let check=ref([])//复选框正确答案的值
let form:any = reactive({
    id: 0,
    testid: 0,
    title:'',
    type: '单选题',
    scores: '',
    answer:'',
    tags: '',
    explains: '',
    databaseid:props.databaseid, //题库id添加
    answers: [ //选项数据
      {
        id: 0,
        answerno: 'A',
        questionid: 0,
        content: '',
      },
      {
        id: 0,
        answerno: 'B',
        questionid: 0,
        content: '',
      },
      {
        id: 0,
        answerno: 'C',
        questionid: 0,
        content: '',
      },
      {
        id: 0,
        answerno: 'D',
        questionid: 0,
        content: '',
      },
    ],

})
// 监听types变化，重置表单
watch(form.type, (newVal) => {
  form.value.type = newVal;
});
// const  {answer}  = toRefs(form)
const data:any = reactive({
  letter: [
    //选项的名
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "G",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  leng: [],
});
// const{letter,leng}=toRefs(data)
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 多选框内容改变
const changeCheckbox = (e: any) => {
  // console.log(e);
  form.answer = e.join("|");
};
// 填空题
watch(()=>form.title,(newvalue)=>{
  // console.log(newvalue);
  data.leng=[]
  let res=newvalue.match(/\[\]/g)
  if(res){
    let _inputNum = newvalue.match(/\[\]/g).map((item: any, index: number) => (item = data.leng[index]));
        data.leng = [..._inputNum];
  }
  
})
// 点击+添加选项
const addOptions = () => {
    form.answers.push({
        id: 0,
        answerno: data.letter[form.answers.length],
        questionid: 0,
        content: ''
    })
    console.log(form.answers);
}
// 点击X删除选项
const delOptions = (val: any) => {
  form.answers.splice(val, 1);
};
// 点击完成
const onClick = () => {
  // console.log(form)
  if (form.type == "单选题") {
    if (!form.answer) {
      ElMessage("正确答案必填!");
      return;
    } else if (!form.scores) {
      ElMessage("请填入分数");
    }
    var noNum: number = 0;
    form.answers.map((item: any) => {
      if (!item.content) {
        noNum += 1;
      }
    });
    if (noNum > 0) {
      ElMessage("选项答案必填");
      return;
    }
  }
  if (form.type === "判断题") {
    if (!form.answer) {
      ElMessage("请输入正确答案");
      return;
    } else if (!form.scores) {
      ElMessage("请输入分值");
      return;
    }
  }
  if (form.type === "填空题" || form.type === "问答题") {
    form.answer = data.leng.join("|");
    if (!form.scores) {
      ElMessage("请输入分值");
      return;
    }
  }
  emit("adds", false, form);
};
// 修改回显数据
if(props.title=='修改'){
    let list:any=JSON.parse(props.updArr)
    // console.log(list);
    form={...list}
    check=list.answer.split('|')
    console.log(form);
}
    // 修改回显数据题库编辑  
  if(props.dictionary){
      form.title = props.dictionary.title
      form.type = props.dictionary.type
      form.scores = props.dictionary.scores
      form.answers = props.dictionary.answers
      form.answer = props.dictionary.answer
      form.tags = props.dictionary.tags
      form.explains = props.dictionary.explains
      form.id = props.dictionary.id
  }
onMounted(() => {
    if(props.title=='修改'){
        data.leng=form.answer
    }
})
// 保存并继续
const clickup = () => { };
const handleClose = (done: any) => {
  // console.log(done);
  emit("Drawerclose", false);
};

const cancelForm = () => {
  // emit('DrawerCancel', false)
};
</script>

<style lang="less" scoped>
.el-textarea__inner {
  height: 10px !important;
  font-weight: normal;
}

.el-form-item__label {
  display: inline-flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 0 0 auto;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
  height: 32px;
  line-height: 32px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}

.el-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  // flex: 1;
  line-height: 22px;
  position: relative;
  font-size: var(--font-size);
  min-width: 0;
}

.options div {
  width: 1400px;
  padding: 5px;
}
</style>