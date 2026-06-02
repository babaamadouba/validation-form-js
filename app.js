
// LES ELEMENTS DOM

const formulaire = document.getElementById("formulaire");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
const domaine = document.getElementById("domaine");
const presentation = document.getElementById("presentation");
const compteur = document.getElementById("compteur");
const profilCree = document.getElementById("profil-cree");
const boutonSubmit =
document.getElementById("bouton-submit");


// LES FONCTIONS UTILITAIRES

function nettoyerTexte(texte) {

    return texte
        .trim()
        .replace(/\s+/g, " ");
}

function afficherErreur(champ, message) {

    champ.classList.remove("valide");
    champ.classList.add("invalide");

    const bloc =champ.closest(".champ");

    bloc.querySelector(".message-erreur").textContent = message;

    const icone =bloc.querySelector(".icone-validation");

    if (icone) {

        icone.className ="bi bi-exclamation-circle-fill icone-validation erreur";
    }

    return false;
}

function afficherSucces(champ) {

    champ.classList.remove("invalide");
    champ.classList.add("valide");

    const bloc =
        champ.closest(".champ");

    bloc.querySelector(".message-erreur")
        .textContent = "";

    const icone =
        bloc.querySelector(".icone-validation");

    if (icone) {

        icone.className =
            "bi bi-check-circle-fill icone-validation succes";
    }

    return true;
}

// FONCTION VALIDER NOM


function validerNom(nom) {

    const valeur =
        nettoyerTexte(nom.value);

    if (valeur.length < 3) {

        return afficherErreur(
            nom,
            "Minimum 3 caractères."
        );
    }

    return afficherSucces(nom);
}


// FONCTION VALIDER PRENOM


function validerPrenom() {

    const valeur =
        nettoyerTexte(prenom.value);

    if (valeur.length < 3) {

        return afficherErreur(
            prenom,
            "Minimum 3 caractères."
        );
    }

    return afficherSucces(prenom);
}


// EMAIL


function validerEmail() {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.value.trim())) {

        return afficherErreur(
            email,
            "Adresse email invalide."
        );
    }

    return afficherSucces(email);
}


// DOMAINE


function validerDomaine() {

    if (domaine.value === "") {

        return afficherErreur(
            domaine,
            "Choisissez un domaine."
        );
    }

    return afficherSucces(domaine);
}


// RYTHME


function validerRythme() {

    const radios =
        document.querySelectorAll(
            'input[name="rythme"]'
        );

    const bloc =radios[0].closest(".champ");

    const erreur =bloc.querySelector(".message-erreur");

    const selection =
        [...radios].some(
            radio => radio.checked
        );

    if (!selection) {

        erreur.textContent =
            "Veuillez choisir une option.";

        bloc.classList.remove("radio-valide");
        bloc.classList.add("radio-invalide");

        return false;
    }

    erreur.textContent = "";

    bloc.classList.remove("radio-invalide");
    bloc.classList.add("radio-valide");

    return true;
}


// PASSIONS


function validerPassions() {

    const passions =
        document.querySelectorAll(".passion");

    const nombre =
        [...passions]
        .filter(
            item => item.checked
        )
        .length;

    const bloc =
        passions[0].closest(".champ");

    const erreur =
        bloc.querySelector(".message-erreur");

    if (nombre < 2) {

        erreur.textContent =
            "Sélectionnez au moins 2 centres d'intérêt.";

        bloc.classList.remove("checkbox-valide");
        bloc.classList.add("checkbox-invalide");

        return false;
    }

    erreur.textContent = "";

    bloc.classList.remove("checkbox-invalide");
    bloc.classList.add("checkbox-valide");

    return true;
}


// PRESENTATION


function validerPresentation() {

    const valeur =
        nettoyerTexte(
            presentation.value
        );

    if (valeur.length < 25) {

        return afficherErreur(
            presentation,
            "Minimum 25 caractères."
        );
    }

    if (valeur.length > 255) {

        return afficherErreur(
            presentation,
            "Maximum 255 caractères."
        );
    }

    return afficherSucces(
        presentation
    );
}


// COMPTEUR


presentation.addEventListener(
    "input",
    () => {

        const restant =
            255 -
            presentation.value.length;

        compteur.textContent =
            `${restant} caractères restants`;

        validerPresentation();
        verifierFormulaireComplet();
    }
);


// BOUTON DYNAMIQUE


