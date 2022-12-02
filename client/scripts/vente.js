function chargerventes(){
    TOKEN_ADMIN  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac";
    $.ajax({
        url: "/ventes",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_ADMIN);
        },
        success: function (result) {
            console.log(result);
            $.each(result, function (key, value) {


                if(value.status === "prepare" || value.status === "préparée") {
                    vente = $("<tr>" +
                        "<td>" + value.id + "</td> " +
                        "<td>" + value.date.slice(0,10) + "</td> " +
                        "<td>" + value.status + "</td> " +
                        "<td><input class='sendButton' type='button' value='Ajouter à la livraison' onclick='livrer_vente(" + value.id + ")'/></td> " +
                        "</tr>");

                    $('#list_ventes').append(vente);
                }
                else
                {
                    vente = $("<tr>" +
                        "<td>" + value.id + "</td> " +
                        "<td>" + value.date.slice(0,10) + "</td> " +
                        "<td>" + value.status + "</td> " +
                        "</tr>");

                    $('#list_ventes').append(vente);
                }

                //vente = vente_to_html_list(value);
                //$('#list_ventes').append(vente);
            });
        }
    });
}

function livrer_vente(id_vente){
    //console.log(id_vente);

    $.ajax({
        url: "/ventes/" + id_vente + "/livrer",
        method: "PUT",
        beforeSend: function (xhr) {

            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);

        },
        success: function (result) {
            $('#list_ventes').empty();
            chargerventes();
        }
    });

}

function vente_to_html_list(vente){
    vente_tab = $('<tr id="ligne_cmd_'+vente.id+'"></tr>')
        .addClass("row")
        .append('<div class="col" id="id_cmd_'+vente.id+'">' + vente.id + '</div>')
        .append('<div class="col" id="date_cmd_'+vente.id+'">' + vente.date.slice(0,10) + '</div>')
        .append('<div class="col" id="status_cmd_'+vente.id+'">'+ vente.status +'</div>')
        .append('<div class="col" id="button_cmd_'+vente.id+'">' + vente.status +'</div>')
    return (vente_tab);
    //<td><input class='myclass' type='button' value='Delete'/></td>
    //<button type="button" class="btn btn-primary position-relative" onclick="chargerproduit()">Tous les produits</button>
}

$(function () {

});






