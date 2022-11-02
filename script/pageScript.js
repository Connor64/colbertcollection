function showImages(element) {
    var windowHeight = jQuery(window).height();
    $(element).each(function () {
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos) {
            $(this).addClass("fadeIn");
        }
    });
}

$(document).ready(function () {
    //showImages('.gallery')
});

$(window).scroll(function () {
    //// Makes sidebar stick to top
    //if (document.documentElement.scrollTop >= window.innerHeight - 50) {
    //    $("#navbar").css("position", "fixed");
    //    $("#navbar").css("top", 50);
    //} else {
    //    $("#navbar").css("position", "static");
    //}

    // Makes images appear on scroll if within screen bounds
    //showImages('.gallery');
});