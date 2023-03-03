<!-- 添加角色 -->
<template>
    <el-dialog v-model="centerDialogVisible" :title="id ? '修改' : '添加'" style="padding-bottom: 20px;">
        <el-form :model="tableData"  ref="ruleFormRef" :rules="rules" status-icon >
            <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
                <el-input style="width: 200px;" v-model="tableData.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="权限" :label-width="formLabelWidth">
            </el-form-item>
            <el-scrollbar height="300px">

                <el-form-item :label-width="formLabelWidth" v-for="(item, index) in menuDate.list" :key="item.id">
                    <!-- 权限多选框 -->
                    <div>
                        <el-checkbox v-model="item.checked" :indeterminate="item.isIndeterminate"
                            @change="handleCheckAllChange(index)">
                            {{ item.name }}</el-checkbox>
                    </div>

                    <div class="boxall" style="margin-left: 90px;">
                        <el-checkbox-group v-model="item.checkedids" @change="handleCheckedCitiesChange(index)">
                            <el-checkbox v-for="itemSon in item.children" :key="itemSon.id" :label="itemSon.id">
                                {{ itemSon.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>

                </el-form-item>
            </el-scrollbar>

            <el-form-item style="float: right;padding-top: 10px;">
                <div>
                    <span class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="getaddRole">
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
import { reactive, ref, onMounted, watch, toRefs, markRaw, toRaw } from 'vue'
import { roleAdd, menuList } from '../api/role';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'


onMounted(() => {
    getMenuList()
})
// 传
const props = defineProps({
    dislogShow: Boolean,
    item: Number,
    upid: Number,
    upname: String,
    upmenus: Array
})
watch([
    props
], () => {
    centerDialogVisible.value = props.dislogShow
    id.value = props.upid
    name.value = props.upname
    menus.value = props.upmenus
})


// 添加
const centerDialogVisible = ref(false)
const emit = defineEmits(['click'])
const formLabelWidth = '140px'

const menuDate = reactive<any>({
    list: []
})


// 权限列表
// const menuDate = ref<any>([])
const tableData: any = reactive({
    id: 0,
    name: '',
    menus: [],
    roleid: 0,
    info: []
})
const { name, roleid, id, menus, info } = toRefs(tableData)
const getMenuList = async () => {
    const res: any = await menuList({ roleid: tableData.id })
    // console.log(res.data.list);
    if (res.errCode == 10000) {
        menuDate.list = res.data.list
        tableData.id = props.item
        menus.value = props.upmenus
    }
}
// 添加多选框
const handleCheckAllChange = (index: number) => {
    let ids: Array<number> = [];
    if (!menuDate.list[index].checkedids || menuDate.list[index].checkedids.length == 0) {
        ids = menuDate.list[index].children.map((item: any) => item.id);
    }
    menuDate.list[index].checkedids = ids;
    // console.log(ids);

}
const handleCheckedCitiesChange = (index: number) => {
    console.log(menuDate.list[index].checkedids);
    let len1 = menuDate.list[index].checkedids.length;
    let len2 = menuDate.list[index].children.length;
    menuDate.list[index].isIndeterminate = false;
    if (len1 == len2) {
        menuDate.list[index].checked = true;
    }
    else if (len1 > 0) {
        menuDate.list[index].isIndeterminate = true;
    }
    else {

        menuDate.list[index].checked = false;
    }
}

// 表单校验
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
    name:[
    { required: true, message: '角色名不能为空', trigger: 'blur' },
    ]
})
// 点击确定
const getaddRole = async () => {
    centerDialogVisible.value = false
    if (id.value == 0) {
        // 获取id
        tableData.menus = toRaw(menuDate.list)
        // console.log(menus);
        let tomenus: Array<any> = []
        tableData.menus.forEach((item: any) => {
            if (item.checkedids) {
                item.checkedids.forEach((item1: any) => {
                    tomenus.push({ id: item1 })
                })
            }
        })
        console.log(111111111, tomenus);
        // 接口
        const res: any = await roleAdd({
            name: tableData.name,
            menus: tomenus
        })
        console.log(res);
        if (res.errCode == 10000) {
            ElMessage({
                type: 'success',
                message: '添加成功',
            })
            emit('click', false)
        } else {
            ElMessage({
                type: 'error',
                message: res.errMsg,
            })
        }
    } else {
        const res: any = await roleAdd({
            name: props.upname,
            id: props.upid,
            menus:props.upmenus
        })
        console.log(res);
        if (res.errCode == 10000) {
            ElMessage({
                type: 'success',
                message: '修改成功',
            })
            emit('click', false)
        } else {
            ElMessage({
                type: 'error',
                message: res.errMsg,
            })
        }
    }

}
</script>

<style scoped lang="less">
:deep(.el-form-item__content) {
    display: inline-block !important
}

.boxall {
    margin: 0 60px;
}
</style>