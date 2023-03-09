<template>
    <div>
        <el-dialog :model-value="props.testlisttionBool" :title="props.title+'&nbsp;试题列表'" width="80%"
            :before-close="testlistClose">
  
            <!-- form表单 -->
            <el-form label-width="70px" size="small">
  
              <el-space wrap>
  
                <!-- 题库名称 -->
                <el-form-item label="题库名称">
                  <el-input v-model="data.key" />
                </el-form-item>  
  
                <!-- 题目类型 -->
                <el-form-item label="题目类型">
                  <el-select v-model="workclass" clearable placeholder="Select">
                    <el-option v-for="item in options" />
                  </el-select>
                </el-form-item>
  
                <!-- 查询按钮 -->
                <el-form-item label="" label-width="20px">
                    <el-button type="primary" @click="cha">查询</el-button>
                </el-form-item>
  
              </el-space>
  
            </el-form>
  
            <!-- 表格 -->
            <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="bankArr" size="small"
              style="width: 100%">
              <el-table-column type="selection" width="55" />
              <el-table-column label="题目" width="780">
                <template #default="scope">
                  <div class="borders">
                    <p v-html="scope.row.title" @click="particulars(scope.row)"></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column property="type" label="题目类型" width="120" />
              <el-table-column property="scores" label="分数" />
            </el-table>
  
            <!-- 分页 -->
          <!-- 分页 -->
          <div class="fenye">
            <paging :total="totals" @getChildData='getChildData'></paging>
          </div>
  
            <!-- 详情抽屉 -->
            <DetailsofTopic :addTestShow="addTestShow" :updArr="updArr" @drawerClose="drawerClose"></DetailsofTopic>
  
            <!-- 按钮 -->
            <template #footer>
                  <div style=" display: flex; justify-content: space-between; justify-content: flex-end;">
                      <div>
                          <span class="dialog-footer">
                              <el-button @click="testlistCancel">取消</el-button>
                              <el-button type="primary" @click="testlistConfirm">确定</el-button>
                          </span>
                      </div>
                  </div>
              </template>
  
        </el-dialog>
    </div>
  </template>
  <script lang='ts' setup>
  import { ref, toRefs, onMounted, onUpdated, onUnmounted, reactive, watchEffect, provide, inject } from 'vue'
  import { ElTable } from 'element-plus'
  import { Close } from '@element-plus/icons-vue'
  import DetailsofTopic from './questdeatils.vue'
  import paging from '../FenYe/FenYe.vue'
  import { databasequestion_list } from "../../api/test"; //接口
  
  const props = defineProps(['testlisttionBool', 'id', 'title'])
  const emit = defineEmits(['testlistClose', 'testlistConfirm', 'testlistCancel'])
  
  const testlistClose = () => {   // 差号
      emit('testlistClose', false)
  }
  
  
  // 题目下拉框
  let options = ref([])
  // 题目下拉框当前选中的
  let workclass = ref('')
  
  
  // 表格数据
  let bankArr = ref([])
  
  let data =reactive({ //参数
    databaseid:props.id,
    page:1,
    psize:10,
    key:'',
    tags:'', //标签
    type:'',//类型
    admin:'',//创建人
  })
  
  let totals:any = ref(0)  // 一共多少条数据
  
  let getdatabasequestion_list = async() => {
    let res = await databasequestion_list(data)
    console.log(res);
    bankArr.value = res.data.list
  
    totals.value = res.data.counts
  }
  getdatabasequestion_list()
  
  // 分页
  const getChildData = (val:any) => {
    console.log(111, val)
    data.page = val.page
    data.psize = val.psize
    getdatabasequestion_list()
  }
  
  
  // 点击查询
  let cha = () => {
    getdatabasequestion_list()
  }
  
  
  // 点击左侧多选框获取数据
  let quanto = ref(0) //多少道题
  
  let questions = ref([]) //数据
  
  let handleSelectionChange = (val:any) => {
    quanto.value = val.length //多少道题
    questions.value=val       //数据
    // console.log(val);
  }
  
  const infotwo: any = inject('infotwo') //孙子把数据传给爷爷
  
  const testlistConfirm = () => { //确定按钮
      infotwo.value = questions.value //点击确定的时候把数据传过去
      emit('testlistConfirm', false)
  }
  
  const testlistCancel = () => {  //取消按钮
      emit('testlistCancel', false)
  }
  
  
  // 点击题目 弹出详情框 --------------------------------------------------
  let addTestShow = ref(false) //弹窗默认关闭
  let updArr:any = ref([]) //赋值的
  
  let particulars = (val:any) => {
    console.log(val);
    addTestShow.value = true //弹窗打开
  
    updArr.value = val //数据
  }
  
  // 差号关闭
  let drawerClose = (val:any) => {
    addTestShow.value = val
  }
  
  
  </script>
  <style lang="less" scoped>
    .borders{
      p{
        color: #409EFF;
        cursor:pointer;
      }
    }
    .fenye{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  </style>