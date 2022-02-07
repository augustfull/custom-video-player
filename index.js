document.addEventListener("DOMContentLoaded", () => {
  /* Get Our Elements */
  const player = document.querySelector(".wrapper");
  const video = player.querySelector("video");
  const progress = player.querySelector(".progress-bar");
  const progressBarFill = player.querySelector(".progress-bar__fill");
  const toggle = player.querySelector(".toggle");
  const centerToggle = player.querySelector(".center");
  const skipButtons = player.querySelectorAll("[data-skip]");
  const ranges = player.querySelectorAll(".slider");

  /* Build out functions */
  function togglePlay() {
    const method = video.paused ? "play" : "pause";
    video[method]();
  }

  function updateButton() {
    const icon = this.paused ? "&#9654;" : "&#10074;&#10074;";
    toggle.innerHTML = icon;
    centerToggle.innerHTML = icon;
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleRangeMove() {
    video[this.name] = this.value;
    this.title = `${this.name}: ${this.value}`;
  }

  function handleProgress() {
    const fillPercent = (video.currentTime / video.duration) * 100;
    progressBarFill.style.flexBasis = `${fillPercent}%`;
  }

  function jumpTo(e) {
    const jumpToTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = jumpToTime;
  }

  /* Hook up the event listeners */
  video.addEventListener("click", togglePlay);
  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  video.addEventListener("timeupdate", handleProgress);

  toggle.addEventListener("click", togglePlay);
  ranges.forEach((range) => range.addEventListener("input", handleRangeMove));
  skipButtons.forEach((button) => button.addEventListener("click", skip));
  centerToggle.addEventListener("click", togglePlay);

  let mousedown = false;
  progress.addEventListener("click", jumpTo);
  progress.addEventListener("mousedown", () => (mousedown = true));
  progress.addEventListener("mousemove", (e) => mousedown && jumpTo(e));
  progress.addEventListener("mouseup", () => (mousedown = false));
});
