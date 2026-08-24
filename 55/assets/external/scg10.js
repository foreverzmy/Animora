/* Generated native Canvas vectors from frames.html. Do not hand-edit. */
(function () {
var Filters;
/**
 *  JPEXS Free Flash Decompiler Filters
 */

Filters = {};

var createCanvas = function (width, height) {
    var c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    c.style.display = "none";
    //temporary add to document to get this work (getImageData, etc.)
    document.body.appendChild(c);
    document.body.removeChild(c);
    return c;
};

Filters._premultiply = function (data) {
    var len = data.length;
    for (var i = 0; i < len; i += 4) {
        var f = data[i + 3] * 0.003921569;
        data[i] = Math.round(data[i] * f);
        data[i + 1] = Math.round(data[i + 1] * f);
        data[i + 2] = Math.round(data[i + 2] * f);
    }
};

Filters._unpremultiply = function (data) {
    var len = data.length;
    for (var i = 0; i < len; i += 4) {
        var a = data[i + 3];
        if (a == 0 || a == 255) {
            continue;
        }
        var f = 255 / a;
        var r = (data[i] * f);
        var g = (data[i + 1] * f);
        var b = (data[i + 2] * f);
        if (r > 255) {
            r = 255;
        }
        if (g > 255) {
            g = 255;
        }
        if (b > 255) {
            b = 255;
        }

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }
};


Filters._boxBlurHorizontal = function (pixels, mask, w, h, radius, maskType) {
    var index = 0;
    var newColors = [];

    for (var y = 0; y < h; y++) {
        var hits = 0;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        for (var x = -radius * 4; x < w * 4; x += 4) {
            var oldPixel = x - radius * 4 - 4;
            if (oldPixel >= 0) {
                if ((maskType == 0) || (maskType == 1 && mask[index + oldPixel + 3] > 0) || (maskType == 2 && mask[index + oldPixel + 3] < 255)) {
                    a -= pixels[index + oldPixel + 3];
                    r -= pixels[index + oldPixel];
                    g -= pixels[index + oldPixel + 1];
                    b -= pixels[index + oldPixel + 2];
                    hits--;
                }
            }

            var newPixel = x + radius * 4;
            if (newPixel < w * 4) {
                if ((maskType == 0) || (maskType == 1 && mask[index + newPixel + 3] > 0) || (maskType == 2 && mask[index + newPixel + 3] < 255)) {
                    a += pixels[index + newPixel + 3];
                    r += pixels[index + newPixel];
                    g += pixels[index + newPixel + 1];
                    b += pixels[index + newPixel + 2];
                    hits++;
                }
            }

            if (x >= 0) {
                if ((maskType == 0) || (maskType == 1 && mask[index + x + 3] > 0) || (maskType == 2 && mask[index + x + 3] < 255)) {
                    if (hits == 0) {
                        newColors[x] = 0;
                        newColors[x + 1] = 0;
                        newColors[x + 2] = 0;
                        newColors[x + 3] = 0;
                    } else {
                        newColors[x] = Math.round(r / hits);
                        newColors[x + 1] = Math.round(g / hits);
                        newColors[x + 2] = Math.round(b / hits);
                        newColors[x + 3] = Math.round(a / hits);

                    }
                } else {
                    newColors[x] = 0;
                    newColors[x + 1] = 0;
                    newColors[x + 2] = 0;
                    newColors[x + 3] = 0;
                }
            }
        }
        for (var p = 0; p < w * 4; p += 4) {
            pixels[index + p] = newColors[p];
            pixels[index + p + 1] = newColors[p + 1];
            pixels[index + p + 2] = newColors[p + 2];
            pixels[index + p + 3] = newColors[p + 3];
        }

        index += w * 4;
    }
};

Filters._boxBlurVertical = function (pixels, mask, w, h, radius, maskType) {
    var newColors = [];
    var oldPixelOffset = -(radius + 1) * w * 4;
    var newPixelOffset = (radius) * w * 4;

    for (var x = 0; x < w * 4; x += 4) {
        var hits = 0;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        var index = -radius * w * 4 + x;
        for (var y = -radius; y < h; y++) {
            var oldPixel = y - radius - 1;
            if (oldPixel >= 0) {
                if ((maskType == 0) || (maskType == 1 && mask[index + oldPixelOffset + 3] > 0) || (maskType == 2 && mask[index + oldPixelOffset + 3] < 255)) {
                    a -= pixels[index + oldPixelOffset + 3];
                    r -= pixels[index + oldPixelOffset];
                    g -= pixels[index + oldPixelOffset + 1];
                    b -= pixels[index + oldPixelOffset + 2];
                    hits--;
                }

            }

            var newPixel = y + radius;
            if (newPixel < h) {
                if ((maskType == 0) || (maskType == 1 && mask[index + newPixelOffset + 3] > 0) || (maskType == 2 && mask[index + newPixelOffset + 3] < 255)) {
                    a += pixels[index + newPixelOffset + 3];
                    r += pixels[index + newPixelOffset];
                    g += pixels[index + newPixelOffset + 1];
                    b += pixels[index + newPixelOffset + 2];
                    hits++;
                }
            }

            if (y >= 0) {
                if ((maskType == 0) || (maskType == 1 && mask[y * w * 4 + x + 3] > 0) || (maskType == 2 && mask[y * w * 4 + x + 3] < 255)) {
                    if (hits == 0) {
                        newColors[4 * y] = 0;
                        newColors[4 * y + 1] = 0;
                        newColors[4 * y + 2] = 0;
                        newColors[4 * y + 3] = 0;
                    } else {
                        newColors[4 * y] = Math.round(r / hits);
                        newColors[4 * y + 1] = Math.round(g / hits);
                        newColors[4 * y + 2] = Math.round(b / hits);
                        newColors[4 * y + 3] = Math.round(a / hits);
                    }
                } else {
                    newColors[4 * y] = 0;
                    newColors[4 * y + 1] = 0;
                    newColors[4 * y + 2] = 0;
                    newColors[4 * y + 3] = 0;
                }
            }

            index += w * 4;
        }

        for (var y = 0; y < h; y++) {
            pixels[y * w * 4 + x] = newColors[4 * y];
            pixels[y * w * 4 + x + 1] = newColors[4 * y + 1];
            pixels[y * w * 4 + x + 2] = newColors[4 * y + 2];
            pixels[y * w * 4 + x + 3] = newColors[4 * y + 3];
        }
    }
};


Filters.blur = function (canvas, ctx, hRadius, vRadius, iterations, mask, maskType) {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;
    Filters._premultiply(data);
    for (var i = 0; i < iterations; i++) {
        Filters._boxBlurHorizontal(data, mask, canvas.width, canvas.height, Math.floor(hRadius / 2), maskType);
        Filters._boxBlurVertical(data, mask, canvas.width, canvas.height, Math.floor(vRadius / 2), maskType);
    }

    Filters._unpremultiply(data);

    var width = canvas.width;
    var height = canvas.height;
    var retCanvas = createCanvas(width, height);
    var retImg = retCanvas.getContext("2d");
    retImg.putImageData(imgData, 0, 0);
    return retCanvas;
}

Filters._moveRGB = function (width, height, rgb, deltaX, deltaY, fill) {
    var img = createCanvas(width, height);

    var ig = img.getContext("2d");

    Filters._setRGB(ig, 0, 0, width, height, rgb);
    var retImg = createCanvas(width, height);
    retImg.width = width;
    retImg.height = height;
    var g = retImg.getContext("2d");
    g.fillStyle = fill;
    g.globalCompositeOperation = "copy";
    g.fillRect(0, 0, width, height);
    g.drawImage(img, deltaX, deltaY);
    return g.getImageData(0, 0, width, height).data;
};


Filters.FULL = 1;
Filters.INNER = 2;
Filters.OUTER = 3;

Filters._setRGB = function (ctx, x, y, width, height, data) {
    var id = ctx.createImageData(width, height);
    for (var i = 0; i < data.length; i++) {
        id.data[i] = data[i];
    }
    ctx.putImageData(id, x, y);
};

Filters.gradientGlow = function (srcCanvas, src, blurX, blurY, angle, distance, colors, ratios, type, iterations, strength, knockout) {
    var width = canvas.width;
    var height = canvas.height;
    var retCanvas = createCanvas(width, height);
    var retImg = retCanvas.getContext("2d");

    var gradCanvas = createCanvas(256, 1);

    var gradient = gradCanvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, 255, 0);
    for (var s = 0; s < colors.length; s++) {
        var v = "rgba(" + colors[s][0] + "," + colors[s][1] + "," + colors[s][2] + "," + colors[s][3] + ")";
        grd.addColorStop(ratios[s], v);
    }
    gradient.fillStyle = grd;
    gradient.fillRect(0, 0, 256, 1);
    var gradientPixels = gradient.getImageData(0, 0, gradCanvas.width, gradCanvas.height).data;

    var angleRad = angle / 180 * Math.PI;
    var moveX = (distance * Math.cos(angleRad));
    var moveY = (distance * Math.sin(angleRad));
    var srcPixels = src.getImageData(0, 0, width, height).data;
    var shadow = [];
    for (var i = 0; i < srcPixels.length; i += 4) {
        var alpha = srcPixels[i + 3];
        shadow[i] = 0;
        shadow[i + 1] = 0;
        shadow[i + 2] = 0;
        shadow[i + 3] = Math.round(alpha * strength);
    }
    var colorAlpha = "rgba(0,0,0,0)";
    shadow = Filters._moveRGB(width, height, shadow, moveX, moveY, colorAlpha);

    Filters._setRGB(retImg, 0, 0, width, height, shadow);

    var maskType = 0;
    if (type == Filters.INNER) {
        maskType = 1;
    }
    if (type == Filters.OUTER) {
        maskType = 2;
    }


    retCanvas = Filters.blur(retCanvas, retCanvas.getContext("2d"), blurX, blurY, iterations, srcPixels, maskType);
    retImg = retCanvas.getContext("2d");
    shadow = retImg.getImageData(0, 0, width, height).data;

    if (maskType != 0) {
        for (var i = 0; i < srcPixels.length; i += 4) {
            if ((maskType == 1 && srcPixels[i + 3] == 0) || (maskType == 2 && srcPixels[i + 3] == 255)) {
                shadow[i] = 0;
                shadow[i + 1] = 0;
                shadow[i + 2] = 0;
                shadow[i + 3] = 0;
            }
        }
    }


    for (var i = 0; i < shadow.length; i += 4) {
        var a = shadow[i + 3];
        shadow[i] = gradientPixels[a * 4];
        shadow[i + 1] = gradientPixels[a * 4 + 1];
        shadow[i + 2] = gradientPixels[a * 4 + 2];
        shadow[i + 3] = gradientPixels[a * 4 + 3];
    }

    Filters._setRGB(retImg, 0, 0, width, height, shadow);

    if (!knockout) {
        retImg.globalCompositeOperation = "destination-over";
        retImg.drawImage(srcCanvas, 0, 0);
    }

    return retCanvas;
};


Filters.dropShadow = function (canvas, src, blurX, blurY, angle, distance, color, inner, iterations, strength, knockout) {
    var width = canvas.width;
    var height = canvas.height;
    var srcPixels = src.getImageData(0, 0, width, height).data;
    var shadow = [];
    for (var i = 0; i < srcPixels.length; i += 4) {
        var alpha = srcPixels[i + 3];
        if (inner) {
            alpha = 255 - alpha;
        }
        shadow[i] = color[0];
        shadow[i + 1] = color[1];
        shadow[i + 2] = color[2];
        var sa = color[3] * alpha * strength;
        if (sa > 255)
            sa = 255;
        shadow[i + 3] = Math.round(sa);
    }
    var colorFirst = "#000000";
    var colorAlpha = "rgba(0,0,0,0)";
    var angleRad = angle / 180 * Math.PI;
    var moveX = (distance * Math.cos(angleRad));
    var moveY = (distance * Math.sin(angleRad));
    shadow = Filters._moveRGB(width, height, shadow, moveX, moveY, inner ? colorFirst : colorAlpha);


    var retCanvas = createCanvas(canvas.width, canvas.height);
    Filters._setRGB(retCanvas.getContext("2d"), 0, 0, width, height, shadow);
    if (blurX > 0 || blurY > 0) {
        retCanvas = Filters.blur(retCanvas, retCanvas.getContext("2d"), blurX, blurY, iterations, null, 0);
    }
    shadow = retCanvas.getContext("2d").getImageData(0, 0, width, height).data;

    var srcPixels = src.getImageData(0, 0, width, height).data;
    for (var i = 0; i < shadow.length; i += 4) {
        var mask = srcPixels[i + 3];
        if (!inner) {
            mask = 255 - mask;
        }
        shadow[i + 3] = mask * shadow[i + 3] / 255;
    }
    Filters._setRGB(retCanvas.getContext("2d"), 0, 0, width, height, shadow);

    if (!knockout) {
        var g = retCanvas.getContext("2d");
        g.globalCompositeOperation = "destination-over";
        g.drawImage(canvas, 0, 0);
    }

    return retCanvas;
};

Filters._cut = function (a, min, max) {
    if (a > max)
        a = max;
    if (a < min)
        a = min;
    return a;
}

Filters.gradientBevel = function (canvas, src, colors, ratios, blurX, blurY, strength, type, angle, distance, knockout, iterations) {
    var width = canvas.width;
    var height = canvas.height;
    var retImg = createCanvas(width, height);
    var srcPixels = src.getImageData(0, 0, width, height).data;

    var gradient = createCanvas(512, 1);
    var gg = gradient.getContext("2d");

    var grd = ctx.createLinearGradient(0, 0, 511, 0);
    for (var s = 0; s < colors.length; s++) {
        var v = "rgba(" + colors[s][0] + "," + colors[s][1] + "," + colors[s][2] + "," + colors[s][3] + ")";
        grd.addColorStop(ratios[s], v);
    }
    gg.fillStyle = grd;
    gg.globalCompositeOperation = "copy";
    gg.fillRect(0, 0, gradient.width, gradient.height);
    var gradientPixels = gg.getImageData(0, 0, gradient.width, gradient.height).data;


    if (type != Filters.OUTER) {
        var hilightIm = Filters.dropShadow(canvas, src, 0, 0, angle, distance, [255, 0, 0, 1], true, iterations, strength, true);
        var shadowIm = Filters.dropShadow(canvas, src, 0, 0, angle + 180, distance, [0, 0, 255, 1], true, iterations, strength, true);
        var h2 = createCanvas(width, height);
        var s2 = createCanvas(width, height);
        var hc = h2.getContext("2d");
        var sc = s2.getContext("2d");
        hc.drawImage(hilightIm, 0, 0);
        hc.globalCompositeOperation = "destination-out";
        hc.drawImage(shadowIm, 0, 0);

        sc.drawImage(shadowIm, 0, 0);
        sc.globalCompositeOperation = "destination-out";
        sc.drawImage(hilightIm, 0, 0);
        var shadowInner = s2;
        var hilightInner = h2;
    }
    if (type != Filters.INNER) {
        var hilightIm = Filters.dropShadow(canvas, src, 0, 0, angle + 180, distance, [255, 0, 0, 1], false, iterations, strength, true);
        var shadowIm = Filters.dropShadow(canvas, src, 0, 0, angle, distance, [0, 0, 255, 1], false, iterations, strength, true);
        var h2 = createCanvas(width, height);
        var s2 = createCanvas(width, height);
        var hc = h2.getContext("2d");
        var sc = s2.getContext("2d");
        hc.drawImage(hilightIm, 0, 0);
        hc.globalCompositeOperation = "destination-out";
        hc.drawImage(shadowIm, 0, 0);

        sc.drawImage(shadowIm, 0, 0);
        sc.globalCompositeOperation = "destination-out";
        sc.drawImage(hilightIm, 0, 0);
        var shadowOuter = s2;
        var hilightOuter = h2;
    }

    var hilightIm;
    var shadowIm;
    switch (type) {
        case Filters.OUTER:
            hilightIm = hilightOuter;
            shadowIm = shadowOuter;
            break;
        case Filters.INNER:
            hilightIm = hilightInner;
            shadowIm = shadowInner;
            break;
        case Filters.FULL:
            hilightIm = hilightInner;
            shadowIm = shadowInner;
            var hc = hilightIm.getContext("2d");
            hc.globalCompositeOperation = "source-over";
            hc.drawImage(hilightOuter, 0, 0);
            var sc = shadowIm.getContext("2d");
            sc.globalCompositeOperation = "source-over";
            sc.drawImage(shadowOuter, 0, 0);
            break;
    }

    var maskType = 0;
    if (type == Filters.INNER) {
        maskType = 1;
    }
    if (type == Filters.OUTER) {
        maskType = 2;
    }

    var retc = retImg.getContext("2d");
    retc.fillStyle = "#000000";
    retc.fillRect(0, 0, width, height);
    retc.drawImage(shadowIm, 0, 0);
    retc.drawImage(hilightIm, 0, 0);

    retImg = Filters.blur(retImg, retImg.getContext("2d"), blurX, blurY, iterations, srcPixels, maskType);
    var ret = retImg.getContext("2d").getImageData(0, 0, width, height).data;

    for (var i = 0; i < srcPixels.length; i += 4) {
        var ah = ret[i] * strength;
        var as = ret[i + 2] * strength;
        var ra = Filters._cut(ah - as, -255, 255);
        ret[i] = gradientPixels[4 * (255 + ra)];
        ret[i + 1] = gradientPixels[4 * (255 + ra) + 1];
        ret[i + 2] = gradientPixels[4 * (255 + ra) + 2];
        ret[i + 3] = gradientPixels[4 * (255 + ra) + 3];
    }
    Filters._setRGB(retImg.getContext("2d"), 0, 0, width, height, ret);


    if (!knockout) {
        var g = retImg.getContext("2d");
        g.globalCompositeOperation = "destination-over";
        g.drawImage(canvas, 0, 0);
    }
    return retImg;
}
Filters.bevel = function (canvas, src, blurX, blurY, strength, type, highlightColor, shadowColor, angle, distance, knockout, iterations) {
    return Filters.gradientBevel(canvas, src, [
        shadowColor,
        [shadowColor[0], shadowColor[1], shadowColor[2], 0],
        [highlightColor[0], highlightColor[1], highlightColor[2], 0],
        highlightColor
    ], [0, 127 / 255, 128 / 255, 1], blurX, blurY, strength, type, angle, distance, knockout, iterations);
}


//http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
Filters.convolution = function (canvas, ctx, weights, opaque) {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var outCanvas = createCanvas(w, h);
    var outCtx = outCanvas.getContext("2d");
    var output = outCtx.getImageData(0, 0, w, h);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r = 0, g = 0, b = 0, a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy * sw + scx) * 4;
                        var wt = weights[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a += src[srcOff + 3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    outCtx.putImageData(output, 0, 0);
    return outCanvas;
};

Filters.colorMatrix = function (canvas, ctx, m) {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = pixels.data;
    for (var i = 0; i < data.length; i += 4) {
        var r = i;
        var g = i + 1;
        var b = i + 2;
        var a = i + 3;

        var oR = data[r];
        var oG = data[g];
        var oB = data[b];
        var oA = data[a];

        data[r] = (m[0] * oR) + (m[1] * oG) + (m[2] * oB) + (m[3] * oA) + m[4];
        data[g] = (m[5] * oR) + (m[6] * oG) + (m[7] * oB) + (m[8] * oA) + m[9];
        data[b] = (m[10] * oR) + (m[11] * oG) + (m[12] * oB) + (m[13] * oA) + m[14];
        data[a] = (m[15] * oR) + (m[16] * oG) + (m[17] * oB) + (m[18] * oA) + m[19];
    }
    var outCanvas = createCanvas(canvas.width, canvas.height);
    var outCtx = outCanvas.getContext("2d");
    outCtx.putImageData(pixels, 0, 0);
    return outCanvas;
};


Filters.glow = function (canvas, src, blurX, blurY, strength, color, inner, knockout, iterations) {
    return Filters.dropShadow(canvas, src, blurX, blurY, 45, 0, color, inner, iterations, strength, knockout);
};


var BlendModes = {};

BlendModes._cut = function (v) {
    if (v < 0)
        v = 0;
    if (v > 255)
        v = 255;
    return v;
};

BlendModes.normal = function (src, dst, result, pos) {
    var am = (255 - src[pos + 3]) / 255;
    result[pos] = this._cut(src[pos] * src[pos + 3] / 255 + dst[pos] * dst[pos + 3] / 255 * am);
    result[pos + 1] = this._cut(src[pos + 1] * src[pos + 3] / 255 + dst[pos + 1] * dst[pos + 3] / 255 * am);
    result[pos + 2] = this._cut(src[pos + 2] * src[pos + 3] / 255 + dst[pos + 2] * dst[pos + 3] / 255 * am);
    result[pos + 3] = this._cut(src[pos + 3] + dst[pos + 3] * am);
};

BlendModes.layer = function (src, dst, result, pos) {
    BlendModes.normal(src, dst, result, pos);
};

BlendModes.multiply = function (src, dst, result, pos) {
    result[pos + 0] = (src[pos + 0] * dst[pos + 0]) >> 8;
    result[pos + 1] = (src[pos + 1] * dst[pos + 1]) >> 8;
    result[pos + 2] = (src[pos + 2] * dst[pos + 2]) >> 8;
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3] - (src[pos + 3] * dst[pos + 3]) / 255);
};

