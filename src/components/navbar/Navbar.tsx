import { View, Text, StyleSheet } from "react-native";
import Bell from "../notifications/components/bell/Bell";
export default function Navbar(){
    return(
    <View style={styles.container} >
        <View style={styles.flex1}>
            <Text style={styles.text}>{`Hola 👋`}</Text>
        </View>
        <View style={styles.flex}>
        <View style={styles.notification}>
            <Bell /> 
        </View>
        <View >
            <Text>Perfil</Text>
        </View>
    </View>
   </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems: 'center',
    },
    flex1:{
        alignItems:'center',
    },
    flex:{
        flexDirection:'row',
        paddingLeft:215
    },
    text:{
        fontWeight:'normal',
    },
    notification:{
        paddingRight:10
    }
})