import { has } from "./has"
import { unwrap } from "./unwrap"

////////////////////////////////////////////////////////////////////////////////

export function cx(...args: any[]) {
	const concat = args
		.flat()
		.filter(has)
		.map(arg => unwrap(arg))
		.join(" ")
	if (concat === "") { return undefined }
	return concat
}

if (import.meta.vitest) {
	const { expect, it: test } = import.meta.vitest
	test("cx", () => {
		expect(cx()).toEqual(undefined)
		expect(cx("foo")).toEqual("foo")
		expect(cx("foo", "bar")).toEqual("foo bar")
		expect(cx("foo", "bar", undefined)).toEqual("foo bar")
		expect(cx("foo", "bar", null)).toEqual("foo bar")
		expect(cx("foo", "bar", false)).toEqual("foo bar")
		expect(cx("foo", "bar", "baz")).toEqual("foo bar baz")
		expect(cx("foo", "bar", () => "baz")).toEqual("foo bar baz")
		expect(cx("foo", "bar", () => () => "baz")).toEqual("foo bar baz")
		expect(cx("foo", "bar", () => () => () => "baz")).toEqual("foo bar baz")
	})
}
