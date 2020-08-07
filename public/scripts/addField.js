//Procurar botao
document.querySelector("#add-time").addEventListener('click', cloneField);

function cloneField(){
    //campos que serao duplicados
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    //limpar campos antes de duplicar
    const fields = newFieldContainer.querySelectorAll('input');
    fields.forEach(function(field){
        field.value = "";
    });

    document.querySelector('#schedule-items').appendChild(newFieldContainer);

}