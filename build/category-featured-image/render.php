<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php
$term = get_queried_object();
if ($term && !is_wp_error($term)) {
	$image_id = get_term_meta($term->term_id, 'dahlia_category_image', true);
	if ($image_id) {
		$aspect_ratio = isset($attributes['aspectRatio']) ? esc_attr($attributes['aspectRatio']) : '1';
		$object_fit = isset($attributes['scale']) ? esc_attr($attributes['scale']) : 'cover';

		$image_url = wp_get_attachment_image_src($image_id, 'full')[0];

		echo '<figure class="wp-block-category-featured-image" style="aspect-ratio: ' . $aspect_ratio . ';">';
		echo '<img src="' . esc_url($image_url) . '" alt="" style="width:100%;height:100%;object-fit:' . $object_fit . ';border-radius:inherit;" />';
		echo '</figure>';
	}
}
?>
