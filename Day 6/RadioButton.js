function RadioButtonGroup(data, name) {
    if (data === undefined) {
        return "<div>Invalid Data </div>"
    }

    if (data.length > 0) {
        var radioButtons = ""
        for (var i = 0; i < data.length; i++) {
            radioButtons += '<input type="radio" id="' + data[i].toLowerCase() + '" name="' + name + '" value="' + data[i] + '">'
            radioButtons += '<label for="male">' + data[i] + '</label>'
        }
        //console.log(radioButtons)
        return radioButtons;
    } else {
        return "<div>No Records found </div>"
    }
}