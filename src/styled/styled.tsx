import * as Solid from "solid-js"
import * as SolidWeb from "solid-js/web"

import * as u from "../utils"

import { globalStylesheet } from "./stylesheet"

////////////////////////////////////////////////////////////////////////////////

type As = string | Solid.Component<{ class?: string }>

type StyledComponent = Solid.Component<
	{ as?: As, class?: string } &
	Solid.JSX.IntrinsicElements[keyof Solid.JSX.IntrinsicElements]
> & { cssId(): string }

export function styled(as: As) {
	return (rawOrFn: string | Solid.Accessor<string>, { key }: { key: null | string } = { key: null }) => {
		const { cssId, raw } = globalStylesheet.append(rawOrFn, { key })
		const [getCssId, setCssId] = Solid.createSignal(cssId)
		const [getRaw, setRaw] = Solid.createSignal(raw)

		const comp: StyledComponent = props => {
			const [currProps, nextProps] =
				Solid.splitProps(props, ["as", "class"])

			Solid.createEffect(
				Solid.on(u.wrap(rawOrFn), () => {
					const { cssId, raw } = globalStylesheet.append(rawOrFn, { key })
					Solid.batch(() => {
						setCssId(cssId)
						setRaw(raw)
					})
				}, { defer: true }),
			)

			return (
				<SolidWeb.Dynamic
					component={currProps.as ?? as}
					class={u.cx(
						getCssId(),
						currProps.class,
					)}
					{...nextProps}
				>
					{nextProps.children}
				</SolidWeb.Dynamic>
			)
		}
		comp.toString = getRaw
		comp.cssId = () => `.${getCssId()}`
		return comp
	}
}

