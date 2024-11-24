
var gSState =
{
    ClickTree : "",
    ClickSlate : "",
    CopyElements : ""
};

var gSBMValue =
{
    ActiveClassName : "",
    ClickEnable : false,
    FirstX : "",
    FirstY : "",
    WrapName : "",
    WithWrapName : "",
    WrapObj : "",
    WithWrapObj : "",
    Direction : false,
    BMButtonObj: ""
};

var gSNaming =
{
    TreeObjId : "tree-obj-id", 
    SlateObjId : "slate-obj-id"
};

// Array
var gHTMLName =
[
    "name", 
    "innerHTML", "color", "font-size", 
    "display", "overflow",
    "width", "height", "position", 
    "top", "right", "bottom", "left",
    "padding", "margin", "border", 
    "background-color", "background-image", "background-repeat", "background-size"
];

var gSlateMap = new Map();

var gData = function(Index, IDName, Property) 
{
    this.Index = Index;
    this.IDName = IDName;
    this.ParentSlate = "";

    this.Property = Property;
    return this;
}

var gJSonData = new Array();




$(document).on("contextmenu", function()
{
    // 이벤트 속성을 정의하거나, false를 리턴 시키면 된다
    // event.preventDefault();
    // JAVSCRIPT 문법
    /*
    window.oncontextmenu = function()
    {
        return false;
    }
    */
    return false;
} );





$(document).ready(function(event)
{
    // Begin_Set();
    // BindEvent_BMButton();
    // BindEvent_MouseMove();
    // TestFunction();


    VBeginFunction();
    MouseUtilBoxVisible(false);
	
})




function Begin_Set()
{
    let WidhtObj =  ["left-wrap", "right-wrap", "post-box", "console-box" ];
    let WidhtObjValue = ["82%", "18%", "50%", "50%"];

    let HeightObj = [    "top-wrap", "work-box",
                        "tree-box", "detail-box" ];

    let HeightValue = [  "17%", "83%",
                        "50%", "50%" ];
    
    for(var i = 0; i < WidhtObj.length; ++i )
    {
        document.getElementsByClassName(WidhtObj[i])[0].style.width = WidhtObjValue[i];
    }

    for(var i = 0; i < HeightObj.length; ++i )
    {
        document.getElementsByClassName(HeightObj[i])[0].style.height = HeightValue[i];
    }

}

function BindEvent_BMButton()
{
    let ClassName = "bm-button";
    let ClassLenght = document.getElementsByClassName(ClassName).length;
    if( ClassLenght > 0 )
    {
        $(document).on("click", "." + ClassName, function(event)
        {
            let ClassName = DeleteString(event.target.className, " bm-button");     // space 공백 포함해서 없애기
            BMButtonClick(ClassName , event);
        });

    }
}

function BMButtonClick(newClassName, event )
{
    // 대상이 없으며, 클릭 비활성화 
    if( IsEmpty( gSBMValue.ActiveClassName) && !gSBMValue.ClickEnable)
    {
        gSBMValue.ActiveClassName = newClassName;
        gSBMValue.ClickEnable = true;
        gSBMValue.FirstX = event.pageX;
        gSBMValue.FirstY = event.pageY;

        AddClass(gSBMValue.ActiveClassName, "bm-button-click");
        StrcutInnerData(newClassName);
    }
    // ! null 
    else if( IsEmpty(gSBMValue.ActiveClassName) && gSBMValue.ClickEnable)
    {
        ReMoveClass(gSBMValue.ActiveClassName,"bm-button-click");

        gSBMValue.ActiveClassName = "";
        gSBMValue.ClickEnable = false;
    }
    
}

function StrcutInnerData(innerClassName)
{
    if( innerClassName == "bm-button-0")
    {
        // 버튼이 포함된 그룹
        gSBMValue.WrapName = "left-wrap";
        // 연관되어 수정될 그룹
        gSBMValue.WithWrapName = "right-wrap";
        // TRUE - top,bottom FALSE - left, right
        gSBMValue.Direction = false;
    }
    else if( innerClassName == "bm-button-1")
    {
        gSBMValue.WrapName = "top-wrap";
        gSBMValue.WithWrapName = "work-box";
        gSBMValue.Direction = true;        
    }
    else if(innerClassName == "bm-button-2")
    {
        gSBMValue.WrapName = "tree-box";
        gSBMValue.WithWrapName = "detail-box";
        gSBMValue.Direction = true;
    }
    else if(innerClassName == "bm-button-3")
    {
        gSBMValue.WrapName = "post-box"; 
        gSBMValue.WithWrapName = "console-box"; 
        gSBMValue.Direction = false;
    }

    gSBMValue.WrapObj = document.getElementsByClassName(gSBMValue.WrapName)[0];
    gSBMValue.WithWrapObj = document.getElementsByClassName(gSBMValue.WithWrapName)[0];
    gSBMValue.BMButtonObj = document.getElementsByClassName(innerClassName)[0];

}

function BindEvent_MouseMove()
{

   $("." + "main-wrap").mousemove( function(event) 
   {
       if(GetIsMBButton())
       {
           ChangeWrapBox(event, gSBMValue);
       }
   });

}

