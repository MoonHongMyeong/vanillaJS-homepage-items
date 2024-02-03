export class Slider {
    /**
     * @param {string} HTMLtagName
     * @param {Array<JSON>} items 
     */
    constructor(HTMLtagName, items){
        this._HTMLtagName = HTMLtagName;
        this._items = items;
    }
    currentItemNo = 0;
    

    init(){
        const root = document.querySelector(this._HTMLtagName);
        const width = root.getAttribute(`width`);
        const height = root.getAttribute(`height`);

        // 슬라이드 컨테이너 생성
        const sliderContainer = document.createElement(`div`);
        sliderContainer.className = 'custom-slider-container';
        sliderContainer.style = `width:${width}; height:${height}`;

        // 슬라이드 아이템들 생성
        this._items.forEach((item, index) => {
            const sliderItem = document.createElement(`div`);
            sliderItem.className = `custom-slider-item${item.id}`;
            sliderItem.style.width = width;
            sliderItem.style.height = height;
            sliderItem.style.position = 'absolute';
            sliderItem.style.backgroundColor = `#${Math.round(Math.random() * 0xffffff).toString(16)}`
            if(index !== this.currentItemNo){
                sliderItem.style.visibility = 'hidden';
            }

            const sliderImage = document.createElement(`img`);
            sliderImage.src = `${item.img}`;
            sliderImage.alt = `${item.title}`;

            sliderItem.appendChild(sliderImage);
            sliderContainer.appendChild(sliderItem);
        })

        // 버튼 기능
        const leftBtn = document.createElement(`button`);
        leftBtn.id = `slider-left-btn`;

        leftBtn.addEventListener('click', e => {
            const currentSlide = document.querySelector(`.custom-slider-item${this.currentItemNo+1}`);
            currentSlide.style.visibility = `hidden`;
            this.currentItemNo--;
            if(this.currentItemNo < 0){
                this.currentItemNo = this._items.length - 1;
            }
            const nextSlide = document.querySelector(`.custom-slider-item${this.currentItemNo+1}`);
            nextSlide.style.visibility = `visible`;
        })

        const rightBtn = document.createElement(`button`);
        rightBtn.id = `slider-right-btn`;
        rightBtn.addEventListener('click', e => {
            const currentSlide = document.querySelector(`.custom-slider-item${this.currentItemNo+1}`);
            currentSlide.style.visibility = `hidden`;
            this.currentItemNo++;
            if(this.currentItemNo > this._items.length - 1){
                this.currentItemNo = 0;
            }
            const nextSlide = document.querySelector(`.custom-slider-item${this.currentItemNo+1}`);
            nextSlide.style.visibility = `visible`;
        })

        // 받아온 root 태그에 append
        root.style.display = `flex`;
        root.style.justifyContent = `center`;
        root.appendChild(leftBtn);
        root.appendChild(sliderContainer);
        root.appendChild(rightBtn);
    }
}