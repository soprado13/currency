import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, View, TouchableHighlight, Text, StyleSheet, StatusBar} from 'react-native';
import InputCurrency from './components/InputCurrency';
import OutputCurrency from './components/OutputCurrency';
import { h, w } from './constants'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            currencyValue: '',
            newValue: '0',
            outputItems: [{id: 0}],
            currency: 'USD'
        }
    }

    setNewValue = (newValue) => {
        this.setState({newValue: newValue})
    };

    newItem = () => {
        let i = this.state.outputItems.length;
        let temp = { id: i };
        this.state.outputItems.push(temp);
        this.setState({outputItems: this.state.outputItems});
    };

    removeItem = (id) => {
        this.setState({outputItems: this.state.outputItems.filter(i => i.id !== id)})
    };

    setInputCurrency = (itemValue) => {
        this.setState( {currency: itemValue} )
    };

    componentDidMount() {
        return fetch('https://api.exchangerate-api.com/v4/latest/' + this.state.currency)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    data: responseJson
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidUpdate(prevProps, prevState,) {
        if (prevState.currency !== this.state.currency){
            return fetch('https://api.exchangerate-api.com/v4/latest/' + this.state.currency)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data: responseJson
                    }, function () {
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        };
        return (
            <View style={styles.container} keyboardShouldPersistTaps='handled'>
                <StatusBar barStyle='light-content' hidden={false}/>
                <ScrollView>
                    <InputCurrency data={this.state.data.rates} setNewValue={this.setNewValue}
                                   valueField={this.state.newValue} setInputCurrency={this.setInputCurrency}/>

                    {this.state.outputItems.map(i => {
                        return <OutputCurrency list={this.state.data.rates} valueField={this.state.newValue} key={i.id} id={i.id} removeItem={this.removeItem}/>
                    })}
                </ScrollView>
                <TouchableHighlight
                    style={styles.addItem}
                    onPress={this.newItem}
                >
                    <Text style={{color: '#ffffff'}}>+</Text>
                </TouchableHighlight>
            </View>

        );
    }
}

export default App

const styles = StyleSheet.create({
    container: {
        width: w,
        height: h,
        paddingTop: 50,
        paddingLeft: 20,
    },
    addItem: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "green",
        position: 'absolute',
        bottom: 5,
        right: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});