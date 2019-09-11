// pages/comment/comment.js
const db=wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //detail对象
    detail:{},
    content:'',
    score:5,
    images:[],
    fileIds:[],
    movieId:-1,
    commentList: {},
    nickName: "",
    avatarUrl: ""
  },

  onContentChange:function(event){
    this.setData({
      content:event.detail
    });
  },

  onScoreChange:function(event){
    this.setData({
      score:event.detail
    });
  },

  review: function(event){
    console.log(event)
    var that = this
    wx.navigateTo({
      url: '/pages/commentlist/commentlist?movieid=' + that.data.movieId
    })
  },

  submit: function () {
    wx.showLoading({
      title: 'loading',
    })
    console.log(this.data.content, this.data.score);

    // 上传图片到云存储
    let promiseArr = [];
    for (let i = 0; i < this.data.images.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.images[i];
        let suffix = /\.\w+$/.exec(item)[0]; // 正则表达式，返回文件扩展名
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            });
            reslove();
          },
          fail: console.error
        })
      }));
    }

    Promise.all(promiseArr).then(res => {
      // 插入数据
      db.collection('comment').add({
        data: {
          content: this.data.content,
          score: this.data.score,
          movieid: this.data.movieId,
          fileIds: this.data.fileIds,
          nickName: this.data.nickName,
          avatarUrl: this.data.avatarUrl
        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
        })
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
        })
      })

     


    });

  },

  uploadImg:function(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    //获取从电影列表传来的movieid
    this.setData({
      movieId: options.movieid
    })
    console.log(options);
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'getDetail',
      data:{
        movieid:options.movieid
      }
    }).then(res=>{
      wx.hideLoading();
      console.log(res);
      this.setData({
        //将字符串result解析成对象 为了提取subject内容
        detail:JSON.parse(res.result)
      })
      return res;
    }).catch(err=>{
      return err;
    })
    
    var that = this;//this作用域问题 少了这句 下面this.setdata报错
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        //var province = userInfo.province
        //var city = userInfo.city
        var country = userInfo.country
        that.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        })
        //console.log(userInfo)
      }
    })

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