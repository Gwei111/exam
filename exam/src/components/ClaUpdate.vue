<template>
  <div>
    <el-form ref="ruleFormRef"
             :model="ruleForm"
             :rules="rules"
             label-width="120px"
             class="demo-ruleForm"
             :size="formSize"
             status-icon>

      <el-form-item label="班级名称："
                    prop="name"
                    style="width:400px">
        <el-input v-model="ruleForm.name"
                  placeholder="请输入班级名称" />
      </el-form-item>

      <el-form-item label="部门："
                    prop="depid">
        <el-cascader v-model="ruleForm.depid"
                     :options="options.arr"
                     @change="handleChange"
                     :props="props22" />
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button @click="cencellA">取消</el-button>
          <el-button type="primary"
                     @click="submit">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import {
  reactive,
  ref,
  defineEmits,
  toRaw,
  defineProps,
  watchEffect,
} from "vue";
import { departmentlist } from "../api/department";
import { Add } from "../api/Class/list";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
// 子传父
const router = useRouter();
const emits = defineEmits(["close", "cencell"]);
const formSize = ref("default");
const dialogVisible = ref(false);
const props: any = defineProps({
  // 父传子   子页面来接值
  upAata: {
    type: Array,
    default: () => [],
  },
});
console.log(props.upAata.depid);
const ruleForm = reactive({
  name: "",
  id: " ",
  depid: "",
  region:""
});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入班级名称", trig/ger: "blur" },
    { min: 5, max: 15, message: "最少五位，最多十五位", trigger: "blur" },
  ],
});
// 添加接口
const submit = async () => {
  // if (父组件传过来当前行里面的数据，取里面的id不等于0时走修改接口) {
  // }else{走添加接口}
  if (props.upAata.id) {
    let res: any = await Add({
      id: props.upAata.id,
      name: ruleForm.name,
      depid: ruleForm.region,
    });
    if (res.errCode === 10000) {
      emits("close", false);
      ElMessage({
        message: "修改成功,请返回列表查看",
        type: "success",
      });
    }
    props.upAata.id = "";
    ruleForm.name = "";
    ruleForm.region = "";
  } else {
    ruleForm.depid = date.depid;
    let res: any = await Add(ruleForm);
    if (res.errCode === 10000) {
      emits("close", false);
      ElMessage({
        message: "添加成功,请返回列表查看",
        type: "success",
      });
    }
    emits("close", false);
    ruleForm.name = "";
    ruleForm.region = "";
  }
};
const options: any = reactive({ arr: [] });
// 部门列表
const date: any = reactive({
  page: "",
  psize: "",
  depid: "",
  rolename: "", // 角色
});
const props22 = ref({
  value: "id",
  label: "name",
  children: "children",
});

const partmentlist = async () => {
  let res: any = await departmentlist(date);
  options.arr = res.data.list;
  // console.log(options.arr);
};
partmentlist();
const handleChange = (val: any) => {
  date.depid = val[toRaw(val).length - 1];
};
watchEffect(() => {
  // 回显
  ruleForm.name = props.upAata.name;
  ruleForm.depid=props.upAata.depid
});
console.log(props.upAata.depid);

// 子传父
const cencellA = () => {
  emits("cencell", false);
};
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.btn {
  padding-left: 250px;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>