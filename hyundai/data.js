

// config 
var config = {};
config.button = "button";

config.button_left = "b-left";
config.button_right = "b-right";
config.button_selector = "b-selector";
config.button_menu = "b-menu";

config.effect_selector_active = "e-selector-active";
config.effect_menu_active = "e-menu-active";

config.slider_dm = "slider-dm";
config.slider_wrap = "slider-wrap";
config.slider_element = "slider-element";
config.slider_buttonsWrap = "slider-buttons-wrap";
config.slider_controllerWrap = "slider-controller-wrap";
config.slider_controllerList = "slider-controller-list";
config.slider_controllerElement = "slider-controller-element";
config.slider_controllerActive = "e-slider-controller-active";



// slider top Data
var sliderTopData = {};
sliderTopData.datas = [];
sliderTopData.inputData = function(img,title,coment,color){
    this.datas.push( {img:img, title:title, coment:coment, color: color});
};

sliderTopData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/main/main-keyvisual-n-performance-parts-w.jpg", "N 퍼포먼스의 시작", "The First N Performance parts", "black");
sliderTopData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/porter2-electric/main-keyvisual-porter2-electric-w.jpg", "PORTER II Electric", "새로운 친환경 EV 트럭", "white");
sliderTopData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/20fl/20lc/main-grandeur-20fl-keyvisual-w.jpg", "GRANDEUR & Hybrid", "성공을 새롭게 정의하다", "black");
sliderTopData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/tucson/20my/main-keyvisual-tucson-20my-w.jpg", "TUCSON", "새로운 다이내믹의 시작", "black");
sliderTopData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/sonata/19fc/launching/main-keyvisual-sonata-dn8-sensuous-19lc-19wheel-w.jpg", "SONATA Sensuous", "가장 완벽한 센슈어스 스포티니스의 탄생", "white");
sliderTopData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/kona-hybrid/main-keyvisual-kona-hybrid-lc-w.jpg", "KONA, KONA Hybrid", "유쾌한 퍼포먼스의 시작", "black");
sliderTopData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/sonata-hybrid/19lc/main-keyvisual-sonata-hybrid-19lc-w.jpg", "SONATA Hybrid", "햇빛으로 더 멀리 달리다", "black");


// slider bottom data
var sliderBottomData = {};
sliderBottomData.datas = [];
sliderBottomData.inputData = function(img,title,coment,color){
    this.datas.push( {img:img, title:title, coment:coment, color: color});
};

sliderBottomData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/main/main-promotion-event-myhyundai-app-launching-pc.jpg", "오오오오! 현대자동차가 쏜다!", "myHyundai 런칭 기념 이벤트", "white");
sliderBottomData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/main/main-promotion-event-join-h-ear-elite-panel-pc.png", "H-ear 패널 가입하고 ", "스타벅스 기프티콘 받자!", "black");
sliderBottomData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/main/main-promotion-event-hyundai-motorstudio-teatime-pc.jpg", "현대차에서 <br> 현대 차[茶]를 드립니다!", "<br><br> 현대 모터스튜디오 서울, 고양, 하남에서 만나요!", "black");
sliderBottomData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/main/main-promotion-event-the-new-grandeur-young-forty-ride-pc.jpg", "더 뉴 그랜저  <br> 런칭 기념 시승이벤트", "<br><br> 시승고객 100% 당첨 이벤트", "black");
sliderBottomData.inputData( "https://www.hyundai.com/content/dam/hyundai/kr/ko/images/main/main-promotion-event-goodbye-2019-december-pc.jpg", "GOOD BUY 2019", "개별 소비세 인하 종료 임박", "white");

// const string
const perfomance_blue =     "퍼포먼스블루";
const ignite_flame =        "이그나이트플레임";
const chalk_white =         "초크화이트";
const phantom_black =       "팬텀블랙";
const lake_silver =         "레이크실버";
const ion_silver =          "이온실버";
const white_cream =         "화이트크림";
const nocturne_grey =       "녹턴그레이";
const midnight_black =      "미드나잇블랙";
const intense_blue =        "인텐스블루";
const polar_white =         "폴라화이트";
const iron_gray =           "아이언그레이";
const fiery_red =           "파이어레드"
const the_denim =           "더데님";
const steel_graphite =      "스틸 그라파이트";
const taiga_brown =         "타이가 브라운";
const ceramic_blue =        "세라믹 블루"


