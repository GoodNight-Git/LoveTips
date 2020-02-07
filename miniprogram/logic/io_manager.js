/**
 * 导出为单例模式
 */
class io
{
  constructor()
  {
    this.const_id = {
      font_path: 'cloud://love-tips-env-ezgwv.6c6f-love-tips-env-ezgwv-1301198732/Muyao-Softbrush.ttf',
    }
  }

  /**
   * -----success-----
   * 返回url
   * -----fail-----
   * 返回errMsg(string)
   */
  async downloadFile(file_id)
  {
    try {
      let res = await wx.cloud.downloadFile({
        fileID: file_id
      })
      return res.tempFilePath
    }
    catch (err) {
      throw 'download server file fail:' + err.errCode
    }
  }

  /**
   * -----param-----
   * file_id(number) 文件id
   * 获取单个文件的临时url
   * -----success-----
   * 返回url
   * -----fail-----
   * 返回errMsg(string)
   */
  async getTempFileURL(file_id)
  {
    try {
      let res = await wx.cloud.getTempFileURL({
        fileList: [file_id]
      })
      if (res.fileList[0].status == 0)
        return res.fileList[0].tempFileURL
      else
        throw 'get temp url fail:' + err.fileList[0].errMsg
    }
    catch (err)
    {
      throw 'get temp url fail:' + err.fileList[0].errMsg
    }
  }

  async getTempFileListURL(file_id_list)
  {
    try {
      let res = await wx.cloud.getTempFileURL({
        fileList: file_id_list
      })
      console.log('exc:'+res.fileList.length)
      this.suc_list = []
      this.fail_list = []
      res.fileList.forEach((element, index) => {
        console.log(index)
        if (element.status == 0)
        {
          this.suc_list.push(element.tempFileURL)
        }
        else
        {
          this.fail_list.push(element.errMsg)
        }
      })
      return {
        suc_list: this.suc_list,
        fail_list: this.fail_list
      }
    }
    catch (err) {
      console.log('ERRRR')
      this.errMsgList = []
      err.fileList.forEach((element, index) => {
        if (element.status != 0)
        {
          this.errMsgList.push(element.errMsg)
        }
      })
      throw {
        suc_list: [],
        fail_list: this.errMsgList
      }
    }
  }
}

export var io_manager = new io()