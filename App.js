import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, View, Button} from 'react-native';
import InputCurrency from './components/InputCurrency';
import OutputCurrency from './components/OutputCurrency';
import { h,w } from './constants'

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
        }
        return (
            <View style={{width: w, height: h}}>
                <InputCurrency data={this.state.data.rates} setNewValue={this.setNewValue}
                               valueField={this.state.newValue} setInputCurrency={this.setInputCurrency}/>
                <Button
                    style={{position: 'fixed', bottom: 0}}
                    title="+"
                    onPress={this.newItem}
                />
                <ScrollView >

                    {this.state.outputItems.map(i => {
                        return <OutputCurrency list={this.state.data.rates} valueField={this.state.newValue} key={i.id} id={i.id} removeItem={this.removeItem}/>
                    })}

                </ScrollView>
            </View>
        );
    }
}

export default App