function ChangeWrapBox(event, newStructValue)
{
    if(newStructValue.WrapObj && newStructValue.WithWrapObj)
    {
        // 숫자로 변환
        // Number()
        let MinPageValue = 10.0;

        // clientHeight , offsetHeight [height 값을 가져오는 법]
        // winodw.innerWidth | innerHeight (현재 클라이언트가 아닌)
        let PageX = document.documentElement.clientWidth;
        let PageY = document.documentElement.clientHeight;

        let MouseX = event.pageX;
        let MouseY = event.pageY;

        let XValue = (MouseX / PageX) * 100;
        XValue = XValue + 0.5;


        let XWrapValue = 100 - XValue;

        let YValue = (MouseY / PageY) * 100;
        YValue = YValue + 3.0;
        let YWrapValue = 100 - YValue;

        if(newStructValue.Direction)
        {
            if(YValue > MinPageValue && YWrapValue > MinPageValue)
            {
                newStructValue.WrapObj.style.height = YValue +"%";
                newStructValue.WithWrapObj.style.height = YWrapValue +"%";
            }
        }
        // left right
        else
        {
            var RightWrapWidht;
            if(newStructValue.ActiveClassName == "bm-button-3")
            {
                // RightWrap의 width 할당된 만큼 스케일링 해서 조절함
                RightWrapWidht = document.getElementsByClassName("right-wrap")[0].style.width;
                RightWrapWidht = 100 - Number( DeleteString(RightWrapWidht, "%"));
                RightWrapWidht = RightWrapWidht / 100;

                XValue = (MouseX /  ( PageX * RightWrapWidht) ) * 100;
                XValue = XValue + (3 * RightWrapWidht);

                XWrapValue = 100 - XValue;

                if(XValue > MinPageValue && XWrapValue > MinPageValue )
                {
                    newStructValue.WrapObj.style.width = XValue +"%";
                    newStructValue.WithWrapObj.style.width = XWrapValue +"%";
                }

            }
            else if(XValue > MinPageValue && XWrapValue > MinPageValue)
            {
                newStructValue.WrapObj.style.width = XValue +"%";
                newStructValue.WithWrapObj.style.width = XWrapValue +"%";
            }
        }
    }

}


function TestFunction()
{

    // 기본적인 javscript상 드래그를 하겠다라는 속성을 정의해야함 그것이 아래와 같은거인데 (한 개 더 있음 핸들 함수같은 것 )
    //     PostObj.setAttribute("draggalbe",true);


        // 일반적으로 Javscript obj 객체랑 Jquery 객체랑은 다른거라 생각하면 편할 듯
    $(".post").draggable(
        {
            opacity: 0.5
        }
    );
    
    $(document).on("dragstart",".post",function(event)
    {
    });

    $(document).on("drag",".post",function(event)
    {
        PostDropDown(event);
    });
     

    $(document).on("dragstop",".post",function(event)
    {
    });

}




var gVClick = false;
var gVPostTarget;
var gVRetrunSlateObjID;
var gVRetrunSlateObj;
var gVFirstClickX;
var gVFirstClickY;

function VBeginFunction()
{
    $(document).on("click", ".content-post", function(event)
    {
        // $(event.target).addClass("slate-select");
        gVPostTarget = event.target;
    });

    let WorkBox = document.getElementsByClassName("size-wrap")[0];
    WorkBox.addEventListener("mousedown", function(event){ VDragDown(event) } );
    WorkBox.addEventListener("mouseup", function(event){ VDragUp(event) } );
    WorkBox.addEventListener("mousemove", function(event){ VDragMove(event) } );
}

function VDragDown(event)
{
    if(gVPostTarget && event.type == "mousedown" && event.which == "1")
    {
        gVClick = true;

        gVRetrunSlateObjID= AppendSlateAndTree("p-div", "default");
        gVRetrunSlateObj = document.getElementById(gVRetrunSlateObjID);

        gVFirstClickX = event.pageX;
        gVFirstClickY = event.pageY;

        if( ! gSState.ClickSlate) 
        {
            // relative
            // absolute
            CssSetProperty(gVRetrunSlateObjID,"position","absolute");
        }
        else
        {
            CssSetProperty(gVRetrunSlateObjID,"display","block");
        }
        CssSetProperty(gVRetrunSlateObjID, "left", (gVFirstClickX + "px" ));
        CssSetProperty(gVRetrunSlateObjID, "top", (gVFirstClickY + "px" ));

        CssSetProperty(gVRetrunSlateObjID, "width", (0 + "px" ));
        CssSetProperty(gVRetrunSlateObjID, "height", (0 + "px" ));

        CssSetProperty(gVRetrunSlateObjID, "background-color", "gray");

        //console.log( document.getElementsByClassName("top-wrap")[0].style.height);

    }
}

function VDragUp(event)
{
    if(event.type == "mouseup" && event.which == "1")
    {
        gVClick = false;
    }

}

function VDragMove(event)
{
    if(gVClick && gVPostTarget && gVRetrunSlateObj)
    {
        let CurrentMouseX = event.pageX;
        let CurrentMouseY = event.pageY;

        let CurrentWidth = DeleteString( CssGetPropertyValue(gVRetrunSlateObjID, "width"), "px" );
        let CurrentHeight = DeleteString( CssGetPropertyValue(gVRetrunSlateObjID, "height"), "px" );

        let PlusX = (CurrentMouseX - gVFirstClickX);
        let PlusY = (CurrentMouseY - gVFirstClickY);


        CssSetProperty(gVRetrunSlateObjID, "width", (PlusX + "px" ));
        CssSetProperty(gVRetrunSlateObjID, "height", (PlusY + "px" ));
        // console.log("plus : " + PlusX + " / " + PlusY);
    }
}

function PostDropDown(event)
{
    let PostObj = event.target;
    let TargetClassName = event.target.className;
    let PostSize = PostObj.clientHeight;
    let CurrentBox = document.getElementsByClassName("top-wrap")[0];

    let PostObj_X = ObjTop = DeleteString(PostObj.style.left, "px");
    let PostObj_Y = ObjTop = DeleteString(PostObj.style.top, "px");

    let CurrentBox_X = CurrentBox.offsetWidth;
    let CurrentBox_Y = CurrentBox.clientHeight;
    
    // work-box
    if(PostObj_Y > CurrentBox_Y - PostSize )
    {   
        AppendSlateAndTree(TargetClassName, "default");
        event.target.remove();
    }
}

