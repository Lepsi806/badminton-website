const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend läuft!' });
});

// Probetraining Anmeldung
app.post('/api/probetraining', async (req, res) => {
  try {
    const data = {
      ...req.body,
      anmeldung_datum: new Date().toISOString()
    };

    const { data: result, error } = await supabase
      .from('probetraining_anmeldungen')
      .insert([data]);

    if (error) throw error;

    res.json({ 
      success: true, 
      message: 'Anmeldung erfolgreich gespeichert',
      data: result 
    });
  } catch (error) {
    console.error('Fehler:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Fehler beim Speichern der Anmeldung',
      error: error.message 
    });
  }
});

// Turnier Anmeldung
app.post('/api/turnier', async (req, res) => {
  try {
    const data = {
      ...req.body,
      anmeldung_datum: new Date().toISOString()
    };

    const { data: result, error } = await supabase
      .from('turnier_anmeldungen')
      .insert([data]);

    if (error) throw error;

    res.json({ 
      success: true, 
      message: 'Turnieranmeldung erfolgreich gespeichert',
      data: result 
    });
  } catch (error) {
    console.error('Fehler:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Fehler beim Speichern der Turnieranmeldung',
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
