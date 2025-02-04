import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReactComponent as ICClear } from '../../../../assets/icons/ic-error.svg'
import DebouncedSearch from '../DebouncedSearch'

jest.mock('../../helpers/Helpers', () => ({
    useDebouncedEffect: jest.fn().mockImplementation((fn) => fn()),
}))

describe('When DebouncedSearch mounts', () => {
    it('should have a input field', () => {
        render(<DebouncedSearch onSearch={jest.fn()} />)
        expect(screen.getByRole('textbox')).toBeTruthy()
    })

    it('should have a clear icon when clearSearch is true and user has typed something', () => {
        const { getByTestId } = render(<DebouncedSearch onSearch={jest.fn()} clearSearch debounceTimeout={0} />)
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
        expect(getByTestId('clear-search')).toBeTruthy()
    })

    it('should call onSearch when input value changes', () => {
        const onSearch = jest.fn()
        render(<DebouncedSearch onSearch={onSearch} debounceTimeout={0} />)
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
        expect(onSearch).toHaveBeenCalled()
    })

    it('should clear input value when clear icon is clicked', () => {
        const { container } = render(<DebouncedSearch onSearch={jest.fn()} clearSearch debounceTimeout={0} />)
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
        const inputBar = container.querySelector('input')
        expect(inputBar.value).toBe('test')
        fireEvent.click(screen.getByRole('button'))
        expect(inputBar.value).toBe('')
    })

    it('should have a placeholder', () => {
        render(<DebouncedSearch onSearch={jest.fn()} placeholder="test" />)
        expect(screen.getByPlaceholderText('test')).toBeTruthy()
    })

    it('should not show clear icon when showClearIcon is false', () => {
        render(<DebouncedSearch onSearch={jest.fn()} showClearIcon={false} />)
        expect(screen.queryByRole('button')).toBeNull()
    })

    it('should have a custom Icon', () => {
        const { container } = render(<DebouncedSearch onSearch={jest.fn()} Icon={ICClear} iconClass="icon-class" />)
        expect(container.querySelector('.icon-class')).toBeTruthy()
    })

    it('should support children', () => {
        render(
            <DebouncedSearch onSearch={jest.fn()}>
                <div>test</div>
            </DebouncedSearch>,
        )
        expect(screen.getByText('test')).toBeTruthy()
    })
})
