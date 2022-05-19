//////////////////////////////////// widget layout Control


    //widget edit mode 
    function removeColumn(event){
        $(event.target).closest('div').remove();
        var layoutadd = $('.layout').outerWidth() - 350;
        $('.layout').css('width', layoutadd);
        $('#lglife span').css('width', layoutadd);
        addbuttonToggle();
    };
    function addbuttonToggle() {
        maxComumn = 999
        var columns = $( "#freewall > div" ).length;
        if (columns >= maxComumn) {
            $('button.add').hide();
        } else {
            $('button.add').show();
        };
    }
    function saveChanges() {
        $('.filter-items').slideToggle();
        $('div#freewall').removeClass('editable');
        $("#freewall > div").sortable( "disable" )
    }
    
    $(function() {

        //widget edit mode - icons
        var emptyicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 9l10 7.675-4.236.71 2.659 5.422-2.44 1.193-2.675-5.474-3.308 2.863v-12.389zm0-5c-2.209 0-4 1.791-4 4 0 1.477.81 2.752 2 3.445v-1.225c-.609-.55-1-1.337-1-2.22 0-1.654 1.346-3 3-3s3 1.346 3 3c0 .246-.038.481-.094.709l.842.646c.154-.424.252-.877.252-1.355 0-2.209-1.791-4-4-4zm-2 9.65c-2.327-.826-4-3.044-4-5.65 0-3.309 2.691-6 6-6s6 2.691 6 6c0 .939-.223 1.824-.609 2.617l1.617 1.241c.631-1.145.992-2.459.992-3.858 0-4.418-3.581-8-8-8-4.418 0-8 3.582-8 8 0 3.727 2.551 6.849 6 7.738v-2.088z"/></svg>'
        var emptyMsg = '<span class="empty ui-state-disabled">' + emptyicon + 'This Column is empty.<br>Drop widgets or delete.<a onclick="removeColumn(event);" href="#">Delete</a></span>'
        var emptyColumn = '<div class="">' + emptyMsg + '</div>'
        var closeicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>'
        $('.closeicon').append(closeicon);
        
        //widget edit mode start
        $('#setup').on('click', function() {
            $('.filter-items').slideToggle();
            $('div#freewall').addClass('editable');
            $("#palette").modal({backdrop: false});
            startSortable ();
        });

        //widget edit mode - startSortable start
        function startSortable () {
            $( "#freewall > div" ).sortable({
                revert: true,
                connectWith: "#freewall > div",
                cancel: ".ui-state-disabled",
                stop: function() { 
                    $("#freewall > div").each(function(){
                        var bricks = $(this).children('div.brick').length;
                        
                        if (bricks == 0) {
                            $(this).html(emptyMsg)
                        } else {
                            $(this).find('span.empty').remove();
                        }
                    });
                    
                }
            }).disableSelection();
            $("#freewall > div").sortable( "enable" )
        }

        //widget edit mode - add column
        $('button.add').click(function(){
            $(this).before(emptyColumn);
            startSortable();
            addbuttonToggle();
            var layoutadd = $('.layout').outerWidth() + 350;
            $('.layout').css('width', layoutadd);
            $('#lglife span').css('width', layoutadd);
        });

        //swiper ///////////////////////////////////////////////////////
        // var swiper2 = new Swiper('.swiper-congrat', {
        //     spaceBetween: 30,
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //     },
        // });
        
        // var swiper1 = new Swiper('.swiper-photo', {
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //     },
        // });

        $('#palette').draggable({
            handle: ".modal-header",
        });
        $('#palette ul li').click(function(){
            $(this).toggleClass('added');
        });
    });

    $(function() {
        $('#saved').click(function() {
            var rand = 'bg' + Math.floor((Math.random() * 21) + 1);
            var bgimg = "url('../images/demo/widget_bg/" + rand + ".jpg')";
            console.log(bgimg);
            $('body').css('background-image', bgimg);
        });
    });

    var wsetup = '<ul class="bsetup" id=""> <li class="refreshbrick"><i class="fa fa-refresh"></i> 새로고침</li> <li class="refreshbrick"><i class="fa fa-cog"></i> 설정</li> <li class="delbrick" id="120001530234"><i class="fa fa-trash-o"></i> 삭제</li> </ul>'
    $('div.brick div.info > i.fa-ellipsis-v').click(function() {
        $('.bsetup').hide();
        $(this).parent().siblings('.bsetup').fadeToggle();
    });
    $('div.brick div.info > i.fa-ellipsis-v').click(function(event) {
        event.stopPropagation();
    });
    $('.brick').append(wsetup);

    // 레이어 닫기, 통합검색 원복시키기
    window.addEventListener('blur',function(){
        if(document.activeElement.className == 'iframet'){
            $('.bsetup').hide();
        }
    });
    $('body').click(function() {
        $('.bsetup').hide();
    });


