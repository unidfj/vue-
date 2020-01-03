<template>
  <div class="loginbtn">
    <inp
      :ruler='/^(\d{5,6})$|^(1\d{11})$/'
      tips="用户名/手机号有误"
      placeholder="请输入用户名/手机号"
      v-model="user.username"
    ></inp>
    <inp
      :ruler='/^\d{3,16}$/'
      tips="密码输入有误"
      placeholder="请输入密码"
      v-model="user.password"
    ></inp>
    <btn>登录</btn>
  </div>
</template>

<script>
import btn from "@/components/mybutton.vue";
import inp from "@/components/myinput.vue";
export default {
  components: {
    btn,
    inp
  },
  data() {
    return {
      type: false,
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
  }
};
</script>

<style lang="less"></style>
