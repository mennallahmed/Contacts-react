import React, {Component} from "react"
import {Link} from 'react-router-dom'
import ImageInput from "./ImageInput"
import serializeForm from 'form-serialize'

class CreatContact extends Component{
  handleSubmit=(e) =>{
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    console.log(values)
    if(this.props.onCreateContact)
    {
      console.log(values)
      this.props.onCreateContact(values)
    }

  }
  render(){
    return(
      <div>
        <Link 
           className="close-create-contact"
           to='/'>
             close
        </Link>
        <form onSubmit={this.handleSubmit} className="create-contact-form">
          <ImageInput 
             className="create-contact-avatar-input"
             name='avatarURL'
             maxHeight={64}>
          </ImageInput>
          <div className="create-contact-details">
            <input type='text' name='name' placeholder="Name"></input>
            <input type='text' name='handle' placeholder="Handle"></input>
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreatContact