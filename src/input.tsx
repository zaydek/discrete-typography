import * as Solid from "solid-js"

import * as state from "./state"

////////////////////////////////////////////////////////////////////////////////

type InputProps = {
	class?:     string
	autofocus?: boolean
}

export const TypeTextInput: Solid.Component<InputProps> = props => {
	return <input type="text" value={state.input()}
		onInput={e => state.setInput(e.currentTarget.value)}
			{...props} />
}

export const TypeRangeFontWeight: Solid.Component<InputProps> = props => {
	return <input type="range" value={state.fontWeight()} min={100} max={900} step={100}
		onInput={e => state.setFontWeight(+e.currentTarget.value)}
			{...props} />
}

export const TypeNumberFontWeight: Solid.Component<InputProps> = props => {
	return <input type="number" value={state.fontWeight()} min={100} max={900} step={100}
		onInput={e => state.setFontWeight(+e.currentTarget.value)}
			{...props} />
}

export const TypeRangeFontSize: Solid.Component<InputProps> = props => {
	return <input type="range" value={state.fontSize()} min={0} max={200} step={1}
		onInput={e => state.setFontSize(+e.currentTarget.value)}
			{...props} />
}

export const TypeNumberFontSize: Solid.Component<InputProps> = props => {
	return <input type="number" value={state.fontSize()} min={0} max={200} step={1}
		onInput={e => state.setFontSize(+e.currentTarget.value)}
			{...props} />
}

export const TypeTextFontFamily: Solid.Component<InputProps> = props => {
	return <input type="text" value={state.fontFamily()}
		onInput={e => state.setFontFamily(e.currentTarget.value)}
			{...props} />
}

export const TypeRangeLineHeight: Solid.Component<InputProps> = props => {
	return <input type="range" value={state.lineHeight()} min={0} max={4} step={0.05}
		onInput={e => state.setLineHeight(+e.currentTarget.value)}
			{...props} />
}

export const TypeNumberLineHeight: Solid.Component<InputProps> = props => {
	return <input type="number" value={state.lineHeight()} min={0} max={4} step={0.05}
		onInput={e => state.setLineHeight(+e.currentTarget.value)}
			{...props} />
}
