### 🌍 Landing Page Translator using DeepL API
This project allows users to upload an HTML file and automatically translate its content into multiple languages using the DeepL Translation API. It's built with Node.js, Express, and a simple HTML frontend.

### 🚀 Features
Upload and translate .html or .htm files
Translate into 30+ supported languages
Powered by DeepL API (supports document translation for better formatting)
Download the translated file directly from the browser

### 📁 Project Structure
<pre> ``` project-root/
│
├── server.js             # Express server with DeepL integration
├── uploads/              # Temporary file uploads (auto-created by multer)
├── public/
│   ├── index.html        # Frontend HTML interface
│   └── styles.css        # Optional: Styling file
└── README.md             # This file
``` </pre>

### ⚙️ Prerequisites
Node.js (v14+ recommended)
A valid DeepL API key

### 🛠 Installation & Setup
1. Clone the repository:
```markdown
git clone https://github.com/yourusername/landing-page-translator.git
cd landing-page-translator
```
2. Install dependencies:
```markdown
npm install
```
3. Set your DeepL API key:
Open server.js and replace:
```markdown
const DEEPL_API_KEY = "your_actual_deepl_api_key_here";
```
with your actual DeepL API key.
⚠️ Use https://api.deepl.com/v2 for Pro users or https://api-free.deepl.com/v2 for Free accounts.
4. Start the server:
node server.js
5. Access the app:
Open your browser and navigate to:
http://localhost:3000

### 🌐 Supported Languages
The app supports translation into the following languages:
* English (EN)
* Arabic (AR)
* Bulgarian (BG)
* Czech (CS)
* Danish (DA)
* German (DE)
* Greek (EL)
* Spanish (ES)
* Estonian (ET)
* Finnish (FI)
* French (FR)
* Hungarian (HU)
* Indonesian (ID)
* Italian (IT)
* Japanese (JA)
* Korean (KO)
* Lithuanian (LT)
* Latvian (LV)
* Norwegian (NB)
* Dutch (NL)
* Polish (PL)
* Portuguese (PT)
* Romanian (RO)
* Russian (RU)
* Slovak (SK)
* Slovenian (SL)
* Swedish (SV)
* Turkish (TR)
* Chinese (ZH)

### 📄 License
MIT License

### 🙌 Acknowledgements
* DeepL API
* Express.js
* Multer
* Axios