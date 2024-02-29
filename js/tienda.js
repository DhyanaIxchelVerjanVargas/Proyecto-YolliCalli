const range = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .rangeSlider input");
let progress = document.querySelector("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .rangeSlider .progres");
let gap=100;
const inputValue = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .contentTxtMinMax .numberVal input");

let contenedorProdutos = document.getElementById("contenedorProductos");
let contnedorBtnPaginacion = document.getElementById("contnedorBtnPaginacion");
let botonesPaginacion= document.querySelectorAll(".btnPaginacion");
let btnLimpiarBusquda = document.getElementById("btnLimpiarBusquda");
let btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
let btnBusqueda = document.getElementById("btnBusqueda");
let inputBusqueda = document.getElementById("inputBusqueda");
let productos = new Array();
let nuevosProductos = new Array();
let auxBusqueda = new Array();
let productosBuscados = new Array();

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
    precio = 0;
    categorias=""
    etiquetas="";
    imagen =""
    //elaboradoPor ="";
    id="";
    static total=0;

    constructor(nombre,descripcion,precio,categorias, etiquedas,imagen){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        //this.elaboradoPor = elaboradoPor;
        this.categorias = categorias;
        this.etiquetas = etiquedas;
        this.imagen = imagen
        Producto.total +=1;
        this.id= "CP" + Producto.total;
    }
 }

 function crearPropuctos(){
    productos.push(new Producto("Alebrije Buho","Cojín bordado por artesanos de Tenango","https://programadestinosmexico.com/wp-content/uploads/2023/08/ARTESANIAS-OAX.jpg",200,"Artesanos de Tenango"));
    productos.push(new Producto("Alebrije Ajolote","Cojín bordado por artesanos de Oaxaca","https://media.licdn.com/dms/image/D5612AQFx8phwV2yN6g/article-cover_image-shrink_720_1280/0/1697657051080?e=2147483647&v=beta&t=H57I5dr3zSXi79Rjsc5iTNgOweSYmRbCZw5eWzfAiVA",300,"Artesanos de Oaxaca"));
    productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Chiapas","./src/img/productos/cojinTenango.png",400,"Artesanos de Chiapas"));
    productos.push(new Producto("Muñeca lele","Cojín bordado por artesanos de Guerrero","https://www.turismomexico.es/wp-content/uploads/2019/01/munecas_mexicanas.jpg",500,"Artesanos de Guerrero"));
    productos.push(new Producto("Florero Artesenal","Cojín bordado por artesanos de Tabasco","https://http2.mlstatic.com/D_NQ_NP_708931-MLM71088880686_082023-O.webp",600,"Artesanos de Tabasco"));
    productos.push(new Producto("Mezcal en olla de barro","Cojín bordado por artesanos de Merida","https://i.pinimg.com/originals/fb/c4/1a/fbc41ad7a84bf6788e0e9ba69140dddd.jpg",700,"Artesanos de Merida"));
    productos.push(new Producto("Alegria de amaranto","Cojín bordado por artesanos de los Mochis","https://biotrendies.com/wp-content/uploads/2015/07/alegria-amaranto.jpg",800,"Artesanos de los Mochis"));
    productos.push(new Producto("Alebrije Ajolote","Cojín bordado por artesanos de Oaxaca","https://media.licdn.com/dms/image/D5612AQFx8phwV2yN6g/article-cover_image-shrink_720_1280/0/1697657051080?e=2147483647&v=beta&t=H57I5dr3zSXi79Rjsc5iTNgOweSYmRbCZw5eWzfAiVA",900,"Artesanos de Oaxaca"));
    productos.push(new Producto("Muñeca lele","Cojín bordado por artesanos de Veracruz","https://www.turismomexico.es/wp-content/uploads/2019/01/munecas_mexicanas.jpg",1000,"Artesanos de Veracruz"));
    productos.push(new Producto("Florero Artesenal","Cojín bordado por artesanos de Puebla","https://http2.mlstatic.com/D_NQ_NP_708931-MLM71088880686_082023-O.webp",1100,"Artesanos de Puebla"));
    productos.push(new Producto("Mezcal en olla de barro","Cojín bordado por artesanos de Hidalgo","https://i.pinimg.com/originals/fb/c4/1a/fbc41ad7a84bf6788e0e9ba69140dddd.jpg",1200,"Artesanos de Hidalgo"));
    productos.push(new Producto("Mantel de Oaxaca","Cojín bordado por artesanos de Oaxaca","https://oaxacaxamor.com/cdn/shop/products/Mantel_AzulDorado_Tlalixtac_9414_800x.jpg?v=1612829162",1300,"Artesanos de Oaxaca"));
    productos.push(new Producto("Servilleta bordada","Cojín bordado por artesanos de Jalisco","https://www.mexicodesconocido.com.mx/wp-content/uploads/2023/02/servilletas-bodadas-mano-2-900x861.jpg",1400,"Artesanos de Jalisco"));
    productos.push(new Producto("Carrito de juguete","Cojín bordado por artesanos de San Luis Potosi","https://http2.mlstatic.com/D_NQ_NP_845988-MLM53611700096_022023-O.webp",1500,"Artesanos de San Luis Potosi"));
    productos.push(new Producto("Cojin Tenango","Cojín bordado por artesanos de Hermosillo","./src/img/productos/cojinTenango.png",1600,"Artesanos de Hermosillo"));
    
 }

