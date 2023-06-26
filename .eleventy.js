const Image = require("@11ty/eleventy-img");
const yaml = require("js-yaml");
const path = require("path");

// --- START, eleventy-img
function imageShortcode(src, cls, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
    console.log("imageShortcode", src, cls, alt, sizes)
    let options = {
        widths: [150, 300, 600, 900],
        formats: ["webp", "jpeg"],
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

    let imageAttributes = {
        class: cls,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    }
    // get metadata
    metadata = Image.statsSync(src, options)

    console.log("------")
    // console.log("metadata", metadata);
    console.log("imageAttributes", imageAttributes);
    console.log("options", options);
    console.log("------")

    return Image.generateHTML(metadata, imageAttributes)
}
// --- END, eleventy-img


module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("njk");
    // Copy static assets to the output folder

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/img");

    eleventyConfig.addShortcode("image", imageShortcode)

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