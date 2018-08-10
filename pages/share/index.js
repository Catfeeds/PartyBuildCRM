// pages/share/index.js
var total = 0;              // 初始化合计价格的数值
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { 
        name: '0',
        value: '美国',
        checked: false,
        list: [
          {
            name: '0',
            value: '列表一',
            check: 'false',
            price: '66'
          },
          {
            name: '1',
            value: '列表二',
            check: 'false',
            price: '55'
          }
        ],
        isClick: true
      },
      { 
        name: '1',
        value: '中国',
        checked: false,
        list: [
          {
            name: '0',
            value: '列表一',
            check: 'false',
            price: '66'
          },
          {
            name: '1',
            value: '列表二',
            check: 'false',
            price: '55'
          }
        ],
        isClick: false
      },
      { 
        name: '2',
        value: '巴西',
        checked: false,
        list: [
          {
            name: '0',
            value: '列表一',
            check: 'false',
            price: '66'
          },
          {
            name: '1',
            value: '列表二',
            check: 'false',
            price: '55'
          }
        ],
        isClick: false
      },
    ],
    color: '#ffffff',
    total: ""
  },

  /**
   * 一级选择
   */
  checkboxChange: function (e) {
    var items = this.data.items;
    var checkArr = e.currentTarget.dataset.value;
    items[checkArr].checked = !items[checkArr].checked;
    if (items[checkArr].checked == true) {
      // 二级样式随之变化
      for (var j = 0; j < items[checkArr].list.length; j++) {
        items[checkArr].list[j].checked = true;
        total += parseFloat(items[checkArr].list[j].price);
      }
    }else {
      for (var j = 0; j < items[checkArr].list.length; j++) {
        items[checkArr].list[j].checked = false;
        total -= parseFloat(items[checkArr].list[j].price);
      }
    }
    this.setData({
      items: items,
      total: total
    }) 
  },

  /**
   * 二级选择
   */
  childChange: function (e) {
    var items = this.data.items;
    var checkArr = e.currentTarget.dataset.value;
    var id = e.currentTarget.dataset.id;
    items[id].list[checkArr].checked = !items[id].list[checkArr].checked;
    if (items[id].list[checkArr].checked == false) {
      items[id].checked = false;
      total -= parseFloat(items[id].list[checkArr].price);
    }else {
      total += parseFloat(items[id].list[checkArr].price);
    }
    this.setData({
      items: items,
      total: total
    }) 
  },

  /**
   * 二级显示
   */
  dowmUp: function (e) {
    var items = this.data.items;
    var items = this.data.items;
    var checkArr = e.currentTarget.dataset.value;
    items[checkArr].isClick = !items[checkArr].isClick;
    this.setData({
      items: items
    }) 
  },


  /**
   * 合计价格
   */
  totle: function (e) {
    var id = e.currentTarget.dataset.id;
    items[id].list[checkArr].checked = !items[id].list[checkArr].checked;
    if (items[id].list[checkArr].checked == false) {
      items[id].checked = false;
    }
  },

  /**
   * 分享
   */
  share: function (e) {
    wx.request({
      url: '',
      data: {

      },
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '',
      data: {

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // 初始化获取分享列表
        
      },
      fail: function (res) { },
      complete: function (res) { },
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
  
  }
})