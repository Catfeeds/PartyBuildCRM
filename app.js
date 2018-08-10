//app.js
App({
  onLaunch: function(ops) {

   var logs = wx.getStorageSync('logs') || []
   logs.unshift(Date.now())
   wx.setStorageSync('logs', logs)

   if (ops.scene == 1044) {
     this.globalData.shareTicket = ops.shareTicket
   }
  },
  globalData: {
    userInfo: null,
    appid: 'wxb5d437aee307ee43',
    secrect: '11a30b9ad82135cbaefcfa2d5858c650'
  },
  
});


