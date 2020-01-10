<template>
  <div class="personal">
    <router-link :to="{ path: `/editpersonal/${userdata.id}` }">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="userdata.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{ userdata.nickname }}
          </div>
          <div class="time">{{ userdata.create_date | dateFormat('.') }}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hmcell title="我的关注" desc="关注的用户" @click="$router.push({path:'/follow'})"></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复"></hmcell>
    <hmcell title="我的收藏" desc="文章/视频" @click="$router.push({path:'/star'})"></hmcell>
    <hmcell title="设置"></hmcell>
    <mybutton class="btn" @click="exit">退出</mybutton>
  </div>
</template>

<script>
import hmcell from "@/components/mycell.vue";
import mybutton from "@/components/mybutton.vue";
import { getUserContentById } from "../api/user.js";
import { dateFormat } from "../utils/myfilter.js";
export default {
  //zujian
  components: {
    hmcell,
    mybutton
  },
  //过滤器
  filters: {
    dateFormat
  },
  //shuju
  data() {
    return {
      userdata: {}
    };
  },
  //fangfa
  methods: {
    //退出
    exit() {
      localStorage.removeItem("heimatoutiao");
      this.$router.push({ path: "/" });
    }
  },
  // 钩子函数
  async mounted() {
    // 获取数据 拼接字符串
    let res = await getUserContentById(this.$route.params.id);
    // console.log(res);
    if (res.data.message == "获取成功") {
      // console.log('chenggong');
      this.userdata = res.data.data;
      this.userdata.head_img = `http://127.0.0.1:3000` + res.data.data.head_img;
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}

.btn {
  margin: 20px auto;
  background-color: #f00;
}
</style>
