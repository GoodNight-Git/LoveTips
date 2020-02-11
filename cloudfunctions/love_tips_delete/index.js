// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const collection = db.collection('love-tips')
  await collection.doc(event._id).remove().then(
    res => {
      console.log('success delete ' + res.removed)
      this.remove_num = res.stats.removed
    },
    err => {
      console.error(err)
    }
  )


  return {
    remove_num: this.remove_num
  }
}