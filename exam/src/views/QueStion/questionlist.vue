<template>
  <div>
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"
          >《{{ top.title }}》试题列表</span
        >
      </template>
      <div>
        <el-button>添加试题</el-button>
        <el-button type="primary">批量添加试题</el-button>
      </div>
    </el-page-header>
    <div class="wen">
      <el-form-item label="题目名称:">
        <el-input v-model="data.key" />
      </el-form-item>
      <el-form-item label="创建人:" class="chuan">
        <el-input v-model="data.admin" />
      </el-form-item>
      <el-select v-model="data.type" class="m-2" placeholder="请选择" size="large" clearable >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
      </el-select>
      <el-button type="primary" @click="supes()">查询</el-button>
      <el-button type="danger" :disabled="show" @click="depls()">批量删除</el-button>
      <el-button plain  @click="addall">导出excel</el-button>
    </div>
    <div>
      <el-table ref="multipleTableRef" :data="lits" style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="题目名称" width="520">
          <template #default="scope">
            <span v-html="scope.row.title"  class="butle"></span> </template
        >
      </el-table-column>
        <el-table-column property="type" label="题量类型" width="220" />
        <el-table-column property="addtime" label="创建时间" width="220" />
        <el-table-column property="admin" label="创建人" width="220" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" > 编辑 </el-button>
            <el-button link type="primary" size="small" @click="del(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Qfenye :counts="total" @getChildData="getChildData"></Qfenye>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { databasequestion, datadelete,databdeleteall ,exportExcel} from '../../api/department';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ElMessage ,ElMessageBox} from 'element-plus'
import Qfenye from '../../components/FenYe/FenYe.vue'
const show = ref(true);
const route = useRoute();
const router = useRouter();
let databaseid = route.query.databaseid;
const data = reactive({
  databaseid: databaseid, //题库id
  psize: '',
  page: '',
  name: '',
  key:'', //关键字
  admin:'', //创建人
  type:'' //类型
});
onMounted(() => {
  list();
});
//导出excel 
const addall=async()=>{
  let res:any=await exportExcel({id:databaseid})
  let blob= new Blob([res], {type: 'application/vnd.ms-excel'});
    let url= URL.createObjectURL(blob);
    let a= document.createElement("a");
    a.href=url;
    a.style.display="none";
    document.body.appendChild(a);
    a.setAttribute("download",top.title);
    a.click();
    document.body.removeChild(a);
}
// 列表
const top: any = ref({});
const lits: any = ref([]);
const total=ref()
const list = async () => {
  let res = await databasequestion(data);
  console.log(res);
  top.value = res.data.database;
  lits.value = res.data.list;
  total.value=res.data.counts
};
// 返回
const goBack = () => {
  router.push('/databaselist');
};
// 删除
const del=async(id:any)=>{;
  let res:any=await datadelete({id:id})
  console.log(res);
  if(res.errCode===10000){
    ElMessage({
    message: '删除成功',
    type: 'success',
  })
  list()
  }
}
let lids:any=ref()
const handleSelectionChange = (val:any) => {
 lids.value=val.map((item:any)=>item.id)
show.value=false
}
// 批量删除
const depls=()=>{
  ElMessageBox.confirm(
    '此操作将永久删除选中的文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
  let ids=lids.value
  let res:any=await databdeleteall({ids:ids})
  if(res.errCode===10000){
    ElMessage({
        type: 'success',
        message: '删除成功',
      })
      list()
  }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      })
    })
  
}
// 查询
const supes=()=>{
  list()
}
// 类型
const options = [
  {
    value: '单选题',
    label: '单选题',
  },
  {
    value: '多选题',
    label: '多选题',
  },
  {
    value: '判断题',
    label: '判断题',
  },
  {
    value: '填空题',
    label: '填空题',
  },
  {
    value: '问答题',
    label: '问答题',
  },
]
// 分页
const getChildData=(val:any)=>{
  data.psize=val.psize
  data.page=val.page
  list()
}

</script>

<style scoped>
.el-page-header {
  display: flex;
  justify-content: space-between;
}
:deep(.el-input) {
  width: 200px;
}
.wen {
  display: flex;
}
.chuan {
  margin-left: 16px;
}
.el-button--primary {
  margin-left: 13px;
}
:deep(.el-input__wrapper){
  height: 31px;
  margin-left: 12px;
}
.butle {
  color: #409eff;
}
:deep(.el-pagination){
  margin-left: 320px;
    margin-top: 20px
}
</style>
