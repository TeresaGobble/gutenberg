/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

import { hasBlockSupport } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import Edit from './edit';
import {
	BlockEditContextProvider,
	useBlockEditContext,
	mayDisplayControlsKey,
	mayDisplayParentControlsKey,
	blockEditingModeKey,
	blockBindingsKey,
} from './context';

/**
 * The `useBlockEditContext` hook provides information about the block this hook is being used in.
 * It returns an object with the `name`, `isSelected` state, and the `clientId` of the block.
 * It is useful if you want to create custom hooks that need access to the current blocks clientId
 * but don't want to rely on the data getting passed in as a parameter.
 *
 * @return {Object} Block edit context
 */
export { useBlockEditContext };

export default function BlockEdit( {
	mayDisplayControls,
	mayDisplayParentControls,
	blockEditingMode,
	// The remaining props are passed through the BlockEdit filters and are thus
	// public API!
	...props
} ) {
	const {
		name,
		isSelected,
		clientId,
		attributes = {},
		__unstableLayoutClassNames,
	} = props;
	const { layout = null, align = null, metadata = {} } = attributes;
	const { bindings } = metadata;
	const layoutSupport =
		hasBlockSupport( name, 'layout', false ) ||
		hasBlockSupport( name, '__experimentalLayout', false );

	const hasAlignSupport = hasBlockSupport( name, 'align', false );

	return (
		<BlockEditContextProvider
			// It is important to return the same object if props haven't
			// changed to avoid  unnecessary rerenders.
			// See https://reactjs.org/docs/context.html#caveats.
			value={ useMemo(
				() => ( {
					name,
					isSelected,
					clientId,
					align: hasAlignSupport ? align : null,
					layout: layoutSupport ? layout : null,
					__unstableLayoutClassNames,
					// We use symbols in favour of an __unstable prefix to avoid
					// usage outside of the package (this context is exposed).
					[ mayDisplayControlsKey ]: mayDisplayControls,
					[ mayDisplayParentControlsKey ]: mayDisplayParentControls,
					[ blockEditingModeKey ]: blockEditingMode,
					[ blockBindingsKey ]: bindings,
				} ),
				[
					name,
					isSelected,
					clientId,
					align,
					hasAlignSupport,
					layoutSupport,
					layout,
					__unstableLayoutClassNames,
					mayDisplayControls,
					mayDisplayParentControls,
					blockEditingMode,
					bindings,
				]
			) }
		>
			<Edit { ...props } />
		</BlockEditContextProvider>
	);
}
