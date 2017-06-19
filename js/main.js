changeRem();//rem改变
function changeRem(){
    var docWidth = 1080;//640为标准的屏幕
    var fontsize = 64;//字体大小
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = fontsize * (clientWidth/docWidth) + 'px';
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
}

$(function(){
    unfoldMore($('.char-text'),79,'...');//概览-本土之家  展开更多
    function unfoldMore(div,num, point){
        var news_txt =  $('.char-text').text();
        if (news_txt.length >= num) {
            var txt = news_txt.substr(0, num) + point;
            div.text(txt);
            div.append('<a href="javascript:;">全部展开</a>');
        }
        div.find('a').click(function(){
            div.text(news_txt);
        });
    }

    // 2017/5/5修改
    addHref($('.item-con-limit'), 106, '...','[详情]');//首页
    // addHref($('.char-text'), 82, '...','全部展开');
    //超出添加<a>
    function addHref(div, num, point,texts) {
        div.each(function(){
            var news_txt = $(this).text();
            if (news_txt.length >= num) {
                var txt = news_txt.substr(0, num) + point;
                $(this).text(txt);
                $(this).append('<a href="">'+texts+'</a>');
            }
        })
    }

    tabItem($('.option-item-wrap1 .option-item-nav span'),$('.option-item-wrap1 .item-con-chl'),'mouseover');
    tabItem($('.option-item-wrap2 .option-item-nav span'),$('.option-item-wrap2 .item-con-chl'),'mouseover');
    tabItem($('.option-item-wrap3 .option-item-nav span'),$('.option-item-wrap3 .item-con-p'),'mouseover');
    function tabItem($item,$box,event){
        $item.on(event,function(){
          var index = $(this).index();
          $(this).addClass("on").siblings().removeClass("on");
          $box.eq(index).show().siblings().hide();
        });
    }

    txtLimit($('.notice-text'), 18, '...');
    txtLimit($('.text-con small'), 50, '...');//概览-纯图片（简介）
    txtLimit($('.col-book-con h2'), 11, '...');//概览-两列图片
    txtLimit($('.img-book-text p'), 20, ' ');//概览-图文概览
    function txtLimit(div, num, point) {
        for (var i = 0; i < div.length; i++) {
            var news_txt = div.eq(i).text();
            if (news_txt.length >= num) {
                var txt = news_txt.substr(0, num) + point;
                div.eq(i).text(txt);
            }
        }
    }

    var wWidth = $(window).width();
    $("#carousel").carousel(wWidth);
    $("#carousel1").carousel(wWidth);
    $(window).resize(function(){
        window.location.reload();
    });
    // $("#carousel").touchwipe({
    //         wipeLeft:function() {
    //             console.log("sdcsdleft");
    //         },
    //         wipeRight:function() {
    //             console.log("sdcsdright");
    //         },
    //     });
});

/*-------zw-js  2017-4-14--------*/
$(function(){
   var nav=$('.z-inner-nav-container ul'),
       navLi=$('.z-inner-nav-container ul li'),
       navWidth=0,
       navScrollLeft=0,
       findCur=false;
    function setNav(){
        for(var i=0,max=navLi.length;i<max;i++){
            navWidth+=Math.ceil(navLi.eq(i).width())+10+parseInt(navLi.eq(i).css('margin-right'))+1;
            if(!findCur&&!navLi.eq(i).hasClass('cur')){
                navScrollLeft+=Math.ceil(navLi.eq(i).width())+10+parseInt(navLi.eq(i).css('margin-right'))+1;
            }
            if(navLi.eq(i).hasClass('cur')){
                findCur=true;
            }
        }
        nav.width(navWidth);
        nav.parent().scrollLeft(navScrollLeft)
    };
    $(document).ready(function(){
        setNav();
    });
    $(document).resize(function(){
        setNav();
    });
    var startX=0,startMove=0,nowLeft=0;
    $('.z-inner-nav-container ul').on('touchstart',function(e){
        var event=e||window.event;
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
            startX=event.touches[0].pageX
    })
    $('.z-inner-nav-container ul').on('touchmove',function(e){
        nowLeft=$(this).parent().scrollLeft()
        var event=e||window.event;
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
        startMove=event.touches[0].pageX-startX;
        $(this).parent().scrollLeft(nowLeft-startMove)

    })
});

// 2017/5/5-3新增
$(function(){
    touchMove($('.option-item-wrap3 .option-main'),$('.option-item-wrap3 .option-main span'));
    touchMove($('.option-item-wrap2 .option-main'),$('.option-item-wrap2 .option-main span'));
    touchMove($('.link-con'),$('.link-con a'));
    function touchMove(parent,node){
       var navWidth=0,
       navScrollLeft=0,
       findCur=false
       ;
        function setNav(){
            for(var i=0,max=node.length;i<max;i++){
                navWidth+=Math.ceil(node.eq(i).innerWidth())+parseInt(node.eq(i).css('margin-right'))+1;
                if(!findCur&&!node.eq(i).hasClass('on')){
                    navScrollLeft+=Math.ceil(node.eq(i).innerWidth())+parseInt(node.eq(i).css('margin-right'))+1;
                }
                if(node.eq(i).hasClass('on')){
                    findCur=true;
                }
            }
            parent.width(navWidth);
            parent.parent().scrollLeft(navScrollLeft)
        };
        $(document).ready(function(){
            setNav();
        });
        $(document).resize(function(){
            setNav();
        });
        var startX=0,startMove=0,nowLeft=0;
        parent.on('touchstart',function(e){
            var event=e||window.event;
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble=true;
            }
                startX=event.touches[0].pageX
        })
        parent.on('touchmove',function(e){
            nowLeft=$(this).parent().scrollLeft()
            var event=e||window.event;
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble=true;
            }
            startMove=event.touches[0].pageX-startX;
            $(this).parent().scrollLeft(nowLeft-startMove)
        })
    }
});

