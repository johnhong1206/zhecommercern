const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  images: {
    domains: [
      "image.tmdb.org",
      "platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
      "thumbs.dreamstime.com",
      "media.wired.com",
      "images.unsplash.com",
      "cdn.vox-cdn.com",
    ],
  },
});
