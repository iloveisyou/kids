// Accordion menu - add class to li with child ul 
$('.accordion-nav li').has('ul').addClass('hasChild');

// Accordion menu - open/close
$('.accordion-nav li.hasChild.on > a').next('ul').show();
$('.accordion-nav li.hasChild > a').on('click', function() {
    $(this).parent().toggleClass('on');
    $(this).next('ul').slideToggle('fast');
});

// Accordion menu - add class to li with no child
$('.accordion-nav li').not(':has("ul")').addClass('noChild');

// Accordion menu - add class to selected noChild li
$('.accordion-nav li.noChild a').on('click', function() {
    $('.accordion-nav li').removeClass('current');
    $(this).parent().addClass('current');
});

// Accordion menu with badge - adjust padding right
$('.accordion-nav li a').has('.badge').css('padding-right', 50);


// LNB toggle animation
$('#lnb-toggle').on('click', function() {
    $('#legacy #wrapper').toggleClass('folded');
// $('#legacy header').animate({'left': -190}, 350);
// $('#legacy-content').animate({'padding-left': 10 + 'px'}, 350);
});
$('#lnb-toggle').on('mouseover', function() {

});
$('.accordion-nav').scroll(function() {
if ($(this).scrollTop() >= 5) {
// user scrolled 50 pixels or more;
// do stuff
$('#lnb-header').addClass('scrolled');
} else {
$('#lnb-header').removeClass('scrolled');
}
});