import { useState } from 'react'

const Form = ({ onAddEntry }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    if (fieldName === 'name') {
      setName(value);
    } else if (fieldName === 'message') {
      setMessage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      onAddEntry(name, message);
      setName('');
      setMessage('');
    }
  };

  return (
    <>
      <p>Form Component</p>
      <form onSubmit={handleSubmit}>
          <div className="formRow">
              <label>Name: </label>
              <input 
                type="text" 
                name="name"
                value={name}
                onChange={handleChange}
              />
          </div>
          <div className="formRow">
              <textarea 
                name="message"
                value={message}
                onChange={handleChange}
              ></textarea>
          </div>
          <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Form