BlendModes.screen = function (src, dst, result, pos) {
    result[pos + 0] = 255 - ((255 - src[pos + 0]) * (255 - dst[pos + 0]) >> 8);
    result[pos + 1] = 255 - ((255 - src[pos + 1]) * (255 - dst[pos + 1]) >> 8);
    result[pos + 2] = 255 - ((255 - src[pos + 2]) * (255 - dst[pos + 2]) >> 8);
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3] - (src[pos + 3] * dst[pos + 3]) / 255);
};

BlendModes.lighten = function (src, dst, result, pos) {
    result[pos + 0] = Math.max(src[pos + 0], dst[pos + 0]);
    result[pos + 1] = Math.max(src[pos + 1], dst[pos + 1]);
    result[pos + 2] = Math.max(src[pos + 2], dst[pos + 2]);
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3] - (src[pos + 3] * dst[pos + 3]) / 255);
};

BlendModes.darken = function (src, dst, result, pos) {
    result[pos + 0] = Math.min(src[pos + 0], dst[pos + 0]);
    result[pos + 1] = Math.min(src[pos + 1], dst[pos + 1]);
    result[pos + 2] = Math.min(src[pos + 2], dst[pos + 2]);
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3] - (src[pos + 3] * dst[pos + 3]) / 255);
};

