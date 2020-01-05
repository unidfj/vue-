<template>
  <div class="login">
    <div class="container">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputs">
      <inp
        placeholder="请输入用户名/手机号"
        :rules="/^(\d{5,6})$|^(1\d{10})$/"
        tip="用户名或者手机号输入不正确"
        v-model="user.username"
      ></inp>
      <inp
        placeholder="请输入密码"
        :rules="/^\S{3,16}$/"
        tip="请输入3-16位的密码"
        v-model="user.password"
      ></inp>
    </div>
    <p class="tips">
      没有账号？
      <a href="#/register" class>去注册</a>
    </p>
    <btn @click="login1">登陆</btn>
  </div>
  </div>
</template>

<script>
import btn from "@/components/mybutton.vue";
import inp from "@/components/myinput.vue";
import { login } from "@/api/user.js";
export default {
  components: {
    btn,
    inp
  },
  data() {
    return {
      user: {
        username: "10086",
        password: "123"
      }
    };
  },
  methods: {
    //async标记这个方法异步
    async login1() {
      if (
        /^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) &&
        /^\S{3,16}$/.test(this.user.password)
      ) {
        let res = await login(this.user);
        // console.log(res);
        if (res.data.message == "用户不存在") {
          this.$toast.fail(res.data.message);
        }else{
          localStorage.setItem('heimatoutiao',res.data.data.token);
          localStorage.setItem('heimatoutiao_userinfo',JSON.stringify(res.data.data.user))
          this.$router.push({path:`/personal/${res.data.data.user.id}`})
        }
      } else {
        this.$toast.fail("用户信息错咯");
      }
    }
  }
};
</script>

<style lang="less">
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
