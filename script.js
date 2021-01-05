$.mobile.loading().hide();

let brojSlika = 11;
let slike = [];
let trenutnaSlika = 1;
let divSlike = [];

let brojSlikaUNavigaciji = Number(prompt("Unestite broj slika u navigaciji: "));

//START
generirajSlike();
generirajNavigaciju();
prikaziNavigaciju(1);
$('.navigation').hide();

function generirajSlike() {
    for(let i=0; i<brojSlika; i++){ //Zapisuje slike u array
        let url = "https://dummyimage.com/800x600/" + getRandomColor() + "&text=" + (i+1);
        slike.push(url);
        let novaSlika = $('<img></img>').attr("src", url).hide();
        
        $(".main").append(novaSlika);
    }
    prikaziSliku(trenutnaSlika);
}

function generirajNavigaciju() {
    for(let i = 0; i < brojSlika; i++) {
        let url = slike[i];
        let container = $('<div></div>').addClass("nav-slike");        
        let malaSlika = $('<img></img>').attr("src", url);
        container.append(malaSlika);
        divSlike.push(container);
        $(".navigation").append(container);
    }
}

function previous() {
    if(trenutnaSlika === 1) {
        sakrijSliku(trenutnaSlika);
        trenutnaSlika = brojSlika; //vraca ga na zadnji
        prikaziSliku(trenutnaSlika);
    } else {
        sakrijSliku(trenutnaSlika);
        trenutnaSlika--;
        prikaziSliku(trenutnaSlika);
    }
    //prikaziNavigaciju(trenutnaSlika);   
}

function next() {
    if(trenutnaSlika === brojSlika) {
        sakrijSliku(trenutnaSlika);
        trenutnaSlika = 1; //vraca ga na prvi
        prikaziSliku(trenutnaSlika);
    } else {
        sakrijSliku(trenutnaSlika);
        trenutnaSlika++;
        prikaziSliku(trenutnaSlika);
    }    
   // prikaziNavigaciju(trenutnaSlika);    
}

$('.previous p').click(function() {
    if(dohvatiPrvuSliku()[0].innerHTML === divSlike[trenutnaSlika - 1][0].innerHTML) {
        postaviAktivnu(trenutnaSlika, true);
    }
    previous();
    postaviAktivnu(trenutnaSlika, true);

    //provjeriPozicijuNavigacije();
    
});

$('.next p').click(function() {
    if(dohvatiZadnjuSliku()[0].innerHTML === divSlike[trenutnaSlika - 1][0].innerHTML) {
        postaviAktivnu(trenutnaSlika);
    }
    next();
    postaviAktivnu(trenutnaSlika);
    //provjeriPozicijuNavigacije();
});

$('.main').on('swiperight', function() {
    previous();
    postaviAktivnu(trenutnaSlika, true);
})
$('.main').on('swipeleft', function() {
    next();
    postaviAktivnu(trenutnaSlika);
}) 

$('#cb3').change(function() {
    let vrijeme = $('#brojSekundi')[0].value;
    if($('#cb3')[0].checked) {     
        let interval = setInterval(function() {        
            if(!$('#cb3')[0].checked) clearInterval(interval)
            if(dohvatiZadnjuSliku()[0].innerHTML === divSlike[trenutnaSlika - 1][0].innerHTML) {
                postaviAktivnu(trenutnaSlika);
            }
            next();
            postaviAktivnu(trenutnaSlika);           
        }, vrijeme * 1000)
    }     
});

$('.navigation').on('click', '.nav-slike', function() {    
    let index = $(this).index();
    let trenutnoAktivna = $('.active').index();
    ukloniAktivnu(trenutnaSlika - 1);

    let put = index - trenutnoAktivna;
    if(put > 0) {
        for (let i = 0; i < put; i++) {      
            next();        
        }  
        postaviAktivnu(trenutnaSlika);
    } else {
        for (let i = 0; i < Math.abs(put); i++) {      
            previous();        
        }
        postaviAktivnu(trenutnaSlika, true);
    }
      
    
    
});

$('#nav-toggle').change(function() {
    if($('#nav-toggle')[0].checked) {
        $('.navigation').show();
    } else {
        $('.navigation').hide();
    }
})

