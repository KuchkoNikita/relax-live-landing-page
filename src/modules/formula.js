const formula = (windowWidth, bolean) => {
    const formula = document.getElementById('formula'),
        formulaItems = formula.querySelectorAll('.formula-item'),
        formulaArrowLeft = formula.querySelector('#formula-arrow_left'),
        formulaArrowRight = formula.querySelector('#formula-arrow_right'),
        formulaSlides = formula.querySelectorAll('.formula-slider__slide'),
        formulaSliderWrap = formula.querySelector('.formula-slider-wrap'),
        formulaSlider = formula.querySelector('.formula-slider');
   
    if(windowWidth > 1020){
        formulaItems.forEach((item) => {
            const icon = item.querySelector('.formula-item__icon'),
                popup = item.querySelector('.formula-item-popup');
    
            let top = '';
            
            item.addEventListener('mouseenter', (e) => {
                icon.classList.add('active-item');
                popup.classList.add('active-item');
    
                if(!(item.getBoundingClientRect().top > 225)){
                    popup.classList.add('active-formula');
                    popup.style.cssText = "top: 100px;  padding: 40px 40px 0;";
                    top = popup.style.top;
                    item.style.zIndex = 1000;
                }
            });
    
            item.addEventListener('mouseleave', (e) => {
                icon.classList.remove('active-item');
                popup.classList.remove('active-formula');
                popup.style.cssText = `top: ${top}px`;
                item.style.zIndex = 0;
            });
        });
    } else {
        let slideWidth = 33,
            count = 0,
            currentSlide = 0;

        formulaSliderWrap.style.overflow = 'hidden';

        if(windowWidth < 576){
            slideWidth = 100;
        } else {
            const firstSlide = formulaSlides[0].cloneNode(true),
                lastSlide = formulaSlides[5].cloneNode(true);
            formulaSlider.appendChild(firstSlide);
            formulaSlider.prepend(lastSlide);


        }

        formulaSlider.style.cssText = 'display: flex; align-items: flex-start; will-change: transform;';
        formulaSlides.forEach((item) => {
            item.style.cssText = `flex: 0 0 ${slideWidth}%`;
        });

        const slider = (count) => {
            formulaSlides.forEach((item, i) => {
                item.classList.remove('active-item');
                if(i === count){
                    item.classList.add('active-item');
                }
            })
        };

        formulaSlider.style.transform = `translateX(${currentSlide * slideWidth}%)`;
        slider(count);

        formulaArrowRight.addEventListener('click', () => {
            count++; currentSlide--;
            if(count > 5){
                count = 0; currentSlide = 0;
            }
            formulaSlider.style.transform = `translateX(${currentSlide * slideWidth}%)`;
            slider(count);
        });
        formulaArrowLeft.addEventListener('click', () => {
            count--; currentSlide++;
            if(count < 0){
                count = 5; currentSlide = -5;
            }
            formulaSlider.style.transform = `translateX(${currentSlide * slideWidth}%)`;
            slider(count);
        });

    }

};

export default formula;