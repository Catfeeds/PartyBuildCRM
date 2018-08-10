// pages/info/index.js
var address = require('../../utils/city.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue: true,         // 判断是否为编辑状态
    eamilTrue: false,     // 判断邮箱是否正确
    phoneTrue: false,     // 验证手机号
    name_: '',
    name: '',
    sex: '',
    phone: '',
    email: '',
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areaInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync("userInfo");
    var sex = '';
    if (userInfo.detail.userInfo.gender == 1) {
      sex = '男'
    }else {
      sex = '女'
    }
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      name_: userInfo.detail.userInfo.nickName,
      sex: sex,
      areaInfo: userInfo.detail.userInfo.province + ',' + userInfo.detail.userInfo.city,
      provinces: address.provinces,
      citys: address.citys[id],
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 可编辑状态
   */
  tip: function (e) {
    this.setData({
      istrue: false
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
    // 执行显示动画
    that.startAddressAnimation(true)
    that.setData({
      istrue: false
    })
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
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name;
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
    var provinceNum = value[0]
    var cityNum = value[1]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
      })
    } 
  },

  /**
   * 验证邮箱
   */
  email: function (email) {
    let that = this;
    var email = email.detail.value; // 获取输入框的数据
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = true;
    if (email == '') {
      emailVar = true;
    }else {
      emailVar = reg.test(email);
    }
    that.setData({
      eamilTrue: emailVar,
      email: email
    })
  },

  /**
   * 验证手机号
   */
  phone: function (phone) {
    let that = this;
    var phone = phone.detail.value;
    var reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
    var phoneVar = true;
    if (phone == '') {
      phoneVar = true;
    }else {
      phoneVar = reg.test(phone);
    }
    that.setData({
      phoneTrue: phoneVar,
      phone: phone
    })
  },

  /**
   * 昵称
   */
  name_: function (name_) {
    this.setData({
      name_: name_.detail.value
    })
  },

  /**
   * 姓名
   */
  name: function (name) {
    this.setData({
      name: name.detail.value
    })
  },

  /**
   * 保存
   */
  save: function (event) {
    var that = this;
    if (that.data.eamilTrue == false) {
      wx.showModal({
        title: '',
        content: "请输入正确的邮箱账号",
        showCancel: false,
      })
    }else if (that.data.phoneTrue == false) {
      wx.showModal({
        title: '',
        content: "请输入正确的手机号",
        showCancel: false,
      })
    }else {
      wx.request({
        url: '',
        method: 'POST',
        data: {
          name_: that.data.name_,
          name: that.data.name,
          sex: that.data.sex,
          phone: that.data.phone,
          address: that.data.areaInfo,
          email: that.data.email
        },
        success: function (msg) {
          that.data.istrue = true;
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500
          })
        }
      })
    }
  }

})