BlendModes.difference = function (src, dst, result, pos) {
    result[pos + 0] = Math.abs(dst[pos + 0] - src[pos + 0]);
    result[pos + 1] = Math.abs(dst[pos + 1] - src[pos + 1]);
    result[pos + 2] = Math.abs(dst[pos + 2] - src[pos + 2]);
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3] - (src[pos + 3] * dst[pos + 3]) / 255);
};

BlendModes.add = function (src, dst, result, pos) {
    result[pos + 0] = Math.min(255, src[pos + 0] + dst[pos + 0]);
    result[pos + 1] = Math.min(255, src[pos + 1] + dst[pos + 1]);
    result[pos + 2] = Math.min(255, src[pos + 2] + dst[pos + 2]);
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3]);
};

BlendModes.subtract = function (src, dst, result, pos) {
    result[pos + 0] = Math.max(0, src[pos + 0] + dst[pos + 0] - 256);
    result[pos + 1] = Math.max(0, src[pos + 1] + dst[pos + 1] - 256);
    result[pos + 2] = Math.max(0, src[pos + 2] + dst[pos + 2] - 256);
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3] - (src[pos + 3] * dst[pos + 3]) / 255);
};

BlendModes.invert = function (src, dst, result, pos) {
    result[pos + 0] = 255 - dst[pos + 0];
    result[pos + 1] = 255 - dst[pos + 1];
    result[pos + 2] = 255 - dst[pos + 2];
    result[pos + 3] = src[pos + 3];
};

