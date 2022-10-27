  <template>
  <FileUpload
    :allowed-type="['img', 'word', 'pdf', 'excel', '压缩包']"
    :allowed-extension="[
      '.doc',
      '.docx',
      '.pdf',
      '.rar',
      '.zip',
      '.xls',
      '.xlsx',
    ]"
  ></FileUpload>
</template>

<script setup>
import FileUpload from "@/components/FileUpload";
import { reactive, ref } from "vue";

const tableData = reactive([{ name: "aa", age: "11" }]);
const columns = reactive([
  { label: "名称", prop: "name" },
  { label: "年龄", prop: "age" },
]);

const tableRef = ref();

const changePage = () => {
  console.log("修改page");
  console.log(tableRef.value.pageForm);
};
</script>