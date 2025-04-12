import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Form from 'react-bootstrap/Form';

function FeedbackModel ({ isOpen, onClose }) {
  const [stars, setStars] = useState(0);
  const form = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_54xzqsl',
      'template_fief8cp',
      form.current,
      'fP_vOx40w3IO-mRJ-'
    )
    .then((result) => {
      console.log(result.text);
      alert('Feedback sent successfully!');
    }, (error) => {
      console.log(error.text);
      alert('Something went wrong.');
    });

    e.target.reset();
    isOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Feedback</h2>
        <Form ref={form} onSubmit={sendEmail}>
          <Form.Group className="mb-3" name='feedback' controlId="feedback">
            <Form.Label>Feedback</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" name='stars' controlId="stars">
            <Form.Label>Current rating: {stars}</Form.Label>
            <Form.Range min='1' max='5' onChange={(event) => {
						setStars(event.target.value);
					}}/>
          </Form.Group>
        </Form>

      </div>
    </div>
  );
}

export default FeedbackModel;