// pages/register/index.js
var code = require('../../utils/util.js');
var address = require('../../utils/city.js');
Page({

  /**
   * 页面的初始数据
   */
  /**
   * 控件当前显示的数据
   * provinces:所有省份
   * citys 选择省对应的所有市,
   * areas选择市对应的所有区
   * areaInfo：点击确定时选择的省市县字符拼接
   * animationAddressMenu：动画
   * addressMenuIsShow：是否可见
   */
  data: {
    isShow: false,           // 默认按钮1显示，按钮2不显示
    sec: "60",　　　　　　　　 // 设定倒计时的秒数
    noWaring: false,          // 判断是否填写正确
    phoneVal: '',
    confirmVal: '',
    confirmTrue: false,        // 判断验证码是否输入正确
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    areaInfo: '',
    name: '',
    weixin: '',
    email: '',
    comparyName: '',
    place: '',
    resion: '',
    emailTrue: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var userInfo = wx.getStorageSync("userInfo");
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      weixin: userInfo.detail.userInfo.nickName,
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    });
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
    return {
      title: '分享',
      path: '/pages/index/index',
      success: function (res) {

      }
    }
  },

  /**
   * 验证码倒计时
   */
  getCode: function () {
    var _this = this;　　　　     // 防止this对象的混杂，用一个变量来保存
    var time = _this.data.sec　　 // 获取最初的秒数
    code.getCode(_this, time);　　// 调用倒计时函数
    wx.request({
      url: '',
      data: {},
      method: "POST",
      success: function(msg) {
       
      }
    })
  },

  /**
   * 手机号
   */
  phoneVal: function(phone) {
    this.setData({
      phoneVal: phone.detail.value
    })
  },

  /**
   * 微信号
   */
  weixin: function(weixin) {
    this.setData({
      weixin: weixin.detail.value
    })
  },

  /**
   * 验证码
   */
  confirmVal: function (confirm) {
    this.setData({
      confirmVal: confirm.detail.value
    });
    wx.request({
      url: '',
      data: {},
      method: "POST",
      success: function (msg) {
        _this.data.confirmTrue = true;
      }
    })
  },

  /**
   * nextTap
   */
  nextTap: function(next) {
    var _this = this;
    if (_this.data.confirmTrue == true) {
      
    }else {
      _this.data.noWaring == true
    }
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this;
    console.log(that);
    // 如果已经显示，不在执行显示动画
    if (that.data.addressMenuIsShow) {
      return
    }
    // 执行显示动画
    that.startAddressAnimation(true)

  },

  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this;
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 200,
      timingFunction: "ease-in",
      delay: 0
    });
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      animation.translateY(0 + 'vh').step()
    } else {
      animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: animation.export(),
      addressMenuIsShow: isShow,
    })
  },

  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },

  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },

  // 点击蒙版时取消组件的显示
  hideCitySelected: function (e) {
    this.startAddressAnimation(false)
  },

  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [provinceNum, cityNum, countyNum],
      })
    }
  },

  /** 
   * 姓名
   */
  name: function(name) {
    this.setData({
      name: name.detail.value
    })
  },

  /** 
   * 邮箱
   */
  mailbox: function (email) {
    // emailTrue
    var email = email.detail.value; // 获取输入框的数据
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(email);
    this.setData({
      email: email.detail.value,
      emailTrue: emailVar
    })
  },

  /** 
   * 单位名称
   */
  comparyName: function (comparyName) {
    this.setData({
      comparyName: comparyName.detail.value
    })
  },

  /** 
   * 职位
   */
  place: function (place) {
    this.setData({
      place: place.detail.value
    })
  },

  /**
   * 理由
   */
  resion: function (resion) {
    this.setData({
      resion: resion.detail.value
    })
  },

  /**
   * 提交
   */
  btn: function (event) {
    var that = this;
    if (that.data.name == '' && that.data.email == '' && that.data.emailTrue == false && that.data.comparyName == '' && that.data.place == '' && that.data.areaInfo == '') {
      wx.request({
        url: '',
        method: 'POST',
        // 请求头部  
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          phone: taht.data.phoneVal,
          name: that.data.name,
          weixin: that.data.weixin,
          email: that.data.email,
          comparyName: that.data.comparyName,
          place: that.data.place,
          areaInfo: that.data.areaInfo,
          resion: that.data.resion
        },
        success: function(msg) {
          wx.showModal({
            title: '',
            content: "之图红盟会在1-3个工作日内审核，若审核通过，我们将用短信提醒您。",
            showCancel: false,
            confirmText: "我知道了",
            confirmColor: '#C71B1B',
            success: function (res) {
              if (res.confirm) {
                // 确定后返回上一页
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      })
      
    }else {
      wx.showModal({
        title: '',
        content: "注册信息填写不全",
        showCancel: false,
        confirmText: "继续填写",
        confirmColor: '#C71B1B',
        success: function (res) {
          
        }
      })
    }
  }

});
var isEmptyObject = function (e) {
  var temp;
  for (temp in e)
    return !1;
  return !0
}