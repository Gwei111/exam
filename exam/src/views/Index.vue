<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <el-row class="tac">
        <el-col :span="12">
          <el-menu active-text-color="blue"
                   background-color="#ececec"
                   class="el-menu-vertical-demo"
                   default-active="2"
                   text-color="black"
                   @open="handleOpen"
                   @close="handleClose"
                   router>
            <el-menu-item index="1">
              <div class="HeadImg">

              </div>

            </el-menu-item>
            <el-menu-item index="/index/ExamInation">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>考试</span>
            </el-menu-item>
            <el-menu-item index="/index/ExamPapers">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>阅卷</span>
            </el-menu-item>
            <el-menu-item index="/Index/Test">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>试卷</span>
            </el-menu-item>
            <el-menu-item index="/Index/QueStion">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>题库</span>
            </el-menu-item>
            <el-menu-item index="/Index/DePartMent">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>部门</span>
            </el-menu-item> 
            <el-menu-item index="/Index/TeaChers">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>师资</span>
            </el-menu-item>
            <el-menu-item index="/Index/Class">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>班级</span>
            </el-menu-item>
            <el-menu-item index="/Index/StuDent">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>学员</span>
            </el-menu-item>
            <el-menu-item index="/Index/Role">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>角色</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

</script>

<style scoped>
#max_box {
  width: 98px;
  height: 100vh;
}
.el-col-12 {
  max-width: 100%;
  flex: 0 0 50%;
}
.el-menu {
  height: 100vh;
}
.HeadImg {
  width: 55px;
  height: 55px;
background-color: gray;
border-radius: 30px;
}

.el-aside{
width: 96px;
height: 100vh;

}
::-webkit-scrollbar {
width: 0 !important;
}
::-webkit-scrollbar {
width: 0 !important;height: 0;
}

</style>