function AppendSlateAndTree(targetClassName, newSettingParam)
{

    let ReturnSlateId; 

    let MakeClass;
    let MakeId;
    let MakeIndex;

    let TargetClassName = targetClassName;
    TargetClassName = DeleteString(TargetClassName, " ui-draggable");
    TargetClassName = DeleteString(TargetClassName, " post");
    TargetClassName = DeleteString(TargetClassName, "p-");

    let P_WithClassName = targetClassName;
    P_WithClassName = DeleteString(P_WithClassName, " ui-draggable");
    P_WithClassName = DeleteString(P_WithClassName, " post");
    
    MakeClass = P_WithClassName;
    MakeIndex = GetConstructIndex(newSettingParam);
    MakeId = gSNaming.SlateObjId + MakeIndex   // ObjCount(gSNaming.SlateObjId);
    ReturnSlateId = MakeId;

    CreateObj(gSNaming.SlateObjId, MakeId, MakeIndex);
    CssAddElement(MakeId, MakeIndex ); // ObjCount(gSNaming.SlateObjId));

    let ChildBlank = "";
    let ApeendTarget = ".size-wrap";
    if( gSState.ClickSlate)
    {
        ApeendTarget = "#"+gSState.ClickSlate;
        ChildBlank = "&nbsp&nbsp";

        $(ApeendTarget).append("<" +TargetClassName + " class=" +MakeClass+ " id=" + MakeId + ">" + "</" + TargetClassName + ">" );
        AddClass(MakeClass, "content-post");

        // PARENT SLATE SET

        gSlateMap.get(MakeId).ParentSlate = gSState.ClickSlate;
        ChildBlank = MakeChildBlank ( GetParentCount(MakeId, MakeIndex ) ); // ObjCount(gSNaming.SlateObjId)) );

        MakeId = gSNaming.TreeObjId + MakeIndex; //ObjCount(gSNaming.TreeObjId);
        CreateObj(gSNaming.TreeObjId, MakeId, MakeIndex);

        let MakeTreeID = MakeCastObjId(gSNaming.TreeObjId, GetIdNumber( gSState.ClickSlate ));
        $("#" + MakeTreeID).append("<div class=content-tree"+" id=" + MakeId +">" +ChildBlank+ TargetClassName + "</div>");

    }
    else
    {
        $(ApeendTarget).append("<" +TargetClassName + " class=" +MakeClass+ " id=" + MakeId + ">" + "</" + TargetClassName + ">" );
        AddClass(MakeClass, "content-post");
    
        MakeId = gSNaming.TreeObjId + MakeIndex; // ObjCount(gSNaming.TreeObjId);
        CreateObj(gSNaming.TreeObjId, MakeId, MakeIndex);
        $(".tree-box").append("<div class=content-tree"+" id=" + MakeId +">" +ChildBlank+ TargetClassName + "</div>");
    }
    

    return ReturnSlateId;
}

function CreateObj(insertObjType, objName, objIndex)
{
    // Slate
    if(insertObjType == gSNaming.SlateObjId)
    {
        let Key = objName;
        //  ObjCount(insertObjType)
        let Value = new gData( objIndex, objName, Copy( gHTMLName) );

        gSlateMap.set(Key, Value);

    }

    // Tree
    if(insertObjType == gSNaming.TreeObjId)
    {
        ObjAction(insertObjType, objName);
    }
}

function GetParentCount(currentSlateID, itCOunt)
{
    let Data = gSlateMap.get(currentSlateID);
    let CurrentCount = 0;
    if(Data.ParentSlate)
    {
        for( var i = 0; i < itCOunt; ++i)
        {
            if(Data.ParentSlate)
            {
                Data = gSlateMap.get(Data.ParentSlate);
                CurrentCount++;
            }
            // null
            else if(Data.ParentSlate == "")
            {
                break;
            }
        }
    }
    return CurrentCount;
}



function CssAddElement(insertID, insertIndex)
{
    document.styleSheets[0].insertRule("#" + insertID + "{ background-Color: white }", insertIndex);
}

function CssSetProperty(insertID, insertProperty, insertValue)
{
    let Index = gSlateMap.get(insertID).Index;    // Number( GetIdNumber(insertID) );
    let IndexObj = document.styleSheets[0].cssRules[Index];
    if( IndexObj )
    {
        IndexObj.style.setProperty(insertProperty, insertValue);
        JSonSetData(insertID, insertProperty, insertValue);
    }

}


function CssGetPropertyValue(insertID, insertProperty)
{
    let Index = gSlateMap.get(insertID).Index;   // Number( GetIdNumber(insertID) );
    let IndexObj = document.styleSheets[0].cssRules[Index];
    let returnValue;
    if( IndexObj )
    {
        returnValue = IndexObj.style.getPropertyValue(insertProperty);

    }

    return returnValue;
}

function CssDeleteRule(insertID, isnertIndex)
{
    var SelectorText = ""
    let Rules = document.styleSheets[0].cssRules;

    for( var i = 0; i < Rules.length; ++i)
    {
        SelectorText = DeleteString( Rules[i].selectorText, "#");
        if(SelectorText == insertID)
        {
            document.styleSheets[0].deleteRule(i);
        }
    }
}

function JSonSetData(insertID, insertProperty, insertValue)
{
    let Key = insertID;
    gSlateMap.get(Key).IDName = insertID;
    gSlateMap.get(Key).Index = Number( DeleteString(insertID, gSNaming.SlateObjId) );

    let FindIndex = gHTMLName.indexOf(insertProperty)
    if(FindIndex != -1)
    {
        gSlateMap.get(Key).Property[FindIndex] = insertValue;
    }
}

function JSONGetData(insertID, insertProperty)
{
    let Key = insertID;
    let FindIndex = gHTMLName.indexOf(insertProperty)
    let ReturnData ="";
    
    if(FindIndex != -1)
    {
        ReturnData = gSlateMap.get(Key).Property[FindIndex];
    }

    return ReturnData;
}

