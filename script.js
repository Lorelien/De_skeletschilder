// Intro starten
function startIntro() {
  const start = document.getElementById('startScreen');
  const intro = document.getElementById('introScreen');
  const main = document.getElementById('mainScreen');
  const video = document.getElementById('introVideo');

  // Startscherm verbergen, intro tonen
  start.style.display = 'none';
  intro.style.display = 'block';
  main.style.display = 'none';

  // Zet video veilig op muted zodat browsers hem afspelen
  video.muted = false;
  video.playsInline = true;
  video.currentTime = 0;
  video.play().catch(err => {
    console.warn("Introvideo kon niet starten:", err);
  });

  // Zodra de video eindigt → automatisch naar mainscreen
  video.onended = function () {
    intro.style.display = 'none';
    main.style.display = 'block';
  };
}

// Schilderij openen
function openSchilderij(id, element) {
  document.getElementById('mainScreen').style.display = 'none';
  document.getElementById(id).style.display = 'block';

  // markeer bol als gekozen
  element.classList.add("gekozen");

  // start achtergrondvideo
  const videos = document.querySelectorAll(`#${id} .achtergrondVideo`);
  videos.forEach(video => {
    video.currentTime = 0;
    video.play();
  });
}

// Schilderij sluiten
function gaTerug(id) {
  document.getElementById(id).style.display = 'none';
  document.getElementById('mainScreen').style.display = 'block';

  // stop video's
  const videos = document.querySelectorAll(`#${id} .achtergrondVideo, #${id} .skeletVideo`);
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });

  // stop audio
  const audios = document.querySelectorAll(`#${id} audio`);
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  checkAllChosen(); // ✅ controle na keuze

  // reset enkel de bloem
  resetBloem();
}

// Audio afspelen (nooit twee tegelijk, en niet opnieuw starten bij herhaald klikken)
function speelAudio(audioId) {
  const audio = document.getElementById(audioId);

  // Als dit fragment al speelt → doe niets
  if (audio && !audio.paused && !audio.ended) {
    return;
  }

  // Stop alle andere audio-elementen
  const allAudios = document.querySelectorAll("audio");
  allAudios.forEach(a => {
    if (a !== audio) {
      a.pause();
      a.currentTime = 0;
    }
  });

  // Speel gekozen fragment
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// Overlay uitleg openen
function toonUitleg(src, audioId, element) {
  const overlay = document.getElementById("overlay");
  const video = document.getElementById("video");
  overlay.style.display = "block";
  video.src = src;
  video.currentTime = 0;
  video.play();

  // markeer ster als gekozen
  element.classList.add("gekozen");

  // optioneel audio bij uitleg
  if (audioId) {
    speelAudio(audioId);
  }
}

// Overlay sluiten
function sluitOverlay() {
  const overlay = document.getElementById("overlay");
  const video = document.getElementById("video");
  overlay.style.display = "none";
  video.pause();
  video.currentTime = 0;

  // stop eventueel audio
  const audios = document.querySelectorAll("#overlay audio");
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  checkAllChosen(); // ✅ controle na keuze
}

// Bloem laten vallen bij klik
function laatBloemVallen() {
  const bloem = document.getElementById('bloem');
  if (bloem) {
    bloem.classList.add("fallen"); // activeer de val-animatie
  }
}

// Resetfunctie voor bloem
function resetBloem() {
  const bloem = document.getElementById('bloem');
  if (bloem) {
    bloem.style.animation = "none";
    bloem.offsetHeight; // force reflow
    bloem.style.animation = "";
  }
}

function checkAllChosen() {
  const allInteractive = document.querySelectorAll('.bol, .ster');
  const allChosen = Array.from(allInteractive).every(el => el.classList.contains('gekozen'));

  if (allChosen) {
    // toon bedankscherm
    document.getElementById('mainScreen').style.display = 'none';
    document.querySelectorAll('.schilderijScreen').forEach(s => s.style.display = 'none');
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('thankYouScreen').style.display = 'block';

    // na enkele seconden terug naar startscherm
    setTimeout(() => {
      document.getElementById('thankYouScreen').style.display = 'none';
      document.getElementById('startScreen').style.display = 'flex';

      // reset alle bollen en ster voor volgende bezoeker
      document.querySelectorAll('.bol, .ster').forEach(el => {
        el.classList.remove('gekozen');
      });
    }, 5000); // 5 seconden tonen
  }
}