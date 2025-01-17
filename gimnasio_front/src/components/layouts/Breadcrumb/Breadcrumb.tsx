import React, { FC, HTMLAttributes } from 'react';

interface IBreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
	path?: string;
	currentPage?: string;
}
const Breadcrumb: FC<IBreadcrumbProps> = (props) => {
	const { path, currentPage, ...rest } = props;
	return (
		<div data-component-name='Breadcrumb' {...rest}>
			{path && <div className='text-sm text-zinc-500 dark:text-zinc-300'>{path}</div>}
			{currentPage && <div className='text-lg font-semibold'>{currentPage}</div>}
		</div>
	);
};
Breadcrumb.defaultProps = {
	path: undefined,
	currentPage: undefined,
};

export default Breadcrumb;
