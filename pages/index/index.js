var app = getApp();
var page = 1;         // 初次加载页数
var hadLastPage = false;  // 判断是否到最后一页
var cancelTig = true;     // 收藏提示框提醒一次
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,       // 掩藏弹出框
    _item: 0,         // 上部导航栏的初始化选中
    _sortItem: 0,     // 上传时间默认选中
    _sort: false,     // 排序弹出框默认事件 
    quit: false,       // 初始化分享提示
    showTrue: true,   // 判断页面是否滚动之后分享按钮的状态
    _tabIndex: 0,     // tabbar初始化状态
    note: [
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList(); 
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      quit: true
    });

    // 为了弹窗提示只提示一次
    wx.getStorage({
      key: 'cancelTig_',
      success: function (res) {
        cancelTig = res.data;
      },
    });
  },

  /**
   * 获取用户信息
   */
  onGotUserInfo: function (e) {
    wx.setStorageSync("userInfo",e);
    console.log(e);
    console.log(e.detail)
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },

  /**
   * 获取手机号
   */
  getUserInfoFun: function () {
    var S = this;
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (res) {
        console.log(res);
        wx.login({
          success: function (e) {
            console.log(e.code);
            wx.request({
              url: "https://api.weixin.qq.com/sns/jscode2session?appid="+ app.globalData.appid +"&secret= "+ app.globalData.secrect +"&js_code="+ e.code +"&grant_type=authorization_code",
              method: "POSt",
              header: { 
                'content-type':'application/x-www-form-urlencoded'
                },
              success: function (m) {
                console.log(m)
              }
            })
            // wx.request({
            //   url: 'http://zzb.pb.cn/home/User/storage',
            //   method: "POST",
            //   // 请求头部  
            //   header: {
            //     'content-type': 'application/x-www-form-urlencoded'
            //   },
            //   data: {
            //     nickname: res.userInfo.nickName,
            //     header: res.userInfo.avatarUrl,
            //     gender: res.userInfo.gender,
            //     province: res.userInfo.province,
            //     city: res.userInfo.city,
            //     encryptedData: res.encryptedData,
            //     iv: res.iv
            //   },
            //   success: function (msg) {
            //     console.log("11")
            //   }
            // })
          }
        });
      },
      fail: S.showPrePage
    })
  },
  showPrePage: function () {
    this.setData({
      eye: false
    })
  },    

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserInfoFun()
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
  onReachBottom: function (event) {
    this.loadList();
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
      url: 'http://zzb.pb.cn/home/Product/sort',
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
          var moment_list = that.data.note;

          for (var i = 0; i < msg.data.data.length; i++) {
            moment_list.push(msg.data.data[i]);
          }

          // 页数+1  
          page++;

          // 设置数据  
          that.setData({
            note: moment_list
          })
        } else {
          hadLastPage = true;
        }
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
   * 跳转详情页
   */
  navigatorItem: function (event) {
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
    // 初始化已收藏
    if (_collect == true) {
      _collect = false;
    }else {   // 初始化未收藏
      _collect = true;  
      if (cancelTig == true) {

        wx.setStorage({
          key: 'cancelTig_',
          data: false,
        });

        wx.getStorage({
          key: 'cancelTig_',
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
        that.setData({
          collect: _collect
        });
      }
    })

  },

  /**
   * tab切换
   */
  navbarTap: function (event) {
    console.log(event.currentTarget.dataset.item);
    this.setData({
      _sort: false,
      note: [],
      _item: parseInt(event.currentTarget.dataset.item)
    });
    page = 1;
    hadLastPage = false;
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
   * 排序
   */
  selectNav: function (event) {
    this.setData({
      _sort: !this.data._sort
    })
  },

  /**
   * 排序的选择
   */
  sortTap: function (event) {
    page = 1;
    hadLastPage = false;
    this.setData({
      _sort: false,
      note: [],
      _sortItem: parseInt(event.currentTarget.dataset.sort)
    });
    this.loadList();
  },

  /**
   * 分享提示语
   */
  quit: function(event) {
    this.setData({
      quit: false
    })
  },

  /**
   * 页面滚动
   */
  handletouchmove: function (event) {
    this.setData({
      showTrue: false,
    })
  },

  /**
   * 滚动停止
   */
  handletouchend: function (event) {
    this.setData({
      showTrue: true,
    })
  },

  /**
   * 渠道商自由组合分享
   */
  shareBtn: function (e) {
    wx.navigateTo({
      url: '/pages/share/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 弹窗确认  
  sure: function () {
    this.setData({
      hiddenmodalput: true
    })
  }

})