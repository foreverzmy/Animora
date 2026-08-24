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
imageObj1.src="data:image/PNG;base64,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";
function image1(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 0 520 620 520 620 0 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.032258064516129,0,0,1.0384615384615385,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj1);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape2(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 620 0 620 520 0 520 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.032258064516129,0,0,1.0384615384615385,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj1);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite3(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 1;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape2",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function sprite4(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 20;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite3",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 1:
			place("sprite3",canvas,ctx,[0.999603271484375,-0.0218658447265625,0.0218658447265625,0.999603271484375,-9.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 2:
			place("sprite3",canvas,ctx,[0.9987640380859375,-0.0437164306640625,0.0437164306640625,0.9987640380859375,-17.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 3:
			place("sprite3",canvas,ctx,[0.9974212646484375,-0.065521240234375,0.065521240234375,0.9974212646484375,-26.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 4:
			place("sprite3",canvas,ctx,[0.9955902099609375,-0.087310791015625,0.087310791015625,0.9955902099609375,-34.0,1.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 5:
			place("sprite3",canvas,ctx,[0.993316650390625,-0.1090545654296875,0.1090545654296875,0.993316650390625,-43.0,2.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 6:
			place("sprite3",canvas,ctx,[0.99053955078125,-0.1307373046875,0.1307373046875,0.99053955078125,-52.0,3.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 7:
			place("sprite3",canvas,ctx,[0.9873046875,-0.152374267578125,0.152374267578125,0.9873046875,-60.0,3.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 8:
			place("sprite3",canvas,ctx,[0.983612060546875,-0.173919677734375,0.173919677734375,0.983612060546875,-69.0,4.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 9:
			place("sprite3",canvas,ctx,[0.9798126220703125,-0.196624755859375,0.196624755859375,0.9798126220703125,-79.0,6.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 10:
			place("sprite3",canvas,ctx,[0.983489990234375,-0.1744537353515625,0.1744537353515625,0.983489990234375,-69.0,4.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 11:
			place("sprite3",canvas,ctx,[0.986602783203125,-0.1566925048828125,0.1566925048828125,0.986602783203125,-63.0,3.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 12:
			place("sprite3",canvas,ctx,[0.9898529052734375,-0.1356353759765625,0.1356353759765625,0.9898529052734375,-54.0,2.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 13:
			place("sprite3",canvas,ctx,[0.9922332763671875,-0.1177520751953125,0.1177520751953125,0.9922332763671875,-47.0,2.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 14:
			place("sprite3",canvas,ctx,[0.9946441650390625,-0.096588134765625,0.096588134765625,0.9946441650390625,-39.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 15:
			place("sprite3",canvas,ctx,[0.9963531494140625,-0.07861328125,0.07861328125,0.9963531494140625,-31.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 16:
			place("sprite3",canvas,ctx,[0.9979400634765625,-0.0573577880859375,0.0573577880859375,0.9979400634765625,-23.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 17:
			place("sprite3",canvas,ctx,[0.998931884765625,-0.0393524169921875,0.0393524169921875,0.998931884765625,-16.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 18:
			place("sprite3",canvas,ctx,[0.99969482421875,-0.0180511474609375,0.0180511474609375,0.99969482421875,-8.0,-1.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 19:
			place("sprite3",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
	}
}

var imageObj5 = document.createElement("img");
imageObj5.src="data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAATCAYAAADrqO95AAAHUUlEQVR4XqVUe1CTVxa/s22nbqfubLXWZe0WrVWgAoIBwfAOYEDkFZIQICGQkCAhEEARDPJSgfCQR1FEcKHClirFYgFh5KFFFMtDRMSllnXLMMWp3e12u53pzu7O7m+/hHwkJLT9o/d8Z86955x7zu+ee75LQCgCCNExMZK00BIt1yYvwnPQxjAjrU4bj9Dxf2SuZ3qPgYxx6HxWJsvB9boVm86uXeb/Yk1QFLkS6QYLYmttqqdTmYHRrnV6ukBr+JhFoVdaQTkct+JZVUsPi1ccdAEMOQ28OgG9n8USbKbkc3TCdsJ7ThtdN/Q601jLurXZcDDToTVQNEpYWzC5eOqT8gt1lzOO5+qxGDEdzHhtsAfkk1+tI8RSv1wneOElR+TfXGcexhS8dm7OPwjYUH5C/rDJ3+1vvaOzHepidBaU6SyjhGy5T8ivdXt/gqnvebxKLB5yotgi2z1QuXhDuN3+n/3b3HmrXFeBNoBbu+KmeXSwDLKXm5yy0NjxyQeHjmHgyCm0yw8DXvF+Bn+jvY3Bm4ezI/dfPGAXCt+3HCGVvhX9+jZk2rqgcLcHCmyYKHViI8fOA6U7vTqwMcJpzdzGZAbcFLB+o3bQmx/XNFffzq9BO+cQhmIysFTcgCea+n+N8+QXKJ+tFL/8UWCoWuPqNd0VLMKgfxQGWZG44ReDW/tjMeQrxAeMENRv98RpSybOOgbiAisG1T58HN3N+rb5TdZRDfkNxwyHMfgV4KYORkr6xE8J2YQ7s/23c0/jamQyLu+PQT83CfPq01goOoPRtFy0hAlR6+iNFgsGBrZ6Y8w+BNN7BXjoLsKcrwxzbAVmgpToceKhZVcQGuwOos1XjB5hJt7jK5Fl54cTrzCK1ISsrroxaN3KxGgo+7KkD9CUmuT89eT0x1PN76NbqUYX7xBGo9IwG5eFp2kaLGWXY1aahYmgBNxhRqLbyg/tFkx0W/pgjCHAvH8yFkIy8VSQh5mD6ehkROLsdn/UMyLQwUlFl0iNi8J0KBheS3k7difmEMJcC/Ru3f+jr/Yyeh1KQz+tGKj5F2Mbvxi79+8/d1zDhLocI1SCGeFRPOKn44n0OFDyLlDUhGcpJXgcnYn7IUpcd4pA02ZXtGxxR/8ePmbDMrEk0+BZWi1mxAXo8BLjnV2BqLINQhUzHI1RMlQJYpHizkKslcPtk7ZuiWB0vUQDV4eI9DdAg14BS1PNi4Y1IQJr55a+yjp81zeCqYJqjMqO4XNVCebEalz3EeJxQh6+ya3D/yrb8H1ZC74qOIc5VTG6w2SodfBH2U5PVL/NQqsbH8PcdExL8jEZlY2bgUno9BWhxMEbp/2CUcQKQpNEgZ4T5TgTLe+kixfxqo0HjUVXyk2E9/JI9Mgr1FP/S0r9ghZwBNnASXzTu4631XlG5Oj9PXuLNcqi5fi6exjftQ9gRJmPW8IMPEkvxTjVkzfDFbgRloQJcRYeJp/AbOpJzB3RYCG3Bp9maKj+V6DRkY0Ky72osnRBk40vPnLjYSAwDnfiqPbgx6MtQoRqNgf1UQmYqL+Iy4VlSN25TzFG1m+McgmMpzuAsAnDwtNmXwPH6+CDVF7CPxK9IyC09oLalQu1YyiKfUSopBKeTcpGuSwNI2XnBv/TNzryp4ZL/72TdhITUjUeCLPwSJSNuZgsjAcmYtCFixsuPEz5SzHuJ8Znggx8qSjAYnI+pmJT0XNAgEZnFsp3OOCCvRvamGx0BHBxlS/Be1SLVIZG44wkBdeqGlAbqzrBZng8Zr5um6J/7nQt8WKoBcuDY+mXFPVbz+KkHQHtld6Jd4udox/m2UeMFThyO4UWrhUiss1v5XqarztgaOoYPhzqWyyq++aeqhCDHDmu+8Zg8qAMT7ipWAhPweehCswHy3CPevqGfcLw8QE+JkUJuH9IiQdyJaYFEtwK4KHLKwQd+7loorjUJxQ1kTJcKaxEg7oIMb7Bi/YbLDX6B+FH6XkzDX01+qbSxXg/9HcYvMJ91tbaO//OuW/HMnJwSyDHeLgEz+TZ+Ks0E1/GpuAzTixGvQPRs4eJKw5O6NzjiqtvO2OKzUePCxvnbfahzZ+P8wGRKGFHolmZg4FzrShVqcHfG6jRZaafDGNANBozm56WzbQ0Aq6d2r+xbVEqT7ifmtl7V5X99wdpOZiSqPCI4qX04/gqMw8LyUfwqUyJebkKfxQmYTRYiNvcBPTzZDjP4qDCj4MqnhRFUXJcq72Iqb5hKHiSuzvJa/YGcDQYEzYnMxcDaBPVLCFvfOgcIC5zD7pSGypa0D5hl6ifrFOSgWuJWRjSVpCSfQlH0BGXglaxEq2Jh9FKHew8xeXJR3FKlQ1N9gkkxysQL5BptOl/3lj+EVb4h24FzL+sb3yN5Z+7yVWZZelenr+L/W6Fa3hriQP7UoVn+NXfcxM6m8UpvWfjlMOFkZK7qgBed7zXgWrX9dZiHjNMyLDde8nOyunnA14BZAx2FWjzyhsdYw2bKRvIaivb6v9yyR5Tv7meowAAAABJRU5ErkJggg==";
function image5(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 0 380 880 380 880 0 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0227272727272727,0,0,1.0526315789473684,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj5);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape6(ctx,ctrans,frame,ratio,time){
	var pathData="M 880 380 L 0 380 0 0 880 0 880 380";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0227272727272727,0,0,1.0526315789473684,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj5);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite7(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 1;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape6",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function sprite8(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 20;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite7",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 1:
			place("sprite7",canvas,ctx,[0.9998779296875,0.0095977783203125,-0.0095977783203125,0.9998779296875,3.0,-9.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 2:
			place("sprite7",canvas,ctx,[0.9995880126953125,0.0224609375,-0.0224609375,0.9995880126953125,6.0,-20.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 3:
			place("sprite7",canvas,ctx,[0.9991302490234375,0.0353240966796875,-0.0353240966796875,0.9991302490234375,11.0,-32.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 4:
			place("sprite7",canvas,ctx,[0.998504638671875,0.04815673828125,-0.04815673828125,0.998504638671875,15.0,-43.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 5:
			place("sprite7",canvas,ctx,[0.9979400634765625,0.0577392578125,-0.0577392578125,0.9979400634765625,18.0,-51.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 6:
			place("sprite7",canvas,ctx,[0.9970245361328125,0.070587158203125,-0.070587158203125,0.9970245361328125,22.0,-62.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 7:
			place("sprite7",canvas,ctx,[0.995941162109375,0.0833892822265625,-0.0833892822265625,0.995941162109375,27.0,-74.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 8:
			place("sprite7",canvas,ctx,[0.994720458984375,0.0962066650390625,-0.0962066650390625,0.994720458984375,31.0,-85.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 9:
			place("sprite7",canvas,ctx,[0.993621826171875,0.1095123291015625,-0.1095123291015625,0.993621826171875,37.0,-96.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 10:
			place("sprite7",canvas,ctx,[0.9946746826171875,0.09649658203125,-0.09649658203125,0.9946746826171875,33.0,-84.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 11:
			place("sprite7",canvas,ctx,[0.99560546875,0.0872650146484375,-0.0872650146484375,0.99560546875,29.0,-76.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 12:
			place("sprite7",canvas,ctx,[0.996673583984375,0.07476806640625,-0.07476806640625,0.996673583984375,25.0,-65.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 13:
			place("sprite7",canvas,ctx,[0.997406005859375,0.06549072265625,-0.06549072265625,0.997406005859375,21.0,-58.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 14:
			place("sprite7",canvas,ctx,[0.99822998046875,0.052947998046875,-0.052947998046875,0.99822998046875,17.0,-47.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 15:
			place("sprite7",canvas,ctx,[0.998748779296875,0.0436859130859375,-0.0436859130859375,0.998748779296875,14.0,-38.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 16:
			place("sprite7",canvas,ctx,[0.999298095703125,0.0311279296875,-0.0311279296875,0.999298095703125,10.0,-28.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 17:
			place("sprite7",canvas,ctx,[0.999603271484375,0.0218658447265625,-0.0218658447265625,0.999603271484375,7.0,-19.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 18:
			place("sprite7",canvas,ctx,[0.9998931884765625,0.009307861328125,-0.009307861328125,0.9998931884765625,3.0,-9.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 19:
			place("sprite7",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
	}
}

var imageObj9 = document.createElement("img");
imageObj9.src="data:image/PNG;base64,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";
function image9(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 0 1520 2380 1520 2380 0 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0084033613445378,0,0,1.013157894736842,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj9);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape10(ctx,ctrans,frame,ratio,time){
	var pathData="M 1641 275 L 1676 288 1680 300 Q 2024 436 2196 742 L 2205 755 2220 760 2220 800 2220 820 2220 840 Q 2313 947 2357 1101 L 2365 1115 2380 1120 2380 1176 2371 1186 Q 2350 1214 2350 1246 L 2350 1250 Q 2329 1309 2300 1360 2328 1458 2200 1500 L 2228 1520 2000 1520 2000 1501 2095 1500 2022 1491 2015 1485 2000 1480 1995 1467 Q 1863 1377 1751 1270 1740 1260 1724 1252 1720 1250 1720 1240 1504 1207 1318 1146 L 1284 1132 Q 1280 1130 1280 1120 L 1213 1123 Q 1276 766 1290 400 L 1434 182 Q 1503 203 1564 232 L 1596 248 1600 260 1641 275";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0084033613445378,0,0,1.013157894736842,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj9);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape11(ctx,ctrans,frame,ratio,time){
	var pathData="M 1423 182 L 1279 400 Q 1265 766 1202 1123 1151 1128 1113 1148 L 1104 1155 1089 1160 Q 1089 1190 1074 1206 L 998 1290 973 1308 969 1320 Q 812 1327 692 1291 L 684 1285 669 1280 644 1245 614 1215 604 1205 Q 599 1200 589 1200 589 1160 580 1122 544 965 605 818 L 609 800 609 780 Q 530 749 433 789 429 790 424 795 L 409 800 Q 408 839 387 858 297 938 233 1043 L 229 1060 229 1080 Q 18 951 1 620 -6 495 29 420 246 384 435 420 L 479 435 479 450 589 480 599 459 609 460 635 408 Q 761 115 1053 101 L 1065 108 1069 120 Q 1266 132 1423 182";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-11,0);
	ctx.transform(1.0084033613445378,0,0,1.013157894736842,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj9);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function morphshape12(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 121 180 180 L 0 121 200 200 4 125 217 217 Q 64 175 316 316 136 235 403 403 L 155 250 431 431 147 244 429 429 106 209 420 420 150 246 435 435 150 246 450 450 260 338 480 480 270 346 459 459 280 355 460 460 306 376 408 408 Q 432 481 115 115 724 724 101 101 L 713 716 90 90 Q 673 682 37 37 580 605 40 40 L 580 605 30 30 639 654 29 29 603 624 19 19 Q 578 602 16 16 560 588 2 2 L 520 555 10 10 Q 491 534 10 5 471 514 0 0 L 240 321 0 0 238 320 10 10 140 238 20 20 Q 140 236 30 26 136 235 32 32 L 108 211 50 50 Q 60 171 90 90 23 140 142 142 10 130 160 161 0 121 180 180";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-3.3294677734375)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-340.0+ratio*(178)/65535,0.0+ratio*(0)/65535);
	ctx.transform(1.0084033613445378,0,0,1.013157894736842,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj9);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 121 180 180 Q 10 130 160 161 23 140 142 142 60 171 90 90 108 211 50 50 L 136 235 32 32 Q 140 236 30 26 140 238 20 20 L 238 320 10 10 240 321 0 0 471 514 0 0 Q 491 534 10 5 520 555 10 10 L 560 588 2 2 Q 578 602 16 16 603 624 19 19 L 639 654 29 29 580 605 30 30 580 605 40 40 Q 673 682 37 37 713 716 90 90 L 724 724 101 101 Q 432 481 115 115 306 376 408 408 L 280 355 460 460 270 346 459 459 260 338 480 480 150 246 450 450 150 246 435 435 106 209 420 420 147 244 429 429 155 250 431 431 136 235 403 403 Q 64 175 316 316 4 125 217 217 L 0 121 200 200 0 121 180 180 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape13(ctx,ctrans,frame,ratio,time){
	var pathData="M 121 0 180 180 L 121 0 200 200 125 4 217 217 Q 175 64 316 316 235 136 403 403 L 250 155 431 431 244 147 429 429 209 106 420 420 246 150 435 435 246 150 450 450 338 260 480 480 346 270 459 459 355 280 460 460 376 306 408 408 Q 481 432 115 115 724 724 101 101 L 716 713 90 90 Q 682 673 37 37 605 580 40 40 L 605 580 30 30 654 639 29 29 624 603 19 19 Q 602 578 16 16 588 560 2 2 L 555 520 10 10 Q 534 491 5 10 514 471 0 0 L 321 240 0 0 320 238 10 10 238 140 20 20 Q 236 140 26 30 235 136 32 32 L 211 108 50 50 Q 171 60 90 90 140 23 142 142 130 10 161 160 121 0 180 180";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(16.6705322265625+ratio*(3.3294677734375)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-162.0+ratio*(-178)/65535,0.0+ratio*(0)/65535);
	ctx.transform(1.0084033613445378,0,0,1.013157894736842,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj9);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 121 0 180 180 Q 130 10 161 160 140 23 142 142 171 60 90 90 211 108 50 50 L 235 136 32 32 Q 236 140 26 30 238 140 20 20 L 320 238 10 10 321 240 0 0 514 471 0 0 Q 534 491 5 10 555 520 10 10 L 588 560 2 2 Q 602 578 16 16 624 603 19 19 L 654 639 29 29 605 580 30 30 605 580 40 40 Q 682 673 37 37 716 713 90 90 L 724 724 101 101 Q 481 432 115 115 376 306 408 408 L 355 280 460 460 346 270 459 459 338 260 480 480 246 150 450 450 246 150 435 435 209 106 420 420 244 147 429 429 250 155 431 431 235 136 403 403 Q 175 64 316 316 125 4 217 217 L 121 0 200 200 121 0 180 180 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape14(ctx,ctrans,frame,ratio,time){
	var pathData="M 713 90 L 724 101 Q 432 115 306 408 L 280 460 270 459 260 480 150 450 150 435 106 420 147 429 155 431 136 403 Q 64 316 4 217 L 0 200 0 180 Q 10 160 23 142 60 90 108 50 L 136 32 Q 140 30 140 20 L 238 10 240 0 471 0 Q 491 10 520 10 L 560 2 Q 578 16 603 19 L 639 29 580 30 580 40 Q 673 37 713 90";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-340,0);
	ctx.transform(1.0084033613445378,0,0,1.013157894736842,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj9);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite15(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 15;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape12",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape12",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,10923,time);
			break;
		case 2:
			place("morphshape12",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,21845,time);
			break;
		case 3:
			place("morphshape12",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 4:
			place("morphshape12",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,43691,time);
			break;
		case 5:
			place("morphshape12",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,54613,time);
			break;
		case 6:
			place("morphshape13",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 7:
			place("morphshape13",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,8192,time);
			break;
		case 8:
			place("morphshape13",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,16384,time);
			break;
		case 9:
			place("morphshape13",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,24576,time);
			break;
		case 10:
			place("morphshape13",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 11:
			place("morphshape13",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,40960,time);
			break;
		case 12:
			place("morphshape13",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,49152,time);
			break;
		case 13:
			place("morphshape13",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,57344,time);
			break;
		case 14:
			place("shape14",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function sprite16(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 20;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape11",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.0,0.0,0.0,1.0,329.0,0.0],ctrans,1,(0+time)%15,0,time);
			break;
		case 1:
			place("shape11",canvas,ctx,[1.0259246826171875,0.0136566162109375,0.0,1.0,-33.0,-19.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.0259246826171875,0.0136566162109375,0.0,1.0,305.0,-15.0],ctrans,1,(1+time)%15,0,time);
			break;
		case 2:
			place("shape11",canvas,ctx,[1.051666259765625,0.0279998779296875,0.0,1.0,-64.0,-40.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.051666259765625,0.0279998779296875,0.0,1.0,282.0,-31.0],ctrans,1,(2+time)%15,0,time);
			break;
		case 3:
			place("shape11",canvas,ctx,[1.0771942138671875,0.0430145263671875,0.0,1.0,-97.0,-61.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.0771942138671875,0.0430145263671875,0.0,1.0,257.0,-47.0],ctrans,1,(3+time)%15,0,time);
			break;
		case 4:
			place("shape11",canvas,ctx,[1.1024932861328125,0.0587310791015625,0.0,1.0,-127.0,-84.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.1024932861328125,0.0587310791015625,0.0,1.0,236.0,-65.0],ctrans,1,(4+time)%15,0,time);
			break;
		case 5:
			place("shape11",canvas,ctx,[1.1275787353515625,0.0751495361328125,0.0,1.0,-159.0,-107.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.1275787353515625,0.0751495361328125,0.0,1.0,212.0,-82.0],ctrans,1,(5+time)%15,0,time);
			break;
		case 6:
			place("shape11",canvas,ctx,[1.152099609375,0.0959930419921875,0.0,1.0,-190.0,-137.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.152099609375,0.0959930419921875,0.0,1.0,189.0,-105.0],ctrans,1,(6+time)%15,0,time);
			break;
		case 7:
			place("shape11",canvas,ctx,[1.176605224609375,0.1138153076171875,0.0,1.0,-221.0,-162.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.176605224609375,0.1138153076171875,0.0,1.0,166.0,-125.0],ctrans,1,(7+time)%15,0,time);
			break;
		case 8:
			place("shape11",canvas,ctx,[1.200836181640625,0.13232421875,0.0,1.0,-250.0,-188.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.200836181640625,0.13232421875,0.0,1.0,145.0,-144.0],ctrans,1,(8+time)%15,0,time);
			break;
		case 9:
			place("shape11",canvas,ctx,[1.224884033203125,0.15460205078125,0.0,1.0,-280.0,-220.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.224884033203125,0.15460205078125,0.0,1.0,123.0,-169.0],ctrans,1,(9+time)%15,0,time);
			break;
		case 10:
			place("shape11",canvas,ctx,[1.2033538818359375,0.133026123046875,0.0,1.0,-253.0,-189.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.2033538818359375,0.133026123046875,0.0,1.0,143.0,-145.0],ctrans,1,(10+time)%15,0,time);
			break;
		case 11:
			place("shape11",canvas,ctx,[1.181304931640625,0.1190185546875,0.0,1.0,-225.0,-169.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.181304931640625,0.1190185546875,0.0,1.0,164.0,-130.0],ctrans,1,(11+time)%15,0,time);
			break;
		case 12:
			place("shape11",canvas,ctx,[1.1594085693359375,0.1016693115234375,0.0,1.0,-198.0,-144.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.1594085693359375,0.1016693115234375,0.0,1.0,183.0,-111.0],ctrans,1,(12+time)%15,0,time);
			break;
		case 13:
			place("shape11",canvas,ctx,[1.137298583984375,0.0848846435546875,0.0,1.0,-171.0,-120.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.137298583984375,0.0848846435546875,0.0,1.0,203.0,-92.0],ctrans,1,(13+time)%15,0,time);
			break;
		case 14:
			place("shape11",canvas,ctx,[1.11492919921875,0.068695068359375,0.0,1.0,-143.0,-97.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.11492919921875,0.068695068359375,0.0,1.0,224.0,-74.0],ctrans,1,(14+time)%15,0,time);
			break;
		case 15:
			place("shape11",canvas,ctx,[1.09234619140625,0.0531158447265625,0.0,1.0,-115.0,-75.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.09234619140625,0.0531158447265625,0.0,1.0,244.0,-58.0],ctrans,1,(0+time)%15,0,time);
			break;
		case 16:
			place("shape11",canvas,ctx,[1.069549560546875,0.0381011962890625,0.0,1.0,-86.0,-53.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.069549560546875,0.0381011962890625,0.0,1.0,266.0,-40.0],ctrans,1,(1+time)%15,0,time);
			break;
		case 17:
			place("shape11",canvas,ctx,[1.046539306640625,0.023712158203125,0.0,1.0,-58.0,-33.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.046539306640625,0.023712158203125,0.0,1.0,286.0,-25.0],ctrans,1,(2+time)%15,0,time);
			break;
		case 18:
			place("shape11",canvas,ctx,[1.0233612060546875,0.0099334716796875,0.0,1.0,-29.0,-14.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.0233612060546875,0.0099334716796875,0.0,1.0,308.0,-11.0],ctrans,1,(3+time)%15,0,time);
			break;
		case 19:
			place("shape11",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("sprite15",canvas,ctx,[1.0,0.0,0.0,1.0,329.0,0.0],ctrans,1,(4+time)%15,0,time);
			break;
	}
}

function sprite17(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 1;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape10",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("sprite16",canvas,ctx,[1.0,0.0,0.0,1.0,31.0,0.0],ctrans,1,(0+time)%20,0,time);
			break;
	}
}

function sprite18(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 1;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite17",canvas,ctx,[1.0,0.0,0.0,1.0,-11.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
	}
}

function sprite19(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 120;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2269.0,862.0],ctrans,1,(0+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1089.0,1082.0],ctrans,1,(0+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 1:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2292.0,852.0],ctrans,1,(1+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1112.0,1072.0],ctrans,1,(1+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,23.0,-10.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 2:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2315.0,843.0],ctrans,1,(2+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1135.0,1063.0],ctrans,1,(2+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,46.0,-19.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 3:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2338.0,833.0],ctrans,1,(3+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1158.0,1053.0],ctrans,1,(3+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,69.0,-29.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 4:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2361.0,823.0],ctrans,1,(4+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1181.0,1043.0],ctrans,1,(4+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,92.0,-39.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 5:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2384.0,813.0],ctrans,1,(5+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1204.0,1033.0],ctrans,1,(5+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,115.0,-49.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 6:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2407.0,804.0],ctrans,1,(6+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1227.0,1024.0],ctrans,1,(6+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,138.0,-58.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 7:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2431.0,794.0],ctrans,1,(7+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1251.0,1014.0],ctrans,1,(7+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,162.0,-68.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 8:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2454.0,784.0],ctrans,1,(8+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1274.0,1004.0],ctrans,1,(8+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,185.0,-78.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 9:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2477.0,774.0],ctrans,1,(9+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1297.0,994.0],ctrans,1,(9+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,208.0,-88.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 10:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2500.0,765.0],ctrans,1,(10+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1320.0,985.0],ctrans,1,(10+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,231.0,-97.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 11:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2523.0,755.0],ctrans,1,(11+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1343.0,975.0],ctrans,1,(11+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,254.0,-107.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 12:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2546.0,745.0],ctrans,1,(12+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1366.0,965.0],ctrans,1,(12+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,277.0,-117.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 13:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2569.0,735.0],ctrans,1,(13+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1389.0,955.0],ctrans,1,(13+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,300.0,-127.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 14:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2592.0,726.0],ctrans,1,(14+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1412.0,946.0],ctrans,1,(14+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,323.0,-136.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 15:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2615.0,716.0],ctrans,1,(15+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1435.0,936.0],ctrans,1,(15+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,346.0,-146.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 16:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2638.0,706.0],ctrans,1,(16+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1458.0,926.0],ctrans,1,(16+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,369.0,-156.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 17:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2661.0,696.0],ctrans,1,(17+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1481.0,916.0],ctrans,1,(17+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,392.0,-166.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 18:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2684.0,687.0],ctrans,1,(18+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1504.0,907.0],ctrans,1,(18+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,415.0,-175.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 19:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2707.0,677.0],ctrans,1,(19+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1527.0,897.0],ctrans,1,(19+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,438.0,-185.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 20:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2731.0,667.0],ctrans,1,(0+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1551.0,887.0],ctrans,1,(0+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,462.0,-195.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 21:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2754.0,657.0],ctrans,1,(1+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1574.0,877.0],ctrans,1,(1+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,485.0,-205.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 22:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2777.0,648.0],ctrans,1,(2+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1597.0,868.0],ctrans,1,(2+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,508.0,-214.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 23:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2800.0,638.0],ctrans,1,(3+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1620.0,858.0],ctrans,1,(3+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,531.0,-224.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 24:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2823.0,628.0],ctrans,1,(4+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1643.0,848.0],ctrans,1,(4+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,554.0,-234.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 25:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2846.0,618.0],ctrans,1,(5+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1666.0,838.0],ctrans,1,(5+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,577.0,-244.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 26:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2869.0,609.0],ctrans,1,(6+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1689.0,829.0],ctrans,1,(6+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,600.0,-253.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 27:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2892.0,599.0],ctrans,1,(7+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1712.0,819.0],ctrans,1,(7+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,623.0,-263.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 28:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2915.0,589.0],ctrans,1,(8+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1735.0,809.0],ctrans,1,(8+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,646.0,-273.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 29:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2938.0,579.0],ctrans,1,(9+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1758.0,799.0],ctrans,1,(9+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,669.0,-283.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 30:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2961.0,570.0],ctrans,1,(10+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1781.0,790.0],ctrans,1,(10+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,692.0,-292.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 31:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2984.0,560.0],ctrans,1,(11+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1804.0,780.0],ctrans,1,(11+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,715.0,-302.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 32:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3007.0,550.0],ctrans,1,(12+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1827.0,770.0],ctrans,1,(12+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,738.0,-312.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 33:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3031.0,540.0],ctrans,1,(13+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1851.0,760.0],ctrans,1,(13+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,762.0,-322.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 34:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3054.0,531.0],ctrans,1,(14+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1874.0,751.0],ctrans,1,(14+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,785.0,-331.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 35:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3077.0,521.0],ctrans,1,(15+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1897.0,741.0],ctrans,1,(15+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,808.0,-341.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 36:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3100.0,511.0],ctrans,1,(16+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1920.0,731.0],ctrans,1,(16+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,831.0,-351.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 37:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3123.0,501.0],ctrans,1,(17+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1943.0,721.0],ctrans,1,(17+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,854.0,-361.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 38:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3146.0,492.0],ctrans,1,(18+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1966.0,712.0],ctrans,1,(18+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,877.0,-370.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 39:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3169.0,482.0],ctrans,1,(19+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1989.0,702.0],ctrans,1,(19+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,900.0,-380.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 40:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3158.0,501.0],ctrans,1,(0+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1978.0,721.0],ctrans,1,(0+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,889.0,-361.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 41:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3146.0,520.0],ctrans,1,(1+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1966.0,740.0],ctrans,1,(1+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,877.0,-342.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 42:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3135.0,539.0],ctrans,1,(2+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1955.0,759.0],ctrans,1,(2+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,866.0,-323.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 43:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3123.0,558.0],ctrans,1,(3+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1943.0,778.0],ctrans,1,(3+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,854.0,-304.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 44:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3111.0,577.0],ctrans,1,(4+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1931.0,797.0],ctrans,1,(4+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,842.0,-285.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 45:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3100.0,596.0],ctrans,1,(5+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1920.0,816.0],ctrans,1,(5+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,831.0,-266.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 46:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3088.0,615.0],ctrans,1,(6+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1908.0,835.0],ctrans,1,(6+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,819.0,-247.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 47:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3077.0,634.0],ctrans,1,(7+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1897.0,854.0],ctrans,1,(7+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,808.0,-228.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 48:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3065.0,653.0],ctrans,1,(8+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1885.0,873.0],ctrans,1,(8+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,796.0,-209.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 49:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3054.0,672.0],ctrans,1,(9+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1874.0,892.0],ctrans,1,(9+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,785.0,-190.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 50:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3043.0,691.0],ctrans,1,(10+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1863.0,911.0],ctrans,1,(10+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,774.0,-171.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 51:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3031.0,710.0],ctrans,1,(11+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1851.0,930.0],ctrans,1,(11+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,762.0,-152.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 52:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3020.0,729.0],ctrans,1,(12+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1840.0,949.0],ctrans,1,(12+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,751.0,-133.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 53:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,3008.0,748.0],ctrans,1,(13+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1828.0,968.0],ctrans,1,(13+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,739.0,-114.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 54:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2996.0,767.0],ctrans,1,(14+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1816.0,987.0],ctrans,1,(14+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,727.0,-95.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 55:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2985.0,786.0],ctrans,1,(15+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1805.0,1006.0],ctrans,1,(15+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,716.0,-76.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 56:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2973.0,805.0],ctrans,1,(16+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1793.0,1025.0],ctrans,1,(16+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,704.0,-57.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 57:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2962.0,824.0],ctrans,1,(17+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1782.0,1044.0],ctrans,1,(17+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,693.0,-38.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 58:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2950.0,843.0],ctrans,1,(18+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1770.0,1063.0],ctrans,1,(18+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,681.0,-19.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 59:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2939.0,862.0],ctrans,1,(19+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1759.0,1082.0],ctrans,1,(19+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,670.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 60:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2928.0,881.0],ctrans,1,(0+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1748.0,1101.0],ctrans,1,(0+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,659.0,19.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 61:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2916.0,900.0],ctrans,1,(1+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1736.0,1120.0],ctrans,1,(1+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,647.0,38.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 62:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2905.0,919.0],ctrans,1,(2+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1725.0,1139.0],ctrans,1,(2+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,636.0,57.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 63:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2893.0,938.0],ctrans,1,(3+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1713.0,1158.0],ctrans,1,(3+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,624.0,76.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 64:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2882.0,957.0],ctrans,1,(4+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1702.0,1177.0],ctrans,1,(4+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,613.0,95.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 65:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2870.0,976.0],ctrans,1,(5+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1690.0,1196.0],ctrans,1,(5+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,601.0,114.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 66:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2858.0,995.0],ctrans,1,(6+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1678.0,1215.0],ctrans,1,(6+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,589.0,133.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 67:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2847.0,1014.0],ctrans,1,(7+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1667.0,1234.0],ctrans,1,(7+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,578.0,152.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 68:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2835.0,1033.0],ctrans,1,(8+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1655.0,1253.0],ctrans,1,(8+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,566.0,171.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 69:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2824.0,1052.0],ctrans,1,(9+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1644.0,1272.0],ctrans,1,(9+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,555.0,190.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 70:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2812.0,1071.0],ctrans,1,(10+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1632.0,1291.0],ctrans,1,(10+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,543.0,209.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 71:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2801.0,1090.0],ctrans,1,(11+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1621.0,1310.0],ctrans,1,(11+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,532.0,228.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 72:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2789.0,1109.0],ctrans,1,(12+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1609.0,1329.0],ctrans,1,(12+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,520.0,247.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 73:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2778.0,1128.0],ctrans,1,(13+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1598.0,1348.0],ctrans,1,(13+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,509.0,266.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 74:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2766.0,1147.0],ctrans,1,(14+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1586.0,1367.0],ctrans,1,(14+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,497.0,285.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 75:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2755.0,1166.0],ctrans,1,(15+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1575.0,1386.0],ctrans,1,(15+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,486.0,304.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 76:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2743.0,1185.0],ctrans,1,(16+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1563.0,1405.0],ctrans,1,(16+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,474.0,323.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 77:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2732.0,1204.0],ctrans,1,(17+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1552.0,1424.0],ctrans,1,(17+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,463.0,342.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 78:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2720.0,1223.0],ctrans,1,(18+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1540.0,1443.0],ctrans,1,(18+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,451.0,361.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 79:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2709.0,1242.0],ctrans,1,(19+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1529.0,1462.0],ctrans,1,(19+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,440.0,380.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 80:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2698.0,1233.0],ctrans,1,(0+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1518.0,1453.0],ctrans,1,(0+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,429.0,371.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 81:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2687.0,1223.0],ctrans,1,(1+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1507.0,1443.0],ctrans,1,(1+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,418.0,361.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 82:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2676.0,1214.0],ctrans,1,(2+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1496.0,1434.0],ctrans,1,(2+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,407.0,352.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 83:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2665.0,1204.0],ctrans,1,(3+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1485.0,1424.0],ctrans,1,(3+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,396.0,342.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 84:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2654.0,1195.0],ctrans,1,(4+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1474.0,1415.0],ctrans,1,(4+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,385.0,333.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 85:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2643.0,1185.0],ctrans,1,(5+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1463.0,1405.0],ctrans,1,(5+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,374.0,323.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 86:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2632.0,1176.0],ctrans,1,(6+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1452.0,1396.0],ctrans,1,(6+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,363.0,314.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 87:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2621.0,1166.0],ctrans,1,(7+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1441.0,1386.0],ctrans,1,(7+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,352.0,304.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 88:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2610.0,1156.0],ctrans,1,(8+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1430.0,1376.0],ctrans,1,(8+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,341.0,294.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 89:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2599.0,1147.0],ctrans,1,(9+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1419.0,1367.0],ctrans,1,(9+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,330.0,285.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 90:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2588.0,1138.0],ctrans,1,(10+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1408.0,1358.0],ctrans,1,(10+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,319.0,276.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 91:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2577.0,1128.0],ctrans,1,(11+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1397.0,1348.0],ctrans,1,(11+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,308.0,266.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 92:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2566.0,1119.0],ctrans,1,(12+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1386.0,1339.0],ctrans,1,(12+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,297.0,257.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 93:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2555.0,1109.0],ctrans,1,(13+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1375.0,1329.0],ctrans,1,(13+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,286.0,247.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 94:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2544.0,1100.0],ctrans,1,(14+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1364.0,1320.0],ctrans,1,(14+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,275.0,238.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 95:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2533.0,1090.0],ctrans,1,(15+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1353.0,1310.0],ctrans,1,(15+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,264.0,228.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 96:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2522.0,1081.0],ctrans,1,(16+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1342.0,1301.0],ctrans,1,(16+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,253.0,219.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 97:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2511.0,1071.0],ctrans,1,(17+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1331.0,1291.0],ctrans,1,(17+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,242.0,209.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 98:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2500.0,1062.0],ctrans,1,(18+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1320.0,1282.0],ctrans,1,(18+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,231.0,200.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 99:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2489.0,1052.0],ctrans,1,(19+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1309.0,1272.0],ctrans,1,(19+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,220.0,190.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 100:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2478.0,1043.0],ctrans,1,(0+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1298.0,1263.0],ctrans,1,(0+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,209.0,181.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 101:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2467.0,1033.0],ctrans,1,(1+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1287.0,1253.0],ctrans,1,(1+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,198.0,171.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 102:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2456.0,1024.0],ctrans,1,(2+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1276.0,1244.0],ctrans,1,(2+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,187.0,162.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 103:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2445.0,1014.0],ctrans,1,(3+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1265.0,1234.0],ctrans,1,(3+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,176.0,152.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 104:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2434.0,1005.0],ctrans,1,(4+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1254.0,1225.0],ctrans,1,(4+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,165.0,143.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 105:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2423.0,995.0],ctrans,1,(5+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1243.0,1215.0],ctrans,1,(5+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,154.0,133.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 106:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2412.0,986.0],ctrans,1,(6+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1232.0,1206.0],ctrans,1,(6+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,143.0,124.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 107:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2401.0,976.0],ctrans,1,(7+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1221.0,1196.0],ctrans,1,(7+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,132.0,114.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 108:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2390.0,967.0],ctrans,1,(8+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1210.0,1187.0],ctrans,1,(8+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,121.0,105.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 109:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2379.0,957.0],ctrans,1,(9+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1199.0,1177.0],ctrans,1,(9+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,110.0,95.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 110:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2368.0,948.0],ctrans,1,(10+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1188.0,1168.0],ctrans,1,(10+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,99.0,86.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 111:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2357.0,938.0],ctrans,1,(11+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1177.0,1158.0],ctrans,1,(11+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,88.0,76.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 112:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2346.0,929.0],ctrans,1,(12+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1166.0,1149.0],ctrans,1,(12+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,77.0,67.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 113:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2335.0,919.0],ctrans,1,(13+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1155.0,1139.0],ctrans,1,(13+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,66.0,57.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 114:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2324.0,910.0],ctrans,1,(14+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1144.0,1130.0],ctrans,1,(14+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,55.0,48.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 115:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2313.0,900.0],ctrans,1,(15+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1133.0,1120.0],ctrans,1,(15+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,44.0,38.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 116:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2302.0,891.0],ctrans,1,(16+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1122.0,1111.0],ctrans,1,(16+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,33.0,29.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 117:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2291.0,881.0],ctrans,1,(17+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1111.0,1101.0],ctrans,1,(17+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,22.0,19.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 118:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2280.0,872.0],ctrans,1,(18+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1100.0,1092.0],ctrans,1,(18+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,11.0,10.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 119:
			place("sprite4",canvas,ctx,[1.0,0.0,0.0,1.0,2269.0,862.0],ctrans,1,(19+time)%20,0,time);
			place("sprite8",canvas,ctx,[1.0,0.0,0.0,1.0,1089.0,1082.0],ctrans,1,(19+time)%20,0,time);
			place("sprite18",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
	}
}

var imageObj20 = document.createElement("img");
imageObj20.src="data:image/PNG;base64,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";
function image20(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 0 1780 5460 1780 5460 0 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0036630036630036,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj20);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape21(ctx,ctrans,frame,ratio,time){
	var pathData="M -350 550 Q -225 621 -170 590 L -174 572 Q -238 440 -310 410 -591 376 -490 430 -424 494 -350 550 M 87 -709 L 98 -710 121 -712 127 -712 440 -742 440 431 435 425 Q 430 420 430 410 349 439 230 440 L 235 445 250 450 254 468 267 492 316 566 Q 353 617 399 660 L 426 678 430 690 Q 275 714 124 642 L 73 639 Q 70 640 70 650 L 105 675 113 681 167 699 175 705 190 710 110 720 106 718 Q 90 710 74 718 70 720 70 730 L 70 750 Q 64 778 15 743 L 5 735 -5 725 -15 715 Q -20 710 -30 710 -446 716 -733 597 L -766 582 Q -770 580 -770 570 -790 560 -811 556 L -867 541 -874 538 -906 522 -910 510 Q -930 510 -946 502 L -954 498 -986 482 -990 470 -1069 447 -1105 425 -1114 418 -1150 410 Q -1170 390 -1194 377 -1235 355 -1287 341 L -1294 338 -1330 330 Q -1350 310 -1373 295 L -1385 285 -1394 278 -1426 262 Q -1430 260 -1430 250 L -1749 240 -1752 239 -1830 230 -1834 218 Q -1934 174 -2047 141 L -2054 138 -2090 130 -2217 39 Q -2292 -18 -2338 -106 L -2347 -115 -2389 -154 Q -2466 -244 -2537 -345 L -2545 -355 -2550 -370 Q -2570 -360 -2591 -356 L -2647 -359 -2650 -370 -2646 -382 -2610 -390 Q -2640 -400 -2665 -417 L -2674 -422 -2706 -438 -2710 -450 -2710 -470 -2653 -461 -2646 -458 -2614 -442 -2607 -439 -2550 -430 -2547 -441 -2493 -459 -2486 -462 -2454 -478 Q -2450 -480 -2450 -490 -1968 -658 -1410 -656 L -1405 -656 -1225 -656 -1208 -656 -96 -696 87 -709";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-2730,-890);
	ctx.transform(1.0036630036630036,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj20);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function morphshape22(ctx,ctrans,frame,ratio,time){
	var pathData="M 440 440 -742 -742 L 440 440 431 431 444 443 435 435 500 482 499 499 578 536 599 599 Q 596 548 624 624 628 571 636 636 637 579 644 640 646 583 652 652 L 655 589 666 666 Q 693 616 717 717 741 649 757 757 764 665 776 776 770 669 810 810 788 683 814 810 806 694 818 818 L 814 700 822 822 Q 930 780 880 880 1110 905 870 870 L 1110 905 880 880 1066 875 881 881 Q 1091 892 882 882 1111 906 890 890 1139 923 885 881 1167 945 880 880 1228 987 845 845 1310 1044 830 830 1345 1068 785 785 1410 1114 770 770 L 1530 1197 610 610 1670 1294 550 550 Q 1679 1300 499 499 1713 1324 475 475 1720 1329 470 470 1730 1336 470 470 1716 1326 396 396 1745 1346 365 365 L 1750 1350 350 350 Q 1737 1337 283 289 1714 1325 228 228 L 1710 1322 210 210 Q 1849 1419 371 371 2010 1531 510 510 2161 1635 534 534 2330 1753 490 490 2566 1916 356 356 2690 2003 110 110 2677 1994 52 52 2700 2010 29 29 L 2700 2010 -121 -121 Q 2653 1977 -282 -282 2510 1878 -350 -350 L 2508 1877 -360 -360 2411 1809 -376 -376 Q 2080 1579 -412 -412 1799 1384 -371 -371 L 1805 1388 -375 -375 1813 1394 -381 -381 Q 1958 1494 -432 -432 2030 1544 -550 -550 L 2030 1544 -570 -570 2030 1544 -590 -590 2030 1544 -630 -630 Q 2020 1537 -630 -630 2015 1534 -635 -635 L 2005 1527 -646 -646 1890 1447 -790 -790 Q 1870 1433 -790 -790 1854 1422 -798 -798 L 1846 1417 -802 -802 Q 1780 1371 -830 -830 1710 1322 -850 -850 L 1710 1322 -850 -850 Q 1649 1279 -854 -854 1613 1255 -890 -890 L 1410 1114 -890 -890 1409 1113 -880 -880 1230 989 -870 -870 1226 986 -858 -858 Q 1210 975 -850 -850 1191 962 -847 -847 861 732 -789 -789 500 482 -749 -749 L 440 440 -742 -742";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-6.10626220703125)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-2730.0+ratio*(968)/65535,-890.0+ratio*(0)/65535);
	ctx.transform(1.0036630036630036,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj20);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 440 440 -742 -742 L 500 482 -749 -749 Q 861 732 -789 -789 1191 962 -847 -847 1210 975 -850 -850 1226 986 -858 -858 L 1230 989 -870 -870 1409 1113 -880 -880 1410 1114 -890 -890 1613 1255 -890 -890 Q 1649 1279 -854 -854 1710 1322 -850 -850 L 1710 1322 -850 -850 Q 1780 1371 -830 -830 1846 1417 -802 -802 L 1854 1422 -798 -798 Q 1870 1433 -790 -790 1890 1447 -790 -790 L 2005 1527 -646 -646 2015 1534 -635 -635 Q 2020 1537 -630 -630 2030 1544 -630 -630 L 2030 1544 -590 -590 2030 1544 -570 -570 2030 1544 -550 -550 Q 1958 1494 -432 -432 1813 1394 -381 -381 L 1805 1388 -375 -375 1799 1384 -371 -371 Q 2080 1579 -412 -412 2411 1809 -376 -376 L 2508 1877 -360 -360 2510 1878 -350 -350 Q 2653 1977 -282 -282 2700 2010 -121 -121 L 2700 2010 29 29 Q 2677 1994 52 52 2690 2003 110 110 2566 1916 356 356 2330 1753 490 490 2161 1635 534 534 2010 1531 510 510 1849 1419 371 371 1710 1322 210 210 L 1714 1325 228 228 Q 1737 1337 283 289 1750 1350 350 350 L 1745 1346 365 365 Q 1716 1326 396 396 1730 1336 470 470 1720 1329 470 470 1713 1324 475 475 1679 1300 499 499 1670 1294 550 550 L 1530 1197 610 610 1410 1114 770 770 Q 1345 1068 785 785 1310 1044 830 830 1228 987 845 845 1167 945 880 880 1139 923 885 881 1111 906 890 890 1091 892 882 882 1066 875 881 881 L 1110 905 880 880 1110 905 870 870 Q 930 780 880 880 814 700 822 822 L 806 694 818 818 Q 788 683 814 810 770 669 810 810 764 665 776 776 741 649 757 757 693 616 717 717 655 589 666 666 L 646 583 652 652 Q 637 579 644 640 628 571 636 636 596 548 624 624 578 536 599 599 L 500 482 499 499 444 443 435 435 440 440 431 431 440 440 -742 -742 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape23(ctx,ctrans,frame,ratio,time){
	var pathData="M 440 440 -742 -742 L 440 440 431 431 443 444 435 435 482 500 499 499 536 578 599 599 Q 548 596 624 624 571 628 636 636 579 637 640 644 583 646 652 652 L 589 655 666 666 Q 616 693 717 717 649 741 757 757 665 764 776 776 669 770 810 810 683 788 810 814 694 806 818 818 L 700 814 822 822 Q 780 930 880 880 905 1110 870 870 L 905 1110 880 880 875 1066 881 881 Q 892 1091 882 882 906 1111 890 890 923 1139 881 885 945 1167 880 880 987 1228 845 845 1044 1310 830 830 1068 1345 785 785 1114 1410 770 770 L 1197 1530 610 610 1294 1670 550 550 Q 1300 1679 499 499 1324 1713 475 475 1329 1720 470 470 1336 1730 470 470 1326 1716 396 396 1346 1745 365 365 L 1350 1750 350 350 Q 1337 1737 289 283 1325 1714 228 228 L 1322 1710 210 210 Q 1419 1849 371 371 1531 2010 510 510 1635 2161 534 534 1753 2330 490 490 1916 2566 356 356 2003 2690 110 110 1994 2677 52 52 2010 2700 29 29 L 2010 2700 -121 -121 Q 1977 2653 -282 -282 1878 2510 -350 -350 L 1877 2508 -360 -360 1809 2411 -376 -376 Q 1579 2080 -412 -412 1384 1799 -371 -371 L 1388 1805 -375 -375 1394 1813 -381 -381 Q 1494 1958 -432 -432 1544 2030 -550 -550 L 1544 2030 -570 -570 1544 2030 -590 -590 1544 2030 -630 -630 Q 1537 2020 -630 -630 1534 2015 -635 -635 L 1527 2005 -646 -646 1447 1890 -790 -790 Q 1433 1870 -790 -790 1422 1854 -798 -798 L 1417 1846 -802 -802 Q 1371 1780 -830 -830 1322 1710 -850 -850 L 1322 1710 -850 -850 Q 1279 1649 -854 -854 1255 1613 -890 -890 L 1114 1410 -890 -890 1113 1409 -880 -880 989 1230 -870 -870 986 1226 -858 -858 Q 975 1210 -850 -850 962 1191 -847 -847 732 861 -789 -789 482 500 -749 -749 L 440 440 -742 -742";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(13.89373779296875+ratio*(6.10626220703125)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-1762.0+ratio*(-968)/65535,-890.0+ratio*(0)/65535);
	ctx.transform(1.0036630036630036,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj20);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 440 440 -742 -742 L 482 500 -749 -749 Q 732 861 -789 -789 962 1191 -847 -847 975 1210 -850 -850 986 1226 -858 -858 L 989 1230 -870 -870 1113 1409 -880 -880 1114 1410 -890 -890 1255 1613 -890 -890 Q 1279 1649 -854 -854 1322 1710 -850 -850 L 1322 1710 -850 -850 Q 1371 1780 -830 -830 1417 1846 -802 -802 L 1422 1854 -798 -798 Q 1433 1870 -790 -790 1447 1890 -790 -790 L 1527 2005 -646 -646 1534 2015 -635 -635 Q 1537 2020 -630 -630 1544 2030 -630 -630 L 1544 2030 -590 -590 1544 2030 -570 -570 1544 2030 -550 -550 Q 1494 1958 -432 -432 1394 1813 -381 -381 L 1388 1805 -375 -375 1384 1799 -371 -371 Q 1579 2080 -412 -412 1809 2411 -376 -376 L 1877 2508 -360 -360 1878 2510 -350 -350 Q 1977 2653 -282 -282 2010 2700 -121 -121 L 2010 2700 29 29 Q 1994 2677 52 52 2003 2690 110 110 1916 2566 356 356 1753 2330 490 490 1635 2161 534 534 1531 2010 510 510 1419 1849 371 371 1322 1710 210 210 L 1325 1714 228 228 Q 1337 1737 289 283 1350 1750 350 350 L 1346 1745 365 365 Q 1326 1716 396 396 1336 1730 470 470 1329 1720 470 470 1324 1713 475 475 1300 1679 499 499 1294 1670 550 550 L 1197 1530 610 610 1114 1410 770 770 Q 1068 1345 785 785 1044 1310 830 830 987 1228 845 845 945 1167 880 880 923 1139 881 885 906 1111 890 890 892 1091 882 882 875 1066 881 881 L 905 1110 880 880 905 1110 870 870 Q 780 930 880 880 700 814 822 822 L 694 806 818 818 Q 683 788 810 814 669 770 810 810 665 764 776 776 649 741 757 757 616 693 717 717 589 655 666 666 L 583 646 652 652 Q 579 637 640 644 571 628 636 636 548 596 624 624 536 578 599 599 L 482 500 499 499 443 444 435 435 440 440 431 431 440 440 -742 -742 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape24(ctx,ctrans,frame,ratio,time){
	var pathData="M 440 -742 L 500 -749 Q 861 -789 1191 -847 1210 -850 1226 -858 L 1230 -870 1409 -880 1410 -890 1613 -890 Q 1649 -854 1710 -850 1780 -830 1846 -802 L 1854 -798 Q 1870 -790 1890 -790 L 2005 -646 2015 -635 Q 2020 -630 2030 -630 L 2030 -590 2030 -570 2030 -550 Q 1958 -432 1813 -381 L 1805 -375 1799 -371 Q 2080 -412 2411 -376 L 2508 -360 2510 -350 Q 2653 -282 2700 -121 L 2700 29 Q 2677 52 2690 110 2566 356 2330 490 2161 534 2010 510 1849 371 1710 210 L 1714 228 Q 1737 283 1750 350 L 1745 365 Q 1716 396 1730 470 1720 470 1713 475 1679 499 1670 550 L 1530 610 1410 770 Q 1345 785 1310 830 1228 845 1167 880 L 1111 890 Q 1091 882 1066 881 L 1110 880 1110 870 Q 930 880 814 822 L 806 818 770 810 Q 764 776 741 757 693 717 655 666 L 646 652 628 636 Q 596 624 578 599 L 500 499 444 435 440 431 440 -742";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-2730,-890);
	ctx.transform(1.0036630036630036,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj20);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite25(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 20;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,7282,time);
			break;
		case 2:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,14564,time);
			break;
		case 3:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,21845,time);
			break;
		case 4:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,29127,time);
			break;
		case 5:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,36409,time);
			break;
		case 6:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,43691,time);
			break;
		case 7:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,50972,time);
			break;
		case 8:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape22",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,58254,time);
			break;
		case 9:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 10:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,6554,time);
			break;
		case 11:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 12:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,19661,time);
			break;
		case 13:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 14:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 15:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 16:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,45875,time);
			break;
		case 17:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 18:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("morphshape23",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,58982,time);
			break;
		case 19:
			place("shape21",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("shape24",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function sprite26(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 819;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,3186.0,-40.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 1:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,3137.0,3.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 2:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,3091.0,45.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 3:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,3044.0,88.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 4:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2998.0,130.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 5:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2952.0,174.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 6:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2906.0,218.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 7:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2861.0,262.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 8:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2816.0,308.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 9:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2773.0,353.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 10:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2729.0,400.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 11:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2687.0,448.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 12:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2646.0,497.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 13:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2608.0,549.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 14:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2572.0,602.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 15:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2541.0,659.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 16:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2512.0,719.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 17:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2483.0,778.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 18:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2452.0,835.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 19:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2420.0,893.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 20:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2386.0,949.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 21:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2352.0,1005.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 22:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2316.0,1060.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 23:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2279.0,1115.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 24:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2242.0,1169.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 25:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2205.0,1224.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 26:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2167.0,1277.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 27:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2128.0,1330.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 28:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2088.0,1382.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 29:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2047.0,1434.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 30:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,2005.0,1485.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 31:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1962.0,1535.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 32:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1918.0,1584.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 33:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1873.0,1632.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 34:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1828.0,1679.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 35:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1781.0,1726.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 36:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1734.0,1772.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 37:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1686.0,1816.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 38:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1637.0,1860.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 39:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1587.0,1903.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 40:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1536.0,1945.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 41:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1485.0,1986.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 42:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1432.0,2026.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 43:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1373.0,2059.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 44:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1307.0,2083.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 45:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1240.0,2098.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 46:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1171.0,2107.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 47:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1102.0,2110.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 48:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,1034.0,2108.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 49:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,966.0,2103.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 50:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,899.0,2095.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 51:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,833.0,2084.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 52:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,767.0,2071.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 53:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,702.0,2056.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 54:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,637.0,2040.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 55:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,573.0,2023.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 56:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,509.0,2004.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 57:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,447.0,1984.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 58:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,384.0,1964.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 59:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,321.0,1941.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 60:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,258.0,1917.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 61:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,195.0,1892.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 62:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,133.0,1865.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 63:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,71.0,1836.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 64:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,10.0,1807.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 65:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-50.0,1777.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 66:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-109.0,1745.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 67:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-169.0,1713.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 68:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-227.0,1680.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 69:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-285.0,1646.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 70:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-342.0,1611.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 71:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-399.0,1576.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 72:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-455.0,1540.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 73:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-511.0,1503.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 74:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-566.0,1466.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 75:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-621.0,1428.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 76:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-675.0,1389.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 77:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-729.0,1350.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 78:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-782.0,1311.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 79:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-835.0,1271.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 80:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-888.0,1230.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 81:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-940.0,1189.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 82:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-992.0,1148.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 83:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1043.0,1106.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 84:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1094.0,1064.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 85:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1145.0,1022.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 86:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1195.0,979.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 87:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1245.0,936.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 88:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1295.0,893.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 89:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1344.0,849.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 90:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1393.0,806.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 91:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1442.0,765.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 92:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1491.0,725.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 93:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1542.0,686.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 94:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1593.0,648.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 95:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1645.0,611.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 96:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1698.0,575.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 97:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1752.0,541.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 98:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1808.0,508.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 99:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1864.0,477.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 100:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1921.0,448.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 101:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-1980.0,421.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 102:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2039.0,395.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 103:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2100.0,373.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 104:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2162.0,352.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 105:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2224.0,335.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 106:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2288.0,320.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 107:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2353.0,309.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 108:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2418.0,302.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 109:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2483.0,298.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 110:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2549.0,297.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 111:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2615.0,301.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 112:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2680.0,308.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 113:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2745.0,320.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 114:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2810.0,335.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 115:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2873.0,354.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 116:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2935.0,376.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 117:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-2996.0,402.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 118:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3055.0,431.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 119:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3113.0,462.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 120:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3170.0,496.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 121:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3228.0,531.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 122:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3285.0,567.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 123:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3342.0,603.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 124:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3399.0,640.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 125:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3455.0,677.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 126:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3511.0,714.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 127:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3566.0,752.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 128:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3621.0,791.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 129:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3676.0,829.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 130:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3730.0,868.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 131:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3784.0,908.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 132:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3838.0,948.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 133:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3891.0,988.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 134:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3945.0,1028.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 135:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-3997.0,1069.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 136:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4050.0,1109.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 137:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4102.0,1151.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 138:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4154.0,1192.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 139:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4206.0,1234.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 140:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4258.0,1276.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 141:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4309.0,1318.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 142:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4360.0,1360.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 143:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4411.0,1403.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 144:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4461.0,1445.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 145:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4512.0,1488.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 146:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4562.0,1531.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 147:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4612.0,1575.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 148:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4661.0,1618.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 149:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4711.0,1662.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 150:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4760.0,1706.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 151:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4809.0,1750.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 152:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4858.0,1794.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 153:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4907.0,1838.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 154:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-4955.0,1883.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 155:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5004.0,1926.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 156:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5052.0,1968.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 157:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5101.0,2009.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 158:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5151.0,2048.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 159:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5202.0,2087.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 160:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5254.0,2124.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 161:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5308.0,2160.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 162:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5362.0,2194.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 163:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5417.0,2226.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 164:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5474.0,2257.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 165:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5532.0,2286.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 166:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5591.0,2312.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 167:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5651.0,2336.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 168:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5712.0,2358.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 169:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5775.0,2376.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 170:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5838.0,2392.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 171:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5903.0,2404.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 172:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-5968.0,2413.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 173:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6034.0,2418.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 174:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6100.0,2419.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 175:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6166.0,2416.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 176:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6231.0,2409.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 177:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6297.0,2399.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 178:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6362.0,2384.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 179:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6426.0,2366.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 180:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6488.0,2345.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 181:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6550.0,2320.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 182:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6610.0,2292.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 183:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6669.0,2261.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 184:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6726.0,2228.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 185:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6781.0,2192.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 186:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6836.0,2155.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 187:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6888.0,2115.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 188:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6940.0,2075.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 189:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-6993.0,2035.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 190:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7045.0,1995.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 191:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7097.0,1956.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 192:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7150.0,1916.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 193:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7203.0,1877.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 194:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7248.0,1871.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 195:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7293.0,1865.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 196:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7337.0,1860.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 197:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7382.0,1854.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 198:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7427.0,1848.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 199:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7472.0,1842.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 200:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7516.0,1836.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 201:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7561.0,1831.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 202:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7606.0,1825.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 203:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7651.0,1819.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 204:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7696.0,1813.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 205:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7740.0,1807.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 206:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7785.0,1801.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 207:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7830.0,1796.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 208:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7875.0,1790.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 209:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7919.0,1784.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 210:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-7964.0,1778.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 211:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8009.0,1772.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 212:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8054.0,1767.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 213:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8099.0,1761.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 214:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8143.0,1755.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 215:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8188.0,1749.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 216:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8233.0,1743.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 217:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8278.0,1738.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 218:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8322.0,1732.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 219:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8367.0,1726.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 220:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8412.0,1720.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 221:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8457.0,1714.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 222:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8501.0,1709.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 223:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8546.0,1703.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 224:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8591.0,1697.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 225:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8636.0,1691.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 226:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8680.0,1685.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 227:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8725.0,1679.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 228:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8770.0,1674.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 229:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8815.0,1668.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 230:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8860.0,1662.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 231:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8904.0,1656.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 232:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8949.0,1650.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 233:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-8994.0,1645.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 234:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9039.0,1639.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 235:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9084.0,1633.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 236:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9128.0,1627.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 237:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9173.0,1621.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 238:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9218.0,1616.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 239:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9263.0,1610.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 240:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9307.0,1604.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 241:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9352.0,1598.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 242:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9397.0,1592.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 243:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9442.0,1587.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 244:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9486.0,1581.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 245:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9531.0,1575.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 246:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9576.0,1569.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 247:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9621.0,1563.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 248:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9666.0,1557.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 249:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9710.0,1552.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 250:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9755.0,1546.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 251:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9800.0,1540.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 252:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9845.0,1534.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 253:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9890.0,1528.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 254:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9934.0,1523.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 255:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-9979.0,1517.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 256:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10024.0,1511.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 257:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10069.0,1505.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 258:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10113.0,1499.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 259:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10158.0,1494.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 260:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10203.0,1488.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 261:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10248.0,1482.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 262:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10293.0,1476.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 263:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10337.0,1470.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 264:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10382.0,1465.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 265:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10427.0,1459.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 266:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10472.0,1453.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 267:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10516.0,1447.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 268:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10561.0,1441.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 269:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10606.0,1435.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 270:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10651.0,1430.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 271:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10695.0,1424.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 272:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10740.0,1418.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 273:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10785.0,1412.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 274:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10830.0,1406.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 275:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10875.0,1401.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 276:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10919.0,1395.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 277:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-10964.0,1389.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 278:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11009.0,1383.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 279:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11054.0,1377.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 280:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11098.0,1372.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 281:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11143.0,1366.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 282:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11188.0,1360.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 283:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11233.0,1354.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 284:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11277.0,1348.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 285:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11322.0,1343.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 286:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11367.0,1337.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 287:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11412.0,1331.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 288:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11457.0,1325.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 289:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11501.0,1319.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 290:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11546.0,1313.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 291:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11591.0,1308.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 292:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11636.0,1302.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 293:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11680.0,1296.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 294:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11725.0,1290.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 295:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11770.0,1284.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 296:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11815.0,1279.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 297:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11860.0,1273.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 298:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11904.0,1267.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 299:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11949.0,1261.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 300:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-11994.0,1255.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 301:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12039.0,1250.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 302:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12083.0,1244.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 303:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12128.0,1238.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 304:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12173.0,1232.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 305:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12218.0,1226.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 306:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12262.0,1221.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 307:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12307.0,1215.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 308:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12352.0,1209.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 309:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12397.0,1203.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 310:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12442.0,1197.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 311:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12486.0,1191.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 312:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12531.0,1186.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 313:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12576.0,1180.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 314:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12621.0,1174.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 315:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12666.0,1168.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 316:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12710.0,1162.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 317:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12755.0,1157.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 318:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12800.0,1151.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 319:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12845.0,1145.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 320:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12889.0,1139.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 321:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12934.0,1133.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 322:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-12979.0,1128.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 323:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13024.0,1122.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 324:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13068.0,1116.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 325:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13113.0,1110.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 326:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13158.0,1104.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 327:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13203.0,1099.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 328:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13248.0,1093.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 329:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13292.0,1087.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 330:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13337.0,1081.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 331:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13382.0,1075.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 332:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13427.0,1069.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 333:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13471.0,1064.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 334:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13516.0,1058.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 335:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13561.0,1052.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 336:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13606.0,1046.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 337:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13650.0,1040.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 338:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13695.0,1035.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 339:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13740.0,1029.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 340:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13785.0,1023.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 341:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13830.0,1017.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 342:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13874.0,1011.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 343:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13919.0,1006.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 344:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-13964.0,1000.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 345:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14009.0,994.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 346:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14053.0,988.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 347:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14098.0,982.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 348:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14143.0,977.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 349:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14188.0,971.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 350:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14233.0,965.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 351:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14277.0,959.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 352:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14322.0,953.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 353:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14367.0,947.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 354:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14412.0,942.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 355:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14456.0,936.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 356:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14501.0,930.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 357:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14546.0,924.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 358:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14591.0,918.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 359:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14636.0,913.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 360:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14680.0,907.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 361:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14725.0,901.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 362:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14770.0,895.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 363:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14815.0,889.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 364:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14859.0,884.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 365:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14904.0,878.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 366:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14949.0,872.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 367:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-14994.0,866.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 368:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15039.0,860.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 369:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15083.0,854.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 370:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15128.0,849.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 371:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15173.0,843.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 372:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15218.0,837.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 373:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15262.0,831.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 374:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15307.0,825.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 375:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15352.0,820.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 376:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15397.0,814.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 377:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15442.0,808.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 378:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15486.0,802.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 379:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15531.0,796.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 380:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15576.0,791.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 381:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15621.0,785.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 382:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15665.0,779.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 383:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15710.0,773.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 384:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15755.0,767.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 385:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15800.0,762.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 386:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15845.0,756.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 387:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15889.0,750.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 388:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15934.0,744.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 389:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-15979.0,738.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 390:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16024.0,732.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 391:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16068.0,727.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 392:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16113.0,721.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 393:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16158.0,715.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 394:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16203.0,709.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 395:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16247.0,703.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 396:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16292.0,698.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 397:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16337.0,692.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 398:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16382.0,686.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 399:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16426.0,680.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 400:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16471.0,674.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 401:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16516.0,669.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 402:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16561.0,663.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 403:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16606.0,657.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 404:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16650.0,651.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 405:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16695.0,645.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 406:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16740.0,640.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 407:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16785.0,634.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 408:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16829.0,628.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 409:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16874.0,622.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 410:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16919.0,616.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 411:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-16964.0,610.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 412:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-17009.0,605.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 413:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-17053.0,599.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 414:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-17098.0,593.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 415:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-17143.0,587.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 416:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-17188.0,581.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 417:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-17232.0,576.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 418:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-17277.0,570.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 419:
			place("sprite25",canvas,ctx,[1.0,0.0,0.0,1.0,-17322.0,564.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 420:
			place("sprite25",canvas,ctx,[-1.0,0.0,0.0,1.0,-17240.0,600.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 421:
			place("sprite25",canvas,ctx,[-1.0,9.1552734375E-5,9.1552734375E-5,1.0,-17131.0,591.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 422:
			place("sprite25",canvas,ctx,[-0.9999847412109375,1.8310546875E-4,1.8310546875E-4,0.9999847412109375,-17064.0,582.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 423:
			place("sprite25",canvas,ctx,[-0.999969482421875,2.74658203125E-4,2.74658203125E-4,0.999969482421875,-16996.0,574.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 424:
			place("sprite25",canvas,ctx,[-0.9999542236328125,3.662109375E-4,3.662109375E-4,0.9999542236328125,-16931.0,565.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 425:
			place("sprite25",canvas,ctx,[-0.9999542236328125,4.57763671875E-4,4.57763671875E-4,0.9999542236328125,-16864.0,557.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 426:
			place("sprite25",canvas,ctx,[-0.99993896484375,5.4931640625E-4,5.4931640625E-4,0.99993896484375,-16797.0,548.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 427:
			place("sprite25",canvas,ctx,[-0.99993896484375,6.40869140625E-4,6.40869140625E-4,0.99993896484375,-16730.0,539.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 428:
			place("sprite25",canvas,ctx,[-0.9999237060546875,7.32421875E-4,7.32421875E-4,0.9999237060546875,-16663.0,531.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 429:
			place("sprite25",canvas,ctx,[-0.9999237060546875,8.23974609375E-4,8.23974609375E-4,0.9999237060546875,-16596.0,522.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 430:
			place("sprite25",canvas,ctx,[-0.999908447265625,9.1552734375E-4,9.1552734375E-4,0.999908447265625,-16528.0,514.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 431:
			place("sprite25",canvas,ctx,[-0.999908447265625,0.001007080078125,0.001007080078125,0.999908447265625,-16461.0,506.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 432:
			place("sprite25",canvas,ctx,[-0.9998931884765625,0.0043792724609375,0.0043792724609375,0.9998931884765625,-16394.0,497.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 433:
			place("sprite25",canvas,ctx,[-0.9998779296875,0.0044708251953125,0.0044708251953125,0.9998779296875,-16328.0,489.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 434:
			place("sprite25",canvas,ctx,[-0.9998779296875,0.0045623779296875,0.0045623779296875,0.9998779296875,-16261.0,481.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 435:
			place("sprite25",canvas,ctx,[-0.9998626708984375,0.0046539306640625,0.0046539306640625,0.9998626708984375,-16194.0,472.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 436:
			place("sprite25",canvas,ctx,[-0.9998626708984375,0.0047454833984375,0.0047454833984375,0.9998626708984375,-16127.0,464.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 437:
			place("sprite25",canvas,ctx,[-0.999847412109375,0.0048370361328125,0.0048370361328125,0.999847412109375,-16058.0,456.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 438:
			place("sprite25",canvas,ctx,[-0.999847412109375,0.0049285888671875,0.0049285888671875,0.999847412109375,-15991.0,448.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 439:
			place("sprite25",canvas,ctx,[-0.9998321533203125,0.0050201416015625,0.0050201416015625,0.9998321533203125,-15924.0,440.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 440:
			place("sprite25",canvas,ctx,[-0.9998321533203125,0.0051116943359375,0.0051116943359375,0.9998321533203125,-15856.0,432.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 441:
			place("sprite25",canvas,ctx,[-0.9998321533203125,0.0052032470703125,0.0052032470703125,0.9998321533203125,-15789.0,424.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 442:
			place("sprite25",canvas,ctx,[-0.99981689453125,0.0052947998046875,0.0052947998046875,0.99981689453125,-15722.0,416.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 443:
			place("sprite25",canvas,ctx,[-0.99981689453125,0.0053863525390625,0.0053863525390625,0.99981689453125,-15654.0,409.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 444:
			place("sprite25",canvas,ctx,[-0.999755859375,0.008758544921875,0.008758544921875,0.999755859375,-15585.0,401.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 445:
			place("sprite25",canvas,ctx,[-0.999755859375,0.00885009765625,0.00885009765625,0.999755859375,-15518.0,393.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 446:
			place("sprite25",canvas,ctx,[-0.9997406005859375,0.008941650390625,0.008941650390625,0.9997406005859375,-15450.0,386.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 447:
			place("sprite25",canvas,ctx,[-0.9997406005859375,0.009033203125,0.009033203125,0.9997406005859375,-15382.0,379.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 448:
			place("sprite25",canvas,ctx,[-0.999725341796875,0.009124755859375,0.009124755859375,0.999725341796875,-15312.0,371.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 449:
			place("sprite25",canvas,ctx,[-0.999725341796875,0.00921630859375,0.00921630859375,0.999725341796875,-15244.0,364.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 450:
			place("sprite25",canvas,ctx,[-0.9997100830078125,0.009307861328125,0.009307861328125,0.9997100830078125,-15177.0,357.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 451:
			place("sprite25",canvas,ctx,[-0.9997100830078125,0.0093994140625,0.0093994140625,0.9997100830078125,-15108.0,351.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 452:
			place("sprite25",canvas,ctx,[-0.9997100830078125,0.009490966796875,0.009490966796875,0.9997100830078125,-15039.0,344.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 453:
			place("sprite25",canvas,ctx,[-0.99969482421875,0.00958251953125,0.00958251953125,0.99969482421875,-14970.0,338.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 454:
			place("sprite25",canvas,ctx,[-0.9996795654296875,0.009674072265625,0.009674072265625,0.9996795654296875,-14901.0,332.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 455:
			place("sprite25",canvas,ctx,[-0.999664306640625,0.009765625,0.009765625,0.999664306640625,-14832.0,326.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 456:
			place("sprite25",canvas,ctx,[-0.9996185302734375,0.01312255859375,0.01312255859375,0.9996185302734375,-14761.0,321.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 457:
			place("sprite25",canvas,ctx,[-0.999603271484375,0.013214111328125,0.013214111328125,0.999603271484375,-14691.0,317.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 458:
			place("sprite25",canvas,ctx,[-0.999603271484375,0.0133056640625,0.0133056640625,0.999603271484375,-14622.0,313.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 459:
			place("sprite25",canvas,ctx,[-0.9995880126953125,0.013397216796875,0.013397216796875,0.9995880126953125,-14553.0,310.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 460:
			place("sprite25",canvas,ctx,[-0.9995880126953125,0.01348876953125,0.01348876953125,0.9995880126953125,-14483.0,309.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 461:
			place("sprite25",canvas,ctx,[-0.99957275390625,0.013580322265625,0.013580322265625,0.99957275390625,-14413.0,307.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 462:
			place("sprite25",canvas,ctx,[-0.99957275390625,0.013671875,0.013671875,0.99957275390625,-14343.0,306.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 463:
			place("sprite25",canvas,ctx,[-0.9995574951171875,0.013763427734375,0.013763427734375,0.9995574951171875,-14273.0,305.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 464:
			place("sprite25",canvas,ctx,[-0.999542236328125,0.01385498046875,0.01385498046875,0.999542236328125,-14203.0,306.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 465:
			place("sprite25",canvas,ctx,[-0.999542236328125,0.0139617919921875,0.0139617919921875,0.999542236328125,-14133.0,307.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 466:
			place("sprite25",canvas,ctx,[-0.9995269775390625,0.0140533447265625,0.0140533447265625,0.9995269775390625,-14065.0,309.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 467:
			place("sprite25",canvas,ctx,[-0.9995269775390625,0.0141448974609375,0.0141448974609375,0.9995269775390625,-13995.0,311.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 468:
			place("sprite25",canvas,ctx,[-0.99945068359375,0.0175018310546875,0.0175018310546875,0.99945068359375,-13925.0,315.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 469:
			place("sprite25",canvas,ctx,[-0.99945068359375,0.0175933837890625,0.0175933837890625,0.99945068359375,-13855.0,319.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 470:
			place("sprite25",canvas,ctx,[-0.9994354248046875,0.0176849365234375,0.0176849365234375,0.9994354248046875,-13784.0,323.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 471:
			place("sprite25",canvas,ctx,[-0.999420166015625,0.0177764892578125,0.0177764892578125,0.999420166015625,-13714.0,329.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 472:
			place("sprite25",canvas,ctx,[-0.999420166015625,0.0178680419921875,0.0178680419921875,0.999420166015625,-13645.0,335.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 473:
			place("sprite25",canvas,ctx,[-0.9994049072265625,0.0179595947265625,0.0179595947265625,0.9994049072265625,-13575.0,342.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 474:
			place("sprite25",canvas,ctx,[-0.9994049072265625,0.0180511474609375,0.0180511474609375,0.9994049072265625,-13503.0,349.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 475:
			place("sprite25",canvas,ctx,[-0.9993896484375,0.0181427001953125,0.0181427001953125,0.9993896484375,-13427.0,355.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 476:
			place("sprite25",canvas,ctx,[-0.9993896484375,0.0182342529296875,0.0182342529296875,0.9993896484375,-13351.0,360.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 477:
			place("sprite25",canvas,ctx,[-0.9993743896484375,0.0183258056640625,0.0183258056640625,0.9993743896484375,-13276.0,365.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 478:
			place("sprite25",canvas,ctx,[-0.9993743896484375,0.0184173583984375,0.0184173583984375,0.9993743896484375,-13202.0,370.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 479:
			place("sprite25",canvas,ctx,[-0.9993438720703125,0.0185089111328125,0.0185089111328125,0.9993438720703125,-13128.0,372.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 480:
			place("sprite25",canvas,ctx,[-0.999267578125,0.0218658447265625,0.0218658447265625,0.999267578125,-13054.0,374.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 481:
			place("sprite25",canvas,ctx,[-0.9992523193359375,0.0219573974609375,0.0219573974609375,0.9992523193359375,-12981.0,377.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 482:
			place("sprite25",canvas,ctx,[-0.9992523193359375,0.0220489501953125,0.0220489501953125,0.9992523193359375,-12908.0,379.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 483:
			place("sprite25",canvas,ctx,[-0.9992523193359375,0.0221405029296875,0.0221405029296875,0.9992523193359375,-12835.0,380.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 484:
			place("sprite25",canvas,ctx,[-0.999237060546875,0.0222320556640625,0.0222320556640625,0.999237060546875,-12764.0,382.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 485:
			place("sprite25",canvas,ctx,[-0.9992218017578125,0.0223236083984375,0.0223236083984375,0.9992218017578125,-12691.0,383.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 486:
			place("sprite25",canvas,ctx,[-0.99920654296875,0.0224151611328125,0.0224151611328125,0.99920654296875,-12618.0,382.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 487:
			place("sprite25",canvas,ctx,[-0.99920654296875,0.0225067138671875,0.0225067138671875,0.99920654296875,-12547.0,384.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 488:
			place("sprite25",canvas,ctx,[-0.9991912841796875,0.0225982666015625,0.0225982666015625,0.9991912841796875,-12475.0,384.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 489:
			place("sprite25",canvas,ctx,[-0.9991912841796875,0.0226898193359375,0.0226898193359375,0.9991912841796875,-12403.0,385.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 490:
			place("sprite25",canvas,ctx,[-0.999176025390625,0.0227813720703125,0.0227813720703125,0.999176025390625,-12332.0,385.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 491:
			place("sprite25",canvas,ctx,[-0.999176025390625,0.0228729248046875,0.0228729248046875,0.999176025390625,-12261.0,385.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 492:
			place("sprite25",canvas,ctx,[-0.9990692138671875,0.0262298583984375,0.0262298583984375,0.9990692138671875,-12190.0,383.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 493:
			place("sprite25",canvas,ctx,[-0.999053955078125,0.0263214111328125,0.0263214111328125,0.999053955078125,-12120.0,383.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 494:
			place("sprite25",canvas,ctx,[-0.999053955078125,0.0264129638671875,0.0264129638671875,0.999053955078125,-12049.0,382.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 495:
			place("sprite25",canvas,ctx,[-0.9990386962890625,0.026519775390625,0.026519775390625,0.9990386962890625,-11977.0,382.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 496:
			place("sprite25",canvas,ctx,[-0.9990386962890625,0.026611328125,0.026611328125,0.9990386962890625,-11906.0,381.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 497:
			place("sprite25",canvas,ctx,[-0.9990081787109375,0.026702880859375,0.026702880859375,0.9990081787109375,-11836.0,380.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 498:
			place("sprite25",canvas,ctx,[-0.9990081787109375,0.02679443359375,0.02679443359375,0.9990081787109375,-11765.0,379.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 499:
			place("sprite25",canvas,ctx,[-0.998992919921875,0.026885986328125,0.026885986328125,0.998992919921875,-11695.0,378.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 500:
			place("sprite25",canvas,ctx,[-0.998992919921875,0.0269775390625,0.0269775390625,0.998992919921875,-11624.0,377.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 501:
			place("sprite25",canvas,ctx,[-0.9989776611328125,0.027069091796875,0.027069091796875,0.9989776611328125,-11554.0,376.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 502:
			place("sprite25",canvas,ctx,[-0.9989776611328125,0.02716064453125,0.02716064453125,0.9989776611328125,-11484.0,374.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 503:
			place("sprite25",canvas,ctx,[-0.99896240234375,0.027252197265625,0.027252197265625,0.99896240234375,-11414.0,373.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 504:
			place("sprite25",canvas,ctx,[-0.99884033203125,0.030609130859375,0.030609130859375,0.99884033203125,-11344.0,371.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 505:
			place("sprite25",canvas,ctx,[-0.99884033203125,0.03070068359375,0.03070068359375,0.99884033203125,-11274.0,370.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 506:
			place("sprite25",canvas,ctx,[-0.9988250732421875,0.030792236328125,0.030792236328125,0.9988250732421875,-11204.0,369.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 507:
			place("sprite25",canvas,ctx,[-0.9988250732421875,0.0308837890625,0.0308837890625,0.9988250732421875,-11136.0,368.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 508:
			place("sprite25",canvas,ctx,[-0.9987945556640625,0.030975341796875,0.030975341796875,0.9987945556640625,-11068.0,368.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 509:
			place("sprite25",canvas,ctx,[-0.9987945556640625,0.03106689453125,0.03106689453125,0.9987945556640625,-10999.0,368.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 510:
			place("sprite25",canvas,ctx,[-0.998779296875,0.031158447265625,0.031158447265625,0.998779296875,-10931.0,369.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 511:
			place("sprite25",canvas,ctx,[-0.998779296875,0.03125,0.03125,0.998779296875,-10863.0,370.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 512:
			place("sprite25",canvas,ctx,[-0.9987640380859375,0.031341552734375,0.031341552734375,0.9987640380859375,-10794.0,372.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 513:
			place("sprite25",canvas,ctx,[-0.998748779296875,0.03143310546875,0.03143310546875,0.998748779296875,-10726.0,374.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 514:
			place("sprite25",canvas,ctx,[-0.998748779296875,0.031524658203125,0.031524658203125,0.998748779296875,-10658.0,377.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 515:
			place("sprite25",canvas,ctx,[-0.9986114501953125,0.034881591796875,0.034881591796875,0.9986114501953125,-10589.0,380.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 516:
			place("sprite25",canvas,ctx,[-0.9986114501953125,0.03497314453125,0.03497314453125,0.9986114501953125,-10521.0,385.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 517:
			place("sprite25",canvas,ctx,[-0.99859619140625,0.035064697265625,0.035064697265625,0.99859619140625,-10453.0,390.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 518:
			place("sprite25",canvas,ctx,[-0.9985809326171875,0.03515625,0.03515625,0.9985809326171875,-10385.0,396.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 519:
			place("sprite25",canvas,ctx,[-0.998565673828125,0.035247802734375,0.035247802734375,0.998565673828125,-10316.0,403.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 520:
			place("sprite25",canvas,ctx,[-0.998565673828125,0.03533935546875,0.03533935546875,0.998565673828125,-10247.0,410.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 521:
			place("sprite25",canvas,ctx,[-0.9985504150390625,0.035430908203125,0.035430908203125,0.9985504150390625,-10179.0,418.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 522:
			place("sprite25",canvas,ctx,[-0.9985504150390625,0.0355224609375,0.0355224609375,0.9985504150390625,-10111.0,426.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 523:
			place("sprite25",canvas,ctx,[-0.99853515625,0.035614013671875,0.035614013671875,0.99853515625,-10043.0,436.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 524:
			place("sprite25",canvas,ctx,[-0.9985198974609375,0.03570556640625,0.03570556640625,0.9985198974609375,-9974.0,447.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 525:
			place("sprite25",canvas,ctx,[-0.9985198974609375,0.035797119140625,0.035797119140625,0.9985198974609375,-9906.0,458.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 526:
			place("sprite25",canvas,ctx,[-0.998504638671875,0.035888671875,0.035888671875,0.998504638671875,-9839.0,470.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 527:
			place("sprite25",canvas,ctx,[-0.9983673095703125,0.03924560546875,0.03924560546875,0.9983673095703125,-9772.0,485.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 528:
			place("sprite25",canvas,ctx,[-0.9983367919921875,0.039337158203125,0.039337158203125,0.9983367919921875,-9704.0,499.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 529:
			place("sprite25",canvas,ctx,[-0.9983367919921875,0.0394287109375,0.0394287109375,0.9983367919921875,-9636.0,514.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 530:
			place("sprite25",canvas,ctx,[-0.998321533203125,0.039520263671875,0.039520263671875,0.998321533203125,-9569.0,531.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 531:
			place("sprite25",canvas,ctx,[-0.998321533203125,0.03961181640625,0.03961181640625,0.998321533203125,-9502.0,548.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 532:
			place("sprite25",canvas,ctx,[-0.998291015625,0.039703369140625,0.039703369140625,0.998291015625,-9435.0,567.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 533:
			place("sprite25",canvas,ctx,[-0.998291015625,0.039794921875,0.039794921875,0.998291015625,-9369.0,586.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 534:
			place("sprite25",canvas,ctx,[-0.998291015625,0.039886474609375,0.039886474609375,0.998291015625,-9303.0,608.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 535:
			place("sprite25",canvas,ctx,[-0.9982757568359375,0.03997802734375,0.03997802734375,0.9982757568359375,-9237.0,630.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 536:
			place("sprite25",canvas,ctx,[-0.998260498046875,0.040069580078125,0.040069580078125,0.998260498046875,-9172.0,654.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 537:
			place("sprite25",canvas,ctx,[-0.9982452392578125,0.0401611328125,0.0401611328125,0.9982452392578125,-9107.0,679.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 538:
			place("sprite25",canvas,ctx,[-0.9982452392578125,0.040252685546875,0.040252685546875,0.9982452392578125,-9042.0,705.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 539:
			place("sprite25",canvas,ctx,[-0.998077392578125,0.0436248779296875,0.0436248779296875,0.998077392578125,-8979.0,733.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 540:
			place("sprite25",canvas,ctx,[-0.9980621337890625,0.0437164306640625,0.0437164306640625,0.9980621337890625,-8915.0,762.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 541:
			place("sprite25",canvas,ctx,[-0.998046875,0.0438079833984375,0.0438079833984375,0.998046875,-8852.0,794.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 542:
			place("sprite25",canvas,ctx,[-0.998046875,0.0438995361328125,0.0438995361328125,0.998046875,-8790.0,827.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 543:
			place("sprite25",canvas,ctx,[-0.9980316162109375,0.0439910888671875,0.0439910888671875,0.9980316162109375,-8730.0,861.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 544:
			place("sprite25",canvas,ctx,[-0.998016357421875,0.0440826416015625,0.0440826416015625,0.998016357421875,-8670.0,897.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 545:
			place("sprite25",canvas,ctx,[-0.998016357421875,0.0441741943359375,0.0441741943359375,0.998016357421875,-8608.0,934.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 546:
			place("sprite25",canvas,ctx,[-0.9980010986328125,0.04425048828125,0.04425048828125,0.9980010986328125,-8549.0,969.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 547:
			place("sprite25",canvas,ctx,[-0.99798583984375,0.044342041015625,0.044342041015625,0.99798583984375,-8490.0,1005.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 548:
			place("sprite25",canvas,ctx,[-0.9979705810546875,0.04443359375,0.04443359375,0.9979705810546875,-8430.0,1042.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 549:
			place("sprite25",canvas,ctx,[-0.9979705810546875,0.044525146484375,0.044525146484375,0.9979705810546875,-8370.0,1079.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 550:
			place("sprite25",canvas,ctx,[-0.997955322265625,0.04461669921875,0.04461669921875,0.997955322265625,-8312.0,1117.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 551:
			place("sprite25",canvas,ctx,[-0.9977874755859375,0.0479736328125,0.0479736328125,0.9977874755859375,-8253.0,1154.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 552:
			place("sprite25",canvas,ctx,[-0.9977569580078125,0.048065185546875,0.048065185546875,0.9977569580078125,-8193.0,1192.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 553:
			place("sprite25",canvas,ctx,[-0.9977569580078125,0.04815673828125,0.04815673828125,0.9977569580078125,-8134.0,1230.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 554:
			place("sprite25",canvas,ctx,[-0.9977569580078125,0.048248291015625,0.048248291015625,0.9977569580078125,-8075.0,1269.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 555:
			place("sprite25",canvas,ctx,[-0.9977264404296875,0.04833984375,0.04833984375,0.9977264404296875,-8016.0,1307.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 556:
			place("sprite25",canvas,ctx,[-0.9977264404296875,0.048431396484375,0.048431396484375,0.9977264404296875,-7958.0,1346.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 557:
			place("sprite25",canvas,ctx,[-0.997711181640625,0.04852294921875,0.04852294921875,0.997711181640625,-7900.0,1385.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 558:
			place("sprite25",canvas,ctx,[-0.997711181640625,0.048614501953125,0.048614501953125,0.997711181640625,-7842.0,1424.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 559:
			place("sprite25",canvas,ctx,[-0.9976806640625,0.0487060546875,0.0487060546875,0.9976806640625,-7784.0,1463.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 560:
			place("sprite25",canvas,ctx,[-0.9976806640625,0.048797607421875,0.048797607421875,0.9976806640625,-7726.0,1503.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 561:
			place("sprite25",canvas,ctx,[-0.9976654052734375,0.04888916015625,0.04888916015625,0.9976654052734375,-7669.0,1543.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 562:
			place("sprite25",canvas,ctx,[-0.997650146484375,0.048980712890625,0.048980712890625,0.997650146484375,-7611.0,1583.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 563:
			place("sprite25",canvas,ctx,[-0.9974517822265625,0.0523529052734375,0.0523529052734375,0.9974517822265625,-7554.0,1623.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 564:
			place("sprite25",canvas,ctx,[-0.997589111328125,0.052886962890625,0.052886962890625,0.997589111328125,-7497.0,1663.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 565:
			place("sprite25",canvas,ctx,[-0.997650146484375,0.048431396484375,0.048431396484375,0.997650146484375,-7460.0,1690.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 566:
			place("sprite25",canvas,ctx,[-0.9978485107421875,0.044403076171875,0.044403076171875,0.9978485107421875,-7424.0,1715.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 567:
			place("sprite25",canvas,ctx,[-0.9978790283203125,0.043670654296875,0.043670654296875,0.9978790283203125,-7386.0,1742.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 568:
			place("sprite25",canvas,ctx,[-0.9980621337890625,0.0396575927734375,0.0396575927734375,0.9980621337890625,-7349.0,1769.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 569:
			place("sprite25",canvas,ctx,[-0.99822998046875,0.035675048828125,0.035675048828125,0.99822998046875,-7314.0,1797.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 570:
			place("sprite25",canvas,ctx,[-0.9982452392578125,0.034942626953125,0.034942626953125,0.9982452392578125,-7277.0,1823.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 571:
			place("sprite25",canvas,ctx,[-0.9983978271484375,0.030914306640625,0.030914306640625,0.9983978271484375,-7239.0,1850.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 572:
			place("sprite25",canvas,ctx,[-0.99853515625,0.0269317626953125,0.0269317626953125,0.99853515625,-7203.0,1877.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 573:
			place("sprite25",canvas,ctx,[-0.99853515625,0.0261993408203125,0.0261993408203125,0.99853515625,-7166.0,1904.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 574:
			place("sprite25",canvas,ctx,[-0.9986572265625,0.022186279296875,0.022186279296875,0.9986572265625,-7130.0,1930.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 575:
			place("sprite25",canvas,ctx,[-0.9987335205078125,0.0181732177734375,0.0181732177734375,0.9987335205078125,-7095.0,1957.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 576:
			place("sprite25",canvas,ctx,[-0.9987640380859375,0.0174560546875,0.0174560546875,0.9987640380859375,-7059.0,1986.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 577:
			place("sprite25",canvas,ctx,[-0.99884033203125,0.013427734375,0.013427734375,0.99884033203125,-7022.0,2013.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 578:
			place("sprite25",canvas,ctx,[-0.9989013671875,0.009429931640625,0.009429931640625,0.9989013671875,-6986.0,2041.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 579:
			place("sprite25",canvas,ctx,[-0.998931884765625,0.0054168701171875,0.0054168701171875,0.998931884765625,-6949.0,2068.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 580:
			place("sprite25",canvas,ctx,[-0.9989166259765625,0.00469970703125,0.00469970703125,0.9989166259765625,-6913.0,2096.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 581:
			place("sprite25",canvas,ctx,[-0.998931884765625,6.7138671875E-4,6.7138671875E-4,0.998931884765625,-6877.0,2124.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 582:
			place("sprite25",canvas,ctx,[-0.99896240234375,-7.62939453125E-5,-7.62939453125E-5,0.99896240234375,-6842.0,2152.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 583:
			place("sprite25",canvas,ctx,[-0.998931884765625,-8.087158203125E-4,-8.087158203125E-4,0.998931884765625,-6805.0,2176.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 584:
			place("sprite25",canvas,ctx,[-0.9989013671875,-0.00482177734375,-0.00482177734375,0.9989013671875,-6768.0,2201.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 585:
			place("sprite25",canvas,ctx,[-0.9988555908203125,-0.008819580078125,-0.008819580078125,0.9988555908203125,-6731.0,2225.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 586:
			place("sprite25",canvas,ctx,[-0.998870849609375,-0.0095672607421875,-0.0095672607421875,0.998870849609375,-6693.0,2248.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 587:
			place("sprite25",canvas,ctx,[-0.998809814453125,-0.013580322265625,-0.013580322265625,0.998809814453125,-6654.0,2269.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 588:
			place("sprite25",canvas,ctx,[-0.99871826171875,-0.017578125,-0.017578125,0.99871826171875,-6614.0,2289.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 589:
			place("sprite25",canvas,ctx,[-0.9987030029296875,-0.018310546875,-0.018310546875,0.9987030029296875,-6572.0,2310.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 590:
			place("sprite25",canvas,ctx,[-0.9985809326171875,-0.0223236083984375,-0.0223236083984375,0.9985809326171875,-6532.0,2327.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 591:
			place("sprite25",canvas,ctx,[-0.998504638671875,-0.02630615234375,-0.02630615234375,0.998504638671875,-6489.0,2345.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 592:
			place("sprite25",canvas,ctx,[-0.99847412109375,-0.0270538330078125,-0.0270538330078125,0.99847412109375,-6446.0,2360.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 593:
			place("sprite25",canvas,ctx,[-0.9983367919921875,-0.0310821533203125,-0.0310821533203125,0.9983367919921875,-6404.0,2373.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 594:
			place("sprite25",canvas,ctx,[-0.998199462890625,-0.0350799560546875,-0.0350799560546875,0.998199462890625,-6360.0,2385.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 595:
			place("sprite25",canvas,ctx,[-0.9981689453125,-0.0358123779296875,-0.0358123779296875,0.9981689453125,-6315.0,2395.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 596:
			place("sprite25",canvas,ctx,[-0.99798583984375,-0.039825439453125,-0.039825439453125,0.99798583984375,-6269.0,2403.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 597:
			place("sprite25",canvas,ctx,[-0.997802734375,-0.0438385009765625,-0.0438385009765625,0.997802734375,-6224.0,2409.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 598:
			place("sprite25",canvas,ctx,[-0.997772216796875,-0.0445709228515625,-0.0445709228515625,0.997772216796875,-6179.0,2415.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 599:
			place("sprite25",canvas,ctx,[-0.99755859375,-0.0485687255859375,-0.0485687255859375,0.99755859375,-6134.0,2418.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 600:
			place("sprite25",canvas,ctx,[-0.9973297119140625,-0.0525665283203125,-0.0525665283203125,0.9973297119140625,-6086.0,2419.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 601:
			place("sprite25",canvas,ctx,[-0.9972991943359375,-0.053314208984375,-0.053314208984375,0.9972991943359375,-6041.0,2417.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 602:
			place("sprite25",canvas,ctx,[-0.9970550537109375,-0.05731201171875,-0.05731201171875,0.9970550537109375,-5993.0,2414.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 603:
			place("sprite25",canvas,ctx,[-0.9968109130859375,-0.0613250732421875,-0.0613250732421875,0.9968109130859375,-5948.0,2411.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 604:
			place("sprite25",canvas,ctx,[-0.99676513671875,-0.0620574951171875,-0.0620574951171875,0.99676513671875,-5902.0,2404.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 605:
			place("sprite25",canvas,ctx,[-0.996490478515625,-0.066070556640625,-0.066070556640625,0.996490478515625,-5857.0,2396.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 606:
			place("sprite25",canvas,ctx,[-0.9962005615234375,-0.0700531005859375,-0.0700531005859375,0.9962005615234375,-5811.0,2385.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 607:
			place("sprite25",canvas,ctx,[-0.9958648681640625,-0.0740509033203125,-0.0740509033203125,0.9958648681640625,-5767.0,2373.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 608:
			place("sprite25",canvas,ctx,[-0.995819091796875,-0.074798583984375,-0.074798583984375,0.995819091796875,-5722.0,2361.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 609:
			place("sprite25",canvas,ctx,[-0.9954986572265625,-0.078765869140625,-0.078765869140625,0.9954986572265625,-5679.0,2346.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 610:
			place("sprite25",canvas,ctx,[-0.99517822265625,-0.0827789306640625,-0.0827789306640625,0.99517822265625,-5635.0,2331.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 611:
			place("sprite25",canvas,ctx,[-0.9951019287109375,-0.0835113525390625,-0.0835113525390625,0.9951019287109375,-5593.0,2313.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 612:
			place("sprite25",canvas,ctx,[-0.9947357177734375,-0.0875091552734375,-0.0875091552734375,0.9947357177734375,-5551.0,2294.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 613:
			place("sprite25",canvas,ctx,[-0.994354248046875,-0.09149169921875,-0.09149169921875,0.994354248046875,-5509.0,2275.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 614:
			place("sprite25",canvas,ctx,[-0.994293212890625,-0.09222412109375,-0.09222412109375,0.994293212890625,-5469.0,2254.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 615:
			place("sprite25",canvas,ctx,[-0.993896484375,-0.0962066650390625,-0.0962066650390625,0.993896484375,-5429.0,2231.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 616:
			place("sprite25",canvas,ctx,[-0.993499755859375,-0.1002044677734375,-0.1002044677734375,0.993499755859375,-5388.0,2209.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 617:
			place("sprite25",canvas,ctx,[-0.993408203125,-0.1009521484375,-0.1009521484375,0.993408203125,-5348.0,2185.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 618:
			place("sprite25",canvas,ctx,[-0.99298095703125,-0.10491943359375,-0.10491943359375,0.99298095703125,-5311.0,2159.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 619:
			place("sprite25",canvas,ctx,[-0.9925384521484375,-0.1089019775390625,-0.1089019775390625,0.9925384521484375,-5273.0,2135.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 620:
			place("sprite25",canvas,ctx,[-0.9924468994140625,-0.109649658203125,-0.109649658203125,0.9924468994140625,-5235.0,2108.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 621:
			place("sprite25",canvas,ctx,[-0.9919891357421875,-0.1136322021484375,-0.1136322021484375,0.9919891357421875,-5197.0,2082.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 622:
			place("sprite25",canvas,ctx,[-0.99151611328125,-0.1175994873046875,-0.1175994873046875,0.99151611328125,-5161.0,2055.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 623:
			place("sprite25",canvas,ctx,[-0.991424560546875,-0.11834716796875,-0.11834716796875,0.991424560546875,-5124.0,2026.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 624:
			place("sprite25",canvas,ctx,[-0.9909210205078125,-0.122314453125,-0.122314453125,0.9909210205078125,-5089.0,1998.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 625:
			place("sprite25",canvas,ctx,[-0.9904022216796875,-0.126312255859375,-0.126312255859375,0.9904022216796875,-5054.0,1969.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 626:
			place("sprite25",canvas,ctx,[-0.9903106689453125,-0.1270294189453125,-0.1270294189453125,0.9903106689453125,-5019.0,1940.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 627:
			place("sprite25",canvas,ctx,[-0.989776611328125,-0.131011962890625,-0.131011962890625,0.989776611328125,-4985.0,1909.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 628:
			place("sprite25",canvas,ctx,[-0.9892120361328125,-0.134979248046875,-0.134979248046875,0.9892120361328125,-4953.0,1878.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 629:
			place("sprite25",canvas,ctx,[-0.9891204833984375,-0.1356964111328125,-0.1356964111328125,0.9891204833984375,-4919.0,1848.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 630:
			place("sprite25",canvas,ctx,[-0.988555908203125,-0.1396942138671875,-0.1396942138671875,0.988555908203125,-4886.0,1818.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 631:
			place("sprite25",canvas,ctx,[-0.987945556640625,-0.1436309814453125,-0.1436309814453125,0.987945556640625,-4853.0,1789.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 632:
			place("sprite25",canvas,ctx,[-0.98785400390625,-0.144378662109375,-0.144378662109375,0.98785400390625,-4820.0,1759.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 633:
			place("sprite25",canvas,ctx,[-0.98724365234375,-0.148345947265625,-0.148345947265625,0.98724365234375,-4787.0,1729.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 634:
			place("sprite25",canvas,ctx,[-0.98663330078125,-0.152313232421875,-0.152313232421875,0.98663330078125,-4752.0,1700.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 635:
			place("sprite25",canvas,ctx,[-0.9859771728515625,-0.1562652587890625,-0.1562652587890625,0.9859771728515625,-4720.0,1670.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 636:
			place("sprite25",canvas,ctx,[-0.985870361328125,-0.156982421875,-0.156982421875,0.985870361328125,-4687.0,1641.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 637:
			place("sprite25",canvas,ctx,[-0.9852294921875,-0.1609344482421875,-0.1609344482421875,0.9852294921875,-4652.0,1611.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 638:
			place("sprite25",canvas,ctx,[-0.9845428466796875,-0.1649017333984375,-0.1649017333984375,0.9845428466796875,-4620.0,1582.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 639:
			place("sprite25",canvas,ctx,[-0.98443603515625,-0.1656341552734375,-0.1656341552734375,0.98443603515625,-4587.0,1553.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 640:
			place("sprite25",canvas,ctx,[-0.9837493896484375,-0.1695709228515625,-0.1695709228515625,0.9837493896484375,-4553.0,1523.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 641:
			place("sprite25",canvas,ctx,[-0.9830322265625,-0.17352294921875,-0.17352294921875,0.9830322265625,-4519.0,1495.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 642:
			place("sprite25",canvas,ctx,[-0.9828948974609375,-0.17425537109375,-0.17425537109375,0.9828948974609375,-4486.0,1466.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 643:
			place("sprite25",canvas,ctx,[-0.982177734375,-0.178192138671875,-0.178192138671875,0.982177734375,-4452.0,1436.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 644:
			place("sprite25",canvas,ctx,[-0.9814453125,-0.1821441650390625,-0.1821441650390625,0.9814453125,-4418.0,1408.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 645:
			place("sprite25",canvas,ctx,[-0.9813232421875,-0.182861328125,-0.182861328125,0.9813232421875,-4382.0,1379.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 646:
			place("sprite25",canvas,ctx,[-0.98052978515625,-0.186798095703125,-0.186798095703125,0.98052978515625,-4348.0,1351.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 647:
			place("sprite25",canvas,ctx,[-0.9797821044921875,-0.19073486328125,-0.19073486328125,0.9797821044921875,-4314.0,1322.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 648:
			place("sprite25",canvas,ctx,[-0.9796142578125,-0.19146728515625,-0.19146728515625,0.9796142578125,-4279.0,1294.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 649:
			place("sprite25",canvas,ctx,[-0.97882080078125,-0.195404052734375,-0.195404052734375,0.97882080078125,-4245.0,1266.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 650:
			place("sprite25",canvas,ctx,[-0.97802734375,-0.199310302734375,-0.199310302734375,0.97802734375,-4210.0,1237.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 651:
			place("sprite25",canvas,ctx,[-0.977874755859375,-0.200042724609375,-0.200042724609375,0.977874755859375,-4175.0,1209.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 652:
			place("sprite25",canvas,ctx,[-0.9770355224609375,-0.2039642333984375,-0.2039642333984375,0.9770355224609375,-4140.0,1180.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 653:
			place("sprite25",canvas,ctx,[-0.9762115478515625,-0.2079010009765625,-0.2079010009765625,0.9762115478515625,-4105.0,1153.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 654:
			place("sprite25",canvas,ctx,[-0.9760284423828125,-0.2086181640625,-0.2086181640625,0.9760284423828125,-4069.0,1126.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 655:
			place("sprite25",canvas,ctx,[-0.975189208984375,-0.2125091552734375,-0.2125091552734375,0.975189208984375,-4035.0,1097.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 656:
			place("sprite25",canvas,ctx,[-0.9743194580078125,-0.2164459228515625,-0.2164459228515625,0.9743194580078125,-3999.0,1071.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 657:
			place("sprite25",canvas,ctx,[-0.974151611328125,-0.2171783447265625,-0.2171783447265625,0.974151611328125,-3964.0,1044.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 658:
			place("sprite25",canvas,ctx,[-0.9732513427734375,-0.2210693359375,-0.2210693359375,0.9732513427734375,-3927.0,1015.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 659:
			place("sprite25",canvas,ctx,[-0.9723358154296875,-0.2249755859375,-0.2249755859375,0.9723358154296875,-3892.0,989.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 660:
			place("sprite25",canvas,ctx,[-0.97216796875,-0.2256927490234375,-0.2256927490234375,0.97216796875,-3857.0,961.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 661:
			place("sprite25",canvas,ctx,[-0.97125244140625,-0.229583740234375,-0.229583740234375,0.97125244140625,-3820.0,935.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 662:
			place("sprite25",canvas,ctx,[-0.9702911376953125,-0.233489990234375,-0.233489990234375,0.9702911376953125,-3785.0,908.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 663:
			place("sprite25",canvas,ctx,[-0.970123291015625,-0.2342071533203125,-0.2342071533203125,0.970123291015625,-3749.0,881.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 664:
			place("sprite25",canvas,ctx,[-0.969146728515625,-0.23809814453125,-0.23809814453125,0.969146728515625,-3712.0,855.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 665:
			place("sprite25",canvas,ctx,[-0.9681549072265625,-0.24200439453125,-0.24200439453125,0.9681549072265625,-3676.0,830.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 666:
			place("sprite25",canvas,ctx,[-0.9671630859375,-0.2458648681640625,-0.2458648681640625,0.9671630859375,-3638.0,803.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 667:
			place("sprite25",canvas,ctx,[-0.96697998046875,-0.2465972900390625,-0.2465972900390625,0.96697998046875,-3602.0,778.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 668:
			place("sprite25",canvas,ctx,[-0.9659881591796875,-0.2504730224609375,-0.2504730224609375,0.9659881591796875,-3565.0,751.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 669:
			place("sprite25",canvas,ctx,[-0.9649505615234375,-0.254364013671875,-0.254364013671875,0.9649505615234375,-3527.0,726.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 670:
			place("sprite25",canvas,ctx,[-0.9647674560546875,-0.25506591796875,-0.25506591796875,0.9647674560546875,-3490.0,700.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 671:
			place("sprite25",canvas,ctx,[-0.963714599609375,-0.2589263916015625,-0.2589263916015625,0.963714599609375,-3452.0,675.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 672:
			place("sprite25",canvas,ctx,[-0.962646484375,-0.2628021240234375,-0.2628021240234375,0.962646484375,-3416.0,650.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 673:
			place("sprite25",canvas,ctx,[-0.96246337890625,-0.2635040283203125,-0.2635040283203125,0.96246337890625,-3378.0,627.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 674:
			place("sprite25",canvas,ctx,[-0.96136474609375,-0.2673492431640625,-0.2673492431640625,0.96136474609375,-3339.0,602.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 675:
			place("sprite25",canvas,ctx,[-0.96026611328125,-0.2712249755859375,-0.2712249755859375,0.96026611328125,-3300.0,577.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 676:
			place("sprite25",canvas,ctx,[-0.9600830078125,-0.271942138671875,-0.271942138671875,0.9600830078125,-3263.0,554.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 677:
			place("sprite25",canvas,ctx,[-0.958953857421875,-0.2757720947265625,-0.2757720947265625,0.958953857421875,-3224.0,529.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 678:
			place("sprite25",canvas,ctx,[-0.9578399658203125,-0.279632568359375,-0.279632568359375,0.9578399658203125,-3185.0,506.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 679:
			place("sprite25",canvas,ctx,[-0.957611083984375,-0.2803497314453125,-0.2803497314453125,0.957611083984375,-3145.0,483.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 680:
			place("sprite25",canvas,ctx,[-0.956451416015625,-0.2841644287109375,-0.2841644287109375,0.956451416015625,-3108.0,459.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 681:
			place("sprite25",canvas,ctx,[-0.9553070068359375,-0.28802490234375,-0.28802490234375,0.9553070068359375,-3069.0,438.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 682:
			place("sprite25",canvas,ctx,[-0.9550933837890625,-0.288726806640625,-0.288726806640625,0.9550933837890625,-3028.0,417.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 683:
			place("sprite25",canvas,ctx,[-0.95391845703125,-0.292572021484375,-0.292572021484375,0.95391845703125,-2985.0,399.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 684:
			place("sprite25",canvas,ctx,[-0.9527130126953125,-0.29638671875,-0.29638671875,0.9527130126953125,-2946.0,380.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 685:
			place("sprite25",canvas,ctx,[-0.952484130859375,-0.2971038818359375,-0.2971038818359375,0.952484130859375,-2903.0,364.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 686:
			place("sprite25",canvas,ctx,[-0.9512481689453125,-0.3009185791015625,-0.3009185791015625,0.9512481689453125,-2859.0,351.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 687:
			place("sprite25",canvas,ctx,[-0.9500579833984375,-0.3047332763671875,-0.3047332763671875,0.9500579833984375,-2817.0,337.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 688:
			place("sprite25",canvas,ctx,[-0.949859619140625,-0.308380126953125,-0.308380126953125,0.949859619140625,-2772.0,326.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 689:
			place("sprite25",canvas,ctx,[-0.9513092041015625,-0.300811767578125,-0.300811767578125,0.9513092041015625,-2687.0,310.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 690:
			place("sprite25",canvas,ctx,[-0.9537506103515625,-0.2930145263671875,-0.2930145263671875,0.9537506103515625,-2600.0,301.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 691:
			place("sprite25",canvas,ctx,[-0.9552154541015625,-0.288360595703125,-0.288360595703125,0.9552154541015625,-2512.0,298.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 692:
			place("sprite25",canvas,ctx,[-0.956634521484375,-0.28369140625,-0.28369140625,0.956634521484375,-2425.0,301.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 693:
			place("sprite25",canvas,ctx,[-0.9589385986328125,-0.27587890625,-0.27587890625,0.9589385986328125,-2336.0,313.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 694:
			place("sprite25",canvas,ctx,[-0.960296630859375,-0.2711944580078125,-0.2711944580078125,0.960296630859375,-2249.0,329.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 695:
			place("sprite25",canvas,ctx,[-0.9625244140625,-0.263336181640625,-0.263336181640625,0.9625244140625,-2165.0,352.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 696:
			place("sprite25",canvas,ctx,[-0.9638214111328125,-0.258636474609375,-0.258636474609375,0.9638214111328125,-2080.0,380.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 697:
			place("sprite25",canvas,ctx,[-0.9659271240234375,-0.2507476806640625,-0.2507476806640625,0.9659271240234375,-1997.0,412.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 698:
			place("sprite25",canvas,ctx,[-0.9671783447265625,-0.246063232421875,-0.246063232421875,0.9671783447265625,-1918.0,449.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 699:
			place("sprite25",canvas,ctx,[-0.9691925048828125,-0.2381439208984375,-0.2381439208984375,0.9691925048828125,-1840.0,491.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 700:
			place("sprite25",canvas,ctx,[-0.9703826904296875,-0.2333984375,-0.2333984375,0.9703826904296875,-1765.0,535.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 701:
			place("sprite25",canvas,ctx,[-0.9722747802734375,-0.2254791259765625,-0.2254791259765625,0.9722747802734375,-1690.0,582.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 702:
			place("sprite25",canvas,ctx,[-0.9733734130859375,-0.2207183837890625,-0.2207183837890625,0.9733734130859375,-1618.0,630.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 703:
			place("sprite25",canvas,ctx,[-0.9752044677734375,-0.212799072265625,-0.212799072265625,0.9752044677734375,-1549.0,681.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 704:
			place("sprite25",canvas,ctx,[-0.9762420654296875,-0.2080078125,-0.2080078125,0.9762420654296875,-1479.0,735.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 705:
			place("sprite25",canvas,ctx,[-0.9779510498046875,-0.200042724609375,-0.200042724609375,0.9779510498046875,-1412.0,790.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 706:
			place("sprite25",canvas,ctx,[-0.97894287109375,-0.1952667236328125,-0.1952667236328125,0.97894287109375,-1347.0,848.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 707:
			place("sprite25",canvas,ctx,[-0.9805450439453125,-0.187286376953125,-0.187286376953125,0.9805450439453125,-1282.0,903.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 708:
			place("sprite25",canvas,ctx,[-0.981475830078125,-0.1824798583984375,-0.1824798583984375,0.981475830078125,-1219.0,958.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 709:
			place("sprite25",canvas,ctx,[-0.982940673828125,-0.174468994140625,-0.174468994140625,0.982940673828125,-1154.0,1015.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 710:
			place("sprite25",canvas,ctx,[-0.98382568359375,-0.169647216796875,-0.169647216796875,0.98382568359375,-1089.0,1070.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 711:
			place("sprite25",canvas,ctx,[-0.985198974609375,-0.16162109375,-0.16162109375,0.985198974609375,-1023.0,1122.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 712:
			place("sprite25",canvas,ctx,[-0.985992431640625,-0.1568145751953125,-0.1568145751953125,0.985992431640625,-957.0,1176.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 713:
			place("sprite25",canvas,ctx,[-0.986785888671875,-0.152008056640625,-0.152008056640625,0.986785888671875,-892.0,1229.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 714:
			place("sprite25",canvas,ctx,[-0.988037109375,-0.1439361572265625,-0.1439361572265625,0.988037109375,-824.0,1280.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 715:
			place("sprite25",canvas,ctx,[-0.988739013671875,-0.1391143798828125,-0.1391143798828125,0.988739013671875,-757.0,1331.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 716:
			place("sprite25",canvas,ctx,[-0.9898834228515625,-0.13104248046875,-0.13104248046875,0.9898834228515625,-688.0,1382.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 717:
			place("sprite25",canvas,ctx,[-0.9905242919921875,-0.1262054443359375,-0.1262054443359375,0.9905242919921875,-617.0,1430.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 718:
			place("sprite25",canvas,ctx,[-0.9915771484375,-0.118133544921875,-0.118133544921875,0.9915771484375,-548.0,1479.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 719:
			place("sprite25",canvas,ctx,[-0.9921722412109375,-0.1132659912109375,-0.1132659912109375,0.9921722412109375,-476.0,1526.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 720:
			place("sprite25",canvas,ctx,[-0.993072509765625,-0.1051788330078125,-0.1051788330078125,0.993072509765625,-406.0,1573.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 721:
			place("sprite25",canvas,ctx,[-0.9936065673828125,-0.1003265380859375,-0.1003265380859375,0.9936065673828125,-333.0,1618.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 722:
			place("sprite25",canvas,ctx,[-0.99444580078125,-0.0922393798828125,-0.0922393798828125,0.99444580078125,-258.0,1661.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 723:
			place("sprite25",canvas,ctx,[-0.994903564453125,-0.0873565673828125,-0.0873565673828125,0.994903564453125,-184.0,1705.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 724:
			place("sprite25",canvas,ctx,[-0.995635986328125,-0.0792388916015625,-0.0792388916015625,0.995635986328125,-110.0,1745.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 725:
			place("sprite25",canvas,ctx,[-0.99603271484375,-0.0743560791015625,-0.0743560791015625,0.99603271484375,-33.0,1786.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 726:
			place("sprite25",canvas,ctx,[-0.99664306640625,-0.0662384033203125,-0.0662384033203125,0.99664306640625,44.0,1823.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 727:
			place("sprite25",canvas,ctx,[-0.9969635009765625,-0.0614013671875,-0.0614013671875,0.9969635009765625,122.0,1860.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 728:
			place("sprite25",canvas,ctx,[-0.997467041015625,-0.053253173828125,-0.053253173828125,0.997467041015625,201.0,1894.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 729:
			place("sprite25",canvas,ctx,[-0.9977264404296875,-0.0483856201171875,-0.0483856201171875,0.9977264404296875,281.0,1927.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 730:
			place("sprite25",canvas,ctx,[-0.9981536865234375,-0.0402374267578125,-0.0402374267578125,0.9981536865234375,362.0,1956.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 731:
			place("sprite25",canvas,ctx,[-0.9983673095703125,-0.0353851318359375,-0.0353851318359375,0.9983673095703125,443.0,1984.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 732:
			place("sprite25",canvas,ctx,[-0.9986419677734375,-0.0272216796875,-0.0272216796875,0.9986419677734375,523.0,2009.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 733:
			place("sprite25",canvas,ctx,[-0.998779296875,-0.0223541259765625,-0.0223541259765625,0.998779296875,603.0,2031.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 734:
			place("sprite25",canvas,ctx,[-0.998931884765625,-0.0174713134765625,-0.0174713134765625,0.998931884765625,683.0,2052.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 735:
			place("sprite25",canvas,ctx,[-0.9990692138671875,-0.009307861328125,-0.009307861328125,0.9990692138671875,765.0,2072.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 736:
			place("sprite25",canvas,ctx,[-0.9991302490234375,-0.0044403076171875,-0.0044403076171875,0.9991302490234375,846.0,2087.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 737:
			place("sprite25",canvas,ctx,[-0.9991455078125,4.425048828125E-4,4.425048828125E-4,0.9991455078125,930.0,2100.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 738:
			place("sprite25",canvas,ctx,[-0.9991455078125,0.00531005859375,0.00531005859375,0.9991455078125,1014.0,2107.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 739:
			place("sprite25",canvas,ctx,[-0.9990386962890625,0.0134735107421875,0.0134735107421875,0.9990386962890625,1098.0,2111.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 740:
			place("sprite25",canvas,ctx,[-0.99896240234375,0.0183563232421875,0.0183563232421875,0.99896240234375,1181.0,2106.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 741:
			place("sprite25",canvas,ctx,[-0.9987335205078125,0.0265045166015625,0.0265045166015625,0.9987335205078125,1267.0,2094.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 742:
			place("sprite25",canvas,ctx,[-0.9986114501953125,0.0313720703125,0.0313720703125,0.9986114501953125,1348.0,2070.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 743:
			place("sprite25",canvas,ctx,[-0.9983062744140625,0.0395355224609375,0.0395355224609375,0.9983062744140625,1426.0,2031.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 744:
			place("sprite25",canvas,ctx,[-0.9980926513671875,0.0443878173828125,0.0443878173828125,0.9980926513671875,1494.0,1979.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 745:
			place("sprite25",canvas,ctx,[-0.9976959228515625,0.0525360107421875,0.0525360107421875,0.9976959228515625,1562.0,1925.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 746:
			place("sprite25",canvas,ctx,[-0.9974212646484375,0.057403564453125,0.057403564453125,0.9974212646484375,1627.0,1868.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 747:
			place("sprite25",canvas,ctx,[-0.99688720703125,0.0655364990234375,0.0655364990234375,0.99688720703125,1692.0,1811.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 748:
			place("sprite25",canvas,ctx,[-0.996551513671875,0.0703887939453125,0.0703887939453125,0.996551513671875,1754.0,1751.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 749:
			place("sprite25",canvas,ctx,[-0.9959259033203125,0.0785369873046875,0.0785369873046875,0.9959259033203125,1816.0,1691.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 750:
			place("sprite25",canvas,ctx,[-0.9955291748046875,0.083404541015625,0.083404541015625,0.9955291748046875,1876.0,1629.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 751:
			place("sprite25",canvas,ctx,[-0.994781494140625,0.091522216796875,0.091522216796875,0.994781494140625,1936.0,1565.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 752:
			place("sprite25",canvas,ctx,[-0.9943389892578125,0.09637451171875,0.09637451171875,0.9943389892578125,1993.0,1500.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 753:
			place("sprite25",canvas,ctx,[-0.9935150146484375,0.1045074462890625,0.1045074462890625,0.9935150146484375,2048.0,1433.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 754:
			place("sprite25",canvas,ctx,[-0.99298095703125,0.109344482421875,0.109344482421875,0.99298095703125,2101.0,1364.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 755:
			place("sprite25",canvas,ctx,[-0.992431640625,0.1141815185546875,0.1141815185546875,0.992431640625,2153.0,1296.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 756:
			place("sprite25",canvas,ctx,[-0.9914398193359375,0.122283935546875,0.122283935546875,0.9914398193359375,2203.0,1227.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 757:
			place("sprite25",canvas,ctx,[-0.9908294677734375,0.1271209716796875,0.1271209716796875,0.9908294677734375,2252.0,1154.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 758:
			place("sprite25",canvas,ctx,[-0.98974609375,0.135223388671875,0.135223388671875,0.98974609375,2302.0,1082.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 759:
			place("sprite25",canvas,ctx,[-0.9890899658203125,0.1400604248046875,0.1400604248046875,0.9890899658203125,2349.0,1010.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 760:
			place("sprite25",canvas,ctx,[-0.9878692626953125,0.148101806640625,0.148101806640625,0.9878692626953125,2395.0,936.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 761:
			place("sprite25",canvas,ctx,[-0.9871368408203125,0.152923583984375,0.152923583984375,0.9871368408203125,2439.0,861.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 762:
			place("sprite25",canvas,ctx,[-0.9858551025390625,0.1609954833984375,0.1609954833984375,0.9858551025390625,2478.0,785.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 763:
			place("sprite25",canvas,ctx,[-0.9850311279296875,0.165802001953125,0.165802001953125,0.9850311279296875,2519.0,708.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 764:
			place("sprite25",canvas,ctx,[-0.9836273193359375,0.1738433837890625,0.1738433837890625,0.9836273193359375,2567.0,622.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 765:
			place("sprite25",canvas,ctx,[-0.9827880859375,0.1786346435546875,0.1786346435546875,0.9827880859375,2656.0,536.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 766:
			place("sprite25",canvas,ctx,[-0.9812469482421875,0.186676025390625,0.186676025390625,0.9812469482421875,2750.0,456.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 767:
			place("sprite25",canvas,ctx,[-0.9803314208984375,0.1914520263671875,0.1914520263671875,0.9803314208984375,2836.0,387.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 768:
			place("sprite25",canvas,ctx,[-0.978729248046875,0.1994476318359375,0.1994476318359375,0.978729248046875,2917.0,324.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 769:
			place("sprite25",canvas,ctx,[-0.9777374267578125,0.2042236328125,0.2042236328125,0.9777374267578125,2998.0,263.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 770:
			place("sprite25",canvas,ctx,[-0.9760284423828125,0.2122039794921875,0.2122039794921875,0.9760284423828125,3074.0,205.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 771:
			place("sprite25",canvas,ctx,[-0.974945068359375,0.2169647216796875,0.2169647216796875,0.974945068359375,3154.0,147.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 772:
			place("sprite25",canvas,ctx,[-0.973114013671875,0.22491455078125,0.22491455078125,0.973114013671875,3231.0,91.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 773:
			place("sprite25",canvas,ctx,[-0.972015380859375,0.229705810546875,0.229705810546875,0.972015380859375,3307.0,36.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 774:
			place("sprite25",canvas,ctx,[-0.9701080322265625,0.2376251220703125,0.2376251220703125,0.9701080322265625,3385.0,-20.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 775:
			place("sprite25",canvas,ctx,[-0.9689178466796875,0.2423553466796875,0.2423553466796875,0.9689178466796875,3459.0,-74.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 776:
			place("sprite25",canvas,ctx,[-0.96771240234375,0.2470703125,0.2470703125,0.96771240234375,3535.0,-128.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 777:
			place("sprite25",canvas,ctx,[-0.9656829833984375,0.2549896240234375,0.2549896240234375,0.9656829833984375,3610.0,-182.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 778:
			place("sprite25",canvas,ctx,[-0.9644012451171875,0.25970458984375,0.25970458984375,0.9644012451171875,3686.0,-236.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 779:
			place("sprite25",canvas,ctx,[-0.9622344970703125,0.2675628662109375,0.2675628662109375,0.9622344970703125,3760.0,-287.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 780:
			place("sprite25",canvas,ctx,[-0.960906982421875,0.27227783203125,0.27227783203125,0.960906982421875,3834.0,-341.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 781:
			place("sprite25",canvas,ctx,[-0.9586334228515625,0.28009033203125,0.28009033203125,0.9586334228515625,3909.0,-393.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 782:
			place("sprite25",canvas,ctx,[-0.957275390625,0.2848052978515625,0.2848052978515625,0.957275390625,3984.0,-445.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 783:
			place("sprite25",canvas,ctx,[-0.95489501953125,0.2926025390625,0.2926025390625,0.95489501953125,4057.0,-496.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 784:
			place("sprite25",canvas,ctx,[-0.95343017578125,0.2972869873046875,0.2972869873046875,0.95343017578125,4132.0,-548.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 785:
			place("sprite25",canvas,ctx,[-0.9509735107421875,0.3050384521484375,0.3050384521484375,0.9509735107421875,4206.0,-598.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 786:
			place("sprite25",canvas,ctx,[-0.9494781494140625,0.3097076416015625,0.3097076416015625,0.9494781494140625,4280.0,-649.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 787:
			place("sprite25",canvas,ctx,[-0.9468841552734375,0.3174285888671875,0.3174285888671875,0.9468841552734375,4352.0,-700.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 788:
			place("sprite25",canvas,ctx,[-0.9453277587890625,0.3220672607421875,0.3220672607421875,0.9453277587890625,4426.0,-751.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 789:
			place("sprite25",canvas,ctx,[-0.9426422119140625,0.3297882080078125,0.3297882080078125,0.9426422119140625,4500.0,-801.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 790:
			place("sprite25",canvas,ctx,[-0.9410247802734375,0.334381103515625,0.334381103515625,0.9410247802734375,4574.0,-852.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 791:
			place("sprite25",canvas,ctx,[-0.9382476806640625,0.342071533203125,0.342071533203125,0.9382476806640625,4647.0,-901.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 792:
			place("sprite25",canvas,ctx,[-0.936553955078125,0.346649169921875,0.346649169921875,0.936553955078125,4721.0,-951.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 793:
			place("sprite25",canvas,ctx,[-0.933685302734375,0.3542938232421875,0.3542938232421875,0.933685302734375,4793.0,-1001.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 794:
			place("sprite25",canvas,ctx,[-0.93194580078125,0.358856201171875,0.358856201171875,0.93194580078125,4866.0,-1052.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 795:
			place("sprite25",canvas,ctx,[-0.928985595703125,0.366455078125,0.366455078125,0.928985595703125,4939.0,-1101.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 796:
			place("sprite25",canvas,ctx,[-0.9271697998046875,0.3709869384765625,0.3709869384765625,0.9271697998046875,5013.0,-1151.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 797:
			place("sprite25",canvas,ctx,[-0.9253387451171875,0.3755340576171875,0.3755340576171875,0.9253387451171875,5086.0,-1200.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 798:
			place("sprite25",canvas,ctx,[-0.9222412109375,0.383087158203125,0.383087158203125,0.9222412109375,5159.0,-1248.0],ctrans,1,(18+time)%20,0,time);
			break;
		case 799:
			place("sprite25",canvas,ctx,[-0.92034912109375,0.3875885009765625,0.3875885009765625,0.92034912109375,5231.0,-1299.0],ctrans,1,(19+time)%20,0,time);
			break;
		case 800:
			place("sprite25",canvas,ctx,[-0.917144775390625,0.395111083984375,0.395111083984375,0.917144775390625,5305.0,-1349.0],ctrans,1,(0+time)%20,0,time);
			break;
		case 801:
			place("sprite25",canvas,ctx,[-0.9152069091796875,0.3995819091796875,0.3995819091796875,0.9152069091796875,5377.0,-1398.0],ctrans,1,(1+time)%20,0,time);
			break;
		case 802:
			place("sprite25",canvas,ctx,[-0.9118804931640625,0.4070587158203125,0.4070587158203125,0.9118804931640625,5450.0,-1447.0],ctrans,1,(2+time)%20,0,time);
			break;
		case 803:
			place("sprite25",canvas,ctx,[-0.909881591796875,0.4114990234375,0.4114990234375,0.909881591796875,5523.0,-1496.0],ctrans,1,(3+time)%20,0,time);
			break;
		case 804:
			place("sprite25",canvas,ctx,[-0.9064788818359375,0.4189300537109375,0.4189300537109375,0.9064788818359375,5595.0,-1545.0],ctrans,1,(4+time)%20,0,time);
			break;
		case 805:
			place("sprite25",canvas,ctx,[-0.9044036865234375,0.4233551025390625,0.4233551025390625,0.9044036865234375,5668.0,-1593.0],ctrans,1,(5+time)%20,0,time);
			break;
		case 806:
			place("sprite25",canvas,ctx,[-0.900909423828125,0.430755615234375,0.430755615234375,0.900909423828125,5741.0,-1643.0],ctrans,1,(6+time)%20,0,time);
			break;
		case 807:
			place("sprite25",canvas,ctx,[-0.8987884521484375,0.435150146484375,0.435150146484375,0.8987884521484375,5813.0,-1691.0],ctrans,1,(7+time)%20,0,time);
			break;
		case 808:
			place("sprite25",canvas,ctx,[-0.89520263671875,0.442474365234375,0.442474365234375,0.89520263671875,5886.0,-1741.0],ctrans,1,(8+time)%20,0,time);
			break;
		case 809:
			place("sprite25",canvas,ctx,[-0.8930206298828125,0.44683837890625,0.44683837890625,0.8930206298828125,5957.0,-1788.0],ctrans,1,(9+time)%20,0,time);
			break;
		case 810:
			place("sprite25",canvas,ctx,[-0.88934326171875,0.454132080078125,0.454132080078125,0.88934326171875,6030.0,-1837.0],ctrans,1,(10+time)%20,0,time);
			break;
		case 811:
			place("sprite25",canvas,ctx,[-0.887115478515625,0.458465576171875,0.458465576171875,0.887115478515625,6103.0,-1884.0],ctrans,1,(11+time)%20,0,time);
			break;
		case 812:
			place("sprite25",canvas,ctx,[-0.883331298828125,0.4657135009765625,0.4657135009765625,0.883331298828125,6174.0,-1933.0],ctrans,1,(12+time)%20,0,time);
			break;
		case 813:
			place("sprite25",canvas,ctx,[-0.8810272216796875,0.47003173828125,0.47003173828125,0.8810272216796875,6246.0,-1981.0],ctrans,1,(13+time)%20,0,time);
			break;
		case 814:
			place("sprite25",canvas,ctx,[-0.877166748046875,0.47723388671875,0.47723388671875,0.877166748046875,6319.0,-2030.0],ctrans,1,(14+time)%20,0,time);
			break;
		case 815:
			place("sprite25",canvas,ctx,[-0.87481689453125,0.48150634765625,0.48150634765625,0.87481689453125,6391.0,-2078.0],ctrans,1,(15+time)%20,0,time);
			break;
		case 816:
			place("sprite25",canvas,ctx,[-0.870849609375,0.4886627197265625,0.4886627197265625,0.870849609375,6464.0,-2126.0],ctrans,1,(16+time)%20,0,time);
			break;
		case 817:
			place("sprite25",canvas,ctx,[-0.8684234619140625,0.492919921875,0.492919921875,0.8684234619140625,6536.0,-2173.0],ctrans,1,(17+time)%20,0,time);
			break;
		case 818:
			place("sprite25",canvas,ctx,[-0.86602783203125,0.5,0.5,0.86602783203125,6607.0,-2223.0],ctrans,1,(18+time)%20,0,time);
			break;
	}
}

var imageObj27 = document.createElement("img");
imageObj27.src="data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABlCAYAAAB+zNxgAABo0UlEQVR4Xty9BXQU27otXCTEXTvScXdFgwTYuFtwh+DuDsE9OCR48KDB3d3d3eLuNv9Z1UlI2Pve994/zhj3nFs9Vkp79ao11ze/OVdXgyD8Ty4QC6QibZYdU5TSfcVlimuk/bLrS9bl3i+Wr4Lg+EkQfBMEwQW6gmHpNSUX/66/tJTWUbKjOF3+9bvu0n3F+3/XJe1XuK5iKXlDxVLu7H/+Uu5+FKuyjd/H/zikOPZnBwtCDWPVFm6awtKqlYV9NfRVfzR2tEjtXM0nroW705MW9nbbBwuV6/7T+34XBZjSdtlnlLyk/ZLrSkEX9/6o5O91/i6KC/4o5c7+5y/l7ud31/15vFyROkAQ1Bh51cytB/jqma4OMJCvbOLht9LeyDDBsJIAexYrXqrFosPSyMURXZ280EXFPGW6YBmJsGi/cnU6oq7g+nu/pg7XamWfVYJgxQgsOV7a2grglLvsj1JS0d9Lydn//KXsbkujogTMcucUpyHEtAjQdPN1bq2pobK0siB8lOvow7iyGgFTgoGSWhl4MhUBXlb6qOltC2ttARPat8XMZm3Q09QeoXI3HOk7/BHrlIn1nmvXbNqEQLfYfa7Go7mvudXFo32on+vFtU6qzctHcUVkxEYpdn5HaLljJffwe126lLvufx2Q4lLSOeWBLLs9xQ0rdde09PFW01+sIgh3tbU1iw10NKGtVAmyyqoSeIZqWlDn2oClhqczZM4GcPCUYXDL+vBVFtBAZoy1k8agX4/WaF+/OkbXqI5fYXN3A+7as6rabZ3j5YkJdo5ob2x2Nqp23f7rW7XKnuUXkLlUz2Y2hCa6bIXxtCqCR1nf/9743eJyx/7L8g+HpPK/ZvnHey0Z8f2ryivpa63XEiolWZQAxoiEKmlUg2u5qjpcjU2hq6kBW7k5LJWVEezphDp1veBkoY721hboZmSKGry2l687RvZqjamDOmFe03o4OLAXXkwNWbimid/FkXr6WOhXA6PatcOU7h2Pxa1ccGJrs8aYaOmKg161N8b3DW7eq47jtceDXBpXaGO5198Q+qcI/IfLpPK/Zil//6WbvHkNG7MhKpoa71VUVKDKQ6ZqmjBVqqygUR0t2JoYwFNXHw19fRDcpDbad2uFWq52qK2vhd4OtminVhlteW2YvTNmmVhhhokF9jRthkWBPpjq74B5tdxwa3Snnw97Nb05ycoCk2oGYfHSBRg7byKenF//6MTk/mmRVRpgdZXgQkQPGrpmTMMny2v7JL/QFPr9iUVFXMQb+a9K2UV/vul/yVLuphQrKBlYmI1V1dPOVlNTkyJRp7IKTFXVYC1UhiOjsVXdmghpUBu+GpoI1NZG53o10DzABRObBGOstxvGm5hivZsn5pqZYZyyCjbbu2C9gRl2WdjhkJs7NrhbYb6tJu53/ws/x/TM3BzoXdzJSB/jxwxH2OpZeHJ7XUJszPxnm+o2xhxnb1yY1uAQXkyYfSikCVb5emcfdNQaVR6LP4viZv6hlEeu4hv+c5ZSBfqPS9lNKajVTtAaI1QSCgXmOlXmRapWmKqrw0tmDhdBGVV19eBloIOeBLSjvR1aUACFqmhjlrkVZtpaY1WAD9Z4uGCRuQki3BywzsEai431ccTbE9s0tXDH2QXXrWQ4oCngmrcp3rerjruNqmG0dmX08vFC+MR+OLG2KwpvLvxwaFi/3El+Hjg3tn4S1rpOfjB3WPJSssCsGq4ZaKURyGYbzq/h0wdNHMW8Wu5W/gHIEjDL8Cv/hv+k5f8GTPEaCpj+ukqq+aqqqiCg0NPVRqCrKxy1dOGkpAoPoRLq6umhpoEW2thZop+9LabZ2mG+mi4ijMyxhjlyso4yllkZYoubDZYaaWKboxxbbc1xyMUOl1zscc/dHj/qB+C0uTIOmAu4E2SCrNBG2GKviSEGGphRzQ6RIUZ4s65j3uHRPQvn1/PH6U7uyJtb++KLbVO/zGofjKkuctwI8o64H+zSeP7wUEwIrnEG3WWmFfCRNioCWR7M39dIvfCfs/z3YIo3KwhOVf1rKwtCkmYl5kVGG7ehoqIMB3MzeKlqwZf2o7aWNoK11NBUVx09zAww1d0ZM63NsMnFFuutTbCjmgtWORphiZEy9rhY4KCbFY672+KMozWijXVw0cMOZ6rb4/3kNrg/qjZiGhvgXV83YFoDvGhigdUmAlbLBeyvIiBreXPcm9wHkXW8cCFAF7GTmuDC3unFc0Z2QDgZ4X6jFu+xdEytUwe2xs3q0BSzqric4W0oZppKSgVAJSAryqX/VWCW0ZGhqruuidFN8ZCYI0XVKhYzc2MYa6jBv5IaGqrqorezE/ozuvpZGGGEuSHmOVphukwLEQH2ONzUHydaV8f5VtUQ7SzDblMt3Avyx5NaVRDXqimuuTrguL0JTte0w5XQGvi8ohNu9nXB2+GewLY2wIJgnK2mg0gzAZscBeQvb4jEJUMQ08AHJ20FpExojDvHZiNydk9EOznjdetOhS9mdex3+0rUvWWdG2FaoFM2k3rN8mD+nmj4P4D5z93zn7NIvrKkqMtMNgpqpFZGnzrpVATSUs8AtWtVRxVnB9RU1kAbDT2M9fHGxjZNsSTQA9PN9DHPWBurXc0w210XD6Z0xqXe9RET5IQHVdxxzlQfFyxN8eGvOkjs3gG3qvngtI0Ml9wscMxTD2+6+ONdDy9cCjHG81V++LmzAZ4Mdsfp5vpY30zAt7X1kTynCzbZVMJBVwEvhlTF16MTcHFGO5y0MsP7Zs3wcEXXLV8erz+3PqQmltRwxLOGFuP/EcySIxVf5S8s7ZX/wKU8kIK+dm1NE+NvgrISNGg/ZLpGkujRp3p1tpbDR2aCYDUddNI2wDDurw2ugR1/1URUNQ9skBtirVwLK30McYN571n/ptjjqI9zNkZ4TPFzxkAf991dcYfC5hztyk0XB1yzJaDW2rjhoYe0frVxv5sNTk0yx5ddDYHdA4GT05BzpCdwayJwaCIO1dDFfg8l3O3sjIJDQ/BxdhOck2vgfm1PPNrU+fG76+Pu7utRA9vqu+Hb4OBI3pHsZoBQlWvlkoCU/vzT638VmObm5taVVCq/U9bTgQimobY+ZNqGkJuZw14uhyEvtWOpp6OHXjILjLe0xAJHG5xo8xfOtqiNQ65yROgKOOZtidN+VvjYPAg3fe2xW6aGy572uOPggOsURvdN7fHI2hmP3T1x29kOD/m+q/ba+NbGG1/7++P+YCc8GeQMDA0GVoQidVkIPm/sBNydg9czG+CYvxZetLIDNrVC+txquMxIvVbfDI/3tMp9dDwkOaanDw418kDugr6nr4S4LO9V0zZ5UzfTBhJOJUD9CeS/L5j/N40qd00ZvVZWnaCsUhmCSiUWqldGoyZP1w2sjgEdO6OuhT1aWdqitYEhhthYYGWAG/OjI+73aYmDgQ44Zi3DZaraGDNtXHaU4b6rDT7U8sclf1vstdTATYJ2j0r2gakZXts54RL95117Gzx1scITHzPcDTJA1phayJhQB9eCtPDISQsJDX1wpZ4cB9paALenIe/oYNxsIMO3tvYonOOPtCmuuBZQCY/a2yDnUm9kXOmL020scawhVXJ4v09XZnd+trRvUyzu2WCTAkwJtgoglh6RkC6j4n+HpTyQ5QAtt1mSO0oaLW1C0NU17qSpopFYibuVNZQh+UraESNlZbhq6eMvMyc007BCezVj9DOgQq3iio11bLD3L1vc6hiA27XdcdHUFLdlVqROc1x1JGjuDngR6I7HQS64WcMS16oZMVca4raXAZ57W+OZox0eWMrwyN4Y15yUkDaU4mdRfRSMqoK7fuq4R3p+6mSD51WtcLKGFpJ3k26vTsS9loZ41VgLKeNd8bqXGW7U0kXupMbA4e6k5la41kAVpxroI/bo2JQLEf1+zmgRgGUhTT48EASLP7vmd0Qq+kTqm38bNP/e2gq7v6/5fRN6Ng71VFTUX6pT2IhgCkqC5CtNdFVhyrUtj9WupIXOmjLMdvXGQua/vQ39sTPYGpt81HEqiNQZ7ILbjLzzJjq4bG2AK3YGeOAhx8f6HvjewQc/e3sgfrQnMmdURc74aigcVhNpLf2Q/JcHkhox//X2BZbWA7a3QfZQV9z2UcYjB3O8crTFR28ZXjWTI3FnZ+DtPDzrZ44LNSiCumrjaQhzsreA3PF874neiF3ghkvBAm52NcfXE0Pzb+8dlL2gvhO2d2mRjeYyzwpdU9IFpTtl2qG0n/7HlwqtVZTyu7+vUTRcx8J0rIqGZpqKCr0kPaWSUAkqmpVhQvXpbW0DPwNjBCipoCbf0ddMCwdDGiC6CU1+k0Ac8LHCemMBex21cL+FGx6FuJASDXEv0AR3XLXxOIDREeKEvEmBKFzsj+KNfsCuKgSMZV9TYG0TYKw/PjbRQnpPa+SPcCCgtYANzfG2gwx3HbXx2tEEGWQAzGuNzJO9gIQFyNz6F653FPC+rzYSQskCHgLSh/kAdwbg8VIrPB0lw4e5/vh8pDs+HhiIDVWN8HxE13RsGxXarYbF8pbdBcc/++gf++l/fPmzkX/fFeNOEFq56Og7WE1W0dXKVVZTh7KyCqNSCZWVlKGhpQ4TA1246Bqihr4xmhrqoRFptxeBi2rlhqvdauI0I/GQkwl2m2kixl0fz7r64NuMmvg2NgCxrX3wsYo13lYzQ3o3b2BaHSCsCpKm2eLnJFMkTJUB66sDO1qhYIQzbvoLuB8g4BHL17aGQFQIsiYE4IaTMp7KVZEdxHwZ2Re4HAr8msF1D7yfZIH0Cdas2xtvAgUk97YFXo9C/rVWyNhdBwlb6+LltmB82tQSe/2VkDC+Q9HlGd0yB7cLQPcB3uMUHVKK4O+I/PcF84/d0kZKeUFLdaSmkT6UCJyoXEXhI1KsBtd6WpqQ6+vTcysjgDmzt70Mo90MMMFFwCJS2sX2LjgbbImr1Wxxo5oN7jZwwM8RpM3wBkiZWRupLWsiISAAP/w9kNWkJoo7BiO1hR/e15LjWRV9vKipi2/NLVA8qAo+1DfEE19VPPfQxAsq2kfumkgfzShb8Bc+17PAZ3dDJLhrAJNoVU4NAN5PBR6PASI4QOaSmqcEIK56ZbwNVqJ1aQ486wFcbIncmAZ4vckb96dZ4WxVAUUzmuNzRCgmdPPEgAF+x8p3ioJey3D9NwJTXEob+XuzApj1+na1EVSVLqkb6UFQo3pVriRFowimPtcWurrwtZDDhUBWo6od72+PXR1rYk9rFyz3FLCnuiYuNjTD2xAffOrqh++9/FE4symKFzZBYmgAvvq5IcHFDwmefkjxC0CiBy2HjRO+mDvgm40DXpob4YWdPn7UoQjy0cTnKqRFVxl+2TrgjbUJntbVBiZS1bb3wa8AC3y3U0FKIyskz/sL8ZGtgPPDCGZLYHogMNgTubX18dpPwIeJ9ig43oyeNAS4H4LUQ1VxdZiAu02I0bIGSD/QH3MHOGFFWIsXP98KJmUA/kP5t1v+bGApkRhamS8V1aqKvqZkQSqpKcPIRB9qqkowp8e0oCXx0NGCp6qAFubqmFHTCbvaVsO5kJrYF2SG/dU0ca2NOT5QfSaM82ckVQNG10NhzyAkBrnhs9wKiXYuSHX1QJqzO1Ks3JEqc0e+jLlSXh3JZo5IdrFHQg0CRDWcXMsaX+1NkGbpgiS5Pd650ZI0s0ZKCy+8ZGR+tdPDW+bPJ/UtcK2hERIHV0FyP09k93FDXnvm2XpWSKtjiq89bVG4Ohg4TqAf0pderI03CzTwY7wK83QQfjBPb5nM3H5gfGJYiN+Rbb07TmGfKEnm5M/O+ndb/myfAky1hlqG+gkimJX1NCBUpgXRUoElPaKethqsjPVgrVoZtlSxftoCRtRywIpmXlhXyw7nWgbifvuquNvWGU+62uPzKFeq00Dkj6mK1LYuiPexxS8rS8RaWyPRyR6J7rYs1sh0p1p190Kxoz9y7dyQ7eGI7Dr2+FpPBxjojcKOrsioQd/o7IsiJ1+k+1vie3V95PWohlfVZEiqZofPLkZ46W2MpwG0K4F6+FjPDBmd3ZHQ1BLp1YyRXNUQz2lfvva0QtFCNyAmCLhUHcUxrsAeeyDaGzdWWmLfDBt8ih6JWc09MKdZ7afsEenrsr911r9qUXidivt/HvvvltJRVgpg2ZondPWNp2syH4pgKhM8UQ6pqClBnd5SZqgNc111WKkrM18KCNQXMJx5bnvnajjU1gcXGnvgVUg1fOtVncUbHyg63ncyxecmpvhVQ4ZUJ2skWcoR7yTHLz9zxNYyxY9gQ3yro4tf9QyQ2sQSWW2tkRxihJRQE8SO1kHWFAvkDLVFeksKmDo1gBostCroTkBGVkfOQEZhYwd89TbBR3cDaf2NavlXPUskdnRGemdnxNXWQ04jOWLrm+FbCyMk9NNBzgIZMnZYIu+UAwpjLJF/0gEPNpvg1a6qyDg4gKlWAw9WTInDita2/yNg/nn8v1oqglkKqOL9BkaySYKSkgSmFqNQVUcVZpbGMDHUgr2lERpU9Ya1thLcdAU0slPFtEb2iO5dFZd7BeJ5jwCkD/8L3zt54gNp8CXFy+tgRkmQPvOkHhI8TJHsy4hh56e0s0FyDwLb1xi/+tGihOojZagp0sbJULCQ0bqMQC9UQ+xCHfwco4dP7QhsE3cUNfECOtKKDLOTBE7RTH/kDCBVNyMl15GRkllHIwLZWo6kPo5IH+iMxPb6KO5OWm5lgfg2xjyujbTpuohdp4dfu3WZO/VA04vsWxRW95ri4/IqiGimh9Sza7A7NGjaTUHQkPpW6qyS9b9q+RO4/1cwS1H83TbFy0ijpoWatt6zypqaqKRJX6mhAiW1SrCzt4Chroo0defnYAZ7Q2U0cDXBgBrWmN/EAcf6+OEdBUnqlJoonFANP9tYEUBDvPPUw1dfglJVhu+1DRDX0hBpfSxQMNETeTMpTOY7I2uxPTIWWyF9mSVyVtmiYANBOsROjXZC8hYTJEWY4vscQ7zqr4aEPrbIGeyClOGMtDADFK2zoue0R1GYE7IGy5HcyRDxbXWR25/ADbBA8jgbZM90QMZY2hnanowB5kjsbUJfa4WMOTLErdXDl03K+B7FbnjA3PqCA+VxbbxeKMP9WZ7AmwjMHlY3rXN7oZoiAH4P/3/Z8t+B9t+dK1vKtac8mNrqVrVVNXUK1alWhcqVpHypracOR0c5zA3Vocs86WNlAGcDAZ0CrTG+tj3m1DDEyW6OSJsfjIL5VZEwyAxfmmvjZ7A+EqpbICXIFqlNbZDW24oda4miNQRrmwcFBzsrirlyhy3youTI2y0H9jPijjB/nSGFnnRCfjSvj7ZDRoQFvs5mNC20QsFqR+RvNGWeo9g8ST96ku/ZxetXOKFwqhVyxjCyp1gjfYo5MhjhRRuckRduRN9qh5xpckY+Pelid6Qt4PkIMyTt0ELcDgEFl7WRe9cYOVfpT8W2nG+O5PtjsGNjSPGdJzUaSINfDJiS17/P8sfg+g2mvK6alm6hkrroLQVo6mtLwsfEQB0GagJMqWwDLPVQz1oL/XxkzCtGWF1LD7f7ks5mByB5ohXedaUFaCUgvQs7vCcVai8X5IozN8uZ5w4QyNOWinLcDMWHTVFwwACFB/RQfESXwLDTz/B9Z9mZp22Bg1wfJCA7jJC0XhU5e0iXJ8yAq+a0F7z2LgXSDQMFoBwUBSvNkbOQkbeY+XCxCXIjWEe0M3J28ZpoK+SusED2fFtSuDO+hxkhf5M122SO4qMaKLqsiuxH6ih4xii+yfreNcP3++1w41LP9HMXGk4+eZJWpVxf/cuX/ydqLV3KM0VpdJbsGMh8PNS09JJVtLQk4aNtoAO5lQyGWhQ8BNROTwV+BpUxto4npleRY01dWoG+PoibTNEzzAIvuwh4301AXKgWMNMJCCc7hdO4R7gQPEbPLYJ5wwTFZ0mRx/VQcFgL+YfVkX9cFUXnaA+uslxXY2eyQ6+TQg8T9J0EZ4MGUiIqofCEDopu6KPosRGKnmqSEnn7twQUntZD9m4jZJA20xfr0H6YInu1MQp2EpTTLsiI0ZUGQf46C+SHOzCyfRG/lHXvYBuPEPDLjPDrlZH5ohLwnfnzEQfWW18U/OyIJ/c65cyYHJAVGd50rNRLJdH5L13K58nyoP4fwf0TTOnyEjBNvbzUtfVTBFVVqGprQouRaSYzhJPcBA2reaO2my1aOVtgcR1vRAbZ43wXH6TMa45CUuzbbtp4zIhMGMbOWOJICmX+OeWD4nO0FFfYcXdZbhmj6Iw2o9AQxQdNWQjsCQMUX9VG0UNG3ktBKnimCjzl9ScIKPNm9gptZK7nADnJqLxuDLxk9L7l/hvxWgJwg1F2VIa8zcakVH3mUdqPtWYo2MPBc9ENKWd0UXDWDIUEs3iZEwo2+SN1LdliBwfZHtZ5g9R7pzLiXwnI/MlB84z1viLAyS3w6UmH4p0bm+HDg1mzpZRUljf/VYuiVsG8y1Jjw24T5KX7fy/l3lJSKuxUaBN3tGX9VLQNGZUasKCpN7eSw9hAG3bG2qjrZo1AI010sjfEeHMB26vo4vlAHxQsbYicOb540b0SXjIqM+Ywl+0Wc54jCm5Q1NwzRPZDHeTe0UD2WQFp+xhJ0UYsBOUYI/AyO/+RNvBeFblfCeYXFqkzWc95GxRvM0PWKgPkbiZVXiA139JCzsPKyHvOa0TgnygD1wj4YRkyI/SRsZwRu50gUjgV7CVIl+yRdl4XhRcYrRsMkbPcEr/mW+Enc2bRelqTjWSCWxw4zzSR9k5A1g/W+ZHlvS5yPrgi7VNr3DnbA+8eTAhX4KjouHKbJf1YsvFnn/5jKb+wFqPQra79Js2713bQ+HfNxy1c67v5bl0eVy8PpjSKSur/Xcq/SqqWNvhH1WSioCFj8rSHoCmHoKIOF3s5bDUFBFvooa2VIUa6GGCRo4BHvWyQu7guMhf6Im66GeLn6CAlXBeZW0lRZyxQdMkQ+bepOm+rI+NaJW5T3d8iTZ7VUoAo5ser3GZE4pUyitiRBZ/YCrEQqNzLXJ+1QOF+W3whQD8jK6P4khIK7/H4ByVGJiPylTrBJOiXaWX2ypCykWCu5+DYw1x7zJaDgTnxEiPvihHfy0F1SBeJ63SQuIBgTjNle9mOowTyqiHybishTxwc/PxiMeK/qCD3HdsY1wDFydMR93HDy+3be1hL/Sb2bUmXlQFaclxxUHHs7z1dvpQufINxvYFdarbpCasajeHatCuCQydkNZq05JzPnIgBtQCTsk8qrbtst9yr9Fhp/ZZe1QVN0wxB2QzaMjeYmVvBh7akllwPA/ztMLmKPfaH+ONyVzMkz/RCYTgN+wKqVXrC4p1iB1pI+RA3KVQYiXhEYSGKijsE7CFBvqeHwnMaKDgqChmWKwToITuP9CaCWfyBTeEaTxm9V7m+xAg75YWUXdbIPUZQnpHC3/P4a0FBsS9Z531+5hkrZO6hOt1qhtztpODdjPoYgnyO64tszyUDCbAcUnwaRVTaEiskzJAhbQ3BOimX8njBHQ6Mx+LAqizVXfyCbXqjheLPzPk5E4nTcXx+e+oE7kOvDJKyvvvdkaUBpOj331CWAFeulB3jjnyupU/jkG+W1RpCVr0pTKo3h3e7vqjbZziaDZ/4pO/K9eMcF690kCqVPqT0rRUrrLCLjsqCru5xQUULJha2cLC2hD39ZZC+gM6WAsY6CbgyyBsZ4bWRv8aX3tABycuYi7ayQ2LY8efY4dfYcfeYFx+oKnKfWJ6Qyp6z4x9oIfu0MgoOUcQcM0bxZQL+gJ33muc/szM/89oPFEHvqFJvkXrP26M4xg1JUYy8Q6z7lhrrZUeLFPuGkfmCKpifl37QAEnb9ZEcaYC0CB1kbSXVRrOOk/xMkQkucPsaP/MK8/MJC/pZa6TOlSF9LSPzOPPyNbb/FrfvMqof8NrHWsi4JCD1ClX5A56P7wUUb2DX3UTG1+PruKFWPigk2MqBWFrKNn93d7kLyvYh1AUqB7bqflPmFwx5UGvYN+wCz7b9YRXcHo36j0TL0OEYMGXGp9HLls0SOvtZSJWXfGCF0fNnIwyV+hpYmEN8St1ETRWeupUxKFCOpY2tsLW5Ft5Mp93YzIgMlyNuiQHyt4o2g7bjuAzFJzUVINxTQf590uZTcYSz058ToBc8flcVKUf5kTEE5rS1Qsw8Yue9Yad/YvnI7VdakhjJiBEIkA5iI4zxfb0J0qIpSG6yfoJZwGjGcyXpvXkXtZEarYeUKAOkbNJH4np1JG1UQu5ufuYxDpAzHCjnOWiuse7rBOy8HMWbbJC5xBTp6xjph9mW87Q6lxjJV/kZ10T610PueVXEHhHw46Q683NtJDxuza7aCo5CIHbpdIjPmQolrxK0KvSldKZkt+yY4ni5HXFbQkGwqtbokE+jDrCt2wGCfRC0fZvApXkfBHUdgRod+yCgWTu06N0Hk5Ysfjtvd+QEo919JVDLF0XUKuqTiqHc0sTU/KO+piaq2zuhk48Lwho54thAN7yb5YDirR5I22CG1M1GyI1iB8QQlCuMyssE5opIVVooYofnPiJVkqokOnzNjn1NMO+oIPEQj4tRdopq8joHwn123jMDBWU+1ULhXUbfVU1GmxoSInURu9YICZvMkXuEEUJbgvvKyBbtCAdL8S3aGkZdwQkOJLajMNoSWQQ1aZMSsvcw4k+oK4C8wkFwg4r5Bj/jEoHbZYvcVabI2KCNgv20OcdMUXiS9Ey6Lj7NKD3B7QvmSD+sirjDysi764jMx34o+taGYI5DwrcBRR+eWExVdOHv6PyN2h9nSg8pwCu/o9gWAXBt1mWGVWB9GAc0gU/bYfBqNxxmQZ1gENgM3i17oWHvoajVsQsadOmEoWHTMHLJ7KdBk1uGlPs86U/p6CodYRaGZpFuVjZo7O6Jbr62GOkn4NgAfaRvIHB7TJGzm51y0Z4jmBbkrHjj+lKeBMVO8R1WQzVaKIoJMb99pNp8x059zSi4rYakaAHf11RCZhRpVpwgYLQU3eW5xyLFsdxiucpzjPScnRbI2mZDkBj5px0k5Vt4jZF5k+UGc9oVNapUXn/GUjFxcFiO/L3GyNmjiUJ6WDBH4grX1xmVNzlQbmorIjDaBgURMmRv1pPAzDtMAXTEBIUxVig8wnuMsUfmTkanSNXnOWivsH0vqQ0ekpo/uiAvoza+fOiQixc9mpVCVtp3/7/AFK9wHLPUL6BZ51Q1hxrQ9m4GHX/SbeP+8Os4Ei6Nu8M2uDmqd+yGjmNGoe2IwWgzoj+GLZhQGDKx8eo4THWQACyr/verqWetNh6WlrCrLKB3oAzbQkmpO7x5Y04K6rokzr4wUq6bo+C0BkUNqeyqGgrY0dnsaLwqichPpMKPzIOvGR1PaOYvqyNup4AXYQISN3KfEVF8mZ3IiCu+K+YsE0mMZERrIH0H1fFGQ2Rupr04SqtzyZXnZJKIEgdF8TUVFF0S86ooYtiOI+YoPCBDEf0rjolTfbzunI5CMd/Ulei/kDRdfJnXH7VBUZQ58vZwO4YW5qghcglowWFLFBxgZB5yRGokKXyvKJ4skH9RXWKMdA7UnPca+MmSl94Nhb/OvsIS2FQAtBxOpUD+HcxyS1kU1Vyk07jXqIc2NdrAvcUg6Pq3g5Z/W+gFtqYYGoQWI6ag2dBRqNOzBxoP6oNu08Zi4NwxCN+xEJPn9P/Sp1+D8GWTBMfSNpQrGq2rmET5ywREjquN9/uCkXuWHXqZN/eYnX6Pvu98ZSQd5s2dIZ2RvgouV0YOBQOecl+kV1Fxvuf2WzVJ1YqdmXNCA98jBHxaRNCjCMwFRvcNUhuVZsE1esFLVLtnGCnRCgpPWaMvlcLdYl6Wo+gMQb+siDRpfUHhPcXpweIjXB9jVF0Q2YKAnCHtn+E1F0mx17Qkmi28TnVKEYQT1oxIC8V7aKOKTxojP0afA0KGgmgz5O3mADrhLqWQoqMi63BgPFRBHm1R6mMBCfSh+emNKYouA/kZWyHcV1GA+Ru40u0/8P0blr+R5oZH897LneuFQN+nORybhqJG7+mo0XMSKXcAPFt1RY2uvdB48CC0HjMUnaaORL+wMZg4fywWh0/AuvWTsHFd6Le9GwLCP+8V/MtAFdfLBI3OVYUD28JsC1LvBjHSPBhdosQXkHKC5TTz4kVlafZGLAXMlwXXGS28L7xk5FD84JmSlAdxh5FxxVga/bHr1fBlsSCBVRTD/HWRapj2Ie+8SIliLrVAxhYKmXAtybcWbuGxaPE4rz1virxTHBjn2bnn2ZbTxpIqzjvE9WGZBJIE5nEx/xHMC0aKSYkruop2XhMHgREKjtMHE/isw0bIPsrPOGXAY9qkWraB+VeM8MID/DwxT5+1VAgn5ntx+rCQjJMoTi7Ei5ZlGWPqVgEQ2awCeH+W0hAp2a+wSPslvd5n+82/6nQaWmRdpyPMa3WGSc2OMOO2X8ggtBkzDZ0mT0XDQf1RvVsHNBnWG4PnTcSUhZOxZsNMnDu7HB9er8HHl2Nx8Ui95KNrrPd82it0pmkXo9UVCULrm/vUnn2/aYqiV4aS0iy6zWi8TjBYikR1ectAutn8S1o0+qTam6TVx6Tee0oKYMXJcAIpglSwV47UDUaIDydt7TJTAHBWVJNGKDwr2ggzqSOTV+shdr4WkhZrIT+Cn7uHn0EqLDphhIxDrPs4ozXGgHnRCPkHCY44LXiIdcWIuVMEgKCe5/YFmQR68XldFF0koIx8sS15bEvuCTky+f7MIxRQp8gsFEv5MUwhpzmwDugidz/zqFjnSVHpclDcElMFe/wt7/uHBrJibVlaID91IuJ/Dr/O/tItD175SC0PZlkpA7PkuLjR9QFsQkbOiq/TYwwaDZ6JBgOnw5Xix6ZBa9jWawTfNq3RoF9PtBk9CF2njkLorLGYGz4f4WumYu+uEXh6fxgpox+QGYKMDyFIeNEC6V+qp+TGB2Vmf6+Tnf+9aiF+WqDwgyoKnysj+RJV5ENG3H01Rf66I0p6E+Sz00RlWUjBUXiDHXOtMoquqqJYPBZjJNFq5jqCGU5jv4mddMhWQYvn5FJ04hzroZIs2G2GxKXGiA/TQ8YSRtUmRtl+cabGCMXHzJF1wJBq2BT5+02Qu9dIKuK2IppEmuTAOS6CSqo8zc85w3rPGismM86xvvMmKDgjRx4/K/2IMdIP6SHvuC7yj6sRTA6+cwTysDqyDuogg5+Vw5yaL04+XCdWjwn2ezLNF7btqz5Sf1Jpx7ogv5j9B6X+FYD84/Vfg1m6L767LrQb9RnzyK5OG7g27U4Q28OxSQcEde+H9mPHoMuksWg+uA+Ce3ZA4wFd0H3cQIwPm4S5C4dj/boQXDvXApmxdYBkH+R/9EfBBx8Uf+foTrRHwRd6yi+OKPisyeP8tK/iDIx4U8yF9xmBt0WVKE6nMcqoTAvOibRGqS8qSFF4XOK1pwnCPjOkrTZB4nwL6TtJbCOIxyimTjhIEwM4L9KoKFwoTHZYI36uKeJmmCJ7KY9t4/WiqDnOa07YMWqsUXzQFkX7qVz30LLsNi0pxlLJ2UPRtFNH+rqs8LAohERQGV0nxW0OitO0IaROEcy0QyZIj+YgjCGzHGVOFcEk3Red0iT9apMFWBfBzOVAK7rOe3vC+//Adnx2Q/E3e+QnayP2pzoycurjW2y7h4TD4E8Qy8AsjcDyQEoYSjhCKvyj0X3ygpuir6zXZwQCQ3rBp01HeLVsAZ8WTVCrUxu0HNgd3ccORv8ZozEsbDyGzxiGybN6Yt7cBji6JxBpH5nsYy2R/4zqUvw+L5YgfVFDziN2wBtG0HtNxeT3SxXFfOhj2o273L4hqkVxQtycHWBOj2amECTiFNp1U0UOPEfgoh2RvdwSSdOskbvQGQUbRcVIEI8SzON2kqLMjzaUvpwuiHTAt4km+DHOFFnzCEKkXPFFtGjuDzsjd58zivfTquznYNhni4JdFsjZYYzMHaTFPVSz0ebI2K4nlZw9jMhDYu6zVLz/iKmUe8V2FhDkTObFLA60wkNknoMUYYfESQbmzXO0LCf1kcV8nHXKDDkcbEU3TBWa4S0/N6MvkNABeb/oa1Os8ONHNfz4OYJwzPj7v2xSgmOFg+WX38f4t+FjrZYDx9wL6twb9foOhnebdgS1N1oNHYhek0dh0MzxGDp7PMbMn4pZ6xZjedQqbDqyFnuOL8TuXf1xej890y0LJNBSJJ7h594Vp9aU6f0ExJ8QqZQd/lGm+KpJnHV5xqh8RiDvqSqi74IiHxaL87KkQTEKik/oKo6LPvIYI2uPMzLnWSB+FCNijhty1xCgfQQxmoAetCFNGtHsc9TvtEX+Ohd8GWmO78MtkTGTUbWW124X8ybpcb8Lvac78rY7oTDKAUW7xKcU6EW3GiOb1xTsE4GzReE+S17HyKbIEmm7YLcM+buMFULqBNXzcSPJFmXvFyObg22/A9mDgO7j/cSI3pL5+bQhsk9yQFHt5l3kuescUI/Yxldsc/ZgIC4EaW9ZH8hqCEV6ylx8/7zt6fsbgmlZriwHZAVAyy8Kf6i4osodGAU27/DKvk59WNcOhoqTIypZW0DN3hw6TmbQtTeFqasc7rV80aRrK/Qa0xOhMzsjfPtwxMSMw8ubpPpP9VHwgIb4uDjtRTp5STFDxfqa5j6VlIb7cknU4IWyNCGARywEv+iCqiQeCo/KpFkdSdCQDgsOURgd541Hs3N2cjRH2CJ+ggE+9zFExmRH5K1ifTsZhVHW0uMiObuYU7ezg7fYS08BfB1uix9DuT3dBlhJIx+pj3yeF4HM2u6F9I0OyIqkANkkR9Zm5mLxO0+ez9/FyNzLQbXXCrk7ZMjZzqjbyTy80xzZWwn2DhFQU+mphqIjpNY9rHsXtd5eL2CXHQcIxZI4UXDCQMqjWSdY7zn6Ueb0AlHR3tNQzFb9rA68c0eSOGuVX49wLAUNKpLjL+DVi4gpFcAsh1nFMC09UfqXJ1Raj/ZyCgpOrd42BF0mTkav6VPRa8p49J08Ev2nDMfQmWMxdt5kjJs/BUNmjEWvCf3Rb1YfzFgTilVrOjIymyLjeS0UP7JB7hk2+CY7+qEMaVEC7ownoHPVkL2H1HNa9JOMSKpY3KCwOUdFSilfzKgqZu4qFr92Iu3hoPgMqviUAAupD+LzOiscED/EAO9DdJA2hnlvGXNepDUFkQWyN8iRG2mG7PU0/WuckDzLDt+G2OHHYDukT7ZF8RJG30rS3TpGUqQbMjZ6IHONIzJXWyODEZ61nlEYwQjbbI4cCqusCBNpOyvCVDFvLD4Tu9sOuVtMkRmhi+xtetL3qUUHmAdF/0oQQeoWp/jyt1Mh7xVVsgFtix7Sj5FqKZ5yLrFcI/Xe0WQ/Eex3Vsh+QDtDv511m4PhSyix2k1gTyEx8din8+cF2W/MSrLmPwEpnS6HcpVBk1o06NyjuGnfgWjUqx/qdeuKv7p2gl+juvirc0t4BleBsbs17Gv4wLamHzya1qPq7YsWg1tixoJGeHavJ5DVmQ3yQvZVUcJz5F2xlp6NiZ2rjndjBaQtrqSwBxzRxdGkXprtgp0yZK+iOFjCkR7Otm8gkBGeyFsvPqhVldv0pat4bAE7abQtErqbIbazORJCSbXz2MFrnZC3wh55Sx2Qv9gR+QuZixb7InuaG95210fsEGvkTGF+neuKAp4vWO6EglVuKFhJMBdxQCznsZWOyA23Q84Ka+Sv4mBcbYUcRn3+ehsCbo7MtbIKQOdsZqQR1HQCXhDFwbaXNHmQbT9K67VXD9k7dJl3aXNi2OZjHCSnTZBHWyL2S/plDaRd1kKqOPHwmoPgsajEXRQD+ALv+VM7+s5phOYwy6XZZZRawqIKjVN67B/AFNeOIaEtHarVgb6LFwRTSwhaOlAyM4Vgog/v+jVQq01DNOzWmhE5DF3HDUXPaePQcvgg9JnSA+u3tMG7p+2ZzOszF5CKbhCoO+bSJHgOhUfcLB38Gq+CpCkqyF5ERRvBUb2dHbGNHo1RkTbLDCnj9ZE2URMZ0w2QOINiYJodUuZ7IHmmA7KnkObGs1P62yGunTniO1oieYANUiYxIhcwMsNskD3bDtkznZA5xQm5k10RP1SOj70METeMnzFRcTx9mj3SZ9kiY44d0uYSqLm2bI84EPieJfZSEQdGfri9BGxWuAXSVzBtrFKAKUZowTaWKEspzxZu48DYaivNzebvYEo4SMsSrY+8nUaSQsZxRtspsgJ9qvi1We4VbWRe1kYORVD+I1ukPSGV32I0r3bEl34CPTEH+x1f0m9z5GeMRtzn5XFAkEcZmGWA/kNwSmCW0Kx+496167TtVtC8zzC0Ch2Fpr1DMWj6LHQZPhShk8ei28j+aDugK7qO6o/2Q3tS1fbD5BVTsHhdf0TvaYA31wNQ9I6R8oI3dZdq7gFH9wErfF5ghK9TSLdzHJE22wpJ80yRtpYKcLMcSWuMaejpsSYaMrep49cwJcSP08SPiab4PM4cH8eY4dMIQyQM00HmEEOkdrXEzxa0G+0skTrAFnGjjJA6mwNhOsXLLAWY6ZMckDneET9CZfgeao6kUQRvsjPSpzhwMPHzp1MNz2IJs0DybIK1gANhCXPnYoKy1IYg2kpAZixnnasskbbSlDRM5oi0kAZf4XZ5CZjM1bRGuZvZljU6SFqtIdFvOvNyeoSxJKhwxkWyNEUnaVPOa6Loso405Vh0lf70NgXh15oofPgX7jMdzNYXsDVYQOahQEZnTeBXXQbHSBQ8b7DkN0wlYJa9/gBTcYB/nTt712vXO7Nxj6Go1zkU3k3bwcjdF8Zu7vD7K1ii2q7DemPY7DEYPGMkxswdhsVrRmPXzj64FlMHHy/bIvehukLU3KdafWiG1L0meDFHFV/Z4djIRm7ypqJ0o9pzQhpFReZmynVGZkaYHMljjZAyToxMAhRGOp1lT2shl6xF8hgqwqGmSOkix/dmpvjZ1lwCM340j80kYFMVYObOdpEiMHuyC2KHWuLbADMkjrZD5lTxtyrOSJ1pJ9WdNt+aPtUGCWGsZwEjl/k0Y5kNizWyVxJc5tHMlVSfG22lXJq90Qz5my0YmRYEz4xiSUGzxRRe2Mvo204G2miDtFVU2suMCS4pV3wITJzKO8p8f0q0KaJX1kXuMVIwxV32OZ7/wQi82QoHW5ujA0GY6iYgbn8w8I3pJZ6U+6MREp52+EaYnCRAJaRKo/MPOBXRqzghCPf1qjXvcd8xqCWsazSDsV9dtBw0GiEjx6LPxHEIGdILjTo3Q712wWjevSmGTuiMsFltcD66B+IftEbeY1cU3hGo1lgd7QheUHHGaOPzBhWkirMvBzlKD1srJq+vkR6PivJdFBXMiStdkTOLo3WGMYoWWJLunJE83wEpCwhAGPPadCsUjCWtdrPBl2Ym+E6qTQm1RdIECwnM+EmM/GmkzWlOSJ1gh4wJjvg1xAKf+pJmR8pJr07ImOUk1ZVKehUnHFIXW0uTD6lL+D7my8xwArqK0b2WFMtcmbWeSjaCoG4QRZAZ8raIkWkpCaDsTRQym6mKN+mjeAeV7GYXZK1xQ/JSF/ycZ43YRSYSLedt5T0eEbUDc+Ml0aPqI3W7OrJ28j5jiM/NmsiMroUzITaYbC5gc1eyyp1+QFoDelB3FMVW43oU8tMHTiijVTFCy+LyTzClovg7ZH7UpjpdhiG41zgEdR8Jkyr1YVu7AbybNMRfXdowMruj9+ieGDCuBybP7ooDOwfg462BwPsOtCFujMgSIMVv8F/pIe8yVd8pjswzcslk5x9WRdFZMZ/qSJPVOGEpjeziVU7IIuXlzzWVxE7xWlekraDSXOmG7GWOKJxnh4JJtkjuYY2PzU3wo6MZ0obbI2uGmP9sEM+cmkIw06c5Imk8QR9HmiWYXwfKkDjWFpmz3JBFAZRGwSRGpAhkyhK5BGTGStazxoFUyuvWUgRFOCBvM/PnJta3TobktUbI2GAsRaX4fFIRKbZwh4X01Vf6ek2mDF0kLLFA4mIXUrM/6/VC/EJztp/586CoxmnRDvO+jjJKo9kPpN+8LQR6M23TYhM8HW6A83/pYVuAOmKGeSP2fFvkvmNbv9BGpTI6i/tT2U67RjDVy9Ptb/T+CUxeMGHDya3VQobCoWlv6Neggm3fFy3HTEKfmdPRd9podB/dG92Gd8TcNZNx+fZG3Lk2EvEveqPoTUP6Jo60FwTolUrJ8zpaKLwtftFsKj3CiIsUPWcrI/+SMgrvcsTepwg4YSg9xpi90hIpc7i/hNdtIW1FedD/cZRudJQ6unApbcU0Um9vK7xvY4SfPSiyJjorfmOy0AHJM2gtwqhq51ChTuOxaR5IoHWJH83cN128zgs5i9yRvtCRADI6lxPQcIK1ih50HWl5A3PqenvaFYK5map4u1hoaTbKkLrRGJlUsKJqLd5tzVxppXjobJclAdYn6CYEjgNBfEh7IykyojaKRQW+naxzWvSdpshazfQRTnpdy4FAtV6wxopCi350oR/iBrBNXV2R0MsdP+ZWo+emiPxCFstgPs9gCsmqjW8/R2X+eFf+2ygFXv8MpuKkUv8le47W7jMRf41eiBZTVsKnxzD4d+0Ln/ZtETJuCJbuWoWNB9dgddR8rN8+Erui2uD51XbIedkWeEvT+5Y58QUj6wFp6Z6pVPJvG0lfa+GGpmLm4yF9ljix/pCe8qqpNOOTHUEwF3P0U2hgj6M0xZZGWsvYQbrbZE0rQbvAXBcXai39tO/nQI7uMFekz7WXBEwiwcyZ74qixX4E1BP5c3ykf7cncTwpd6YrFa8XMhe4InmBPZKYH1NJqemkVBHInI2kyAgXpLOT0yMogLYSyB2OyKNvzCOF5pBaxd+wFO2xZdtspMmD/G3ModvEx0W0kEWw00nTacs8kLsyELmrvFG8UbQa7kwhBHQL27bcHL+m6+P9SHV8HK2JTHF6cT01RFhdpPZmnw0IAsbUQ3EYhc9elrtkuc+M3hTqiAxPZKQNIUSe3coCryT4KoJZgrS4EXASDm0nLPnaaNR8ePQYB8NG3WDRvCsajpuG3gsXYP6eTZi/fTnGLxuLgdN6YNX2CTh2egLuXhpOKT0PeDMEL6JccT1cA892mODXWVqKOxzxjErpK64HLPc1uNZD0SM29K6ZZKDFfCI+2hi3jAJhp5U0z1os5tbTjJhDcuTutUHxVo7iFc74Msgcb3tykMxmR630QSFpOH0RRcoSFxSs8EL+Ii96T28WX4LojrjxpOHZpOpF3shY6Ep6Ze5cyTatckTCMgqvtQRNnEDYwMHDPJlLq5G/y5nWwoGMQXrfa48CgigWcaoO+8VZHntJ+EgWZSvbwnwq5tnMVRRfK0i1jNKslebSzxqKN8jxa4YWXg1Wx40QATfaC3jWhwN7rY8UwWkTq5NtquBrNUs8sVfBLV8VXK8t4PsAInI7AIjjgPtFJkjtgk83vTeWgvlb5/wBZkloCu5jwjvW7DUaPj3HwLf/FFQdPhtdlm9CvTGT0WjUCAxeNgd9Zw7HqIWjMCdiOiKiF+DYxdW4f29t0cV9Q7BogCWGsyELOwjYO0kDbw+R8m55I+c2JfpDbcU3JOKDx49IwU9NkHvfCLl3NKVvS1KiaE1WaqFot+jNSEHHZMgXhdJFdtxJxdxpyiJL3O+iipttlSRVinWeKFpPOg53RPYKii9GRP4SH4lSM8PcaVdckDiFNM39/GX+yFzqgTQKq/QSMJNoP9LXiCqUEb7GHslU1dlbmC93Mlp30mvu4WDk4MrfS6YR51xZxOjMZ7QqLIoVMtYbIn21EdLCqXg5MAoj2Q6mhpRl+vg6ozIS5xogdpoMn0bL8bSPCd5QXadOY9TtaYzC+T540NYKBxyUcdZanbJCC1FydWy3IeiBKnjejX31jsyayMH4pSpS33dPwGrBuQSuCjgqltIzLKOPXhvbbHQYAvtPQrURcxA8cQlazl6BdrMXodPMGRi0aBZGLJ6KeZsXYO2BVdh/cRd2nNl8c/XGqVdbBcvzGzoLGFhDwNn5QXiyrR5+nKqL9Ou+BFP8lkBFerpcEkbikwMvVZHzWBW5j1RQcEsPSbv18XOdDgr2yaRHN3JO6iP7vBHluwmKzzMqjrghh5T4oJcmrrQR8JO+NZvUlk8gpCk5RkXOKnfkLvNC+jxXJM1wQtwUOyQyf+YsZASvCET2clIvIzh1hQLQ1JUEcr0b8iPckbbaDgkEJHMT7U0UB8AORtdOCqktMuTsJjMccJKiNJsiKD2SliqSYm6LqHipdOmZM1ZbSiV3gw3tjDWSl9Nbz1RH8iLRVzviyzh7vBtqh9hJFDSrmY5iQvCR4iyCCna+soB1ZhoYwXUbJQFd1bWxxdYT+/0MUXiSlPuDgMY5U+G2RcKTDpsJlcrvIPxnMJUGr4/a1WHqYjSfshTt5kWg1ew1aD1zGVpNnsWoXIZJ61di8ur52H5yF3af3ZX+pPDJyF6bJnUzdTT4FeRvgim9AjG9vQyXltfD+/3NEXe6HlKveCHlHJWr+HCW+DyP9GMeAUVc571QRv4TZeTe0kDSHgPERxhIz82IyjefQOZc0kficQ1FhJ7wQtFmL7wcbIo7XTWQMJsdt0YUL1Sn6xyYA+0V6ne5G5LC7PGd/vT7eDniJjswr1L8LPFDxhJPJFMAJS1m5CxXvKcwgvVGkoJXOzBSCWaELbIpXNKY59JIo4mRFD/MlwX7aFd2MtduomreIJMeEc3cwGgkNedHEOR1tDnLjRG/lHaMIqdoCzt/OwXRnrqkXD+8GyvH+9E2iJ3hjrxlVZhPW+FJNyNE6Am0o9ZY7WELf6JgyiL+swDDVBywwlaGe+IvzEQw08kCn2mb4scW5sYbN1dAJv6pAKYiKoVOwx1Grox413v+arSewoicthyNxs1FQI+hmLR5F5buP4DZEeuwdu8ORBzefmXvjwNBgq/gZBBg9sTSWxc9u3sgakUzrBxsjKOzLHBztS1+HvVB+jl3fN1XGSkx/JRH4mOSpNWnlZD/XA2F3BbBzL6mKk0upFCuF+xn409ZoeiSKQquEtAL4mMgzBnMVakE4GFPQzxiEfMjdldl51OBbiY4a+yQQnAywl3xa7YN3o00xoeRpvgx0ZbiiNE41x1JtCZxc+wQN59RuJjXLyNA4cy1a92kPJfEHJq1gR22hWBuspLaI4KZShuSyRwpCrIUese0jZZIXWeJ5JW0R6voQ1fbS+vEZTLmYXMqcAK5l4LmWFMOwlZkDm98nGGGn/S3P8Ks8GGiiZQvUyYHURZY46iTP8L9POBFJFTVFP94clt1A0ywqYTTC2jj0vyAeE3kfqOmyOlKDCcdIIhKf8uZpZGp3bJTu9HL1zECI9F5Zjh6L4rE4PDtmLv3JBbsOoxpazag65gxt+r07x4qfK2u0fPmFEu5r+MD/xZ10X5gCwwdXBUrp/oiZrE7nm/zxe1VFDSHqMJOuuPTZnXEij8Pv0ab8oye67Em8p5roPCNjgRmzhU1ZEdT0UbZSc/2iE/PiU8ciHamWPxS+qw18qPsCYQ17nY2wJPu4oQ8b3BvddoHN9IfP2czaXOdI6nYCz953Yth+ng7whixUxyQQGuSOMsZ8bNJvbPFemhZFtiRAknDYXLp5/Np9JvJBDN7o30ZmGnbrJC82UwCU4zS5M0W0vHMrTxPKhWBSyNVJy0hkEsVYiproyfB9GXUVkH2piApMuN4Tco6W8lq/VpkgnvDBKQtZ9RG9ce9Wp5Yra6FBYzCNibK0v+cJP6HO4OMNbAqUMBLcX43nvogmUGQqI3Un17IzZ2S8TV1QJUS8MqDqYjMesPHTh67fD2GL4vAhI0HMG/vOczecQyT1u1Kmxq5/8jgDdHdhZlRuqXXO3p7bKjTtDnqtO2FIVOmYPrETpg31BvH5nvg8QYP3FxkjF+7PJB9pCpit8ql32+IX+TiKgF9qIWC19rIfa2GomcqyL9K4XOEQme3O2U/VewhC8VTBtLzQHyP+POD3bQV853wqKsMT7qaoWAx5fwWX3o/VxpzH2RtZ/RtZF7b7If4RfZ4NcoA78cSiLmkVoqhpNkuSAgjqHOdkDjfkWDSorCI4iRrIb0loz57FcVPhLPkM0vBTBVzJNuUGUWK5X2IQObuoJXZRLqmXUpaasfBY4m4hVakXC/m0CqIXeKNrxQ3ceGBtDZBSNpAFXyA9e40Q+JafTyeKODbPHrywwOQOi4Y+9wqI9JOA9NMVKX/VKc+yy4bJTzrqIG881T0r+jdE+jLf6khN5Y5Ob0fCnJWhf8tMEVgZh8+3GDsnAWJO09fwsp9x7Bi30lMXLfruX/P8Yu6HPpVtYyKS4rTqJn2tZo2/1q7WRs07jIAXUP7Y9L4EMwfFYjo2R54uNYTbyhW4ra4IO9wILJ2ufKmaC12WUg/V8d1M+lHrkXPRcoVv8RmY4/Rj+13kSawC/eL0chy2VSiW5y3Q9F+2gx2/u3OunjUhQAvYmRurSJ5woIDpEmu0wkmtlVFylIXvB9ngu+TrJC71I/WxYsDwQVJYlnkIs3UJCxyRsJCRsosWggKokKq4jyKqfyt7sikok3eJEcywUveLv4qzAFZtCnpZIfMHU70nx7I2U7RtJZWaboVPk2wwM9ZcnpND+ZMd7yfyZy92J8WpxkBa4TMXRQ9pz2QsFUHSZEG+LBAG2+mMuK2MfUd7oXvIz1xpqYOtjurIdLTEpea+CJ/EPPqtmDpEZr8ZyKTsedj6QaSmYbSWyL5w/gveCvIKwI6E0pLN26cFLZ4acbMZcs+dxw85JBLy469hXn7y/2Ur2Jx7TFkQNXWHVA7pD1a9GiJkD71MHFGM6xZ1hhrxjvg9uoA/IrwxpdlRkjYzPxwhgl8pyeSZuoibb4hireV/FzvsYni8cmr9JrHS6a6Dtpwm8CekSGX1+RdMUX+Zfq8M16Ij3TEE0bc81A95MxkREZWkQZJ1l5rgmlP4+9Kb+clRd+Xceb4Ot5CUrdZKzyoXl2Z11yRSB/4a4kjizNil3LArbCT6Dl5PamQ0Za1h9fu4XWMxCSCmLCLPu8QI3sPIzrKAbn7fJG+3QM/xRwZ7oaPo0jVk7zwaZQM8WE2tChuUv1pm4OQFlUXeTFNmPPr037VoV5ogaLDLkinYn45gQy1OZiM0wRpSwPxabgj3vXj4BhcBekTee0iUvRmbxQep6J9QJEoCsefAgq+UHckVUPhq/bAF7PBpbAoAIVkPnUHhU1z8RzRWSYm1t8KV7pAPF8BTPd2XTfX6NoLDfv3RK/RXdBnRANMW9AcO7Z2xt4FNfF0YzASGTVJG0lT4tPmMR7Aehf8GK6NXwO1kR1mQr9myAglmHf0FU95n2V+PCpTPDB1Uvyy1hyF542Rx8jMOGOB5MP2+EQL8GgcDfhIfeTPcQGYm1IiTZC6i6adHS2qx+INgcyPTvg82gzfJtDiMFKyKIrSVzshdY0TkriOW+mC2BVupEGCto6du4VRts0dqTvdkX2A9iWa5+gz43YTqH2OyDjigeR9LojnZ2Ts82bKcMPXlXL8ZIT/muCLt71tmMsFfBqnyUFjy4HB/LzBn+31R8qBBhR/tWmxAoD7tZC+zxrx68zxcJgac7YPMldUQdaSKsidF4i08R743scSn3oZI2MG8+RuppIzTCl3CeYbAVmf6QC+Ufek8t6/E/C4DrcIh1656CzZKj3wT0U6X1ZU6vUdeK7FkGHoOGYE+k0Zgt4jW2FSWEvs39oDp+bVwuNlVfE+whNfmHey97NRhzxQtMEbv0aZ4mdXLWSNJU3ukCn+MYfbVGi3taWfKxSeMkbRcdFnmisemRTz5nnK/2PWSNntgB9rbEhhMqpVql1SGjZ5IIu0nLHXEnm7xcc1AqhM/fCFEfl8gDY+jDJB3nJP5K5m7l5HQAlcylpSLT1pIt8vRlbSevrUbRQtUYzg3V7IO+RXBmY8wUyOdkZWjBdSeUwEM2WXO+nSBZ+Wm+MjI/HbGF88CDHGk36VED9HW/pXR3J3uOEL2eDRXHb6he5kntYovk7afFGD9+OMogMu+ExazlhYE9mzg5A61g/Jg5nP+1khlinkezctZEyibtjCtHHbjQymh6IvlZD8RUD6LwG5yUbI/eUiPQwW+2Ph3pOJgm5JAP6eGirzLaX4lh6T8CwB8+RJtWahA6+1HjoMbUcMQWjYBAyZMQCz5nfGsa39cX52bdwN88Jrdt6nrXb4EWWO1O22yF/jg5TxFBydDZEWaoT8VTLpkUQxXxbd1pR+6Jp3Th8Fpw0VDzFfIqgXCSptSeFhGnlGTTLr/LHQlh6RNxkpTmRzHUNhcdgGObucUBzli7zVtAFjTfB0gCY+jyVFi1N8a6kAN7hL87BidCYzMpPY2fHLnBmlTkiLdJeiMz2KkRntjbS9jEKCmbiX4BHMTEamCHAic2YSc2YSO/lLuAXeTDfD3R5meNGP6WEt27NPnI9V5PfPKz3xfIkPMg61RmpMPfw6SA/LQSo+P5vKPnkx2RRvRtgCSxoieaATXjVVw6tGyvjRRhvJvY3/v/KuA6yqa83emcS8SV5iR+m9CFIE7NFgLLE+u7FGY+9J7I0qCIIgiIAKIggqFgw27B17wY7Sey+XS6+uWedcqpo3783Mm3nf9/Z1y2n3nLP32v//r7XP3ueK7x8Sh89cVUf9469QkShBaQ7BlH6OspLOqJSx4ZUtJLO9iCv31wySW6cAWIONfmyRLQCVHyzmcSuWhk1cvhg/LJyDn+w3YbXrBux0nocLu+cgYr0lLq1Rw2vquETS97hjqsgU+jX30s3YkYzM1YZ0HmMZRX/N/s7iq1qqb1Fv3mqPqht0n9fpdqkvRRccJQw7EQYu66I+iJbkoYNkO0XGJFVUBetSyGvh/XnGud/VUXFIl26JsTmwD3LstUSrzLYmC3U3RIWPISrp5gXpIPMmkdltCJmnEeUE3aEnNSqJT/H+btSV3VB6mNZ6SAc5IZoimAVHGVPD2QiOkzAxPucFkdWG6CPLTw1vbDohano7SB16sgGOYcMyRUUQK5r3krWHnGFvP1ScGYeKSz8g63fq1sguqDqvjLpTDDm8ttCRABK0yl+7Im1SG8QP/zckDfsS2T9SW29kQw0kL4hi3cWyXlIkqC+RoKz4SxQXaaC8aBgS345JiH4+aS3QTxySKQLZCGdrK20BpnyxCdApa5Z4rXDcghkbf8Msh83Y7OUI720LcclrHsJ/MceJeZ3wxFYZ73YrI/WMLnIiWNEBZJ+OPVC5uBvypjMGLlZAlXMX1IZ1ohujTLnQAVVXOqL2NonRg86MpR3l0+6u002fZounK8xxoX7c9DWSXTuKXWz1kTqiCy47qUYXyZh5jGAG96O700Xsyo5IXN0ZUjJWoWO93FdP7H8VwCzbTSul5QgPkvN3EuB9JD102TKCKQvltmDKjUBV5IZq0ELVSX60GOvoBkM0SOg0UHaIlu2vjdfW7ZG4iWU7Npn3OU588pPk8jkyvDsj0VMHsV50yUetUBI5CGls1Dnh9BQXGQ7OW1JG9UDsWmXkrOqKwuUkTz8rENB2SBrTHtnThTeD8bgAAnqfZDCVfCKZNS/7d4L4NUoLqRKk4yHLGnsZ4otfG7ERPo3W1wRYoxE2gNyMo7htwqqZi7f67cDanY5Y7e0C1wMe2Ov5Cx6Ersdtu1E4u4CEwEEHSYGGSAlTRt4xJbZ+VrqTNkqX0LpGtEPc0DbIn9cBNe5KFNodUX5IgZqU7kWYWPOAMV143hlF6XJb6BFiwcLMxO63BId2yPDqjApaY+1FDZSeoZWf1kLNiW4kVaT0+yyQaauBN0vbImb5N5C5Uaf5GNDN0jKFnhoK+PLd3chwyVC5L3u7uhhHS+hqS+lqS+lqCxkeMgIoN4IJQIgqGa1GE5h5jImVYXTJjJuvbCjiPSn+r86hjhyCNKdOiN/aFnFk7C+dujLcdEY6SVnZeSvkhlMeRVCi3CKzvTkC78MHIcFGB7fGt0X8z2xAy8yRPY+xdCYBXqSMcjsN8XFgzck/kTi1QaXw1pQ0CeoK2MhlJEZlk1GQvOJ9aorfLZ7QpBnMBkAbU5N1tgJRviz8Z7jArPv2fR7S9TusscXPBW77nbDLYwkeH7fBQ+fplE66uLlRF0nUbvlH6RLPCK9jITEQdKC9hTi6Lnng1yibRutaq4tKEppKTx4XQk0lzOO40x519z5H9XWJfJKrwG5/pwsL0Kd76oLcPV1RelIJstOdCKYi6s7r4P0pI9RSzwnCPWerJpLW03VtVhKZbO0+Y9QJZMlPW3zuWO6ljxJKE6FHKdmWVkH3XcKYWn6A+pESShqki0x/ghnIhniQlnlIiyxWH9IQkiJ/atejJigjo31p/WekuwgyajrP3xcpjgTeywCpbpp466yMpwQ3TvAGpwYg/3hPFJ/sywY6gXkKWfsPiLXVw8lBbZCwhFLDibF147eIm6uK2IUdkWvH+Lq3Cxut8NiQBDGuDUrjPkNNNqVSMhl7zF/AForM9DN4m3TWhfh80crymtFs/tMqN4DKlc8nzp94NvRcCDxD3bDnsBMOHliDy0G/Idp3GcJmd8elZXp4yCAvPnk4+CWyDlIfRbJF7e6FxHEdkP0tgRikgdrJBni/hOTB2kgc3ihOC4jqIr5lpP7+Z6i99oU4+0p8ieEBLeo3gkG3JzvemeTqC7poJVQL7+k5x3Of7CnGw+RNXZG6SRky124imBUkPQKQwpAQYblqtwEtVugwUEHCJlrT5g7I9dBEdRAZbXB3FAeS+BzUIdkhYQtUQ5HAYhkHi4KpZclm68ItCbopcrx1kLdLIFJcdu1OKzdCpguZrrM24pzIGwhorKc24+23qDo3HLKTg/A+krH1xlQUH+iLqCXf4Pw4guU9Be93jkGp00CkbTBE6c6eqArsiaKDGrRk3ve9DpA++zNksWz06YNRn0N5meNF67wky8+MCBNecvQRWB8h+MFqCzAlTgfWjrNxW1fvH+aK4KN22Oe7EPscJyD64AbROsOnqeLFOlYQK0B4g1Zh2Jdilx3290TeYpKKoaootlBGWX8d1I0zAZaTRGyjTqSgFvXmLVrko7aou87vXSQVP6FGsa5OKaKD2pME5HclFB0VZld1YutVER+R4aQFqvYYI81OWQQ0Zytdoq+RSH4EMEt96CF8BDcrWKYuY6s6ZQ4J2lZlSL10WYGMnQEGKAogkIEE0l8VBQeoG0N1RdIjJXsuoeyooIwp2iu3wFQBPAe6Rwc9ZDobib91kuaoh3gHLcQ6auKprRIbxQA2yPEikHWnR6M+YhRy/Czx8BcF3J3NsBI2G/AfgpKdpqjeb4G6I71QwpCBqGGovDcQ9W9HELypoH5BXb5tHQo831a83e6LNIfhaB0z/w4whdywQDf82VrH+b4BIQ44fcYZlyI2I8RjGu4cXo/kY1tweoo+7sxSQJLtN8jb/QXSfSSQBtN9hlmifJs56n80RN0APWTpKiLfQhPlY7qjdrkpXS4t0JvHhTNu3qOV3ugszrSqOKYi9o2WHtRCrfCQOEIFleEEMoKxNlx42kJXe6Q7yU23JjAFPVq7z1TsphM60Ev9hNHpOiijRZW6U2I4a4kESehwF55vllP6CL1BxQG0wgAtpPkoMkZqkvRooSCQ24IExmuI/D16SKclJziq4eV6DUT/qoKXa+gN7DWQLTy7pOCP3aSNt1v08dbBCLn7+qPy+GCUHR+IsrBveZ6+eLvVANfnfIPkNUZkrSPEYSa1B7uywXdG6enOyDurh5onE4EUO5S/c0NRjEcCb9AJlauHEQOFxrDXFAKbNshx+wRyH602gSnkiOypmvsCN2dev+KFxzfdcCpwPg67TUHCsc14YzuJYeFrZJGMlO9WpJZrj+pjjH2nv0UZ9Zd0CmPCQEUU9lBDppEKMnqroXA8pcB8FeSsbovynW0ZJ4URfWSzZwQdqc4KVkHhXuHtWZQ1R4WZ0SxTpCpqflcWZ2CV+WsgZ7syEjd3Rpq1IgpcacUBJuKwkIr9uuLjsvI9OuKzS5m7rjgeqNiV4LkylnoaiA+rC701ReuUHdBHOtm4IEEy2Qhy9nHffmrNvd2QwRib6KRK66PlrVLHg6Vd8fzXDkizV0OeM+OtLYnael0kbDTC6w0GeGevT4ZrjCqCictj6UVGIMHJCOentsG5kRIyb1pnKD3LeVp32H9Aep3MPGUOauM3ouzdzuSiB47bEdVTuzVWAjgtlEfL/BFiLQ8WP827Wh57PGyrz6M7wbh9yR7H906D7+r+eOQ7H6Xh9rjK2JmyTBviS+mPUZqc681MNuffD8WLSTzGtEPJSE1k9FJEnJkC0q3o1iZooXC2MkqFF/e6KPNYUn+6vJpAfZEACa+cER4MVwd1wvujncRpdTithhpKldI9qsjYqsCK7IBMOxWUUhpUU3ZUiU9C6JoJkLAssFphhF6hs4bIdkUwPfQg9dSSDyUhUZPtN0DaLhVk0jVn+Woid68e8kiSsnYZIJHfi7VXRZydNmI3d8PrtbTSTerIp8sVH4Bv7YasLYbIsDVmwzLA200aeOegjFzqXQiAnqElHhlGqTQAxe69xYYQ76qCkoj+KLs1GlWvlqL4jTNZ69Eoeif5iLymLPwnB+Ija2xabonWJ8H8NKDejj8OfXTrUM27xz54cPoXnPUYiwtbxyD3mA1yvRcickAbxExri4Lt+mLXWel+QQv2R60jK1RgbZOoyaza47VZO8Rb0uUOppSYaIyaOQRvCd3qGkWU2NKlehigPqAH6ikfqhjLagJJ0cM6oj68M+pPKrKxaItjXYXxqmk2CmSqGuKYW6Hnp9yf5ySY1QfloIrjfdwJ3HZNlLmxgWyXT/8TRioUeGiggNaZzxibtpMyYY82CgK6oZAWnufbHamueoh1IDi26mSjWkjZaoQUe0NkOhiiyMkYpdsIJteFZ6g5tmTftMpMJ32kOetQtpAQ2SsiY4cwjFN4eE1Gep6u9PwE6uVRSBN++CbBGbI43xrpKx9vwE69NTYf4CRHTo5RI7AfHfSHYMoBlZ9AfrydleTza6d3haU/8UfRM3fEnFuJ89tH4Ykrg/pRJzybaYGbQ9vi9c9dKRfU8I4Wk+MhDI9UQJVdF0hXUjTPUUPKMCXx5ydSTUhyBpkBY3ugahKtZboy9ZcC8tdR2rgbieNR6wM0gSC62LBOtMh24suXhKkA9UFkrbu0xRcqCmN9KnZTagjdeMLYW2FQc7Ce6G6LCVaRu4boaksJjnSbhhhDBf1ZtFMTOe5qyKKFpnrwXvfw+AOmZNKWyPIypHskU6WGTmTMS3IkSNv0SHq6Ic/JDHnWJsilay3YRE26hfFziyIS1rUlmGTEXj1Q6GWOTHqp1G30Rm7KyPRWhfS4ORIPkys8/hn03SQ6wbHI2ja5ASZ5bsKjJTQfmZj8T8vvyXPzt1qBKS43HN74fS5YT5GY3A23zs9+tB2JN9bj3oHpuLh5JIX1BlrhBlwb3RVRY79E2loNJNrTcgjke+EF92fI8vbR9e6wQu38nog3V8Q7FQUUGRuh3soSFYMNUT7RENkTVJE+U0382cMqurEaP32CyXh6TBn1hzqLE2MrQyg7Ag3ErruqnZQPXmTIfqaoY4yr3KstEqBqxsIqP4H664uj9Mo9jMQR7gUOSuLbKat9BVergUw3Wo+nClJZ2el7NFAUwuOCzJC5UxdxJDkCiOluxgTEkEAyxrp3Y+PsRddqwjIaIHsTmTK9SY5NJ3FMb+5WNaRaE0A2gAIfC5SF9oXsiDlSQ42Rd2UCcu8vQkWcgzQ6YsiejFCJQSNYDRXc9LcFpq0waVxrnRq+J9/ecqXxq59K8ovcP/fzhqTo3ch94Yr487/irM33iHah+zi4DI9XGOPenPaIXdUe9XS1VV7C0EN+LUjonB6JmhXaiP+uAxJMFBGv2AUZSgTOlJU+0AxloyyRN9KY5MgMOTOMETufVrxRSZwLIk7YOaBC96pOpsyK3dNdZJT1tIBqO4JNtwkfWqyf0NGvTx1rLI5QqHWxQKVrT1S49WiYe0JXvoOs2FtZnF4ojNJL8uyCmF0dkXxQEVmHSIT2KKKIOjVxSxdRS8a76CJZGKFAvVq0ifLD3gQpjJ+JW3SRwRCSbNNRnAYhoysuJLMttDEQh4oUh/SC9Nx3kN4fC9mbVajIOlGXFO0beNdPYt7ChsR6/Ti3RkOOSOv9/8MkB/PtOsk30bddXmU880LFm51IP7MSibTQV9uHksYPRhLjiDiQ6XBfgDHo1VwJSm0oP5z1cGeABDcMJcgbaoSaIQMRr6aGeHVlFFowDvUzRXYf0nsrC2SNMEPcaA0kz2Llb1BCHeOjcK5ydyVakwYFvAlJDa1yhwlkmxlT3VVQv1sJVT4EyYvu211HfA9CBe9FGBMkjAcSZoCVkAFXCjOwfSiPaM1S725I91ZDok9nZAR3RfU5Q3G0QfEB6ko3NsQdKuJPXBTvNxJ/USHXtjMbmBZe/0pitF4HWY4kQLR2YWZZAWWS8BiuzNuc2tIC5RfG051uRO7L1bUVOdvOPry25kdaV8MzZAFIeX2KNdu40FDPf5z/l1Jj8BWue+P4nI1Zzw+g+IUXqp44ICdiNm4ILmfvYJKWISQmpNw+fchOBzIGdkIpraeIlnRnvASZs+k6t/7EmL8Yz8y08EjhKySoKSBVUwlJWmpIMiPR6GmEVGMV5PfpAvyoAqyg1KEuraO1lNqooZxurHwL9dk2fWTZd0CBF93cfgVIAzqjcJ8Cin2UaI1kjc60NCfqQscOyPdoR2arhHq3/sBOygbvcaj0Hoyi3Ua0RA0Cy0YTYoBcf7rNQ/QY5+hSI7kepCz2B+cGUYsGaCN/pzne/qqPuCWGkFn3QYmDHgqcWMaALsijfiw4bYmax3NQHbMNJa88ohG/biqEV5O2wKOJyLSo2+b0IYD/62BCuGLDH0iezpMov7iyK634VQBqXjnj/ePfkH9iFAs7ALI9VohZrYZ70/+E/PUMC15WtCrq3x2WtCBW5LEVwME1wP4NyJ45CBlW3RGv2wXxyp2QrKGODAsL5PTtjwzG00xTTUi/J1sdS4uaRvLzqzZgTbKzTkMkVMLLKIShlJl0l7J9JB/+FOGB7chK26Jsd3vIPDogx7UT0p3bIc+dTHuHIspc+6GeTLzWcywqPAeTSJkxhuqjzq8bcKQXaiP6oOxibxTd6IX8a5YovkQP82AUZJe/RTzJ1TsXFSRsUUXCchXEL1ISh3fi2DDUX/weFXfHUC8uR1mafRoDOYmEpEsTFH+Ax4fAfgzgH3zxv5/kYIoXFj8SyZMDixa8u+ZeVft2B2qfroQ0ciTekDikuprR/VjgxQINPJ+hjPi56sheoI6UsW1QvZRg2H2PRyQ6jybr49EYXWRPtkRSfy281euKGA3GMFNzFAwbg5Jp01C6cCaKlk1C4Txau5U66qYa0UoZk5YpomApLXI1LX67JQp39EQ1Y2T1LkqNoLbIPvgZ8v0/Q+Gu/0ChC2UQWaaULjNfYK3etKTdJijxMhO1Yq0bmbOXKRDSjwSrL+rODUPV1bEovTkFpdGLUJlhg5oMB6DAHXi+ELKT+jz3Vyjfw9ARxPs5OQW48GstcoLiId17sC5n5cwb2RLNRgxEG2jIrWq0sT4/3PERiP8AMJsv3AiqRHLTb6p3+dtdKHuyEnnnRyI7rB8KA7+jnloA3LEHdk/Bm580ETddEemTvgE2UHtuHYZ7w9riguVnuGfFeGdN/RVkjcyRPfBEXxm3OinguZ4pMkZOQNXS5ahatRwlC2YgpV8PZPTVRvb3jGETlFDL82ZPJaib+qLShZZvR6sXpif4a4jv+Cnb247xszPKd+jJxwft1BMHMOftVaQrVUK+L2O1p5rYI1Tqa47a8OGovsCw9ng18MwGSNoDFIYB708B5cFcdwFeL8L726aov6aG2kg2zHNGr/Bu1EY8HTqE9SH+IE1z/TeHpebcXI8fYdiUPgTxHwCm/OqtrRMDJUoJl9c9KXlmi8IbP6Hw3Ei89eyOrF2Mlyfm0NNMQu76PijY0BO5awyBXSNFgLHQEun92+GdxVfA+uFA1G7A9Wek/fgtorXV8bi9CqIVDBCn0wfJ3QbgjY4ZYoxN8EpXAylqKigzIHu1NEa2qTCrmiA6jELdXJ5/KVnzZlqZPQkLxbzw3gPZdmPxAXW5p/AkpSv1Z3uUHeqAwsMKZK+qyDjSHRnhjO1XpqPqmR2kT3zKUHDxBkpfZiHvLpBLMHP86Gp/QtUFuuGoHlyfibJ7Y/JYFb2asWuFWiscPra+5vRp6/yHJvkNNllmE6gSSeIaSa/Eqxuy6mIcUXl3EdJCBuH19m6IdzBkq6eV+oxBkV1fvFmkjvzVJqhbSWY+1wSVw7oi0fQzJA9lLLQlITmykYAuQPWSScgaMxTPzXvhvl4PPNSywHUtY4TraeGCsR6eanfDG0WCqqqJaLVOyJk/CPW2ExDfvz2kgxVRPkUP5TPpimfooOBnbeSt6gapnSGtlwzXkxZ9oKP4RsuiSHWkXTBG3JUfkPZgUWldiscLZPiFQjalH+5ZWtTGX3pHQGmpB4DwBYgnC37PuImnk5B6bUI56sxmNVTHByA2AtlQX4111gKw1hb6/wxm4801luPRvmnby17QLZUfAZ6sQOHJISgM7otMD1rKYQJ1fgnqt1ohbYYq4ke3Rd0ibl/dD6VjFJGsJ0Gy4ed4oM9TObN+Ms8B2RdoCYeAayGoD/FC6k5rJAW74NzqaXixbjYy1s7GvVEWuDeWpOqGP+J+GYH75tSFVnpIGaSOKAMJEgcpIOF7suQRqsiaoo43E74Quwur/MhozxHsu+YoTZgFWabtK8Ck76k7km+EsqRgggUqLicj3g+1ofNRu2IwXlh9jSszJMg4/B1Kbm+sRtyiJS2qokVuUT8Nn9YH/FOkZgAbb6oJTIF2hyzsX3DP90Zs5AaU3CFbfTofJacGoTiU7vbWHODUDMi2fovYebSmiV+TvFC6OAykWzRD5YAOKDH5M3J7dEDCYFa8LV3xXZKNl0G0CmbZE6DoIVD5lCTkFoG+DuTfBlLP8zrcn0PgD63HMYPP8HCgKqLIfp9PNAY8FiJjTm8kjtRC3lQK/xldkblGGKs7Gu+vDUN21EiUZ9mhtnb/wUYgxDLVvz6IjFOI5f1e6C3BS10JXlh+gVh7uu+X9mXI8lrSUAMSuxa6sRmvZiD/+cFsuC85mC0+Z9cPf33G/l3K1dUouj0XhRdG4YGrIu5aKyDG3YRxcSWtbS1wZhZKdw9ExXZKBOu+qJqmj8I+HZGv92fk6H6FWL3PkTlEDc+HqeLhNFZgTDiQwHyabjjjBFAWJc+ya0DVZaDkOC14NTLtGVvXfYvsoF+BF4eBUsa7OP6NXIe4OUrIFeZLHpsGvHMC0r1IaLxQmx2SWVdqO72pWHhlhqO7XiQuGI7onm3x0lBCVy9B0lzG+OMLyhjgFzbURHPDFuuiqYoa/zTk1mufzv8PSX5j4kLzjbcClOuRc0c+OrE45n28G0FYh/TfhyLn+BDkHP0BZZd+Qs21eSg+Pop1aYECN0tUbO0H6TILZI/TR7xpexRYUuBr/htidSSINv8C179rR9kxC1GLe1LqGKLGh2zzrC2yw9fi1eHFBMYbuEe96tYfFUFkxTe2EMQbzAQ78RgBp8t+5IjXK8k8ozbxnjyB29ZsFCEofEJSg9PipJyG3Aln/aMKls3Cs+4aeKbWAa9M1HDDSh8IXp8ErJncDPoH5f5Elv/XuPDX8v9xai6AfKW5JcpbqPhp2I8nVgNeRPyWIHu8FdJbywnoRLz27YtUnwEo2PsdmeT3QNgPlAx9ED27C86NaYdb0/WRsHIQydJSvF87DFcsJbj6w5dIZlwtdpqCu+N1cW8I2ed8M6QsMMWdaYqInNEJ6S7fIXGFER5RzyLiF0B6mm7dA0lO4xm+6QkeuyNmQy9U7aPxFZ1GesDPyA35mXrRC8/PEvhcm7UNQLaB7yT3lKWjEd1dFc801WiZ/eqxzuYW9vsE4I5zvyZDbCxnU520/jTvbJE/2tBq519Pf8Mhf1dqvvHm5cbm3JQlAqAN+09Iur84tCiq+KEz44wD6u8sR2HIcMgOfIdkL0O8tlVC4jp15Fj3RK3fbFobj8u8wkom6QlYhCIbAn6ZbjWbLjSS+5xmAr7LgeNbIF1sgluDJEj5jfJk92ixezBjEYlQ8lG6zjA8mWWMMwO+BkIXFuLE8urI6QQ6xp/nc4L/X4SR8zxfXiQyowNqIe09WLznB2s8ZP4r318heXrSvzuKRo2IxZLtc7irTVOVi8WUF7Cp2PJSN4HavLOxohq/3HCCT+b/Iv2Nh/3N6cPLN4PZvLEZ7KZitY8JnH4496Ytim+TFL1mLHsyGzUXfiB41JaPuC2aQvwoBbr9fGTPH4MHI7ojcSl14xUHZjvUuIxF1HgtSG3p4eIj6hDphOgJXfFsYnuCRWvbOxmp4zSROt0MuO8tfeM4vv5c77ZIm2JSg/0/XrsxU7n46i+Mu+mHkGk7FGHDu9IVB5Sj+CXKk0494y1/iQDJX2L8Z72PnG+O36eaV8BjvQ/022k1l7WhfMJHKOOHRW86oOXG5i82rn6ws0X+g/Q3HvZ3p5b317oFihtaXFAOZROwKyV/yjs13jrpyqbq/LurkcO4KTtPEnJzIarDZ+HhCjMc69MJ4aaKuDrQiLpwUAJ850QjYH7t1XFdcKz/v+PiSIVanFrzEMGrsi/9RR3n+vP0/pPrEbmqPnpiF1zv/xUtdKEUh1e/CP1BrT7iW+rWXQsz4DPrqW+/L96n7JtZiJzgmFcbrXB2tlk93gXvguzFK5SFr8ezERMSI9bVPPWZUYv9U/Zjn8H3zWVtXbaGkjUXW8yNOz+oh8btTd+S182n819J/8Xu/3ZqfXl8fE9iAYTFFmCKmyE54jjWOv2i28uC3d+5nV/V895Nx8k4sqgvXCnyD0/piTjrWVnwmu4Me+25CN+YcGKaLsInKTHe9auDV68z8B1x6/oInbpgEiPpCs06nJiRL/vJsO5EN7LNX3rTlXu/gd2MDE91CW6vGVqD++6vEOFS8WTteOD3xSF4sMrv7dHVeBG6JBW6EgW8lRjgftc+z85vu3j/mE00rs6e8FFxWq6J/1ptaZGaj2l9wMdHytOntv2TJXkr/fQycxuctFIVi7dK0vGR9fhdlzb9eO+hzcQTcLScD0OJBqZIrHB3f2rmCUc8cv8JCd5TsxBiaI1A84CkbaPqg3q2R+Zvw97j9NQ47BlWfLvP13g4pQeNbupzvPN6UGC/APd/GoacsEXXkHE0CS8jUHTYuQpbJINRcsgr8cE+VL1zIv2V6KTfXO346rJTaPrlTQtv92j8ke+WufnzAUL/mqkBRPnyp/OXTe6K60WH5694dNQdqdf2ympvbjsKI4kRgjWWll5xqE4IWorra8bXw2/6BXj2jkf4bJR7zUOa66xkPF4VWBUTXJkT6oRUt8V38WTCzLq8K1VFDw6h8IxtIM/92f3rWzwTXoSXoni0JWS7/oKKq+vxdJJpy+u3zPL06a3/MqklgB+tN1bcH1QgZkraSm9Yj8f5nuaN26KPrLh0ee8SGuwKKSKWrcF2w1/ygqcj3nMocM0tD2GmE7Oilu96ctkdzw47xODx6N44LlHMSAw9FRVhE4qnEmX59TYZ1WZ7Dmq49ucfXbtFFtOHG1vt/BdIjcC1BLPFzhZZWP9gU8N2+febt99dIzG+72s+C5kDLcSvhUr6ZgWPuV9yePh57Jd8Jx53Q6KKcpdJwA6N1ueUX6f5eq3jeNPfjw5svdoq/5Ok/wS0OUc8AaVisAAAAABJRU5ErkJggg==";
function image27(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 0 2020 2300 2020 2300 0 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function morphshape28(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 127 146 24 L 0 127 150 24 0 133 166 36 0 143 186 55 0 169 246 104 0 187 286 138 0 197 306 155 15 205 311 171 24 213 324 183 Q 52 246 388 235 85 278 448 286 L 147 343 548 378 163 360 570 402 173 373 585 419 173 373 585 419 179 377 591 425 181 378 593 427 183 380 595 429 Q 187 380 601 439 191 385 607 446 196 390 613 453 201 398 619 453 L 203 401 623 453 233 445 658 461 Q 256 472 684 470 278 500 709 490 L 295 516 726 502 312 536 742 520 314 540 744 524 314 540 744 524 343 566 772 554 354 572 782 560 360 582 788 567 373 594 800 569 373 594 800 569 377 600 803 569 377 606 804 573 378 606 805 573 380 608 806 573 Q 380 617 816 579 385 625 821 584 L 398 636 822 593 399 636 822 593 401 639 821 597 413 640 817 607 433 640 811 627 445 650 809 631 Q 480 681 804 645 516 712 817 659 L 536 730 826 667 540 734 829 669 540 734 828 669 572 764 850 683 600 784 846 693 636 812 854 705 640 822 866 710 640 840 886 718 684 880 886 736 Q 687 880 886 726 690 882 886 727 L 720 913 886 732 726 919 886 732 Q 744 939 886 732 762 952 886 724 L 794 980 886 722 800 984 886 724 820 1000 886 731 830 1000 886 741 842 1000 886 751 854 1000 886 761 870 1014 886 765 880 1022 886 767 Q 880 1026 876 769 882 1030 876 770 L 903 1046 870 776 913 1054 867 770 919 1060 865 762 952 1094 841 740 Q 962 1106 830 734 980 1120 827 730 L 980 1122 827 730 984 1124 827 726 1000 1138 826 711 1000 1140 828 709 1000 1140 837 703 1000 1140 846 694 1000 1140 856 684 1014 1143 854 670 Q 1029 1147 852 655 1043 1156 851 647 L 1046 1158 851 645 1046 1160 851 644 1062 1180 830 633 Q 1066 1191 824 636 1070 1198 818 641 1077 1201 811 631 1083 1208 804 627 L 1083 1208 804 627 1085 1210 802 626 1095 1198 792 621 1120 1181 771 611 1140 1155 741 593 Q 1137 1126 695 574 1156 1097 671 555 L 1160 1089 666 549 1180 1070 646 535 1198 1058 646 527 1208 1040 628 514 1208 1040 628 514 1210 1036 626 512 1198 1026 626 506 1058 919 598 426 919 813 558 339 Q 766 704 511 243 634 606 422 129 L 606 586 403 105 Q 462 478 301 -22 339 383 173 -159 L 288 339 117 -223 224 290 48 -297 213 276 36 -293 192 254 12 -275 181 243 0 -258 178 239 0 -254 Q 155 234 5 -228 133 220 10 -214 L 111 209 15 -194 107 207 17 -190 79 187 25 -172 50 176 36 -146 46 172 40 -140 40 167 50 -133 34 167 60 -124 Q 23 167 76 -111 13 155 91 -91 L 7 157 101 -80 15 157 97 -74 40 151 86 -49 35 142 101 -35 29 137 107 -29 25 137 111 -27 Q 20 136 116 -18 20 136 126 -9 L 17 131 139 6 15 131 141 8 0 127 146 24";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(0)/65535,0.0+ratio*(9.09088134765625)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-260.0+ratio*(0)/65535,-1134.0+ratio*(-668)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 127 146 24 L 15 131 141 8 17 131 139 6 20 136 126 -9 Q 20 136 116 -18 25 137 111 -27 L 29 137 107 -29 35 142 101 -35 40 151 86 -49 15 157 97 -74 7 157 101 -80 13 155 91 -91 Q 23 167 76 -111 34 167 60 -124 L 40 167 50 -133 46 172 40 -140 50 176 36 -146 79 187 25 -172 107 207 17 -190 111 209 15 -194 133 220 10 -214 Q 155 234 5 -228 178 239 0 -254 L 181 243 0 -258 192 254 12 -275 213 276 36 -293 224 290 48 -297 288 339 117 -223 339 383 173 -159 Q 462 478 301 -22 606 586 403 105 L 634 606 422 129 Q 766 704 511 243 919 813 558 339 L 1058 919 598 426 1198 1026 626 506 1210 1036 626 512 1208 1040 628 514 1208 1040 628 514 1198 1058 646 527 1180 1070 646 535 1160 1089 666 549 1156 1097 671 555 Q 1137 1126 695 574 1140 1155 741 593 L 1120 1181 771 611 1095 1198 792 621 1085 1210 802 626 1083 1208 804 627 1083 1208 804 627 Q 1077 1201 811 631 1070 1198 818 641 1066 1191 824 636 1062 1180 830 633 L 1046 1160 851 644 1046 1158 851 645 1043 1156 851 647 Q 1029 1147 852 655 1014 1143 854 670 L 1000 1140 856 684 1000 1140 846 694 1000 1140 837 703 1000 1140 828 709 1000 1138 826 711 984 1124 827 726 980 1122 827 730 980 1120 827 730 Q 962 1106 830 734 952 1094 841 740 L 919 1060 865 762 913 1054 867 770 903 1046 870 776 882 1030 876 770 Q 880 1026 876 769 880 1022 886 767 L 870 1014 886 765 854 1000 886 761 842 1000 886 751 830 1000 886 741 820 1000 886 731 800 984 886 724 794 980 886 722 762 952 886 724 Q 744 939 886 732 726 919 886 732 L 720 913 886 732 690 882 886 727 Q 687 880 886 726 684 880 886 736 L 640 840 886 718 640 822 866 710 636 812 854 705 600 784 846 693 572 764 850 683 540 734 828 669 540 734 829 669 536 730 826 667 516 712 817 659 Q 480 681 804 645 445 650 809 631 L 433 640 811 627 413 640 817 607 401 639 821 597 399 636 822 593 398 636 822 593 385 625 821 584 Q 380 617 816 579 380 608 806 573 L 378 606 805 573 377 606 804 573 377 600 803 569 373 594 800 569 373 594 800 569 360 582 788 567 354 572 782 560 343 566 772 554 314 540 744 524 314 540 744 524 312 536 742 520 295 516 726 502 278 500 709 490 Q 256 472 684 470 233 445 658 461 L 203 401 623 453 201 398 619 453 Q 196 390 613 453 191 385 607 446 187 380 601 439 183 380 595 429 L 181 378 593 427 179 377 591 425 173 373 585 419 173 373 585 419 163 360 570 402 147 343 548 378 85 278 448 286 Q 52 246 388 235 24 213 324 183 L 15 205 311 171 0 197 306 155 0 187 286 138 0 169 246 104 0 143 186 55 0 133 166 36 0 127 150 24 0 127 146 24 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape29(ctx,ctrans,frame,ratio,time){
	var pathData="M 127 0 24 146 L 127 0 24 150 133 0 36 166 143 0 55 186 169 0 104 246 187 0 138 286 197 0 155 306 205 15 171 311 213 24 183 324 Q 246 52 235 388 278 85 286 448 L 343 147 378 548 360 163 402 570 373 173 419 585 373 173 419 585 377 179 425 591 378 181 427 593 380 183 429 595 Q 380 187 439 601 385 191 446 607 390 196 453 613 398 201 453 619 L 401 203 453 623 445 233 461 658 Q 472 256 470 684 500 278 490 709 L 516 295 502 726 536 312 520 742 540 314 524 744 540 314 524 744 566 343 554 772 572 354 560 782 582 360 567 788 594 373 569 800 594 373 569 800 600 377 569 803 606 377 573 804 606 378 573 805 608 380 573 806 Q 617 380 579 816 625 385 584 821 L 636 398 593 822 636 399 593 822 639 401 597 821 640 413 607 817 640 433 627 811 650 445 631 809 Q 681 480 645 804 712 516 659 817 L 730 536 667 826 734 540 669 829 734 540 669 828 764 572 683 850 784 600 693 846 812 636 705 854 822 640 710 866 840 640 718 886 880 684 736 886 Q 880 687 726 886 882 690 727 886 L 913 720 732 886 919 726 732 886 Q 939 744 732 886 952 762 724 886 L 980 794 722 886 984 800 724 886 1000 820 731 886 1000 830 741 886 1000 842 751 886 1000 854 761 886 1014 870 765 886 1022 880 767 886 Q 1026 880 769 876 1030 882 770 876 L 1046 903 776 870 1054 913 770 867 1060 919 762 865 1094 952 740 841 Q 1106 962 734 830 1120 980 730 827 L 1122 980 730 827 1124 984 726 827 1138 1000 711 826 1140 1000 709 828 1140 1000 703 837 1140 1000 694 846 1140 1000 684 856 1143 1014 670 854 Q 1147 1029 655 852 1156 1043 647 851 L 1158 1046 645 851 1160 1046 644 851 1180 1062 633 830 Q 1191 1066 636 824 1198 1070 641 818 1201 1077 631 811 1208 1083 627 804 L 1208 1083 627 804 1210 1085 626 802 1198 1095 621 792 1181 1120 611 771 1155 1140 593 741 Q 1126 1137 574 695 1097 1156 555 671 L 1089 1160 549 666 1070 1180 535 646 1058 1198 527 646 1040 1208 514 628 1040 1208 514 628 1036 1210 512 626 1026 1198 506 626 919 1058 426 598 813 919 339 558 Q 704 766 243 511 606 634 129 422 L 586 606 105 403 Q 478 462 -22 301 383 339 -159 173 L 339 288 -223 117 290 224 -297 48 276 213 -293 36 254 192 -275 12 243 181 -258 0 239 178 -254 0 Q 234 155 -228 5 220 133 -214 10 L 209 111 -194 15 207 107 -190 17 187 79 -172 25 176 50 -146 36 172 46 -140 40 167 40 -133 50 167 34 -124 60 Q 167 23 -111 76 155 13 -91 91 L 157 7 -80 101 157 15 -74 97 151 40 -49 86 142 35 -35 101 137 29 -29 107 137 25 -27 111 Q 136 20 -18 116 136 20 -9 126 L 131 17 6 139 131 15 8 141 127 0 24 146";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(0)/65535,9.09088134765625+ratio*(-9.09088134765625)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-260.0+ratio*(0)/65535,-1802.0+ratio*(668)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 127 0 24 146 L 131 15 8 141 131 17 6 139 136 20 -9 126 Q 136 20 -18 116 137 25 -27 111 L 137 29 -29 107 142 35 -35 101 151 40 -49 86 157 15 -74 97 157 7 -80 101 155 13 -91 91 Q 167 23 -111 76 167 34 -124 60 L 167 40 -133 50 172 46 -140 40 176 50 -146 36 187 79 -172 25 207 107 -190 17 209 111 -194 15 220 133 -214 10 Q 234 155 -228 5 239 178 -254 0 L 243 181 -258 0 254 192 -275 12 276 213 -293 36 290 224 -297 48 339 288 -223 117 383 339 -159 173 Q 478 462 -22 301 586 606 105 403 L 606 634 129 422 Q 704 766 243 511 813 919 339 558 L 919 1058 426 598 1026 1198 506 626 1036 1210 512 626 1040 1208 514 628 1040 1208 514 628 1058 1198 527 646 1070 1180 535 646 1089 1160 549 666 1097 1156 555 671 Q 1126 1137 574 695 1155 1140 593 741 L 1181 1120 611 771 1198 1095 621 792 1210 1085 626 802 1208 1083 627 804 1208 1083 627 804 Q 1201 1077 631 811 1198 1070 641 818 1191 1066 636 824 1180 1062 633 830 L 1160 1046 644 851 1158 1046 645 851 1156 1043 647 851 Q 1147 1029 655 852 1143 1014 670 854 L 1140 1000 684 856 1140 1000 694 846 1140 1000 703 837 1140 1000 709 828 1138 1000 711 826 1124 984 726 827 1122 980 730 827 1120 980 730 827 Q 1106 962 734 830 1094 952 740 841 L 1060 919 762 865 1054 913 770 867 1046 903 776 870 1030 882 770 876 Q 1026 880 769 876 1022 880 767 886 L 1014 870 765 886 1000 854 761 886 1000 842 751 886 1000 830 741 886 1000 820 731 886 984 800 724 886 980 794 722 886 952 762 724 886 Q 939 744 732 886 919 726 732 886 L 913 720 732 886 882 690 727 886 Q 880 687 726 886 880 684 736 886 L 840 640 718 886 822 640 710 866 812 636 705 854 784 600 693 846 764 572 683 850 734 540 669 828 734 540 669 829 730 536 667 826 712 516 659 817 Q 681 480 645 804 650 445 631 809 L 640 433 627 811 640 413 607 817 639 401 597 821 636 399 593 822 636 398 593 822 625 385 584 821 Q 617 380 579 816 608 380 573 806 L 606 378 573 805 606 377 573 804 600 377 569 803 594 373 569 800 594 373 569 800 582 360 567 788 572 354 560 782 566 343 554 772 540 314 524 744 540 314 524 744 536 312 520 742 516 295 502 726 500 278 490 709 Q 472 256 470 684 445 233 461 658 L 401 203 453 623 398 201 453 619 Q 390 196 453 613 385 191 446 607 380 187 439 601 380 183 429 595 L 378 181 427 593 377 179 425 591 373 173 419 585 373 173 419 585 360 163 402 570 343 147 378 548 278 85 286 448 Q 246 52 235 388 213 24 183 324 L 205 15 171 311 197 0 155 306 187 0 138 286 169 0 104 246 143 0 55 186 133 0 36 166 127 0 24 150 127 0 24 146 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape30(ctx,ctrans,frame,ratio,time){
	var pathData="M 1160 666 L 1156 671 Q 1137 695 1140 741 L 1120 771 Q 1075 806 1046 851 L 1014 854 1000 856 1000 846 1000 837 1000 826 984 827 980 827 Q 962 830 952 841 L 919 865 913 867 882 876 Q 880 876 880 886 L 640 886 640 866 636 854 600 846 572 850 540 828 540 829 536 826 516 817 Q 480 804 445 809 L 401 821 398 822 385 821 Q 380 816 380 806 L 378 805 377 804 373 800 360 788 343 772 278 709 Q 121 545 24 324 L 15 311 0 306 0 286 0 246 0 186 0 166 0 146 15 141 20 126 Q 20 116 25 111 L 35 101 40 86 7 101 50 36 111 15 181 0 339 173 Q 462 301 606 403 750 506 919 558 1055 603 1198 626 L 1210 626 1208 628 1198 646 1180 646 1160 666";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-260,-1134);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite31(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 20;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,7282,time);
			break;
		case 2:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,14564,time);
			break;
		case 3:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,21845,time);
			break;
		case 4:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,29127,time);
			break;
		case 5:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,36409,time);
			break;
		case 6:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,43691,time);
			break;
		case 7:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,50972,time);
			break;
		case 8:
			place("morphshape28",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,58254,time);
			break;
		case 9:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 10:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,6554,time);
			break;
		case 11:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 12:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,19661,time);
			break;
		case 13:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 14:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 15:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 16:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,45875,time);
			break;
		case 17:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 18:
			place("morphshape29",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,58982,time);
			break;
		case 19:
			place("shape30",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function shape32(ctx,ctrans,frame,ratio,time){
	var pathData="M 1892 620 L 1895 637 Q 1904 661 1931 665 L 1932 665 1937 676 1945 691 2005 818 2005 819 2008 825 2012 833 2023 857 Q 2118 1064 2206 1274 2229 1331 2280 1340 2278 1388 2260 1400 L 2276 1408 2280 1420 2190 1489 Q 2094 1555 1984 1608 L 1976 1612 1967 1616 1940 1620 1918 1642 1904 1654 1866 1680 1841 1693 1824 1701 1825 1701 1802 1709 1773 1719 Q 1721 1690 1655 1680 L 1625 1690 1626 1691 1615 1690 Q 1567 1714 1526 1745 L 1525 1745 Q 1509 1745 1498 1751 L 1477 1756 Q 1473 1757 1470 1760 L 1458 1760 Q 1315 1737 1179 1692 1010 1640 866 1537 722 1435 599 1307 L 441 1134 446 1133 460 1130 461 1128 510 876 Q 513 859 519 843 652 756 792 683 882 635 982 607 1085 582 1191 574 L 1430 556 Q 1542 555 1652 577 L 1868 615 1892 620 M 529 826 L 521 837 524 830 525 826 529 826";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function morphshape33(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 320 662 662 L 10 326 664 667 15 330 667 671 20 332 672 669 93 375 650 631 149 404 631 603 163 408 627 599 165 409 627 598 167 409 627 599 171 410 625 597 175 411 623 596 239 425 599 548 243 425 598 546 241 425 599 544 245 425 597 540 248 426 596 536 252 426 592 532 274 449 556 511 290 467 532 500 311 481 524 492 351 483 511 465 440 488 492 399 482 500 276 238 490 502 238 211 498 505 206 187 505 498 187 174 505 498 187 174 487 485 174 175 462 468 174 169 447 459 174 172 Q 425 449 171 172 403 444 169 147 L 403 444 169 147 382 437 172 132 380 436 172 132 Q 361 428 172 129 349 424 162 107 L 341 423 154 99 337 421 147 94 337 421 147 94 337 421 147 92 333 420 145 89 320 412 132 81 Q 302 403 131 71 291 395 119 61 L 282 387 107 54 282 385 107 52 282 385 107 52 280 381 99 48 274 374 92 41 274 372 91 39 273 372 89 39 247 357 79 22 239 357 77 15 231 353 75 11 211 344 67 0 207 339 65 1 205 335 63 0 203 335 61 2 Q 194 327 58 2 186 322 55 10 L 178 321 52 15 178 321 52 15 168 321 48 22 160 322 46 29 141 322 39 43 119 324 31 62 100 326 22 80 100 326 15 84 90 326 11 91 Q 71 327 10 102 64 328 0 113 L 51 328 1 123 40 328 0 129 40 328 2 129 21 330 4 144 4 332 10 159 Q 0 332 12 165 2 332 22 171 L 2 332 25 171 4 334 29 177 11 336 62 198 21 339 113 232 21 339 117 236 27 342 144 256 29 342 152 262 32 342 171 276 36 342 180 282 36 342 180 283 43 340 197 297 47 337 213 307 50 335 230 322 50 335 232 325 50 335 236 327 58 335 258 341 58 335 258 342 60 335 262 348 60 335 282 362 60 335 283 362 60 335 287 362 55 335 297 370 45 336 307 379 45 336 307 380 Q 40 337 313 386 40 338 322 392 L 40 340 339 404 40 340 341 406 40 340 342 406 40 342 362 420 44 342 380 432 50 342 394 442 54 342 404 450 59 342 425 462 60 342 432 470 60 341 436 473 60 341 438 475 60 341 438 475 60 340 438 476 60 339 442 480 60 335 462 491 60 337 462 498 59 337 470 503 60 337 467 505 58 337 473 511 58 337 475 511 57 337 475 516 56 337 475 516 55 337 476 516 41 335 491 527 45 335 511 538 43 334 527 549 37 336 549 565 41 337 557 571 45 337 571 582 Q 45 334 606 616 19 322 616 621 L 15 322 618 625 5 322 621 633 4 322 625 635 1 321 648 652 1 321 652 656 0 320 662 662";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-12.67333984375)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-20.0+ratio*(333)/65535,-638.0+ratio*(0)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 320 662 662 L 1 321 652 656 1 321 648 652 4 322 625 635 5 322 621 633 15 322 618 625 19 322 616 621 Q 45 334 606 616 45 337 571 582 L 41 337 557 571 37 336 549 565 43 334 527 549 45 335 511 538 41 335 491 527 55 337 476 516 56 337 475 516 57 337 475 516 58 337 475 511 58 337 473 511 60 337 467 505 59 337 470 503 60 337 462 498 60 335 462 491 60 339 442 480 60 340 438 476 60 341 438 475 60 341 438 475 60 341 436 473 60 342 432 470 59 342 425 462 54 342 404 450 50 342 394 442 44 342 380 432 40 342 362 420 40 340 342 406 40 340 341 406 40 340 339 404 40 338 322 392 Q 40 337 313 386 45 336 307 380 L 45 336 307 379 55 335 297 370 60 335 287 362 60 335 283 362 60 335 282 362 60 335 262 348 58 335 258 342 58 335 258 341 50 335 236 327 50 335 232 325 50 335 230 322 47 337 213 307 43 340 197 297 36 342 180 283 36 342 180 282 32 342 171 276 29 342 152 262 27 342 144 256 21 339 117 236 21 339 113 232 11 336 62 198 4 334 29 177 2 332 25 171 2 332 22 171 Q 0 332 12 165 4 332 10 159 L 21 330 4 144 40 328 2 129 40 328 0 129 51 328 1 123 64 328 0 113 Q 71 327 10 102 90 326 11 91 L 100 326 15 84 100 326 22 80 119 324 31 62 141 322 39 43 160 322 46 29 168 321 48 22 178 321 52 15 178 321 52 15 186 322 55 10 Q 194 327 58 2 203 335 61 2 L 205 335 63 0 207 339 65 1 211 344 67 0 231 353 75 11 239 357 77 15 247 357 79 22 273 372 89 39 274 372 91 39 274 374 92 41 280 381 99 48 282 385 107 52 282 385 107 52 282 387 107 54 291 395 119 61 Q 302 403 131 71 320 412 132 81 L 333 420 145 89 337 421 147 92 337 421 147 94 337 421 147 94 341 423 154 99 349 424 162 107 Q 361 428 172 129 380 436 172 132 L 382 437 172 132 403 444 169 147 403 444 169 147 Q 425 449 171 172 447 459 174 172 L 462 468 174 169 487 485 174 175 505 498 187 174 505 498 187 174 498 505 206 187 490 502 238 211 482 500 276 238 440 488 492 399 351 483 511 465 311 481 524 492 290 467 532 500 274 449 556 511 252 426 592 532 248 426 596 536 245 425 597 540 241 425 599 544 243 425 598 546 239 425 599 548 175 411 623 596 171 410 625 597 167 409 627 599 165 409 627 598 163 408 627 599 149 404 631 603 93 375 650 631 20 332 672 669 15 330 667 671 10 326 664 667 0 320 662 662 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape34(ctx,ctrans,frame,ratio,time){
	var pathData="M 320 0 662 662 L 326 10 667 664 328 15 672 667 332 20 669 672 375 93 631 650 404 149 603 631 408 163 599 627 409 165 598 627 409 167 599 627 410 171 597 625 411 175 596 623 425 239 548 599 425 243 546 598 425 241 544 599 425 245 540 597 426 248 536 596 426 252 532 592 449 274 511 556 467 290 500 532 481 311 492 524 483 351 465 511 488 440 399 492 500 482 238 276 502 490 211 238 505 498 187 206 498 505 174 187 498 505 174 187 485 487 175 174 468 462 169 174 459 447 172 174 Q 449 425 172 171 444 403 147 169 L 444 403 147 169 437 382 132 172 436 380 132 172 Q 428 361 129 172 424 349 107 162 L 423 341 99 154 421 337 94 147 421 337 94 147 421 337 92 147 420 333 89 145 412 320 81 132 Q 403 302 71 131 395 291 61 119 L 387 282 54 107 385 282 52 107 385 282 52 107 381 280 48 99 374 274 41 92 372 274 39 91 372 273 39 89 357 247 22 79 357 239 15 77 353 231 11 75 344 211 0 67 339 207 1 65 335 205 0 63 335 203 2 61 Q 327 194 2 58 322 186 10 55 L 321 178 15 52 321 178 15 52 321 168 22 48 322 160 29 46 322 141 43 39 324 119 62 31 326 100 80 22 326 100 84 15 326 90 91 11 Q 327 71 102 10 328 64 113 0 L 328 51 123 1 328 40 129 0 328 40 129 2 330 21 144 4 332 4 159 10 Q 332 0 165 12 332 2 171 22 L 332 2 171 25 334 4 177 29 336 11 198 62 339 21 232 113 339 21 236 117 342 27 256 144 342 29 262 152 342 32 276 171 342 36 282 180 342 36 283 180 340 43 297 197 337 47 307 213 335 50 322 230 335 50 325 232 335 50 327 236 335 58 341 258 335 58 342 258 335 60 348 262 335 60 362 282 335 60 362 283 335 60 362 287 335 55 370 297 336 45 379 307 336 45 380 307 Q 337 40 386 313 338 40 392 322 L 340 40 404 339 340 40 406 341 340 40 406 342 342 40 420 362 342 44 432 380 342 50 442 394 342 54 450 404 342 59 462 425 342 60 470 432 341 60 473 436 341 60 475 438 341 60 475 438 340 60 476 438 339 60 480 442 335 60 491 462 337 60 498 462 337 59 503 470 337 60 505 467 337 58 511 473 337 58 511 475 337 57 516 475 337 56 516 475 337 55 516 476 335 41 527 491 335 45 538 511 334 43 549 527 336 37 565 549 337 41 571 557 337 45 582 571 Q 334 45 616 606 322 19 621 616 L 322 15 625 618 322 5 633 621 322 4 635 625 321 1 652 648 321 1 656 652 320 0 662 662";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(7.32666015625+ratio*(12.67333984375)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,313.0+ratio*(-333)/65535,-638.0+ratio*(0)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 320 0 662 662 L 321 1 656 652 321 1 652 648 322 4 635 625 322 5 633 621 322 15 625 618 322 19 621 616 Q 334 45 616 606 337 45 582 571 L 337 41 571 557 336 37 565 549 334 43 549 527 335 45 538 511 335 41 527 491 337 55 516 476 337 56 516 475 337 57 516 475 337 58 511 475 337 58 511 473 337 60 505 467 337 59 503 470 337 60 498 462 335 60 491 462 339 60 480 442 340 60 476 438 341 60 475 438 341 60 475 438 341 60 473 436 342 60 470 432 342 59 462 425 342 54 450 404 342 50 442 394 342 44 432 380 342 40 420 362 340 40 406 342 340 40 406 341 340 40 404 339 338 40 392 322 Q 337 40 386 313 336 45 380 307 L 336 45 379 307 335 55 370 297 335 60 362 287 335 60 362 283 335 60 362 282 335 60 348 262 335 58 342 258 335 58 341 258 335 50 327 236 335 50 325 232 335 50 322 230 337 47 307 213 340 43 297 197 342 36 283 180 342 36 282 180 342 32 276 171 342 29 262 152 342 27 256 144 339 21 236 117 339 21 232 113 336 11 198 62 334 4 177 29 332 2 171 25 332 2 171 22 Q 332 0 165 12 332 4 159 10 L 330 21 144 4 328 40 129 2 328 40 129 0 328 51 123 1 328 64 113 0 Q 327 71 102 10 326 90 91 11 L 326 100 84 15 326 100 80 22 324 119 62 31 322 141 43 39 322 160 29 46 321 168 22 48 321 178 15 52 321 178 15 52 322 186 10 55 Q 327 194 2 58 335 203 2 61 L 335 205 0 63 339 207 1 65 344 211 0 67 353 231 11 75 357 239 15 77 357 247 22 79 372 273 39 89 372 274 39 91 374 274 41 92 381 280 48 99 385 282 52 107 385 282 52 107 387 282 54 107 395 291 61 119 Q 403 302 71 131 412 320 81 132 L 420 333 89 145 421 337 92 147 421 337 94 147 421 337 94 147 423 341 99 154 424 349 107 162 Q 428 361 129 172 436 380 132 172 L 437 382 132 172 444 403 147 169 444 403 147 169 Q 449 425 172 171 459 447 172 174 L 468 462 169 174 485 487 175 174 498 505 174 187 498 505 174 187 505 498 187 206 502 490 211 238 500 482 238 276 488 440 399 492 483 351 465 511 481 311 492 524 467 290 500 532 449 274 511 556 426 252 532 592 426 248 536 596 425 245 540 597 425 241 544 599 425 243 546 598 425 239 548 599 411 175 596 623 410 171 597 625 409 167 599 627 409 165 598 627 408 163 599 627 404 149 603 631 375 93 631 650 332 20 669 672 328 15 672 667 326 10 667 664 320 0 662 662 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape35(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 320 662 662 L 10 326 664 667 15 330 667 671 20 332 672 669 93 375 650 631 149 404 631 603 163 408 627 599 165 409 627 598 167 409 627 599 171 410 625 597 175 411 623 596 239 425 599 548 243 425 598 546 241 425 599 544 245 425 597 540 248 426 596 536 252 426 592 532 274 449 556 511 290 467 532 500 311 481 524 492 351 483 511 465 440 488 492 399 482 500 276 238 490 502 238 211 498 505 206 187 505 498 187 174 505 498 187 174 487 485 174 175 462 468 174 169 447 459 174 172 Q 425 449 171 172 403 444 169 147 L 403 444 169 147 382 437 172 132 380 436 172 132 Q 361 428 172 129 349 424 162 107 L 341 423 154 99 337 421 147 94 337 421 147 94 337 421 147 92 333 420 145 89 320 412 132 81 Q 302 403 131 71 291 395 119 61 L 282 387 107 54 282 385 107 52 282 385 107 52 280 381 99 48 274 374 92 41 274 372 91 39 273 372 89 39 247 357 79 22 239 357 77 15 231 353 75 11 211 344 67 0 207 339 65 1 205 335 63 0 203 335 61 2 Q 194 327 58 2 186 322 55 10 L 178 321 52 15 178 321 52 15 168 321 48 22 160 322 46 29 141 322 39 43 119 324 31 62 100 326 22 80 100 326 15 84 90 326 11 91 Q 71 327 10 102 64 328 0 113 L 51 328 1 123 40 328 0 129 40 328 2 129 21 330 4 144 4 332 10 159 Q 0 332 12 165 2 332 22 171 L 2 332 25 171 4 334 29 177 11 336 62 198 21 339 113 232 21 339 117 236 27 342 144 256 29 342 152 262 32 342 171 276 36 342 180 282 36 342 180 283 43 340 197 297 47 337 213 307 50 335 230 322 50 335 232 325 50 335 236 327 58 335 258 341 58 335 258 342 60 335 262 348 60 335 282 362 60 335 283 362 60 335 287 362 55 335 297 370 45 336 307 379 45 336 307 380 Q 40 337 313 386 40 338 322 392 L 40 340 339 404 40 340 341 406 40 340 342 406 40 342 362 420 44 342 380 432 50 342 394 442 54 342 404 450 59 342 425 462 60 342 432 470 60 341 436 473 60 341 438 475 60 341 438 475 60 340 438 476 60 339 442 480 60 335 462 491 60 337 462 498 59 337 470 503 60 337 467 505 58 337 473 511 58 337 475 511 57 337 475 516 56 337 475 516 55 337 476 516 41 335 491 527 45 335 511 538 43 334 527 549 37 336 549 565 41 337 557 571 45 337 571 582 Q 45 334 606 616 19 322 616 621 L 15 322 618 625 5 322 621 633 4 322 625 635 1 321 648 652 1 321 652 656 0 320 662 662";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-12.67333984375)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-20.0+ratio*(333)/65535,-638.0+ratio*(0)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 320 662 662 L 1 321 652 656 1 321 648 652 4 322 625 635 5 322 621 633 15 322 618 625 19 322 616 621 Q 45 334 606 616 45 337 571 582 L 41 337 557 571 37 336 549 565 43 334 527 549 45 335 511 538 41 335 491 527 55 337 476 516 56 337 475 516 57 337 475 516 58 337 475 511 58 337 473 511 60 337 467 505 59 337 470 503 60 337 462 498 60 335 462 491 60 339 442 480 60 340 438 476 60 341 438 475 60 341 438 475 60 341 436 473 60 342 432 470 59 342 425 462 54 342 404 450 50 342 394 442 44 342 380 432 40 342 362 420 40 340 342 406 40 340 341 406 40 340 339 404 40 338 322 392 Q 40 337 313 386 45 336 307 380 L 45 336 307 379 55 335 297 370 60 335 287 362 60 335 283 362 60 335 282 362 60 335 262 348 58 335 258 342 58 335 258 341 50 335 236 327 50 335 232 325 50 335 230 322 47 337 213 307 43 340 197 297 36 342 180 283 36 342 180 282 32 342 171 276 29 342 152 262 27 342 144 256 21 339 117 236 21 339 113 232 11 336 62 198 4 334 29 177 2 332 25 171 2 332 22 171 Q 0 332 12 165 4 332 10 159 L 21 330 4 144 40 328 2 129 40 328 0 129 51 328 1 123 64 328 0 113 Q 71 327 10 102 90 326 11 91 L 100 326 15 84 100 326 22 80 119 324 31 62 141 322 39 43 160 322 46 29 168 321 48 22 178 321 52 15 178 321 52 15 186 322 55 10 Q 194 327 58 2 203 335 61 2 L 205 335 63 0 207 339 65 1 211 344 67 0 231 353 75 11 239 357 77 15 247 357 79 22 273 372 89 39 274 372 91 39 274 374 92 41 280 381 99 48 282 385 107 52 282 385 107 52 282 387 107 54 291 395 119 61 Q 302 403 131 71 320 412 132 81 L 333 420 145 89 337 421 147 92 337 421 147 94 337 421 147 94 341 423 154 99 349 424 162 107 Q 361 428 172 129 380 436 172 132 L 382 437 172 132 403 444 169 147 403 444 169 147 Q 425 449 171 172 447 459 174 172 L 462 468 174 169 487 485 174 175 505 498 187 174 505 498 187 174 498 505 206 187 490 502 238 211 482 500 276 238 440 488 492 399 351 483 511 465 311 481 524 492 290 467 532 500 274 449 556 511 252 426 592 532 248 426 596 536 245 425 597 540 241 425 599 544 243 425 598 546 239 425 599 548 175 411 623 596 171 410 625 597 167 409 627 599 165 409 627 598 163 408 627 599 149 404 631 603 93 375 650 631 20 332 672 669 15 330 667 671 10 326 664 667 0 320 662 662 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape36(ctx,ctrans,frame,ratio,time){
	var pathData="M 320 0 662 662 L 326 10 667 664 328 15 672 667 332 20 669 672 375 93 631 650 404 149 603 631 408 163 599 627 409 165 598 627 409 167 599 627 410 171 597 625 411 175 596 623 425 239 548 599 425 243 546 598 425 241 544 599 425 245 540 597 426 248 536 596 426 252 532 592 449 274 511 556 467 290 500 532 481 311 492 524 483 351 465 511 488 440 399 492 500 482 238 276 502 490 211 238 505 498 187 206 498 505 174 187 498 505 174 187 485 487 175 174 468 462 169 174 459 447 172 174 Q 449 425 172 171 444 403 147 169 L 444 403 147 169 437 382 132 172 436 380 132 172 Q 428 361 129 172 424 349 107 162 L 423 341 99 154 421 337 94 147 421 337 94 147 421 337 92 147 420 333 89 145 412 320 81 132 Q 403 302 71 131 395 291 61 119 L 387 282 54 107 385 282 52 107 385 282 52 107 381 280 48 99 374 274 41 92 372 274 39 91 372 273 39 89 357 247 22 79 357 239 15 77 353 231 11 75 344 211 0 67 339 207 1 65 335 205 0 63 335 203 2 61 Q 327 194 2 58 322 186 10 55 L 321 178 15 52 321 178 15 52 321 168 22 48 322 160 29 46 322 141 43 39 324 119 62 31 326 100 80 22 326 100 84 15 326 90 91 11 Q 327 71 102 10 328 64 113 0 L 328 51 123 1 328 40 129 0 328 40 129 2 330 21 144 4 332 4 159 10 Q 332 0 165 12 332 2 171 22 L 332 2 171 25 334 4 177 29 336 11 198 62 339 21 232 113 339 21 236 117 342 27 256 144 342 29 262 152 342 32 276 171 342 36 282 180 342 36 283 180 340 43 297 197 337 47 307 213 335 50 322 230 335 50 325 232 335 50 327 236 335 58 341 258 335 58 342 258 335 60 348 262 335 60 362 282 335 60 362 283 335 60 362 287 335 55 370 297 336 45 379 307 336 45 380 307 Q 337 40 386 313 338 40 392 322 L 340 40 404 339 340 40 406 341 340 40 406 342 342 40 420 362 342 44 432 380 342 50 442 394 342 54 450 404 342 59 462 425 342 60 470 432 341 60 473 436 341 60 475 438 341 60 475 438 340 60 476 438 339 60 480 442 335 60 491 462 337 60 498 462 337 59 503 470 337 60 505 467 337 58 511 473 337 58 511 475 337 57 516 475 337 56 516 475 337 55 516 476 335 41 527 491 335 45 538 511 334 43 549 527 336 37 565 549 337 41 571 557 337 45 582 571 Q 334 45 616 606 322 19 621 616 L 322 15 625 618 322 5 633 621 322 4 635 625 321 1 652 648 321 1 656 652 320 0 662 662";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(7.32666015625+ratio*(12.67333984375)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,313.0+ratio*(-333)/65535,-638.0+ratio*(0)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 320 0 662 662 L 321 1 656 652 321 1 652 648 322 4 635 625 322 5 633 621 322 15 625 618 322 19 621 616 Q 334 45 616 606 337 45 582 571 L 337 41 571 557 336 37 565 549 334 43 549 527 335 45 538 511 335 41 527 491 337 55 516 476 337 56 516 475 337 57 516 475 337 58 511 475 337 58 511 473 337 60 505 467 337 59 503 470 337 60 498 462 335 60 491 462 339 60 480 442 340 60 476 438 341 60 475 438 341 60 475 438 341 60 473 436 342 60 470 432 342 59 462 425 342 54 450 404 342 50 442 394 342 44 432 380 342 40 420 362 340 40 406 342 340 40 406 341 340 40 404 339 338 40 392 322 Q 337 40 386 313 336 45 380 307 L 336 45 379 307 335 55 370 297 335 60 362 287 335 60 362 283 335 60 362 282 335 60 348 262 335 58 342 258 335 58 341 258 335 50 327 236 335 50 325 232 335 50 322 230 337 47 307 213 340 43 297 197 342 36 283 180 342 36 282 180 342 32 276 171 342 29 262 152 342 27 256 144 339 21 236 117 339 21 232 113 336 11 198 62 334 4 177 29 332 2 171 25 332 2 171 22 Q 332 0 165 12 332 4 159 10 L 330 21 144 4 328 40 129 2 328 40 129 0 328 51 123 1 328 64 113 0 Q 327 71 102 10 326 90 91 11 L 326 100 84 15 326 100 80 22 324 119 62 31 322 141 43 39 322 160 29 46 321 168 22 48 321 178 15 52 321 178 15 52 322 186 10 55 Q 327 194 2 58 335 203 2 61 L 335 205 0 63 339 207 1 65 344 211 0 67 353 231 11 75 357 239 15 77 357 247 22 79 372 273 39 89 372 274 39 91 374 274 41 92 381 280 48 99 385 282 52 107 385 282 52 107 387 282 54 107 395 291 61 119 Q 403 302 71 131 412 320 81 132 L 420 333 89 145 421 337 92 147 421 337 94 147 421 337 94 147 423 341 99 154 424 349 107 162 Q 428 361 129 172 436 380 132 172 L 437 382 132 172 444 403 147 169 444 403 147 169 Q 449 425 172 171 459 447 172 174 L 468 462 169 174 485 487 175 174 498 505 174 187 498 505 174 187 505 498 187 206 502 490 211 238 500 482 238 276 488 440 399 492 483 351 465 511 481 311 492 524 467 290 500 532 449 274 511 556 426 252 532 592 426 248 536 596 425 245 540 597 425 241 544 599 425 243 546 598 425 239 548 599 411 175 596 623 410 171 597 625 409 167 599 627 409 165 598 627 408 163 599 627 404 149 603 631 375 93 631 650 332 20 669 672 328 15 672 667 326 10 667 664 320 0 662 662 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape37(ctx,ctrans,frame,ratio,time){
	var pathData="M 487 174 L 505 187 Q 495 212 490 238 L 440 492 351 511 Q 320 519 290 532 L 248 596 245 597 241 599 243 598 239 599 149 631 20 672 15 667 0 662 1 652 4 625 5 621 Q 45 615 45 571 L 37 549 45 511 41 491 55 476 56 475 57 475 58 473 60 467 59 470 60 462 60 442 54 404 44 380 40 362 40 342 40 341 40 322 Q 40 312 45 307 L 55 297 60 283 60 282 60 262 50 236 50 232 Q 44 194 32 171 L 27 144 11 62 4 29 2 22 Q 0 12 4 10 L 40 2 40 0 51 1 64 0 Q 71 10 90 11 L 100 15 100 22 141 39 178 52 203 61 273 89 274 92 280 99 282 107 Q 295 130 320 132 L 337 147 Q 351 172 380 172 L 403 169 487 174";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-20,-638);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape38(ctx,ctrans,frame,ratio,time){
	var pathData="M 498 174 L 505 187 Q 501 212 500 238 L 481 492 Q 465 499 449 511 L 426 532 411 596 410 597 408 599 409 598 408 599 375 631 327 672 325 667 320 662 320 652 321 625 322 621 Q 336 615 336 571 L 334 549 336 511 335 491 340 476 341 475 341 473 342 467 342 470 342 462 342 442 340 404 336 380 335 362 335 342 335 341 335 322 336 307 340 297 342 283 342 282 342 262 338 236 338 232 332 171 330 144 324 62 321 29 321 22 321 10 Q 327 2 335 2 L 335 0 339 1 343 0 353 11 357 15 357 22 372 39 385 52 394 61 420 89 420 92 423 99 423 107 Q 428 130 437 132 L 443 147 Q 449 172 459 172 L 468 169 498 174";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(7.32666015625,0,0,20,313,-638);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape39(ctx,ctrans,frame,ratio,time){
	var pathData="M 487 174 L 505 187 Q 495 212 490 238 L 440 492 351 511 Q 320 519 290 532 L 248 596 245 597 241 599 243 598 239 599 149 631 20 672 15 667 0 662 1 652 4 625 5 621 Q 45 615 45 571 L 37 549 45 511 41 491 55 476 56 475 57 475 58 473 60 467 59 470 60 462 60 442 54 404 44 380 40 362 40 342 40 341 40 322 Q 40 312 45 307 L 55 297 60 283 60 282 60 262 50 236 50 232 Q 44 194 32 171 L 27 144 11 62 4 29 2 22 Q 0 12 4 10 L 40 2 40 0 51 1 64 0 Q 71 10 90 11 L 100 15 100 22 141 39 178 52 203 61 273 89 274 92 280 99 282 107 Q 295 130 320 132 L 337 147 Q 351 172 380 172 L 403 169 487 174";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-20,-638);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape40(ctx,ctrans,frame,ratio,time){
	var pathData="M 498 174 L 505 187 Q 501 212 500 238 L 481 492 Q 465 499 449 511 L 426 532 411 596 410 597 408 599 409 598 408 599 375 631 327 672 325 667 320 662 320 652 321 625 322 621 Q 336 615 336 571 L 334 549 336 511 335 491 340 476 341 475 341 473 342 467 342 470 342 462 342 442 340 404 336 380 335 362 335 342 335 341 335 322 336 307 340 297 342 283 342 282 342 262 338 236 338 232 332 171 330 144 324 62 321 29 321 22 321 10 Q 327 2 335 2 L 335 0 339 1 343 0 353 11 357 15 357 22 372 39 385 52 394 61 420 89 420 92 423 99 423 107 Q 428 130 437 132 L 443 147 Q 449 172 459 172 L 468 169 498 174";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(7.32666015625,0,0,20,313,-638);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape41(ctx,ctrans,frame,ratio,time){
	var pathData="M 487 174 L 505 187 Q 495 212 490 238 L 440 492 351 511 Q 320 519 290 532 L 248 596 245 597 241 599 243 598 239 599 149 631 20 672 15 667 0 662 1 652 4 625 5 621 Q 45 615 45 571 L 37 549 45 511 41 491 55 476 56 475 57 475 58 473 60 467 59 470 60 462 60 442 54 404 44 380 40 362 40 342 40 341 40 322 Q 40 312 45 307 L 55 297 60 283 60 282 60 262 50 236 50 232 Q 44 194 32 171 L 27 144 11 62 4 29 2 22 Q 0 12 4 10 L 40 2 40 0 51 1 64 0 Q 71 10 90 11 L 100 15 100 22 141 39 178 52 203 61 273 89 274 92 280 99 282 107 Q 295 130 320 132 L 337 147 Q 351 172 380 172 L 403 169 487 174";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-20,-638);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite42(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 24;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape33",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape33",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 2:
			place("morphshape33",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 3:
			place("morphshape33",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 4:
			place("morphshape33",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 5:
			place("morphshape34",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 6:
			place("morphshape34",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 7:
			place("morphshape34",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 8:
			place("morphshape34",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 9:
			place("morphshape34",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 10:
			place("morphshape35",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 11:
			place("morphshape35",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,16384,time);
			break;
		case 12:
			place("morphshape35",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 13:
			place("morphshape35",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,49152,time);
			break;
		case 14:
			place("morphshape36",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 15:
			place("morphshape36",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 16:
			place("morphshape36",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 17:
			place("morphshape36",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 18:
			place("morphshape36",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 19:
			place("shape37",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 20:
			place("shape38",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 21:
			place("shape39",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 22:
			place("shape40",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 23:
			place("shape41",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function morphshape43(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 -82 305 124 L 0 -80 305 124 68 -12 300 149 74 -10 300 144 75 -2 292 137 76 2 289 136 79 7 285 135 82 11 283 133 84 13 281 133 91 24 275 131 107 40 265 127 113 47 259 125 132 67 242 117 134 71 240 119 140 75 240 121 144 81 240 123 170 103 232 124 170 105 232 124 179 112 225 121 181 114 224 121 183 114 223 121 187 116 219 120 193 125 213 118 197 131 210 116 197 133 210 116 203 136 206 115 214 150 200 112 217 152 200 112 218 152 200 112 222 156 200 112 225 159 199 113 229 165 195 114 231 167 194 114 234 172 191 113 235 176 190 111 237 179 190 111 241 186 189 112 240 186 190 112 253 197 187 115 253 199 187 116 254 199 187 116 256 203 187 116 257 203 187 116 259 205 186 116 299 249 171 118 303 253 169 117 305 255 169 117 305 257 167 116 307 259 166 116 309 261 165 116 311 263 163 114 314 266 160 109 Q 315 269 156 104 316 274 152 102 L 319 281 145 100 325 287 139 97 329 291 135 95 Q 361 335 99 78 392 376 64 54 L 394 380 60 55 394 380 60 55 394 382 60 56 396 382 60 56 398 386 60 56 398 386 60 56 401 390 60 56 403 390 60 56 403 392 59 55 408 400 57 53 409 402 55 54 409 404 55 54 412 408 52 55 414 410 51 56 416 412 50 56 420 416 50 57 422 418 49 57 424 420 49 58 426 422 49 58 430 423 49 58 430 424 49 59 432 426 47 59 434 430 47 61 436 432 47 61 439 434 46 61 440 434 46 61 442 436 46 61 451 443 44 61 459 452 41 62 459 452 41 62 467 446 39 56 Q 416 411 11 14 353 358 0 -19 L 349 355 0 -19 321 327 10 -22 321 327 10 -21 319 325 10 -23 320 323 11 -23 316 318 11 -26 309 310 10 -26 Q 226 218 53 -19 163 137 114 14 L 159 133 118 18 Q 153 116 140 36 110 60 193 66 L 108 58 195 66 96 45 200 65 94 45 200 63 94 47 195 60 94 47 195 60 74 19 225 78 72 17 227 80 Q 28 -38 261 94 0 -82 305 124";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-1.6064453125)/65535,0.0+ratio*(7.82989501953125)/65535,0.0+ratio*(-7.82989501953125)/65535,20.0+ratio*(-1.6064453125)/65535,-1306.0+ratio*(800)/65535,-1680.0+ratio*(-532)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 -82 305 124 Q 28 -38 261 94 72 17 227 80 L 74 19 225 78 94 47 195 60 94 47 195 60 94 45 200 63 96 45 200 65 108 58 195 66 110 60 193 66 Q 153 116 140 36 159 133 118 18 L 163 137 114 14 Q 226 218 53 -19 309 310 10 -26 L 316 318 11 -26 320 323 11 -23 319 325 10 -23 321 327 10 -21 321 327 10 -22 349 355 0 -19 353 358 0 -19 Q 416 411 11 14 467 446 39 56 L 459 452 41 62 459 452 41 62 451 443 44 61 442 436 46 61 440 434 46 61 439 434 46 61 436 432 47 61 434 430 47 61 432 426 47 59 430 424 49 59 430 423 49 58 426 422 49 58 424 420 49 58 422 418 49 57 420 416 50 57 416 412 50 56 414 410 51 56 412 408 52 55 409 404 55 54 409 402 55 54 408 400 57 53 403 392 59 55 403 390 60 56 401 390 60 56 398 386 60 56 398 386 60 56 396 382 60 56 394 382 60 56 394 380 60 55 394 380 60 55 392 376 64 54 Q 361 335 99 78 329 291 135 95 L 325 287 139 97 319 281 145 100 316 274 152 102 Q 315 269 156 104 314 266 160 109 L 311 263 163 114 309 261 165 116 307 259 166 116 305 257 167 116 305 255 169 117 303 253 169 117 299 249 171 118 259 205 186 116 257 203 187 116 256 203 187 116 254 199 187 116 253 199 187 116 253 197 187 115 240 186 190 112 241 186 189 112 237 179 190 111 235 176 190 111 234 172 191 113 231 167 194 114 229 165 195 114 225 159 199 113 222 156 200 112 218 152 200 112 217 152 200 112 214 150 200 112 203 136 206 115 197 133 210 116 197 131 210 116 193 125 213 118 187 116 219 120 183 114 223 121 181 114 224 121 179 112 225 121 170 105 232 124 170 103 232 124 144 81 240 123 140 75 240 121 134 71 240 119 132 67 242 117 113 47 259 125 107 40 265 127 91 24 275 131 84 13 281 133 82 11 283 133 79 7 285 135 76 2 289 136 75 -2 292 137 74 -10 300 144 68 -12 300 149 0 -80 305 124 0 -82 305 124 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape44(ctx,ctrans,frame,ratio,time){
	var pathData="M -82 0 124 305 L -80 0 124 305 -12 68 149 300 -10 74 144 300 -2 75 137 292 2 76 136 289 7 79 135 285 11 82 133 283 13 84 133 281 24 91 131 275 40 107 127 265 47 113 125 259 67 132 117 242 71 134 119 240 75 140 121 240 81 144 123 240 103 170 124 232 105 170 124 232 112 179 121 225 114 181 121 224 114 183 121 223 116 187 120 219 125 193 118 213 131 197 116 210 133 197 116 210 136 203 115 206 150 214 112 200 152 217 112 200 152 218 112 200 156 222 112 200 159 225 113 199 165 229 114 195 167 231 114 194 172 234 113 191 173 235 112 190 179 237 111 190 184 241 112 189 186 240 112 190 197 253 115 187 199 253 116 187 199 254 116 187 203 256 116 187 203 257 116 187 205 259 116 186 249 299 118 171 253 303 117 169 255 305 117 169 257 305 116 167 259 307 116 166 261 309 116 165 263 311 114 163 266 314 109 160 Q 269 315 104 156 274 316 102 152 L 281 319 100 145 287 325 97 139 291 329 95 135 Q 335 361 78 99 376 392 54 64 L 380 394 55 60 380 394 55 60 382 394 56 60 382 396 56 60 386 398 56 60 386 398 56 60 390 401 56 60 390 403 56 60 392 403 55 59 400 408 53 57 402 409 54 55 404 409 54 55 408 412 55 52 410 414 56 51 412 416 56 50 416 420 57 50 418 422 57 49 420 424 58 49 422 426 58 49 423 430 58 49 424 430 59 49 426 432 59 47 430 434 61 47 432 436 61 47 434 439 61 46 434 440 61 46 436 442 61 46 443 451 61 44 452 459 62 41 452 459 62 41 446 467 56 39 Q 411 416 14 11 358 353 -19 0 L 355 349 -19 0 327 321 -22 10 327 321 -21 10 325 319 -23 10 323 320 -23 11 318 316 -26 11 310 309 -26 10 Q 218 226 -19 53 137 163 14 114 L 133 159 18 118 Q 116 153 36 140 60 110 66 193 L 58 108 66 195 45 96 65 200 45 94 63 200 47 94 60 195 47 94 60 195 19 74 78 225 17 72 80 227 Q -38 28 94 261 -82 0 124 305";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(18.3935546875+ratio*(1.6064453125)/65535,7.82989501953125+ratio*(-7.82989501953125)/65535,-7.82989501953125+ratio*(7.82989501953125)/65535,18.3935546875+ratio*(1.6064453125)/65535,-506.0+ratio*(-800)/65535,-2212.0+ratio*(532)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M -82 0 124 305 Q -38 28 94 261 17 72 80 227 L 19 74 78 225 47 94 60 195 47 94 60 195 45 94 63 200 45 96 65 200 58 108 66 195 60 110 66 193 Q 116 153 36 140 133 159 18 118 L 137 163 14 114 Q 218 226 -19 53 310 309 -26 10 L 318 316 -26 11 323 320 -23 11 325 319 -23 10 327 321 -21 10 327 321 -22 10 355 349 -19 0 358 353 -19 0 Q 411 416 14 11 446 467 56 39 L 452 459 62 41 452 459 62 41 443 451 61 44 436 442 61 46 434 440 61 46 434 439 61 46 432 436 61 47 430 434 61 47 426 432 59 47 424 430 59 49 423 430 58 49 422 426 58 49 420 424 58 49 418 422 57 49 416 420 57 50 412 416 56 50 410 414 56 51 408 412 55 52 404 409 54 55 402 409 54 55 400 408 53 57 392 403 55 59 390 403 56 60 390 401 56 60 386 398 56 60 386 398 56 60 382 396 56 60 382 394 56 60 380 394 55 60 380 394 55 60 376 392 54 64 Q 335 361 78 99 291 329 95 135 L 287 325 97 139 281 319 100 145 274 316 102 152 Q 269 315 104 156 266 314 109 160 L 263 311 114 163 261 309 116 165 259 307 116 166 257 305 116 167 255 305 117 169 253 303 117 169 249 299 118 171 205 259 116 186 203 257 116 187 203 256 116 187 199 254 116 187 199 253 116 187 197 253 115 187 186 240 112 190 184 241 112 189 179 237 111 190 173 235 112 190 172 234 113 191 167 231 114 194 165 229 114 195 159 225 113 199 156 222 112 200 152 218 112 200 152 217 112 200 150 214 112 200 136 203 115 206 133 197 116 210 131 197 116 210 125 193 118 213 116 187 120 219 114 183 121 223 114 181 121 224 112 179 121 225 105 170 124 232 103 170 124 232 81 144 123 240 75 140 121 240 71 134 119 240 67 132 117 242 47 113 125 259 40 107 127 265 24 91 131 275 13 84 133 281 11 82 133 283 7 79 135 285 2 76 136 289 -2 75 137 292 -10 74 144 300 -12 68 149 300 -80 0 124 305 -82 0 124 305 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape45(ctx,ctrans,frame,ratio,time){
	var pathData="M 467 39 L 459 41 442 46 440 46 439 46 436 47 434 47 426 49 424 49 420 50 416 50 409 55 408 57 401 60 398 60 394 60 329 135 319 145 Q 314 150 314 160 L 309 165 307 166 303 169 259 186 256 187 253 187 240 190 241 189 235 190 231 194 229 195 218 200 217 200 214 200 197 210 193 213 181 224 179 225 170 232 144 240 134 240 113 259 91 275 82 283 79 285 Q 74 290 74 300 L 0 305 Q 29 260 74 225 L 94 195 94 200 108 195 Q 153 141 159 118 223 54 309 10 L 320 11 319 10 349 0 Q 415 10 467 39";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-1306,-1680);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite46(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 15;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape43",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape43",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,9362,time);
			break;
		case 2:
			place("morphshape43",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,18725,time);
			break;
		case 3:
			place("morphshape43",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,28087,time);
			break;
		case 4:
			place("morphshape43",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,37449,time);
			break;
		case 5:
			place("morphshape43",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,46811,time);
			break;
		case 6:
			place("morphshape43",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,56174,time);
			break;
		case 7:
			place("morphshape44",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 8:
			place("morphshape44",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,9362,time);
			break;
		case 9:
			place("morphshape44",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,18725,time);
			break;
		case 10:
			place("morphshape44",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,28087,time);
			break;
		case 11:
			place("morphshape44",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,37449,time);
			break;
		case 12:
			place("morphshape44",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,46811,time);
			break;
		case 13:
			place("morphshape44",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,56174,time);
			break;
		case 14:
			place("shape45",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function morphshape47(ctx,ctrans,frame,ratio,time){
	var pathData="M 1 -29 631 659 L 1 -29 633 659 1 -25 638 666 1 -25 640 668 1 -25 640 668 1 -25 644 670 5 -20 656 681 5 -20 656 681 9 -15 670 688 11 -11 678 695 11 -11 678 695 Q 16 -4 689 707 20 -11 700 713 24 -20 708 722 27 -17 716 730 L 34 -8 732 739 34 -7 732 740 34 -5 734 741 38 0 742 748 42 -7 750 750 46 -14 758 753 48 -16 762 756 50 -15 766 760 50 -14 768 761 50 -14 768 761 54 -7 782 770 56 -1 792 777 58 1 796 780 59 3 800 782 61 3 800 782 61 3 800 781 Q 69 9 800 786 74 14 805 791 L 76 16 807 793 78 18 810 795 66 26 812 801 66 26 812 801 84 45 825 817 84 45 826 817 88 47 826 818 80 55 837 826 78 59 843 830 96 71 829 843 98 73 829 845 112 89 821 847 114 91 820 847 118 94 818 849 130 82 810 851 151 103 797 857 151 102 797 857 157 107 793 857 167 100 787 864 173 99 783 867 Q 262 176 733 827 351 256 683 790 397 299 658 771 446 342 639 753 494 382 623 735 541 426 607 720 L 648 517 586 693 750 607 574 673 879 719 560 655 989 817 556 640 1149 954 567 623 1211 1007 577 618 Q 1311 1092 595 612 1411 1179 613 614 L 1427 1203 615 615 1451 1223 620 615 1449 1231 608 615 1444 1239 598 615 Q 1439 1252 586 615 1439 1265 567 615 L 1439 1269 560 615 1427 1291 535 615 Q 1418 1301 528 615 1414 1311 517 615 L 1412 1319 506 615 1399 1341 480 615 1384 1356 475 615 1374 1364 465 615 1367 1368 458 615 1339 1394 440 615 1339 1400 432 615 1339 1410 420 615 1339 1425 402 616 1339 1425 400 614 1339 1421 392 609 1339 1414 384 604 1339 1404 360 588 1338 1404 360 586 1337 1402 360 584 1329 1396 360 579 1317 1385 357 571 1315 1383 357 571 1315 1383 357 571 1303 1373 352 565 1301 1369 350 562 1296 1365 341 556 1290 1348 327 543 1281 1332 305 541 1275 1320 293 537 1269 1311 281 533 1259 1293 260 528 1248 1281 262 526 1244 1279 265 522 1239 1277 270 515 1235 1274 262 505 1235 1273 262 504 1221 1266 239 481 1221 1265 237 481 1215 1256 229 482 1205 1242 216 482 1195 1229 205 480 1188 1220 198 475 1139 1182 160 443 1134 1168 175 433 1134 1168 175 433 Q 1129 1164 180 434 1124 1160 175 435 L 1120 1154 171 437 1114 1150 165 440 1084 1119 133 419 Q 1061 1095 106 406 1039 1064 80 396 1029 1056 80 393 1024 1048 85 390 L 1019 1042 90 388 1014 1038 89 388 1009 1035 88 388 1006 1031 88 388 996 1028 86 397 988 1024 84 399 982 1018 82 398 978 1016 82 398 920 970 69 378 910 962 67 374 854 917 50 353 832 903 43 357 824 898 41 360 822 897 41 360 819 893 40 360 819 892 41 360 819 888 46 360 819 876 60 360 818 867 71 360 815 862 78 360 813 856 83 360 811 856 85 360 Q 803 848 93 359 795 840 80 359 L 782 811 50 357 781 807 45 357 780 803 41 357 779 801 40 357 760 785 38 357 754 785 37 357 743 773 32 355 739 769 30 355 749 759 30 355 759 749 30 355 759 735 15 354 757 733 15 354 756 733 15 354 754 733 15 354 738 721 13 353 714 698 0 351 708 694 0 351 702 690 0 351 702 691 0 351 690 694 0 362 676 693 0 372 670 690 0 376 654 673 0 375 639 662 0 367 638 655 9 360 638 653 10 357 637 651 11 355 637 651 11 355 637 651 11 355 622 637 15 355 609 625 18 355 597 615 20 353 595 613 20 353 591 609 22 353 578 618 24 352 564 629 27 351 560 628 27 348 556 626 29 342 552 624 30 343 552 623 30 343 550 621 30 343 548 619 30 343 534 605 34 343 503 578 43 338 475 552 51 340 Q 450 528 61 343 427 504 72 345 L 415 504 78 352 399 489 87 355 379 469 100 359 375 465 100 360 Q 357 451 101 363 343 438 108 366 L 338 430 111 368 334 426 114 368 326 418 120 370 Q 292 384 146 380 261 350 174 389 224 301 212 404 187 264 249 425 L 159 229 281 433 151 221 292 437 143 211 302 443 Q 116 179 338 463 90 151 374 485 L 87 147 379 487 69 128 403 502 19 79 460 545 19 67 480 557 19 65 482 559 21 56 499 569 Q 32 41 542 587 19 26 557 605 L 19 26 557 605 17 24 559 608 9 11 577 623 Q 6 4 590 630 14 -2 603 637 L 15 -3 604 637 16 -5 606 639 19 -16 620 647 11 -20 621 651 4 -25 625 655 4 -25 626 655 1 -29 631 659";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-0.1025390625)/65535,0.0+ratio*(-1.84844970703125)/65535,0.0+ratio*(3.6553955078125)/65535,20.0+ratio*(-8.84124755859375)/65535,-441.0+ratio*(-130)/65535,0.0+ratio*(445)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 1 -29 631 659 L 4 -25 626 655 4 -25 625 655 11 -20 621 651 19 -16 620 647 16 -5 606 639 15 -3 604 637 14 -2 603 637 Q 6 4 590 630 9 11 577 623 L 17 24 559 608 19 26 557 605 19 26 557 605 Q 32 41 542 587 21 56 499 569 L 19 65 482 559 19 67 480 557 19 79 460 545 69 128 403 502 87 147 379 487 90 151 374 485 Q 116 179 338 463 143 211 302 443 L 151 221 292 437 159 229 281 433 187 264 249 425 Q 224 301 212 404 261 350 174 389 292 384 146 380 326 418 120 370 L 334 426 114 368 338 430 111 368 343 438 108 366 Q 357 451 101 363 375 465 100 360 L 379 469 100 359 399 489 87 355 415 504 78 352 427 504 72 345 Q 450 528 61 343 475 552 51 340 L 503 578 43 338 534 605 34 343 548 619 30 343 550 621 30 343 552 623 30 343 552 624 30 343 556 626 29 342 560 628 27 348 564 629 27 351 578 618 24 352 591 609 22 353 595 613 20 353 597 615 20 353 609 625 18 355 622 637 15 355 637 651 11 355 637 651 11 355 637 651 11 355 638 653 10 357 638 655 9 360 639 662 0 367 654 673 0 375 670 690 0 376 676 693 0 372 690 694 0 362 702 691 0 351 702 690 0 351 708 694 0 351 714 698 0 351 738 721 13 353 754 733 15 354 756 733 15 354 757 733 15 354 759 735 15 354 759 749 30 355 749 759 30 355 739 769 30 355 743 773 32 355 754 785 37 357 760 785 38 357 779 801 40 357 780 803 41 357 781 807 45 357 782 811 50 357 795 840 80 359 Q 803 848 93 359 811 856 85 360 L 813 856 83 360 815 862 78 360 818 867 71 360 819 876 60 360 819 888 46 360 819 892 41 360 819 893 40 360 822 897 41 360 824 898 41 360 832 903 43 357 854 917 50 353 910 962 67 374 920 970 69 378 978 1016 82 398 982 1018 82 398 988 1024 84 399 996 1028 86 397 1006 1031 88 388 1009 1035 88 388 1014 1038 89 388 1019 1042 90 388 1024 1048 85 390 Q 1029 1056 80 393 1039 1064 80 396 1061 1095 106 406 1084 1119 133 419 L 1114 1150 165 440 1120 1154 171 437 1124 1160 175 435 Q 1129 1164 180 434 1134 1168 175 433 L 1134 1168 175 433 1139 1182 160 443 1188 1220 198 475 1195 1229 205 480 1205 1242 216 482 1215 1256 229 482 1221 1265 237 481 1221 1266 239 481 1235 1273 262 504 1235 1274 262 505 1239 1277 270 515 1244 1279 265 522 1248 1281 262 526 1259 1293 260 528 1269 1311 281 533 1275 1320 293 537 1281 1332 305 541 1290 1348 327 543 1296 1365 341 556 1301 1369 350 562 1303 1373 352 565 1315 1383 357 571 1315 1383 357 571 1317 1385 357 571 1329 1396 360 579 1337 1402 360 584 1338 1404 360 586 1339 1404 360 588 1339 1414 384 604 1339 1421 392 609 1339 1425 400 614 1339 1425 402 616 1339 1410 420 615 1339 1400 432 615 1339 1394 440 615 1367 1368 458 615 1374 1364 465 615 1384 1356 475 615 1399 1341 480 615 1412 1319 506 615 1414 1311 517 615 Q 1418 1301 528 615 1427 1291 535 615 L 1439 1269 560 615 1439 1265 567 615 Q 1439 1252 586 615 1444 1239 598 615 L 1449 1231 608 615 1451 1223 620 615 1427 1203 615 615 1411 1179 613 614 Q 1311 1092 595 612 1211 1007 577 618 L 1149 954 567 623 989 817 556 640 879 719 560 655 750 607 574 673 648 517 586 693 541 426 607 720 Q 494 382 623 735 446 342 639 753 397 299 658 771 351 256 683 790 262 176 733 827 173 99 783 867 L 167 100 787 864 157 107 793 857 151 102 797 857 151 103 797 857 130 82 810 851 118 94 818 849 114 91 820 847 112 89 821 847 98 73 829 845 96 71 829 843 78 59 843 830 80 55 837 826 88 47 826 818 84 45 826 817 84 45 825 817 66 26 812 801 66 26 812 801 78 18 810 795 76 16 807 793 74 14 805 791 Q 69 9 800 786 61 3 800 781 L 61 3 800 782 59 3 800 782 58 1 796 780 56 -1 792 777 54 -7 782 770 50 -14 768 761 50 -14 768 761 50 -15 766 760 48 -16 762 756 46 -14 758 753 42 -7 750 750 38 0 742 748 34 -5 734 741 34 -7 732 740 34 -8 732 739 27 -17 716 730 Q 24 -20 708 722 20 -11 700 713 16 -4 689 707 11 -11 678 695 L 11 -11 678 695 9 -15 670 688 5 -20 656 681 5 -20 656 681 1 -25 644 670 1 -25 640 668 1 -25 640 668 1 -25 638 666 1 -29 633 659 1 -29 631 659 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape48(ctx,ctrans,frame,ratio,time){
	var pathData="M -29 1 659 631 L -29 1 659 633 -25 1 666 638 -25 1 668 640 -25 1 668 640 -25 1 670 644 -20 5 681 656 -20 5 681 656 -15 9 688 670 -11 11 695 678 -11 11 695 678 Q -4 16 707 689 -11 20 713 700 -20 24 722 708 -17 27 730 716 L -8 34 739 732 -7 34 740 732 -5 34 741 734 0 38 748 742 -7 42 750 750 -14 46 753 758 -16 48 756 762 -15 50 760 766 -14 50 761 768 -14 50 761 768 -7 54 770 782 -1 56 777 792 1 58 780 796 3 59 782 800 3 61 782 800 3 61 781 800 Q 9 69 786 800 14 74 791 805 L 16 76 793 807 18 78 795 810 26 66 801 812 26 66 801 812 45 84 817 825 45 84 817 826 47 88 818 826 55 80 826 837 59 78 830 843 71 96 843 829 73 98 845 829 89 112 847 821 91 114 847 820 94 118 849 818 82 130 851 810 103 151 857 797 102 151 857 797 107 157 857 793 100 167 864 787 99 173 867 783 Q 176 262 827 733 256 351 790 683 299 397 771 658 342 446 753 639 382 494 735 623 426 541 720 607 L 517 648 693 586 607 750 673 574 719 879 655 560 817 989 640 556 954 1149 623 567 1007 1211 618 577 Q 1092 1311 612 595 1179 1411 614 613 L 1203 1427 615 615 1223 1451 615 620 1231 1449 615 608 1239 1444 615 598 Q 1252 1439 615 586 1265 1439 615 567 L 1269 1439 615 560 1291 1427 615 535 Q 1301 1418 615 528 1311 1414 615 517 L 1319 1412 615 506 1341 1399 615 480 1356 1384 615 475 1364 1374 615 465 1368 1367 615 458 1394 1339 615 440 1400 1339 615 432 1410 1339 615 420 1425 1339 616 402 1425 1339 614 400 1421 1339 609 392 1414 1339 604 384 1404 1339 588 360 1404 1338 586 360 1402 1337 584 360 1396 1329 579 360 1385 1317 571 357 1383 1315 571 357 1383 1315 571 357 1373 1303 565 352 1369 1301 562 350 1365 1296 556 341 1348 1290 543 327 1332 1281 541 305 1320 1275 537 293 1311 1269 533 281 1293 1259 528 260 1281 1248 526 262 1279 1244 522 265 1277 1239 515 270 1274 1235 505 262 1273 1235 504 262 1266 1221 481 239 1265 1221 481 237 1256 1215 482 229 1242 1205 482 216 1229 1195 480 205 1220 1188 475 198 1182 1139 443 160 1168 1134 433 175 1168 1134 433 175 Q 1164 1129 434 180 1160 1124 435 175 L 1154 1120 437 171 1150 1114 440 165 1119 1084 419 133 Q 1095 1061 406 106 1064 1039 396 80 1056 1029 393 80 1048 1024 390 85 L 1042 1019 388 90 1038 1014 388 89 1035 1009 388 88 1031 1006 388 88 1028 996 397 86 1024 988 399 84 1018 982 398 82 1016 978 398 82 970 920 378 69 962 910 374 67 917 854 353 50 903 832 357 43 898 824 360 41 897 822 360 41 893 819 360 40 892 819 360 41 888 819 360 46 876 819 360 60 867 818 360 71 862 815 360 78 856 813 360 83 856 811 360 85 Q 848 803 359 93 840 795 359 80 L 811 782 357 50 807 781 357 45 803 780 357 41 801 779 357 40 785 760 357 38 785 754 357 37 773 743 355 32 769 739 355 30 759 749 355 30 749 759 355 30 735 759 354 15 733 757 354 15 733 756 354 15 733 754 354 15 721 738 353 13 698 714 351 0 694 708 351 0 690 702 351 0 691 702 351 0 694 690 362 0 693 676 372 0 690 670 376 0 673 654 375 0 662 639 367 0 655 638 360 9 653 638 357 10 651 637 355 11 651 637 355 11 651 637 355 11 637 622 355 15 625 609 355 18 615 597 353 20 613 595 353 20 609 591 353 22 618 578 352 24 629 564 351 27 628 560 348 27 626 556 342 29 624 552 343 30 623 552 343 30 621 550 343 30 619 548 343 30 605 534 343 34 578 503 338 43 552 475 340 51 Q 528 450 343 61 504 427 345 72 L 504 415 352 78 489 399 355 87 469 379 359 100 465 375 360 100 Q 451 357 363 101 438 343 366 108 L 430 338 368 111 426 334 368 114 418 326 370 120 Q 384 292 380 146 350 261 389 174 301 224 404 212 264 187 425 249 L 229 159 433 281 221 151 437 292 211 143 443 302 Q 179 116 463 338 151 90 485 374 L 147 87 487 379 128 69 502 403 79 19 545 460 67 19 557 480 65 19 559 482 56 21 569 499 Q 41 32 587 542 26 19 605 557 L 26 19 605 557 24 17 608 559 11 9 623 577 Q 4 6 630 590 -2 14 637 603 L -3 15 637 604 -5 16 639 606 -16 19 647 620 -20 11 651 621 -25 4 655 625 -25 4 655 626 -29 1 659 631";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(19.8974609375+ratio*(0.1025390625)/65535,-1.84844970703125+ratio*(1.84844970703125)/65535,3.6553955078125+ratio*(-3.6553955078125)/65535,11.15875244140625+ratio*(8.84124755859375)/65535,-571.0+ratio*(130)/65535,445.0+ratio*(-445)/65535);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M -29 1 659 631 L -25 4 655 626 -25 4 655 625 -20 11 651 621 -16 19 647 620 -5 16 639 606 -3 15 637 604 -2 14 637 603 Q 4 6 630 590 11 9 623 577 L 24 17 608 559 26 19 605 557 26 19 605 557 Q 41 32 587 542 56 21 569 499 L 65 19 559 482 67 19 557 480 79 19 545 460 128 69 502 403 147 87 487 379 151 90 485 374 Q 179 116 463 338 211 143 443 302 L 221 151 437 292 229 159 433 281 264 187 425 249 Q 301 224 404 212 350 261 389 174 384 292 380 146 418 326 370 120 L 426 334 368 114 430 338 368 111 438 343 366 108 Q 451 357 363 101 465 375 360 100 L 469 379 359 100 489 399 355 87 504 415 352 78 504 427 345 72 Q 528 450 343 61 552 475 340 51 L 578 503 338 43 605 534 343 34 619 548 343 30 621 550 343 30 623 552 343 30 624 552 343 30 626 556 342 29 628 560 348 27 629 564 351 27 618 578 352 24 609 591 353 22 613 595 353 20 615 597 353 20 625 609 355 18 637 622 355 15 651 637 355 11 651 637 355 11 651 637 355 11 653 638 357 10 655 638 360 9 662 639 367 0 673 654 375 0 690 670 376 0 693 676 372 0 694 690 362 0 691 702 351 0 690 702 351 0 694 708 351 0 698 714 351 0 721 738 353 13 733 754 354 15 733 756 354 15 733 757 354 15 735 759 354 15 749 759 355 30 759 749 355 30 769 739 355 30 773 743 355 32 785 754 357 37 785 760 357 38 801 779 357 40 803 780 357 41 807 781 357 45 811 782 357 50 840 795 359 80 Q 848 803 359 93 856 811 360 85 L 856 813 360 83 862 815 360 78 867 818 360 71 876 819 360 60 888 819 360 46 892 819 360 41 893 819 360 40 897 822 360 41 898 824 360 41 903 832 357 43 917 854 353 50 962 910 374 67 970 920 378 69 1016 978 398 82 1018 982 398 82 1024 988 399 84 1028 996 397 86 1031 1006 388 88 1035 1009 388 88 1038 1014 388 89 1042 1019 388 90 1048 1024 390 85 Q 1056 1029 393 80 1064 1039 396 80 1095 1061 406 106 1119 1084 419 133 L 1150 1114 440 165 1154 1120 437 171 1160 1124 435 175 Q 1164 1129 434 180 1168 1134 433 175 L 1168 1134 433 175 1182 1139 443 160 1220 1188 475 198 1229 1195 480 205 1242 1205 482 216 1256 1215 482 229 1265 1221 481 237 1266 1221 481 239 1273 1235 504 262 1274 1235 505 262 1277 1239 515 270 1279 1244 522 265 1281 1248 526 262 1293 1259 528 260 1311 1269 533 281 1320 1275 537 293 1332 1281 541 305 1348 1290 543 327 1365 1296 556 341 1369 1301 562 350 1373 1303 565 352 1383 1315 571 357 1383 1315 571 357 1385 1317 571 357 1396 1329 579 360 1402 1337 584 360 1404 1338 586 360 1404 1339 588 360 1414 1339 604 384 1421 1339 609 392 1425 1339 614 400 1425 1339 616 402 1410 1339 615 420 1400 1339 615 432 1394 1339 615 440 1368 1367 615 458 1364 1374 615 465 1356 1384 615 475 1341 1399 615 480 1319 1412 615 506 1311 1414 615 517 Q 1301 1418 615 528 1291 1427 615 535 L 1269 1439 615 560 1265 1439 615 567 Q 1252 1439 615 586 1239 1444 615 598 L 1231 1449 615 608 1223 1451 615 620 1203 1427 615 615 1179 1411 614 613 Q 1092 1311 612 595 1007 1211 618 577 L 954 1149 623 567 817 989 640 556 719 879 655 560 607 750 673 574 517 648 693 586 426 541 720 607 Q 382 494 735 623 342 446 753 639 299 397 771 658 256 351 790 683 176 262 827 733 99 173 867 783 L 100 167 864 787 107 157 857 793 102 151 857 797 103 151 857 797 82 130 851 810 94 118 849 818 91 114 847 820 89 112 847 821 73 98 845 829 71 96 843 829 59 78 830 843 55 80 826 837 47 88 818 826 45 84 817 826 45 84 817 825 26 66 801 812 26 66 801 812 18 78 795 810 16 76 793 807 14 74 791 805 Q 9 69 786 800 3 61 781 800 L 3 61 782 800 3 59 782 800 1 58 780 796 -1 56 777 792 -7 54 770 782 -14 50 761 768 -14 50 761 768 -15 50 760 766 -16 48 756 762 -14 46 753 758 -7 42 750 750 0 38 748 742 -5 34 741 734 -7 34 740 732 -8 34 739 732 -17 27 730 716 Q -20 24 722 708 -11 20 713 700 -4 16 707 689 -11 11 695 678 L -11 11 695 678 -15 9 688 670 -20 5 681 656 -20 5 681 656 -25 1 670 644 -25 1 668 640 -25 1 668 640 -25 1 666 638 -29 1 659 633 -29 1 659 631 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape49(ctx,ctrans,frame,ratio,time){
	var pathData="M 1329 360 L 1338 360 1339 360 1339 400 1339 402 1339 420 1339 440 1367 458 1374 465 1384 475 1399 480 1412 506 1414 517 Q 1418 528 1427 535 L 1439 560 1439 567 Q 1439 586 1444 598 L 1449 608 1451 620 1427 615 1211 577 Q 1101 555 989 556 L 750 574 Q 644 582 541 607 441 635 351 683 211 756 78 843 L 80 837 88 826 84 826 84 825 66 812 78 810 76 807 74 805 59 800 58 796 27 716 11 678 9 670 5 656 1 640 1 638 1 631 4 626 4 625 11 621 19 620 16 606 15 604 14 603 Q 0 579 19 557 32 543 21 499 L 19 480 19 460 69 403 87 379 90 374 143 302 Q 226 195 334 114 339 110 343 108 L 379 100 Q 423 70 475 51 L 548 30 560 27 597 20 622 15 637 11 639 0 714 0 738 13 754 15 756 15 757 15 759 15 759 30 749 30 739 30 743 32 754 37 779 40 780 41 781 45 782 50 795 80 Q 803 93 811 85 L 815 78 819 60 819 41 819 40 822 41 910 67 978 82 988 84 1009 88 1014 89 1019 90 1024 85 Q 1029 80 1039 80 L 1084 133 1124 175 Q 1129 180 1134 175 L 1139 160 Q 1208 202 1239 270 L 1244 265 Q 1249 260 1259 260 L 1296 341 1303 352 1315 357 1329 360";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-441,0);
	ctx.transform(1.008695652173913,0,0,1.00990099009901,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj27);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite50(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 20;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,7282,time);
			break;
		case 2:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,14564,time);
			break;
		case 3:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,21845,time);
			break;
		case 4:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,29127,time);
			break;
		case 5:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,36409,time);
			break;
		case 6:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,43691,time);
			break;
		case 7:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,50972,time);
			break;
		case 8:
			place("morphshape47",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,58254,time);
			break;
		case 9:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 10:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,6554,time);
			break;
		case 11:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 12:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,19661,time);
			break;
		case 13:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 14:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 15:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 16:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,45875,time);
			break;
		case 17:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 18:
			place("morphshape48",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,58982,time);
			break;
		case 19:
			place("shape49",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function sprite51(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 1;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite31",canvas,ctx,[1.0,0.0,0.0,1.0,260.0,1134.0],ctrans,1,(0+time)%20,0,time);
			place("shape32",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("sprite42",canvas,ctx,[1.0,0.0,0.0,1.0,25.0,638.0],ctrans,1,(0+time)%24,0,time);
			place("sprite46",canvas,ctx,[1.0,0.0,0.0,1.0,1306.0,1680.0],ctrans,1,(0+time)%15,0,time);
			place("sprite50",canvas,ctx,[1.0,0.0,0.0,1.0,441.0,0.0],ctrans,1,(0+time)%20,0,time);
			break;
	}
}

function sprite52(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 859;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite51",canvas,ctx,[1.0,0.0,0.0,1.0,-88.0,152.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 1:
			place("sprite51",canvas,ctx,[0.9999237060546875,0.008758544921875,-0.008758544921875,0.9999237060546875,29.0,187.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 2:
			place("sprite51",canvas,ctx,[0.999786376953125,0.0175323486328125,-0.0175323486328125,0.999786376953125,145.0,221.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 3:
			place("sprite51",canvas,ctx,[0.9995574951171875,0.0262908935546875,-0.0262908935546875,0.9995574951171875,264.0,258.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 4:
			place("sprite51",canvas,ctx,[0.999267578125,0.0350494384765625,-0.0350494384765625,0.999267578125,382.0,292.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 5:
			place("sprite51",canvas,ctx,[0.9988861083984375,0.0438079833984375,-0.0438079833984375,0.9988861083984375,498.0,326.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 6:
			place("sprite51",canvas,ctx,[0.998443603515625,0.05255126953125,-0.05255126953125,0.998443603515625,616.0,362.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 7:
			place("sprite51",canvas,ctx,[0.9979095458984375,0.061309814453125,-0.061309814453125,0.9979095458984375,734.0,398.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 8:
			place("sprite51",canvas,ctx,[0.997314453125,0.0700531005859375,-0.0700531005859375,0.997314453125,851.0,433.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 9:
			place("sprite51",canvas,ctx,[0.9966278076171875,0.07879638671875,-0.07879638671875,0.9966278076171875,970.0,467.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 10:
			place("sprite51",canvas,ctx,[0.9958648681640625,0.0875244140625,-0.0875244140625,0.9958648681640625,1087.0,503.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 11:
			place("sprite51",canvas,ctx,[0.9950408935546875,0.09625244140625,-0.09625244140625,0.9950408935546875,1205.0,540.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 12:
			place("sprite51",canvas,ctx,[0.9941253662109375,0.1049652099609375,-0.1049652099609375,0.9941253662109375,1324.0,576.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 13:
			place("sprite51",canvas,ctx,[0.993133544921875,0.113677978515625,-0.113677978515625,0.993133544921875,1442.0,610.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 14:
			place("sprite51",canvas,ctx,[0.9920806884765625,0.12237548828125,-0.12237548828125,0.9920806884765625,1559.0,646.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 15:
			place("sprite51",canvas,ctx,[0.990936279296875,0.131072998046875,-0.131072998046875,0.990936279296875,1678.0,683.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 16:
			place("sprite51",canvas,ctx,[0.989715576171875,0.1397552490234375,-0.1397552490234375,0.989715576171875,1797.0,719.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 17:
			place("sprite51",canvas,ctx,[0.988433837890625,0.1484375,-0.1484375,0.988433837890625,1914.0,754.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 18:
			place("sprite51",canvas,ctx,[0.987060546875,0.1570892333984375,-0.1570892333984375,0.987060546875,2034.0,790.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 19:
			place("sprite51",canvas,ctx,[0.985626220703125,0.165740966796875,-0.165740966796875,0.985626220703125,2152.0,827.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 20:
			place("sprite51",canvas,ctx,[0.984100341796875,0.17437744140625,-0.17437744140625,0.984100341796875,2271.0,864.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 21:
			place("sprite51",canvas,ctx,[0.982513427734375,0.1829986572265625,-0.1829986572265625,0.982513427734375,2356.0,932.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 22:
			place("sprite51",canvas,ctx,[0.9808349609375,0.1916046142578125,-0.1916046142578125,0.9808349609375,2411.0,1031.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 23:
			place("sprite51",canvas,ctx,[0.979095458984375,0.2001953125,-0.2001953125,0.979095458984375,2472.0,1127.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 24:
			place("sprite51",canvas,ctx,[0.9772796630859375,0.2087860107421875,-0.2087860107421875,0.9772796630859375,2538.0,1222.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 25:
			place("sprite51",canvas,ctx,[0.975372314453125,0.21734619140625,-0.21734619140625,0.975372314453125,2611.0,1312.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 26:
			place("sprite51",canvas,ctx,[0.9734039306640625,0.22589111328125,-0.22589111328125,0.9734039306640625,2690.0,1398.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 27:
			place("sprite51",canvas,ctx,[0.9713592529296875,0.2344207763671875,-0.2344207763671875,0.9713592529296875,2777.0,1480.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 28:
			place("sprite51",canvas,ctx,[0.96923828125,0.242919921875,-0.242919921875,0.96923828125,2870.0,1557.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 29:
			place("sprite51",canvas,ctx,[0.9670562744140625,0.2514190673828125,-0.2514190673828125,0.9670562744140625,2968.0,1628.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 30:
			place("sprite51",canvas,ctx,[0.9639129638671875,0.2630462646484375,-0.2630462646484375,0.9639129638671875,3076.0,1691.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 31:
			place("sprite51",canvas,ctx,[0.9615478515625,0.2714996337890625,-0.2714996337890625,0.9615478515625,3184.0,1748.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 32:
			place("sprite51",canvas,ctx,[0.9591064453125,0.2799224853515625,-0.2799224853515625,0.9591064453125,3297.0,1800.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 33:
			place("sprite51",canvas,ctx,[0.9565887451171875,0.2883148193359375,-0.2883148193359375,0.9565887451171875,3414.0,1844.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 34:
			place("sprite51",canvas,ctx,[0.9539947509765625,0.2967071533203125,-0.2967071533203125,0.9539947509765625,3534.0,1882.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 35:
			place("sprite51",canvas,ctx,[0.951324462890625,0.3050537109375,-0.3050537109375,0.951324462890625,3655.0,1914.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 36:
			place("sprite51",canvas,ctx,[0.9485931396484375,0.313385009765625,-0.313385009765625,0.9485931396484375,3780.0,1937.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 37:
			place("sprite51",canvas,ctx,[0.9457855224609375,0.3217010498046875,-0.3217010498046875,0.9457855224609375,3907.0,1954.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 38:
			place("sprite51",canvas,ctx,[0.942901611328125,0.329986572265625,-0.329986572265625,0.942901611328125,4035.0,1962.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 39:
			place("sprite51",canvas,ctx,[0.93994140625,0.3382415771484375,-0.3382415771484375,0.93994140625,4164.0,1962.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 40:
			place("sprite51",canvas,ctx,[0.936920166015625,0.3464813232421875,-0.3464813232421875,0.936920166015625,4293.0,1954.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 41:
			place("sprite51",canvas,ctx,[0.9338226318359375,0.3546905517578125,-0.3546905517578125,0.9338226318359375,4421.0,1939.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 42:
			place("sprite51",canvas,ctx,[0.9306488037109375,0.3628692626953125,-0.3628692626953125,0.9306488037109375,4550.0,1917.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 43:
			place("sprite51",canvas,ctx,[0.927398681640625,0.3710174560546875,-0.3710174560546875,0.927398681640625,4677.0,1891.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 44:
			place("sprite51",canvas,ctx,[0.9240875244140625,0.379150390625,-0.379150390625,0.9240875244140625,4805.0,1866.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 45:
			place("sprite51",canvas,ctx,[0.9207000732421875,0.387237548828125,-0.387237548828125,0.9207000732421875,4932.0,1843.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 46:
			place("sprite51",canvas,ctx,[0.9172515869140625,0.3953094482421875,-0.3953094482421875,0.9172515869140625,5060.0,1818.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 47:
			place("sprite51",canvas,ctx,[0.913726806640625,0.4033355712890625,-0.4033355712890625,0.913726806640625,5190.0,1796.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 48:
			place("sprite51",canvas,ctx,[0.910125732421875,0.411346435546875,-0.411346435546875,0.910125732421875,5315.0,1772.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 49:
			place("sprite51",canvas,ctx,[0.906463623046875,0.4193115234375,-0.4193115234375,0.906463623046875,5443.0,1751.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 50:
			place("sprite51",canvas,ctx,[0.9027252197265625,0.42724609375,-0.42724609375,0.9027252197265625,5572.0,1727.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 51:
			place("sprite51",canvas,ctx,[0.89892578125,0.4351654052734375,-0.4351654052734375,0.89892578125,5701.0,1707.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 52:
			place("sprite51",canvas,ctx,[0.895050048828125,0.4430389404296875,-0.4430389404296875,0.895050048828125,5829.0,1685.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 53:
			place("sprite51",canvas,ctx,[0.89111328125,0.45086669921875,-0.45086669921875,0.89111328125,5958.0,1664.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 54:
			place("sprite51",canvas,ctx,[0.8871002197265625,0.45867919921875,-0.45867919921875,0.8871002197265625,6087.0,1645.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 55:
			place("sprite51",canvas,ctx,[0.8830108642578125,0.4664459228515625,-0.4664459228515625,0.8830108642578125,6215.0,1625.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 56:
			place("sprite51",canvas,ctx,[0.878875732421875,0.47418212890625,-0.47418212890625,0.878875732421875,6345.0,1606.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 57:
			place("sprite51",canvas,ctx,[0.8746490478515625,0.48187255859375,-0.48187255859375,0.8746490478515625,6473.0,1588.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 58:
			place("sprite51",canvas,ctx,[0.8703765869140625,0.489532470703125,-0.489532470703125,0.8703765869140625,6603.0,1569.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 59:
			place("sprite51",canvas,ctx,[0.86602783203125,0.5,-0.5,0.86602783203125,6734.0,1548.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 60:
			place("sprite51",canvas,ctx,[0.87921142578125,0.4734954833984375,-0.4734954833984375,0.87921142578125,6693.0,1565.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 61:
			place("sprite51",canvas,ctx,[0.8932647705078125,0.446563720703125,-0.446563720703125,0.8932647705078125,6650.0,1582.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 62:
			place("sprite51",canvas,ctx,[0.90643310546875,0.41925048828125,-0.4192352294921875,0.90643310546875,6607.0,1601.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 63:
			place("sprite51",canvas,ctx,[0.9188385009765625,0.391510009765625,-0.391510009765625,0.9188385009765625,6564.0,1620.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 64:
			place("sprite51",canvas,ctx,[0.93035888671875,0.3634185791015625,-0.3634185791015625,0.93035888671875,6522.0,1640.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 65:
			place("sprite51",canvas,ctx,[0.939910888671875,0.3380889892578125,-0.3380889892578125,0.939910888671875,6485.0,1660.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 66:
			place("sprite51",canvas,ctx,[0.9498443603515625,0.309417724609375,-0.309417724609375,0.9498443603515625,6444.0,1682.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 67:
			place("sprite51",canvas,ctx,[0.9588623046875,0.280426025390625,-0.280426025390625,0.9588623046875,6406.0,1707.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 68:
			place("sprite51",canvas,ctx,[0.967010498046875,0.2512054443359375,-0.251190185546875,0.967010498046875,6368.0,1733.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 69:
			place("sprite51",canvas,ctx,[0.974273681640625,0.2217559814453125,-0.22174072265625,0.974273681640625,6329.0,1760.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 70:
			place("sprite51",canvas,ctx,[0.9799957275390625,0.195281982421875,-0.1952667236328125,0.9799957275390625,6296.0,1784.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 71:
			place("sprite51",canvas,ctx,[0.985565185546875,0.1654510498046875,-0.165435791015625,0.985565185546875,6260.0,1811.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 72:
			place("sprite51",canvas,ctx,[0.9901885986328125,0.1354827880859375,-0.1354827880859375,0.9901885986328125,6224.0,1841.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 73:
			place("sprite51",canvas,ctx,[0.9939422607421875,0.1053924560546875,-0.105377197265625,0.9939422607421875,6189.0,1873.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 74:
			place("sprite51",canvas,ctx,[0.9967803955078125,0.0751800537109375,-0.0751800537109375,0.9967803955078125,6156.0,1904.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 75:
			place("sprite51",canvas,ctx,[0.9985198974609375,0.0481719970703125,-0.0481719970703125,0.9985198974609375,6125.0,1934.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 76:
			place("sprite51",canvas,ctx,[0.999603271484375,0.01788330078125,-0.0178680419921875,0.999603271484375,6095.0,1968.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 77:
			place("sprite51",canvas,ctx,[0.9997406005859375,-0.0091552734375,0.0091705322265625,0.9997406005859375,6066.0,1998.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 78:
			place("sprite51",canvas,ctx,[0.9989013671875,-0.0394744873046875,0.0395050048828125,0.9989013671875,6036.0,2035.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 79:
			place("sprite51",canvas,ctx,[0.997344970703125,-0.06976318359375,0.0697784423828125,0.997344970703125,6010.0,2071.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 80:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0659637451171875,0.9949951171875,6142.0,2065.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 81:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.0654296875,0.9926300048828125,6271.0,2058.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 82:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.0616302490234375,0.990478515625,6403.0,2053.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 83:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697784423828125,0.0611114501953125,0.9881134033203125,6532.0,2046.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 84:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.060577392578125,0.9857330322265625,6661.0,2041.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 85:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0568389892578125,0.9835662841796875,6793.0,2035.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 86:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.06976318359375,0.0563201904296875,0.981201171875,6922.0,2028.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 87:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.055816650390625,0.97882080078125,7052.0,2023.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 88:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.052093505859375,0.9766387939453125,7184.0,2015.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 89:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.0515899658203125,0.974273681640625,7312.0,2010.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 90:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.05108642578125,0.9718780517578125,7442.0,2003.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 91:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.04742431640625,0.9696807861328125,7573.0,1998.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 92:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.04693603515625,0.96728515625,7703.0,1993.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 93:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697784423828125,0.0464630126953125,0.964935302734375,7832.0,1985.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 94:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.0428009033203125,0.9626922607421875,7963.0,1979.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 95:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697784423828125,0.042327880859375,0.9603118896484375,8092.0,1973.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 96:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.06976318359375,0.0418701171875,0.9579315185546875,8221.0,1968.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 97:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0382537841796875,0.9556884765625,8354.0,1962.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 98:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.037811279296875,0.9533233642578125,8482.0,1956.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 99:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697479248046875,0.0342254638671875,0.9510650634765625,8615.0,1950.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 100:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697479248046875,0.033782958984375,0.94866943359375,8744.0,1943.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 101:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697479248046875,0.0333099365234375,0.9462890625,8873.0,1937.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 102:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.02978515625,0.944000244140625,9004.0,1932.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 103:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.02935791015625,0.9416046142578125,9134.0,1926.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 104:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.028900146484375,0.939239501953125,9263.0,1920.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 105:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.025421142578125,0.93695068359375,9393.0,1913.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 106:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.024993896484375,0.934539794921875,9523.0,1907.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 107:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0245819091796875,0.932159423828125,9652.0,1901.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 108:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.021087646484375,0.92987060546875,9783.0,1896.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 109:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,0.02069091796875,0.927490234375,9913.0,1890.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 110:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,0.020294189453125,0.9250946044921875,10042.0,1884.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 111:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.016845703125,0.9227447509765625,10174.0,1878.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 112:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0164642333984375,0.92034912109375,10303.0,1872.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 113:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0160675048828125,0.9179840087890625,10431.0,1866.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 114:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0126800537109375,0.915618896484375,10563.0,1859.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 115:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.012298583984375,0.9132537841796875,10692.0,1853.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 116:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,0.008941650390625,0.910888671875,10823.0,1847.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 117:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.008544921875,0.908477783203125,10953.0,1840.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 118:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0081787109375,0.906097412109375,11081.0,1835.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 119:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.004852294921875,0.9037322998046875,11212.0,1830.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 120:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,0.004486083984375,0.9013214111328125,11341.0,1824.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 121:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.0041351318359375,0.8989410400390625,11470.0,1818.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 122:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,8.544921875E-4,0.89654541015625,11603.0,1811.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 123:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,5.035400390625E-4,0.894134521484375,11731.0,1806.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 124:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,1.678466796875E-4,0.891754150390625,11860.0,1799.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 125:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-1.8310546875E-4,0.8893585205078125,11988.0,1794.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 126:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,-5.18798828125E-4,0.8869476318359375,12117.0,1788.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 127:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-8.697509765625E-4,0.884552001953125,12246.0,1781.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 128:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.00408935546875,0.882110595703125,12377.0,1776.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 129:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.004425048828125,0.8797149658203125,12507.0,1769.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 130:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0047454833984375,0.8773345947265625,12635.0,1763.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 131:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0079345703125,0.8748779296875,12767.0,1758.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 132:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.00823974609375,0.87249755859375,12896.0,1751.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 133:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0113983154296875,0.8700103759765625,13028.0,1746.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 134:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0117034912109375,0.8676300048828125,13157.0,1739.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 135:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0120086669921875,0.8652191162109375,13284.0,1733.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 136:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.015106201171875,0.8627471923828125,13417.0,1728.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 137:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.015411376953125,0.8603363037109375,13545.0,1722.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 138:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.01568603515625,0.857940673828125,13674.0,1716.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 139:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.018798828125,0.85546875,13806.0,1709.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 140:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0190582275390625,0.8530426025390625,13934.0,1703.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 141:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0193328857421875,0.85064697265625,14063.0,1697.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 142:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.022369384765625,0.84814453125,14195.0,1691.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 143:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.02264404296875,0.8457489013671875,14323.0,1686.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 144:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.022918701171875,0.843353271484375,14451.0,1679.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 145:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.06976318359375,-0.025909423828125,0.8408355712890625,14584.0,1674.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 146:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0261688232421875,0.83843994140625,14711.0,1668.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 147:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0264129638671875,0.836029052734375,14840.0,1662.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 148:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.029388427734375,0.83349609375,14972.0,1656.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 149:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0296173095703125,0.83111572265625,15101.0,1649.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 150:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.032562255859375,0.8285675048828125,15233.0,1644.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 151:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.03277587890625,0.8261566162109375,15361.0,1638.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 152:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0330047607421875,0.8237457275390625,15490.0,1632.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 153:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.035919189453125,0.82122802734375,15621.0,1625.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 154:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.0361328125,0.81878662109375,15749.0,1620.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 155:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.0363311767578125,0.816375732421875,15878.0,1614.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 156:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0391998291015625,0.8138275146484375,16010.0,1609.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 157:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.039398193359375,0.811431884765625,16138.0,1603.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 158:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-0.0395965576171875,0.80902099609375,16267.0,1596.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 159:
			place("sprite51",canvas,ctx,[0.997344970703125,-0.06976318359375,-0.0429229736328125,0.8065643310546875,16397.0,1589.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 160:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697479248046875,-0.0424346923828125,0.80645751953125,16385.0,1602.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 161:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697479248046875,-0.0424346923828125,0.806427001953125,16373.0,1613.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 162:
			place("sprite51",canvas,ctx,[0.997100830078125,-0.0697479248046875,-0.0424346923828125,0.806427001953125,16362.0,1625.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 163:
			place("sprite51",canvas,ctx,[0.9970855712890625,-0.0697479248046875,-0.04241943359375,0.8064117431640625,16349.0,1636.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 164:
			place("sprite51",canvas,ctx,[0.9970855712890625,-0.0697479248046875,-0.04241943359375,0.8064117431640625,16337.0,1648.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 165:
			place("sprite51",canvas,ctx,[0.9970703125,-0.0697479248046875,-0.04241943359375,0.8064117431640625,16325.0,1659.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 166:
			place("sprite51",canvas,ctx,[0.9970703125,-0.0697479248046875,-0.0424041748046875,0.8064117431640625,16313.0,1671.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 167:
			place("sprite51",canvas,ctx,[0.9970550537109375,-0.0697479248046875,-0.0424041748046875,0.8064117431640625,16302.0,1682.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 168:
			place("sprite51",canvas,ctx,[0.997039794921875,-0.0697479248046875,-0.042388916015625,0.806396484375,16291.0,1694.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 169:
			place("sprite51",canvas,ctx,[0.997039794921875,-0.0697479248046875,-0.042388916015625,0.806396484375,16279.0,1705.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 170:
			place("sprite51",canvas,ctx,[0.9970245361328125,-0.0697479248046875,-0.0423736572265625,0.806396484375,16266.0,1717.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 171:
			place("sprite51",canvas,ctx,[0.99700927734375,-0.0697479248046875,-0.0423736572265625,0.8063812255859375,16254.0,1728.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 172:
			place("sprite51",canvas,ctx,[0.99700927734375,-0.0697479248046875,-0.0423736572265625,0.8063812255859375,16242.0,1740.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 173:
			place("sprite51",canvas,ctx,[0.9969940185546875,-0.0697479248046875,-0.0423583984375,0.8063507080078125,16232.0,1751.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 174:
			place("sprite51",canvas,ctx,[0.996978759765625,-0.0697479248046875,-0.0423583984375,0.8063507080078125,16220.0,1763.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 175:
			place("sprite51",canvas,ctx,[0.996978759765625,-0.0697479248046875,-0.0423431396484375,0.80633544921875,16208.0,1774.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 176:
			place("sprite51",canvas,ctx,[0.9969635009765625,-0.0697479248046875,-0.0423431396484375,0.80633544921875,16195.0,1786.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 177:
			place("sprite51",canvas,ctx,[0.996978759765625,-0.0697479248046875,-0.042327880859375,0.80633544921875,16184.0,1797.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 178:
			place("sprite51",canvas,ctx,[0.9969635009765625,-0.0697479248046875,-0.042327880859375,0.80633544921875,16171.0,1809.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 179:
			place("sprite51",canvas,ctx,[0.9969482421875,-0.069732666015625,-0.042327880859375,0.80633544921875,16161.0,1820.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 180:
			place("sprite51",canvas,ctx,[0.9969482421875,-0.0697479248046875,-0.0423126220703125,0.8063201904296875,16149.0,1833.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 181:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16137.0,1842.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 182:
			place("sprite51",canvas,ctx,[0.9969482421875,-0.069732666015625,-0.042327880859375,0.8063201904296875,16148.0,1832.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 183:
			place("sprite51",canvas,ctx,[0.9969482421875,-0.069732666015625,-0.0423431396484375,0.80633544921875,16160.0,1821.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 184:
			place("sprite51",canvas,ctx,[0.9969635009765625,-0.069732666015625,-0.0423431396484375,0.80633544921875,16171.0,1810.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 185:
			place("sprite51",canvas,ctx,[0.9969635009765625,-0.069732666015625,-0.0423431396484375,0.8063507080078125,16182.0,1799.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 186:
			place("sprite51",canvas,ctx,[0.9969635009765625,-0.069732666015625,-0.0423583984375,0.8063507080078125,16194.0,1788.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 187:
			place("sprite51",canvas,ctx,[0.996978759765625,-0.0697479248046875,-0.0423583984375,0.8063507080078125,16205.0,1777.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 188:
			place("sprite51",canvas,ctx,[0.9969940185546875,-0.0697479248046875,-0.0423583984375,0.806365966796875,16216.0,1766.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 189:
			place("sprite51",canvas,ctx,[0.99700927734375,-0.0697479248046875,-0.0423583984375,0.806365966796875,16227.0,1755.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 190:
			place("sprite51",canvas,ctx,[0.99700927734375,-0.0697479248046875,-0.0423583984375,0.8063812255859375,16239.0,1744.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 191:
			place("sprite51",canvas,ctx,[0.9970245361328125,-0.0697479248046875,-0.0423736572265625,0.8063812255859375,16249.0,1733.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 192:
			place("sprite51",canvas,ctx,[0.997039794921875,-0.0697479248046875,-0.0423736572265625,0.8063812255859375,16261.0,1722.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 193:
			place("sprite51",canvas,ctx,[0.997039794921875,-0.0697479248046875,-0.042388916015625,0.806396484375,16274.0,1711.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 194:
			place("sprite51",canvas,ctx,[0.9970550537109375,-0.0697479248046875,-0.042388916015625,0.806396484375,16285.0,1700.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 195:
			place("sprite51",canvas,ctx,[0.9970703125,-0.0697479248046875,-0.042388916015625,0.806396484375,16296.0,1689.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 196:
			place("sprite51",canvas,ctx,[0.9970703125,-0.0697479248046875,-0.0424041748046875,0.8064117431640625,16308.0,1677.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 197:
			place("sprite51",canvas,ctx,[0.9970855712890625,-0.0697479248046875,-0.0424041748046875,0.8064117431640625,16318.0,1666.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 198:
			place("sprite51",canvas,ctx,[0.9970855712890625,-0.0697479248046875,-0.04241943359375,0.806427001953125,16329.0,1655.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 199:
			place("sprite51",canvas,ctx,[0.997100830078125,-0.0697479248046875,-0.04241943359375,0.806427001953125,16341.0,1644.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 200:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697479248046875,-0.04241943359375,0.806427001953125,16353.0,1633.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 201:
			place("sprite51",canvas,ctx,[0.9971160888671875,-0.0697479248046875,-0.04241943359375,0.8064422607421875,16364.0,1622.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 202:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.04241943359375,0.8064422607421875,16374.0,1611.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 203:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.0424346923828125,0.80645751953125,16386.0,1600.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 204:
			place("sprite51",canvas,ctx,[0.997344970703125,-0.06976318359375,-0.0429229736328125,0.8065643310546875,16397.0,1589.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 205:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16372.0,1576.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 206:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16347.0,1561.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 207:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16323.0,1547.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 208:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16298.0,1532.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 209:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16274.0,1518.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 210:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16249.0,1503.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 211:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16225.0,1488.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 212:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16200.0,1474.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 213:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16176.0,1459.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 214:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16151.0,1445.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 215:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16127.0,1430.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 216:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16102.0,1416.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 217:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16078.0,1401.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 218:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16053.0,1387.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 219:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16029.0,1372.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 220:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16004.0,1358.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 221:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15980.0,1343.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 222:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15955.0,1329.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 223:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15931.0,1314.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 224:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15906.0,1300.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 225:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15882.0,1286.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 226:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15857.0,1271.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 227:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15833.0,1257.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 228:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15808.0,1242.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 229:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15784.0,1228.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 230:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15759.0,1213.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 231:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15735.0,1199.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 232:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15710.0,1184.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 233:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15686.0,1169.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 234:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15661.0,1155.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 235:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15637.0,1141.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 236:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15612.0,1126.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 237:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15588.0,1112.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 238:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15563.0,1097.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 239:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15539.0,1083.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 240:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15514.0,1068.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 241:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15490.0,1054.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 242:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15465.0,1039.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 243:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15440.0,1024.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 244:
			place("sprite51",canvas,ctx,[0.997344970703125,-0.06976318359375,-0.0429229736328125,0.8065643310546875,15417.0,1009.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 245:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15439.0,1026.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 246:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15461.0,1042.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 247:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15482.0,1057.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 248:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15504.0,1073.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 249:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15526.0,1089.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 250:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15548.0,1105.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 251:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15569.0,1121.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 252:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15591.0,1136.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 253:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15613.0,1152.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 254:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15635.0,1168.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 255:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15656.0,1184.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 256:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15678.0,1200.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 257:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15700.0,1215.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 258:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15722.0,1231.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 259:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15743.0,1247.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 260:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15765.0,1263.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 261:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15787.0,1279.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 262:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15809.0,1294.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 263:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15830.0,1310.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 264:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15852.0,1326.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 265:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15874.0,1342.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 266:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15896.0,1358.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 267:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15917.0,1373.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 268:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15939.0,1389.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 269:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15961.0,1405.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 270:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,15983.0,1421.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 271:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16004.0,1437.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 272:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16026.0,1452.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 273:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16048.0,1468.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 274:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16070.0,1484.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 275:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16091.0,1500.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 276:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16113.0,1516.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 277:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16135.0,1531.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 278:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16157.0,1547.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 279:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16178.0,1563.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 280:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16200.0,1579.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 281:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16222.0,1595.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 282:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16244.0,1610.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 283:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16265.0,1626.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 284:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16287.0,1642.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 285:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16309.0,1658.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 286:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16331.0,1674.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 287:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16352.0,1689.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 288:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.042449951171875,0.80645751953125,16374.0,1705.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 289:
			place("sprite51",canvas,ctx,[0.997344970703125,-0.06976318359375,-0.0429229736328125,0.8065643310546875,16396.0,1720.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 290:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.0392913818359375,0.8065185546875,16413.0,1721.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 291:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.03875732421875,0.8064117431640625,16431.0,1721.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 292:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.0356292724609375,0.8064422607421875,16448.0,1722.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 293:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.032470703125,0.8064727783203125,16464.0,1722.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 294:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.031951904296875,0.806365966796875,16482.0,1723.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 295:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,-0.02880859375,0.806365966796875,16500.0,1725.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 296:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.0282745361328125,0.8062744140625,16518.0,1725.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 297:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.0251312255859375,0.8062591552734375,16535.0,1725.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 298:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.0219879150390625,0.8062286376953125,16552.0,1726.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 299:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,-0.0214691162109375,0.8061370849609375,16570.0,1727.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 300:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.018310546875,0.80609130859375,16588.0,1727.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 301:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.0178070068359375,0.8059844970703125,16606.0,1729.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 302:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,-0.0146484375,0.805938720703125,16622.0,1731.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 303:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.014129638671875,0.8058319091796875,16643.0,1731.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 304:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.0110015869140625,0.8057708740234375,16657.0,1733.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 305:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.007843017578125,0.8056793212890625,16675.0,1733.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 306:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.0073394775390625,0.805572509765625,16693.0,1735.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 307:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.0041961669921875,0.8054962158203125,16709.0,1736.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 308:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-0.0036773681640625,0.8053741455078125,16729.0,1736.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 309:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,-5.340576171875E-4,0.805267333984375,16744.0,1736.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 310:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,-3.0517578125E-5,0.805145263671875,16763.0,1738.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 311:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,4.730224609375E-4,0.8050079345703125,16783.0,1739.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 312:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0036163330078125,0.8048858642578125,16798.0,1738.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 313:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.004150390625,0.80474853515625,16817.0,1739.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 314:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0072784423828125,0.804595947265625,16833.0,1737.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 315:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.007781982421875,0.8044586181640625,16852.0,1738.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 316:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.01092529296875,0.8043212890625,16867.0,1737.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 317:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.014068603515625,0.8041229248046875,16885.0,1737.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 318:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0145721435546875,0.8040008544921875,16903.0,1734.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 319:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0177154541015625,0.803802490234375,16919.0,1734.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 320:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0182342529296875,0.8036651611328125,16939.0,1734.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 321:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0213470458984375,0.8034515380859375,16954.0,1732.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 322:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,0.0218505859375,0.803314208984375,16973.0,1730.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 323:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,0.024993896484375,0.8030853271484375,16990.0,1728.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 324:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.028106689453125,0.8028564453125,17005.0,1727.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 325:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0286102294921875,0.802703857421875,17024.0,1724.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 326:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.06976318359375,0.03173828125,0.802459716796875,17041.0,1720.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 327:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0322418212890625,0.80230712890625,17059.0,1717.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 328:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0353851318359375,0.802032470703125,17075.0,1715.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 329:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,0.0358734130859375,0.801910400390625,17094.0,1711.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 330:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,0.0390167236328125,0.8016357421875,17110.0,1707.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 331:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0421295166015625,0.80133056640625,17126.0,1705.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 332:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.042633056640625,0.8011932373046875,17145.0,1700.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 333:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,0.045745849609375,0.8008880615234375,17161.0,1696.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 334:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,0.0462493896484375,0.80072021484375,17179.0,1691.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 335:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.06976318359375,0.04937744140625,0.8004150390625,17194.0,1685.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 336:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.052490234375,0.800079345703125,17210.0,1681.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 337:
			place("sprite51",canvas,ctx,[0.99713134765625,-0.0697479248046875,0.0529937744140625,0.7999267578125,17227.0,1675.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 338:
			place("sprite51",canvas,ctx,[0.9971466064453125,-0.0697479248046875,0.0561065673828125,0.7995758056640625,17243.0,1668.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 339:
			place("sprite51",canvas,ctx,[0.997344970703125,-0.06976318359375,0.058685302734375,0.7994537353515625,17259.0,1661.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 340:
			place("sprite51",canvas,ctx,[-0.997344970703125,-0.06976318359375,-0.016387939453125,0.8024139404296875,19628.0,1658.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 341:
			place("sprite51",canvas,ctx,[-0.9960479736328125,-0.0835418701171875,-0.0283203125,0.8019866943359375,19672.0,1661.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 342:
			place("sprite51",canvas,ctx,[-0.994415283203125,-0.1005706787109375,-0.042022705078125,0.8013458251953125,19716.0,1667.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 343:
			place("sprite51",canvas,ctx,[-0.99249267578125,-0.1175537109375,-0.0531005859375,0.8006591796875,19759.0,1671.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 344:
			place("sprite51",canvas,ctx,[-0.9907073974609375,-0.1312713623046875,-0.0667724609375,0.7995758056640625,19803.0,1671.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 345:
			place("sprite51",canvas,ctx,[-0.98828125,-0.148193359375,-0.0804290771484375,0.79827880859375,19845.0,1672.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 346:
			place("sprite51",canvas,ctx,[-0.9855499267578125,-0.165069580078125,-0.0914764404296875,0.79705810546875,19883.0,1673.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 347:
			place("sprite51",canvas,ctx,[-0.9831085205078125,-0.178680419921875,-0.1051025390625,0.795318603515625,19924.0,1670.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 348:
			place("sprite51",canvas,ctx,[-0.9798583984375,-0.1954803466796875,-0.1186981201171875,0.793365478515625,19963.0,1668.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 349:
			place("sprite51",canvas,ctx,[-0.9763336181640625,-0.21221923828125,-0.129638671875,0.7916107177734375,19998.0,1665.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 350:
			place("sprite51",canvas,ctx,[-0.9732513427734375,-0.2257080078125,-0.1431732177734375,0.7892303466796875,20036.0,1657.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 351:
			place("sprite51",canvas,ctx,[-0.969207763671875,-0.2423095703125,-0.156646728515625,0.7866363525390625,20070.0,1652.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 352:
			place("sprite51",canvas,ctx,[-0.9648590087890625,-0.258880615234375,-0.1675262451171875,0.78436279296875,20101.0,1646.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 353:
			place("sprite51",canvas,ctx,[-0.96112060546875,-0.2721710205078125,-0.180908203125,0.781341552734375,20133.0,1636.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 354:
			place("sprite51",canvas,ctx,[-0.956268310546875,-0.288604736328125,-0.194244384765625,0.778076171875,20163.0,1627.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 355:
			place("sprite51",canvas,ctx,[-0.9511566162109375,-0.304931640625,-0.204986572265625,0.7753143310546875,20188.0,1619.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 356:
			place("sprite51",canvas,ctx,[-0.946807861328125,-0.31805419921875,-0.2182464599609375,0.7716217041015625,20216.0,1605.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 357:
			place("sprite51",canvas,ctx,[-0.9411773681640625,-0.334197998046875,-0.231414794921875,0.7677459716796875,20239.0,1595.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 358:
			place("sprite51",canvas,ctx,[-0.935272216796875,-0.35028076171875,-0.2419891357421875,0.7644500732421875,20259.0,1584.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 359:
			place("sprite51",canvas,ctx,[-0.9302978515625,-0.3631744384765625,-0.2550506591796875,0.7601470947265625,20281.0,1569.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 360:
			place("sprite51",canvas,ctx,[-0.9239044189453125,-0.3790435791015625,-0.268035888671875,0.7556304931640625,20302.0,1558.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 361:
			place("sprite51",canvas,ctx,[-0.9172210693359375,-0.39483642578125,-0.2784576416015625,0.7518157958984375,20316.0,1545.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 362:
			place("sprite51",canvas,ctx,[-0.911651611328125,-0.407470703125,-0.291290283203125,0.7469024658203125,20335.0,1530.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 363:
			place("sprite51",canvas,ctx,[-0.904510498046875,-0.42303466796875,-0.3040313720703125,0.7417755126953125,20348.0,1516.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 364:
			place("sprite51",canvas,ctx,[-0.8970947265625,-0.438446044921875,-0.31427001953125,0.737457275390625,20360.0,1503.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 365:
			place("sprite51",canvas,ctx,[-0.890899658203125,-0.450836181640625,-0.3268585205078125,0.7319488525390625,20373.0,1487.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 366:
			place("sprite51",canvas,ctx,[-0.8830108642578125,-0.466033935546875,-0.3393402099609375,0.726226806640625,20384.0,1475.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 367:
			place("sprite51",canvas,ctx,[-0.8748626708984375,-0.4810791015625,-0.3493499755859375,0.7214202880859375,20391.0,1460.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 368:
			place("sprite51",canvas,ctx,[-0.868072509765625,-0.4931488037109375,-0.361663818359375,0.7153167724609375,20400.0,1444.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 369:
			place("sprite51",canvas,ctx,[-0.8594970703125,-0.5079345703125,-0.3738555908203125,0.7089691162109375,20409.0,1431.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 370:
			place("sprite51",canvas,ctx,[-0.850616455078125,-0.5225982666015625,-0.383636474609375,0.703704833984375,20412.0,1418.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 371:
			place("sprite51",canvas,ctx,[-0.843292236328125,-0.5343170166015625,-0.3956451416015625,0.6970062255859375,20420.0,1402.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 372:
			place("sprite51",canvas,ctx,[-0.8339691162109375,-0.5487060546875,-0.4075164794921875,0.6900787353515625,20426.0,1389.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 373:
			place("sprite51",canvas,ctx,[-0.8244171142578125,-0.5628814697265625,-0.4170379638671875,0.6843719482421875,20429.0,1375.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 374:
			place("sprite51",canvas,ctx,[-0.8165130615234375,-0.5742645263671875,-0.4287109375,0.6771087646484375,20436.0,1359.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 375:
			place("sprite51",canvas,ctx,[-0.806549072265625,-0.588165283203125,-0.4402313232421875,0.6696319580078125,20439.0,1346.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 376:
			place("sprite51",canvas,ctx,[-0.7963104248046875,-0.6019134521484375,-0.4494781494140625,0.6634521484375,20442.0,1331.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 377:
			place("sprite51",canvas,ctx,[-0.787872314453125,-0.6128692626953125,-0.4607696533203125,0.6556243896484375,20446.0,1317.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 378:
			place("sprite51",canvas,ctx,[-0.7772216796875,-0.6262969970703125,-0.471954345703125,0.647613525390625,20448.0,1303.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 379:
			place("sprite51",canvas,ctx,[-0.766387939453125,-0.6395263671875,-0.4808807373046875,0.6410064697265625,20448.0,1289.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 380:
			place("sprite51",canvas,ctx,[-0.7574310302734375,-0.6500701904296875,-0.491790771484375,0.632659912109375,20450.0,1272.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 381:
			place("sprite51",canvas,ctx,[-0.74615478515625,-0.6629791259765625,-0.5025634765625,0.6241302490234375,20449.0,1260.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 382:
			place("sprite51",canvas,ctx,[-0.7346649169921875,-0.675689697265625,-0.5111541748046875,0.6170806884765625,20447.0,1244.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 383:
			place("sprite51",canvas,ctx,[-0.725250244140625,-0.6858062744140625,-0.5216827392578125,0.60821533203125,20448.0,1228.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 384:
			place("sprite51",canvas,ctx,[-0.71337890625,-0.6981201171875,-0.5320281982421875,0.59918212890625,20447.0,1216.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 385:
			place("sprite51",canvas,ctx,[-0.7012939453125,-0.71026611328125,-0.5402679443359375,0.5917510986328125,20443.0,1201.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 386:
			place("sprite51",canvas,ctx,[-0.6913604736328125,-0.719940185546875,-0.5503387451171875,0.5823822021484375,20442.0,1185.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 387:
			place("sprite51",canvas,ctx,[-0.678924560546875,-0.7316741943359375,-0.56024169921875,0.5728759765625,20438.0,1171.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 388:
			place("sprite51",canvas,ctx,[-0.666259765625,-0.7432403564453125,-0.5699920654296875,0.5631561279296875,20432.0,1158.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 389:
			place("sprite51",canvas,ctx,[-0.6558990478515625,-0.7545623779296875,-0.5789794921875,0.555816650390625,20430.0,1141.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 390:
			place("sprite51",canvas,ctx,[-0.666534423828125,-0.74298095703125,-0.56805419921875,0.5650634765625,20430.0,1078.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 391:
			place("sprite51",canvas,ctx,[-0.6794586181640625,-0.7311859130859375,-0.5601043701171875,0.572906494140625,20436.0,1017.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 392:
			place("sprite51",canvas,ctx,[-0.692138671875,-0.71917724609375,-0.5501251220703125,0.58245849609375,20439.0,953.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 393:
			place("sprite51",canvas,ctx,[-0.7046356201171875,-0.706939697265625,-0.540008544921875,0.5918121337890625,20441.0,889.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 394:
			place("sprite51",canvas,ctx,[-0.7169036865234375,-0.694488525390625,-0.529693603515625,0.6010284423828125,20441.0,825.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 395:
			place("sprite51",canvas,ctx,[-0.72894287109375,-0.6818389892578125,-0.5212554931640625,0.6083526611328125,20444.0,762.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 396:
			place("sprite51",canvas,ctx,[-0.74078369140625,-0.668975830078125,-0.5106658935546875,0.6172027587890625,20443.0,699.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 397:
			place("sprite51",canvas,ctx,[-0.7523956298828125,-0.655914306640625,-0.4999542236328125,0.62591552734375,20442.0,635.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 398:
			place("sprite51",canvas,ctx,[-0.763763427734375,-0.6426544189453125,-0.489105224609375,0.6344451904296875,20441.0,571.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 399:
			place("sprite51",canvas,ctx,[-0.77490234375,-0.629180908203125,-0.4801788330078125,0.64117431640625,20438.0,509.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 400:
			place("sprite51",canvas,ctx,[-0.785797119140625,-0.615509033203125,-0.4690704345703125,0.649322509765625,20435.0,446.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 401:
			place("sprite51",canvas,ctx,[-0.796478271484375,-0.6016998291015625,-0.457794189453125,0.65728759765625,20430.0,382.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 402:
			place("sprite51",canvas,ctx,[-0.806915283203125,-0.5876312255859375,-0.446380615234375,0.665069580078125,20424.0,316.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 403:
			place("sprite51",canvas,ctx,[-0.81707763671875,-0.5734405517578125,-0.4370574951171875,0.6712188720703125,20419.0,255.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 404:
			place("sprite51",canvas,ctx,[-0.8270111083984375,-0.5590667724609375,-0.4254302978515625,0.6786346435546875,20412.0,193.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 405:
			place("sprite51",canvas,ctx,[-0.8366851806640625,-0.5445098876953125,-0.413665771484375,0.68585205078125,20403.0,129.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 406:
			place("sprite51",canvas,ctx,[-0.8461151123046875,-0.5297698974609375,-0.4040679931640625,0.6915435791015625,20396.0,65.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 407:
			place("sprite51",canvas,ctx,[-0.85528564453125,-0.5149078369140625,-0.39208984375,0.698394775390625,20384.0,4.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 408:
			place("sprite51",canvas,ctx,[-0.864166259765625,-0.4998626708984375,-0.3799896240234375,0.705047607421875,20374.0,-61.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 409:
			place("sprite51",canvas,ctx,[-0.8728179931640625,-0.4846954345703125,-0.3678131103515625,0.71148681640625,20361.0,-123.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 410:
			place("sprite51",canvas,ctx,[-0.881195068359375,-0.4693603515625,-0.35784912109375,0.716522216796875,20350.0,-184.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 411:
			place("sprite51",canvas,ctx,[-0.8892974853515625,-0.4538726806640625,-0.345458984375,0.7225494384765625,20334.0,-246.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 412:
			place("sprite51",canvas,ctx,[-0.8971405029296875,-0.438262939453125,-0.332977294921875,0.728424072265625,20318.0,-309.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 413:
			place("sprite51",canvas,ctx,[-0.90472412109375,-0.422515869140625,-0.32037353515625,0.7340545654296875,20299.0,-369.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 414:
			place("sprite51",canvas,ctx,[-0.9119873046875,-0.406646728515625,-0.3101043701171875,0.7384490966796875,20281.0,-427.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 415:
			place("sprite51",canvas,ctx,[-0.9189910888671875,-0.3906402587890625,-0.29736328125,0.743682861328125,20259.0,-488.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 416:
			place("sprite51",canvas,ctx,[-0.9257354736328125,-0.37451171875,-0.284515380859375,0.748687744140625,20235.0,-547.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 417:
			place("sprite51",canvas,ctx,[-0.9321746826171875,-0.3582611083984375,-0.2715911865234375,0.7534637451171875,20210.0,-605.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 418:
			place("sprite51",canvas,ctx,[-0.9383392333984375,-0.3419342041015625,-0.261077880859375,0.757171630859375,20185.0,-662.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 419:
			place("sprite51",canvas,ctx,[-0.9452972412109375,-0.3255157470703125,-0.2487945556640625,0.7621307373046875,20157.0,-718.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 420:
			place("sprite51",canvas,ctx,[-0.9453887939453125,-0.3220977783203125,-0.247772216796875,0.7616424560546875,20109.0,-780.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 421:
			place("sprite51",canvas,ctx,[-0.94549560546875,-0.3217620849609375,-0.2450103759765625,0.762542724609375,20052.0,-834.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 422:
			place("sprite51",canvas,ctx,[-0.9456024169921875,-0.3214569091796875,-0.2447662353515625,0.7626190185546875,19991.0,-882.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 423:
			place("sprite51",canvas,ctx,[-0.9467620849609375,-0.3180694580078125,-0.2445068359375,0.7626953125,19925.0,-924.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 424:
			place("sprite51",canvas,ctx,[-0.946868896484375,-0.3177642822265625,-0.2417755126953125,0.7635650634765625,19853.0,-956.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 425:
			place("sprite51",canvas,ctx,[-0.94696044921875,-0.31744384765625,-0.24151611328125,0.7636566162109375,19778.0,-978.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 426:
			place("sprite51",canvas,ctx,[-0.9481201171875,-0.3140411376953125,-0.24127197265625,0.7637481689453125,19706.0,-999.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 427:
			place("sprite51",canvas,ctx,[-0.9482269287109375,-0.313720703125,-0.2385101318359375,0.7646026611328125,19627.0,-1006.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 428:
			place("sprite51",canvas,ctx,[-0.948333740234375,-0.3134002685546875,-0.238250732421875,0.7646942138671875,19550.0,-1009.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 429:
			place("sprite51",canvas,ctx,[-0.9484405517578125,-0.3130950927734375,-0.238006591796875,0.7647705078125,19474.0,-1009.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 430:
			place("sprite51",canvas,ctx,[-0.9495697021484375,-0.3096923828125,-0.237762451171875,0.7648468017578125,19399.0,-1013.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 431:
			place("sprite51",canvas,ctx,[-0.949676513671875,-0.309356689453125,-0.235015869140625,0.7657012939453125,19320.0,-1012.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 432:
			place("sprite51",canvas,ctx,[-0.9497528076171875,-0.309051513671875,-0.2347412109375,0.765777587890625,19244.0,-1011.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 433:
			place("sprite51",canvas,ctx,[-0.950897216796875,-0.3056182861328125,-0.2345123291015625,0.765869140625,19170.0,-1015.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 434:
			place("sprite51",canvas,ctx,[-0.9509735107421875,-0.3053131103515625,-0.2317352294921875,0.7667236328125,19090.0,-1016.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 435:
			place("sprite51",canvas,ctx,[-0.9510955810546875,-0.3050079345703125,-0.2314910888671875,0.76678466796875,19014.0,-1016.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 436:
			place("sprite51",canvas,ctx,[-0.9521942138671875,-0.3015899658203125,-0.2312469482421875,0.766876220703125,18939.0,-1021.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 437:
			place("sprite51",canvas,ctx,[-0.952301025390625,-0.3012542724609375,-0.2284698486328125,0.7677001953125,18860.0,-1022.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 438:
			place("sprite51",canvas,ctx,[-0.952392578125,-0.3009490966796875,-0.2282257080078125,0.7677764892578125,18783.0,-1022.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 439:
			place("sprite51",canvas,ctx,[-0.9525146484375,-0.300628662109375,-0.2279815673828125,0.7678375244140625,18708.0,-1024.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 440:
			place("sprite51",canvas,ctx,[-0.9535675048828125,-0.2971954345703125,-0.22772216796875,0.767913818359375,18632.0,-1028.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 441:
			place("sprite51",canvas,ctx,[-0.95367431640625,-0.2968902587890625,-0.2249603271484375,0.7687530517578125,18554.0,-1030.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 442:
			place("sprite51",canvas,ctx,[-0.9537811279296875,-0.29656982421875,-0.2246856689453125,0.7688140869140625,18477.0,-1032.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 443:
			place("sprite51",canvas,ctx,[-0.9548492431640625,-0.29315185546875,-0.224456787109375,0.7689056396484375,18402.0,-1038.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 444:
			place("sprite51",canvas,ctx,[-0.9549560546875,-0.2928314208984375,-0.2216644287109375,0.7696990966796875,18324.0,-1039.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 445:
			place("sprite51",canvas,ctx,[-0.955047607421875,-0.29254150390625,-0.221435546875,0.769775390625,18248.0,-1042.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 446:
			place("sprite51",canvas,ctx,[-0.9561004638671875,-0.2890777587890625,-0.2211761474609375,0.7698516845703125,18172.0,-1047.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 447:
			place("sprite51",canvas,ctx,[-0.956207275390625,-0.2887725830078125,-0.2183990478515625,0.770660400390625,18093.0,-1051.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 448:
			place("sprite51",canvas,ctx,[-0.9562835693359375,-0.2884521484375,-0.2181243896484375,0.7707366943359375,18017.0,-1053.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 449:
			place("sprite51",canvas,ctx,[-0.956390380859375,-0.28814697265625,-0.2178802490234375,0.7707977294921875,17941.0,-1057.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 450:
			place("sprite51",canvas,ctx,[-0.957427978515625,-0.2847137451171875,-0.2176513671875,0.7708740234375,17866.0,-1062.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 451:
			place("sprite51",canvas,ctx,[-0.9575347900390625,-0.28436279296875,-0.2148590087890625,0.77166748046875,17787.0,-1068.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 452:
			place("sprite51",canvas,ctx,[-0.9576263427734375,-0.2840576171875,-0.214599609375,0.771728515625,17710.0,-1070.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 453:
			place("sprite51",canvas,ctx,[-0.9586639404296875,-0.280609130859375,-0.21435546875,0.77178955078125,17636.0,-1078.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 454:
			place("sprite51",canvas,ctx,[-0.958709716796875,-0.2802886962890625,-0.211578369140625,0.7725677490234375,17557.0,-1083.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 455:
			place("sprite51",canvas,ctx,[-0.9588165283203125,-0.2799835205078125,-0.211334228515625,0.7726593017578125,17481.0,-1087.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 456:
			place("sprite51",canvas,ctx,[-0.9598541259765625,-0.2765045166015625,-0.2110748291015625,0.7727203369140625,17406.0,-1095.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 457:
			place("sprite51",canvas,ctx,[-0.9599609375,-0.276214599609375,-0.208282470703125,0.7734832763671875,17327.0,-1099.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 458:
			place("sprite51",canvas,ctx,[-0.9600372314453125,-0.2758941650390625,-0.2080078125,0.7735443115234375,17251.0,-1105.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 459:
			place("sprite51",canvas,ctx,[-0.9601287841796875,-0.27557373046875,-0.207763671875,0.7736053466796875,17174.0,-1109.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 460:
			place("sprite51",canvas,ctx,[-0.96112060546875,-0.2721099853515625,-0.20751953125,0.7736968994140625,17101.0,-1118.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 461:
			place("sprite51",canvas,ctx,[-0.9611968994140625,-0.27178955078125,-0.2047271728515625,0.774444580078125,17021.0,-1124.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 462:
			place("sprite51",canvas,ctx,[-0.9612884521484375,-0.271484375,-0.2044525146484375,0.7745208740234375,16945.0,-1128.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 463:
			place("sprite51",canvas,ctx,[-0.9622802734375,-0.268035888671875,-0.2042388916015625,0.7745819091796875,16870.0,-1139.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 464:
			place("sprite51",canvas,ctx,[-0.962371826171875,-0.2677154541015625,-0.2014312744140625,0.775299072265625,16790.0,-1145.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 465:
			place("sprite51",canvas,ctx,[-0.96246337890625,-0.26739501953125,-0.2011871337890625,0.775390625,16715.0,-1151.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 466:
			place("sprite51",canvas,ctx,[-0.9634246826171875,-0.263916015625,-0.200927734375,0.7754364013671875,16639.0,-1162.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 467:
			place("sprite51",canvas,ctx,[-0.9635162353515625,-0.26361083984375,-0.1981201171875,0.7761688232421875,16561.0,-1168.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 468:
			place("sprite51",canvas,ctx,[-0.9636077880859375,-0.2633056640625,-0.1978912353515625,0.7762298583984375,16485.0,-1174.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 469:
			place("sprite51",canvas,ctx,[-0.96368408203125,-0.2629852294921875,-0.1976165771484375,0.7763214111328125,16410.0,-1181.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 470:
			place("sprite51",canvas,ctx,[-0.96466064453125,-0.259521484375,-0.1973419189453125,0.7763824462890625,16334.0,-1191.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 471:
			place("sprite51",canvas,ctx,[-0.9647369384765625,-0.259185791015625,-0.194549560546875,0.7770843505859375,16257.0,-1199.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 472:
			place("sprite51",canvas,ctx,[-0.96484375,-0.2588653564453125,-0.194305419921875,0.77716064453125,16179.0,-1207.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 473:
			place("sprite51",canvas,ctx,[-0.96575927734375,-0.255401611328125,-0.194061279296875,0.7772216796875,16104.0,-1216.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 474:
			place("sprite51",canvas,ctx,[-0.9658660888671875,-0.255096435546875,-0.191253662109375,0.7779083251953125,16027.0,-1225.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 475:
			place("sprite51",canvas,ctx,[-0.9659271240234375,-0.2547607421875,-0.1909942626953125,0.777984619140625,15950.0,-1234.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 476:
			place("sprite51",canvas,ctx,[-0.9668426513671875,-0.25128173828125,-0.1907501220703125,0.778045654296875,15876.0,-1245.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 477:
			place("sprite51",canvas,ctx,[-0.9669342041015625,-0.2509613037109375,-0.187957763671875,0.7787322998046875,15798.0,-1253.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 478:
			place("sprite51",canvas,ctx,[-0.967041015625,-0.2506561279296875,-0.18768310546875,0.7787933349609375,15720.0,-1261.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 479:
			place("sprite51",canvas,ctx,[-0.9670867919921875,-0.250335693359375,-0.18743896484375,0.77886962890625,15645.0,-1270.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 480:
			place("sprite51",canvas,ctx,[-0.968017578125,-0.2468414306640625,-0.187164306640625,0.7789154052734375,15570.0,-1285.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 481:
			place("sprite51",canvas,ctx,[-0.96807861328125,-0.24652099609375,-0.1843719482421875,0.77960205078125,15492.0,-1292.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 482:
			place("sprite51",canvas,ctx,[-0.968170166015625,-0.2462005615234375,-0.184112548828125,0.7796630859375,15417.0,-1302.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 483:
			place("sprite51",canvas,ctx,[-0.9690704345703125,-0.24273681640625,-0.183868408203125,0.77972412109375,15341.0,-1314.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 484:
			place("sprite51",canvas,ctx,[-0.969146728515625,-0.2424163818359375,-0.1810302734375,0.7803802490234375,15263.0,-1325.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 485:
			place("sprite51",canvas,ctx,[-0.9692230224609375,-0.242095947265625,-0.1807861328125,0.7804412841796875,15188.0,-1335.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 486:
			place("sprite51",canvas,ctx,[-0.9701080322265625,-0.2386016845703125,-0.1805267333984375,0.7805023193359375,15114.0,-1350.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 487:
			place("sprite51",canvas,ctx,[-0.970184326171875,-0.2382659912109375,-0.177703857421875,0.7811737060546875,15034.0,-1361.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 488:
			place("sprite51",canvas,ctx,[-0.9702606201171875,-0.237945556640625,-0.1774749755859375,0.781219482421875,14959.0,-1371.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 489:
			place("sprite51",canvas,ctx,[-0.9703369140625,-0.237640380859375,-0.1772003173828125,0.7812957763671875,14883.0,-1381.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 490:
			place("sprite51",canvas,ctx,[-0.97119140625,-0.234130859375,-0.17694091796875,0.7813262939453125,14807.0,-1395.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 491:
			place("sprite51",canvas,ctx,[-0.9712677001953125,-0.23382568359375,-0.17413330078125,0.781982421875,14730.0,-1405.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 492:
			place("sprite51",canvas,ctx,[-0.9713592529296875,-0.233489990234375,-0.17388916015625,0.7820281982421875,14655.0,-1416.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 493:
			place("sprite51",canvas,ctx,[-0.9722137451171875,-0.2300262451171875,-0.173614501953125,0.7820892333984375,14580.0,-1430.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 494:
			place("sprite51",canvas,ctx,[-0.9722747802734375,-0.2296905517578125,-0.170806884765625,0.78271484375,14502.0,-1440.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 495:
			place("sprite51",canvas,ctx,[-0.9723663330078125,-0.2293701171875,-0.1705474853515625,0.7827911376953125,14427.0,-1451.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 496:
			place("sprite51",canvas,ctx,[-0.9731903076171875,-0.225860595703125,-0.1703033447265625,0.7828369140625,14351.0,-1464.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 497:
			place("sprite51",canvas,ctx,[-0.9732666015625,-0.2255706787109375,-0.16748046875,0.7834625244140625,14274.0,-1476.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 498:
			place("sprite51",canvas,ctx,[-0.97332763671875,-0.2252349853515625,-0.167236328125,0.7835235595703125,14197.0,-1486.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 499:
			place("sprite51",canvas,ctx,[-0.9734039306640625,-0.22491455078125,-0.166961669921875,0.7835845947265625,14122.0,-1496.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 500:
			place("sprite51",canvas,ctx,[-0.974212646484375,-0.2213897705078125,-0.1667022705078125,0.78363037109375,14047.0,-1511.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 501:
			place("sprite51",canvas,ctx,[-0.97430419921875,-0.2210845947265625,-0.1638641357421875,0.78424072265625,13969.0,-1521.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 502:
			place("sprite51",canvas,ctx,[-0.9743804931640625,-0.2207489013671875,-0.16363525390625,0.784271240234375,13893.0,-1532.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 503:
			place("sprite51",canvas,ctx,[-0.97515869140625,-0.217254638671875,-0.163360595703125,0.7843475341796875,13818.0,-1546.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 504:
			place("sprite51",canvas,ctx,[-0.9752349853515625,-0.2169189453125,-0.1605377197265625,0.7849273681640625,13741.0,-1558.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 505:
			place("sprite51",canvas,ctx,[-0.975311279296875,-0.2166290283203125,-0.1602783203125,0.7849884033203125,13664.0,-1567.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 506:
			place("sprite51",canvas,ctx,[-0.97607421875,-0.213104248046875,-0.1600341796875,0.7850341796875,13589.0,-1581.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 507:
			place("sprite51",canvas,ctx,[-0.976165771484375,-0.2127838134765625,-0.157196044921875,0.7856292724609375,13512.0,-1593.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 508:
			place("sprite51",canvas,ctx,[-0.976226806640625,-0.21246337890625,-0.1569366455078125,0.7856597900390625,13436.0,-1604.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 509:
			place("sprite51",canvas,ctx,[-0.976318359375,-0.2121429443359375,-0.15667724609375,0.7857208251953125,13361.0,-1613.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 510:
			place("sprite51",canvas,ctx,[-0.9770660400390625,-0.2086334228515625,-0.15643310546875,0.7857666015625,13286.0,-1628.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 511:
			place("sprite51",canvas,ctx,[-0.9771575927734375,-0.20831298828125,-0.1535797119140625,0.786346435546875,13207.0,-1638.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 512:
			place("sprite51",canvas,ctx,[-0.9772186279296875,-0.207977294921875,-0.1533355712890625,0.7863922119140625,13132.0,-1649.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 513:
			place("sprite51",canvas,ctx,[-0.9779815673828125,-0.2044525146484375,-0.1530914306640625,0.78643798828125,13058.0,-1664.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 514:
			place("sprite51",canvas,ctx,[-0.9780426025390625,-0.204132080078125,-0.150238037109375,0.7869873046875,12979.0,-1675.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 515:
			place("sprite51",canvas,ctx,[-0.978118896484375,-0.2038116455078125,-0.1499786376953125,0.7870330810546875,12904.0,-1686.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 516:
			place("sprite51",canvas,ctx,[-0.978851318359375,-0.2003021240234375,-0.14971923828125,0.7870941162109375,12828.0,-1699.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 517:
			place("sprite51",canvas,ctx,[-0.978912353515625,-0.1999664306640625,-0.146881103515625,0.7876434326171875,12750.0,-1711.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 518:
			place("sprite51",canvas,ctx,[-0.9789886474609375,-0.1996612548828125,-0.146636962890625,0.787689208984375,12675.0,-1721.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 519:
			place("sprite51",canvas,ctx,[-0.979034423828125,-0.1993408203125,-0.1463775634765625,0.787750244140625,12599.0,-1731.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 520:
			place("sprite51",canvas,ctx,[-0.9797821044921875,-0.1958160400390625,-0.1461334228515625,0.787811279296875,12524.0,-1747.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 521:
			place("sprite51",canvas,ctx,[-0.9798431396484375,-0.1954803466796875,-0.143280029296875,0.788330078125,12446.0,-1757.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 522:
			place("sprite51",canvas,ctx,[-0.9799041748046875,-0.1951751708984375,-0.1430206298828125,0.7883758544921875,12371.0,-1767.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 523:
			place("sprite51",canvas,ctx,[-0.9806060791015625,-0.1916351318359375,-0.14276123046875,0.788421630859375,12295.0,-1782.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 524:
			place("sprite51",canvas,ctx,[-0.980682373046875,-0.1913299560546875,-0.1399383544921875,0.7889404296875,12217.0,-1792.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 525:
			place("sprite51",canvas,ctx,[-0.980743408203125,-0.191009521484375,-0.1396636962890625,0.78900146484375,12142.0,-1804.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 526:
			place("sprite51",canvas,ctx,[-0.981414794921875,-0.187469482421875,-0.139404296875,0.7890472412109375,12067.0,-1819.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 527:
			place("sprite51",canvas,ctx,[-0.9814910888671875,-0.1871490478515625,-0.136566162109375,0.78955078125,11989.0,-1829.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 528:
			place("sprite51",canvas,ctx,[-0.9815521240234375,-0.1868133544921875,-0.1363067626953125,0.789581298828125,11912.0,-1839.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 529:
			place("sprite51",canvas,ctx,[-0.981597900390625,-0.186492919921875,-0.1360626220703125,0.7896575927734375,11837.0,-1851.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 530:
			place("sprite51",canvas,ctx,[-0.982269287109375,-0.182952880859375,-0.13580322265625,0.7896728515625,11763.0,-1866.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 531:
			place("sprite51",canvas,ctx,[-0.98236083984375,-0.1826324462890625,-0.1329345703125,0.7901763916015625,11684.0,-1877.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 532:
			place("sprite51",canvas,ctx,[-0.982421875,-0.18231201171875,-0.1326904296875,0.7902069091796875,11609.0,-1887.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 533:
			place("sprite51",canvas,ctx,[-0.9830780029296875,-0.17877197265625,-0.1324310302734375,0.790283203125,11533.0,-1901.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 534:
			place("sprite51",canvas,ctx,[-0.9831390380859375,-0.1784515380859375,-0.12957763671875,0.7907562255859375,11455.0,-1911.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 535:
			place("sprite51",canvas,ctx,[-0.9832000732421875,-0.178131103515625,-0.129302978515625,0.790802001953125,11379.0,-1922.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 536:
			place("sprite51",canvas,ctx,[-0.98382568359375,-0.174591064453125,-0.129058837890625,0.79083251953125,11305.0,-1935.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 537:
			place("sprite51",canvas,ctx,[-0.98388671875,-0.1742706298828125,-0.126220703125,0.7913055419921875,11226.0,-1945.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 538:
			place("sprite51",canvas,ctx,[-0.9839630126953125,-0.1739501953125,-0.1259613037109375,0.7913360595703125,11151.0,-1952.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 539:
			place("sprite51",canvas,ctx,[-0.9840087890625,-0.1736297607421875,-0.125701904296875,0.7913970947265625,11074.0,-1963.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 540:
			place("sprite51",canvas,ctx,[-0.984649658203125,-0.1700897216796875,-0.1254425048828125,0.7914276123046875,11000.0,-1975.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 541:
			place("sprite51",canvas,ctx,[-0.984710693359375,-0.1697540283203125,-0.1225738525390625,0.7918853759765625,10921.0,-1983.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 542:
			place("sprite51",canvas,ctx,[-0.9847564697265625,-0.16943359375,-0.1223297119140625,0.79193115234375,10845.0,-1992.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 543:
			place("sprite51",canvas,ctx,[-0.9853668212890625,-0.1659088134765625,-0.1220703125,0.7919769287109375,10771.0,-2003.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 544:
			place("sprite51",canvas,ctx,[-0.9854278564453125,-0.165557861328125,-0.11920166015625,0.7924041748046875,10691.0,-2012.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 545:
			place("sprite51",canvas,ctx,[-0.9854736328125,-0.1652679443359375,-0.11895751953125,0.792449951171875,10615.0,-2018.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 546:
			place("sprite51",canvas,ctx,[-0.9860687255859375,-0.1616973876953125,-0.1186981201171875,0.7924957275390625,10540.0,-2030.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 547:
			place("sprite51",canvas,ctx,[-0.9861297607421875,-0.1613616943359375,-0.1158294677734375,0.7929229736328125,10461.0,-2037.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 548:
			place("sprite51",canvas,ctx,[-0.9861907958984375,-0.1610565185546875,-0.1155853271484375,0.7929534912109375,10386.0,-2044.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 549:
			place("sprite51",canvas,ctx,[-0.9862518310546875,-0.160736083984375,-0.1153106689453125,0.7930145263671875,10310.0,-2051.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 550:
			place("sprite51",canvas,ctx,[-0.98681640625,-0.1571807861328125,-0.11505126953125,0.79302978515625,10233.0,-2062.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 551:
			place("sprite51",canvas,ctx,[-0.9868927001953125,-0.1568756103515625,-0.1121978759765625,0.7934722900390625,10155.0,-2067.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 552:
			place("sprite51",canvas,ctx,[-0.986907958984375,-0.1565399169921875,-0.1119384765625,0.7935028076171875,10079.0,-2073.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 553:
			place("sprite51",canvas,ctx,[-0.9875030517578125,-0.1529541015625,-0.1116790771484375,0.793548583984375,10004.0,-2083.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 554:
			place("sprite51",canvas,ctx,[-0.987548828125,-0.15264892578125,-0.10882568359375,0.7939453125,9924.0,-2087.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 555:
			place("sprite51",canvas,ctx,[-0.98760986328125,-0.152313232421875,-0.1085662841796875,0.793975830078125,9850.0,-2093.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 556:
			place("sprite51",canvas,ctx,[-0.9881591796875,-0.148773193359375,-0.108306884765625,0.79400634765625,9773.0,-2103.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 557:
			place("sprite51",canvas,ctx,[-0.988189697265625,-0.148468017578125,-0.1054534912109375,0.794403076171875,9694.0,-2108.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 558:
			place("sprite51",canvas,ctx,[-0.9882659912109375,-0.1481170654296875,-0.1051788330078125,0.7944488525390625,9618.0,-2112.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 559:
			place("sprite51",canvas,ctx,[-0.988311767578125,-0.147796630859375,-0.10491943359375,0.794464111328125,9543.0,-2116.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 560:
			place("sprite51",canvas,ctx,[-0.98883056640625,-0.14422607421875,-0.10467529296875,0.7945098876953125,9466.0,-2125.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 561:
			place("sprite51",canvas,ctx,[-0.9888763427734375,-0.1439361572265625,-0.101806640625,0.794891357421875,9387.0,-2128.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 562:
			place("sprite51",canvas,ctx,[-0.9889373779296875,-0.143585205078125,-0.1015472412109375,0.794921875,9311.0,-2131.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 563:
			place("sprite51",canvas,ctx,[-0.9894561767578125,-0.1400299072265625,-0.101287841796875,0.7949676513671875,9235.0,-2138.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 564:
			place("sprite51",canvas,ctx,[-0.989501953125,-0.13970947265625,-0.0984344482421875,0.7953338623046875,9156.0,-2143.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 565:
			place("sprite51",canvas,ctx,[-0.9895477294921875,-0.1393585205078125,-0.0981597900390625,0.79534912109375,9081.0,-2146.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 566:
			place("sprite51",canvas,ctx,[-0.99005126953125,-0.1358184814453125,-0.097900390625,0.7953948974609375,9005.0,-2153.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 567:
			place("sprite51",canvas,ctx,[-0.9900970458984375,-0.135498046875,-0.09503173828125,0.795745849609375,8926.0,-2155.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 568:
			place("sprite51",canvas,ctx,[-0.990142822265625,-0.135162353515625,-0.09478759765625,0.7957763671875,8850.0,-2157.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 569:
			place("sprite51",canvas,ctx,[-0.9902191162109375,-0.1348419189453125,-0.094512939453125,0.7958221435546875,8773.0,-2158.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 570:
			place("sprite51",canvas,ctx,[-0.990692138671875,-0.131256103515625,-0.0942535400390625,0.79583740234375,8698.0,-2165.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 571:
			place("sprite51",canvas,ctx,[-0.9907379150390625,-0.1309661865234375,-0.0913848876953125,0.7961883544921875,8619.0,-2165.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 572:
			place("sprite51",canvas,ctx,[-0.9907989501953125,-0.1306304931640625,-0.0911102294921875,0.7962188720703125,8542.0,-2167.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 573:
			place("sprite51",canvas,ctx,[-0.99127197265625,-0.1270599365234375,-0.0908660888671875,0.7962493896484375,8466.0,-2172.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 574:
			place("sprite51",canvas,ctx,[-0.991302490234375,-0.1267242431640625,-0.0879974365234375,0.79656982421875,8387.0,-2174.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 575:
			place("sprite51",canvas,ctx,[-0.991363525390625,-0.12640380859375,-0.0877227783203125,0.7966156005859375,8310.0,-2174.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 576:
			place("sprite51",canvas,ctx,[-0.9918060302734375,-0.122833251953125,-0.08746337890625,0.7966461181640625,8235.0,-2179.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 577:
			place("sprite51",canvas,ctx,[-0.9918670654296875,-0.122528076171875,-0.0846099853515625,0.7969512939453125,8156.0,-2177.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 578:
			place("sprite51",canvas,ctx,[-0.9918975830078125,-0.1221771240234375,-0.0843353271484375,0.7969818115234375,8080.0,-2178.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 579:
			place("sprite51",canvas,ctx,[-0.9919281005859375,-0.121856689453125,-0.084075927734375,0.797027587890625,8003.0,-2177.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 580:
			place("sprite51",canvas,ctx,[-0.99237060546875,-0.1182708740234375,-0.0838470458984375,0.79705810546875,7929.0,-2180.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 581:
			place("sprite51",canvas,ctx,[-0.992431640625,-0.1179656982421875,-0.0809478759765625,0.79736328125,7849.0,-2181.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 582:
			place("sprite51",canvas,ctx,[-0.9924468994140625,-0.1176300048828125,-0.0806884765625,0.7973785400390625,7773.0,-2180.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 583:
			place("sprite51",canvas,ctx,[-0.9928741455078125,-0.1140594482421875,-0.0804443359375,0.797393798828125,7697.0,-2183.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 584:
			place("sprite51",canvas,ctx,[-0.992919921875,-0.1137542724609375,-0.077545166015625,0.7977142333984375,7617.0,-2180.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 585:
			place("sprite51",canvas,ctx,[-0.992950439453125,-0.1134033203125,-0.077301025390625,0.7977447509765625,7541.0,-2177.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 586:
			place("sprite51",canvas,ctx,[-0.9933624267578125,-0.1098480224609375,-0.077056884765625,0.797760009765625,7465.0,-2178.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 587:
			place("sprite51",canvas,ctx,[-0.993408203125,-0.109527587890625,-0.074188232421875,0.79803466796875,7386.0,-2175.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 588:
			place("sprite51",canvas,ctx,[-0.9934539794921875,-0.1091766357421875,-0.0738983154296875,0.7980499267578125,7310.0,-2172.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 589:
			place("sprite51",canvas,ctx,[-0.9934844970703125,-0.1088714599609375,-0.073638916015625,0.798065185546875,7234.0,-2168.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 590:
			place("sprite51",canvas,ctx,[-0.993896484375,-0.1052703857421875,-0.073394775390625,0.7981109619140625,7158.0,-2169.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 591:
			place("sprite51",canvas,ctx,[-0.993927001953125,-0.1049652099609375,-0.0705108642578125,0.7983856201171875,7080.0,-2168.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 592:
			place("sprite51",canvas,ctx,[-0.9939422607421875,-0.1046295166015625,-0.07025146484375,0.79840087890625,7004.0,-2163.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 593:
			place("sprite51",canvas,ctx,[-0.9943389892578125,-0.1010589599609375,-0.069976806640625,0.7984466552734375,6928.0,-2163.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 594:
			place("sprite51",canvas,ctx,[-0.9943695068359375,-0.100738525390625,-0.067108154296875,0.798675537109375,6848.0,-2159.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 595:
			place("sprite51",canvas,ctx,[-0.9944000244140625,-0.1003875732421875,-0.0668487548828125,0.7987060546875,6773.0,-2156.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 596:
			place("sprite51",canvas,ctx,[-0.994781494140625,-0.096832275390625,-0.0665740966796875,0.7987213134765625,6697.0,-2156.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 597:
			place("sprite51",canvas,ctx,[-0.99481201171875,-0.0964813232421875,-0.0637054443359375,0.7989654541015625,6618.0,-2153.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 598:
			place("sprite51",canvas,ctx,[-0.994842529296875,-0.09619140625,-0.0634613037109375,0.798980712890625,6541.0,-2148.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 599:
			place("sprite51",canvas,ctx,[-0.994873046875,-0.095855712890625,-0.06317138671875,0.79901123046875,6466.0,-2144.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 600:
			place("sprite51",canvas,ctx,[-0.9952239990234375,-0.092254638671875,-0.0629119873046875,0.799041748046875,6388.0,-2145.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 601:
			place("sprite51",canvas,ctx,[-0.9952545166015625,-0.0919189453125,-0.0600433349609375,0.7992706298828125,6310.0,-2141.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 602:
			place("sprite51",canvas,ctx,[-0.9952850341796875,-0.09161376953125,-0.0597686767578125,0.799285888671875,6234.0,-2136.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 603:
			place("sprite51",canvas,ctx,[-0.99560546875,-0.0880279541015625,-0.059539794921875,0.79931640625,6158.0,-2136.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 604:
			place("sprite51",canvas,ctx,[-0.9956512451171875,-0.0876922607421875,-0.056640625,0.799530029296875,6080.0,-2132.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 605:
			place("sprite51",canvas,ctx,[-0.9956512451171875,-0.0873565673828125,-0.056396484375,0.7995452880859375,6003.0,-2127.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 606:
			place("sprite51",canvas,ctx,[-0.996002197265625,-0.0837860107421875,-0.056121826171875,0.799560546875,5928.0,-2126.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 607:
			place("sprite51",canvas,ctx,[-0.9960174560546875,-0.083465576171875,-0.0532379150390625,0.799774169921875,5848.0,-2122.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 608:
			place("sprite51",canvas,ctx,[-0.9960479736328125,-0.0831298828125,-0.052978515625,0.7997894287109375,5773.0,-2117.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 609:
			place("sprite51",canvas,ctx,[-0.9960784912109375,-0.0828094482421875,-0.0527191162109375,0.7998046875,5697.0,-2112.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 610:
			place("sprite51",canvas,ctx,[-0.99639892578125,-0.0792083740234375,-0.052459716796875,0.7998199462890625,5621.0,-2112.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 611:
			place("sprite51",canvas,ctx,[-0.99639892578125,-0.078887939453125,-0.0495758056640625,0.8000335693359375,5542.0,-2107.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 612:
			place("sprite51",canvas,ctx,[-0.9964447021484375,-0.0785675048828125,-0.04931640625,0.8000335693359375,5466.0,-2102.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 613:
			place("sprite51",canvas,ctx,[-0.996734619140625,-0.0749664306640625,-0.0490570068359375,0.800048828125,5390.0,-2099.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 614:
			place("sprite51",canvas,ctx,[-0.99676513671875,-0.0746612548828125,-0.0461883544921875,0.8002471923828125,5312.0,-2095.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 615:
			place("sprite51",canvas,ctx,[-0.9967803955078125,-0.0743255615234375,-0.0459136962890625,0.800262451171875,5236.0,-2089.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 616:
			place("sprite51",canvas,ctx,[-0.997039794921875,-0.07073974609375,-0.045654296875,0.800262451171875,5159.0,-2090.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 617:
			place("sprite51",canvas,ctx,[-0.9970703125,-0.070404052734375,-0.042755126953125,0.8004302978515625,5080.0,-2083.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 618:
			place("sprite51",canvas,ctx,[-0.997100830078125,-0.070098876953125,-0.042510986328125,0.800445556640625,5005.0,-2077.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 619:
			place("sprite51",canvas,ctx,[-0.9973297119140625,-0.06976318359375,-0.043060302734375,0.8005523681640625,4929.0,-2069.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 620:
			place("sprite51",canvas,ctx,[-0.99822998046875,-0.052337646484375,-0.02825927734375,0.801116943359375,4830.0,-2076.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 621:
			place("sprite51",canvas,ctx,[-0.999053955078125,-0.034912109375,-0.0142669677734375,0.8015289306640625,4733.0,-2078.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 622:
			place("sprite51",canvas,ctx,[-0.9995880126953125,-0.0174713134765625,-2.899169921875E-4,0.8017120361328125,4636.0,-2075.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 623:
			place("sprite51",canvas,ctx,[-0.9998016357421875,-1.52587890625E-5,0.011077880859375,0.801605224609375,4541.0,-2067.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 624:
			place("sprite51",canvas,ctx,[-0.9996490478515625,0.01416015625,0.025054931640625,0.8012542724609375,4447.0,-2049.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 625:
			place("sprite51",canvas,ctx,[-0.9991912841796875,0.031585693359375,0.0390625,0.8006439208984375,4354.0,-2027.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 626:
			place("sprite51",canvas,ctx,[-0.9984283447265625,0.049041748046875,0.053009033203125,0.7997894287109375,4265.0,-1998.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 627:
			place("sprite51",canvas,ctx,[-0.997344970703125,0.0664520263671875,0.066986083984375,0.7987213134765625,4182.0,-1962.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 628:
			place("sprite51",canvas,ctx,[-0.9959716796875,0.0838623046875,0.0809173583984375,0.7973785400390625,4101.0,-1918.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 629:
			place("sprite51",canvas,ctx,[-0.9943084716796875,0.101226806640625,0.0948028564453125,0.7957916259765625,4028.0,-1867.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 630:
			place("sprite51",canvas,ctx,[-0.992340087890625,0.11859130859375,0.10870361328125,0.7939605712890625,3962.0,-1810.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 631:
			place("sprite51",canvas,ctx,[-0.99005126953125,0.1358795166015625,0.1225433349609375,0.79193115234375,3903.0,-1748.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 632:
			place("sprite51",canvas,ctx,[-0.987457275390625,0.1531524658203125,0.1363677978515625,0.78961181640625,3851.0,-1682.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 633:
			place("sprite51",canvas,ctx,[-0.984588623046875,0.170379638671875,0.150115966796875,0.7870635986328125,3806.0,-1614.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 634:
			place("sprite51",canvas,ctx,[-0.981414794921875,0.187530517578125,0.163848876953125,0.784271240234375,3769.0,-1543.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 635:
			place("sprite51",canvas,ctx,[-0.977935791015625,0.20465087890625,0.177520751953125,0.78125,3736.0,-1470.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 636:
			place("sprite51",canvas,ctx,[-0.9741668701171875,0.2216949462890625,0.191131591796875,0.777984619140625,3708.0,-1396.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 637:
			place("sprite51",canvas,ctx,[-0.9700927734375,0.238677978515625,0.2046966552734375,0.7744903564453125,3685.0,-1325.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 638:
			place("sprite51",canvas,ctx,[-0.965728759765625,0.2555694580078125,0.2181854248046875,0.770751953125,3665.0,-1251.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 639:
			place("sprite51",canvas,ctx,[-0.9610595703125,0.272430419921875,0.23162841796875,0.76678466796875,3650.0,-1177.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 640:
			place("sprite51",canvas,ctx,[-0.9561309814453125,0.289154052734375,0.2449798583984375,0.7625732421875,3636.0,-1103.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 641:
			place("sprite51",canvas,ctx,[-0.95086669921875,0.305816650390625,0.258270263671875,0.758148193359375,3626.0,-1031.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 642:
			place("sprite51",canvas,ctx,[-0.9453125,0.3223724365234375,0.271484375,0.7534942626953125,3620.0,-959.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 643:
			place("sprite51",canvas,ctx,[-0.939483642578125,0.3388519287109375,0.28460693359375,0.74859619140625,3621.0,-888.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 644:
			place("sprite51",canvas,ctx,[-0.9333648681640625,0.3552093505859375,0.297637939453125,0.74346923828125,3626.0,-818.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 645:
			place("sprite51",canvas,ctx,[-0.926971435546875,0.3714752197265625,0.3105926513671875,0.7381134033203125,3638.0,-749.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 646:
			place("sprite51",canvas,ctx,[-0.9202880859375,0.387603759765625,0.3234405517578125,0.7325439453125,3657.0,-683.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 647:
			place("sprite51",canvas,ctx,[-0.9133148193359375,0.4036102294921875,0.336212158203125,0.72674560546875,3683.0,-620.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 648:
			place("sprite51",canvas,ctx,[-0.906097412109375,0.4195404052734375,0.348846435546875,0.720733642578125,3714.0,-561.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 649:
			place("sprite51",canvas,ctx,[-0.898590087890625,0.4382476806640625,0.3629913330078125,0.7148590087890625,3752.0,-513.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 650:
			place("sprite51",canvas,ctx,[0.898590087890625,0.4382476806640625,-0.3629913330078125,0.7148590087890625,2418.0,-513.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 651:
			place("sprite51",canvas,ctx,[0.902557373046875,0.427032470703125,-0.3548126220703125,0.7177734375,2522.0,-404.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 652:
			place("sprite51",canvas,ctx,[0.9064483642578125,0.4187164306640625,-0.345855712890625,0.7221527099609375,2637.0,-319.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 653:
			place("sprite51",canvas,ctx,[0.9116058349609375,0.4073944091796875,-0.3391571044921875,0.7252960205078125,2763.0,-244.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 654:
			place("sprite51",canvas,ctx,[0.9152984619140625,0.39898681640625,-0.332489013671875,0.7283935546875,2892.0,-181.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 655:
			place("sprite51",canvas,ctx,[0.92022705078125,0.387542724609375,-0.323394775390625,0.732513427734375,3019.0,-118.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 656:
			place("sprite51",canvas,ctx,[0.923736572265625,0.3790740966796875,-0.316650390625,0.7354583740234375,3152.0,-64.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 657:
			place("sprite51",canvas,ctx,[0.9272003173828125,0.37054443359375,-0.3074493408203125,0.739349365234375,3284.0,-13.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 658:
			place("sprite51",canvas,ctx,[0.9317626953125,0.3589630126953125,-0.300628662109375,0.7421417236328125,3420.0,36.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 659:
			place("sprite51",canvas,ctx,[0.9350128173828125,0.3503875732421875,-0.293792724609375,0.7448883056640625,3558.0,77.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 660:
			place("sprite51",canvas,ctx,[0.9393463134765625,0.33868408203125,-0.2845001220703125,0.748504638671875,3691.0,117.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 661:
			place("sprite51",canvas,ctx,[0.94244384765625,0.3300628662109375,-0.277587890625,0.7510833740234375,3832.0,149.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 662:
			place("sprite51",canvas,ctx,[0.9454345703125,0.3213958740234375,-0.268218994140625,0.7545013427734375,3969.0,176.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 663:
			place("sprite51",canvas,ctx,[0.9493865966796875,0.3095703125,-0.2612762451171875,0.7569427490234375,4109.0,203.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 664:
			place("sprite51",canvas,ctx,[0.952178955078125,0.30084228515625,-0.2518157958984375,0.7601470947265625,4249.0,221.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 665:
			place("sprite51",canvas,ctx,[0.9558563232421875,0.2889556884765625,-0.2448272705078125,0.762451171875,4389.0,238.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 666:
			place("sprite51",canvas,ctx,[0.9585113525390625,0.2801513671875,-0.2378082275390625,0.7646636962890625,4531.0,252.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 667:
			place("sprite51",canvas,ctx,[0.961029052734375,0.271331787109375,-0.2282562255859375,0.7675933837890625,4671.0,264.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 668:
			place("sprite51",canvas,ctx,[0.9643707275390625,0.259368896484375,-0.22119140625,0.769622802734375,4810.0,283.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 669:
			place("sprite51",canvas,ctx,[0.966705322265625,0.2504730224609375,-0.211578369140625,0.7723541259765625,4951.0,296.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 670:
			place("sprite51",canvas,ctx,[0.9697723388671875,0.2384185791015625,-0.204498291015625,0.7742767333984375,5091.0,312.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 671:
			place("sprite51",canvas,ctx,[0.971954345703125,0.2294921875,-0.197357177734375,0.776153564453125,5233.0,327.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 672:
			place("sprite51",canvas,ctx,[0.9747467041015625,0.217376708984375,-0.18768310546875,0.7785491943359375,5372.0,345.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 673:
			place("sprite51",canvas,ctx,[0.9766998291015625,0.208404541015625,-0.180511474609375,0.7802581787109375,5515.0,359.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 674:
			place("sprite51",canvas,ctx,[0.9785919189453125,0.199432373046875,-0.1707763671875,0.7824554443359375,5654.0,374.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 675:
			place("sprite51",canvas,ctx,[0.98101806640625,0.1872100830078125,-0.1635894775390625,0.78399658203125,5795.0,392.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 676:
			place("sprite51",canvas,ctx,[0.982696533203125,0.17822265625,-0.1563873291015625,0.7854766845703125,5938.0,407.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 677:
			place("sprite51",canvas,ctx,[0.9848785400390625,0.16595458984375,-0.1465911865234375,0.7873687744140625,6077.0,426.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 678:
			place("sprite51",canvas,ctx,[0.9863739013671875,0.1569061279296875,-0.13934326171875,0.7886810302734375,6222.0,440.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 679:
			place("sprite51",canvas,ctx,[0.98779296875,0.1478424072265625,-0.1295166015625,0.7903900146484375,6361.0,455.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 680:
			place("sprite51",canvas,ctx,[0.98956298828125,0.135528564453125,-0.1222686767578125,0.79156494140625,6504.0,474.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 681:
			place("sprite51",canvas,ctx,[0.9907989501953125,0.126434326171875,-0.114990234375,0.79266357421875,6646.0,490.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 682:
			place("sprite51",canvas,ctx,[0.9923248291015625,0.1140899658203125,-0.1051025390625,0.794036865234375,6786.0,510.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 683:
			place("sprite51",canvas,ctx,[0.9933319091796875,0.1049957275390625,-0.0978240966796875,0.7949981689453125,6929.0,524.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 684:
			place("sprite51",canvas,ctx,[0.9942626953125,0.09588623046875,-0.087921142578125,0.796173095703125,7071.0,541.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 685:
			place("sprite51",canvas,ctx,[0.995391845703125,0.083465576171875,-0.080596923828125,0.796966552734375,7215.0,560.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 686:
			place("sprite51",canvas,ctx,[0.996124267578125,0.0743408203125,-0.0706787109375,0.7978973388671875,7355.0,577.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 687:
			place("sprite51",canvas,ctx,[0.99700927734375,0.0619354248046875,-0.063323974609375,0.798553466796875,7499.0,599.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 688:
			place("sprite51",canvas,ctx,[0.9975433349609375,0.052764892578125,-0.055999755859375,0.799102783203125,7642.0,614.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 689:
			place("sprite51",canvas,ctx,[0.9980010986328125,0.0436248779296875,-0.046051025390625,0.79974365234375,7783.0,632.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 690:
			place("sprite51",canvas,ctx,[0.9984893798828125,0.0312042236328125,-0.038726806640625,0.8001556396484375,7928.0,652.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 691:
			place("sprite51",canvas,ctx,[0.9987335205078125,0.0220489501953125,-0.0287628173828125,0.8005828857421875,8068.0,664.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 692:
			place("sprite51",canvas,ctx,[0.998992919921875,0.00958251953125,-0.0214080810546875,0.8008270263671875,8211.0,678.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 693:
			place("sprite51",canvas,ctx,[0.9990386962890625,4.425048828125E-4,-0.0140533447265625,0.800994873046875,8356.0,684.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 694:
			place("sprite51",canvas,ctx,[0.99896240234375,-0.0087127685546875,-0.0041046142578125,0.801116943359375,8496.0,685.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 695:
			place("sprite51",canvas,ctx,[0.998779296875,-0.01788330078125,6.256103515625E-4,0.8011474609375,8644.0,681.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 696:
			place("sprite51",canvas,ctx,[0.9985198974609375,-0.0270538330078125,0.0106048583984375,0.8010406494140625,8784.0,675.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 697:
			place("sprite51",canvas,ctx,[0.998046875,-0.039459228515625,0.0179595947265625,0.80084228515625,8928.0,666.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 698:
			place("sprite51",canvas,ctx,[0.997589111328125,-0.048614501953125,0.0252838134765625,0.8006134033203125,9070.0,650.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 699:
			place("sprite51",canvas,ctx,[0.9970703125,-0.061187744140625,0.0362091064453125,0.8002777099609375,9209.0,632.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 700:
			place("sprite51",canvas,ctx,[0.9955291748046875,-0.0785675048828125,0.04931640625,0.79937744140625,9350.0,615.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 701:
			place("sprite51",canvas,ctx,[0.9938812255859375,-0.096038818359375,0.0633544921875,0.798309326171875,9489.0,593.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 702:
			place("sprite51",canvas,ctx,[0.9919586181640625,-0.113494873046875,0.0773773193359375,0.7969818115234375,9627.0,567.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 703:
			place("sprite51",canvas,ctx,[0.9897308349609375,-0.1309356689453125,0.091400146484375,0.7954254150390625,9765.0,536.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 704:
			place("sprite51",canvas,ctx,[0.9871673583984375,-0.1483306884765625,0.1053466796875,0.793609619140625,9900.0,499.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 705:
			place("sprite51",canvas,ctx,[0.9842987060546875,-0.1656341552734375,0.121856689453125,0.791168212890625,10033.0,460.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 706:
			place("sprite51",canvas,ctx,[0.98114013671875,-0.18292236328125,0.1357421875,0.788818359375,10164.0,415.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 707:
			place("sprite51",canvas,ctx,[0.977691650390625,-0.2001495361328125,0.14959716796875,0.7862396240234375,10295.0,367.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 708:
			place("sprite51",canvas,ctx,[0.9731903076171875,-0.220489501953125,0.1633758544921875,0.7834014892578125,10425.0,318.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 709:
			place("sprite51",canvas,ctx,[0.9690704345703125,-0.237548828125,0.1771240234375,0.7803497314453125,10551.0,261.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 710:
			place("sprite51",canvas,ctx,[0.964630126953125,-0.2545928955078125,0.1908111572265625,0.77703857421875,10678.0,200.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 711:
			place("sprite51",canvas,ctx,[0.9599151611328125,-0.271484375,0.204437255859375,0.7734832763671875,10800.0,136.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 712:
			place("sprite51",canvas,ctx,[0.9548797607421875,-0.288330078125,0.218017578125,0.769683837890625,10920.0,67.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 713:
			place("sprite51",canvas,ctx,[0.9495697021484375,-0.3050689697265625,0.23150634765625,0.7656707763671875,11039.0,-3.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 714:
			place("sprite51",canvas,ctx,[0.9439697265625,-0.3217010498046875,0.2474212646484375,0.7605743408203125,11153.0,-75.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 715:
			place("sprite51",canvas,ctx,[0.938079833984375,-0.3382720947265625,0.2607574462890625,0.75604248046875,11271.0,-150.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 716:
			place("sprite51",canvas,ctx,[0.9307098388671875,-0.3577880859375,0.2740020751953125,0.75128173828125,11386.0,-220.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 717:
			place("sprite51",canvas,ctx,[0.9241943359375,-0.37408447265625,0.28717041015625,0.74627685546875,11506.0,-293.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 718:
			place("sprite51",canvas,ctx,[0.9173583984375,-0.390289306640625,0.30023193359375,0.74102783203125,11625.0,-365.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 719:
			place("sprite51",canvas,ctx,[0.9102783203125,-0.406341552734375,0.3132171630859375,0.735595703125,11746.0,-437.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 720:
			place("sprite51",canvas,ctx,[0.90289306640625,-0.42230224609375,0.3260955810546875,0.7298736572265625,11867.0,-507.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 721:
			place("sprite51",canvas,ctx,[0.895233154296875,-0.4380950927734375,0.3388824462890625,0.723968505859375,11990.0,-575.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 722:
			place("sprite51",canvas,ctx,[0.8873138427734375,-0.4537811279296875,0.3515625,0.7178192138671875,12113.0,-643.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 723:
			place("sprite51",canvas,ctx,[0.879119873046875,-0.4693145751953125,0.366455078125,0.71026611328125,12234.0,-710.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 724:
			place("sprite51",canvas,ctx,[0.870635986328125,-0.4846954345703125,0.378875732421875,0.703643798828125,12360.0,-775.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 725:
			place("sprite51",canvas,ctx,[0.8602447509765625,-0.5027618408203125,0.391204833984375,0.6968231201171875,12488.0,-837.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 726:
			place("sprite51",canvas,ctx,[0.8511962890625,-0.517822265625,0.40338134765625,0.68975830078125,12618.0,-903.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 727:
			place("sprite51",canvas,ctx,[0.8418731689453125,-0.5327301025390625,0.4154510498046875,0.6824798583984375,12741.0,-974.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 728:
			place("sprite51",canvas,ctx,[0.8322906494140625,-0.54742431640625,0.4273834228515625,0.675018310546875,12865.0,-1047.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 729:
			place("sprite51",canvas,ctx,[0.822479248046875,-0.5619964599609375,0.439178466796875,0.6673431396484375,12987.0,-1117.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 730:
			place("sprite51",canvas,ctx,[0.8123626708984375,-0.576385498046875,0.4508514404296875,0.6594696044921875,13113.0,-1189.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 731:
			place("sprite51",canvas,ctx,[0.8020172119140625,-0.590576171875,0.462371826171875,0.6513671875,13237.0,-1260.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 732:
			place("sprite51",canvas,ctx,[0.79144287109375,-0.6045684814453125,0.4737548828125,0.6430816650390625,13361.0,-1330.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 733:
			place("sprite51",canvas,ctx,[0.7785797119140625,-0.6209869384765625,0.487060546875,0.6329803466796875,13489.0,-1397.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 734:
			place("sprite51",canvas,ctx,[0.769256591796875,-0.63494873046875,0.4985809326171875,0.6255645751953125,13615.0,-1469.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 735:
			place("sprite51",canvas,ctx,[0.7673187255859375,-0.6348114013671875,0.498321533203125,0.6241607666015625,13744.0,-1562.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 736:
			place("sprite51",canvas,ctx,[0.767181396484375,-0.635040283203125,0.4985198974609375,0.6240386962890625,13868.0,-1655.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 737:
			place("sprite51",canvas,ctx,[0.7670135498046875,-0.635284423828125,0.5007781982421875,0.622283935546875,13994.0,-1746.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 738:
			place("sprite51",canvas,ctx,[0.7647857666015625,-0.6380462646484375,0.5009765625,0.622161865234375,14124.0,-1838.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 739:
			place("sprite51",canvas,ctx,[0.764617919921875,-0.638275146484375,0.50115966796875,0.622039794921875,14248.0,-1930.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 740:
			place("sprite51",canvas,ctx,[0.7644805908203125,-0.638519287109375,0.501373291015625,0.621917724609375,14376.0,-2023.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 741:
			place("sprite51",canvas,ctx,[0.7643280029296875,-0.6387481689453125,0.50360107421875,0.6201324462890625,14500.0,-2113.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 742:
			place("sprite51",canvas,ctx,[0.7620697021484375,-0.6414947509765625,0.5037994384765625,0.6199951171875,14631.0,-2204.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 743:
			place("sprite51",canvas,ctx,[0.7619171142578125,-0.6417236328125,0.503997802734375,0.6198883056640625,14758.0,-2294.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 744:
			place("sprite51",canvas,ctx,[0.76177978515625,-0.6419525146484375,0.5041656494140625,0.6197509765625,14887.0,-2387.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 745:
			place("sprite51",canvas,ctx,[0.761627197265625,-0.6421966552734375,0.5063934326171875,0.61798095703125,15011.0,-2476.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 746:
			place("sprite51",canvas,ctx,[0.7593841552734375,-0.644927978515625,0.506622314453125,0.61785888671875,15143.0,-2564.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 747:
			place("sprite51",canvas,ctx,[0.7592010498046875,-0.645172119140625,0.5067901611328125,0.6177215576171875,15270.0,-2654.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 748:
			place("sprite51",canvas,ctx,[0.759063720703125,-0.6454010009765625,0.5070037841796875,0.61761474609375,15399.0,-2745.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 749:
			place("sprite51",canvas,ctx,[0.7589263916015625,-0.6456451416015625,0.5092010498046875,0.6158294677734375,15526.0,-2833.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 750:
			place("sprite51",canvas,ctx,[0.756622314453125,-0.648345947265625,0.5094146728515625,0.615692138671875,15658.0,-2920.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 751:
			place("sprite51",canvas,ctx,[0.7564697265625,-0.648590087890625,0.5095977783203125,0.6155853271484375,15787.0,-3010.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 752:
			place("sprite51",canvas,ctx,[0.7563323974609375,-0.6488494873046875,0.5098114013671875,0.615447998046875,15918.0,-3096.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 753:
			place("sprite51",canvas,ctx,[0.7561798095703125,-0.6490631103515625,0.5120086669921875,0.6136474609375,16050.0,-3176.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 754:
			place("sprite51",canvas,ctx,[0.7538604736328125,-0.6517791748046875,0.51220703125,0.613525390625,16188.0,-3248.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 755:
			place("sprite51",canvas,ctx,[0.753753662109375,-0.6520233154296875,0.5124053955078125,0.6133880615234375,16329.0,-3319.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 756:
			place("sprite51",canvas,ctx,[0.7535858154296875,-0.6522369384765625,0.5146026611328125,0.611572265625,16472.0,-3382.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 757:
			place("sprite51",canvas,ctx,[0.75341796875,-0.6524810791015625,0.514801025390625,0.6114654541015625,16618.0,-3439.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 758:
			place("sprite51",canvas,ctx,[0.751129150390625,-0.655181884765625,0.514984130859375,0.6113433837890625,16767.0,-3489.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 759:
			place("sprite51",canvas,ctx,[0.7509918212890625,-0.6554107666015625,0.51519775390625,0.6111907958984375,16920.0,-3534.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 760:
			place("sprite51",canvas,ctx,[0.750823974609375,-0.6556549072265625,0.51739501953125,0.6093597412109375,17069.0,-3573.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 761:
			place("sprite51",canvas,ctx,[0.7485198974609375,-0.658355712890625,0.517578125,0.6092529296875,17225.0,-3599.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 762:
			place("sprite51",canvas,ctx,[0.74993896484375,-0.6592559814453125,0.5189666748046875,0.609832763671875,17378.0,-3613.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 763:
			place("sprite51",canvas,ctx,[-0.8950042724609375,-0.4427032470703125,-0.34344482421875,0.723358154296875,21421.0,-4461.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 764:
			place("sprite51",canvas,ctx,[-0.9016571044921875,-0.4260711669921875,-0.3292388916015625,0.728851318359375,21331.0,-4649.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 765:
			place("sprite51",canvas,ctx,[-0.910400390625,-0.4071197509765625,-0.3163604736328125,0.7345733642578125,21301.0,-4858.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 766:
			place("sprite51",canvas,ctx,[-0.91748046875,-0.391021728515625,-0.3033599853515625,0.740081787109375,21301.0,-5067.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 767:
			place("sprite51",canvas,ctx,[-0.9242706298828125,-0.374786376953125,-0.290252685546875,0.7453460693359375,21265.0,-5276.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 768:
			place("sprite51",canvas,ctx,[-0.9307708740234375,-0.3584136962890625,-0.274627685546875,0.7512969970703125,21204.0,-5479.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 769:
			place("sprite51",canvas,ctx,[-0.9369964599609375,-0.34197998046875,-0.2613372802734375,0.7560577392578125,21111.0,-5670.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 770:
			place("sprite51",canvas,ctx,[-0.9429168701171875,-0.32537841796875,-0.2479705810546875,0.7605743408203125,20992.0,-5845.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 771:
			place("sprite51",canvas,ctx,[-0.9485626220703125,-0.3087158203125,-0.234527587890625,0.7648773193359375,20861.0,-6007.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 772:
			place("sprite51",canvas,ctx,[-0.9539337158203125,-0.291961669921875,-0.2210235595703125,0.7689361572265625,20723.0,-6181.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 773:
			place("sprite51",canvas,ctx,[-0.9598541259765625,-0.27197265625,-0.2074432373046875,0.772735595703125,20588.0,-6361.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 774:
			place("sprite51",canvas,ctx,[-0.9645538330078125,-0.2550048828125,-0.19378662109375,0.776336669921875,20458.0,-6531.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 775:
			place("sprite51",canvas,ctx,[-0.968963623046875,-0.23797607421875,-0.1775360107421875,0.780242919921875,20328.0,-6700.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 776:
			place("sprite51",canvas,ctx,[-0.973052978515625,-0.2208709716796875,-0.16375732421875,0.7833099365234375,20205.0,-6861.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 777:
			place("sprite51",canvas,ctx,[-0.976837158203125,-0.2036895751953125,-0.149932861328125,0.786102294921875,20086.0,-7019.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 778:
			place("sprite51",canvas,ctx,[-0.9803314208984375,-0.18646240234375,-0.1360626220703125,0.7886505126953125,19966.0,-7176.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 779:
			place("sprite51",canvas,ctx,[-0.9835205078125,-0.1691741943359375,-0.122161865234375,0.79095458984375,19846.0,-7332.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 780:
			place("sprite51",canvas,ctx,[-0.9868927001953125,-0.1485748291015625,-0.1082000732421875,0.7930450439453125,19712.0,-7491.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 781:
			place("sprite51",canvas,ctx,[-0.9894256591796875,-0.13116455078125,-0.094207763671875,0.79486083984375,19560.0,-7644.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 782:
			place("sprite51",canvas,ctx,[-0.9916534423828125,-0.1137237548828125,-0.077606201171875,0.7967071533203125,19401.0,-7790.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 783:
			place("sprite51",canvas,ctx,[-0.9935302734375,-0.0962371826171875,-0.0635528564453125,0.7979888916015625,19241.0,-7929.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 784:
			place("sprite51",canvas,ctx,[-0.995147705078125,-0.0787506103515625,-0.04949951171875,0.7990264892578125,19079.0,-8062.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 785:
			place("sprite51",canvas,ctx,[-0.9964141845703125,-0.06121826171875,-0.0354156494140625,0.799835205078125,18914.0,-8191.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 786:
			place("sprite51",canvas,ctx,[-0.997406005859375,-0.0436553955078125,-0.021331787109375,0.800384521484375,18748.0,-8318.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 787:
			place("sprite51",canvas,ctx,[-0.9981842041015625,-0.0228118896484375,-0.0072479248046875,0.800689697265625,18563.0,-8421.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 788:
			place("sprite51",canvas,ctx,[-0.9984893798828125,-0.0052490234375,0.0042266845703125,0.8007049560546875,18364.0,-8473.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 789:
			place("sprite51",canvas,ctx,[-0.9984283447265625,0.0090484619140625,0.018341064453125,0.80047607421875,18173.0,-8523.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 790:
			place("sprite51",canvas,ctx,[-0.9980621337890625,0.0266265869140625,0.0350341796875,0.7998504638671875,17984.0,-8597.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 791:
			place("sprite51",canvas,ctx,[-0.99737548828125,0.0442047119140625,0.0491180419921875,0.799072265625,17779.0,-8634.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 792:
			place("sprite51",canvas,ctx,[-0.9964447021484375,0.064117431640625,0.064239501953125,0.7981719970703125,17584.0,-8703.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 793:
			place("sprite51",canvas,ctx,[-0.9954833984375,0.074493408203125,0.0733795166015625,0.7971343994140625,17301.0,-8769.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 794:
			place("sprite51",canvas,ctx,[-0.9944000244140625,0.08721923828125,0.0809783935546875,0.79638671875,17006.0,-8768.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 795:
			place("sprite51",canvas,ctx,[-0.9934844970703125,0.0966796875,0.0911712646484375,0.795257568359375,16710.0,-8728.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 796:
			place("sprite51",canvas,ctx,[-0.99212646484375,0.1093902587890625,0.1013336181640625,0.7939910888671875,16417.0,-8664.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 797:
			place("sprite51",canvas,ctx,[-0.9906158447265625,0.1220703125,0.1114959716796875,0.7925872802734375,16126.0,-8583.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 798:
			place("sprite51",canvas,ctx,[-0.9889373779296875,0.1347503662109375,0.1190185546875,0.7914886474609375,15844.0,-8496.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 799:
			place("sprite51",canvas,ctx,[-0.9875640869140625,0.1441650390625,0.129150390625,0.7898712158203125,15555.0,-8395.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 800:
			place("sprite51",canvas,ctx,[-0.985595703125,0.15679931640625,0.139251708984375,0.7881317138671875,15265.0,-8295.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 801:
			place("sprite51",canvas,ctx,[-0.9834442138671875,0.169403076171875,0.1467437744140625,0.7867431640625,14982.0,-8197.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 802:
			place("sprite51",canvas,ctx,[-0.9811859130859375,0.1819610595703125,0.1568145751953125,0.784759521484375,14701.0,-8098.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 803:
			place("sprite51",canvas,ctx,[-0.9793701171875,0.1912994384765625,0.1668548583984375,0.782684326171875,14424.0,-7997.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 804:
			place("sprite51",canvas,ctx,[-0.976806640625,0.203826904296875,0.176849365234375,0.78045654296875,14155.0,-7902.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 805:
			place("sprite51",canvas,ctx,[-0.974090576171875,0.21630859375,0.1842803955078125,0.778717041015625,13890.0,-7807.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 806:
			place("sprite51",canvas,ctx,[-0.9719390869140625,0.2255859375,0.194244384765625,0.776275634765625,13623.0,-7710.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 807:
			place("sprite51",canvas,ctx,[-0.96893310546875,0.2380218505859375,0.20416259765625,0.7736968994140625,13355.0,-7616.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 808:
			place("sprite51",canvas,ctx,[-0.9657745361328125,0.2504119873046875,0.21405029296875,0.77099609375,13086.0,-7521.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 809:
			place("sprite51",canvas,ctx,[-0.96246337890625,0.26275634765625,0.22137451171875,0.7689056396484375,12819.0,-7427.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 810:
			place("sprite51",canvas,ctx,[-0.9598846435546875,0.27191162109375,0.2312164306640625,0.7659759521484375,12549.0,-7326.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 811:
			place("sprite51",canvas,ctx,[-0.9563140869140625,0.2841796875,0.240997314453125,0.762908935546875,12274.0,-7229.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 812:
			place("sprite51",canvas,ctx,[-0.9525299072265625,0.2964019775390625,0.248260498046875,0.760589599609375,11999.0,-7131.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 813:
			place("sprite51",canvas,ctx,[-0.948638916015625,0.308563232421875,0.2579803466796875,0.7573089599609375,11722.0,-7030.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 814:
			place("sprite51",canvas,ctx,[-0.94561767578125,0.3176116943359375,0.2676544189453125,0.75390625,11450.0,-6923.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 815:
			place("sprite51",canvas,ctx,[-0.9414520263671875,0.329681396484375,0.2772979736328125,0.7504119873046875,11175.0,-6814.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 816:
			place("sprite51",canvas,ctx,[-0.937103271484375,0.341705322265625,0.2844390869140625,0.747711181640625,10906.0,-6705.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 817:
			place("sprite51",canvas,ctx,[-0.93377685546875,0.3506317138671875,0.2939910888671875,0.7439727783203125,10634.0,-6587.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 818:
			place("sprite51",canvas,ctx,[-0.929168701171875,0.3625640869140625,0.303497314453125,0.740142822265625,10364.0,-6472.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 819:
			place("sprite51",canvas,ctx,[-0.9244232177734375,0.3744354248046875,0.312957763671875,0.736175537109375,10094.0,-6352.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 820:
			place("sprite51",canvas,ctx,[-0.919525146484375,0.3862457275390625,0.3199615478515625,0.733154296875,9827.0,-6231.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 821:
			place("sprite51",canvas,ctx,[-0.915771484375,0.3949737548828125,0.3293304443359375,0.7289581298828125,9563.0,-6101.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 822:
			place("sprite51",canvas,ctx,[-0.910614013671875,0.4066925048828125,0.3386383056640625,0.72467041015625,9296.0,-5971.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 823:
			place("sprite51",canvas,ctx,[-0.9052886962890625,0.418304443359375,0.3455352783203125,0.72137451171875,9036.0,-5838.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 824:
			place("sprite51",canvas,ctx,[-0.89984130859375,0.4298858642578125,0.354766845703125,0.716888427734375,8773.0,-5700.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 825:
			place("sprite51",canvas,ctx,[-0.8956756591796875,0.4384307861328125,0.363922119140625,0.7122650146484375,8514.0,-5556.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 826:
			place("sprite51",canvas,ctx,[-0.88995361328125,0.44989013671875,0.373016357421875,0.70751953125,8256.0,-5408.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 827:
			place("sprite51",canvas,ctx,[-0.8840789794921875,0.4612579345703125,0.3797454833984375,0.7039337158203125,8002.0,-5260.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 828:
			place("sprite51",canvas,ctx,[-0.8796234130859375,0.46966552734375,0.38873291015625,0.698974609375,7750.0,-5104.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 829:
			place("sprite51",canvas,ctx,[-0.8734893798828125,0.48089599609375,0.3976593017578125,0.6939239501953125,7499.0,-4946.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 830:
			place("sprite51",canvas,ctx,[-0.8672637939453125,0.4920501708984375,0.4065399169921875,0.68878173828125,7248.0,-4782.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 831:
			place("sprite51",canvas,ctx,[-0.86083984375,0.5031280517578125,0.4131011962890625,0.684844970703125,6995.0,-4612.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 832:
			place("sprite51",canvas,ctx,[-0.855987548828125,0.5113067626953125,0.4218292236328125,0.679473876953125,6745.0,-4437.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 833:
			place("sprite51",canvas,ctx,[-0.849334716796875,0.5222320556640625,0.430511474609375,0.6739959716796875,6500.0,-4268.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 834:
			place("sprite51",canvas,ctx,[-0.842559814453125,0.5330963134765625,0.4369049072265625,0.6698455810546875,6257.0,-4103.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 835:
			place("sprite51",canvas,ctx,[-0.8356170654296875,0.543853759765625,0.4454803466796875,0.6641845703125,6007.0,-3940.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 836:
			place("sprite51",canvas,ctx,[-0.83038330078125,0.551788330078125,0.4539642333984375,0.658416748046875,5758.0,-3778.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 837:
			place("sprite51",canvas,ctx,[-0.823211669921875,0.5623779296875,0.46234130859375,0.65252685546875,5503.0,-3624.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 838:
			place("sprite51",canvas,ctx,[-0.81591796875,0.5729217529296875,0.4685516357421875,0.6480865478515625,5248.0,-3475.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 839:
			place("sprite51",canvas,ctx,[-0.8104095458984375,0.5806884765625,0.4768524169921875,0.6420135498046875,4990.0,-3324.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 840:
			place("sprite51",canvas,ctx,[-0.802886962890625,0.59100341796875,0.48504638671875,0.635833740234375,4726.0,-3181.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 841:
			place("sprite51",canvas,ctx,[-0.79522705078125,0.60125732421875,0.4931640625,0.629547119140625,4460.0,-3046.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 842:
			place("sprite51",canvas,ctx,[-0.7874298095703125,0.611419677734375,0.4991607666015625,0.6248321533203125,4193.0,-2913.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 843:
			place("sprite51",canvas,ctx,[-0.7815704345703125,0.6189117431640625,0.507110595703125,0.6183624267578125,3919.0,-2781.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 844:
			place("sprite51",canvas,ctx,[-0.7735443115234375,0.628875732421875,0.5150146484375,0.6118011474609375,3633.0,-2654.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 845:
			place("sprite51",canvas,ctx,[-0.765411376953125,0.6387481689453125,0.5208587646484375,0.6068572998046875,3349.0,-2533.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 846:
			place("sprite51",canvas,ctx,[-0.75714111328125,0.6485137939453125,0.5285797119140625,0.600128173828125,3068.0,-2412.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 847:
			place("sprite51",canvas,ctx,[-0.7509002685546875,0.655731201171875,0.5362396240234375,0.593292236328125,2787.0,-2292.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 848:
			place("sprite51",canvas,ctx,[-0.742431640625,0.6652984619140625,0.5438232421875,0.58636474609375,2506.0,-2177.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 849:
			place("sprite51",canvas,ctx,[-0.7338104248046875,0.674774169921875,0.5493927001953125,0.581146240234375,2230.0,-2065.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 850:
			place("sprite51",canvas,ctx,[-0.7273406982421875,0.6817474365234375,0.556793212890625,0.57403564453125,1959.0,-1949.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 851:
			place("sprite51",canvas,ctx,[-0.7185211181640625,0.6910247802734375,0.564117431640625,0.566864013671875,1688.0,-1830.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 852:
			place("sprite51",canvas,ctx,[-0.7095947265625,0.7001953125,0.5713653564453125,0.5595855712890625,1434.0,-1675.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 853:
			place("sprite51",canvas,ctx,[-0.7005615234375,0.709228515625,0.57666015625,0.5540924072265625,1245.0,-1455.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 854:
			place("sprite51",canvas,ctx,[-0.693756103515625,0.715911865234375,0.5837554931640625,0.546661376953125,1178.0,-1176.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 855:
			place("sprite51",canvas,ctx,[-0.68450927734375,0.7247314453125,0.5907440185546875,0.5391387939453125,1253.0,-905.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 856:
			place("sprite51",canvas,ctx,[-0.675140380859375,0.73345947265625,0.595855712890625,0.5334625244140625,1380.0,-677.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 857:
			place("sprite51",canvas,ctx,[-0.6656951904296875,0.7420654296875,0.6026763916015625,0.5257720947265625,1448.0,-406.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 858:
			place("sprite51",canvas,ctx,[-0.6591796875,0.75006103515625,0.6100006103515625,0.519256591796875,1483.0,-112.0],ctrans,1,(0+time)%1,0,time);
			break;
	}
}

var imageObj53 = document.createElement("img");
imageObj53.src="data:image/PNG;base64,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";
function image53(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 0 1780 2600 1780 2600 0 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape54(ctx,ctrans,frame,ratio,time){
	var pathData="M 2043 654 L 2070 1010 2091 1013 Q 1844 1308 1757 1662 1595 1667 1443 1660 1451 1661 1455 1665 1507 1720 1571 1762 L 1250 1762 1320 1760 Q 1081 1729 900 1640 666 1554 420 1480 360 1409 267 1371 L 290 1330 272 1177 34 1177 25 1164 Q 15 1157 0 1160 L 0 1100 16 1078 25 1065 35 1055 45 1045 55 1035 65 1025 Q 70 1020 80 1020 L 80 1000 80 980 80 960 80 940 Q 182 732 328 569 447 437 589 329 673 265 765 209 L 776 203 796 192 Q 800 190 800 180 969 107 1165 68 L 1167 72 Q 1545 159 1823 410 1944 520 2043 654 M 1167 72 L 1160 70 1170 80 1167 72";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape55(ctx,ctrans,frame,ratio,time){
	var pathData="M 233 194 L 206 183 126 123 Q 53 106 6 63 L 6 43 0 0 238 0 256 153 233 194";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-34,-1177);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function shape56(ctx,ctrans,frame,ratio,time){
	var pathData="M 263 194 L 235 191 142 153 Q 67 156 10 127 L 5 107 Q -2 80 -12 67 L 275 -4 275 149 263 194";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(19.31854248046875,-5.1763916015625,5.1763916015625,19.31854248046875,-350,-1061);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function morphshape57(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 -12 0 67 Q 3 -2 22 80 6 5 43 107 L 6 10 63 127 Q 53 67 106 156 126 142 123 153 L 206 235 183 191 233 263 194 194 256 275 153 149 238 275 0 -4 0 -12 0 67";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-0.68145751953125)/65535,0.0+ratio*(-5.1763916015625)/65535,0.0+ratio*(5.1763916015625)/65535,20.0+ratio*(-0.68145751953125)/65535,-34.0+ratio*(-316)/65535,-1177.0+ratio*(116)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 -12 0 67 L 238 275 0 -4 256 275 153 149 233 263 194 194 206 235 183 191 126 142 123 153 Q 53 67 106 156 6 10 63 127 L 6 5 43 107 Q 3 -2 22 80 0 -12 0 67 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function sprite58(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 30;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("shape56",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 2:
			place("morphshape57",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 3:
			place("morphshape57",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 4:
			place("shape56",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 5:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 6:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 7:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 8:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 9:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 10:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 11:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 12:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 13:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 14:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 15:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 16:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 17:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 18:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 19:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 20:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 21:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 22:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 23:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 24:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 25:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 26:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 27:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 28:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 29:
			place("shape55",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function morphshape59(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 -10 269 269 L 27 35 625 625 107 169 635 635 140 224 656 656 141 226 657 657 159 255 668 668 165 266 667 667 170 274 666 666 176 285 666 666 Q 212 344 665 665 250 408 693 693 L 251 409 693 693 266 435 705 705 Q 277 453 715 715 297 487 715 715 398 656 801 801 517 855 775 775 L 534 883 734 734 Q 547 905 690 690 557 922 735 735 L 557 922 235 235 542 897 230 230 Q 537 888 225 225 538 890 215 215 546 903 97 97 517 855 15 15 L 481 795 7 7 475 785 4 4 Q 424 699 -8 -8 397 654 15 15 395 654 21 25 393 648 27 27 377 621 35 35 366 602 45 45 233 380 161 161 77 119 255 255 L 77 119 246 246 27 35 305 305 0 -10 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-2043.0+ratio*(-1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 -10 269 269 L 27 35 305 305 77 119 246 246 77 119 255 255 Q 233 380 161 161 366 602 45 45 377 621 35 35 393 648 27 27 395 654 21 25 397 654 15 15 424 699 -8 -8 475 785 4 4 L 481 795 7 7 517 855 15 15 Q 546 903 97 97 538 890 215 215 537 888 225 225 542 897 230 230 L 557 922 235 235 557 922 735 735 Q 547 905 690 690 534 883 734 734 L 517 855 775 775 Q 398 656 801 801 297 487 715 715 277 453 715 715 266 435 705 705 L 251 409 693 693 250 408 693 693 Q 212 344 665 665 176 285 666 666 L 170 274 666 666 165 266 667 667 159 255 668 668 141 226 657 657 140 224 656 656 107 169 635 635 27 35 625 625 0 -10 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape60(ctx,ctrans,frame,ratio,time){
	var pathData="M -10 0 269 269 L 35 27 625 625 169 107 635 635 224 140 656 656 226 141 657 657 255 159 668 668 266 165 667 667 274 170 666 666 285 176 666 666 Q 344 212 665 665 408 250 693 693 L 409 251 693 693 435 266 705 705 Q 453 277 715 715 487 297 715 715 656 398 801 801 855 517 775 775 L 883 534 734 734 Q 905 547 690 690 922 557 735 735 L 922 557 235 235 897 542 230 230 Q 888 537 225 225 890 538 215 215 903 546 97 97 855 517 15 15 L 795 481 7 7 785 475 4 4 Q 699 424 -8 -8 654 397 15 15 654 395 25 21 648 393 27 27 621 377 35 35 602 366 45 45 380 233 161 161 119 77 255 255 L 119 77 246 246 35 27 305 305 -10 0 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(33.45123291015625+ratio*(-13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-3427.0+ratio*(1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M -10 0 269 269 L 35 27 305 305 119 77 246 246 119 77 255 255 Q 380 233 161 161 602 366 45 45 621 377 35 35 648 393 27 27 654 395 25 21 654 397 15 15 699 424 -8 -8 785 475 4 4 L 795 481 7 7 855 517 15 15 Q 903 546 97 97 890 538 215 215 888 537 225 225 897 542 230 230 L 922 557 235 235 922 557 735 735 Q 905 547 690 690 883 534 734 734 L 855 517 775 775 Q 656 398 801 801 487 297 715 715 453 277 715 715 435 266 705 705 L 409 251 693 693 408 250 693 693 Q 344 212 665 665 285 176 666 666 L 274 170 666 666 266 165 667 667 255 159 668 668 226 141 657 657 224 140 656 656 169 107 635 635 35 27 625 625 -10 0 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape61(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 -10 269 269 L 27 35 625 625 107 169 635 635 140 224 656 656 141 226 657 657 159 255 668 668 165 266 667 667 170 274 666 666 176 285 666 666 Q 212 344 665 665 250 408 693 693 L 251 409 693 693 266 435 705 705 Q 277 453 715 715 297 487 715 715 398 656 801 801 517 855 775 775 L 534 883 734 734 Q 547 905 690 690 557 922 735 735 L 557 922 235 235 542 897 230 230 Q 537 888 225 225 538 890 215 215 546 903 97 97 517 855 15 15 L 481 795 7 7 475 785 4 4 Q 424 699 -8 -8 397 654 15 15 395 654 21 25 393 648 27 27 377 621 35 35 366 602 45 45 233 380 161 161 77 119 255 255 L 77 119 246 246 27 35 305 305 0 -10 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-2043.0+ratio*(-1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 -10 269 269 L 27 35 305 305 77 119 246 246 77 119 255 255 Q 233 380 161 161 366 602 45 45 377 621 35 35 393 648 27 27 395 654 21 25 397 654 15 15 424 699 -8 -8 475 785 4 4 L 481 795 7 7 517 855 15 15 Q 546 903 97 97 538 890 215 215 537 888 225 225 542 897 230 230 L 557 922 235 235 557 922 735 735 Q 547 905 690 690 534 883 734 734 L 517 855 775 775 Q 398 656 801 801 297 487 715 715 277 453 715 715 266 435 705 705 L 251 409 693 693 250 408 693 693 Q 212 344 665 665 176 285 666 666 L 170 274 666 666 165 266 667 667 159 255 668 668 141 226 657 657 140 224 656 656 107 169 635 635 27 35 625 625 0 -10 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape62(ctx,ctrans,frame,ratio,time){
	var pathData="M -10 0 269 269 L 35 27 625 625 169 107 635 635 224 140 656 656 226 141 657 657 255 159 668 668 266 165 667 667 274 170 666 666 285 176 666 666 Q 344 212 665 665 408 250 693 693 L 409 251 693 693 435 266 705 705 Q 453 277 715 715 487 297 715 715 656 398 801 801 855 517 775 775 L 883 534 734 734 Q 905 547 690 690 922 557 735 735 L 922 557 235 235 897 542 230 230 Q 888 537 225 225 890 538 215 215 903 546 97 97 855 517 15 15 L 795 481 7 7 785 475 4 4 Q 699 424 -8 -8 654 397 15 15 654 395 25 21 648 393 27 27 621 377 35 35 602 366 45 45 380 233 161 161 119 77 255 255 L 119 77 246 246 35 27 305 305 -10 0 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(33.45123291015625+ratio*(-13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-3427.0+ratio*(1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M -10 0 269 269 L 35 27 305 305 119 77 246 246 119 77 255 255 Q 380 233 161 161 602 366 45 45 621 377 35 35 648 393 27 27 654 395 25 21 654 397 15 15 699 424 -8 -8 785 475 4 4 L 795 481 7 7 855 517 15 15 Q 903 546 97 97 890 538 215 215 888 537 225 225 897 542 230 230 L 922 557 235 235 922 557 735 735 Q 905 547 690 690 883 534 734 734 L 855 517 775 775 Q 656 398 801 801 487 297 715 715 453 277 715 715 435 266 705 705 L 409 251 693 693 408 250 693 693 Q 344 212 665 665 285 176 666 666 L 274 170 666 666 266 165 667 667 255 159 668 668 226 141 657 657 224 140 656 656 169 107 635 635 35 27 625 625 -10 0 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape63(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 -10 269 269 L 27 35 625 625 107 169 635 635 140 224 656 656 141 226 657 657 159 255 668 668 165 266 667 667 170 274 666 666 176 285 666 666 Q 212 344 665 665 250 408 693 693 L 251 409 693 693 266 435 705 705 Q 277 453 715 715 297 487 715 715 398 656 801 801 517 855 775 775 L 534 883 734 734 Q 547 905 690 690 557 922 735 735 L 557 922 235 235 542 897 230 230 Q 537 888 225 225 538 890 215 215 546 903 97 97 517 855 15 15 L 481 795 7 7 475 785 4 4 Q 424 699 -8 -8 397 654 15 15 395 654 21 25 393 648 27 27 377 621 35 35 366 602 45 45 233 380 161 161 77 119 255 255 L 77 119 246 246 27 35 305 305 0 -10 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-2043.0+ratio*(-1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 -10 269 269 L 27 35 305 305 77 119 246 246 77 119 255 255 Q 233 380 161 161 366 602 45 45 377 621 35 35 393 648 27 27 395 654 21 25 397 654 15 15 424 699 -8 -8 475 785 4 4 L 481 795 7 7 517 855 15 15 Q 546 903 97 97 538 890 215 215 537 888 225 225 542 897 230 230 L 557 922 235 235 557 922 735 735 Q 547 905 690 690 534 883 734 734 L 517 855 775 775 Q 398 656 801 801 297 487 715 715 277 453 715 715 266 435 705 705 L 251 409 693 693 250 408 693 693 Q 212 344 665 665 176 285 666 666 L 170 274 666 666 165 266 667 667 159 255 668 668 141 226 657 657 140 224 656 656 107 169 635 635 27 35 625 625 0 -10 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape64(ctx,ctrans,frame,ratio,time){
	var pathData="M -10 0 269 269 L 35 27 625 625 169 107 635 635 224 140 656 656 226 141 657 657 255 159 668 668 266 165 667 667 274 170 666 666 285 176 666 666 Q 344 212 665 665 408 250 693 693 L 409 251 693 693 435 266 705 705 Q 453 277 715 715 487 297 715 715 656 398 801 801 855 517 775 775 L 883 534 734 734 Q 905 547 690 690 922 557 735 735 L 922 557 235 235 897 542 230 230 Q 888 537 225 225 890 538 215 215 903 546 97 97 855 517 15 15 L 795 481 7 7 785 475 4 4 Q 699 424 -8 -8 654 397 15 15 654 395 25 21 648 393 27 27 621 377 35 35 602 366 45 45 380 233 161 161 119 77 255 255 L 119 77 246 246 35 27 305 305 -10 0 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(33.45123291015625+ratio*(-13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-3427.0+ratio*(1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M -10 0 269 269 L 35 27 305 305 119 77 246 246 119 77 255 255 Q 380 233 161 161 602 366 45 45 621 377 35 35 648 393 27 27 654 395 25 21 654 397 15 15 699 424 -8 -8 785 475 4 4 L 795 481 7 7 855 517 15 15 Q 903 546 97 97 890 538 215 215 888 537 225 225 897 542 230 230 L 922 557 235 235 922 557 735 735 Q 905 547 690 690 883 534 734 734 L 855 517 775 775 Q 656 398 801 801 487 297 715 715 453 277 715 715 435 266 705 705 L 409 251 693 693 408 250 693 693 Q 344 212 665 665 285 176 666 666 L 274 170 666 666 266 165 667 667 255 159 668 668 226 141 657 657 224 140 656 656 169 107 635 635 35 27 625 625 -10 0 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape65(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 -10 269 269 L 27 35 625 625 107 169 635 635 140 224 656 656 141 226 657 657 159 255 668 668 165 266 667 667 170 274 666 666 176 285 666 666 Q 212 344 665 665 250 408 693 693 L 251 409 693 693 266 435 705 705 Q 277 453 715 715 297 487 715 715 398 656 801 801 517 855 775 775 L 534 883 734 734 Q 547 905 690 690 557 922 735 735 L 557 922 235 235 542 897 230 230 Q 537 888 225 225 538 890 215 215 546 903 97 97 517 855 15 15 L 481 795 7 7 475 785 4 4 Q 424 699 -8 -8 397 654 15 15 395 654 21 25 393 648 27 27 377 621 35 35 366 602 45 45 233 380 161 161 77 119 255 255 L 77 119 246 246 27 35 305 305 0 -10 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-2043.0+ratio*(-1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 -10 269 269 L 27 35 305 305 77 119 246 246 77 119 255 255 Q 233 380 161 161 366 602 45 45 377 621 35 35 393 648 27 27 395 654 21 25 397 654 15 15 424 699 -8 -8 475 785 4 4 L 481 795 7 7 517 855 15 15 Q 546 903 97 97 538 890 215 215 537 888 225 225 542 897 230 230 L 557 922 235 235 557 922 735 735 Q 547 905 690 690 534 883 734 734 L 517 855 775 775 Q 398 656 801 801 297 487 715 715 277 453 715 715 266 435 705 705 L 251 409 693 693 250 408 693 693 Q 212 344 665 665 176 285 666 666 L 170 274 666 666 165 266 667 667 159 255 668 668 141 226 657 657 140 224 656 656 107 169 635 635 27 35 625 625 0 -10 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape66(ctx,ctrans,frame,ratio,time){
	var pathData="M -10 0 269 269 L 35 27 625 625 169 107 635 635 224 140 656 656 226 141 657 657 255 159 668 668 266 165 667 667 274 170 666 666 285 176 666 666 Q 344 212 665 665 408 250 693 693 L 409 251 693 693 435 266 705 705 Q 453 277 715 715 487 297 715 715 656 398 801 801 855 517 775 775 L 883 534 734 734 Q 905 547 690 690 922 557 735 735 L 922 557 235 235 897 542 230 230 Q 888 537 225 225 890 538 215 215 903 546 97 97 855 517 15 15 L 795 481 7 7 785 475 4 4 Q 699 424 -8 -8 654 397 15 15 654 395 25 21 648 393 27 27 621 377 35 35 602 366 45 45 380 233 161 161 119 77 255 255 L 119 77 246 246 35 27 305 305 -10 0 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(33.45123291015625+ratio*(-13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-3427.0+ratio*(1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M -10 0 269 269 L 35 27 305 305 119 77 246 246 119 77 255 255 Q 380 233 161 161 602 366 45 45 621 377 35 35 648 393 27 27 654 395 25 21 654 397 15 15 699 424 -8 -8 785 475 4 4 L 795 481 7 7 855 517 15 15 Q 903 546 97 97 890 538 215 215 888 537 225 225 897 542 230 230 L 922 557 235 235 922 557 735 735 Q 905 547 690 690 883 534 734 734 L 855 517 775 775 Q 656 398 801 801 487 297 715 715 453 277 715 715 435 266 705 705 L 409 251 693 693 408 250 693 693 Q 344 212 665 665 285 176 666 666 L 274 170 666 666 266 165 667 667 255 159 668 668 226 141 657 657 224 140 656 656 169 107 635 635 35 27 625 625 -10 0 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape67(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 -10 269 269 L 27 35 625 625 107 169 635 635 140 224 656 656 141 226 657 657 159 255 668 668 165 266 667 667 170 274 666 666 176 285 666 666 Q 212 344 665 665 250 408 693 693 L 251 409 693 693 266 435 705 705 Q 277 453 715 715 297 487 715 715 398 656 801 801 517 855 775 775 L 534 883 734 734 Q 547 905 690 690 557 922 735 735 L 557 922 235 235 542 897 230 230 Q 537 888 225 225 538 890 215 215 546 903 97 97 517 855 15 15 L 481 795 7 7 475 785 4 4 Q 424 699 -8 -8 397 654 15 15 395 654 21 25 393 648 27 27 377 621 35 35 366 602 45 45 233 380 161 161 77 119 255 255 L 77 119 246 246 27 35 305 305 0 -10 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-2043.0+ratio*(-1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 -10 269 269 L 27 35 305 305 77 119 246 246 77 119 255 255 Q 233 380 161 161 366 602 45 45 377 621 35 35 393 648 27 27 395 654 21 25 397 654 15 15 424 699 -8 -8 475 785 4 4 L 481 795 7 7 517 855 15 15 Q 546 903 97 97 538 890 215 215 537 888 225 225 542 897 230 230 L 557 922 235 235 557 922 735 735 Q 547 905 690 690 534 883 734 734 L 517 855 775 775 Q 398 656 801 801 297 487 715 715 277 453 715 715 266 435 705 705 L 251 409 693 693 250 408 693 693 Q 212 344 665 665 176 285 666 666 L 170 274 666 666 165 266 667 667 159 255 668 668 141 226 657 657 140 224 656 656 107 169 635 635 27 35 625 625 0 -10 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape68(ctx,ctrans,frame,ratio,time){
	var pathData="M -10 0 269 269 L 35 27 625 625 169 107 635 635 224 140 656 656 226 141 657 657 255 159 668 668 266 165 667 667 274 170 666 666 285 176 666 666 Q 344 212 665 665 408 250 693 693 L 409 251 693 693 435 266 705 705 Q 453 277 715 715 487 297 715 715 656 398 801 801 855 517 775 775 L 883 534 734 734 Q 905 547 690 690 922 557 735 735 L 922 557 235 235 897 542 230 230 Q 888 537 225 225 890 538 215 215 903 546 97 97 855 517 15 15 L 795 481 7 7 785 475 4 4 Q 699 424 -8 -8 654 397 15 15 654 395 25 21 648 393 27 27 621 377 35 35 602 366 45 45 380 233 161 161 119 77 255 255 L 119 77 246 246 35 27 305 305 -10 0 269 269";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(33.45123291015625+ratio*(-13.45123291015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-3427.0+ratio*(1384)/65535,-385.0+ratio*(0)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M -10 0 269 269 L 35 27 305 305 119 77 246 246 119 77 255 255 Q 380 233 161 161 602 366 45 45 621 377 35 35 648 393 27 27 654 395 25 21 654 397 15 15 699 424 -8 -8 785 475 4 4 L 795 481 7 7 855 517 15 15 Q 903 546 97 97 890 538 215 215 888 537 225 225 897 542 230 230 L 922 557 235 235 922 557 735 735 Q 905 547 690 690 883 534 734 734 L 855 517 775 775 Q 656 398 801 801 487 297 715 715 453 277 715 715 435 266 705 705 L 409 251 693 693 408 250 693 693 Q 344 212 665 665 285 176 666 666 L 274 170 666 666 266 165 667 667 255 159 668 668 226 141 657 657 224 140 656 656 169 107 635 635 35 27 625 625 -10 0 269 269 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape69(ctx,ctrans,frame,ratio,time){
	var pathData="M 542 230 L 557 235 557 735 Q 547 690 534 734 L 517 775 Q 398 801 297 715 277 715 266 705 L 251 693 250 693 Q 212 665 176 666 L 170 666 165 667 159 668 141 657 140 656 107 635 27 625 0 269 27 305 77 246 77 255 Q 233 161 366 45 377 35 393 27 L 397 15 Q 424 -8 475 4 L 481 7 517 15 Q 546 97 538 215 537 225 542 230";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-2043,-385);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite70(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 44;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape59",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape59",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 2:
			place("morphshape59",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 3:
			place("morphshape59",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 4:
			place("morphshape59",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 5:
			place("morphshape60",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 6:
			place("morphshape60",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,9362,time);
			break;
		case 7:
			place("morphshape60",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,18725,time);
			break;
		case 8:
			place("morphshape60",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,28087,time);
			break;
		case 9:
			place("morphshape60",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,37449,time);
			break;
		case 10:
			place("morphshape60",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,46811,time);
			break;
		case 11:
			place("morphshape60",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,56174,time);
			break;
		case 12:
			place("morphshape61",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 13:
			place("morphshape61",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 14:
			place("morphshape61",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 15:
			place("morphshape61",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 16:
			place("morphshape61",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 17:
			place("morphshape62",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 18:
			place("morphshape62",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,9362,time);
			break;
		case 19:
			place("morphshape62",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,18725,time);
			break;
		case 20:
			place("morphshape62",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,28087,time);
			break;
		case 21:
			place("morphshape62",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,37449,time);
			break;
		case 22:
			place("morphshape62",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,46811,time);
			break;
		case 23:
			place("morphshape62",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,56174,time);
			break;
		case 24:
			place("morphshape63",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 25:
			place("morphshape63",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			break;
		case 26:
			place("morphshape63",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			break;
		case 27:
			place("morphshape63",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			break;
		case 28:
			place("morphshape63",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			break;
		case 29:
			place("morphshape64",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 30:
			place("morphshape64",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,10923,time);
			break;
		case 31:
			place("morphshape64",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,21845,time);
			break;
		case 32:
			place("morphshape64",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 33:
			place("morphshape64",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,43691,time);
			break;
		case 34:
			place("morphshape64",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,54613,time);
			break;
		case 35:
			place("morphshape65",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 36:
			place("morphshape65",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 37:
			place("morphshape66",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 38:
			place("morphshape66",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 39:
			place("morphshape67",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 40:
			place("morphshape67",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 41:
			place("morphshape68",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 42:
			place("morphshape68",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 43:
			place("shape69",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function morphshape71(ctx,ctrans,frame,ratio,time){
	var pathData="M 791 612 749 679 L 842 651 747 677 791 612 749 679 M 0 2 649 592 Q 295 230 639 583 623 483 587 539 L 697 540 520 481 723 560 487 453 Q 634 491 316 304 536 416 166 175 488 378 92 110 423 328 47 72 433 336 42 67 445 345 40 65 L 427 331 28 55 363 282 7 37 362 281 3 34 334 260 0 31 Q 87 69 295 286 0 2 649 592";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-4.580078125)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(-2.6995849609375)/65535,-1757.0+ratio*(404)/65535,-1013.0+ratio*(168)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 2 649 592 Q 87 69 295 286 334 260 0 31 L 362 281 3 34 363 282 7 37 427 331 28 55 445 345 40 65 Q 433 336 42 67 423 328 47 72 488 378 92 110 536 416 166 175 634 491 316 304 723 560 487 453 L 697 540 520 481 623 483 587 539 Q 295 230 639 583 0 2 649 592 M 791 612 749 679 L 842 651 747 677 791 612 749 679 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape72(ctx,ctrans,frame,ratio,time){
	var pathData="M 612 791 679 749 L 651 842 677 747 612 791 679 749 M 2 0 592 649 Q 230 295 583 639 483 623 539 587 L 540 697 481 520 560 723 453 487 Q 491 634 304 316 416 536 175 166 378 488 110 92 328 423 72 47 336 433 67 42 345 445 65 40 L 331 427 55 28 282 363 37 7 281 362 34 3 260 334 31 0 Q 69 87 286 295 2 0 592 649";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(15.419921875+ratio*(4.580078125)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,17.3004150390625+ratio*(2.6995849609375)/65535,-1353.0+ratio*(-404)/65535,-845.0+ratio*(-168)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 2 0 592 649 Q 69 87 286 295 260 334 31 0 L 281 362 34 3 282 363 37 7 331 427 55 28 345 445 65 40 Q 336 433 67 42 328 423 72 47 378 488 110 92 416 536 175 166 491 634 304 316 560 723 453 487 L 540 697 481 520 483 623 539 587 Q 230 295 583 639 2 0 592 649 M 612 791 679 749 L 651 842 677 747 612 791 679 749 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape73(ctx,ctrans,frame,ratio,time){
	var pathData="M 723 487 L 697 520 623 587 Q 295 639 0 649 87 295 334 0 L 362 3 363 7 427 28 445 40 Q 433 42 423 47 488 92 536 166 634 316 723 487 M 842 747 L 843 736 843 749 791 749 842 747";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-1757,-1013);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite74(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 9;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape71",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape71",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,16384,time);
			break;
		case 2:
			place("morphshape71",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 3:
			place("morphshape71",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,49152,time);
			break;
		case 4:
			place("morphshape72",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 5:
			place("morphshape72",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,16384,time);
			break;
		case 6:
			place("morphshape72",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,32768,time);
			break;
		case 7:
			place("morphshape72",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,49152,time);
			break;
		case 8:
			place("shape73",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function morphshape75(ctx,ctrans,frame,ratio,time){
	var pathData="M 5 0 68 85 L 7 0 70 85 7 -2 72 87 Q 100 -11 94 97 187 138 126 149 398 296 202 205 574 480 336 328 L 663 569 410 396 Q 800 687 535 498 910 779 690 647 L 932 794 664 672 960 794 631 636 956 794 601 608 939 794 513 525 933 791 486 501 Q 892 752 278 313 860 724 60 119 L 859 722 51 111 851 720 51 103 851 718 41 94 850 718 40 92 851 718 40 90 851 716 20 72 847 714 20 64 839 712 20 57 831 706 20 57 821 706 20 49 820 706 20 48 820 706 20 48 802 706 20 32 800 706 20 32 847 665 19 32 851 671 19 32 851 686 0 32 827 706 0 31 810 706 0 16 480 411 0 16 480 407 7 16 479 407 10 21 475 406 10 24 297 247 26 38 293 247 26 41 281 235 28 41 281 233 31 41 265 219 31 41 247 203 31 43 225 183 34 45 202 163 36 47 118 86 48 59 114 82 48 59 82 54 54 65 78 50 54 65 52 24 60 71 48 25 60 74 40 22 62 75 36 26 62 76 31 22 63 76 5 0 68 85";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-3.8722076416015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(-3.8722076416015625)/65535,-1160.0+ratio*(244)/65535,0.0+ratio*(16)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 5 0 68 85 L 31 22 63 76 36 26 62 76 40 22 62 75 48 25 60 74 52 24 60 71 78 50 54 65 82 54 54 65 114 82 48 59 118 86 48 59 202 163 36 47 225 183 34 45 247 203 31 43 265 219 31 41 281 233 31 41 281 235 28 41 293 247 26 41 297 247 26 38 475 406 10 24 479 407 10 21 480 407 7 16 480 411 0 16 810 706 0 16 827 706 0 31 851 686 0 32 851 671 19 32 847 665 19 32 800 706 20 32 802 706 20 32 820 706 20 48 820 706 20 48 821 706 20 49 831 706 20 57 839 712 20 57 847 714 20 64 851 716 20 72 851 718 40 90 850 718 40 92 851 718 41 94 851 720 51 103 859 722 51 111 860 724 60 119 Q 892 752 278 313 933 791 486 501 L 939 794 513 525 956 794 601 608 960 794 631 636 932 794 664 672 910 779 690 647 Q 800 687 535 498 663 569 410 396 L 574 480 336 328 Q 398 296 202 205 187 138 126 149 100 -11 94 97 7 -2 72 87 L 7 0 70 85 5 0 68 85 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function morphshape76(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 5 85 68 L 0 7 85 70 -2 7 87 72 Q -11 100 97 94 138 187 149 126 296 398 205 202 480 574 328 336 L 569 663 396 410 Q 687 800 498 535 779 910 647 690 L 794 932 672 664 794 960 636 631 794 956 608 601 794 939 525 513 791 933 501 486 Q 752 892 313 278 724 860 119 60 L 722 859 111 51 720 851 103 51 718 851 94 41 718 850 92 40 718 851 90 40 716 851 72 20 714 847 64 20 712 839 57 20 706 831 57 20 706 821 49 20 706 820 48 20 706 820 48 20 706 802 32 20 706 800 32 20 665 847 32 19 671 851 32 19 686 851 32 0 706 827 31 0 706 810 16 0 411 480 16 0 407 480 16 7 407 479 21 10 406 475 24 10 247 297 38 26 247 293 41 26 235 281 41 28 233 281 41 31 219 265 41 31 203 247 43 31 183 225 45 34 163 202 47 36 86 118 59 48 82 114 59 48 54 82 65 54 50 78 65 54 24 52 71 60 25 48 74 60 22 40 75 62 26 36 76 62 22 31 76 63 0 5 85 68";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(16.127792358398438+ratio*(3.8722076416015625)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,16.127792358398438+ratio*(3.8722076416015625)/65535,-916.0+ratio*(-244)/65535,16.0+ratio*(-16)/65535);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 0 5 85 68 L 22 31 76 63 26 36 76 62 22 40 75 62 25 48 74 60 24 52 71 60 50 78 65 54 54 82 65 54 82 114 59 48 86 118 59 48 163 202 47 36 183 225 45 34 203 247 43 31 219 265 41 31 233 281 41 31 235 281 41 28 247 293 41 26 247 297 38 26 406 475 24 10 407 479 21 10 407 480 16 7 411 480 16 0 706 810 16 0 706 827 31 0 686 851 32 0 671 851 32 19 665 847 32 19 706 800 32 20 706 802 32 20 706 820 48 20 706 820 48 20 706 821 49 20 706 831 57 20 712 839 57 20 714 847 64 20 716 851 72 20 718 851 90 40 718 850 92 40 718 851 94 41 720 851 103 51 722 859 111 51 724 860 119 60 Q 752 892 313 278 791 933 501 486 L 794 939 525 513 794 956 608 601 794 960 636 631 794 932 672 664 779 910 647 690 Q 687 800 498 535 569 663 396 410 L 480 574 328 336 Q 296 398 205 202 138 187 149 126 -11 100 97 94 -2 7 87 72 L 0 7 85 70 0 5 85 68 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape77(ctx,ctrans,frame,ratio,time){
	var pathData="M 851 20 L 851 40 850 40 851 41 851 51 859 51 860 60 Q 901 339 956 601 L 960 631 910 690 Q 800 535 663 410 385 159 7 72 L 5 68 78 54 82 54 202 36 247 31 281 31 281 28 479 10 480 0 851 0 851 19 800 20 851 20 M 7 72 L 10 80 0 70 7 72";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-1160,0);
	ctx.transform(1.0076923076923077,0,0,1.0112359550561798,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj53);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite78(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 7;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape75",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape75",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,21845,time);
			break;
		case 2:
			place("morphshape75",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,43691,time);
			break;
		case 3:
			place("morphshape76",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 4:
			place("morphshape76",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,21845,time);
			break;
		case 5:
			place("morphshape76",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,43691,time);
			break;
		case 6:
			place("shape77",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function sprite79(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 1;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("shape54",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("sprite58",canvas,ctx,[1.0,0.0,0.0,1.0,34.0,1177.0],ctrans,1,(0+time)%30,0,time);
			place("sprite70",canvas,ctx,[1.0,0.0,0.0,1.0,2043.0,385.0],ctrans,1,(0+time)%44,0,time);
			place("sprite74",canvas,ctx,[1.0,0.0,0.0,1.0,1757.0,1013.0],ctrans,1,(0+time)%9,0,time);
			place("sprite78",canvas,ctx,[1.0,0.0,0.0,1.0,1160.0,0.0],ctrans,1,(0+time)%7,0,time);
			break;
	}
}

function sprite80(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 230;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite79",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 1:
			place("sprite79",canvas,ctx,[0.9878997802734375,0.021942138671875,-7.476806640625E-4,1.0106048583984375,-14.0,-70.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 2:
			place("sprite79",canvas,ctx,[0.975311279296875,0.0433502197265625,-0.004852294921875,1.0211944580078125,-25.0,-138.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 3:
			place("sprite79",canvas,ctx,[0.962066650390625,0.0673675537109375,-0.0090179443359375,1.031768798828125,-34.0,-211.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 4:
			place("sprite79",canvas,ctx,[0.948516845703125,0.0876312255859375,-0.0098724365234375,1.0423736572265625,-46.0,-279.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 5:
			place("sprite79",canvas,ctx,[0.9345855712890625,0.107330322265625,-0.0142059326171875,1.0529327392578125,-54.0,-345.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 6:
			place("sprite79",canvas,ctx,[0.9197845458984375,0.1294708251953125,-0.0186004638671875,1.063446044921875,-61.0,-415.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 7:
			place("sprite79",canvas,ctx,[0.904998779296875,0.1479644775390625,-0.0195770263671875,1.0740509033203125,-73.0,-480.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 8:
			place("sprite79",canvas,ctx,[0.88983154296875,0.1658782958984375,-0.0241241455078125,1.084564208984375,-78.0,-546.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 9:
			place("sprite79",canvas,ctx,[0.8737335205078125,0.1860504150390625,-0.0287322998046875,1.09503173828125,-84.0,-613.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 10:
			place("sprite79",canvas,ctx,[0.85784912109375,0.2027130126953125,-0.0298309326171875,1.1056365966796875,-92.0,-675.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 11:
			place("sprite79",canvas,ctx,[0.8416900634765625,0.21875,-0.0345916748046875,1.1160736083984375,-98.0,-736.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 12:
			place("sprite79",canvas,ctx,[0.8244476318359375,0.2368927001953125,-0.0394287109375,1.1265411376953125,-102.0,-801.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 13:
			place("sprite79",canvas,ctx,[0.8076934814453125,0.2516632080078125,-0.0406341552734375,1.137115478515625,-109.0,-861.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 14:
			place("sprite79",canvas,ctx,[0.790679931640625,0.26580810546875,-0.045623779296875,1.14752197265625,-112.0,-920.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 15:
			place("sprite79",canvas,ctx,[0.7725067138671875,0.2818450927734375,-0.0506744384765625,1.1579437255859375,-115.0,-983.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 16:
			place("sprite79",canvas,ctx,[0.7550506591796875,0.2946624755859375,-0.052001953125,1.1684722900390625,-123.0,-1041.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 17:
			place("sprite79",canvas,ctx,[0.7363739013671875,0.30926513671875,-0.05718994140625,1.1788482666015625,-124.0,-1101.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 18:
			place("sprite79",canvas,ctx,[0.7185211181640625,0.320770263671875,-0.0624847412109375,1.189208984375,-125.0,-1156.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 19:
			place("sprite79",canvas,ctx,[0.7005462646484375,0.331634521484375,-0.0639190673828125,1.199737548828125,-132.0,-1211.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 20:
			place("sprite79",canvas,ctx,[0.6812896728515625,0.344085693359375,-0.0693359375,1.2100677490234375,-132.0,-1269.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 21:
			place("sprite79",canvas,ctx,[0.6630706787109375,0.3536224365234375,-0.0748291015625,1.2203521728515625,-134.0,-1322.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 22:
			place("sprite79",canvas,ctx,[0.6447296142578125,0.362518310546875,-0.076385498046875,1.23089599609375,-139.0,-1375.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 23:
			place("sprite79",canvas,ctx,[0.6251373291015625,0.3728179931640625,-0.0820159912109375,1.24114990234375,-140.0,-1429.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 24:
			place("sprite79",canvas,ctx,[0.6066741943359375,0.38037109375,-0.0877227783203125,1.2513580322265625,-140.0,-1479.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 25:
			place("sprite79",canvas,ctx,[0.5882110595703125,0.3873138427734375,-0.0894012451171875,1.26190185546875,-145.0,-1530.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 26:
			place("sprite79",canvas,ctx,[0.5684356689453125,0.395477294921875,-0.095245361328125,1.2720794677734375,-145.0,-1582.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 27:
			place("sprite79",canvas,ctx,[0.5499725341796875,0.4011077880859375,-0.101165771484375,1.282257080078125,-146.0,-1629.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 28:
			place("sprite79",canvas,ctx,[0.531524658203125,0.406097412109375,-0.1029510498046875,1.2927398681640625,-151.0,-1676.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 29:
			place("sprite79",canvas,ctx,[0.5127105712890625,0.4127197265625,-0.1111907958984375,1.3030242919921875,-148.0,-1726.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 30:
			place("sprite79",canvas,ctx,[0.5131683349609375,0.4100799560546875,-0.1074676513671875,1.2913055419921875,-141.0,-1676.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 31:
			place("sprite79",canvas,ctx,[0.5132293701171875,0.4096527099609375,-0.1016998291015625,1.2800750732421875,-134.0,-1630.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 32:
			place("sprite79",canvas,ctx,[0.514617919921875,0.4075775146484375,-0.100189208984375,1.268524169921875,-126.0,-1582.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 33:
			place("sprite79",canvas,ctx,[0.5146331787109375,0.4071807861328125,-0.0945892333984375,1.257293701171875,-119.0,-1535.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 34:
			place("sprite79",canvas,ctx,[0.5146484375,0.406768798828125,-0.0931243896484375,1.245697021484375,-110.0,-1488.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 35:
			place("sprite79",canvas,ctx,[0.516021728515625,0.4046783447265625,-0.087646484375,1.2344207763671875,-104.0,-1441.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 36:
			place("sprite79",canvas,ctx,[0.51605224609375,0.4042816162109375,-0.0862579345703125,1.2228240966796875,-95.0,-1395.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 37:
			place("sprite79",canvas,ctx,[0.5174102783203125,0.4022064208984375,-0.0848846435546875,1.21124267578125,-86.0,-1345.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 38:
			place("sprite79",canvas,ctx,[0.5185699462890625,0.40203857421875,-0.0823822021484375,1.20001220703125,-80.0,-1300.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 39:
			place("sprite79",canvas,ctx,[0.51739501953125,0.4025115966796875,-0.0859832763671875,1.2205047607421875,-96.0,-1382.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 40:
			place("sprite79",canvas,ctx,[0.5160064697265625,0.4049224853515625,-0.0925750732421875,1.2410430908203125,-108.0,-1468.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 41:
			place("sprite79",canvas,ctx,[0.5146331787109375,0.4073486328125,-0.09515380859375,1.261871337890625,-126.0,-1553.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 42:
			place("sprite79",canvas,ctx,[0.513214111328125,0.409759521484375,-0.1020050048828125,1.2823944091796875,-137.0,-1638.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 43:
			place("sprite79",canvas,ctx,[0.5127105712890625,0.4127197265625,-0.1111907958984375,1.3030242919921875,-148.0,-1726.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 44:
			place("sprite79",canvas,ctx,[0.524993896484375,0.4117431640625,-0.108734130859375,1.296142578125,-147.0,-1697.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 45:
			place("sprite79",canvas,ctx,[0.53826904296875,0.41107177734375,-0.1084442138671875,1.2894744873046875,-146.0,-1670.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 46:
			place("sprite79",canvas,ctx,[0.5502471923828125,0.41192626953125,-0.112335205078125,1.2823944091796875,-138.0,-1645.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 47:
			place("sprite79",canvas,ctx,[0.563629150390625,0.4107513427734375,-0.1120452880859375,1.27569580078125,-137.0,-1618.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 48:
			place("sprite79",canvas,ctx,[0.5771026611328125,0.4092864990234375,-0.1116790771484375,1.2689971923828125,-134.0,-1590.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 49:
			place("sprite79",canvas,ctx,[0.59063720703125,0.4075469970703125,-0.1113739013671875,1.2622833251953125,-134.0,-1561.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 50:
			place("sprite79",canvas,ctx,[0.6041717529296875,0.4055328369140625,-0.1110382080078125,1.255615234375,-133.0,-1532.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 51:
			place("sprite79",canvas,ctx,[0.616455078125,0.405242919921875,-0.114776611328125,1.24853515625,-124.0,-1506.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 52:
			place("sprite79",canvas,ctx,[0.630126953125,0.4027252197265625,-0.11444091796875,1.241851806640625,-125.0,-1477.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 53:
			place("sprite79",canvas,ctx,[0.6438140869140625,0.3998870849609375,-0.1140594482421875,1.235137939453125,-124.0,-1446.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 54:
			place("sprite79",canvas,ctx,[0.65753173828125,0.3967742919921875,-0.11370849609375,1.2284393310546875,-122.0,-1417.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 55:
			place("sprite79",canvas,ctx,[0.6699981689453125,0.395599365234375,-0.11334228515625,1.221771240234375,-121.0,-1390.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 56:
			place("sprite79",canvas,ctx,[0.68377685546875,0.391937255859375,-0.113006591796875,1.215087890625,-118.0,-1359.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 57:
			place("sprite79",canvas,ctx,[0.6975860595703125,0.388031005859375,-0.1165618896484375,1.207977294921875,-114.0,-1329.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 58:
			place("sprite79",canvas,ctx,[0.711395263671875,0.3838043212890625,-0.116180419921875,1.2012939453125,-114.0,-1297.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 59:
			place("sprite79",canvas,ctx,[0.7239532470703125,0.3816680908203125,-0.1157684326171875,1.1945953369140625,-111.0,-1268.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 60:
			place("sprite79",canvas,ctx,[0.7378082275390625,0.3769073486328125,-0.115386962890625,1.1879119873046875,-109.0,-1237.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 61:
			place("sprite79",canvas,ctx,[0.7516326904296875,0.371856689453125,-0.114959716796875,1.1812286376953125,-108.0,-1204.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 62:
			place("sprite79",canvas,ctx,[0.7654571533203125,0.36651611328125,-0.1183929443359375,1.1741485595703125,-104.0,-1171.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 63:
			place("sprite79",canvas,ctx,[0.778076171875,0.3634490966796875,-0.1179656982421875,1.1674346923828125,-102.0,-1141.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 64:
			place("sprite79",canvas,ctx,[0.7918853759765625,0.3575592041015625,-0.1175384521484375,1.160736083984375,-101.0,-1107.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 65:
			place("sprite79",canvas,ctx,[0.8056793212890625,0.3513641357421875,-0.117095947265625,1.1540679931640625,-101.0,-1073.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 66:
			place("sprite79",canvas,ctx,[0.8194580078125,0.3448944091796875,-0.11663818359375,1.1473846435546875,-100.0,-1039.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 67:
			place("sprite79",canvas,ctx,[0.83203125,0.340850830078125,-0.1199798583984375,1.140289306640625,-93.0,-1007.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 68:
			place("sprite79",canvas,ctx,[0.845733642578125,0.333831787109375,-0.1195068359375,1.1335906982421875,-93.0,-972.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 69:
			place("sprite79",canvas,ctx,[0.8593902587890625,0.3265228271484375,-0.1190185546875,1.126922607421875,-91.0,-938.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 70:
			place("sprite79",canvas,ctx,[0.8730316162109375,0.31890869140625,-0.118560791015625,1.1202239990234375,-90.0,-901.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 71:
			place("sprite79",canvas,ctx,[0.8866119384765625,0.311004638671875,-0.1180572509765625,1.113555908203125,-90.0,-865.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 72:
			place("sprite79",canvas,ctx,[0.8990936279296875,0.30572509765625,-0.1175994873046875,1.10687255859375,-87.0,-832.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 73:
			place("sprite79",canvas,ctx,[0.9125518798828125,0.2972869873046875,-0.120697021484375,1.099761962890625,-83.0,-794.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 74:
			place("sprite79",canvas,ctx,[0.92596435546875,0.2885284423828125,-0.1201934814453125,1.09307861328125,-81.0,-757.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 75:
			place("sprite79",canvas,ctx,[0.9392852783203125,0.279510498046875,-0.11968994140625,1.08642578125,-80.0,-720.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 76:
			place("sprite79",canvas,ctx,[0.951629638671875,0.2732696533203125,-0.119171142578125,1.0797271728515625,-76.0,-685.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 77:
			place("sprite79",canvas,ctx,[0.9647979736328125,0.2636871337890625,-0.118682861328125,1.0730133056640625,-75.0,-647.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 78:
			place("sprite79",canvas,ctx,[0.9779052734375,0.253814697265625,-0.12164306640625,1.0659637451171875,-70.0,-607.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 79:
			place("sprite79",canvas,ctx,[0.9909210205078125,0.243621826171875,-0.12109375,1.05926513671875,-68.0,-568.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 80:
			place("sprite79",canvas,ctx,[1.003021240234375,0.2364501953125,-0.1205596923828125,1.052581787109375,-66.0,-533.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 81:
			place("sprite79",canvas,ctx,[1.015869140625,0.2257232666015625,-0.120025634765625,1.0459136962890625,-64.0,-493.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 82:
			place("sprite79",canvas,ctx,[1.0285797119140625,0.2147369384765625,-0.1194610595703125,1.0392608642578125,-61.0,-454.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 83:
			place("sprite79",canvas,ctx,[1.0411834716796875,0.20343017578125,-0.1222991943359375,1.0321502685546875,-56.0,-412.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 84:
			place("sprite79",canvas,ctx,[1.053009033203125,0.1953125,-0.1217193603515625,1.02545166015625,-52.0,-376.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 85:
			place("sprite79",canvas,ctx,[1.0654144287109375,0.1834869384765625,-0.121124267578125,1.018798828125,-50.0,-334.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 86:
			place("sprite79",canvas,ctx,[1.0776824951171875,0.1713714599609375,-0.12054443359375,1.012115478515625,-47.0,-294.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 87:
			place("sprite79",canvas,ctx,[1.0897979736328125,0.1589813232421875,-0.119964599609375,1.005462646484375,-44.0,-251.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 88:
			place("sprite79",canvas,ctx,[1.101806640625,0.14630126953125,-0.1226654052734375,0.9983673095703125,-37.0,-208.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 89:
			place("sprite79",canvas,ctx,[1.113555908203125,0.137725830078125,-0.1226959228515625,0.992034912109375,-39.0,-173.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 90:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-55.0,-176.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 91:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-71.0,-180.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 92:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-87.0,-184.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 93:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-103.0,-188.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 94:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-119.0,-192.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 95:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-135.0,-196.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 96:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-151.0,-200.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 97:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-167.0,-204.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 98:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-183.0,-208.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 99:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-199.0,-212.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 100:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-215.0,-216.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 101:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-231.0,-220.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 102:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-247.0,-224.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 103:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-263.0,-228.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 104:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-279.0,-232.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 105:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-295.0,-236.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 106:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-311.0,-240.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 107:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-327.0,-244.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 108:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-343.0,-248.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 109:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-359.0,-252.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 110:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-375.0,-256.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 111:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-391.0,-260.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 112:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-407.0,-264.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 113:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-423.0,-268.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 114:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-439.0,-272.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 115:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-455.0,-276.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 116:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-471.0,-280.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 117:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-487.0,-284.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 118:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-503.0,-288.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 119:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-519.0,-292.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 120:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-535.0,-296.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 121:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-551.0,-300.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 122:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-567.0,-304.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 123:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-583.0,-308.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 124:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-599.0,-312.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 125:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-615.0,-316.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 126:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-631.0,-320.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 127:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-647.0,-324.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 128:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-663.0,-328.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 129:
			place("sprite79",canvas,ctx,[1.113555908203125,0.137725830078125,-0.1226959228515625,0.992034912109375,-679.0,-333.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 130:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-653.0,-317.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 131:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-627.0,-300.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 132:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-601.0,-283.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 133:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-575.0,-267.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 134:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-549.0,-251.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 135:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-523.0,-234.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 136:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-497.0,-217.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 137:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-471.0,-201.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 138:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-445.0,-184.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 139:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-419.0,-168.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 140:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-393.0,-152.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 141:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-367.0,-135.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 142:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-341.0,-119.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 143:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-315.0,-102.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 144:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-289.0,-86.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 145:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-263.0,-69.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 146:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-237.0,-52.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 147:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-211.0,-36.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 148:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-185.0,-19.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 149:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-159.0,-3.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 150:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-133.0,13.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 151:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-107.0,30.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 152:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-81.0,46.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 153:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-55.0,63.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 154:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-29.0,79.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 155:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,-3.0,96.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 156:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,23.0,113.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 157:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,49.0,129.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 158:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,75.0,146.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 159:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,101.0,162.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 160:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,127.0,179.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 161:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,153.0,195.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 162:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,179.0,211.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 163:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,205.0,228.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 164:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,231.0,245.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 165:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,257.0,261.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 166:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,283.0,278.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 167:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,309.0,294.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 168:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,335.0,311.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 169:
			place("sprite79",canvas,ctx,[1.113555908203125,0.137725830078125,-0.1226959228515625,0.992034912109375,361.0,327.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 170:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,370.0,303.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 171:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,378.0,277.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 172:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,387.0,252.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 173:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,396.0,227.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 174:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,404.0,201.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 175:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,413.0,176.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 176:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,422.0,151.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 177:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,430.0,125.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 178:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,439.0,100.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 179:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,448.0,75.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 180:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,456.0,49.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 181:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,465.0,24.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 182:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,474.0,-1.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 183:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,482.0,-27.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 184:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,491.0,-52.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 185:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,500.0,-77.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 186:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,508.0,-103.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 187:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,517.0,-128.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 188:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,526.0,-153.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 189:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,534.0,-179.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 190:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,543.0,-204.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 191:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,552.0,-229.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 192:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,560.0,-255.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 193:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,569.0,-280.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 194:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,578.0,-305.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 195:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,586.0,-331.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 196:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,595.0,-356.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 197:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,604.0,-381.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 198:
			place("sprite79",canvas,ctx,[1.113189697265625,0.136962890625,-0.1220245361328125,0.9916839599609375,612.0,-407.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 199:
			place("sprite79",canvas,ctx,[1.113555908203125,0.137725830078125,-0.1226959228515625,0.992034912109375,621.0,-433.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 200:
			place("sprite79",canvas,ctx,[1.1097259521484375,0.1317291259765625,-0.1177825927734375,0.9922332763671875,600.0,-416.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 201:
			place("sprite79",canvas,ctx,[1.1062774658203125,0.1264801025390625,-0.1135101318359375,0.9927520751953125,579.0,-401.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 202:
			place("sprite79",canvas,ctx,[1.1027984619140625,0.121307373046875,-0.1092529296875,0.993255615234375,558.0,-387.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 203:
			place("sprite79",canvas,ctx,[1.099273681640625,0.116119384765625,-0.10498046875,0.993743896484375,536.0,-371.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 204:
			place("sprite79",canvas,ctx,[1.095703125,0.110992431640625,-0.1006927490234375,0.994232177734375,516.0,-357.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 205:
			place("sprite79",canvas,ctx,[1.0921478271484375,0.1058807373046875,-0.0964202880859375,0.9946441650390625,494.0,-342.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 206:
			place("sprite79",canvas,ctx,[1.0885772705078125,0.1008148193359375,-0.0921478271484375,0.9951171875,472.0,-327.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 207:
			place("sprite79",canvas,ctx,[1.0849609375,0.0957794189453125,-0.087860107421875,0.9955291748046875,452.0,-312.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 208:
			place("sprite79",canvas,ctx,[1.081329345703125,0.0907440185546875,-0.083587646484375,0.9959259033203125,430.0,-297.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 209:
			place("sprite79",canvas,ctx,[1.0776519775390625,0.085784912109375,-0.0792999267578125,0.996307373046875,409.0,-282.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 210:
			place("sprite79",canvas,ctx,[1.073974609375,0.080841064453125,-0.07501220703125,0.9966583251953125,389.0,-268.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 211:
			place("sprite79",canvas,ctx,[1.070281982421875,0.0759429931640625,-0.07073974609375,0.996978759765625,367.0,-252.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 212:
			place("sprite79",canvas,ctx,[1.066558837890625,0.0710601806640625,-0.0664520263671875,0.9972991943359375,347.0,-237.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 213:
			place("sprite79",canvas,ctx,[1.0625762939453125,0.0697174072265625,-0.0654296875,0.997406005859375,330.0,-228.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 214:
			place("sprite79",canvas,ctx,[1.0587921142578125,0.0648956298828125,-0.0611572265625,0.997711181640625,307.0,-212.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 215:
			place("sprite79",canvas,ctx,[1.0550384521484375,0.0601348876953125,-0.056884765625,0.9979705810546875,285.0,-197.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 216:
			place("sprite79",canvas,ctx,[1.0512542724609375,0.05535888671875,-0.0525970458984375,0.9982452392578125,265.0,-184.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 217:
			place("sprite79",canvas,ctx,[1.047393798828125,0.0506439208984375,-0.04827880859375,0.998504638671875,245.0,-168.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 218:
			place("sprite79",canvas,ctx,[1.0435943603515625,0.04595947265625,-0.0439910888671875,0.99871826171875,223.0,-155.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 219:
			place("sprite79",canvas,ctx,[1.039703369140625,0.0413055419921875,-0.039703369140625,0.9989013671875,203.0,-139.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 220:
			place("sprite79",canvas,ctx,[1.03582763671875,0.036712646484375,-0.0354156494140625,0.999114990234375,182.0,-125.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 221:
			place("sprite79",canvas,ctx,[1.03192138671875,0.032135009765625,-0.0311126708984375,0.999267578125,160.0,-111.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 222:
			place("sprite79",canvas,ctx,[1.0279998779296875,0.027587890625,-0.0268096923828125,0.9994354248046875,141.0,-97.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 223:
			place("sprite79",canvas,ctx,[1.0240631103515625,0.0230560302734375,-0.0225067138671875,0.99957275390625,120.0,-83.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 224:
			place("sprite79",canvas,ctx,[1.0200958251953125,0.01861572265625,-0.018218994140625,0.9996795654296875,99.0,-68.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 225:
			place("sprite79",canvas,ctx,[1.01611328125,0.014129638671875,-0.013916015625,0.9997711181640625,78.0,-52.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 226:
			place("sprite79",canvas,ctx,[1.0121307373046875,0.0097503662109375,-0.0096282958984375,0.9998626708984375,58.0,-39.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 227:
			place("sprite79",canvas,ctx,[1.0081024169921875,0.00537109375,-0.0053253173828125,0.999908447265625,37.0,-24.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 228:
			place("sprite79",canvas,ctx,[1.0040435791015625,0.00103759765625,-0.00103759765625,0.9999542236328125,17.0,-11.0],ctrans,1,(0+time)%1,0,time);
			break;
		case 229:
			place("sprite79",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,(0+time)%1,0,time);
			break;
	}
}

var imageObj81 = document.createElement("img");
imageObj81.src="data:image/PNG;base64,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";
function image81(ctx,ctrans,frame,ratio,time){
	var pathData="M 0 0 L 0 1060 3460 1060 3460 0 0 0";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,0,0);
	ctx.transform(1.0057803468208093,0,0,1.0188679245283019,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj81);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function morphshape82(ctx,ctrans,frame,ratio,time){
	var pathData="M 899 799 514 -522 L 899 799 514 -521 920 824 514 -522 899 799 514 -522 M 890 799 -522 -522 L 920 824 -522 -522 890 799 -522 -522 M 711 645 514 514 L 739 669 523 523 770 696 520 520 822 741 514 514 711 645 514 514 M 260 260 -502 -502 L 260 260 310 310 350 337 310 310 Q 350 337 320 320 355 342 325 325 L 364 349 335 335 Q 392 373 368 368 450 423 370 370 L 455 427 385 385 466 436 395 395 Q 736 667 606 606 1110 987 430 430 1112 987 424 420 1114 990 418 418 L 1144 1016 401 401 Q 1228 1087 348 348 1290 1140 270 270 L 1290 1140 250 250 1289 1140 230 230 Q 1286 1137 174 174 1270 1123 130 130 1270 1123 120 120 1275 1128 115 115 1280 1132 110 110 1287 1138 115 115 L 1390 1226 190 190 Q 1408 1243 194 190 1426 1257 198 198 L 1433 1263 201 201 Q 1568 1378 242 242 1670 1465 190 190 L 1670 1465 170 170 1672 1467 150 150 Q 1721 1508 -79 -79 1690 1482 -290 -290 L 1685 1478 -305 -305 1673 1468 -314 -314 Q 1550 1362 -389 -389 1430 1260 -290 -290 1412 1243 -286 -290 1394 1229 -282 -282 L 1385 1222 -277 -277 Q 1315 1162 -225 -225 1310 1158 -290 -290 1318 1166 -293 -290 1325 1170 -295 -295 L 1330 1175 -310 -310 1330 1175 -390 -390 Q 1320 1166 -390 -390 1315 1162 -395 -395 L 1306 1154 -402 -402 Q 1281 1133 -413 -413 1273 1126 -438 -438 1256 1109 -447 -445 1239 1096 -456 -456 L 1234 1093 -458 -458 1226 1086 -462 -462 Q 1185 1050 -485 -485 1130 1004 -490 -490 L 1130 1004 -500 -500 1167 1035 -501 -501 1161 1030 -502 -502 1150 1021 -502 -502 1150 1021 -504 -504 1120 995 -500 -500 Q 1083 963 -500 -500 1055 939 -510 -510 L 910 816 -510 -510 908 814 -500 -500 810 730 -492 -492 582 535 -500 -500 260 260 -502 -502";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20.0+ratio*(-2.911376953125)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-1730.0+ratio*(290)/65535,-530.0+ratio*(0)/65535);
	ctx.transform(1.0057803468208093,0,0,1.0188679245283019,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj81);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 260 260 -502 -502 L 582 535 -500 -500 810 730 -492 -492 908 814 -500 -500 910 816 -510 -510 1055 939 -510 -510 Q 1083 963 -500 -500 1120 995 -500 -500 L 1150 1021 -504 -504 1150 1021 -502 -502 1161 1030 -502 -502 1167 1035 -501 -501 1130 1004 -500 -500 1130 1004 -490 -490 Q 1185 1050 -485 -485 1226 1086 -462 -462 L 1234 1093 -458 -458 1239 1096 -456 -456 Q 1256 1109 -447 -445 1273 1126 -438 -438 1281 1133 -413 -413 1306 1154 -402 -402 L 1315 1162 -395 -395 Q 1320 1166 -390 -390 1330 1175 -390 -390 L 1330 1175 -310 -310 1325 1170 -295 -295 Q 1318 1166 -293 -290 1310 1158 -290 -290 1315 1162 -225 -225 1385 1222 -277 -277 L 1394 1229 -282 -282 Q 1412 1243 -286 -290 1430 1260 -290 -290 1550 1362 -389 -389 1673 1468 -314 -314 L 1685 1478 -305 -305 1690 1482 -290 -290 Q 1721 1508 -79 -79 1672 1467 150 150 L 1670 1465 170 170 1670 1465 190 190 Q 1568 1378 242 242 1433 1263 201 201 L 1426 1257 198 198 Q 1408 1243 194 190 1390 1226 190 190 L 1287 1138 115 115 Q 1280 1132 110 110 1275 1128 115 115 1270 1123 120 120 1270 1123 130 130 1286 1137 174 174 1289 1140 230 230 L 1290 1140 250 250 1290 1140 270 270 Q 1228 1087 348 348 1144 1016 401 401 L 1114 990 418 418 Q 1112 987 424 420 1110 987 430 430 736 667 606 606 466 436 395 395 L 455 427 385 385 450 423 370 370 Q 392 373 368 368 364 349 335 335 L 355 342 325 325 Q 350 337 320 320 350 337 310 310 L 260 260 310 310 260 260 -502 -502 M 711 645 514 514 L 822 741 514 514 770 696 520 520 739 669 523 523 711 645 514 514 M 890 799 -522 -522 L 920 824 -522 -522 890 799 -522 -522 M 899 799 514 -522 L 920 824 514 -522 899 799 514 -521 899 799 514 -522 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape83(ctx,ctrans,frame,ratio,time){
	var pathData="M 158 -500 L 260 -502 260 310 250 310 Q 240 330 240 350 L 245 355 250 370 Q -5 355 -550 380 L -555 385 -570 390 Q -615 416 -707 381 L -714 378 -750 370 -785 345 Q -790 340 -794 338 L -830 330 -1287 181 -1294 178 -1330 170 Q -1517 27 -1685 -135 L -1690 -150 -1690 -170 Q -1642 -202 -1587 -223 L -1554 -238 Q -1550 -240 -1550 -250 -781 -477 158 -500";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-1730,-530);
	ctx.transform(1.0057803468208093,0,0,1.0188679245283019,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj81);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function morphshape84(ctx,ctrans,frame,ratio,time){
	var pathData="M 799 899 -522 514 L 799 899 -521 514 824 920 -522 514 799 899 -522 514 824 920 -522 -522 799 890 -522 -522 M 645 711 514 514 L 669 739 523 523 696 770 520 520 741 822 514 514 645 711 514 514 M 260 260 -502 -502 L 260 260 310 310 337 350 310 310 Q 337 350 320 320 342 355 325 325 L 349 364 335 335 Q 373 392 368 368 423 450 370 370 L 427 455 385 385 436 466 395 395 Q 667 736 606 606 987 1110 430 430 987 1112 420 424 990 1114 418 418 L 1016 1144 401 401 Q 1087 1228 348 348 1140 1290 270 270 L 1140 1290 250 250 1140 1289 230 230 Q 1137 1286 174 174 1123 1270 130 130 1123 1270 120 120 1128 1275 115 115 1132 1280 110 110 1138 1287 115 115 L 1226 1390 190 190 Q 1243 1408 190 194 1257 1426 198 198 L 1263 1433 201 201 Q 1378 1568 242 242 1465 1670 190 190 L 1465 1670 170 170 1467 1672 150 150 Q 1508 1721 -79 -79 1482 1690 -290 -290 L 1478 1685 -305 -305 1468 1673 -314 -314 Q 1362 1550 -389 -389 1260 1430 -290 -290 1243 1412 -290 -286 1229 1394 -282 -282 L 1222 1385 -277 -277 Q 1162 1315 -225 -225 1158 1310 -290 -290 1166 1318 -290 -293 1170 1325 -295 -295 L 1175 1330 -310 -310 1175 1330 -390 -390 Q 1166 1320 -390 -390 1162 1315 -395 -395 L 1154 1306 -402 -402 Q 1133 1281 -413 -413 1126 1273 -438 -438 1109 1256 -445 -447 1096 1239 -456 -456 L 1093 1234 -458 -458 1086 1226 -462 -462 Q 1050 1185 -485 -485 1004 1130 -490 -490 L 1004 1130 -500 -500 1035 1167 -501 -501 1030 1161 -502 -502 1021 1150 -502 -502 1021 1150 -504 -504 995 1120 -500 -500 Q 963 1083 -500 -500 939 1055 -510 -510 L 816 910 -510 -510 814 908 -500 -500 730 810 -492 -492 535 582 -500 -500 260 260 -502 -502";
	drawMorphPath(ctx,pathData,ratio,false);
	ctx.save();
	ctx.clip();
	ctx.transform(17.088623046875+ratio*(2.911376953125)/65535,0.0+ratio*(0)/65535,0.0+ratio*(0)/65535,20.0+ratio*(0)/65535,-1440.0+ratio*(-290)/65535,-530.0+ratio*(0)/65535);
	ctx.transform(1.0057803468208093,0,0,1.0188679245283019,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj81);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
	var pathData="M 260 260 -502 -502 L 535 582 -500 -500 730 810 -492 -492 814 908 -500 -500 816 910 -510 -510 939 1055 -510 -510 Q 963 1083 -500 -500 995 1120 -500 -500 L 1021 1150 -504 -504 1021 1150 -502 -502 1030 1161 -502 -502 1035 1167 -501 -501 1004 1130 -500 -500 1004 1130 -490 -490 Q 1050 1185 -485 -485 1086 1226 -462 -462 L 1093 1234 -458 -458 1096 1239 -456 -456 Q 1109 1256 -445 -447 1126 1273 -438 -438 1133 1281 -413 -413 1154 1306 -402 -402 L 1162 1315 -395 -395 Q 1166 1320 -390 -390 1175 1330 -390 -390 L 1175 1330 -310 -310 1170 1325 -295 -295 Q 1166 1318 -290 -293 1158 1310 -290 -290 1162 1315 -225 -225 1222 1385 -277 -277 L 1229 1394 -282 -282 Q 1243 1412 -290 -286 1260 1430 -290 -290 1362 1550 -389 -389 1468 1673 -314 -314 L 1478 1685 -305 -305 1482 1690 -290 -290 Q 1508 1721 -79 -79 1467 1672 150 150 L 1465 1670 170 170 1465 1670 190 190 Q 1378 1568 242 242 1263 1433 201 201 L 1257 1426 198 198 Q 1243 1408 190 194 1226 1390 190 190 L 1138 1287 115 115 Q 1132 1280 110 110 1128 1275 115 115 1123 1270 120 120 1123 1270 130 130 1137 1286 174 174 1140 1289 230 230 L 1140 1290 250 250 1140 1290 270 270 Q 1087 1228 348 348 1016 1144 401 401 L 990 1114 418 418 Q 987 1112 420 424 987 1110 430 430 667 736 606 606 436 466 395 395 L 427 455 385 385 423 450 370 370 Q 373 392 368 368 349 364 335 335 L 342 355 325 325 Q 337 350 320 320 337 350 310 310 L 260 260 310 310 260 260 -502 -502 M 645 711 514 514 L 741 822 514 514 696 770 520 520 669 739 523 523 645 711 514 514 M 799 890 -522 -522 L 824 920 -522 -522 799 890 -522 -522 824 920 -522 514 799 899 -521 514 799 899 -522 514 Z";
	var scaleMode = "NORMAL";
	ctx.strokeStyle=tocolor(ctrans.apply([Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(0)/65535),Math.round(0+ratio*(1)/65535),((Math.round(0+ratio*(0)/65535))/255)]));
	ctx.lineWidth=0.0+ratio*(0)/65535;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	drawMorphPath(ctx,pathData,ratio,true,scaleMode);

}

function shape85(ctx,ctrans,frame,ratio,time){
	var pathData="M 786 521 L 770 520 739 523 711 514 822 514 800 520 786 521 M 899 514 L 920 514 920 519 899 514 M 890 -522 L 920 -522 920 -519 890 -519 890 -522 M 260 -502 L 582 -500 810 -492 908 -500 910 -510 1055 -510 Q 1083 -500 1120 -500 L 1150 -504 1150 -502 1161 -502 1167 -501 1130 -500 1130 -490 Q 1185 -485 1226 -462 L 1234 -458 1239 -456 1273 -438 Q 1281 -413 1306 -402 L 1315 -395 Q 1320 -390 1330 -390 L 1330 -310 1325 -295 1310 -290 Q 1315 -225 1385 -277 L 1394 -282 1430 -290 Q 1550 -389 1673 -314 L 1685 -305 1690 -290 Q 1721 -79 1672 150 L 1670 170 1670 190 Q 1568 242 1433 201 L 1426 198 1390 190 1287 115 Q 1280 110 1275 115 1270 120 1270 130 1286 174 1289 230 L 1290 250 1290 270 Q 1228 348 1144 401 L 1114 418 1110 430 Q 736 606 466 395 L 455 385 450 370 Q 392 368 364 335 L 355 325 Q 350 320 350 310 L 260 310 260 -502";
	drawPath(ctx,pathData,false);
	ctx.save();
	ctx.clip();
	ctx.transform(20,0,0,20,-1730,-530);
	ctx.transform(1.0057803468208093,0,0,1.0188679245283019,-0.5,-0.5);
	var fimg = ctrans.applyToImage(imageObj81);
	var pat=ctx.createPattern(fimg,"repeat");
	ctx.fillStyle = pat;
	ctx.fillRect(-16384,-16384,32768,32768);
	ctx.restore();
}

function sprite86(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 11;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("morphshape82",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 1:
			place("morphshape82",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 2:
			place("morphshape82",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 3:
			place("morphshape82",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 4:
			place("morphshape82",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 5:
			place("morphshape84",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 6:
			place("morphshape84",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,13107,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 7:
			place("morphshape84",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,26214,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 8:
			place("morphshape84",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,39322,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 9:
			place("morphshape84",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,52429,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
		case 10:
			place("shape85",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			place("shape83",canvas,ctx,[1.0,0.0,0.0,1.0,0.0,0.0],ctrans,1,0,0,time);
			break;
	}
}

function sprite87(ctx,ctrans,frame,ratio,time){
	var clips = [];
	var frame_cnt = 799;
	frame = frame % frame_cnt;
	switch(frame){
		case 0:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,2079.0,1520.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 1:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,2029.0,1527.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 2:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1978.0,1534.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 3:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1928.0,1540.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 4:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1877.0,1547.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 5:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1827.0,1554.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 6:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1776.0,1561.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 7:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1726.0,1567.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 8:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1676.0,1574.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 9:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1625.0,1581.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 10:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1575.0,1587.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 11:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1524.0,1594.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 12:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1474.0,1601.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 13:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1423.0,1608.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 14:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1373.0,1614.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 15:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1323.0,1621.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 16:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1272.0,1628.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 17:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1222.0,1635.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 18:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1172.0,1641.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 19:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1121.0,1648.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 20:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1071.0,1655.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 21:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,1020.0,1662.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 22:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,970.0,1669.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 23:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,920.0,1675.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 24:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,869.0,1682.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 25:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,819.0,1689.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 26:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,768.0,1695.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 27:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,718.0,1702.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 28:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,668.0,1709.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 29:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,617.0,1716.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 30:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,567.0,1722.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 31:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,516.0,1729.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 32:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,466.0,1736.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 33:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,415.0,1743.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 34:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,365.0,1749.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 35:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,315.0,1756.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 36:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,264.0,1763.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 37:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,214.0,1770.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 38:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,163.0,1776.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 39:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,113.0,1783.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 40:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,62.0,1790.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 41:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,12.0,1797.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 42:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-39.0,1803.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 43:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-89.0,1810.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 44:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-139.0,1817.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 45:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-190.0,1824.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 46:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-240.0,1830.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 47:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-290.0,1837.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 48:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-341.0,1844.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 49:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-391.0,1851.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 50:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-442.0,1857.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 51:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-492.0,1864.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 52:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-543.0,1871.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 53:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-593.0,1878.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 54:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-643.0,1884.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 55:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-694.0,1891.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 56:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-744.0,1898.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 57:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-795.0,1905.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 58:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-845.0,1911.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 59:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-895.0,1918.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 60:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-946.0,1925.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 61:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-996.0,1932.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 62:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1047.0,1938.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 63:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1097.0,1945.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 64:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1147.0,1952.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 65:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1198.0,1959.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 66:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1248.0,1965.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 67:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1299.0,1972.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 68:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1349.0,1979.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 69:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1399.0,1986.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 70:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1450.0,1992.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 71:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1500.0,1999.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 72:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1551.0,2006.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 73:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1601.0,2013.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 74:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1652.0,2019.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 75:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1702.0,2026.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 76:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1753.0,2033.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 77:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1803.0,2040.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 78:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1853.0,2046.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 79:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1904.0,2053.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 80:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-1954.0,2060.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 81:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2005.0,2067.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 82:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2055.0,2073.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 83:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2105.0,2080.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 84:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2156.0,2087.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 85:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2206.0,2094.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 86:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2257.0,2100.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 87:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2307.0,2107.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 88:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2357.0,2114.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 89:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2408.0,2121.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 90:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2458.0,2127.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 91:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2509.0,2134.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 92:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2559.0,2141.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 93:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2609.0,2148.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 94:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2660.0,2154.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 95:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2710.0,2161.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 96:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2761.0,2168.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 97:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2811.0,2175.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 98:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2862.0,2181.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 99:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2912.0,2188.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 100:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-2962.0,2195.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 101:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3013.0,2202.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 102:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3063.0,2208.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 103:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3114.0,2215.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 104:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3164.0,2222.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 105:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3214.0,2229.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 106:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3265.0,2235.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 107:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3315.0,2242.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 108:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3366.0,2249.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 109:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3416.0,2256.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 110:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3467.0,2262.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 111:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3517.0,2269.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 112:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3568.0,2276.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 113:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3618.0,2283.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 114:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3668.0,2289.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 115:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3719.0,2296.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 116:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3769.0,2303.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 117:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3820.0,2310.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 118:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3870.0,2316.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 119:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3920.0,2323.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 120:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-3971.0,2330.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 121:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4021.0,2337.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 122:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4072.0,2343.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 123:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4122.0,2350.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 124:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4172.0,2357.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 125:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4223.0,2364.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 126:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4273.0,2370.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 127:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4324.0,2377.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 128:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4374.0,2384.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 129:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4424.0,2391.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 130:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4475.0,2397.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 131:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4525.0,2404.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 132:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4575.0,2411.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 133:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4626.0,2418.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 134:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4676.0,2424.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 135:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4727.0,2431.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 136:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4777.0,2438.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 137:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4828.0,2445.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 138:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4878.0,2451.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 139:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4928.0,2458.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 140:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-4979.0,2465.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 141:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5029.0,2472.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 142:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5080.0,2478.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 143:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5130.0,2485.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 144:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5181.0,2492.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 145:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5231.0,2499.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 146:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5282.0,2505.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 147:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5332.0,2512.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 148:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5382.0,2519.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 149:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5433.0,2526.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 150:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5483.0,2532.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 151:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5534.0,2539.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 152:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5584.0,2546.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 153:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5634.0,2553.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 154:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5685.0,2559.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 155:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5735.0,2566.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 156:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5786.0,2573.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 157:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5836.0,2580.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 158:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5886.0,2586.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 159:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5937.0,2593.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 160:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-5987.0,2600.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 161:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6038.0,2607.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 162:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6088.0,2613.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 163:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6138.0,2620.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 164:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6189.0,2627.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 165:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6239.0,2634.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 166:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6290.0,2640.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 167:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6340.0,2647.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 168:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6390.0,2654.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 169:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6441.0,2661.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 170:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6491.0,2667.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 171:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6542.0,2674.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 172:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6592.0,2681.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 173:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6642.0,2688.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 174:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6693.0,2694.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 175:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6743.0,2701.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 176:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6794.0,2708.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 177:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6844.0,2715.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 178:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6895.0,2721.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 179:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6945.0,2728.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 180:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-6996.0,2735.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 181:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7046.0,2742.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 182:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7096.0,2748.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 183:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7147.0,2755.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 184:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7197.0,2762.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 185:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7248.0,2769.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 186:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7298.0,2775.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 187:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7348.0,2782.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 188:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7399.0,2789.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 189:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7449.0,2796.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 190:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7500.0,2802.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 191:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7550.0,2809.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 192:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7600.0,2816.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 193:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7651.0,2823.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 194:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7701.0,2829.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 195:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7752.0,2836.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 196:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7802.0,2843.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 197:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7852.0,2850.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 198:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7903.0,2856.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 199:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-7953.0,2863.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 200:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8004.0,2870.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 201:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8054.0,2877.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 202:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8105.0,2883.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 203:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8155.0,2890.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 204:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8205.0,2897.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 205:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8256.0,2904.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 206:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8306.0,2910.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 207:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8357.0,2917.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 208:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8407.0,2924.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 209:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8457.0,2931.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 210:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8508.0,2937.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 211:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8558.0,2944.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 212:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8609.0,2951.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 213:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8659.0,2958.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 214:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8710.0,2964.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 215:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8760.0,2971.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 216:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8810.0,2978.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 217:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8861.0,2985.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 218:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8911.0,2991.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 219:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-8962.0,2998.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 220:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9012.0,3005.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 221:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9063.0,3012.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 222:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9113.0,3018.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 223:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9163.0,3025.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 224:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9214.0,3032.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 225:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9264.0,3039.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 226:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9315.0,3045.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 227:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9365.0,3052.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 228:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9415.0,3059.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 229:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9466.0,3066.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 230:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9516.0,3072.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 231:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9567.0,3079.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 232:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9617.0,3086.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 233:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9667.0,3093.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 234:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9718.0,3099.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 235:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9768.0,3106.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 236:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9819.0,3113.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 237:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9869.0,3120.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 238:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9919.0,3126.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 239:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-9970.0,3133.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 240:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10020.0,3140.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 241:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10071.0,3147.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 242:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10121.0,3153.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 243:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10171.0,3160.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 244:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10222.0,3167.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 245:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10272.0,3174.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 246:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10323.0,3180.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 247:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10373.0,3187.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 248:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10424.0,3194.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 249:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10474.0,3201.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 250:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10525.0,3207.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 251:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10575.0,3214.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 252:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10625.0,3221.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 253:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10676.0,3228.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 254:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10726.0,3234.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 255:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10777.0,3241.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 256:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10827.0,3248.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 257:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10877.0,3255.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 258:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10928.0,3261.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 259:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-10978.0,3268.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 260:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11029.0,3275.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 261:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11079.0,3282.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 262:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11129.0,3288.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 263:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11180.0,3295.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 264:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11230.0,3302.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 265:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11281.0,3309.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 266:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11331.0,3315.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 267:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11381.0,3322.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 268:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11432.0,3329.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 269:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11482.0,3336.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 270:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11533.0,3342.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 271:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11583.0,3349.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 272:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11633.0,3356.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 273:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11684.0,3363.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 274:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11734.0,3369.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 275:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11785.0,3376.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 276:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11835.0,3383.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 277:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11885.0,3390.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 278:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11936.0,3396.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 279:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-11986.0,3403.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 280:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12037.0,3410.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 281:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12087.0,3417.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 282:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12138.0,3423.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 283:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12188.0,3430.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 284:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12239.0,3437.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 285:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12289.0,3444.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 286:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12339.0,3450.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 287:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12390.0,3457.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 288:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12440.0,3464.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 289:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12491.0,3471.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 290:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12541.0,3477.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 291:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12591.0,3484.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 292:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12642.0,3491.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 293:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12692.0,3498.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 294:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12743.0,3504.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 295:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12793.0,3511.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 296:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12844.0,3518.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 297:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12894.0,3524.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 298:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12944.0,3531.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 299:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-12995.0,3538.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 300:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13045.0,3545.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 301:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13096.0,3551.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 302:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13146.0,3558.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 303:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13196.0,3565.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 304:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13247.0,3572.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 305:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13297.0,3578.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 306:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13348.0,3585.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 307:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13398.0,3592.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 308:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13448.0,3599.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 309:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13499.0,3606.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 310:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13549.0,3612.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 311:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13600.0,3619.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 312:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13650.0,3626.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 313:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13700.0,3632.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 314:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13751.0,3639.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 315:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13801.0,3646.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 316:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13852.0,3653.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 317:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13902.0,3659.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 318:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-13953.0,3666.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 319:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-14003.0,3673.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 320:
			place("sprite86",canvas,ctx,[1.0,0.0,0.0,1.0,-14003.0,3673.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 321:
			place("sprite86",canvas,ctx,[1.0,3.0517578125E-5,0.0,1.0,-13995.0,3630.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 322:
			place("sprite86",canvas,ctx,[1.0,6.103515625E-5,0.0,1.0,-13987.0,3587.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 323:
			place("sprite86",canvas,ctx,[1.0,9.1552734375E-5,0.0,1.0,-13980.0,3544.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 324:
			place("sprite86",canvas,ctx,[1.0,1.220703125E-4,0.0,1.0,-13972.0,3501.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 325:
			place("sprite86",canvas,ctx,[1.0,1.373291015625E-4,0.0,1.0,-13964.0,3458.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 326:
			place("sprite86",canvas,ctx,[1.0,1.678466796875E-4,0.0,1.0,-13956.0,3415.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 327:
			place("sprite86",canvas,ctx,[1.0,1.983642578125E-4,0.0,1.0,-13948.0,3372.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 328:
			place("sprite86",canvas,ctx,[0.9999847412109375,2.288818359375E-4,0.0,1.0,-13941.0,3329.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 329:
			place("sprite86",canvas,ctx,[0.9999847412109375,2.593994140625E-4,0.0,1.0,-13933.0,3286.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 330:
			place("sprite86",canvas,ctx,[0.9999847412109375,2.899169921875E-4,0.0,1.0,-13925.0,3243.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 331:
			place("sprite86",canvas,ctx,[0.9999847412109375,3.204345703125E-4,0.0,1.0,-13917.0,3200.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 332:
			place("sprite86",canvas,ctx,[0.9999847412109375,3.509521484375E-4,0.0,1.0,-13909.0,3157.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 333:
			place("sprite86",canvas,ctx,[0.9999847412109375,3.814697265625E-4,0.0,1.0,-13901.0,3114.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 334:
			place("sprite86",canvas,ctx,[0.9999847412109375,3.96728515625E-4,0.0,1.0,-13894.0,3071.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 335:
			place("sprite86",canvas,ctx,[0.9999847412109375,4.2724609375E-4,0.0,1.0,-13886.0,3028.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 336:
			place("sprite86",canvas,ctx,[0.9999847412109375,4.57763671875E-4,0.0,1.0,-13878.0,2985.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 337:
			place("sprite86",canvas,ctx,[0.9999847412109375,4.8828125E-4,0.0,1.0,-13870.0,2942.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 338:
			place("sprite86",canvas,ctx,[0.9999847412109375,5.18798828125E-4,0.0,1.0,-13862.0,2899.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 339:
			place("sprite86",canvas,ctx,[0.9999847412109375,5.4931640625E-4,0.0,1.0,-13855.0,2856.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 340:
			place("sprite86",canvas,ctx,[0.999969482421875,5.79833984375E-4,0.0,1.0,-13847.0,2813.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 341:
			place("sprite86",canvas,ctx,[0.999969482421875,6.103515625E-4,0.0,1.0,-13839.0,2770.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 342:
			place("sprite86",canvas,ctx,[0.999969482421875,6.256103515625E-4,0.0,1.0,-13831.0,2727.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 343:
			place("sprite86",canvas,ctx,[0.999969482421875,6.561279296875E-4,0.0,1.0,-13823.0,2684.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 344:
			place("sprite86",canvas,ctx,[0.999969482421875,6.866455078125E-4,0.0,1.0,-13816.0,2642.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 345:
			place("sprite86",canvas,ctx,[0.999969482421875,7.171630859375E-4,0.0,1.0,-13808.0,2598.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 346:
			place("sprite86",canvas,ctx,[0.999969482421875,7.476806640625E-4,0.0,1.0,-13800.0,2555.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 347:
			place("sprite86",canvas,ctx,[0.999969482421875,7.781982421875E-4,0.0,1.0,-13792.0,2512.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 348:
			place("sprite86",canvas,ctx,[0.999969482421875,8.087158203125E-4,0.0,1.0,-13784.0,2470.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 349:
			place("sprite86",canvas,ctx,[0.999969482421875,8.392333984375E-4,0.0,1.0,-13777.0,2427.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 350:
			place("sprite86",canvas,ctx,[0.999969482421875,8.697509765625E-4,0.0,1.0,-13769.0,2384.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 351:
			place("sprite86",canvas,ctx,[0.999969482421875,8.85009765625E-4,0.0,1.0,-13761.0,2341.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 352:
			place("sprite86",canvas,ctx,[0.999969482421875,9.1552734375E-4,0.0,1.0,-13753.0,2298.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 353:
			place("sprite86",canvas,ctx,[0.999969482421875,9.46044921875E-4,0.0,1.0,-13745.0,2255.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 354:
			place("sprite86",canvas,ctx,[0.999969482421875,9.765625E-4,0.0,1.0,-13737.0,2212.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 355:
			place("sprite86",canvas,ctx,[0.999969482421875,0.001007080078125,0.0,1.0,-13730.0,2169.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 356:
			place("sprite86",canvas,ctx,[0.999969482421875,0.00103759765625,0.0,1.0,-13722.0,2126.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 357:
			place("sprite86",canvas,ctx,[0.999969482421875,0.001068115234375,0.0,1.0,-13714.0,2083.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 358:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.004364013671875,0.0,1.0,-13705.0,2040.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 359:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.00439453125,0.0,1.0,-13697.0,1997.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 360:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.004425048828125,0.0,1.0,-13690.0,1954.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 361:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.00445556640625,0.0,1.0,-13682.0,1911.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 362:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.004486083984375,0.0,1.0,-13674.0,1868.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 363:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0045166015625,0.0,1.0,-13666.0,1825.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 364:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0045318603515625,0.0,1.0,-13658.0,1782.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 365:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0045623779296875,0.0,1.0,-13651.0,1739.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 366:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0045928955078125,0.0,1.0,-13643.0,1696.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 367:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0046234130859375,0.0,1.0,-13635.0,1653.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 368:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0046539306640625,0.0,1.0,-13627.0,1610.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 369:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0046844482421875,0.0,1.0,-13619.0,1567.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 370:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0047149658203125,0.0,1.0,-13612.0,1524.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 371:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0047454833984375,0.0,1.0,-13604.0,1481.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 372:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0047607421875,0.0,1.0,-13596.0,1438.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 373:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.004791259765625,0.0,1.0,-13588.0,1395.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 374:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.00482177734375,0.0,1.0,-13580.0,1352.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 375:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.004852294921875,0.0,1.0,-13573.0,1309.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 376:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.0048828125,0.0,1.0,-13565.0,1266.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 377:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.004913330078125,0.0,1.0,-13557.0,1223.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 378:
			place("sprite86",canvas,ctx,[0.9999542236328125,0.00494384765625,0.0,1.0,-13549.0,1180.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 379:
			place("sprite86",canvas,ctx,[0.99993896484375,0.004974365234375,0.0,1.0,-13541.0,1137.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 380:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0050048828125,0.0,1.0,-13533.0,1094.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 381:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0050201416015625,0.0,1.0,-13526.0,1051.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 382:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0050506591796875,0.0,1.0,-13518.0,1008.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 383:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0050811767578125,0.0,1.0,-13510.0,965.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 384:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0051116943359375,0.0,1.0,-13502.0,922.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 385:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0051422119140625,0.0,1.0,-13494.0,879.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 386:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0051727294921875,0.0,1.0,-13487.0,836.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 387:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0052032470703125,0.0,1.0,-13479.0,793.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 388:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0052337646484375,0.0,1.0,-13471.0,750.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 389:
			place("sprite86",canvas,ctx,[0.99993896484375,0.0052642822265625,0.0,1.0,-13463.0,707.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 390:
			place("sprite86",canvas,ctx,[0.99993896484375,0.005279541015625,0.0,1.0,-13455.0,664.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 391:
			place("sprite86",canvas,ctx,[0.99993896484375,0.00531005859375,0.0,1.0,-13448.0,621.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 392:
			place("sprite86",canvas,ctx,[0.99993896484375,0.005340576171875,0.0,1.0,-13440.0,578.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 393:
			place("sprite86",canvas,ctx,[0.99993896484375,0.00537109375,0.0,1.0,-13432.0,535.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 394:
			place("sprite86",canvas,ctx,[0.99993896484375,0.005401611328125,0.0,1.0,-13424.0,492.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 395:
			place("sprite86",canvas,ctx,[0.99993896484375,0.00543212890625,0.0,1.0,-13416.0,449.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 396:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.00872802734375,0.0,1.0,-13410.0,406.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 397:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.008758544921875,0.0,1.0,-13402.0,363.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 398:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0087890625,0.0,1.0,-13394.0,321.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 399:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.008819580078125,0.0,1.0,-13386.0,277.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 400:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.00885009765625,0.0,1.0,-13378.0,235.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 401:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.008880615234375,0.0,1.0,-13370.0,192.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 402:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0089111328125,0.0,1.0,-13363.0,149.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 403:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0089263916015625,0.0,1.0,-13355.0,106.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 404:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0089569091796875,0.0,1.0,-13347.0,63.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 405:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0089874267578125,0.0,1.0,-13339.0,20.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 406:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0090179443359375,0.0,1.0,-13331.0,-23.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 407:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0090484619140625,0.0,1.0,-13324.0,-66.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 408:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0090789794921875,0.0,1.0,-13316.0,-109.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 409:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0091094970703125,0.0,1.0,-13308.0,-152.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 410:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0091400146484375,0.0,1.0,-13300.0,-195.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 411:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.0091552734375,0.0,1.0,-13292.0,-238.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 412:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.009185791015625,0.0,1.0,-13285.0,-281.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 413:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.00921630859375,0.0,1.0,-13277.0,-324.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 414:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.009246826171875,0.0,1.0,-13269.0,-367.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 415:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.00927734375,0.0,1.0,-13261.0,-410.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 416:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.009307861328125,0.0,1.0,-13253.0,-453.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 417:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.00933837890625,0.0,1.0,-13246.0,-496.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 418:
			place("sprite86",canvas,ctx,[0.9998931884765625,0.009368896484375,0.0,1.0,-13238.0,-539.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 419:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0093994140625,0.0,1.0,-13230.0,-582.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 420:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0094146728515625,0.0,1.0,-13222.0,-625.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 421:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0094451904296875,0.0,1.0,-13214.0,-668.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 422:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0094757080078125,0.0,1.0,-13206.0,-711.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 423:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0095062255859375,0.0,1.0,-13199.0,-754.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 424:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0095367431640625,0.0,1.0,-13191.0,-797.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 425:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0095672607421875,0.0,1.0,-13183.0,-840.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 426:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0095977783203125,0.0,1.0,-13175.0,-883.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 427:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0096282958984375,0.0,1.0,-13167.0,-926.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 428:
			place("sprite86",canvas,ctx,[0.9998779296875,0.0096588134765625,0.0,1.0,-13160.0,-969.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 429:
			place("sprite86",canvas,ctx,[0.9998626708984375,0.009674072265625,0.0,1.0,-13152.0,-1012.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 430:
			place("sprite86",canvas,ctx,[0.9998626708984375,0.00970458984375,0.0,1.0,-13144.0,-1055.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 431:
			place("sprite86",canvas,ctx,[0.9998626708984375,0.009735107421875,0.0,1.0,-13136.0,-1098.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 432:
			place("sprite86",canvas,ctx,[0.9998626708984375,0.009765625,0.0,1.0,-13128.0,-1141.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 433:
			place("sprite86",canvas,ctx,[0.9998626708984375,0.009796142578125,0.0,1.0,-13121.0,-1184.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 434:
			place("sprite86",canvas,ctx,[0.99981689453125,0.013092041015625,0.0,1.0,-13113.0,-1227.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 435:
			place("sprite86",canvas,ctx,[0.99981689453125,0.01312255859375,0.0,1.0,-13105.0,-1270.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 436:
			place("sprite86",canvas,ctx,[0.99981689453125,0.013153076171875,0.0,1.0,-13097.0,-1313.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 437:
			place("sprite86",canvas,ctx,[0.99981689453125,0.01318359375,0.0,1.0,-13089.0,-1356.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 438:
			place("sprite86",canvas,ctx,[0.99981689453125,0.013214111328125,0.0,1.0,-13082.0,-1399.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 439:
			place("sprite86",canvas,ctx,[0.99981689453125,0.01324462890625,0.0,1.0,-13074.0,-1442.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 440:
			place("sprite86",canvas,ctx,[0.99981689453125,0.013275146484375,0.0,1.0,-13066.0,-1485.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 441:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0132904052734375,0.0,1.0,-13058.0,-1528.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 442:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0133209228515625,0.0,1.0,-13050.0,-1571.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 443:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0133514404296875,0.0,1.0,-13042.0,-1614.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 444:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0133819580078125,0.0,1.0,-13035.0,-1657.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 445:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0134124755859375,0.0,1.0,-13027.0,-1700.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 446:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0134429931640625,0.0,1.0,-13019.0,-1743.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 447:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0134735107421875,0.0,1.0,-13011.0,-1786.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 448:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0135040283203125,0.0,1.0,-13003.0,-1829.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 449:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0135345458984375,0.0,1.0,-12996.0,-1872.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 450:
			place("sprite86",canvas,ctx,[0.99981689453125,0.0135498046875,0.0,1.0,-12988.0,-1914.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 451:
			place("sprite86",canvas,ctx,[0.99981689453125,0.013580322265625,0.0,1.0,-12980.0,-1958.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 452:
			place("sprite86",canvas,ctx,[0.99981689453125,0.01361083984375,0.0,1.0,-12972.0,-2000.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 453:
			place("sprite86",canvas,ctx,[0.99981689453125,0.013641357421875,0.0,1.0,-12964.0,-2043.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 454:
			place("sprite86",canvas,ctx,[0.99981689453125,0.013671875,0.0,1.0,-12957.0,-2086.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 455:
			place("sprite86",canvas,ctx,[0.9998016357421875,0.013702392578125,0.0,1.0,-12949.0,-2129.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 456:
			place("sprite86",canvas,ctx,[0.9998016357421875,0.01373291015625,0.0,1.0,-12941.0,-2172.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 457:
			place("sprite86",canvas,ctx,[0.9998016357421875,0.013763427734375,0.0,1.0,-12933.0,-2215.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 458:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0137939453125,0.0,1.0,-12925.0,-2258.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 459:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0138092041015625,0.0,1.0,-12918.0,-2301.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 460:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0138397216796875,0.0,1.0,-12910.0,-2344.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 461:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0138702392578125,0.0,1.0,-12902.0,-2387.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 462:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0139007568359375,0.0,1.0,-12894.0,-2430.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 463:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0139312744140625,0.0,1.0,-12886.0,-2473.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 464:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0139617919921875,0.0,1.0,-12879.0,-2517.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 465:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0139923095703125,0.0,1.0,-12871.0,-2559.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 466:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0140228271484375,0.0,1.0,-12863.0,-2602.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 467:
			place("sprite86",canvas,ctx,[0.999786376953125,0.0140380859375,0.0,1.0,-12855.0,-2645.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 468:
			place("sprite86",canvas,ctx,[0.999786376953125,0.014068603515625,0.0,1.0,-12847.0,-2688.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 469:
			place("sprite86",canvas,ctx,[0.999786376953125,0.01409912109375,0.0,1.0,-12839.0,-2731.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 470:
			place("sprite86",canvas,ctx,[0.999786376953125,0.014129638671875,0.0,1.0,-12832.0,-2774.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 471:
			place("sprite86",canvas,ctx,[0.999786376953125,0.01416015625,0.0,1.0,-12824.0,-2817.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 472:
			place("sprite86",canvas,ctx,[0.999725341796875,0.0174560546875,0.0,1.0,-12816.0,-2860.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 473:
			place("sprite86",canvas,ctx,[0.999725341796875,0.017486572265625,0.0,1.0,-12808.0,-2903.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 474:
			place("sprite86",canvas,ctx,[0.999725341796875,0.01751708984375,0.0,1.0,-12800.0,-2946.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 475:
			place("sprite86",canvas,ctx,[0.999725341796875,0.017547607421875,0.0,1.0,-12793.0,-2989.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 476:
			place("sprite86",canvas,ctx,[0.999725341796875,0.017578125,0.0,1.0,-12785.0,-3032.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 477:
			place("sprite86",canvas,ctx,[0.9997711181640625,0.01806640625,0.0,1.0,-12777.0,-3075.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 478:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12762.0,-3096.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 479:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12708.0,-3107.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 480:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12652.0,-3117.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 481:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12596.0,-3125.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 482:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12540.0,-3130.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 483:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12484.0,-3134.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 484:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12427.0,-3136.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 485:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12371.0,-3137.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 486:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12314.0,-3135.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 487:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12258.0,-3132.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 488:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12202.0,-3128.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 489:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12146.0,-3122.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 490:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12090.0,-3115.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 491:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-12034.0,-3106.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 492:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11979.0,-3096.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 493:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11924.0,-3085.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 494:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11870.0,-3072.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 495:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11815.0,-3059.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 496:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11761.0,-3044.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 497:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11708.0,-3029.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 498:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11654.0,-3013.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 499:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11601.0,-2995.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 500:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11548.0,-2977.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 501:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11496.0,-2958.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 502:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11444.0,-2939.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 503:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11392.0,-2918.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 504:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11341.0,-2897.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 505:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11290.0,-2876.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 506:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11239.0,-2853.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 507:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11189.0,-2830.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 508:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11138.0,-2807.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 509:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11084.0,-2797.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 510:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-11030.0,-2788.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 511:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10976.0,-2778.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 512:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10921.0,-2769.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 513:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10867.0,-2760.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 514:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10812.0,-2751.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 515:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10758.0,-2742.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 516:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10703.0,-2734.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 517:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10648.0,-2726.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 518:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10594.0,-2718.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 519:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10539.0,-2710.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 520:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10485.0,-2702.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 521:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10430.0,-2695.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 522:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10375.0,-2688.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 523:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10320.0,-2681.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 524:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10265.0,-2674.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 525:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10211.0,-2667.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 526:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10156.0,-2661.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 527:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10101.0,-2655.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 528:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-10046.0,-2649.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 529:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9991.0,-2643.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 530:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9936.0,-2638.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 531:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9881.0,-2632.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 532:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9826.0,-2627.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 533:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9771.0,-2622.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 534:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9716.0,-2618.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 535:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9661.0,-2613.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 536:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9606.0,-2609.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 537:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9550.0,-2605.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 538:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9495.0,-2601.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 539:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9440.0,-2598.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 540:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9385.0,-2594.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 541:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9330.0,-2591.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 542:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9275.0,-2588.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 543:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9219.0,-2585.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 544:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9164.0,-2583.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 545:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9109.0,-2581.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 546:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-9053.0,-2579.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 547:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8998.0,-2577.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 548:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8943.0,-2575.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 549:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8888.0,-2574.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 550:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8832.0,-2573.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 551:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8777.0,-2572.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 552:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8722.0,-2571.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 553:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8666.0,-2570.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 554:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8611.0,-2570.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 555:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8556.0,-2570.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 556:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8500.0,-2570.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 557:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8445.0,-2571.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 558:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8390.0,-2571.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 559:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8334.0,-2572.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 560:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8279.0,-2573.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 561:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8224.0,-2574.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 562:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8168.0,-2576.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 563:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8113.0,-2577.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 564:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8058.0,-2579.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 565:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-8002.0,-2581.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 566:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7947.0,-2584.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 567:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7892.0,-2586.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 568:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7837.0,-2589.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 569:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7781.0,-2592.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 570:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7726.0,-2595.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 571:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7671.0,-2599.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 572:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7615.0,-2602.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 573:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7560.0,-2606.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 574:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7505.0,-2610.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 575:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7450.0,-2615.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 576:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7395.0,-2619.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 577:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7339.0,-2624.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 578:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7284.0,-2629.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 579:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7229.0,-2634.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 580:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7174.0,-2640.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 581:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7119.0,-2645.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 582:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7064.0,-2651.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 583:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-7009.0,-2657.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 584:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6954.0,-2663.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 585:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6899.0,-2670.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 586:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6844.0,-2676.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 587:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6789.0,-2683.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 588:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6734.0,-2690.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 589:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6679.0,-2698.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 590:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6624.0,-2705.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 591:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6570.0,-2713.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 592:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6515.0,-2721.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 593:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6460.0,-2729.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 594:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6405.0,-2738.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 595:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6351.0,-2746.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 596:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6296.0,-2755.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 597:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6241.0,-2764.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 598:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6187.0,-2773.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 599:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6132.0,-2783.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 600:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6078.0,-2792.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 601:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-6023.0,-2802.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 602:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5969.0,-2812.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 603:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5915.0,-2822.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 604:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5860.0,-2833.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 605:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5806.0,-2844.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 606:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5752.0,-2854.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 607:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5697.0,-2866.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 608:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5643.0,-2877.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 609:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5589.0,-2888.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 610:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5535.0,-2900.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 611:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5481.0,-2912.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 612:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5427.0,-2924.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 613:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5373.0,-2936.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 614:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5319.0,-2949.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 615:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5265.0,-2961.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 616:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5212.0,-2974.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 617:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5158.0,-2987.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 618:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5104.0,-3001.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 619:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-5050.0,-3014.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 620:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4997.0,-3028.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 621:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4944.0,-3041.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 622:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4890.0,-3055.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 623:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4837.0,-3068.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 624:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4784.0,-3080.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 625:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4730.0,-3092.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 626:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4676.0,-3104.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 627:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4623.0,-3116.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 628:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4569.0,-3127.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 629:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4515.0,-3137.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 630:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4461.0,-3148.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 631:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4407.0,-3158.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 632:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4353.0,-3167.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 633:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4299.0,-3176.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 634:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4244.0,-3185.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 635:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4190.0,-3193.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 636:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4135.0,-3201.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 637:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4081.0,-3209.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 638:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-4026.0,-3216.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 639:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3972.0,-3223.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 640:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3917.0,-3229.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 641:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3862.0,-3235.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 642:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3807.0,-3240.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 643:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3752.0,-3245.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 644:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3698.0,-3250.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 645:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3643.0,-3254.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 646:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3587.0,-3258.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 647:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3532.0,-3261.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 648:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3477.0,-3264.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 649:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3422.0,-3267.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 650:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3367.0,-3269.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 651:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3312.0,-3270.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 652:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3257.0,-3271.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 653:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3201.0,-3272.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 654:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3146.0,-3272.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 655:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3091.0,-3272.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 656:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-3036.0,-3271.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 657:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2981.0,-3270.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 658:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2925.0,-3269.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 659:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2870.0,-3266.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 660:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2815.0,-3264.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 661:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2760.0,-3261.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 662:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2704.0,-3258.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 663:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2649.0,-3254.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 664:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2594.0,-3249.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 665:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2539.0,-3245.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 666:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2484.0,-3239.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 667:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2429.0,-3234.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 668:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2374.0,-3227.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 669:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2319.0,-3221.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 670:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2264.0,-3214.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 671:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2209.0,-3206.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 672:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2154.0,-3198.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 673:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2100.0,-3189.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 674:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-2045.0,-3181.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 675:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1990.0,-3171.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 676:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1936.0,-3161.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 677:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1882.0,-3151.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 678:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1827.0,-3140.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 679:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1773.0,-3129.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 680:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1719.0,-3117.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 681:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1665.0,-3105.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 682:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1611.0,-3093.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 683:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1557.0,-3080.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 684:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1504.0,-3066.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 685:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1450.0,-3052.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 686:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1397.0,-3038.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 687:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1343.0,-3023.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 688:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1290.0,-3008.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 689:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1237.0,-2993.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 690:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1184.0,-2977.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 691:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1131.0,-2960.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 692:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1078.0,-2943.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 693:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-1026.0,-2926.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 694:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-973.0,-2908.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 695:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-921.0,-2890.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 696:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-869.0,-2872.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 697:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-817.0,-2853.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 698:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0,-765.0,-2834.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 699:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0000152587890625,-711.0,-2813.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 700:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0000152587890625,-656.0,-2792.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 701:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000030517578125,-602.0,-2770.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 702:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0000457763671875,-548.0,-2748.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 703:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0000457763671875,-493.0,-2725.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 704:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00006103515625,-440.0,-2702.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 705:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00006103515625,-386.0,-2678.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 706:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0000762939453125,-332.0,-2655.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 707:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000091552734375,-279.0,-2630.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 708:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000091552734375,-226.0,-2606.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 709:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001068115234375,-173.0,-2581.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 710:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001220703125,-120.0,-2555.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 711:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001220703125,-68.0,-2529.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 712:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001373291015625,-15.0,-2503.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 713:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001373291015625,37.0,-2476.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 714:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000152587890625,89.0,-2449.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 715:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001678466796875,140.0,-2422.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 716:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001678466796875,192.0,-2394.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 717:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00018310546875,243.0,-2366.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 718:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001983642578125,294.0,-2338.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 719:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0001983642578125,345.0,-2309.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 720:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000213623046875,396.0,-2279.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 721:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000213623046875,446.0,-2250.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 722:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0002288818359375,497.0,-2220.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 723:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000244140625,547.0,-2190.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 724:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000244140625,597.0,-2159.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 725:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0002593994140625,646.0,-2129.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 726:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000274658203125,696.0,-2097.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 727:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000274658203125,745.0,-2066.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 728:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0002899169921875,794.0,-2034.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 729:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00030517578125,843.0,-2002.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 730:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00030517578125,891.0,-1970.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 731:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0003204345703125,940.0,-1937.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 732:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0003204345703125,988.0,-1904.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 733:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000335693359375,1036.0,-1871.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 734:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0003509521484375,1083.0,-1837.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 735:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0003509521484375,1131.0,-1803.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 736:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0003662109375,1178.0,-1769.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 737:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0003814697265625,1225.0,-1735.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 738:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0003814697265625,1272.0,-1700.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 739:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000396728515625,1319.0,-1665.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 740:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000396728515625,1365.0,-1630.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 741:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0004119873046875,1412.0,-1595.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 742:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00042724609375,1458.0,-1559.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 743:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00042724609375,1503.0,-1523.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 744:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0004425048828125,1549.0,-1487.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 745:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000457763671875,1594.0,-1450.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 746:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000457763671875,1640.0,-1414.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 747:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0004730224609375,1664.0,-1365.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 748:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00048828125,1673.0,-1308.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 749:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00048828125,1681.0,-1250.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 750:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0005035400390625,1689.0,-1192.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 751:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0005035400390625,1696.0,-1135.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 752:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000518798828125,1703.0,-1078.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 753:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0005340576171875,1710.0,-1022.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 754:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0005340576171875,1717.0,-966.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 755:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00054931640625,1724.0,-910.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 756:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0005645751953125,1730.0,-854.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 757:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0005645751953125,1736.0,-798.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 758:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000579833984375,1742.0,-742.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 759:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000579833984375,1747.0,-686.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 760:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0005950927734375,1752.0,-629.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 761:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0006103515625,1757.0,-573.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 762:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0006103515625,1762.0,-517.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 763:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0006256103515625,1766.0,-460.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 764:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000640869140625,1770.0,-404.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 765:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000640869140625,1773.0,-347.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 766:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0006561279296875,1777.0,-291.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 767:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0006561279296875,1780.0,-234.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 768:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00067138671875,1782.0,-178.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 769:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0006866455078125,1784.0,-121.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 770:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0006866455078125,1786.0,-64.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 771:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000701904296875,1787.0,-8.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 772:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0007171630859375,1788.0,49.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 773:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0007171630859375,1789.0,106.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 774:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000732421875,1789.0,163.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 775:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0007476806640625,1789.0,220.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 776:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0007476806640625,1788.0,277.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 777:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000762939453125,1786.0,334.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 778:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000762939453125,1784.0,390.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 779:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0007781982421875,1781.0,447.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 780:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00079345703125,1778.0,504.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 781:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00079345703125,1775.0,561.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 782:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0008087158203125,1770.0,618.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 783:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000823974609375,1765.0,675.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 784:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000823974609375,1759.0,732.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 785:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0008392333984375,1753.0,789.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 786:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0008392333984375,1745.0,846.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 787:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0008544921875,1737.0,903.0],ctrans,1,(6+time)%11,0,time);
			break;
		case 788:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0008697509765625,1728.0,960.0],ctrans,1,(7+time)%11,0,time);
			break;
		case 789:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0008697509765625,1718.0,1016.0],ctrans,1,(8+time)%11,0,time);
			break;
		case 790:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000885009765625,1707.0,1073.0],ctrans,1,(9+time)%11,0,time);
			break;
		case 791:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0009002685546875,1695.0,1129.0],ctrans,1,(10+time)%11,0,time);
			break;
		case 792:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0009002685546875,1682.0,1185.0],ctrans,1,(0+time)%11,0,time);
			break;
		case 793:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00091552734375,1667.0,1241.0],ctrans,1,(1+time)%11,0,time);
			break;
		case 794:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.00091552734375,1652.0,1297.0],ctrans,1,(2+time)%11,0,time);
			break;
		case 795:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0009307861328125,1635.0,1352.0],ctrans,1,(3+time)%11,0,time);
			break;
		case 796:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000946044921875,1617.0,1407.0],ctrans,1,(4+time)%11,0,time);
			break;
		case 797:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.000946044921875,1597.0,1462.0],ctrans,1,(5+time)%11,0,time);
			break;
		case 798:
			place("sprite86",canvas,ctx,[-1.0,0.0,0.0,1.0009613037109375,1586.0,1520.0],ctrans,1,(6+time)%11,0,time);
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
			place("sprite19",canvas,ctx,[0.05,0.0,0.0,0.05,26.4,178.4],ctrans,1,(0+time)%120,0,time);
			place("sprite26",canvas,ctx,[-0.05,0.0,0.0,0.05,296.9,31.4],ctrans,1,(0+time)%819,0,time);
			place("sprite52",canvas,ctx,[0.05,0.0,0.0,0.05,0.15,441.0],ctrans,1,(0+time)%859,0,time);
			place("sprite80",canvas,ctx,[0.05,0.0,0.0,0.05,432.1,302.0],ctrans,1,(0+time)%230,0,time);
			place("sprite87",canvas,ctx,[-0.05,0.0,0.0,0.05,189.85,276.5],ctrans,1,(0+time)%799,0,time);
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
var images = [imageObj1,imageObj5,imageObj9,imageObj20,imageObj27,imageObj53,imageObj81];
var ready = Promise.all(images.map(function (image) {
  if (image.decode) return image.decode().catch(function () {});
  if (image.complete) return Promise.resolve();
  return new Promise(function (resolve) {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
  });
}));

window.FFDecRootMovies = window.FFDecRootMovies || Object.create(null);
window.FFDecRootMovies["scg2"] = Object.freeze({
  period: 859,
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
    main(ctx, ctrans, 0, 0, time % 859);
    ctx.restore();
  }
});

})();
