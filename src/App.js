import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import AddContact from "./Components/AddContact";
import ContactList from "./Components/ContactList";

function App() {

  const [contactList, setContactList] = useState([])
  
  // get contact on intitial render
  useEffect(() => {
    async function getContact(){
      let contact = await axios.get('https://jsonplaceholder.typicode.com/users')
      setContactList(contact.data)
    }
    getContact()
  }, [])

  // add contact
  async function addContact(e){
    e.preventDefault()
    let contact = await axios.post('https://jsonplaceholder.typicode.com/users', {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      },)
      // empty input field after add contact
      e.target.name.value = ''
      e.target.email.value = ''
      e.target.phone.value = ''

    setContactList(pre => [ contact.data, ...pre])
  }

  // update contact
  async function updateContact(name, email, phone, id){
    try{
      
      let contact = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        id, name, email, phone 
        })
      let newList = contactList.filter((value) => {
        return value.id !== contact.data.id
      })
      setContactList([contact.data, ...newList])
    }
    catch(err){
      // since api update feature is limited to 10 contact only
      // i have faked update contact if its id no. is > 10
      let newList = contactList.filter((value) => {
        return value.id !== id
      })
      setContactList([ { id, name, email, phone}, ...newList])
    }
  }

  // delete contact
  async function deleteContact(id){
    let name = null; 
    let email = null;
    let phone = null
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`, {
      id, name, email, phone 
      })
    let newList = contactList.filter((value) => {
      return value.id !== id
    })
    setContactList(newList)
  }


  
  return (
    <>
      <Navbar />
      <div className="flex">
        <AddContact addContact={addContact} />
        <ContactList contactList={contactList}
                     updateContact={updateContact}
                     deleteContact={deleteContact} />
      </div>

    </>
    
  );
}



export default App;
