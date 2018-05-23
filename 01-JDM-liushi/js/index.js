$(function () {
    // 需求:
    //     1.顶部搜索
    search();
    //     2.轮播图
    bannerMove();
    // //     3.倒计时
    downTime();
})

// 搜索栏特效:
var search = function () {
    // 实现分析:
    //     1.默认固定顶部透明背景
    // 2.当页面滚动时,随便页面卷曲高度透明度不断变大
    // 3.到页面滚动到一定高度是,透明度不变;
    var $searchBox =$('.jd_search_box');
    var $banner = $('.jd_banner');
    var banner =$banner[0];
    var height = banner.offsetHeight;
    var opacity = 0;
    // 监听页面滚动事件:
    window.onscroll = function (ev) {
        // 获取卷曲高度的三种方式:
        // 在手机端无法获取:
        // console.log(document.body.scrollTop);
        // 在手机端可以获取:
        // console.log(document.documentElement.scrollTop);
        // 在手机端可以获取:
        // console.log(window.pageYOffset);

        var scrollTop = window.pageYOffset;
        if(scrollTop<height){
            // 2.当页面滚动时,随便页面卷曲高度透明度不断变大
            opacity = scrollTop/height*0.85;
            $searchBox.css('background','rgba(201,21,35,'+opacity+')')
        }else {
            opacity = 0.85;
            $searchBox.css('background','rgba(201,21,35,'+opacity+')')
        }

    }

}

// 轮播图特效:
var bannerMove = function () {
    // 需求分析:
    // 1.滑动的时候图片向滑动方向滑动(利用touch事件)
    // 2.没有人操作的时候自动轮播(在移动端可以使用css3动画),下面的小圆点也跟着图片动(根据图片索引切换)
    // 3.如果滑动不多的时候(不超过屏幕1/3)取消滑动,恢复到原来的页面(使用css3过渡)
    // 4.如果滑动到足够的距离再放开,则进入下一张图片(根据滑动的方向来判断)

    var $banner = $('.jd_banner');
    var banner =$banner[0];
    // 屏幕宽度:
    var width = banner.offsetWidth;
    // 图片容器:
    var imageBox = banner.querySelector('ul:first-child');
    // 点容器:
    var $pointBox = $banner.children('ul').eq(1);
    // 获取点:
    var $points = $pointBox.children('li');


    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }

    /*程序的核心 index */
    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*加过渡*/
        addTransition();
        /*做位移*/
        setTranslateX(-index * width);
    }, 1000);
    /*需要等最后一张动画结束去判断 是否瞬间定位第一张*/
    imageBox.addEventListener('transitionend', function () {
        /*自动滚动的无缝*/
        if (index >= 9) {
            index = 1;
            /*瞬间定位*/
            /*清过渡*/
            removeTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }
        /*滑动的时候也需要无缝*/
        else if (index <= 0) {
            index = 8;
            /*瞬间定位*/
            /*清过渡*/
            removeTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }
        /*根据索引设置点*/
        /*此时此刻  index  的取值范围  1-8（0,8--1,9）*/
        /*点索引  index - 1 */
        setPoint();
    });

    /*设置点的方法(原生js方式)*/
    /*        var setPoint = function () {
                /!*index 1-8*!/
                /!*清除样式*!/
                for (var i = 0; i < $points.length; i++) {
                    var obj = $points[i];
                    obj.classList.remove('now');
                }
                /!*给对应的加上样式*!/
                $points[index - 1].classList.add('now');
            }*/

    /*设置点的方法*/
    var setPoint = function () {
        /*index 1-8*/
        /*清除样式*/
        $points.removeClass('now');
        $points.eq(index-1).addClass('now');
    }


    // 轮播图触摸滑动效果:
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart',function (e) {
        // 记录起始的触摸点:
        /*清除定时器 否则滑动会有延迟感*/
        clearInterval(timer);
        console.log('触摸开始了')
        /*记录起始位置的X坐标*/
        startX = e.touches[0].pageX;
    })

    imageBox.addEventListener('touchmove', function (e) {
        // 如果ul不加上clearFix就没有高度,摸不着,触发不了touch事件
        // console.log('正在滑动');
        /*记录滑动过程当中的X坐标*/
        var moveX = e.touches[0].pageX;
        /*计算位移  有正负方向*/
        distanceX = moveX - startX;
        /*计算目标元素的位移  不用管正负*/
        /*元素将要的定位=当前定位+手指移动的距离*/
        var translateX = -index * width + distanceX;
        /*滑动--->元素随着手指的滑动做位置的改变*/
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });

    imageBox.addEventListener('touchend', function (e) {
        console.log(distanceX);
        /*4.  5.  实现*/
        /*要使用移动的距离*/
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                /*吸附*/
                addTransition();
                setTranslateX(-index * width);
            } else {
                /*切换*/
                /*右滑动 上一张*/
                if (distanceX > 0) {
                    index--;
                }
                /*左滑动 下一张*/
                else {
                    index++;
                }
                /*根据index去动画的移动*/
                addTransition();
                setTranslateX(-index * width);
            }
        }
        /*最好做一次参数的重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }, 1000);
    });


}

// 倒计时:

var downTime = function () {
    // 总时长:(假设为4小时),单位为s
    // 不要用关键字time命名
    var time1=4*60*60;
    var $spans = $('.time').children('span');
    var timer1 =setInterval(function () {
        time1--;
        var h = Math.floor(time1/3600);
        var m = Math.floor(time1%3600/60);
        var s = Math.floor(time1%60);
        // 更改时间:
        $spans.eq(0).html(Math.floor(h/10));
        // 当小于10时,h%10返回的结果就是h,因为h-0*10=h
        $spans.eq(1).html(h%10);
        $spans.eq(3).html(Math.floor(m/10));
        $spans.eq(4).html(m%10);
        $spans.eq(6).html(Math.floor(s/10));
        $spans.eq(7).html(s%10);

        if(time1 <= 0){
            clearInterval(timer1);
        }


    },1000)
}

// var downTime = function () {
//     /*1.每一秒改变当前的时间*/
//     /*2.倒数计时  假设 4小时*/
//     var time = 4 * 60 * 60;
//     var spans = document.querySelectorAll('.time span');
//
//     var timer = setInterval(function () {
//         time --;
//         /*格式化  给不同的元素html内容*/
//         var h = Math.floor(time/3600);
//         var m = Math.floor(time%3600/60);
//         var s = Math.floor(time%60);
//
//         spans[0].innerHTML = Math.floor(h/10);
//         spans[1].innerHTML = h%10;
//         spans[3].innerHTML = Math.floor(m/10);
//         spans[4].innerHTML = m%10;
//         spans[6].innerHTML = Math.floor(s/10);
//         spans[7].innerHTML = s%10;
//
//         if(time <= 0){
//             clearInterval(timer);
//         }
//
//     }, 1000)
//
//
// }