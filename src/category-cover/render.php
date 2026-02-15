<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php
if (is_archive()) {
    $term = get_queried_object();
    $term_id = $term->term_id ?? 0;
    $term_name = $term->name ?? '';
    $term_description = $term->description ?? '';
    $term_number = $term->count ?? 0;
    $bg_url = '';
    $category_background = '';
    if (is_category() && $term_id && metadata_exists('term', $term_id, 'dahlia_category_image')) {
        $category_image = get_term_meta($term_id, 'dahlia_category_image')[0];
        if (!empty($category_image)) {
            $image_url = wp_get_attachment_image_url($category_image);
            if ($image_url) {
                $category_background = 'background-image: url(' . esc_url_raw($image_url) . ')';
            }
            $bg_url = wp_get_attachment_image_url($category_image, 'full');
        }
    }
}
?>
<?php if (!empty($bg_url)) : ?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="archive-cover__outer lazyload" style="<?php echo esc_attr($category_background); ?>" data-bgset="<?php echo esc_url($bg_url); ?>">
        <div class="archive-cover__container">
            <div class="main-content">
                <h1 class="main-content__title"><?php echo esc_html($term_name); ?></h1>
                <div class="main-content__description">
                    <?php echo wp_kses_post($term_description); ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php endif; ?>
