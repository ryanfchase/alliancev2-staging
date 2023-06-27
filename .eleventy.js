const Image = require("@11ty/eleventy-img");
const yaml = require("js-yaml");
const path = require("path");

// --- START, eleventy-img
function generateImages(src, formats) {
    let options = {
        widths: [150, 300, 600, 900],
        formats: formats,
        urlPath: "/img/",
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

function imageHTMLShortcode(src, cls, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
    console.log("imageShortcode", src, cls, alt, sizes)

    // generate images
    metadata = generateImages(src, ["jpeg", "webp"])

    let imageAttributes = {
        class: cls,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    }

    return Image.generateHTML(metadata, imageAttributes)
}

function imageCssShortcode(src, id){
    console.log("HERE!!!!!")
  const metadata = generateImages(src, ["jpeg"]);
  let markup = [`${id} { background-image: url(${metadata.jpeg[0].url});} `];
  // i use always jpeg for backgrounds
  metadata.jpeg.slice(1).forEach((image, idx) => {
    markup.push(`@media (min-width: ${metadata.jpeg[idx].width}px) { ${id} {background-image: url(${image.url});}}`);
  });
  return markup.join("");
}
// --- END, eleventy-img


module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("njk");
    // Copy static assets to the output folder

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/img");

    eleventyConfig.addShortcode("image", imageHTMLShortcode)
    eleventyConfig.addShortcode("bgImage", imageCssShortcode)

    // Add YAML support for data files
	eleventyConfig.addDataExtension("yaml", (contents) =>
		yaml.load(contents)
	);

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

    // console.log("------")
    // console.log("metadata", metadata);
    // console.log("imageAttributes", imageAttributes);
    // console.log("options", options);
    // console.log("------")