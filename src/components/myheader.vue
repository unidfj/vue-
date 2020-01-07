<template>
  <div class="title">
    <div><slot name="left"></slot></div>
    <div>
      {{ title }}
    </div>
    <div><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>
<style lang="less" scoped>
.title{
  margin: 20px 0;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  text-align: center;
   border-bottom: 1px solid #ccc;
  > div:nth-of-type(1),div:nth-of-type(3){
    padding: 0 10px 
  }
  >div:nth-of-type(2){
    font-size: 18px;
    font-weight: 700
  }
}
</style>
