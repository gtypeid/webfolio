
const MAX_SITLE_ELEMENT_COUNT = 16;
const MAX_PRV_ITEM_LIST_COUNT = 6;


var gValue_CurrentPage = 1;
var gValue_Category = 0;
var gValue_ClickItem = 0;
var gValue_PrvItems = new Array();

var gRowObj = new Array();
var gMakeitemObj = new Array();
var gClickItemObj;


var SCROLL_VISIBLE = false;
var gScrollObj;


// getElementsByClassName           찾을 때 배열로 찾아짐 [index]로 접근해야함 (s라고 붙음)
// getElementById                   찾을 때 배열이 아님 [idnex]로 접근하면 안 됨 (s 없음)
// $("#item-count")[0].innerHTML    이것은 id 접근이지만 Jquery이기에 Java script랑 다른 모양인가보다


$(document).ready(function(event)
{
    LoadLocalData();
    XMLSDataRead();

    XMLSLoadID_Date(gValue_ClickItem);

    CarouselMoblie();

    // ( location.href );
});

function CarouselMoblie()
{
    if($("#content-slide")[0])
    {
        $("#content-slide").swipe(
            {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                if(direction == "right")
                {
                    $(this).carousel('prev');
                }
                else if( direction == "left")
                {
                    $(this).carousel('next');
                }

            },
            threshold:0
        });
    }
}

$(window).scroll( function(event) 
{
    if(0 < window.scrollY && !SCROLL_VISIBLE)
    {
        ScrollVisibleSet(true);
    }
    else if(0 >= window.scrollY && SCROLL_VISIBLE)
    {
        ScrollVisibleSet(false);
    }
});

function GetScrollHead()
{
    if(isEmpty(gScrollObj))
    {
        gScrollObj = $(".main-head-scroll")[0];
    }
    return gScrollObj;
}

function ScrollVisibleSet(newValue)
{
    SCROLL_VISIBLE = newValue;
    let ScrollObj = GetScrollHead();

    ScrollObj.classList.toggle("main-head-scroll",newValue);

    if(newValue) ScrollObj.style.display = "block";
    else ScrollObj.style.display = "none";
}


function LoadLocalData()
{
    // PAGE LOAD 
    if(isEmpty( gValue_CurrentPage = GetStorage("gValue_CurrentPage") ))
    {
        SetStorage("gValue_CurrentPage", 1);
        gValue_CurrentPage = GetStorage("gValue_CurrentPage");
    }

    // CATEGORY LOAD
    gValue_Category = GetStorage("gValue_Category");
    if(isEmpty(gValue_Category))
    {
        SetStorage("gValue_Category", 0);
        gValue_Category = GetStorage("gValue_Category");
    }

    // CLICK ITEM
    gValue_ClickItem = GetStorage("gValue_ClickItem");

    // PRV ITEMS 
    if( !isEmpty(JSON.parse( GetStorage("gValue_PrvItems") )) )
    {
        gValue_PrvItems = JSON.parse( GetStorage("gValue_PrvItems") );
    }

    ScrollVisibleSet(false);
}

function ChanePage(newInnerHTML)
{
    //$(".page-element")[0].innerHTML
    let ClickSite = newInnerHTML; //obj.innerHTML;
    if(gValue_CurrentPage != ClickSite)
    {
        // Click Item
        gValue_CurrentPage = ClickSite;
        SetStorage("gValue_CurrentPage",gValue_CurrentPage);
    }
}

function LoadItemPage(newItemID)
{
    gValue_ClickItem = newItemID;
    SetStorage("gValue_ClickItem", gValue_ClickItem);
    AddPreViewItemId(newItemID);
}

function AddPreViewItemId(newItemID)
{
    if(gValue_PrvItems.indexOf(newItemID) == -1)
    {
        if(gValue_PrvItems.length > MAX_PRV_ITEM_LIST_COUNT - 1) gValue_PrvItems.pop();
        gValue_PrvItems.unshift(newItemID);
        SetStorage("gValue_PrvItems", gValue_PrvItems);
    }
}

