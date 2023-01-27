exibirElementosVendedor();
function exibirElementosVendedor() {
    if(nivelAcesso == '1'){
        $("#cardCadastroCliente").show();
    }
};

// assim que finaliza a leitura de todo o documento ele lista os clientes de forma automatica
$(document).ready(function () {
    ListarClientes();  
});

// criei uma variavel contendo a string da minha url base onde estão minhas APIs
var tabelaCliente;
var urlBaseApi = "https://localhost:44378/";

// chamo a função para limpar o corpo da tabela de clientes.
function LimparCorpoTabelaClientes() {
    var componenteSelecionado = $("#tabelaCliente tbody")
    componenteSelecionado.html("");
}

// Essa função adiciona na rota url da minha API a condição
// depois faço a captura do arquivo json com ajax, e envio para minha construtora de tabela
function ListarClientes() {
    var rotaApi = "cliente";

    $.ajax({
        url: urlBaseApi + rotaApi,
        method: 'GET',
        dataType: 'json',
        // beforeSend: function (xhr){
        //     xhr.setRequestHeader('Authorization', 'Bearer' + localStorage.getItem('bearer'));
        // }
    }).done(function (conteudoApi) {
        ConstruirTabelaCliente(conteudoApi);
    });
}
// nesta função eu crio uma variavel string vazia
// faço um foreach com jquery percorrendo as linhas, e pegando os valores de cada linha e montando minha tabela
// retornando na propria tabela
function ConstruirTabelaCliente(linhas) {

    var htm = "";

    $(linhas).each(function (index, linha) {
        htm = htm + `<tr><th>${FormataCPF(linha.cpfCliente)}</th><td>${linha.nome.toUpperCase()}
        </td><td>${FormatarData(linha.nascimento)}</td><td>${FormatarTelefone(linha.telefone)}</td></tr>`;
    });

    $("#tabelaCliente tbody").html(htm);
    if (tabelaCliente == undefined) {
        tabelaCliente = $('#tabelaCliente').DataTable({
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/pt-BR.json'
            }
        });
    }
}

// criando o json do objeto a ser inserido
function ObterValoresFormulario() {
    var cpf = $("#inputCpf").val();
    var nome = $("#inputNome").val();
    var nascimento = $("#inputNascimento").val();
    var telefone = $("#inputTelefone").val();

    var objeto = {
        cpfCliente: RemoveMascaraCPF(cpf),
        nome: nome,
        nascimento: nascimento,
        telefone: telefone == "" ? null : RemoveMascaraTelefone(telefone)
    };

    return objeto;
}

// esta funcao pega a rota de POST e cria o json com o objeto inserido no formulario, enviando via API
function EnviarFormularioCliente() {
    var rotaApi = "cliente";
    var objeto = ObterValoresFormulario();
    var json = JSON.stringify(objeto);

    $.ajax({
        url: urlBaseApi + rotaApi,
        method: 'POST',
        data: json,
        contentType: 'application/json'
    }).done(function () {
        LimparFormularioCliente();
        ListarClientes();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente adicionado com sucesso!',
            showConfirmButton: false,
            timer: 1500
        });

    });
}

// funcao para enviar formulario
function SubmitFormulario() {
    var isValid = $('#formularioCliente').parsley().validate();
    if (isValid) {
        EnviarFormularioCliente();
    }
}

// funcao para limpar o formulario de inserção
function LimparFormularioCliente() {
    $('#formularioCliente').trigger("reset");
}