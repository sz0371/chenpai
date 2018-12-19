<template>
  <div>
    <v-header current='home'></v-header>
    <router-view class="box-container" />
    <v-footer></v-footer>
  </div>
</template>
<script>
import vHeader from './components/commen/header.vue'
import vFooter from './components/commen/footer.vue'
export default {
  data() {
    return {}
  },
  created() {},
  methods: {},
  components: {
    vHeader,
    vFooter
  }
}
</script>
<style lang="stylus">
.nav
  position relative
  div
    width 100%
    position absolute
    bottom 1rem
    padding-left 1rem
    box-sizing border-box
  span
    display block
    color #ffffff
    text-align left
    &.desc
      font-size 1.2rem
    &.en
      font-size 0.6rem
.nav-bar
  height 2.5rem
  line-height 2.5rem
  font-size 0.8rem
  color #ffffff
  background #75BA2B
  text-align left
  box-sizing border-box
  a
    text-decoration none
    background #75BA2B
    font-size 0.6rem
    color #ffffff
    height 2rem
    padding 0 1rem
    text-align left
    line-height 2rem
  a
    text-decoration none
    color #fff
  ul
    list-style none
    margin 0
    padding 0
    li
      float left
      padding 0 1rem
      &.cur
        background #448301
.new
  padding 30px 0
  text-align left
  border-top 3px solid #E4E4E4
  &:hover
    border-color #75BA2B
  h6
    margin 0
    font-size 1.2rem
    color #585858
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
  p
    margin 1rem 0
    font-size 1rem
    color rgba(139, 139, 139, 1)
    line-height 1.2rem
    display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 3
    overflow hidden
    height 3.6rem
  .line
    position relative
    height 2px
    width 44px
    margin 30px 0 10px
    background #585858
    &::after
      position absolute
      content ''
      right -6px
      top -5px
      border 6px solid transparent
      border-left-color #585858
</style>
