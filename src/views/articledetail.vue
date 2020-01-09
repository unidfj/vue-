<template>
  <div class="articaldetail">
    <!-- toubu -->
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span :class="{follow:data.has_follow}" @click="guanzhu">{{data.has_follow?'取消关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{data.title}}</div>
      <div class="desc">
        <span>{{data.user&&data.user.nickname}}</span> &nbsp;&nbsp;
        <span>{{data.user&&data.user.create_date |dateFormat('')}}</span>
      </div>
      <div class="content" v-html="data.content" v-if="data.type==1"></div>
      <video class="content" v-if="data.type==2" :src="data.content" controls></video>
      <div class="opt">
        <span class="like" @click="dianzan" :class="{likesuccess:data.has_like}">
          <van-icon name="good-job-o" />
          {{data.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="http://127.0.0.1:3000/uploads/image/default.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
  </div>
</template>
<script>
import { articleById, dianzanById } from "@/api/article.js";
import { dateFormat } from "@/utils/myfilter";
import { unfollowUser, followUser } from "@/api/user";
export default {
  filters: {
    //过滤器
    dateFormat
  },
  data() {
    return {
      data: []
    };
  },
  async mounted() {
    let res = await articleById(this.$route.params.id);
    this.data = res.data.data;
    // console.log(this.data);
  },
  methods: {
    //关注事件 两个接口 判断 id调用对应接口 提示 取反 (已绑定)动态换肤
    async guanzhu() {
      let res = this.data.has_follow
        ? await unfollowUser(this.data.user.id)
        : await followUser(this.data.user.id);
      this.$toast.success(res.data.message);
      this.data.has_follow = !this.data.has_follow;
    },
    //点赞事件 id调用 数量+-,提示,取反 (已绑定)动态换肤
    async dianzan() {
      let res = await dianzanById(this.data.id);
      res.data.message == "点赞成功"
        ? this.data.like_length++
        : this.data.like_length--;
      this.$toast.success(res.data.message);
      this.data.has_like = !this.data.has_like;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  .follow {
    background-color: #ccc;
    color: #fff;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  font-size: 20px;
  .left {
    vertical-align: middle;
    display: flex;
    align-items: center;
    font-size: 20px;
    > span {
      font-size: 60px;
    }
  }
  > span {
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: #f00;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    .guanzhuactive {
      background-color: #ccc;
      color: black;
    }
  }
}
.detail {
  .likesuccess {
    color: #f00;
    border: #f00 solid 1px;
  }
  padding: 15px 10px;
  .title {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
    line-height: 30px;
  }
  .desc {
    margin: 1px, auto;
    color: #ccc;
    height: 50px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    > img {
      width: 100%;
    }
  }
  //2
  .opt {
    display: flex;
    justify-content: space-around;

    .like,
    .chat {
      height: 25px;
      padding: 0 15px;
      font-size: 14px;
      line-height: 25px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
    }
    .w {
      color: rgb(84, 163, 5);
    }
  }
}
//3
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    font-size: 25px;
    line-height: 50px;
    // text-align: center;
  }
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
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>