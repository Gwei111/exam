<template>
    <div class="box">
        <el-form ref="ruleFormRef" :model="tableData" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="tableData.name" />
            </el-form-item>
        </el-form>

        <!-- 复选框 -->
        <div>
            <span>权限</span>
        </div>
        <div style="margin-left: 50px;" v-for="(item, index) in info" :key="item.id">
            <!-- 父类复选框 -->
            <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate"
                @change="handleCheckAllChange($event, index)">{{ item.name }}</el-checkbox>
            <!-- 子类复选框 -->
            <el-checkbox-group style="margin-left: 40px;" v-model="item.checkedCities"
                @change="handleCheckedCitiesChange($event, index)">
                <el-checkbox v-for="city in item.children" :key="city.id" :label="city.id">{{
                    city.name
                }}</el-checkbox>
            </el-checkbox-group>
        </div>
        <!-- 取消与添加修改按钮 -->
        <span class="dialog-footer">
            <el-button @click="colf">取消</el-button>
            <el-button type="primary" @click="roleAdmin()">{{
                isAdd === true ? '添加' : '修改'
            }}</el-button>
        </span>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref, toRefs, watchEffect } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { menuList, roleAdd } from '../api/role'

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
    name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
});

const tableData: any = reactive({
    id: 0,
    menus: [],
    info: [],
    name: '',
    roleid: 0,
});
const { info, roleid, name, menus, id } = toRefs(tableData);

// 获取获取权限功能列表接口
const getList = async () => {
    const res = await menuList({ roleid: tableData.id })
    console.log(123123123123123, res);
    info.value = res.data.list
    tableData.id = props.item;
    if (tableData.id != 0) {
        let data = info.value.map((item: any) => {
            item.checkedCities = [];
            item.children.forEach((item1: any) => {
                if (item1.checked != 0) {
                    item.checkedCities.push(item1.id);
                }
                if (item.checkedCities.length === item.children.length) {
                    item.checkAll = true;
                }
            });
        });
    }
}
// getList()

// 复选框
const checkAll = ref(false);
const isIndeterminate = ref(false);//子类复选框是否选中

const handleCheckAllChange = (val: boolean, index: number) => {
    console.log(123123, val, index);//选中的状态和id
    console.log(info.value);//选中返回的内容
    if (val) {
        let ids = info.value[index].children.map((item: any) => item.id)
        info.value[index].checkedCities = ids
    } else {
        info.value[index].checkedCities = []
    }
};
const handleCheckedCitiesChange = (value: string[], index: number) => {
    const checkedCount = value.length;
    console.log(value, 123, index);
    info.value[index].checkAll = checkedCount === info.value[index].children.length
    if (checkedCount > 0 && !info.value[index].checkAll) {
        info.value[index].isIndeterminate = true
    } else {
        info.value[index].isIndeterminate = false
    }
};

// 确定调接口
const props = defineProps(['isAdd', 'item', 'name']);
console.log(props);
id.value = props.item


// 取消按钮
const colf = () => {
    emit('clickChild', false);
};

// 添加修改
const roleAdmin = async () => {
    let data = info.value.map((item: any) => {
        if (item.checkedCities) {
            tableData.menus = [...tableData.menus, ...item.checkedCities];
        }
    });
    tableData.menus = tableData.menus.map((item1: any) => {
        return {
            id: item1,
        };
    });
    const res: any = await roleAdd(tableData)
    console.log(res);
    if (res.errCode === 10000) {
        if (id.value === 0) {
            ElMessage.success('添加成功');
            emit('click', false);
        } else {
            tableData.id = props.item;
            const res: any = await roleAdd(tableData);
            console.log(res, 7826);
            ElMessage.success('修改成功');
            emit('click', false);
        }
    }
}

// 回显
watchEffect(() => {
    if (props.isAdd) {
        (name.value = ''), getList();
    } else {
        tableData.name = props.name;
        console.log(props.name);
        // (name.value = ''), props.item.name;
        getList();
    }
    console.log(1010, props.item);
});

const emit = defineEmits(['clickChild', 'click']);
</script>
  
<style lang="less" scoped>
/deep/.box {
    padding: 20px !important
}

.el-input {
    width: 280px;
}

.dialog-footer {
    float: right;
    margin-bottom: 50px;
}
</style>
  