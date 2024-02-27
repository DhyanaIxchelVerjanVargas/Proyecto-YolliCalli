const range = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .rangeSlider input");
let progress = document.querySelector("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .rangeSlider .progres");
let gap=100;
const inputValue = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .contentTxtMinMax .numberVal input");

let contenedorProdutos = document.getElementById("contenedorProductos");
let contnedorBtnPaginacion = document.getElementById("contnedorBtnPaginacion");
let botonesPaginacion= document.querySelectorAll(".btnPaginacion");

 range.forEach(input => {
    input.addEventListener("input", e => {
        let minRange = parseInt(range[0].value);
        let maxRange = parseInt(range[1].value);
        if((maxRange - minRange) < gap){
            if(e.target.className === "rangeMin"){
                range[0].value = maxRange - gap;
            } else {
                range[1].value = minRange + gap;
            }
        } else {
            progress.style.left = (minRange / range[0].max)*100 + "%";
            progress.style.right = 100 - (maxRange / range[1].max)*100 + "%";
            inputValue[0].value = minRange;
            inputValue[1].value = maxRange;
        }
    })
 })


 class Producto {
    nombre="";
    descripcion="";
    imagen =""
    precio = 0;
    elaboradoPor ="";
    id="";
    calificacion=0;
    static total=0;

    constructor(nombre,descripcion,imagen,precio,elaboradoPor){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen
        this.precio = precio;
        this.elaboradoPor = elaboradoPor;

        Producto.total +=1;
        this.id= "CP" + Producto.total;
    }
 }

 let productos = new Array();
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Tenango","./src/img/productos/cojinTenango.png",200,"Artesanos de Tenango"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Oaxaca","./src/img/productos/cojinTenango.png",300,"Artesanos de Oaxaca"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Chiapas","./src/img/productos/cojinTenango.png",400,"Artesanos de Chiapas"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Guerrero","./src/img/productos/cojinTenango.png",500,"Artesanos de Guerrero"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Tabasco","./src/img/productos/cojinTenango.png",600,"Artesanos de Tabasco"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Merida","./src/img/productos/cojinTenango.png",700,"Artesanos de Merida"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de los Mochis","./src/img/productos/cojinTenango.png",800,"Artesanos de los Mochis"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Oaxaca","./src/img/productos/cojinTenango.png",900,"Artesanos de Oaxaca"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Veracruz","./src/img/productos/cojinTenango.png",1000,"Artesanos de Veracruz"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Puebla","./src/img/productos/cojinTenango.png",1100,"Artesanos de Puebla"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Hidalgo","./src/img/productos/cojinTenango.png",1200,"Artesanos de Hidalgo"));
 roductos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Sonora","./src/img/productos/cojinTenango.png",1300,"Artesanos de Sonora"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Jalisco","./src/img/productos/cojinTenango.png",1400,"Artesanos de Jalisco"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de San Luis Potosi","./src/img/productos/cojinTenango.png",1500,"Artesanos de San Luis Potosi"));
 productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Hermosillo","./src/img/productos/cojinTenango.png",1600,"Artesanos de Hermosillo"));
 
function addProducto(producto,index){
    contenedorProdutos.insertAdjacentHTML("beforeend", `
            <div class="cardProducto" id="${producto.id}">
                <div class="caraPrincipal">
                    <img src="./src/img/productos/cojinTenango.png" alt="">
                    <div class="card-body">
                        <h4 class="card-title">${producto.nombre}</h4>
                    </div>
                </div>
                <div class="overlay">
                    <span class="productoSlogan">Hecho con el corazón</span>
                    <h4>${producto.nombre}</h4>
                    <span class="productPrecio">$ ${producto.precio.toFixed(2)}</span>
                    <span>por</span>
                    <span class="productMadeBy">${producto.elaboradoPor}</span>
                    <div class="productIconos">
                        <a  class="productoIcon"><i class="bi bi-heart"></i></a>
                        <a  class="productoIcon"><i class="bi bi-share-fill"></i></a>
                        <a  class="productoIcon"><i class="bi bi-cart3"></i></a>
                    </div>
                </div>
            </div>
    `)

}

function mostrarProductos(id){
    let auxNumPro = id -1;
    botonesPaginacion= document.querySelectorAll(".btnPaginacion");
    botonesPaginacion.forEach((boton)=>{
        if(boton.id == id){
            boton.classList.add("btnSelected");
        }else{
            boton.classList.remove("btnSelected");
        }
    })
    contenedorProdutos.innerHTML="";
    for(let index = (auxNumPro * 12); index < (id*12); index++){
        if(index > (productos.length-1)){
            break;
        }
        addProducto(productos[index],index);
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function addBtnPaginacion(numBtn){
    let auxId = 0;
    let auxSelected="";
    contnedorBtnPaginacion.innerHTML="";
    if(numBtn <= 4){
        for(auxId=1;auxId<=numBtn;auxId++){
            if(auxId == 1){
                auxSelected="btnSelected";
            }else{
                auxSelected=""
            }
            contnedorBtnPaginacion.insertAdjacentHTML("beforeend", `
            <button class="btnPaginacion ${auxSelected}" id="${auxId}">${auxId}</button>
            `)
            document.getElementById(auxId).addEventListener('click',function(){
                mostrarProductos(this.id);
            } );
        }
    }
}

 window.addEventListener("load",function(event){
    event.preventDefault();
    
    if(productos.length > 0 && productos.length <= 12){
        productos.forEach((producto, index)=> addProducto(producto, index));
    } else if(productos.length >10){
        for(let i=0;i < 12;i++){
            addProducto(productos[i], i)
        }
    }
    addBtnPaginacion(Math.ceil(productos.length/12));
    console.log(botonesPaginacion)
 })
