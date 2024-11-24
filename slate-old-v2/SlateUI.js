


                                                // 3 HTMLTagBox
var gUINavTypes = ["PostTreeBox", "DetailBox", "ProjectConsoleBox", "temp"];

var gUIState = 
{
    bPointerClick : false,
    bResizeClick : false,
    CurrentClickAnyObj : "",
    DragStartWidget : "",
    DragStartMenuElement : "",
    DragStartContentWrap: ""
};

var gUINaming = 
{
    WidgetId : "widget-obj-id",
    NavButtonId : "nav-button-id",
    BoxTopId : "box-top-id",
    BoxMiddleId : "box-middle-id",
    MenuWrapId : "menu-wrap-id",
    MenuElementId : "menu-element-id",
    ContentWrapId : "content-wrap-id",
    BoxBottomId : "box-bottom-id",
    ReSizeId : "re-size-id",
    PostBoxId : "post-box-id",
    TagHTMLBoxId : "tag-html-box-id",
    TreeBoxId : "tree-box-id",
    ProjectBoxId : "project-box-id",
    ConsoleBoxId : "console-box-id"

};

var gWidgetMap = new Map();

var gWidgetData = function(Index, IDName) 
{
    this.Index = Index;
    this.IDName = IDName;
    this.Visible = false;
    this.MenuCount = 0;
    this.MenuInnerToWidgetID;
    this.SelectMenu;
    return this;
}



var TempPostContent;
var TempPostCursor;
var TempCurrentiveRect;

$(document).ready(function(event)
{
    let NavButtonArray = document.getElementsByClassName("b-nav-button");

    for( var i = 0; i < NavButtonArray.length; ++i)
    {
        CreateWidget(gUINavTypes[i]);
    }
    
    for( var i = 0 ; i < NavButtonArray.length; ++i)
    {
        NavButtonArray[i].setAttribute("id", gUINaming.NavButtonId + i);
        NavButtonArray[i].addEventListener("click", function(event){ MouseClick(event, this)} );
    }
    

    document.body.addEventListener("keydown", function(event) {KeyDown(event,this) })



    EffectCursor();
});


function EffectCursor()
{
    $(document.body).append("<div class='effect-click-cursor'>" + "</div>");
    TempPostContent = document.getElementsByClassName("content-post")[0];
    TempPostCursor = document.getElementsByClassName("effect-click-cursor")[0];


    let Posts =  document.getElementsByClassName("content-post");
    for(var i = 0; i< Posts.length; ++i)
    {
        Posts[i].addEventListener("click",function(evnet){ MouseClick(event, this)});
    }

    /*
    */

    var TimerManager = setInterval(AcceptTimer, 70);
    var DeltaTime = 0;

    var YPluse = 25;

    function AcceptTimer()
    {
        DeltaTime++;

        TempCurrentiveRect = TempPostContent.getBoundingClientRect();

        TempPostCursor.style.left = (TempCurrentiveRect.x) + "px";
        //TempPostCursor.style.top = (TempCurrentiveRect.y + YPluse) + "px";
        if(DeltaTime == 10)
        {
            DeltaTime = 0;
            TempPostCursor.style.top = (TempCurrentiveRect.y + YPluse) + "px";
        }
        else
        {
            TempPostCursor.style.top = (TempCurrentiveRect.y + ( -(DeltaTime *0.5) + YPluse)) + "px";
        }

    }


}



function VisibleWidget(Index, Value)
{
    let IDName = gUINaming.WidgetId + Index;
    let Obj = document.getElementById(gWidgetMap.get(IDName).IDName);

    let DisplayValue;
    if(Value) DisplayValue = "block";
    else DisplayValue = "none";


    if(gWidgetMap.get(IDName).MenuCount <= 0)
    {
        DisplayValue = " none";
        Value = false;
    }

    if(Obj)
    {
        gWidgetMap.get(IDName).Visible = Value;

        Obj.style.display = DisplayValue;
    }
}

function CreateWidget(widgetType)
{
    let Index = GetConstructUIIndex(gUINaming.WidgetId);
    let MakeKeyString = gUINaming.WidgetId + Index;
    gWidgetMap.set(MakeKeyString, new gWidgetData(Index, MakeKeyString));
    gWidgetMap.get(MakeKeyString).MenuCount++;

    CreateWidgetHTML(Index, widgetType);

    document.getElementById(MakeKeyString).style.left = "600px";
    document.getElementById(MakeKeyString).style.top = "100px";

    MenuSelect(Index);
}

