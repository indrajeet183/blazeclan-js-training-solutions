window.onload = function () {
    document.getElementById('format-date').addEventListener('click', function () {
        var inputStr = document.getElementById('date-input').value
        var inputArr = inputStr.split("-")
        var resultStr = ""
        if (inputArr.length < 3) {
            resultStr = 'Invalid Date Given, Please give the format of DD-MM-YYY'
        } else {
            if (inputArr[0] > 31 || inputArr[1] > 11) {
                resultStr = 'Invalid Date or Month Given'
            } else {
                var inputDate = new Date(inputArr[2], inputArr[1] - 1, inputArr[0])
                resultStr = `${getWeekDay(inputDate.getDay())}, ${inputDate.getDate()}${getSuffix(inputDate.getDate())} ${getMonthName(inputDate.getMonth())}, ${inputDate.getFullYear()}`
            }
        }
        document.getElementById('format-result').innerHTML = `${resultStr}`
    })

    function getWeekDay(day) {
        var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday']
        return weekDays[day]
    }

    function getSuffix(date) {
        var unitPlace = date % 10
        if (date > 10 && date < 21) {
            return "th"
        } else {
            if (unitPlace === 1) return "st"
            if (unitPlace === 2) return "nd"
            if (unitPlace === 3) return "rd"
            if (unitPlace > 3) return "th"
        }
    }

    function getMonthName(month) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return months[month]
    }
}

/**
        const datesrc = new Date('7/13/2010');
        const datetgt = new Date('12/15/2010');
        const diffTime = Math.abs(datesrc - datetgt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");
 */