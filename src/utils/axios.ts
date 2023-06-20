import { message } from 'ant-design-vue';
import axios from 'axios'
import { useRouter } from "vue-router"


const router = useRouter();

const request = axios.create({
  baseURL: "/",
  timeout: 5000   //请求超时
});

//请求拦截器
request.interceptors.request.use(config => {
  //loading.open();  //打开加载中

  //请求拦截
  return config;
}, error => {
  //loading.close();  //关闭加载中
  //出现异常
  return Promise.reject(error)
});

//响应拦截器
request.interceptors.response.use(response => {

  //loading.close();  //关闭加载中
  // const resp = response.data;
  //后台正常响应的状态,如果不是200,说明后台处理有问题
  // if (resp.code !== 200) {
  //   //显示错误信息
  //   message.error(
  //     resp.msg || '系统异常',
  //     5
  //   );
  // }
  //console.log(resp);
  return response;
}, error => {
  //loading.close();  //关闭加载中
  //显示错误信息
  message.error(error.message, 5)
  //出现异常
  return Promise.reject(error)
})

//export default request;

const HEADERS = {
  common: {},
  'Content-Type': 'application/json'
}

export default async function (req: any, conf?: any) {
  console.log(conf);
  // 增加默认请求头
  req.headers = Object.assign({}, HEADERS, req.headers)

  // const token = getToken()
  // if (token) {
  //   req.headers.common.token = token
  // }



  const httpRequest = request;
  return await httpRequest.request(req)
    .then((res: any) => {
      // console.log(res);
      // 下载静态资源，直接返回结果
      // if (res.config.responseType === 'blob' && res.status === 200) {
      //     return res.data
      // }
      // console.log(22);
      // 访问受限, 转向登录页面
      // if (res.data.code === 401) {
      //   router.push({
      //     name: 'login'
      //   })
      // }
      // // 后端返回失败结果
      // if (res.data.code != 200) {
      //   let err = {
      //     code: res.data.code,
      //     message: res.data.message || res.data.msg
      //   }
      //   throw (err)
      // }
      return res.data
    })
    .catch((err: any) => {
      if (err.response) {
        console.error('API error:', req.method, req.url, 'received', err.response.status, err.response.statusText)
        let errorInfo = err.response
        return err.response.data
      } else {
        console.error('API error:', req.method, req.url, 'received', err.code, err.message)
        let errorInfo = {
          status: err.code,
          statusText: err.message,
          config: {
            url: req.url
          }
        }
        return err
      }
    })
}


