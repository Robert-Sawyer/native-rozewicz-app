import React from 'react'
import { Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from '../constants/colors'
import { HeaderButton } from "react-navigation-header-buttons"

const CustomHeaderButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={22}
            color={Platform.OS === 'android' ? '#fff' : Colors.mainColor}
        />
    )
}

export default CustomHeaderButton
