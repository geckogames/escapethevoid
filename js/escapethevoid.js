var cv, ctx, screenid = 0, pscreenid = -1, screens, cvtop, cvleft, error = false, keys = [];

var keybindings = {};

// Zoneclick - Check wether a click happened within a zone on the screen.
var zoneclick = function (zonex, zoney, width, height, clickx, clicky) {
    return (clickx > zonex - 1 && clickx < zonex + width + 1 && clicky > zoney - 1 && clicky < zoney + height + 1)
}
screens = [
    { // Title Screen
        name: "TITLE_SCREEN",
        update: function () {
            ctx.drawImage(document.querySelector("#main_img"), 0, 0);
        },
        mouseup: function (x, y) {
            if(zoneclick(150, 200, 200, 50, x, y)) {
                change_screen(1);
            }
        }
    }
]
var change_screen = function (x) {
    nomusic()
    pscreenid = screenid // Assign Previous Screen ID for errors.
    screenid = x // Assign Current Screen ID to requested ID
}
var level_select = function () {
    change_screen(4)
}

// Chunk String - From http://stackoverflow.com/questions/1772941/how-can-i-insert-a-character-after-every-n-characters-in-javascript
String.prototype.chunk = function(n) {
    var ret = []
    for(var i=0, len=this.length; i < len; i += n) {
       ret.push(this.substr(i, n))
    }
    return ret
}

// Error Screen Function - Draws Error Messages to the Screen
var errorscreen = function (text) {
    // Split text by lines
    var texts = text.split("\n")
    // Distance between lines on screen (px)
    const POS_JUMP = 24
    // Draw basic error box BG

    var lines = 0

    // Draw text line by line
    for(var i = 0; i < texts.length; i++) {
        var chs = texts[i].chunk(45)
        for(var j = 0; j < chs.length; j++) {
            ctx.fillText(chs[j], 24, (lines + 1) * POS_JUMP + 55)
            lines++
        }
    }
}

// NoMusic function - Stops all audio
var nomusic = function () {
    var audios = document.getElementsByTagName("audio")
    for(var i = 0; i < audios.length; i++) {
        audios[i].pause()
        audios[i].currentTime = 0
    }
}

var iskeydown = function (keycode) {
    return (keys.indexOf(keycode) > -1)
}

/* From: http://diveintohtml5.info/storage.html */
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

var mute = function (opt) {
    nomusic();
    muted = opt;
    if(supports_html5_storage()) {
        localStorage.muted = opt;
    }
}

// Window Onload - Triggered on page load (duh)
window.onload = function () {
    if(supports_html5_storage() && localStorage.muted) {
        muted = JSON.parse(localStorage.muted);
    }
    window.scrollTo(0, 0)
    cv = document.querySelector("#voidvas")
    ctx = cv.getContext("2d")
    cvtop = cv.getBoundingClientRect().top
    cvleft = cv.getBoundingClientRect().left
    ctx.font = "18px monospace"
    // SING IT TO THE WORLD...
    var goodidea = false;
    // ...YUP!
    setInterval(function () {
        ctx.clearRect(0,0,500,500)
        if(!screens[screenid] || !screens[screenid].update) {
            nomusic()
            error = "Attempting to read nonexistent screen: " + screenid + (screens[screenid].name ? " (" + screens[screenid].name + ")" : "") +  "\n" + "Transition triggered by screen: " + pscreenid + (screens[pscreenid].name ? " (" + screens[pscreenid].name + ")" : "")
        }
        if(error) {
            errorscreen(error)
        } else  {
            screens[screenid].update()
            if(screens[screenid].music) {
                document.querySelector("#" + screens[screenid].music).play()
            }
        }
    }, 9)
    cv.onmouseup = function (e) {
        if(screens[screenid].mouseup) {
            screens[screenid].mouseup(e.clientX - cvleft, e.clientY - cvtop)
        }
    }
    window.onkeydown = function (e) {
        if(iskeydown(e.keyCode)) return
        keys.push(e.keyCode)
        if(e.keyCode !== 116) e.preventDefault()
    }
    window.onkeyup = function (e) {
        keys.splice(keys.indexOf(e.keyCode), 1)

    }
    window.onerror = function (msg, url, ln) {
        var e = "ERROR IN: " + url.replace(/^.*[\\\/]/, '') + ":" + ln + "\n" + msg
        error = e
    }
}
