import { ButtonFactory } from './ButtonFactory.js';
import { ProgressBarHandler } from './ProgressBarHandler.js';

export class MusicPlayerView {
  constructor(model) {
    this.model = model;

    this.audioElement = document.createElement('audio');
    this.audioElement.id = 'audio';

    this.titleElement = document.createElement('h1');
    this.titleElement.id = 'title';

    this.currentAudioElement = document.createElement('div');
    this.currentAudioElement.id = 'current_audio';

    this.currentTimeElement = document.createElement('div');
    this.currentTimeElement.id = 'current_time';

    this.controlsContainer = document.createElement('div');
    this.controlsContainer.className = 'controls';

    this.prevButton = ButtonFactory.createButton('prev', 'fas fa-backward');
    this.playButton = ButtonFactory.createButton('play', 'fas fa-play');
    this.nextButton = ButtonFactory.createButton('next', 'fas fa-forward');

    this.progressContainer = document.createElement('div');
    this.progressContainer.className = 'progress_container';

    this.appElement = document.getElementById('app');
    this.appElement.appendChild(this.audioElement);
    this.appElement.appendChild(this.titleElement);
    this.appElement.appendChild(this.currentAudioElement);
    this.appElement.appendChild(this.currentTimeElement);
    this.appElement.appendChild(this.controlsContainer);
    this.appElement.appendChild(this.progressContainer);

    this.controlsContainer.appendChild(this.prevButton);
    this.controlsContainer.appendChild(this.playButton);
    this.controlsContainer.appendChild(this.nextButton);

    this.progressHandler = new ProgressBarHandler(this.audioElement, this.progressContainer);

    this.playButton.addEventListener('click', () => this.togglePlay());
    this.prevButton.addEventListener('click', () => this.prevSong());
    this.nextButton.addEventListener('click', () => this.nextSong());
    this.audioElement.addEventListener('timeupdate', () => this.progressHandler.updateProgressBar());
    this.progressContainer.addEventListener('click', (e) => this.progressHandler.handleProgressClick(e));

    this.loadSong(this.model.getCurrentSong());
  }

  loadSong(song) {
    this.audioElement.src = `./src/Audio/${song}.mp3`;
    this.titleElement.textContent = song;
    this.audioElement.load();
    this.audioElement.play();
  }

  togglePlay() {
    if (this.audioElement.paused) {
      this.audioElement.play();
      this.playButton.querySelector('i').className = 'fas fa-pause';
    } else {
      this.audioElement.pause();
      this.playButton.querySelector('i').className = 'fas fa-play';
    }
  }

  prevSong() {
    const song = this.model.prevSong();
    this.loadSong(song);
  }

  nextSong() {
    const song = this.model.nextSong();
    this.loadSong(song);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
