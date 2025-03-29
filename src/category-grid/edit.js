/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * WordPress UI components for block settings and controls.
 * Common components include panels, buttons, checkboxes, etc.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */

import { PanelBody, CheckboxControl, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

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
		cardSize,
		styleCompact,
		categories,
		gridItemsLargeDesktop,
		gridItemsDesktop,
		gridItemsLargeTablet,
		gridItemsTablet,
		gridItemsMobile

	} = attributes;
	const blockProps = useBlockProps();

	// Obtener categorías desde la API de WordPress
	const getCategories = useSelect(
		(select) => select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 }),
		[]
	);


	// Inicializar las categorías seleccionadas si no hay ninguna seleccionada
	useEffect(() => {
		if (getCategories && getCategories.length > 0 && (!categories || categories.length === 0)) {
			const allCategoryIds = getCategories.map((category) => category.id);
			setAttributes({ categories: allCategoryIds });
		}
	}, [getCategories, categories]);

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

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('General Settings', 'dahlia-blocks')} initialOpen={true}>
					<SelectControl
						label={__('Card Size', 'dahlia-blocks')}
						value={cardSize}
						options={[
							{ label: __('Small', 'dahlia-blocks'), value: 'small' },
							{ label: __('Medium', 'dahlia-blocks'), value: 'medium' },
							{ label: __('Large', 'dahlia-blocks'), value: 'large' },
						]}
						onChange={(newCardSize) => setAttributes({ cardSize: newCardSize })}
						__nextHasNoMarginBottom={true}
					/>
					<ToggleControl
						label={__('Compact', 'dahlia-blocks')}
						checked={styleCompact}
						onChange={(newStyleCompact) => setAttributes({ styleCompact: newStyleCompact })}
						__nextHasNoMarginBottom={true}
					/>
				</PanelBody>
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
								__nextHasNoMarginBottom
							/>
						))
					) : (
						<p>No categories</p>
					)}

				</PanelBody>
				<PanelBody title={__('Grid Settings', 'dahlia-blocks')}>
					<RangeControl
						label={__('Large Desktop items', 'dahlia-blocks')}
						value={gridItemsLargeDesktop}
						onChange={(newGridItemsLargeDesktop) => setAttributes({ gridItemsLargeDesktop: newGridItemsLargeDesktop })}
						min={1}
						max={6}
						__nextHasNoMarginBottom={true}
					/>
					<RangeControl
						label={__('Desktop items', 'dahlia-blocks')}
						value={gridItemsDesktop}
						onChange={(newGridItemsDesktop) => setAttributes({ gridItemsDesktop: newGridItemsDesktop })}
						min={1}
						max={6}
						__nextHasNoMarginBottom={true}
					/>
					<RangeControl
						label={__('Large Tablet items', 'dahlia-blocks')}
						value={gridItemsLargeTablet}
						onChange={(newGridItemsLargeTablet) => setAttributes({ gridItemsLargeTablet: newGridItemsLargeTablet })}
						min={1}
						max={6}
						__nextHasNoMarginBottom={true}
					/>
					<RangeControl
						label={__('Tablet items', 'dahlia-blocks')}
						value={gridItemsTablet}
						onChange={(newGridItemsTablet) => setAttributes({ gridItemsTablet: newGridItemsTablet })}
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


			</InspectorControls>
			<div {...blockProps}>
				<ServerSideRender
					block="dahlia-blocks/category-grid"
					attributes={attributes}
				/>
			</div>
		</>

	);

}
