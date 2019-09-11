//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //不能直接通过fileid显示图片 要加入这个才行
    wx.cloud.init({
      traceUser: true,
    })

    this.globalData = {}
  }
})
