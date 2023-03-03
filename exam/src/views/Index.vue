<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside style="background-color: #ebebeb;">

           <!-- 鼠标移入 弹出框 -->
          <div class="headeImg" @mouseover="userState">
            <el-avatar :size="40"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F16%2F04191726703546.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671774725&t=e067c5b9c6bd6656a09f8952e56238bb" />
          </div>

          <div class="Item">
            <div
              :style="item.url == hrefs ? 'background-color: #d1d3d5; padding: 6px 15px;border-radius: 3px;' : 'padding: 6px 15px;'"
              v-for="item in name" :key="item.id" style="margin-bottom: 15px;" @click="routers(item.url)">

              <!-- 字体图标 -->
              <div
                :style="item.url == hrefs ? 'margin: 0 auto;color: #3889ff;' : 'margin: 0 auto;color: #727e96;'"
                :class="'icon iconfont ' + item.ico">
              </div>

              <!-- 文字 -->
              <div
                :style="item.url == hrefs ? 'color: #3889ff;text-align: center;margin: 0 auto;font-size: 14px;' : 'text-align: center;margin: 0 auto;font-size: 14px;'"
                style="margin-left: -1px;">
                {{ item.name }}
              </div>

            </div>
            <!-- <div v-for="item in name" :key="item.id">
              {{item.name}}
            </div> -->
          </div>

        </el-aside>

        <div class="scoll">
          <el-main>
            <router-view />   <!--右边 数据-->
          </el-main>
        </div>
      </el-container>

      <!-- 弹窗 mouseleave鼠标移出 -->
      <el-card class="box-card" v-show="userBool" @mouseleave="userFalse">
        <div class="headeBack">
          <el-avatar :size="50"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F16%2F04191726703546.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671774725&t=e067c5b9c6bd6656a09f8952e56238bb"
            class="headerImg" />
        </div>
        <div class="userName">
          {{username}}
        </div>
        <div class="butBox">
          <el-button style="width: 100%;" @click="retreat_login">退出登录</el-button>
        </div>
        
        <div class="borderBox" />

        <div class="bottom">
          <div class="item">
            <div class="left">
              <div>
                <el-icon style="margin-top:3px ;">
                  <User />
                </el-icon>
              </div>
              <div>
                账号
              </div>
            </div>
            <div class="rightaccount">
              {{username}}
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="left">
              <div>
                <el-icon style="margin-top:3px ;">
                  <Lock />
                </el-icon>
              </div>
              <div>
                密码
              </div>
            </div>
            <div class="rightaccount word">
              设置
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="left">
              <div>
                <el-icon style="margin-top:3px ;">
                  <ChatDotRound />
                </el-icon>
              </div>
              <div>
                微信
              </div>
            </div>
            <div class="rightaccount word">
              未绑定
            </div>
          </div>
        </div>
      </el-card>

    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  ref,
  toRefs,
  onMounted,
  onUpdated,
  reactive,
} from 'vue';
// import store from '../../store/index';
import { User, Lock, ChatDotRound } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter();

// 左侧列表数据
let name: any = JSON.parse(sessionStorage.getItem("data") as any)
// console.log(name);

let username = sessionStorage.getItem("name")  // 账号名字
// console.log(username);


const data = reactive<any>({
  menu: [],           //vuex的左侧列表数据
  userBool: false,  // 弹窗
  hrefs: ''         //url
});
const { menu, userBool, hrefs } = toRefs(data);
// menu.value = store.state.menu;

// 跳转页面
const routers = (url: any) => {
  // console.log(url);
  router.push(url);
  hrefs.value = url
  // console.log(hrefs.value);
};

// 鼠标移入
const userState = () => {
  userBool.value = true   //移入
}
const userFalse = () => {
  userBool.value = false  //移除
  console.log(userBool.value);
}

// 点击退出登录
const retreat_login = () => {
  sessionStorage.removeItem('token')
  router.push('/')
}

</script>


<style lang="less" scoped>
.common-layout {
  .headeImg {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    margin-bottom: 30px;
margin-left: 15px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .Item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

:deep(.el-aside){
  height: 100vh;
  width: var(--el-aside-width);
  padding: 8px 10px;
}

.scoll {
  overflow-y: scroll;
  scroll-behavior: smooth;
  overscroll-behavior: contain; //必须加这个，不然会带动整个屏幕滚动，如果整屏幕也有滚动的话
  height: 100vh;
  width: 100%;
}

.box-card {
  position: absolute;
  top: 34px;
  left: 50px;
  height: 300px;
  width: 250px;
  z-index: 3;

  .headeBack {
    height: 60px;
    width: 100%;
    background-color: #dee1e6;
    display: flex;
    justify-content: center;

    .headerImg {
      margin-top: 32px;
      border: 2px solid white;
    }
  }

  .userName {
    width: 100px;
    margin: 27px auto;
    margin-bottom: 15px;
    text-align: center;
  }

  .butBox {
    padding: 0 5px;
  }

  .bottom {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10px;

      .left {
        display: flex;
      }

      .rightaccount {
        font-size: 14px;
      }

      .word {
        color: #409eff;
      }
    }
  }
}

:deep(.el-card__body) {
  padding: 0;
}

.demo-basic {
  text-align: center;
}

.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.demo-basic .block {
  flex: 1;
}

.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.common-layout {
  position: relative;
}

.common-layout .headeImg[data-v-0d58c4e5] {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin-bottom: 30px;
  margin: 23px auto;
}
:deep(.icon){
    content: "\e602";
    margin-left: 5px;

::-webkit-scrollbar {
width: 0 !important;
}
::-webkit-scrollbar {
width: 0 !important;height: 0;
}
.icon-kaoshi_moren2x:before {
    content: "\e602";
    font-size: 28px;
}
.icon-shenpishenhe:before {
    content: "\e633";
        font-size: 28px;
}
.icon-wenben:before {
    content: "\e600";
      font-size: 26px;
}
.icon-changjianwenti:before {
    content: "\e6c8";
    font-size: 26px;
}
.icon-a-1kehudanweitaizhang:before {
    content: "\e628";
      font-size: 26px;
}
.icon-qiyeguanli_yuangongguanli:before {
    content: "\e62c";
          font-size: 26px;
}
.icon-banji:before {
    content: "\e608";
      font-size: 26px;
      // margin-left: 10px;
}
.icon-bumen:before {
    content: "\e758";
    font-size: 26px;
}
.icon-wutouxiang:before {
    content: "\e63c";
     font-size: 26px;
}
}
.iconfont {
  font-size: 28px;
}
</style>
