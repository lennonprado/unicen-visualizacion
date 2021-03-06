var kernelX = [
    [-1,0,1],
    [-2,0,2],
    [-1,0,1]
];

var kernelY = [
    [-1,-2,-1],
    [0,0,0],
    [1,2,1]
];

var kernelB = [
    [1/9,1/9,1/9],
    [1/9,1/9,1/9],
    [1/9,1/9,1/9]
];

function negative(){
    for(var x=0; x<imageData.width; x++){
        for(var y=0; y<imageData.height; y++){
            var R = getRed(imageDataOriginal,x,y);
            var G = getGreen(imageDataOriginal,x,y);
            var B = getBlue(imageDataOriginal,x,y);
            setRed(imageData,x,y,255-R);
            setGreen(imageData,x,y,255-G);
            setBlue(imageData,x,y,255-B);
        }
    }
    context.putImageData(imageData,0,0);
}

function grey(){
    for(var x=0; x<imageData.width; x++){
        for(var y=0; y<imageData.height; y++){
            var R = getRed(imageDataOriginal,x,y);
            var G = getGreen(imageDataOriginal,x,y);
            var B = getBlue(imageDataOriginal,x,y);
            var todos = (R+G+B)/3;
            setRed(imageData,x,y,todos);
            setGreen(imageData,x,y,todos);
            setBlue(imageData,x,y,todos);
        }
    }
    context.putImageData(imageData,0,0);
}


function sepia(){
    for(var x=0; x<imageData.width; x++){
        for(var y=0; y<imageData.height; y++){
            var R = getRed(imageDataOriginal,x,y);
            var G = getGreen(imageDataOriginal,x,y);
            var B = getBlue(imageDataOriginal,x,y);
            var tr = (0.393 * R) + (0.769 * G) + (0.189 * B);
            var tg = (0.349 * R) + (0.686 * G) + (0.168 * B);
            var tb = (0.272 * R) + (0.534 * G) + (0.131 * B);
            setRed(imageData,x,y,tr);
            setGreen(imageData,x,y,tg);
            setBlue(imageData,x,y,tb);
        }
    }
    context.putImageData(imageData,0,0);
}



function binarization() {
    var quantity = $('#bi1').val();
    for(var x=0; x<imageData.width; x++){
        for(var y=0; y<imageData.height; y++){
            //red channel
            if(getRed(imageDataOriginal,x,y)>quantity)
                setRed(imageData,x,y,255);
            else
                setRed(imageData,x,y,0);
            // green channel
            if(getGreen(imageDataOriginal,x,y)>quantity)
                setGreen(imageData,x,y,255);
            else
                setGreen(imageData,x,y,0);
            // blue channel
            if(getBlue(imageDataOriginal,x,y)>quantity)
                setBlue(imageData,x,y,255);
            else
                setBlue(imageData,x,y,0);
        }
    }
    context.putImageData(imageData,0,0);
}

// dependiendo del tamaño de la imagen elegida este filtro puede tardar algo de tiempo
function brighness(){
    var quantity = $("#bg1").val();
    for(var x=0; x<imageData.width; x++){
        for(var y=0; y<imageData.height; y++){
            var R = getRed(imageDataOriginal,x,y);
            var G = getGreen(imageDataOriginal,x,y);
            var B = getBlue(imageDataOriginal,x,y);
            porcR = Math.round((255 * (quantity *(R*100/255)/50))/100);
            porcG = Math.round((255 * (quantity *(G*100/255)/50))/100);
            porcB = Math.round((255 * (quantity *(B*100/255)/50))/100);
            setRed(imageData,x,y,porcR);
            setGreen(imageData,x,y,porcG);
            setBlue(imageData,x,y,porcB);
        }
        context.putImageData(imageData,0,0);
    }
}

function blurRange(){
    var quantity = Number($('#bl1').val());
    for(var x=0; x<imageData.width; x++){
        for(var y=0; y<imageData.height; y++){
            // around
            cantR = 0;
            cantG = 0;
            cantB = 0;
            sum = 0;
            for(j =( x-quantity ); j <= ( x+quantity );j++) {
                for (k = ( y-quantity ); k <= ( y+quantity ); k++) {
                    if((j>0) && (k>0)) {
                        cantR = cantR + getRed(imageDataOriginal, j, k);
                        cantG = cantG + getGreen(imageDataOriginal, j, k);
                        cantB = cantB + getBlue(imageDataOriginal, j, k);
                        sum++;
                    }
                }
            }
            setRed(imageData,x,y,cantR/sum);
            setGreen(imageData,x,y,cantG/sum);
            setBlue(imageData,x,y,cantB/sum);
        }
    }
    context.putImageData(imageData,0,0);
}

function sobel(mat){
    im = imageDataOriginal;
    for(var x=1; x<imageData.width-1; x++){
        for(var y=1; y<imageData.height-1; y++){
            // red channel
            var pixelSobel =
                getRed(im,x-1,y-1) * mat[0][0] +
                getRed(im,x,y-1) * mat[0][1] +
                getRed(im,x+1,y-1) * mat[0][2] +
                getRed(im,x-1,y) * mat[1][0] +
                getRed(im,x,y) * mat[1][1] +
                getRed(im,x+1,y) * mat[1][2] +
                getRed(im,x-1,y+1) * mat[2][0] +
                getRed(im,x,y+1) * mat[2][1] +
                getRed(im,x+1,y+1) * mat[2][2];
            setRed(imageData,x,y,pixelSobel);
            setGreen(imageData,x,y,pixelSobel);
            setBlue(imageData,x,y,pixelSobel);
        }
    }
    context.putImageData(imageData,0,0);
}
// matrices de sobel
function sobelH(){
    sobel(kernelX);
}

function sobelV(){
    sobel(kernelY);
}

function sobelB(){
    // todo por 1/9
    sobel(kernelB);
}
