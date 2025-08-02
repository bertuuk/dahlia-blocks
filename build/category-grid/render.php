<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php
$card_size                      = $attributes['cardSize'] ?? 'small';
$style_compact                  = $attributes['styleCompact'] ?? false;
$background_image_blur          = $attributes['backgroundImageBlur'] ?? false;
$categories_selected            = $attributes['categories'] ?? '';
$grid_items_large_desktop       = $attributes['gridItemsLargeDesktop'] ?? 5;
$grid_items_desktop             = $attributes['gridItemsDesktop'] ?? 4;
$grid_items_large_tablet        = $attributes['gridItemsLargeTablet'] ?? 3;
$grid_items_tablet              = $attributes['gridItemsTablet'] ?? 3;
$grid_items_mobile              = $attributes['gridItemsMobile'] ?? 2;

$classes = [];

if ($style_compact) {
    $classes[] = 'compact-card';
}

if ($background_image_blur) {
    $classes[] = 'has-elements-blur';
}

$class_string = implode(' ', $classes);
?>
<div <?php echo get_block_wrapper_attributes(array('class' => $class_string)); ?>>
    <?php $categories = get_categories(); ?>
    <div class="category-grid__outer" style="
    --grid-columns-large: <?php echo $grid_items_large_desktop; ?>;
    --grid-columns-desktop: <?php echo $grid_items_desktop; ?>;
    --grid-columns-large-tablet: <?php echo $grid_items_large_tablet; ?>;
    --grid-columns-tablet: <?php echo $grid_items_tablet; ?>;
    --grid-columns-mobile: <?php echo $grid_items_mobile; ?>;
  ">
        <div class="category-grid__container">
            <?php
            foreach ($categories as $category) :
                if(in_array($category->term_id,$categories_selected)) :
                $meta_image = 'dahlia_category_image';
                $meta_icon = 'dahlia_category_icon';
                $term_id = $category->term_id;
                $term_name = $category->name;
                $category_background = '';
                $category_icon = '';
                $bg_url = '';

                if (metadata_exists('term', $term_id, $meta_image) && str_contains($attributes['className'], 'image')) {
                    $category_image = get_term_meta($term_id, $meta_image)[0];
                    if (!empty($category_image)) {
                        $category_background = 'background-image:url("' . wp_get_attachment_image_url($category_image) . '")';
                        $bg_url = wp_get_attachment_image_url($category_image, 'large');
                    }
                }
                if (metadata_exists('term', $term_id, $meta_icon)) {
                    $category_icon = get_term_meta($term_id, $meta_icon)[0];
                }
            ?>
                <div class="category-card__outer is-card-size-<?php echo $card_size ?> ">
                    <div class="category-card__container lazyload <?php echo esc_attr($background_image_blur ? 'has-blur' : '');?>" style=<?php echo $category_background ?> data-bgset="<?php echo esc_url( $bg_url ); ?>">
                        <?php if (!empty($category_icon)) : ?>
                            <div class="card-icon__outer">
                                <div class="card-icon__container">
                                    <span class="dahlia-icon di-large dahlia-<?php echo $category_icon ?>"></span>
                                </div>
                            </div>
                        <?php endif; ?>
                        <div class="category-card__content">
                            <a href=<?php echo get_category_link($term_id) ?>>
                                <?php echo $term_name ?>
                            </a>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
</div>