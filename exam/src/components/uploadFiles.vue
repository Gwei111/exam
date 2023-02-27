<template>
  <div>
    <el-dialog :model-value="Updatadialog"
               title="批量导入试题"
               width="35%"
               :before-close="handleClose">
      <div>
        <div class="item">
          <p>下载<span @click="download"
                  style="cursor:pointer">试题模板</span>，批量导入试题</p>
          <p class="p2">注:从其他Excel或Word复制试题时请使用选择性粘贴 Word:右键一选择性粘贴-文本，Excel:右键一选择性粘贴一只勾选 “值”</p>
          <div id="sp">上传填写好的试题表</div>
          <div class="yuan"><span>1</span></div>
          <div class="yuan2"><span>2</span></div>
        </div>
        <div style="padding:20px 0 0 20px;">
          <el-upload class="upload-demo"
                     :action="props.UrL"
                     :limit="1"
                     name="file"
                     :headers="Authorization"
                     :show-file-list="false"
                     :on-success="updateFile"
                     :before-upload="beforeAvatarUpload">
            <el-button type="primary">点击上传文件</el-button>
          </el-upload>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose"
                     class="btn">取消</el-button>
          <el-button type="primary"
                     @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang='ts' setup>
import { reactive, toRefs, defineEmits, defineProps } from "vue";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { HtmlUtil } from "../utils/HtmlUtil";
const emits = defineEmits(["update:modelValue", "updataFile"]);
const props = defineProps({
  UrL: String,
});

const Authorization = { Authorization: sessionStorage.getItem("token") };
const data: any = reactive({
  Updatadialog: true,
  info: [],
});

const { Updatadialog } = toRefs(data);
const updateFile = (e: any) => {
  if (e.errCode == "10000") {
    let arr = [];
    arr = e.data;
    //
    data.info = arr.map((item: any) => ({
      ...item,
      title: HtmlUtil.htmlEncodeByRegExp(item.title),
    }));
    ElMessage.success("上传成功");
  }
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  console.log(rawFile);

  if (
    rawFile.type !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    ElMessage.error("只能上传excel或xlsx文件");
    return false;
  }
  return true;
};
const download = () => {
  let a = document.createElement("a");
  console.log(a); 
  a.style.display = "none";
  a.href = "http://estate.eshareedu.cn/exam/upload/question.xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const handleClose = () => {
  emits("update:modelValue", false);
};
const submit = () => {
  emits("updataFile", data.info);
  // 打印出那个文件夹中的所有数据
  console.log(data.info);

  emits("update:modelValue", false);
};
</script>
<style scoped lang="less">
.item {
  width: 80%;
  height: 100px;
  border-left: 4px solid rgb(220, 223, 230);
  position: relative;

  p {
    margin-left: 20px;

    span {
      font-size: 17px;
      color: #409eff;
      margin: 0 5px 0 5px;
    }
  }

  .p2 {
    font-size: 8px;
    color: #f00;
    margin-top: 10px;
  }
  span {
    margin-left: 20px;
  }

  .yuan {
    width: 20px;
    height: 20px;
    border: 2px solid rgb(220, 223, 230);
    display: flex;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: -14px;
    background-color: #fff;

    span {
      color: rgb(220, 223, 230);
      font-weight: bold;
      margin-left: 30%;
    }
  }

  .yuan2 {
    width: 20px;
    height: 20px;
    border: 2px solid rgb(220, 223, 230);
    display: flex;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    bottom: -6px;
    left: -14px;
    background-color: #fff;

    span {
      color: rgb(220, 223, 230);
      font-weight: bold;
      margin-left: 30%;
    }
  }
}

#sp {
  margin-left: 20px;
  margin-top: 8px;
}

.btn {
  margin-right: 10px;
}
</style>