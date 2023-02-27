<template #footer>
  <!-- 题库首页的修改添加 -->
  <el-form ref="ruleFormRef" :model="data" :rules="rules">
    <el-form-item label="题库名称" prop="title">
      <el-input  v-model="data.title" autocomplete="off" />
    </el-form-item>
 
    <el-form-item label="被他人使用">
      <div class="radop">
        <el-radio-group v-model="data.isshow" class="ml-4">
                <el-radio :label="1">允许所有老师使用</el-radio>
                <el-radio :label="2">不允许任何老师使用</el-radio>
                <div>
                  <el-radio :label="3">允许部分老师使用</el-radio>
                </div>
          </el-radio-group>
        </div>
    </el-form-item>
  </el-form>
  <el-form-item>
    <div class="btn">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { reactive, ref, defineProps,onUpdated } from 'vue';
import { deleadd } from '../api/department';
import { ElMessage} from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
const emit = defineEmits(['emitShow'])
const props :any= defineProps({
// 父传子   子页面来接值
  upAata: {
    type: Object,
    default: () => {},
  },
});
const data :any= reactive({
  id: props.upAata.id,
  title: props.upAata.title,
  isshow: 1,
  limits: [],
});
console.log(data);

// 取消
const cancel = () => {
  emit('emitShow',false)
  data.id=''
  data.title=''
  console.log(data)
};
// 确定
const submit = async () => {
  if(props.upAata.id>0){
  let res:any=await deleadd(data)
  if(res.errCode===10000){
    ElMessage({
          type: 'success',
          message: '修改成功',
    });
  
  }
  // props.upAata.id=''
  // props.upAata.title=''
  data.id=''
  data.title=''
  console.log(data)
    emit('emitShow',false)
}else{
    data.id=0
    let res:any=await deleadd(data)
    if(res.errCode===10000){
    ElMessage({
          type: 'success',
          message: '添加成功',
    });
    props.upAata.id=''
    emit('emitShow',false)
  }
  }
};

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入题库名称', trigger: 'blur' }],
});
onUpdated(() => {
  console.log(123)
})
</script>

<style scoped>
.el-input {
  width: 210px;
}
.el-form-item .asterisk-left {
  display: flex;
  flex-wrap: wrap;
}
:deep(.el-radio-group){
  flex-direction: column;
  align-items: initial;
}
.btn{
  margin-left: 530px
} 
</style>
