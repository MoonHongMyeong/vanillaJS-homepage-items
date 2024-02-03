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
        const width = root.getAttribute(`width`);
        const height = root.getAttribute(`height`);

        const sliderContainer = document.createElement(`div`);
        sliderContainer.className = 'custom-slider-container';
        sliderContainer.style = `width:${width}; height:${height}`;

        this._items.forEach((item, index) => {
            const sliderItem = document.createElement(`div`);
            sliderItem.className = `custom-slider-item${item.id}`;
            sliderItem.style.width = width;
            sliderItem.style.height = height;
            sliderItem.style.position = 'absolute';
            sliderItem.style.backgroundColor = `#${Math.round(Math.random() * 0xffffff).toString(16)}`
            if(index !== this.itemIndex){
                sliderItem.style.visibility = 'hidden';
            }

            const sliderImage = document.createElement(`img`);
            sliderImage.src = `${item.img}`;
            sliderImage.alt = `${item.title}`;

            sliderItem.appendChild(sliderImage);
            sliderContainer.appendChild(sliderItem);
        })

        const leftBtn = document.createElement(`button`);
        leftBtn.id = `slider-left-btn`;

        leftBtn.addEventListener('click', e => {
            const currentSlide = document.querySelector(`.custom-slider-item${this.itemIndex+1}`);
            currentSlide.style.visibility = `hidden`;
            this.itemIndex--;
            if(this.itemIndex < 0){
                this.itemIndex = this._items.length - 1;
            }
            const nextSlide = document.querySelector(`.custom-slider-item${this.itemIndex+1}`);
            nextSlide.style.visibility = `visible`;
        })

        const rightBtn = document.createElement(`button`);
        rightBtn.id = `slider-right-btn`;
        rightBtn.addEventListener('click', e => {
            const currentSlide = document.querySelector(`.custom-slider-item${this.itemIndex+1}`);
            currentSlide.style.visibility = `hidden`;
            this.itemIndex++;
            if(this.itemIndex > this._items.length - 1){
                this.itemIndex = 0;
            }
            const nextSlide = document.querySelector(`.custom-slider-item${this.itemIndex+1}`);
            nextSlide.style.visibility = `visible`;
        })

        root.style.display = `flex`;
        root.style.justifyContent = `center`;
        root.appendChild(leftBtn);
        root.appendChild(sliderContainer);
        root.appendChild(rightBtn);
    }
}