import React from 'react'
import { ProgressingProps } from './Types'

export function Progressing({ pageLoader, size, theme, styles, fillColor }: ProgressingProps): JSX.Element {
    const loaderSize = size ? `${size}px` : pageLoader ? '48px' : '20px'
    return (
        <div className={`loader ${theme || 'default'}-background`} style={styles} data-testid="progressing">
            <div style={{ width: loaderSize, height: loaderSize }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="loader__svg">
                    <g fill="none" fillRule="evenodd" strokeLinecap="round">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            dur="0.5s"
                            from="0 12 12"
                            repeatCount="indefinite"
                            to="360 12 12"
                            type="rotate"
                        />
                        <path
                            fill={fillColor || '#06C'}
                            fillRule="nonzero"
                            d="M12 2.5A9.5 9.5 0 1 1 2.5 12a1.5 1.5 0 0 1 3 0A6.5 6.5 0 1 0 12 5.5a1.5 1.5 0 0 1 0-3z"
                        />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export function DetailsProgressing({
    loadingText,
    size = 24,
    fullHeight = false,
    styles,
    fillColor,
    children,
}: ProgressingProps): JSX.Element {
    return (
        <div
            className={`details-loader bcn-0 flex column fs-14 fw-6 ${fullHeight ? 'h-100' : 'details-loader-height'}`}
            style={styles}
            data-testid="details-progressing"
        >
            <span style={{ width: `${size}px`, height: `${size}px` }}>
                <Progressing size={size} fillColor={fillColor} />
            </span>
            {loadingText && <span className="mt-10">{loadingText}</span>}
            {children}
        </div>
    )
}
