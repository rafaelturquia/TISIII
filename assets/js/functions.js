var viewport = {
    w: (window.innerWidth || $(window).width()),
    h: (window.innerHeight || $(window).height())
};

$(window).resize(function() {
    viewport = {
        w: (window.innerWidth || $(window).width()),
        h: (window.innerHeight || $(window).height())
    };
});

var isMobile = function() {
    return (viewport.w < 768);
};

var isTablet = function() {
    return (viewport.w >= 768 && viewport.w <= 1024);
};

var isDesktop = function() {
    return (viewport.w > 1024);
};

function thumb_implantacao() {
    var altura = $(".ficha").outerHeight();
    $(".ficha .galeria img").css("height", altura);
}

function thumb_mapa() {
    var altura = $(".localizacao").outerHeight();
    $(".localizacao .mapa img").css("height", altura);
}

function texto_lazer() {
    var altura = $(".lazer").outerHeight();
    $(".lazer .texto").css("height", altura);
}

function thumbs_lazer() {
    var altura = $(".lazer").outerHeight() / 2;
    $(".lazer .galeria li img").css("height", altura);
}

function link_chat(cidade, bairro, id) {
    var link = "PopChatDT('default.asp','" + cidade + "','" + bairro + "','" + id + "');";
    $(".link-chat").each(function() {
        $(this).attr("onclick", link);
    });

    $("#idEmpreendimento, #idEmpreendimento2").attr("value", id);
    $("#idCidade, #idCidade2").attr("value", cidade);
}

function link_mapa(id) {
    var link = "https://www.mrv.com.br/mapa/" + id;
    $(".localizacao .mapa").attr("href", link);
}

function PopChatDT(a, b, c, d) {
    var e = window.open("http://www.mrv.com.br/corretores/chat/" + a + "?cidade=" + b + "&bairro=" + c + "&cod=" + new Date().getTime() + "&origem=" + d, "Pop_Chat", "top=25,left=50,width=505,height=590,scrollbars=no,resizable=yes");
    e.focus();
}

function allFancybox() {
    //fancybox iframe
    $('.iframe').fancybox({
        maxWidth: 960,
        maxHeight: 800,
        fitToView: false,
        width: '90%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        title: false
    });

}

function fechaFancy() {
    $(".teste-link").hide();
}

function abrir(a) {
    $(document).ready(function() {
        $("#mensagem").html(a);
        $(".mensagem").fancybox().trigger("click");
    });
}

function ie() {
    var ua = window.navigator.userAgent,
        msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    return false;
}

function alturaSection() {
    var wHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;

    $('section').each(function() {
        var padding = parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom'));
        var conteudo = $(this).find('.grid-container').outerHeight();
        var altura = wHeight - padding;

        if ((conteudo + padding) > wHeight) {
            altura = conteudo;
        }

        if (isDesktop()) {
            //$(this).height(altura);
            $(this).css('min-height', altura);

            var alturaLinha = $(this).height();
            $(this).children(".fullheight").height(alturaLinha);


        }
    });
}

function menu() {
    var altura = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;

    $(".link-menu").click(function() {
        if (!$(this).hasClass("aberto")) {
            $(this).addClass("aberto");
            $(".menu").slideDown();
        } else {
            $(this).removeClass("aberto");
            $(".menu").slideUp();
        }
    });

    var lastId,
        topMenu = $("header"),
        menuItems = topMenu.find(".menu li a").not('.not');
    var scrollItems = menuItems.map(function() {
        var item = $(this).attr("href");
        if ($(item).length) {
            return $(item);
        }
    });


    var noScrollAction = false;
    menuItems.click(function(e) {

        if ($(window).width() < 1024 && $('.link-menu').hasClass('open')) {
            $('.link-menu').trigger('click');
        }
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;

        if (!isDesktop()) {
            offsetTop = href === "#" ? 0 : $(href).offset().top - 40;
            $(".link-menu").removeClass("aberto");
            $(".menu").slideUp();
        }

        noScrollAction = true;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, {
            duration: 300,
            complete: function() {

                menuItems.removeClass("ativo").end();
                menuItems.filter("[href=" + href + "]").addClass("ativo");
                setTimeout(function() {
                    noScrollAction = false;
                }, 10);
            }
        });
    });

    $(window).scroll(function() {
        if (!noScrollAction) {
            var fromTop = $(this).scrollTop();
            var cur = scrollItems.map(function() {
                if ($(this).offset().top - 1 < fromTop)
                    return this;
            });

            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                menuItems.removeClass("ativo").end();
                menuItems.filter("[href=#" + id + "]").addClass("ativo");
            }
        }
    });
}

