<template>
  <div class="hd">
    <myheader title="编辑信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myheader>
    <div class="uploadimg">
      <van-uploader id="fl" class="fl" :after-read="afterRead" />
      <div class="imgfather">
        <label for="fl">
          <img id="img" :src="currentUser.head_img" />
        </label>
      </div>
    </div>

    <mycell title="昵称" @click="nickshow = !nickshow" :desc="currentUser.nickname"></mycell>

    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="uploadNickName">
      <van-field ref="n" :value="currentUser.nickname" placeholder="请输入昵称" required label="昵称" />
    </van-dialog>

    <mycell
      @click="passwordshow=!passwordshow"
      title="密码"
      :desc="currentUser.password"
      type="password"
    ></mycell>
    <van-dialog v-model="passwordshow" title="修改密码" show-cancel-button @confirm="uploadPassWord">
      <van-field ref="oldpsw" placeholder="请输入原密码" required label="密码" />
      <van-field ref="newpsw" placeholder="请输入新密码" required label="密码" />
    </van-dialog>

    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="uploadGender">
      <!-- <van-picker> -->
      <van-picker :columns="['女','男']" :default-index="currentUser.gender" @change="onChange" />
    </van-dialog>
    <mycell @click="gendershow=!gendershow" title="性别" :desc="currentUser.gender ? '男' : '女'"></mycell>
  </div>
</template>

<script>
import myheader from "../components/myheader.vue";
import mycell from "../components/mycell.vue";
import { userdata, userupdate } from "../api/user.js";
import { fileupload } from "../api/fileupload.js";
export default {
  data() {
    return {
      nickshow: false,
      passwordshow: false,
      gendershow: false,
      currentUser: {},
      columns: []
    };
  },
  components: {
    myheader,
    mycell
  },
  //钩子函数实现页面加载渲染
  async mounted() {
    let id = this.$route.params.id;
    let res = await userdata(id);
    // console.log(res)
    if (res.data.message == "获取成功") {
      this.currentUser = res.data.data;
      //有图拼接
      if (this.currentUser.head_img) {
        this.currentUser.head_img =
          "http://127.0.0.1:3000" + this.currentUser.head_img;
      } else {
        //无图默认
        this.currentUser.head_img =
          "http://127.0.0.1:3000/uploads/images/default.png";
      }
    }
  },
  methods: {
    //图片上预览
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      let fm = new FormData();
      fm.append("file", file.file); //'file'是接口文档定的键
      //fm放进axios api请求
      let res = await fileupload(fm);
      // console.log(res);
      if (res.data.message == "文件上传成功") {
        //上传成功 图片预览
        this.currentUser.head_img = "http://127.0.0.1:3000" + res.data.data.url;
        //更新数据要传入url res.data.data.url 不要传入http格式的.上面会拼接
        let res2 = await userupdate(this.currentUser.id, {
          head_img: res.data.data.url
        });
        // console.log(res2);
        res2.data.message == "修改成功"
          ? this.$toast.success("修改成功")
          : this.$toast.fail("修改失败");
      } else {
        //message 未知的图片格式
        this.$toast.fail("修改失败" + res.data.message);
      }
    },
    //修改昵称
    async uploadNickName() {
      let value = this.$refs.n.$refs.input.value;
      let res = await userupdate(this.currentUser.id, { nickname: value });
      // console.log(res);
      if (res.data.message == "修改成功") {
        this.$toast.success("修改成功");
        this.currentUser.nickname = value; //修改掉页面上的nickname
      } else this.$toast.fail("修改失败");
    },
    //修改密码
    async uploadPassWord() {
      let oldpsw = this.$refs.oldpsw.$refs.input.value;
      let newpsw = this.$refs.newpsw.$refs.input.value;
      if (oldpsw != this.currentUser.password) {
        this.$toast.fail("原密码不正确");
      } else if (/^\w{3,9}$/.test(newpsw)) {
        let res = await userupdate(this.currentUser.id, { password: newpsw });
        if (res.data.message == "修改成功") {
          this.$toast.success("修改成功");
          this.currentUser.password = newpsw;
        }
      } else this.$toast.fail("修改失败");
    },
    //修改昵称 picker组件的方法
    onChange(q, w, e) {
      // console.log(q, w, e);
      //[1]vue zujian [2]男   [3]index
      this.currentUser.gender = e;
    },
    //修改昵称
    async uploadGender() {
      let res = await userupdate(this.currentUser.id, {
        gender: this.currentUser.gender
      });
      res.data.message == "修改成功"
        ? this.$toast.success("搞定")
        : this.$toast.fail("修改失败");
    },
  }
};
</script>
<style lang="less" scoped>
#img {
  display: block;
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
  border-radius: 50%;
  border: 1px solid #000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.imgfather {
  position: relative;
  height: 150px;
}
.uploadimg {
  .fl {
    float: left;
    display: none;
  }
}
// 深度选择器
// /deep/.van-uploader__upload {
//   width: 100 / 360 * 100vw;
//   height: 100 / 360 * 100vw;
// }
// /deep/.van-picker-column__item {
//   border-top: 1px red sloid;
//   border-bottom: 1px red sloid;
// }
</style>
