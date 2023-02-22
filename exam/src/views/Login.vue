<template>
    <div class="background_box">
      <el-card class="box-card">
        <div class="Login_item_box">
          <div class="QRimg" @click="qiehuan"> <!--点击切换登录方式-->
            <img src="../assets/pc.png" alt="" v-show="!biaodan" />
            <img class="pc" src="../assets/pass.png" alt="" v-show="biaodan" />
          </div>
          <div class="titleBox">
            <div class="imgbox">
              <img src="http://edu.90000p.com/exam/cyx/assets/log.6449415e.png" alt="" />
            </div>
            <div class="logTitle">
              <p class="titleOne">考试系统</p>
            </div>
          </div>
  
          <div class="item_input" v-show='!biaodan'>
            <div class="center_item_input">
              <el-form ref="ruleFormRef" :model="data123" :rules="rules" label-width="0" class="demo-ruleForm"
                size="default" status-icon>
                <el-form-item>
                  <el-input v-model="data123.username" placeholder="用户名" />
                </el-form-item>
  
                <el-form-item style="margin-top: 25px">
                  <el-input v-model="data123.pass" type="password" placeholder="密码" show-password />
                </el-form-item>
  
                <el-form-item>
                  <el-button @click="debounce(loginClick,300)" type="primary" class="Login_but">登录</el-button>
                </el-form-item>
              </el-form>
              <div class="Forgot_pass">忘记密码</div>
            </div>
          </div>
  
          <!-- 二维码登录 -->
          <div class="erwema" v-show="biaodan">
            <img src="http://edu.90000p.com/exam/cyx/assets/big_er.a666c6a8.jpg" alt="">
            
            <div class="soao">使用<span style="color: blue;">微信</span>扫一扫进行登录</div>
          </div>
  
        </div>
      </el-card>
    </div>
  </template>
  <script lang='ts' setup>
  import { ref, toRefs, onMounted, onUpdated, onUnmounted, reactive, watchEffect } from 'vue'
  import { ElMessage, FormInstance, FormRules } from 'element-plus'
  import { checklogin } from '../api/login'
  
  import store from '../store/index';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  
  let biaodan:any = ref(false)  //默认为账号密码登录
  
  let qiehuan = () => { // 点击变为二维码登录
    if(biaodan===false){
      biaodan.value = false
    }else{
      biaodan.value = !biaodan.value
    }
  }
  
  
  const rules = reactive<FormRules>({
    account: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    pwd: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
  })
  
  
  
  
  
  // 登录
  
  // 防抖
  let timer:any | null = null
  let debounce = (fn:Function, delay: number) => {
    // console.log(timer);
    if(timer) clearTimeout(timer)
      timer = setTimeout(()=>{
        fn()
      },delay)
  }
  
  
  let data123:any = reactive({  //参数
    username: "",
    pass: "",
    menu: []
  })
  
  let loginClick = async () => {
    let res: any = await checklogin(data123)
    console.log(res);
    if (res.errCode === 10000) {
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('name', res.data.model.username)
      sessionStorage.setItem('studentid', res.data.model.id)
      data123.menu = res.data.menu.filter((item: any) => item.pid === 0)  //过滤 只要左侧菜单栏的数据
      sessionStorage.setItem('data', JSON.stringify(data123.menu))  //左侧菜单栏数据
      store.commit('getMenu', data123.menu)     //左侧菜单栏数据 存到vuex里
      router.push(data123.menu[0].url)   //跳转页面
      ElMessage({
        message: '登陆成功',
        type: 'success',
      })
    } else if (res.errCode === 10300) {
      ElMessage({
        message: res.errMsg,
        type: 'error',
      })
    }
  }
  </script>
  <style lang="less" scoped>
  .background_box {
    position: relative;
    width: 100%;
    height: 100vh;
  
    .box-card {
      width: 477px;
      height: 569px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgb(255, 255, 255);
      margin: auto;
    }
  
    .Login_item_box {
      position: relative;
  
      .QRimg {
        position: absolute;
        top: 59px;
        right: -16px;
        img{
          width: 80px;
          height: 80px;
        }
      }
  
      .titleBox {
        // display: flex;
        // justify-content: center;
        margin-top: 80px;
        margin-bottom: 15px;
        margin-left: 160px;
  
        .imgbox {
          width: 80px;
          height: 70px;
          margin-left: 10px;
  
          img {
            width: 100%;
            height: 100%;
            // margin-top: 23px;
          }
        }
  
        .logTitle {
          margin-top: 3px;
          // margin-left: 10px;
  
          .titleOne {
            font-size: 25px;
            color: #3296fe;
            font-weight: bold;
          }
  
          .titleTwo {
            font-size: 14px;
            color: #6f6f6f;
          }
        }
      }
    }
  
    .erwema{
      margin-left: 122px;
      img{
        width: 180px;
        height: 180px;
      }
      .soao{
        margin-top: 60px;
      }
    }
    .pc{
      width: 80px;
      height: 80px;
    }
  
    .item_input {
      display: flex;
      justify-content: center;
      margin-top: 55px;
  
      .center_item_input {
        width: 313px;
  
        .Login_but {
          width: 100%;
          padding: 19px 0;
        }
  
        .Forgot_pass {
          float: right;
          color: #3296fe;
        }
      }
    }
  
  }
  
  /deep/ .el-input__wrapper {
    background-color: #dddcdc;
  }
  
  /deep/ .el-form-item.is-error .el-input__wrapper {
    box-shadow: 0 0 0 0
  }
  
  /deep/ .el-form-item--feedback .el-input__validateIcon {
    display: none;
  }
  </style>
  