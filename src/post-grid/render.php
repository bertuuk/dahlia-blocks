<?php

/**
 * Server-side rendering for the `dahlia-blocks/post-grid` block.
 * 
 * This file is loaded automatically because it's referenced in block.json.
 */
// Desestructuramos los atributos para facilitar el manejo.

$card_style                		= $attributes['cardStyle'] ?? 'focus';
$button_text					= $attributes['buttonText'] ?? 'Go';
$layout                			= $attributes['layout'] ?? 'grid';
$posts_per_page        			= $attributes['postsPerPage'] ?? 6;
$category              			= $attributes['category'] ?? '';
$categories						= $attributes['categories'] ?? '';
$tag                  			= $attributes['tag'] ?? '';
$filter_by             			= $attributes['filterBy'] ?? 'date';
$query_offset             		= $attributes['queryOffset'] ?? '0';
$grid_items_desktop            	= $attributes['gridItemsDesktop'] ?? 4;
$grid_items_mobile           	= $attributes['gridItemsMobile'] ?? 2;
$post_grid_title				= $attributes['postGridTitle'] ?? '';
$title_tag						= $attributes['titleTag'] ?? 'h2';
$carousel_items_large_desktop 	= $attributes['carouselItemsLargeDesktop'] ?? 4;
$carousel_items_desktop 		= $attributes['carouselItemsDesktop'] ?? 4;
$carousel_items_tablet  		= $attributes['carouselItemsTablet'] ?? 2;
$carousel_items_mobile  		= $attributes['carouselItemsMobile'] ?? 1;
$carousel_slide_by      		= $attributes['carouselSlideBy'] ?? 1;
$carousel_peek          		= $attributes['carouselPeek'] ?? false;
$carousel_autoplay      		= $attributes['carouselAutoplay'] ?? false;
$carousel_loop      			= $attributes['carouselLoop'] ?? false;
$carousel_nav           		= $attributes['carouselNav'] ?? true;
$post_type           			= $attributes['postType'] ?? 'post';
$posts_in            			= $attributes['postsIn'] ?? '';
$single_related_posts			= $attributes['singleRelatedPost'] ?? false;
$exclude_query_posts			= $attributes['excludeQueryPosts'] ?? false;

