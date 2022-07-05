export const isUpper = (ch: string) => ch >= "A" && ch <= "Z"
export const isLower = (ch: string) => ch >= "a" && ch <= "z"
export const isAlpha = (ch: string) => isUpper(ch) || isLower(ch)

function toKebabCase(str: string) {
	let outStr = ""
	for (let x = 0; x < str.length; x++) {
		if (isUpper(str[x]) && x > 0 && isLower(str[x - 1])) {
			outStr += "-" + str[x].toLowerCase()
		} else {
			outStr += str[x].toLowerCase()
		}
	}
	return outStr
}

function toCamelCase(str: string) {
	let outStr = ""
	for (let x = 0; x < str.length; x++) {
		if (str[x] === "-") { continue }
		if (isAlpha(str[x]) && x > 0 && str[x - 1] === "-") {
			outStr += str[x].toUpperCase()
		} else {
			outStr += str[x].toLowerCase()
		}
	}
	return outStr
}

function toTitleCase(str: string) {
	const outStr = toCamelCase(str)
	return outStr.slice(0, 1).toUpperCase() +
		outStr.slice(1)
}

if (import.meta.vitest) {
	const { expect, it: test } = import.meta.vitest
	test("toKebabCase", () => {
		expect(toKebabCase("helloworld")).toBe("helloworld")
		expect(toKebabCase("helloWorld")).toBe("hello-world")
		expect(toKebabCase("Helloworld")).toBe("helloworld")
		expect(toKebabCase("HelloWorld")).toBe("hello-world")
		expect(toKebabCase("HELLOWORLD")).toBe("helloworld")
	})

	test("toCamelCase", () => {
		expect(toCamelCase("helloworld")).toBe("helloworld")
		expect(toCamelCase("hello-world")).toBe("helloWorld")
		expect(toCamelCase("hello--world")).toBe("helloWorld")
		expect(toCamelCase("hello---world")).toBe("helloWorld")
		expect(toCamelCase("-hello---world")).toBe("HelloWorld")
		expect(toCamelCase("--hello---world")).toBe("HelloWorld")
		expect(toCamelCase("---hello---world")).toBe("HelloWorld")
	})

	test("toTitleCase", () => {
		expect(toTitleCase("helloworld")).toBe("Helloworld")
		expect(toTitleCase("hello-world")).toBe("HelloWorld")
		expect(toTitleCase("hello--world")).toBe("HelloWorld")
		expect(toTitleCase("hello---world")).toBe("HelloWorld")
		expect(toTitleCase("-hello---world")).toBe("HelloWorld")
		expect(toTitleCase("--hello---world")).toBe("HelloWorld")
		expect(toTitleCase("---hello---world")).toBe("HelloWorld")
	})
}
