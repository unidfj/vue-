<template>
  <input
    type="text"
    class="inp"
    :class="{ chenggong: type, shibai: !type }"
    @input="handelinput"
    @blur="handelblur"
  />
</template>

<script>
export default {
  props: ["rules", "tip"],
  data() {
    return {
      type: true
    };
  },
  methods: {
    //input事件:判断输入的是否符合父组件传过来的rules 不符合再执行传过来的tips
    handelinput(e) {
      this.$emit("input", e.target.value);
      //&&this.rules是保证引用页面有传入了 rules
      if (this.rules.test(e.target.value) && this.rules) {
        this.type = true;
        // console.log(123123)
      } else this.type = false;
    },
    //失焦事件:判断
    handelblur(e) {
      if (!this.rules.test(e.target.value) && this.rules) {
        //引入toast就已经挂载在Vue中,fail错误触发 message提示信息 duration提示持续时间
        this.$toast.fail({
          message: this.tip || "输入不正确",
          duration: 1000
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.inp {
  // background-color: #ccc;
  width: 3180/36vw;
  height: 60px;
  outline: 0;
  border: 0;
  border-bottom: 2px solid #000;
  font-size: 22px;
  line-height: 60px;
  // text-align: center;
}
.chenggong {
  border-bottom: 4px solid rgb(54, 187, 54);
}
.shibai {
  border-bottom: 4px solid rgb(112, 29, 29);
}
</style>
