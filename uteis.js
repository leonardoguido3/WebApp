// lendo o documento e inserindo as mascaras
$(document).ready(function() {
    $('.cpf').mask('000.000.000-00', {reverse: true});
    $('.telefone').mask('(00) 00000-0000');

    $.ajaxSetup({
        error : function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 400) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: jqXHR.response.Text,
                  })
            } else if (jqXHR.status == 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Houve uma falha na conexão com os nossos servidores, verifique sua internet!',
                  })
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
function FormatarTelefone(texto){
    if (texto == null){
        return "";
    } else {
        return texto.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
}

// formatação básica do CPF
function FormataCPF(cpf){
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Remover mascara CPF
function RemoveMascaraCPF(cpf){
    return cpf.replace(/\./g, "").replace(/\-/g, "");
}

// remover mascara Telefone
function RemoveMascaraTelefone(telefone){
    return telefone.replace(/\(/g, "").replace(/\)/g, "").replace(/\-/g, "").replace(/\ /g, "");
}

// formatação basica da data
function FormatarData(dataString){
    let data = moment(dataString).format('DD/MM/YYYY');
    return data;
}