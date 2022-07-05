/* @refresh reload */
import "./reset.scss"
import "./index.scss"

import * as Solid from "solid-js"
import * as SolidWeb from "solid-js/web"

import * as input from "./input"
import * as layout from "./layout"
import * as state from "./state"
import * as u from "./utils"

import { css, styled } from "./styled"

////////////////////////////////////////////////////////////////////////////////

const CANVAS_W = 600
const CANVAS_H = 300

const Canvas: Solid.Component<{ class?: string }> = props => {
	const [currProps, nextProps] =
		Solid.splitProps(props, ["class"])

	const [canvasRef, setCanvasRef] = Solid.createSignal<null | HTMLCanvasElement>(null)

	// https://github.com/component/autoscale-canvas/blob/master/index.js
	Solid.onMount(() => {
		const canvas = canvasRef()!
		const ctx = canvas.getContext("2d")!
		canvas.width = CANVAS_W * devicePixelRatio
		canvas.height = CANVAS_H * devicePixelRatio
		canvas.style.width = `${CANVAS_W}px`
		canvas.style.height = `${CANVAS_H}px`
		ctx.scale(devicePixelRatio, devicePixelRatio)
	})

	Solid.createEffect(
		Solid.on([state.input, state.fontWeight, state.fontSize, state.fontFamily, state.lineHeight], () => {
			const canvas = canvasRef()!
			const ctx = canvas.getContext("2d")!

			ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
			ctx.beginPath()
			ctx.font = `${state.fontWeight()} ${state.fontSize()}px ${state.fontFamily().includes(" ") ? `'${state.fontFamily()}'` : state.fontFamily()}`

			// Don't bother with x-axis offsets because of wrapping text
			const metrics = ctx.measureText(state.input())
			const w = metrics.actualBoundingBoxRight

			// ··········· <- a
			// Handgloves· <- b
			// ····^······ <- c
			// ··········· <- d
			//
			const a = metrics.fontBoundingBoxAscent - metrics.actualBoundingBoxAscent
			const b = metrics.fontBoundingBoxAscent -
				(metrics.fontBoundingBoxAscent - metrics.actualBoundingBoxAscent)
			const c = metrics.actualBoundingBoxDescent
			const d = metrics.fontBoundingBoxDescent - metrics.actualBoundingBoxDescent

			ctx.fillStyle = `hsl(${0 * 90}deg 100% 50% / 40%)`
			ctx.fillRect(0, 0, w, a)

			ctx.fillStyle = `hsl(${1 * 90}deg 100% 50% / 40%)`
			ctx.fillRect(0, a, w, b)

			ctx.fillStyle = `hsl(${2 * 90}deg 100% 50% / 40%)`
			ctx.fillRect(0, a + b, w, c)

			ctx.fillStyle = `hsl(${3 * 90}deg 100% 50% / 40%)`
			ctx.fillRect(0, a + b + c, w, d)

			ctx.fillStyle = "hsl(0deg 0% 0%)"
			ctx.fillText(state.input(), 0, metrics.fontBoundingBoxAscent)

			state.setSegments([a, b, c, d])
		})
	)

	return (
		<canvas
			ref={setCanvasRef}
			class={u.cx(
				css(`
					width:  ${CANVAS_W};
					height: ${CANVAS_H};

					// DEBUG
					outline: 1px solid blue;
				`),
				currProps.class,
			)}
			{...nextProps}
		/>
	)
}

////////////////////////////////////////////////////////////////////////////////

const FixedTR = styled.div(`
	position: fixed;
	top: 16px;
	right: 16px;
	z-index: 50;
	pointer-events: none;
	& > * { pointer-events: auto; }
`)

const FixedBL = styled.div(`
	position: fixed;
	bottom: 16px;
	left: 16px;
	z-index: 50;
	pointer-events: none;
	& > * { pointer-events: auto; }
`)

const Card = styled.div(`
	padding: 24px;
	width: 480px;
	background-color: hsl(0deg 0% 100%);
	border-radius: 24px;
	box-shadow: 0 0 0 1px hsl(0deg 0% 0% / 15%);
`)

const HeroText = styled.div(() => `
	&::before {
		content: "";
		margin-bottom: ${u.round(state.beforeMarginBottomEm())}em;
		display: table;
	}
	&::after {
		content: "";
		margin-top: ${u.round(state.afterMarginTopEm())}em;
		display: table;
	}
	font: ${state.fontWeight()} ${u.round(state.scaledFontSize())}px /
		${u.round(state.fontSize() * state.lineHeight())}px ${state.fontFamily().includes(" ") ? `'${state.fontFamily()}'` : state.fontFamily()};

	// DEBUG
	color: hsl(0deg 0% 0% / 25%);
	outline: 1px solid red;
`, { key: "hero" })

