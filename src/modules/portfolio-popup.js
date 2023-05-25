const portfolioPopup = () => {

    const portfolio = document.querySelector('#portfolio'),
        portfolioBtnDesctop = portfolio.querySelectorAll('.portfolio-slider.mobile-hide .portfolio-slider__slide-frame'),
        portfolioBtnMobile = portfolio.querySelectorAll('.portfolio-slider-mobile.tablet-hide.desktop-hide .portfolio-slider__slide-frame'),
        popupPortfolio = document.querySelector('.popup-portfolio'),
        popupPortfolioClose = popupPortfolio.querySelector('.mobile-hide'),
        popupPortfolioCloseMobile = popupPortfolio.querySelector('.close.tablet-hide.desktop-hide'),
        popupPortfolioSlide = popupPortfolio.querySelector('.popup-portfolio-slider'),
        popupPortfolioText = popupPortfolio.querySelectorAll('.popup-portfolio-text'),
        mobileSlides = popupPortfolio.querySelectorAll('.popup-portfolio-slider__slide'),
        textWrapper = popupPortfolio.querySelector('#popup-portfolio-counter'),
        arrowRight = popupPortfolio.querySelector('#popup_portfolio_right'),
        arrowLeft = popupPortfolio.querySelector('#popup_portfolio_left');
        
    let currentSlide = 0,
        countSlide = popupPortfolioText.length,
        windowWidth = window.innerWidth;
  
    textWrapper.querySelector('.slider-counter-content__total').textContent = countSlide;
  
    const render = () => {
        slider();
        textWrapper.querySelector('.slider-counter-content__current')
            .textContent = currentSlide + 1;
        mobileSlides.forEach(item => {
            item.style.display = "none";
        });
        mobileSlides[currentSlide].style.display = "flex";
    };
    const slider = () => {
        if (windowWidth <= 1024) {
            mobileSlides.forEach(item => {
                item.style.display = "none";
        });
            mobileSlides[currentSlide].style.display = "block";
        }
        popupPortfolioText.forEach(item => {
            item.style.display = "none";
        });
        popupPortfolioText[currentSlide].style.display = "block";
      };
  
    arrowRight.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide > countSlide - 1) {
            currentSlide = 0;
        }
        render();
    });
    arrowLeft.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = countSlide - 1;
        }
        render();
    });
  
    portfolioBtnMobile.forEach((item, i) => { 
        item.addEventListener('click', (e)=> {
            popupPortfolio.style.visibility = 'visible';  
            currentSlide = i;
            render();
        });
    });
  
    portfolioBtnDesctop.forEach((item, i) => { 
        item.addEventListener('click', (e)=> {
            popupPortfolio.style.visibility = 'visible';     
            currentSlide = i;
            render();
            textWrapper.querySelector('.slider-counter-content__current').textContent = currentSlide + 1;
      });
    });
  
    popupPortfolioCloseMobile.addEventListener(`click`, () => popupPortfolio.style.cssText = "visibility: hidden;");
  
    popupPortfolioClose.addEventListener(`click`, () => popupPortfolio.style.cssText = "visibility: hidden;");
    popupPortfolio.addEventListener('click', (e) => {
        if (e.target === popupPortfolio){
            popupPortfolio.style.cssText = "visibility: hidden;";
        }
    });
  
    window.addEventListener(`resize`, () => {
        windowWidth = window.innerWidth;
        mobileSlides.forEach(item => {
        item.style.display = "block";
    });
        slider();
        render();
    });


};
export default portfolioPopup;