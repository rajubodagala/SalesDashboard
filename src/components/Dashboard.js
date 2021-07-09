import React, { Component } from "react";
import { Container, Nav } from "./styled-components";
import { Pie } from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import SalesCalender from "./SalesCalender";
import { getTransactions } from "./Pages/services";
import auth from "./Pages/authService";
import TranTable from "../components/Grid/TranTable"

import "../components/dashboard.css"
import setDate from "date-fns/fp/setDate";
let piedata = {
  labels: ['Blue','Green', 'Yellow' ,'Red'],
  datasets: [
    {
      label: '# of Votes',
      data: [0, 0, 0, 0],
      backgroundColor: [
        'rgb(54, 162, 235)', 
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',                           
        'rgb(255, 99, 132)'
      ],
      borderColor: [
        'rgb(255, 255, 255,1)'
      ],
      borderWidth: 1,
    },
  ],
}
let linedata = {
  labels:  ['DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY'],
  datasets: [
    {
      label: '$',
      data: [250, 330, 500, 450, 700, 970],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      color: 'rgb(128, 145, 171)'
    },
  ],
};

const lineoptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: 'rgb(128, 145, 171)'
        },
      },
    ],
    xAxes: [{
      ticks: {
          fontColor: 'rgb(128, 145, 171)'
      },
  }]
  },
};
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      summary:[],
      selectedDate:new Date(),
      transaction:[],
       piedata : null,
       linedata: null,    
      bardata : {
        labels: ['DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY'],
        datasets: [         
          {
            label: '# of Blue',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            label: '# of Green',
            data: [3, 10, 13, 15, 22, 30],
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            label: '# of Yellow',
            data: [3, 10, 1, 15, 20, 25],
            backgroundColor: 'rgba(255, 193, 7, 1)',
          },
          {
            label: '# of Red',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(255, 99, 132)',
          }
        ],
      },
      userData:[]
    };
  }


  async  componentDidMount() {
    const path = auth.getUserPath();
    await this.populateDashboard(path,new Date());
  }

   populateDashboard= async(path,saleDate)=> {   
    try {
      const { data } = await getTransactions(path,saleDate);

      let tranobj={
        BGYR:0,
        Billed:0,
        Green:0,
        Yellow:0,
        Red:0
      }
      data.result[1].map((list,index)=>{   
            tranobj.BGYR=list.BGYR;
            tranobj.Billed=list.Billed;
            tranobj.Green=list.Green;
            tranobj.Yellow=list.Yellow;
            tranobj.Red=list.Red;
            piedata.datasets[0].data=[list.qBilled,list.qGreen,list.qYellow,list.qRed]
          });
     console.log(piedata)
      this.setState({ transaction:tranobj,summary:data.result[0],piedata,linedata});


    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    } 
  }
   getSaleDate=async(sDate)=>{
    const path = auth.getUserPath();
  await this.populateDashboard(path,sDate);
}
  render() {
    const {transaction,summary,piedata,linedata}=this.state;
    
    return (
      <Container>
        {/* static navbar - bottom */}
        <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
          <Container className="text-medium">Summary</Container>
          <Container className="navbar-nav ml-auto">
            <SalesCalender selectedDate={this.getSaleDate}></SalesCalender>
          </Container>
        </Nav>

        {/* content area start */}
        <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
          {/* row 1 - revenue */}
          <Container className="row">
            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    {/* Total Revenue */}
                    BGYR
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  <span className="text-large pr-1">$</span>
                  {transaction.BGYR }
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Billed
                  </Container>
                  <Container className="card-heading-brand">
                    {/* <i className="fab fa-amazon text-large" /> */}
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  <span className="text-large pr-1">$</span>
                  {transaction.Billed }
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Green
                  </Container>
                  <Container className="card-heading-brand">
                    {/* <i className="fab fa-ebay text-x-large logo-adjust" /> */}
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  <span className="text-large pr-1">$</span>
                  {transaction.Green }
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Yellow
                  </Container>
                  <Container className="card-heading-brand">
                    {/* <i className="fab fa-etsy text-medium" /> */}
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  <span className="text-large pr-1">$</span>
                  {transaction.Yellow }
                </Container>
              </Container>
            </Container>
          </Container>

          {/* row 2 - conversion */}
          <Container className="row">
            <Container className="col-md-4 col-lg-3 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading mb-3">
                  <Container className="is-dark-text-light letter-spacing text-small">
                   Red
                  </Container>
                </Container>
                <Container className="card-value pt-4 text-x-large">
                  {this.state.productViews}
                  <span className="text-medium pl-1">
                    $
                  </span>
                  {transaction.Red }
                </Container>
              </Container>
            </Container>

            <Container className="col-md-8 col-lg-9 is-light-text mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="row full-height">
                  <Container className="col-sm-4 full height">
                    <Container className="chart-container full-height">
                    <Bar data={this.state.bardata}  options={{ 
                  scales: { yAxes: [  {ticks: { beginAtZero: true,  }, }, ],}, 
                  responsive:true, 
                  maintainAspectRatio: false , plugins: {
                    datalabels: {
                      formatter: (value) => {
                        return value + '%';
                      }
                    }
                  }}} />
                    </Container>
                  </Container>
                  <Container className="col-sm-4 full-height border-left border-right">
                    <Container className="chart-container full-height">
                    <Pie data={piedata}  options={{ responsive:true, maintainAspectRatio: false }} />
                    </Container>
                  </Container>
                  <Container className="col-sm-4 full-height">
                    <Container className="chart-container full-height">
                    <Line data={linedata} options={lineoptions} />
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>

           {/* row 3 - orders trend */}
           <Container className="row" style={{ minHeight: "400px" }}>
            <Container className="col-md-12 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="chart-container large full-height">
               <TranTable data={summary}></TranTable>
                </Container>             
              </Container>
            </Container>        
          </Container>

          {/* row 3 - orders trend */}
          {/* <Container className="row" style={{ minHeight: "400px"}}> */}
            {/* <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="chart-container large full-height">
                <Bar data={this.state.bardata}  options={{ 
                  scales: { yAxes: [  {ticks: { beginAtZero: true,  }, }, ],}, 
                  responsive:true, 
                  maintainAspectRatio: false , plugins: {
                    datalabels: {
                      formatter: (value) => {
                        return value + '%';
                      }
                    }
                  }}} />
                </Container>
              </Container>
            </Container> */}

            {/* <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="chart-container large full-height">
                <Pie data={this.state.piedata}  options={{ responsive:true, maintainAspectRatio: false }} />
                </Container>
              </Container>
            </Container> */}
        
          {/* </Container> */}
        </Container>
        {/* content area end */}
      </Container>
    );
  }
}

export default Dashboard;
