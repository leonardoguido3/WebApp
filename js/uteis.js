// lendo o documento e inserindo as mascaras
$(document).ready(function () {
    $('.cpf').mask('000.000.000-00', { reverse: true });
    $('.telefone').mask('(00) 00000-0000');

    $.ajaxSetup({
        headers: { 'Authorization': 'Bearer' + localStorage.getItem('bearer')},
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 400) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: jqXHR.response.Text,
                })
            } else if (jqXHR.status == 401) {
                Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    text: 'A sua sessão expirou, faça o login novamente!'
                }).then((result) => {
                    window.location.href = 'index.html';
                });
            } else if (jqXHR.status == 403) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Acesso negado!',
                    text: 'Você não tem permissão para acecssar essa funcionalidade!'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: jqXHR.responseText
                });
            }
        }
    });
})

// formatação basica do telefone
function FormatarTelefone(texto) {
    if (texto == null) {
        return "";
    } else {
        return texto.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
}

// formatação básica do CPF
function FormataCPF(cpf) {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Remover mascara CPF
function RemoveMascaraCPF(cpf) {
    return cpf.replace(/\./g, "").replace(/\-/g, "");
}

// remover mascara Telefone
function RemoveMascaraTelefone(telefone) {
    return telefone.replace(/\(/g, "").replace(/\)/g, "").replace(/\-/g, "").replace(/\ /g, "");
}

// formatação basica da data
function FormatarData(dataString) {
    let data = moment(dataString).format('DD/MM/YYYY');
    return data;
}

var nivelAcesso = localStorage.getItem('nivelAcesso');