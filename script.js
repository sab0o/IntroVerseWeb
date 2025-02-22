document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Fungsi untuk menambahkan class 'active' ke link yang sesuai dengan section aktif
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                if (entry.isIntersecting) {
                    // Hapus class 'active' dari semua link
                    navLinks.forEach((link) => {
                        link.classList.remove('active');
                    });
                    // Tambahkan class 'active' pada link yang sesuai dengan section aktif
                    document.querySelector(`nav ul li a[href="#${id}"]`).classList.add('active');
                }
            });
        },
        {
            threshold: 0.6,  // Section aktif jika setidaknya 60% terlihat di viewport
        }
    );

    // Pasang observer untuk setiap section
    sections.forEach((section) => {
        observer.observe(section);
    });

    // Fungsi smooth scroll ketika link navigasi di klik
    navLinks.forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Kurangi dengan tinggi header
                behavior: 'smooth',
            });            

            // Tambahkan class 'active' pada link yang diklik dan hapus dari yang lain
            navLinks.forEach((link) => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});
