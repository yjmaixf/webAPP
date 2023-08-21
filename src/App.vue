<template>
  <indexVue />
</template>

<script>
import indexVue from "./views/index/index.vue";

export default {
  name: "App",
  components: {
    indexVue,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
html {
  overflow: hidden;
}
.el-table .cell {
  font-size: 12px !important;
  padding: 0 8px;
}
.el-divider__text {
  background-color: #f0f0f0 !important;
}
.el-input__wrapper{
  height: 24px !important;
}
</style>
