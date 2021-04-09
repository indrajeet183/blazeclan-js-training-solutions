function addLog(emp, type) {
    var msgObj = {}
    if (type === "add") {
        msgObj = { msg: "Added", class: "success" }
    } else if (type === "update") {
        msgObj = { msg: "Updated", class: "success" }
    } else {
        msgObj = { msg: "Removed", class: "danger" }
    }
    document.getElementById('history-log').innerHTML += `<tr id="history-${emp.EmpNo}" class=${msgObj.class}>
    <td>${new Date().toGMTString()} - ${msgObj.msg} ${JSON.stringify(emp)}</td>
    <td class="delete-button-wrapper"><button class="delete-button" value="${emp.EmpNo}">X</button></td>
</tr>`
}

function removeLog(msgId) {
    document.getElementById(msgId).remove
}