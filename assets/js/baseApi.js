//每次调用$.get()或者$.post()或者$.ajax()得瑟时候毁先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们为ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url)
})