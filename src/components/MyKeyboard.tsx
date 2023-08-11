import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard(){
    const [firstnumber, setfirstnumber] = React.useState("")
    const [secondnumber, setsecondnumber] = React.useState("")
    const [operation, setoperation] = React.useState("")
    const [result, setresult] = React.useState<number | null >(null);
    
    const handleNumberPress = (buttonValue: string) => {
        if (firstnumber.length < 10){
            setfirstnumber(firstnumber + buttonValue);
        }
    };
    const handleOperationPress = (buttonValue: string) => {
        setoperation(buttonValue);
        setsecondnumber(firstnumber);
        setfirstnumber("");
    };
    const clear = () => {
        setfirstnumber("");
        setsecondnumber("");
        setoperation("");
        setresult(null);
    };
    const firstNumberDisplay = () => {
        if (result !== null) {
            return <Text style={result < 99999 ? [Styles.screenFirstNumber, {color: myColors.result}] : [Styles.screenFirstNumber, {fontSize: 50, color: myColors.result}]}>{result?.toString()}</Text>; 
        }
        if (firstnumber && firstnumber.length < 6) {
          return <Text style={Styles.screenFirstNumber}>{firstnumber}</Text>;
        }
        if (firstnumber === "") {
          return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
        }
        if (firstnumber.length > 5 && firstnumber.length < 8) {
          return (
            <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
              {firstnumber}
            </Text>
          );
        }
        if (firstnumber.length > 7) {
          return (
            <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
              {firstnumber}
            </Text>
          );
        }
      };
    const getResult = () => {
        switch(operation){
            case "+":
                clear();
                setresult(parseInt(secondnumber) + parseInt(firstnumber));
                break;
            case "-":
                clear();
                setresult(parseInt(secondnumber) - parseInt(firstnumber)) ;
                break;
            case "*":
                clear();
                setresult(parseInt(secondnumber)*parseInt(firstnumber));
                break;
            case "/":
                clear();
                setresult(parseInt(secondnumber)/parseInt(firstnumber));
                break;
            default:
                clear();
                setresult(0);
                break;
        }
    };
    
    return(
        <View style={Styles.viewBottom}>
            <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {secondnumber}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: '500' }}>{operation}</Text>
        </Text>
        {firstNumberDisplay()}
      </View>
            <View style={Styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
                <Button title="%" isGray onPress={() => handleOperationPress("%")} />
                <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={() => handleNumberPress("7")} />
                <Button title="8" onPress={() => handleNumberPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button title="X" isBlue onPress={() => handleOperationPress("*")} />
            </View>
            <View style={Styles.row}>
                <Button title="4" onPress={() => handleNumberPress("4")} />
                <Button title="5" onPress={() => handleNumberPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
            </View>
            <View style={Styles.row}>
                <Button title="1" onPress={() => handleNumberPress("1")} />
                <Button title="2" onPress={() => handleNumberPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
            </View>
            <View style={Styles.row}>
                <Button title="." onPress={() => handleNumberPress(".")} />
                <Button title="0" onPress={() => handleNumberPress("0")} />
                <Button title="⌫" onPress={() => setfirstnumber(firstnumber.slice(0, -1))} />
                <Button title="=" isBlue onPress={() => getResult()} />
            </View>
        </View>
    )
}