function verifierFormulaireComplet() {

    const formulaireValide =

        validerNom(nom) &&
        validerNom(prenom) &&
        validerEmail() &&
        validerDomaine() &&
        validerRythme() &&
        validerPassions() &&
        validerPresentation();

    boutonSubmit.disabled = !formulaireValide;

    boutonSubmit.classList.toggle(
        "bouton-actif",
        formulaireValide
    );

    return formulaireValide;
}


// EVENEMENTS


nom.addEventListener("input", () => {
    validerNom();
    verifierFormulaireComplet();
});

prenom.addEventListener("input", () => {
    validerPrenom();
    verifierFormulaireComplet();
});

email.addEventListener("input", () => {
    validerEmail();
    verifierFormulaireComplet();
});

domaine.addEventListener("change", () => {
    validerDomaine();
    verifierFormulaireComplet();
});

document
.querySelectorAll(
    'input[name="rythme"]'
)
.forEach(radio => {

    radio.addEventListener(
        "change",
        () => {

            validerRythme();
            verifierFormulaireComplet();
        }
    );
});

document
.querySelectorAll(".passion")
.forEach(item => {

    item.addEventListener(
        "change",
        () => {

            validerPassions();
            verifierFormulaireComplet();
        }
    );
});


// CREATION PROFIL


function creerCarteProfil() {

    const rythme =

        document.querySelector(
            'input[name="rythme"]:checked'
        ).value;

    const passions =

        [...document.querySelectorAll(
            ".passion"
        )]
        .filter(
            item => item.checked
        )
        .map(item =>

            `<span class="badge-passion">
                ${item.value}
            </span>`
        )
        .join("");

    profilCree.innerHTML = `

        <div class="profil-premium">

            <div class="bandeau-succes">

                <i class="bi bi-check-circle-fill"></i>

                Profil créé avec succès

            </div>

            <div class="profil-header">

                <div class="avatar">

                    <i class="bi bi-person-fill"></i>

                </div>

                <h2>

                    ${prenom.value}
                    ${nom.value}

                </h2>

                <span class="badge bg-light text-danger">

                    ${domaine.value}

                </span>

            </div>

            <div class="profil-body">

                <div class="ligne-info">

                    <i class="bi bi-envelope-fill"></i>

                    <span>${email.value}</span>

                </div>

                <div class="ligne-info">

                    <i class="bi bi-clock-fill"></i>

                    <span>${rythme}</span>

                </div>

                <div class="ligne-info">

                    <i class="bi bi-heart-fill"></i>

                    <span>Centres d'intérêt</span>

                </div>

                <div class="mb-3">

                    ${passions}

                </div>

                <div class="ligne-info">

                    <i class="bi bi-chat-left-text-fill"></i>

                    <span>Présentation</span>

                </div>

                <div class="presentation-box">

                    ${presentation.value}

                </div>

            </div>

        </div>
    `;
}


// REINITIALISATION DONNEES


function reinitialiserValidation() {

    document
        .querySelectorAll(
            ".valide,.invalide"
        )
        .forEach(element => {

            element.classList.remove(
                "valide",
                "invalide"
            );
        });

    document
        .querySelectorAll(
            ".message-erreur"
        )
        .forEach(message => {

            message.textContent = "";
        });

    document
        .querySelectorAll(
            ".icone-validation"
        )
        .forEach(icone => {

            icone.className =
                "icone-validation";
        });

    document
        .querySelectorAll(
            ".radio-valide,.radio-invalide,.checkbox-valide,.checkbox-invalide"
        )
        .forEach(bloc => {

            bloc.classList.remove(
                "radio-valide",
                "radio-invalide",
                "checkbox-valide",
                "checkbox-invalide"
            );
        });

    compteur.textContent =
        "255 caractères restants";
}


// BOUTON ENVOYER


formulaire.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const valide =

            validerNom() &&
            validerPrenom() &&
            validerEmail() &&
            validerDomaine() &&
            validerRythme() &&
            validerPassions() &&
            validerPresentation();

        if (!valide) {

            return;
        }

        creerCarteProfil();

        formulaire.reset();

        reinitialiserValidation();

        boutonSubmit.disabled = true;

        boutonSubmit.classList.remove(
            "bouton-actif"
        );

        window.scrollTo({

            top:
            document.body.scrollHeight,

            behavior:"smooth"
        });
    }
);