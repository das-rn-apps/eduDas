import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
} from 'react-native-chart-kit';

// Define the props type for better TypeScript support and readability
type ChartProps = {
    chartType: 'line' | 'bar' | 'pie' | 'progress' | 'contribution'; // Type of chart
    width?: number; // Optional width for the chart
    height?: number; // Optional height for the chart
    chartConfig?: any; // Custom chart configuration
    yAxisLabel?: string; // Optional label for the y-axis
    yAxisSuffix?: string; // Optional suffix for y-axis
    verticalLabelRotation?: number; // Rotation angle for x-axis labels
    tooltipDataAttrs?: any; // Tooltip data attributes for ContributionGraph
};

// Default chart configuration for styling the chart
const defaultChartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#f3f3f3',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2, // Number of decimal places to show
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Color of the chart lines/bars
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color of the labels
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
    },
};

// Sample data for each chart type
const sampleData = {
    line: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
            },
        ],
    },
    bar: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
            },
        ],
    },
    pie: [
        { name: 'January', population: 215, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'February', population: 150, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'March', population: 180, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ],
    progress: {
        data: [0.3, 0.5, 0.7], // Progress values for each segment
        labels: ['Task 1', 'Task 2', 'Task 3'], // Labels for the progress segments
    },
    contribution: [
        { date: '2024-01-02', count: 1 },
        { date: '2024-01-03', count: 2 },
        { date: '2024-01-04', count: 3 },
    ],
};

const Chart = ({
    chartType = 'bar', // Default to BarChart
    width = Dimensions.get('window').width,
    height = 220,
    chartConfig = defaultChartConfig,
    yAxisLabel = '',
    yAxisSuffix = '', // Set default yAxisSuffix to an empty string
    verticalLabelRotation = 0,
    tooltipDataAttrs = () => { }, // Default function for ContributionGraph
}: ChartProps) => {
    // Define a function to render the appropriate chart based on chartType prop
    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return (
                    <LineChart
                        data={sampleData.line}
                        width={width}
                        height={height}
                        chartConfig={chartConfig}
                        yAxisLabel={yAxisLabel}
                        yAxisSuffix={yAxisSuffix}
                        verticalLabelRotation={verticalLabelRotation}
                    />
                );
            case 'bar':
                return (
                    <BarChart
                        data={sampleData.bar}
                        width={width}
                        height={height}
                        chartConfig={chartConfig}
                        yAxisLabel={yAxisLabel}
                        yAxisSuffix={yAxisSuffix}
                        verticalLabelRotation={verticalLabelRotation}
                    />
                );
            case 'pie':
                return (
                    <PieChart
                        data={sampleData.pie}
                        width={width}
                        height={height}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
                );
            case 'progress':
                return (
                    <ProgressChart
                        data={sampleData.progress}
                        width={width}
                        height={height}
                        chartConfig={chartConfig}
                    />
                );
            case 'contribution':
                return (
                    <ContributionGraph
                        values={sampleData.contribution}
                        width={width}
                        height={height}
                        chartConfig={chartConfig}
                        tooltipDataAttrs={tooltipDataAttrs} // Required prop
                    />
                );
            default:
                return <Text style={styles.errorText}>Invalid chart type</Text>;
        }
    };

    return <View style={styles.chartContainer}>{renderChart()}</View>;
};

export default Chart;

const styles = StyleSheet.create({
    chartContainer: {
        marginVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        padding: 10,
    },
});
