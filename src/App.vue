<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
.uni-calendar--fixed{
  width: 100%!important;
  height: 100%!important;
  overflow: auto!important;
}

swiper-item {
    overflow: auto!important;
}
</style>
