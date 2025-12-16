function startIntro() {
  // Verberg startscherm, toon intro
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('introScreen').style.display = 'block';

  // Start video en audio tegelijk
  const video = document.getElementById('introVideo');

  video.play();

  // Wanneer video klaar is, ga naar volgende scherm
  video.onended = () => {
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'block';

    // Eventueel extra audio of prompt hier
    skeletPrompt.play();
  };
}


function toonUitleg(videoSrc, audioSrc, element) {
  const overlay = document.getElementById('overlay');
  const video = document.getElementById('video');

  // Zet de juiste bestanden
  video.src = videoSrc;

  // Toon overlay en start afspelen
  overlay.style.display = 'flex';
  video.play();

  // Markeer de aangeklikte bol/ster als gekozen
  if (element) {
    element.classList.add('gekozen');
  }

  // Als video klaar is, sluit overlay en keer terug naar main screen
  video.onended = () => {
    sluitOverlay();
  };
}

function sluitOverlay() {
  const overlay = document.getElementById('overlay');
  const video = document.getElementById('video');
  const audio = document.getElementById('audio');

  // Stop en reset media
  video.pause();
  video.src = '';

  // Verberg overlay
  overlay.style.display = 'none';

  // Terug naar main screen met bollen (deze blijft meestal al zichtbaar)
  document.getElementById('mainScreen').style.display = 'block';
}

function openSchilderij(id) {
  // mainscreen verbergen
  document.getElementById('mainScreen').style.display = 'none';
  // schilderij tonen
  document.getElementById(id).style.display = 'block';

  // start alle achtergrondvideo's in dit schilderij
  const videos = document.querySelectorAll(`#${id} .achtergrondVideo`);
  videos.forEach(video => {
    video.currentTime = 0; // begin vanaf start
    video.play();
  });
}

function speelSkelet(videoSrc, schilderijId) {
  const skeletVideo = document.querySelector(`#${schilderijId} .skeletVideo`);
  skeletVideo.src = videoSrc;
  skeletVideo.play();
}

function gaTerug(id) {
  // schilderij verbergen
  document.getElementById(id).style.display = 'none';
  // mainscreen tonen
  document.getElementById('mainScreen').style.display = 'block';

  // stop alle video's in dit schilderij
  const videos = document.querySelectorAll(`#${id} .achtergrondVideo, #${id} .skeletVideo`);
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0; // terug naar start
  });

  // stop alle audiofragmenten in dit schilderij
  const audios = document.querySelectorAll(`#${id} audio`);
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  // reset bloem (als die bestaat in dit schilderij)
  const bloem = document.getElementById('bloem');
  if (bloem) {
    bloem.classList.remove('fallen');              // verwijder val-animatie
    bloem.style.top = "48%";                       // terug naar startpositie
    bloem.style.transform = "rotate(0deg)";        // rechtop zetten
    bloem.style.animation = "sway 3s ease-in-out infinite"; // wiebel opnieuw starten
  }
}

function speelAudio(audioId) {
  // stop alle audio-elementen op de pagina
  const allAudios = document.querySelectorAll("audio");
  allAudios.forEach(a => {
    a.pause();
    a.currentTime = 0;
  });

  // speel het gekozen fragment
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// automatisch naar main screen na intro
document.getElementById('introVideo').addEventListener('ended', () => {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('mainScreen').style.display = 'block';
});

// skip-knop
function skipIntro() {
  const introVideo = document.getElementById('introVideo');
  introVideo.pause(); // stop de video
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('mainScreen').style.display = 'block';
}

function laatBloemVallen() {
  const bloem = document.getElementById('bloem');
  bloem.classList.add('fallen');
}