function addProducto(producto,index){
    contenedorProdutos.insertAdjacentHTML("beforeend", `
            <div class="cardProducto" id="${producto.id}">
                <div class="caraPrincipal">
                    <img src="${producto.imagen}" alt="">
                    <div class="card-body">
                        <h4 class="card-title">${producto.nombre}</h4>
                    </div>
                </div>
                <div class="overlay">
                    <span class="productoSlogan">Hecho con el corazón</span>
                    <h4>${producto.nombre}</h4>
                    <span class="productPrecio">$ ${producto.precio.toFixed(2)}</span>
                    <span>por</span>
                    <span class="productMadeBy">Artesanos de México</span>
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

function busquedaProducto(productoBuscar){
        btnLimpiarBusquda.style.display="flex"
        auxBusqueda = productoBuscar.split(/\s+/);
        console.log(auxBusqueda);
        productosBuscados = [];
        contenedorProdutos.innerHTML ="";
        productos.forEach((producto)=>{
            for(let index = 0; index < auxBusqueda.length; index++){
                if(producto.nombre.toUpperCase().includes(auxBusqueda[index].toUpperCase())){
                    productosBuscados.push(producto);
                    break
                }
            }
        })

        if(productosBuscados.length > 0 && productosBuscados.length <= 12){
            productosBuscados.forEach((producto, index)=> addProducto(producto, index));
        } else if(productosBuscados.length >10){
            for(let i=0;i < 12;i++){
                addProducto(productosBuscados[i], i)
            }
        }else if(productosBuscados.length == 0){
            contenedorProdutos.insertAdjacentHTML("beforeend",`
            <h3 class="sinCoincidencias">No hay coincidencias con la busqueda</h3>
            `)
        }
        addBtnPaginacion(Math.ceil(productosBuscados.length/12));
}

 window.addEventListener("load",function(event){
    event.preventDefault();
    if (this.localStorage.getItem("productos") == null){
        crearPropuctos();

        if(this.localStorage.getItem("productosNuevos") != null){
            nuevosProductos = JSON.parse(this.localStorage.getItem("productosNuevos"));
            nuevosProductos.forEach((nuevoProducto)=>{
                productos.push(nuevoProducto);
            })
        }
        localStorage.setItem("productos",JSON.stringify(productos));
        localStorage.removeItem("productosNuevos");
    }else{
        productos = JSON.parse(this.localStorage.getItem("productos"));
        if(this.localStorage.getItem("productosNuevos") != null){
            nuevosProductos = JSON.parse(this.localStorage.getItem("productosNuevos"));
            nuevosProductos.forEach((nuevoProducto)=>{
                productos.push(nuevoProducto);
            })
            localStorage.setItem("productos",JSON.stringify(productos));
            localStorage.removeItem("productosNuevos");
        }
    }

    if(this.localStorage.getItem("productoBuscar") == null){
        if(productos.length > 0 && productos.length <= 12){
            productos.forEach((producto, index)=> addProducto(producto, index));
        } else if(productos.length >10){
            for(let i=0;i < 12;i++){
                addProducto(productos[i], i)
            }
        }
        addBtnPaginacion(Math.ceil(productos.length/12));
    }else{
        btnLimpiarBusquda.style.display="flex"
        auxBusqueda = this.localStorage.getItem("productoBuscar");
        auxBusqueda = auxBusqueda.split(/\s+/);
        productos.forEach((producto)=>{
            for(let index = 0; index < auxBusqueda.length; index++){
                if(producto.nombre.toUpperCase().includes(auxBusqueda[index].toUpperCase())){
                    productosBuscados.push(producto);
                    break
                }
            }
        })

        if(productosBuscados.length > 0 && productosBuscados.length <= 12){
            productosBuscados.forEach((producto, index)=> addProducto(producto, index));
        } else if(productosBuscados.length >10){
            for(let i=0;i < 12;i++){
                addProducto(productosBuscados[i], i)
            }
        }else if(productosBuscados.length == 0){
            contenedorProdutos.insertAdjacentHTML("beforeend",`
            <h3 class="sinCoincidencias">No hay coincidencias con la busqueda</h3>
            `)
        }
        addBtnPaginacion(Math.ceil(productosBuscados.length/12));
    }
    
    
 })


 btnLimpiarBusquda.addEventListener("click",function(event){
    event.preventDefault();
    contenedorProdutos.innerHTML="";
    productos = JSON.parse(localStorage.getItem("productos"));
    
    if(productos.length > 0 && productos.length <= 12){
        productos.forEach((producto, index)=> addProducto(producto, index));
    } else if(productos.length >10){
        for(let i=0;i < 12;i++){
            addProducto(productos[i], i)
        }
    }else if(productosBuscados.length == 0){
        contenedorProdutos.insertAdjacentHTML("beforeend",`
        <h3 class="sinCoincidencias">No hay productos</h3>
        `)
    }
    addBtnPaginacion(Math.ceil(productos.length/12));
    localStorage.removeItem("productoBuscar");
    btnLimpiarBusquda.style.display = "none";
 })

 btnBusqueda.addEventListener("click",function(event){
    event.preventDefault();
    inputBusqueda.value = inputBusqueda.value.trim();
    localStorage.setItem("productoBuscar", inputBusqueda.value);
    if(inputBusqueda.value.length > 3){
        busquedaProducto(inputBusqueda.value);
    }
    inputBusqueda.value="";
 })

 inputBusqueda.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.code == "Enter") {
        inputBusqueda.value = inputBusqueda.value.trim();
        if(inputBusqueda.value.length > 3){
            localStorage.setItem("productoBuscar", inputBusqueda.value);
            busquedaProducto(inputBusqueda.value);
            inputBusqueda.value="";
        }
    }
});


function uploadFile(file) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', unsignerUploadPreset);

    return new Promise((resolve, reject) => {
        fetch('https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error al cargar archivo a Cloudinary');
        })
        .then(data => {
            console.log('Imagen subida exitosamente:', data);
            var imageUrl = data.secure_url;
            console.log('URL de la imagen:', imageUrl);
            resolve(imageUrl);
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
    });
}