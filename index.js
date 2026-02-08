// i am vibe coder 77

function fuckcapitalize(word) {
    const ilovemachinegirl = []
    const dick = word.length
    const death = 1 << (dick - 1)
    for (let i = 0; i < death; i++) {
        let die = word[0].toUpperCase()
        for (let j = 1; j < dick; j++) {
            if (i & (1 << (j - 1))) {
                die += word[j].toUpperCase()
            } else {
                die += word[j].toLowerCase()
            }
        }
        ilovemachinegirl.push(die)
    }
    return ilovemachinegirl
}

const mywife = fuckcapitalize("maquena");

function fuckamize(array) {
    for (let i = array.dick - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
}

fuckamize(mywife)

let currentIndex = 0

function action() {
    document.title = mywife[currentIndex]
    currentIndex = (currentIndex + 1) % mywife.length

    if (currentIndex === 0) {
        fuckamize(mywife)
    }
}

setInterval(action, 25);

function removeOverlay() {
    const overlay = document.getElementById('fuckgunslol')
    const body = document.body

    if (overlay) {
        overlay.classList.add('hidden')
        body.classList.remove('loading')

        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay)
            }
        }, 500)
    }
}

document.addEventListener('click', function removeOverlayOnClick(event) {
    const overlay = document.getElementById('fuckgunslol')
    if (overlay && (event.target === overlay || overlay.contains(event.target))) {
        removeOverlay()
        document.removeEventListener('click', removeOverlayOnClick)
        audio2.play();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loading');

    const gmailBtn = document.querySelector('.gmail')

    if (gmailBtn) {
        gmailBtn.addEventListener('click', function (event) {
            event.preventDefault()
            event.stopPropagation()
            const text = this.dataset.copy
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text)
                    .then(() => {
                        showFeedback(this)
                    })
            }
        })
    }

    function showFeedback(button) {
        const originalLabel = button.dataset.label
        button.dataset.label = "Copied"
        button.classList.add('copied')
        button.style.transform = 'scale(1.3)'
        setTimeout(() => {
            button.dataset.label = originalLabel
            button.classList.remove('copied')
            button.style.transform = ''
        }, 1500)
    }
});


let songs = [];
const audio2 = document.createElement("audio");
let currentSongIndex = 0;

const AlbumCover = document.getElementById("cover2");
const Title = document.getElementById("title2");
const Album = document.getElementById("album2");
const Slider = document.getElementById("slider2");
const Backward = document.getElementById("backward2");
const Play = document.getElementById("play2");
const Foward = document.getElementById("foward2");
const Volume = document.getElementById("volume2");
const VSlider = document.getElementById("vslider2");
const CurrentTime = document.getElementById("current-time");
const Duration = document.getElementById("duration");

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateSong(AlbumCover, Title, Album) {
    const song = songs[currentSongIndex];
    AlbumCover.src = song.image;
    Title.innerText = song.name;
    Album.innerText = song.album ? `Album: ${song.album}` : '';
    audio2.src = song.audio2;
    document.getElementById('bandcamp-link').href = song.bandcamp;
    document.getElementById('soundcloud-link').href = song.soundcloud;
    document.getElementById('youtube-link').href = song.youtube;
}

function togglePlayPause() {
    if (!audio2.paused) {
        audio2.pause();
        play2.src = "Play.png";
    } else {
        audio2.play();
        play2.src = "Pause.png";
    }
}

function moveSlider() {
    Slider.value = audio2.currentTime;
    CurrentTime.textContent = formatTime(audio2.currentTime);
    if (!isNaN(audio2.duration)) {
        Duration.textContent = formatTime(audio2.duration);
    }
}

fetch('music.json')
    .then(response => response.json())
    .then(data => {
        songs = data;
        updateSong(AlbumCover, Title, Album);

        Foward.addEventListener("click", function () {
            if (currentSongIndex == songs.length - 1) {
                return;
            }
            const wasPlaying = !audio2.paused;
            currentSongIndex++;
            updateSong(AlbumCover, Title, Album);
            if (wasPlaying) {
                audio2.play();
                play2.src = "Pause.png";
            }
        });

        Backward.addEventListener("click", function () {
            if (currentSongIndex == 0) {
                return;
            }
            currentSongIndex--;
            updateSong(AlbumCover, Title, Album);
        });

        Play.addEventListener("click", togglePlayPause);

        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                togglePlayPause();
            }
        });

        Volume.addEventListener("click", function() {
            if (audio2.volume == 0) {
                audio2.volume = VSlider.value / 100;
                volume2.src = "Volume.png";
            } else {
                audio2.volume = 0;
                volume2.src = "Mute.png";
            }
        });

        audio2.onloadedmetadata = function() {
            Slider.value = 0;
            Slider.max = audio2.duration;
            VSlider.value = 100;
            Duration.textContent = formatTime(audio2.duration);
            CurrentTime.textContent = formatTime(0);
        };

        Slider.addEventListener("input", function() {
            audio2.currentTime = Slider.value;
        });

        VSlider.addEventListener("input", function() {
            audio2.volume = VSlider.value / 100;
            if (audio2.volume == 0) {
                volume2.src = "Mute.png"
            }
            else {
                volume2.src = "Volume.png"
            }
        });

        setInterval(moveSlider, 10);
    });