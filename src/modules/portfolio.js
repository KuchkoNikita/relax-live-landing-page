const portfolio = () => {
    const portfolio = document.querySelector('#portfolio'),
        arrowRight = portfolio.querySelector('#portfolio-arrow_right'),
        arrowLeft = portfolio.querySelector('#portfolio-arrow_left'),
        slides = portfolio.querySelectorAll('.portfolio-slider__slide'),
        mobileslide = portfolio.querySelectorAll('.portfolio-slider-mobile .portfolio-slider__slide-frame'),
        mobileSliderTotal = portfolio.querySelector('.slider-counter-content__total'),
        mobileSliderCurrent = portfolio.querySelector('.slider-counter-content__current'),
        mobileArrowRight = portfolio.querySelector('#portfolio-arrow-mobile_right'),
        mobileArrowLeft = portfolio.querySelector('#portfolio-arrow-mobile_left');

    let slideWidth = slides[0].offsetWidth,
    currentSlide = 0,
    count = 0,
    windowWidth = window.innerWidth,
    mobileCount = 0;
  
    mobileSliderTotal.textContent = mobileslide.length;
    mobileSliderCurrent.textContent = mobileCount + 1;

  
    const mobileArrowVisible = () => {
      if (mobileCount <= 0) {
        mobileArrowLeft.style.display = 'none';
        mobileArrowRight.style.display = 'flex';      
      } else if (mobileCount >= mobileslide.length - 1) {
        mobileArrowLeft.style.display = 'flex';
        mobileArrowRight.style.display = 'none';
      } else {
        mobileArrowRight.style.display = 'flex';
        mobileArrowLeft.style.display = 'flex';
      }
    };
  
    const render = () => {    
        slides.forEach(item => {
            item.style.cssText = `
                position: relative;
                left: -${currentSlide * slideWidth}px;
                transition: 0.3s;
            `;
        });
    };

    const mobileRender = () => {
        mobileslide.forEach(item => {
            item.style.display = 'none';
        });
        mobileslide[mobileCount].style.display = 'flex';
        mobileSliderCurrent.textContent = mobileCount + 1;
    };

    const resize = () => {
        slideWidth = slides[0].offsetWidth;
        mobileArrowRight.style.zIndex = '-1';
        mobileArrowLeft.style.zIndex = '-1';
        currentSlide = 0;
        arrowRight.style.display = 'flex';
        arrowLeft.style.display = 'flex';
        if (windowWidth > 1024) {
            count = 3;
            arrowVisible();
        } else if (windowWidth <= 1024 && windowWidth > 900) {
            count = 2;
            arrowVisible();
       } else if (windowWidth <= 900 && windowWidth > 576) {
            count = 1;
            arrowVisible();
       } else {
            mobileArrowRight.style.zIndex = '100';
            mobileArrowLeft.style.zIndex = '100';
            arrowRight.style.display = 'none';
            arrowLeft.style.display = 'none';
            render();
       }
    };

    const arrowVisible = () => {
        if (currentSlide <= 0) {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'flex';
        } else if (currentSlide >= slides.length - count) {
            arrowLeft.style.display = 'flex';
            arrowRight.style.display = 'none';
        } else {
            arrowRight.style.display = 'flex';
            arrowLeft.style.display = 'flex';
        }
    };

    mobileArrowRight.addEventListener('click', () => {
        mobileCount++;
        mobileArrowVisible();
        if (mobileCount >= mobileslide.length) {
            mobileCount = mobileslide.length;
            return;
        }
      mobileRender();
    });
  
    mobileArrowLeft.addEventListener('click', () => {
        mobileCount--;
        mobileArrowVisible();
        if (mobileCount < 0) {
            mobileCount = 0;
            return;
        }
        mobileRender();
    });

    window.addEventListener(`resize`, () => {
        windowWidth = window.innerWidth;
        resize();
    });
  
    arrowRight.addEventListener('click', () => {
        currentSlide++;    
        arrowVisible();
        if (currentSlide > (slides.length - count)) {
            currentSlide = slides.length - count;
            return;
        }
        render();
    });
  
    arrowLeft.addEventListener('click', () => {
        currentSlide--;
        arrowVisible();
        if (currentSlide < 0 ) {
            currentSlide = 0;
            return;
        }
        render();
    });

    mobileArrowVisible();
    mobileRender();
    render();
    resize();
  };
  
  export default portfolio;