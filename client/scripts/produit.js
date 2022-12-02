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

function remove_item(id_item) {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier/" + id_item,
        method: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            console.log(result)
            $('#cart_details').empty();
            chargerpanier();
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

    item_picture = $('<div></div>')
        .addClass(' rounded-3 p-0 text-center')
        .append('<br><img src="images/produits/'+item.id+'.png" alt="Image de '+item.nom+'"  class=" rounded-3 my-0 fw-normal" style="height: 120px;"/>');



    item_card.append(item_head).append(item_picture).append(item_body);

    return $('<div></div>').addClass('col-md-3').append(item_card);
}


function chargerproduit() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            $('#list_items').empty();
            $.each(result, function (key, value) {
                item = item_to_html(value);
                $('#list_items').append(item);
            });
        }
    });
}

function chargerProduitSupplements() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            $('#list_items').empty();
            // console.log(result);
            $.each(result, function (key, value) {
                if(value.categorie.nom === "Suppléments") {
                    item = item_to_html(value);
                    $('#list_items').append(item);
                }
            });
        }
    });
}

function chargerProduitNourriture() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            $('#list_items').empty();
            // console.log(result);
            $.each(result, function (key, value) {
                if(value.categorie.nom === "Nourriture") {
                    item = item_to_html(value);
                    $('#list_items').append(item);
                }
            });
        }
    });
}

function chargerProduitBouteilles() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            $('#list_items').empty();
            // console.log(result);
            $.each(result, function (key, value) {
                if(value.categorie.nom === "Bouteilles") {
                    item = item_to_html(value);
                    $('#list_items').append(item);
                }
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
                    "<td><input class='btn btn-dark' type='button' value='Retirer du panier' onclick='remove_item(" + value.id + ")'/></td> " +
                    "</tr>");

                $('#cart_details').append(item);
            });
        }
    });
}

// const confirmCommande = () => {
//     let result = confirm("Êtes-vous certain de vouloir continuer?")
//     if(!result) {
//         event.preventDefault();
//     }
//     else {
//         document.getElementById('form_commande').submit();
//     }
// }

const confirmation = () => {
    let result = confirm("Êtes-vous certain de vouloir continuer?")
    if(!result) {
        event.preventDefault();
    }
}

const confirmationCommande = () => {
    let result = confirm("Êtes-vous certain de vouloir continuer?")
    if(!result) {
        event.preventDefault();
    }

    commanderPanier();
}

function commanderPanier() {
    console.log("commande du panier")
    $.ajax({
        url: "/ventes",
        method: "POST",
        data: {"idClient": ID_CLIENT},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            console.log(result);
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
