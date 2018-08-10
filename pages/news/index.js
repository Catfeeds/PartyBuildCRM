// pages/news/index.js
var page = 1;             // 初始化的页数
var hadLastPage = false;  // 判断是否到最后一页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _item: 0,             // 上部导航栏的初始化选中
    _tabIndex: 1,         // 初始化tab状态 
    indicatorDots: false, // 是否显示面板指示点
    autoplay: false,      // 是否自动切换
    circular: true,       // 是否采用衔接滑动
    current: 0,           // 当前所在页面的 index
    interval: 500,        // 自动切换时间间隔
    duration: 500,         // 滑动动画时长
    news0: [],
    news1: [],
    news2: [],
    news3: [],
    heightAuto: ''         // 获取swiper自适应高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.loadList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 数据请求封装
   */
  loadList: function () {
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
      // 后台数据请求
      url: 'http://zzb.pb.cn/home/News/index',
      method: "POST",
      data: {
        type: parseInt(that.data._item) + 1,
        page: page,
      },
      // 请求头部  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (msg) {
        if (msg.data.code == 10000) {
          // 回调函数 
          if (parseInt(that.data._item) == 0) {
            var moment_list = that.data.news0;
            var heightAotu = that.data.heightAuto;
            heightAotu = 490 * msg.data.data.length + 'rpx';

            for (var i = 0; i < msg.data.data.length; i++) {
              moment_list.push(msg.data.data[i]);
            }
            // 设置数据  
            that.setData({
              news0: moment_list,
              heightAuto: heightAotu
            });
          } else if (parseInt(that.data._item) == 1) {
            var moment_list = that.data.news1;
            var heightAotu = that.data.heightAuto;
            heightAotu = 490 * msg.data.data.length + 'rpx';

            for (var i = 0; i < msg.data.data.length; i++) {
              moment_list.push(msg.data.data[i]);
            }
            // 设置数据  
            that.setData({
              news1: moment_list,
              heightAuto: heightAotu
            });
          } else if (parseInt(that.data._item) == 2) {
            var moment_list = that.data.news2;
            var heightAotu = that.data.heightAuto;
            heightAotu = 490 * msg.data.data.length + 'rpx';

            for (var i = 0; i < msg.data.data.length; i++) {
              moment_list.push(msg.data.data[i]);
            }
            // 设置数据  
            that.setData({
              news2: moment_list,
              heightAuto: heightAotu
            });
          } else {
            var moment_list = that.data.news3;
            var heightAotu = that.data.heightAuto;
            heightAotu = 490 * msg.data.data.length + 'rpx';

            for (var i = 0; i < msg.data.data.length; i++) {
              moment_list.push(msg.data.data[i]);
            }
            // 设置数据  
            that.setData({
              news3: moment_list,
              heightAuto: heightAotu
            });
          }
          
          // 页数+1  
          page++;

        } else {
          hadLastPage = true;
        }
        // 隐藏加载框  
        wx.hideLoading();
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '分享',
      path: '/pages/index/index',
      success: function (res) {

      }
    }
  },

  /**
   * tab切换
   */
  navbarTap: function (event) {
    page = 1;
    hadLastPage = false;
    this.setData({
      _item: event.currentTarget.dataset.item
    });
    this.loadList();
  },

  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    page = 1;
    hadLastPage = false;
    that.setData({ 
      _item: e.detail.current
    });
    this.loadList();
  },

  /**
   * 点击切换
   */
  tabIndex: function (event) {
    page = 1;
    hadLastPage = false;
    wx.navigateTo({
      url: event.currentTarget.dataset.href,
    });
  },

  /**
   * 进详情页
   */
  newsDetail: function(event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/newDetail/index?type=' + parseInt(that.data._item) +'&&id=' + id,
    });
  }

})