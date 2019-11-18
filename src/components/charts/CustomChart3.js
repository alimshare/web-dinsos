import React from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"

import ChartCard from "../ChartCard"

import Chart from "../Chart"

import Container from "../../layouts/Container"
import Item from "../../layouts/Item"

class CustomChart3 extends React.Component {
  state = {
    dataP3S: null,
    error: false,
    loading: false,
  }

  fetchDataPkh = () => {
    this.setState({ loading: true })
    axios
      .get(`https://api.myjson.com/bins/12ipi9`, {
        crossdomain: true,
      })
      .then(result => {
        const { data } = result.data
        this.setState({
          loading: false,
          dataP3S: data,
        })
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }

  componentDidMount() {
    // this.fetchDataPkh()    
    this.setState({
      loading: false, 
      dataP3S : [{"wilayah":"Pria","total":5000},{"wilayah":"Wanita","total":3500}]
    })
  }

  render() {
    const { dataP3S,  } = this.state

    const dataP3sArray = (type, dataFromState) => {
      let arr = []
      !!dataFromState &&
        dataFromState.forEach(data => {
          type === "area" && arr.push(data.wilayah)
          type === "total" && arr.push(data.total)
        })
      return arr
    }

    const chartDataDoughnut = {
      labels: dataP3sArray('area', dataP3S),
      datasets: [
        {
          label: ['Laki-laki', 'Perempuan'],
          backgroundColor: [
          '#1572E8',
          '#F03A47',
          '#F0A202',
          '#06D6A0',
          '#FFCE56',
          '#36A2EB',
          ],
          data: dataP3sArray('total', dataP3S)
        }
      ]
    }


    const customOptions = {
      legend : { 
        labels : {
          fontColor:"#fff",
        },
        position: 'right'
      }
    }

    return (
      <ChartCard title="Berdasarkan Jenis Kelamin">
        <Grid
          style={{ height: "100%" }}
          container
          direction="column"
          justify="center"
        >
          <Container flexDirection="column" spacing={16}>
            <Item flex={1}>
              <Chart type="pie" data={chartDataDoughnut} options={customOptions} />
            </Item>
          </Container>
        </Grid>
      </ChartCard>
    )
  }
}

export default CustomChart3