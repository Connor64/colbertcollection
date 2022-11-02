var navbar, banner, links;

var big = true;
var homepage = false;

$(document).ready(function () {
    navbar = document.getElementsByClassName("navbar")[0];
    banner = document.getElementsByClassName("banner")[0];
    links = document.getElementsByClassName("nav-links");

    initialize();
});

$(window).scroll(function () {
    scrollFunction();
});

function scrollFunction() {
    var scrollThreshold = 200;

    if (document.documentElement.scrollTop > scrollThreshold) {
        // Smaller navbar
        if (big) {
            shrink();
            big = false;
        }

    } else {
        // Default, big navbar
        if (!big && homepage) {
            grow();
            big = true;
        }

    }
    console.log(homepage);
}

function initialize() {
    // homepage = document.URL.includes("index.html");
    homepage = true;
    if (homepage) {
        grow();
    } else {
        shrink();
    }

    scrollFunction(); // Check scrolling
}

function shrink() {
    navbar.setAttribute("id", "navbar-shrink"); // Shrink navbar
    banner.setAttribute("id", "banner-shrink"); // Shrink banner

    // Shrink all link elements
    for (const element of links) {
        element.setAttribute("id", "nav-links-shrink");
    }
}

function grow() {
    navbar.setAttribute("id", ""); // Grow navbar (by removing ID)
    banner.setAttribute("id", ""); // Grow banner

    // Grow all link elements
    for (const element of links) {
        element.setAttribute("id", "");
    }
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