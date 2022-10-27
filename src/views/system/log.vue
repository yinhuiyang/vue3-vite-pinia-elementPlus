<template>
  <div class="log">
    <div class="serach">
      <el-input v-model="input" placeholder="操作人" />
      <el-form
        :model="sizeForm"
        label-width="auto"
        label-position="left"
        class="ml20"
      >
        <el-form-item label="操作时间">
          <el-date-picker
            v-model="sizeForm.date1"
            style="width:160px"
            type="date"
            placeholder="年/月/日"
            :disabled-date="startTimes"
          />
          <span class="zhi">至</span>
          <el-date-picker
            v-model="sizeForm.date2"
            style="width:150px"
            type="date"
            placeholder="年/月/日"
            :disabled-date="endTimes"
          />
        </el-form-item>
      </el-form>
      <el-button class="ml20" type="primary">搜索</el-button>
      <el-button class="fr" type="primary">导出</el-button>
    </div>

    <el-table 
      :data="tableData" 
      style="width: 100%;margin-top: 25px;"
    >
      <el-table-column prop="num" label="序号" />
      <el-table-column prop="name" label="操作模块" />
      <el-table-column prop="name" label="操作人" />
      <el-table-column prop="region" label="操作时间" />
      <el-table-column prop="desc" label="操作内容" />
      <el-table-column prop="count" label="状态" />
      <el-table-column prop="date1" label="日志详情">
        <span class="look" @click="centerDialogVisible = true">查看</span>
      </el-table-column>
    </el-table>

    <el-dialog 
      v-model="centerDialogVisible" 
      title="日志详情" 
      width="30%" 
      align-center
    >
      <el-form 
        ref="ruleFormRef" 
        :model="ruleForm" 
        label-width="120px" 
        class="demo-ruleForm" 
        status-icon
      >
        <el-form-item label="IP" prop="name">
          {{ 1 }}
        </el-form-item>
        <el-form-item label="IP来源描述" prop="region">
          {{ 2 }}
        </el-form-item>
        <el-form-item label="请求方法" prop="count">
          {{ 3 }}
        </el-form-item>
        <el-form-item label="请求参数" prop="date1">
          {{ 4 }}
        </el-form-item>
        <el-form-item label="发送报文" prop="desc">
          {{ 5 }}
        </el-form-item>
        <el-form-item label="响应报文" prop="desc">
          {{ 6 }}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import moment from 'moment'

const input = ref('')

const tableData = [
  {
    date: '2016-05-03',
    num : '1',
    name: 'Tom',
    region: 'Tom1',
    count: 'Toms',
    date1: 'Tomm',
    desc: 'No. 189,',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    region: 'Tom1',
    count: 'Toms',
    date1: 'Tomm',
    desc: 'No. 189,',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    region: 'Tom1',
    count: 'Toms',
    date1: 'Tomm',
    desc: 'No. 189,',
  },
]

const centerDialogVisible = ref(false)

const date1 = ref('')
const sizeForm = reactive({
  date1: '',
  date2: '',
})
const ruleForm = reactive({
  name: '',
  region: '',
  count: '',
  date1: '',
  desc: '',
})
const ruleFormRef = ref(null)

const endTimes = (val) => {
    if (sizeForm.date1) {
      if (val < moment(sizeForm.date1)) {
        return true
      } else {
        return false
      }
    } else {
        return false
      }
  }
const startTimes = (val) => {
    if (sizeForm.date2) {
      if (val < moment(sizeForm.date2)) {
        return true
      } else {
        return false
      }
    } else {
        return false
      }
  }

</script>
  
<style lang="scss" scoped>
.log {
  .serach{
    display: flex;
    width: 100%;
    .zhi{
      margin: 0 5px;
    }
  }
  .ml20 {
    margin-left: 20px;
  }
  .fr{
    position: absolute;
    right: 0;
  }
  .look{
    color: #409eff;
    cursor: pointer;
  }
}
</style>