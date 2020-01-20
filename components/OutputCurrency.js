import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from 'native-base'

class OutputCurrency extends React.Component {
    state={
        currency: Object.entries(this.props.list)[0],
        course: '1'
    };
    onRemoveItem = () => {
        this.props.removeItem(this.props.id)
    };

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
                <Button
                    style={{flex: 1}}
                    color={'orange'}
                    title="-"
                    onPress={this.onRemoveItem}
                />
                <Text style={styles.currencyOutput}>
                   {(Number(this.props.valueField) * parseFloat(this.state.course).toFixed(2))}
                </Text>

                <Picker
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
        padding: 20,
        alignItems: 'center'
    },
    currencyOutput: {
        flex: 2,
        padding: 10,
        borderColor: '#444444',
        borderWidth: 1,
    },
    currency: {
        flex: 1
    }
});