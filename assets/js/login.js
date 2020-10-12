$(function() {

    // 点击去注册的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击去登录的链接
    $('#link_login').on('click', function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        //表单验证
    var form = layui.form
    var layer = layui.layer
        //通过form.verify()函数自定义校验规则
    form.verify({
            //自定义了一个pwd校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd: function(value) {
                //通过形参拿到的好似确认密码中的内容
                //还需要拿到密码框中的内容
                //然后进行一次等与的判断
                //如果判断失败，则return一个提示即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            // $('#form_reg [name = username]') 注意空格
            var data = { username: $('#form_reg [name = username]').val(), password: $('#form_reg [name=password]').val() }

            $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                    //模拟点击去登录的行为
                $('#link_login').click()
            })
        })
        //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({

            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'post',
            // 快速获取表单的数据,类似上边的拼接的data
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')
                    // console.log(res.token)
                    // 将登录成功的token字符串保存到localstorage
                localStorage.setItem('token', res.token)
                    //跳转到后台
                location.href = '/home/index.html'
                    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY4OTAsInVzZXJuYW1lIjoi5a2Z5oKf56m6IiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2MDI1MTM2OTgsImV4cCI6MTYwMjU0OTY5OH0.wVUkCCiMi_nf6S2PmlguShZuPYShoPfYWOQTOD6kpp0
            }
        })


    })
})