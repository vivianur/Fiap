var $SCROLL_TOP = $(window).scrollTop(),
    $WIDTH_TELA = window.innerWidth,
    $BREAKPOINT_MENU = 1000,
    $BREAKPOINT_MOBILE = 1000;


$('html, body').animate({
    scrollTop: 0
}, 1);


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
    $('.col-lg-12,.col-md-12').not('.slick-cloned').find('figure').each(function (i) {
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

    if ($WIDTH_TELA > $BREAKPOINT_MOBILE) {

        //Popup da imagem.
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
    };

    //Popup modal.
    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        modal: true
    });

    //Fechar modal.
    $(document).on('click', '.popup-modal-fechar', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    //Sair.
    $('.bt-sair').attr('href', parent.window.geturl());
});

