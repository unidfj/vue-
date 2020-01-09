<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ path: '/search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({path:`/personal/${id}`})">
        <van-icon name="manager-o"></van-icon>
      </div>
    </div>
    <!-- tab导航栏 -->
    <van-tabs v-model="active" sticky swipeable>
      <!-- 动态生成    遍历catelist生成$个栏目 -->
      <van-tab :title="item.name" v-for="item in catelist" :key="item.id">
        <!-- van-pull-refresh下拉刷新组件 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- vanlist 上拉加载组件 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <!-- 遍历item生成$个新闻块 -->
            <newsblock
              v-for="element in item.postlist"
              :key="element.id"
              :data="element"
              @click="$router.push({path: `/articledetail/${element.id}`})"
            ></newsblock>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { lanmu } from "../api/lanmu.js";
import { getPostList } from "@/api/article.js";
import newsblock from "../components/mynewsBlock.vue";
export default {
  components: {
    newsblock
  },
  data() {
    return {
      id: JSON.parse(localStorage.getItem("heimatoutiao_userinfo") || "{}").id,
      catelist: [],
      active: localStorage.getItem("heimatoutiao") ? 1 : 0
    };
  },
  // 钩子函数
  async mounted() {
    let res = await lanmu();
    this.catelist = res.data.data;
    this.catelist = this.catelist.map(value => {
      return {
        ...value,
        postlist: [],
        pageSize: 5, //这个栏目每页所显示的记录数
        pageIndex: 1, //这个栏目 当前的页码
        loading: false, //这个栏目正在加载 状态
        finished: false, //这个栏目加载完成 状态
        isLoading: false //这个栏目正在刷新
      };
    });
    this.getdata();
  },
  methods: {
    //下拉  刷新
    onRefresh() {
      // 1显示第一页index=1, 2清空post数据 3重新生成方法 修改上拉组件的finished为false
      this.catelist[this.active].pageIndex = 1;
      this.catelist[this.active].postlist.length = 0;
      this.getdata();
      this.catelist[this.active].finished = false;
    },
    //上拉  加载
    onLoad() {
      this.catelist[this.active].pageIndex++;
      this.getdata();
    },
    //封装一个获取文章列表的方法
    async getdata() {
      let res = await getPostList({
        pageSize: this.catelist[this.active].pageSize,
        pageIndex: this.catelist[this.active].pageIndex,
        category: this.catelist[this.active].id
      });
      // 加载完了就取消loading状态
      if (this.catelist[this.active].loading)
        this.catelist[this.active].loading = false;
      //返回的数据 小于 每页数据最大值时 就说明加载完成
      if (res.data.data.length < this.catelist[this.active].pageSize)
        this.catelist[this.active].finished = true;
      //刷新完了就修改正在加载的状态
      if (this.catelist[this.active].isLoading)
        this.catelist[this.active].isLoading = false;
      //新加载(mounted)(onload)的数据   push到poselist数组里面 ...展开添加 否则会添加一个对象到postlist里面
      this.catelist[this.active].postlist.push(...res.data.data);
      // console.log(this.catelist[this.active], res);
    }
  },
  //监听器
  watch: {
    active() {
      if (this.catelist[this.active].postlist.length == 0) {
        this.getdata();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  background-color: #f00;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .logo {
    padding: 0 10px;
  }
  .search {
    flex: 1;
    border-radius: 20px;
    font-weight: 700;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.4);
    text-align: center;
    line-height: 40px;
  }
  .user {
    padding: 0 10px;
    font-size: 25px;
  }
}
</style>
