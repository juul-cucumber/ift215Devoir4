function menuGaucheClic(lien){
    let menu = document.getElementById('menu-gauche');
    let liens = menu.children;
    for (let i = 0 ; i<liens.length ; i++){
        liens[i].classList.remove("choisi")
    }
    lien.classList.add("choisi");
}

function attacherListenerMenuGauche(){
    let menu = document.getElementById("menu-gauche");
    let liens = menu.children;
    for (let i = 0 ; i<liens.length ; i++){
        liens[i].addEventListener('click', function(){
            menuGaucheClic(liens[i])
        });
    }
}

function changeBouton()
{
    document.getElementById("bouton_Connexion").value="Déconnexion";
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
async function chargerinscription (){
    attacherListenerMenuGauche()
}

function ConnexionUtilisateur() {
    let COURRIEL = document.getElementById("courriel").value;
    let MDP = document.getElementById("mdp").value;
    console.log(document.getElementById("courriel").value);

    $.ajax({
        url: "/connexion/",
        method: "POST",
        data: JSON.stringify({"courriel": COURRIEL, "mdp": MDP}),
        contentType: "application/json",
        success: function (result) {
            TOKEN_CLIENT = result.token;
            TOKEN_ADMIN = result.token;
            ID_CLIENT = result.idClient;
            console.log(result);

            if (result.role === 'admin') {
                $('#enTeteGestionCommande').attr("hidden", false)
                window.location.replace('#/ventes')
            } else {
                $('#enTeteGestionCommande').attr("hidden", true)
                window.location.replace('#/produit')
            }
            changerTexteConnexion()
        },
        error: function (result) {
            alert("Mot de passe invalide")
        }


    });

}

function changerTexteConnexion(){

    var elem = document.getElementsByClassName("btn btn-primary btn-lg")

    // if(elem.value === "Déconnexion"){
    //     console.log("testtesttest")
    //     window.location.replace("http:/#/deconnexion")
    //     //$('#wtv').text("Connexion")
    // }
    $('#wtv').text("Deconnexion")

    console.log(elem.textContent)
}

function deconnexion() {

    var elem = document.getElementById("wtv")
    $('#enTeteGestionCommande').attr("hidden", true)
    $('#wtv').text("Connexion")

}


function inscriptionClient() {

    console.log("fsfdrgra")

    let PRENOM = document.getElementById("prenom").value;
    let NOM = document.getElementById("nom").value;
    let AGE = document.getElementById("age").value;
    let ADRESSE = document.getElementById("adresse").value;
    let PAYS = document.getElementById("pays").value;
    let COURRIEL = document.getElementById("courriel").value;
    let MDP = document.getElementById("mdp").value;

        $.ajax({
            url: "/clients/",
            method: "POST",
            data: JSON.stringify({
                "mdp": MDP,
                "prenom": PRENOM,
                "nom": NOM,
                "age": AGE,
                "adresse": ADRESSE,
                "pays": PAYS,
                "courriel": COURRIEL
            }),
            contentType: "application/json",
        });
}

const verifInscription = () => {
    let courriel = document.getElementById('courriel').value
    $.ajax({
        url: `/clients/`,
        method: "GET",
        data:{"courriel": courriel},
        success: function (result) {
            if(result.length == 0)
                inscriptionClient()
            else {
                alert("Ce courriel existe déjà")
            }
        }
    })

}

const verifConnexion = () => {
    let courriel = document.getElementById('courriel').value;
    console.log(courriel)
    $.ajax({
        url: `/clients/`,
        method: "GET",
        data:{"courriel": courriel},
        success: function (result) {
            console.log(result)
            if(result.length == 0 && courriel != 'admin@admin.com') {
                alert("Ce courriel n'existe pas, veuillez vous inscrire")
            }
            else {
                ConnexionUtilisateur()
            }
        }
    })

}