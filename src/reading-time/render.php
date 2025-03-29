<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php
    $reading_time = get_post_meta( get_the_ID(), '_reading_time', true );

    if ( ! $reading_time ) {
        return '';
    }
    echo esc_html( $reading_time ) . ' min';
    ?>
</p>




