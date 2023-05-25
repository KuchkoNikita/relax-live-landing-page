const { popupRepair } = require("./popup-repair-types");

const popup = () => {
    const linkPrivacy = document.querySelectorAll('.link-privacy'),
        popupPrivacy = document.querySelector('.popup-privacy'),
        popupClose = popupPrivacy.querySelector('.close '); 

    linkPrivacy.forEach((item) => {
        item.addEventListener('click', () => popupPrivacy.style.visibility = 'visible');
    });

    popupClose.addEventListener('click', () => popupPrivacy.style.visibility = 'hidden');
    popupPrivacy.addEventListener('click', (e) => {
        if (e.target === popupPrivacy){
            popupPrivacy.style.visibility = 'hidden';
        }
    });

};

export {popup as popupPrivacy};