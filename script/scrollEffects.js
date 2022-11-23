var navbar, banner, links;

var bigNavbar = true; // Indicates whether the navbar is fullscreen or not
var homepage = false; // Deprecated tbh

// Array of operations to execute when document.documentElement.scrollTop is greater than the indicated threshold
// Format: [threshold, function, defaultFunction]
var scrollOperations = [
    [200, shrinkNavbar, growNavbar],
    [200, shadeBackground, unshadeBackground],
];

$(document).ready(function () { initialize(); });
$(window).scroll(function () { executeScrollOperations(); });

// Iterates over all operations indicated in scrollOperations array
function executeScrollOperations() {
    var scrollTop = document.documentElement.scrollTop;
    
    for (const operation of scrollOperations) {
        if (scrollTop > operation[0]) {
            operation[1]();
        } else {
            operation[2]();
        }
    }
}

// Initializes the data
function initialize() {
    navbar = document.getElementsByClassName("navbar")[0];
    banner = document.getElementsByClassName("banner")[0];
    links = document.getElementsByClassName("nav-links");

    // homepage = document.URL.includes("index.html");
    homepage = true;

    if (homepage) {
        growNavbar();
    } else {
        shrinkNavbar();
    }

    executeScrollOperations(); // Check scrolling
}

// Shrinks the navbar from a full-screen element to just be at the top
// once the user scrolls far down enough
function shrinkNavbar() {
    if (bigNavbar) {
        navbar.setAttribute("id", "navbar-shrink"); // Shrink navbar
        banner.setAttribute("id", "banner-shrink"); // Shrink banner

        // Shrink all link elements
        for (const element of links) {
            element.setAttribute("id", "nav-links-shrink");
        }

        document.getElementsByClassName("link-container")[0].style.visibility = "hidden";

        bigNavbar = false;
    }
}

// Grows the navbar back to the default, full-screen size once the user
// has scrolled back to the top
function growNavbar() {
    if (!bigNavbar && homepage) {
        navbar.setAttribute("id", ""); // Grow navbar (by removing ID)
        banner.setAttribute("id", ""); // Grow banner

        // Grow all link elements
        for (const element of links) {
            element.setAttribute("id", "");
        }

        document.getElementsByClassName("link-container")[0].style.visibility = "visible";

        bigNavbar = true;
    }
}

// Shades the background as you scroll
function shadeBackground() {
    var background = document.getElementById("background-thing");
    var scrollTop = document.documentElement.scrollTop;

    var ratio = (scrollTop - 200) / 800;

    background.style.filter = "brightness(" + (1 - ratio) + ")";
    background.style.filter += "blur(" + (ratio * 3) + "px)";
}

function unshadeBackground() {
    // var background = document.getElementsByClassName("page-header")[0];

    // background.style.filter = "brightness(1) blur(0px)";

}

// Returns an array of all css attributes of an element w/ values
// function getDefaultProperties(element) {
//     var dict = {};
//     var style = getComputedStyle(element);

//     for (const s of style) {
//         if (style.getPropertyValue(s).includes("px") && style.getPropertyValue(s) != "0px") {
//             var val = parseFloat(style.getPropertyValue(s).replace("px", "")); // Remove "px" suffix

//             // Get ratios between pixel value and viewport size
//             var vHeight = +((val / window.innerHeight) * 100).toFixed(3);
//             var vWidth = +((val / window.innerWidth) * 100).toFixed(3);

//             if (s == "font-size" && element == banner) {
//                 console.log("val: " + val);
//                 console.log("vwidth: " + vWidth);
//                 console.log("vheight: " + vHeight);

//                 var valLength = ((String)(val)).length;
//                 var wLength = ((String)(vWidth)).length;
//                 var hLength = ((String)(vHeight)).length;

//                 console.log("val length: " + valLength);
//                 console.log("vwidth length: " + wLength);
//                 console.log("vheight length: " + hLength);
//             }

//             // Set the ratio to whatever results in the "cleaner"/shorter number.
//             var newVal = valLength < wLength ? (style.getPropertyValue(s)) : wLength < hLength ? (vWidth + "vw") : (vHeight + "vh");

//             // Compare the lengths of the strings (shortest is used as it's more readable so it's likely the one I set)
//             // (this isn't a perfect algorithm and could very well not work at all at times but it's good enough)
//             dict[s] = newVal;

//         } else {
//             dict[s] = style.getPropertyValue(s); // If it doesn't include "px" or is "0px", just set the value directly
//         }
//     }

//     return dict;
// }
