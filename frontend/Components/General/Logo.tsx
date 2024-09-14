import { View, Image } from 'react-native'
import * as React from 'react'

const Logo = () => {
    return (
        <View style={{ alignItems: "center", }}>
            <Image
                style={{ width: 150, height: 150 }}
                source={require('../assets/logoDas.png')}
            />
        </View>
    )
}

export default Logo;