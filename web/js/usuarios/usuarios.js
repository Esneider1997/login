/* history.forward(); */

function ingresar() {

    var usuario     =  $('#usuario').val();
    var contrasena  =  $('#contrasena').val();

    console.log(usuario, contrasena );

    const datos = JSON.stringify(
        {
            usuario,
            contrasena
        }
    );

    $.ajax({
        url: 'http://localhost/App/auth/login2',
        type:'post',
        data: datos,
        success: function(respuesta) {
            console.log( parseJwt(respuesta.Token).data);
            if(JSON.stringify(parseJwt(respuesta.Token).data.estado == '1')){

                console.log(parseJwt(respuesta.Token).data.estado == '1');
                window.sessionStorage.setItem("usuario",  JSON.stringify(parseJwt(respuesta.Token).data));
                window.location = 'http://localhost/medintegral/App/';
                
            }else{
                alert('Usuario no esta activo')
            }            
            
        },
        error: function() {
            console.log('Error de ingreso');//si se desea enviar respuesta a consola del error
        },complete:function(){
            let formulario = document.getElementById("formulario")
            formulario.reset();
        }
    })
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};


/* var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer; // touchscreen presses
    document.ontouchstart = resetTimer;
    document.onclick = resetTimer;     // touchpa


 document.onscroll = resetTimer;    // scrolling with arrow keys
    document.onkeypress = resetTimer;

    function logout() {
        if (sessionStorage.getItem("usuario") !== null) {
            $("#modal-servicios").modal('hide');
            $("#modal-login").modal('show');
            $("#mensage-error_login").empty().append(`🅴🆇🅿🅸🆁🅾 🆃🅸🅴🅼🅿🅾 🅳🅴 🅸🅽🅰🅲🆃🅸🆅🅸🅳🅰🅳.`);
        }
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 3000)
        // 1000 milliseconds = 1 second
    }
} */