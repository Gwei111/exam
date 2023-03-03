<template>
    <div class="box">
        <div class="top">
            <h3>考试管理</h3>
            <div>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="关键字">
                        <el-input v-model="query.key" placeholder="请输入关键字" />
                    </el-form-item>
                    <el-form-item label="状态" style="width: 140px;">
                        <el-select placeholder="请选择">
                            <el-option v-for="item in data.result" :key="item" :value="item">{{ item }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </div>
        <div class="main">
            <ul>
                <li v-for="item in list" :key="item.id" class="li">
                    <div class="liTop">
                        <img v-if="item.result == '未通过'" src="../../assets/images/didNotPass.dc717b15.jpg" alt="" srcset="">
                        <img v-if="item.result == '未考试'" src="../../assets/images/notInvolved.69f5f7c2.jpg" alt="" srcset="">
                        <img v-if="item.result == '待阅卷'" src="../../assets/images/wait.4d1f79c9.jpg" alt="" srcset="">
                        <img v-if="item.result == '已通过'" src="../../assets/images/yes.8b1bd2e5.jpg" alt="" srcset="">
                        <div class="title">
                            <span>{{ item.title }}</span>
                        </div>
                    </div>
                    <div class="time">
                        <span>考试时间：{{ item.begintime == null ? '不限' : item.begintime + "至" + item.endtime }}</span>
                        <span>{{ item.pastnum }}人通过</span>
                    </div>
                </li>
               
            </ul>
                    <!-- <el-empty :image-size="200" v-if="list.length<0" /> -->
        </div>
        <div class="foot">
            <FenYe :counts="counts" @getChildData="getChildData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref,toRefs } from 'vue';
import { testList } from '../../api/test'
import FenYe from "../../components/FenYe/FenYe.vue"

onMounted(() => {
    getList()
})
const data: any = reactive({

    admin: '',
    opentime: '',
    begindate: '',
    enddate: '',
    state: "",
    isread: "",
    result: ['所有', '未考试', '待阅卷', '已通过', '未通过'],
    query: {
        page: 1,
        psize: 12,
        key: '',
    }
})
const {query} = toRefs(data)
const counts = ref(0);
const list: any = ref([])
const getList = async () => {
    const res = await testList(data.query)
    console.log(res);
    list.value = res.data.list
    counts.value = res.data.counts
}

// 分页
const getChildData = (val: any) => {
    //   console.log(111, val)
    //   data.page= val.page;
    //   data.psize = val.psize;
    query.value.page = val.page
    query.value.psize = val.psize
    // console.log(data.psize, data.page, 1234);

    getList();
};
// 查询
const search = () => {
    getList()

}
</script>

<style scoped lang="less">
ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}

.top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5%;

    h3 {
        font-weight: normal;
    }

    div {
        display: flex;
    }
}

.demo-form-inline {
    display: flex;
}

.li {
    cursor: pointer;
    width: 30%;
    background-color: #fafbff6a;
    border: #ebebeb 1px solid;
    border-radius: 5px;
    padding: 10px 10px 20px;
    margin-top: 20px;
    margin-left: 17px;

    .liTop {
        display: flex;

        img {
            width: 130px;
            height: 74px;
        }

        .title {
            width: 60%;
            padding: 10px;
            height: 33px;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;

        }
    }

    .time {
        margin-top: 10px;
        font-size: 12px;
        color: #aaabad;
        display: flex;
        justify-content: space-between;
    }
}
</style>