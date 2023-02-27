<template>
  <div>123456564321
    <el-form ref="ruleFormRef"
             :model="ruleForm"
             :rules="rules">
      <el-form-item label="题库名称" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>

      <el-form-item label="题库名称">
        <el-radio-group v-model="ruleForm.isshow" @change="student">
          <el-radio :label="0">允许所有老师使用</el-radio>
          <el-radio :label="1">不允许任何老师使用</el-radio>
          <el-radio :label="2">允许部分老师使用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button size="default"
                 @click="close">取消</el-button>
      <el-button size="default"
                 type="primary"
                 @click="userAdd(ruleFormRef)">{{isAdd?'添加':'修改'}}</el-button>
    </div>
     <el-dialog
    v-model="dialog"
    title="可见老师"
    width="50%"
    :before-close="handleClose"
  >    
  </el-dialog>
  <TeacherShuttlebox v-model="teacherDialog" v-if="teacherDialog" @teacherIds="teacherIds"></TeacherShuttlebox>
  </div>
</template>
<script lang='ts'>
import { reactive, ref, watchEffect} from "vue";
import { ElMessage,FormInstance, FormRules } from "element-plus";
import {update,addd,teach}from '../../../assets/apis/login/login'
import TeacherShuttlebox from "../../teacherShuttlebox.vue"
export default {
  components: {
    TeacherShuttlebox
  },
  props: ["id","isAdd"],
  setup(props:any, { emit }) {
    const ruleFormRef = ref<FormInstance>();
    const formSize = ref("default");
    const dialog = ref(false)
    const ruleForm = reactive({
      id: 0,
      title: "",
      isshow: 0,
      limits: [],
    });
    const teacherIds=(e:any)=>{
      console.log(e)
      ruleForm.limits=e
    }
    const radio = ref(0)
    const teacherDialog = ref(false)
    const rules = reactive<FormRules>({
      title : [
        { required: true, message: '请输入题库名称', trigger: 'blur' },
        { min: 3, max: 10, message: '账号输入3~10位', trigger: 'blur' }
      ]
    })
     // 取消按钮
    const close = () => {
      emit('close', false)
    }
    const student=(e:any)=>{
      // console.log(e)
      if(e===2){
        teacherDialog.value=true
        console.log(teacherDialog)
      }
    }
    // 添加 / 修改
    const userAdd = (formEl: FormInstance | undefined) => {
      
      // let e = JSON.parse(JSON.stringify(ruleForm).replace(/name/g, 'acount'))
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          addUser()
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    const addUser = async () => {
      if (props.isAdd) {
        emit('refresh', false)
        let res:any = await addd(ruleForm)
        console.log(ruleForm)
        if (res.statusCode === 0) {
          ElMessage.success('添加成功')
          emit('refresh', false)
        }
      } else {
        ruleForm.id=props.id
        console.log(ruleForm)
        let res:any = await addd(ruleForm)
        console.log(res)
          ElMessage.success('修改成功')
          emit('refresh', false)
      }
    }
    
    const databasequestion = async() =>{
      let params={
        databaseid:props.id
      }
      const res: any = await update(params);
      console.log(555,res)
      ruleForm.title=res.data.database.title
    }
    watchEffect(()=>{
      if(props.id>0){
        databasequestion()
      }
      
      
    })
    interface Option {
  value: number
  desc: string
  disabled: boolean
}
// 穿梭框
const generateData = () => {
  const data: Option[] = []
  for (let i = 1; i <= 25; i++) {
    data.push({
      value: i,
      desc: `Option ${i}`,
      disabled: i % 100 === 0,
    })
  }
  return data
}
const data = ref<Option[]>(generateData())
const value = ref([])
    return {
      student,
      teacherIds,
      ruleFormRef,
      data,
      value,
      formSize,
      ruleForm,
      rules,
      close,
      userAdd,
      radio,
      dialog,
      generateData,
      teacherDialog
    };
  },
};
</script>
<style scoped>
</style>
