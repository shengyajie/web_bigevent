//每次调用$.get()或者$.post()或者$.ajax()得瑟时候毁先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们为ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // console.log(options.url)
        //统一为有权限的接口，设置headers请求头
        //链接里面包含my时才添加header请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

    }
    // 全局统一挂载complete回调函数
    // 无论成功还是失败，最终都会调用complete函数
    options.complete = function(res) {
        // console.log('执行了complete函数')
        // console.log('res')
        //在complete回调函数中可以使用res.responseJSON拿到的服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            localStorage.removeItem('token')
                //强制跳转至登录页面
            location.href = '/home/login.html'
        }
    }


})