function MakeJSon(target)
{
    gJSonData.length = 0;
    for (var it of gSlateMap)
    {
        // MAP 형식은 { [Key], [Value] } 를 가지고 있음 한 Object당 2개 인덱스
        // 그래서 [1] 인덱스로 값에 접근해서 값만 넘겨준다
        // 이유는 JSON 저장시 { [Key], [Value] } 처럼 저장 되기에
        // JSon에서 [INDEX 2] 개 잡아먹음 그래서 저장시 값만 넘겨줌
        gJSonData.push ( JSON.stringify(it[1]) );
    }

    target.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(gJSonData);
}

function OpenJSonFile() 
{
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = function (event) {

        ProcessFile(event.target.files[0]);

    };
    input.click();
}


function ProcessFile(file) 
{
    let reader = new FileReader();
    reader.onload = function () {

        LoadJSon ( reader.result )
    };

    reader.readAsText(file, /* optional */ "euc-kr");

}

function LoadJSon(insertString)
{

    // String을 Object로 변환
    // 양 옆에 [, ] 를 붙여줌 이유는 
    // {slate-id-0} , {slate-id-1} 이지만
    // [ {slate-id-0} , {slate-id-1} ] 로 묶어서 배열로 만들어줌
    let evelObj = eval('[' + insertString + ']');
    for (var it of evelObj)
    {
        gJSonData.push(it);
    }


    for(var itJSon of gJSonData)
    {
        AllTypeSet(itJSon);
        // JSonSetData(CurrentObj.IDName, "background-color", "black");
        // CssSetProperty(CurrentObj.IDName, "background-color", JSONGetData(CurrentObj.IDName, "background-color") );

    }

    // Map -> JSON 시 { [key], [value] } 로 되어있어서 (이전버전)에서는 1인덱스로 접근했었다
    // [0 Key] + [ 1 Data ] 여서 index 1로 접근
    // CurrentObj = TextJSon[1];


}

function AllTypeSet(itJSon)
{
    let HtmlTagLength = gHTMLName.length;

    // CurrentSlate
    
    if ( itJSon.ParentSlate  )
    {
        // 부모의 Slate를 SelectSlate로 설정함
        gSState.ClickSlate = itJSon.ParentSlate;

        // MakeCastObjId(gSNaming.TreeObjId, GetIdNumber( itJSon.IDName ));
    }
    else
    {
        gSState.ClickSlate = "";
    }
    
    AppendSlateAndTree("p-div", "Load");


    for( var i = 0; i <HtmlTagLength; ++i)
    {
        CssSetProperty(itJSon.IDName, gHTMLName[i], itJSon.Property[i]);
    }
}


function MakeChildBlank(newCount)
{
    newCount++;
    let MakeString = "";
    let SpaceString = "";
    if(newCount > 0)
    {
        for (var i = 0; i < newCount; ++i)
        {
            SpaceString += "&nbsp&nbsp";
        }

        MakeString = SpaceString + "";
    }

    return MakeString;
}


function ObjCount(insertObjType)
{
    let Count = 0;

    // Slate
    if(insertObjType == gSNaming.SlateObjId)
    {
        Count = gSlateMap.size;
    }

    return Count;
}

function GetConstructIndex(newSettingParam)
{
    // newSettingParam
    // default, Load

    let SlateSize = gSlateMap.size;
    let ReturnValue = SlateSize;
    let CurrentCount = 0;
    let LastIndex = 0;
    if(newSettingParam == "default")
    {
        if(SlateSize === 0) {}
        else 
        {
            for (var [key, value] of gSlateMap)
            {
                if(CurrentCount == SlateSize - 1)
                {
                    LastIndex = DeleteString(key,gSNaming.SlateObjId);
                    LastIndex++;

                    ReturnValue = LastIndex;
                }
                CurrentCount++;
            }
        }
    }
    else if(newSettingParam == "Load")
    {
        ReturnValue = gJSonData[SlateSize].Index; 
    }


    return ReturnValue;
}

function ObjAction(insertObjType, insertID)
{
    // Tree
    if(insertObjType == gSNaming.TreeObjId)
    {
        // click
        // or mousedown
        $(document).on("mousedown", "#" + insertID, function(event)
        {
            ClickTree(event);
        });
    }
}


function GetIdNumber(innerId)
{
    let insertString = innerId;
    let FoundIndex = insertString.indexOf("-id");
    let MakeString;
    if( FoundIndex != -1)
    {
        MakeString = insertString.substr(FoundIndex + 3, insertString.length);
    }

    return MakeString;
}

function MakeCastObjId(makeCastObj, innerIdNum)
{
    let localString;
    // Tree
    if(makeCastObj == gSNaming.TreeObjId)
    {
        localString = gSNaming.TreeObjId + innerIdNum;
    }

    // Slate
    if(makeCastObj == gSNaming.SlateObjId)
    {
        localString = gSNaming.SlateObjId + innerIdNum;
    }

    return localString;
}

function ClickTree(event)
{
    let TreeObj;
    // Left Click
    if(event.button == 0)
    {
        if( IsEmpty(gSState.ClickTree) )
        {
            TreeObj = document.getElementById(gSState.ClickTree);
            if(TreeObj)
            {
                ReMoveClass_ID(gSState.ClickTree, "effect-click-tree");
                // ReMoveClass_ID(gSState.ClickTree, "tree-element-select");
                SlateSelect(gSState.ClickSlate, false);
                MouseUtilBoxVisible(false);

            }
        }
        

        gSState.ClickTree = event.target.id;
        TreeObj = document.getElementById(gSState.ClickTree);
        if(TreeObj)
        {
            AddClass_ID( gSState.ClickTree, "effect-click-tree");
            // AddClass_ID( gSState.ClickTree, "tree-element-select");


            let SelectSlateObjName = MakeCastObjId(gSNaming.SlateObjId, GetIdNumber( gSState.ClickTree));
            gSState.ClickSlate = SelectSlateObjName;
            SlateSelect( SelectSlateObjName, true); 

            let WithSlateObj = document.getElementById(gSState.ClickSlate);
            DetailSetUp(WithSlateObj);
        }
    }

    // right
    if(event.button == 2)
    {
        ClickMouseDown(event.button, event);
    }

}

