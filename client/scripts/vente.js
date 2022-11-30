function chargergestion(){
    TOKEN_ADMIN  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac";
    $.ajax({
        url: "/ventes",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_ADMIN);
        },
        success: function (result) {
            console.log(result);
            $.each(result, function (key, value) {
                vente = vente_to_html_list(value);
                $('#list_ventes').append(vente);
            });
        }
    });
}

function vente_to_html_list(vente){
    vente_tab = $('<tr id="ligne_cmd_'+vente.id+'" onclick="chargerCommandeActive(this)"></tr>')
        .addClass("clickable-row")
        .append('<td id="id_cmd_'+vente.id+'">' + vente.id + '</td>')
        .append('<td id="date_cmd_'+vente.id+'">' + vente.date.slice(0,10) + '</td>')
        .append('<td id="status_cmd_'+vente.id+'">'+ vente.status +'</td>')
    return (vente_tab);
}

$(function () {

});






