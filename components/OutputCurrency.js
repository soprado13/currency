import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from 'native-base'

class OutputCurrency extends React.Component {
    state={
        currency: 'EUR',
        course: this.props.list['EUR'],
    };
    onRemoveItem = () => {
        this.props.removeItem(this.props.id)
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.list !== this.props.list){
            this.setState({course: this.props.list[this.state.currency]})
        }
    }

    itemSelect() {
        return (Object.keys(this.props.list).map((input) => {
                        return(
                    <Picker.Item label={input} value={input} key={input}/>
                )

            })
        )}

    render() {
        return(
            <View style={styles.row}>
                <TouchableHighlight
                    style={styles.remove}
                    onPress={this.onRemoveItem}
                >
                    <Text style={{color: 'white'}}>-</Text>
                </TouchableHighlight>
                <Text style={styles.currencyOutput}>
                   {((Number(this.props.valueField) *  parseFloat(this.state.course)).toFixed(2))}
                </Text>

                <Picker
                    style={styles.setCurrency}
                    placeholder={this.state.currency[0]}
                    selectedValue={this.state.currency}
                    iosIcon={<Ionicons name="ios-arrow-down" />}
                    onValueChange={(itemValue, itemIndex) =>
                    {this.setState({currency: itemValue, course: this.props.list[itemValue]})}
                    }>
                    {this.itemSelect()}
                </Picker>
            </View>
        )
    }
}

export default OutputCurrency

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 55
    },
    currencyOutput: {
        flex: 1,
        padding: 10,
        borderColor: '#444444',
        borderWidth: 1,
        borderRadius: 20
    },
    setCurrency: {
        flex: 1
    },
    remove: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    }
});