function ChangeCategory(obj)
{
    // innterHTML 이랑 비슷함 근데 조금 다름 (<br> 태그라던지 포함 되거나 안 되거나) 
    let ClickCategory = obj.textContent;

    // 공백 제거
    ClickCategory.trim();

    // 원래는 index of를 해 줄 필요가 없는데 content-html -contnet-detail-element-category 때문에 해 줌
    // 가운데 정렬 하니까 공백이 생기거나, 이상한 문제가 생김
    if(ClickCategory == "전체" || ( ClickCategory.indexOf("전체") != -1 ) )
    {
        gValue_Category = 0;
    }
    else if(ClickCategory == "앙몬드" || (ClickCategory.indexOf("앙몬드") != -1 ) )
    {
        gValue_Category = 1;
    }
    else if(ClickCategory == "스카피" || (ClickCategory.indexOf("스카피") != -1 ) )
    {
        gValue_Category = 2;
    }
    else if(ClickCategory == "죠르디" || (ClickCategory.indexOf("죠르디") != -1 ) )
    {
        gValue_Category = 3;
    }
    else if(ClickCategory == "케로&베로니" || (ClickCategory.indexOf("케로&베로니") != -1 ))
    {
        gValue_Category = 4;
    }

    SetStorage("gValue_Category", gValue_Category);
    SetStorage("gValue_CurrentPage", 1);
}

function GetTypeText(newType)
{
    let MakeText;
    switch(newType)
    {
        case 0:
            break;
        case 1:
            MakeText = "앙몬드";
            break;
        case 2:
            MakeText = "스카피";
            break;
        case 3:
            MakeText = "죠르디";
            break;
        case 4:
            MakeText = "케로&베로니";
            break;
    }
    return MakeText;
}

function DynamicLoad()
{
    let localObj;

    localObj = $(".page-element")[gValue_CurrentPage - 1];
    if(localObj)    localObj.className += " page-element-select";

    localObj = $(".content-category-table-element")[gValue_Category];
    if(localObj)    localObj.className += " font-select-bold";

    localObj = $(".list-table-element-wrap");
    if(localObj)    localObj.on("click", function(){ LoadItemPage(this.id)});

    LoadIntroImage(gValue_Category, "intro-big");
}

function LoadIntroImage(newCategory, newObj)
{
    // let WindwWidth = $(window).width();
    let ImgSrc =
    [
        "https://t1.daumcdn.net/friends/prod/category/20181002_W_categorytop_niniz_4360ab.jpg",
        "https://t1.daumcdn.net/friends/prod/category/20180928_W_categorytop_angmond_4360ab.jpg",
        "https://t1.daumcdn.net/friends/prod/category/20180928_W_categorytop_scappy_ec6d6d.jpg",
        "https://t1.daumcdn.net/friends/prod/category/190507_categorybanner_jordy_W_A0E6AE.jpg",
        "https://t1.daumcdn.net/friends/prod/category/20180816_W_category_keroberony_fad7dc.jpg"
    ];

    let makeString = "." + newObj;
    let getIsObj = $(makeString)[0];
    if(getIsObj)
    {
        getIsObj.src = ImgSrc[newCategory];
    }

}

function LoadOuttorImage(newCategory, newObj)
{
    // let WindwWidth = $(window).width();
    let ImgSrc =
    [
        "https://t1.daumcdn.net/friends/prod/category/20181002_M_categorytop_niniz_4360ab.jpg",
        "https://img1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/liveboard/share/327822f41acd430eb730befc495aaa9e.jpg",
        "https://img1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/liveboard/share/8150c8189ba9455c90d7f3bdb2708dbf.jpg",
        "https://t1.daumcdn.net/cfile/tistory/994934335A29EF4512",
        "http://t1.daumcdn.net/liveboard/share/f800864255c24b5c8b261d2b2fe8602e.JPG"

    ];

    let makeString = "." + newObj;
    let getIsObj = $(makeString)[0];
    if(getIsObj)
    {
        getIsObj.src = ImgSrc[newCategory];
    }

}

