window.onload = function () {
    document.getElementById('show-diff').addEventListener('click', function () {
        var date1Input = document.getElementById('date1').value
        var date2Input = document.getElementById('date2').value

        var tempDate1Arr = date1Input.split(",")
        var tempDate2Arr = date2Input.split(",")
        var res = ""

        if (tempDate1Arr.length < 4 || tempDate2Arr.length < 4) {
            res = `Invalid date inputed.`
        } else {
            var date1TimeArr = tempDate1Arr[3].split(":")
            var date2TimeArr = tempDate2Arr[3].split(":")
            var date1 = new Date(tempDate1Arr[0], tempDate1Arr[1], tempDate1Arr[2], date1TimeArr[0], date1TimeArr[1], date1TimeArr[2])
            var date2 = new Date(tempDate2Arr[0], tempDate2Arr[1], tempDate2Arr[2], date2TimeArr[0], date2TimeArr[1], date2TimeArr[2])

            var totalTimeSeconds = (date2.getTime() - date1.getTime()) / 1000
            // console.log(date1.getTime())
            // console.log(date2.getTime())
            console.log(totalTimeSeconds)
            var totalMinutes = (totalTimeSeconds / 60) % 60
            console.log(totalMinutes)
            var totalHours = (totalTimeSeconds / 3600) % 24
            console.log(totalHours)
            var seconds = Math.round((totalMinutes % 1) * 60)
            console.log(seconds)
            var minutes = parseInt(totalMinutes)
            console.log(minutes)
            var hours = Math.round(totalHours)
            console.log(hours)

            var totalDateSeconds = date2 - date1
            console.log(totalDateSeconds)
            var days = (totalDateSeconds / 86400000) > 1 ? Math.round((totalDateSeconds / 86400000)) : 0
            console.log(days)
            // console.log(new Date(date2.getFullYear(),date2.getMonth()+1,0))
            //days = days - new Date(date2.getFullYear(),date2.getMonth()+1,0).getDate()
            //var months = (totalDateSeconds/5184000000)>1?Math.round((totalDateSeconds/5184000000)):0
            months = (date2.getMonth() - date1.getMonth()) < 0 ? (date2.getMonth() - date1.getMonth()) + 12 : (date2.getMonth() - date1.getMonth())

            if (date1.getDate() > date2.getDate()) {
                var numOfDaysInMonth = new Date(date1.getFullYear(), date1.getMonth(), 0).getDate()
                days = (numOfDaysInMonth - date1.getDate()) + date2.getDate()
            } else {
                days = date2.getDate() - date1.getDate()
            }


            var years = (totalDateSeconds / 31536000000) > 1 ? Math.round((totalDateSeconds / 31536000000)) : 0

            document.getElementById('seconds-result').innerHTML = `<span>${seconds}</span>`
            document.getElementById('minutes-result').innerHTML = `<span>${minutes}</span>`
            document.getElementById('hours-result').innerHTML = `<span>${hours}</span>`
            document.getElementById('days-result').innerHTML = `<span>${days}</span>`
            document.getElementById('months-result').innerHTML = `<span>${months}</span>`
            document.getElementById('years-result').innerHTML = `<span>${years}</span>`

            var resultStr = ""

            resultStr += years > 0 ? `${years} Years ` : ""
            resultStr += months > 0 ? `${months} Months ` : ""
            resultStr += days > 0 ? `${days} Days ` : ""
            resultStr += hours > 0 ? `${hours} Hours ` : ""
            resultStr += minutes > 0 ? `${minutes} Minutes ` : ""
            resultStr += seconds > 0 ? `${seconds} Seconds ` : ""

            document.getElementById('result-string').innerHTML = `<span>${resultStr}</span>`

            // console.log(seconds)
            // console.log(minutes)
            // console.log(hours)
            //console.log(days)
        }
    })

    function isLeap(year) {
        return new Date(year, 1, 29).getDate() === 29;
    }
}

//1980,00,01,01:30:20