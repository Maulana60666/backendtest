// Import Express dan Body-Parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();  // Inisialisasi Express
const port = 3000;  // Set port untuk server
const mongoose = require('mongoose');

// Serve static files from the "public" folder
app.use(express.static('public'));


const cors = require('cors');

// Enable CORS for all routes
app.use(cors());


// Connect ke MongoDB
mongoose.connect('mongodb://localhost/BACKEND-PROJECT', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Berhasil terkoneksi ke MongoDB'))
  .catch(err => console.log('Gagal terkoneksi ke MongoDB', err));


// Middleware: buat parsing JSON data dari request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data Dummy (contoh data mahasiswa)
let mahasiswaData = [
  { id: 1, nama: 'Ahmad', jurusan: 'Teknik Informatika' },
  { id: 2, nama: 'Budi', jurusan: 'Manajemen' },
];

// Route untuk menampilkan data mahasiswa
app.get('/mahasiswa', async (req, res) => {
    try {
      const mahasiswa = await Mahasiswa.find();  // Ambil semua mahasiswa dari database
      res.json(mahasiswa);  // Kirimkan data mahasiswa sebagai respons
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Route untuk menambah data mahasiswa baru
const { body, validationResult } = require('express-validator');

// Validasi data mahasiswa
// Rute untuk menambah data mahasiswa baru
app.post('/mahasiswa', [
    body('nama').not().isEmpty().withMessage('Nama harus diisi'),
    body('jurusan').not().isEmpty().withMessage('Jurusan harus diisi')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { nama, jurusan } = req.body;
    const mahasiswa = new Mahasiswa({
      nama: nama,
      jurusan: jurusan
    });
  
    try {
      const newMahasiswa = await mahasiswa.save();
      res.status(201).json(newMahasiswa); // Return the added mahasiswa
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// Rute untuk update data mahasiswa berdasarkan ID
app.put('/mahasiswa/:id', (req, res) => {
    const { id } = req.params;  // Ambil ID dari parameter URL
    const { nama, jurusan } = req.body;  // Ambil data yang dikirim di body request
    
    let mahasiswa = mahasiswaData.find(m => m.id === parseInt(id));  // Cari mahasiswa berdasarkan ID
  
    if (mahasiswa) {
      mahasiswa.nama = nama || mahasiswa.nama;  // Update nama jika ada data baru
      mahasiswa.jurusan = jurusan || mahasiswa.jurusan;  // Update jurusan jika ada data baru
      res.json(mahasiswa);  // Kirim data mahasiswa yang sudah diupdate
    } else {
      res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }
  });
  
  
// Rute untuk hapus data mahasiswa berdasarkan ID
app.delete('/mahasiswa/:id', (req, res) => {
    const { id } = req.params;  // Ambil ID dari parameter URL
    const index = mahasiswaData.findIndex(m => m.id === parseInt(id));  // Cari index mahasiswa berdasarkan ID
  
    if (index !== -1) {
      mahasiswaData.splice(index, 1);  // Hapus mahasiswa berdasarkan index
      res.status(200).json({ message: 'Mahasiswa berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }
  });
  
// Connect ke MongoDB
mongoose.connect('mongodb://localhost/BACKEND-PROJECT', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Berhasil terkoneksi ke MongoDB'))
  .catch(err => console.log('Gagal terkoneksi ke MongoDB', err));


// Buat schema untuk mahasiswa
const mahasiswaSchema = new mongoose.Schema({
    nama: String,
    jurusan: String
  });
  
  // Buat model untuk mahasiswa
  const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema);
  


  // Mulai server
  app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

