<template>
  <div>
    <el-dialog :model-value="Detailsdialog"
               title="Tips"
               width="30%"
               :before-close="handleClose">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineEmits } from "vue";
import { ElMessageBox } from "element-plus";

const dialogVisible = ref(false);
const emits = defineEmits(["update:modelValue"]);
const prop = defineProps({
  Detailsid: Number,
  subjectsID: Number,
});
const data: any = reactive({
  Detailsdialog: true,
  id: prop.Detailsid,
  sid: prop.subjectsID,
});

const { Detailsdialog, id, model, sid } = toRefs(data);
const handleClose = () => {
  emits("update:modelValue", false);
};
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>