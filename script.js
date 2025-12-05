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
  document.getElementById('mainScreen').style.display = 'none';
  document.getElementById(id).style.display = 'block';

  // markeer bol als gekozen (blauw)
  if (element) {
    element.classList.add('gekozen');
  }

  // start achtergrond en skeletintro
  const skeletVideo = document.querySelector(`#${id} .skeletVideo`);
  skeletVideo.play();
}

function speelSkelet(videoSrc, schilderijId) {
  const skeletVideo = document.querySelector(`#${schilderijId} .skeletVideo`);
  skeletVideo.src = videoSrc;
  skeletVideo.play();
}

function gaTerug(id) {
  document.getElementById(id).style.display = 'none';
  document.getElementById('mainScreen').style.display = 'block';
}


