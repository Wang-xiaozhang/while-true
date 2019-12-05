// js
Page({
  data: {   
    imageURL: "/images/tabbar/code.png",
  
    timer: null, // 保存定时器
    scrollTop: 5, // 设定触发条件的距离
     hiddenName : true
  },
  onPullDownRefresh() {
    // 监听该页面用户下拉刷新事件
    // 可以在触发时发起请求，请求成功后调用wx.stopPullDownRefresh()来结束下拉刷新
    console.log('下拉拉拉')
  },
  refresh() { // 函数式触发开始下拉刷新。如可以绑定按钮点击事件来触发下拉刷新
    wx.startPullDownRefresh({
      success(errMsg) {
        wx.showLoading({
          title: '拼命加载中...',
        })
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  scrollFn(e) {
    // 防抖，优化性能
    // 当滚动时，滚动条位置距离页面顶部小于设定值时，触发下拉刷新
    // 通过将设定值尽可能小，并且初始化scroll-view组件竖向滚动条位置为设定值。来实现下拉刷新功能，但没有官方的体验好
    clearTimeout(this.timer)
    if (e.detail.scrollTop < this.data.scrollTop) {
      this.timer = setTimeout(() => {
        this.refresh()
      }, 350)
    }
  },
  loadMore() { // 触底加载更多
    let len = this.data.list.length,
      lastItem = this.data.list[len - 1];
    for (let i = 0; i < len; i++) {
      this.data.list.push(lastItem + i + 1)
      this.setData({
        'list': this.data.list
      })
    }
  }
})