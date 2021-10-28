import React, {
    useEffect,
    useReducer
} from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        touched: false
    })
    let errorTextMessage = ''

    const {onInputChange, id} = props

    useEffect(() => {
        let mounted = true
        if (mounted) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
        return () => mounted = false
    }, [inputState, onInputChange, id])

    const handleTextChange = text => {
        const {required, email, minLength} = props
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let isValid = true
        if (required && text.trim().length === 0) {
            isValid = false
            errorTextMessage = 'Wprowadź jakąś wartość'
        }
        if (email && !emailRegex.test(text.toLowerCase())) {
            isValid = false
            errorTextMessage = 'Niepoprawny email'
        }
        if (minLength != null && text.length < props.minLength) {
            isValid = false
            errorTextMessage = 'Wprowadzone hasło jest za krótkie'
        }

        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid
        })
    }

    const handleLostFocus = () => {
        dispatch({ type: INPUT_BLUR })
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    {...props}
                    style={styles.input}
                    value={inputState.value}
                    onChangeText={handleTextChange}
                    onBlur={handleLostFocus}
                />
                <View style={styles.hideShowLabel}>{props.icon ? props.icon : null}</View>
            </View>
            {!inputState.isValid && inputState.touched &&
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorTextMessage}</Text>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%',
    },
    hideShowLabel: {
        width: '20%',
        right: '100%',
        height: '60%',
        marginTop: 16,
    },
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        color: 'red',
        fontFamily: 'open-sans',
        fontSize: 13,
    },
})

export default Input