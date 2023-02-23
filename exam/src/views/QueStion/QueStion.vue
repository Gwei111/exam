<template>
  <div class="top">
    <h3>题库管理</h3>
    <el-button type="primary" @click="clasAdd">创建题库</el-button>
  </div>
  <div class="ku">
    <el-form-item label="题库名称 :" clearable>
      <el-input v-model="data.key" placeholder="请输入题库命名称" />
    </el-form-item>
    <el-form-item label="创建人:" style="margin-left: 10px">
      <el-input v-model="form.name" placeholder="请输入创建人" />
    </el-form-item>
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="只看我创建的" name="type" />
    </el-checkbox-group>
    <el-button type="primary" @click="inquire()">查询</el-button>
    <el-button type="danger" @click="delass()">批量删除</el-button>
  </div>
  <div>
    <el-table
      ref="multipleTableRef"
      :data="tableData.arr"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ background: '#eee' }"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="title" label="题库" width="320">
        <template #default="scope">
          <span class="butle">
            {{ scope.row.title }}
          </span>
        </template>
      </el-table-column>
      <el-table-column property="counts" label="题量数目" width="250" />
      <el-table-column property="addtime" label="创建时间 " width="250" />
      <el-table-column property="admin" label="创建人" width="250" />
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button link type="primary" size="small"> 试题 </el-button>
          <el-button link type="primary" size="small" @click="updata(scope.row)"> 编辑 </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="del(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <FenYe @getChildData="getChildData" :counts="counts"> </FenYe>
  </div>
  <el-dialog v-model="dialogVisible" :title="textle===true ? '题库添加' : '题库修改'"  v-if="dialogVisible">  
    <Queston :upAata="upAata.data"  @emitShow="emitShow"></Queston>
  </el-dialog>
 
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox, ElTable } from 'element-plus';
import { databaselist, databasedelete, deleteall } from '../../api/department';
import FenYe from '../../components/FenYe/FenYe.vue';
import Queston from '../../components/question.vue'
const form = reactive({
  name: '',
  type: [],
});
// 隐藏
const emitShow=(e:boolean)=>{
  dialogVisible.value = e;
  list()
}
// 分页
const getChildData = (val: any) => {
  data.page = val.page;
  data.psize = val.psize;
  list();
};
// 删除
const del = (val: any) => {
  ElMessageBox.confirm('是否删除', '提示', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(async () => {
      let res: any = await databasedelete({ id: val });
      console.log(res);
      if (res.errCode === 10000) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
        list();
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      });
    });
};
const handleSelectionChange = (val: any) => {
  data.ids = val.map((item: any) => item.id);
  // console.log(data.ids);
};
// 批量删除
const delass = () => {
  ElMessageBox.confirm('是否批量删除', '提示', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(async () => {
      let _ids: any = data.ids;
      // console.log(_ids);
      let res: any = await deleteall({ _ids });
      // console.log(res);
      if (res.errCode === 10000) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
        list();
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      });
    });
};
onMounted(() => {
  list();
});

const data = reactive({
  page: 1,
  psize: '',
  key: '',
  ids: '',
});
const counts = ref();
// 列表
const tableData = reactive({ arr: [] });
const list = async () => {
  let res = await databaselist(data);
  // console.log(res);
  tableData.arr = res.data.list;
  counts.value = res.data.counts;
};
// 查询
const inquire = () => {
  list();
};

// 提示
const textle=ref(true)
const dialogVisible=ref(false)
const clasAdd = (val:string) => {
  // console.log(val);
  dialogVisible.value = true;
  textle.value=true
  list()
};
// 编辑
const upAata:any= reactive({data:{}});
const updata=(val:any)=>{
  upAata.data = val;
  console.log(  upAata.data );
  
  dialogVisible.value = true;  
  textle.value=false
  list()
}
</script>

<style scoped>
.top{
  display: flex;
  justify-content: space-between;
}
:deep(.el-button--primary){
  margin-left: 1215px;
}
.ku {
  display: flex;
  margin-top: 10px;
}
:deep(.el-input__wrapper) {
  width: 140px;
}
.el-button--primary {
  margin-left: 10px;
}
.butle {
  color: #409eff;
}
:deep(.el-pagination) {
  margin-top: 20px;
  margin-left: 420px;
}
:deep(.el-checkbox__inner){
  margin-left: 20px;
}
</style>
