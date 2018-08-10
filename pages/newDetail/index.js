// pages/newDetail/index.js
var page = 1;
var hadLastPage = false;  // 判断是否到最后一页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    id: '',
    num: 0,
    printIn: true,      // 判断是否又评论框、点赞、浏览
    istrue: false,       // 判断输入框是否点击
    textareaVal: '',
    lists: [             // 评论区
      {
        src: '../../images/1.jpg',
        name: '郑竹兵',
        time: '2018-06-01',
        content: '评论评论评论评论评论评论评论皮皮鲁评论评论匹配老婆了评论脸皮脸皮老婆了评论评论评论评论评论漂流瓶脸皮脸皮了'
      },
      {
        src: '../../images/1.jpg',
        name: '郑竹兵',
        time: '2018-06-01',
        content: '评论评论评论评论评论评论评论皮皮鲁评论评论匹配老婆了评论脸皮脸皮老婆了评论评论评论评论评论漂流瓶脸皮脸皮了'
      },
      {
        src: '../../images/1.jpg',
        name: '郑竹兵',
        time: '2018-06-01',
        content: '评论评论评论评论评论评论评论皮皮鲁评论评论匹配老婆了评论脸皮脸皮老婆了评论评论评论评论评论漂流瓶脸皮脸皮了'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isTure = true;
    if (parseInt(options.type) <= 1) {
      isTure = true;
    }else {
      isTure = false;
    }
    wx.request({
      url: '',
      method: "POST",
      // 请求头部  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: parseInt(options.id)
      },
      success: function(msg) {
        // 还有获取初始的评论区内容

        this.setData({
          id: options.id,
          type: parseInt(options.type),
          printIn: isTure,
          title: msg.data.title,
          publisher: msg.data.publisher,
          create_time: msg.data.create_time
        });
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
      url: 'http://zzb.pb.cn/home/News/detail',
      method: "POST",
      data: {
        length: parseInt(that.data.list.length),
        page: page
      },
      // 请求头部  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (msg) {
        if (msg.data.code == 10000) {
          console.log(msg);

          // 页数+1  
          page++;

          // 设置数据  
          that.setData({
          });
          console.log(moment_list);
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
      path: '/pages/newDetail/index?id' + this.data.id,
      success: function (res) {

      }
    }
  },

  /**
   * textarea
   */
  textareaVal: function(textarea) {
    var value = textarea.datail.value;
    this.setData({
      textareaVal: value
    })
  },

  /**
   * 点击评论切换输入框
   */
  printIn: function (printIn) {
    this.setData({
      istrue: true
    })
  },

  /**
   * 发表
   */
  tijiao: function (val) {
    var that = this;
    if (that.data.textareaVal.lenght > 0 && that.data.textareaVal.lenght <= 100) {
      wx.request({
        url: '',
        method: "POST",
        data: {
          type: that.data.type,
          id: that.data.id,
          content: that.data.textareaVal
        },
        // 请求头部  
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (msg) {
          that.setData({
            istrue: false,
            num: that.data.num++
          })
        }
      })
    } else if(that.data.textareaVal.lenght <= 0) {
      wx.showToast({
        title: '请填写你的感想',
        icon: 'error',
        duration: 1500
      })
    }else {
      wx.showToast({
        title: '字数超过100字',
        icon: 'error',
        duration: 1500
      })
    }
    
  },

  /**
   * 阴影触发istrue
   */
  shadow:function () {
    this.setData({
      istrue: false
    })
  }

})