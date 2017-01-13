//META{"name":"back"}*//
var back = function () { };
var flex = document.getElementsByClassName("flex-horizontal flex-spacer");
var apps = document.getElementsByClassName("app");
var newDiv = document.createElement("div");
var next = document.createElement("button");
var prev = document.createElement("button");
var url = "https://imgur.com";
var array = [];
var dontstart = false;
var index = 1;
var incooldown = false;
var fs = require('fs');
var setBackground = function (number) {
    if (number == null) {
        console.log("Error: No number entered");
        return;
    }
    if (number >= array.length) {
        index = (array.length - 1);
        console.log("Error: Number entered is too high, setting to last image " + index);
    } else {
        index = number;
    }
    $(newDiv).fadeOut(1000);
    setTimeout(function () {
        newDiv.style.backgroundImage = "url('" + url + array[index] + "')";
    }, 800);
    $(newDiv).fadeIn(1000);
    console.log("Current background image: Index = " + index + ", URL = " + url + array[index]);
}
back.prototype.convert = function () {
    var elementExists = document.getElementById("bgImgContainer");
    $(function () {
        //text file to images
        $.get('https://dl.dropbox.com/s/lgnd2bany7kr8xt/images.txt', function (data) {
            array = data.split(' ');
            if (elementExists == null) {
                dontstart = false;
            } else {
                dontstart = true;
            }
            if (dontstart == false) {
                $("head").append('<link rel="stylesheet" href="https://dl.dropbox.com/s/plu5dmb7zinxeu7/emilia.theme.css"/>');
                flex[0].appendChild(newDiv);
                newDiv.style.width = "100%";
                newDiv.style.height = "100%";
                newDiv.style.position = "absolute";
                newDiv.style.left = "0";
                newDiv.style.top = "0";
                newDiv.style.zIndex = "-1";
                newDiv.style.backgroundSize = "cover";
                newDiv.style.backgroundColor = flex[0].style.backgroundColor;
                newDiv.id = "bgImgContainer";
                var links = document.getElementsByClassName("flex-vertical channels-wrap");
                $(links).append(prev);
                prev.innerHTML = "Prev";
                prev.style.backgroundColor = "#282b30";
                prev.id = "previousButton";
                $(links).append(next);
                next.innerHTML = "Next";
                next.style.backgroundColor = "#282b30";
                next.id = "nextButton";
                console.log("Number of background images; " + (array.length - 1));
                var randint = Math.floor(Math.random() * (array.length - 1));
                index = randint;
                $(newDiv).fadeOut(1000);
                setTimeout(function () {
                    newDiv.style.backgroundImage = "url('" + url + array[index] + "')";
                }, 1000);
                setTimeout(function () {
                    $(newDiv).fadeIn(1000);
                }, 1300);
                console.log("Current background image: Index = " + index + ", URL = " + url + array[index]);
            }

            $(next).on("click", function () {
                if (incooldown == true) {
                    return;
                }

                incooldown = true;
                setTimeout(() => {
                    incooldown = false;
                }, 1750);

                index = index + 1;
                if (index == array.length) {
                    index = 0;
                }

                $(newDiv).fadeOut(1000);
                setTimeout(function () {
                    newDiv.style.backgroundImage = "url('" + url + array[index] + "')";
                    console.log("Current background image: Index = " + index + ", URL = " + url + array[index]);
                }, 1000);
                setTimeout(function () {
                    $(newDiv).fadeIn(1000);
                }, 1300);
            });

            $(prev).on("click", function () {
                if (incooldown == true) {
                    return;
                }
                incooldown = true;
                setTimeout(() => {
                    incooldown = false;
                }, 1750);

                index = index - 1;
                if (index == -1) {
                    index = (array.length - 1);
                }

                $(newDiv).fadeOut(1000);
                setTimeout(function () {
                    newDiv.style.backgroundImage = "url('" + url + array[index] + "')";
                    console.log("Current background image: Index = " + index + ", URL = " + url + array[index]);
                }, 1000);
                setTimeout(function () {
                    $(newDiv).fadeIn(1000);
                }, 1300);
            });
        });
    });
};

back.prototype.start = function () {
    this.convert();
};

back.prototype.load = function () { };
back.prototype.unload = function () { };
back.prototype.stop = function () { };
back.prototype.getSettingsPanel = function () {
    return "";
};

back.prototype.getName = function () {
    return "Multi Anime Background Changer";
};
back.prototype.getDescription = function () {
    return "Script to change background when using a theme without a background but transparent";
};
back.prototype.getVersion = function () {
    return "2";
};
back.prototype.getAuthor = function () {
    return "Sphexator";
};
