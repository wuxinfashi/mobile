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
    // 4.移动端手势切换

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

    // 4.移动端手势切换
    var startX = 0;
    var distanceX = 0;
    var isMove = false;

    // originalEvent代表原生js事件
    $('.wjs_banner').on('touchstart',function (e) {
        // 此时e和原生的event不一样,是经过封装的
        stratX = e.originalEvent.touches[0].clientX;
        // console.log(e);
    }).on('touchmove',function (e) {
       moveX = e.originalEvent.touches[0].clientX;
       distanceX =moveX-startX;
       isMove = true;
    }).on('touchend',function (e) {
        // 判断是否满足手势条件:
        // 1.滑动过,且距离大于50px
        if(isMove&&Math.abs(distanceX)>50){
            // 手势:
            // 左划手势(下一张)
            if(distanceX<0){
                $(".carousel").carousel('next')
            }
            // 右划手势(上一张)
            else {
                $(".carousel").carousel('prev')
            }
            startX = 0;
            distanceX=0;
            isMove=false;
        }
    })

    // 5.初始化移动端页签
    var initMobileTab = function () {
        // 1.解决换行问题
        // 2.修改结构使之成为区域滑动的结构(加一个父容器限制宽度)
        // 3.自己实现滑动效果,也可以使用插件(iscroll)

        var $navTabs = $('.wjs_product .nav-tabs');
        var width = 0;
        $navTabs.find('li').each(function (i,item) {
            var $currLi = $(this)//$(item)
            // 4种获取宽度的方式:width:(内容)
            // innerWidth:(内容+内边距)
            // outerWidth,(内容+内边距+边框)
            // outerWidth(true)(内容+内边距+边框+外边距)
            var liWidth = $currLi.outerWidth(true);
            width += liWidth;
        })
        console.log(width)
        $navTabs.width(width);
    }
    initMobileTab();

    // 初始化iscroll
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
    })

    // 初始化工具提示
    $('[data-toggle="tooltip"]').tooltip()


})
