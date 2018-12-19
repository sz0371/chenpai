<template>
  <div class="home">
    <nav>
      <div class="swiper-box">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in banner" :key="index"><img :src="path+item" alt=""></swiper-slide>
        </swiper>
      </div>
      <div class="orther">
        <span class="desc">提供智能电气系统整体解决方案</span>
        <span class="en">The overall solution of the intelligent electrical system</span>
        <span class="title">精心打造业务组合优化、中国制造、投资和项目管理</span>
      </div>
    </nav>
    <el-row :gutter="20" class="product com-padding">
      <h5>产品展示</h5>
      <p>Product Center</p>
      <div class="content">
        <el-col :xs="12" :sm="6" v-for="(item, index) in productData" :key="index">
          <div class="box" @click="toProductDetail(item)">
            <div class="img-box">
              <img class="bg" :src="path+item.imageUrl" alt="">
              <img class="hbg" src="../../src/assets/img/add.png" alt="">
            </div>
            <div class="desc">
              <p style="font-size: 1.2rem">{{item.title}}</p>
              <p>{{item.subtitle}}</p>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="15" class="about com-padding">
      <el-col :xs="24" :sm="12" class="hidden-sm-and-up" style="margin-bottom:1.5rem; padding-right:3rem">
        <img v-if="inforData" src="../../src/assets/img/ls.jpg" alt="">
        <!-- <img v-if="inforData" :src="path+inforData.imageUrl" alt=""> -->
      </el-col>
      <el-col :xs="24" :sm="12" class="text">
        <h5>关于我们</h5>
        <p>ABOUT US</p>
        <div style="line-height :1.5rem" v-if="inforData" v-html="inforData.detail"></div>
        <router-link class="btn" to="/about">关于我们+</router-link>
      </el-col>
      <el-col :xs="24" :sm="12" style="padding-right:3rem" class="img hidden-xs-only">
        <img v-if="inforData" src="../../src/assets/img/ls.jpg" alt="">
        <!-- <img v-if="inforData" :src="path+inforData.imageUrl" alt=""> -->
      </el-col>
    </el-row>
    <el-row :gutter="30" class="news com-padding">
      <h5>新闻资讯</h5>
      <p>News and information</p>
      <el-col :xs="12" :sm="8" class="hidden-xs-only new-box" v-for="(item, index) in newsData" :key="index">
        <div class="new" @click="toNewsDetail(item)">
          <h6>{{item.title}}</h6>
          <p>
            {{item.intro}}
          </p>
          <img :src="path+item.imageUrl" alt="">
          <div class="line"></div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" class="hidden-sm-and-up new-box" v-if="index!=2" v-for="(item, index) in newsData" :key="'c'+index">
        <div class="new" @click="toNewsDetail(item)">
          <h6>{{item.title}}</h6>
          <p>
            {{item.intro}}
          </p>
          <img :src="path+item.imageUrl" alt="">
          <div class="line"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data() {
    return {
      path: window.path,
      banner: null,
      productData: null,
      inforData: null,
      newsData: null,
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.axios.get('/services/index/index.json').then(
        response => {
          let data = response.data.data
          this.banner = data.banner[0].bannerUrl.split(',').splice(0, 3)
          this.getProudct()
          this.getInfor()
          this.getNews()
        },
        response => {
          // error callback
        }
      )
    },
    getInfor() {
      let postData = {
        params: {
          status: 2,
          functionId: '95e8223a4f6b42b9ab03eab53d5dbc9f'
        }
      }
      this.axios.get('/services/goodfocus/getlist.json', postData).then(
        response => {
          this.inforData = response.data.data.data[0]
        },
        response => {
          // error callback
        }
      )
    },
    getNews() {
      let postData = {
        params: {
          status: 2,
          functionId: 'c6740cc522604a04aaa9f691ccd00d4e'
        }
      }
      this.axios.get('/services/goodfocus/getlist.json', postData).then(
        response => {
          this.newsData = response.data.data.data
        },
        response => {
          // error callback
        }
      )
    },
    getProudct() {
      let postData = {
        params: {
          status: 2,
          functionId: '30deb9b1c6e94fb79946794ba8c7d5dd'
        }
      }
      this.axios.get('/services/goodfocus/getlist.json', postData).then(
        response => {
          this.productData = response.data.data.data
        },
        response => {
          // error callback
        }
      )
    },
    toProductDetail(val) {
      this.axios.get('/services/goodfocus/index.json').then(
        response => {
          let data = response.data.data
          console.log(data)
          this.baseData = data.serviceSystem.forEach((v, i) => {
            if (val.relationId == v.id) {
              router.push({
                path: '/product',
                query: { part: i, pid: val.id }
              })
            }
          })
        },
        response => {
          // error callback
        }
      )
    },
    toNewsDetail(val) {
      this.axios.get('/services/mall/index.json').then(
        response => {
          let data = response.data.data
          console.log(data)
          this.baseData = data.serviceSystem.forEach((v, i) => {
            if (val.relationId == v.id) {
              router.push({
                path: '/news',
                query: { part: i, pid: val.id }
              })
            }
          })
        },
        response => {
          // error callback
        }
      )
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="stylus" scoped>
nav
  position relative
  .orther
    width 100%
    position absolute
    top 50%
    transform translateY(-50%)
    z-index 10
    span
      display block
      text-align center
      color #ffffff
      &.desc
        font-size 1.5rem
      &.en
        font-size 0.8rem
      &.title
        width 20rem
        height 1.5rem
        line-height 1.5rem
        margin 1rem auto 0
        border 1px solid
        font-size 0.8rem
.product
  padding-top 2rem
  padding-bottom 5rem
  &>h5
    margin 0
    color #1C1C1C
    font-size 2rem
  &>p
    color #9F9F9F
    font-size 1.2rem
    margin-bottom 0.6rem
  .content
    padding 1rem 0 0.8rem
    .box
      margin 5px
      box-shadow 3px 2px 6px rgba(239, 236, 236, 0.76)
      font-size 0
      .img-box
        position relative
        img.hbg
          width 44px
          height 44px
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          visibility hidden
        img.bg
          box-sizing border-box
      .desc
        height 2rem
        padding 1.5rem 0
        p
          margin 0
          font-size 0.8rem
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
    .box:hover
      box-shadow 6px 4px 12px rgba(176, 176, 176, 0.76)
      .desc
        background rgba(117, 186, 43, 1)
        color #fff
      img.hbg
        visibility visible
      img.bg
        filter brightness(0.7)
.about
  padding-top 6rem
  padding-bottom 6rem
  background rgba(247, 248, 250, 1)
  .text
    overflow hidden
    text-align left
    &>h5
      margin 0
      color #1C1C1C
      font-size 2rem
    &>p
      color #9F9F9F
      font-size 1.2rem
    &>div
      color #585858
      font-size 1.2rem
      height 10.9rem
      margin 4rem 0 6rem
      -webkit-box-orient vertical
      -webkit-line-clamp 4
      overflow hidden
    & .btn
      display block
      width 147px
      height 48px
      line-height 48px
      background rgba(117, 186, 43, 1)
      border-bottom 2px solid #6eb82d
      color #ffffff
      text-decoration none
      text-align center
      font-size 1.2rem
  .img
    padding-left 2rem
    padding-top 20px
  img
    box-shadow 30px -20px 0px #75ba2b
.news
  padding-top 3rem
  padding-bottom 2rem
  &>h5
    margin 0
    color #1C1C1C
    font-size 2rem
  &>p
    color #9F9F9F
    font-size 1rem
    margin-bottom 3rem
</style>
