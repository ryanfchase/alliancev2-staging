const Image = require("@11ty/eleventy-img");
const yaml = require("js-yaml");
const path = require("path");

bgImageMarkup = (src, id) => `${id} {
    background-image: url(${src});
    background-image: 
        linear-gradient(
            rgba(0, 0, 6, 1),
            rgba(0, 0, 0, 0.4)
        ),
        url(${src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
} `;
mediaQueryMarkup = (src, id, width) => `@media (min-width: ${width}px) { ${bgImageMarkup(src, id) }} `;


// --- START, eleventy-img
function generateImages(src, formats, widths=[150, 300, 600, 900]) {
    let options = {
        widths: widths,
        formats: formats,
        outputDir: "./_site/img/",
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src)
            const name = path.basename(src, extension)
            return `${name}-${width}w.${format}`
        }
    }

    // generate images
    Image(src, options)

    // return metadata, even if they haven't finished generating
    metadata = Image.statsSync(src, options)
    return metadata;
}

function imageHTMLShortcode(src, alt="an image", sizes="(min-width: 1024px) 100vw, 50vw") {
    console.log("imageShortcode", src, alt, sizes)

    // generate images
    metadata = generateImages(src, ["jpeg", "webp"])

    let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    }

    return Image.generateHTML(metadata, imageAttributes)
}

function imageCssShortcode(src, id){
  // generate images
  const metadata = generateImages(src, ["jpeg"], [600, 900, 1200, 1600]);

  let markup = [bgImageMarkup(metadata.jpeg[0].url, id)];
  metadata.jpeg.slice(1).forEach((image, idx) => {
    markup.push(mediaQueryMarkup(image.url, id, image.width));
  });
  return markup.join("");
}
// --- END, eleventy-img

module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("njk");
    // Copy static assets to the output folder

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/svg");

    eleventyConfig.addWatchTarget("src/css");

    eleventyConfig.addShortcode("image", imageHTMLShortcode)
    eleventyConfig.addShortcode("bgImage", imageCssShortcode)

    // Add YAML support for data files
	eleventyConfig.addDataExtension("yaml", (contents, filepath) => yaml.load(contents));

    // // Add navigation data
    // eleventyConfig.addCollection("navigation", (collection) =>
    //     collection.getFilteredByTag("navigation").sort((a, b) =>
    //         a.data.navOrder - b.data.navOrder
    // ));

    // Set input and output folders
    return {
        dir: {
            input: "src",
            data: "_data",
            output: "_site",
            includes: "_includes",
        }
    }
}