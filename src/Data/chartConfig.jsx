const chartOptions = {
    chart: {
        type: "column"
      },
      title: {
        text: "จำนวนครุภัณฑ์"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "จำนวน"
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [
        {
          name: "ครุภัณฑ์",
          colorByPoint: true,
          data: [
            {
              name: "ประเภท A",
              y: 13,
              drilldown: "A"
            },
            {
              name: "ประเภท B",
              y: 12,
              drilldown: "B"
            },
            {
              name: "ประเภท C",
              y: 23,
              drilldown: "C"
            },
            {
              name: "ประเภท D",
              y: 34,
              drilldown: "D"
            },
            {
              name: "ประเภท E",
              y: 23,
              drilldown: "E"
            },
            {
              name: "ประเภท F",
              y: 21,
              drilldown: "F"
            },
            {
              name: "ประเภท G",
              y: 27,
              drilldown: "G"
            },
            {
              name: "ประเภท H",
              y: 44,
              drilldown: "H"
            },
            {
              name: "ประเภท I",
              y: 34,
              drilldown: "I"
            },
            {
              name: "ประเภท J",
              y: 25,
              drilldown: "J"
            },
            {
              name: "ประเภท K",
              y: 12,
              drilldown: "K"
            }
          ]
        }
      ],}
  
  export default chartOptions;
  