
gsap.config({
    nullTargetWarn:false
});
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

//--------------------------LIGHT GALLARY--------------------
function lgGallary(){
    $('.lg-gallary').lightGallery({
        selector:'.gallary',
        download:false,
    })
}
//-----------------------------BARBAJS----------------------------
function init(){
    const loader = document.querySelector('.loader');
    gsap.set(loader, {
        scaleX:0,
        rotation:10,
        xPercent:-5,
        yPercent:-50,
        transformOrigin:'left center',
        autoAlpha:1
    });
    function loaderIn(){
        return gsap.fromTo(loader,{
            rotation:10,
            scaleX:0,
            xPercent:-5
        },
        {
            duration:.8,
            xPercent:0,
            scaleX:1,
            rotation:0,
            ease:"Circ.easeInOut",
            transformOrigin:'left center'
        })
    }
    function loaderAway(){
        return gsap.to(loader,{
            duration:.8,
            scaleX:0,
            xPercent:5,
            rotation:-10,
            transformOrigin:'right center',
            ease:"Circ.easeInOut"
        })
    }
    function contentAnimation(){
        var tl = gsap.timeline();
        tl.from("[class*='box-left']", {
            duration:1,
            translateY:100,
            opacity: 0,
        });
        tl.from("[class*='right']", {
            duration:1,
            translateY:100,
            opacity: 0
        },
        "-=.1"
        );
        tl.to(".box-img .img-cover", {
            clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity:1,
            ease:"Circ.easeInOut"
        },
        "-=1.2"
        );
        tl.to('.images .img-cover', {
            clipPath:"polygon(0 0 , 100% 0, 100% 100%, 0% 100%)",
            opacity: 1,
            ease:"Circ.easeInOut"
        },
        "-=5"
        )
    }

    function loaderSingle(mediaQuery){
        TweenMax.to('.box-title, .arrows, .swiper-pagination', .5, {
            opacity:0,
            ease:Power2.easeInOut,
            delay:-1
        })
        TweenMax.to('.box-img', .7, {
            position:'absolute',
            width:'100%',
            height:'100%',
            right:0,
            ease:Power2.easeInOut,
            delay:-0.5
        });

        if(mediaQuery.matches){
            TweenMax.to('.box-title', .5, {
                opacity: 0,
                display: "none",
                ease:Power2.easeInOut,
                delay:.5
            });
            TweenMax.to(".content", .9,{
                height: "30vh",
                ease:Power2.easeInOut,
                delay:.7
            });
        }else{
            TweenMax.to('.content', .9,{
                height: "calc(100vh - 100px)",
                ease:Power2.easeInOut,
                delay:.7
            })
        }
    }
    var mediaQuery = window.matchMedia("(max-width:991.98px)");
    mediaQuery.addEventListener("change", () => {
        this.checkNative();
    })

    barba.hooks.before(() => {
        document.querySelector('html').classList.add('is-transitioning');
    });
    barba.hooks.after(() => {
        document.querySelector('html').classList.remove('is-transitioning');
        swiper();
        lgGallary();
    });

    barba.hooks.enter(() => {
        window.scrollTo(0,0);
    });

    function delay(n){
        n = n || 2000;
        return new Promise(done => {
            setTimeout(() => {
                done();
            }, n);
        });
    }

    barba.init({
        sync:true,
        transitions:[
            {
                name:'transitionDefault',
                async leave(data){
                    const done = this.async();
                    await loaderIn();
                    await delay(800);
                    done();
                },
                async enter(data){
                    loaderAway();
                    contentAnimation();
                }
            },
            {
                name:"transitionSingle",
                async leave(data){
                    const done = this.async();
                    await loaderSingle(mediaQuery);
                    await delay(2000);
                    done();
                },
                async enter(data){

                },
                from:{
                    namespace:'home'
                },
                to:{
                    namespace:'services'
                }
            }
        ]
      });
}

window.addEventListener('load', function(){
    init();
    swiper();
    lgGallary();
})