// function menu() {
//     var lastId,
//         topMenu = $("header"),
//         menuItems = topMenu.find(".menu li .menu-item").not('.not');
//     var scrollItems = menuItems.map(function() {
//         var item = $(this).attr("href");
//         if ($(item).length) {
//             return $(item);
//         }
//     });
//
//     $('.link-menu').click(function() {
//         if(!$(this).hasClass("aberto")) {
//             $(this).addClass("aberto");
//             $(".menu").slideDown();
//         }
//         else {
//             $(this).removeClass("aberto");
//             $(".menu").slideUp();
//         }
//     });
//
//     $("header .menu li a").click(function() {
//         $("header .menu li a").removeClass("ativo");
//
//         $('html, body').animate({
//             scrollTop: $( $.attr(this, 'href') ).offset().top
//         }, 500);
//
//         $(this).addClass("ativo");
//
//         var caminho = window.location.href;
//         var posicao = caminho.indexOf("#");
//         if (posicao == "-1") {
//             window.location.replace(caminho + $.attr(this, 'href'));
//         }
//         else {
//             var corte = posicao - 1;
//             var novo_caminho = caminho.substring(0, corte);
//             window.location.replace(novo_caminho + $.attr(this, 'href'));
//         }
//
//         if(!isDesktop()) {
//             $(".menu").slideUp();
//             $(".menu").removeClass("aberto");
//         }
//
//         return false;
//     });
//
//     $(window).scroll(function() {
//         if (!noScrollAction) {
//             var fromTop = $(this).scrollTop();
//             var cur = scrollItems.map(function() {
//                 if ($(this).offset().top-1 < fromTop)
//                     return this;
//             });
//
//             cur = cur[cur.length - 1];
//             var id = cur && cur.length ? cur[0].id : "";
//
//             if (lastId !== id) {
//                 lastId = id;
//                 menuItems.parent().removeClass("ativo").end();
//                 menuItems.filter('[href="#' + id + '"]').parent().addClass("ativo");
//             }
//         }
//
//     });
// }

// function menu() {
//     var altura = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
//
//     $('.link-menu').click(function() {
//         if(!$(this).hasClass("aberto")) {
//             $(this).addClass("aberto");
//             $(".menu").slideDown();
//         }
//         else {
//             $(this).removeClass("aberto");
//             $(".menu").slideUp();
//         }
//     });
//
//     $("header .menu li a").click(function() {
//         $("header .menu li a").removeClass("ativo");
//
//         $('html, body').animate({
//             scrollTop: $( $.attr(this, 'href') ).offset().top
//         }, 500);
//
//         $(this).addClass("ativo");
//
//         var caminho = window.location.href;
//         var posicao = caminho.indexOf("#");
//         if (posicao == "-1") {
//             window.location.replace(caminho + $.attr(this, 'href'));
//         }
//         else {
//             var corte = posicao - 1;
//             var novo_caminho = caminho.substring(0, corte);
//             window.location.replace(novo_caminho + $.attr(this, 'href'));
//         }
//
//         if(!isDesktop()) {
//             $(".menu").slideUp();
//             $(".menu").removeClass("aberto");
//         }
//
//         return false;
//     });
//
//     // Cache selectors
//     var topMenu = $("header .menu"),
//         topMenuHeight = topMenu.outerHeight()+15,
//         // All list items
//         menuItems = topMenu.find("a"),
//         // Anchors corresponding to menu items
//         scrollItems = menuItems.map(function(){
//           var item = $($(this).attr("href"));
//           if (item.length) { return item; }
//         });
//
//     // Bind to scroll
//     $(window).scroll(function(){
//        // Get container scroll position
//        var fromTop = $(this).scrollTop()+topMenuHeight;
//
//        // Get id of current scroll item
//        var cur = scrollItems.map(function(){
//          if ($(this).offset().top < fromTop)
//            return this;
//        });
//        // Get the id of the current element
//        cur = cur[cur.length-1];
//        var id = cur && cur.length ? cur[0].id : "";
//        // Set/remove active class
//        menuItems.removeClass("ativo");
//        menuItems.filter("[href='#"+id+"']").addClass("ativo");
//     });​
// }

