<template>
  <div class="h-cow">
    <el-row :gutter="10">
      <header class="com-padding">
        <el-col class="logo" :xs="8" :sm="4" style="padding-top: .75rem">
          <!-- <img src="../../assets/img/header.png" alt="">> -->
          </el-col>
        <el-col :span="15" class="hidden-xs-only">
          <div class="tab-container">
            <router-link :class="{ active: !current }" class="tab-link" to="/">首页</router-link>
            <router-link :class="{ active: current=='product' }" class="tab-link" to="/product">产品中心</router-link>
            <router-link :class="{ active: current=='about' }" class="tab-link" to="/about">关于我们</router-link>
            <router-link :class="{ active: current=='news' }" class="tab-link" to="/news">新闻资讯</router-link>
            <router-link :class="{ active: current=='contact' }" class="tab-link" to="/contact">联系我们</router-link>
          </div>
        </el-col>
        <el-col :span="5" class="search hidden-xs-only">
          <div style="position: relative">
            <input v-model="keywords" @keyup.enter="onEnter" type="text" placeholder="关键词...">
            <button class="btn" @click="onEnter"></button>
          </div>
        </el-col>
        <el-col :xs="12" class="hidden-xs-and-up" style="height: 1px"></el-col>
        <el-col :xs="4" class="hidden-sm-and-up">
          <div class="line-box" @click="show=!show">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </el-col>
      </header>
    </el-row>
    <el-row class="hidden-sm-and-up" v-if="show">
      <ul>
        <li class="m-nav" :class="{ active: !current }">
          <router-link to="/">首页</router-link>
        </li>
        <li class="m-nav" :class="{ active: current=='product' }">
          <router-link to="/product">产品中心</router-link>
        </li>
        <li class="m-nav" :class="{ active: current=='about' }">
          <router-link to="/about">关于我们</router-link>
        </li>
        <li class="m-nav" :class="{ active: current=='news' }">
          <router-link to="/news">新闻资讯</router-link>
        </li>
        <li class="m-nav" :class="{ active: current=='contact' }">
          <router-link to="/contact">联系我们</router-link>
        </li>
      </ul>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: null,
      keywords: '',
      realId: null,
      id: null,
      show: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.current = this.$route.path.slice(1)
    },
    onEnter() {
      let postData = {
        params: {
          title: this.keywords
        }
      }
      this.axios
        .get('/services/goodfocus/getDetail.json', postData)
        .then(
          response => {
            console.log(response.data.data.detailMessage)
            let data = response.data.data.detailMessage
            if (data) {
              console.log(data)
              this.realId = data[0].relationId
              this.id = data[0].id
            }
          },
          response => {
            // error callback
          }
        )
        .then(() => {
          this.axios.get('/services/goodfocus/index.json').then(response => {
            let data = response.data.data
            data.serviceSystem.forEach((v, i) => {
              console.log(v)
              if (this.realId == v.id) {
                router.push({
                  path: '/product',
                  query: { part: i, pid: this.id }
                })
              }
            })
          })
        })
    }
  },
  watch: {
    $route(to, from) {
      this.show = false
      this.init()
    }
  }
}
</script>
<style lang="stylus" scoped>
.logo
  height 3rem
  background #FFF url('../../assets/img/header.png') no-repeat  center left
  background-size 60%
.h-cow
  height 3rem
  overflow hidden
header
  box-sizing border-box
  position relative
  z-index 100
  .search
    padding 0.5rem 0
    font-size 1vw
    input
      position absolute
      width 70%
      left: 0;
      line-height 1.5rem
      height calc(1.5rem + 2px)
      box-sizing border-box
      border-radius 24px
      border 1px solid #C1C1C1
      padding 0 1rem
      box-sizing border-box
      z-index: 10;
  .tab-container
    flex 1
.tab-link
  height 3rem
  box-sizing border-box
  display inline-block
  padding 1rem 0.5rem
  font-size 1vw
  color #5e5e5e
  text-decoration none
  &.active
    color #75BA2B
    border-bottom 4px solid
.line
  height 2px
  width 60%
  background #7bba02
  border-radius 5px
  margin 0.5rem auto
ul
  padding 0
  border-top 1px solid #e4e4e478
.m-nav
  height 3rem
  &.active
    background #7bba02
    a
      color #fff
  a
    display inline-block
    width 100%
    padding 1rem 0.5rem
    font-size 1vw
    color #5e5e5e
    text-decoration none
.btn
  position absolute
  width 30%
  right 20px
  top 0px
  height calc(1.5rem + 2px)
  border-radius 25px
  border 1px solid #c1c1c1
  background #C1C1C1 url('../../assets/img/quicksearchbox.png') no-repeat 90% 50%
  background-size 80%
</style>
