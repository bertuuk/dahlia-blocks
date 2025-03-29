<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php
if (is_archive()) {
    $term = get_queried_object();
    $term_id = $term->term_id;
    $term_name = $term->name;
    $term_description = $term->description;
    $term_number = $term->count;
    if (is_category() && metadata_exists('term', $term_id, 'dahlia_category_image')) {
        $category_image = get_term_meta($term_id, 'dahlia_category_image')[0];
        if (!empty($category_image)) {
            $category_background = 'background-image:url("' . wp_get_attachment_image_url($category_image) . '")';
            $bg_url = wp_get_attachment_image_url($category_image, 'full');
        }
    } else {
    }
}
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="archive-cover__outer lazyload" style=<?php echo $category_background ?> data-bgset="<?php echo esc_url($bg_url); ?>">
        <div class="archive-cover__container">
            <div class="main-content">
                <h1 class="main-content__title"><?= $term_name ?></h1>
                <div class="main-content__description">
                    <?= $term_description ?>
                </div>
            </div>
        </div>
    </div>
</div>