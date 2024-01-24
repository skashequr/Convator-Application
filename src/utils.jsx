// utils.jsx
export function getYouTubeVideoId(url) {
  // Regular expression to match YouTube URL formats
  var regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  // Extract the video ID using the regular expression
  var match = url.match(regExp);

  // If a match is found, return the video ID, otherwise return null
  return match ? match[1] : null;
}
