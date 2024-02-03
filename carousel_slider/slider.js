export class Slider {
    /**
     * @param {string} HTMLtagName
     * @param {Array<JSON>} items 
     */
    constructor(HTMLtagName, items){
        this._HTMLtagName = HTMLtagName;
        this._items = items;
    }
    itemIndex = 0;
    

    init(){
        const root = document.querySelector(this._HTMLtagName);
        const width = root.getAttribute(`width`) || window.innerWidth.toString()+'px';
        const height = root.getAttribute(`height`) || (window.innerHeight/5).toString()+'px';
        const zIndex = root.style.zIndex ? root.style.zIndex : 0;
        const sliderContainer = document.createElement(`div`);
        sliderContainer.className = 'custom-slider-container';
        sliderContainer.style.width = width;
        sliderContainer.style.height = height;

        this._items.forEach((item, index) => {
            const sliderItem = document.createElement(`div`);
            sliderItem.className = `custom-slider-item${item.id}`;
            sliderItem.style.width = width;
            sliderItem.style.height = height;
            sliderItem.style.zIndex = zIndex + 10;
            sliderItem.style.position = 'absolute';
            sliderItem.style.backgroundColor = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
            
            if(index !== this.itemIndex){
                sliderItem.style.opacity = 0;
            }else{
                sliderItem.style.opacity = 1;
            }

            const sliderImage = document.createElement(`img`);
            sliderImage.src = `${item.img}`;
            sliderImage.alt = `${item.title}`;

            sliderItem.appendChild(sliderImage);
            sliderContainer.appendChild(sliderItem);
        })

        const leftBtn = document.createElement(`button`);
        leftBtn.id = `slider-left-btn`;
        leftBtn.style.position = `absolute`;
        leftBtn.style.border = `none`;
        leftBtn.style.backgroundColor = `white`;
        leftBtn.style.zIndex = zIndex + 20;
        leftBtn.style.left = `${0 + (window.innerWidth/12)}px`;
        leftBtn.style.borderRadius = '1rem';
        leftBtn.style.width = '1rem';
        leftBtn.style.height = '1rem';
        leftBtn.style.top = (root.getBoundingClientRect().top + ((window.innerHeight/5)/2 - 8)).toString() + 'px';
        leftBtn.innerText = '<';
        leftBtn.style.display = 'flex';
        leftBtn.style.justifyContent = 'center';
        leftBtn.style.alignItems = 'center';

        leftBtn.addEventListener('click', e => {
            const currentSlide = document.querySelector(`.custom-slider-item${this.itemIndex+1}`);
            currentSlide.style.opacity = 0;
            this.itemIndex--;
            if(this.itemIndex < 0){
                this.itemIndex = this._items.length - 1;
            }
            const nextSlide = document.querySelector(`.custom-slider-item${this.itemIndex+1}`);
            nextSlide.style.opacity = 1;
        })

        const rightBtn = document.createElement(`button`);
        rightBtn.id = `slider-right-btn`;
        rightBtn.style.position = `absolute`;
        rightBtn.style.border = `none`;
        rightBtn.style.backgroundColor = `white`;
        rightBtn.style.zIndex = zIndex + 20;
        rightBtn.style.right = `${0 + (window.innerWidth/12)}px`;
        rightBtn.style.borderRadius = '1rem';
        rightBtn.style.width = '1rem';
        rightBtn.style.height = '1rem';
        rightBtn.style.top = (root.getBoundingClientRect().top + ((window.innerHeight/5)/2) - 8).toString() + 'px';
        rightBtn.innerText = '>';
        rightBtn.style.display = 'flex';
        rightBtn.style.justifyContent = 'center';
        rightBtn.style.alignItems = 'center';

        rightBtn.addEventListener('click', e => {
            const currentSlide = document.querySelector(`.custom-slider-item${this.itemIndex+1}`);
            currentSlide.style.opacity = 0;
            this.itemIndex++;
            if(this.itemIndex > this._items.length - 1){
                this.itemIndex = 0;
            }
            const nextSlide = document.querySelector(`.custom-slider-item${this.itemIndex+1}`);
            nextSlide.style.opacity = 1;
        })

        root.style.display = `flex`;
        root.style.justifyContent = `center`;
        root.appendChild(leftBtn);
        root.appendChild(sliderContainer);
        root.appendChild(rightBtn);
    }
}