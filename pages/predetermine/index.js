// pages/ predetermine/index.js
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
    num: 1,
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    areaInfo: '',
    name: '',
    emailVar: true,
    email: '',
    phoneVar: true,
    phone: '',
    messageText: '',
    sureBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var item = JSON.parse(options.options);
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      url: item.href,
      title: item.title,
      price: item.price,
      total: parseInt(item.price) * parseInt(this.data.num),
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    });

    wx.setNavigationBarTitle({
      title: "立即预定"  // 页面标题为路由参数
    });
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var pages = getCurrentPages()    // 获取加载的页面
    var currentPage = pages[pages.length - 1]    // 获取当前页面的对象
    var url = currentPage.route    // 当前页面url
    return {
      title: '分享',
      path: '/pages/predetermine/index?options=' + currentPage.options.options,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1500
        })
      }
    }
  },

  /**
   * 减法
   */
  minus: function (event) {
    var that = this;
    var _num = parseInt(that.data.num);
    if (_num > 1) {
      that.setData({
        num: --_num,
        total: _num * event.currentTarget.dataset.price
      })
    }
  },

  /**
   * 加法
   */
  add: function (event) {
    var that = this;
    var _num = parseInt(that.data.num);
    that.setData({
      num: ++_num,
      total: _num * event.currentTarget.dataset.price
    })
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this;
    console.log(that);
    // 如果已经显示，不在执行显示动画
    if (that.data.addressMenuIsShow) {
      return
    }
    if (that.data.emailVar == true && that.data.phoneVar == true) {
      console.log(111);
      // 执行显示动画
      that.startAddressAnimation(true)
    } else if (that.data.emailVar == false) {
      wx.showModal({
        title: '',
        content: "请输入正确的邮箱",
        showCancel: false,
      })
    } else if (that.data.phoneVar == false) {
      wx.showModal({
        title: '',
        content: "请输入正确的手机号",
        showCancel: false,
      })
    }
    
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
   * 验证邮箱
   */
  mailbox: function(email) {
    let that = this;
    var email = email.detail.value; // 获取输入框的数据
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(email);
    if (email == '') {
      emailVar = true;
    }
    that.setData({
      emailVar: emailVar,
      email: email
    })
  },
  phoneTrue: function(e) {
    if (this.data.phoneVar == false) {
      wx.showModal({
        title: '',
        content: "请输入正确的手机号",
        showCancel: false,
      })
    }
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
      phoneVar = true;
    }
    that.setData({
      phoneVar: phoneVar,
      phone: phone
    })
  },
  emailTrue: function (e) {
    if (this.data.emailVar == false) {
      wx.showModal({
        title: '',
        content: "请输入正确的邮箱",
        showCancel: false,
      })
    }
  },
  nameTrue: function(name) {
    if (this.data.emailVar == false) {
      wx.showModal({
        title: '',
        content: "请输入正确的邮箱",
        showCancel: false,
      })
    } else if (this.data.phoneVar == false) {
      wx.showModal({
        title: '',
        content: "请输入正确的手机号",
        showCancel: false,
      })
    }
    
  },
  name: function(name) {
    this.setData({
      name: name.detail.value
    })
  },

  /**
   * 买家留言
   */
  messageText: function(msg) {
    this.setData({
      messageText: msg.detail.value
    })
  },

  /**
   * 立即预定
   */
  nowTap: function(event) {
    var that = this;
    if (that.data.name == '' || that.data.emailVar == false || that.data.phoneVar == false || that.data.areaInfo == '') {
      wx.showModal({
        title: '',
        content: "请完成所有带“*”项的内容，谢谢配合。",
        showCancel: false,
        confirmText: '继续填写',
        confirmColor: '#C71B1B'
      })
    }else {
      wx.request({
        url: '',
        data: {
          name: that.data.name,
          email: that.data.email,
          phone: that.data.phone,
          address: that.data.areaInfo,
          message: that.data.messageText
        },
        method: "post",
        success: function (msg) {
          that.data.sureBtn = true;
          wx.showToast({
            title: '预定成功',
            icon: 'success',
            duration: 1500
          })
        }
      })
    }
  }


})