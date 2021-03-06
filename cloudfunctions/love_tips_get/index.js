// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 获取所给open_id对应的用户的所有愿望
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  const collection = db.collection('love-tips')
  const LIMIT_NUM = 100
  try {
    var data = await collection.where(
      {
        self_id: event.open_id
      }
    ).get()
    
    return {
      tip_list: data,
      is_success: true
    }
  }
  catch (err) {
    console.error(err)
    return {
      tip_list: [],
      is_success: false
    }
  }
}