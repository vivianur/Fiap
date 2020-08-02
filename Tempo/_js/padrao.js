var $SCROLL_TOP = $(window).scrollTop(),
    $WIDTH_TELA = window.innerWidth,
    $BREAKPOINT_MENU = 1000,
    $BREAKPOINT_MOBILE = 1000;


$('html, body').animate({
    scrollTop: 0
}, 1);


$(window).on('resize', function() {
    //Slider.
    $WIDTH_TELA = window.innerWidth;

    if ($WIDTH_TELA <= $BREAKPOINT_MOBILE) {
        $('.slider').slick('unslick');

    } else {
        $('.slider').slick({
            arrows: true,
            dots: true,
            adaptiveHeight: true
        });

    };
});

$(document).ready(function() {

    //Bloqueando copia e cola dos parágrafos
    function mensagem(){
        alert('Conteudo bloqueado!');
        return false;
    }
    $('p, table').not('pre').bind('cut copy paste', function(event) {
        event.preventDefault();
        mensagem();
    });

    // Conta as figuras automaticamente
    $('figure').each(function (i) {
        var count = i+1;
        $(this).find('figcaption').html('<b>FIG.</b> '+count+ ':&nbsp;' + $(this).find('figcaption').html());
    });


    //Voltar ao Topo.
    $(".bt-topo").hide();

    $('.bt-topo').click(function() {
        $('body,html').animate({scrollTop:0},600);
    });

    $(window).scroll(function () {
        //Voltar ao Topo.
        if ($(this).scrollTop() > 300) {
            $('.bt-topo').fadeIn();
        } else {
            $('.bt-topo').fadeOut();
        };
        //Menu ul li a.
        $('nav.nav-default ul li a').each(function(i) {
            var pos = $('.item-menu').eq(i).offset().top;
            if ($(document).scrollTop() >= pos - 100) {
                $('nav.nav-default ul li a').removeClass('ativo');
                $(this).addClass('ativo');
            }
        });
    });


    //WOW.
    new WOW().init();


    //Cria o menu dinâmico
    $('.item-menu').each(function (i) {
        var nome = $(this).data('name'),
            span = $('<span>',{text: (i+1)}),
            a = $('<a>', { text: nome, href: '#', 'data-roll': '#'+$(this).attr('id') }),
            li = $('<li>');

        $(a).append(span);
        $(li).append(a);
        $('nav ul').append(li);
    });

    //Navegação do menus
    $('nav.nav-default ul li a').eq(0).addClass('ativo');
    $('nav ul li a').click(function (e) {
        e.preventDefault();
        var id = $(this).data('roll');
        $('body, html').animate({'scrollTop': $(id).offset().top});
        $('nav.nav-default ul li a').removeClass('ativo');
        $(this).addClass('ativo');
    });
    $('nav.nav-mobile ul li a').click(function(e){
        e.preventDefault();
        $('nav.nav-mobile').slideToggle('slow');
    });

    //Abrir Menu.
    var alturaNav = $('nav.nav-default').height();
    $('nav.nav-default').css('margin-top',-(alturaNav/2));

    $('nav.nav-default ul li a').hover(
        function(){
            var tamanhoLi = $(this).width();
            var tamanhoSpan = $(this).find('span').width();

            $(this).find('span').css('display', 'none');
            $(this).css({
                marginLeft: -(tamanhoLi-30),
                width: tamanhoLi+30
            });
        },function(){
            $(this).find('span').css('display', 'block');
            $(this).css({
                marginLeft: '0',
                width: 'auto'
            });
        }
    );
    $('.bt-abrir-menu').on('click', function() {
        $('nav.nav-mobile').slideToggle('slow');

        return false;
    });

    //Accordion.
    $('.js-abrir-accordion').on('click', function() {
        $(this).closest('.slick-list').css('height', 'auto');
        var el = $(this),
            conteudo = el.next('.accordion-conteudo');

        if (el.hasClass('is-active')) {
            conteudo.slideUp('slow');

            el.removeClass('is-active');
        } else {
            conteudo.slideDown('slow');

            el.addClass('is-active');
        }
    });

    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        modal: true
    });
    $(document).on('click', '.popup-modal-fechar', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    //Slider.
    if ($WIDTH_TELA > $BREAKPOINT_MOBILE) {

        // Tooltip.
        $('.abre-tooltip').hover(function(){
            var title = $(this).attr('title');
            $(this).data('tipText', title).removeAttr('title');
            $('<p class="tooltip animated bounceIn"></p>')
                .text(title)
                .appendTo('body')
                .fadeIn('slow');
        }, function() {
            $(this).attr('title', $(this).data('tipText'));
            $('.tooltip').remove();
        }).mousemove(function(e) {
            var mousex = e.pageX - 200;
            var mousey = e.pageY + 10;
            $('.tooltip')
                .css({ top: mousey, left: mousex })
        });

        //Popup.
        $('.image-popup').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom',
            image: {
                verticalFit: false
            },
            zoom: {
                enabled: true,
                duration: 300
            }
        });

        //Slider.
        $('.slider').slick({
            arrows: true,
            dots: true,
            adaptiveHeight: true
        });

        //Scrollbar.
        $(".scrollbar").mCustomScrollbar({
            scrollButtons:{enable:true},
            theme:"rounded-dark",
        });

        // Sair.
        $('.bt-sair').attr('href', parent.window.geturl());

    };

});

