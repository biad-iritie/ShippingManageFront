import React from "react";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/styles";
import { FormattedMessage } from 'react-intl';
const DoughnutChart = ({
  nb_standBy,
  nb_received,
  nb_inTransit,
  nb_arrived,
  nb_pickUp,
  nb_signed,
  height, color = [], theme }) => {
  const option = {
    legend: {
      show: true,
      itemGap: 10,
      icon: "circle",
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: "roboto"
      }
    },
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    xAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],

    series: [
      {
        name: "Traffic Shipping",
        type: "pie",
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: "center", // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: "roboto"
            },
            formatter: "{a}"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "14",
              fontWeight: "normal"
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: "{b} \n{c} ({d}%)"
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: nb_standBy,
            name: "Stand By"
          },
          {
            value: nb_received,
            //value: 2,
            name: "Received"
          },
          {
            value: nb_inTransit,
            //value: 1,
            name: "In Transit"
          },
          {
            value: nb_arrived,
            //value: 3,
            name: "Arrived"
          },
          {
            value: nb_pickUp,
            //value: 5,
            name: "Pick Up"
          },
          { value: nb_signed, name: "Signed" }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color]
      }}
    />
  );
};

export default withStyles({}, { withTheme: true })(DoughnutChart);