function CreateWidgetHTML(Index, widgetType)
{
    let WidgetObj;

    let Widget_ID = gUINaming.WidgetId + Index;
    let Append_Widget = "<div class='widget' " + "id=" + Widget_ID + ">" + "</div>";

    let BoxTop_ID = gUINaming.BoxTopId + Index;
    let Append_Widget_Box_Top = "<div class='widget-box-top '" + "id=" + BoxTop_ID + ">" + "</div>";
    let Append_Widget_Slider = "<input type='range' class='b-slider' min='30' max='100' value='100'>";
    let Append_Widget_Pointer = "<div class='b-pointer'>" + "</div>";
    let Append_Widget_Exit = "<div class='b-exit'>" + "</div>";

    let BoxMiddle_ID = gUINaming.BoxMiddleId + Index;
    let Append_Widget_Box_Middle = "<div class='widget-box-middle'" + "id=" + BoxMiddle_ID + ">" + "</div>";

    let MenuWrap_ID = gUINaming.MenuWrapId + Index;
    let Append_Widget_Menu_Wrap = "<div class='widget-menu-wrap'" + "id=" + MenuWrap_ID + ">" + "</div>";

    let MenuElement_ID = gUINaming.MenuElementId + Index;
    let Append_Widget_Menu_Element = "<div class='widget-menu-element'" + "id=" + MenuElement_ID + ">" + "</div>";

    let ContentWrap_ID = gUINaming.ContentWrapId + Index;
    let Append_Widget_Contnet_Wrap = "<div class='widget-content-wrap'" + "id=" + ContentWrap_ID + ">" +  "</div>";

    let BoxBottom_ID = gUINaming.BoxBottomId + Index;
    let Append_Widget_Box_Bottom = "<div class='widget-box-bottom'" + "id=" + BoxBottom_ID + ">" + "</div>";

    let ReSize_ID = gUINaming.ReSizeId + Index;
    let Append_Widget_ReSize = "<div class='b-resize'" + "id=" + ReSize_ID + ">" + "</div>";

    $("body").append(Append_Widget);
    WidgetObj = document.getElementById(Widget_ID);

    $("#" + Widget_ID).append(Append_Widget_Box_Top);
    $("#" + Widget_ID).append(Append_Widget_Box_Middle);
    $("#" + Widget_ID).append(Append_Widget_Box_Bottom);

    $("#" + BoxTop_ID).append(Append_Widget_Slider);
    $("#" + BoxTop_ID).append(Append_Widget_Pointer);
    $("#" + BoxTop_ID).append(Append_Widget_Exit);

    $("#" + BoxMiddle_ID).append(Append_Widget_Menu_Wrap);

    $("#" + MenuWrap_ID).append(Append_Widget_Menu_Element);

    $("#" + BoxMiddle_ID).append(Append_Widget_Contnet_Wrap);

    $("#" + BoxBottom_ID).append(Append_Widget_ReSize);
    
    let RetrunObj;

    RetrunObj = document.getElementsByClassName("b-slider")[Index];
    RetrunObj.addEventListener("input", function(event){ SliderChange(event, this, WidgetObj)} );

    RetrunObj = document.getElementsByClassName("b-pointer")[Index];
    RetrunObj.addEventListener("mousedown", function(event){ MouseDown(event, this, WidgetObj)} );
    RetrunObj.addEventListener("mouseup", function(event){ MouseUp(event, this, WidgetObj)} );

    RetrunObj = document.getElementsByClassName("b-exit")[Index];
    RetrunObj.addEventListener("click", function(event){ MouseClick(event, this, WidgetObj)} );

    RetrunObj = document.getElementsByClassName("b-resize")[Index];
    RetrunObj.addEventListener("mousedown", function(event){ MouseDown(event, this, WidgetObj)} );
    RetrunObj.addEventListener("mouseup", function(event){ MouseUp(event, this, WidgetObj)} );

    //
    RetrunObj = document.getElementsByClassName("widget-menu-element")[Index];
    RetrunObj.addEventListener("click", function(event){ MouseClick(event, this, WidgetObj)} );
    RetrunObj.setAttribute("draggable", true);
    RetrunObj.addEventListener("dragstart", function(event){ DragStart(event, this, WidgetObj)} );

    // RetrunObj = document.getElementById(Widget_ID);
    RetrunObj = document.getElementsByClassName("widget-menu-wrap")[Index];
    RetrunObj.addEventListener("dragenter", function(event){ DragEnter(event, this, WidgetObj)} );
    RetrunObj.addEventListener("dragleave", function(event){ Dragleave(event, this, WidgetObj)} );
    RetrunObj.addEventListener("dragover", function(event){ DragOver(event, this, WidgetObj)} );
    RetrunObj.addEventListener("drop", function(event){ DragDrop(event, this, WidgetObj)} );

    if(widgetType == "PostTreeBox")
    {
        /*
        let TempDiv = " <div class='content-post'>" + "</div> ";
        let TempNan = " <div class='content-post'>" + "</div> ";
        let TempRand = GetRandomInt(1,55);
        for(var i = 0; i < TempRand; ++i)
        {
            TempNan = TempNan + TempDiv;
        }
        */

        let TempDiv = " <div class='content-post'>" + "div" + "</div> ";
       
        let PostBox_ID = gUINaming.PostBoxId;
        let Append_PostBox = "<div class='post-box'" + "id=" + PostBox_ID + ">" + TempDiv + TempDiv + TempDiv +  "</div>";
        $("#" + ContentWrap_ID).append(Append_PostBox);


        let TreeBox_ID = gUINaming.TreeBoxId;
        let Append_TreeBox = "<div class='tree-box'" + "id=" + TreeBox_ID + ">" + "</div>";
        $("#" + ContentWrap_ID).append(Append_TreeBox);

        document.getElementById(MenuElement_ID).innerHTML = "포스트 & 트리";
    
    }

    if(widgetType == "DetailBox")
    {
        let HtmlDetailBox = document.querySelector(".html-detail-box");
        document.getElementById(ContentWrap_ID).appendChild(HtmlDetailBox);

        document.getElementById(MenuElement_ID).innerHTML = "디테일";
    }

    if(widgetType == "HTMLTagBox")
    {
        let TagHTMLBox_ID = gUINaming.TagHTMLBoxId;
        let Append_TagHTMLBox = "<div class='tag-html-box'" + "id=" + TagHTMLBox_ID + ">" + "</div>";
        $("#" + ContentWrap_ID).append(Append_TagHTMLBox);
    }


    if(widgetType == "ProjectConsoleBox")
    {
        let HtmlConsoleBox = document.querySelector(".html-console-box");
        document.getElementById(ContentWrap_ID).appendChild(HtmlConsoleBox);

        document.getElementById(MenuElement_ID).innerHTML = "콘솔";
    }

}