function SetStorage(varStorageData, SetData)
{
    if(Array.isArray(SetData))
    {
        localStorage.setItem(varStorageData, JSON.stringify(SetData));
    }
    else
    {
        localStorage.setItem(varStorageData, SetData);
    }
}

function GetStorage(varStorageData)
{
    return localStorage.getItem(varStorageData);
}

function isEmpty(str)
{
    if(typeof str == "undefined" || str == null || str == "")   return true;
    else    return false ;
}

function DeleteMarks(insertName)
{
    let MakeString = insertName;
    MakeString = MakeString.replace("\"", "");
    MakeString = MakeString.replace("\"", "");
    return MakeString
}

function setComma(n) 
{
    var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
    n += '';                          // 숫자를 문자열로 변환         
    while (reg.test(n)) {
       n = n.replace(reg, '$1' + ',' + '$2');
    }         
    return n;
}

function MakeItem(id, kr_name, price, thumg_src, sale)
{   
    if(!kr_name) return;

    let bSale = false;
    let Linked_Obj = ".list-table";

    let MakeClass = "";
    let MakeSrc ="";


    // DeleteMarks(kr_name)
    let newName = kr_name;
    let newPrice = setComma(price);
    let newSrc = thumg_src;
    let newSale = setComma(sale);
    let newId = id;


    // 세일중
    if(sale > 0) bSale = true;

    MakeSrc = newSrc;
    MakeClass = "img-thumb";
    let Make_thumg_src =  "<img src= " + MakeSrc + " class= " + MakeClass + " alt= " + "" + ">";

    MakeClass = "list-table-element-name";
    let Make_Name = "<strong class= " + MakeClass + " >" + newName + "</strong>";

    MakeClass = "list-table-element-price";
    let Make_Price = "<span class= " + MakeClass + ">" + newPrice + "원" + "</span>";

    MakeClass = "list-table-element-price-sale";
    let Make_Price_Sale = "<span class= " + MakeClass + ">" + newSale + "원" + "</span>";

    MakeClass = "list-table-element-sale-icon"
    let Make_Sale_icon = "<span class= "+ MakeClass + ">" + "</span>";

    if(bSale)
    {
        MakeClass = "list-table-element-prv-price";
        Make_Price = Make_Price_Sale;
        Make_Price += "<span class= " + MakeClass + ">" + newPrice + "원" + "</span>";
        // Make_Price += Make_Sale_icon;

        Make_thumg_src += Make_Sale_icon;
    }

    MakeClass = "thumg-wrap";
    let Make_Wrap = "<span class= " + MakeClass + ">" + Make_thumg_src+ "</span>"


    MakeClass = "list-table-element-wrap";
    let Make_id = newId;
    let Make_href = "<a href= " + "./item-content.html "
                    + "class= " +MakeClass
                    + " id= " + Make_id + ">" 
                    + Make_Wrap 
                    + Make_Name
                    + Make_Price 
                    + "</a>";


    MakeClass = "list-table-element";
    if(bSale){  MakeClass = "'list-table-element list-table-sale-element'" }

    let Make_li = "<li class= " + MakeClass + ">"
                    + Make_href
                    + "</li>";

    $(Linked_Obj).append(Make_li);

}

