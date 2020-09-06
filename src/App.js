import React, {Component} from 'react'
import Select from 'react-select'
import API from './API'

import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      typeOptions : [
        { value: 1, label: 'Type 1' },
        { value: 2, label: 'Type 2' },

      ],
      projectOptions : [
        { value: 1, label: 'Project 1' },
        { value: 2, label: 'Project 2' },
      ],
    
    }
  }
  componentDidMount(){
    API.getTypes()
      .then(res => res.data)
      .then(types => {
        return types.map(type => {
          return {value:type.id,label:type.name}
        })
      })
      .then(typeOptions=>this.setState({typeOptions:typeOptions}))
  }

  handleTypesChange = (selectedTypeOption) => {
    console.log(selectedTypeOption)
    API.getSingleType(selectedTypeOption.value)
    .then(res => res.data.projects)
    .then(projects => {
      return projects.map(project => {
        return {value:project.id,label:project.name}
      })
    })
    .then(projectOptions=>this.setState({projectOptions:projectOptions}))

  }

  handleProjectsChange = (selectedProjectOption) => {
    console.log(selectedProjectOption)

  }
  render(){

    var { typeOptions,projectOptions } = this.state
    return (
      <div className="app">


          <div class="header">
            <ul class="menu">
              <li>
                <Select
                  onChange={this.handleTypesChange}
                  options={typeOptions}
                />
              </li>
              <li>
                <Select
                  onChange={this.handleProjectsChange}
                  options={projectOptions}
                />
              </li>

            </ul>

            
          </div>
        
      </div>
    );
  }
}

export default App;
