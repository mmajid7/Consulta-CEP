let dadosEndereço = {}  //Armazena temporariamente os dados do endereço consultado.

function consultaCep(){
    const cep = document.querySelector('#cep').value

    let url = "https://viacep.com.br/ws/"+ cep +"/json/"  //constroi a url para a api de consulta de cep
    fetch(url).then(function(response){  //requisiçao a api
        response.json().then(function(data){
             mostrarEndereço(data)
        })
    })
}

function mostrarEndereço(dados){

    dadosEndereço = dados  //armazenar os dados na variavel dados endereço
    let retorno = document.querySelector('#retorno')
    retorno.innerHTML = `<p>Endereço: ${dados.logradouro} </p>
                         <p> Complemento: ${dados.complemento} </p>
                         <p> Bairro: ${dados.bairro} </p>
                         <p>Cidade: ${dados.localidade}</p>
                         <p>Uf: ${dados.uf}</p>
                         <p>ddd: ${dados.ddd}</p>
                         <p>Ibge: ${dados.ibge}</p>`
}

function salvarDados() {
    if (Object.keys(dadosEndereço).length > 0) {  // cria array que contem as chaves de um objeto
        let enderecos = JSON.parse(localStorage.getItem('enderecos')) || []
        enderecos.push(dadosEndereço)   // Adiciona o novo endereço ao array
        localStorage.setItem('enderecos', JSON.stringify(enderecos))   // Salva o array atualizado no localStorage
        alert('Dados salvos com sucesso!!')
        mostrarDadosSalvos()  // Atualiza a exibição dos dados salvos
    } else {
        alert('Nenhum dado para salvar.')
    }
}
function mostrarDadosSalvos() {
    const enderecosJson = localStorage.getItem('enderecos')   // Recupera o array de endereços do localStorage
    let dadosSalvos = document.querySelector('#dadosSalvos') // Seleciona o contêiner #dadosSalvos
    dadosSalvos.innerHTML = "<h2>Dados Salvos</h2>"
    
    if (enderecosJson) {
        const enderecos = JSON.parse(enderecosJson) // Converte os dados salvos de JSON para um array de objetos
        enderecos.forEach(dados => {          // Itera sobre o array de endereços e exibe cada um no contêiner
            dadosSalvos.innerHTML += `<p>Endereço: ${dados.logradouro} </p>
                                      <p>Complemento: ${dados.complemento} </p>
                                      <p>Bairro: ${dados.bairro} </p>
                                      <p>Cidade: ${dados.localidade}</p>
                                      <p>Uf: ${dados.uf}</p>
                                      <p>ddd: ${dados.ddd}</p>
                                      <p>Ibge: ${dados.ibge}</p>
                                      <hr>`
        })
    } else {
        dadosSalvos.innerHTML += '<p>Nenhum dado salvo encontrado.</p>'
    }
}

document.addEventListener('DOMContentLoaded', mostrarDadosSalvos)  // Chama mostrarDadosSalvos ao carregar a página para exibir os dados salvos se ter