function MakePrvItem(innerObj)
{
    if(!innerObj.kr_name) return;

    let AppendObj = ".content-prev-item-liet";
    let MakeClass;
    let MakeId = innerObj.id;

    let newName = innerObj.kr_name;
    let newPrice = setComma(innerObj.price);
    let newImgSrc = innerObj.thumg_src
    let newSale = innerObj.sale;
    let bSale = false;

    if(innerObj.sale > 0) bSale = true;

    MakeClass = "prev-item-price-sale"
    let Make_Sale= "<span class=" + MakeClass + " >" + "[할인] " + "</span>";

    MakeClass = "prev-item-name";
    let Make_Name = "<strong class=" + MakeClass + " >" + newName + "</strong>";

    if(bSale)
    {
        Make_Name = Make_Sale + Make_Name;
        newPrice = newSale;
    }

    MakeClass = "prev-item-price";
    let Make_Price = "<span class=" + MakeClass + " >" + "가격 : " + newPrice + "원" + "</span>";

    MakeClass = "prev-thumg-img";
    let Make_ThumgImg = "<img src=" + newImgSrc +  " class=" + MakeClass + " alt= " + "" +  ">";

    MakeClass = "prev-thumg-wrap";
    let Make_thumgWrap = "<span class=" + MakeClass + " >" 
                            + Make_ThumgImg
                            + "</span>";

    MakeClass = "prev-href-wrap";
    let Make_href = "<a href= " + "./item-content.html"
                    + " class= " +MakeClass
                    + " id= " + MakeId + ">" 
                    + Make_thumgWrap
                    + Make_Name
                    + Make_Price
                    + "</a>";

    MakeClass = "";
    let Make_li = "<li class=" + MakeClass + " >" 
                    + Make_href
                    + "</li>";


    $(AppendObj).append(Make_li);
}

function XMLSDataRead()
{
    // XMLHttpRequest   "./" 현재   "../" 상위 
    let url = "./data.xlsx"
    let XMLFileReader = new XMLHttpRequest();
    XMLFileReader.open("GET",url, true);    
    XMLFileReader.responseType = "arraybuffer";

    XMLFileReader.onload = function(e)
    {
        let data = new Uint8Array(XMLFileReader.response);
        let wb = XLSX.read(data, {type:"array"});

        // One Count
        wb.SheetNames.forEach(function(sheetName)
        {
            let rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            SetRowObj(rowObj);
            DynamicAppend(); 
        });
    }
    XMLFileReader.send(null);     
}

function XMLSLoadID_Date(newDataID)
{
    let url = "./data.xlsx"
    let XMLFileReader = new XMLHttpRequest();
    XMLFileReader.open("GET",url, true);    
    XMLFileReader.responseType = "arraybuffer";

    XMLFileReader.onload = function(e)
    {
        let data = new Uint8Array(XMLFileReader.response);
        let wb = XLSX.read(data, {type:"array"});

        // One Count
        wb.SheetNames.forEach(function(sheetName)
        {
            let rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            SetClickItemObj(rowObj[newDataID]);
            if(gClickItemObj) DynamicAppend_Item();
        });
    }
    XMLFileReader.send(null);        
}

function SetRowObj(obj)
{
    gRowObj = obj;
}

function SetClickItemObj(obj)
{
    gClickItemObj = obj;
}

function DynamicAppend()
{
    let CurrentFilterType = gValue_Category;
    let MakePageButtonCount = 1;

    // filter
    for(var i = 0; i < gRowObj.length; ++i)
    {
        if(gRowObj[i].kr_name)
        {
            // ALL
            if(CurrentFilterType == 0)
            {
                gMakeitemObj.push(gRowObj[i]);
            }
            // Item Type Filter
            else if(gRowObj[i].type == CurrentFilterType)
            {
                gMakeitemObj.push(gRowObj[i]);
            }
        }
    }

    // Page Append 
    if(gMakeitemObj.length > MAX_SITLE_ELEMENT_COUNT)
    {
        // Page Num
        MakePageButtonCount = gMakeitemObj.length / MAX_SITLE_ELEMENT_COUNT; 

        let iElement = ( (gValue_CurrentPage -1) * MAX_SITLE_ELEMENT_COUNT);
        let EndElement = ( gValue_CurrentPage * MAX_SITLE_ELEMENT_COUNT );

        // Set Max Num
        if(EndElement > gMakeitemObj.length) EndElement = gMakeitemObj.length;

        for (iElement; iElement < EndElement; ++iElement)
        {
            MakeItem(   gMakeitemObj[iElement].id,
                        gMakeitemObj[iElement].kr_name, 
                        gMakeitemObj[iElement].price, 
                        gMakeitemObj[iElement].thumg_src, 
                        gMakeitemObj[iElement].sale);
        }
    }
    // One Page
    else
    {
        for( let eachIt of gMakeitemObj )
        {   
            MakeItem(eachIt.id, eachIt.kr_name, eachIt.price, eachIt.thumg_src, eachIt.sale);
        }
    }


    DynamicAppend_PageButton(MakePageButtonCount);
    ItemCountSet(gMakeitemObj.length);
    DynamicLoad();
}

