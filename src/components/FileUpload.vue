<template>
  <el-upload
    ref="upload"
    v-model:file-list="fileList"
    v-loading="abortLoading"
    :limit="limit"
    :disabled="disabled"
    class="upload-file"
    multiple
    :http-request="handleUpload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-change="handleProgress"
    :before-remove="beforeRemove"
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
  >
    <el-button type="primary" :size="btnSize">{{ btnName }}</el-button>
    <div class="dinb">
      <template v-if="visibleProcess">
        <div
          v-for="item in processList"
          v-show="processList.length"
          :key="item.UploadId"
          class="processDiv"
        >
          <span class="ml5">{{ item.processPoint + "%" }}</span>
          <i class="el-icon-delete tabelAbortIcon" @click="abortUpload(item)" />
        </div>
      </template>
    </div>
    <template #tip>
      <div>
        <div class="el-upload__tip dinb" v-if="tip">{{ tip }}</div>
        <div v-else class="el-upload__tip dinb">
          {{ `最多上传${limit}个文件，单个文件最大不超过${fileSize}M` }}
        </div>
        <el-popover placement="top-start" title="" width="230" trigger="click">
          <ul class="tipUl">
            <li
              v-for="(item, index) in allowedType"
              :key="index"
              class="tipItem"
            >
              {{ item + "：" + allowedOption[item] }}
            </li>
          </ul>
          <template #reference>
            <span class="yellow curp">支持格式</span>
          </template>
        </el-popover>
      </div>
    </template>
  </el-upload>
  <template v-if="visibleProcess">
    <div
      v-for="item in processList"
      v-show="processList.length && showProgress"
      :key="item.UploadId"
      class="processDiv"
    >
      <span>{{ item.name }}</span>
      <el-progress :percentage="item.processPoint" />
      <i class="el-icon-delete abortUploadIcon" @click="abortUpload(item)" />
    </div>
  </template>
</template>
<script setup>
import { ref, defineProps, toRefs, defineEmits, defineExpose } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getFileKey } from "@/utils/oss";
import { userStore } from "@/store/user";
// 使用pinia
const useUserStore = userStore();

// 父子组件传值
const emit = defineEmits(["updateFileList"]);

const props = defineProps({
  btnName: {
    // 上传按钮名称
    type: String,
    default: "上传",
  },
  btnSize: {
    // 上传按钮大小
    type: String,
    default: "",
  },
  limit: {
    // 上传数量
    type: Number,
    default: 3,
  },
  tip: {
    // 上传提示语句
    type: String,
    default: "",
  },
  fileSize: {
    // 文件限制大小，默认1M
    type: Number,
    default: 1,
  },
  // 允许上传的后缀名，使用此参数将忽略allowedType
  allowedExtension: {
    type: Array,
    default: function () {
      return [];
    },
  },
  allowedType: {
    // 允许上传的文件类型，后缀名
    type: Array,
    default: function () {
      return [];
    },
  },
  id: {
    // 单文件ID
    type: [String, Number],
    default: undefined,
  },
  ids: {
    // 多文件ID
    type: Array,
    default: function () {
      return [];
    },
  },
  showProgress: {
    // 是否显示进度条
    type: Boolean,
    default: true,
  },
  disabled: {
    // 是否可以上传
    type: Boolean,
    default: false,
  },
});

const {
  btnName,
  btnSize,
  limit,
  tip,
  fileSize,
  allowedType,
  allowedExtension,
  id,
  ids,
  disabled,
  showProgress,
} = toRefs(props);
const fileList = ref([]);

