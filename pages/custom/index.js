// pages/custom/index.js
var page = 1;
var hadLastPage = false;  // 判断是否到最后一页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _tabIndex: 2,     // tabbar初始化状态
    lists: []
  },

  onLoad: function () {
    
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
   * 加载列表
   */
  loadList: function (e) {
    if (hadLastPage != false) {
      wx.showToast({
        title: '到底啦',
      });
      return;
    }
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })

    wx.request({
      url: '',
      method: "POST",
      // 请求头部  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: page,
      },
      success: function (msg) {
        console.log(msg);
        if (msg.data.code == 10000) {
          // 回调函数  
          var moment_list = that.data.lists;

          for (var i = 0; i < msg.data.data.length; i++) {
            moment_list.push(msg.data.data[i]);
          }

          // 页数+1  
          page++;

          // 设置数据  
          that.setData({
            lists: moment_list
          })
        } else {
          hadLastPage = true;
        }
        wx.hideLoading();
      }
    })
  },

  /**
   * 跳转搜索页
   */
  search: function (e) {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },

  /**
   * 客户信息详情页跳转
   */
  customDetail: function (e) {
    wx.navigateTo({
      url: '/pages/customDetail/index?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 点击切换
   */
  tabIndex: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.href,
    });
  },

})