// E.g. keyof Solid.JSX.IntrinsicElements
styled.a = styled("a")
styled.abbr = styled("abbr")
styled.address = styled("address")
styled.area = styled("area")
styled.article = styled("article")
styled.aside = styled("aside")
styled.audio = styled("audio")
styled.b = styled("b")
styled.base = styled("base")
styled.bdi = styled("bdi")
styled.bdo = styled("bdo")
styled.big = styled("big")
styled.blockquote = styled("blockquote")
styled.body = styled("body")
styled.br = styled("br")
styled.button = styled("button")
styled.canvas = styled("canvas")
styled.caption = styled("caption")
styled.cite = styled("cite")
styled.code = styled("code")
styled.col = styled("col")
styled.colgroup = styled("colgroup")
styled.data = styled("data")
styled.datalist = styled("datalist")
styled.dd = styled("dd")
styled.del = styled("del")
styled.details = styled("details")
styled.dfn = styled("dfn")
styled.dialog = styled("dialog")
styled.div = styled("div")
styled.dl = styled("dl")
styled.dt = styled("dt")
styled.em = styled("em")
styled.embed = styled("embed")
styled.fieldset = styled("fieldset")
styled.figcaption = styled("figcaption")
styled.figure = styled("figure")
styled.footer = styled("footer")
styled.form = styled("form")
styled.h1 = styled("h1")
styled.h2 = styled("h2")
styled.h3 = styled("h3")
styled.h4 = styled("h4")
styled.h5 = styled("h5")
styled.h6 = styled("h6")
styled.head = styled("head")
styled.header = styled("header")
styled.hgroup = styled("hgroup")
styled.hr = styled("hr")
styled.html = styled("html")
styled.i = styled("i")
styled.iframe = styled("iframe")
styled.img = styled("img")
styled.input = styled("input")
styled.ins = styled("ins")
styled.kbd = styled("kbd")
styled.keygen = styled("keygen")
styled.label = styled("label")
styled.legend = styled("legend")
styled.li = styled("li")
styled.link = styled("link")
styled.main = styled("main")
styled.map = styled("map")
styled.mark = styled("mark")
styled.menu = styled("menu")
styled.menuitem = styled("menuitem")
styled.meta = styled("meta")
styled.meter = styled("meter")
styled.nav = styled("nav")
styled.noindex = styled("noindex")
styled.noscript = styled("noscript")
styled.object = styled("object")
styled.ol = styled("ol")
styled.optgroup = styled("optgroup")
styled.option = styled("option")
styled.output = styled("output")
styled.p = styled("p")
styled.param = styled("param")
styled.picture = styled("picture")
styled.pre = styled("pre")
styled.progress = styled("progress")
styled.q = styled("q")
styled.rp = styled("rp")
styled.rt = styled("rt")
styled.ruby = styled("ruby")
styled.s = styled("s")
styled.samp = styled("samp")
styled.script = styled("script")
styled.section = styled("section")
styled.select = styled("select")
styled.slot = styled("slot")
styled.small = styled("small")
styled.source = styled("source")
styled.span = styled("span")
styled.strong = styled("strong")
styled.style = styled("style")
styled.sub = styled("sub")
styled.summary = styled("summary")
styled.sup = styled("sup")
styled.table = styled("table")
styled.tbody = styled("tbody")
styled.td = styled("td")
styled.textarea = styled("textarea")
styled.tfoot = styled("tfoot")
styled.th = styled("th")
styled.thead = styled("thead")
styled.time = styled("time")
styled.title = styled("title")
styled.tr = styled("tr")
styled.track = styled("track")
styled.u = styled("u")
styled.ul = styled("ul")
styled.var = styled("var")
styled.video = styled("video")
styled.wbr = styled("wbr")
styled.svg = styled("svg")
styled.animate = styled("animate")
styled.animateMotion = styled("animateMotion")
styled.animateTransform = styled("animateTransform")
styled.circle = styled("circle")
styled.clipPath = styled("clipPath")
styled.defs = styled("defs")
styled.desc = styled("desc")
styled.ellipse = styled("ellipse")
styled.feBlend = styled("feBlend")
styled.feColorMatrix = styled("feColorMatrix")
styled.feComponentTransfer = styled("feComponentTransfer")
styled.feComposite = styled("feComposite")
styled.feConvolveMatrix = styled("feConvolveMatrix")
styled.feDiffuseLighting = styled("feDiffuseLighting")
styled.feDisplacementMap = styled("feDisplacementMap")
styled.feDistantLight = styled("feDistantLight")
styled.feFlood = styled("feFlood")
styled.feFuncA = styled("feFuncA")
styled.feFuncB = styled("feFuncB")
styled.feFuncG = styled("feFuncG")
styled.feFuncR = styled("feFuncR")
styled.feGaussianBlur = styled("feGaussianBlur")
styled.feImage = styled("feImage")
styled.feMerge = styled("feMerge")
styled.feMergeNode = styled("feMergeNode")
styled.feMorphology = styled("feMorphology")
styled.feOffset = styled("feOffset")
styled.fePointLight = styled("fePointLight")
styled.feSpecularLighting = styled("feSpecularLighting")
styled.feSpotLight = styled("feSpotLight")
styled.feTile = styled("feTile")
styled.feTurbulence = styled("feTurbulence")
styled.filter = styled("filter")
styled.foreignObject = styled("foreignObject")
styled.g = styled("g")
styled.image = styled("image")
styled.line = styled("line")
styled.linearGradient = styled("linearGradient")
styled.marker = styled("marker")
styled.mask = styled("mask")
styled.metadata = styled("metadata")
styled.path = styled("path")
styled.pattern = styled("pattern")
styled.polygon = styled("polygon")
styled.polyline = styled("polyline")
styled.radialGradient = styled("radialGradient")
styled.rect = styled("rect")
styled.stop = styled("stop")
styled.switch = styled("switch")
styled.symbol = styled("symbol")
styled.text = styled("text")
styled.textPath = styled("textPath")
styled.tspan = styled("tspan")
styled.use = styled("use")
styled.view = styled("view")
