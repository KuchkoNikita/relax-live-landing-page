const scheme = () => {
    const schema = document.querySelector('.scheme'),
        navWrap = schema.querySelector('.nav-wrap'),
        navList = navWrap.querySelector('.nav-list'),
        schemeSliderSlides = schema.querySelectorAll('.scheme-slider__slide'),
        schemeDescriptionBlock = schema.querySelectorAll('.scheme-description-block'),
        context = navList.children;

    schemeDescriptionBlock[0].classList.add('visible-content-block');
    
    let base = 0,
        navListWidth = 0,
        shemaWidth = navWrap.offsetWidth;

    const clear = () => {
        [...context].forEach((item, i) =>{
            item.classList.remove('active');
            item.dataset.num = i;
            schemeSliderSlides[i].style.display = 'none';
            schemeDescriptionBlock[i].classList.remove('visible-content-block');
        });
    };

    navWrap.addEventListener('click', (e) => {
        const target = e.target;
        
        if(target.matches('.scheme-nav__item')){
            clear();
            target.classList.add('active');
            schemeSliderSlides[target.dataset.num].style.display = 'flex';
            schemeDescriptionBlock[target.dataset.num].classList.add('visible-content-block');
        }

        if(target.matches('.nav-arrow_right')){
            if (base >= navList.children.length) return;
            base++;
            navListWidth = (navList.offsetWidth - shemaWidth) / context.length;
            navList.style.transform = `translateX(-${navListWidth * base}px)`;
        }
        if(target.matches('.nav-arrow_left')){
            if (base <= 0) return;
            base--;
            navListWidth = (navList.offsetWidth - shemaWidth) / context.length;
            navList.style.transform = `translateX(-${navListWidth * base}px)`;
        }
    });
};

export default scheme;