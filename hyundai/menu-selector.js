
class menuSelector
{
    constructor(parent)
    {
        this.parent = parent;
        this.parentDOM = document.getElementsByClassName(this.parent)[0];

        this.root = document.getElementsByClassName("car-selecter-box")[0];
        this.moveWrapBox = document.getElementsByClassName("car-selecter-move-wrap")[0];

        this.activeIndex = 0;
        this.sliderWidthSize = 1080;

        this.selectorWidth = 360;


    }

    setStyle(target,style)
    {
        Object.assign( target.style , style);
    }

    left()
    {

        this.activeIndex--;
        if(this.activeIndex < 0) this.activeIndex = 1;
        this.setActive(this.activeIndex);

    }

    right()
    {

        this.activeIndex++;
        if(this.activeIndex >= 2) this.activeIndex = 0;
        this.setActive(this.activeIndex);
    }

    setActive(index)
    {

        const px = -(this.sliderWidthSize * this.activeIndex) + "px";
        this.setStyle( this.moveWrapBox , { transform : "translateX(" + px + ")" } );
    }


    make()
    {

        const sliderButtonsWrap = document.getElementsByClassName("car-selecter-button-wrap")[0];

        // slider button
        const sliderButtonLeft = document.createElement("div");
        sliderButtonLeft.classList.add(config.button_left);
        sliderButtonLeft.addEventListener("click",(event)=>{ buttonClick(event, this) } );

        const sliderButtonRight = document.createElement("div");
        sliderButtonRight.classList.add(config.button_right);
        sliderButtonRight.addEventListener("click",(event)=>{ buttonClick(event, this) } );

        sliderButtonsWrap.appendChild(sliderButtonLeft);
        sliderButtonsWrap.appendChild(sliderButtonRight);

        this.makeElement( carSelectData.datas.length );
    }

    makeElement(count)
    {
        const moveWrap = this.moveWrapBox;

        for(var i = 0; i <count; ++i)
        {
            const itdata = carSelectData.datas[i];

            const element = document.createElement("div");
            const background = document.createElement("div");
            const img = document.createElement("img");
            const name = document.createElement("h1");

            this.setStyle(element, {width : this.selectorWidth + "px", height : "350px" , position : "absolute", left: (this.selectorWidth * i) + "px",  cursor : "pointer", });
            element.addEventListener("mouseover", (event)=>{ hover(event, this)});
            element.addEventListener("mouseout", (event)=>{ unhover(event, this)});

            background.setAttribute("cardata",i);
            background.addEventListener("click", (event)=>{ buttonClick(event, this)});


            img.src = itdata.thumb;
            name.innerHTML = itdata.name;

            element.appendChild(background);
            element.appendChild(img);
            element.appendChild(name);

            this.setStyle(background, {position: "absolute", width : "100%" , height : "100%"} );
            this.setStyle(img, { display: "block", margin : "0px auto", paddingTop : "110px"} );
            this.setStyle(name, { textAlign : "center", fontSize : "23px"});

            moveWrap.appendChild(element);

        }
        
    }
}