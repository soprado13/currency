import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, View, Button} from 'react-native';
import InputCurrency from './components/InputCurrency';
import OutputCurrency from './components/OutputCurrency';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currencyValue: '',
            newValue: '0',
            outputItems: [{id: 0}],
            currency: 'USD'
        }
    }

    setNewValue = (newValue) => {
        this.setState({newValue})
    };

    newItem = () => {
        let i = this.state.outputItems[this.state.outputItems.length - 1].id + 1 || 0;
        let temp = { id: i };
        this.state.outputItems.push(temp);
        this.setState({outputItems: this.state.outputItems});
    };

    removeItem = (id) => {
        this.setState({outputItems: this.state.outputItems.filter(i => i.id !== id)})
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
                <InputCurrency data={this.state.data.rates} setNewValue={this.setNewValue}
                               valueField={this.state.newValue} getCurrency={this.getCurrency}/>
                {this.state.outputItems.map(i => {
                    return <OutputCurrency list={this.state.data.rates} valueField={this.state.newValue} key={i.id} id={i.id} removeItem={this.removeItem}/>
                })}
                <Button
                    style={{width: 100, height: 100, borderRadius: 100, fontSize: 50}}
                    title="+"
                    onPress={this.newItem}
                />
            </ScrollView>
        );
    }
}

export default App
