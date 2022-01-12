import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, ChartDataLabels);

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
            <Doughnut data={{
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
                            family: "Spartan"
                        },
                        formatter: function(value, context) {
                            return value.toLocaleString("en-US", {minimumFactorDigits: 2})
                        }
                    }
                }
            }}/>
        ),
        lineChart: (props) => (
            <Line
                datasetIdKey='id'
                data={{
                    labels: props.node.lineChartData[0].lineData.map((point) => { return point.label }),
                    datasets: props.node.lineChartData.map((line, index) => {
                        return {
                            id: line._key,
                            label: line.lineName,
                            data: line.lineData.map((point) => {
                                return point.value
                            }),
                            borderColor: colorPalette[index],
                            backgroundColor: colorPalette[index],
                            datalabels: {
                                color: 'white',
                                labels: {
                                    title: {
                                        color: "white"
                                    }
                                }
                            }
                        }
                    }),
                }} options={{
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    }
                }}
            />
        )
    }
}