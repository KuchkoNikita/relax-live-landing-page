const popup = () => {
    const popupDesign = document.querySelector('.popup-design'),
        btnClose = popupDesign.querySelector('.close'),
        popupDialogDesign = popupDesign.querySelector('.popup-dialog-design'),
        navWrap = popupDialogDesign.querySelector('.nav-wrap'),
        navList = navWrap.querySelector('.nav-list'),
        context = [...navList.children],
        link = document.querySelector('.link-list-designs > a'),

        popupDesignTab = popupDialogDesign.querySelector('.popup-design-tab'),
        popupDesignSlider = popupDesignTab.querySelector('.popup-design-slider'),
        popupDesignSliderStyle = [...popupDesignSlider.children],
        popupDesignLeft = popupDesignTab.querySelector('#popup_design_left'),
        popupDesignRight = popupDesignTab.querySelector('#popup_design_right'),
        popupDesignsCounter = popupDesignTab.querySelector('#popup-designs-counter'),
        popupDesignTexts = popupDesignTab.querySelectorAll('.popup-design-text'),
        btnPopupClose = popupDesignTab.querySelector('.close');


    let buffer = 0,
        count = 0,
        countSlides = popupDesignSliderStyle[0].children.length,
        number = 0,
        navWidth = navList.parentNode.offsetWidth;

    const clear = () => {
        context.forEach((item, i) => {
            item.classList.remove('active');
            item.dataset.num = i;
            popupDesignSliderStyle[i].dataset.num = i;
            popupDesignTexts[i].classList.remove('visible-content-block');
        });
        [...popupDesignSliderStyle].forEach(item => [...item.children].forEach((el, i) => {
            if (i === 0) { el.style.display = 'flex'; }
            else { el.style.display = 'none'; }
        }))
    };

    const reset = () => {
        clear();
        count = 0;
        context[0].classList.add('active');
        popupDesignTexts[0].classList.add('visible-content-block');
        popupDesignSliderStyle[0].style.display = 'flex';
        popupDesignsCounter.children[0].children[1].textContent = popupDesignSliderStyle[0].children.length;
        popupDesignsCounter.children[0].children[0].textContent = 1;
    };    
    link.addEventListener('click', () => {
        reset();
        popupDesign.style.visibility = 'visible';
    });
    btnClose.addEventListener('click', () => (popupDesign.style.visibility = 'hidden', reset()));
    btnPopupClose.addEventListener('click', () => (popupDesign.style.visibility = 'hidden', reset()));
    popupDesign.addEventListener('click', (e) => {
        if (e.target === popupDesign){
            popupDesign.style.visibility = 'hidden';
            reset();
        }
    });

    reset();

    navWrap.addEventListener('click', (e) => {
        popupDesignSliderStyle.forEach((item) => item.style.display = 'none');
        const target = e.target;
        if(target.matches('.designs-nav__item')){
            clear();
            target.classList.add('active');
            popupDesignSliderStyle[target.dataset.num].style.display = 'flex';
            popupDesignTexts[target.dataset.num].classList.add('visible-content-block');
            popupDesignsCounter.children[0].children[0].textContent = 1;
            number = target.dataset.num;
            countSlides = popupDesignSliderStyle[target.dataset.num].children.length;
            popupDesignsCounter.children[0].children[1].textContent = popupDesignSliderStyle[number].children.length;
            count = 0;
        }

        if(target.matches('.nav-arrow_right')){
            buffer = (navList.offsetWidth - navWidth);
            navList.style.transform = `translateX(${-1 * buffer}px)`;
            target.style.display = 'none';
            target.previousElementSibling.style.display = 'block';
        }
        if(target.matches('.nav-arrow_left')){
            buffer = (navList.offsetWidth - navWidth) / (context.length * context.length);
            navList.style.transform = `translateX(${1 * buffer}px)`;
            target.style.display = 'none';
            target.nextElementSibling.style.display = 'block';
        }
    });

    const slider = (number,count) => {
        [...popupDesignSliderStyle[number].children].forEach((j, i) => j.style.cssText = 'display:none;');
        popupDesignSliderStyle[number].children[count].style.cssText = 'display: flex';
        popupDesignsCounter.children[0].children[0].textContent = count + 1;
    };

    popupDesignLeft.addEventListener('click', (e) => {
        count--;
        if(count < 0){
            count = countSlides - 1;
        }
        slider(number,count);
    });
    popupDesignRight.addEventListener('click', (e) => {
        if(count > countSlides - 1){
            count = 0;
        }
        slider(number,count);
        count++;
    });
};

export {popup as popupDesign};