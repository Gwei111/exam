<template>
  <div class="el-main">
  <el-drawer v-model="props.drawer"  title="试题详情"  :before-close="change">
    <div class="top"><div>
      {{ lisvue.type}}
    </div>
    <div class="fen">分值&nbsp;:&nbsp;&nbsp;{{ lisvue.scores}}</div> </div>
    <div v-html="lisvue.title" class="tile"></div>
    <!-- 单选题多选题 -->
    <div v-if="lisvue.type=='单选题'||lisvue.type=='多选题'" v-for="item in lisvue.answers" class="zo" :class="lisvue.answer.includes(item.answerno)?'suers' : 'dan' ">
      <div class="yuan">&nbsp;&nbsp;</div><div class="xia">{{ item.answerno }}&nbsp; :&nbsp;&nbsp;{{ item.content }}</div>
    </div>
    <div v-if="lisvue.type=='判断题'" class="zo1" >
     <div>正确答案</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{  lisvue.answer}}
    </div>
    <div v-if="lisvue.type=='填空题'"  >
     <div class="zo1"><div>正确答案</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{  lisvue.answer}}</div>
    <div class="zo2"><div>答案解析</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{lisvue.explains}}</div>
    </div>
    <div v-if="lisvue.type=='问答题'"  >
     <div class="zo1"><div>正确答案</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{  lisvue.answer}}</div>
    <div class="zo2"><div>答案解析</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{lisvue.explains}}</div>
    </div>
  </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref ,defineProps,reactive} from 'vue'
const emit = defineEmits(['drawerShow'])
const props = withDefaults(
  defineProps<{
    drawer:boolean,
    lisvue:any
  }>(),{
    drawer:false,
  }
)
console.log(props.lisvue);

const change=()=>{
 emit('drawerShow',false)
}
</script>

<style scoped>
.el-main{
    font-size: 16px;
}
:deep(.el-drawer__title){
  font-size: 20px;
}
:deep(.el-drawer__body){
  margin-top: -30px;
}
.suers{
  background-color: #f0faf6;
}
.top{
  display: flex;
}
.fen{
  margin-left: 15px;
  font-size: 14px;
  color: #999;
}
.tile{
  margin-top:10px;
}
:deep(#test1){
  height: 0px;
}
.zo{
  display: flex;
  margin-top: 10px;
}
.zo1{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  display: flex;
  color:#84d5b1;
  margin-top: 10px;
  font-size: 14px;
  background-color: #f0faf6;
}
.zo2{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  margin-top: 20px;
  display: flex;
  color:#a0adbd;
  font-size: 14px;
  background-color: #f6faff;
}
.xia{
  line-height: 30px;
  margin-left: 5px;
}
.yuan{
  width: 21px;
  height: 21px;
  border-radius: 30px;
  margin-top: 3px;
  background-color: #fff;
  border: 1px #edf3f1 solid;
}
</style>