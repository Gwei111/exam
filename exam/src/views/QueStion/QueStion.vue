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
          <span class="butle" @click="questions(scope.row.id)">
            {{ scope.row.title }}
          </span>
        </template>
      </el-table-column>
      <el-table-column property="counts" label="题量数目" width="250" />
      <el-table-column property="addtime" label="创建时间 " width="250" />
      <el-table-column property="admin" label="创建人" width="250" />
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="questions(scope.row.id)"> 试题 </el-button>
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
  <el-dialog  v-model="dialogVisible" :title="textle===true ? '题库添加' : '题库修改'"  v-if="dialogVisible">  
    <Queston  :upAata="upAata.data"  @emitShow="emitShow"></Queston>
  </el-dialog>
 
</template>

<script setup lang="ts">
import { reactive, ref, onMounted,toRaw } from 'vue';
import { ElMessage, ElMessageBox, ElTable } from 'element-plus';
import { databaselist, databasedelete, deleteall } from '../../api/department';
import FenYe from '../../components/FenYe/FenYe.vue';
import Queston from '../../components/question.vue'
import { useRouter } from "vue-router";
const router = useRouter();
const form = reactive({
  name: '',
  type: [],
});
// 隐藏
const emitShow=(e:boolean)=>{
  dialogVisible.value = e;
  list()
}
const data = reactive({
  page: 1,
  psize: 10,
  key: '',
});
onMounted(() => {
  list();
});
// 列表
const counts = ref();
const tableData = reactive({ arr: [] });
const list = async () => {
  let res = await databaselist(data);
  tableData.arr = res.data.list;
  counts.value = res.data.counts;
};
// 试题
const questions=(val:any)=>{
  router.push({path:"/questionlist",query:{databaseid:val}});
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
        list();
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      });
    });
};
const id_s=ref()
const handleSelectionChange = (val: any) => {
  id_s.value = val.map((item: any) => item.id);
};
// 批量删除
const delass =() => {
  ElMessageBox.confirm('是否批量删除', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      // 将对象转为普通对象
      // console.log(toRaw(data));
      let ids: any =  id_s.value
      let res: any = await deleteall({ids:ids});
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


// 查询
const inquire = () => {
  list();
};
// 提示
const textle=ref(true)
const dialogVisible=ref(false)
const clasAdd = (val:string) => {
  dialogVisible.value = true;
  textle.value=true
  upAata.data ={}
  list()
};
// 编辑
const upAata:any= reactive({data:{}});
const updata=(val:any)=>{
  upAata.data = val;
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
