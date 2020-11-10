// REACT
import React from 'react'

// ESTILOS
import Styles from './Button.module.scss'

// PROPS
interface ButtonProps {
	text: string
	className?: string
	onClick?: () => any
	outlined?: boolean
	type?: 'button' | 'submit' | 'reset'
	icon?: JSX.Element
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
	return (
		<button
			type={props.type}
			className={`${Styles.button} ${props.outlined ? Styles.outlined : Styles.filled} ${
				props.className
			}`}
			onClick={props.onClick}>
			{props.icon}
			{props.text}
		</button>
	)
}

export default Button