function SlateSelect(innerObjId , bSelect)
{
    let SlateObj = document.getElementById(innerObjId);
    if(SlateObj)
    {
        if(bSelect) 
        {
            AddClass_ID(innerObjId, "effect-slate-select");
        }
        else
        {
            ReMoveClass_ID(innerObjId, " effect-slate-select");
        }
    }
}

function ClickMouseDown(buttonType, event)
{
    if(buttonType == 2)
    {
        if(gSState.ClickTree == event.target.id)
        {
            MouseUtilBoxVisible(true);
            MouseUtilBoxPosition(event.pageX, event.pageY)

        }

    }
}

function MenuClick(self, param)
{
    let CurrnetId = gSlateMap.get(gSState.ClickSlate).IDName;
    let CurrentIndex = gSlateMap.get(gSState.ClickSlate).Index;
    let CurrentObj = (document).getElementById(CurrnetId);
    let CurrentObj_Tree = (document).getElementById( gSNaming.TreeObjId + CurrentIndex);

    // Delete
    if(param == 0)
    {
        if(CurrentObj && CurrentObj_Tree)
        {
            // 자식 확인
            let Childs = GetChildNodeArray(CurrnetId);
            let bObj = false;
            if(GetIsObj(Childs)) bObj = true;
            else bObj = false;

            // String (단일)
            if(!bObj)
            {
                CurrentObj = (document).getElementById(CurrnetId);
                CurrentObj_Tree = (document).getElementById( gSNaming.TreeObjId + CurrentIndex);

                CurrentObj.remove();
                CurrentObj_Tree.remove();

                CssDeleteRule(gSlateMap.get(CurrnetId).IDName, gSlateMap.get(CurrnetId).Index);
                gSlateMap.delete(CurrnetId);
            }
            // OBJ
            else
            {
                let OneChild = true;
                for(childsIt of Childs)
                {
                    // OBJ
                    if ( GetIsObj(childsIt) )
                    {
                        OneChild = false;
                        break;
                    }
                }

                if(OneChild)
                {
                    for(var i = Childs.length - 1; i >= 0; --i )
                    {
                        CurrentObj = (document).getElementById(Childs[i]);
                        CurrentObj_Tree = (document).getElementById( gSNaming.TreeObjId + GetIdNumber(Childs[i]));
        
                        CssDeleteRule(gSlateMap.get(Childs[i]).IDName, gSlateMap.get(Childs[i]).Index);

                        CurrentObj.remove();
                        CurrentObj_Tree.remove();
        
                        gSlateMap.delete(Childs[i]);
        
                    }
                }
                else
                {
                    let DepthArray = GetDepthArray(Childs);
                    let CurrentTarget;

                    for(var i = DepthArray.length - 1; i >= 0; --i )
                    {
                        // Array
                        if(GetIsObj(DepthArray[i]))
                        {
                            for(var j = DepthArray[i].length -1; j >=0; --j)
                            {
                                CurrentTarget = DepthArray[i][j];
                            }
                        }
                        // String
                        else
                        {
                            CurrentTarget = DepthArray[i];
                        }


                        CurrentObj = (document).getElementById(CurrentTarget);
                        CurrentObj_Tree = (document).getElementById( gSNaming.TreeObjId + GetIdNumber(CurrentTarget));
        
                        CssDeleteRule(gSlateMap.get(CurrentTarget).IDName, gSlateMap.get(CurrentTarget).Index);

                        CurrentObj.remove();
                        CurrentObj_Tree.remove();
        
                        gSlateMap.delete(CurrentTarget);
                    }
                    
                }
            }

            gSState.ClickSlate = "";
            gSState.ClickTree = "";

            

        }
    }

    // COPY
    if(param == 1)
    {
        gSState.CopyElements = GetChildNodeArray(CurrnetId);
        /**
         * 0번 인덱스 본인
         * 1번 인덱스 부터 하위
         * 1번 인덱스 부터 하위지만 그 상태가 Array라면 또 child가 있음
         */
        console.log("[ CURRENT SELECT ] " +  gSState.ClickSlate  + "\n[ COPY ELEMENTS ]");
        console.log( gSState.CopyElements);
        console.log("\n");
    }

    // PASTE
    if(param == 2)
    {
        ReMoveClass_ID(gSState.ClickTree, "effect-click-tree");
        SlateSelect(gSState.ClickSlate, false);

        PasteElements(gSState.CopyElements);
    }

    MouseUtilBoxVisible(false);

}

function GetChildNodeArray(insertID)
{
    let Element = new Array();
    // getElementById
    let Obj = document.getElementById(insertID);
    if(Obj)
    {
        let Childes = Obj.childNodes;

        if(Childes.length > 0 )
        {
            Element.push(insertID);
            for(ChildIt of Childes)
            {
                Element.push( GetChildNodeArray(ChildIt.id) );
            }
        }
        // 가장 마지막까지 반복
        else if(Childes.length == 0)
        {
            return insertID;
        }

    }

    return Element;

}

