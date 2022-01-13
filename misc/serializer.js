import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, TimeScale } from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-moment';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, ChartDataLabels, TimeScale);

const colorPalette = [
    "#003f5c",
    "#ffa600",
    "#a05195",
    "#d45087",
    "#f95d6a"
]

export const serializers = {
    types: {
        code: (props) => (
            <div dangerouslySetInnerHTML={{ __html: props.node.code }}></div>
        ),
        donutChart: (props) => (
            <div style={{paddingTop: "40px", paddingBottom: "40px", maxWidth: "400px", margin: "0 auto"}}><Doughnut data={{
                labels: props.node.donutChartData.map((point) => { return point.label }),
                datasets: [
                    {
                        data: props.node.donutChartData.map((point) => { return point.value }),
                        backgroundColor: colorPalette,
                        hoverOffset: 4,
                        labels: "",
                        color: "#fff"
                    }
                ]
            }} options={{
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (item) {
                                let total = item.dataset.data.reduce((pv, cv) => pv + cv, 0)
                                return item.label + " " + ((item.raw / total) * 100).toFixed(2) + "%";
                            }
                        },
                    },
                    datalabels: {
                        color: "#fff",
                        font: {
                            family: "Spartan",
                            size: 8
                        },
                        formatter: function (value, context) {
                            return value.toLocaleString("en-US", { minimumFactorDigits: 2 })
                        }
                    }
                }
            }} /></div>
        ),
        lineChart: (props) => {
            let data = []
            if (props.node.lineChartData[0]?.arrayData?.useArray == true && props.node.lineChartData[0]?.arrayData?.data) {
                let labelData = JSON.parse(props.node.lineChartData[0].arrayData.data.replace(/'/g, '"'))
                data = {
                    labels: labelData.map((point) => { return point[0] }),
                    datasets: props.node.lineChartData.map((line, index) => {
                        let tempData = JSON.parse(line.arrayData.data.replace(/'/g, '"'))
                        return {
                            id: line._key,
                            label: line.lineName,
                            data: tempData.map((point) => {
                                return parseInt(point[1]) || 0
                            }),
                            borderColor: colorPalette[index],
                            backgroundColor: colorPalette[index],
                            datalabels: {
                                display: false
                            }
                        }
                    })
                }
            } else {
                data = {
                    labels: props.node.lineChartData[0].lineData?.map((point) => { return point.label }),
                    datasets: props.node.lineChartData?.map((line, index) => {
                        return {
                            id: line._key,
                            label: line.lineName,
                            data: line.lineData?.map((point) => {
                                return point.value
                            }),
                            borderColor: colorPalette[index],
                            backgroundColor: colorPalette[index],
                            datalabels: {
                                display: false
                            }
                        }
                    }),
                }
            }

            return <div style={{paddingTop: "20px", paddingBottom: "25px"}}><Line
                datasetIdKey='id'
                data={data} options={{
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    downsample: {
                        enabled: true,
                        threshold: 100
                    }
                }}
            /></div>
        }
    }
}