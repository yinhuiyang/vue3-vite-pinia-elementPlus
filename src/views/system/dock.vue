<template>
  <div class="duck">
    <div class="serach">
      <el-input v-model="input" placeholder="关键字搜索" />
      <el-select class="ml20" v-model="value" clearable placeholder="状态">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button class="ml20" type="primary">搜索</el-button>
      <el-button @click="dialogVisible = true" class="fr" type="primary">新增</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%;margin-top: 25px;">
      <el-table-column prop="name" label="系统名称" />
      <el-table-column prop="name" label="状态" />
      <el-table-column prop="region" label="系统标识" />
      <el-table-column prop="desc" label="秘钥" />
      <el-table-column prop="count" label="系统URL前缀" />
      <el-table-column prop="date1" label="系统URL首页" />
      <el-table-column prop="date" label="更新时间" />
      <el-table-column label="操作">
        <!-- <template slot-scope="scope"> -->
        <el-button @click="dialogVisible = true" size="small" type="info" plain>编辑</el-button>
        <el-button size="small" type="info" plain>禁用</el-button>
        <!-- </template> -->
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="新增" width="30%" align-center>
      <el-form 
        ref="ruleFormRef" 
        :model="ruleForm" 
        :rules="rules" 
        label-width="120px" 
        class="demo-ruleForm" 
        status-icon
      >
        <el-form-item label="系统名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="系统标识" prop="region">
          <el-input v-model="ruleForm.region" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="系统URL前缀" prop="count">
          <el-input v-model="ruleForm.count" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="系统首页url" prop="date1">
          <el-input v-model="ruleForm.date1" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="秘钥" prop="desc">
          <el-input v-model="ruleForm.desc" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
  
<script setup>
import { reactive, ref } from 'vue'

const input = ref('')
const value = ref('')

const options = [
  {
    value: 'Option1',
    label: '全部',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const tableData = [
  {
    date: '2016-05-03',
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

const dialogVisible = ref(false)

const ruleForm = reactive({
  name: '',
  region: '',
  count: '',
  date1: '',
  desc: '',
})
const rules = ({
  name: [
    { required: true, message: '请填写系统名称', trigger: 'blur' },
  ],
  region: [{ required: true,message: '请填写系统标识',trigger: 'blur' }],
  count: [
    { required: true,message: '请填写系统url前缀',trigger: 'blur' },
  ],
  date1: [
    { required: true,message: '请填写系统首页url',trigger: 'blur' },
  ],
  desc: [
    { required: true, message: '请填写秘钥', trigger: 'blur' },
  ],
})
const ruleFormRef = ref(null)
const submitForm = () => {
  if (ruleFormRef) {
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        tableData.push(ruleFormRef.value)
        console.log(tableData);
        dialogVisible.value = false
      }
    })
  }
}
</script>
  
<style lang="scss" scoped>
.dock {
  .ml20 {
    margin-left: 20px;
  }

}
</style>