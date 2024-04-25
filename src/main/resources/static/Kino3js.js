
function innSkjema() {
    const billetter = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefon: $("#telefon").val(),
        epost: $("#epost").val()
    };

    console.log(billetter)

    const telefonRegex = /^[0-9]{3} [0-9]{2} [0-9]{3}|[0-9]{8}$/;
    if (!telefonRegex.test(billetter.telefon)) {
        alert("Skriv en gyldig nummer (8 siffer)");
        return;
    }

    const epostRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!epostRegex.test(billetter.epost)) {
        alert("Skriv en gyldig epostadresse");
        return;
    }

    const fornavnRegex = /^[a-zA-ZæøåÆØÅ .\-]{2,20}$/;
    if (!fornavnRegex.test(billetter.fornavn)) {
        alert("Skriv inn gyldig fornavn, kun bokstaver");
        return;
    }

    const etternavnRegex = /^[a-zA-ZæøåÆØÅ .\-]{2,30}$/;
    if (!etternavnRegex.test(billetter.etternavn)) {
        alert("Skriv inn gyldig etternavn, kun bokstaver");
        return;
    }

    console.log(billetter)
    $.post("/lagre",billetter, function() {
        hentAlle()
    });

}

function hentAlle() {
    $.get("/hentAlle", function (billettene) {
        formatBilletter(billettene);
    });
}

function formatBilletter(billetten) {
    let output = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnummer</th><th>Epost</th></tr>";
    for (const billetter of billetten) {
        output += "<tr><td>" + billetter.film + "</td><td>" + billetter.antall + "</td><td>" + billetter.fornavn + "</td>" +
            "<td>" + billetter.etternavn + "</td><td>" + billetter.telefon + "</td><td>" + billetter.epost + "</td></tr>";
    }
    output += "</table>";
    $("#billettContainer").html(output);
}

function slettAlle() {
    $.get("/slettAlle", function () {
        hentAlle();
    });
}