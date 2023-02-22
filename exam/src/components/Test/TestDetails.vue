<template>
  <div>
    <el-dialog :model-value="Detailsdialog"
               :title="model.title"
               width="80%"
               :before-close="handleClose">
      <div class="head">
        <div>
          <span>总分</span>
          <p>{{model.scores}}</p>
        </div>
        &emsp; &emsp;
        <div>
          <span>添加时间</span>
          <p>{{model.addtime}}</p>
        </div>
      </div>
      <div v-for="item,index in model.questions"
           :key="index">
        <div style="padding-top:30px">
          <span>{{index+1}}.</span><span>{{item.type}}</span><span style="margin-left:10px;">分值：{{item.scores}}</span>
          <p style="padding:10px 0 10px 0"
             v-html="item.title.replaceAll('[]','__')"></p>
        </div>
        <!-- 单选题 -->
        <div v-for="items in item.answers"
             :key="items.id"
             :class="item.answer.includes(items.answerno) ? 'bgcolor' : ''"
             style="display: flex;margin-top:5px;padding: 10px;">
          <div :class="item.type==='单选题' ? 'radio' : 'check'">
          </div>
          <div style="padding-left:10px">
            <span>{{items.answerno}}</span>
            <span style="padding-left:10px">{{items.content}}</span>
          </div>
        </div>
        <!-- 填空 -->
        <div v-if="item.type=='填空题' || item.type=='判断题'"
             class="yes">
          <span style="color:#5acda6;padding-left: 20px;">正确答案</span><span style="color:#5acda6;padding-left: 20px;">{{item.answer}}</span>
        </div>
        <div v-if="item.type=='填空题' || item.type=='问答题'"
             class="analy">
          <span style="color:#ccd5df;padding-left: 20px;">答案解析</span><span style="color:#abb8c6;padding-left: 20px;">{{item.explains}}</span>
        </div>

      </div>

      <template>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineEmits } from "vue";
import { ElMessageBox } from "element-plus";
import { getSubjects } from "../../api/Test/Test";
const dialogVisible = ref(false);
const emits = defineEmits(["update:modelValue"]);
const prop = defineProps({
  Detailsid: Number,
  subjectsID: Number,
});
const data: any = reactive({
  model: {},
  Detailsdialog: true,
  id: prop.Detailsid,
  sid: prop.subjectsID,
  arr: ["错误", "正确"],
});
console.log(data.sid);

const { Detailsdialog, id, model, sid } = toRefs(data);
const handleClose = () => {
  emits("update:modelValue", false);
};

// 请求详情数据
const getPSubjects = async () => {
  let res = await getSubjects({ id: sid.value });
  console.log(res);
  if (res.errCode === 10000) {
    model.value = res.data;
    console.log(model.value);
  }
};
getPSubjects();
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.head {
  width: 100%;
  height: 50px;
  border-bottom: 0.5px solid #efefef;
  margin-top: -25px;
  display: flex;
}
.head div p {
  margin-top: 5px;
}
.topic {
  width: 100%;
  /* background-color: gray; */
  margin-top: 10px;
}
.yes {
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #eefaf6;
  margin: 10px 10px;
}
#xia {
  margin-top: 5px;
}
.yuan {
  width: 20px;
  margin-top: 10px;
  height: 20px;
  /* background-color: #fafafa; */
  border: 1px solid #e3e3e3;
  border-radius: 20px;
}
.da {
  display: flex;
}
.yuan1 {
  margin-top: 10px;
}
.bgcolor {
  background-color: #eefaf6;
}
.radio {
  width: 20px;
  height: 20px;
  background-color: #fcf8f8;
  border: 1px solid #dfdfde;
  border-radius: 50%;
}
.check {
  width: 20px;
  height: 20px;
  background-color: #fcf8f8;
  border: 1px solid #dfdfde;
}
</style>