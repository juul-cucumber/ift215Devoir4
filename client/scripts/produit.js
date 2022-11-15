ID_CLIENT = 1
TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"

function add_item(id_item) {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            $('#item_counter').text(result.items.length)
        }
    });
}


function item_to_html(item) {
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');

    item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');

    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Qte dispo :' + item.qte_inventaire + '</li>')
        .append('<li>Categorie. :' + item.categorie.nom + '</li>');

    item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix + '</h1>')
        .append(item_detail)
        .append('<small class="small">' + item.description + '</small>' +
            '<p class="w-100 display-6 text-center">' +
            '<button type="button" class="btn btn-primary position-relative" onclick="add_item(' + item.id + ')">' +
            '<i class="bi bi-cart-plus"></i>' +
            '</button>' +
            '</p>');


    item_card.append(item_head).append(item_body);

    return $('<div></div>').addClass('col-md-3').append(item_card);
}


function chargerproduit() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            // console.log(result);
            $.each(result, function (key, value) {
                item = item_to_html(value);
                $('#list_items').append(item);
            });
        }
    });
}

function chargerpanier() {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            console.log(result)
            $("#total").text(result.valeur);
            $.each(result.items, function (key, value) {

                item = $("<tr>" +
                    "<td>" + value.nomProduit + "</td> " +
                    "<td>" + value.prix + "</td> " +
                    "<td>" + value.quantite + "</td> " +
                    "<td>" + value.prix * value.quantite + "</td> " +
                    "</tr>");

                $('#cart_details').append(item);
            });
        }
    });
}


$(function () {

});


// $.ajax
// ({
//     type: "GET",
//     url: "clients",
//     dataType: 'json',
//     // async: false,
//     // data: '{}',
//     beforeSend: function (xhr){
//         xhr.setRequestHeader('Authorization', "Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac");
//     },
//     success: function (result){
//         console.log(result)
//     }
// });
