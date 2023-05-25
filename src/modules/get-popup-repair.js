const getPopupRepair = (data) => {

    const popupRepairTypesContent = document.querySelector('.popup-repair-types-content'),
        contentTitle = popupRepairTypesContent.querySelector('#switch-inner'),
        contentDate = popupRepairTypesContent.querySelector('.popup-repair-types-content__head-date'),
        contentTableContainer = popupRepairTypesContent.querySelector('.popup-repair-types-content-table'),
        navWrap = document.querySelector('.popup-repair-types-tab > .nav-wrap.nav-wrap-repair'),
        navBtns = document.querySelector('.nav-list.nav-list-popup-repair'),
        btnClose = document.querySelector('.tablet-hide.desktop-hide.popup-repair-types-nav__title > .close');
    
    navBtns.style.position = 'relative';
    contentDate.textContent = data[0].date;

    let count = 0;

    const clear = () => {
        [...navBtns.children].forEach((item, i) => {
            item.classList.remove('active');
            contentTableContainer.children[i].style.display = 'none';
        });
    };

    const generateButtons = () => {
        data.forEach((item, i) => {
            if( i !== 0){
                const button = document.createElement('button');
                button.classList.add('button_o');
                button.classList.add('popup-repair-types-nav__item');
                button.textContent = item.title;
                button.dataset.num = i;

                navBtns.appendChild(button);
            }
        });
    };

    const generateContent = () => {
        data.forEach((item, i) => {
            if(i !== 0){
                const table = document.createElement('table');
                table.classList.add('popup-repair-types-content-table__list');
                table.style.display = 'none';
                table.dataset.num = i;
                const tbody = document.createElement('tbody');
                item.priceList.forEach((element) => {
                    const unt = element.units.split('');
                    const content = `
                        <tr class="mobile-row showHide">
                            <td class="repair-types-name">${element.typeService}</td>
                            <td class="repair-types-value">${unt[0]}<sup>${unt[1]}</sup></td>
                            <td class="repair-types-value">${element.cost} руб.</td>
                        </tr>
                    `;
                    tbody.innerHTML += content; 
                    table.appendChild(tbody);
                    contentTableContainer.appendChild(table);
                });
            }
        })
        contentTableContainer.children[0].style.display = 'flex';
    };

    navWrap.addEventListener('click', (e) => {
        const target = e.target;
        if(target.matches('.popup-repair-types-nav__item')){
            clear();
            target.classList.add('active');
            contentTableContainer.children[target.dataset.num - 1].style.display = 'flex';
            contentTitle.textContent = data[target.dataset.num].title;
        }
        if(target.matches('#nav-arrow-popup-repair_left')){
            count--; 
            if(count < 0){
                count = navBtns.children.length - 1; 
            }
            navBtns.style.left = `-${count * 510}px`; 
        }
        if(target.matches('#nav-arrow-popup-repair_right')){
            count++; 
            if(count > navBtns.children.length - 1){
                count = 0; 
            }
            navBtns.style.left = `-${count * 510}px`; 
        }
    });

    btnClose.addEventListener('click', () => document.querySelector('.popup-repair-types').style.visibility = 'hidden');

    generateButtons();
    generateContent();
};

export default getPopupRepair;