const Code = styled.code(`
	tab-size: 2;
	font: 15px / normal
		Consolas,
		var(--mono);
`)

const Typography = styled.div(`
	* + * {
		margin-top: calc(16px * 1.4 / 2);
	}
	h1 {
		font: 600 24px / 1.2
			BlinkMacSystemFont,
			var(--sans);
	}
	p {
		font: 400 16px / 1.4
			BlinkMacSystemFont,
			var(--sans);
	}
	code {
		padding: 2px 6px;
		tab-size: 2;
		font: 15px / normal
			Consolas,
			var(--mono);
		color: hsl(240deg 100% 40%);
		border-radius: 4px;
		box-shadow: 0 0 0 1px hsl(0deg 0% 80%);
	}
`)

const Red = styled.span(`
	padding: 0px 6px;
	color: hsl(0deg 100% 35%);
	background-color: hsl(0deg 100% 35% / 10%);
	border-radius: 9999px;
	box-shadow: 0 0 0 1px hsl(0deg 100% 35% / 25%);
`)

const Green = styled.span(`
	padding: 0px 6px;
	color: hsl(120deg 100% ${35 - 15}%);
	background-color: hsl(120deg 100% 35% / 10%);
	border-radius: 9999px;
	box-shadow: 0 0 0 1px hsl(120deg 100% ${35 - 15}% / 25%);
`)

const Blue = styled.span(`
	padding: 0px 6px;
	color: hsl(240deg 100% 35%);
	background-color: hsl(240deg 100% 35% / 10%);
	border-radius: 9999px;
	box-shadow: 0 0 0 1px hsl(240deg 100% 35% / 25%);
`)

const Purple = styled.span(`
	padding: 0px 6px;
	color: hsl(280deg 100% ${35 - 15}%);
	background-color: hsl(280deg 100% 35% / 10%);
	border-radius: 9999px;
	box-shadow: 0 0 0 1px hsl(280deg 100% ${35 - 15}% / 25%);
`)

const Label = styled.label(`
	flex-shrink: 0;
	width: 96px;
`)

const LabelGap = styled.div(`
	flex-shrink: 0;
	width: 64px;
`)