const allowedOption = {
  img: [".jpg", ".png", ".jpeg"],
  word: [".doc", ".docx"],
  pdf: [".pdf"],
  excel: [".xls", ".xlsx"],
  ppt: [".ppt", " .pptx"],
  txt: [".txt"],
  movie: [".avi", ".rmvb", ".mp4", ".rm", ".mov"],
  压缩包: [".zip", ".rar"],
  zip: [".zip", ".rar"],
};
// 文件类型检查
const checkType = (fileName) => {
  const seat = fileName.lastIndexOf(".");
  if (seat > 200) {
    ElMessage({
      message: `文件名过长，请少于200个字符`,
      type: "warning",
    });
    return false;
  }
  const extension = fileName.substring(seat).toLowerCase();
  if (allowedExtension.value.length === 0 && allowedType.value.length === 0) {
    return true;
  }
  let allowed = [];
  if (allowedExtension.value.length > 0) {
    allowed = [...allowedExtension.value];
  }
  if (allowedExtension.value.length === 0 && allowedType.value.length > 0) {
    allowedType.value.forEach((type) => {
      allowed.push(...allowedOption.value[type]);
    });
  }
  for (var i = 0; i < allowed.length; i++) {
    if (!(allowed[i] !== extension)) {
      return true;
    }
  }
  ElMessage({
    message: "请上传正确格式的文件！",
    type: "warning",
  });
  return false;
};
// 文件大小检查
const checkSize = (size) => {
  const handelFileSize = fileSize.value * 1024 * 1024;
  if (size > handelFileSize || size <= 0) {
    ElMessage({
      message: `上传文件需大于0M,不超过${handelFileSize / 1024 / 1024}M`,
      type: "warning",
    });
    return false;
  }
  return true;
};

