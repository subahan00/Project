import React, { useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');
  const [emails, setEmails] = useState([]);

  const handleUpClick = () => {
    setText(text.toUpperCase());
  };

  const handleloClick = () => {
    setText(text.toLowerCase());
  };

  const handleOnChange = (event) => {
    const inputText = event.target.value;
    setText(inputText);
    extractEmails(inputText); // Extract emails whenever the text changes
  };
  const handlePasteClick=()=>{
    navigator.clipboard.readText().then(
      (clipboardText)=>{
        setText(clipboardText)
      }
    )
  }

  // Function to extract emails using regex
  const extractEmails = (inputText) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const extractedEmails = inputText.match(emailRegex) || [];
    setEmails(extractedEmails);
  };
  const handleClearClick=()=>{
    setText('');
  }
  const handleCopyClick=()=>{
    navigator.clipboard.writeText(text).then(
      ()=>{
        alert('Copied to clipboard')
      }
    ).catch((err)=>{
      console.log(err);
    }
    )
  }

  // Improved word count logic
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <>
      <div className='container' style={{color: props.mode === 'light' ? 'black' : 'white'}}>
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea
            type="text"
            className="form-control"
            onChange={handleOnChange}
            id="mytext"
            value={text}
            rows={11}
            placeholder="Enter your text here..."
            style={{backgroundColor:props.mode==='light'?'white':'black',
                color:props.mode==='light'?'black':'white',
               '--placeholder-color': props.mode === 'light' ? 'gray' : 'lightgray'
            }}
            
          />
        </div>
        <button onClick={handleUpClick} className={`btn btn-${props.mode==='light'?'dark':'light'} mx-2`}>
          Convert to Uppercase
        </button>
        <button onClick={handleloClick} className={`btn btn-${props.mode==='light'?'dark':'light'} mx-2`}>
          Convert to Lowercase
        </button>
        <button onClick={handleClearClick} className={`btn btn-${props.mode==='light'?'dark':'light'} mx-2`}>
          Clear
        </button>
        <button onClick={handleCopyClick} className={`btn btn-${props.mode==='light'?'dark':'light'} mx-2`}>
         Copy to clipboard
        </button>
        <button onClick={handlePasteClick} className={`btn btn-${props.mode==='light'?'dark':'light'} mx-2`}>
        Paste
        </button>
      
      </div>
      <div className='container my-3' style={{color: props.mode === 'light' ? 'black' : 'white'}} >
        <h2>Text Summary</h2>
        <p>
          <b>{wordCount}</b> words and <b>{text.length}</b> characters
        </p>
        <p>
          <b>{0.008 * wordCount}</b> minutes read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter something in the textbox to preview it here"}</p>
      </div>
      <div className='container my-3' style={{color: props.mode === 'light' ? 'black' : 'white'}}>
        <h2>Extracted Emails</h2>
        {emails.length > 0 ? (
          <ul>
            {emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}

          </ul>
        ) : (
          <p>No emails found in the text.</p>
        )}
      </div>
    </>
  );
}