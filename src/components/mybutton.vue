<template>
  <div class="btn" @click="hand">
    <slot></slot>
  </div>
</template>

<script>
export default {
 methods: {
   hand(e){
     this.$emit('click',e)
   }
 }
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

</style>
