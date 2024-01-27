import { useRef, useState } from "react"

export default function ContactList(props){
    
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef()
    let [editMode, setEditMode] = useState({ mode: true, phone: null})

    // execute update function
    function handleUpdate(id){
        let name = nameRef.current.value
        let email = emailRef.current.value
        let phone = phoneRef.current.value
        setEditMode({mode: false, phone: null})
        props.updateContact(name, email, phone, id);
    }


    return (
        <main>
            <table className="contactContainer">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.contactList.map((value, i) => {
                        if(editMode && editMode.phone === value.phone){
                            return  <tr key={i}>
                                        <td><input type="text" ref={nameRef} defaultValue={value.name} /></td>
                                        <td><input type="email" ref={emailRef} defaultValue={value.email} /></td>
                                        <td><input type="tel" ref={phoneRef} defaultValue={value.phone}/></td>
                                        <td style={{textAlign: 'right'}}>
                                            <i className="fa-solid fa-circle-check" onClick={(e) => handleUpdate(value.id)} ></i>
                                        </td>
                                    </tr>                               
                        }
                        else{
                            return <tr key={i}>
                                        <td>{value.name}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone}</td>
                                        <td style={{textAlign: 'right'}}>
                                            <i className="fa-solid fa-pencil" onClick={() => setEditMode({mode: true, phone: value.phone})}></i>
                                            &nbsp;&nbsp;&nbsp;
                                            <i className="fa-solid fa-trash-can" onClick={() => props.deleteContact(value.id)}></i>
                                        </td>
                                    </tr>
                        }
                    })}

                </tbody>
            </table>

        </main>
    )
}