const problems = (windowWidth) => {
    const problem = document.getElementById('problems'),
        problemsItems = problem.querySelectorAll('.problems-item:not(.problems-slider__slide)'),


        problemsSliderWrap = problem.querySelector('.problems-slider-wrap'),
        problemsSlider = problemsSliderWrap.querySelector('.problems-slider'),
        problemsSliderSlides = problemsSlider.querySelectorAll('.problems-slider__slide'),
        problemsArrowLeft = problemsSliderWrap.querySelector('#problems-arrow_left'),
        problemsArrowRight = problemsSliderWrap.querySelector('#problems-arrow_right');

    // problemsSlider.style.marginLeft = '-110px';

    if(windowWidth > 1024){
        problemsItems.forEach((item) => {
            const icon = item.querySelector('.problems-item__icon-inner'),
                popup = item.querySelector('.problems-item-popup'),
                plus = item.querySelector('.svg-wrap');

            plus.addEventListener('mouseover', () => {
                icon.classList.add('active-item');
                if (item.getBoundingClientRect().top > 255) {
                  popup.style.cssText = 'visibility: visible; opacity: 1; bottom: 86px;';
                } else {
                  popup.style.cssText = 'visibility: visible; opacity: 1; top: 100px; padding: 40px 40px 0;';
                  popup.classList.add('active-formula');
                }
            });
            plus.addEventListener('mouseleave', (e) => {
                icon.classList.remove('active-item');
                popup.classList.remove('active-formula'); 
                popup.style.cssText = 'opacity: 0.1; visibility: hidden;';
            });
        });
    } else {

        let slideWidth = 33,
            width = problemsSliderSlides[0].offsetWidth,
            count = 0,
            currentSlide = 0;

        problemsSliderWrap.style.overflow = 'hidden';
        problemsSlider.querySelectorAll('.problems-slider__slide').forEach(item => item.classList.remove('active-item'));
        if(windowWidth < 576){
            slideWidth = 100;
            width = 260;
            problemsSlider.style.cssText = 'display: flex; align-items: flex-start; will-change: transform; margin-left: 15px;';
        } else {
            const firstSlide = problemsSliderSlides[0].cloneNode(true),
                lastSlide = problemsSliderSlides[3].cloneNode(true);
                problemsSlider.appendChild(firstSlide);
                problemsSlider.prepend(lastSlide);
                problemsSlider.style.cssText = `display: flex; align-items: flex-start; will-change: transform;`;
        }

        // problemsSlider.style.cssText = `display: flex; align-items: flex-start; will-change: transform;`;
        problemsSliderSlides.forEach((item) => {
            item.style.cssText = `flex: 0 0 ${slideWidth}%;`;
        });

        const slider = (count) => {
            problemsSliderSlides.forEach((item, i) => {
                item.style.cssText = `width: ${slideWidth + 17}%;`;
                item.classList.remove('active-item');
                if(i === count){
                    item.classList.add('active-item');
                }
            })
        };

        problemsSlider.style.transform = `translateX(${currentSlide * width}px)`;
        slider(count);

        problemsArrowRight.addEventListener('click', () => {
            count++; currentSlide--;
            if(count > 3){
                count = 0; currentSlide = 0;
            }
            problemsSlider.style.transform = `translateX(${currentSlide * width}px)`;
            slider(count);
        });
        problemsArrowLeft.addEventListener('click', () => {
            count--; currentSlide++;
            if(count < 0){
                count = 3; currentSlide = -3;
            }
            problemsSlider.style.transform = `translateX(${currentSlide * width}px)`;
            slider(count);
        });

    }
};

export default problems;