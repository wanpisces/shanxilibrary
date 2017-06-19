$(function(){
   var nav=$('.z-inner-nav-container ul'),
       navLi=$('.z-inner-nav-container ul li'),
       navWidth=0,
       navScrollLeft=0,
       findCur=false
       ;
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
