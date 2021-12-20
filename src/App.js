import React, { Component } from 'react';
import ListContacts from './ListContacts';
import PropTypes from "prop-types"
import * as ContactsAPI from './utils/ContactsAPI'
import CreatContact from './CreateContact';
import {Route} from 'react-router-dom'



class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount(){
    ContactsAPI.getAll()
    .then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  }

  removeContacts = (contact) =>{
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact)

  }

  createContact = (contact) =>{
    ContactsAPI.create(contact)
    .then((contact) =>{
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact])
      }))
    })

  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
           <ListContacts 
           contacts = {this.state.contacts}
           onDeleteContact = {this.removeContacts}
         />
        )} />
        <Route path='/create' render={({ history}) => (
          <CreatContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    );
  }
}
ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
}
export default App;
