<template>
    <div>
      <el-drawer
        v-model="props.addTestShow"
        size="50%"
        :title="'试题详情'"
        :before-close="drawerClose"
      >
  
      <!-- 内容 -->
      <div class="exam_question">
  
        <!-- 单选题 -->
        <div v-if="props.updArr.type=='单选题'">
            <!-- 头部 -->
            <div class="bodyContest">
              <div class="types">
                {{props.updArr.type}}
              </div>
              <div class="scores">
                分值 ：{{props.updArr.scores}}
              </div>
            </div>
            <!-- 内容 -->
            <div class="ti" v-html="props.updArr.title"></div> <!--题干-->
            
            <div :class="props.updArr.answer == props.updArr.answerno ? 'xuanItem yes' : 'xuanItem'"
             v-for="item in props.updArr.answers">
              <div class="radio" />
              <div>{{ item.answerno }}:&nbsp;{{ item.content }}</div>
            </div>
        </div>
  
        <!-- 多选题 -->
        <div v-if="props.updArr.type=='多选题'">
            <!-- 头部 -->
            <div class="bodyContest">
              <div class="types">
                {{props.updArr.type}}
              </div>
              <div class="scores">
                分值 ：{{props.updArr.scores}}
              </div>
            </div>
            <!-- 内容 -->
            <div class="ti" v-html="props.updArr.title"></div> <!--题干-->
            
            <div :class="props.updArr.answer.includes(props.updArr.answerno)? 'xuanItem yes' : 'xuanItem'"
            v-for="item in props.updArr.answers">
              <div class="check" />
              <div>{{ item.answerno }}:&nbsp;{{item.content }}</div>
            </div>
        </div>
  
        <!-- 判断题 -->
        <div  v-if="props.updArr.type=='判断题'">
          <!-- 头部 -->
          <div class="bodyContest">
            <div class="types">
              {{props.updArr.type}}
            </div>
          <div class="scores">
              分值 ：{{props.updArr.scores}}
          </div>
        </div>
        <!-- 内容 -->
        <div style="padding: 0 15px;">
          <div class="titleContent" v-html="props.updArr.title" />
            <div class="yesanalysis">
              正确答案: &nbsp; {{props.updArr.answer}}
            </div>
          </div>
        </div>
  
        <!-- 填空题 -->
        <div v-if="props.updArr.type=='填空题'">
            <!-- 头部 -->
            <div class="bodyContest">
              <div class="types">
                {{props.updArr.type}}
              </div>
              <div class="scores">
                分值 ：{{props.updArr.scores}}
              </div>
            </div>
            <!-- 内容 -->
            <div class="ti" v-html="props.updArr.title"></div> <!--题干-->
            
            <div class="ifs">
              <span> 正确答案： </span>
              <span>{{ props.updArr.answer }}</span>
            </div>
            <div class="analysis">
              <span> 答案解析： </span>
              <span>{{ props.updArr.explains }}</span>
            </div>
  
        </div>
  
        <!-- 问答题 -->
        <div v-if="props.updArr.type=='问答题'">
            <!-- 头部 -->
            <div class="bodyContest">
              <div class="types">
                {{props.updArr.type}}
              </div>
              <div class="scores">
                分值 ：{{props.updArr.scores}}
              </div>
            </div>
            <!-- 内容 -->
            <div class="ti" v-html="props.updArr.title"></div> <!--题干-->
  
            <div class="analysis">
              <span> 答案解析： </span>
              <span>{{ props.updArr.explains }}</span>
            </div>
  
        </div>
  
      </div>
      
      
      </el-drawer>
    </div>
  </template>
  <script lang="ts" setup>
  import {reactive,ref,shallowRef,onBeforeUnmount,onMounted} from 'vue'
  
  const props = defineProps(['addTestShow', 'updArr']); //父向子传值
  console.log(props);
  const emit = defineEmits(['drawerClose']);  //子向父传值
  const drawerClose = () => {
    emit('drawerClose', false);
  };
  
  
  </script>
  <style lang="less" scoped>
  :deep(.el-drawer__header) {
    margin: 0;
  }
  
  .scoll {
    overflow-y: scroll;
    scroll-behavior: smooth;
    overscroll-behavior: contain; //必须加这个，不然会带动整个屏幕滚动，如果整屏幕也有滚动的话
    max-height: 98%;
  }
  
  .icon{
    font-size: 20px;
    color: red;
    margin-left: 5px;
  }
  .radio{
    position: relative;
    top:-7px;
  }
  .gap{
    display: flex;
    flex-direction: column
  }
  
  .exam_question {
    .xuanItem {
      display: flex;
      margin: 10px 0;
  
      .radio {
        border: 1px solid #e7f0ed;
        height: 20px;
        width: 20px;
        border-radius: 15px;
        background-color: #f5f5f5;
        margin-left: 15px;
        margin-right: 9px;
        margin-top: 6px;
      }
  
      .check {
        border: 1px solid #e7f0ed;
        height: 20px;
        width: 20px;
        border-radius: 3px;
        background-color: #f5f5f5;
        margin-left: 15px;
        margin-right: 9px;
        margin-top: 6px;
      }
    }
  
    .yes {
      width: 100%;
      background-color: #eefaf6;
    }
  }
  
  .bodyContest{
    display: flex;
    .scores{
      margin-left: 10px;
    }
  }
  
  .ti{
    margin-left: 20px;
    margin-top: 10px;
  }
  .ifs {
    width: 98%;
    height: 40px;
    background-color: #eefaf6;
    line-height: 40px;
    margin-top: 15px;
    color: #5acda6;
    padding: 0 10px;
  }
  
  .analysis {
    width: 98%;
    height: 40px;
    background-color: #f5faff;
    line-height: 40px;
    margin-top: 15px;
    color: #d0d6db;
    padding: 0 10px;
  }
  </style>
  