function checkboxs() {
    $('.input-checkbox').click(function() {
        if ($(this).hasClass("marcado")) {
            $(this).next().prop("checked", false);
            $(this).removeClass("marcado");
        } else {
            $(this).next().prop("checked", true);
            $(this).addClass("marcado");
        }
    });
}

function formularioRodape() {
    $('.share').click(function() {
        window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    });

    // // mascara dos inputs de telefone
    // $("#strFone2").focus(function(e) {
    //     $("#strFone2").mask("(99) 99999999");
    // });
    //
    // $("#strFone2").on('blur', function(e) {
    //     if ($(this).val() == "") {
    //         $("#strFone2").unmask();
    //         $("#strFone2").val("Digite seu telefone");
    //     }
    // });
    //
    // $("#strFoneCel2").focus(function(e) {
    //     $("#strFoneCel2").mask("(99) 99999999?9");
    // });
    //
    // $("#strFoneCel2").on('blur', function(e) {
    //     if ($(this).val() == "") {
    //         $("#strFoneCel2").unmask();
    //         $("#strFoneCel2").val("Digite seu celular");
    //     }
    // });

    //validacao indicacao
    $('#btnIndicacao2').click(function(e) {
        var form = $('#form_indique');

        validaIndique(form);
    });

    //validacao agende
    $('#btnAgende2').click(function(e) {
        var camposForm = $('#form_agende');
        //validacao agende
        var form = new Formulario(camposForm);
        var emailCarac = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var instrucao = "";
        var erro = 0;
        var retorno = false;

        var nome = $('#strNome').val();
        var email = $('#strEmail').val();
        var fone = $('#strFone2').val();
        var fonecel = $('#strFoneCel2').val();

        $('input[name=rbContato]').each(function() {
            if ($(this).attr('checked')) {
                radio = true;
            }
        });

        if (nome == "" || nome == "Nome") {
            instrucao += "<i class='icon-erro'></i>Digite seu nome.<br /><br />";
            erro = 1;
        }


        if (email == "" || email == "E-mail") {
            instrucao += "<i class='icon-erro'></i>Digite seu e-mail.<br /><br />";
            erro = 1;
        } else {
            if (!emailCarac.exec(email)) {
                instrucao += "<i class='icon-erro'></i>E-mail inv&aacute;lido.<br /><br />";
                erro = 1;
            }
        }

        if ((fone == "" || fone == "(00) 00000000" || fone == "Telefone fixo") && (fonecel == "" || fonecel == "(00) 00000000" || fonecel == "Telefone celular")) {
            instrucao += "<i class='icon-erro'></i>Digite um telefone ou um celular.<br /><br />";
            erro = 1;
        }

        if (fone != "" && fone != "(00) 0000-0000" || fone == "Telefone fixo") {
            var ddd = fone.substr(0, 2);
            var foneFinal = fone.substr(3);
            $('#strDdd').val(ddd);
            $('#strFone').val(foneFinal);
        }

        if (fonecel != "" || fonecel != "(00) 0000-0000" || fonecel == "Telefone celular") {
            var dddCel = fonecel.substr(0, 2);
            var foneFinalCel = fonecel.substr(3);
            $('#strDddCel').val(dddCel);
            $('#strFoneCel').val(foneFinalCel);
        }

        if (erro == 1) {
            abrir("<h3>Erro(s) no preenchimento do formulário</h3><br /><p>" + instrucao + "</p>");
            return false; // vai voltar aonde esta o erro.
        } else {
            //aqui
            PostaForm("<p>Dados cadastrados com sucesso. Em breve entraremos em contato!</p><i class='icon-ok'></i>", 'agende');

            nome = $('#strNome').val('Nome');
            email = $('#strEmail').val('E-mail');
            fone = $('#strFone2').val('Telefone fixo');
            fonecel = $('#strFoneCel2').val('Telefone celular');
            $('#strObs').val('Mensagem');

            $('#contato-por .opcao').each(function() {
                $(this).find('.input-checkbox').trigger('click');
            });

            return false;
        }
    });

    $('.esconde').click(function() {
        var id = "#" + $(this).attr('data-id');
        $('#agende, #indique').not(id).fadeOut();
        $(id).fadeToggle();

        $('html, body').stop().animate({
            scrollTop: $(id).offset().top - 100
        });
    });

    $('.fechar-agende, .fechar-indique').click(function() {
        $($(this).attr('data-id')).fadeOut();
    });
}