/*
function() é uma função anonima
() => é uma forma mais enchuta de declarar a função anonima
se tiver so um parametro na função, noa precisa dos '()'
*/




/*essa funçaõ seleciona o select uf
faz a promeça de ir ao site do IBGE
reorna o que viu como .json
popula o select com o for*/
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states  => {
        /*essa parte do for popula o select colocando as estado la com cada id e cada nonme*/
            for( const state of states ){
                ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</opition>`
            }

    } )

}
populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    /*essa variavel é para pegar o index dps*/
    const stateInput = document.querySelector("input[name=state]")
    

    const ufValue = event.target.value
    
    /*aqui faz o processo de pegar o index, adc na variavel e trocar o index peo nome do estado*/
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    /*essa parte é para nao acumular as cidades quando mudar o estado*/
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    /*aqui mesma coisa, so trasformou o site em uma variavel chamada url e faz as mesmas promeças*/
    fetch(url)
    .then( res => res.json())
    .then( cities  => {
        /*essa parte do for popula o select colocando as cidades la com cada id e cada nonme*/ 
        for( const city of cities ){
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</opition>`
        }
         citySelect.disabled = false     
    } )
}



/*essa parte, com o Listener ali, é para "ouvir qqr mudança do select uf para, no caso, chamar a getCities"*/
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


    //agora vamos trbalahr os intens de coleta
    // no caso vamos usar um loop para pegar todos os li

    //aqui falamos que todos os li estao para a variavel itensCollect
    //aqui usamos o querrySelectorAll poruq existem varios li
    const itensCollect = document.querySelectorAll(".itens-grid li")
    
    //aqui colocomos o ouvidor de click na variavel item que vai receber a itensCollect (que sao os li)
    for( const item of itensCollect){
        item.addEventListener("click", handSelectedItem)
    }
    


    const collectedItens = document.querySelector("input[name=items]")
    //array pra pegar os itens selecinados, no caso ele começa vazio
    let selectedItens =  []


    //essa função chama o evento onde ela eata por referencia e coloca dentro da variavel o id dos li
    function handSelectedItem(event){
        const itemLi = event.target

        //para add ou remover uma classe com o js
        //nisso aqui, isso funciona assim. na lista dos itens li exite "selected?", caso nao exista ele adc, caso exista, ele remove
        itemLi.classList.toggle("selected")

        //isso aqui joga o id do Li clickado e joga dentro do itemId
        const itemId = itemLi.dataset.id

        console.log('ITEM ID: ', itemId)
        
       

        

        //priemiro verificamos se há itens selecionados
        //entao, vamos pegar os itens que sao selecionados 

        //isso compara o iten clicado com o item que ta dentro do array
        //tipo, se todos estao selecionados, detro do array temos "1, 2, 3, 4, 5, 6"
        //se eu tirar o cinco (clickar), vai colocar o id dele dentro do itemID, ok?
        //entao vai pegar o itemId e comparar com o primeiro do array,no caso 1,
        //como 1 nao é igual a 5, o valor nao é retornado e roda dnv ate o cinco 
        //chegando no valor certo, o index é retornado para itemFound
        const alreadySelected = selectedItens.findIndex( item =>{           
            const itemFound = item == itemId // isso é true ou false
            return itemFound
        })

        

        //se ja estiver selecionados, 
        //ou seja, se ele existir dentro do array (pq o array começa no 0)
        if(alreadySelected >= 0 ){
                //a gente tira da seleção
                //isso aqui vai filtrar os itens que estao selecionados la no array, ou seja, vai tirar um que esteja selcionado
                //e vai tirar quando essa condição for falsa
                //ou seja, se o item 2 estiver selecionado e agente clicar nele
                //a função pega o item 2 e compara com o id (que é 2)
                //como ali ta flando que é diferent, esse retorno de 2 para 2 retorna uma resposta falsa
                //e tira o item da seleção
            const filteredItems = selectedItens.filter( item => {
                //isso fala que o que eu cliquei é diferente ao que existe
                //se ano for (ja existir) o id é filtrado
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })
            //isso aqui, depois de conferir se o item clicado é diferente ou igual dos item que ja existe
            //caso seja diferente, vai dar true e adiciona normal
            //se der false(o item que voce clicou nao é novo e ja existe) a gente tira com esse codigo a baixo
            selectedItens = filteredItems

        }else{
            //se nao tiver, a gente add a seleção
            //esse se nao tiver, na logica, significa que o if la é true e executa esse negocio aqui  

            selectedItens.push(itemId)

            console.log('selectedItens: ', selectedItens)


        }
        //depois a gente atualiza o hidden com os dados que foram selecionados (que estao no array)
        collectedItens.value = selectedItens
        










    }
    



