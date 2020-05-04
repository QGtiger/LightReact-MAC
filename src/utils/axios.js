import axios from 'axios'
import Qs from 'qs'
import { message } from 'antd'
import axiosCreate from './axiosCreate'

let BaseUrl = 'http://lightreact.com'

export default class Axios {
  static ajax(options) {
    axiosCreate({
      url: BaseUrl + options.url,
      method: options.type === undefined ? 'get' : options.type,
      timeout: 10000,
      data:
        options.type === 'payload' ? Qs.stringify(options.data) : options.data,
      withCredentials: true,
    }).then((res) => {
      if (res.data.success) {
        options.success(res)
      } else {
        message.destroy()
        message.error(res.data.tips)
        if (options.error !== undefined) options.error(res)
      }
    })
  }
}
