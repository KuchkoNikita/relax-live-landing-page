const designs = () => {
    const design = document.getElementById('designs'),
        navWrap = design.querySelector('.nav-wrap'),
        navList = navWrap.querySelector('.nav-list'),
        designsSliderWrap = design.querySelector('.designs-slider-wrap'),
        designsSlider = designsSliderWrap.querySelector('.designs-slider'),
        designSliderStyle = [...designsSlider.children],
        previewBlocks = design.querySelectorAll('.preview-block'),
        context = navList.children,
        designsCounter = designsSliderWrap.querySelector('#designs-counter'),
        designRight = designsSliderWrap.querySelector('#design_right'),
        designLeft = designsSliderWrap.querySelector('#design_left');

        let count = 0,
            countSlides = designSliderStyle[0].children.length,
            number = 0,
            base = 0,
            navListWidth = 0,
            width = navWrap.offsetWidth;


    const clear = () => {
        [...context].forEach((item, i) => {
            item.classList.remove('active');
            item.dataset.num = i;
            designSliderStyle[i].dataset.num = i;
            [...designSliderStyle[i].children].forEach((item, index) => item.dataset.slide_num = index);
            designSliderStyle[i].style.display = 'none';
            previewBlocks[i].classList.remove('visible');
        });
    };

    clear();
    context[0].classList.add('active');
    previewBlocks[0].classList.add('visible');
    designSliderStyle[0].style.display = 'flex';

    const reset = (number) => {
        [...designSliderStyle[number].children].forEach((slide, i) => {
            if(i !== 0) {
                slide.style.display = 'none';
                previewBlocks[number].children[i].children[0].classList.remove('preview_active');
            } else {
                slide.style.display = 'block';
                previewBlocks[number].children[i].children[0].classList.add('preview_active');
            }
        });
    };

    navWrap.addEventListener('click', (e) => {
        const target = e.target;
        
        if(target.matches('.designs-nav__item')){
            clear();
            target.classList.add('active');
            designSliderStyle[target.dataset.num].style.display = 'flex';
            previewBlocks[target.dataset.num].classList.add('visible');
            countSlides = designSliderStyle[target.dataset.num].children.length;
            number = target.dataset.num;
            designsCounter.children[0].children[1].textContent = designSliderStyle[target.dataset.num].children.length;
            designsCounter.children[0].children[0].textContent = 1;
            try {
                reset(+target.dataset.num + 1);
                reset(+target.dataset.num - 1);
                count = 0;
            } catch (error) {}
        }
        if (target.matches('.nav-arrow_right')) {
            if (base >= navList.children.length) return;
            base++;
            navListWidth = (navList.offsetWidth - width) / context.length;
            navList.style.transform = `translateX(-${navListWidth * base}px)`;
        }
        if (target.matches('.nav-arrow_left')) {
            if (base <= 0) return;
            base--;
            navListWidth = (navList.offsetWidth - width) / context.length;
            navList.style.transform = `translateX(-${navListWidth * base}px)`;
        }
    });

    previewBlocks.forEach((item, index) => {
        [...item.children].forEach((j, i) => {
            j.dataset.preview_num = i;
        });
        item.addEventListener('click', (e) => {
            const target = e.target;
            [...target.parentNode.parentNode.children].forEach(h => [...h.children].forEach(b => b.classList.remove('preview_active')));
            [...designSliderStyle[index].children].forEach((slide, i) => {
                slide.style.display = 'none';
                if(target.parentNode.dataset.preview_num === slide.dataset.slide_num){
                    target.classList.add('preview_active');
                    slide.style.display = 'block';
                }
            });
        });
    });

    const slider = (number,count) => {
        [...designSliderStyle[number].children].forEach((j, i) => j.style.cssText = 'display:none;');
        designSliderStyle[number].children[count].style.cssText = 'display: flex';
        designsCounter.children[0].children[0].textContent = count + 1;
    };

    designRight.addEventListener('click', () => {
        if(count > countSlides - 1){
            count = 0;
        }
        slider(number,count);
        count++;
    });
    designLeft.addEventListener('click', () => {
        count--;
        if(count < 0){
            count = countSlides - 1;
        }
        slider(number,count);
    });
};
export default designs;