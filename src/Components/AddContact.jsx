export default function AddContact(props){
    return (
        <aside>
            <h2>New Contact</h2>
            <form onSubmit={props.addContact}>
                <input type="text" name="name" placeholder="Username" />
                <input type="email" name="email" placeholder="Email" />
                <input type="tel" name="phone" placeholder="Phone" />
                <button type="submit">Add Contact</button>
            </form>
        </aside>
    )
}  