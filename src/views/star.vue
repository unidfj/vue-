<template>
  <div class="star">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>

    <van-swipe-cell v-for="(i,index) in list" :key="i.id">
      <newblock :data="i" @click="$router.push({path: `/articledetail/${i.id}`})"></newblock>
      <template slot="right">
        <van-button square type="danger" text="取消收藏" @click="close(i,index)" />
        <!-- <van-button square type="primary" text="收藏" /> -->
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import newblock from "../components/mynewsBlock";
import myheader from "../components/myheader";
import { starlist } from "../api/user";
import { shoucangById } from "../api/article";
import { async } from "q";
export default {
  components: {
    newblock,
    myheader
  },
  data() {
    return {
      list: []
    };
  },
  async mounted() {
    let res = await starlist();
    this.list = res.data.data;
    // console.log(this.list);
  },
  methods: {
    async close(e, i) {
      // console.log(e) 数据对象
      // console.log(i) 索引
      let res = await shoucangById(e.id);
      if (res.data.message == "取消成功") {
        this.$toast.success(res.data.message);
        this.list.splice(i, 1);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.van-button{
  height: 100%
}
</style>