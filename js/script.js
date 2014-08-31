
function setProportion(e, t, n, r) {
    var i = getProportion(e, t, n, r);
    e.find(".vid-bg").width(i * t);
    e.find(".vid-bg").height(i * n);
    e.find(".vid-bg video").width(i * t);
    e.find(".vid-bg video").height(i * n);
    var s = (e.width() >> 1) - (e.find(".vid-bg video").width() >> 1) | 0;
    var o = (e.height() >> 1) - (e.find(".vid-bg video").height() >> 1) | 0;
    e.find(".vid-bg video").css({
        left: s,
        top: o
    })
}

function getProportion(e, t, n, r) {
    var i = jQuery(window).width();
    var s = jQuery(window).height();
    var o = i / s;
    var u = e.width();
    var a = e.height();
    var f = u / a;
    var l = t / n;
    var c = a / n;
    if (f >= l) {
        c = u / t
    } else if (r && a < jQuery(window).height()) {
        c = jQuery(window).height() / n
    }
    return c
}

function parallaxVideo(e) {
    var t = e.visible(true);
    if (t) {
        var n = parseInt(jQuery(e).position().top);
        var r = n - jQuery(window).scrollTop();
        var i = -(r / 1.5);
        var s = i + "px";
        e.find(".vid-bg video").css({
            top: s
        })
    }
}(function (e) {
    e.fn.extend({
        bgVideo: function (e) {
            return this.each(function (e) {
                var t = jQuery(this);
                var n = {
                    videofile: "img/splash",
                    videowidth: 1280,
                    videoheight: 720,
                    videoposter: "img/splash.mp4",
                    videoparallax: true,
                    videooverlaycolor: "#000000",
                    videooverlayopacity: .2,
                    videosound: t.data("sound")
                };
                t.css({
                    position: "relative",
                    overflow: "hidden",
                    "z-index": "1"
                });
                var r = "";
                if (n.videooverlaycolor) {
                    overlay = '<div class="vid-overlay" style="position:absolute;width:100%;height:100%;top:0;left:0;background:' + n.videooverlaycolor + ';z-index:-2;-webkit-backface-visibility: hidden;-webkit-transform: translateZ(0);" ></div>'
                }
                r += '<div class="vid-bg" style="position:absolute;width:100%;height:100%;top:0;left:0;z-index:-10;background: url(' + n.videoposter + ') center center; background-size: cover;">';
                if (jQuery(window)) {
                    r += '<video id="video' + e + '" preload="auto" autoplay="autoplay" loop="loop"';
                    if (n.videosound) {} else {
                        r += ' muted="muted" '
                    } if (n.videoposter) {
                        r += ' poster="' + n.videoposter + '" '
                    }
                    r += 'style="display:none;top:0;left:0;position: relative;z-index:-11;width:100%;height:100%;">';
                    r += '<source src="' + n.videofile + '.mp4" type="video/mp4" />';
                    r += '<source src="' + n.videofile + '.ogg" type="video/ogg" />';
                    r += '<source src="' + n.videofile + '.webm" type="video/webm" />';
                    r += "bgvideo</video>";
                    r += "</div>";
                    if (n.videosound) {
                        r += '<a href="#" class="mute-video" style="position: absolute;z-index:50; bottom:20px;left:50%;margin-left: -10px;color:#ffffff;display:block;width: 20px;height: 20px;"><i class="fa fa-volume-up fa-fw"></i></a>'
                    } else {}
                }
                t.prepend(overlay);
                t.append(r);
                t.find(".vid-overlay").css({
                    opacity: n.videooverlayopacity
                });
                t.find(".vid-bg video").fadeIn(1e3);
                if (jQuery(window)) {
                    setProportion(t, n.videowidth, n.videoheight, n.videoparallax);
                    jQuery(window).resize(function () {
                        setProportion(t, n.videowidth, n.videoheight, n.videoparallax);
                        parallaxVideo(t)
                    })
                }
                if (n.videoparallax) {
                    parallaxVideo(t);
                    jQuery(window).scroll(function () {
                        parallaxVideo(t)
                    })
                }
            })
        }
    })
})(jQuery);


jQuery(window).load(function (e) {
    
    if (jQuery().bgVideo) {
        setTimeout(function () {
            jQuery(".videobg-section").bgVideo()
        }, 1e3)
    }

});