function GetConstructUIIndex(objType, newSettingParam)
{
    let TargetObj;

    if(objType == gUINaming.WidgetId)
    {
        TargetObj = gWidgetMap;
    }

    let TargetObjSize = TargetObj.size;
    let ReturnValue = TargetObjSize;

    let CurrentCount = 0;
    let LastIndex = 0;
    if(newSettingParam == "default")
    {
        if(TargetObjSize === 0) {}
        else 
        {
            for (var [key, value] of TargetObj)
            {
                if(CurrentCount == TargetObjSize - 1)
                {
                    LastIndex = DeleteString(key,objType);
                    LastIndex++;

                    ReturnValue = LastIndex;
                }
                CurrentCount++;
            }
        }
    }


    return ReturnValue;

}




function SliderChange(event, self, param)
{
    let OpactiyValue = self.value;
    if(param)
    {
        OpactiyValue *= 0.01;        
        param.style.opacity = String(OpactiyValue);

    }
}


function MouseDown(event, self, param)
{
    if(self.className == "b-pointer")
    {
        gUIState.bPointerClick = true;
        gUIState.CurrentClickAnyObj = param;
        gUIState.CurrentClickAnyObj.style.zIndex  = "100";
    }
    else if(self.className == "b-resize")
    {
        gUIState.bResizeClick = true;
        gUIState.CurrentClickAnyObj = param;
        gUIState.CurrentClickAnyObj.style.zIndex  = "100";
    }
}

function MouseUp(event, self, param)
{
    if(self.className == "b-pointer")
    {
        gUIState.bPointerClick = false;

        gUIState.CurrentClickAnyObj.style.zIndex  = 1;
        gUIState.CurrentClickAnyObj = null;

    }
    else if(self.className == "b-resize")
    {
        gUIState.bResizeClick = false;
        gUIState.CurrentClickAnyObj.style.zIndex  = 1;
        gUIState.CurrentClickAnyObj = null;
    }

}

function MouseMove(event)
{    
    if(gUIState.bPointerClick)
    {
        let WidgetWidth = DeleteString( getComputedStyle(gUIState.CurrentClickAnyObj).width,"px") * 0.5;
        // let WidgetHeight = DeleteString( getComputedStyle(gUIState.CurrentClickAnyObj).height,"px");
        
        let MakeX = event.screenX - WidgetWidth;
        let MakeY = event.screenY - 120;

        gUIState.CurrentClickAnyObj.style.left = MakeX + "px";
        gUIState.CurrentClickAnyObj.style.top = MakeY + "px";


    }
    else if(gUIState.bResizeClick)
    {
        ReSizeWidget(gUIState.CurrentClickAnyObj, event.pageX, event.pageY);
    }
    
}

