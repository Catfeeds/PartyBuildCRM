// pages/collect/index.js
var app = getApp();
var page = 1;         // 初次加载页数
var hadLastPage = false;  // 判断是否到最后一页
var cancelTig = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,       // 掩藏弹出框
    items: [
      {
        src: "../../images/2.jpg",
        collect: true,
        price: 55,
        title: '花果山的房间哈数据的哈卷卡式带回复可见阿什顿快减肥后阿卡家四大行付款就',
        id: 1
      },
      {
        src: "../../images/2.jpg",
        collect: false,
        price: 55,
        title: '花果山的房间哈数据的哈卷卡式带回复可见阿什顿快减肥后阿卡家四大行付款就',
        id: 2
      },
      {
        src: "../../images/2.jpg",
        collect: true,
        price: 55,
        title: '花果山的房间哈数据的哈卷卡式带回复可见阿什顿快减肥后阿卡家四大行付款就',
        id: 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.loadList();

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // 为了弹窗提示只提示一次
    wx.getStorage({
      key: 'cancelTig',
      success: function (res) {
        cancelTig = res.data;
      },
    });
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
    this.loadList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /** 
   * 数据请求封装
   */
  loadList: function (event) {
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
        sort: parseInt(that.data._sortItem) + 1,
        page: page,
        type: parseInt(that.data._item) + 1,
        userid: '18158417280'
      },
      success: function (msg) {
        console.log(msg);
        if (msg.data.code == 10000) {
          // 回调函数  
          var moment_list = that.data.items;

          for (var i = 0; i < msg.data.data.length; i++) {
            moment_list.push(msg.data.data[i]);
          }

          // 页数+1  
          page++;

          // 设置数据  
          that.setData({
            items: moment_list
          })
        } else {
          hadLastPage = true;
        }
        wx.hideLoading();
      }
    })

  },

  /**
   * 跳转详情页
   */
  toDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/indexDetail/index?id=' + id,
    });
  },

  /**
   * 收藏
   */
  collect: function (event) {
    var that = this;
    var _collect = event.currentTarget.dataset.collect;
    
    if (_collect == true) {   // 初始化已收藏
      _collect = false;
    } else {   // 初始化未收藏
      if (cancelTig == true) {
        
        wx.setStorage({
          key: 'cancelTig',
          data: false,
        });

        wx.getStorage({
          key: 'cancelTig',
          success: function (msg) {
            cancelTig = msg.data;
          }
        })
        console.log(cancelTig)
        that.setData({
          hiddenmodalput: false
        })
      }
    }
    event.currentTarget.dataset.collect = _collect;

    wx.request({
      url: '',
      data: {
        id: event.currentTarget.dataset.id,
        type: event.currentTarget.dataset.collect
      },
      // 请求头部  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (msg) {
        _collect = true;
        that.setData({
          collect: _collect
        });
      }
    })

  },

  // 弹窗确认  
  sure: function () {
    this.setData({
      hiddenmodalput: true
    })
  }

})