$(function() {


    $("#simple").click(function() {
        $('.layout').addClass('simple');
        $(".brick.full").each(function() {
            $(this).find('i.fa.angle').removeClass('fa-angle-up').addClass('fa-angle-down');
            $(this).find('.tg_full').slideUp();
            $(this).find('.tg_simple').slideDown();
            var sizew = $(this).attr('size-s').substring(1, 2);
            var sizeh = $(this).attr('size-s').substring(2, 3);
            $(this).attr('data-width', cellw * sizew);
            $(this).attr('data-height', cellh * sizeh);
            $(this).removeClass('full').addClass('simple');
        });

    });

    $("#full").click(function() {
        $('.layout').removeClass('simple');
        $(".brick.simple").each(function() {
            $(this).find('i.fa.angle').removeClass('fa-angle-down').addClass('fa-angle-up');
            $(this).find('.tg_full').slideDown();
            $(this).find('.tg_simple').slideUp();
            var sizew = $(this).attr('size-f').substring(1, 2);
            var sizeh = $(this).attr('size-f').substring(2, 3);
            $(this).attr('data-width', cellw * sizew);
            $(this).attr('data-height', cellh * sizeh);
            $(this).removeClass('simple').addClass('full');
        });

    });

    // $("#saved").click(function() {
    //     location.reload(true);
    // });

    var cellw = 175;
    var cellh = 160;

    $(document).on('click', '.brick.simple i.fa.angle', function() {
        $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
        var brick = $(this).parent().parent();
        var simple = brick.attr('size-s');
        var full = brick.attr('size-f');
        brick.removeClass('simple').addClass('full');
        brick.removeClass(simple).addClass(full);


    });

    $(document).on('click', '.brick.full i.fa.angle', function() {

        $(this).removeClass('fa-angle-up').addClass('fa-angle-down');
        var brick = $(this).parent().parent();
        var simple = brick.attr('size-s');
        var full = brick.attr('size-f');
        brick.removeClass('full').addClass('simple');
        brick.removeClass(full).addClass(simple);


    });


    $(document).on('click', '.brick .delbrick', function() {
        var brick = $(this).parent().parent();
        brick.remove();
    });


    // $(document).on('click', '.save' , function() {
    // 	alert('위젯의 펼침상태가 저장되었습니다.')
    // })

    $('.fix input').on('change', function() {

        if ($(this).is(':checked')) {
            var laywidth = $('.layout').width();
            $('.layout').css({
                'width': laywidth + 100,
                'margin-right': 'auto',
                'margin-left': 'auto',
            });
        } else {
            $('.layout').css({
                'width': 'auto',
            });
        };
    });

    $('.w2').on('click', function() {
        $('.layout').css('width', '1100px');
        $('#lglife span').css('width', '1100px');
        $('.setwl dd').removeClass('on');
        $(this).addClass('on');
        
    });
    $('.w3').on('click', function() {
        $('.layout').css('width', '1460px');
        $('#lglife span').css('width', '1460px');
        $('.setwl dd').removeClass('on');
        $(this).addClass('on');
        
    });
    $('.w4').on('click', function() {
        $('.layout').css('width', '1585px');
        $('.setwl dd').removeClass('on');
        $(this).addClass('on');
        
    });
    $('.wa').on('click', function() {
        $('.layout').css('width', 'auto');
        $('.setwl dd').removeClass('on');
        $(this).addClass('on');
        
    });

    $('.setbg dd').on('click', function() {
        var bg = $(this).css('background-color');
        $('html, body').css('background-color', bg);
        $(this).siblings().removeClass('on');
        $(this).addClass('on');
    });

    
});

$(document).ready(function() {
    $(".brick.simple").find('i.fa.angle').addClass('fa-angle-down').removeClass('fa-angle-up');
    $('.brick.simple').find('.tg_full').hide();
    $(".brick.full").find('i.fa.angle').addClass('fa-angle-up').removeClass('fa-angle-down');
    $('.brick.full').find('.tg_simple').hide();
    $('div.brick iframe').show();
});

// loading 
$(window).on('load', function() {
    $('.commonLoader').fadeOut();
});