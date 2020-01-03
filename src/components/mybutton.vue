<template>
  <div class="btn" >
    <slot></slot>
  </div>
</template>

<script>
export default {
 
};
</script>

<style lang="less" scoped>
.btn {
  width: 318*100vw/360; 
  height: 50px;
  background-color: red;
  color: #fff;
  line-height: 50px;
  text-align: center;
  border-radius: 25px;
  font-size: 25px;
  font-weight: 700;
  margin: 0 auto
}
.primary{

}
</style>
