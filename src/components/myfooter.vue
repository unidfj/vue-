<template>
  <div class="commentfooter">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <div class="buj">
        <span class="comment" @click="$router.push({path:`/comment/${post.id}`})">
          <i class="iconfont iconpinglun-"></i>
          <em>{{post&&post.comment_length==0?'暂无':post.comment_length}}</em>
        </span>
        <span @click="shoucang" :class="{hasstar:post.has_star}">
          <i class="iconfont iconshoucang"></i>
        </span>
        <span>
          <i class="iconfont iconfenxiang"></i>
        </span>
      </div>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="7" @blur="isFocus = false"></textarea>
      <div>
        <span @click="send">点击发送</span>
        <span @click="isFocus=!isFocus">取消</span>
      </div>
    </div>
  </div>
</template>
<script>
import { shoucangById, sendcommment } from "../api/article";
export default {
  props: ["post", "object"],
  data() {
    return {
      isFocus: false
    };
  },
  watch: {
    object() {
      if (this.object) {
        console.log("obj异变");
        this.isFocus = true;
      }
    }
  },
  methods: {
    //sendcomment三个参数 必传id,content, 回复id:parent_id回复别的组件时候才传
    //点击发送 data取值:如果object存在那就拿obj传过来的id
    async send() {
      let data = { content: this.$refs.commtext.value };
      if (this.object) data.parent_id = this.object.id;
      let res = await sendcommment(this.post.id, data);
      // console.log(res);
      if (res.data.message == "评论发布成功") {
        //发布成功 提示 取消弹框 清空文本域 刷新数据(父组件做)
        this.$toast.success(res.data.message);
        this.isFocus = false;
        this.$refs.commtext.value = "";
        this.$emit("refresh");
      }
    },
    //弹框与否
    handlerFocus() {
      this.isFocus = !this.isFocus;
      this.$refs.commtext.focus();
    },
    //点击收藏
    async shoucang() {
      let res = await shoucangById(this.post.id);
      // console.log(this.post);
      this.post.has_star = !this.post.has_star;
      this.$toast.success(res.data.message);
    }
  }
};
</script>
<style lang='less' scoped>
.hasstar {
  color: yellow;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30/360 * 100vw;
    line-height: 30/360 * 100vw;
    border-radius: 15/360 * 100vw;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  > .buj {
    display: flex;
    > span {
      width: 60/360 * 100vw;
    }
    .comment {
      position: relative;
    }
    em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  i {
    font-size: 20px;
  }
}
.commentfooter {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
}
</style>
