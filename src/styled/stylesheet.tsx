import * as Solid from "solid-js"
import * as SolidWeb from "solid-js/web"

// @ts-expect-error: Could not find a declaration file for module 'stylis'.
import * as stylis from "stylis"
import * as u from "../utils"

////////////////////////////////////////////////////////////////////////////////

const seedCache: Record<string, number> = {}

function createId(key: null | string) {
	let seed = seedCache["" + key]
	if (seed === undefined) {
		seed = 0
		seedCache["" + key] = seed
	}
	const hash = u.seedHash({
		seed: seedCache["" + key]++,
		base: u.BASE_52,
		padStart: 2,
	})
	return key === null
		? hash
		: `${key}-${hash}`
}

function _createStylesheet(attrs: Record<string, string>) {
	const entry = document.createElement("style")
	for (const key in attrs) {
		entry.setAttribute(key, attrs[key])
	}
	const textNode = document.createTextNode("")
	entry.append(textNode)
	document.head.append(entry)
	return {
		concat(css: string) {
			textNode.data += css
		},
		dispose() {
			entry.remove()
		},
	}
}

function runStylis({ cssId, raw }: { cssId: null | string, raw: string }) {
	if (cssId === null) {
		return stylis.serialize(
			stylis.compile(`
				${u.decomment(raw)}
			`),
			stylis.stringify,
		)
	} else {
		return stylis.serialize(
			stylis.compile(`
				.${cssId} {
					${u.decomment(raw)}
				}
			`),
			stylis.stringify,
		)
	}
}

type SpecCache = Record<string, {
	cssId: string
	raw:   string
	css:   string
}>

function createStylesheet(attrs: Record<string, string>) {
	const sheet = _createStylesheet(attrs)
	const cache: SpecCache = {}

	return {
		append(rawOrFn: string | Solid.Accessor<string>, { key }: { key: null | string } = { key: null }) {
			const raw = u.unwrap(rawOrFn)
			if (raw in cache) {
				return cache[raw]
			} else {
				const cssId = createId(key)
				const css = runStylis({ cssId, raw })
				const spec = {
					cssId, // E.g. ".foo"
					raw,   // E.g. "&:hover    { bar: baz; }"
					css,   // E.g. ".foo:hover { bar: baz; }"
				}
				cache[raw] = spec
				sheet.concat(css)
				return spec
			}
		},
		dispose() {
			sheet.dispose()
		},
	}
}

export const globalStylesheet = createStylesheet({ type: "text/css" })

export function css(rawOrFn: string | Solid.Accessor<string>, { key }: { key: null | string } = { key: null }) {
	return globalStylesheet.append(rawOrFn, { key }).cssId
}

export const Stylesheet: Solid.Component<{ id?: string, class?: string, children: string }> = props => {
	const entry = document.createElement("style")
	entry.setAttribute("type", "text/css")
	document.head.append(entry)
	const dispose = SolidWeb.render(() => (
		<>
			{runStylis({
				cssId: null,
				raw: props.children,
			})}
		</>
	), entry)
	Solid.onCleanup(() => {
		dispose()
		entry.remove()
	})
	return null
}
