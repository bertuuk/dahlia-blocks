<?php
/**
 * Plugin Name:       Dahlia Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dahlia-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function dahlia_blocks_dahlia_blocks_block_init() {
	register_block_type( __DIR__ . '/build/story-container' );
    register_block_type( __DIR__ . '/build/reading-time' );
    register_block_type( __DIR__ . '/build/post-grid' );
    register_block_type( __DIR__ . '/build/category-grid' );
    register_block_type( __DIR__ . '/build/category-cover' );
    register_block_type( __DIR__ . '/build/category-featured-image' );
}
add_action( 'init', 'dahlia_blocks_dahlia_blocks_block_init' );


function dahlia_blocks_load_textdomain() {
    load_plugin_textdomain( 'dahlia-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'dahlia_blocks_load_textdomain' );

function dahlia_blocks_enqueue_fonts() {
    wp_enqueue_style(
        'dahlia-fonts',
        'https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap',
        array(),
        null
    );
}
add_action( 'enqueue_block_editor_assets', 'dahlia_blocks_enqueue_fonts' );
add_action( 'wp_enqueue_scripts', 'dahlia_blocks_enqueue_fonts' );

/**
 * Guardar el tiempo de lectura basado en el contenido de los bloques `story-container`.
 *
 * @param int $post_id El ID del post.
 */
function dahlia_blocks_save_reading_time($post_id) {
    // Verificar que no sea una revisión automática
    if (wp_is_post_revision($post_id)) {
        return;
    }

    // Obtener el contenido del post
    $post_content = get_post_field('post_content', $post_id);

    // Buscar los bloques `story-container` y extraer su contenido
    if (has_blocks($post_content)) {
        $parsed_blocks = parse_blocks($post_content);
        $story_content = '';

        foreach ($parsed_blocks as $block) {
            if ($block['blockName'] === 'dahlia-blocks/story-container') {
                $story_content .= render_block($block); // Agregar contenido del bloque
            }
        }

        // Calcular el tiempo de lectura
        if (!empty($story_content)) {
            $reading_time = dahlia_blocks_calculate_reading_time($story_content);

            // Guardar el tiempo de lectura como metadato
            update_post_meta($post_id, '_reading_time', $reading_time);
        }
    }
}
add_action('save_post', 'dahlia_blocks_save_reading_time');

/**
 * Calcular el tiempo de lectura basado en el contenido.
 *
 * @param string $content El contenido del texto.
 * @return int El tiempo estimado en minutos.
 */
function dahlia_blocks_calculate_reading_time($content) {
    $word_count = str_word_count(strip_tags($content)); // Contar palabras
    $reading_speed = 200; // Velocidad promedio de lectura en palabras por minuto
    return ceil($word_count / $reading_speed); // Redondear hacia arriba
}