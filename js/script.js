var working = document.querySelector('.Time-working')
var breaking = document.querySelector('.Time-break')
var min = document.querySelector('.min')
var sec = document.querySelector('.sec')
var icon = document.getElementById('icon')
var btn = document.querySelector('.txtstart')
var buttonUp = document.querySelector('.btnup')
var txtTitle = document.getElementById('txt-title')
var audio = document.getElementById("myVideo")


var Time = { min: 25, sec: 0, turn: true }
var break1 = 5
var timeStart = null

working.innerHTML = `${Time.min} min`
breaking.innerHTML = `${break1} min`
min.innerHTML = `${Time.min}:`
sec.innerHTML = `0${Time.sec}`

function startTime() {
    if (timeStart === null) {
        timeStart = setInterval(updateTime, 1000)
        btn.innerHTML = 'Pause'
        icon.setAttribute("class", "fa fa-pause")
    } else {
        btn.innerHTML = 'Start'
        icon.setAttribute("class", "fa fa-play")
        clearInterval(timeStart)
        timeStart = null
    }
}
function updateTime() {
    if (Time.min === 0 && Time.sec === 0) {
        if (Time.turn === true) {
            Time.turn = false
            Time.min = Number(`${breaking.innerHTML.charAt(0)}${breaking.innerHTML.charAt(1)}`)
            audio.play()

        } else {
            Time.turn = true
            Time.min = Number(`${working.innerHTML.charAt(0)}${working.innerHTML.charAt(1)}`)
            Time.sec = 0
            audio.play()
        }
    } else {
        if (Time.min >= 0) {
            Time.sec === 0 ? Time.min-- : Time.min
            Time.sec === 0 ? Time.sec = 60 : Time.sec
            Time.sec--
            if (Time.turn === true) {
                txtTitle.innerHTML = "Session"
            } else {
                txtTitle.innerHTML = "Break"
            }
        }
    }
    console.log("WorkTime:", Time)
    formatTime()
}

function formatTime() {
    min.innerHTML = `${Time.min}:`
    sec.innerHTML = Time.sec
    if (Time.min < 1) {
        min.style.color = "rgb(250, 34, 34)"
        sec.style.color = "rgb(250, 34, 34)"
    } else {
        min.style.color = "white"
        sec.style.color = "white"
    }
    Time.sec < 10 ? sec.innerHTML = "0" + Time.sec : Time.sec
    Time.min < 10 ? min.innerHTML = "0" + Time.min + ":" : Time.min
}


/* Btn */
function btnup(className) {
    if (timeStart === null) {
        if (className === "Time-break") {
            break1 < 60 ? break1++ : break1
        } else if (className === "Time-working") {
            Time.min < 60 ? Time.min++ : Time.min
        }
        breaking.innerHTML = `${break1} min`
        working.innerHTML = `${Time.min} min`
        formatTime()
    }
}
function btndown(className) {
    if (timeStart === null) {
        if (className === "Time-break") {
            break1 <= 1 ? break1 : break1--
        } else if (className === "Time-working") {
            Time.min <= 1 ? Time.min : Time.min--
        }
        breaking.innerHTML = `${break1} min`
        working.innerHTML = `${Time.min} min`
        formatTime()
    }
}

function resetbtn() {
    clearInterval(timeStart)
    timeStart = null
    Time.min = 25
    Time.sec = 0
    break1 = 5
    formatTime()
    breaking.innerHTML = `${break1} min`
    working.innerHTML = `${Time.min} min`
    txtTitle.innerHTML = "Session"
    btn.innerHTML = 'Start'
    icon.setAttribute("class", "fa fa-play")
}