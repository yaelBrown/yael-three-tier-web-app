const GuestBookEntry = ({ name = "Unknown Poster", message }) => {
  if (!message) return null
  
  return (
    <div className="gbMsg">
      <p>{message}</p>
      <em className="gbMsgName">{name}</em>
    </div>
  )
}

const Entries = ({ messages = [] }) => {
  return (
    <div>
      <p>Entries Component</p>
      {
        messages.map((e, index) => (
          <GuestBookEntry key={index} name={e.name} message={e.message} />
        ))
      }
    </div>
  )
}


export default Entries