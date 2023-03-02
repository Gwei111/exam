<template>
  <div>
  <el-drawer v-model="props.drawer"  title="试题详情"  :before-close="change">
    <div class="top"><div>
      {{ lisvue.type}}
    </div>
    <div class="fen">分值&nbsp;:&nbsp;&nbsp;{{ lisvue.scores}}</div></div>
    <div v-html="lisvue.title" class="tile"> </div>
    <div v-for="item in lisvue.answers" class="zo" :class="lisvue.answer!=item.answerno?'dan' : 'suers' ">
      <div class="yuan">&nbsp;&nbsp;</div>  <div class="xia">    {{ item.answerno }}&nbsp; :&nbsp;&nbsp;{{ item.content }}</div>
    </div>
  </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref ,defineProps,reactive,defineExpose} from 'vue'
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
.zo{
  display: flex;
  margin-top: 10px;
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