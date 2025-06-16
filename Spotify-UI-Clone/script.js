console.log("Lets write Javascript!!🧡")
let currentSong = new Audio();
let songs;
let currfolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${currfolder}/`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${currfolder}/`)[1])
        }
    }

    let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML += `<li><img class="invert" src="assets/img/music.svg" alt="Music">
                                <div class="info">
                                    <div>${song.replaceAll("%20", " ")}</div>
                                    <div>Harry</div>
                                </div>
                                <div class="play-now flex ">
                                    <span>Play now</span>
                                    <img class="invert" src="assets/img/play.svg" alt="">
                                </div></li>`
    }
    Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })

}

const playMusic = (track, pause = false) => {
    currentSong.src = `/${currfolder}/` + track;
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardcontainer = document.querySelector(".cardcontainer")

    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]

            // Get the metadata of the folder
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let response = await a.json();
            cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="${folder}" class="card">
                            <div class="play-button">
                                <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="35,30 70,50 35,70" fill="black" />
                                </svg>
                            </div>
                            <img src="/songs/${folder}/cover.jpg" alt="Jhol">
                            <h2>${response.title}</h2>
                            <p>${response.description}</p>
                            
                        </div>`

        }
    }
    // Load the playlist whenever card is clicked 
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {

            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)

        })
    })

}


async function main() {
    await getsongs("songs/cs")
    playMusic(songs[0], true)

    //display all the albumson the page
    displayAlbums()

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"

        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })
    // Listen for timeupdate event

    currentSong.addEventListener("timeupdate", () => {

        document.querySelector(".song-time").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    // add an event listener to seekbar
    document.querySelector(".seek-bar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // add an event listener to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".side-bar").style.left = "0"
    })

    // add an event listener to close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".side-bar").style.left = "-110%"
    })
    // add an event listener to previous 
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })
    // add an event listener to next 
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    // add an event listener to range

    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100
    }
    )

    // add an event listener to volume button
    document.querySelector(".volume>img").addEventListener("click", e => {
        console.log(e.target)
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg") 
            currentSong.volume = 0;
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg") 
            currentSong.volume = .30;
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 30;


        }
    })
}
main()  