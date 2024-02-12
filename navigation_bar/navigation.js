export class Navigation {
    constructor(htmlElement, items){
        this._htmlElement = htmlElement;
        this._items = items;
    }

    init(){
        const root = this._htmlElement;
        const width = root.getBoundingClientRect().width;
        const height = root.getBoundingClientRect().height;
        
        const gnbWrapper = document.createElement('div');
        gnbWrapper.className = 'gnb_wrapper';
        
        const gnbItems = [];
        const snbItems = [];

        for ( let item of this._items ) {
            if ( item.parent === 0 ){
                gnbItems.push(item);
            }else{
                snbItems.push(item);
            }
        }

        for ( let item of gnbItems ){
            const gnb = document.createElement(`ul`);
            gnb.id = `gnb${item.id}`;
            gnb.className = `gnb`;
            gnb.innerHTML = `<a>${item.title}</a>`;
            gnbWrapper.appendChild(gnb);

            const target = snbItems.filter((snb) => snb.parent === parseInt(gnb.id.slice(3)));
            for ( let snbItem of target ) {
                const snb = document.createElement('li');
                snb.innerHTML = `<a>${snbItem.title}</a>`;
                snb.className = `snb${item.id}`;
                snb.style.display = 'none';
                gnb.appendChild(snb);
            }

            gnb.addEventListener('mouseover', function(e){
                const targets = document.querySelectorAll(`.snb${e.target.parentElement.id.slice(3)}`)
                for ( let target of targets ){
                    target.style.display = 'block';
                }
            });
            gnb.addEventListener('mouseleave', function(e){
                const targets = document.querySelectorAll(`.snb${e.target.id.slice(3)}`)
                for ( let target of targets ){
                    target.style.display = 'none';
                }
            });
        }
        root.appendChild(gnbWrapper);
    }
    
}
