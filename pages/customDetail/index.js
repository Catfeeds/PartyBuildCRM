// pages/customDetail/index.js
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
    name_: '',
    name: '',
    phone: '',
    info: '',
    list: [],
    heightAuto: '',         // 获取swiper自适应高度
    noTig: false,           // 判断是否修改
    phoneVal: false,        // 手机号验证
    id: '',                 // 该客户的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '',
      data: {
        id: options.id
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "POST",
      dataType: 'json',
      success: function (res) {
        // 处理客户信息
      },
      fail: function (res) { },
      complete: function (res) { },
    });

    this.setData({
      heightAuto: 'calc(100vh - 100rpx)',
      id: options.id
    })
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
      url: '',
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
          var moment_list = that.data.list;
          var heightAotu = that.data.heightAuto;
          heightAotu = 490 * msg.data.data.length + 'rpx';

          for (var i = 0; i < msg.data.data.length; i++) {
            moment_list.push(msg.data.data[i]);
          }
          // 设置数据  
          that.setData({
            list: moment_list,
            heightAuto: heightAotu
          });
          
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
    if (event.currentTarget.dataset.item == 1) {
      this.loadList();
    }
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
   * 进详情页
   */
  journalDetail: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/journal/index?id=' + id,
    });
  },

  /**
   * 验证手机号
   */
  phone: function (phone) {
    let that = this;
    var phone = phone.detail.value;
    var reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
    var phoneVar = reg.test(phone);
    if (phone == '') {
      phoneVal = true;
    }
    that.setData({
      phoneVal: phoneVar,
      phoneVal: phone
    })
  },

  /**
   * 修改
   */
  tip: function (e) {

    this.setData({
      noTig: true
    })
  },

  /**
   * 保存
   */
  save: function (e) {
    var that = this;
    if (that.data.phoneVal == true) {
      wx.request({
        url: '',
        data: {
          name_: that.data.nameValue_,
          phone: that.data.phoneValue,
          name: that.data.nameValue,
          info: that.data.infoValue
        },
        header: { 'content-type': 'application/x-www-form-urlencoded'},
        method: "POST",
        dataType: 'json',
        success: function(res) {
          that.setData({
            noTig: false
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }else {
      wx.showModal({
        title: '',
        content: "请输入正确的联系电话",
        showCancel: false,
      })
    }
  },

  /**
   * 删除
   */
  del: function (e) {
    var that = this;
    wx.showModal({
      title: '',
      content: '会删除联系人全部信息及其跟进日志哦，请慎重考虑！',
      confirmColor: '#333333',
      cancelColor: '#C71B1B',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: '',
            data: {
              id: that.data.id
            },
            header: { 'content-type': 'application/x-www-form-urlencoded'},
            method: "POST",
            dataType: json,
            responseType: text,
            success: function(res) {
              wx.navigateBack({
                delta: 1,
              })
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  },

  /**
   * 跳转添加日志
   */
  add: function (e) {
    wx.navigateTo({
      url: '/pages/add/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})