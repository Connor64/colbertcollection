function includeHTML() {
    var includes = $('[data-include]');
    $.each(includes, function () {
        // var file = 'views/' + $(this).data('include') + '.html'
        var file = $(this).data('include');
        $(this).load(file)
    })
}