'use strict';

import {
    grey100,
    grey300,
    grey400,
    grey500,
    white,
    darkBlack,
    fullBlack,
    deepOrange500,
    blue900,
    deepPurple700,
} from 'material-ui/lib/styles/colors';
import spacing from 'material-ui/lib/styles/spacing';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

module.exports = {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blue900,
        primary2Color: deepPurple700,
        primary3Color: grey400,
        accent1Color: deepOrange500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: ColorManipulator.fade(darkBlack, 0.3),
        pickerHeaderColor: blue900,
        clockCircleColor: ColorManipulator.fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
};