function MouseClick(event, self, param)
{

    if(self.className == "content-post")
    {
        TempPostContent = self;
    }

    // param == Widget
    if(self.className == "b-exit" && param)
    {
        let Index = DeleteString(param.id, gUINaming.WidgetId);
        VisibleWidget(Index, false);
    }


    if(self.className == "b-nav-button")
    {
        let Index = DeleteString( self.id, gUINaming.NavButtonId);
        let MakeID = gUINaming.WidgetId + Index;
        let TargetObj = gWidgetMap.get(MakeID);
        let CurrentVisible = TargetObj.Visible;

        let bHasInnerTargetWidget = false;
        if( TargetObj.MenuInnerToWidgetID ) bHasInnerTargetWidget = true;

        if(!bHasInnerTargetWidget)
        {
            if(!CurrentVisible)
            {
                VisibleWidget(Index, true);
                ShakeWidget(MakeID);

                MenuSelect(Index);
            }
            else
            {
                ShakeWidget(MakeID);
                SetZIndexWidget(MakeID);

                MenuSelect(Index);
            }
        }
        else
        {
            let LinkedWidgetObj = gWidgetMap.get(TargetObj.MenuInnerToWidgetID);
            let LinkedIndex = LinkedWidgetObj.Index;
            let LinkedID = LinkedWidgetObj.IDName;
            let LinkedVisible = LinkedWidgetObj.Visible;

            if(!LinkedVisible)
            {
                VisibleWidget(LinkedIndex, true);
                // ShakeWidget(LinkedID);

                MenuSelect(Index);
            }
            else
            {
                // ShakeWidget(LinkedID);
                SetZIndexWidget(LinkedID);

                MenuSelect(Index);
            }
        }
    }

    let localString = DeleteString(self.className," effect-menu-element-select")
    if(localString == "widget-menu-element" )
    {
        let Index = DeleteString(param.id, gUINaming.WidgetId);
        MenuSelect(Index);

    }



}



function DragStart(event, self, param) 
{
    let MakeIndex = DeleteString(param.id, gUINaming.WidgetId);

    gUIState.DragStartWidget = param;
    gUIState.DragStartMenuElement = self;
    gUIState.DragStartContentWrap = document.getElementById(gUINaming.ContentWrapId + MakeIndex);
}

function DragOver(event, self, param) 
{
    // DragOver에서 preventDefault 안하면 Drag를 활성화 할 수 있는 상태가 안 됨 (이유는? 당연모르지)
    // 거의 무조건 필수인듯 DragEnter에서 preventDefault 해도 안 됨
    event.preventDefault();
}

function DragEnter(event, self, param) 
{
}

function Dragleave(event, self, param) 
{
}

function DragDrop(event, self, param) 
{
    event.preventDefault();

    let MakeIndex = DeleteString(param.id, gUINaming.WidgetId);

    if(gUIState.DragStartWidget != param)
    {
        // self menuwrap
        document.getElementById(self.id).appendChild(gUIState.DragStartMenuElement);
        // box middle
        document.getElementById( gUINaming.BoxMiddleId + MakeIndex).appendChild(gUIState.DragStartContentWrap);

        let PrvWidget = gWidgetMap.get(gUIState.DragStartWidget.id);
        let Elements = document.getElementById(self.id).childNodes;
        let Count = Elements.length;
        let WidthSize = 100 / Count;
        for( it of Elements)
        {
            it.style.width = (WidthSize - 2.0) + "%";
        }

        PrvWidget.MenuInnerToWidgetID = param.id;
        PrvWidget.MenuCount--;
        PrvWidget.MenuSelect = "";
        VisibleWidget( DeleteString(gUIState.DragStartWidget.id, gUINaming.WidgetId), false);

        MenuSelect(PrvWidget.Index);
    }
    // 동일함
    else
    {

    }

} 

function KeyDown(event, self, param)
{

    let NavObjs = document.getElementsByClassName("b-nav-button");
    let InputCode = event.keyCode;

    switch(InputCode)
    {
        case 49:
            MouseClick(null, NavObjs[0]);
            break;

        case 50:
            MouseClick(null, NavObjs[1]);
            break;

        case 51:
            MouseClick(null, NavObjs[2]);
            break;

        case 52:
            MouseClick(null, NavObjs[3]);
            break;

    }
}


