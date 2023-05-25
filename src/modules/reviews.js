const reviews = () => {
    const review = document.getElementById('reviews'),
        reviewsArrowLeft = review.querySelector('#reviews-arrow_left'),
        reviewsArrowRight = review.querySelector('#reviews-arrow_right'),
        reviewsSliderItems = review.querySelectorAll('.reviews-slider__slide');

        let count = 0,
            countSlides = reviewsSliderItems.length - 1;

        const enabled = (i) => {
            reviewsSliderItems.forEach((item) => {
                item.style.display = 'none';
            });
            reviewsSliderItems[i].style.display = 'flex';
        };

        reviewsArrowLeft.addEventListener('click', () => {
            count--;
            if(count < 0){
                count = countSlides;
            }
            enabled(count);
        });
        reviewsArrowRight.addEventListener('click', () => {
            count++;
            if(count > countSlides){
                count = 0;
            }
            enabled(count);
        });
};

export default reviews;