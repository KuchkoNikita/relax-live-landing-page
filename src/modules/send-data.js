import {maskPhone, validate} from './validate';

const sendData = () => {

    const popupThank = document.querySelector('.popup-thank '),
        closeBtn = popupThank.querySelector('.close'),
        popupTitle = popupThank.querySelector('.popup-thank__title'),
        containerSuccess = document.createElement('div');

    const validateInput = () => {
        document.querySelectorAll('form').forEach(form => {
            [...form.elements].forEach(item => {
                item.removeAttribute('required');
                item.addEventListener('input', () => {
                    if(item.tagName.toLowerCase() !== 'button' && item.type !== 'button'){
                        if(item.type === 'text' && item.name === 'phone'){
                            maskPhone(`#${item.id}`);
                        }
                        if(item.type === 'text' && item.name === 'name'){
                            item.value = validate(item.value).cirilicAndSpace();
                        }
                    }
                });
            });
        });
    };

    const preloader = () => {
        const preloader = document.createElement('div');
        preloader.style.cssText = `
            width: 120px;
            height: 120px;
            margin: 0 auto;
            background: transparent url('//i.gifer.com/Xqg8.gif') no-repeat center center;
        `;
        return preloader;
    };


    const formDataToJson = (form) => {
        const formData = new FormData(form);
        let obj = {};

        for(let [key, value] of formData.entries()){
            obj[key] = value;
        }

        return JSON.stringify(obj);
    };  

    const postData = (form) => {

        fetch('./server.php', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': formDataToJson(form)
        })
        .then(response => {
            if(response.status === 200){
                return response.text();
            } else {
                throw new Error(`Произошла ошибка с кодом: ${response.status}`);
            }
        })
        .then((result) => {
            const data = popupTitle.textContent;
            popupTitle.innerHTML = `${result} <br> ${popupTitle.textContent}`;
            popupThank.style.visibility = 'visible';
            setTimeout(() => {popupThank.style.visibility = 'hidden'; popupTitle.innerHTML = data;}, 3000);
            closeBtn.addEventListener('click', () => {popupThank.style.visibility = 'hidden'; popupTitle.innerHTML = data;});
        })
        .finally(() => (form.reset(), form.elements[form.elements.length - 2].disabled = false, containerSuccess.innerHTML = ''));
    };

    document.addEventListener('submit', (event) => {
        event.preventDefault();
        const target = event.target;

        if(target.elements['name'] && target.elements['name'].value.length < 2){
            alert('Имя должно содержать как минимум 2 буквы');
        }
        else if(target.elements['phone'].value.length < 18){
            alert('Номер телефона должен содержать 18-ть символов!');
        }
        else if(!target.elements[target.elements.length-1].checked){
            alert('Прежде чем отправить, нужно согласиться с нашей политикой конфиденциальности!');
        } else {
            postData(target);
            target.elements[target.elements.length-2].disabled = true;
            target.appendChild(containerSuccess);
            containerSuccess.appendChild(preloader());
        }
    });

    validateInput();
};

export default sendData;