//main execute
$(document).ready(function(){
    listar();
});


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
                    <td><button class="btn btn-info btn-sm"  onclick="pasarparametros('${item.nombre}','${item.apellido}','${item.telefono}','${item.correo}',${item.id})">Editar</button></td>
                    <td><button class="btn btn-warning btn-sm"  onclick="eliminar(${item.id})">Eliminar</button></td>
                    
                </tr>`)
                })
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

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
           alertify.alert('Registro guardado', 'Su registro fue guardado con éxito!', function(){ alertify.success('registro guardado'); });
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        },complete:function(){
            var formulario =document.getElementById("f1");
            formulario.reset();
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
    alertify.confirm(
        'Confirm Message', 
        function(){

            alertify.success('Ok');
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
        }, 
        function(){ 
            alertify.error
        ('Cancel')}
    );
}

//funcion que edita un registro de la tabla 
function editar(){
    var nombre= $('#nombre').val();
    var apellido = $('#apellido').val();
    var telefono= $('#telefono').val();
    var correo=$('#correo').val();
    var id=$('#id').val();
    
    console.log(nombre, apellido, telefono, correo);
    
    const data = JSON.stringify(
            {
                'nombre': nombre,
                'apellido':apellido,
                'telefono':telefono,
                'correo':correo,
                'id':id
            }
    );
          
    $.ajax({
        url: 'http://localhost/App/api/clientes/updated',
        type:'post',
        data:data,
        success: function(respuesta) {
           socket.emit('socket update', respuesta);
         },
        error: function() {
            console.log("No se ha podido obtener la información");
        },complete:function(){
            $("#btn-guardar").attr('onclick','guardar()');
            var formulario = document.getElementById("f1");
            formulario.reset();
        }
    });
}

function actualizar() {

	id = $('#id').val();
	nombre = $('#nombre').val();
	apellido = $('#apellido').val();
    telefono = $('#telefono').val();
	email = $('#correo').val();
	
	cadena = JSON.stringify({
		"id": id,
		"nombre": nombre,
		"apellido": apellido,
		"correo": email,
		"telefono": telefono
	});

	$.ajax({
		url: 'http://localhost/App/api/clientes/updated',
		type: 'POST',
		data: cadena,
		success: function (r) {

			if (r.act == 2) {
				socket.emit('socket update', r);
			
			} else {
                $("#btn-guardar").attr('onclick','guardar()');
                var formulario =document.getElementById("f1");
                formulario.reset();
			}
		},
        error: function() {
            alert("No se ha podido obtener la información");
        }
	});
}