BlendModes.alpha = function (src, dst, result, pos) {
    result[pos + 0] = src[pos + 0];
    result[pos + 1] = src[pos + 1];
    result[pos + 2] = src[pos + 2];
    result[pos + 3] = dst[pos + 3]; //?
};

BlendModes.erase = function (src, dst, result, pos) {
    result[pos + 0] = src[pos + 0];
    result[pos + 1] = src[pos + 1];
    result[pos + 2] = src[pos + 2];
    result[pos + 3] = 255 - dst[pos + 3]; //?
};

BlendModes.overlay = function (src, dst, result, pos) {
    result[pos + 0] = dst[pos + 0] < 128 ? dst[pos + 0] * src[pos + 0] >> 7
            : 255 - ((255 - dst[pos + 0]) * (255 - src[pos + 0]) >> 7);
    result[pos + 1] = dst[pos + 1] < 128 ? dst[pos + 1] * src[pos + 1] >> 7
            : 255 - ((255 - dst[pos + 1]) * (255 - src[pos + 1]) >> 7);
    result[pos + 2] = dst[pos + 2] < 128 ? dst[pos + 2] * src[pos + 2] >> 7
            : 255 - ((255 - dst[pos + 2]) * (255 - src[pos + 2]) >> 7);
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3] - (src[pos + 3] * dst[pos + 3]) / 255);
};

BlendModes.hardlight = function (src, dst, result, pos) {
    result[pos + 0] = src[pos + 0] < 128 ? dst[pos + 0] * src[pos + 0] >> 7
            : 255 - ((255 - src[pos + 0]) * (255 - dst[pos + 0]) >> 7);
    result[pos + 1] = src[pos + 1] < 128 ? dst[pos + 1] * src[pos + 1] >> 7
            : 255 - ((255 - src[pos + 1]) * (255 - dst[pos + 1]) >> 7);
    result[pos + 2] = src[pos + 2] < 128 ? dst[pos + 2] * src[pos + 2] >> 7
            : 255 - ((255 - src[pos + 2]) * (255 - dst[pos + 2]) >> 7);
    result[pos + 3] = Math.min(255, src[pos + 3] + dst[pos + 3] - (src[pos + 3] * dst[pos + 3]) / 255);
};

BlendModes._list = [
    BlendModes.normal,
    BlendModes.normal,
    BlendModes.layer,
    BlendModes.multiply,
    BlendModes.screen,
    BlendModes.lighten,
    BlendModes.darken,
    BlendModes.difference,
    BlendModes.add,
    BlendModes.subtract,
    BlendModes.invert,
    BlendModes.alpha,
    BlendModes.erase,
    BlendModes.overlay,
    BlendModes.hardlight
];

BlendModes.blendData = function (srcPixel, dstPixel, retData, modeIndex) {
    var result = [];
    var retPixel = [];
    var alpha = 1.0;
    for (var i = 0; i < retData.length; i += 4) {
        this._list[modeIndex](srcPixel, dstPixel, result, i);

        retPixel[i + 0] = this._cut(dstPixel[i + 0] + (result[i + 0] - dstPixel[i + 0]) * alpha);
        retPixel[i + 1] = this._cut(dstPixel[i + 1] + (result[i + 1] - dstPixel[i + 1]) * alpha);
        retPixel[i + 2] = this._cut(dstPixel[i + 2] + (result[i + 2] - dstPixel[i + 2]) * alpha);
        retPixel[i + 3] = this._cut(dstPixel[i + 3] + (result[i + 3] - dstPixel[i + 3]) * alpha);

        var af = srcPixel[i + 3] / 255;
        retData[i + 0] = this._cut((1 - af) * dstPixel[i + 0] + af * retPixel[i + 0]);
        retData[i + 1] = this._cut((1 - af) * dstPixel[i + 1] + af * retPixel[i + 1]);
        retData[i + 2] = this._cut((1 - af) * dstPixel[i + 2] + af * retPixel[i + 2]);
        retData[i + 3] = this._cut((1 - af) * dstPixel[i + 3] + af * retPixel[i + 3]);
    }
};

BlendModes.blendCanvas = function (src, dst, result, modeIndex) {
    var width = src.width;
    var height = src.height;
    var rctx = result.getContext("2d");
    var sctx = src.getContext("2d");
    var dctx = dst.getContext("2d");
    var ridata = rctx.getImageData(0, 0, width, height);
    var sidata = sctx.getImageData(0, 0, width, height);
    var didata = dctx.getImageData(0, 0, width, height);

    this.blendData(sidata.data, didata.data, ridata.data, modeIndex);
    rctx.putImageData(ridata, 0, 0);
};


function concatMatrix(m1, m2) {
    var result = [1, 0, 0, 1, 0, 0];
    var scaleX = 0;
    var rotateSkew0 = 1;
    var rotateSkew1 = 2;
    var scaleY = 3;
    var translateX = 4;
    var translateY = 5;

    result[scaleX] = m2[scaleX] * m1[scaleX] + m2[rotateSkew1] * m1[rotateSkew0];
    result[rotateSkew0] = m2[rotateSkew0] * m1[scaleX] + m2[scaleY] * m1[rotateSkew0];
    result[rotateSkew1] = m2[scaleX] * m1[rotateSkew1] + m2[rotateSkew1] * m1[scaleY];
    result[scaleY] = m2[rotateSkew0] * m1[rotateSkew1] + m2[scaleY] * m1[scaleY];
    result[translateX] = m2[scaleX] * m1[translateX] + m2[rotateSkew1] * m1[translateY] + m2[translateX];
    result[translateY] = m2[rotateSkew0] * m1[translateX] + m2[scaleY] * m1[translateY] + m2[translateY];

    return result;
}