function DynamicAppend_PageButton(LoopCount)
{                        
    for(var i = 0; i < LoopCount; ++i)
    {
        let MakeCount = (i + 1);
        let MakeClass = "page-element ";
        let MakeString =    "<a href='' " 
                            + "class= "
                            + MakeClass + ">"
                            + MakeCount
                            + "</a>";

        $(".page-wrap").append(MakeString);
    }

    $(".page-element").on("click", function(){ ChanePage(this.innerHTML)});
}

function ItemCountSet(newValue)
{
    let MakeString = "총 " +newValue+ "개 의 상품이 조회되었습니다."

    let localObj = $("#item-count")[0];
    if( localObj ) 
    {
        localObj.innerHTML = MakeString;
    }
}

function DynamicAppend_Item()
{
    let url = "./item/" + gValue_ClickItem +"/";
    let localObj;

    localObj = $(".contnet-detail-nav-category")[0];
    if(localObj)    localObj.innerHTML = GetTypeText(gClickItemObj.type);

    localObj = $(".contnet-detail-element-name")[0];
    if(localObj)    localObj.innerHTML = gClickItemObj.kr_name;

    let Price = setComma(gClickItemObj.price) + "원";
    if(gClickItemObj.sale >0 )
    {
        Price = gClickItemObj.sale + "원";
    }
    localObj = $(".contnet-detail-element-price")[0];
    if(localObj)    localObj.innerHTML = Price;

    let MakeString, MakeUrl;

    for(var i = 0; i <3; i++)
    {
        MakeUrl = url + i + ".jpg ";
        localObj = $(".carousel-item")[i];
        if(localObj)    localObj.src = MakeUrl;
    }

    for(var i = 0; i < 6; i++)
    {
        MakeUrl = url + i + ".jpg ";
        MakeString = "<p>&nbsp</p><p>&nbsp</p>" + "<img src= " + MakeUrl + "style='width:100%'" + ">" + "<p>&nbsp</p><p>&nbsp</p>";
        localObj = $(".content-img");
        if(localObj)    localObj.append(MakeString);
    }

    if( !isEmpty(gValue_PrvItems))
    {
        DynamicAppend_PrvItems();
    }
}

function DynamicAppend_PrvItems()
{
    for (let eachIt of gValue_PrvItems)
    {   
        MakePrvItem(gRowObj[eachIt]);
    }

    localObj = $(".prev-href-wrap");
    if(localObj)    localObj.on("click", function(){ LoadItemPage(this.id)});

    // LoadOuttorImage(gClickItemObj.type, "prev-item-outtro");
}




//* excelExport && FileReader*//
/*
function excelExport(event){
    let input = event.target;
    let reader = new FileReader();

    reader.onload = function()
    {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type : 'binary'});

        wb.SheetNames.forEach(function(sheetName)
        {
            let rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);

            let eachLength = rowObj.length;
            // i < eachLength
            // MAX_SITLE_ELEMENT_COUNT
            for (let i = 0; i < MAX_SITLE_ELEMENT_COUNT; ++i)
            {
                let kr_name = JSON.stringify(rowObj[i].kr_name);
                let price =  JSON.stringify(rowObj[i].price);
                let thumg_src =  JSON.stringify(rowObj[i].thumg_src);
                let sale = JSON.stringify(rowObj[i].sale);

                // JSON Object 보내는 게 안됨 (뭔짓을 해도)
                MakeItem(kr_name, price, thumg_src, sale);
            }

        })
    };
    reader.readAsBinaryString(input.files[0]);
}

*/