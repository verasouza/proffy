//Procurar botao
document.querySelector("#add-time").addEventListener('click', cloneField);

function cloneField() {
    //campos que serao duplicados
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    //limpar campos antes de duplicar
    const fields = newFieldContainer.querySelectorAll('input');
    fields.forEach(function (field) {
        field.value = "";
    });

    document.querySelector('#schedule-items').appendChild(newFieldContainer);

}

// botao deletar horario
document.querySelector("#deleteItem").addEventListener('click', excludeField);
// var botaoExcluir = document.querySelector("#deleteItem");
// botaoExcluir.addEventListener('click', () =>{excludeField(botaoExcluir.parentNode)});

function excludeField() {

    const fieldsToDelete = document.querySelector('.schedule-item');
    fieldsToDelete.parentNode.removeChild(fieldsToDelete);

}

// function excludeField(){
//     botaoExcluir.addEventListener('click', function(){
//         const fieldsToDelete = this.parentNode;
//         fieldsToDelete.remove();
//     })
//     var botaoExcluir = document.querySelector("#deleteItem");
//     //campos que serao excluidos
//     const fieldsToDelete = botaoExcluir.parentNode;
//     fieldsToDelete.remove();
// }