var enhanceContext = function (context) {
    var m = [1, 0, 0, 1, 0, 0];
    context._matrix = m;

    //the stack of saved matrices
    context._savedMatrices = [m]; //[[m]];

    var super_ = context.__proto__;
    context.__proto__ = ({
        save: function () {
            this._savedMatrices.push(this._matrix); //.slice()
            super_.save.call(this);
        },
        //if the stack of matrices we're managing doesn't have a saved matrix,
        //we won't even call the context's original `restore` method.
        restore: function () {
            if (this._savedMatrices.length == 0)
                return;
            super_.restore.call(this);
            this._matrix = this._savedMatrices.pop();
        },
        scale: function (x, y) {
            super_.scale.call(this, x, y);
        },
        rotate: function (theta) {
            super_.rotate.call(this, theta);
        },
        translate: function (x, y) {
            super_.translate.call(this, x, y);
        },
        transform: function (a, b, c, d, e, f) {
            this._matrix = concatMatrix([a, b, c, d, e, f], this._matrix);
            super_.transform.call(this, a, b, c, d, e, f);
        },
        setTransform: function (a, b, c, d, e, f) {
            this._matrix = [a, b, c, d, e, f];
            super_.setTransform.call(this, a, b, c, d, e, f);
        },
        resetTransform: function () {
            super_.resetTransform.call(this);
        },
        applyTransforms: function (m) {
            this.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
        },
        applyTransformToPoint: function (p) {
            var ret = {};
            ret.x = this._matrix[0] * p.x + this._matrix[2] * p.y + this._matrix[4];
            ret.y = this._matrix[1] * p.x + this._matrix[3] * p.y + this._matrix[5];
            return ret;
        },
        __proto__: super_
    });

    return context;
};
var cxform = function (r_add, g_add, b_add, a_add, r_mult, g_mult, b_mult, a_mult) {
    this.r_add = r_add;
    this.g_add = g_add;
    this.b_add = b_add;
    this.a_add = a_add;
    this.r_mult = r_mult;
    this.g_mult = g_mult;
    this.b_mult = b_mult;
    this.a_mult = a_mult;
    this._cut = function (v, min, max) {
        if (v < min)
            v = min;
        if (v > max)
            v = max;
        return v;
    };
    this.apply = function (c) {
        var d = c;
        d[0] = this._cut(Math.round(d[0] * this.r_mult / 255 + this.r_add), 0, 255);
        d[1] = this._cut(Math.round(d[1] * this.g_mult / 255 + this.g_add), 0, 255);
        d[2] = this._cut(Math.round(d[2] * this.b_mult / 255 + this.b_add), 0, 255);
        d[3] = this._cut(d[3] * this.a_mult / 255 + this.a_add / 255, 0, 1);
        return d;
    };
    this.applyToImage = function (fimg) {
        if (this.isEmpty()) {
            return fimg
        }
        ;
        var icanvas = createCanvas(fimg.width, fimg.height);
        var ictx = icanvas.getContext("2d");
        ictx.drawImage(fimg, 0, 0);
        var imdata = ictx.getImageData(0, 0, icanvas.width, icanvas.height);
        var idata = imdata.data;
        for (var i = 0; i < idata.length; i += 4) {
            var c = this.apply([idata[i], idata[i + 1], idata[i + 2], idata[i + 3] / 255]);
            idata[i] = c[0];
            idata[i + 1] = c[1];
            idata[i + 2] = c[2];
            idata[i + 3] = Math.round(c[3] * 255);
        }
        ictx.putImageData(imdata, 0, 0);
        return icanvas;
    };
    this.merge = function (cx) {
        return new cxform(this.r_add + cx.r_add, this.g_add + cx.g_add, this.b_add + cx.b_add, this.a_add + cx.a_add, this.r_mult * cx.r_mult / 255, this.g_mult * cx.g_mult / 255, this.b_mult * cx.b_mult / 255, this.a_mult * cx.a_mult / 255);
    };
    this.isEmpty = function () {
        return this.r_add == 0 && this.g_add == 0 && this.b_add == 0 && this.a_add == 0 && this.r_mult == 255 && this.g_mult == 255 && this.b_mult == 255 && this.a_mult == 255;
    };
};

var placeRaw = function (obj, canvas, ctx, matrix, ctrans, blendMode, frame, ratio, time) {
    ctx.save();
    ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    if (blendMode > 1) {
        var oldctx = ctx;
        var ncanvas = createCanvas(canvas.width, canvas.height);
        ctx = ncanvas.getContext("2d");
        enhanceContext(ctx);
        ctx.applyTransforms(oldctx._matrix);
    }
    if (blendMode > 1) {
        eval(obj + "(ctx,new cxform(0,0,0,0,255,255,255,255),frame,ratio,time);");
    } else {
        eval(obj + "(ctx,ctrans,frame,ratio,time);");
    }
    if (blendMode > 1) {
        BlendModes.blendCanvas(ctrans.applyToImage(ncanvas), canvas, canvas, blendMode);
        ctx = oldctx;
    }
    ctx.restore();
}

var transformPoint = function (matrix, p) {
    var ret = {};
    ret.x = matrix[0] * p.x + matrix[2] * p.y + matrix[4];
    ret.y = matrix[1] * p.x + matrix[3] * p.y + matrix[5];
    return ret;
}

var transformRect = function (matrix, rect) {
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;
    var point = transformPoint(matrix, {x: rect.xMin, y: rect.yMin});
    if (point.x < minX) {
        minX = point.x;
    }
    if (point.x > maxX) {
        maxX = point.x;
    }
    if (point.y < minY) {
        minY = point.y;
    }
    if (point.y > maxY) {
        maxY = point.y;
    }
    point = transformPoint(matrix, {x: rect.xMax, y: rect.yMin});
    if (point.x < minX) {
        minX = point.x;
    }
    if (point.x > maxX) {
        maxX = point.x;
    }
    if (point.y < minY) {
        minY = point.y;
    }
    if (point.y > maxY) {
        maxY = point.y;
    }
    point = transformPoint(matrix, {x: rect.xMin, y: rect.yMax});
    if (point.x < minX) {
        minX = point.x;
    }
    if (point.x > maxX) {
        maxX = point.x;
    }
    if (point.y < minY) {
        minY = point.y;
    }
    if (point.y > maxY) {
        maxY = point.y;
    }
    point = transformPoint(matrix, {x: rect.xMax, y: rect.yMax});
    if (point.x < minX) {
        minX = point.x;
    }
    if (point.x > maxX) {
        maxX = point.x;
    }
    if (point.y < minY) {
        minY = point.y;
    }
    if (point.y > maxY) {
        maxY = point.y;
    }
    return {xMin: minX, xMax: maxX, yMin: minY, yMax: maxY};
}

var getTranslateMatrix = function (translateX, translateY) {
    return [1, 0, 0, 1, translateX, translateY];
}

var getRectWidth = function (rect) {
    return rect.xMax - rect.xMin;
}

var getRectHeight = function (rect) {
    return rect.yMax - rect.yMin;
}

var rint = function (v) {
    return Math.round(v);
}

var scaleMatrix = function (m, factorX, factorY) {
    var scaleX = 0;
    var rotateSkew0 = 1;
    var rotateSkew1 = 2;
    var scaleY = 3;
    var translateX = 4;
    var translateY = 5;

    var m2 = Object.assign({}, m);

    m2[scaleX] *= factorX;
    m2[scaleY] *= factorY;
    m2[rotateSkew0] *= factorX;
    m2[rotateSkew1] *= factorY;
    return m2;
}

var translateMatrix = function (m, x, y) {
    var m2 = Object.assign({}, m);
    var scaleX = 0;
    var rotateSkew0 = 1;
    var rotateSkew1 = 2;
    var scaleY = 3;
    var translateX = 4;
    var translateY = 5;

    m2[translateX] = m2[scaleX] * x + m2[rotateSkew1] * y + m2[translateX];
    m2[translateY] = m2[rotateSkew0] * x + m2[scaleY] * y + m2[translateY];

    return m2;
}

