<template>
  <div class="head">
    <h3>试卷管理</h3>
    <el-button type="primary"
               @click="add">创建试卷</el-button>
  </div>

  <div class="ip">
    <el-form :model="numberValidateForm"
             class="demo-ruleForm">
      <el-form-item label="关键字"
                    prop="key">
        <el-input v-model.string="numberValidateForm.key"
                  placeholder="考试名称"
                  type="text"
                  autocomplete="off" />
      </el-form-item>&emsp;
      <el-form-item label="创建人"
                    prop="admin">
        <el-input v-model.number="numberValidateForm.admin"
                  placeholder="创建人"
                  type="text"
                  autocomplete="off" />
      </el-form-item>&emsp;
      <el-form-item>
        <el-checkbox id="fon"
                     v-model="checked1"
                     label="只看我创建的"
                     size="large" />
      </el-form-item>&emsp;
      <el-button type="primary"
                 class="t"
                 @click="search">查询</el-button>
    </el-form>
    <el-table :data="tableData"
              :header-cell-style="{background:'#fafafa'}"
              style="width: 100%">
      <el-table-column prop="title"
                       label="试卷名称">
        <template #default="scope">
          <span class="Blue"
                @click="testDetails(scope.row.id)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="counts"
                       label="题量" />
      <el-table-column prop="blanks"
                       label="单选" />
      <el-table-column prop="databaseid"
                       label="多选" />
      <el-table-column prop="judges"
                       label="判断" />
      <el-table-column prop="qas"
                       label="填空" />
      <el-table-column prop="multiples"
                       label="问答  " />
      <el-table-column prop="scores"
                       width="70"
                       label="总分" />
      <el-table-column prop="admin"
                       label="创建人" />
      <el-table-column label="操作"
                       width="150px">
        <template #default="scope">
          <el-button type="primary"
                     link
                     @click="upd(scope.row.id)">编辑</el-button>&emsp;&nbsp;|
          <el-button type="primary"
                     link
                     @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <FenYe @getChildData="getChildData"
           :counts="counts"></FenYe>
    <!-- 点击试卷名称弹出框 -->
    <TestDetails v-model="Detailsdialog"
                 v-if="Detailsdialog"
                 :subjectsID="subjectsID "></TestDetails>
  </div>
</template>

<script setup lang="ts">
const checked1 = ref(false);
import { reactive, ref } from "vue";
import { FormInstance, ElMessage, ElMessageBox } from "element-plus";
import { Text_List, Text_del } from "../../api/Test/Test";
import TestDetails from "../../components/Test/TestDetails.vue";
import FenYe from "../../components/FenYe/FenYe.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const counts = ref(0);
const formRef = ref<FormInstance>();
const Detailsdialog = ref(false);
const numberValidateForm = reactive({
  key: "",
  page: "1",
  psize: "10",
  admin: "",
});
// 试卷页面列表展示
const tableData = ref([]);
const subjectsID = ref();
const GetText_List = async () => {
  let res = await Text_List(numberValidateForm);
  if (res.errCode === 10000) {
    tableData.value = res.data.list;
    counts.value = res.data.counts;
  }
};
GetText_List();
// 查询
const search = () => {
  GetText_List();
};
//  点击试卷名称详情
const testDetails = (id) => {
  subjectsID.value = id;
  Detailsdialog.value = true;
};
// 分页
const getChildData = (val: any) => {
  numberValidateForm.page = val.page;
  numberValidateForm.psize = val.psize;
  GetText_List();
};
// 删除
const del = async (id: number) => {
  ElMessageBox.confirm("您确定要删除这条数据吗?", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const params = {
        id: id,
      };
      const res: any = await Text_del(params);
      if (res.errCode === 10000) {
        GetText_List();
      }
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
// 添加跳转
const add = () => {
  router.push("/AddText");
};
const upd = (id: any) => {
  router.push({
    path: "/AddText",
    query: {
      id,
    },
  });
};
</script>

<style scoped>
@import url("../../assets/css/Test/Test.css");
h3{
  font-weight: normal;
}
</style>