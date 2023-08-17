// 二次封装axios
import axios from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'
import type { Method } from 'axios'
// 1.axios的配置
// 1.1创建aixos实例,配置基地址,配置响应时间
// 1.2添加请求拦截器,请求头添加token
// 1.3添加响应拦截器,401错误拦截去登录界面,判断业务是否成功(业务状态码),剥离无效数据
const baseURL = 'https://consult-api.itheima.net/'
// 创建axios实例
const instance = axios.create({
  baseURL,
  timeout: 10000
})
// 请求拦截  请求头中加token 再返回
instance.interceptors.request.use(
  (config) => {
    // 修改config,如请求头
    // 获取token
    const store = useUserStore()
    if (store.$state.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user?.token}`
    }

    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截
instance.interceptors.response.use(
  (res) => {
    // status 200 响应成功,res.status.code=== 10000 业务成功
    // 如果不是10000  使用vant 提示 ,报错阻断程序
    if (res.data.code !== 10000) {
      showToast(res.data.message || '网络异常')
      return Promise.reject(res.data) //业务状态码错误 ,返回错误阻断程序
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    return res.data
  },
  (err) => {
    // 请求报错,遇见401跳转登录
    // 1.现在在user/patient页面,突然token失效
    // 2.跳转登录页面,再次登录回到/user/peatient页面
    // 3.默认回到个人中心首页/user
    // $router路由实例，提供路由相关函数操作,$route路由相关信息，query params path
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      router.push('/login?returnUrl=' + `${router.currentRoute.value.fullPath}`)
    }

    return Promise.reject(err)
  }
)
// 2.请求工具函数
// 2.1参数 url ,method ,submitdata
// 2.2 返回 :aixos 调用接口的promise对象
type Data<T> = {
  code: string
  message: string
  data: T
}
const request = <T>(url: string, method: Method = 'get', submitdata?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    // 区分get和其他请求post
    //get params //post data
    // toLowerCase Get/get都能识别,大小写
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitdata
  })
}

// 导出以备他用
export { baseURL, instance, request }