$('#brojSlikaPoSlideu').change(function() {
    //provjeriPozicijuNavigacije();
    brojSlikaUNavigaciji = $(this).value;
})

function prikaziSliku(brojSlike) {
    $($(".main").children()[brojSlike-1]).show();
}

function sakrijSliku(brojSlike) {
    $($(".main").children()[brojSlike-1]).hide();
}

function provjeriPozicijuNavigacije() {  
    prikaziNavigaciju(trenutnaSlika);    
}

function prikaziNavigaciju(slikaOd) {
    if(slikaOd > brojSlika) {
        slikaOd = slikaOd - brojSlika;
    }
    $('.navigation').empty();
    let slika = slikaOd - 1;
    for (let i = slikaOd; i < slikaOd + brojSlikaUNavigaciji; i++) {
        
        if(i >= divSlike.length + 1) {          
            let zadnjaSlika = dohvatiZadnjuSliku();
            slika = divSlike.findIndex(x => x[0].innerHTML === zadnjaSlika[0].innerHTML); 
            if(slika === divSlike.length - 1) {
                slika = 0;
            } else {
                slika++;
            }
        }
        let container = divSlike[slika];
        container.removeClass("active");
        if(i === slikaOd) {
           // container.addClass("active");
        }
        let x = divSlike[trenutnaSlika - 1];
        x.addClass("active");
        $(".navigation").append(container);
        slika++;
    }     
}

function postaviAktivnu (trenutnaSlika, back = false) {
    let novaSlika = divSlike[trenutnaSlika-1];
    slika = divSlike.findIndex(x => x[0].innerHTML === novaSlika[0].innerHTML);
    if(back) {
        if(trenutnaSlika === brojSlika) {
            let container = divSlike[0];
            container.removeClass("active");  
        } else {
            let container = divSlike[slika + 1];
            container.removeClass("active");
        } 
        
        container = divSlike[slika];
        container.addClass("active");

        let prvaSlikaUNav = dohvatiPrvuSliku(); //stari prvi
        if(prvaSlikaUNav[0].innerHTML === divSlike[0][0].innerHTML) {
            prvaSlikaUNav = divSlike[divSlike.length - 1];
        }
        let x = divSlike[trenutnaSlika-1][0].innerHTML; //novi

        if(prvaSlikaUNav[0].innerHTML === x) {
            if(slika < brojSlikaUNavigaciji - 1){
                prikaziNavigaciju(divSlike.length - brojSlikaUNavigaciji + slika + 2)
                //$(".navigation").append(container);
            } else {
                let x = slika - brojSlikaUNavigaciji + 1;
                prikaziNavigaciju(x + 1);                
            }            
        }        
    } else {       
        if(trenutnaSlika === 1) {
            let container = divSlike[divSlike.length - 1];
            container.removeClass("active");
        } else {
            let container = divSlike[slika - 1];
            container.removeClass("active");
        } 

        container = divSlike[slika];
        container.addClass("active");

        let zadnjaSlikaUNav = dohvatiZadnjuSliku()[0]
        let x = divSlike[trenutnaSlika-1][0].innerHTML;
        if(zadnjaSlikaUNav.innerHTML === container[0].innerHTML) {
            if(slika + 1 > divSlike.length){
                prikaziNavigaciju(1)
            } else {
                prikaziNavigaciju(slika + 1);
            }            
        }
        
    }    
}

function ukloniAktivnu(index) {
    divSlike[index].removeClass("active");
}

function dohvatiZadnjuSliku() {
    let slika = $('.navigation .nav-slike:last-child');
    return slika;
}

function dohvatiPrvuSliku() {
    let slika = $('.navigation .nav-slike:first-child');
    return slika;
}


function sakrijNavigaciju() {
    for(let i = 0; i<brojSlikaUNavigaciji; i++) {
        $($(".navigation").children()[i]).hide();
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '/';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var hieghtThreshold = $(".container").offset().top / 4;
var hieghtThreshold_end  = ($(".container").offset().top + $(".container").height()) / 4;

$(document).scroll(function() {
    
    var scroll = $(window).scrollTop();
    if (scroll >= hieghtThreshold && scroll <=  hieghtThreshold_end ) {
        if($('#fade-in')[0].checked) {
            $('.container').addClass("effect");
        } else {
            $('.container').removeClass("effect");
        }        
    }
});


