module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("njk");
    // Copy static assets to the output folder

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/img");

    // Set input and output folders
    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
        }
    }
}