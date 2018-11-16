export default function ({ $axios, redirect }) {
  // http request 拦截器
  $axios.interceptors.request.use(
    config => {
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )

  // http response 拦截器
  $axios.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error.response.data)
    }
  )
}