function GetDepthArray(insertArray)
{

    let DepthArray = new Array();
    let ValueArray = new Array();

    let HasDepthIndex = new Array();
    let ResultArray = new Array();

    for(var ArrayCount = 0; ArrayCount <insertArray.length; ++ArrayCount)
    {
        ValueArray.push(insertArray[ArrayCount]);
        DepthArray.push( ValueArray[ArrayCount]);

        if( GetIsObj(insertArray[ArrayCount]))
        {
            HasDepthIndex.push(ArrayCount);
        }
    }

    for(var ArrayCount = 0; ArrayCount <HasDepthIndex.length; ++ArrayCount)
    {
        var TargetIndex = HasDepthIndex[ArrayCount];

        if(DepthArray[TargetIndex])
        {
            ResultArray = RecursiveDepthArray(DepthArray[TargetIndex]);
            DepthArray[TargetIndex].length = 0;
            for(itArray of ResultArray)
            {
                DepthArray[TargetIndex].push(itArray);
            }

        }
    }

    return DepthArray;
}

function RecursiveDepthArray(targetArray)
{
    let localArray = new Array();
    for(var ArrayCount = 0; ArrayCount <targetArray.length; ++ArrayCount)
    {
        if( GetIsObj(targetArray[ArrayCount]))
        {
            let retrunArray = RecursiveDepthArray(targetArray[ArrayCount]);
            for(it of retrunArray)
            {
                localArray.push(it);
            }
        }
        else
        {
            localArray.push(targetArray[ArrayCount]);
        }
    }

    return localArray;
}





function PasteElements(innerElements, innerFixed)
{
    if(innerElements && gSState.ClickSlate)
    {
        let CurrentElement;
        let FixedTargetID = innerFixed;
        if( GetIsObj(innerElements) )
        {
            let bOneChilds = true;
            for(var itCopy = 0; itCopy < innerElements.length; ++itCopy)
            {
                // 만약 또 Array (object)가 있다면 One Childs가 아니다
                if( GetIsObj( innerElements[itCopy]) )
                {
                    bOneChilds = false
                    break;
                }
            }

            // OneChild라면
            if(bOneChilds)
            {
                for(var itCopy = 0; itCopy < innerElements.length; ++itCopy)
                {
                    CurrentElement = innerElements[itCopy];

                    // 첫번째는 ClickSlate에 생성, 이후에는 자식이기에 0번째 인덱스의 하위로 생성
                    if(itCopy == 0)
                    {
                        FixedTargetID = MakeInnerCopy(CurrentElement);
                    }
                    else if(FixedTargetID && itCopy != 0)
                    {
                        MakeInnerCopy(CurrentElement, FixedTargetID);
                    }
                }
            }

            // OneChild 아니라면
            if(!bOneChilds)
            {
                for(var itCopy = 0; itCopy < innerElements.length; ++itCopy)
                {
                    CurrentElement = innerElements[itCopy];
                    // String
                    if( !GetIsObj(CurrentElement))
                    {
                         // 첫번째는 ClickSlate에 생성, 이후에는 자식이기에 0번째 인덱스의 하위로 생성

                         // 현재 이 행위가 한번 더 실행되면 문제가 생김
                        if(itCopy == 0)
                        {
                            FixedTargetID = MakeInnerCopy(CurrentElement);
                        }
                        else if(FixedTargetID && itCopy != 0)
                        {
                            MakeInnerCopy(CurrentElement, FixedTargetID);
                        }
                    }
                    // ARRAY
                    else
                    {
                        RecursiveInnerMake(CurrentElement);

                    }
                }

                console.log("SLATE MAP :")
                console.log(gSlateMap);
            }

        }
        // 한개만 복사
        else
        {
            CurrentElement = innerElements;
            MakeInnerCopy(CurrentElement);
        }

    }
}

function MakeInnerCopy(copyTargetId, fixedTarget)
{
    let MakeId;
    if(fixedTarget)
    {
        gSState.ClickSlate = fixedTarget;
        gSState.ClickTree = MakeCastObjId(gSNaming.TreeObjId,GetIdNumber(fixedTarget));
    }

    MakeId = AppendSlateAndTree("p-div","default");
    for(var itCss = 0 ; itCss < gHTMLName.length; ++itCss)
    {
        CssSetProperty(MakeId, gHTMLName[itCss], gSlateMap.get(copyTargetId).Property[itCss]);
    }

    gSlateMap.get(MakeId).ParentSlate = gSState.ClickSlate;

    return MakeId;
}

function RecursiveInnerMake(innerArray)
{
    let ConstrcutIndex = Number( GetConstructIndex("default") ) -1;
    let FirstIndex = innerArray[0];
    let MakeID = MakeInnerCopy(FirstIndex, MakeCastObjId(gSNaming.SlateObjId, ConstrcutIndex));
    
    for (var i = 1; i < innerArray.length; ++i)
    {
        // OBJ
        if(GetIsObj (innerArray[i]) )
        {
            RecursiveInnerMake(innerArray[i]);
        }
        else
        {
            MakeInnerCopy(innerArray[i],MakeID);
        }
    }
    
}

function GetIsObj(innerElement)
{
    let bObj = false;
    if(typeof(innerElement) == "string")
    {
        bObj = false;
    }
    else if(typeof(innerElement) == "object")
    {
        bObj = true;
    }

    return bObj;
}