function ReSizeWidget(innerObj, innerX, innerY)
{
    let ObjSizeX = Number( DeleteString( getComputedStyle(gUIState.CurrentClickAnyObj).width , "px") ) ;
    let ObjSizeY = Number( DeleteString( getComputedStyle(gUIState.CurrentClickAnyObj).height , "px") ) ;

    let ObjPositionX = Number( DeleteString( getComputedStyle(gUIState.CurrentClickAnyObj).left, "px") );
    let ObjPositionY = Number( DeleteString( getComputedStyle(gUIState.CurrentClickAnyObj).top, "px") );


    let LastPositionX = ObjPositionX + ObjSizeX;
    let LastPositionY = ObjPositionY + ObjSizeY;

    let ReSizeValue;
    if(innerObj)
    {
        ReSizeValue = innerX - LastPositionX;
        innerObj.style.width = (ObjSizeX + ReSizeValue) + "px";

        ReSizeValue = innerY - LastPositionY;
        innerObj.style.height = (ObjSizeY + ReSizeValue) + "px";

    }
}


function ShakeWidget(newID)
{
    let Obj = document.getElementById(newID);
    if(Obj)
    {
        var DeltaTime = 0;
        var TimerManager = setInterval(AcceptTimer, 5);

        var ObjX = Number(DeleteString( Obj.style.left,"px"));
        var ObjY = Number(DeleteString( Obj.style.top,"px"));

        var RandMin = -2.0;
        var RnadMax =  2.0;
        var RandValueX;
        var RandValueY;


        function AcceptTimer()
        {
            if(DeltaTime == 10)
            {
                clearInterval(TimerManager);
                Obj.style.left = String(ObjX) + "px";
                Obj.style.top = String(ObjY) + "px";
            }
            else
            {
                RandValueX = GetRandomInt(RandMin,RnadMax);
                RandValueY = GetRandomInt(RandMin,RnadMax);

                Obj.style.left = (ObjX + RandValueX) + "px" ;
                Obj.style.top = (ObjY + RandValueY) +"px";

                DeltaTime++;
            }


        }

    }
}

function SetZIndexWidget(newId)
{
    for (var [key, value] of gWidgetMap)
    {
        if(key == newId)
        {
            document.getElementById(key).style.zIndex = "100";
        }
        else
        {
            document.getElementById(key).style.zIndex = "1";
        }
    }
}

function MenuSelect(selectMenuIndex)
{
    let MenuElementID = gUINaming.MenuElementId + selectMenuIndex;
    let WidgetMap = gWidgetMap.get( gUINaming.WidgetId + selectMenuIndex);

    let PrvSelectElement;
    // 메뉴가 없거나, 어딘가에 들어가 있다고 확실시 될 때
    if(WidgetMap.MenuCount == 0 && WidgetMap.MenuInnerToWidgetID)
    {
        let TargetWidget = gWidgetMap.get(WidgetMap.MenuInnerToWidgetID);
        
        PrvSelectElement = TargetWidget.SelectMenu;
        $("#" + PrvSelectElement).removeClass( "effect-menu-element-select" );
        document.getElementById(gUINaming.ContentWrapId + DeleteString(PrvSelectElement, gUINaming.MenuElementId)).style.display = "none";

        TargetWidget.SelectMenu = MenuElementID;
        $("#" + TargetWidget.SelectMenu).addClass( "effect-menu-element-select" );
        document.getElementById(gUINaming.ContentWrapId + selectMenuIndex).style.display = "block";
    }
    else
    {
        // select가 없다면 
        if( ! WidgetMap.SelectMenu)
        {
            WidgetMap.SelectMenu = MenuElementID;
            $("#" + WidgetMap.SelectMenu).addClass( "effect-menu-element-select" );
            document.getElementById(gUINaming.ContentWrapId + selectMenuIndex).style.display = "block";
        }
        else
        {
            PrvSelectElement = WidgetMap.SelectMenu;
            $("#" + PrvSelectElement).removeClass("effect-menu-element-select" );
            document.getElementById(gUINaming.ContentWrapId + DeleteString(PrvSelectElement, gUINaming.MenuElementId)).style.display = "none";

            WidgetMap.SelectMenu = MenuElementID;
            $("#" + WidgetMap.SelectMenu).addClass( "effect-menu-element-select" );
            document.getElementById(gUINaming.ContentWrapId + selectMenuIndex).style.display = "block";
        }
    }

}


function GetRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}