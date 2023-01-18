import React, { ReactNode } from 'react';
import { Placement } from 'tippy.js';
import 'tippy.js/animations/shift-toward-subtle.css';
export declare enum TippyTheme {
    black = "black",
    white = "white"
}
interface TippyCustomizedProps {
    theme: TippyTheme;
    visible?: boolean;
    heading?: string;
    infoTextHeading?: string;
    placement: Placement;
    className?: string;
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    iconPath?: string;
    iconClass?: string;
    iconSize?: number;
    onImageLoadError?: (e: any) => void;
    onClose?: () => void;
    infoText?: string;
    showCloseButton?: boolean;
    arrow?: boolean;
    interactive?: boolean;
    showOnCreate?: boolean;
    trigger?: string;
    animation?: string;
    duration?: number;
    additionalContent?: ReactNode;
    documentationLink?: string;
    documentationLinkText?: string;
    children: React.ReactElement<any>;
}
export default function TippyCustomized(props: TippyCustomizedProps): JSX.Element;
export {};
