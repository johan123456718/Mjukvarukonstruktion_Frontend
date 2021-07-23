import React, { Component } from "react";
import {FormControl, Form, Button, Card, ButtonGroup} from 'react-bootstrap';
import './css/Messages.css';

class Messages extends Component{
  constructor(props){
    super(props);
    this.new_category = React.createRef();
    this.new_content = React.createRef();
    this.state = {
      isLoaded: false,
      inputChanged: false,
      posts: [],
      category: "",
      content: "",
      SuccessfulSave: false,
      ProduceGlobaly: "false",
      replicate: false,
      local: false,
      research: false,
    };
    this.changeSubmitState = this.changeSubmitState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
  }

  changeInputState(){
    this.setState({inputChanged: true});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleSubmitText(event){
      event.preventDefault();
      this.submitData(document.getElementById('categoryInput').value, document.getElementById('contentInput').value);
    }

  changeSubmitState(event){
    this.setState({local : !this.state.local})
    this.setState({replicate : !this.state.replicate})
    this.setState({research : !this.state.research})
  }

   submitData(category, content){
    this.state.category = category;
    this.state.content = content;

    if(document.getElementById('researchCheckbox').checked === true){ console.log("Neeeeej");
      fetch("http://localhost:8081/produceRecord?category=" + this.state.category+ "&content=" + this.state.content + "&enableResearch=true",{
        method: 'POST',
        headers:{
           'Authorization': 'Bearer ' + localStorage.getItem("react-token")}
      })
      .then(
          // handle the result
          (result) => {
              this.setState({SuccessfulSave: true});
          },

          // Handle error
          (error) => {
              this.setState({
                  error
              })
          },
      )
    }
    else if(document.getElementById('replicationCheckbox').checked === true){ console.log("hej hej jag är replicate");
      fetch("http://localhost:8081/produceRecord?category=" + this.state.category+ "&content=" + this.state.content + "&enableResearch=false",{
        method: 'POST',
        headers:{
           'Authorization': 'Bearer ' + localStorage.getItem("react-token")}
      })
      .then(
          // handle the result
          (result) => {
              this.setState({SuccessfulSave: true});
          },

          // Handle error
          (error) => {
              this.setState({
                  error
              })
          },
      )
    }
    else {
      this.submitRecordLocally(category, content);
    }
  }

  submitRecordLocally(category, content){
    this.state.category = category;
    this.state.content = content;
    console.log(this.state.category);
    console.log(this.state.content);

    this.setState({showUsernames: false, showUserLog: true})
    fetch("http://localhost:8082/produceRecord?category=" + this.state.category+ "&content=" + this.state.content+ "&enableResearch=false",{
      method: 'POST',
      headers:{
         'Authorization': 'Bearer ' + localStorage.getItem("react-token")}
    })
    .then(
        // handle the result
        (result) => {
            this.setState({SuccessfulSave: true});
        },

        // Handle error
        (error) => {
            this.setState({
                error
            })
        },
    )

  }

  componentDidMount() {
    /*Collects data from Springboot */
    this.setState({isLoaded: true});

  }

  render(){
      const {isLoaded,} = this.state;
      if (!isLoaded) {
          return <div>Loading ...</div>
      }
      else{
        return (
          <div class = "container">

          <div class = "createMessageInputWindow">

              <div className="row">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="0" id="localCheckbox" />
                  <label class="form-check-label" for="flexCheckDefault" onChange={this.changeSubmitState}>
                    Local
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="1" id="replicationCheckbox"/>
                  <label class="form-check-label" for="flexCheckChecked" onChange={this.changeSubmitState}>
                    Replication
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="2" id="researchCheckbox"/>
                  <label class="form-check-label" for="flexCheckChecked" onChange={this.changeSubmitState}>
                    Research
                  </label>
                </div>
              </div>

            <form onSubmit={this.state.handleSubmit}>
              <textArea class="messageTextArea" id="categoryInput" ref={this.new_category} onChange ={()=> this.changeInputState()} placeholder="Enter category"/>
              <textArea class="messageTextArea" id="contentInput" ref={this.new_content} onChange ={()=> this.changeInputState()} placeholder="Enter content"/>
              <button class="btn btn-dark" onClick ={this.handleSubmitText}>Submit</button>

            </form>
          </div>

          <footer class = "page-footer font-small blue ">
            <Card className = "footer" variant="none">
            {
              this.state.SuccessfulSave?
              <div class="alert alert-success" className="alert-green" role="alert">Message sent!
                <button class="btn btn-dark" align = "center" onClick ={()=>this.setState({SuccessfulSave : false})}>Ok</button>
              </div>
              :null
            }
            </Card>
          </footer>

          </div> /* Stänger container*/
          );

        }

      }
    }
export default Messages;
