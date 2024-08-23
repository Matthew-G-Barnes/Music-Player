const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const audioElement =document.querySelector('audio')

const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/jacinto Design'
    }
]

// Check if Playing
let isPlaying = false

// Play
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    audioElement.play()
}

// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    audioElement.pause()
}

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    audioElement.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0
let index = songIndex

let duration
let currentTime

function updateTimeValues() {
    duration = audioElement.duration
    currentTime = audioElement.currentTime
}

// change Song
function changeSong(toNextSong) {
    toNextSong ? songIndex++ : songIndex--
    index = (songIndex) % songs.length
    if (index < 0) {index = (songs.length - 1)}
    loadSong(songs[index])
    playSong()
}

function updateTimes(isDuration) {
    const time = isDuration ? duration : currentTime
    const timeEl = isDuration ? durationEl : currentTimeEl
    const Minutes = Math.floor(time / 60)
    const Seconds = Math.floor(time % 60).toString().padStart(2, '0')
    if (time) {
        timeEl.textContent = `${Minutes}:${Seconds}`
    } else {
        timeEl.textContent = `0:00`
    }
}

function updateProgressBar(e) {
        updateTimeValues()
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        // Calaculatre display for duration
        updateTimes(true)
        // Calaculatre display for current
        updateTimes(false)
}

// Set Progress Bar
function setProgressBar(e) {
    const maxWidth = this.clientWidth
    const clickWidth = e.offsetX
    const {duration} = audioElement
    audioElement.currentTime = (clickWidth / maxWidth) * duration
}

// On Load - Select First Song
loadSong(songs[songIndex])

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

prevBtn.addEventListener('click', () => (changeSong(false)))
nextBtn.addEventListener('click', () => (changeSong(true)))
audioElement.addEventListener('ended', () => (changeSong(true)))

audioElement.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)