import React from 'react';
import { LayoutType, RowType, ColumnType } from '../../app/types/flexbox'

export function Layout(props: LayoutType) {


    const getMainAxisAlign = (value: string, stretchIncluded: boolean = false) => {
        switch (value) {
            case 'flex-start':
            case 'start': return 'flex-start';
            case 'center': return 'center';
            case 'flex-end':
            case 'end': return 'flex-end';
            case 'space-between':
            case 'spaced': return 'space-between';
            case 'space-around':
            case 'around': return 'space-around';
            case 'space-evenly': return stretchIncluded ? 'flex-start' : 'space-evenly';
            case 'stretch': return stretchIncluded ? 'stretch' : 'flex-start';
            default: return 'flex-start';
        }
    }

    const getCrossAxisAlign = (value: string) => {
        switch (value) {
            case 'flex-start':
            case 'start': return 'flex-start';
            case 'center': return 'center';
            case 'flex-end':
            case 'end': return 'flex-end';
            case 'stretch': return 'stretch';
            case 'baseline': return 'baseline';
            default: return 'stretch';
        }
    }

    const {
        style,
        column = false,
        rowReverse = false,
        columnReverse = false,

        // Main Axis
        justifyContent,
        alignContent,

        // Cross Axis
        alignItems,
        alignSelf,

        // Wrap
        wrap = false,
        wrapReverse = false,

        flexGrow,
        flexShrink,
        flexBasis,
        flex,

        width,
        height,

        breakpoints,
        className,
        componentRef,

        element,

        ...ownProps
    } = props;

    let direction = { flexDirection: 'row' }; // default row
    if (column) {
        direction = { flexDirection: 'column' };
    }

    if (rowReverse) {
        direction = { flexDirection: 'row-reverse' };
    }
    else if (columnReverse) {
        direction = { flexDirection: 'column-reverse' };
    }

    let flexWrap = { flexWrap: 'nowrap' };
    if (wrap) {
        flexWrap = { flexWrap: 'wrap' };
    }
    else if (wrapReverse) {
        flexWrap = { flexWrap: 'wrap-reverse' };
    }

    const justifyContentStyle = (justifyContent && { justifyContent: getMainAxisAlign(justifyContent) }) || {};

    const alignItemsStyle = (alignItems && { alignItems: getCrossAxisAlign(alignItems) }) || {};

    const alignSelfStyle = (alignSelf && { alignSelf: getCrossAxisAlign(alignSelf) }) || {};

    const alignContentStyle = (alignContent && { alignContent: getMainAxisAlign(alignContent, true) }) || {};

    const flexGrowStyle = (flexGrow && { flexGrow })|| {};

    const flexShrinkStyle = (flexShrink && { flexShrink }) || {};

    const flexBasisStyle = (flexBasis && { flexBasis }) || {};

    const flexStyle = (flex && { flex }) || {};

    const widthStyle = (width && { width }) || {};

    const heightStyle = (height && { height }) || {};

    const breakpointsClassNames: string[] = [];
    const breakpointsStyles = !breakpoints ? {} :
        Object.keys(breakpoints).sort((a: any, b: any) => b - a).reduce((style, key) => {
            const value = breakpoints[key];
            if (typeof value === 'string') {
                if (!['column', 'column-reverse', 'row', 'row-reverse'].includes(value)) {
                    if (window.innerWidth <= +key) {
                        breakpointsClassNames.push(value)
                    }
                    return style;
                }
                return {
                    ...style,
                    ...(window.innerWidth <= +key ? { flexDirection: value } : {})
                }
            }
            return {
                ...style,
                ...(window.innerWidth <= +key ? value : {})
            }
        }, {});

    const classNames = `${className || ''} ${breakpointsClassNames.join(' ')}`.trim();

    const layoutStyles = {
        display: 'flex',
        ...direction,
        ...justifyContentStyle,
        ...alignItemsStyle,
        ...alignSelfStyle,
        ...alignContentStyle,
        ...flexWrap,
        ...flexGrowStyle,
        ...flexShrinkStyle,
        ...flexBasisStyle,
        ...flexStyle,
        ...widthStyle,
        ...heightStyle,
        ...style,
        ...breakpointsStyles
    };

    const Element = React.createElement(element || 'div');

    // @ts-ignore error TS2590: Expression produces a union type that is too complex to represent.
    // eslint-disable-next-line
    return (<Element.type ref={componentRef} style={layoutStyles} className={classNames} {...ownProps}>
        {props.children}
    </Element.type>);
}

export function Row (props: RowType) {

    const { reverse = false, vertical, horizontal, justifyContent, alignItems, alignSelf, alignContent,
        flex, flexGrow, flexShrink, flexBasis, ...ownProps } = props;

    const rowReverse = reverse;

    return (
        <Layout
            rowReverse={rowReverse}
            alignItems={vertical || alignItems}
            justifyContent={horizontal || justifyContent}
            alignSelf={alignSelf}
            alignContent={alignContent}
            flexGrow={flexGrow}
            flexBasis={flexBasis}
            flexShrink={flexShrink}
            flex={flex}
            {...ownProps}>
            {props.children}
        </Layout>
    );
}

export function Column (props: ColumnType) {
    const { reverse = false, vertical, horizontal, justifyContent, alignItems, alignSelf, alignContent,
        flex, flexGrow, flexShrink, flexBasis, ...ownProps } = props;

    const columnReverse = reverse;

    return (
        <Layout column
            columnReverse={columnReverse}
            alignItems={horizontal || alignItems}
            justifyContent={vertical || justifyContent}
            alignSelf={alignSelf}
            alignContent={alignContent}
            flexGrow={flexGrow}
            flexBasis={flexBasis}
            flexShrink={flexShrink}
            flex={flex}
            {...ownProps}>
            {props.children}
        </Layout>
    );
}