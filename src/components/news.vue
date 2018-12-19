<template>
  <div class="news">
    <nav class="nav">
      <img :src="path+banner" alt="">
      <div>
        <span class="desc">新闻资讯</span>
        <span class="en">News and information</span>
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
            <router-link to="/news">新闻资讯</router-link>
            >
            <span @click="changeCurrent(ispart)">{{baseData[ispart].name}}</span>
          </div>
        </el-col>
      </el-col>
      <el-col>
        <div v-if="detailData && pid == ''" class="show-list com-padding">
          <el-col :xs="12" :sm="8" class="hidden-sm-and-up" v-for="(item, index) in detailData" :key="'c'+index">
            <div class="new" @click="seeDetail(item.id)">
              <h6>{{item.title}}</h6>
              <p>
                {{item.intro}}
              </p>
              <img :src="path+item.imageUrl" alt="">
              <div class="line"></div>
            </div>
          </el-col>
          <el-col :xs="24" class="hidden-xs-only" v-for="(item, index) in detailData" :key="index">
            <div class="box" @click="seeDetail(item.id)">
              <div class="time">
                <span style="font-size: .9rem">{{item.createTimes.slice(0,4)}}</span><br>
                <span>{{item.createTimes.slice(5)}}</span>
              </div>
              <div class="text">
                <h6>{{item.title}}</h6>
                <div class="line"></div>
                <p>{{item.intro}}</p>
              </div>
              <div class="img">
                <img :src="path+item.imageUrl" alt="">
              </div>
            </div>
          </el-col>
          <el-col>
            <el-pagination v-if="total>0" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="4" :total="total">
            </el-pagination>
          </el-col>
        </div>
        <div v-if="detail && pid != ''" class="news-detail com-padding">
          <div v-html="detail.detail"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
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
      currentPage: 1,
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
      this.axios.get('/services/mall/index.json').then(
        response => {
          let data = response.data.data
          this.baseData = data.serviceSystem.map(v => ({
            name: v.name,
            id: v.id
          }))
          this.banner = data.JOINUSbanner[0].bannerUrl.split(',')[0]
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
          this.detailData = this.detailDataAll.slice(0, 4)
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
      router.push({ path: '/news', query: { part: val } })
    },
    seeDetail(val) {
      this.pid = val
      router.push({
        path: '/news',
        query: { part: this.ispart, pid: this.pid }
      })
    },
    handleCurrentChange(val) {
      let star = 4 * (val - 1)
      this.detailData = this.detailDataAll.slice(star, star + 4)
    }
  },
  watch: {
    $route(to, from) {
      this.getList()
    }
  }
}
</script>
<style lang="stylus" scoped>
.news
  font-size 0
.show-list
  padding-top 2rem
  padding-bottom 3rem
  .box
    display flex
    font-size 1.5rem
    padding 1rem 2rem
    height 5rem
    margin-bottom 2rem
    text-align left
    .time
      box-sizing border-box
      flex 0 0 5rem
      height 5rem
      padding 1rem 0.5rem
      color #ffffff
      background #626262
    .text
      flex 1
      padding 0 2rem
      overflow hidden
      h6
        margin 0
        font-size 1.2rem
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      p
        margin 0
        font-size 1rem
        color #8D8D8D
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .line
        width 2rem
        height 1px
        margin 1.2rem 0
        background #D6D6D6
    .img
      flex 0 0 10rem
      height 5rem
      img
        height 100%
    &:hover
      background url('../../src/assets/img/newsbg.png') no-repeat 100% 100%
      background-size 100% 100%
      color #fff
      .time
        color #75BA2B
        background #ffffff
      .text
        p
          color #fff
.news-detail
  padding-top 2rem
  padding-bottom 3rem
  font-size 1rem
  text-align left
  overflow hidden
</style>
