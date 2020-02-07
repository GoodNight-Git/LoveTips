// pages/index.js
var dataList = require('../../config/example.js');
var colorsList = require('../../config/color.js');
import Toast from '../../dist/toast/toast';
import {io_manager} from '../../logic/io_manager.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topActive: "completing", //上面标签栏
    active: 0, //下面标签页
    imageURL: "../../images/logo.jpg",
    exampleData: dataList.dataExampleList,
    selfInfo: dataList.selfInfo,
    colorsData: colorsList.colors,
    popup_show:false
    // fontFamily: 'Muyao-Softbrush',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
  onChangeBar(event) {
    // event.detail 的值为当前选中项的索引
    var that = this;
    var detail = event.detail;
    
    this.setData({
      active: event.detail
    });
    if(detail==1){
      var popup_show = this.data.popup_show;
      
    } else if (detail == 2){
      wx.redirectTo({
        url: '../me/me'
      })
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
  sexToast:function(){
    var self = this.data.selfInfo.sex;
    if(self=="male"){
      Toast('这是她的心愿喔~');
    }else{
      Toast('这是他的心愿喔~');
    }
  },
  completedToast:function(){
    Toast('这是一个已完成的心愿~');
  },
  addClick:function(){
    var that = this;
    var popup_show = this.data.popup_show;
    this.setData({
      popup_show: !popup_show
    })
    if (this.data.popup_show == false) {
      that.setData({
        active: 0
      });
    }
  },
  onPopupClose:function(){
    this.setData({
      popup_show: false
    })
  },
  toAddDream:function(){
    wx.navigateTo({
      url: '../addDream/addDream'
    })
  },
  toGetDream:function(){
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      popup_show: false,
      active: 0
    });
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