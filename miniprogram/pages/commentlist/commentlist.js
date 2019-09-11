// pages/commentlist/commentlist.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {},
    movieId: "3150"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 获取id
    this.setData({
      movieId: options.movieid
    })
    console.log(this.data.movieId)
    let promiseArr = [];
    Promise.all(promiseArr).then(res => {
      // 插入数据
      db.collection('comment').where({
        movieId: options.movieId
      }).get().then(res => {
        console.log(res.data)
        this.setData({
          comment: res.data
        })
      })
    })
    console.log(this.data.comment)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})