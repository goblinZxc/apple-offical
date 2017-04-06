                                                                            // 大屏
// 点击搜索
$(".search").click(function(){
    // nav循环添加不同的过渡延时
    $(".nav").each(function(index,ele){
        $(ele).css("transitionDelay",($(ele).length-index)*0.1+0.4+"s");
    })
    // 给要消失的div添加消失的类名
    $(".nav").addClass("hidnav");
    // 延时，使搜索框在nav消失以后出现，里面内容依次从右向左划入出现
    setTimeout(function(){
        $(".searchbox").show(0,function(){
            $(".fdj").css({opacity:1,marginLeft:0});
            $(".input").css({opacity:1,left:0});
            $(".ltitle").css({opacity:1,paddingLeft:25})
            // 给链接依次加不同的延时
            $(".lianjie").each(function(index,ele){
                $(ele).css("transitionDelay",index*0.05+0.05+"s");
            })
            $(".lianjie").css({opacity:1,padding:"0 50px"})
        });
        // 关闭按钮出现
        $(".close").show();
    },800)
})
// 恢复点击搜索图标的一系列效果
function huifusearch(){
    // 与点击搜索相反的操作
    $(".nav").each(function(index,ele){
        $(ele).css("transitionDelay",index*0.05+"s");
    })
    $(".nav").removeClass("hidnav");
    // 延时后清除过渡延时
    setTimeout(function(){
        $(".nav").each(function(index,ele){
            $(ele).css("transitionDelay","0s");
        })
    },1000)
    $(".searchbox").hide();
    $(".fdj").css({opacity:0,marginLeft:100});
    $(".input").css({opacity:0,left:100});
    $(".ltitle").css({opacity:0,paddingLeft:125})
    $(".lianjie").css({opacity:0,padding:"0 150px"})
    $(".close").hide();
}
// 点击关闭
$(".close").click(function(){
    huifusearch();
})

// 小屏
var flag=true;
// 恢复点击hanbao的一系列效果
function huifuhanbao(){
    // 与点击相反操作
    flag=true;
    $(".hanbao").css({transform:"rotate(0)"});
    setTimeout(function(){
        $(".xian1").css({transform:"translateY(0) rotate(0)"});
        $(".xian2").css({transform:"translateY(0) rotate(0)"});
    },180)
    $(".sbag").css({transform:"translate(0)",opacity:1,cursor:"pointer"});
    $(".header").css("background","");
    $(".menu").slideUp(200);
}
// 点击箭头，推荐链接消失，导航出现，logo还原，箭头消失
function huifujian(){
    setTimeout(function(){
        $(".slogo").css({top:0,opacity:1});
    },200)
    setTimeout(function(){
        $(".topjian").hide();
    },100)
    $(".stuijian").hide(0,function(){
        $(".daohang").not(".sousuo").show(300);
    })
    $(".txian1").css({transform:"translate(0) rotate(0)"})
    $(".txian2").css({transform:"translate(0) rotate(0)"})
}
$(".hanbao").click(function(){
    if(flag){
        var wh=$(window).height();
        flag=false;
        // 汉堡包旋转
        $(".hanbao").css({transform:"rotate(90deg)"});
        // 线条延时旋转
        setTimeout(function(){
            $(".xian1").css({transform:"translateY(3.5px) rotate(45deg)"});
            $(".xian2").css({transform:"translateY(-3.5px) rotate(-45deg)"});
        },180)
        // 购物袋右移，并变透明
        $(".sbag").css({transform:"translate(15px)",opacity:0,cursor:"text"});
        // header变色
        $(".header").css("background","#000000");
        // menu全屏显示
        $(".menu").css("height",wh-46+"px").slideDown(200);
    }
    else{
        huifuhanbao();
        huifujian();
    }
})
// 鼠标点击输入框，logo向上隐藏，出现箭头，导航消失，推荐链接出现
$(".shuru").click(function(){
    $(".slogo").css({top:-40,opacity:0});
    setTimeout(function(){
        $(".topjian").show(0,function(){
            $(".txian1").css({transform:"translate(1px) rotate(-45deg)"})
            $(".txian2").css({transform:"translate(-1px) rotate(45deg)"})
        })
    },280)
    $(".daohang").not(".sousuo").hide(300,function(){
        $(".stuijian").css({display:"block"});
    })
})
$(".topjian").click(function(){
    huifujian();
})

// 监测屏幕宽度发生变化，都进行还原
$(window).resize(function(){
    var pk=$(window).width();
    // 变成大屏，还原小屏
    if(pk>768){
        // 恢复点击hanbao的一系列效果
        huifuhanbao();
        // 还原点击搜索的一系列
        huifujian();
        // 还原下面
        xflag=true;
        $(".more2 ul li").hide();
        $(".more2 ul .cha").css({transform:"rotate(0)"});
    }
    // 变成小屏，还原大屏
    else{
        // 恢复点击搜索图标的一系列效果
        huifusearch();
    }
})

// 轮播
var now=0;
var next=0;
var z=10;
function move(fx){
    next++;
    var fx=fx||"r";
    if (next==$('.bannerbox').length) {
        next=0;
    }
    if (next==-1) {
        next=$('.bannerbox').length-1;
    }
    $(".btn").eq(now).css("background","rgba(128,128,128,0.2)").end().eq(next).css("background","rgba(128,128,128,1)");
    if(fx=="r"){
        $(".banner").eq(now).css({transition:".8s",transformOrigin:"left",transform:"scale(0.9)"});
        $(".bannerbox").eq(next).css({left:"100%", zIndex:z++}).animate({left:0},800,function(){
            bflag=true;
            $(".banner").css({transition:"",transformOrigin:"left",transform:"scale(1)"});
        });
        now=next;
    }
    else if(fx=="l"){
        $(".banner").eq(next).css({transition:"",transformOrigin:"left",transform:"scale(.9)"})
        setTimeout(function(){
            $(".bannerbox").eq(now).animate({left:"100%"},800).end().eq(next).css({left:0}).animate({left:0},800,function(){
                $(".bannerbox").eq(next).css({zIndex:z++});
                bflag=true;
            });
            $(".banner").eq(next).css({transition:".8s",transformOrigin:"left",transform:"scale(1)"});
            now = next;
        },1)
    }
}
var t = setInterval(move,2000);
$(".bannerqu").hover(function(){
    clearInterval(t);
},function(){
    t = setInterval(move,2000);
})
$('.btn').click(function(){
    if ($(this).index()>$(".btn").eq(now).index()) {
        next=$(this).index()-1;
        move();
    }else if($(this).index()<$(".btn").eq(now).index()){
        next=$(this).index()-1;
        move("l");
    }
})
var bflag=true;
$(".bright").click(function(){
    if(bflag){
        bflag=false;
        move();
    }
})
$(".bleft").click(function(){
    if(bflag){
        bflag=false;
        next-=2;
        move("l");
    }
})

// 尾部
var cha=$(".more2 ul .cha");
// var ul=$(".more2 ul");
// var lia=$(".more2 ul li a");
var xflag=true;
cha.click(function(){
    if(xflag){
        xflag=false;
        $(this).css({transition:".2s",transform:"rotate(45deg)"});
        $(this).parent().find("li").slideDown(500);
    }
    else{
        xflag=true;
        $(this).css({transition:".2s",transform:"rotate(0)"});
        $(this).parent().find("li").hide();
    }
})