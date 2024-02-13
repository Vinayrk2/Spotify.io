console.log("lets play song . . .");

let div = document.createElement('div');
let songlist = div.getElementsByTagName('a');
let songtitle = document.querySelector("#songtitle");
let table = document.querySelector('table');

let song = [];
let singers = ["neesarg ass", "pro popli", "vinyo rock", "chapri gangstar", "spl dhulo", "bhakt rudra", "sir nirmal"];

// this function is fatch the song from the API and create the song array
const fatchsong = async () => {

    let a = await fetch("https://github.com/NIRMAL-PRAJAPATI/spotify-clone/tree/main/songs",
    {
        mode:  'no-cors',
        method: 'GET',
        credentials: 'same-origin'
    });
    let response = await a.text();

    div.innerHTML = response;

    for (let i = 0; i < songlist.length; i++) {
        const ele = songlist[i];

        if (ele.href.endsWith("mp3")) {
            song.push(ele.href);
        }
    }
    return song;
}

const songadder = async () => {
    let tbody = document.querySelector('#tbody');

    let songs = await fatchsong();

    for (let i = 3; i < songlist.length; i++) {

        // this is set the html contant in song details table
        tbody.innerHTML = tbody.innerHTML + `<tr data-href="${songlist[i].href}" title="${songlist[i].title}">
    <td>${i - 2}</td>
    <td><div class="sandcname"><img style="margin-right: 10px;" src="img/play song icon.png" height="45">
            <div>
            <h4 id="songtitle" class="color">${(songlist[i].innerText).split(".mp3")[0]}</h4>
            <p>By Sponzeall</p>
            </div>
        </div></td>
        <td>${singers[i - 3]}</td>
    <td id="songreleasedate">${songlist[i].lastElementChild.innerHTML}</td>
    <td id="songduration">2:54</td>
</tr>`;
    }
}

// this function gives minute and second formate for song timer
let secondandminutetimer = (seconds) => {
    let minute = Math.floor(seconds / 60);
    let second = Math.floor(seconds % 60);

    const formattedsecond = String(second).padStart(2, "0");
    const formattedminute = String(minute).padStart(2, "0");

    return `${formattedminute}:${formattedsecond}`;
}

// this is the main function which runs first wehen script is called
let main = async () => {
    let currentsongimg = document.querySelector('#currentsongimg');
    let currentsongname = document.querySelector('#currentsongname');
    let currentsongsinger = document.querySelector('#currentsongsinger');
    let mainplaybar = document.querySelector('#playbar');
    let previous = document.querySelector("#sprevious");
    let play = document.querySelector("#splay");
    let next = document.querySelector("#snext");
    let currenttime = document.querySelector("#currenttime");
    let totaltime = document.querySelector("#totaltime");
    let seekbar = document.querySelector('#seekbar');
    let seekcircle = document.querySelector('#songcircle');
    let currentsong = new Audio();

    let songs = await fatchsong();

    await songadder();

    $('.playsongnavicon').click(function () {
        leftbox.style.position = "absolute";
        leftbox.style.left = "0vw";
        leftbox.style.width = "100vw";
        leftbox.style.transition = "0.5s";
    })

    // this event is used to take current song from data and set the current song's data
    $("#tbody tr").click(function (e) {

        audio = new Audio((e.currentTarget).dataset["href"]);

        audio.addEventListener("loadeddata", () => {
            currentsong.src = (e.currentTarget).dataset["href"];
            currentsong.play();
        });

        currentsongimg.src = "img/music wave.gif";
        currentsongname.innerHTML = e.currentTarget.title.split(".mp3")[0];
        currentsongsinger.innerHTML = singers[1];
        mainplaybar.style.opacity = "1";
        mainplaybar.style.zindex = "2"
    })

    // this event is used to plat and pause the song also change the UI img
    $(play).click(function () {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "img/pause.png";
        }

        else if (currentsong.play) {
            currentsong.pause();
            play.src = "img/splay.png";
        }
    })

    // this is used to set the time and roll the seekbar's circle
    currentsong.addEventListener("timeupdate", () => {

        currenttime.innerHTML = secondandminutetimer(currentsong.currentTime);
        totaltime.innerHTML = secondandminutetimer(currentsong.duration);

        seekcircle.style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

        if (currentsong.currentTime == currentsong.duration) {
            let index = songs.indexOf(currentsong.src);

            if (index != song.length) {
                let prevsong = index + 1;
                currentsong.src = songs[prevsong];
                currentsongname.innerHTML = songs[prevsong].split("songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
                currentsongsinger.innerHTML = singers[1];
                currentsong.play();
            }
        }
    })

    // this is for set seekbar on the click
    seekbar.addEventListener("click", (e) => {
        let seekcirclecontroler = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        seekbar.style.backgroundcolor = "green";
        seekcircle.style.left = seekcirclecontroler + "%";
        currentsong.currentTime = ((currentsong.duration) * seekcirclecontroler) / 100;
    })

    // this is previous song button functionality
    $(previous).click(function () {
        let index = songs.indexOf(currentsong.src);

        if (index != 0) {
            let prevsong = index - 1;
            currentsong.src = songs[prevsong];
            currentsongname.innerHTML = songs[prevsong].split("songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
            currentsongsinger.innerHTML = singers[1];
            currentsong.play();
        }
    })

    // this is next song button functionality
    $(next).click(function () {
        let index = songs.indexOf(currentsong.src);

        if (index != song.length) {
            let prevsong = index + 1;
            currentsong.src = songs[prevsong];
            currentsongname.innerHTML = songs[prevsong].split("songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
            currentsongsinger.innerHTML = singers[1];
            currentsong.play();
        }
    })
}
