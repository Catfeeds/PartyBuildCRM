// pages/indexDetail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "http://zzb.pb.cn/home/Product/detail",
      method: 'POST',
      // 请求头部  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: options.id,
        userid: '18158417280'
      },
      success: function(msg) {
        
        if (msg.data.code == 10000) {
          var item = msg.data.data; 
          that.setData({
            url: item.front_cover,
            title: item.title,
            price: item.price,
            num: item.share,
            range: item.range,
            case: item.case,
            content: item.description,
            id: item.id,
            collect: item.collect
          })
        }  
      }
    })
    
    wx.setNavigationBarTitle({
      title: "产品详情"  // 页面标题为路由参数
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var pages = getCurrentPages()    // 获取加载的页面
    var currentPage = pages[pages.length - 1]    // 获取当前页面的对象
    var url = currentPage.route    // 当前页面url
    return {
      title: '分享',
      path: '/pages/indexDetail/index?options=' + currentPage.options.options,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1500
        })
      }
    }
  },

  /**
     * 收藏
     */
  collect: function (event) {
    var that = this;
    var _collect = event.currentTarget.dataset.collect;
    // 初始化已收藏
    if (_collect == true) {
      _collect = false;
    } else {   // 初始化未收藏
      _collect = true;
    }
    event.currentTarget.dataset.collect = _collect;

    wx.request({
      url: '',
      data: {
        id: event.currentTarget.dataset.id,
        type: event.currentTarget.dataset.collect
      },
      method: 'post',
      success: function (msg) {
        that.setData({
          collect: _collect
        });
      }
    })

  },

  /**
   * 预定
   */
  predetermine: function () {
    var pages = getCurrentPages()    // 获取加载的页面
    var currentPage = pages[pages.length - 1]    // 获取当前页面的对象
    console.log(currentPage.options.options)
    wx.navigateTo({
      url: '/pages/predetermine/index?options=' + currentPage.options.options,
    })
  },

  /**
   * 在线体验
   */
  experience: function () {
    wx.navigateTo({
      url: '/pages/experience/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 申请成为渠道商
   */
  register: function () {
    wx.navigateTo({
      url: '/pages/register/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }


})