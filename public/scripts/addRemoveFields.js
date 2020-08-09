//adicionar novo horario
$('#add-time').on("click", function () {
    //campos que serao duplicados
    const fieldContainer = $('.schedule-item:first');

    const newFieldContainer = fieldContainer.clone(true).find("input").val("").end();
    const fields = fieldContainer.find("input");

    newFieldContainer.appendTo('#schedule-items');


    //$('#schedule-items').append(newFieldContainer);

});

function isEmpty(arr) {
    arr.each(function () {
        if ($(this).val() == '') {
            return true;
        }
    });

}

$('.schedule-item').on("click", "span", function (event) {
    $(this).parent().parent().fadeOut(500, function () {
        $(this).remove();
    });
    event.stopPropagation();

});