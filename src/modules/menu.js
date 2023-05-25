import animateScroll from './animate';

const menu = () => {
    const popupDialogMenu = document.querySelector('.popup-dialog-menu'),
        closeBtn = popupDialogMenu.querySelector('.close-menu'),
        menuBtn = document.querySelector('.menu'),
        popupMenuMain = document.querySelector('.popup-menu-main');

    let windowWidth = window.innerWidth;
    window.addEventListener('resize', (e) => {
        windowWidth = e.target.innerWidth;
        if (windowWidth < 576) {
            popupDialogMenu.style.transform = 'translateY(-1500px)';    
        } else {
            popupDialogMenu.style.transform = 'translateX(645px)'; 
        }
    });
    const openMenu = () => {
        popupDialogMenu.style.transform = 'translateY(0)';
    };

    const closeMenu = () => {
        if(windowWidth < 576){
            popupDialogMenu.style.transform = 'translateY(-1500px)';
        } else {
            popupDialogMenu.style.transform = 'translateX(645px)';
        }
    };

    popupMenuMain.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if(target.closest('.popup-menu-nav__item')){
            closeMenu();
            animateScroll(target.attributes[1].textContent);
        }
        if(target.closest('.link-list-menu')){

        }
    });


    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
};

export default menu;