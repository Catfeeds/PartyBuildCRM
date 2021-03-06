// pages/productewm/index.js
var QR = require("../../utils/qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcPhld: 'https://www.baidu.com',        // 放链接
  },
  canvasId: "qrcCanvas",  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.size = this.setCanvasSize();//动态设置画布大小  
    this.createQrCode(this.data.qrcPhld, this.canvasId, this.size.w, this.size.h);  
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
   * 适配不同屏幕大小的canvas
   */
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;              // 不同屏幕下canvas的适配比例；设计稿是750宽  
      var width = res.windowWidth / scale;
      var height = width;                 // canvas画布为正方形  
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error  
      console.log("获取设备信息失败" + e);
    }
    return size;
  }, 

  createQrCode: function (str, canvasId, cavW, cavH) {
    // 调用插件中的draw方法，绘制二维码图片  
    QR.api.draw(str, canvasId, cavW, cavH);

  }, 

})