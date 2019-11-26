const breakTime = document.querySelector('.break-time')

const inSession = document.querySelector('.session > h3')
const onBreak = document.querySelector('.break > h3')

const sessionCount = document.querySelector('.session-count')
const breaakCount = document.querySelector('.break-count')

const clockTimer = document.querySelector('.timer')

const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const refresh = document.querySelector('.refresh')
const stop = document.querySelector('.stop')

const increaseSession = document.querySelector('.session-up')
const reduceSession = document.querySelector('.session-down')
const increaseBreak = document.querySelector('.break-up')
const reduceBreak = document.querySelector('.break-down')

let countDown;
let min;
let sec;
let isRunning = false
let isOnBreak = false
let seconds = sessionCount.textContent * 60;
clockTimer.textContent = `${sessionCount.textContent}:00`

function increase() {
 let minutes = sessionCount.textContent
 minutes++
 const display = `${minutes < 10 ? '0' : ''}${minutes}`
 sessionCount.textContent = `${display}`
 seconds = minutes * 60

 if (!isOnBreak) clockTimer.textContent = `${display}:00` 
}

function reduce() {
 let minutes = sessionCount.textContent
 if (minutes == 1) return
 minutes--
 const display = `${minutes < 10 ? '0' : ''}${minutes}`
 sessionCount.textContent = `${display}`
 seconds = minutes * 60

 if (!isOnBreak) clockTimer.textContent = `${display}:00` 
}

function breakIncrease() {
 let minutes = breaakCount.textContent
 minutes++
 const display = `${minutes < 10 ? '0' : ''}${minutes}`
 breaakCount.textContent = `${display}`
 if (isOnBreak) clockTimer.textContent = `${display}:00` 
}

function breakReduce() {
 let minutes = breaakCount.textContent
 if (minutes == 1) return
 minutes--
 const display = `${minutes < 10 ? '0' : ''}${minutes}`
 breaakCount.textContent = `${display}`
 if (isOnBreak) clockTimer.textContent = `${display}:00` 
}

function startTimer() {
 increaseSession.removeEventListener('click', increase)
 reduceSession.removeEventListener('click', reduce)
 increaseBreak.removeEventListener('click', breakIncrease)
 reduceBreak.removeEventListener('click', breakReduce)
 play.removeEventListener('click', startTimer)

 if (isOnBreak) {
  startBreak()
  return
 }
 inSession.style.color = '#225216' 
 isRunning = true

 const now  = Date.now()
 const then = now + seconds * 1000

 countDown = setInterval(() => {
  const secondsLeft = Math.round((then - Date.now()) / 1000)

  if (secondsLeft <= 0) {
   inSession.style.color = '#fff' 
   clearInterval(countDown)
   let minutes = breaakCount.textContent
   seconds = minutes * 60
   breakTime.play()
   startBreak()
  }
  displayTimeLeft(secondsLeft)
 }, 1000);
}

function pauseTimer() {
 if (!isRunning) return
 play.addEventListener('click', startTimer)
 clearInterval(countDown)
 seconds = min * 60 + sec
 console.log(seconds)
}

function stopTimer() {
 play.addEventListener('click', startTimer)
 increaseSession.addEventListener('click', increase)
 reduceSession.addEventListener('click', reduce)
 increaseBreak.addEventListener('click', breakIncrease)
 reduceBreak.addEventListener('click', breakReduce)

 clearInterval(countDown)
 min = sessionCount.textContent
 sec = 0
 seconds = min * 60

 if (isOnBreak) {
  min = breaakCount.textContent
  sec = 0
  seconds = min * 60 
  clockTimer.textContent = `${breaakCount.textContent}:00`
  breakTime.play()
  return
 }

 clockTimer.textContent = `${sessionCount.textContent}:00`
}

function resetTimer() {
 play.addEventListener('click', startTimer)
 increaseSession.addEventListener('click', increase)
 reduceSession.addEventListener('click', reduce)
 increaseBreak.addEventListener('click', breakIncrease)
 reduceBreak.addEventListener('click', breakReduce)

 breaakCount.textContent = 05
 sessionCount.textContent = 25
 clearInterval(countDown)
 seconds = sessionCount.textContent * 60
 clockTimer.textContent = `${sessionCount.textContent}:00`
 onBreak.style.color = '#fff' 
 inSession.style.color = '#fff' 
}

function startBreak() {
 isOnBreak = true
 onBreak.style.color = '#225216' 

 const now  = Date.now()
 const then = now + seconds * 1000

 countDown = setInterval(() => {
  const secondsLeft = Math.round((then - Date.now()) / 1000)

  if (secondsLeft <= 0) {
   isOnBreak = false
   onBreak.style.color = '#fff' 
   clearInterval(countDown)
   let minutes = sessionCount.textContent
   seconds = minutes * 60
   startTimer()
  }
  displayTimeLeft(secondsLeft)
 }, 1000);

}

function displayTimeLeft(seconds) {
 min = Math.floor(seconds / 60)
 sec = seconds % 60
 const display = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`

 clockTimer.textContent = display
}

increaseSession.addEventListener('click', increase)
reduceSession.addEventListener('click', reduce)
increaseBreak.addEventListener('click', breakIncrease)
reduceBreak.addEventListener('click', breakReduce)

play.addEventListener('click', startTimer)
pause.addEventListener('click', pauseTimer)
stop.addEventListener('click', stopTimer)
refresh.addEventListener('click', resetTimer)
