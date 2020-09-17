$(function () {
    // 实现点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 密码检验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 检验密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致!'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data =  {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        // 发起post请求
        $.post("/api/reguser", data,
            function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录!');

                $('#link_login').click()
            },
        );
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                // 把登陆成功得到的token的值保存到localStorage中
                localStorage.setItem('token', res.token)
                // console.log(res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        });
    })
})