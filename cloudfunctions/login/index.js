// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

/**
 * 用户点击登陆时，成功获取用户信息后调用
 * user_info  用户信息的对象，即wx.getUserInfo返回值中的userInfo
 * 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  console.log('---------------')
  console.log(event.user_info)
  try {
    // 插入到relations数据库
    var res = await db.collection('user-info').add({
      data: {
        open_id: wxContext.OPENID,
        user_info: event.user_info
      }
    })
    return {
      info_id: res._id,
      is_success: true
    }
  }
  catch (err) {
    console.log(err)
    return {
      info_id: undefined,
      is_success: false
    }
  }
}

