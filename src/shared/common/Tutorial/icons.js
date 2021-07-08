import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    greenCheckMark: {
        height: 128,
        resizeMode: 'contain',
        width: 128,
    },
    tutImage: {
        height: 40,
        resizeMode: 'contain',
        width: 40,
    },
    tileImage: {
        position: 'absolute',
        top: 10,
        left: 10,
        height: '15%',
        resizeMode: 'contain',
        width: '15%',
    },
});

/* eslint-disable global-require */

export const NumberedTapIconWhite1 = () => {
    return (
        <Image
            source={require('../../views/assets/1_Tap_White.png')}
            style={styles.tutImage}
        />
    );
};

export const NumberedTapIconWhite2 = () => {
    return (
        <Image
            source={require('../../views/assets/2_Tap_White.png')}
            style={styles.tutImage}
        />
    );
};

export const NumberedTapIconWhite3 = () => {
    return (
        <Image
            source={require('../../views/assets/3_Tap_White.png')}
            style={styles.tutImage}
        />
    );
};

export const NumberedTapIconBlack1 = () => {
    return (
        <Image
            source={require(`../../views/assets/1_Tap_Black.png`)}
            style={styles.tutImage}
        />
    );
};

export const NumberedTapIconBlack2 = () => {
    return (
        <Image
            source={require(`../../views/assets/2_Tap_Black.png`)}
            style={styles.tutImage}
        />
    );
};

export const NumberedTapIconBlack3 = () => {
    return (
        <Image
            source={require(`../../views/assets/3_Tap_Black.png`)}
            style={styles.tutImage}
        />
    );
};

export const SwipeIconBlack = () => {
    return (
        <Image
            source={require('../../views/assets/swipeleft_icon_black.png')}
            style={styles.tutImage}
        />
    );
};

export const SwipeIconWhite = () => {
    return (
        <Image
            source={require('../../views/assets/swipeleft_icon_white.png')}
            style={styles.tutImage}
        />
    );
};

export const SwipeRightIconWhite = () => {
    return (
        <Image
            source={require('../../views/assets/swiperight_icon_white.png')}
            style={styles.tutImage}
        />
    );
};

export const TapIconBlack = () => {
    return (
        <Image
            source={require('../../views/assets/tap_icon_angular.png')}
            style={styles.tutImage}
        />
    );
};

export const TapIconWhite = () => {
    return (
        <Image
            source={require('../../views/assets/tap_icon_angular_white.png')}
            style={styles.tutImage}
        />
    );
};

export const CheckMark = () => {
    return (
        <Image
            source={require('../../views/assets/checkmark_white.png')}
            style={styles.tutImage}
        />
    );
};

export const TickGreenOnWhite = () => {
    return (
        <Image
            source={require('../../views/assets/tick_green_on_white.png')}
            style={styles.tutImage}
        />
    );
};

export const TickWhiteOnGreen = () => {
    return (
        <Image
            source={require('../../views/assets/tick_white_on_green.png')}
            style={styles.greenCheckMark}
        />
    );
};

export const MapswipeMagnifyingGlassIcon = () => {
    return (
        <Image
            source={require('../../views/assets/mapswipe_magnifying_glass.png')}
            style={styles.tutImage}
        />
    );
};

export const PressAndHoldIcon = () => {
    return (
        <Image
            source={require('../../views/assets/icon_hold.png')}
            style={styles.tutImage}
        />
    );
};

export const NumberedTapIconTile1 = () => {
    return (
        <Image
            source={require('../../views/assets/1_Tap_verify-verified-check.png')}
            style={styles.tileImage}
            fadeDuration={0}
        />
    );
};

export const NumberedTapIconTile2 = () => {
    return (
        <Image
            source={require('../../views/assets/2_Tap_question-mark-round-line.png')}
            style={styles.tileImage}
            fadeDuration={0}
        />
    );
};

export const NumberedTapIconTile3 = () => {
    return (
        <Image
            source={require('../../views/assets/3_Tap_red-x-line.png')}
            style={styles.tileImage}
            fadeDuration={0}
        />
    );
};
