<template>
  <div>
    <el-icon
      :class="
        isFullscreen
          ? 'icon-quxiaoquanping_o iconfont qpIcon'
          : 'icon-quanping iconfont qpIcon'
      "
      @click="click"
    />
  </div>
</template>
  
  <script>
import screenfull from "screenfull";
export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "您的浏览器版本过低，请先升级",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>
  
  <style scoped>
.qpIcon {
  font-size: 20px !important;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: -4px;
}
.iconfont {
  font-size: 18px;
}
</style>
  