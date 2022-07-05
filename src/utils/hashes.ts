export const BASE_26 =
	"abcdefghijklmnopqrstuvwxyz"

export const BASE_52 =
	"abcdefghijklmnopqrstuvwxyz" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const BASE_62 =
	"abcdefghijklmnopqrstuvwxyz" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
	"0123456789"

export function hash({ base, length }: { base: string, length: number }) {
	let hash = ""
	for (let x = 0; x < length; x++) {
		hash += base[Math.floor(Math.random() * base.length)]
	}
	return hash
}

function _seedHash({ seed, base }: { seed: number, base: string }) {
	let hash = ""
	while (seed > 0) {
		hash = base[seed % base.length] + hash
		seed = Math.floor(seed / base.length)
	}
	return hash
}

export function seedHash({ seed, base, padStart }: { seed: number, base: string, padStart: number }) {
	return _seedHash({ seed: seed++, base })
		.padStart(padStart, base[0])
}

if (import.meta.vitest) {
	const { expect, it: test } = import.meta.vitest
	test("seedHash", () => {
		let seed = 0
		function createId() {
			return seedHash({ seed: seed++, base: BASE_26, padStart: 2 })
		}
		expect(createId()).toBe("aa")
		expect(createId()).toBe("ab")
		expect(createId()).toBe("ac")
		expect(createId()).toBe("ad")
		expect(createId()).toBe("ae")
		expect(createId()).toBe("af")
		expect(createId()).toBe("ag")
		expect(createId()).toBe("ah")
		expect(createId()).toBe("ai")
		expect(createId()).toBe("aj")
		expect(createId()).toBe("ak")
		expect(createId()).toBe("al")
		expect(createId()).toBe("am")
		expect(createId()).toBe("an")
		expect(createId()).toBe("ao")
		expect(createId()).toBe("ap")
		expect(createId()).toBe("aq")
		expect(createId()).toBe("ar")
		expect(createId()).toBe("as")
		expect(createId()).toBe("at")
		expect(createId()).toBe("au")
		expect(createId()).toBe("av")
		expect(createId()).toBe("aw")
		expect(createId()).toBe("ax")
		expect(createId()).toBe("ay")
		expect(createId()).toBe("az")
		expect(createId()).toBe("ba")
		expect(createId()).toBe("bb")
		expect(createId()).toBe("bc")
		expect(createId()).toBe("bd")
		expect(createId()).toBe("be")
		expect(createId()).toBe("bf")
		expect(createId()).toBe("bg")
		expect(createId()).toBe("bh")
		expect(createId()).toBe("bi")
		expect(createId()).toBe("bj")
		expect(createId()).toBe("bk")
		expect(createId()).toBe("bl")
		expect(createId()).toBe("bm")
		expect(createId()).toBe("bn")
		expect(createId()).toBe("bo")
		expect(createId()).toBe("bp")
		expect(createId()).toBe("bq")
		expect(createId()).toBe("br")
		expect(createId()).toBe("bs")
		expect(createId()).toBe("bt")
		expect(createId()).toBe("bu")
		expect(createId()).toBe("bv")
		expect(createId()).toBe("bw")
		expect(createId()).toBe("bx")
		expect(createId()).toBe("by")
		expect(createId()).toBe("bz")
	})
}
