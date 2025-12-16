// Intro starten
function startIntro() {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('introScreen').style.display = 'block';

  const introVideo = document.getElementById('introVideo');
  introVideo.currentTime = 0;
  introVideo.play();
}

// Intro overslaan
function skipIntro() {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('mainScreen').style.display = 'block';

  const introVideo = document.getElementById('introVideo');
  introVideo.pause();
  introVideo.currentTime = 0;
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

  // reset enkel de bloem
  resetBloem();
}

// Audio afspelen (nooit twee tegelijk)
function speelAudio(audioId) {
  // stop alle audio-elementen
  const allAudios = document.querySelectorAll("audio");
  allAudios.forEach(a => {
    a.pause();
    a.currentTime = 0;
  });

  // speel gekozen fragment
  const audio = document.getElementById(audioId);
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