let myCanvas=document.getElementById("canvas");
let context=myCanvas.getContext("2d");
let using=false;
let lastPosition={x:undefined,y:undefined};
setCanvasSize();
listenToUser();
window.onresize=function () {
    setCanvasSize();
}

function setCanvasSize() {
    myCanvas.width=document.documentElement.clientWidth;
    myCanvas.height=document.documentElement.clientHeight;
}

function drawCircle(x,y) {
    context.beginPath();
    context.arc(x,y,5,0,Math.PI*2);
    context.fill();
}

function drawLine(lastP,currentP)
{
    context.beginPath();
    context.lineWidth = 10;
    context.moveTo(lastP.x, lastP.y);
    context.lineTo(currentP.x, currentP.y);
    context.stroke();
}

function listenToUser() {
    if(document.body.ontouchstart===undefined){
        listenToMouse();
    }else {
        listenToTouch();
    }
}

function listenToTouch(){
    myCanvas.ontouchstart=function (e) {
        using=true;
        const x=e.touches[0].clientX;
        const y=e.touches[0].clientY;
        if(!eraserEnabled){
            drawCircle(x,y);
            lastPosition.x=x;
            lastPosition.y=y;
        } else {
            context.clearRect(x-5,y-5,20,20);
        }
    };

    myCanvas.ontouchmove=function (e) {
        if(using){
            const x=e.touches[0].clientX;
            const y=e.touches[0].clientY;
            if(!eraserEnabled){
                drawCircle(x,y);
                const currentPosition={x:x,y:y};
                drawLine(lastPosition,currentPosition);
                lastPosition=currentPosition;
            }else{
                context.clearRect(x-5,y-5,20,20);
            }
        }
    }

    myCanvas.ontouchend=function (e) {
        using=false;
    }
}

function listenToMouse(){
    myCanvas.onmousedown=function (e) {
        using=true;
        const x=e.clientX;
        const y=e.clientY;
        if(!eraserEnabled){
            drawCircle(x,y);
            lastPosition.x=x;
            lastPosition.y=y;
        } else {
            context.clearRect(x-5,y-5,20,20);
        }
    };
    myCanvas.onmousemove=function (e) {
        if(using){
            const x=e.clientX;
            const y=e.clientY;
            if(!eraserEnabled){
                drawCircle(x,y);
                const currentPosition={x:x,y:y};
                drawLine(lastPosition,currentPosition);
                lastPosition=currentPosition;
            }else{
                context.clearRect(x-5,y-5,20,20);
            }
        }
    };

    myCanvas.onmouseup=function (e) {
        using=false;
    };
}

let divActions=document.getElementById("actions");
let eraser=document.getElementById("eraser");
let brush=document.getElementById("brush");
let eraserEnabled=false;
eraser.onclick=function (e) {
    eraserEnabled=true;
    eraser.classList.add("active");
    brush.classList.remove("active");
};

brush.onclick=function (e) {
    eraserEnabled=false;
    brush.classList.add("active");
    eraser.classList.remove("active");
};

red.onclick=function (e) {
    context.fillStyle="red";
    context.strokeStyle="red";
    red.classList.add("active");
    green.classList.remove("active");
    blue.classList.remove("active");
};

green.onclick=function (e) {
    context.fillStyle="green";
    context.strokeStyle="green";
    green.classList.add("active");
    red.classList.remove("active");
    blue.classList.remove("active");
};

blue.onclick=function (e) {
    context.fillStyle="blue";
    context.strokeStyle="blue";
    red.classList.remove("active");
    green.classList.remove("active");
    blue.classList.add("active");
};