/*
function PasteElements(innerElements)
{
    if( innerElements && gSState.ClickSlate)
    {
        let CopyCss;
        let FirstIndexObj = "";
        let MakeId;

        FirstIndexObj = gSNaming.SlateObjId + GetConstructIndex("default");

        // Index가 2개 이상 보유되지 않으면 Array(Object)가 아닌 String으로 간주되어 문자열 만큼 Lenght가 접근됨
        // 그래서 만약 String이라면 단 한 개의 index만 존재하는 Array이기에 아무 문자열 넣어줌
        if(typeof(innerElements) == "string") innerElements= "1";
        for(var i = 0; i < innerElements.length; ++i)
        {
            let IsObj = false;
            if ( typeof(innerElements[i]) == "string") 
            {
                IsObj = false;
                CopyCss = gSState.CopyElements;
                
            }
            else if (typeof(innerElements[i]) == "object") 
            {
                IsObj = true;
                CopyCss = gSState.CopyElements[i];
            }


            if(!IsObj)
            {

                MakeId = AppendSlateAndTree("p-div","default");

                if(MakeId == FirstIndexObj)
                {
                    gSState.ClickSlate = FirstIndexObj;
                    gSState.ClickTree = MakeCastObjId(gSNaming.TreeObjId,GetIdNumber(FirstIndexObj));
                }

                for(var itCopy = 0 ; itCopy < gHTMLName.length; ++itCopy)
                {
                    // CssSetProperty(MakeId, gHTMLName[itCopy], gSlateMap.get(CopyCss).Property[itCopy]);
                }

            }
            else
            {
            }
        }
    }
}
*/

function MouseUtilBoxVisible(bFlag)
{
    let UtilBox =  document.getElementsByClassName("html-mouse-util-box")[0];
    if(UtilBox)
    {
        if(bFlag)
        {
            UtilBox.style.display = "block";
            UtilBox.style.position = "absolute";

        }
        else
        {
            UtilBox.style.display = "none";
        }
    }
}

function MouseUtilBoxPosition(newX, newY)
{
    let UtilBox =  document.getElementsByClassName("html-mouse-util-box")[0];
    if(UtilBox)
    {
        UtilBox.style.left = newX +"px";
        UtilBox.style.top = newY + "px";
    }

}

function GetIsMouseUtilVisible()
{
    let bLocalFlag = false;
    let UtilBox =  document.getElementsByClassName("html-mouse-util-box")[0];
    if(UtilBox)
    {
        if(UtilBox.style.display == "none")
        {
            bLocalFlag = false;
        }
        else
        {
            bLocalFlag = true;
        }
    }

    return bLocalFlag;
}



function DetailSetUp(newSlateObj)
{
    DetailBoxVisible(true);

    let DVBoxLength = gHTMLName.length;
    /*
    let ArrayValue = 
    [
        "name",
        getComputedStyle(newSlateObj).innerHTML,
        getComputedStyle(newSlateObj).color,
        getComputedStyle(newSlateObj).fontSize,
        getComputedStyle(newSlateObj).display,
        getComputedStyle(newSlateObj).overflow,
        getComputedStyle(newSlateObj).width,
        getComputedStyle(newSlateObj).height,
        getComputedStyle(newSlateObj).position,
        getComputedStyle(newSlateObj).top,
        getComputedStyle(newSlateObj).right,
        getComputedStyle(newSlateObj).bottom,
        getComputedStyle(newSlateObj).left,
        getComputedStyle(newSlateObj).padding,
        getComputedStyle(newSlateObj).margin,
        getComputedStyle(newSlateObj).border,
        getComputedStyle(newSlateObj).backgroundColor,
        getComputedStyle(newSlateObj).backgroundImage,
        getComputedStyle(newSlateObj).backgroundRepeat,
        getComputedStyle(newSlateObj).backgroundSize

    ];
    */

    for (var i = 0; i< DVBoxLength; ++i)
    {
        document.getElementsByClassName( "dv-" + gHTMLName[i] )[0].value = CssGetPropertyValue( gSState.ClickSlate, gHTMLName[i] );

        // document.getElementsByClassName( "dv-" + gHTMLName[i] )[0].value = ArrayValue[i];
    }

}

function DetailBoxVisible(bFlag)
{
    if(bFlag)
    {
        document.getElementsByClassName("detail-show-box")[0].style.display = "block";
    }
    else
    {
        document.getElementsByClassName("detail-show-box")[0].style.display = "none";
    }
}

function MakeScript()
{
    let BeginStartCallble = [ "AAA();", " BBB('BBB');", "CCC('A','B','C');" ];
    let SectionFunctionDefine = [   "function AAA() { console.log('AAA')}", 
                                    "function BBB(value0) {console.log(value0) }",
                                    "function CCC(value0, value1, value2) { console.log(value0); console.log(value1); console.log(value2); } "
                                ];

    let CallEach = "";
    for(var i = 0; i <BeginStartCallble.length; ++i)
    {
        CallEach = CallEach + "" + BeginStartCallble[i] +" ";
    }


    let DefineEach = "";
    for(var i = 0; i <SectionFunctionDefine.length; ++i)
    {
        DefineEach = DefineEach + "" + SectionFunctionDefine[i] +" ";
    }


    let String = 
    "<script>" +
    " $(document).ready(function(event) {  BeginStart(event); });" +
    " function BeginStart(event) {console.log('start'); " + CallEach + "}" +  
    DefineEach +
    "</script>" 
    ;

    return String;

}

