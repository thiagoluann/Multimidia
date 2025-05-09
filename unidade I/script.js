let audioCtx;
let sourceNode;
let gainNode;
let filterNode;
let isEffectOn = false;
let audioBuffer;
let startTime = 0;
let pausedAt = 0;
let isPlaying = false;

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const toggleEffectBtn = document.getElementById('toggleEffectBtn');

async function setupAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const response = await fetch('audio.mp3');
  const arrayBuffer = await response.arrayBuffer();
  audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
}

function createGraph() {
  if (sourceNode) sourceNode.disconnect();

  sourceNode = audioCtx.createBufferSource();
  sourceNode.buffer = audioBuffer;

  gainNode = audioCtx.createGain();
  gainNode.gain.value = volumeSlider.value / 100;

  filterNode = audioCtx.createBiquadFilter();
  filterNode.type = 'lowpass';

  sourceNode.connect(filterNode).connect(gainNode).connect(audioCtx.destination);

  filterNode.frequency.value = isEffectOn ? 1000 : 20000;

  sourceNode.onended = () => {
    if (isPlaying) stopAudio();
  };
}

function playAudio() {
  if (!audioBuffer) return;
  if (isPlaying) return;

  createGraph();
  sourceNode.start(0, pausedAt);
  startTime = audioCtx.currentTime - pausedAt;
  isPlaying = true;
}

function pauseAudio() {
  if (!isPlaying) return;
  sourceNode.stop();
  pausedAt = audioCtx.currentTime - startTime;
  isPlaying = false;
}

function stopAudio() {
  if (sourceNode) {
    sourceNode.stop();
    sourceNode.disconnect();
  }
  pausedAt = 0;
  isPlaying = false;
}

playBtn.onclick = () => {
  if (!audioCtx) {
    setupAudio().then(playAudio);
  } else {
    playAudio();
  }
};

pauseBtn.onclick = pauseAudio;
stopBtn.onclick = stopAudio;

volumeSlider.oninput = () => {
  if (gainNode) {
    gainNode.gain.value = volumeSlider.value / 100;
  }
  volumeValue.textContent = `${volumeSlider.value}%`;
};

toggleEffectBtn.onclick = () => {
  isEffectOn = !isEffectOn;
  if (filterNode) {
    filterNode.frequency.setValueAtTime(isEffectOn ? 1000 : 20000, audioCtx.currentTime);
  }
  toggleEffectBtn.textContent = isEffectOn
    ? '❌ Remover Filtro Passa-Baixa'
    : '🎛️ Ativar Filtro Passa-Baixa';
};
