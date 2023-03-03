<template #footer>
  <!-- 题库首页的修改添加 -->
  <el-form ref="ruleFormRef" :model="data" :rules="rules">
    <el-form-item label="题库名称" prop="title">
      <el-input v-model="data.title" autocomplete="off" />
    </el-form-item>

    <el-form-item label="被他人使用">
      <div class="radop">
        <el-radio-group v-model="data.isshow" class="ml-4">
          <el-radio :label="1">允许所有老师使用</el-radio>
          <el-radio :label="2">不允许任何老师使用</el-radio>
          <div @click="dialogVisible1=true" class="yu">
            <el-radio :label="3" >允许部分老师使用</el-radio>
          </div>
        </el-radio-group>
        <div class="yuan" v-if="numberValidateForm.limits.length>0">  {{numberValidateForm.limits.length}}</div>
      </div>
    </el-form-item>
  </el-form>
  <el-form-item>
    <div class="btn">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-form-item>
  <el-dialog v-model="dialogVisible1" v-if="dialogVisible1">
      <Forth  @isshow="isshow" @valuesss="valuessss"></Forth>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, defineProps, onUpdated ,watch} from 'vue';
import { deleadd } from '../api/department';
import { ShuttleAdd} from '../api/Test/Test'  //穿梭框
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import Forth from '../components/Test/Forth.vue';
const emit = defineEmits(['emitShow']);
const props: any = defineProps({
  // 父传子   子页面来接值
  upAata: {
    type: Object,
    default: () => {},
  },
});
const numberValidateForm = reactive({
limits: [],
});
// 穿梭框
const dialogVisible1 = ref(false);
const isshow=(val:any)=>{
  dialogVisible1.value=false
}
//穿梭框获取到的值
const valuessss = (val: any) => {
 numberValidateForm.limits = val;
};
const data: any = reactive({
  id:props.upAata.id,
  title:'',
  isshow: 1,
  limits: [],
});
watch((props.upAata.title ), (newVal) =>{
    data.title = props.upAata.title
},{deep:true,immediate:true})
// 取消
const cancel = () => {
  emit('emitShow', false);
  data.id = '';
  data.title = '';
  console.log(data);
};
// 确定
const submit = async () => {
  if (props.upAata.id > 0) {
    let res: any = await deleadd(data);
    
    if (res.errCode === 10000) {
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    }
    data.id = '';
    data.title = '';
    console.log(data);
    emit('emitShow', false);
  } else {
    let res: any = await deleadd(data);
    // if(!data.title){
    //   return ElMessage({
    //     message:"请填写标题",
    //     type:"error"
    //   })
    // }
    if (res.errCode === 10000) {
      ElMessage({
        type: 'success',
        message: '添加成功',
      });
      props.upAata.id = '';
      emit('emitShow', false);
    }
  }
};
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入题库名称', trigger: 'blur' }],
});
onUpdated(() => {
});
</script>

<style scoped>
.el-input {
  width: 210px;
}
.el-form-item .asterisk-left {
  display: flex;
  flex-wrap: wrap;
}
:deep(.el-radio-group) {
  flex-direction: column;
  align-items: initial;
}
.btn {
  margin-left: 530px;
}
.yuan{
  width: 18px;
  height: 18px;
  background-color: #409eff;
  border-radius: 30px;
  position: relative;
  left: 130px;
  top: -50px;
  line-height: 18px;
  text-align: center;
  color: aliceblue;
}
.yu{
  margin-top: 10px;
}
</style>
