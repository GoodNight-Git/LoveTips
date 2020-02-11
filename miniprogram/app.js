//app.js
import {
  io_manager
} from 'logic/io_manager.js';
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      fontFamily: 'Muyao-Softbrush',
    }
    var that = this;
    io_manager.getTempFileURL(io_manager.const_id.font_path).then(res => {
      wx.loadFontFace({
        family: that.globalData.fontFamily,
        source: 'url(' + res + ')',
        success(res) {
          console.log('字体加载成功')
          console.log(res.status)
        },
        fail: function(res) {
          console.log('字体加载失败')
          console.log(res.status)
        },
        complete: function(res) {
          console.log('字体加载完成')
          console.log(res.status)
        }
      });
    });
    // wx.loadFontFace({
    //     family: that.globalData.fontFamily,
    //   // source: 'url(https://jzmstudio.github.io/LoveTips/fonts/Muyao-Softbrush.ttf)',
    //   source: 'url(https://fonts.googleapis.com/css?family= Ma + Shan + Zheng＆display = swap)',
    //     success(res) {
    //       console.log('字体加载成功')
    //       console.log(res.status)
    //     },
    //     fail: function(res) {
    //       console.log('字体加载失败')
    //       console.log(res.status)
    //     },
    //     complete: function(res) {
    //       console.log('字体加载完成')
    //       console.log(res.status)
    //     }
    //   });

  },

})