let loading = ref(false); // 上传按钮加载状态
let visibleProcess = ref(false); // 进度条是否展示
let processPoint = ref(0); // 进度条进度
let currentCheckpoint = ref(""); // 当前进度点
let processList = ref([]); // 进度列表
let abortLoading = ref(false);
let abortUploadId = ref("");
const handleUpload = (data) => {
  if (!checkSize(data.file.size) || !checkType(data.file.name)) {
    return false;
  }
  loading = true;
  const fileData = data.file;
  try {
    const oldTime = new Date().getTime();
    const objectkey = `${getFileKey()}${fileData.name}`;
    const data = {
      Bucket: import.meta.env.VITE_APP_OOS_BUCKETNAME,
      Key: objectkey,
    };
    useUserStore.client.createMultipartUpload(data, async (err, data) => {
      if (!err) {
        // 1.文件信息 2.分片id 3.桶名称 4.上传文件key 5.上传时的时间用来计算上传总时长
        sliceFile(fileData, data.UploadId, data.Bucket, data.Key, oldTime);
      } else {
        ElMessage({
          message: "文件上传失败",
          type: "error",
        });
      }
    });
  } catch (error) {
    loading = false;
    if (error.name === "cancel") {
      ElMessage({
        message: "已取消上传",
        type: "warning",
      });
      return;
    }
    ElMessage({
      message: error,
      type: "warning",
    });
  }
};
// 天翼云文件分片
const sliceFile = (fileData, UploadId, Bucket, Key, oldTime) => {
  let count = 0;
  const chunkSize = 2097152 * 5; // 将文件按固定大小（10M）进行切片
  const chunkList = []; // 保存所有切片的数组
  const chunkListLength = Math.ceil(fileData.size / chunkSize); // 计算总共多个切片
  let curChunk = 0; // 切片时的初始位置
  for (let i = 0; i < chunkListLength; i++) {
    const item = {
      chunk: fileData.slice(curChunk, curChunk + chunkSize),
      fileName: Key, // 文件命名key值
      PartNumber: i + 1, // 分片文件唯一标识
    };
    curChunk += chunkSize;
    chunkList.push(item);
    count++;
    if (count === chunkListLength) {
      uploadPart(chunkList, fileData, UploadId, Bucket, Key, oldTime);
    }
  }
};
// 天翼云分片上传
const uploadPart = (chunkList, fileData, UploadId, Bucket, Key, oldTime) => {
  processList.value.push({
    name: fileData.name,
    UploadId: UploadId,
    Key: Key,
    Bucket: Bucket,
    processPoint: 0,
  });
  const len = chunkList.length;
  let count = len;
  const MultipartUpload = { Parts: [] };
  const fileType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  chunkList.forEach((item, index) => {
    visibleProcess = true;
    MultipartUpload.Parts.push({ PartNumber: item.PartNumber });
    const file = new window.File([item.chunk], item.fileName, {
      type: fileType,
    });
    const params = {
      Body: file,
      UploadId: UploadId,
      Bucket: Bucket,
      Key: Key,
      PartNumber: item.PartNumber,
    };
    useUserStore.client.uploadPart(params, (err, data) => {
      if (err) {
        ElMessage({
          message: "上传失败",
          type: "error",
        });
      } else {
        processList.value = processList.value.map((item) => {
          if (item.UploadId === UploadId) {
            item.processPoint = Math.ceil(((len - count) / len) * 100);
          }
          return item;
        });
        count--;
        if (count === 0 && abortUploadId !== UploadId) {
          completeMultipartUpload(
            MultipartUpload,
            oldTime,
            UploadId,
            Bucket,
            Key,
            fileData.name
          );
        }
      }
    });
  });
};
// 完成分片上传
const completeMultipartUpload = (
  MultipartUpload,
  oldTime,
  UploadId,
  Bucket,
  ossFileKey,
  ossFileName
) => {
  const params = {
    UploadId: UploadId,
    Bucket: Bucket,
    Key: ossFileKey,
    MultipartUpload: MultipartUpload,
  };
  useUserStore.client.completeMultipartUpload(params, (err) => {
    if (!err) {
      handlerUploadData(oldTime, ossFileKey, ossFileName);
    }
  });
};
const handlerUploadData = async (oldTime, ossFileKey, ossFileName) => {
  const ossData = {
    ossFileKey,
    ossFileName,
    name: ossFileName,
  };
  // jstcc内接口 注册成功之前没有token
  ossData.id = 3;
  fileList.value.push(ossData);
  fileList.value = fileList.value.filter((item) => {
    return item.ossFileKey;
  });
  const newTime = new Date().getTime();
  let timeMinu = (newTime - oldTime) / 1000;
  if (timeMinu > 60) {
    timeMinu = `${(timeMinu / 60).toFixed(0)}分${(timeMinu % 60).toFixed(0)}`;
  }
  ElMessage({
    message: `上传成功!共耗时 ${timeMinu} 秒`,
    type: "success",
  });
  emit("updateFileList", fileList.value);
  loading = false;
  processList.value = processList.value.filter((item) => {
    return item.Key !== ossFileKey;
  });
};
// 取消上传
const abortUpload = (val) => {
  loading = false;
  if (val) {
    abortLoading = true;
    abortUploadId = val.UploadId;
    processList.value = processList.value.filter((item) => {
      return item.UploadId !== val.UploadId;
    });
    const params = {
      Bucket: val.Bucket,
      Key: val.Key,
      UploadId: val.UploadId,
    };
    useUserStore.client.abortMultipartUpload(params, (err, data) => {
      abortLoading = false;
      if (err) {
        ElMessage({
          message: "文件取消上传失败",
          type: "error",
        });
      }
    });
  }
};
const handleRemove = (file, uploadFiles) => {
  processList.value = processList.value.filter((item) => {
    return item.Key !== file.ossFileKey;
  });
  fileList.value = uploadFiles;
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};
// 上传之前
const beforeUpload = (file) => {
  // emit("updateFileList", file);
  return checkSize(file.size) && checkType(file.name);
};
const beforeRemove = (file, uploadFiles) => {
  if (file && file.status === "success") {
    abortUpload();
  }
};
// 文件数量超出
const handleExceed = (files, fileList) => {
  ElMessage({
    message: `最多支持上传${limit}个文件`,
    type: "warning",
  });
};
</script>
<style lang="scss">
.upload-file {
  .yellow {
    color: #fbbb5b;
    font-size: 12px;
  }
  .el-popper {
    overflow: inherit;
  }
}
.tipUl {
  padding: 0 8px;
  margin: 0;
  font-size: 16px;
}
.tipItem {
  list-style: none;
  line-height: 2;
  font-size: 12px;
}
</style>
  