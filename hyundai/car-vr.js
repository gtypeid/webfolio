

class carVr
{
    constructor()
    {
        this.carData = carSelectData.datas;
        this.carActiveIndex = 0;
        this.carActiveColorIndex = 0;
        this.carActiveAngle = "001";
        this.bClicked = false;

        this.cx;


        this.carUI = document.getElementById("car-ui-box");
        this.carImg = document.getElementById("car-img");

        this.init();

    }

    init()
    {
        this.carUI.addEventListener("mousedown",(event)=> { this.DownHandle(event) });
        document.body.addEventListener("mouseup",(event)=> { this.UpHandle(event) });
        document.body.addEventListener("mousemove",(event)=> { this.MoveHnadle(event) });
    
        const car = this.carData[ this.carActiveIndex];
        const carColor = this.carData[ this.carActiveIndex].colors[ this.carActiveColorIndex];
        const carAngle = this.carActiveAngle;

        this.SetCarImg(car,carColor,carAngle);
        this.UpdateColorPicker(car);
    }


    SetCarImg(carData, carColor, carAngle)
    {

        this.carImg.src = 
        "https://www.hyundai.com/content/dam/hyundai/kr/ko/vr360/"
        + carData.value0
        + "/EXTERIOR/" 
        + carData.value1
        + "/"
        + carColor.value 
        + "/" 
        + carAngle
        + ".png";

        document.getElementById("car-type").innerHTML = carData.name + " - " + carColor.krName;

    }

    UpdateColorPicker(carData)
    {
        const MaxColorCount = carData.colors.length;
        const CarTable = document.getElementById("car-select-table");

        while ( CarTable.hasChildNodes() ) { CarTable.removeChild( CarTable.firstChild ); }

        for(var i = 0 ; i < MaxColorCount; i++)
        {
            var itElement = CarTable.appendChild ( document.createElement("li") );
            itElement.classList.add("color-pick");
            itElement.classList.add(i);
            itElement.style.background = "url(" + "'" + carData.colors[i].url +"'" + ")" + "no-repeat";
            itElement.addEventListener("click", (event)=> { this.ClickHandle(event) });
        }


    }
    DownHandle(event)
    {
        this.bClicked = true;
        this.cX = event.pageX;

    }

    UpHandle(event)
    {
        this.bClicked = false;
    }

    MoveHnadle(event)
    {
        if(this.bClicked)
        {
			
            if(event.pageX === this.cX) return;

            // right
            if( event.pageX < this.cX)
            {
                this.cX = event.pageX;
                var carNumber = Number(this.carActiveAngle);

                if( carNumber != 60)
                {
                    carNumber++;
                }
                else
                {
                    carNumber = 1;
                }
                this.carActiveAngle = ( (carNumber < 10) ? "00" : "0") + carNumber;
    
                const car = this.carData[ this.carActiveIndex];
                const carColor = this.carData[ this.carActiveIndex].colors[ this.carActiveColorIndex];
                const carAngle = this.carActiveAngle;

                this.SetCarImg(car ,carColor , carAngle);
            }
            // left
            else
            {
                this.cX = event.pageX;
                var carNumber = Number(this.carActiveAngle);
                if( carNumber != 1)
                {
                    carNumber--;
                }
                else
                {
                    carNumber = 60;
                }
                this.carActiveAngle = ( (carNumber < 10) ? "00" : "0") + carNumber;

                const car = this.carData[ this.carActiveIndex];
                const carColor = this.carData[ this.carActiveIndex].colors[ this.carActiveColorIndex];
                const carAngle = this.carActiveAngle;

                this.SetCarImg(car ,carColor , carAngle);
            }
        }
    }

    ClickHandle(evnet , param , carData)
    {
        const cElement = evnet.target.classList;

        if( param === "active" )
        {
            this.carActiveIndex = carData;
            this.carActiveColorIndex = 0;

            const car = this.carData[ this.carActiveIndex];
            const carColor = this.carData[ this.carActiveIndex].colors[this.carActiveColorIndex];
            const carAngle = this.carActiveAngle;

            this.SetCarImg(car ,carColor , carAngle);
            this.UpdateColorPicker(car);

            this.effectPicker(event);
            this.imgPreloading(car,carColor);

        }

        if( cElement.contains("color-pick") )
        {
            const value = evnet.target.classList.value.replace("color-pick ","");
            this.carActiveColorIndex  = value;

            const car = this.carData[ this.carActiveIndex];
            const carColor = this.carData[ this.carActiveIndex].colors[ this.carActiveColorIndex];
            const carAngle = this.carActiveAngle;

            this.SetCarImg(car ,carColor , carAngle);

            this.effectPicker(event);
            this.imgPreloading(car,carColor);
        }


    }

    effectPicker(event)
    {
        const effectPicker = document.getElementsByClassName("e-car-var-color-pick")[0];
        const top = event.target.offsetTop;
        const left = event.target.offsetLeft;

        effectPicker.style.top = top + "px";
        effectPicker.style.left = left + "px";
    }

    imgPreloading(carData,carColor)
    {
		
        for(var i = 1 ; i <= 60; i++)
        {
            let img = new Image();
            let carAngle = ( (i < 10) ? "00" : "0") + i;
            let url = 
            "https://www.hyundai.com/content/dam/hyundai/kr/ko/vr360/"
            + carData.value0
            + "/EXTERIOR/" 
            + carData.value1
            + "/"
            + carColor.value 
            + "/" 
            + carAngle
            + ".png";

            img.src = url;

            if(i == 60)
            {
                img.addEventListener("load", function(){
                    console.log("imgPreloading");
                });
            }


        }
		


    }


}