//main execute
$(document).ready(function(){
    //alert('cualquier cosa');
    listar();
});

// FUNCION GUARDAR
function guardar(){
    var nombre= $('#nombre').val();
    var apellido = $('#apellido').val();
    var telefono= $('#telefono').val();
    var correo=$('#correo').val();
    console.log(nombre, apellido, telefono, correo);

    const data = JSON.stringify(
            {
                'nombre': nombre,
                'apellido':apellido,
                'telefono':telefono,
                'correo':correo
            }
    );
    //Mostrar objeto
    console.log(data);

    $.ajax({
        url: 'http://localhost/App/api/Clientes/create',
        type:'POST',
        data:data,
        success: function(respuesta) {
           console.log(respuesta)
           socket.emit('socket update', respuesta);
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        },complete:function(){
            var formulario =document.getElementById("f1");
            formulario.reset();
        }
    });
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
                    /* console.log(arreglo); */
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

function pasarparametros(nombre,apellido,telefono,correo, id){
    $('#nombre').val(nombre);
    $('#apellido').val(apellido);
    $('#telefono').val(telefono);
    $('#correo').val(correo);
    $('#id').val(id);
    $("#btn-guardar").attr('onclick','actualizar()');    
}

function eliminar(id){
    console.log(id);
     $.ajax({
        url: 'http://localhost/App/api/Clientes/delete/'+id,
        type:'get',
        success: function(respuesta) {
           console.log(respuesta)
           socket.emit('socket update', respuesta);
        },
        error: function() {
            console.log("No se pudo eliminar registro");
        }
    });
}

function actualizar() {
    var nombre   = $('#nombre').val();
    var apellido = $('#apellido').val();
    var telefono = $('#telefono').val();
    var correo   = $('#correo').val();
    var id       = $('#id').val();
    
    console.log(nombre, apellido, telefono, correo);

    const data = JSON.stringify(
        {
            'nombre'  :   nombre,
            'apellido':   apellido,
            'telefono':   telefono,
            'correo'  :   correo,
            'id'      :   id
        }
    );

    $.ajax({
        url: 'http://localhost/App/api/update/'+id,
        type:'POST',//tipo de servicio a consultar
        data:data,//dato opcional que se envia al servicio
        success: function(respuesta) {
            console.log(respuesta)
            socket.emit('socket update', respuesta);//en el caso de usar socket.io
        },
        error: function() {
            console.log('');//si se desea enviar respuesta a consola del error
        },complete:function(){
            $("btn-guardar").attr('onclik', 'actualizar()');
            var formulario = document.getElementById("f1");
            formulario.reset();
        }
    });
}