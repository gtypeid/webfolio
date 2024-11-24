
class slider
{
    constructor(parent)
    {
        this.parent = parent;
        this.parentDOM = document.getElementsByClassName(this.parent)[0];

        this.root;
        this.sliderWrap;

        this.sliderElementPrv;
        this.sliderElements = [];

        this.activeIndex = 0;
        this.sliderWidthSize = 1800;

        this.img = [];
        this.title = [];
        this.coment = [];
        this.color = [];
    }

    insertImg(newSrc)
    {
        this.img.push(newSrc);
    }

    insertTitle(newString)
    {
        this.title.push(newString);
    }

    insertComent(newString)
    {
        this.coment.push(newString);
    }

    setColor(color)
    {
        this.color.push(color);
    }

    setStyle(target,style)
    {
        Object.assign( target.style , style);
    }

    make()
    {
        this.root = document.createElement("div");
        this.root.classList.add( config.slider_dm );

        this.parentDOM.appendChild( this.root );

        this.makeElement( this.img.length );

        this.setActive(0);
    }

    left()
    {
        this.activeIndex--;
        if(this.activeIndex < 0) this.activeIndex = this.img.length -1;
        this.setActive(this.activeIndex);

    }

    right()
    {
        this.activeIndex++;
        if(this.activeIndex >= this.img.length) this.activeIndex = 0;
        this.setActive(this.activeIndex);
    }

    setActive(index)
    {
        this.activeIndex = index;

        const px = -(this.sliderWidthSize * this.activeIndex) + "px";
        this.setStyle( this.sliderWrap , { transform : "translateX(" + px + ")" } );

        if(this.sliderElementPrv) this.sliderElementPrv.classList.remove(config.slider_controllerActive);
        this.sliderElements[index].classList.add(config.slider_controllerActive);
        this.sliderElementPrv = this.sliderElements[index];
    }

    makeElement(makeCount)
    {
        const widhtSize = this.sliderWidthSize;

        const {img , title, coment, color } = this;


        // slider Wrap
        this.sliderWrap = document.createElement("div");
        this.sliderWrap.classList.add(config.slider_wrap);
        this.setStyle(this.sliderWrap , { width : (widhtSize * makeCount) + "px",});

        // slider button wrap
        const sliderButtonsWrap = document.createElement("div");
        sliderButtonsWrap.classList.add(config.slider_buttonsWrap);

        // slider button
        const sliderButtonLeft = document.createElement("div");
        sliderButtonLeft.classList.add(config.button_left);
        sliderButtonLeft.addEventListener("click",(event)=>{ buttonClick(event, this) } );

        const sliderButtonRight = document.createElement("div");
        sliderButtonRight.classList.add(config.button_right);
        sliderButtonRight.addEventListener("click",(event)=>{ buttonClick(event, this) } );

        // slider controller wrap
        const sliderControllerWrap = document.createElement("div");
        sliderControllerWrap.classList.add(config.slider_controllerWrap);

        // slider controller list
        const sliderControllerList = document.createElement("ul");
        sliderControllerList.classList.add(config.slider_controllerList);
        this.setStyle(sliderControllerList, { "width" : (25 * makeCount) + "px" });



        this.root.appendChild( this.sliderWrap);
        this.root.appendChild(sliderButtonsWrap);
        this.root.appendChild(sliderControllerWrap);

        sliderButtonsWrap.appendChild(sliderButtonLeft);
        sliderButtonsWrap.appendChild(sliderButtonRight);

        sliderControllerWrap.appendChild(sliderControllerList);


        for ( var i = 0 ; i < makeCount; ++i)
        {
            // root Element
            const newElement = document.createElement("div");
            newElement.classList.add(config.slider_element);

            const newImg = document.createElement("img");
            newImg.src = img[i];

            const newTitle = document.createElement("h1");
            newTitle.innerHTML = title[i];
            newTitle.style.color = color[i];

            const newComent = document.createElement("h1");
            newComent.innerHTML = coment[i];
            newComent.style.color = color[i];

            this.sliderWrap.appendChild(newElement);

            newElement.appendChild(newImg);
            newElement.appendChild(newTitle);
            newElement.appendChild(newComent);

            this.setStyle(newTitle, { position : "absolute" , top :"50px", left : "250px", fontSize : "52px"} );
            this.setStyle(newComent, { position : "absolute" , top :"150px", left : "250px" } );

            this.setStyle(newElement, { position : "absolute" , left : (widhtSize * i) + "px" } );

            // slider controller elements
            const sliderControllerElement = document.createElement("li");
            sliderControllerElement.classList.add(config.slider_controllerElement);
            sliderControllerElement.addEventListener("click",(event)=>{ buttonClick(event, this) } );
            sliderControllerList.appendChild(sliderControllerElement);

            // push
            this.sliderElements.push(sliderControllerElement);
            sliderControllerElement.setAttribute("index", i);
            
        }
    }
}