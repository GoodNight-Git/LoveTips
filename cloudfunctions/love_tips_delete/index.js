// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 删除指定id的愿望
 * ---------in-----------
 * _id      愿望的id
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const collection = db.collection('love-tips')
  this.remove_num = 0
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