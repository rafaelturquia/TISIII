$(window).on('load', function() {
    alturaSection();
});

$(window).resize(function() {
    alturaSection();

    if (isDesktop()) {
        texto_lazer();
        thumbs_lazer();
        thumb_mapa();
        thumb_implantacao();
    }
});

$(document).ready(function() {
    link_chat(129, 1542, 3820);
    link_mapa(3820);

    menu();
    if (isMobile()) {
        alturaSection();
    }

    photoswipe('.galeria');
    allFancybox();

    formularioRodape();
    checkboxs();

    if (isDesktop()) {
        texto_lazer();
        thumbs_lazer();
        thumb_mapa();
        thumb_implantacao();
    }

    // $(".txtcelular").mask("(99) 999999999");

    $(".galeriadefotos").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        lazyLoad: 'ondemand',
        nextArrow: "<span class='setas slick-next'><i class='icon-right-open-big'></i></span>",
        prevArrow: "<span class='setas slick-prev'><i class='icon-left-open-big'></i></span>"
    });

    if (isMobile()) {
        $(".mobileslide").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            infinite: false,
            lazyLoad: 'ondemand',
            nextArrow: "<span class='setas slick-next'><i class='icon-right-open-big'></i></span>",
            prevArrow: "<span class='setas slick-prev'><i class='icon-left-open-big'></i></span>"
        });
    }

    // var vid = document.getElementById("video-destaque");
    // vid.volume = 0;

    // $('.vitrine .bt-video').click(function() {
    //     vid.volume = 1;
    //     $('#video-destaque').addClass('ativo');
    //     $('.fechar-video').addClass('ativo');
    // });

    // $('.fechar-video').click(function() {
    //     vid.volume = 0;
    //     $('#video-destaque').removeClass('ativo');
    //     $('.fechar-video').removeClass('ativo');
    // });

    $('.center-height').each(function(index, value) {
        $heightParent = $(this).parent().innerHeight() / 2;
        $heightObject = $(this).innerHeight() / 2;
        $valHeight = $heightParent - $heightObject;
        $(this).css({ "position": "relative", "top": $valHeight })
    });

    $('.icons-desc li').click(function() {
        var boxInfo = $(this).find('.box-info');
        var InfoCont = $(this).find('.info-cont');

        boxInfo.toggleClass('ativo');

        $heightParent = boxInfo.innerHeight() / 2;
        $heightObject = InfoCont.innerHeight() / 2;
        $valHeight = $heightParent - $heightObject + 27;
        InfoCont.css({ "top": $valHeight });

    });
    if (isMobile()) {
        $('.mobile-bts').click(function() {
            $(this).toggleClass('close-menu');
            $('.header').toggleClass('ativo');
        });
        $('.nav-menu li a').click(function() {
            $('.mobile-bts').toggleClass('close-menu');
            $('.header').toggleClass('ativo');
        });
        $('.bt-header').click(function() {
            $('.mobile-bts').removeClass('close-menu');
            $('.header').removeClass('ativo');
        });
    }


    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html,body,[canvas=container]').animate({
            scrollTop: $(this.hash).offset().top
        }, 800);
    });

    setTimeout(function() {
        $('.header nav ul li a.scroll').each(function(index, value) {
            var section = $(this.hash);
            var link = $(this);
            var alturasection = section.offset().top;
            var before = section.offset().top;
            var after = section.offset().top + section.innerHeight();

            console.log(before);
            console.log(after);

            $(window).scroll(function() {
                if ($(this).scrollTop() >= before && $(this).scrollTop() < after) {
                    link.addClass('ativo');
                } else {
                    link.removeClass('ativo');
                }
            });

        });
    }, 1000);

    $('.btn-cad').click(function() {
        var erro = 0;

        $('.form').find('.obrigatorio').each(function() {

            var campo = $(this);
            var valor = campo.val();


            if (valor === "" || valor === "(__) ________" || (campo.hasClass('email') && !IsEmail(valor))) {
                erro++;
            }

            if (erro > 0) {
                campo.addClass('erro');
            } else {
                campo.removeClass('erro');
            }

        });

        if (erro > 0) {
            $('.msg').addClass('erro').text('Preencha todos os campos corretamente.');

        } else {
            var telefone = $('#txtcelular').val().replace("(", "").replace(")", "").replace(" ", "");
            var nome = $('#nome').val(); 
            var email = $('#email').val();

            var dados = {
                Nome: nome,
                Email: email,
                Celular: telefone,
            };

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "proxy.aspx/GravaContato",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(dados)
            }

            $.ajax(settings).done(function(response) {

                if (response.d) {
                    $('.msg').addClass('ok').text('Cadastro realizado com sucesso.');
                } else {
                    $('.msg').addClass('erro').text('O e-mail informado j\u00e1 est\u00e1 cadastrado em nosso banco de dados.');
                }
            });

            $('#txtcelular').val('');
            $('#email').val('');
            $('#nome').val('');
        }
        return false;

    });

});

function IsEmail(email) {
    var exclude = /[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
    var check = /@[\w\-]+\./;
    var checkend = /\.[a-zA-Z]{2,3}$/;
    if (((email.search(exclude) !== -1) || (email.search(check)) === -1) || (email.search(checkend) === -1)) {
        return false;
    } else {
        return true;
    }
}