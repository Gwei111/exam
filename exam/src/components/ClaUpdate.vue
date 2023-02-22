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
                    prop="region">
        <el-select v-model="ruleForm.region"
                   placeholder="请选择">
          <el-option label="Zone one"
                     value="shanghai" />
          <el-option label="Zone two"
                     value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary"
                     @click="submit">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref, defineEmits, defineProps } from "vue";
import { Add } from "../api/Class/list";
import { useRouter } from "vue-router";
const router = useRouter();
const emits = defineEmits(["close"]);
const formSize = ref("default");
const dialogVisible = ref(false);
const props = defineProps({
  // 父传子   子页面来接值
  upAata: {
    type: Array,
    default: () => [],
  },
});
console.log(props.upAata.id);
const ruleForm = reactive({
  name: "",
  region: "",
});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入班级名称", trigger: "blur" },
    { min: 8, max: 15, message: "最少三位，最多五位", trigger: "blur" },
  ],
});

// 取消按钮
const cancel = () => {
  dialogVisible.value = false;
};

// 添加接口
const submit = async () => {
  // if (父组件传过来当前行里面的数据，取里面的id不等于0时走修改接口) {

  // }else{走添加接口}
  if (props.upAata.id) {
    console.log("修改");
    let res = await Add({
      id: props.upAata.id,
      name: ruleForm.name,
      depid: ruleForm.region,
    });
    // console.log(res.data);
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
    console.log("tianjai");
    let res = await Add(ruleForm);
    console.log(res);
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