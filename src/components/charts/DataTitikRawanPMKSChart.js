import React from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import { Chart } from "@bit/primefaces.primereact.chart"

import ChartCard from "../ChartCard"
import { convertDataTitikPMKStoChartData } from "../../utils/charts/dataTitikRawanPMKS"

import Container from "../../layouts/Container"
import Item from "../../layouts/Item"

class DataTitikRawanPMKSChart extends React.Component {
  state = {
    dataTitikPMKS: null,
    error: false,
    loading: false,
  }

  fetchDataPkh = () => {
    this.setState({ loading: true })
    axios
      .get(`https://api.myjson.com/bins/168at0`, {
        crossdomain: true,
      })
      .then(result => {
        const { data } = result.data
        this.setState({
          loading: false,
          dataTitikPMKS: data,
        })
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }

  componentDidMount() {
    this.fetchDataPkh()
  }

  render() {
    const { dataTitikPMKS, error, loading } = this.state

    const chartDataDoughnut = {
      labels: convertDataTitikPMKStoChartData(dataTitikPMKS, "labels"),
      datasets: [{
        data: convertDataTitikPMKStoChartData(dataTitikPMKS, "data"),
        backgroundColor: [
        '#CCDBDC',
        '#D5D6AA',
        '#8AA399',
        '#7AE7C7',
        '#FAFAFA',
        ],
        hoverBackgroundColor: [
        '#CCDBDC',
        '#D5D6AA',
        '#8AA399',
        '#7AE7C7',
        '#FAFAFA',
        ]
      }]
    };

    return (
      <ChartCard title="Data Titik Rawan PMKS" to="data/data-petugas-p3s">
        <Grid
          style={{ height: "100%" }}
          container
          direction="column"
          justify="center"
        >
          <Container flexDirection="column" spacing={16}>
            <Item flex={1}>
              <Chart
                type="doughnut"
                data={chartDataDoughnut}
              />
            </Item>
          </Container>
        </Grid>
      </ChartCard>
    )
  }
}

export default DataTitikRawanPMKSChart