window.onload = function () {
    document.getElementById('sort').addEventListener('click', function () {
        var inputStr = document.getElementById('array-input').value
        var inputArr = []
        inputStr.split(",").forEach(function(word){
            inputArr.push(word)
        });

        inputArr.sort(function(first,second){
            return first.length - second.length
        })
        document.getElementById('sort-result').innerHTML = `<span>${inputArr.join(", ")}</span>`
    })    
}