(function ($) {
    $.fn.carousel = function (liWidth) {
        var speed = 1000,
            interval = 2000,
            nowIndex = 0,
            timer = null,
            // oPrev = $(this).find(".prev"),
            // oNext = $(this).find(".next"),
            oP = $(this).find("p"),
            ol = $(this).find("ol"),
            olLi = null,
            oUl = $(this).find(".csl-content ul"),
            firstLi = oUl.find("li:first").clone(),
            // liWidth = oUl.find("li:first").outerWidth();
        oUl = oUl.append(firstLi);
        var length = oUl.children("li").length;
        var ulWidth = length*liWidth;
        var liHtml = '';
        oUl.width(ulWidth);
        for (var i = 0; i < length-1; i++) {
            liHtml += '<li></li>';
        }
        ol.html(liHtml);
        olLi = $(this).find("ol li"),
        olLi.first().addClass("on");

        // $("#carousel").touchwipe({
        //     wipeLeft:function() {
        //         console.log("sdcsdleft");
        //     },
        //     wipeRight:function() {
        //         console.log("sdcsdright");
        //     },
        // });
        // 触摸
        var doc = document;
        doc.addEventListener("touchstart",  startTouchScroll, false);
        doc.addEventListener("touchmove", moveTouchScroll, false);
        doc.addEventListener("touchend",  endTouchScroll, false);
        var startY, endY, startX, endX,endX1;
        function startTouchScroll(event)
        {
            var touch = event.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
        }
        function moveTouchScroll(event)
        {
            var touch = event.touches[0];
            endX = touch.pageX;
            endY = touch.pageY;
        }
        function endTouchScroll(event)
        {
            var scrollTranslation = 0;
            //判断移动的点,1为手指向下滑动,-1为手指向上滑动
            // console.log('endand',endX - startX,endX);
            if (endX != endX1) {
            if (endX - startX>0) {
                scrollTranslation = 1;
            }else if(endX - startX<0){
                scrollTranslation = -1;
            }else{
                scrollTranslation = 0;
            }
            if (scrollTranslation == 1){
                clearInterval(timer);
                nowIndex --;
                if (nowIndex == -1) {
                    nowIndex = length-2;
                    oUl.css({"left":-liWidth*(length-1)+"px"});
                }
                oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed,function(){
                    timer = setInterval(cslProgcess,interval);
                });
                olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
                oP.eq(nowIndex).show().siblings().hide();
            }
            if(scrollTranslation == -1){
                clearInterval(timer);
                nowIndex ++;
                if (nowIndex == length) {
                    nowIndex = 1;
                    oUl.css({"left":"0px"});
                }
                oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed,function(){
                    timer = setInterval(cslProgcess,interval);
                });
                if(nowIndex == length-1){
                    olLi.eq(0).addClass("on").siblings().removeClass("on");
                    oP.eq(0).show().siblings().hide();
                }else{
                    olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
                    oP.eq(nowIndex).show().siblings().hide();
                }
            }
            endX = endX1;
            }
        }

        //触摸end
        // oPrev.click(function(){
        //     clearInterval(timer);
        //     nowIndex --;
        //     if (nowIndex == -1) {
        //         nowIndex = length-2;
        //         oUl.css({"left":-liWidth*(length-1)+"px"});
        //     }
        //     oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed,function(){
        //         timer = setInterval(cslProgcess,interval);
        //     });
        //     olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
        //     oP.eq(nowIndex).show().siblings().hide();
        // });
        // oNext.click(function(){
        //     clearInterval(timer);
        //     nowIndex ++;
        //     if (nowIndex == length) {
        //         nowIndex = 1;
        //         oUl.css({"left":"0px"});
        //     }
        //     oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed,function(){
        //         timer = setInterval(cslProgcess,interval);
        //     });
        //     if(nowIndex == length-1){
        //         olLi.eq(0).addClass("on").siblings().removeClass("on");
        //         oP.eq(0).show().siblings().hide();
        //     }else{
        //         olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
        //         oP.eq(nowIndex).show().siblings().hide();
        //     }
        // });
        function cslProgcess(){
            nowIndex ++;
            if (nowIndex == length) {
                nowIndex = 1;
                oUl.css({"left":"0px"});
            }
            oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed);
            if(nowIndex == length-1){
                olLi.eq(0).addClass("on").siblings().removeClass("on");
                oP.eq(0).show().siblings().hide();
            }else{
                olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
                oP.eq(nowIndex).show().siblings().hide();
            }
        }
        timer = setInterval(cslProgcess,interval);
    }

})(jQuery);



