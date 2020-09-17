// 每次调用$.get() 或 $.post() 或$.ajax() 的时候,会先调用这个函数
// 在这个函数中可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token' || '')
        }
    }

    // 统一挂载complete 回调函数
    // 不论成功还是失败,最后都会调用complete回调函数
    options.complete = function (res) {
        // console.log('ok');
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1强制清空token
            localStorage.removeItem('token')
            // 2强制跳转到登录页
            location.href = '../../login.html'
        }
    }
})