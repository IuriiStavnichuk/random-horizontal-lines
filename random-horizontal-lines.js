var img;
function preload(){
    img=loadImage("cat.jpg")
}
function setup() {
    frameRate(320);
    canvas = createCanvas(1200, 1800);
    image(img,0,0);

    var x1= 0, y1= 0, currentPixelRgb;
    var pixelRgb=get(0,0);
    var pixelHsl, prevPixelL= 0, threshold=3;

    for (var y=0; y<160; y++){

        for (var x=0; x<200; x++){
            currentPixelRgb=get(x,y);

            pixelHsl=rgbToHsl( currentPixelRgb[0],currentPixelRgb[1],currentPixelRgb[2] );

            pixelL=pixelHsl[2]*100;

            if(pixelL-prevPixelL > threshold ){
                stroke(pixelRgb);

                x2= x, y1=y+220;
                line(x1,y1,x2,y1);

                x1=x2;
                pixelRgb=currentPixelRgb;
            }
            prevPixelL = pixelL;
        }
    }
}

function rgb2hsv () {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
