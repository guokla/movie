// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[]
  },

  //拉取电影信息
  getMovieList:function(){
   //加载框显示
    wx.showLoading({
      title: '加载中',
    })
     //调用云函数
    wx.cloud.callFunction({
      name: 'movielist',
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      console.log(res);
      this.setData({
        //concat拼接字符串 将字符串result解析成对象 为了提取subject内容
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      });
    wx.hideLoading();
    }).catch(err => {
      console.error(err);
    });
  },

  gotoComment:function(event){
    //获取自定义数据movieid的集合
    //跳转到新页面的同时保留当前页面
    //ES6方式
    console.log(event)
    wx.navigateTo({
      url: '/pages/comment/comment?movieid=' + event.target.dataset.movieid
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用云函数jiazai
    this.getMovieList();
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
    this.getMovieList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})