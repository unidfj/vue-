<template>
  <!-- 一张图片或者2张图片 左右结构 -->
  <div @click="click" class="single" v-if="data.type==1&&data.cover.length<=2">
    <div class="left">
      <p class="content">{{data.title}}</p>
      <p class="info">
        <span>{{data.user.nickname}}</span>
        <span>有{{data.comment_length}}个人跟帖</span>
      </p>
    </div>
    <img v-for="i in data.cover" :key="i.id" :src="i.url" alt />
  </div>
  <!-- 视频  上下结构-->
  <div @click="click" class="single-video" v-else-if="data.type==2">
    <div class="video">
      <p class="content">{{data.title}}</p>
      <div class="imgplaybox">
        <van-icon name="play-circle-o" class="vaniconplay" />
        <img :src="data.cover[0].url" alt />
      </div>
      <p class="info">
        <span>{{data.user.nickname}}</span>
        <span>有{{data.comment_length}}个人跟帖</span>
      </p>
    </div>
  </div>
  <!-- 三个图片的那些文章 -->
  <div @click="click" class="singlethree" v-else-if="data.type==1&&data.cover.length>2">
    <p class="content">{{data.title}}</p>
    <div class="threeimg">
      <img v-for="e in data.cover" :key="e.id" :src="e.url" />
    </div>
    <p class="info">
      <span>{{data.user.nickname}}</span>
      <span>有{{data.comment_length}}个人跟帖</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
    // console.log(this.data);
  },
  methods: {
    click(e){
      this.$emit('click',e)
    }
  }
};
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
//1图2图
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
}
//公共样式
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
//视频
.single-video {
  .video {
    padding: 10px 5px;
    border-bottom: #999 solid 1px;
    .imgplaybox {
      position: relative;
    }
    .vaniconplay {
      font-size: 60/360 * 100vw;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ccc;
      // box-shadow: 0 0  5px currentColor;
    }
    img {
      width: 100%;
      margin-bottom: 5px;
    }
  }
  .content {
    margin-bottom: 5px;
  }
}
//三图
.singlethree {
  padding-bottom: 5px;
  border-bottom: #ccc solid 1px;
  .threeimg {
    display: flex;
    > img {
      width: 32%;
      margin: 10px auto;
    }
  }
}
</style>
