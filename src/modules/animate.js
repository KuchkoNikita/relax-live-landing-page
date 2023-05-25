const animateScroll = (id) => {
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

export default animateScroll;