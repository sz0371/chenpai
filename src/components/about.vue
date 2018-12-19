<template>
  <div class="about">
    <nav class="nav">
      <img :src="path+banner" alt="">
      <div>
        <span class="desc">关于我们</span>
        <span class="en">About us</span>
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
            <router-link to="/about">关于我们</router-link>
            >
            <span @click="changeCurrent(ispart)">{{baseData[ispart].name}}</span>
          </div>
        </el-col>
      </el-col>
      <el-col :xs="24" style=" font-size: 1.2rem;text-align: left;padding-top: 3rem;padding-bottom: 4rem">
        <div v-if="isNeed">
          <div class="com-padding" v-if="detailData" v-html="detailData.detail"></div>
        </div>
        <div v-else>
          <el-col v-if="detailData" :xs="24" class="com-padding">
            <img  :src="detailData.imageUrl" alt="">
            <!-- <img src="../../src/assets/img/tem2.jpg" alt=""> -->
          </el-col>
          <!-- <el-col :xs="24" class="hidden-xs-only com-padding">
            <img src="../../src/assets/img/tem.jpg" alt="">
          </el-col> -->
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
      banner: '',
      ispart: 0,
      num: 1
    }
  },
  created() {
    this.ispart = (this.$route.query.part || 0) - 0
    this.init()
  },
  computed: {
    isNeed: function() {
      return this.ispart != this.num - 1
    }
  },
  methods: {
    init() {
      this.axios.get('/services/aboutus/index.json').then(
        response => {
          let data = response.data.data
          this.baseData = data.serviceSystem.map(v => ({
            name: v.name,
            id: v.id
          }))
          this.banner = data.banner[0].bannerUrl.split(',')[0]
          this.num = this.baseData.length
          this.getList()
        },
        response => {
          // error callback
        }
      )
    },
    getList() {
      if (this.ispart == 2) {
        return
      }
      let postData = {
        params: {
          relationId: this.baseData[this.ispart].id
        }
      }
      this.axios.get('/services/aboutus/getlist.json', postData).then(
        response => {
          this.detailData = response.data.data[0]
        },
        response => {
          // error callback
        }
      )
    },
    changeCurrent(val) {
      this.ispart = val
      router.push({ path: '/about', query: { part: val } })
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
.about {
  font-size: 0;

  .text>div {
    display: block;
  }
}
</style>
