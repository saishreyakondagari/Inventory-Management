
import React from 'react';
import IconButton from '@mui/material/IconButton';
import './style.css';
import { Tooltip, Box } from '@mui/material';

function Icon({
	src,
	status,
	clickHandler,
	type,
	alt,
	disabled,
	placement,
	testId,
	rowType,
	width,
	height,
	padding,
	style,
	title,
	display = 'block',
	margin,
	bgColor = 'transparent',
	backgroundColor = 'transparent',
	borderRadius = '6px',
	border
}) {
	return (
		<Tooltip title={title || ''} placement={placement}>
			<Box
				display={display}
				justifyContent="center"
				sx={{
					margin: margin || 0
				}}
			>
				<IconButton
					sx={{
						'&.MuiButtonBase-root:hover': {
							bgcolor: bgColor,
							borderRadius
						},
						backgroundColor,
						borderRadius,
						border: border || '',
						cursor: type === 'static' ? 'default' : 'pointer',
						padding: rowType === 'experimentRow' ? '0px 3px 0px 3px' : padding
					}}
					size="small"
					onClick={clickHandler}
					disabled={disabled}
					data-testid={testId}
					aria-label={`${alt} button`}
				>
					<img
						src={src}
						className={status}
						alt={alt}
						width={width}
						height={height}
						role="presentation"
						style={style}
					/>
				</IconButton>
			</Box>
		</Tooltip>
	);
}

export default Icon;
