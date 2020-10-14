$(function() {
        //调用getUserInfo()获取用户基本信息

        getUserInfo()
        var layer = layui.layer
        $('#btnlogout').on('click', function() {
            // console.log('ok')
            //提示用户是否退出
            layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
                //do something
                // console.log('ok')
                //清空本地存储中的token
                localStorage.removeItem('token')
                    //调用跳转到登录页面
                location.href = '/login.html'
                    // 关闭询问框
                layer.close(index);
            });
        })
    })
    // 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //渲染用户的头像函数
            readerAvatar(res.data)


        },
        // complete回调函数写在了baseAPI里面了
        // // 无论成功还是失败，最终都会调用complete函数
        // complete: function(res) {
        //     // console.log('执行了complete函数')
        //     // console.log('res')
        //     //在complete回调函数中可以使用res.responseJSON拿到的服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //             //强制跳转至登录页面
        //         location.href = '/home/login.html'
        //     }
        // }
    })
}
//渲染用户的头像函数
function readerAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户头像

    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('#layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}