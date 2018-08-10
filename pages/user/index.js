// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _tabIndex: 3,     // tabbar初始化状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo);
    this.setData({
      userImg: userInfo.detail.userInfo.avatarUrl,
      userName: userInfo.detail.userInfo.nickName
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
  
  },

  /**
   * 点击切换
   */
  tabIndex: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.href,
    });
  },

  /**
   * 跳转
   */
  info: function (info) {
    var id = info.currentTarget.dataset.id;
    console.log(id)
    if (id == 0) {
      wx.navigateTo({
        url: '/pages/info/index',
      })
    }else if (id == 1) {
      wx.navigateTo({
        url: '/pages/collect/index',
      })
    } else if (id == 2) {
      wx.navigateTo({
        url: '/pages/predeter/index',
      })
    } else if (id == 3) {
      wx.navigateTo({
        url: '/pages/productewm/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/productLink/index',
      })
    }
  }

})