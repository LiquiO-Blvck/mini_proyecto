import React, { FC, HTMLAttributes, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import Icon from '../../icon/Icon';
import useAsideStatus from '../../../hooks/useAsideStatus';
import useDomRect from '../../../hooks/useDomRect';
import { useAppSelector } from '../../../store';
import { RootState } from '../../../store/rootReducer';

interface IHeaderLeftProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}
export const HeaderLeft: FC<IHeaderLeftProps> = (props) => {
	const { children, className, ...rest } = props;

	const { asideStatus, setAsideStatus } = useAsideStatus();

	return (
		<div
			data-component-name='Header/HeaderLeft'
			className={classNames(
				'flex items-center gap-4',
				'ltr:md:mr-auto rtl:md:ml-auto',
				className,
			)}
			{...rest}>
			<button
				type='button'
				aria-label='Toggle Aside Menu'
				onClick={() => setAsideStatus(!asideStatus)}
				className='flex h-12 w-12 items-center justify-center md:hidden'>
				<Icon
					icon={asideStatus ? 'HeroBars3BottomLeft' : 'HeroBars3'}
					className='text-2xl'
				/>
			</button>
			{children}
		</div>
	);
};
HeaderLeft.defaultProps = {
	className: undefined,
};
HeaderLeft.displayName = 'HeaderLeft';

interface IHeaderRightProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}
export const HeaderRight: FC<IHeaderRightProps> = (props) => {
	const { children, className, ...rest } = props;

	return (
		<div
			data-component-name='Header/HeaderRight'
			className={classNames(
				'flex items-center gap-4',
				'ltr:md:ml-auto rtl:md:mr-auto',
				className,
			)}
			{...rest}>
			{children}
		</div>
	);
};
HeaderRight.defaultProps = {
	className: undefined,
};
HeaderRight.displayName = 'HeaderRight';

interface IHeaderProps {
	children: ReactNode;
	className?: string;
}
const Header: FC<IHeaderProps> = (props) => {
	const { children, className, ...rest } = props;

	const divRef = useRef<HTMLDivElement>(null);
	const [domRect] = useDomRect(divRef);
	const { colorApp } = useAppSelector((state: RootState) => state.auth.user)
	const { configuracion } = useAppSelector((state: RootState) => state.auth.user)
	


	const colorMap: Record<string, string> = {
		cyan: 'dark:bg-cyan-900',
		red: 'dark:bg-red-900',
		violet: 'dark:bg-violet-900',
		amber: 'dark:bg-amber-900',
		emerald: 'dark:bg-emerald-900',
		default: 'dark:bg-zinc-900'
	};
	const bgClass = colorMap[colorApp!] || colorMap[configuracion?.color_aplicacion!];



	return (
		<>
			<style>{`:root {--header-height: ${domRect?.height || 0}px}`}</style>
			<header
				ref={divRef}
				data-component-name='Header'
				className={classNames(
					'sticky top-0 z-10',
					'flex justify-between gap-4',
					'border-b border-zinc-300/25 bg-white/75',
					'p-6',
					'backdrop-blur-md',
					`dark:border-zinc-800/50  dark:text-white`,
					bgClass,
					className,
				)}
				{...rest}>
				{children}
			</header>
		</>
	);
};
Header.defaultProps = {
	className: undefined,
};
Header.displayName = 'Header';

export default Header;
