//META{"name":"themeChanger"}*//
var themeChanger = function () { };

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
function backgroundChanger() {
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
                //Applying external CSS file
                $("head").append('<link rel="stylesheet" href="https://dl.dropbox.com/s/76cvx1p7f2elvht/new.theme.css"/>');
                //Applying background stuff
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
}


(function () {
    "use strict";
    const getInternalInstance = e => e[Object.keys(e).find(k => k.startsWith("__reactInternalInstance"))];

    function getOwnerInstance(e, {include, exclude = ["Popout", "Tooltip", "Scroller", "BackgroundFlash"]} = {}) {
        if (e === undefined) {
            return undefined;
        }


        const excluding = include === undefined;
        const filter = excluding ? exclude : include;


        function getDisplayName(owner) {
            const type = owner._currentElement.type;
            const constructor = owner._instance && owner._instance.constructor;
            return type.displayName || constructor && constructor.displayName || null;
        }

        function classFilter(owner) {
            const name = getDisplayName(owner);
            return (name !== null && !!(filter.includes(name) ^ excluding));
        }


        for (let prev, curr = getInternalInstance(e); !_.isNil(curr); prev = curr, curr = curr._hostParent) {
            if (prev !== undefined && !_.isNil(curr._renderedChildren)) {
                let owner = Object.values(curr._renderedChildren)
                    .find(v => !_.isNil(v._instance) && v.getHostNode() === prev.getHostNode());
                if (!_.isNil(owner) && classFilter(owner)) {
                    return owner._instance;
                }
            }

            if (_.isNil(curr._currentElement)) {
                continue;
            }

            let owner = curr._currentElement._owner;
            if (!_.isNil(owner) && classFilter(owner)) {
                return owner._instance;
            }
        }

        return null;
    }

    // Helper function for finding all elements matching selector affected by a mutation
    function mutationFind(mutation, selector) {
        var target = $(mutation.target), addedNodes = $(mutation.addedNodes);
        var mutated = target.add(addedNodes).filter(selector);
        var descendants = addedNodes.find(selector);
        var ancestors = target.parents(selector);
        return mutated.add(descendants).add(ancestors);
    }

    // Automatically play GIFs and "GIFV" Videos
    function processAccessories(mutation) {
        var accessories = mutationFind(mutation, ".accessory");

        accessories.find(".image:has(canvas)").each(function () {
            var image = $(this);
            var canvas = image.children("canvas").first();
            var src = canvas.attr("src");
            if (src !== undefined) {
                image.replaceWith($("<img>", {
                    src: canvas.attr("src"),
                    width: canvas.attr("width"),
                    height: canvas.attr("height"),
                }).addClass("image qt"));
            }
        });

        // Handle GIFV
        accessories.find(".embed-thumbnail-gifv:has(video)").each(function () {
            var embed = $(this);
            var video = embed.children("video").first();
            embed.removeClass("embed-thumbnail-gifv").addClass("qt");
            embed.parent().on("mouseout.autoGif", function (event) {
                event.stopPropagation();
            });
            video[0].play();
        });
    }

    const animationForced = new WeakSet();

    function animateAvatar() {
        try {
            const messageGroup = getOwnerInstance(this, { include: ["MessageGroup"] });
            if (messageGroup.state.animatedAvatar) {
                animationForced.add(this);
                setTimeout(() => messageGroup.setState({ animate: true }));
            }
        } catch (err) {
            return;
        }
    }

    function processAvatars(mutation) {
        mutationFind(mutation, ".message-group").each(animateAvatar);
    }

    themeChanger.prototype.load = function () { };

    themeChanger.prototype.unload = function () { };

    themeChanger.prototype.start = function () {
        var mutation = { target: document, addedNodes: [document] };
        processAccessories(mutation);
        processAvatars(mutation);
        backgroundChanger(mutation);

        $(".theme-dark, .theme-light").on("mouseleave.autoGif", ".message-group", animateAvatar);
    };

    themeChanger.prototype.stop = function () {
        $(".theme-dark, .theme-light").off(".autoGif", ".message-group");
        $(".message-group").each(function () {
            if (!animationForced.delete(this)) {
                return;
            }
            try {
                getOwnerInstance(this, { include: ["MessageGroup"] }).setState({ animate: false });
            } catch (err) {
                return;
            }
        });
    };

    themeChanger.prototype.observer = function (mutation) {
        processAccessories(mutation);
        processAvatars(mutation);
    };

    themeChanger.prototype.getSettingsPanel = function () {
        return "";
    };

    themeChanger.prototype.getName = function () {
        return "Multi-Background Theme";
    };

    themeChanger.prototype.getDescription = function () {
        return "Script to change background and theme, also auto plays gif avatars";
    };

    themeChanger.prototype.getVersion = function () {
        return "2.5";
    };

    themeChanger.prototype.getAuthor = function () {
        return "Sphexator";
    };
})();