const popup = () => {
    const popupRepair = document.querySelector('.popup-repair-types'),
        linkListRepair = document.querySelectorAll('.link-list-repair'),
        popupClose = popupRepair.querySelector('.close ');

    linkListRepair.forEach((item) => {
        item.addEventListener('click', () =>{
            document.querySelector('.popup-dialog-menu')
                .style.transform = 'translateX(645px)';
            popupRepair.style.visibility = 'visible';
        });
    });
    popupClose.addEventListener('click', () => popupRepair.style.visibility = 'hidden');
    popupRepair.addEventListener('click', (e) => {
        if(e.target === popupRepair){
            popupRepair.style.visibility = 'hidden';
        }
    });
};

export {popup as popupRepair};