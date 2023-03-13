<template>
    <div class="testPaperBody">
        <el-drawer v-model="drawer" :close-on-click-modal="false" :title="datas.checkedData.name + '的试卷'"
            :with-header="true" :before-close="handleClose" style="width: 50%">
            <div class="body">
                <el-form ref="ruleFormRef" :model="data" label-width="65px" class="demo-ruleForm" size="default" status-icon
                    :scroll-to-error="true">
                    <div class="box">
                        <!-- 循环的每道题 -->
                        <div class="list" v-for="(item, index) in ruleForm" :key="item.id">
                            <p>
                                {{ index + 1 }}、{{ item.type }}
                                <span>分值：{{ item.scores }}</span>
                            </p>
                            <div class="answer">
                                <p style="display: flex;" v-html="rep(item.title, index)"></p>
                            </div>
                            <p style="font-size: 14px" v-if="item.type === '问答题'">
                                回答：
                            </p>
                            <div class="answer" v-if="item.type === '问答题'">
                                {{ item.studentanswer }}
                            </div>
                            <div class="isNum">
                                <!-- 打分 -->
                                <el-form-item label="打分" :rules="getRules(item.scores)"
                                    :prop="'ruleForm[' + index + '].studentscores'">
                                    <div class="num">
                                        <el-input type="number" v-model="item.studentscores" />
                                    </div>
                                </el-form-item>
                                <!-- 批注 -->
                                <el-form-item label="批注" prop="comments">
                                    <div class="conent">
                                        <el-input v-model="item.comments" :rows="2" maxlength="300" show-word-limit
                                            type="textarea" />
                                    </div>
                                </el-form-item>
                            </div>
                            <div class="solid"></div>
                        </div>
                    </div>
                    <el-form-item label-width="10px">
                        <el-button type="primary" @click="submitForm(ruleFormRef)">阅卷完毕</el-button>
                        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, toRefs, ref, provide, inject, nextTick } from "vue";
import { getListforstu, postStudentanswerUpdate } from "../../api/Test/Test";
import { ElTable, ElMessage } from "element-plus";
const data: any = reactive({
    drawer: false,
    ruleForm: [],
    ruleFormRef: "",
});
const { drawer, ruleForm, ruleFormRef } = toRefs(data);
//父里面的数据
const datas: any = inject("data");
// 分数表单验证方法
const getRules = (maxvalue: any) => {
    return [
        { required: true, message: "请输入分数", trigger: "blur" },
        { validator: checkscores, max: maxvalue, min: 0, trigger: "blur" },
    ];
};
const checkscores = (rule: any, value: any, callback: any) => {
    let max = parseFloat(rule.max);
    let min = parseFloat(rule.min);
    if (isNaN(Number(value))) {
        callback(new Error("请输入数字"));
    } else if (parseFloat(value) > max || parseFloat(value) < min) {
        callback(new Error("分数不能大于" + max + "和不能小于" + min));
    } else {
        callback();
    }
};
// 点击x关闭
const handleClose = () => {
    datas.isOpen = false;
};
// 请求学生考试试题
const listforstu = async (testid: number, studentid: number) => {
    const res: any = await getListforstu(testid, studentid);
    if (res.errCode === 10000) {
        data.ruleForm = res.data.list;
        console.log(data.ruleForm);

        // 获取填空题空位的dom
        nextTick(() => {
            const boxDom: any = document.querySelectorAll(".boxs");
            boxDom.forEach((item: any) => {
                var _index = item.getAttribute("data-index");
                document
                    .querySelectorAll(".boxs" + _index)
                    .forEach((ite: any, index: number) => {
                        ite.innerHTML =
                            data.ruleForm[_index].studentanswer.split("|")[index];
                    });
            });
        });
    } else {
        ElMessage.error(res.errMsg);
    }
};
// 是否打开弹出框
data.drawer = datas.isOpen;
if (datas.isOpen) {
    // 获取列表数据
    listforstu(datas.params.testid, datas.checkedData.id);
}
// 替换方法
const rep = (str: string, index: number) => {
    return str.replace(/\[\]/g, `<div style="min-width:50px;height:18px;border-bottom: 1px solid #999;padding:0 10px;margin:0 1px" data-index=${index} class="boxs boxs${index}"></div>`);
};
// 请求判卷接口
const studentanswerUpdate = async (params: any) => {
    const res: any = await postStudentanswerUpdate(params);
    if (res.errCode === 10000) {
        ElMessage.success("您已经判完卷了");
    } else {
        ElMessage.error(res.errMsg);
    }
};
// 点击确定批卷
const submitForm = async (formEl: any) => {
    if (!formEl) return;
    await formEl.validate((valid: any, fields: any) => {
        if (valid) {
            const params: any = [];
            data.ruleForm.forEach((item: any, index: number) => {
                params.push({
                    answerid: item.answerid,
                    scores: item.studentscores,
                    comments: item.comments,
                });
            });
            studentanswerUpdate(params);
            datas.isOpen = false;
            // console.log(data.ruleForm);
        } else {
            var obj: any = Object.keys(fields);
            formEl.scrollToField(obj[0], true);
        }
    });
};
// 点击取消
const resetForm = (formEl: any) => {
    if (!formEl) return;
    formEl.resetFields();
    datas.isOpen = false;
};
</script>
  
<style lang="less" scoped>
.testPaperBody {
    width: 100%;
}

.testPaperBody ::v-deep .el-drawer.rtl {
    width: 50% !important;
}

.testPaperBody .body {
    width: 100%;
}

.testPaperBody .body .box .list {
    margin-bottom: 30px;
}

.testPaperBody .body .box .list p span {
    color: #c7c2b1;
    font-size: 14px;
    margin-left: 16px;
}

.testPaperBody .body .box .list .answer {
    padding: 15px 0 30px;
    font-size: 14px;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
}

.testPaperBody .body .box .list .isNum {
    width: 100%;
    padding: 15px 0 15px;
    background-color: #fafafa;
}

.testPaperBody .body .box .list .isNum .num {
    width: 80px;
}

.testPaperBody .body .box .list .isNum .conent {
    width: 450px;
}

.testPaperBody .body .box .list .solid {
    width: 100%;
    height: 0.5px;
    background-color: #f1f1f1;
    margin-top: 20px;
}
</style>
  