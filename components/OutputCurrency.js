import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';

class OutputCurrency extends React.Component {
    state={
        currency: Object.entries(this.props.list)[0],
        course: '1'
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
                <Text style={styles.currencyOutput}>
                   {(Number(this.props.valueField) * parseFloat(this.state.course).toFixed(2))}
                </Text>
                <Picker
                    selectedValue={this.state.currency}
                    style={{height: 50, width: 100}}
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
        padding: 50,
        alignItems: 'center'
    },
    currencyOutput: {
        flex: 3,
        padding: 10,
        borderColor: '#444444',
        borderWidth: 1,
    },
    currency: {
        flex: 1,
        textAlign: 'center'
    }
});