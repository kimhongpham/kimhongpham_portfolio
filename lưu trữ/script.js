// Hàm làm nổi bật tab bên trái khi cuộn đến nội dung
function highlightTab(tabName) {
    var tabbuttons = document.getElementsByClassName("tab-button");
    
    // Loại bỏ lớp 'active' khỏi tất cả các tab
    for (var i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    // Tìm tab theo tên và thêm class 'active' vào tab đó
    var activeButton = Array.from(tabbuttons).find(button => 
        button.textContent.trim().toLowerCase() === tabName.toLowerCase()
    );
    if (activeButton) {
        activeButton.classList.add("active");
    }
}

// Hàm cuộn đến nội dung tab tương ứng
function scrollToTab(tabName) {
    highlightTab(tabName);
    const section = document.getElementById(tabName);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Hàm theo dõi khi cuộn đến nội dung tab bên phải
function onScroll() {
    var sections = document.querySelectorAll('.tab-content');
    var tabButtons = document.querySelectorAll('.tab-button');

    let currentTab = null;

    // Kiểm tra phần tử đang ở trong viewport
    sections.forEach((section, index) => {
        var rect = section.getBoundingClientRect();
        
        // Kiểm tra nếu phần tử đã hoàn toàn hoặc phần lớn đã xuất hiện trong viewport
        if (rect.top <= 0 && rect.bottom >= window.innerHeight * 0.2) { // Phần tử vượt qua 20% viewport
            currentTab = section.getAttribute('id'); // Lấy id của phần tử đang hiển thị
        }
    });

    // Nếu tìm thấy tab đang hiển thị, highlight tab đó
    if (currentTab) {
        highlightTab(currentTab);
    }
}

// Lắng nghe sự kiện cuộn để tự động làm nổi bật tab
window.addEventListener('scroll', onScroll);
