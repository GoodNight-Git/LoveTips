// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 传入对方openid
 * other_id    string 对方的id
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()

  try {
    // 插入到relations数据库
    var res = await db.collection('relations').add({
      data: {
        id_1: wxContext.OPENID,
        id_2: event.other_id
      }
    })
    // 从user_info数据库获取对方的用户信息
    var data = await db.collection('user-info').where({
      open_id: event.other_id
    }).limit(1).get()
    return {
      relation_info: data[0]
    }
  }
  catch (err) {
    console.error(err)
    return {
      relation_id: undefined
    }
  }
}