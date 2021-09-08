function executeFirst() {
    let type = $("#type").val();

    sendRequest("/firstQuery", { type });
}

function executeSecondV1() {
    let names = $("#names1").val()
        .replace(`'`, '')
        .replace(`"`, '')
        .replace(', ', ',')
        .split(',')
        .join(`','`);
    let indName = $("#indName1").val();

    sendRequest("/secondQueryV1", { indName, names });
}

function executeSecondV2() {
    let names = $("#names2").val()
        .replace(`'`, '')
        .replace(`"`, '')
        .replace(', ', ',')
        .split(',')
        .join(`','`);
    let indName = $("#indName2").val();

    sendRequest("/secondQueryV2", { indName, names});
}

function sendRequest(url, data) {
    $.ajax({
        "url": url,
        "method": "POST",
        "data": data
    })
    .then(result => {
        alert("Successfully updated rows.");
        //window.location.reload();

        return;
    })
    .catch(err => {
        alert("An error occured.");
        let newHTML = `<span>` + result + `</span>`;
        $("#error").html(newHTML);

        return;
    });
}