var place = function (obj, canvas, ctx, matrix, ctrans, blendMode, frame, ratio, time) {
    if ((typeof scalingGrids[obj]) !== "undefined") {
        var swfScaleMatrix = [1 / 20, 0, 0, 1 / 20, 0, 0];
        var boundRect = boundRects[obj];
        var scalingRect = scalingGrids[obj];
        var exRect = boundRect;
        var newRect = exRect;
        var transform = matrix;

        var transform2;
        newRect = transformRect(transform, exRect);
        transform = Object.assign({}, transform);

        transform = getTranslateMatrix(newRect.xMin, newRect.yMin);

        transform = concatMatrix(swfScaleMatrix, transform);

        var scaleWidth = getRectWidth(newRect) * 20 - scalingRect.xMin - (boundRect.xMax - scalingRect.xMax);
        var originalWidth = getRectWidth(boundRect) - scalingRect.xMin - (boundRect.xMax - scalingRect.xMax);
        var scaleX = scaleWidth / originalWidth;

        var scaleHeight = getRectHeight(newRect) * 20 - scalingRect.yMin - (boundRect.yMax - scalingRect.yMax);
        var originalHeight = getRectHeight(boundRect) - scalingRect.yMin - (boundRect.yMax - scalingRect.yMax);
        var scaleY = scaleHeight / originalHeight;


        //top left
        ctx.save();
        drawPath(ctx, ""
                + "M " + newRect.xMin + " " + newRect.yMin + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + newRect.yMin + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + newRect.xMin + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " Z"
                );
        ctx.clip();
        placeRaw(obj, canvas, ctx, transform, ctrans, blendMode, frame, ratio, time);

        ctx.restore();

        //bottom left
        transform2 = Object.assign({}, transform);
        transform2[5] /*translateY*/ += getRectHeight(newRect) - getRectHeight(boundRect) / 20;

        ctx.save();

        drawPath(ctx, "M " + newRect.xMin + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + newRect.yMax + " "
                + "L " + newRect.xMin + " " + newRect.yMax + " Z"
                )
        ctx.clip();

        placeRaw(obj, canvas, ctx, transform2, ctrans, blendMode, frame, ratio, time);
        ctx.restore();

        //top right
        transform2 = Object.assign({}, transform);
        transform2[4] /*translateX*/ += getRectWidth(newRect) - getRectWidth(boundRect) / 20;
        ctx.save();
        drawPath(ctx, "M " + (newRect.xMax - rint((exRect.xMax - scalingRect.xMax) / 20)) + " " + newRect.yMin + " "
                + "L " + newRect.xMax + " " + newRect.yMin + " "
                + "L " + newRect.xMax + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + (newRect.xMax - rint((exRect.xMax - scalingRect.xMax) / 20)) + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " Z");

        ctx.clip();

        placeRaw(obj, canvas, ctx, transform2, ctrans, blendMode, frame, ratio, time);
        ctx.restore();

        //bottom right
        transform2 = Object.assign({}, transform);
        transform2[4] /*translateX*/ += getRectWidth(newRect) - getRectWidth(boundRect) / 20;
        transform2[5] /*translateY*/ += getRectHeight(newRect) - getRectHeight(boundRect) / 20;
        ctx.save();
        drawPath(ctx, "M " + (newRect.xMax - rint((exRect.xMax - scalingRect.xMax) / 20)) + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + newRect.xMax + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + newRect.xMax + " " + newRect.yMax + " "
                + "L " + (newRect.xMax - rint((exRect.xMax - scalingRect.xMax) / 20)) + " " + newRect.yMax + " Z");

        ctx.clip();

        placeRaw(obj, canvas, ctx, transform2, ctrans, blendMode, frame, ratio, time);
        ctx.restore();


        //top
        transform2 = Object.assign({}, transform);
        ctx.save();
        transform2 = translateMatrix(transform2, scalingRect.xMin, 0);
        transform2 = scaleMatrix(transform2, scaleX, 1);
        transform2 = translateMatrix(transform2, -scalingRect.xMin, 0);

        drawPath(ctx, "M " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + newRect.yMin + " "
                + "L " + (newRect.xMax - rint((boundRect.xMax - scalingRect.xMax) / 20)) + " " + newRect.yMin + " "
                + "L " + (newRect.xMax - rint((boundRect.xMax - scalingRect.xMax) / 20)) + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " Z");

        ctx.clip();
        placeRaw(obj, canvas, ctx, transform2, ctrans, blendMode, frame, ratio, time);
        ctx.restore();

        //left
        transform2 = Object.assign({}, transform);
        ctx.save();
        transform2 = translateMatrix(transform2, 0, scalingRect.yMin);
        transform2 = scaleMatrix(transform2, 1, scaleY);
        transform2 = translateMatrix(transform2, 0, -scalingRect.yMin);

        drawPath(ctx, "M " + newRect.xMin + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + newRect.xMin + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " Z");

        ctx.clip();
        placeRaw(obj, canvas, ctx, transform2, ctrans, blendMode, frame, ratio, time);
        ctx.restore();

        //bottom
        transform2 = Object.assign({}, transform);
        ctx.save();
        transform2 = translateMatrix(transform2, scalingRect.xMin, 0);
        transform2 = scaleMatrix(transform2, scaleX, 1);
        transform2 = translateMatrix(transform2, -scalingRect.xMin, 0);

        transform2 = translateMatrix(transform2, 0, getRectHeight(newRect) * 20 - getRectHeight(boundRect));

        drawPath(ctx, "M " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + (newRect.xMax - rint((boundRect.xMax - scalingRect.xMax) / 20)) + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + (newRect.xMax - rint((boundRect.xMax - scalingRect.xMax) / 20)) + " " + newRect.yMax + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + newRect.yMax + " Z");

        ctx.clip();
        placeRaw(obj, canvas, ctx, transform2, ctrans, blendMode, frame, ratio, time);
        ctx.restore();

        //right
        transform2 = Object.assign({}, transform);
        ctx.save();
        transform2 = translateMatrix(transform2, 0, scalingRect.yMin)
        transform2 = scaleMatrix(transform2, 1, scaleY);
        transform2 = translateMatrix(transform2, 0, -scalingRect.yMin);

        transform2 = translateMatrix(transform2, getRectWidth(newRect) * 20 - getRectWidth(boundRect), 0);

        drawPath(ctx, "M " + (newRect.xMax - rint((boundRect.xMax - scalingRect.xMax) / 20)) + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + newRect.xMax + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + newRect.xMax + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + (newRect.xMax - rint((boundRect.xMax - scalingRect.xMax) / 20)) + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " Z");

        ctx.clip();
        placeRaw(obj, canvas, ctx, transform2, ctrans, blendMode, frame, ratio, time);
        ctx.restore();

        //center
        transform2 = Object.assign({}, transform);
        ctx.save();
        transform2 = translateMatrix(transform2, scalingRect.xMin, scalingRect.yMin)
        transform2 = scaleMatrix(transform2, scaleX, scaleY);
        transform2 = translateMatrix(transform2, -scalingRect.xMin, -scalingRect.yMin);

        drawPath(ctx, "M " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + (newRect.xMax - rint((boundRect.xMax - scalingRect.xMax) / 20)) + " " + (newRect.yMin + rint(scalingRect.yMin / 20)) + " "
                + "L " + (newRect.xMax - rint((boundRect.xMax - scalingRect.xMax) / 20)) + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " "
                + "L " + (newRect.xMin + rint(scalingRect.xMin / 20)) + " " + (newRect.yMax - rint((boundRect.yMax - scalingRect.yMax) / 20)) + " Z");

        ctx.clip();
        placeRaw(obj, canvas, ctx, transform2, ctrans, blendMode, frame, ratio, time);
        ctx.restore();
        return;
    }
    placeRaw(obj, canvas, ctx, matrix, ctrans, blendMode, frame, ratio, time);
}

var tocolor = function (c) {
    var r = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] + ")";
    return r;
};


