<template>
  <div class="catemanage">
    <myheader title="栏目管理" style="border-bottom:1px solid #ccc">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myheader>

    <div class="removeCate">
      <div>
        <p>点击删除以下标签</p>
      </div>
      <div class="cate">
        <div @click="clickremove(i)" v-for="(e,i) in list" :key="e.id">{{e.name}}</div>
      </div>
    </div>

    <div class="removeCate">
      <div>
        <p>点击添加以下标签</p>
      </div>
      <div class="cate">
        <div @click="clickadd(i)" v-for="(e,i) in emmm" :key="e.id">{{e.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "../components/myheader.vue";
import { lanmu } from "../api/lanmu";
export default {
  components: {
    myheader
  },

  data() {
    return {
      list: [],
      emmm: [],
      list2: []
    };
  },
  async mounted() {
    //狗子函数获取两个数组就ok
    //先看本地存储有否,有转换成数组赋值,否则res赋值,再看登录与否
    //list
    let res = await lanmu();
    if (localStorage.getItem("cate_remove")) {
      this.list = JSON.parse(localStorage.getItem("cate_remove"));
    //   console.log(this.list);
    } else {
      this.list = res.data.data;
      //登录与否? 去除头条/关注
      this.list = localStorage.getItem("heimatoutiao")
        ? this.list.splice(2)
        : this.list.splice(1);
    }
    //emmm
    this.emmm = localStorage.getItem("cate_emmm")
      ? JSON.parse(localStorage.getItem("cate_emmm"))
      : this.emmm;
  },
  methods: {
    clickremove(i) {
      //emmm数组+1 ,list移除1个索引为i的项
      this.emmm.unshift(this.list[i]);
      this.list.splice(i, 1);
      localStorage.setItem("cate_remove", JSON.stringify(this.list));
      localStorage.setItem("cate_emmm", JSON.stringify(this.emmm));
    },
    clickadd(i) {
        //list数组+1,emmm移除1个索引为i的项
      this.list.unshift(this.emmm[i]);
      this.emmm.splice(i, 1);
      localStorage.setItem("cate_remove", JSON.stringify(this.list));
      localStorage.setItem("cate_emmm", JSON.stringify(this.emmm));
    }
  }
};
</script>
<style lang='less' scoped>
.removeCate {
  padding: 5px 10px;
  color: #8c8c8c;
  clear: both;
  margin-bottom: 12px;
  .cate {
    > div {
      float: left;
      padding: 10px 10px 10px;
      margin: 10px 8px 0 8px;
      width: 23%;
      text-align: center;
      border: 1px solid #000;
      line-height: 20px;
    }
  }
}
</style>