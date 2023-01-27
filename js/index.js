$("#formularioLogin").submit(function (e) {
    e.preventDefault();

    var inputsFormulario = $("#formularioLogin").find(":input");

    var objeto = {
        email: inputsFormulario.eq(0).val(),
        senha: inputsFormulario.eq(1).val()
    };

    var json = JSON.stringify(objeto);

    $.ajax({
        url: "https://localhost:44378/Autorizacao",
        method: 'POST',
        data: json,
        contentType: 'application/json',
        dataType: 'json'
    }).done(function (resposta) {
        SalvarDadosLogin(resposta);
        window.location.href = "clientes.html";
    }).fail(function (err, errr, errrr) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Usuario ou senha invalidos!',
            showConfirmButton: false,
            timer: 1500
        });
    });

});

function SalvarDadosLogin(dadosToken) {
    localStorage.setItem('bearerToken', dadosToken.bearer);
    localStorage.setItem('nomeUsuario', dadosToken.nomeUsuario);
    localStorage.setItem('nivelAcesso', dadosToken.nivelAcesso);
}