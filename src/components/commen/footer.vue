<template>
  <div>
    <footer class="com-padding">
      <el-row :gutter="10">
        <el-col :xs="3" :sm="2">
          <div class="copy hidden-xs-only">
            <img src="../../assets/img/footer.png" alt="">
          </div>
          <img class="hidden-sm-and-up" src="../../assets/img/footer.png" alt="">
        </el-col>
        <el-col :sm="4" class="hidden-xs-only" style="height:20px"></el-col>
        <el-col :xs="21" :sm="18">
          <div class="footer-right">
            <div class="tab-container">
              <router-link class="tab-link" to="contact">联系我们</router-link>
              <router-link class="tab-link" to="about">关于我们</router-link>
              <router-link class="tab-link" to="product">产品中心</router-link>
              <router-link class="tab-link" to="news">新闻资讯</router-link>
            </div>
            <div class="copy-right">
              <span>{{copyright}}</span>
              <span @click="isShow=!isShow" class="show-switch  hidden-xs-only" :class="[isShow ? 'up' : 'down']">友情链接
                <i :class="[isShow ? 'to-up' : 'to-down']"></i>
              </span>
            </div>
            <div v-show="isShow" class="real-link">
              <a v-for="(item, index) in link" :key="index" :href="item.link">{{item.name}}</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      copyright:
        'Copyright ©2017 浙ICP备16007586号-1  浙公网安备 33010902001056号',
      link: null,
      isShow: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.axios.get('/services/blogroll/List.json').then(
        response => {
          let data = response.data.rows
          this.link = data.map(v => ({
            name: v.name,
            link: v.address
          }))
        },
        response => {
          // error callback
        }
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
footer
  bottom 0
  background #F7F8FA
  padding-top 2rem
  padding-bottom 1rem
  .copy
    width 3rem
    padding-top 0
    img
      mix-blend-mode multiply
  .tab-container
    text-align left
    border-bottom 1px solid #858b9c54
  .footer-right .copy-right
    display flex
    justify-content space-between
    padding 0.5rem 0 0 0.5rem
    span
      font-size 1rem
      text-align left
.tab-link, .real-link a
  box-sizing border-box
  display inline-block
  padding 0 0.5rem 0.5rem 0
  font-size 1rem
  color #747474
  text-decoration none
  &.active
    color #75BA2B
    border-bottom 4px solid
.real-link
  padding-top 1.5rem
  text-align left
  a
    padding-bottom 0.6rem
    text-decoration underline
.show-switch
  cursor pointer
  padding 0 1.2rem
  i
    position relative
    float right
    padding-top 0.6rem
    &::after
      display block
      content ''
      width 10px
      height 1px
      background #455565
      transform rotate(-45deg)
    &::before
      display block
      content ''
      width 10px
      height 1px
      background #455565
      transform rotate(45deg)
      left 6px
      position absolute
    &.to-up
      transform rotate(180deg) translate(-8px, -8px)
</style>
