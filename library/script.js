
var gImgs;					
var gImgWidth;				
var gActiveIndex = 0;		
var gMoveBox;				
var gTimerHandler;			
const gTimeValue = 2500;

$(document).ready(function(event)	
{
    Construct();	    	
});

function Construct()
{										
    gImgs = $(".imgbox .move-img-box img");			
    gImgWidth = 460; 	    	
    gMoveBox = $(".move-img-box");		

    gImgs.each( function (index,value)	
    { 
        $(this).css("left", (index * gImgWidth) + "px"); 
    });

    $(".button").click(ButtonClick);		

}

function ButtonClick(event)					
{
    var ctarget = $(this);    				
    if( ctarget.hasClass("right")) { MoveSlider(gActiveIndex, "right"); }
    if( ctarget.hasClass("left")) { MoveSlider(gActiveIndex, "left"); }
}

function MoveSlider(index, param)
{
    var prvIndex = gActiveIndex;	    
    var MoveValue;

    if(param == "right")    { gActiveIndex++; }
    if(param == "left")     { gActiveIndex--; }

    if(gActiveIndex == gImgs.length) gActiveIndex = 0;	    	
    else if(gActiveIndex < 0 ) gActiveIndex = gImgs.length-1;   

    MoveValue = -1 * (gImgWidth * gActiveIndex);	    
    gMoveBox.stop();
    gMoveBox.animate({left : MoveValue}, 500);			

}
