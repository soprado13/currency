import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';

class InputCurrency extends React.Component{

    onChangeText = (e) => {
        this.props.setNewValue(e)
    };
    onTextFocus = () => {
        this.props.setNewValue('')
    };

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
                    <View style={styles.pickerContainer}>
                        <Text>{Object.keys(this.props.data)[0]}</Text>
                    </View>
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
        flex: 3,
        borderColor: '#444444',
        borderWidth: 1,
        padding: 10,
    },
    pickerContainer: {
        flex: 1,
        alignItems: 'center'
    },
    currencyOutput: {
        flex: 3,
        padding: 10,
        borderColor: '#444444',
        borderWidth: 1,
    },
    currency: {
        textAlign: 'center'
    }
});
