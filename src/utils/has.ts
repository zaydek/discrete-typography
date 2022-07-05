export function has(arg: any) {
	return arg !== undefined &&
		arg !== null && arg !== false
}

// TODO: Rename, the meaning of hasBoolean isn't guessable
export function hasBoolean(arg: any) {
	return arg !== undefined &&
		arg !== null
}

if (import.meta.vitest) {
	const { expect, it: test } = import.meta.vitest
	test("has", () => {
		expect(has(undefined)).toEqual(false)
		expect(has(null)).toEqual(false)
		expect(has(false)).toEqual(false)
		expect(has(true)).toEqual(true)
		expect(has(1)).toEqual(true)
		expect(has("Hello, world!")).toEqual(true)
	})

	test("hasBoolean", () => {
		expect(hasBoolean(undefined)).toEqual(false)
		expect(hasBoolean(null)).toEqual(false)
		expect(hasBoolean(false)).toEqual(true)
		expect(hasBoolean(true)).toEqual(true)
		expect(hasBoolean(1)).toEqual(true)
		expect(hasBoolean("Hello, world!")).toEqual(true)
	})
}
