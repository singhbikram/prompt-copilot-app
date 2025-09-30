import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import axios from 'axios';

const Localization = () => {
  const [translations, setTranslations] = useState([]);
  const [key, setKey] = useState('');
  const [en, setEn] = useState('');
  const [es, setEs] = useState('');
  const [fr, setFr] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/localization')
      .then(res => setTranslations(res.data))
      .catch(() => setTranslations([]));
  }, []);

  const handleAddTranslation = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/localization', {
        key,
        translations: { en, es, fr }
      });
      setMessage('Translation added!');
      setKey(''); setEn(''); setEs(''); setFr('');
    } catch (err) {
      setMessage('Add failed');
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Localization</Typography>
      <form onSubmit={handleAddTranslation}>
        <TextField label="Key" value={key} onChange={e => setKey(e.target.value)} fullWidth margin="normal" />
        <TextField label="English" value={en} onChange={e => setEn(e.target.value)} fullWidth margin="normal" />
        <TextField label="Spanish" value={es} onChange={e => setEs(e.target.value)} fullWidth margin="normal" />
        <TextField label="French" value={fr} onChange={e => setFr(e.target.value)} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Add Translation</Button>
      </form>
      {message && <Typography color="primary" sx={{ mt: 2 }}>{message}</Typography>}
      <Typography variant="h6" sx={{ mt: 4 }}>Existing Translations:</Typography>
      <List>
        {translations.map(t => (
          <ListItem key={t._id}>
            <ListItemText
              primary={t.key}
              secondary={`EN: ${t.translations.en} | ES: ${t.translations.es} | FR: ${t.translations.fr}`}
            />
          </ListItem>
        ))}
      </List>
      </Container>
    </>
  );
};

export default Localization;
