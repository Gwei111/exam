<!-- 添加角色 -->
<template>
    <el-dialog v-model="dislogShow" :title="id ? '修改' : '添加'" style="padding-bottom: 20px;">
        <el-form :model="state" ref="ruleFormRef" :rules="rules" status-icon>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                <el-input style="width: 300px;" v-model="state.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="state.mobile" autocomplete="off" />
            </el-form-item>
            <el-form-item label="部门" :label-width="formLabelWidth">
                <el-select placeholder="请选择" v-model="state.depid" @change="getmenus">
                    <el-option v-for="item in departmentlistInfo" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="班级" :label-width="formLabelWidth" @change="changeclass">
                <el-select placeholder="请选择" v-model="state.classid">
                    <el-option v-for="item1 in classlistInfo" :key="item1.id" :label="item1.name" :value="item1.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" style="width:300px;" v-model="state.remarks" autocomplete="off" />
            </el-form-item>
            <div v-show="id!==0">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
                    <el-input style="width: 300px;" v-model="state.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
                    <el-input style="width: 300px;" v-model="state.pass" autocomplete="off" />
                </el-form-item>

            </div>
            <el-form-item style="float: right;padding-top: 10px;">
                <div>
                    <span class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="submit(ruleFormRef)">
                            确定
                        </el-button>
                    </span>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 添加角色结束 -->
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch, toRefs } from 'vue'
import { studentAdd, departmentsList, classesList } from '../api/student';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'



const state: any = reactive({
    id: 0,
    name: '',
    classid: '',
    username: '',
    pass: '',
    mobile: '',
    remarks: '',
    depid: ''
})
const { depid, id, name, username, classid, pass, mobile, remarks } = toRefs(state)

onMounted(() => {
    getdepartmentsList()
    // getclassesList()
})
// 传
const props = defineProps({
    dislogShow: Boolean,
    item: Number,
    upid: Number,
    upname: String,
    upmobile: Number,
    upremarks: String,
    updepid: Number,
    upclassid: Number,
    upusername: String,
    uppass: Number
})
watch([
    props
], () => {
    dislogShow.value = props.dislogShow
    id.value = props.upid
    name.value = props.upname
    mobile.value = props.upmobile
    remarks.value = props.upremarks
    depid.value = props.updepid
    classid.value = props.upclassid
    username.value = props.upusername
    pass.value = props.uppass
    // console.log(id.value);

})



// 添加
const dislogShow = ref(false)
const formLabelWidth = '140px'


// 表单校验
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '姓名不能为空', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
    ],
    pass: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ]
})


// const menuDate = reactive<any>({
//     list: []
// })

// 部门列表
const departmentlistInfo: any = ref([])
const getdepartmentsList = async () => {
    // let aa = { page: 1, psize: 10 }
    const res: any = await departmentsList({})
    // console.log('部门列表', res.data.list);
    departmentlistInfo.value = res.data.list
}
const getmenus=(val:any)=>{
 
    depid.value = val
    console.log( depid.value);
    getclassesList()
    
}
// 班级列表
// const depidid = ref('')
const classlistInfo: any = ref([])
const getclassesList = async () => {
    const res: any = await classesList({ depid: state.depid })
    console.log('班级列表', res.data.list);
    classlistInfo.value = res.data.list

}
const changeclass = async( val:any)=>{
  console.log(val);
  state.value.classid = val
  
  // depid.value = val
}


const emit = defineEmits(['stuCancel', 'stuSub'])
const cancel = () => {
    emit('stuCancel', false)
}

// 点击确定
const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            dislogShow.value = false
            if (id.value == 0) {
                // 接口
                const res: any = await studentAdd(
                    state
                )
                console.log(res);
                if (res.errCode == 10000) {
                    ElMessage({
                        type: 'success',
                        message: '添加成功',
                    })
                    emit('stuSub', false)
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.errMsg,
                    })
                }
            } else {
                const res: any = await studentAdd(
                    // name:state.name,
                    state
                    // username:state.username
                )
                if (res.errCode == 10000) {
                    ElMessage({
                        type: 'success',
                        message: '修改成功',
                    })
                    emit('stuSub', false)
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.errMsg,
                    })
                }
            }
        } else {
            console.log('error submit!')
            return false
        }
    })

}

</script>

<style scoped lang="less">
/deep/.el-form-item__content {
    display: inline-block !important
}

.boxall {
    margin: 0 60px;
}
</style>