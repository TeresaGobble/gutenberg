/**
 * WordPress dependencies
 */
import {
	__unstableIframe as Iframe,
	__unstableEditorStyles as EditorStyles,
	privateApis as blockEditorPrivateApis,
} from '@wordpress/block-editor';
import {
	__unstableMotion as motion,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import {
	useThrottle,
	useReducedMotion,
	useResizeObserver,
} from '@wordpress/compose';
import { useLayoutEffect, useState, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { useStylesPreviewColors } from './hooks';

const { useGlobalStyle, useGlobalStylesOutput } = unlock(
	blockEditorPrivateApis
);

const firstFrame = {
	start: {
		scale: 1,
		opacity: 1,
	},
	hover: {
		scale: 0,
		opacity: 0,
	},
};

const normalizedWidth = 248;
const normalizedHeight = 152;

const normalizedColorSwatchSize = 66;

// Throttle options for useThrottle. Must be defined outside of the component,
// so that the object reference is the same on each render.
const THROTTLE_OPTIONS = {
	leading: true,
	trailing: true,
};

const StylesPreviewColors = ( { label, isFocused, withHoverView } ) => {
	const [ backgroundColor = 'white' ] = useGlobalStyle( 'color.background' );
	const [ gradientValue ] = useGlobalStyle( 'color.gradient' );
	const [ styles ] = useGlobalStylesOutput();
	const disableMotion = useReducedMotion();
	const [ isHovered, setIsHovered ] = useState( false );
	const [ containerResizeListener, { width } ] = useResizeObserver();
	const [ throttledWidth, setThrottledWidthState ] = useState( width );
	const [ ratioState, setRatioState ] = useState();

	const setThrottledWidth = useThrottle(
		setThrottledWidthState,
		250,
		THROTTLE_OPTIONS
	);

	// Must use useLayoutEffect to avoid a flash of the iframe at the wrong
	// size before the width is set.
	useLayoutEffect( () => {
		if ( width ) {
			setThrottledWidth( width );
		}
	}, [ width, setThrottledWidth ] );

	// Must use useLayoutEffect to avoid a flash of the iframe at the wrong
	// size before the width is set.
	useLayoutEffect( () => {
		const newRatio = throttledWidth ? throttledWidth / normalizedWidth : 1;
		const ratioDiff = newRatio - ( ratioState || 0 );

		// Only update the ratio state if the difference is big enough
		// or if the ratio state is not yet set. This is to avoid an
		// endless loop of updates at particular viewport heights when the
		// presence of a scrollbar causes the width to change slightly.
		const isRatioDiffBigEnough = Math.abs( ratioDiff ) > 0.1;

		if ( isRatioDiffBigEnough || ! ratioState ) {
			setRatioState( newRatio );
		}
	}, [ throttledWidth, ratioState ] );

	// Set a fallbackRatio to use before the throttled ratio has been set.
	const fallbackRatio = width ? width / normalizedWidth : 1;
	/*
	 * Use the throttled ratio if it has been calculated, otherwise
	 * use the fallback ratio. The throttled ratio is used to avoid
	 * an endless loop of updates at particular viewport heights.
	 * See: https://github.com/WordPress/gutenberg/issues/55112
	 */
	const ratio = ratioState ? ratioState : fallbackRatio;

	const { highlightedColors } = useStylesPreviewColors();

	/*
	 * Reset leaked styles from WP common.css and remove main content layout padding and border.
	 * Add pointer cursor to the body to indicate the iframe is interactive,
	 * similar to Typography variation previews.
	 */
	const editorStyles = useMemo( () => {
		if ( styles ) {
			return [
				...styles,
				{
					css: 'html{overflow:hidden}body{min-width: 0;padding: 0;border: none;cursor: pointer;}',
					isGlobalStyles: true,
				},
			];
		}

		return styles;
	}, [ styles ] );
	const isReady = !! width;

	return (
		<>
			<div style={ { position: 'relative' } }>
				{ containerResizeListener }
			</div>
			{ isReady && (
				<Iframe
					className="edit-site-global-styles-preview__iframe"
					style={ {
						width: '100%',
						height: normalizedHeight * ratio,
					} }
					onMouseEnter={ () => setIsHovered( true ) }
					onMouseLeave={ () => setIsHovered( false ) }
					tabIndex={ -1 }
				>
					<EditorStyles styles={ editorStyles } />
					<motion.div
						style={ {
							height: normalizedHeight * ratio,
							width: '100%',
							background: gradientValue ?? backgroundColor,
							cursor: withHoverView ? 'pointer' : undefined,
						} }
						initial="start"
						animate={
							( isHovered || isFocused ) &&
							! disableMotion &&
							label
								? 'hover'
								: 'start'
						}
					>
						<motion.div
							variants={ firstFrame }
							style={ {
								height: '100%',
								overflow: 'hidden',
							} }
						>
							<HStack
								spacing={ 10 * ratio }
								justify="center"
								style={ {
									height: '100%',
									overflow: 'hidden',
								} }
							>
								{ highlightedColors.map(
									( { slug, color }, index ) => (
										<motion.div
											key={ slug }
											style={ {
												boxShadow:
													'inset 0 0 0 1px #0003',
												height:
													normalizedColorSwatchSize *
													ratio,
												width:
													normalizedColorSwatchSize *
													ratio,
												background: color,
												borderRadius:
													( normalizedColorSwatchSize *
														ratio ) /
													2,
											} }
											animate={ {
												scale: 1,
												opacity: 1,
											} }
											initial={ {
												scale: 0.1,
												opacity: 0,
											} }
											transition={ {
												delay: index === 1 ? 0.2 : 0.1,
											} }
										/>
									)
								) }
							</HStack>
						</motion.div>
					</motion.div>
				</Iframe>
			) }
		</>
	);
};

export default StylesPreviewColors;
