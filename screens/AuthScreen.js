import React, {
    useState,
    useEffect,
    useReducer,
    useCallback
} from 'react'
import { useDispatch } from "react-redux"
import {
    View,
    Text,
    Button,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native'
import Colors from '../constants/colors'
import Input from "../components/UI/Input"
import * as authActions from '../store/actions/auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            isFormValid: updatedFormIsValid
        }
    }
    return state
}

const AuthScreen = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isSecureEntry, setIsSecureEntry] = useState(true)
    const [isSignUp, setIsSignUp] = useState(true)
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        isFormValid: false
    })

    const dispatch = useDispatch()

    const handleAuth = async () => {
        let action
        if (isSignUp) {
            action = authActions.login(formState.inputValues.email.trim(), formState.inputValues.password.trim())
        } else {
            action = authActions.signup(formState.inputValues.email.trim(), formState.inputValues.password.trim())
        }
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action)
        } catch (e) {
            setError(e.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (error) {
            Alert.alert('B????d', error, [{text: 'OK'}])
        }
    }, [error])

    const handleInputChange = useCallback((inputId, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputId
        })
    }, [dispatchFormState])

    return (
        <View style={styles.screen}>
            <View style={styles.cardItem}>
                <ScrollView style={styles.inputsContainer} keyboardShouldPersistTaps='always'>
                    <Input
                        id='email'
                        label='E-Mail'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize='none'
                        errorText='Wprowad?? poprawny e-mail'
                        onInputChange={handleInputChange}
                        initialValue=''
                    />
                    <Input
                        id='password'
                        label='Has??o'
                        keyboardType='default'
                        secureTextEntry={isSecureEntry}
                        icon={
                            <TouchableOpacity onPress={() => {
                                setIsSecureEntry(prevState => !prevState)
                            }}>
                                <Text style={{ fontSize: 14 }}>{isSecureEntry ? 'Poka??' : 'Ukryj'}</Text>
                            </TouchableOpacity>
                        }
                        required
                        minLength={5}
                        autoCapitalize='none'
                        errorText='Wprowad?? poprawne has??o'
                        onInputChange={handleInputChange}
                        initialValue=''
                    />
                    <View style={styles.buttonContainer}>
                        {isLoading
                            ? <ActivityIndicator color={Colors.mainColor} size='small'/>
                            : <Button
                                color={Colors.mainColor}
                                title={isSignUp ? 'Zaloguj' : 'Zarejestruj'}
                                onPress={handleAuth}
                            />}

                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            color={Colors.mainColor}
                            title={isSignUp ? 'Nie mam jeszcze konta' : 'Przejd?? do logowania'}
                            onPress={() => {
                                setIsSignUp(prevState => !prevState)
                            }}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export const authOptions = () => {
    return {
        headerTitle: 'Logowanie / Rejestracja'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.authScreenColor,
    },
    cardItem: {
        width: '85%',
        maxWidth: 420,
        maxHeight: 400,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        elevation: 9,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    inputsContainer: {
        width: '60%',
    },
    buttonContainer: {
        marginVertical: 10,
    },
})

export default AuthScreen