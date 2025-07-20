/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * WordPress UI components for block settings and controls.
 * Common components include panels, buttons, checkboxes, etc.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */

import { PanelBody, SelectControl, CheckboxControl, RangeControl, ToggleControl, TextControl, FormTokenField } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */


export default function Edit({ attributes, setAttributes }) {
	const {
		postGridTitle,
		titleTag,
		layout,
		cardStyle,
		buttonText,
		categories,
		tag,
		filterBy,
		postsPerPage,
		queryOffset,
		gridItemsDesktop,
		gridItemsMobile,
		carouselItemsLargeDesktop,
		carouselItemsDesktop,
		carouselItemsTablet,
		carouselItemsMobile,
		carouselSlideBy,
		carouselPeek,
		carouselAutoplay,
		carouselLoop,
		carouselNav,
		postType,
		isFavorites,
		singleRelatedPost,
		excludeQueryPosts,
		postsIn,
	} = attributes;

	const blockProps = useBlockProps();

	// Obtener categorías desde la API de WordPress
	const getCategories = useSelect(
		(select) => select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 }),
		[]
	);

	// Manejar cambios en las categorías seleccionadas
	const handleCategoryChange = (categoryId, isChecked) => {
		// Asegúrate de que `categories` siempre sea un array.
		const currentCategories = Array.isArray(categories) ? categories : [];

		// Actualiza la lista de categorías seleccionadas.
		const updatedCategories = isChecked
			? [...currentCategories, categoryId] // Agrega la categoría seleccionada.
			: currentCategories.filter((id) => id !== categoryId); // Remueve la categoría desmarcada.

		// Actualiza el atributo del bloque.
		setAttributes({ categories: updatedCategories });
	};

	// Obtener los nombres de posts

	// Obtener posts desde la API de WordPress
		

	const posts = useSelect((select) => {
		const queryArgs = { per_page: -1 };
		if (postType === 'any') {
			return [
				...(select('core').getEntityRecords('postType', 'post', queryArgs) || []),
				...(select('core').getEntityRecords('postType', 'page', queryArgs) || [])
			];
		}
		return select('core').getEntityRecords('postType', postType, queryArgs);
	}, [postType]);
	// Preparar sugerencias para el campo (títulos de posts)
	const postSuggestions = posts ? posts.map((post) => post.title.rendered) : [];

	// Manejar cambios en el campo FormTokenField para el atributo `postsIn`
	const handlePostSelection = (selectedTitles) => {
		// Buscar los IDs de los posts seleccionados basados en los títulos
		const selectedPostIds = selectedTitles
			.map((title) => {
				const matchingPost = posts.find((post) => post.title.rendered === title);
				return matchingPost ? matchingPost.id : null;
			})
			.filter((id) => id !== null); // Eliminar valores nulos en caso de títulos no coincidentes

		// Actualizar el atributo `postsIn` con los IDs seleccionados
		setAttributes({ postsIn: selectedPostIds });
	};



	// Obtener los valores seleccionados para mostrarlos en el campo
	const selectedPosts = postsIn && posts
		? postsIn.map((id) => {
			const matchingPost = posts.find((post) => post.id === id);
			return matchingPost ? matchingPost.title.rendered : '';
		})
		: [];


	return (
		<>
			<InspectorControls>
				<PanelBody title={__('General Settings', 'dahlia-blocks')} initialOpen={true}>

					<SelectControl
						label={__('Layout', 'dahlia-blocks')}
						value={layout}
						options={[
							{ label: __('Grid', 'dahlia-blocks'), value: 'grid' },
							{ label: __('Carousel', 'dahlia-blocks'), value: 'carousel' },
						]}
						onChange={(newLayout) => setAttributes({ layout: newLayout })}
						__nextHasNoMarginBottom={true}
					/>
					<SelectControl
						label={__('Card Style', 'dahlia-blocks')}
						value={cardStyle}
						options={[
							{ label: __('Focus', 'dahlia-blocks'), value: 'focus' },
							{ label: __('Highlight', 'dahlia-blocks'), value: 'highlight' },
							{ label: __('Detail', 'dahlia-blocks'), value: 'detail' },
						]}
						onChange={(newCardStyle) => setAttributes({ cardStyle: newCardStyle })}
						__nextHasNoMarginBottom={true}
					/>
					{(cardStyle === 'highlight' || cardStyle === 'detail') && (
						<TextControl
							label={__('Button text', 'dahlia-blocks')}
							value={buttonText}
							onChange={(newButtonText) => setAttributes({ buttonText: newButtonText })}
							__nextHasNoMarginBottom={true}
						/>
					)}

					<TextControl
						label={__('Tag (Slug)', 'dahlia-blocks')}
						value={tag}
						onChange={(newTag) => setAttributes({ tag: newTag })}
						__nextHasNoMarginBottom={true}
					/>
					<SelectControl
						label={__('Order By', 'dahlia-blocks')}
						value={filterBy}
						options={[

							{ label: __('Latest Posts', 'dahlia-blocks'), value: 'latest' },
							{ label: __('Most Popular This Month', 'dahlia-blocks'), value: 'popular_month' },
							{ label: __('Most Popular Always', 'dahlia-blocks'), value: 'popular_always' },
							{ label: __('Reading time', 'dahlia-blocks'), value: 'reading_time' },
							{ label: __('Rand', 'dahlia-blocks'), value: 'rand' },
							{ label: __('Name', 'dahlia-blocks'), value: 'name' },
						]}
						onChange={(newFilterBy) => setAttributes({ filterBy: newFilterBy })}
						__nextHasNoMarginBottom={true}
					/>

					<RangeControl
						label={__('Posts Per Page', 'dahlia-blocks')}
						value={postsPerPage}
						onChange={(newPostsPerPage) => setAttributes({ postsPerPage: newPostsPerPage })}
						min={-1}
						max={12}
						__nextHasNoMarginBottom={true}
					/>
					<RangeControl
						label={__('Offset', 'dahlia-blocks')}
						value={queryOffset}
						onChange={(newQueryOffset) => setAttributes({ queryOffset: newQueryOffset })}
						min={0}
						max={8}
						__nextHasNoMarginBottom={true}
					/>

				</PanelBody>
				{layout === 'grid' && (
					<PanelBody title={__('Grid Settings', 'dahlia-blocks')}>
						<RangeControl
							label={__('Desktop items', 'dahlia-blocks')}
							value={gridItemsDesktop}
							onChange={(newGridItemsDesktop) => setAttributes({ gridItemsDesktop: newGridItemsDesktop })}
							min={1}
							max={6}
							__nextHasNoMarginBottom={true}
						/>
						<RangeControl
							label={__('Mobile items', 'dahlia-blocks')}
							value={gridItemsMobile}
							onChange={(newGridItemsMobile) => setAttributes({ gridItemsMobile: newGridItemsMobile })}
							min={1}
							max={6}
							__nextHasNoMarginBottom={true}
						/>
					</PanelBody>
				)}

				{layout === 'carousel' && (
					<PanelBody title={__('Carousel Settings', 'dahlia-blocks')}>
						<TextControl
							label={__('Title', 'dahlia-blocks')}
							value={postGridTitle}
							onChange={(newPostGridTitle) => setAttributes({ postGridTitle: newPostGridTitle })}
							__nextHasNoMarginBottom={true}
						/>
						<SelectControl
							label={__('Tite tag', 'dahlia-blocks')}
							value={titleTag}
							options={[
								{ label: __('h1', 'dahlia-blocks'), value: 'h1' },
								{ label: __('h2', 'dahlia-blocks'), value: 'h2' },
								{ label: __('h3', 'dahlia-blocks'), value: 'h3' },
							]}
							onChange={(newTitleTag) => setAttributes({ titleTag: newTitleTag })}
							__nextHasNoMarginBottom={true}
						/>
						<RangeControl
							label={__('Items (Large Desktop)', 'dahlia-blocks')}
							value={carouselItemsLargeDesktop}
							onChange={(newCarouselItemsLargeDesktop) => setAttributes({ carouselItemsLargeDesktop: newCarouselItemsLargeDesktop })}
							min={1}
							max={12}
							__nextHasNoMarginBottom={true}
						/>
						<RangeControl
							label={__('Items (Desktop)', 'dahlia-blocks')}
							value={carouselItemsDesktop}
							onChange={(newCarouselItemsDesktop) => setAttributes({ carouselItemsDesktop: newCarouselItemsDesktop })}
							min={1}
							max={12}
							__nextHasNoMarginBottom={true}
						/>
						<RangeControl
							label={__('Items (Tablet)', 'dahlia-blocks')}
							value={carouselItemsTablet}
							onChange={(newCarouselItemsTablet) => setAttributes({ carouselItemsTablet: newCarouselItemsTablet })}
							min={1}
							max={12}
							__nextHasNoMarginBottom={true}
						/>
						<RangeControl
							label={__('Items (Mobile)', 'dahlia-blocks')}
							value={carouselItemsMobile}
							onChange={(newCarouselItemsMobile) => setAttributes({ carouselItemsMobile: newCarouselItemsMobile })}
							min={1}
							max={12}
							__nextHasNoMarginBottom={true}
						/>
						<RangeControl
							label={__('Slide By', 'dahlia-blocks')}
							value={carouselSlideBy}
							onChange={(newCarouselSlideBy) => setAttributes({ carouselSlideBy: newCarouselSlideBy })}
							min={1}
							max={3}
							__nextHasNoMarginBottom={true}
						/>
						<ToggleControl
							label={__('Peek Next Slide', 'dahlia-blocks')}
							checked={carouselPeek}
							onChange={(newCarouselPeek) => setAttributes({ carouselPeek: newCarouselPeek })}
							__nextHasNoMarginBottom={true}
						/>
						<ToggleControl
							label={__('Autoplay', 'dahlia-blocks')}
							checked={carouselAutoplay}
							onChange={(newCarouselAutoplay) => setAttributes({ carouselAutoplay: newCarouselAutoplay })}
							__nextHasNoMarginBottom={true}
						/>
						<ToggleControl
							label={__('Show Navigation', 'dahlia-blocks')}
							checked={carouselNav}
							onChange={(newCarouselNav) => setAttributes({ carouselNav: newCarouselNav })}
							__nextHasNoMarginBottom={true}
						/>
						<ToggleControl
							label={__('Loop', 'dahlia-blocks')}
							checked={carouselLoop}
							onChange={(newCarouselLoop) => setAttributes({ carouselLoop: newCarouselLoop })}
							__nextHasNoMarginBottom={true}
						/>
						
					</PanelBody>

				)}
				<PanelBody
					title="Filter by Category"
					initialOpen={false}
				>
					{getCategories && getCategories.length > 0 ? (
						getCategories.map((category) => (
							<CheckboxControl
								key={category.id}
								label={category.name}
								checked={Array.isArray(categories) && categories.includes(category.id)}
								onChange={(isChecked) => handleCategoryChange(category.id, isChecked)}
							/>
						))
					) : (
						<p>No categories</p>
					)}

				</PanelBody>
				<PanelBody
					title={__('Advanced Filters', 'dahlia-blocks')}
					initialOpen={false}
				>
					<SelectControl
						label={__('Post Type', 'dahlia-blocks')}
						value={postType}
						options={[
							{ label: __('Posts', 'dahlia-blocks'), value: 'post' },
							{ label: __('Pages', 'dahlia-blocks'), value: 'page' },
							{ label: __('All', 'dahlia-blocks'), value: 'any' },
						]}
						onChange={(newPostType) => setAttributes({ postType: newPostType })}
						__nextHasNoMarginBottom={true}
					/>
					<FormTokenField
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Posts in', 'dahlia-blocks')}
						suggestions={postSuggestions} // Mostrar sugerencias basadas en los títulos de los posts
						value={selectedPosts} // Títulos seleccionados
						onChange={handlePostSelection} // Actualizar valores al cambiar
					/>
				</PanelBody>

				<PanelBody title={"Advanced settings"}>
					<ToggleControl
						label={__('Show User Favorites', 'dahlia-blocks')}
						checked={isFavorites}
						onChange={(newIsFavorites) => setAttributes({ isFavorites: newIsFavorites })}
						__nextHasNoMarginBottom={true}
					/>
					<ToggleControl
						label={__('Get Related Posts', 'dahlia-blocks')}
						description={__('Check if you are in a Single Template and want to show most related posts', 'dahlia-blocks')}
						checked={singleRelatedPost}
						onChange={(newSingleRelatedPost) => setAttributes({ singleRelatedPost: newSingleRelatedPost })}
						__nextHasNoMarginBottom={true}
					/>
					<ToggleControl
						label={__('Exclude posts on other queries', 'dahlia-blocks')}
						description={__('Decide if you want to exclude posts that appear on other queries', 'dahlia-blocks')}
						checked={excludeQueryPosts}
						onChange={(newExcludeQueryPosts) => setAttributes({ excludeQueryPosts: newExcludeQueryPosts })}
						__nextHasNoMarginBottom={true}
					/>

				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<ServerSideRender
					block="dahlia-blocks/post-grid"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
