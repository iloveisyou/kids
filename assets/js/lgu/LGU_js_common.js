$(function() {

    // detail search button toggle
    $('.page-search .btn-toggle').on('click', function() {
        if ($(this).parents('.page-search').hasClass('on')) {
            $(this).children('i').removeClass('fa-angle-up');
            $(this).children('i').addClass('fa-angle-down');
            $(this).parents('.page-search').removeClass('on');
        } else {
            $(this).children('i').removeClass('fa-angle-down');
            $(this).children('i').addClass('fa-angle-up');
            $(this).parents('.page-search').addClass('on');
        };
    });

    // module toggle (on title)
    $('.module-toggle .btn-icon').on('click', function() {
        $(this).find('i').toggleClass('fa-minus-square-o fa-plus-square');
        $(this).parents('div.module-header').next('div.module-toggle-body').slideToggle();
        $(this).parents('div.module-header').find('h3 ~ ul.list-inline').fadeToggle();
    });

    // shuttle list select
    $('.shuttle-list li').on('click', function() {
        $(this).toggleClass('selected');
    });
});

// process tabs
$(document).ready(function() {
    $('button[data-toggle="tab"]').on('show.bs.tab', function(e) {
        var $target = $(e.target);
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });
    $(".next-step").click(function(e) {
        var pt = $(this).closest('.tab-content').prev('.nav-processTabs');
        var active = pt.find('.nav-tabs li.active');
        if (active.is(":last-child")) {
            var ppt = pt.parents('.tab-content').prev('.nav-processTabs').find('.nav-tabs li.active');
            ppt.next().removeClass('disabled');
            nextTab(ppt);
        } else {
            active.next().removeClass('disabled');
            nextTab(active);
        };
    });
    $(".prev-step").click(function(e) {
        var pt = $(this).closest('.tab-content').prev('.nav-processTabs');
        var active = pt.find('.nav-tabs li.active');
        prevTab(active);
    });

    // datepicker - enable icon click
    $('.datepicker i').click(function() {
        $(this).parent().find('input').click();
    });
});

function nextTab(elem) {
    $(elem).next().find('button[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('button[data-toggle="tab"]').click();
}

$('document').ready(function() {

    // FAQ accordion
    $(".faq-accordion").on("click", ".ac-trigger", function(e) {
        var control = $(this).parent("li"),
            contents = $(this).next(".ac-contents");
        if (!control.is(".active")) {
            control.addClass("active");
            contents.slideDown(200);
        } else {
            control.removeClass("active");
            contents.slideUp(200);
        }
        e.preventDefault();
    });


    // initiate bootstrp tooltip
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
    
});


// toast message
function showToast(t){
    var html = '<div class="toast"></div>'
    $('body').prepend(html);
    var x = $('.toast');
    $(x).addClass('show').text(t);
    setTimeout(function(){
        // $(x).removeClass('show');
    },3000);
}

// loading 
$(window).on('load', function() {
    $('.commonLoader').fadeOut();
});

// 임시파일 - WSG Only  /////////////////////////////////////////////////////////////////

// selt file download button
var x = document.createElement('script');
x.src = '../../addon/download.js';
document.getElementsByTagName("head")[0].appendChild(x);

function dlHTML(){
    var pathname = window.location.pathname.split('/').pop();
    console.log(pathname);
    download(document.documentElement.outerHTML, pathname, "text/html");
}



// very common icon svg
$(document).ready(function() {
    var close = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>'
    $('i.ci.ci-close').prepend(close);
});