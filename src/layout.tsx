/* @refresh reload */
import * as Solid from "solid-js"
import * as SolidWeb from "solid-js/web"

import * as u from "./utils"

import { css } from "./styled"

////////////////////////////////////////////////////////////////////////////////

export type GrowProps = {
	as?: string | Solid.Component<{
		class?:    string
		children?: Solid.JSXElement
	}>
	class?:    string
	children?: Solid.JSXElement
}

export const Grow: Solid.Component<GrowProps> = props => {
	const [currProps, nextProps] =
		Solid.splitProps(props, ["as", "class"])

	return (
		<SolidWeb.Dynamic
			component={currProps.as ?? "div"}
			class={u.cx(
				css(`flex-grow: 1;`, { key: "grow" }),
				currProps.class,
			)}
			{...nextProps}
		>
			{nextProps.children}
		</SolidWeb.Dynamic>
	)
}

export type RowProps = {
	as?: string | Solid.Component<{
		class?:    string
		children?: Solid.JSXElement
	}>
	class?:      string
	center?:     boolean
	"x-center"?: boolean
	"y-center"?: boolean
	gap?:        number
	wrap?:       boolean
	children?:   Solid.JSXElement
}

export const Row: Solid.Component<RowProps> = props => {
	const [currProps, nextProps] =
		Solid.splitProps(props, ["as", "class", "center", "x-center", "y-center", "gap", "wrap"])

	return (
		<SolidWeb.Dynamic
			component={currProps.as ?? "div"}
			class={u.cx(
				css(`
					display: flex;
					flex-direction: row;
					${currProps.center === true ? `
						justify-content: center;
						align-items: center;
					` : ""}
					${currProps["x-center"] === true ? `
						justify-content: center;
					` : ""}
					${currProps["y-center"] === true ? `
						align-items: center;
					` : ""}
					${currProps.gap !== undefined ? `
						gap: ${currProps.gap}px;
					` : ""}
					${currProps.wrap !== undefined ? `
						wrap: ${currProps.wrap === true ? "wrap" : "nowrap"};
					` : ""}
				`, { key: "row" }),
				currProps.class,
			)}
			{...nextProps}
		>
			{nextProps.children}
		</SolidWeb.Dynamic>
	)
}

export type ColProps = {
	as?: string | Solid.Component<{
		class?:    string
		children?: Solid.JSXElement
	}>
	class?:      string
	center?:     boolean
	"x-center"?: boolean
	"y-center"?: boolean
	gap?:        number
	wrap?:       boolean
	children?:   Solid.JSXElement
}

export const Col: Solid.Component<ColProps> = props => {
	const [currProps, nextProps] =
		Solid.splitProps(props, ["as", "center", "x-center", "y-center", "gap", "wrap"])

	return (
		<SolidWeb.Dynamic
			component={currProps.as ?? "div"}
			class={u.cx(
				css(`
					display: flex;
					flex-direction: column;
					${currProps.center === true ? `
						justify-content: center;
						align-items: center;
					` : ""}
					${currProps["x-center"] === true ? `
						align-items: center;
					` : ""}
					${currProps["y-center"] === true ? `
						justify-content: center;
					` : ""}
					${currProps.gap !== undefined ? `
						gap: ${currProps.gap}px;
					` : ""}
					${currProps.wrap !== undefined ? `
						wrap: ${currProps.wrap === true ? "wrap" : "nowrap"};
					` : ""}
				`, { key: "col" }),
			)}
			{...nextProps}
		>
			{nextProps.children}
		</SolidWeb.Dynamic>
	)
}
