<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>

    <div class="lists" v-for="e in list" :key="e.id">
      <div class="item">
        <div class="head">
          <img :src="e.user.head_img" />
          <div>
            <p>{{e.user&&e.user.username}}</p>
            <span>{{e.create_date}}</span>
          </div>
          <span @click="reply(e)">回复</span>
        </div>
        <!-- 判断有下一层才引入组件  组件需要的数据在当前数据parent对象中-->
        <commentParent v-if="e.parent" @reply="reply" :parent="e.parent"></commentParent>
        <div class="text">{{e.content}}</div>
      </div>
    </div>
    <myfooter :post="footerdata" :object="object" @refresh="refresh"></myfooter>
  </div>
</template>

<script>
import { commentById, replycomment, articleById } from "../api/article";
import commentParent from "../components/commentParent";
import myheader from "@/components/myheader";
import myfooter from "../components/myfooter";
export default {
  components: {
    myheader,
    commentParent,
    myfooter
  },
  data() {
    return {
      list: [],
      footerdata: [],
      object: {}
    };
  },
  methods: {
    refresh() {
      this.getdata();
    },
    //封装一个评论数据 文章详情的方法
    async getdata() {
      //获取评论数据
      let res = await commentById(this.$route.params.id, {
        pageSize: 40,
        pageIndex: 1
      });
      //改造数据数据是否为0,不为0才赋值   再判断head_img有没图片有则拼接 没则用默认
      this.list =
        res.data.data.length == 0
          ? this.list
          : (this.list = res.data.data.map(v => {
              v.user.head_img = v.user.head_img
                ? "http://127.0.0.1:3000" + v.user.head_img
                : "http://127.0.0.1:3000/uploads/image/default.png";
              return v;
            }));
      //文章详情  footer要用的数据
      let res2 = await articleById(this.$route.params.id);
      this.footerdata = res2.data.data;
    },
    //监听本身 子组件 递归组件发起的点击回复事件replay
    reply(e){
      console.log(e);
      this.object=e
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      margin-top: 50px;
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>
