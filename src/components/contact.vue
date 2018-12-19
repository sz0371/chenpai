<template>
  <div class="contact">
    <nav class="nav">
      <img :src="path+banner" alt="">
      <div>
        <span class="desc">联系我们</span>
        <span class="en">Contact us</span>
      </div>
    </nav>
    <el-row :gutter="10">
      <el-col :xs="24" class="hidden-xs-only">
        <div class="nav-bar com-padding">
          您的位置:
          <router-link to="/">首页</router-link> >
          <router-link to="/contact">联系我们</router-link>
        </div>
      </el-col>
      <el-col :xs="24">
        <div class="content com-padding">
          <el-col v-if="infor" class="map hidden-sm-and-up" :xs="24" :sm="12">
            <baidu-map style="height:15rem" class="bm-view" :center="center" :zoom="zoom" @ready="handler" ak="V3xUDrbBHV5uR0Zkn06NiWix181ZVFML">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            </baidu-map>
          </el-col>
          <el-col :xs="24" :sm="12" class="desc">
            <h5>宸派电气（杭州）有限公司</h5>
            <div class="detail">
              <img src="../../src/assets/img/addr.png" alt="">
              <div>
                公司地址:
                <p v-if="infor">{{infor.address}}</p>
              </div>
            </div>
            <div class="detail">
              <img src="../../src/assets/img/phone.png" alt="">
              <div>
                联系电话:
                <p v-if="infor" class="green">{{infor.tel}}</p>
              </div>
            </div>
            <div class="detail">
              <img src="../../src/assets/img/mail.png" alt="">
              <div>
                企业邮箱:
                <p v-if="infor" class="green">{{infor.mail}}</p>
              </div>
            </div>
          </el-col>
          <el-col v-if="infor" class="map hidden-xs-only" :xs="24" :sm="12">
            <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" ak="V3xUDrbBHV5uR0Zkn06NiWix181ZVFML">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            </baidu-map>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { BaiduMap, BmNavigation } from 'vue-baidu-map'

export default {
  data() {
    return {
      path: window.path,
      infor: null,
      banner: '',
      center: { lng: 0, lat: 0 },
      zoom: 3
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
          this.infor = data.companyInformations[0]
          this.banner = data.banner[0].bannerUrl.split(',')[0]
        },
        response => {
          // error callback
        }
      )
    },
    changeCurrent(val) {
      this.ispart = val
      router.push({ path: '/about', query: { part: val } })
    },
    handler({ BMap, map }) {
      this.center = ''
      this.center = this.infor.address
      this.zoom = 16
    }
  },
  components: {
    BaiduMap,
    BmNavigation
  }
}
</script>
<style lang="stylus" scoped>
.contact
  font-size 0
.content
  padding-top 2rem
  padding-bottom 2rem
  overflow hidden
  .desc
    h5
      margin 0
      font-size 1.2rem
      height 2.5rem
      line-height 2.5rem
      border-bottom 1px solid #75BA2B
      text-align left
    .detail
      padding-top 1.2rem
      line-height 2.5rem
      img
        float left
        width 1rem
        margin-top 10px
      div
        margin-left 1.6rem
        font-size 0.8rem
        text-align left
      p
        font-weight 600
        &.green
          color #75BA2B
  .map
    padding-left 2.2rem
    .bm-view
      width 100%
      height 24rem
</style>
