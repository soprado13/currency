import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native';
import {Picker} from "native-base";
import {Ionicons} from "@expo/vector-icons";

class InputCurrency extends React.Component{

    state ={
        currency: Object.entries(this.props.data)[0]
    };

    onChangeText = (e) => {
        this.props.setNewValue(e)
    };
    onTextFocus = () => {
        this.props.setNewValue('')
    };

    itemSelect() {
        return (Object.keys(this.props.data).map((input) => {
                return(
                    <Picker.Item label={input} value={input} key={input[0]}/>
                )
            })
        )}

    render() {
        return (
            <View style={styles.row}>
                <TextInput
                    style={styles.currencyInput}
                    placeholder={'Enter Value'}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    onChangeText={this.onChangeText}
                    value={this.props.valueField}
                />
                <Picker
                    style={styles.picker}
                    placeholder={this.state.currency[0]}
                    selectedValue={this.state.currency}
                    iosIcon={<Ionicons name="ios-arrow-down" />}
                    onValueChange={(itemValue, itemIndex) =>
                    {this.setState({currency: itemValue});
                    this.props.setInputCurrency(itemValue)}
                    }>
                    {this.itemSelect()}
                </Picker>
            </View>
        );
    }
}

export default InputCurrency

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingRight: 55,
        paddingLeft: 35,
        paddingBottom: 20,
        paddingTop: 50
    },
    currencyInput: {
        flex: 1,
        padding: 10,
        borderColor: '#444444',
        borderWidth: 1,
        borderRadius: 50
    },
    picker: {
        flex: 1
    }
});
