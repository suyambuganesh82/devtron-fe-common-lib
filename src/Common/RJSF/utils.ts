import { TranslatableString, englishStringTranslator } from '@rjsf/utils'

/**
 * Override for the TranslatableString from RJSF
 */
export const translateString = (stringToTranslate: TranslatableString, params?: string[]): string => {
    switch (stringToTranslate) {
        case TranslatableString.NewStringDefault:
            // Use an empty string for the new additionalProperties string default value
            return ''
        default:
            return englishStringTranslator(stringToTranslate, params)
    }
}

export const getCommonSelectStyle = (styleOverrides = {}) => {
    return {
        menuList: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0,
        }),
        control: (base, state) => ({
            ...base,
            minHeight: '32px',
            boxShadow: 'none',
            backgroundColor: 'var(--N50)',
            border: state.isFocused ? '1px solid var(--B500)' : '1px solid var(--N200)',
            cursor: 'pointer',
        }),
        option: (base, state) => ({
            ...base,
            color: 'var(--N900)',
            backgroundColor: state.isFocused ? 'var(--N100)' : 'white',
            padding: '10px 12px',
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            color: 'var(--N400)',
            padding: '0 8px',
            transition: 'all .2s ease',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0 8px',
            fontWeight: '400',
        }),
        loadingMessage: (base) => ({
            ...base,
            color: 'var(--N600)',
        }),
        noOptionsMessage: (base) => ({
            ...base,
            color: 'var(--N600)',
        }),
        ...styleOverrides,
    }
}

/**
 * Returns the redirection props for a url
 */
export const getRedirectionProps = (
    url: string,
): React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    url: string
} => {
    try {
        const isInternalUrl = new URL(url).origin === window.location.origin
        const redirectionUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
        return {
            href: redirectionUrl,
            target: isInternalUrl ? '_self' : '_blank',
            rel: isInternalUrl ? undefined : 'external noreferrer',
            url,
        }
    } catch (err) {
        return {
            href: '',
            url: `${url} (Invalid URL)`,
        }
    }
}

/**
 * Infers the type for json schema from value type
 */
export const getInferredTypeFromValueType = (value) => {
    const valueType = typeof value

    switch (valueType) {
        case 'boolean':
        case 'string':
        case 'number':
            return valueType
        case 'object':
            if (Array.isArray(value)) {
                return 'array'
            }
            if (value === null) {
                return 'null'
            }
            return valueType
        default:
            // Unsupported or undefined types
            return 'null'
    }
}
