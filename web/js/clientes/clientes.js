
//main execute
$(document).ready(function(){
    //alert('cualquier cosa');
    listar();
});

// funcion guardar post
function guardar() {
    var nombre   =   $('#nombre').val();
    var apellido =   $('#apellido').val();
    var telefono =   $('#telefono').val();
    var correo   =   $('#correo').val();

    console.log(nombre, apellido, telefono, correo);

    const data = JSON.stringify(
        {
            'nombre': nombre,
            'apellido': apellido,
            'correo': correo,
            'telefono': telefono
        }
    );
    
}
//funcion listar datos de la tabla el orden lo decide el controlador 
function listar(){
    let swich=0;
    $.ajax({
        url: 'http://localhost/App/api/clientes/',
        type:'GET',
        success: function(respuesta) {
           // console.log(respuesta);
                $.each(respuesta, function(i, item){
                    if(swich<1){
                        arreglo=Object.keys(item);
                    console.log(arreglo);
                    swich = 1;
                    }
                    arreglo=Object.values(item);
                    console.log(arreglo);
                    $("#tbody").append(`<tr id="tr_${item.id}">
                    <td class="td_${item.id}">${item.nombre}</td>
                    <td class="td_${item.id}">${item.apellido}</td>
                    <td class="td_${item.id}">${item.telefono}</td>
                    <td class="td_${item.id}">${item.correo}</td>
                    <td><button class="btn btn-info btn-sm"  onclick="pasarparametros('${item.nombre}','${item.apellido}','${item.correo}','${item.telefono}',${item.id})">Editar</button></td>
                    <td><button class="btn btn-warning btn-sm"  onclick="eliminar(${item.id})">Eliminar</button></td>
                    
                </tr>`)
                })
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}