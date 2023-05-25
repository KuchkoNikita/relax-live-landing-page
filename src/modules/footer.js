import animateScroll from './animate';

const fromFooterToTop = () => {
    const href = document.querySelector('.button-footer').children[0].attributes[0].textContent,
        btn = document.querySelector('.button-footer');
    btn.dataset.href = href;    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.popup-dialog-menu')
            .style.transform = 'translateX(645px)';
        animateScroll(btn.dataset.href);
    });
};

export default fromFooterToTop;