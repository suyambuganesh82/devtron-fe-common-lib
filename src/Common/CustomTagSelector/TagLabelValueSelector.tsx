import React, { useState, useEffect } from 'react'
import PopupMenu from '../PopupMenu'
import { ValidationRules } from './ValidationRules'
import { ReactComponent as ErrorCross } from '../../Assets/Icon/ic-cross.svg'
import { ReactComponent as Info } from '../../Assets/Icon/ic-info-outlined.svg'
import { KEY_VALUE } from '../Constants'
import { stopPropagation } from '../Helper'
import { ResizableTagTextArea } from './ResizableTagTextArea'
import { SuggestedTagOptionType, TagLabelValueSelectorType } from './Types'
import Tippy from '@tippyjs/react'

export const TagLabelValueSelector = ({
    selectedTagIndex,
    tagData,
    setTagData,
    tagOptions,
    isRequired,
    tagInputType,
    placeholder,
    tabIndex = null,
    refVar,
    dependentRef,
}: TagLabelValueSelectorType) => {
    const [selectedValue, setSelectedValue] = useState<string>('')
    const [activeElement, setActiveElement] = useState<string>('')
    const validationRules = new ValidationRules()

    useEffect(() => {
        setSelectedValue(tagData?.[tagInputType] || '')
    }, [selectedTagIndex, tagData, tagInputType])

    const handleOnFocus = (e) => {
        setTimeout(() => {
            setActiveElement(`tag-${tagInputType}-${selectedTagIndex}`)
        }, 300)
    }
    const handleOnBlur = (e) => {
        if (
            !e.relatedTarget ||
            !e.relatedTarget.classList.value ||
            !e.relatedTarget.classList.value.includes(`tag-${selectedTagIndex}-class`)
        ) {
            setActiveElement('')
            const _tagData = { ...tagData }
            _tagData[tagInputType] = selectedValue
            if (tagInputType === KEY_VALUE.KEY) {
                _tagData.isInvalidKey = selectedValue
                    ? !validationRules.propagateTagKey(selectedValue).isValid
                    : _tagData.value !== ''
            } else if (selectedValue || isRequired) {
                _tagData.isInvalidValue = !validationRules.propagateTagValue(selectedValue).isValid
                _tagData.isInvalidKey = !_tagData.key || _tagData.isInvalidKey
            } else {
                _tagData.isInvalidValue = false
                _tagData.isInvalidKey = !_tagData.key ? false : _tagData.isInvalidKey
            }
            setTagData(selectedTagIndex, _tagData)
        }
    }

    const handleInputChange = (e): void => {
        setSelectedValue(e.target.value)
    }

    const onSelectValue = (e): void => {
        stopPropagation(e)
        const _tagData = { ...tagData }
        _tagData[tagInputType] = e.currentTarget.dataset.key
        _tagData.propagate = e.currentTarget.dataset.propagate === 'true'
        setTagData(selectedTagIndex, _tagData)
        setActiveElement('')
    }

    const renderValidationsSuggestions = (): JSX.Element => {
        let field = { isValid: true, messages: [] }
        if (tagInputType === KEY_VALUE.KEY) {
            if (selectedValue || tagData.value) {
                field = validationRules.propagateTagKey(selectedValue)
            }
        } else if (isRequired || selectedValue) {
            field = validationRules.propagateTagValue(selectedValue)
        }
        if (!field.isValid) {
            return (
                <div className="p-4" onClick={stopPropagation}>
                    {field.messages.map((error) => (
                        <div key={error} className="flexbox pr-4 pl-4">
                            <span>
                                <ErrorCross className="icon-dim-14 scr-5 mt-3 mr-4" />
                            </span>
                            <span>{error}</span>
                        </div>
                    ))}
                    {tagInputType === KEY_VALUE.KEY && (
                        <div className="flexbox pr-4 pl-4">
                            <span>
                                <Info className="icon-dim-14 mt-3 mr-4" />
                            </span>
                            <span className="dc__italic-font-style">Key format: prefix/name or name</span>
                        </div>
                    )}
                </div>
            )
        }
        return null
    }

    const option = (tag: SuggestedTagOptionType, index: number): JSX.Element => {
        return (
            <div
                key={`${tag.value}-${index}`}
                data-key={tag.label}
                data-propagate={tag.propagate}
                className="dc__hover-n50 lh-20 fs-13 fw-4 pt-6 pr-8 pb-6 pl-8 cursor"
                onClick={onSelectValue}
            >
                {tag.label}
            </div>
        )
    }

    const optionWithTippy = (tag: SuggestedTagOptionType, index: number): JSX.Element => {
        return (
            <Tippy
                className="default-tt"
                arrow={false}
                placement="bottom"
                content={
                    <div className="pt-6 pr-10 pb-6 pl-10">
                        <div className="mb-10 fs-12 fw-6 cn-0">
                            {tag.label}
                        </div>
                        <div className="fs-12 fw-4 cn-0">
                            {tag.description}
                        </div>
                    </div>
                }
            >
                {option(tag, index)}
            </Tippy>
        )
    }

    const renderSuggestions = (): JSX.Element => {
        if (tagOptions?.length) {
            const filteredTags = tagOptions.filter((tag) => tag.label.indexOf(selectedValue) >= 0)
            if (filteredTags.length) {
                return (
                    <div>
                        {filteredTags.map((tag, index) =>
                            tag.description ? optionWithTippy(tag, index) : option(tag, index),
                        )}
                    </div>
                )
            }
        }
        return renderValidationsSuggestions()
    }

    const popupMenuBody = activeElement === `tag-${tagInputType}-${selectedTagIndex}` ? renderSuggestions() : null
    return (
        <PopupMenu autoClose autoPosition>
            <PopupMenu.Button rootClassName="dc__bg-n50 flex top dc__no-border-imp">
                <ResizableTagTextArea
                    minHeight={30}
                    maxHeight={80}
                    className={`form__input pt-4-imp pb-4-imp fs-13 ${
                        tagInputType === KEY_VALUE.KEY
                            ? `dc__no-right-radius`
                            : `dc__no-border-radius dc__no-right-border dc__no-left-border`
                    } ${
                        tagData[tagInputType === KEY_VALUE.KEY ? 'isInvalidKey' : 'isInvalidValue']
                            ? 'form__input--error'
                            : ''
                    }`}
                    value={selectedValue}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                    placeholder={placeholder}
                    tabIndex={tabIndex}
                    refVar={refVar}
                    dependentRef={dependentRef}
                />
            </PopupMenu.Button>
            {popupMenuBody && (
                <PopupMenu.Body
                    rootClassName={`mxh-210 dc__overflow-auto tag-${selectedTagIndex}-class`}
                    autoWidth={true}
                    preventWheelDisable={true}
                >
                    {popupMenuBody}
                </PopupMenu.Body>
            )}
        </PopupMenu>
    )
}
