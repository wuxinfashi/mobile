$(function () {
    // 动态轮播图
    // 1.获取轮播图数据 ajax
    // 2.根据数据动态渲染（根据当前设备） 根据屏幕宽度判断
    // 2.1准备数据
    // 2.2把数据转化成html格式的字符串（动态创建元素，字符串拼接，模板引擎(artTempLate)）
    // 2.3把字符串渲染到页面当中
    //
    // 3.测试功能
    // 需要在不同大小屏幕重新加载

    // UI框架:bootstrap,妹子UI,jqueryUI,easyUI,jqueryMobile,mui,framework7
    // 模板引擎:arttemplate,handlebars,mustache,baidutemplate,velocity,underscore


    var getData=function(callback){
        // 有数据就执行render,没有数据就先ajax请求
        if(window.data){
            callback&&callback(window.data)
        }else {
            // 1.获取轮播图数据:
            $.ajax({
                type:"GET",
                url:'js/data.json',
                // 如果转换为json不成功将不会执行success,而是执行error
                dataType:'JSON',
                success:function (data) {
                    // 缓存数据:
                    window.data = data;
                    callback&&callback(window.data)
                }
            })
        }

    }
    var render = function(){
        getData(function (data) {
            // 2根据当前设备动态渲染数据(是否移动端):
            var isMobile = $(window).width()<768;
            // console.log(isMobile);
            // 2..2使用模板引擎html静态内容需要变成动态得
            // 两个地方需要动态渲染:点容器,图片容器
            // template第一个参数是模板的id,第二个参数必须是对象,不一定是list,可以是任意字幕
            var pointHtml=template('pointTemplate',{list:data})
            // console.log(pointHtml)
            var imageHtml=template("imageTemplate",{list:data,isM:isMobile})
            console.log(imageHtml)
            // 2.3把字符串渲染到页面当中
            $('.carousel-indicators').html(pointHtml)
            $('.carousel-inner').html(imageHtml)
        })
    }
    render();
    $(window).on('resize',function () {
        render();
    })


})
