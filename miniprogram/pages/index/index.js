// pages/index.js
var dataList = require('../../config/example.js');
var colorsList = require('../../config/color.js');
// var io_manager = require('../../logic/io_manager.js');
import {io_manager} from '../../logic/io_manager.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topActive: "all", //上面标签栏
    active: 0, //下面标签页
    imageURL: "../../images/logo.jpg",
    exampleData: dataList.dataExampleList,
    selfInfo: dataList.selfInfo,
    colorsData: colorsList.colors,
    // fontFamily: 'Muyao-Softbrush',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var that = this;
    // io_manager.getTempFileURL(io_manager.const_id.font_path).then(res=>{
    //   wx.loadFontFace({
    //     family: that.data.fontFamily,
    //     source: 'url(' + res + ')',
    //     success(res) {
    //       console.log('成功')
    //       console.log(res.status)
    //     },
    //     fail: function (res) {
    //       console.log('失败')
    //       console.log(res.status)
    //     },
    //     complete: function (res) {
    //       console.log('完成')
    //       console.log(res.status)
    //     }
    //   });
    // });
  },
  onChangeBar(event) {
    // event.detail 的值为当前选中项的索引
    console.log(event.detail)
    this.setData({
      active: event.detail
    });
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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