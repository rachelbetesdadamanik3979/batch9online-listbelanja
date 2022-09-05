//-----------------------------------------------------------------------
//Tangkap beberapa element HTML

//Tangkap element HTML dengan ID modal & masukkan ke variable modal

let modal = document.getElementById('modal');

//Tangkap element HTML button dengan ID floating_button & masukkan ke variable floating_button

let floating_button = document.getElementById('floating_button');

//Tangkap element HTML dengan ID modal_bg & masukkan ke variable modal_bg

let modal_bg = document.getElementById('modal_bg');

//Tangkap element HTML form dengan ID addlist_form  & masukkan ke variable addlist_form

let addlist_form = document.getElementById('addlist_form');

//Menyimpan data inputan user yang merupakan object ke dalam sebuah ARRAY

//SHOPPING CART DATA dimasukkan ke dalam sebuah ARRAY.  DATA berasal dari hasil submit inputan user.ARRAY untuk menampung banyak object di dalamnya

let shopping_cart_data = []; //tipe data ARRAY

//Tangkap element HTML dengan ID root & masukkan ke variable root

let root = document.getElementById('root');

//Tangkap element HTML h3 dengan ID subtitle & masukkan ke variable subtitle

let subtitle = document.getElementById('subtitle');

//----------------------------------------------------------------------------

/*---EVENT LISTENER*/

//SHOW & HIDE element HTML MODAL (BUAT 2 FUNCTION yang nantinya akan dipanggil pada saat dibutuhkan)

//Buat sebuah function dengan nama showModal, untuk menampung beberapa property

function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}

//Buat sebuah function dengan nama hideModal, untuk menampung beberapa property

function hideModal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#f86c57';
  floating_button.style.transform = 'rotate(0deg)';
}

//---------------------------------------------------------------------------
//Tambahkan eventListener CLICK ke element HTML button dengan ID floating_button

floating_button?.addEventListener('click', () => {
  //Mengatur STYLE pada modal DISPLAY menjadi FLEX

  //Memunculkan Modal (form shopping cart)
  if (modal.style.display == 'none') {
    showModal(); //Panggil Function showModal yang telah kita buat sebelumnya
    return;
  }

  //Sembunyikan kembali modal
  hideModal(); //Panggil Function hideModal yang telah kita buat sebelumnya
}); //Tidak perlu ditambahkan event ke parameter arrow function

//Menambahkan eventListener ke modal_bg
modal_bg?.addEventListener('click', () => {
  //Sembunyikan modal, ketika di klik di element modal_bg
  hideModal();
});

//-------------------------------------------------------------------------------

//Menambahkan eventListener SUBMIT ke element HTML form dengan ID addlist_form (eventnya submit karena element berupa form)

addlist_form?.addEventListener('submit', (event) => {
  //STOP form dari RELOAD PAGE
  event.preventDefault();

  //-----------------------------------------------------------------------------

  //Tangkap VALUE dari inputan user

  //Tangkap VALUE dari masing-masing input field (field, item name & field price. Kita ambil valuenya dari event.target.id.value & masukkan ke variable barang & price)

  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // console.info({
  //   barang,
  //   harga,
  // }); //console info dalam bentuk object {}, menggunakan object, menampilkan data di console dulu

  //PUSH DATA ke variable shopping_cart_data
  shopping_cart_data.push({
    nama_barang: barang, //barang adalah sebuah objet yang menampung value dari inputan user <let barang = event.target.barang.value;>

    harga_barang: harga, //harga adalah sebuah object yang menampung value dari inputan user <let harga = event.target.harga.value;>

    tanggal: new Date().toDateString(), // tanggal adalah sebuah object. Tanggal berapa data dimasukkan
  }); //yang kita push adalah object, karena bentuk object, maka kita assign menggunakan ":" bukan "=" dan jika property lebih dari 2, maka menggunakan "," bukan ";"

  console.info(shopping_cart_data); //console array nya

  //Hide Modal
  hideModal(); //Ketika form sudah di submit maka function ini akan dipanggil dan dijalankan

  //CLEAR INPUT FIELD  (clear inputan user sebelumnya)
  event.target.barang.value = '';
  event.target.harga.value = '';

  //Panggil Function renderToHtml, harus dipanggildulu function yang sudah kita buat
  renderToHtml();
}); //Perlu ditambahkan event ke parameter arrow function dengan nama "event" karena kita perlu tangkap value dari inputan user

//-----------------------------------------------------------------------------------
//BUAT FUNCTION untuk RENDER HALAMAN HTML di element DIV dengan ID root
 

//RENDER FUNCTION

function renderToHtml() {
  //CLEAR element DIV dengan ID root. Jadi kalau ada data didalam, direset dulu
  root.innerHTML = '';

  //PERULANGAN

  //MAPPING HASIL ARRAY KE HALAMAN HTML. (root). Jadi kita akan mapping hasil array dari data yang ada di variable shopping_cart_data

  //Setiap data yang di submit akan dipecah-pecah (masing-masing item Array)

  shopping_cart_data.forEach((e, i) => {
    root.innerHTML += `   
      <div class="card">
        <small> ${e.tanggal} </small> 

        <div>
          ${e.nama_barang} <span> Rp. ${e.harga_barang} </span>
        </div>

        <button onclick="handleDelete(${i})">Done</button> 

      </div>

    `; //Membuat sebuah element HTML dengan string, harus menggunakan back tick (`). Memasukkan data-data dari variable yang ada di javascript. //${} adalah placeholder. RP. adalah data static
  }); //e adalah element / value, Ketika diklik button Done, akan dijalankan function handleDelete yang butuh index. Index diambil dari paramater i. i adalah index dari masing-masing value pada shopping_data_cart / array kita.
}

//FUNCTION untuk hapus / delete item pada array shopping_cart_data
function handleDelete(index) {
  shopping_cart_data.splice(index, 1); //Array methodnya kita isi dengan index, dan count/ berapa data yang inginkita hapus

  renderToHtml(); //Kita panggil function renderToHtml karena data ini yang kita akan hapus
} //Perlu ditambahkan parameter index, karena kita menggunakan splice untuk menghapus data pada array shopping_cart_data, sesuai dengan index yang kita tentukan, index ke berapa & berapa total data yang dihapus
//---------------------------------------------------------------------------------


//Tambahkan function javascript Date, ke element HTML h3 dengan ID subtitle

subtitle.innerHTML = new Date().toLocaleDateString();
