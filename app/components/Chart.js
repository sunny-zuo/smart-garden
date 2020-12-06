import React from "react";
import { lightGreen1, darkGreen1, darkGreen2, darkGreen3, white } from './Colors';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { VictoryLine, VictoryArea, VictoryAxis, VictoryChart } from 'victory-native'

export default function Chart(props) {
    if (!props.logs) {
        return;
    }

    const formatData = logs => {
        let counter = 1;
        return logs.map(log => {
            return { x: counter++, y: log[props.label.toLowerCase()] };
        }).slice(-144)
    }

    return (
        <View style={{ marginTop: 10 }}>
            <View style={styles.titleView}>
                <Text style={{
                    fontSize: 18,
                    textAlign: 'left',
                    color: props.color
                }}>{props.label}</Text>
            </View>
            <VictoryChart
                domain={props.domain}
                height={220}
                width={Dimensions.get("window").width * 0.9}
                padding={{
                    top: 20, left: 60, bottom: 20, right: 10
                }}
            >
                <VictoryAxis tickFormat={(x) => ' '} style={{ axis: { stroke: "#FFFFFF" } }} />
                <VictoryAxis dependentAxis tickFormat={(y) => `${y}${props.unit}`} style={{ axis: { stroke: "#FFFFFF" }, tickLabels: { fill: "white" } }} />
                <VictoryArea
                    data={formatData(props.logs)}
                    style={{
                        data: {
                            stroke: props.color,
                            fill: props.color
                        }
                    }}
                />
            </VictoryChart>
            <View style={{ position: "absolute", bottom: 0, left: 24 }}>
                <Text style={styles.graphLabelText}>24 Hours Ago</Text>
            </View>
            <View style={{ position: "absolute", bottom: 0, right: 16 }}>
                <Text style={styles.graphLabelText}>Now</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    graphLabelText: {
        color: white,
        fontSize: 11
    },
    titleView: {
        paddingLeft: 14
    }
})