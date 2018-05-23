$(function () {
    // 手势切换轮播图:
    // 1.自动轮播
    // 2.点随之变化
    // 3.完成手势切换

    var $banner = $('.sn_banner');
    var $width = $banner.width();
    var $imageBox =$banner.find('ul:first');
    var $pointBox =$banner.find('ul:last');
    // 如果不安装插件无法用拓展选择器
    // console.log($imageBox,$pointBox)
    var $points=$pointBox.find('li');

    // 1.自动轮播
    var animationFuc = function () {
        $imageBox.animate({transform:'translateX('+(-index*$width)+'px)'},200,function () {
            // 动画执行完成的回调
            if(index>=9){
                index=1;
                // 瞬间完成:
                $imageBox.css({transform:'translateX('+(-index*$width)+'px)'});
            }else if(index<=0){
                index=8;
                // 瞬间完成:
                $imageBox.css({transform:'translateX('+(-index*$width)+'px)'});
            }
            // index取值范围是1-8
            // 点随之变化:
            $points.removeClass('now').eq(index-1).addClass('now');
        })
    }

    // 自动轮播:
    var index = 1;
    var timer = setInterval(function () {
        index ++;
        animationFuc();
    },2000);
    // 3.完成手势切换
    // 左划:下一张 右划:上一张
    $banner.on('swipeLeft',function () {
        clearInterval(timer);
        index ++;
        animationFuc();
        setTimeout(timer = setInterval(function () {
            index ++;
            animationFuc();
        },2000),2000)
    });
    /*右滑的手势  上一张*/
    $banner.on('swipeRight',function () {
        clearInterval(timer);
        index --;
        animationFuc();
        setTimeout(timer = setInterval(function () {
            index ++;
            animationFuc();
        },2000),2000)
    });
    








})