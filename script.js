var atual_fs, proximo_fs, anterior_fs // fs = fieldset
var antes, opacity, scale; //fieldset
//propriedatde para a animacao
var animating;
// sinalizador para evitar falhas rápidas de vários cliques

$(".proximo").click(function() {
    if(animating) return false;
    animating = true;

    atual_fs = $(this).parent();
    proximo_fs = $(this).parent().next();
    // ative o próximo passo na barra de progresso usando o índice do próximo_fs
    $("#progresso-barra li").eq($("fieldset").index(proximo_fs)).addClass("active");

    //mostrar o proximo fieldset
    proximo_fs.show();
    // mostrar o atual fieldset com style
    atual_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            // como a opacidade de current_fs reduz para 0 - armazenada em 
            //dimensione atual_fs até 80%
            scale = 1 - (1 - now) * 0.2;
            //traga proximo_fs da direita (50%)
            antes = (now * 50) + "%";
            // aumentar a opacidade de proximo_fs para 1 à medida que se move
            opacity = 1 - now;
            atual_fs.css({
                'transform': 'scale('+scale+')',
                'position': 'absolute'
            });
            proximo_fs.css({'left': antes, 'opacity': opacity});
        },
        duration: 800,
        complete: function(){
            atual_fs.hide();
            animating = false;
        },
        // isso vem do plug-in de facilitação personalizado
        easing: 'easeInOutBack'
    });
});

$(".anterior").click(function() {
    if(animating) return false;
    animating = true; 

atual_fs = $(this).parent();
anterior_fs = $(this).parent().prev();

// ativar a etapa atual na barra de progresso
$("#progresso-barra li").eq($("fieldset").index(atual_fs)).removeClass("active");
//mostrar o anterior fieldset
anterior_fs.show();
//esconde o proximo field set com style
atual_fs.animate({opacity: 0}, {
    step: function(now, mx){
        // como a opacidade de current_fs reduz para 0 - armazenada em "now"
        // 1. escala anterior_fs de 80% a 100%
        scale = 0.8 + (1 - now) * 0.2;
        // pegue atual_fs para a direita (50%) - de 0%
        antes = ((1-now) * 50)+"%";
        // aumente a opacidade de anterior_fs para 1 enquanto ele se move
        opacity = 1 - now;
        atual_fs.css({'left': antes});
        anterior_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
    },
    duration: 800,
    complete: function() {
        atual_fs.hide();
        animating = false;
    },
        // esse tem que customizar o plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function(){
    return false;
})
