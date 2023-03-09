<template>
    <div>
        <el-dialog :model-value="props.questdialog" title="题库列表" width="80%" :before-close="queshandleClose">
  
  
          <!-- form表单 -->
          <el-form label-width="70px" size="small">
  
            <el-space wrap>
  
              <!-- 题库名称 -->
              <el-form-item label="题库名称">
                <el-input v-model="data.key" />
              </el-form-item>   
            
              <!-- 创建人 -->
              <el-form-item label="创建人">
                <el-input v-model="data.admin" />
              </el-form-item> 
              
              <!-- 只看我创建的 -->
              <el-form-item label="" label-width="20px">
                <el-checkbox v-model="data.ismy" label="只看我创建的" size="large" />
              </el-form-item>
  
              <!-- 查询按钮 -->
              <el-form-item label="" label-width="20px">
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
  
            </el-space>
  
          </el-form>
  
          <!-- 表格 -->
          <el-table ref="multipleTableRef" :data="bankArr" size="small" style="width: 100%">
  
            <el-table-column label="题库名称" show-overflow-tooltip>
              <template #default="scope">
                <el-radio-group v-model="radio" class="ml-4" @change="radchange(scope.row.title)">
                  <el-radio :label="scope.row.id">{{scope.row.title}}</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
  
            <el-table-column property="counts" label="题目数量" width="120" />
            <el-table-column property="addtime" label="创建时间" />
            <el-table-column property="admin" label="创建人" />
          </el-table>
  
  
          <!-- 分页 -->
          <div class="fenye">
            <paging :total="totals" @getChildData='getChildData'></paging>
          </div>
  
  
          <!-- 按钮 -->
          <template #footer>
              <div style="display: flex; justify-content: space-between; justify-content: flex-end;">
                  <div>
                    <span class="dialog-footer">
                      <el-button @click="quesCancel">取消</el-button>
                        <el-button type="primary" @click="quesConfirm">确定</el-button>
                    </span>
                  </div>
              </div>
          </template>
  
        </el-dialog>
  
  
        <!-- 点击左侧单选按钮再确定弹出窗  试题列表 -->
        <TestList :testlisttionBool="testlisttionBool" v-if="testlisttionBool==true" :id="radio" :title="title" @testlistClose="testlistClose" @testlistCancel="testlistCancel" @testlistConfirm="testlistConfirm"></TestList>
  
  
    </div>
  </template>
  <script lang='ts' setup>
  import { ref, toRefs, onMounted, onUpdated, onUnmounted, reactive, watchEffect } from 'vue'
  import { ElTable } from 'element-plus'
  import { baseList } from "../../api/test"; //接口
  import paging from '../FenYe/FenYe.vue' //分页
  import TestList from '../exam/testlist.vue'
  
  const props: any = defineProps(['questdialog'])  // 父向子
  const emit = defineEmits(['queshandleClose', 'quesConfirm', 'quesCancel'])  //子向父
  
  const queshandleClose = () => { //差号
      emit('queshandleClose', false)
  }
  
  
  // 表格数据
  let bankArr = ref([]) //赋值的
  
  let totals:any = ref(0)  // 一共多少条数据
  
  let data = reactive({  //参数
    page: 1,
    psize: 10,
    key:'',
    admin:'', //创建人
    ismy:1 //只看我创建的
  })
  
  let getdatabase = async () => {
    let res = await baseList(data)
    console.log(res);
    bankArr.value = res.data.list // 数据赋值
  
    totals.value = res.data.counts
  
  }
  getdatabase()
  
  
  // 分页
  const getChildData = (val:any) => {
    console.log(111, val)
    data.page = val.page
    data.psize = val.psize
    getdatabase()
  }
  
  
  // 点击按钮查询
  let search = () => { 
    getdatabase()
  }
  
  
  // 左侧的单选按钮
  let radio = ref(0)
  
  
  // 点击左侧单选按钮获取到标题
  let title = ref('') //标题
  const radchange = (val: string) => {
      // console.log(val);
      title.value = val
  }
  
  
  // show等于1时弹出框 -------------------------------------------------- 点击左侧单选按钮再确定弹出窗
  let show = ref(0)
  let testlisttionBool = ref(false) //弹窗默认关闭
  
  watchEffect(() => {// show等于1时弹出框
      if (show.value == 1) {
          testlisttionBool.value = true
      }
  })
  
  const quesConfirm = () => { //确定按钮
      show.value=1  // show等于1时弹出框 
      emit('quesConfirm', false,)
  }
  
  const quesCancel = () => { //取消按钮
      emit('quesCancel', false)
  }
  
  // 点击差号关闭弹窗
  let testlistClose = (val:any) => {
    show.value=0  // show等于0时关闭弹出框 
    testlisttionBool.value = val
  }
  
  // 取消按钮
  let testlistCancel = (val:any) => {
    show.value=0  // show等于0时关闭弹出框 
    testlisttionBool.value = val
  }
  // 确定按钮
  let testlistConfirm = (val:any) => {
    show.value=0  // show等于0时关闭弹出框 
    testlisttionBool.value = val
  }
  
  
  
  
  </script>
  <style lang="less" scoped>
  .scoll {
    overflow-y: scroll;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
    height: 510px;
    max-height: 550px;
    width: 100%;
  }
  
  :deep(.el-dialog) {
    margin: 10px auto;
    overflow: hidden;
  }
  
  .fenye{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  </style>