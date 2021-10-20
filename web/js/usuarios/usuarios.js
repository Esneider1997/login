console.log('Funcionando...');

function ingresar() {

    var usuario     =  $('#usuario').val();
    var contrasena  =  $('#contrasena').val();

    console.log(usuario, contrasena );

    const data = JSON.stringify(
        {
            usuario,
            contrasena
        }
    );
    
    $.ajax({
        url: 'http://localhost/App/auth/login2',
        type:'post',
        data: data,
        success: function(respuesta) {
            console.log(respuesta)
            /* window.location = 'http://localhost/medintegral/App/'; */
        },
        error: function() {
            console.log('Error de ingreso');//si se desea enviar respuesta a consola del error
        },complete:function(){
            let formulario = document.getElementById("formulario")
            formulario.reset();
        }
    })
    
    
}
