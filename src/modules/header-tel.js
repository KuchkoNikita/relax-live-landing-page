const telAccord = () => {
    const phoneNumberAccord = document.querySelector('.header-contacts__phone-number-accord'),
        phoneNumber = phoneNumberAccord.querySelector('.header-contacts__phone-number'),
        contactsArrow = document.querySelector('.header-contacts__arrow');

    const open = () => {
        contactsArrow.addEventListener('click', () => {
            if(phoneNumber.classList.contains('active')){
                phoneNumber.style.cssText = `
                    opacity: 0;
                `;
                contactsArrow.style.transform = 'rotate(0)';
                phoneNumber.classList.remove('active'); 
            } else {
                phoneNumber.style.cssText = `
                opacity: 1;
                margin-top: 25px;
            `;
            contactsArrow.style.transform = 'rotate(180deg)';
            phoneNumber.classList.add('active');
            }
        });
    };

    open();
};

export default telAccord;