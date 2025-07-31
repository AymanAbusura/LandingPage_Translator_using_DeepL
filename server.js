const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

const DEEPL_API_KEY = "your_actual_deepl_api_key_here"; // <-- Replace with your real API key
const DEEPL_API_URL = 'https://api-free.deepl.com/v2'; // <-- FOR PRO USE https://api.deepl.com/v2

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/translate', upload.single('file'), async (req, res) => {
  const { file } = req;
  const { target_lang } = req.body;

  if (!file || !target_lang) {
    return res.status(400).json({ error: 'Missing file or target language' });
  }

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(file.path), file.originalname);
    form.append('target_lang', target_lang);
    form.append('formality', 'prefer_more');
    form.append('preserve_formatting', '1');

    const uploadResp = await axios.post(`${DEEPL_API_URL}/document`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      },
    });

    const { document_id, document_key } = uploadResp.data;

    let status = 'queued';
    while (status !== 'done') {
      await new Promise(r => setTimeout(r, 1500));
      const statusResp = await axios.get(`${DEEPL_API_URL}/document/${document_id}`, {
        params: { document_key },
        headers: { Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}` },
      });

      status = statusResp.data.status;
      if (status === 'error') throw new Error('Translation failed');
    }

    const translatedResp = await axios.get(`${DEEPL_API_URL}/document/${document_id}/result`, {
      params: { document_key },
      headers: { Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}` },
      responseType: 'stream',
    });

    res.setHeader('Content-Disposition', `attachment; filename=translated_${file.originalname}`);
    translatedResp.data.pipe(res);

    translatedResp.data.on('end', () => fs.unlink(file.path, () => {}));
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Translation failed' });
    fs.unlink(file.path, () => {});
  }
});

app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});