function CopyButtonClick(target, param)
{
    let TextAreaObj = document.getElementsByClassName("clib-textarea")[0];
    let WorkdString = document.getElementsByClassName("size-wrap")[0].innerHTML;
    let MakeString = 
    "<!DOCTYPE html>" +
    "<html lang=en>" + 
    "<head>" +
    "<meta charset='UTF-8'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
    "<meta http-equiv='X-UA-Compatible' content='ie=edge'>" +
    "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' type='text/javascript'>" + "</script>" +
    "<script src='https://code.jquery.com/ui/1.12.1/jquery-ui.js'>" + "</script>" +
    "<link rel='stylesheet' type='text/css' href='css.css'>" +
    "<script src='js.js'>" + "</script>" +
    "<title>SLATE</title>" +
    "<style> *{padding: 0px;  margin: 0px;} " + 
    "body{width:100%; height:100%;  position: absolute; }" + // position:absolute;
    "</style>" +
    "</head>" + "<body>" +
    WorkdString +
    "</body>" +
    MakeScript() + 
    "</html>";

    TextAreaObj.value = MakeString;
    TextAreaObj.select();
    document.execCommand("Copy");

    // down HTML
    if(param == 0)
    {
        target.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(MakeString);
    }

    // down CSS
    if(param == 1)
    {
        MakeString = "";

        for (var [key, value] of gSlateMap)
        {
            MakeString += document.styleSheets[0].cssRules[GetIdNumber(key)].cssText;
        }
        TextAreaObj.value = MakeString;
        target.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(MakeString);
    }

    // copy HTML
    if(param == 2)
    {

        TextAreaObj.value = MakeString;
        TextAreaObj.select();
        document.execCommand("Copy");

    }

    // copy CSS
    if(param == 3)
    {
        MakeString = "";
        //document.styleSheets[0].cssRules.length;

        for (var [key, value] of gSlateMap)
        {
            MakeString += document.styleSheets[0].cssRules[GetIdNumber(key)].cssText;
        }

        TextAreaObj.value = MakeString;
        TextAreaObj.select();

    }

    // copy JSon
    if(param == 4)
    {
        MakeString = "";
        gJSonData.length = 0;
        for (var it of gSlateMap)
        {
            gJSonData.push ( JSON.stringify(it[1]) );
        }
        
        TextAreaObj.value = gJSonData;
        TextAreaObj.select();
        document.execCommand("Copy");
    }

}

/** --------------------UTIL-------------------- */


function Copy(obj)
{
    return Object.assign({}, obj);
}

function DeleteString(insertString, findString)
{
    let MakeString = insertString;
    let FindIndex = insertString.indexOf(findString);
    if(FindIndex != -1)
    {
        MakeString = insertString.substr(0, FindIndex);

        // 지우고자 하는 것이 0번쨰 인덱스부터 인 경우
        if(FindIndex == 0)
        {
            let InputLength = findString.length;
            MakeString = insertString.substr(InputLength, insertString.length - 1);
        }
    }
    return MakeString;
}

function GetIsMBButton()
{
    let localFlag = false;
    if ( IsEmpty(gSBMValue.ActiveClassName) && gSBMValue.ClickEnable)
    {
        localFlag = true;
    }

    return localFlag
}

// str 인자가 들어가야하는데? 지금당장은 보류 9.23
function IsEmpty()
{
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else    
        return false ;
}

function EachFoundGSBValue(wrapClassName)
{
    let localString;
    if( wrapClassName == "top-wrap")
    {
        localString = "bm-top-wrap";
    }
    else if( wrapClassName == "left-wrap")
    {
        localString = "bm-left-box";
    }
    else if(wrapClassName == "tree-box")
    {
        localString = "bm-tree-box";
    }

    return localString;
}

// JAVSCRIPT 문법
// event.target.classList.add("select");

function AddClass(newObject, newClassName)
{
    // $(newObject).className += " " + newClassName;
    $("."+newObject).addClass(newClassName);
    ClassAction(newClassName);
}

function ReMoveClass(newObject, newClassName)
{
    $("."+newObject).removeClass(newClassName);
}

function AddClass_ID(newObject, newClassName)
{
    // $(newObject).className += " " + newClassName;
    $("#"+newObject).addClass(newClassName);
    ClassAction(newClassName);
}

function ReMoveClass_ID(newObject, newClassName)
{
    $("#"+newObject).removeClass(newClassName);
}

function ClassAction(newClassName)
{
    let java_Obj = document.getElementsByClassName(newClassName)[0];
    if(java_Obj)
    {
        if(newClassName == "bm-button-click")
        {
            //java_Obj.style.height = "100px";
            //java_Obj.style.width = "100px";
            // java_Obj.style.postion = "relative"
        }
    }

}

/** -------------------------------------------- */



function ExecFunction(target, param)
{
    let TextAreaObj = document.getElementsByClassName("clib-textarea")[0];
    let execText = TextAreaObj.value;

    if(execText == "MakeJSon")
    {
        MakeJSon();
    }
    
    if( execText == "LoadJSon")
    {
    }

    if(param == 0)
    {
        MakeJSon(target);
    }

    if( param == 1)
    {
        OpenJSonFile();
    }
}


function InputChange(obj)
{
    let MakeClassName = DeleteString(obj.className,"dv-");
    let MakeValue = obj.value;

    if(MakeClassName == "innerHTML")
    {

    }
    else
    {
        if(MakeClassName == "background-image") MakeValue = "url(" + MakeValue + ")";
        // change CSS
        CssSetProperty(gSState.ClickSlate, MakeClassName, MakeValue);
    }

}



    /*

    if(MakeClassName == "innerHTML")
    {
        document.getElementById( gSState.ClickSlate ).innerHTML = MakeValue;
    }
    if(MakeClassName == "color")
    {
        document.getElementById( gSState.ClickSlate ).style.color = MakeValue;
    }
    if(MakeClassName == "font-size")
    {
        document.getElementById( gSState.ClickSlate ).style.fontSize = MakeValue;
    }

    */

        /*
    $(document).on("click", function(event)
    {
        // 그냥 마우스 클릭 자체에 이벤트가 발생함
        alert("");
    });
    */


    // CSSStyleDeclaration
    // styleSheets[] css 파일 인덱스
    // cssRules 정의된 css 인덱스
    // var declaration = document.styleSheets[0].cssRules[3].style;
    // declaration.setProperty("background-color", "yellow");

    // document.styleSheets[0].insertRule('#slate-obj-id0 { background-Color: white }', 0);
    // document.styleSheets[0].rules[0].style.setProperty("background-Color", "black");
    // getComputedStyle(newSlateObj).getPropertyValue( gHTMLName[5] ));

    // Element를 찾고 첫번째 반환함
    // document.querySelector("#asdf") 

    // MAP의 key값을 얻음
    // Object.keys( )










