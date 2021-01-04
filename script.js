$.mobile.loading().hide();

let brojSlika = 11;
let slike = [];
let trenutnaSlika = 1;
let divSlike = [];

let brojSlikaUNavigaciji = 4;

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
    prikaziNavigaciju(trenutnaSlika);   
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
    prikaziNavigaciju(trenutnaSlika);    
}

$('.previous p').click(function() {
    previous();
    provjeriPozicijuNavigacije();
});

$('.next p').click(function() {
    next();
    provjeriPozicijuNavigacije();
});

$('.main').on('swiperight', function() {
    previous();
    console.log("Swipe right")
})
$('.main').on('swipeleft', function() {
    next();
}) 

$('#cb3').change(function() {
    let vrijeme = $('#brojSekundi')[0].value;
    if($('#cb3')[0].checked) {     
        let interval = setInterval(function() {        
            if(!$('#cb3')[0].checked) clearInterval(interval)
            next();            
        }, vrijeme * 1000)
    }     
});

$('.navigation').on('click', '.nav-slike', function() {    
    let index = $(this).index() + trenutnaSlika;
    let temp  = $(this).index();
    for (let i = 0; i < $(this).index(); i++) {      
        next();
        
    }
    console.log(index);
    if(temp === 0 || temp === 1) {
        prikaziNavigaciju(index);
    } else {
        next();
        prikaziNavigaciju(index);
        
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
    provjeriPozicijuNavigacije();
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
            container.addClass("active");
        }
        $(".navigation").append(container);
        slika++;
    }
    
    
}

function dohvatiZadnjuSliku() {
    let slika = $('.navigation .nav-slike:last-child');
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


