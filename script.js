function startIntro() {
  // Verberg startscherm, toon intro
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('introScreen').style.display = 'block';

  // Start video en audio tegelijk
  const video = document.getElementById('introVideo');
  const audio = document.getElementById('introAudio');

  video.play();
  audio.play();

  // Wanneer video klaar is, ga naar volgende scherm
  video.onended = () => {
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'block';

    // Eventueel extra audio of prompt hier
    skeletPrompt.play();
  };
}


function toonUitleg(videoSrc, audioSrc) {
  const overlay = document.getElementById('overlay');
  const video = document.getElementById('video');
  const audio = document.getElementById('audio');

  // Zet de juiste bestanden
  video.src = videoSrc;
  audio.src = audioSrc;

  // Toon overlay en start afspelen
  overlay.style.display = 'flex';
  video.play();
  audio.play();

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
  audio.pause();
  video.src = '';
  audio.src = '';

  // Verberg overlay
  overlay.style.display = 'none';

  // Terug naar main screen met bollen (deze blijft meestal al zichtbaar)
  document.getElementById('mainScreen').style.display = 'block';
}

