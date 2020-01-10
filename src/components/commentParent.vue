<template>
  <div class="commentItem">
    <!-- 组件递归 -->
    <commentItem v-if="parent.parent" :parent="parent.parent" @reply="reply"></commentItem>
    <div class="top">
      <div class="left">
        <span>{{parent.user&&parent.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
        <span>{{parent.creat_date}}</span>
      </div>
      <span @click="reply(parent)">回复</span>
    </div>
    <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
export default {
  props: ["parent"],
  name: "commentItem",
  methods: {
    reply(e) {
      //e是传入
      // console.log(1);
      this.$emit("reply", e);
    }
  }
};
</script>

<style lang='less' scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>