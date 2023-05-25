const accordion = () => {
    const faq = document.getElementById('faq'),
        titleBlock = faq.querySelectorAll('.title_block');

    faq.addEventListener(`click`, (e) => {
        titleBlock.forEach((item) => item.classList.remove('msg-active'));
        e.target.classList.add('msg-active');
    });

};
export default accordion;