function addLog(data, type, isJSON = true) {
    var msgObj = {}
    var key = Object.keys(data)[0]
    if (type === "add") {
        msgObj = { msg: "Added", class: "success" }
    } else if (type === "update") {
        msgObj = { msg: "Updated", class: "success" }
    } else if (type === "removed") {
        msgObj = { msg: "Removed", class: "danger" }
    } else if (type === "info") {
        msgObj = { msg: "", class: "success" }
    } else if (type === "error") {
        msgObj = { msg: "", class: "danger" }
    }

    if (isJSON) {
        document.getElementById('history-log').innerHTML += '<tr id="history-' + data[key] + '" class="' + msgObj.class + '">' +
            '<td>' + new Date().toTimeString() + "-" + msgObj.msg + ' ' + JSON.stringify(data) + '</td>' +
            '</tr>'
    } else {
        // console.log('<tr class="' + msgObj.class + '">' +'<td> ' + new Date().toGMTString() + "-" + data + '</td >' +'</tr > ')
        document.getElementById('history-log').innerHTML += '<tr class="' + msgObj.class + '">' +'<td> ' + new Date().toGMTString() + "-" + data + '</td >' +'</tr > '
    }
    //<td class="delete-button-wrapper"><button id="" class="delete-log-button" value="${data[key]}">X</button></td>
}

function removeLog(msgId) {
    document.getElementById(msgId).remove
}