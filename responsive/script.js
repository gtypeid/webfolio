


var AmountTarget;
var doce = document.documentElement;
var NavmButton;
var ImgDivs;

document.addEventListener("DOMContentLoaded", function(evnet)
{
    AmountTarget = document.querySelector(".amount");
    ImgDivs = document.getElementsByClassName("imgdiv");
    ImgDivs[GetRandInt(0, ImgDivs.length-1)].classList.add("img-on");

    NavmButton = document.querySelector(".head-mnav");
    NavmButton.addEventListener("click", function(event) { Click(evnet, NavmButton)} );
});

document.addEventListener("scroll", function(event)
{ 
    if(window.innerWidth <= 768)
    {
        AmountTarget.style.width = GetScrollPes() + "%"; 
    }   
} );

window.addEventListener("resize", function(event) {
    if(window.innerWidth > 768 && NavmButton && NavmButton.classList.contains("navm-on"))
    {
        Click(null, NavmButton);
    }
});


function GetRandInt(min, max) 
{
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
}

function GetScrollPes()
{
    return ( doce.scrollTop / (doce.scrollHeight - doce.clientHeight )) * 100;
}

function Click(evnet,button)
{
    var HeadNav = document.getElementsByClassName("head-nav")[0];
    if(!HeadNav) return;

    if (!button.classList.contains("navm-on"))
    {
        button.classList.add("navm-on");
        var child = button.children;
        for(var i = 0; i < child.length; ++i)
        {
            child[i].classList.remove("effect-rotat-origin");
            child[i].classList.add("effect-rotat" + i);
        }

        HeadNav.classList.add("navm-change");
        //HeadNav.classList.remove("effect-navchange-origin");
        //HeadNav.classList.add("effect-navchange");
    }
    else
    {
        button.classList.remove("navm-on");

        var child = button.children;
        for(var i = 0; i < child.length; ++i)
        {
            child[i].classList.remove("effect-rotat" + i);
            child[i].classList.add("effect-rotat-origin");
        }

        HeadNav.classList.remove("navm-change");
        //HeadNav.classList.remove("effect-navchange");
        //HeadNav.classList.add("effect-navchange-origin");

    }
}