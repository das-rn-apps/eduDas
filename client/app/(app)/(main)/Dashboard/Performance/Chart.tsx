import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LineChart from '@/Components/Charts/LineChart'
import AllChart from '@/Components/Charts/AllChart'

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        }
    ]
}
const Chart = () => {
    return (
        <ScrollView>
            <Text>Bezier Line Chart</Text>
            <LineChart data={data} />
            <AllChart chartType={'progress'} />
            <AllChart chartType={'line'} />
            <AllChart chartType={'bar'} />
            <AllChart chartType={'pie'} />
            <AllChart chartType={'contribution'} />
        </ScrollView>
    )
}

export default Chart

const styles = StyleSheet.create({})