function addLog(data, type) {
    var msgObj = {}
    var key = Object.keys(data)[0]
    if (type === "add") {
        msgObj = { msg: "Added", class: "success" }
    } else if (type === "update") {
        msgObj = { msg: "Updated", class: "success" }
    } else {
        msgObj = { msg: "Removed", class: "danger" }
    }
    document.getElementById('history-log').innerHTML += `<tr id="history-${data[key]}" class=${msgObj.class}>
    <td>${new Date().toGMTString()} - ${msgObj.msg} ${JSON.stringify(data)}</td>    
</tr>`
//<td class="delete-button-wrapper"><button id="" class="delete-log-button" value="${data[key]}">X</button></td>
}

function removeLog(msgId) {
    document.getElementById(msgId).remove
}