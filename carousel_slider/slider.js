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
    
    createLeftButton = (root) => {
        const leftBtn = document.createElement(`button`);
        leftBtn.id = `slider-left-btn`;
        leftBtn.style.position = `relative`;
        leftBtn.style.border = `none`;
        leftBtn.style.backgroundColor = `inherit`;
        leftBtn.style.zIndex = root.style.zIndex ? root.style.zIndex + 20 : 20;
        leftBtn.style.height = `${root.getBoundingClientRect().height}px`;
        leftBtn.style.left = `${root.getBoundingClientRect().width/10 - root.getBoundingClientRect().width}px`;

        leftBtn.style.display = 'flex';
        leftBtn.style.justifyContent = 'center';
        leftBtn.style.alignItems = 'center';
        leftBtn.innerText = '<';

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

        return leftBtn;
    }

    createRightButton(root){
        const rightBtn = document.createElement(`button`);
        rightBtn.id = `slider-right-btn`;
        rightBtn.style.position = `relative`;
        rightBtn.style.border = `none`;
        rightBtn.style.backgroundColor = `inherit`;
        rightBtn.style.zIndex = root.style.zIndex ? root.style.zIndex + 20 : 20;
        rightBtn.style.height = `${root.getBoundingClientRect().height}px`;
        rightBtn.style.left = `${-(root.getBoundingClientRect().width* 1/10)}px`;

        rightBtn.style.display = 'flex';
        rightBtn.style.justifyContent = 'center';
        rightBtn.style.alignItems = 'center';
        rightBtn.innerText = '>';

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

        return rightBtn;
    }

    init(){
        const root = document.querySelector(this._HTMLtagName);
        const width = root.getAttribute(`width`) || window.innerWidth.toString()+'px';
        const height = root.getAttribute(`height`) || (window.innerHeight/5).toString()+'px';
        const zIndex = root.style.zIndex ? root.style.zIndex : 0;
        root.style.display = 'flex';
        root.style.justifyContent = 'center';
        const sliderContainer = document.createElement(`div`);
        sliderContainer.className = 'custom-slider-container';
        sliderContainer.style.width = width;
        sliderContainer.style.height = height;
        sliderContainer.style.display = 'flex';

        const itemsWrapper = document.createElement(`div`);
        itemsWrapper.className = `silder-items-wrpper`;
        itemsWrapper.style.width = width;
        itemsWrapper.style.height = height;
        itemsWrapper.style.display = 'flex';
        itemsWrapper.style.overflow = 'hidden';

        this._items.forEach((item, index) => {
            const sliderItem = document.createElement(`div`);
            sliderItem.className = `custom-slider-item${item.id}`;
            sliderItem.style.height = height;
            sliderItem.style.zIndex = zIndex + 10;
            sliderItem.style.position = 'absolute';
            sliderItem.style.transition = 'opacity 0.5s';

            if(index !== this.itemIndex){
                sliderItem.style.opacity = 0;
            }else{
                sliderItem.style.opacity = 1;
            }

            const sliderImage = document.createElement(`img`);
            sliderImage.src = `${item.img}`;
            sliderImage.alt = `${item.title}`;

            sliderItem.appendChild(sliderImage);
            itemsWrapper.appendChild(sliderItem);
        })  
        sliderContainer.appendChild(itemsWrapper)
        root.appendChild(sliderContainer);

        const leftBtn = this.createLeftButton(sliderContainer);
        const rightBtn = this.createRightButton(sliderContainer);
        
        sliderContainer.appendChild(leftBtn);
        sliderContainer.appendChild(rightBtn);

        window.addEventListener(`resize`, function(){
            sliderContainer.style.width = `${window.innerWidth}px`;
            leftBtn.style.left = `${root.getBoundingClientRect().width/10}px`;
            leftBtn.style.height = `${root.getBoundingClientRect().height}px`;
            rightBtn.style.left = `${sliderContainer.getBoundingClientRect().width - (sliderContainer.getBoundingClientRect().width*2/10)}px`;
            rightBtn.style.height = `${root.getBoundingClientRect().height}px`;
        })

        
    }
}