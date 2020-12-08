

import { animationType, animationEasing } from '../../datadict'
export const animation={
    animation: {
        type: 'switch',
        value: true
    },
    animationType: {
        type: 'selection',
        value:'scale',
        items: animationType
    },
    animationDuration: {
        type: 'textNumber',
        value: 1000
    },
    animationEasing: {
        type: 'selection',
        value:'cubicIn',
        items: animationEasing
    }
}