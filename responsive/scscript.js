
var Wrap;


document.addEventListener("DOMContentLoaded", function(evnet)
{
    Wrap = document.querySelector(".sc-wrap");

    var Buttons = document.getElementsByClassName("button");
    for(bit of Buttons)
    {
        bit.addEventListener("click",Click);
    }

});

function Click(event)
{
    var TargetButton = event.target;
    if( Wrap && TargetButton)
    {
        var Cbtype = TargetButton.innerHTML;
        document.getElementsByClassName("select")[0].classList.remove("select");

        if(Cbtype == "pc")
        {
            Wrap.style.width = "100%";
            Wrap.style.height = "3500px";
            Wrap.style.position = "none";
            Wrap.style.top = "0px";
            Wrap.style.paddingTop= "70px";
            Wrap.style.border = "none";
        }

        if(Cbtype == "tablet")
        {
            Wrap.style.width = "768px";
            Wrap.style.height = "768px";
            Wrap.style.position = "relative";
            Wrap.style.top = "100px";
            Wrap.style.paddingTop= "0px";
            Wrap.style.border = "30px solid rgba(100,100,100, 0.1)";
            Wrap.style.borderRadius = "30px";
        }

        if(Cbtype == "moblie")
        {
            Wrap.style.width = "400px";
            Wrap.style.height = "768px";
            Wrap.style.position = "relative";
            Wrap.style.top = "100px";
            Wrap.style.paddingTop= "0px";
            Wrap.style.border = "10px solid rgba(100,100,100, 0.1)";
            Wrap.style.borderRadius = "15px";
        }

        TargetButton.classList.add("select");
    }

}