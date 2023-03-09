<template>
  <div>
    阅卷
  </div>
  <div class="box"
       style="width:350px;margin-left:-30px;margin-top:10px">
    <el-form ref="formRef"
             :model="numberValidateForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="关键字："
                    prop="key">
        <el-input v-model.number="numberValidateForm.key"
                  placeholder="请输入题库名称"
                  type="text"
                  autocomplete="off" />
      </el-form-item>
    </el-form>
    &emsp;<el-button type="primary"
               @click="seach">查询</el-button>
  </div>
  <el-table :data="tableData"
            style="width: 100%">
    <el-table-column prop="title"
                     label="试卷名称"
                     width="180" />
    <el-table-column prop="info"
                     label="试卷说明"
                     width="180" />
    <el-table-column prop="subjectnum"
                     label="题量"
                     width="180" />
    <el-table-column prop="studentcounts"
                     label="考试人数"
                     width="180" />
    <el-table-column prop="isread"
                     label="未判人数"
                     width="180">
                     <template #default="scope">
                              
                     </template>
    </el-table-column>
    <el-table-column prop="addtime"
                     label="开放时间"
                     width="180" />
    <el-table-column label="操作"
                     width="180">
      <template #default="scope">
   
        <el-button link
                   type="primary"
                   @click="questions(scope.row.id)">
                     {{scope.row.state==1?"阅卷" :"查看"}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 使用分页组件 -->
  <FenYe :counts="counts"
         @getChildData="getChildData" />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// 导入分页组件
import FenYe from "../../components/FenYe/FenYe.vue";
import type { FormInstance } from "element-plus";
import { List } from "../../api/ExamPapers/Exam";
import { useRouter } from "vue-router";
const router = useRouter();
const formRef = ref<FormInstance>();
const numberValidateForm = reactive({
  isread: "1",
  key: "",
});
const tableData = ref([]);
const counts = ref(0);
const GetList = async () => {
  let res = await List(numberValidateForm);
  console.log(res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list;
    // Object.assign(tableData, res.data.list);
    counts.value = res.data.counts;
    console.log(tableData.value);
  }
};
GetList();
// 点击阅卷跳转
const questions = (id: any) => {
  console.log(id);

  router.push({ path: "/examinationA", query: { id: id } });
};
// 分页
const getChildData = (val: any) => {
  numberValidateForm.page = val.page;
  numberValidateForm.psize = val.psize;
  GetList();
};
// 查询
const seach = () => {
  GetList();
};
</script>

<style scoped>
@import url("../../assets/css/Exam/ExamPapers");
</style>