const App: Solid.Component = () => {
	return (
		<>
			<FixedTR>
				<Card>
					<Typography>
						<h1>What is this?</h1>
						<p>This is an experimental tool inspired by <a href="https://seek-oss.github.io/capsize" target="_blank">Capsize</a>. Capsize allows you to scale a font’s <code>font-size</code> such that the drawn font is flush with the font’s bounding box.</p>
						<p>Whereas Capsize uses <a href="https://docs.microsoft.com/en-us/typography/opentype/spec/os2" target="_blank">OS/2</a> metrics which are hard-coded and inflexible, this tool uses a <code>{"<canvas>"}</code> element and the <a href="https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics" target="_blank"><code>TextMetrics</code></a> API to draw and precisely measure <code>x-height</code> and <code>cap-height</code> on a per-character basis.</p>
						<p>On the <code>{"<canvas>"}</code> element, the ascender gap is drawn <Red>red</Red>, the ascender is drawn <Green>green</Green>, the descender is drawn <Blue>blue</Blue>, and the descender gap is drawn <Purple>purple</Purple>.</p>
						<ul class={css(`margin-left: 2ch;`)}>
							<li>The <Red>ascender gap</Red> measures from the top of the bounding box to the top of a drawn character</li>
							<li>The <Green>ascender</Green> measures from the top of a drawn character to the baseline</li>
							<li>The <Blue>descender</Blue> measures from the baseline to the bottom of a drawn character</li>
							<li>The <Purple>descender gap</Purple> measures from the bottom of a drawn character to the bottom of the bounding box</li>
						</ul>
						<p>Therefore the <Green>ascender</Green>-height of an <code>'x'</code> is the <code>x-height</code> and the <Green>ascender</Green>-height of an <code>'X'</code> is the <code>cap-height</code>.</p>
						<p>
							By <a href="https://twitter.com/username_ZAYDEK" target="_blank">@username_ZAYDEK</a><br />
							Repo <a href="https://github.com/zaydek/discrete-typography" target="_blank">github.com/zaydek/discrete-typography</a><br />
							License <a href="https://github.com/zaydek/discrete-typography/blob/main/LICENSE" target="_blank">MIT Open Source</a>
						</p>
					</Typography>
				</Card>
			</FixedTR>

			<FixedBL>
				<Card>
					<layout.Col gap={16 - 4}>
						<layout.Row center gap={16}>
							<Label>
								Input
							</Label>
							<layout.Grow
								as={input.TypeTextInput}
								class={css(`
									padding: 4px 0;
									box-shadow: 0 1px 0 0 hsl(240deg 0% 50%);
									&:focus {
										outline: unset; // Reset
										box-shadow: 0 1px 0 0 hsl(240deg 100% 50%);
									}
								`, { key: "reset" })}
							/>
							<LabelGap />
						</layout.Row>
						<layout.Row center gap={16}>
							<Label>
								Font Weight
							</Label>
							<layout.Grow as={input.TypeRangeFontWeight} />
							<LabelGap
								as={input.TypeNumberFontWeight}
								class={css(`
									padding: 4px 0;
									box-shadow: 0 1px 0 0 hsl(240deg 0% 50%);
									&:focus {
										outline: unset; // Reset
										box-shadow: 0 1px 0 0 hsl(240deg 100% 50%);
									}
								`, { key: "reset" })}
							/>
						</layout.Row>
						<layout.Row center gap={16}>
							<Label>
								Font Size
							</Label>
							<layout.Grow as={input.TypeRangeFontSize} />
							<LabelGap
								as={input.TypeNumberFontSize}
								class={css(`
									padding: 4px 0;
									box-shadow: 0 1px 0 0 hsl(240deg 0% 50%);
									&:focus {
										outline: unset; // Reset
										box-shadow: 0 1px 0 0 hsl(240deg 100% 50%);
									}
								`, { key: "reset" })}
							/>
						</layout.Row>
						<layout.Row center gap={16}>
							<Label>
								Font Family
							</Label>
							<layout.Grow
								as={input.TypeTextFontFamily}
								class={css(`
									padding: 4px 0;
									box-shadow: 0 1px 0 0 hsl(240deg 0% 50%);
									&:focus {
										outline: unset; // Reset
										box-shadow: 0 1px 0 0 hsl(240deg 100% 50%);
									}
								`, { key: "reset" })}
							/>
							<LabelGap />
						</layout.Row>
						<layout.Row center gap={16}>
							<Label>
								Line Height
							</Label>
							<layout.Grow as={input.TypeRangeLineHeight} />
							<LabelGap
								as={input.TypeNumberLineHeight}
								class={css(`
									padding: 4px 0;
									box-shadow: 0 1px 0 0 hsl(240deg 0% 50%);
									&:focus {
										outline: unset; // Reset
										box-shadow: 0 1px 0 0 hsl(240deg 100% 50%);
									}
								`, { key: "reset" })}
							/>
						</layout.Row>
						<layout.Row center gap={16}>
							<Label>
								Metrics
							</Label>
							<pre class={css(`flex-grow: 1;`)}>
								<Code>
									<Solid.Show when={state.input() !== "" && state.fontSize() > 0} fallback="">
										{`[` +
											`${u.round(state.segments()[0], 2)}, ` +
											`${u.round(state.segments()[1], 2)}, ` +
											`${u.round(state.segments()[2], 2)}, ` +
											`${u.round(state.segments()[3], 2)}` +
										`]`}
									</Solid.Show>
								</Code>
							</pre>
							<LabelGap />
						</layout.Row>
						{/* Use center={false} (verbose) because of <pre> */}
						<layout.Row center={false} gap={16}>
							<Label>
								CSS
							</Label>
							<pre class={css(`flex-grow: 1; overflow-x: scroll;`)}>
								<Code>
									<Solid.Show when={state.input() !== "" && state.fontSize() > 0} fallback="">
										{u.detab(`
											.typography {
												&::before {
													content: "";
													margin-bottom: ${u.round(state.beforeMarginBottomEm())}em;
													display: table;
												}
												&::after {
													content: "";
													margin-top: ${u.round(state.afterMarginTopEm())}em;
													display: table;
												}
												font: ${state.fontWeight()} ${u.round(state.scaledFontSize())}px /
													${u.round(state.fontSize() * state.lineHeight())}px ${state.fontFamily().includes(" ") ? `'${state.fontFamily()}'` : state.fontFamily()};
											}
										`)}
									</Solid.Show>
								</Code>
							</pre>
							<LabelGap />
						</layout.Row>
					</layout.Col>
				</Card>
			</FixedBL>

			<layout.Row center class={css(`padding: 128px;`)}>
				<div class={css(`position: relative;`)}>
					<Canvas />
					<div class={css(`position: absolute; top: 0; left: 0;`)}>
						<HeroText class={css(`width: ${CANVAS_W}px;`)}>
							{state.input()}
						</HeroText>
					</div>
				</div>
			</layout.Row>
		</>
	)
}

SolidWeb.render(() => <App />, document.getElementById("root")!)
