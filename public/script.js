// Handle form submission to add new mahasiswa
document.getElementById('mahasiswa-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent form from submitting normally
  
    const nama = document.getElementById('nama').value;
    const jurusan = document.getElementById('jurusan').value;
  
    // Send data to backend to add new mahasiswa
    fetch('http://localhost:3000/mahasiswa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nama, jurusan }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Mahasiswa ditambahkan:', data);
        fetchMahasiswa(); // Refresh the mahasiswa list
      })
      .catch(error => console.error('Error:', error));
  });
  
  // Fetch and display mahasiswa from backend when "Lihat Mahasiswa" button is clicked
  document.getElementById('lihat-mahasiswa').addEventListener('click', fetchMahasiswa);
  
  // Fetch mahasiswa from the backend and display them
  function fetchMahasiswa() {
    fetch('http://localhost:3000/mahasiswa')
      .then(response => response.json())
      .then(data => {
        const mahasiswaList = document.getElementById('mahasiswa-list');
        mahasiswaList.innerHTML = '';  // Clear existing list
  
        data.forEach(mahasiswa => {
          const listItem = document.createElement('li');
          listItem.textContent = `${mahasiswa.nama} - ${mahasiswa.jurusan}`;
          mahasiswaList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  