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
                    <Picker.Item label={input} value={input} key={input}/>
                )
            })
        )}

    render() {
        return (
            <View  style={styles.container}
                  keyboardShouldPersistTaps='handled'>
                <View style={styles.row}>
                    <TextInput
                        style={styles.currencyInput}
                        placeholder={'Enter Value'}
                        keyboardType={'number-pad'}
                        onFocus={this.onTextFocus}
                        onChangeText={this.onChangeText}
                        value={this.props.valueField}
                    />
                    <Picker
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
            </View >
        );
    }
}

export default InputCurrency

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    currencyInput: {
        flex: 2,
        borderColor: '#444444',
        borderWidth: 1,
        padding: 10,
    },
    pickerContainer: {
        flex: 1,
        alignItems: 'center'
    }
});
