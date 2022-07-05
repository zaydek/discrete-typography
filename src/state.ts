import * as Solid from "solid-js"

////////////////////////////////////////////////////////////////////////////////

function sum(...ns: number[]) {
	return ns.reduce((acc, n) => acc += n, 0)
}

export const [input, setInput] = Solid.createSignal("Hello, world!")
export const [fontWeight, setFontWeight] = Solid.createSignal(400)
export const [fontSize, setFontSize] = Solid.createSignal(64)
export const [fontFamily, setFontFamily] = Solid.createSignal("BlinkMacSystemFont")

// Should be able to be an abstract number (e.g. percentage) or a pixel
export const [lineHeight, setLineHeight] = Solid.createSignal(1)

export const [segments, setSegments] = Solid.createSignal([0, 0, 0, 0])

// Scale such that font-size === bounding box
export const scale = () => fontSize() / segments()[1]

// Scaled font-size
export const scaledFontSize = () => fontSize() * scale()

// Scaled bounding box
export const scaledBoundingBox = () => sum(...scaledSegments())

// Scaled segments (e.g. ascender / descender metrics)
export const scaledSegments = () => segments().map(segment => segment * scale())

export const beforeMarginBottomEm = () => {
	const defaultSpacing = (scaledBoundingBox() - fontSize() * lineHeight()) / 2
	const ascenderGap = scaledSegments()[0]
	return (defaultSpacing - ascenderGap) / scaledFontSize()
}

export const afterMarginTopEm = () => {
	const defaultSpacing = (scaledBoundingBox() - fontSize() * lineHeight()) / 2
	const descender = (scaledSegments()[2] + scaledSegments()[3])
	return (defaultSpacing - descender) / scaledFontSize()
}
