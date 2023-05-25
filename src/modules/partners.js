class Carousel{
    constructor({main, wrap, next, prev, infinity = false, position = 0, slidesToShow = 3, responsive = []}){
        try{
            this.main = document.querySelector(main);
            this.wrap = document.querySelector(wrap);
            this.next = document.querySelector(next);
            this.prev = document.querySelector(prev);
            this.slides = document.querySelector(wrap).children;
            this.slidesToShow = slidesToShow;
            this.responsive = responsive;
            this.options = {
                position,
                widthSlide: Math.floor(100 / this.slidesToShow),
                infinity,
                maxPosition: (this.slides.length) - this.slidesToShow
            };
        } catch(e){
            console.warn('Для работы карусель слайдера, необхимо передать блок родитель всего слайдера, а также блок родитель фотографий!');
            return;
        }
    }

    init(){
        try {
            this.addClass();
            this.addStyle();
            this.prev && this.next ? this.control() : (this.addArrow(), this.control());
            this.responsive ? this.responseInit() : '';
            
        } catch (error) {}
    }

    addClass(){
        this.main.classList.add('carusel-slider');
        this.wrap.classList.add('carusel-slider__wrap');

        [...this.slides].forEach((item) => item.classList.add('carusel-slider__item'));
    }

    addStyle(){
        let style = document.getElementById('carusel-slider');
        if(!style){
            style = document.createElement('style');
            style.id = 'carusel-slider';
        }

        style.textContent = `
            .carusel-slider {
                overflow: hidden !important;
            }
            .carusel-slider__wrap {
                display: flex !important;
                align-items:center !important;
                transition: transform .5s !important;
                will-change: transform !important;
            }
            .carusel-slider__item{
                flex: 0 0 ${this.options.widthSlide}% !important;
                align-items: center !important;
                margin: 0 auto !important;
                max-width: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    control(){
        this.prev.addEventListener('click', () => this.arrowPrev());
        this.next.addEventListener('click', () => this.arrowNext());
    }

    arrowPrev(){
        this.options.position -= 1;
        this.options.position < 0 ? this.options.position = this.options.maxPosition : '';
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }

    arrowNext(){
        this.options.position += 1;
        this.options.position > this.options.maxPosition ? this.options.position = 0 : '';
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
    addArrow(){
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.classList.add('carusel-slider__prev');
        this.next.classList.add('carusel-slider__next');

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.id = 'carusel-slider__btn';
        style.textContent = `
            .carusel-slider__prev,
            .carusel-slider__next{
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }
            .carusel-slider__next {
                border-left-color: #19b5fe;
            }
            .carusel-slider__prev {
                border-right-color: #19b5fe;
            }
            .carusel-slider__prev:hover,
            .carusel-slider__next:hover,
            .carusel-slider__prev:focus,
            .carusel-slider__next:focus{
                background: transparent;
                outline: none;
            }
            .carusel-slider__prev:hover,
            .carusel-slider__next:hover{
                opacity: 0.5;
            }
        `;

        document.head.appendChild(style);
    }

    responseInit(){
        const slideDefault = this.slidesToShow,
            allResponse = this.responsive.map(item => item.breakpoint),
            maxResponse = Math.max(...allResponse);

        const response = (slide) => {
            this.slidesToShow = slide;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
        };

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if(widthWindow < maxResponse){
                allResponse.forEach((item, i) => {
                    if(widthWindow < item){
                        response(this.responsive[i].slideToShow);
                    }
                });
            } else {
                response(slideDefault)
            }
        };

        window.addEventListener('resize', checkResponse);
    }
}

export {Carousel as Partners};