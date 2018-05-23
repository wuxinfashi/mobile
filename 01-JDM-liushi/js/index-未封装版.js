    $(function () {
        // 需求:
        //     1.顶部搜索
        search();
        //     2.轮播图
        bannerMove();
        // //     3.倒计时
        // downTime();
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

        // 轮播图的核心:索引
        // 自己写的自动无缝轮播:(效果没老师版好,因为老师版等动画结束了再瞬间定位)
       /* var index = 1;
        var timer = setInterval(function () {
            // console.log('1');
            // 此方法只能在自动滚动的时候实现无缝轮播
            index++;
            if(index<=9){
                // 加过渡效果:(css3属性需要注意兼容)
                imageBox.style.transition = 'all 0.2s';
                imageBox.style.webkitTransition = 'all 0.2s';
                // $imageBox.css('transition','all 0.2s');
                // $imageBox.css('webkitTransition','all 0.2s');
                // 坐位移:
                // 每移动一张图片就是移动索引*屏幕宽度的距离(此时不能使用()将-index*width括起来)
                imageBox.style.transform = 'translateX('+-index*width+')';
                imageBox.style.webkitTransform = 'translateX('+-index*width+'px)';
            }
            else {
                index=1;
                imageBox.style.transition = 'none';
                imageBox.style.webkitTransition = 'none';
                // 坐位移:
                imageBox.style.transform = 'translateX('+-index*width+'px)';
                imageBox.style.webkitTransform = 'translateX('+-index*width+'px)';
            }
        },3000)*/

       // 老师版:
        var index = 1;
        var timer = setInterval(function () {
            // console.log('1');
            // 此方法只能在自动滚动的时候实现无缝轮播
            index++;
                // 加过渡效果:(css3属性需要注意兼容)
                imageBox.style.transition = 'all 0.2s';
                imageBox.style.webkitTransition = 'all 0.2s';
                // $imageBox.css('transition','all 0.2s');
                // $imageBox.css('webkitTransition','all 0.2s');
                // 坐位移:
                // 每移动一张图片就是移动索引*屏幕宽度的距离(此时不能使用()将-index*width括起来)
                imageBox.style.transform = 'translateX('+-index*width+')';
                imageBox.style.webkitTransform = 'translateX('+-index*width+'px)';
            },1000)
        imageBox.addEventListener('transitionend',function () {
            if(index>=9){
                index=1;
                imageBox.style.transition = 'none';
                imageBox.style.webkitTransition = 'none';
                // 坐位移:
                imageBox.style.transform = 'translateX('+-index*width+'px)';
                imageBox.style.webkitTransform = 'translateX('+-index*width+'px)';
            }
            else if(index<=0){
                index=8;
                imageBox.style.transition = 'none';
                imageBox.style.webkitTransition = 'none';
                // 坐位移:
                imageBox.style.transform = 'translateX('+-index*width+'px)';
                imageBox.style.webkitTransform = 'translateX('+-index*width+'px)';
            }
        })


}

var downTime = function () {

}