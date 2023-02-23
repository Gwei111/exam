<template>
<div>
  <el-config-provider :locale="zhCn">
    <el-pagination
      :page-sizes="[5, 10, 20, 30]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="counts"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ref, watch, watchEffect } from 'vue'
type Props = {
  counts?: number,
}
withDefaults(defineProps<Props>(), {
  counts: () => 0
})

const currentPage4 = ref(1)
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const emit = defineEmits(['getChildData'])
const handleSizeChange = (val: number) => {
  // console.log(`${val}`)
  emit('getChildData', { page: currentPage4.value, psize: val })
}
const handleCurrentChange = (val: number) => {
  // console.log(` ${val}`)
  emit('getChildData', { page: val, psize: pageSize4.value })

  
}
</script>

<style scope>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

</style>
