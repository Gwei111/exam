import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
interface McAxiosRequestConfig extends AxiosRequestConfig {
    extraConfig?: {
        tokenRetryCount: number; // 标记当前请求的csrf token重试次数
    };
}
const timeout = 60000 // 请求超时时间和延迟请求超时时间统一设置

const config: McAxiosRequestConfig = {
  baseURL: 'http://estate.eshareedu.cn/exam/api/',
  timeout,
  headers: {
    'Content-Type': 'application/json'
  }
}

const instance = axios.create(config)

instance.interceptors.request.use(async (config: any) => {
  if (!config.extraConfig?.tokenRetryCount) {
    config.extraConfig = {
      tokenRetryCount: 0
    }
  }
  (config.headers as any).Authorization = <string>sessionStorage.getItem('token')
  
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (err) => {
    if (axios.isCancel(err)) {
      // 取消的请求，不报错
      return
    }

    if (err.message === 'Network Error') {
      console.log('Network Error')
      return
    }
    if (err.message.includes('timeout')) {
      return
    }
    if (err.response?.status >= 500) {
      return
    }

    const { data: responseData } = err.response || {}
    const { status } = responseData || {}
    if (status) {
      switch (parseInt(status)) {
        case 4001:
          break
        default:
          break
      }
    }
    return err.response
  }
)

const get = (url: string, params?: any,responseType?:any): Promise<AxiosResponse<any>> => {
  return instance.get(url, { params,responseType }) as any
}
const post = (url: string, data?: any): Promise<AxiosResponse<any>> => {
  return instance.post(url, data)
}
export default { get, post }
