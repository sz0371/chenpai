<template>
  <div class="product">
    <nav class="nav">
      <img :src="path+banner" alt="">
      <div>
        <span class="desc">产品中心</span>
        <span class="en">Product Center</span>
      </div>
    </nav>
    <el-row :gutter="10" class="box-container">
      <el-col :xs="24" class="nav-bar com-padding ">
        <el-col :xs="24" :span="16">
          <ul>
            <li :class="{cur: ispart==index }" v-for="(item, index) in this.baseData" :key="index" @click="changeCurrent(index)">{{item.name}}</li>
          </ul>
        </el-col>
        <el-col :span="8" class="hidden-xs-only">
          <div v-if="baseData">
            您的位置:
            <router-link to="/">首页</router-link> >
            <router-link to="/about">产品中心</router-link>
            >
            <span @click="changeCurrent(ispart)"> {{baseData[ispart].name}}</span>
          </div>
        </el-col>
      </el-col>
      <el-col>
        <div v-if="detailData && pid == ''" class="show-list com-padding">
          <el-col :xs="12" :sm="6" v-for="(item, index) in detailData" :key="index">
            <div class="box" :key="index" @click="seeDetail(item.id)">
              <img class="bg" :src="path+item.imageUrl" alt="">
              <div class="desc">
                <p>{{item.title}}</p>
                <div class="hbg">
                  <img src="../../src/assets/img/add.png" alt="">
                </div>
              </div>
            </div>
          </el-col>
        </div>
        <el-col>
          <el-pagination v-if="total>0 && pid == ''" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="8" :total="total">
          </el-pagination>
        </el-col>
        <div v-if="detail && pid != ''" class="product-detail com-padding">
          <el-col class="hidden-xs-only">
            <div class="detail-top">
              <div v-if="detail.imageUrl" style="padding: 0 1.2rem 2.2rem 0 ">
                <img :src="path+detail.imageUrl" alt="">
              </div>
              <div v-html="detail.subtitle"></div>
            </div>
            <div v-html="detail.detail"></div>
          </el-col>
          <el-col class="hidden-sm-and-up">
            <div>
              <div v-if="detail.imageUrl" style="padding: 0 1.2rem 2.2rem 0 ">
                <img :src="path+detail.imageUrl" alt="">
              </div>
              <div v-html="detail.subtitle"></div>
            </div>
            <div v-html="detail.detail"></div>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import vHeader from './commen/header.vue'
import vFooter from './commen/footer.vue'
export default {
  data() {
    return {
      path: window.path,
      baseData: null,
      detailData: null,
      detailDataAll: null,
      total: null,
      banner: '',
      detail: '',
      pid: '',
      ispart: 0
    }
  },
  created() {
    this.ispart = (this.$route.query.part || 0) - 0
    this.pid = this.$route.query.pid || ''
    this.init()
  },
  methods: {
    init() {
      this.axios.get('/services/goodfocus/index.json').then(
        response => {
          let data = response.data.data
          this.baseData = data.serviceSystem.map(v => ({
            name: v.name,
            id: v.id
          }))
          this.banner = data.banner[0].bannerUrl.split(',')[0]
          this.getList()
        },
        response => {
          // error callback
        }
      )
    },
    getList() {
      let postData = {
        params: {
          relationId: this.baseData[this.ispart].id
        }
      }
      this.axios.get('/services/goodfocus/getlist.json', postData).then(
        response => {
          let data = response.data.data
          this.detailDataAll = data.data
          if (this.pid != '') {
            this.detailDataAll.forEach(v => {
              if (this.pid == v.id) {
                this.detail = v
              }
            })
          }
          this.detailData = this.detailDataAll.slice(0, 8)
          this.total = data.data.length
        },
        response => {
          // error callback
        }
      )
    },
    changeCurrent(val) {
      this.pid = ''
      this.ispart = val
      router.push({ path: '/product', query: { part: val } })
    },
    seeDetail(val) {
      this.pid = val
      router.push({
        path: '/product',
        query: { part: this.ispart, pid: this.pid }
      })
    },
    handleCurrentChange(val) {
      let star = 8 * (val - 1)
      this.detailData = this.detailDataAll.slice(star, star + 8)
    }
  },
  components: {
    vHeader,
    vFooter
  },
  watch: {
    $route(to, from) {
      this.getList()
    }
  }
}
</script>
<style lang="stylus" scoped>
.product
  font-size 0
.show-list
  padding-top 2rem
  padding-bottom 3rem
  .box
    position relative
    margin-bottom 2rem
    border 1px solid #cdcdcd
    font-size 0
    .desc
      height 1.2rem
      padding 1rem 0 1.5rem
      position relative
      p
        margin 0
        font-size 1rem
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .hbg
        width 2.5rem
        height 2.5rem
        position absolute
        left 50%
        bottom -1.2rem
        transform translate(-50%)
        background #75ba2b
        border-radius 50%
        padding 12px
        box-sizing border-box
        box-shadow 2px 5px 8px rgba(176, 176, 176, 0.76)
        visibility hidden
  .box:hover
    box-shadow 6px 4px 12px rgba(176, 176, 176, 0.6)
    .desc
      background rgba(117, 186, 43, 1)
      color #fff
    .hbg
      visibility visible
.product-detail
  padding-top 2rem
  padding-bottom 3rem
  font-size 1.2rem
  text-align left
  overflow hidden
  .detail-top
    display flex
    &>div
      flex 1
</style>
