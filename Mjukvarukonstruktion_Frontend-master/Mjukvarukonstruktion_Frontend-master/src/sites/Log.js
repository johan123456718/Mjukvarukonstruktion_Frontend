import React, { Component } from "react";
import {Button, Form, Card} from 'react-bootstrap';
import './css/Log.css';

class Log extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      chosenIndex: null,
      category: "category",
      content: "content",
      posts: [],
      SuccessfulSave: false,
    };
  }

  openInformation(index){
    if(this.state.isInformationOpen && this.chosenIndex !== index){
      this.state.isInformationOpen = false;
    }
    this.chosenIndex = index;
    this.setState({
      isInformationOpen: !this.state.isInformationOpen
    })
  }

  componentDidMount() {
    this.setState({isLoaded: false});
    this.getProducedRecord();
  }

  getProducedRecord(){
    fetch("http://localhost:8082/getAllRecords",{
      method: 'GET',
      headers:{
         'Authorization': 'Bearer ' + localStorage.getItem("react-token")}
    })
    .then( response => response.json())
    .then(
        // handle the result
        (result) => {
            this.setState({
                isLoaded: true,
                posts: result,
            });
        },

        // Handle error
        (error) => {
            this.setState({
                isLoaded: true,
                error
            })
        },
    )
  }

  render(){
      const {isLoaded, posts} = this.state;
      if (!isLoaded) {
          return <div>Loading ...</div>
      }
      else{
        return (
          <div class = "containerlog">
            {
            posts.map((item, index)=>
            <div class = "row">
              <div class = "rowLog rowHover" onClick = {() => this.openInformation(index)}>
                <div class = "colLog">
                  <p className="columnLogText">{index + 1}. Category: {item.category}, date: {item.date}</p>
                </div>
              </div>

          {this.state.isInformationOpen && this.chosenIndex == index?
              <div class = "rowLog">
                <div class = "rowLog">
                  <div class = "colLog">
                    <p className="columnLogText"> Content: {item.content}</p>
                  </div>
                </div>
                <div class = "rowDIV"/>
              </div>
              :null}
            </div>
          )
        }


            <footer class = "page-footer font-small blue ">
              <Card className = "footer" variant="none">
              {
                this.state.SuccessfulSave?
                <div class="alert alert-success" className="alert-green" role="alert"> Succesful entry!
                  <button class="btn btn-dark" align = "center" onClick ={()=>this.setState({SuccessfulSave : false})}> Ok</button>
                </div>
                :null
              }
              </Card>
            </footer>

          </div>
          );
        }
      }
    }
export default Log;
