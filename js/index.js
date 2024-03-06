window.addEventListener('DOMContentLoaded', function() {
    var tarjetas = document.querySelectorAll('.carousel-inner .tarjetaCategoria');
    var currentIndex = 0;
    var intervalId;

    function ajustarTarjetasVisibles() {
        if (window.innerWidth <= 425) {
            tarjetas.forEach(function(tarjeta, index) {
                tarjeta.style.display = index === currentIndex ? 'block' : 'none';
            });
        } else {
            tarjetas.forEach(function(tarjeta) {
                tarjeta.style.display = ''; 
            });
        }
    }

    function handleNext() {
        clearInterval(intervalId); 
        currentIndex = currentIndex === tarjetas.length - 1 ? 0 : currentIndex + 1;
        ajustarTarjetasVisibles();
        reiniciarMovimientoAutomatico();
    }

    function handlePrev() {
        clearInterval(intervalId); 
        currentIndex = currentIndex === 0 ? tarjetas.length - 1 : currentIndex - 1;
        ajustarTarjetasVisibles();
        reiniciarMovimientoAutomatico();
    }

    function reiniciarMovimientoAutomatico() {
        
        clearInterval(intervalId);
        intervalId = setInterval(handleNext, 5000);
    }

    window.addEventListener('load', function() {
        ajustarTarjetasVisibles();
        reiniciarMovimientoAutomatico();
    });
    
    window.addEventListener('resize', ajustarTarjetasVisibles);

    document.querySelector('.carousel-control-next').addEventListener('click', function() {
        handleNext();
        ajustarTarjetasVisibles(); 
    });
    document.querySelector('.carousel-control-prev').addEventListener('click', function() {
        handlePrev();
        ajustarTarjetasVisibles(); 
    });

    reiniciarMovimientoAutomatico(); 
});
