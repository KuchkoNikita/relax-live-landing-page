const popup = () => {
    const btns = document.querySelectorAll('.button_wide'),
        popupConsultation = document.querySelector('.popup-consultation'),
        btnClose = popupConsultation.querySelector('.close');

    btns.forEach((item) => {
        item.addEventListener('click', () => popupConsultation.style.visibility = 'visible');
    }) 
    btnClose.addEventListener('click', () => popupConsultation.style.visibility = 'hidden');
    popupConsultation.addEventListener('click', (e) => {
        if (e.target === popupConsultation){
            popupConsultation.style.visibility = 'hidden';
        }
    });
};

export {popup as popupConsultation};