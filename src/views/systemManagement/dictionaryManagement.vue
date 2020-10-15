<template>
  <!-- 字典管理 -->
  <div>
    <span>字典管理</span>
  </div>
</template>
<script>
import {} from "../../api/systemManagement/dictionaryManagement";
export default {
  name: "dictionaryManagement",
  data() {
    return {};
  },
  mounted() {
    this.hhh();
  },
  methods: {
    // hhh() {
    //   var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    //   var isOpera = userAgent.indexOf("Opera") > -1;
    //   if (isOpera) {
    //     //判断是否Opera浏览器
    //     console.log("Opera");
    //     return "Opera";
    //   } else if (userAgent.indexOf("Firefox") > -1) {
    //     //判断是否Firefox浏览器
    //     console.log("FF");
    //     return "FF";
    //   } else if (userAgent.indexOf("Chrome") > -1) {
    //     //判断是否Chrome浏览器
    //     console.log("Chrome");
    //     return "Chrome";
    //   } else if (userAgent.indexOf("Safari") > -1) {
    //     //判断是否Safari浏览器
    //     console.log("Safari");
    //     return "Safari";
    //   } else if (
    //     userAgent.indexOf("compatible") > -1 &&
    //     userAgent.indexOf("MSIE") > -1 &&
    //     !isOpera
    //   ) {
    //     //判断是否IE浏览器
    //     console.log("IE");
    //     return "IE";
    //   }
    // },
      
  
  
  },
};
</script>
<style lang="less" scoped>
</style>