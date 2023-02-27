<template>
  父
  <div class="TiMax">
    <div class="TiAdd">
      <el-form ref="formRef"
               :model="numberValidateForm"
               label-width="100px"
               class="demo-ruleForm">
        <div class="box">
          <el-form-item label="题库名称："
                        prop="numberValidateForm.title"
                        :rules="[
        { required: true, message: '请输入题库名称' },
        { type: 'string', message: '请输入题库名称' },
      ]">
            <el-input v-model.number="numberValidateForm.age"
                      type="text"
                      autocomplete="off" />
          </el-form-item>
        </div>
        <el-form-item label="题库名称：">
          <el-radio-group v-model="radio">
            <el-radio :label="3">允许所有老师使用</el-radio>
            <el-radio :label="6">不允许任何老师使用</el-radio>
            <el-radio :label="9"
                      @click="dialogVisible1 = true">允许部分老师使用</el-radio>
            <!-- 创建试题库模块 -->
            <el-dialog v-model="dialogVisible1"
                       v-if="dialogVisible1"
                       :title="可见老师"
                       width="50%"
                       :before-close="handleClose">
              <Forth v-model="dialogVisible1"
                     @sub="sub"
                     v-if="dialogVisible1"
                     @isshow="isshow"
                     @limitss="limitss"
                     @valuesss='valuessss'></Forth>
            </el-dialog>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="bo">
            <el-button>取消</el-button>
            <el-button type="primary"
                       @click="submits" >确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script setup lang="ts">
import Forth from "../components/Test/Forth.vue";
import { ref, defineEmits } from "vue";
import { ShuttleAdd } from "../api/Test/Test";
import { ElMessage, ElMessageBox } from "element-plus";
const emit =defineEmits(["isadd"])

const dialogVisible1 = ref(false);
const radio = ref(3);
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定关闭吗?")
    .then(() => {
      done();
    })
    .catch(() => {});
};
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
const formRef = ref<FormInstance>();
const numberValidateForm = reactive({
  id: 0,
  title: "",
  isshow: 2,
  limits: [],
});

const submits = async () => {
  let res = await ShuttleAdd(numberValidateForm);
  console.log(res);
  if (res.errCode === 10000) {
    ElMessage({
      message: "添加成功",
      type: "success",
    });
emit('isadd',false)
  }
};
const isshow = (val: any) => {
  dialogVisible1.value = val;
};
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.TiMax {
  width: 100%;
  height: 300px;
  display: flex;
}
.TiAdd {
  width: 80%;
  height: 100px;
  margin-left: 30px;
}
.box {
  width: 320px;
}
.bo {
  width: 150px;
  margin-left: 270px;
  margin-top: 80px;
}
</style>