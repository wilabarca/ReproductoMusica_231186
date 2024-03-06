export class ProgressBarHandler {
    constructor(audioElement, progressContainer) {
      this.audioElement = audioElement;
      this.progressContainer = progressContainer;
      this.progressElement = document.createElement('div');
      this.progressElement.id = 'progress';
      this.progressContainer.appendChild(this.progressElement);
    }
  
    updateProgressBar() {
      const { duration, currentTime } = this.audioElement;
      const progressPercent = (currentTime / duration) * 100;
      this.progressElement.style.width = `${progressPercent}%`;
    }
  
    handleProgressClick(event) {
      const { offsetX, target } = event;
      const width = target.clientWidth;
      const duration = this.audioElement.duration;
      const seekTime = (offsetX / width) * duration;
  
      this.audioElement.currentTime = seekTime;
    }
  }
  