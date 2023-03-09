<template>
  <div class="head">
    <div class="inp">
      <div class="head_inp">
        <span>试卷名称：</span>
        <el-input v-model="numberValidateForm.key"
                  placeholder="请输入试卷名称" />
      </div>
      &emsp;
      <div class="head_inp">
        <span>创建人：</span>
        <el-input v-model="input"
                  placeholder="请输入创建人昵称" />
      </div>
      &emsp;&nbsp;
      <el-checkbox-group v-model="checked1">
        <el-checkbox label="只看我创建的" />
      </el-checkbox-group> &emsp;&nbsp;
      <el-button type="primary" @click="serch">查询</el-button>
    </div>
    <el-table ref="multipleTableRef"
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55" />
      <el-table-column property="title"
                       label="题库名称"
                       width="220" />
      <el-table-column property="blanks"
                       label="题目数量"
                       show-overflow-tooltip
                       width="300" />
      <el-table-column property="addtime"
                       label="创建时间"
                       show-overflow-tooltip
                       width="300" />
      <el-table-column property="admin"
                       label="创建人"
                       show-overflow-tooltip
                       width="300" />
    </el-table>
    <!-- 分页 -->
    <FenYe :counts="counts"
           @getChildData="getChildData"
           class="ye" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessageBox } from "element-plus";
import { ElTable } from "element-plus";
import { QueList } from "../../api/Test/Test";
import FenYe from "../../components/FenYe/FenYe.vue";
const input = ref("");
const checked1 = ref("");
const dialogVisible = ref(false);

interface User {
  date: string;
  name: string;
  address: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
const tableData: any= ref([]);
const numberValidateForm = reactive({
  key:"",
  page: "1",
  psize: "5",
});
// 查询
const serch=()=>{
  GetQueList()
}
const counts = ref(0);
// 请求数据列表接口
const GetQueList = async () => {
  let res:any = await QueList(numberValidateForm);
  console.log(res);
  if (res.errCode === 10000) {
    tableData.value=res.data.list
    counts.value = res.data.counts;
  }
};
GetQueList();

// 分页
const getChildData = (val: any) => {
  console.log(111, val);
  numberValidateForm.page = val.page;
  numberValidateForm.psize = val.psize;
  console.log(numberValidateForm.psize, numberValidateForm.page, 1234);

  GetQueList();
};
</script>

<style scoped>
@import url("../../assets/css/Test/Que.css");
</style>