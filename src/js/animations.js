var tl = gsap.timeline({ defaults: { duration: .40 } });

//no more repitition of duration: 1!
tl.from("#logo", { y: -100 })
tl.from("ul li", { y: -100, stagger: 0.30 });
tl.from("#home img:last-child", { y: -50, x: -50, opacity: 0 })
tl.from("#home img:first-child", { y: 50, x: -50, opacity: 0 })

// init controller
var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
    triggerElement: '#img-ecommerce',
    duration: '70%',
    triggerHook:.80,
})

.setTween("#img-ecommerce", {y:50})

// .addIndicators({
//     name: 'fade scene',
//     colorTrigger: 'black',
//     colorStart: '#000',
//     colorEnd: 'black'
// })
.addTo(controller)