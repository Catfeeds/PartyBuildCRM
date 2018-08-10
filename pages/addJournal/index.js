var week = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_: '',                      // 传给后台时间
    date: '',                       // 时间
    content: '',                    // 内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date_: week.getDates(1)[0].year + '-' + week.getDates(1)[0].month + '-' + week.getDates(1)[0].day,
      date: week.getDates(1)[0].year + '-' + week.getDates(1)[0].month + '-' + week.getDates(1)[0].day + ' (' + week.getDates(1)[0].week + ')'
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
   * 时间选择器
   */
  bindDateChange: function (e) {
    var dateArry = [];
    for (var i = 0; i < 1; i++) {
      var dateObj = week.dateLater(e.detail.value, i);
      dateArry.push(dateObj)
    }
    this.setData({
      date_: e.detail.value,
      date: dateArry[0].year + '-' + dateArry[0].month + '-' + dateArry[0].day + ' (' + dateArry[0].week + ')'
    });
    return dateArry;
  },

  /**
   * 选择上一天
   */
  leftTime: function (e) {
    var that = this;
    var ldate = that.data.date_;
    var arr = [];
    arr.push(ldate.split("-"));

    var sec = parseInt(arr[0][2]) - 1;
    var month = parseInt(arr[0][1]);
    var year = parseInt(arr[0][0]);
    if (sec < 10) {
      if (sec == 0) {
        month--;
        sec = week.getLastDay(year, month);
      } else {
        sec = "0" + sec
      }
    }
    if (month < 10) {
      if (month == 0) {
        year--;
        month = 12;
        sec = 31;
      } else {
        month = '0' + month;
      }
    }
    var newTime = year + '-' + month + '-' + sec;

    var dateArry = [];
    for (var i = 0; i < 1; i++) {
      var dateObj = week.dateLater(newTime, i);
      dateArry.push(dateObj)
    }

    wx.request({
      url: '',
      data: {
        userId: '',
        date: dateArry[0].year + '-' + dateArry[0].month + '-' + sec
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // 内容获取

        that.setData({
          date: dateArry[0].year + '-' + month + '-' + sec,
          date: dateArry[0].year + '-' + month + '-' + sec + ' (' + dateArry[0].week + ')'
        });
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  /**
   * 选择下一天
   */
  rightTime: function (e) {
    var that = this;
    var ldate = that.data.date_;
    var arr = [];
    arr.push(ldate.split("-"));

    var sec = parseInt(arr[0][2]) + 1;
    var month = parseInt(arr[0][1]);
    var year = parseInt(arr[0][0]);
    if (sec < 10) {
      sec = "0" + sec
    } else if (sec == parseInt(week.getLastDay(year, month)) + 1) {
      month++;
      sec = '01';
    }
    if (month < 10) {
      month = '0' + month;
    } else if (month == 12) {
      year++;
      month = '01';
      sec = '01';
    }

    var newTime = year + '-' + month + '-' + sec;

    var dateArry = [];
    for (var i = 0; i < 1; i++) {
      var dateObj = week.dateLater(newTime, i);
      dateArry.push(dateObj)
    }

    wx.request({
      url: '',
      data: {
        userId: '',
        date: dateArry[0].year + '-' + dateArry[0].month + '-' + sec
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // 内容获取

        that.setData({
          date_: dateArry[0].year + '-' + dateArry[0].month + '-' + sec,
          date: dateArry[0].year + '-' + month + '-' + sec + ' (' + dateArry[0].week + ')'
        });
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 提交
   */
  sure: function () {
    var that = this;
    wx.request({
      url: '',
      data: {
        userId: '',
        date: dateArry[0].year + '-' + dateArry[0].month + '-' + sec,
        content: that.data.content
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        that.setData({
          refce: false,
        });
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 取消
   */
  cancle: function () {

    this.setData({
      refce: false,
      content: ''
    });
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 输入的内容
   */
  newContent: function (value) {
    this.setData({
      content: value.detail.value
    })
  }

})