$(function () {
    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 1清空本地存储的数据
            localStorage.removeItem('token')
            // 2重新跳转到登录页面
            location.href = '../../login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            renderAvatar(res.data)
        },

        // // 不论成功还是失败,最后都会调用complete回调函数
        // complete: function (res) {
        //     // console.log('ok');
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 1强制清空token
        //         localStorage.removeItem('token')
        //         // 2强制跳转到登录页
        //         location.href = '../../login.html'
        //     }
        // }
    });
}

// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}