global $post;
global $dahlia_rendered_posts;
if (!isset($dahlia_rendered_posts)) {
    $dahlia_rendered_posts = [];
}
if (!function_exists('dahlia_blocks_get_related_posts')) {
// Create functions to use in the query
function dahlia_blocks_get_related_posts($post_id, $post_type = 'post'){
    global $wpdb;

    // Obtener categorías y etiquetas del post actual
    $categories = wp_get_post_terms($post_id, 'category', ['fields' => 'ids']);
    $tags = wp_get_post_terms($post_id, 'post_tag', ['fields' => 'ids']);
    $taxonomy_ids = array_merge($categories, $tags);

    // Si no hay categorías ni etiquetas, devolvemos un array vacío
    if (empty($taxonomy_ids)) {
        return [];
    }

    // Construir consulta SQL personalizada
    $query = $wpdb->prepare("
        SELECT p.ID, COUNT(t.term_id) AS matches
        FROM {$wpdb->posts} AS p
        INNER JOIN {$wpdb->term_relationships} AS tr ON p.ID = tr.object_id
        INNER JOIN {$wpdb->term_taxonomy} AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
        INNER JOIN {$wpdb->terms} AS t ON tt.term_id = t.term_id
        WHERE p.ID != %d
          AND tt.term_id IN (" . implode(',', array_fill(0, count($taxonomy_ids), '%d')) . ")
          AND p.post_status = 'publish'
          AND p.post_type = %s
        GROUP BY p.ID
        ORDER BY matches DESC, p.post_date DESC
    ", array_merge([$post_id], $taxonomy_ids, [$post_type]));

    // Obtener resultados de la consulta
    $related_posts = $wpdb->get_results($query, ARRAY_A);

    // Extraer solo los IDs de los posts
    return wp_list_pluck($related_posts, 'ID');
}
}

// Start query parameters

if ( ! empty( $attributes['isFavorites'] ) ) {
    $user_favorites = get_user_favorites();

    if ( ! empty( $user_favorites ) ) {
        $args = [
            'post__in'      => $user_favorites,
            'posts_per_page' => -1,
        ];
    } else {
        $args = [
            'post__in'      => [], // Si no hi ha favorits
            'posts_per_page' => 0,
        ];
    }
} elseif($single_related_posts === true){
	$related_post_ids = dahlia_blocks_get_related_posts($post->ID, $post_type);

    if (!empty($related_post_ids)) {
        $args['post__in'] = $related_post_ids;
        $args['orderby'] = 'post__in'; // Mantener el orden específico de coincidencias
		$args['offset'] =  $query_offset;
		$args['posts_per_page'] =  $posts_per_page;
    }
}elseif ( is_archive() ) {
    $args = [
		'orderby'        => 'date',
		'posts_per_page' => $posts_per_page,
    ];
	if ( is_category() ) {
		$args['category_name'] = single_cat_title('', false);
	} elseif ( is_tag() ) {
		$args['tag'] = single_tag_title('', false);
	} elseif ( is_post_type_archive() ) {
		$args['post_type'] = get_query_var('post_type');
	}

} else {
    // Query predeterminada del bloc
	$args = array(
		'post_type'      => $post_type,
		'posts_per_page' => $posts_per_page,
		'orderby'        => 'date',
		'order'          => 'DESC',
		'offset'		 =>  $query_offset
	);
	if(is_single()){
		$args['post__not_in'] = array($post->ID);
	}
	
	if (! empty($category)) {
		$args['category_name'] = $category;
	}
	
	if (! empty($categories)) {
		$categoriesString = implode(',', $categories);
		$args['cat'] = $categoriesString;
	}
	
	if (! empty($tag)) {
		$args['tag'] = $tag;
	}
	if(! empty($posts_in)){
		$args['post__in'] = $posts_in;
	}
}
// Filtros dinámicos según las configuraciones
if ('popular_month' === $attributes['filterBy']) {
	$args['meta_key'] = 'wpb_post_views_month_count'; // Clave del metadato
	$args['orderby']  = 'meta_value_num'; // Ordenar por el valor numérico del metadato
} elseif ('popular_always' === $attributes['filterBy']) {
	$args['meta_key'] = 'wpb_post_views_count'; // Clave del metadato
	$args['orderby']  = 'meta_value_num'; // Ordenar por el valor numérico del metadato
} elseif ('rand' === $attributes['filterBy']) {
	$args['orderby'] = 'rand';
} elseif ('name' === $attributes['filterBy']){
	$args['orderby'] = 'title';
	$args['order'] = 'ASC';		
} elseif ('reading_time' === $attributes['filterBy']){
	$args['meta_key'] = '_reading_time'; // Clave del metadato
	$args['orderby']  = 'meta_value_num'; // Ordenar por el valor numérico del metadato
	$args['order'] = 'ASC';	
}

if($exclude_query_posts === true){
	$args['post__not_in'] = $dahlia_rendered_posts;
}


$query = new WP_Query($args);


if ($query->have_posts()) :
?>
	<div class="wp-block-group alignfull is-layout-constrained wp-block-group-is-layout-constrained <?php echo ('carousel' === $layout) ? 'outer-container-carousel' : ''; ?>">
		<div <?php echo get_block_wrapper_attributes(['class' => 'wrapper-' . $layout]); ?>>
			<?php if ('carousel' === $layout) : ?>
				<div class="post-grid-carousel-header">
					<div class="post-grid-title">
						<?php if (!empty($title_tag)) : ?>
							<<?php echo $title_tag ?> class="wp-block-heading"><?php echo $post_grid_title ?></<?php echo $title_tag ?>>
						<?php endif; ?>
					</div>
					<div class="tns-controls">
						<button class="tns-prev" aria-label="<?php echo esc_attr__('Previous slide','dahlia-blocks') . " " . $post_grid_title ?>"><span class="dahlia-icon di-small dahlia-fi-rr-angle-small-left" aria-hidden="true"></span></button>
						<button class="tns-next" aria-label="<?php echo esc_attr__('Next slide','dahlia-blocks') . " " . $post_grid_title ?> "><span class="dahlia-icon di-small dahlia-fi-rr-angle-small-right" aria-hidden="true"></span></button>
					</div>
				</div>
			<?php endif; ?>
			<div
				class="post-grid <?php echo ('carousel' === $layout) ? 'post-grid-carousel' : 'post-grid-grid row-items-lg-' . $grid_items_desktop . ' row-items-sm-' . $grid_items_mobile; ?>"
				<?php if ('carousel' === $layout) : ?>
				role="region" aria-roledescription="carousel" aria-label="<?php echo esc_attr__( 'Carousel', 'dahlia-blocks' ) . $post_grid_title; ?>"
				data-items-large-desktop="<?php echo esc_attr($carousel_items_large_desktop); ?>"
				data-items-desktop="<?php echo esc_attr($carousel_items_desktop); ?>"
				data-items-tablet="<?php echo esc_attr($carousel_items_tablet); ?>"
				data-items-mobile="<?php echo esc_attr($carousel_items_mobile); ?>"
				data-slide-by="<?php echo esc_attr($carousel_slide_by); ?>"
				data-peek="<?php echo esc_attr($carousel_peek ? 'true' : 'false'); ?>"
				data-autoplay="<?php echo esc_attr($carousel_autoplay ? 'true' : 'false'); ?>"
				data-loop="<?php echo esc_attr($carousel_loop ? 'true' : 'false'); ?>"
				data-nav="<?php echo esc_attr($carousel_nav ? 'true' : 'false'); ?>"
				<?php endif; ?>>
				<?php
				
				while ($query->have_posts()) :
					$query->the_post();
					$dahlia_rendered_posts[] = get_the_ID();
					$reading_time = get_post_meta(get_the_ID(), '_reading_time', true);
			
				?>
				
				<?php if (has_post_thumbnail( get_the_ID() ) ) {
					$bg_small_url = get_the_post_thumbnail_url(get_the_ID(), 'thumbnail');
					$bg_big_url = get_the_post_thumbnail_url(get_the_ID(), 'full');
				}else{
					$bg_small_url = "";
					$bg_big_url = "";
				};?>
					
					<div class="post-grid-item--outter card-style <?php echo $card_style . '-card-style ';?>">
						<div class="post-grid-item">
							<?php if ($card_style === 'focus' || 'highlight') : ?>
								<div class="card-style__wrapper card-style__<?php echo $card_style . ' ' . ($bg_small_url ? '' : 'no-image')  ?> lazyload " style="background-image: url('<?php echo esc_url($bg_small_url) ?>')" data-bgset="<?php echo esc_url($bg_big_url) ?>" >
									<div class="card-style__content">
										<div class="content-bottom">
										<a href="<?php the_permalink(); ?>" class="paragraph-regular-2xl content-title"><?php the_title(); ?></a>
										<?php if ($card_style === 'highlight' && !empty($button_text))  : ?>
											<div class="card-button">
												<span><?php echo $button_text ?></span><span class="dahlia-icon di-small dahlia-fi-rr-arrow-small-right"></span>
											</div>
										<?php endif; ?>
										</div>
										<?php if(!empty($reading_time)) : ?>
										<div class="content-reading-time">
											<?php echo '<div class="dahlia-chip">' . esc_html($reading_time) . ' min</div>'; ?>
										</div>
										<?php endif; ?>
									</div>
								</div>

							<?php elseif ($card_style === 'detail') : ?>
								<a href="<?php the_permalink(); ?>">
									<?php if (has_post_thumbnail()) : ?>
										<div class="post-thumbnail">
											<?php the_post_thumbnail('medium'); ?>
										</div>
									<?php endif; ?>
									<h3><?php the_title(); ?></h3>
								</a>
							<?php endif; ?>
						</div>
					</div>
				<?php
				endwhile;
				wp_reset_postdata();
				?>
			</div>
		</div>
	</div>
<?php
else :
	echo '<p>' . esc_html__('No posts found.', 'dahlia-blocks') . '</p>';
endif;
