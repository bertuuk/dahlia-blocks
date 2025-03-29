=== Dahlia Blocks ===
Contributors: bertuuk  
Tags: blocks, gutenberg, reading time, post grid, category grid, category cover, story container  
Requires at least: 6.0  
Tested up to: 6.5  
Requires PHP: 7.4  
Stable tag: 1.0.0  
License: GPLv2 or later  
License URI: https://www.gnu.org/licenses/gpl-2.0.html  

A collection of custom Gutenberg blocks designed for storytelling and content-rich websites. Designed to integrate seamlessly with the Dahlia theme.

== Description ==

Dahlia Blocks is a plugin that adds a curated set of custom blocks to the WordPress block editor (Gutenberg). These blocks are optimized for storytelling, educational content, and editorial layouts.

The plugin is designed to work seamlessly with the [Dahlia theme](https://github.com/bertuuk/dahlia), a Full Site Editing (FSE) WordPress theme tailored for content-first experiences. While the blocks can be used with any FSE-compatible theme, visual integration is optimized for Dahlia.

=== Included Blocks ===

1. **Reading Time**  
   Displays an estimated reading time for the current post or page, based on content length. The output is accessible and customizable.

2. **Post Grid**  
   Displays a responsive grid of posts, optionally filtered by category, number, or order. Ideal for content overviews or blog pages.

3. **Category Grid**  
   Displays a visual grid of categories, including titles and featured images if available. Useful for topic navigation or homepage sections.

4. **Category Cover**  
   Displays a single featured category as a visual “cover” block, with background image and title. Often used as a header for category sections.

5. **Story Container**  
   A block designed to wrap storytelling content. It supports nested blocks (`InnerBlocks`) and includes accessible frontend controls to adjust font size and toggle between serif/sans-serif fonts.

== Installation ==

1. Upload the `dahlia-blocks` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the "Plugins" menu in WordPress.
3. You can now use the custom blocks from the block editor.

== Development Setup ==

If you clone the repository and need to build from source:

1. Run `npm install` to install dependencies.
2. Run `npm run build` to generate the production assets.

Requires Node.js and npm.

== Frequently Asked Questions ==

= Does this plugin only work with the Dahlia theme? =  
No, you can use it with any block-based (FSE) WordPress theme. However, visual styles and templates are optimized for the Dahlia theme.

= Are the blocks accessible? =  
Yes. All blocks are built with accessibility best practices in mind, including semantic markup and focus management.

= Can I customize the appearance? =  
Yes. The blocks support additional CSS classes and respond to theme styles. You can override styles in your child theme or use `theme.json` support.

== Screenshots ==

1. Reading Time block showing estimated reading time.
2. Post Grid block with multiple posts.
3. Category Grid with category thumbnails.
4. Category Cover with featured image and heading.
5. Story Container block with font toggles.

== Changelog ==

= 1.0.0 =
* Initial release with five blocks: Reading Time, Post Grid, Category Grid, Category Cover, and Story Container.

== Upgrade Notice ==

= 1.0.0 =
Initial release.

== License ==

This plugin is licensed under the GPLv2 or later.