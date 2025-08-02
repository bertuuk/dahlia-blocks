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
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
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
export default function Edit({ attributes }) {
	const blockProps = useBlockProps({
		className: 'wp-block-category-featured-image',
		style: {
			aspectRatio: attributes.aspectRatio || '1',
			backgroundColor: '#eee',
			borderRadius: 'var(--wp--preset--spacing--small, 8px)', // ajustable amb controls
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	});

	return (
		<div {...blockProps}>
			<span>{__('Category Featured Image', 'dahlia-blocks')}</span>
		</div>
	);
}
