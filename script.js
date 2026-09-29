const dataStaff = [
    {
        foto: "https://via.placeholder.com/150/6366f1/ffffff?text=EHEY",
        nama: "Admin EHEY",
        username: "ehey.official",
        tautan: "https://tiktok.com/@ehey.official",
        peran: "Pendiri & Admin"
    },
    {
        foto: "https://via.placeholder.com/150/ec4899/ffffff?text=LEADER",
        nama: "Kepala Divisi",
        username: "ehey.leader",
        tautan: "https://tiktok.com/@ehey.leader",
        peran: "Manajer MCN"
    }
];

function ambilMember() {
    const simpan = localStorage.getItem('eheyMembers');
    return simpan ? JSON.parse(simpan) : [];
}
function simpanMember(data) {
    localStorage.setItem('eheyMembers', JSON.stringify(data));
}

function buatKartu(profil, jenis) {
    return `
        <div class="profil-kartu">
            <img src="${profil.foto}" alt="${profil.nama}" loading="lazy">
            <h3>${profil.nama}</h3>
            <p class="username">@${profil.username}</p>
            <span class="peran ${jenis}">${profil.peran}</span>
            <a href="${profil.tautan}" target="_blank" class="tautan-tiktok">
                <i class="fab fa-tiktok"></i> Follow
            </a>
        </div>
    `;
}

function tampilStaff() {
    const konten = dataStaff.map(p => buatKartu(p, 'staff')).join('');
    const staffGrid = document.getElementById('staffGrid');
    const staffArea = document.getElementById('staffArea');
    if (staffGrid) staffGrid.innerHTML = konten;
    if (staffArea) staffArea.innerHTML = konten;
}

function tampilMember() {
    const daftar = ambilMember();
    const area = document.getElementById('memberArea');
    if (!area) return;
    
    if (daftar.length === 0) {
        area.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:var(--abu);">Belum ada anggota yang bergabung. Jadilah yang pertama!</p>';
        return;
    }
    area.innerHTML = daftar.map(p => buatKartu({...p, peran: 'Member'}, 'member')).join('');
}

const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('aktif');
    });
}

const loginBtn = document.getElementById('loginBtn');
const loginTiktokBtn = document.getElementById('loginTiktokBtn');
const daftarTiktok = document.getElementById('daftarTiktok');
const loginModal = document.getElementById('loginModal');
const tutupModal = document.querySelector('.tutup');
const formLogin = document.getElementById('formLogin');
const profilPengguna = document.getElementById('profilPengguna');
const keluarBtn = document.getElementById('keluarBtn');

function bukaModal() {
    if (loginModal) loginModal.classList.add('aktif');
}
function tutupModalFungsi() {
    if (loginModal) loginModal.classList.remove('aktif');
}

if (loginBtn) loginBtn.addEventListener('click', bukaModal);
if (loginTiktokBtn) loginTiktokBtn.addEventListener('click', bukaModal);
if (daftarTiktok) daftarTiktok.addEventListener('click', bukaModal);
if (tutupModal) tutupModal.addEventListener('click', tutupModalFungsi);
window.addEventListener('click', (e) => {
    if (e.target === loginModal) tutupModalFungsi();
});

if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const foto = document.getElementById('loginFoto').value;
        const nama = document.getElementById('loginNama').value;
        const user = document.getElementById('loginUser').value.trim();
        const tautan = document.getElementById('loginTautan').value;

        const pFoto = document.getElementById('profilFoto');
        const pNama = document.getElementById('profilNama');
        const pUser = document.getElementById('profilUsername');
        const pTautan = document.getElementById('profilTautan');
        
        if (pFoto) pFoto.src = foto;
        if (pNama) pNama.textContent = nama;
        if (pUser) pUser.textContent = user;
        if (pTautan) {
            pTautan.href = tautan;
            pTautan.target = '_blank';
        }
        if (profilPengguna) profilPengguna.style.display = 'block';

        const daftar = ambilMember();
        daftar.push({ foto, nama, username: user, tautan });
        simpanMember(daftar);

        alert('✅ Berhasil! Data sudah masuk ke daftar anggota.');
        formLogin.reset();
        tutupModalFungsi();
    });
}

if (keluarBtn) {
    keluarBtn.addEventListener('click', () => {
        if (profilPengguna) profilPengguna.style.display = 'none';
    });
}

const tambahMemberManual = document.getElementById('tambahMemberManual');
const formTambahModal = document.getElementById('formTambahModal');
const formTambahMember = document.getElementById('formTambahMember');

if (tambahMemberManual && formTambahModal) {
    tambahMemberManual.addEventListener('click', () => {
        formTambahModal.classList.add('aktif');
    });
}
if (formTambahModal) {
    formTambahModal.querySelector('.tutup').addEventListener('click', () => {
        formTambahModal.classList.remove('aktif');
    });
    window.addEventListener('click', (e) => {
        if (e.target === formTambahModal) formTambahModal.classList.remove('aktif');
    });
}
if (formTambahMember) {
    formTambahMember.addEventListener('submit', (e) => {
        e.preventDefault();
        const daftar = ambilMember();
        daftar.push({
            foto: document.getElementById('mFoto').value,
            nama: document.getElementById('mNama').value,
            username: document.getElementById('mUser').value.trim(),
            tautan: document.getElementById('mTautan').value
        });
        simpanMember(daftar);
        alert('✅ Member berhasil ditambahkan!');
        formTambahMember.reset();
        formTambahModal.classList.remove('aktif');
        tampilMember();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    tampilStaff();
    tampilMember();
});
