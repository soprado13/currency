import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import InputCurrency from './components/InputCurrency';
import OutputCurrency from './components/OutputCurrency';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currencyValue: '',
            newValue: '0',
            outputItems: [{id: 1}, {id: 2}, {id: 3}]
        }
    }

    setNewValue = (newValue) => {
        this.setState({newValue})
    };

    componentDidMount() {
        return fetch('https://api.exchangerate-api.com/v4/latest/USD')
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
    }


    currencyList() {
        return (Object.entries(this.state.data.rates).map((input) => {
                return (
                    <OutputCurrency data={input} list={this.state.data.rates} valueField={this.state.newValue}/>
                )
            })
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 100, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <ScrollView>
                <InputCurrency data={this.state.data.rates} setNewValue={this.setNewValue} valueField={this.state.newValue}/>
                {this.state.outputItems.map( i => {
                    return <OutputCurrency list={this.state.data.rates} valueField={this.state.newValue}/>
                })}
            </ScrollView>
        );
    }
}

export default App
