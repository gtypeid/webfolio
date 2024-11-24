


var gCarVr;


document.addEventListener("DOMContentLoaded", ()=>{
    
	
    const topSlider = makeSlider("top");
    const bottomSlider = makeSlider("bottom");
    makeMenuSelector();
    gCarVr = makeCarVr();


    bindInterval(topSlider);
    bindInterval(bottomSlider);
	

});

document.addEventListener("scroll", (event)=>{

    const quickMenu = document.getElementsByClassName("quick-menu")[0];

    if( 0 < getScrollPes() )
    {
        quickMenu.style.top = "0px";
    }
    else
    {
        quickMenu.style.top = "100px";
    }
});

function makeSlider(param)
{
    let newSlider;
    let datas = (param === "top") ? sliderTopData.datas : sliderBottomData.datas;
    let parent = (param ==="top") ? "slider-top" : "slider-bottom";
    // new
    newSlider = new slider(parent);
    for( var it of datas)
    {
        newSlider.insertImg(it.img);
        newSlider.insertTitle(it.title);
        newSlider.insertComent(it.coment);
        newSlider.setColor(it.color);
    }
    newSlider.make();

    return newSlider
}

function makeMenuSelector()
{
    let newMenuSelector;
    let parent = "car-selecter";
    newMenuSelector = new menuSelector(parent);
    newMenuSelector.make();


    return newMenuSelector;
}

function makeCarVr()
{
    let newCarVr;
    newCarVr = new carVr();

    return newCarVr;
}



function buttonClick(event, object)
{
	
    event.preventDefault();

    const { target } = event;
    const cl = target.classList;

    if ( cl.contains ( config.button_left) ) object.left();
    if ( cl.contains ( config.button_right) ) object.right();

    const index = target.getAttribute("index");
    if ( index != undefined ) object.setActive(index);

    const cardata = target.getAttribute("cardata");
    if ( cardata != undefined )
    {
        gCarVr.ClickHandle(event , "active" , cardata);
    }

}

function hover(evnet,self,background)
{
    const { target } = evnet;
    target.style.backgroundColor = "black";
    target.style.opacity = "0.3";
}

function unhover(evnet,self,background)
{
    const { target } = evnet;
    target.style.backgroundColor = "transparent ";
    target.style.opacity = "1.0";
}

function bindInterval(obj)
{
    const timer = setInterval( ()=>{ obj.right() }, 5000);
}

function getScrollPes()
{
	var doce = document.documentElement;
    return ( doce.scrollTop / (doce.scrollHeight - doce.clientHeight )) * 100;
}