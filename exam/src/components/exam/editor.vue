<template>
    <!-- 富文本 -->
    <div class="mgb20" ref="editorRef"></div>
</template>
<script setup>
import WangEditor from 'wangeditor'
import http from '@/api'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const editorRef = ref(null)
onMounted(() => {
  editor = new WangEditor(editorRef.value)
  editor.config.zIndex = 1
  // 设置编辑区域高度为 500px
  instance.config.height = 300
  // 自己实现上传图片
  // 如果想完全自己实现图片上传的过程，如上传图片到某个云服务器，可以使用如下代码。
  editor.config.customUploadImg = function (resultFiles, insertImgFn) {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法

    // 上传图片，返回结果，将图片插入到编辑器中
    insertImgFn(imgUrl)
  }
  // 注意，先配置 height ，再执行 create()
  editor.create()
})
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  editor.destroy()
  editor= null
})
// 获取富文本的内容
// editor.txt.html()
</script>
