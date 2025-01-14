/**
 * External dependencies
 */
import { render } from 'test/helpers';
import {
	fireGestureHandler,
	getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';
import { State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

/**
 * WordPress dependencies
 */
import { Draggable, DraggableTrigger } from '@wordpress/components';

// Touch event type constants have been extracted from original source code, as they are not exported in the package.
// Reference: https://github.com/software-mansion/react-native-gesture-handler/blob/90895e5f38616a6be256fceec6c6a391cd9ad7c7/src/TouchEventType.ts
const TouchEventType = {
	UNDETERMINED: 0,
	TOUCHES_DOWN: 1,
	TOUCHES_MOVE: 2,
	TOUCHES_UP: 3,
	TOUCHES_CANCELLED: 4,
};

// Reanimated uses "requestAnimationFrame" for notifying shared value updates when using "useAnimatedReaction" hook.
// For testing, we mock the "requestAnimationFrame" so it calls the callback passed instantly.
let requestAnimationFrameCopy;
beforeEach( () => {
	requestAnimationFrameCopy = global.requestAnimationFrame;
	global.requestAnimationFrame = ( callback ) => callback();
} );
afterEach( () => {
	global.requestAnimationFrame = requestAnimationFrameCopy;
} );

describe( 'Draggable', () => {
	it( 'triggers onLongPress handler', () => {
		const triggerId = 'trigger-id';
		const onLongPress = jest.fn();
		const { getByTestId } = render(
			<Draggable>
				<DraggableTrigger
					id={ triggerId }
					enabled
					minDuration={ 500 }
					onLongPress={ onLongPress }
					testID="draggableTrigger"
				>
					<Animated.View />
				</DraggableTrigger>
			</Draggable>
		);

		const draggableTrigger = getByTestId( 'draggableTrigger' );
		fireGestureHandler( draggableTrigger, [
			{ oldState: State.BEGAN, state: State.ACTIVE },
			{ state: State.ACTIVE },
		] );

		expect( onLongPress ).toHaveBeenCalledTimes( 1 );
		expect( onLongPress ).toHaveBeenCalledWith( triggerId );
	} );

	it( 'triggers dragging handlers', () => {
		const triggerId = 'trigger-id';
		const onDragStart = jest.fn();
		const onDragOver = jest.fn();
		const onDragEnd = jest.fn();
		const { getByTestId } = render(
			<Draggable
				onDragStart={ onDragStart }
				onDragOver={ onDragOver }
				onDragEnd={ onDragEnd }
				testID="draggable"
			>
				<DraggableTrigger id={ triggerId } testID="draggableTrigger">
					<Animated.View />
				</DraggableTrigger>
			</Draggable>
		);

		const draggableTrigger = getByTestId( 'draggableTrigger' );
		const draggable = getByGestureTestId( 'draggable' );
		const touchEventId = 1;
		const touchEvents = [
			{ id: touchEventId, x: 0, y: 0 },
			{ id: touchEventId, x: 100, y: 100 },
			{ id: touchEventId, x: 50, y: 50 },
		];
		fireGestureHandler( draggableTrigger, [
			{ oldState: State.BEGAN, state: State.ACTIVE },
			{ state: State.ACTIVE },
		] );
		fireGestureHandler( draggable, [
			// TOUCHES_DOWN event is only received on ACTIVE state, so we have to fire it manually.
			{ oldState: State.BEGAN, state: State.ACTIVE },
			{
				allTouches: [ touchEvents[ 0 ] ],
				eventType: TouchEventType.TOUCHES_DOWN,
			},
			{
				allTouches: [ touchEvents[ 1 ] ],
				eventType: TouchEventType.TOUCHES_MOVE,
			},
			{
				allTouches: [ touchEvents[ 2 ] ],
				eventType: TouchEventType.TOUCHES_MOVE,
			},
			{ state: State.END },
		] );
		// TODO(jest-console): Fix the warning and remove the expect below.
		expect( console ).toHaveWarnedWith(
			'[Reanimated] You can not use setGestureState in non-worklet function.'
		);

		expect( onDragStart ).toHaveBeenCalledTimes( 1 );
		expect( onDragStart ).toHaveBeenCalledWith( {
			id: triggerId,
			x: touchEvents[ 0 ].x,
			y: touchEvents[ 0 ].y,
		} );
		expect( onDragOver ).toHaveBeenCalledTimes( 2 );
		expect( onDragOver ).toHaveBeenNthCalledWith( 1, touchEvents[ 1 ] );
		expect( onDragOver ).toHaveBeenNthCalledWith( 2, touchEvents[ 2 ] );
		expect( onDragEnd ).toHaveBeenCalledTimes( 1 );
		expect( onDragEnd ).toHaveBeenCalledWith( {
			id: triggerId,
			x: touchEvents[ 2 ].x,
			y: touchEvents[ 2 ].y,
		} );
	} );
} );
