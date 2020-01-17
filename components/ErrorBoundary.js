import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <Text>Error in Component</Text>;
        }
        return <BadComponent />;
    }
}

const BadComponent = () => {
    throw new Error();
};

export default class App extends Component {
    render() {
        return (
            <View>
                <Text>Welcome to React Native!</Text>
                <ErrorBoundary />
            </View>
        );
    }
}