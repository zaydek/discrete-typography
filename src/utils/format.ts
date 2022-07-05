export function detab(str: string) {
	const strs = str.split("\n")
	let startIndex = 0
	for (; startIndex < strs.length; startIndex++) {
		if (strs[startIndex].trim() !== "") {
			break
		}
	}
	let endIndex = strs.length - 1
	for (; endIndex >= 0; endIndex--) {
		if (strs[endIndex].trim() !== "") {
			break
		}
	}
	const substrs = strs.slice(startIndex, endIndex + 1)
	const tabCounts = []
	for (const substr of substrs) {
		let tabCount = 0
		for (; tabCount < substr.length; tabCount++) {
			if (substr[tabCount] !== "\t") {
				tabCounts.push(tabCount)
				break
			}
		}
	}
	const tabCount = Math.min(...tabCounts)
	return substrs
		.map(str => str.slice(tabCount))
		.join("\n")
}

export function tab(str: string, count: number) {
	return str
		.split("\n")
		.map(line => line === ""
			? line                               // No-op
			: `${"\t".repeat(count)}${line}`, // Add tabs
		)
		.join("\n")
}

// Removes // ... and /* ... */ comments
export function decomment(str: string) {
	return str
		.replace(/\n?\t*\/\/.*/g, "")                // E.g. // ...
		.replace(/\n?\t*\/\*(?:\n?.*?)*?\*\//gm, "") // E.g. /* ... */
}

export function format(str: string) {
	return detab(decomment(str))
}

if (import.meta.vitest) {
	const { expect, it: test } = import.meta.vitest
	test("detab", () => {
		expect(detab(`Hello, world!`)).toBe("Hello, world!")
		expect(detab(`
Hello, world!
`)).toBe("Hello, world!")
		expect(detab(`
	Hello, world!
`)).toBe("Hello, world!")
		expect(detab(`
		Hello, world!
`)).toBe("Hello, world!")
		expect(detab(`
			Hello, world!
`)).toBe("Hello, world!")
		expect(detab(`
			Hello, world!
			Hello, world!
`)).toBe("Hello, world!\nHello, world!")
		expect(detab(`
			Hello, world!
			Hello, world!

			Hello, world!
			Hello, world!
`)).toBe("Hello, world!\nHello, world!\n\nHello, world!\nHello, world!")
		expect(detab(`

			Hello, world!
			Hello, world!

			Hello, world!
			Hello, world!

`)).toBe("Hello, world!\nHello, world!\n\nHello, world!\nHello, world!")
	})

	test("tab", () => {
		expect(tab("Hello, world!", 0)).toBe("Hello, world!")
		expect(tab("Hello, world!", 1)).toBe("\tHello, world!")
		expect(tab("Hello, world!", 2)).toBe("\t\tHello, world!")
		expect(tab("Hello, world!", 3)).toBe("\t\t\tHello, world!")
		expect(tab(`
Hello, world!
`, 0)).toBe("\nHello, world!\n")
		expect(tab(`
Hello, world!
`, 1)).toBe("\n\tHello, world!\n")
		expect(tab(`
	Hello, world!
`, 1)).toBe("\n\t\tHello, world!\n")
		expect(tab(`
		Hello, world!
`, 1)).toBe("\n\t\t\tHello, world!\n")
		expect(tab(`
			Hello, world!
`, 1)).toBe("\n\t\t\t\tHello, world!\n")
		expect(tab(`
			Hello, world!
			Hello, world!
`, 1)).toBe("\n\t\t\t\tHello, world!\n\t\t\t\tHello, world!\n")
		expect(tab(`
			Hello, world!
			Hello, world!

			Hello, world!
			Hello, world!
`, 1)).toBe("\n\t\t\t\tHello, world!\n\t\t\t\tHello, world!\n\n\t\t\t\tHello, world!\n\t\t\t\tHello, world!\n")
		expect(tab(`

			Hello, world!
			Hello, world!

			Hello, world!
			Hello, world!

`, 1)).toBe("\n\n\t\t\t\tHello, world!\n\t\t\t\tHello, world!\n\n\t\t\t\tHello, world!\n\t\t\t\tHello, world!\n\n")
	})

	test("decomment", () => {
		expect(decomment(`console.log("Hello, world!)`)).toBe(`console.log("Hello, world!)`)
		expect(decomment(`console.log("Hello, world!) // FIXME`)).toBe(`console.log("Hello, world!) `)
		expect(decomment(`console.log("Hello, world!) /* FIXME */`)).toBe(`console.log("Hello, world!) `)
		expect(decomment(`/* FIXME */ console.log("Hello, world!)`)).toBe(` console.log("Hello, world!)`)
	})
}
