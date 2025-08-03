<template>
  <video class="fullscreen" src="/assets/videos/sheba-video.mp4" playsinline autoplay muted loop disablePictureInPicture controlsList="nodownload"></video>
</template>

<style lang="scss" scoped>
video.fullscreen {
  position: absolute;
  z-index: 0;
  object-fit: cover;
  width:130%;
  height:100%;
  top: 0;
  left: 0;
  pointer-events: none;
  &::-webkit-media-controls {
     display:none !important;
  }
}
</style>