// -------------------------SWIPER-------------------------------

function swiper(){
    var swiper = new Swiper('.swiper-container', {
        slidesPerView:1,
        spaceBetween:0,
        loop:true,
        effect:'fade',
        simulateTouch:false,
        fadeEffect: {
            crossFade:true
        },
        pagination: {
            el:'.swiper-pagination',
            clickable:true
        },
        breakpoints:{
            0:{
                simulateTouch:true
            },
            992:{
                simulateTouch:true
            }
        }
    });

    $('.prev').on('click', function(){
        setTimeout(() => {
            swiper.slidePrev();
        },1700)
    });

    $('.next').on('click', function(){
        setTimeout(() => {
            swiper.slideNext();
        },1700)
    });

    $('.arrows').on('click',function(){
        $('.reveal').addClass('active');
        TweenMax.to('.box-title', .8,{
            x:100,
            opacity:0,
            ease:Power2.easeInOut,
            delay:0,
        });
    });

    swiper.on('slideChangeTransitionEnd', function(){
        $('.reveal').removeClass('active');
        TweenMax.to('.box-title', 1,{
            x:0,
            opacity:1,
            ease:Power2.easeInOut,
            delay:0,
        });
    });
}

swiper();

// -------------------HAMBURGER----------------------------------

$('.header').on('click', '.hamburger', function(){
    $(this).toggleClass('is-active');
   
});

//------------------------MENU-------------------------

$('.header').on('click', '.hamburger', function(){
     
     var tlmenu = new TimelineMax({
        paused:true,
        delay:-1
    });
    tlmenu.staggerFromTo(
        ".nav", 
        .7,
        {left:'-100%', display:'none', ease:Circ.easeInOut},
        {left:'0%', display:'block', ease:Circ.easeInOut},
        .1
    );
    tlmenu.staggerFromTo(
        ".nav .menu", 
        .8,
        {x:-50, opacity:0, ease:Circ.easeInOut},
        {x:0, opacity:1, ease:Circ.easeInOut},
        .1
    );
    if($(this).hasClass('is-active')){
        tlmenu.play(0);
    }else{
        tlmenu.reverse(-.5);
    }
})

$('.header').on('click', '.nav .menu li a', function(){
    $('.nav').fadeOut(1200);
    $('.hamburger').removeClass('is-active');

})