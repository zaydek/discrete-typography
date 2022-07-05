export function round(n: number, fixed: number = 4) {
	return +n.toFixed(fixed)
}

if (import.meta.vitest) {
	const { expect, it: test } = import.meta.vitest
	test("round", () => {
		expect(round(-1)).toBe(-1)
		expect(round(-0.5)).toBe(-0.5)
		expect(round(-0.25)).toBe(-0.25)
		expect(round(-0.125)).toBe(-0.125)
		expect(round(-0.0625)).toBe(-0.0625)
		expect(round(-0.03125)).toBe(-0.0313)

		expect(round(1)).toBe(1)
		expect(round(0.5)).toBe(0.5)
		expect(round(0.25)).toBe(0.25)
		expect(round(0.125)).toBe(0.125)
		expect(round(0.0625)).toBe(0.0625)
		expect(round(0.03125)).toBe(0.0313)
	})
}
