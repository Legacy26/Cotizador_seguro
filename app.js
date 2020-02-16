function Seguro(segmento, anio, tipo){
    this.segmento=segmento;
    this.anio=anio;
    this.tipo=tipo;
}
Seguro.prototype.cotizarSeguro = function(){
    let cantidad;
    const base = 3000;

    switch(this.segmento){
        case '1': cantidad = base * 1.05;
                  break;
        case '2': cantidad = base * 1.10;
                  break;
        case '3': cantidad = base * 1.20;
                  break;   
        case '4': cantidad = base * 1.30;
                  break;   
        case '5': cantidad = base * 1.50;
                  break;   
}
    const diferencia = new Date().getFullYear() - this.anio;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if(this.tipo === 'Basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;
}
function Interfaz(){}
Interfaz.prototype.mostrarError = function(mensaje, tipo){
    const div= document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('mensaje', 'error');
    }else{
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 2000);
}
    Interfaz.prototype.mostrarResultado = function(seguro, total){
        const resultado= document.getElementById('resultado');
    let seg;

    switch(seguro.segmento){
        case '1': seg='Monovolumen';
                  break;
        case '2': seg='Sedan';
                  break;
        case '3': seg='SUV';
                  break;
        case '4': seg='Pick-Up';
                  break;
        case '5': seg='Coupe';
                  break;
    }

    const div=document.createElement('div');
    
    div.innerHTML = `<br/><br/>
    <p class='header'>Tu resumen:</p>
    <p>Categoria: ${seg}</p>
    <p>Año: ${seguro.anio}</p>
    <p>Tipo: ${seguro.tipo}</p>
    <p>Total: ${total}</p>
    `;

    resultado.appendChild(div);
    }

const formulario=document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    const segmento=document.getElementById('marca');
    const segmentoSeleccionado=segmento.options[segmento.selectedIndex].value;
    
    const anio=document.getElementById('anio');
    const anioSeleccionado=anio.options[anio.selectedIndex].value;
    
    const tipo=document.querySelector('input[name="tipo"]:checked').value;

    const interfaz=new Interfaz();

    if(segmentoSeleccionado==='' || anioSeleccionado==='' || tipo===''){
        interfaz.mostrarError('Debes llenar todos los campos', 'error');
    }else{
        const resultados=document.querySelector('#resultado div');

        if(resultados != null){
            resultados.remove();
        }

        const seguro=new Seguro(segmentoSeleccionado, anioSeleccionado, tipo);

        const cantidad = seguro.cotizarSeguro(seguro);
        interfaz.mostrarResultado(seguro, cantidad);
    }

    
});


const max=new Date().getFullYear(),
min = max-20;

const selecAnios=document.getElementById('anio');
for(let i=max; i>=min; i--){
    let opcion=document.createElement('option');
    opcion.value=i;
    opcion.innerHTML=i;
    selecAnios.appendChild(opcion);
}