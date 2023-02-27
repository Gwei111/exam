<template>
  <div class="TiMax">
    <div class="TiAdd">
      <el-form ref="formRef"
               :model="numberValidateForm"
               label-width="100px"
               class="demo-ruleForm">
     <div class="box">
          <el-form-item label="题库名称："
                      prop="age"
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
            <el-radio :label="9">允许部分老师使用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

const dialogVisible2 = ref(false);
const radio = ref(3);
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  age: "",
});
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
.box{
width: 320px;

}
</style>