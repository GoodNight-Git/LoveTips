// pages/index.js
var dataList = require('../../config/example.js');
var colorsList = require('../../config/color.js');
var settingList = require('../../config/setting.js');
import Toast from '../../dist/toast/toast';
import {
  io_manager
} from '../../logic/io_manager.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topActive: "completing", //上面标签栏
    active: 0, //下面标签页
    currentData: 0,
    imageURL: "../../images/logo.jpg",
    exampleData: dataList.dataExampleList,
    selfInfo: {
      name: '游客',
      sex: 'f', //f女，m男，u未知
      logo: "../../images/logo.jpg",
      linked: false
    },
    otherInfo: dataList.otherInfo,
    colorsData: colorsList.colors,
    settingList: settingList.settings,
    popup_show: false,
    canUse: false, //判断是否授权登陆
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    // fontFamily: 'Muyao-Softbrush',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var res = wx.getStorageInfoSync();
    console.log(res.keys)
    if (res.keys.indexOf('selfInfo') == -1) {
      // var new_settings = that.data.settingList.filter((item, index) => index != 1);
      that.setData({
        canUse: false,
        // settingList:new_settings,
        selfInfo: {
          name: '游客',
          sex: 'f', //f女，m男，u未知
          logo: "../../images/logo.jpg",
          linked: false
        }
      })
    } else {
      var self = wx.getStorageSync('selfInfo');
      // var new_settings =[];
      // if(self.linked){
      //   new_settings = that.data.settingList;
      // }else{
      //   new_settings = that.data.settingList.filter((item, index) => index != 1);
      // }
      that.setData({
        canUse: true,
        selfInfo: self,
        // settingList: new_settings
      })

    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var self = wx.getStorageSync('selfInfo');
    // var canUse = wx.getStorageSync('canUse');
    // console.log(self)
    this.setData({
      popup_show: false,
      active: 0,
      currentData: 0,
      // selfInfo:self,
      // canUse:canUse
    });
  },
  bindGetUserInfo(e) {
    var that = this;
    var self = this.data.selfInfo;
    var info = e.detail.userInfo;
    self.name = info.nickName;
    self.sex = (info.gender == 1 ? 'n' : 'f');
    self.logo = info.avatarUrl;
    self.linked = true;
    that.setData({
      selfInfo: self,
      canUse: true
    });
    wx.setStorageSync('selfInfo', self);
    console.log(e.detail.userInfo)
    this.onLoad();
  },
  onChangeBar(event) {
    // event.detail 的值为当前选中项的索引
    var that = this;
    var detail = event.detail;

    this.setData({
      active: event.detail,
      currentData: event.detail,
    });
    if (detail == 0 || detail == 2) {
      this.setData({
        popup_show: false,
        active: event.detail,
        currentData: event.detail,
      });
    }
  },
  onOpen(event) {
    const {
      position,
      name
    } = event.detail;
    switch (position) {
      case 'left':
        Notify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`
        });
        break;
      case 'right':
        Notify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`
        });
        break;
    }
  },
  //取消swiper的滑动操作
  stopTouchMove(event) {
    return false;
  },
  //点击右上角头像
  sexToast: function() {
    var self = this.data.otherInfo.sex;
    if (self == "m") {
      Toast('这是他的心愿喔~');
    } else {
      Toast('这是她的心愿喔~');
    }
  },
  //点击右下角花朵图像
  completedToast: function() {
    Toast('这是一个已完成的心愿~');
  },
  //点击下方中间添加按钮
  addClick: function() {
    var that = this;
    var popup_show = this.data.popup_show;
    this.setData({
      popup_show: !popup_show
    })
    if (this.data.popup_show == false) {
      that.setData({
        active: 0,
        currentData: 0
      });
    }
  },
  onPopupClose: function() {
    this.setData({
      popup_show: false
    })
  },
  toAddDream: function() {
    wx.navigateTo({
      url: '../addDream/addDream'
    })
  },
  toGetDream: function() {
    wx.navigateTo({
      url: '../getDream/getDream'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})