// defineColor
var defineColor = 
{
    perfomance_blue :   { krName : perfomance_blue, value : "SFB", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/exterior-colorchip-perfomance-blue.jpg"},
    ignite_flame :      { krName : ignite_flame,    value : "MFR", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/exterior-colorchip-ignite-flame.jpg"},
    chalk_white :       { krName : chalk_white,     value : "P6W", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/carcode/external/exterior-colorchip-chalk-white.jpg"},
    phantom_black :     { krName : phantom_black,   value : "MZH", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/carcode/external/exterior-colorchip-phantom-black.jpg"},
    lake_silver :       { krName : lake_silver,     value : "SS7", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/carcode/external/exterior-colorchip-lake-silver.jpg"},
    ion_silver :        { krName : ion_silver,      value : "N9V", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/grandeur_19my_exterior-colorchip-ion-silver.jpg"},
    white_cream :       { krName : white_cream,     value : "WC9", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/grandeur_19my_exterior-colorchip-white-cream%20(1).jpg"},
    nocturne_grey :     { krName : nocturne_grey,   value : "T2G", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/grandeur-18my-exterior-colorchip-nocturne-grey.jpg"},
    midnight_black :    { krName : midnight_black,  value : "NB9", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/grandeur_19my_exterior-colorchip-midnight-black.jpg"},
    intense_blue :      { krName : intense_blue,    value : "YP5", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/avante-19my-exterior-colorchip-intense-blue.jpg"},
    polar_white :       { krName : polar_white,     value : "WAW", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/avante-19my-exterior-colorchip-polar-white.jpg"},
    iron_gray :         { krName : iron_gray,       value : "YT3", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/avante-19my-exterior-colorchip-iron-gray.jpg"},
    fiery_red :         { krName : fiery_red,       value : "PR2", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/avante-19my-exterior-colorchip-fiery-red.jpg"},
    the_denim :         { krName : the_denim,       value : "TN6", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/avante-19my-exterior-colorchip-the-denim.jpg"},
    steel_graphite :    { krName : steel_graphite,  value : "P7V", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/97x52_lx2_steel_graphite.jpg"},
    taiga_brown :       { krName : taiga_brown,     value : "RN7", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/external/97x52_lx2_taiga_brown.jpg"},
    ceramic_blue :      { krName : ceramic_blue,    value : "SU8", url : "https://www.hyundai.com/content/dam/hyundai/kr/ko/data/carcode/external/exterior-colorchip-ceramic-blue.jpg"},
 
};


// car select Data
var carSelectData = {};
carSelectData.datas = [];
carSelectData.inputData = function(thumb, name, value0, value1 ,colors){
    this.datas.push( {thumb : thumb , name : name, value0 : value0, value1 : value1, colors : colors});
}

carSelectData.inputData("https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/menu/grandeur-20fl-menu-mo.png", "그랜저", "IG_3_G8", "S142",[  
    defineColor.ion_silver, 
    defineColor.white_cream,
    defineColor.nocturne_grey,
    defineColor.midnight_black ] );

carSelectData.inputData("https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/menu/veloster-n-menu-mo.png", "벨로스터N", "JS_1_BU", "G000",[  
    defineColor.perfomance_blue, 
    defineColor.ignite_flame,
    defineColor.chalk_white,
    defineColor.lake_silver ] );

    
carSelectData.inputData("https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/menu/sonata-dn8-19lc-menu-mo.png", "쏘나타", "DN_1_DV", "S001",[  
    defineColor.white_cream, 
    defineColor.midnight_black  ] );


carSelectData.inputData("https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/menu/avante_19my_menu-mo-240x129.png", "아반떼", "AD_4_F2", "S667",[  
    defineColor.intense_blue,
    defineColor.polar_white,
    defineColor.iron_gray,
    defineColor.fiery_red,
    defineColor.the_denim  ] );

carSelectData.inputData("https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/menu/i30-20my-nline-menu-mo.png", "i30", "PD_3_G3", "SAMK",[  
    defineColor.intense_blue,
    defineColor.polar_white,
    defineColor.iron_gray,
    defineColor.fiery_red,
    defineColor.the_denim  ] );

    
carSelectData.inputData("https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/menu/venue-lc-menu-mo.png", "VENUE", "QX_1_SN", "S017",[  
    defineColor.the_denim,        
    defineColor.polar_white,
    defineColor.fiery_red,
    defineColor.intense_blue  ] );

carSelectData.inputData("https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/menu/palisade_car_thumb_240x129.png", "PALISADE", "LX_1_S8", "D041",[  
    defineColor.white_cream,        
    defineColor.steel_graphite,
    defineColor.taiga_brown,
 ] );

 carSelectData.inputData("https://www.hyundai.com/content/dam/hyundai/kr/ko/data/vehicles/menu/kona-electirc-menu-mo.png", "KONA Electric", "OS_1_GK", "D091",[  
    defineColor.phantom_black,   
    defineColor.chalk_white,
    defineColor.ceramic_blue,
 ] );
    