function drawMorphPath(ctx, p, ratio, doStroke, scaleMode) {
    var parts = p.split(" ");
    var len = parts.length;
    if (doStroke) {
        for (var i = 0; i < len; i++) {
            switch (parts[i]) {
                case '':
                    break;
                case 'L':
                case 'M':
                case 'Q':
                    break;
                default:
                    var k = ctx.applyTransformToPoint({x: parts[i], y: parts[i + 2]});
                    parts[i] = k.x;
                    parts[i + 2] = k.y;
                    k = ctx.applyTransformToPoint({x: parts[i + 1], y: parts[i + 3]});
                    parts[i + 1] = k.x;
                    parts[i + 3] = k.y;
                    i += 3;
            }
        }

        switch (scaleMode) {
            case "NONE":
                break;
            case "NORMAL":
                ctx.lineWidth *= 20 * Math.max(ctx._matrix[0], ctx._matrix[3]);
                break;
            case "VERTICAL":
                ctx.lineWidth *= 20 * ctx._matrix[3];
                break;
            case "HORIZONTAL":
                ctx.lineWidth *= 20 * ctx._matrix[0];
                break;
        }

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    ctx.beginPath();
    var drawCommand = "";
    for (var i = 0; i < len; i++) {
        switch (parts[i]) {
            case 'L':
            case 'M':
            case 'Q':
                drawCommand = parts[i];
                break;
            default:
                switch (drawCommand) {
                    case 'L':
                        ctx.lineTo(useRatio(parts[i], parts[i + 1], ratio), useRatio(parts[i + 2], parts[i + 3], ratio));
                        i += 3;
                        break;
                    case 'M':
                        ctx.moveTo(useRatio(parts[i], parts[i + 1], ratio), useRatio(parts[i + 2], parts[i + 3], ratio));
                        i += 3;
                        break;
                    case 'Q':
                        ctx.quadraticCurveTo(useRatio(parts[i], parts[i + 1], ratio), useRatio(parts[i + 2], parts[i + 3], ratio),
                                useRatio(parts[i + 4], parts[i + 5], ratio), useRatio(parts[i + 6], parts[i + 7], ratio));
                        i += 7;
                        break;
                }
                break;
        }
    }
    if (doStroke) {
        ctx.stroke();
        ctx.restore();
    }
}

function useRatio(v1, v2, ratio) {
    return v1 * 1 + (v2 - v1) * ratio / 65535;
}

function drawPath(ctx, p, doStroke, scaleMode) {
//console.log("drawing "+p)
    var parts = p.split(" ");
    var len = parts.length;
    if (doStroke) {
        for (var i = 0; i < len; i++) {
            switch (parts[i]) {
                case 'L':
                case 'M':
                case 'Q':
                case 'Z':
                    break;
                default:
                    var k = ctx.applyTransformToPoint({x: parts[i], y: parts[i + 1]});
                    parts[i] = k.x;
                    parts[i + 1] = k.y;
                    i++;
            }
        }

        switch (scaleMode) {
            case "NONE":
                break;
            case "NORMAL":
                ctx.lineWidth *= 20 * Math.max(ctx._matrix[0], ctx._matrix[3]);
                break;
            case "VERTICAL":
                ctx.lineWidth *= 20 * ctx._matrix[3];
                break;
            case "HORIZONTAL":
                ctx.lineWidth *= 20 * ctx._matrix[0];
                break;
        }

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    ctx.beginPath();
    var drawCommand = "";
    for (var i = 0; i < len; i++) {
        switch (parts[i]) {
            case 'L':
            case 'M':
            case 'Q':
                drawCommand = parts[i];
                break;
            case 'Z':
                ctx.closePath();
                break;
            default:
                switch (drawCommand) {
                    case 'L':
                        ctx.lineTo(parts[i], parts[i + 1]);
                        i++;
                        break;
                    case 'M':
                        ctx.moveTo(parts[i], parts[i + 1]);
                        i++;
                        break;
                    case 'Q':
                        ctx.quadraticCurveTo(parts[i], parts[i + 1], parts[i + 2], parts[i + 3]);
                        i += 3;
                        break;
                }
                break;
        }
    }
    if (doStroke) {
        ctx.stroke();
        ctx.restore();
    }
}

var imageObj1 = document.createElement("img");
imageObj1.src="data:image/JPEG;base64,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BAAAAHg4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0ECgAAAAAAAQAAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADeQAAAAYAAAAAAAAAAAAAAOEAAAQEAAAAIgBOAGkAcABpAGMAXwAxADYANgAzADUANQA1AF8AMgAwADEAMQAwADMAMwAxADEANwA0ADMANQA5ADQANgA0ADAAMAAwAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAQEAAAA4QAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAA4QAAAABSZ2h0bG9uZwAABAQAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAOEAAAAAUmdodGxvbmcAAAQEAAAAA3VybFRFWFQAAAABAAAA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dW1lbnRJRD0iMTFFM0Y5NTg1QjUwM0IwMTkzMEVEOUFBNjkwQThDMUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM4MUZEREVBMkYwRTAxMUEyNTRDQzczN0VCMTA0ODIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMTFFM0Y5NTg1QjUwM0IwMTkzMEVEOUFBNjkwQThDMUMiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxMS0xMC0wNlQxOTo1Mjo1NSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTEtMTAtMDdUMTM6MzA6MzMrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTEtMTAtMDdUMTM6MzA6MzMrMDg6MDAiIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6QUI4MUZEREVBMkYwRTAxMUEyNTRDQzczN0VCMTA0ODIiIHN0RXZ0OndoZW49IjIwMTEtMTAtMDdUMTM6MzA6MzMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6QUM4MUZEREVBMkYwRTAxMUEyNTRDQzczN0VCMTA0ODIiIHN0RXZ0OndoZW49IjIwMTEtMTAtMDdUMTM6MzA6MzMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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";
function image1(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 0 4500 20560 4500 20560 0 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0009727626459144,0,0,1.0044444444444445,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj1);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape2(ctx,ctrans,frame,ratio,time){
	var pathData="M 20560 0 L 20560 4500 0 4500 0 0 20560 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,-20,0,4500);
	ctx.transform(1.0009727626459144,0,0,1.0044444444444445,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj1);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape3(ctx,ctrans,frame,ratio,time){
	var pathData="M 14544 8078 L 14544 7856 -14550 7830 -14552 8052 14544 8078 M 14531 11964 L 14533 11741 -14563 11715 -14563 11937 14531 11964 M 14531 12352 L 14531 12130 -14565 12104 -14565 12326 14531 12352 M 14538 10021 L 14538 9799 -14558 9772 -14558 9995 14538 10021 M 14535 11186 L 14535 10964 -14561 10938 -14561 11160 14535 11186 M 14533 11575 L 14535 11353 -14561 11327 -14563 11549 14533 11575 M 14534 10798 L 14536 10576 -14560 10550 -14560 10772 14534 10798 M 14536 10409 L 14538 10187 -14558 10161 -14560 10383 14536 10409 M 14538 9632 L 14540 9410 -14556 9384 -14556 9606 14538 9632 M 14540 9243 L 14540 9021 -14554 8995 -14556 9217 14540 9243 M 14542 8855 L 14542 8633 -14554 8607 -14554 8829 14542 8855 M 14542 8466 L 14544 8244 -14552 8218 -14552 8440 14542 8466 M 14550 6135 L 14552 5913 -14544 5887 -14544 6109 14550 6135 M 14546 7689 L 14546 7467 -14550 7441 -14550 7663 14546 7689 M 14546 7301 L 14548 7078 -14548 7052 -14548 7274 14546 7301 M 14548 6912 L 14548 6690 -14546 6664 -14548 6886 14548 6912 M 14550 6523 L 14550 6301 -14546 6275 -14546 6497 14550 6523 M 14554 4969 L 14556 4747 -14540 4721 -14540 4943 14554 4969 M 14554 5358 L 14554 5136 -14542 5109 -14542 5332 14554 5358 M 14552 5746 L 14552 5524 -14542 5498 -14544 5720 14552 5746 M 14558 4192 L 14558 3970 -14538 3944 -14538 4166 14558 4192 M 14556 4580 L 14556 4358 -14538 4332 -14540 4554 14556 4580 M 14561 3026 L 14561 2804 -14535 2778 -14535 3000 14561 3026 M 14560 3415 L 14560 3193 -14534 3167 -14536 3389 14560 3415 M 14558 3803 L 14560 3581 -14536 3555 -14536 3777 14558 3803 M 14561 2638 L 14563 2415 -14533 2389 -14533 2611 14561 2638 M 14563 2249 L 14563 2027 -14531 2001 -14533 2223 14563 2249 M 14567 1083 L 14567 861 -14527 835 -14529 1057 14567 1083 M 14565 1860 L 14565 1638 -14531 1612 -14531 1834 14565 1860 M 14565 1472 L 14567 1250 -14529 1224 -14531 1446 14565 1472 M 14569 695 L 14569 473 -14527 446 -14527 669 14569 695 M 14569 306 L 14571 84 -14525 58 -14527 280 14569 306 M 14550 -7830 L 14550 -8052 -14546 -8078 -14546 -7856 14550 -7830 M 14536 -3944 L 14536 -4166 -14558 -4192 -14560 -3970 14536 -3944 M 14527 -835 L 14527 -1057 -14569 -1083 -14569 -861 14527 -835 M 14523 -58 L 14525 -280 -14571 -306 -14571 -84 14523 -58 M 14525 -446 L 14527 -669 -14569 -695 -14571 -473 14525 -446 M 14529 -1612 L 14531 -1834 -14565 -1860 -14567 -1638 14529 -1612 M 14527 -1224 L 14529 -1446 -14567 -1472 -14567 -1250 14527 -1224 M 14533 -2778 L 14533 -3000 -14561 -3026 -14563 -2804 14533 -2778 M 14531 -2001 L 14531 -2223 -14565 -2249 -14565 -2027 14531 -2001 M 14531 -2389 L 14533 -2611 -14563 -2638 -14563 -2415 14531 -2389 M 14534 -3555 L 14536 -3777 -14560 -3803 -14560 -3581 14534 -3555 M 14535 -3167 L 14535 -3389 -14561 -3415 -14561 -3193 14535 -3167 M 14542 -5887 L 14544 -6109 -14552 -6135 -14552 -5913 14542 -5887 M 14538 -4332 L 14538 -4554 -14558 -4580 -14558 -4358 14538 -4332 M 14538 -4721 L 14540 -4943 -14556 -4969 -14556 -4747 14538 -4721 M 14540 -5109 L 14540 -5332 -14554 -5358 -14556 -5136 14540 -5109 M 14542 -5498 L 14542 -5720 -14554 -5746 -14554 -5524 14542 -5498 M 14544 -6275 L 14544 -6497 -14550 -6523 -14552 -6301 14544 -6275 M 14546 -6664 L 14546 -6886 -14550 -6912 -14550 -6690 14546 -6664 M 14546 -7052 L 14548 -7274 -14548 -7301 -14548 -7078 14546 -7052 M 14548 -7441 L 14548 -7663 -14546 -7689 -14548 -7467 14548 -7441 M 14561 -11715 L 14563 -11937 -14533 -11964 -14535 -11741 14561 -11715 M 14556 -9772 L 14556 -9995 -14538 -10021 -14540 -9799 14556 -9772 M 14550 -8218 L 14552 -8440 -14544 -8466 -14544 -8244 14550 -8218 M 14552 -8607 L 14552 -8829 -14542 -8855 -14544 -8633 14552 -8607 M 14554 -8995 L 14554 -9217 -14542 -9243 -14542 -9021 14554 -8995 M 14554 -9384 L 14556 -9606 -14540 -9632 -14540 -9410 14554 -9384 M 14558 -10550 L 14560 -10772 -14536 -10798 -14538 -10576 14558 -10550 M 14558 -10161 L 14558 -10383 -14538 -10409 -14538 -10187 14558 -10161 M 14560 -10938 L 14560 -11160 -14534 -11186 -14536 -10964 14560 -10938 M 14561 -11327 L 14561 -11549 -14535 -11575 -14535 -11353 14561 -11327 M 14563 -12104 L 14563 -12326 -14531 -12352 -14533 -12130 14563 -12104";
	ctx.fillStyle=tocolor(ctrans.apply([0,0,255,1]));
	drawPath(ctx,pathData,false);
	ctx.fill("evenodd");
}

function sprite4(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 20;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape3",canvas,ctx,[0.551483154296875,-0.075347900390625,0.0,0.9084014892578125,0.0,35.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,70.0],ctrans,1,0,0,time);
			break;
		case 2:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,105.0],ctrans,1,0,0,time);
			break;
		case 3:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,140.0],ctrans,1,0,0,time);
			break;
		case 4:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,175.0],ctrans,1,0,0,time);
			break;
		case 5:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,210.0],ctrans,1,0,0,time);
			break;
		case 6:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,245.0],ctrans,1,0,0,time);
			break;
		case 7:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,280.0],ctrans,1,0,0,time);
			break;
		case 8:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,315.0],ctrans,1,0,0,time);
			break;
		case 9:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,350.0],ctrans,1,0,0,time);
			break;
		case 10:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,385.0],ctrans,1,0,0,time);
			break;
		case 11:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,420.0],ctrans,1,0,0,time);
			break;
		case 12:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,455.0],ctrans,1,0,0,time);
			break;
		case 13:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,490.0],ctrans,1,0,0,time);
			break;
		case 14:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,525.0],ctrans,1,0,0,time);
			break;
		case 15:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,560.0],ctrans,1,0,0,time);
			break;
		case 16:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,595.0],ctrans,1,0,0,time);
			break;
		case 17:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,630.0],ctrans,1,0,0,time);
			break;
		case 18:
			place("shape3",canvas,ctx,[0.55126953125,-0.07513427734375,0.0,0.9084014892578125,0.0,665.0],ctrans,1,0,0,time);
			break;
		case 19:
			place("shape3",canvas,ctx,[0.551483154296875,-0.075347900390625,0.0,0.9084014892578125,0.0,700.0],ctrans,1,0,0,time);
			break;
	}
}

