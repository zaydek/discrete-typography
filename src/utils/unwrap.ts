export function wrap(arg: any) {
	return typeof arg === "function"
		? arg
		: () => arg
}

// @ts-expect-error: 'unwrap' implicitly has return type 'any' because it does
// not have a return type annotation and is referenced directly or indirectly in
// one of its return expressions. ts(7023)
//
//// export function unwrap<T>(arg: T): ReturnType<T> {
export function unwrap(arg: any) {
	return typeof arg === "function"
		? unwrap(arg())
		: arg
}

export function unwrapMany(...args: any[]) {
	const args2 = []
	for (const ref of args.flat()) {
		args2.push(unwrap(ref))
	}
	return args2
}

if (import.meta.vitest) {
	const { expect, it: test } = import.meta.vitest
	test("wrap", () => {
		expect(wrap(0)()).toEqual(0)
		expect(wrap(() => 1)()).toEqual(1)
		expect(wrap(() => () => 2)()()).toEqual(2)
	})

	test("unwrap", () => {
		expect(unwrap(0)).toEqual(0)
		expect(unwrap(() => 1)).toEqual(1)
		expect(unwrap(() => () => 2)).toEqual(2)
	})

	test("unwrapMany", () => {
		expect(unwrapMany([0])).toEqual([0])
		expect(unwrapMany([0, () => 1])).toEqual([0, 1])
		expect(unwrapMany([0, () => 1, () => () => 2])).toEqual([0, 1, 2])
	})
}
