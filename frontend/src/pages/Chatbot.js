import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Replace with actual user token logic
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/chatbot/history', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setMessages(res.data))
      .catch(() => setMessages([]));
  }, []);

  const handleAsk = async (e) => {
    e.preventDefault();
    // Replace with actual user token logic
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/chatbot/ask', { question }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResponse(res.data.response);
      setMessages([...messages, { message: question, response: res.data.response }]);
      setQuestion('');
    } catch (err) {
      setResponse('Error getting answer');
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Chatbot / AMA</Typography>
      <form onSubmit={handleAsk}>
        <TextField label="Ask a question" value={question} onChange={e => setQuestion(e.target.value)} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Ask</Button>
      </form>
      {response && <Typography color="primary" sx={{ mt: 2 }}>{response}</Typography>}
      <Typography variant="h6" sx={{ mt: 4 }}>Chat History:</Typography>
      <List>
        {messages.map((msg, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`Q: ${msg.message}`}
              secondary={`A: ${msg.response}`}
            />
          </ListItem>
        ))}
      </List>
      </Container>
    </>
  );
};

export default Chatbot;