function shape5(ctx,ctrans,frame,ratio,time){
	var pathData="M 20600 40 L 20600 4540 40 4540 40 40 20600 40";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,-20,40,4540);
	ctx.transform(1.0009727626459144,0,0,1.0044444444444445,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj1);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite6(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 1;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape2",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			clips.push({ctx:ctx,canvas:canvas});
			var ccanvas = createCanvas(canvas.width,canvas.height);
			var cctx = ccanvas.getContext("2d");
			enhanceContext(cctx);
			cctx.applyTransforms(ctx._matrix);
			canvas = ccanvas;
			ctx = cctx;
			place("sprite4",canvas,ctx,[1.2894439697265625,0.0,0.0,1.0,10198.0,1366.0],ctrans,1,(0+time)%20,0,time);
			clips[clips.length-1].clipCanvas = canvas;
			canvas = createCanvas(canvas.width,canvas.height);
			var nctx = canvas.getContext("2d");
			enhanceContext(nctx);
			nctx.applyTransforms(ctx._matrix);
			ctx = nctx;
			place("shape5",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			var o = clips.pop();
			ctx.globalCompositeOperation = "destination-in";
			ctx.setTransform(1,0,0,1,0,0);
			ctx.drawImage(o.clipCanvas,0,0);
			var ms=o.ctx._matrix;
			o.ctx.setTransform(1,0,0,1,0,0);
			o.ctx.globalCompositeOperation = "source-over";
			o.ctx.drawImage(canvas,0,0);
			o.ctx.applyTransforms(ms);
			ctx = o.ctx;
			canvas = o.canvas;
			break;
	}
}

function main(ctx,ctrans,frame,ratio,time){
	ctx.save();
	ctx.transform(1,0,0,1,0.0,0.0);
	var clips = [];
	var frame_cnt = 1;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite6",canvas,ctx,[0.05,0.0,0.0,0.05,0.15,465.6],ctrans,1,(0+time)%1,0,time);
			break;
	}
	ctx.restore();
}



var canvas = null;
var ctx = null;
var ctrans = null;
var scalingGrids = {};
var boundRects = {};
var sharedContextState = window.__ffdecRootContextState || (window.__ffdecRootContextState = { enhanced: new WeakSet() });
var images = [imageObj1];
var ready = Promise.all(images.map(function (image) {
  if (image.decode) return image.decode().catch(function () {});
  if (image.complete) return Promise.resolve();
  return new Promise(function (resolve) {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
  });
}));

window.FFDecRootMovies = window.FFDecRootMovies || Object.create(null);
window.FFDecRootMovies["scg10"] = Object.freeze({
  period: 1,
  ready: ready,
  draw: function (target, time) {
    canvas = target;
    ctx = target.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Canvas 2D is unavailable");
    if (!sharedContextState.enhanced.has(ctx)) {
      enhanceContext(ctx);
      sharedContextState.enhanced.add(ctx);
    }
    if (!ctrans) ctrans = new cxform(0, 0, 0, 0, 255, 255, 255, 255);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    main(ctx, ctrans, 0, 0, time % 1);
    ctx.restore();
  }
});

})();
