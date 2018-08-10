Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        title: '智慧党建',
        price: 555,
        list: [
          {
            content: '列表一',
            url: 'https://www.baidu.com'
          },
          {
            content: '列表11',
            url: 'https://www.xiaomi.com'
          }
        ]
      },
      {
        title: '阿红的放大',
        price: 999,
        list: [
          {
            content: '阿斯顿发生大',
            url: 'https://www.taobao.com'
          },
          {
            content: '啊打撒发送到阿达撒嘎嘎的',
            url: 'https://www.jd.com'
          },
          {
            content: '阿斯顿和发掘死到',
            url: 'https://www.huawei.com'
          }
        ]
      }
    ],
    quit: false,             // 判断是否退出提示
    first: '列表一'          // 获取二级循环第一个
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '',
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        // 获取data
      },
      fail: function(res) {},
      complete: function(res) {},
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
   * 跳转外链
   */
  link: function (e) {
    wx.navigateTo({
      url: '/pages/link/index?url=' + e.currentTarget.dataset.url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 退出事件
   */
  quit: function () {
    this.setData({
      quit: true
    })
  }
})