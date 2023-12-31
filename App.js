import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, Animated, Pressable} from 'react-native';
import React, {useState} from 'react';


const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
    'pink',
    'cyan',
    'magenta',
    'brown',
    'black',
    'white',
    'gray',
    'lightblue',
    'lightgreen',
    'lightgray',
    'darkred',
    'darkblue',
    'darkgreen',
    'darkorange',
];

export default function App() {
    const [animation] = useState(new Animated.Value(0));

    const [randomNumber, setRandomNumber] = useState(0);
    const [randomYesNo, setRandomYesNo] = useState('Yes');
    const [currentColor, setCurrentColor] = useState('Green');

    const randomizeNumber = () => {
        const randomNumber = Math.floor(Math.random() * 101);
        setRandomNumber(randomNumber);
    }

    const randomizeYesNo = () => {
        const randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 0) {
            setRandomYesNo('No');
        } else {
            setRandomYesNo('Yes');
        }
    }

    const randomizeColor = () => {
        const randomNumber = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomNumber];
        setCurrentColor(randomColor);
    }

    const handlePressIn = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 10,
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 5,
            useNativeDriver: false,
        }).start();
    };

    const interpolatedBorderColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#9b9b9b', '#ffffff'],
    });

    const interpolatedColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#0e0e0e', '#000000'],
    });

    const interpolatedBorderRadius = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 14],
    });

    return (
        <Animated.View style={[
            styles.container,
            {
                borderColor: interpolatedBorderColor,
            },
        ]}>
            <Pressable
                activeOpacity={1}
                onPress={() => {
                    randomizeNumber();
                    randomizeYesNo();
                    randomizeColor();
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Animated.Text
                    style={[
                        styles.button,
                        {
                            backgroundColor: interpolatedColor,
                            borderRadius: interpolatedBorderRadius,
                        },
                    ]}
                >
                    Press Me
                </Animated.Text>
            </Pressable>
            <Text style={styles.randomNumber}>
                {randomNumber}{'\n'}
                {randomYesNo}{'\n'}
                <Animated.View style={[
                    styles.circle,
                    {
                        backgroundColor: currentColor,
                    },
                ]}>
                </Animated.View>
            </Text>
            <StatusBar style="auto" />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderStyle: 'solid',
        borderWidth: 4,
        borderRadius: 55,
        paddingTop: 80,
    },
    button: {
        color: '#ffffff',
        fontSize: 45,
        fontWeight: '700',
        textAlign: 'center',
        verticalAlign: 'center',
        padding: 16,
        paddingHorizontal: 40,
        overflow: 'hidden',
    },
    randomNumber: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '500',
        marginTop: 100,
        fontSize: 150,
    },
    circle: {
        backgroundColor: 'red',
        borderRadius: 100,
        overflow: 'hidden',
        width: 125,
        height: 125,
        alignSelf: 'center',
    },
});
