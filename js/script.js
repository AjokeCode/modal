'use strict'


const modal =document.querySelector('.modal');
const btnShowModal = document.querySelectorAll('.modal-btn-4');
const closeModal = document.querySelector('.modal-close');
const pent = document.querySelector('.section-header');
const featureSection = document.querySelector('.feature-section');
const btnScrollTo = document.querySelector('.learn-btn');
const tabEl = document.querySelectorAll('.instant');
const tab = document.querySelector('.tab-btn');
const tabContent = document.querySelectorAll('.card-detail-4');
const nav = document.querySelector('.show-case');



const removeHidden = function (e) {
    e.preventDefault()
    modal.classList.remove('hidden')
}
const addHidden =   function (e) {
    e.preventDefault()
    modal.classList.add('hidden')
}

btnShowModal.forEach(btn => btn.addEventListener
    ('click', removeHidden))
closeModal.addEventListener('click', addHidden)


document.addEventListener('keydown', function (e) {
    if(e.key === 'Escape' && modal.classList.contains('hidden')) {
       addHidden()
      }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 
'We are almost perfect about all our transaction. <button class="cookies-btn">Partner with us!</button>';

pent.append(message)

document.querySelector('.cookies-btn').addEventListener('click', function() {
    message.remove()
});
//document.querySelector('.cookies-btn').addEventListener('click', removeHidden)

btnScrollTo.addEventListener('click', function(){
    //const s1coord = featureSection.getBoundingClientRect();
    featureSection.scrollIntoView({
        behavior: 'smooth'
    })
});

/* window.scrollTo( {
    left: s1coord.left + window.pageXOffset, 
    top: s1coord.top + window.pageYOffset,
    behavior: 'smooth'
}
) 

document.querySelectorAll('.modal-btn-0').forEach(
    function(el) {
        el.addEventListener('click', function(e){
            e.preventDefault()
        const id = this.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        })
        })
    }
)*/
document.querySelector('.modal_side').addEventListener('click', function(e){
    const id = e.target.getAttribute('href');
    if(e.target.classList.contains('modal-btn-0')){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        })
    }
});

tab.addEventListener('click', function(e){
    const clicked = e.target.closest('.instant')
    if(!clicked) return;

    // for moving transforming up and down
    tabEl.forEach(t => t.classList.remove('tab-active'))
    clicked.classList.add('tab-active')

    // for displaying their content
    tabContent.forEach(el => el.classList.add('operations__content'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.remove('operations__content');

});


//header
const handlehover = function(e){
    if (e.target.classList.contains('modal-btn-0')){
        const link = e.target
        const siblings = link.closest('.show-case').querySelectorAll('.modal-btn-0');
        const img = link.closest('.show-case').querySelector('img');
        const opec = link.closest('.show-case').querySelector('.opec')
    
        siblings.forEach(el => {
            if(el !== link) el.style.opacity = this;
        })
        img.style.opacity = this;
        opec.style.opacity = this;
    }
}


nav.addEventListener('mouseover', handlehover.bind(0.5));
nav.addEventListener('mouseout', handlehover.bind(1));


// sticky navigation when it reaches first section
const header = document.querySelector('.header');
const navmargin = nav.getBoundingClientRect().height; 
const obsCallback = function (entries) {
    const [entry] = entries;
    if(!entry.isIntersecting) nav.classList.add('sticky')
    else {
        nav.classList.remove('sticky')
    }
}
const observer = new IntersectionObserver(obsCallback, {
    root: null,
    threshold: 0,
    rootMargin: `-${navmargin}px`,
});
observer.observe(header);


// adding nice effect on all sections
const allSections = document.querySelectorAll('.section')
const revealcallbk = function(entries, observer){
    const [entry] = entries; 
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden')
}

const revealSection = new IntersectionObserver(revealcallbk, {
    root: null,
    threshold: 0.15,
})
allSections.forEach(section => {
    revealSection.observe(section)
    section.classList.add('section-hidden')
});


// implementing lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');
const imgCallbk = function(entries, observer){
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img')
    })

}

const imgLoad = new IntersectionObserver(imgCallbk, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
})

imgTarget.forEach(img => imgLoad.observe(img))


// functionality of the arrowleft and arrowright 
const slides = document.querySelectorAll('.user_about');
const leftBtn = document.querySelector('.arr-btn-1');
const rightBtn = document.querySelector('.arr-btn-2');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');




const maxSlide = slides.length;

const createDots = function() {
    slides.forEach(function(_, i){
        dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots_dot" data-slide="${i}"></button>
        `)
    })
} ;
createDots();

const activateDots = function(slide){
    document.querySelectorAll('.dots_dot').forEach(dot => dot.classList.remove('dots_dot--active'));
    document.querySelector(`.dots_dot[data-slide = "${slide}"]`).classList.add('dots_dot--active')
}
activateDots(0);


let curSlide = 0;
slides.forEach((s, i)=> (s.style.transform = `translateX(${100 * i}%)`));
const goToSlide = function(slide){
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    })
}
const prevSlide = function(){
        if(curSlide === 0) curSlide = maxSlide -1;
        else{
            curSlide--;
        }
        goToSlide(curSlide);
        activateDots(curSlide)
    }
const nextSlide = function(){
    if(curSlide === maxSlide - 1) {
        curSlide = 0
    } else curSlide++;
    goToSlide(curSlide);
    activateDots(curSlide)
}



rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
    if(e.key === 'ArrowLeft'){
        prevSlide()
    } 
    e.key === 'ArrowRight' && nextSlide()
});

dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots_dot')){
        const slide = e.target.dataset.slide;
        goToSlide(slide)
        activateDots(slide)
    }
});