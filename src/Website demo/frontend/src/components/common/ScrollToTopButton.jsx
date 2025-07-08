import React, { useState, useEffect } from 'react';
// Nếu bạn muốn dùng CButton của CoreUI thay cho thẻ button thông thường, thì import CButton ở đây
// import { CButton } from '@coreui/react';

const ScrollToTopButton = () => {
    // State để kiểm soát việc hiển thị nút
    const [isVisible, setIsVisible] = useState(false);

    // Hàm xử lý sự kiện cuộn trang
    const toggleVisibility = () => {
        // Nếu cuộn xuống quá 300px, hiển thị nút
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            // Ngược lại, ẩn nút
            setIsVisible(false);
        }
    };

    // Hàm xử lý khi click vào nút: cuộn về đầu trang mượt mà
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, // Cuộn về vị trí top là 0
            behavior: 'smooth' // Hiệu ứng cuộn mượt mà
        });
    };

    // Sử dụng useEffect để thêm và gỡ bỏ Event Listener khi component được mount/unmount
    useEffect(() => {
        // Thêm listener cho sự kiện 'scroll' trên window
        window.addEventListener('scroll', toggleVisibility);

        // Cleanup function: Gỡ bỏ listener khi component bị unmount
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []); // Mảng dependencies rỗng đảm bảo effect chỉ chạy một lần sau render đầu tiên

    // Render nút chỉ khi isVisible là true
    return (
        <> {/* Sử dụng React Fragment nếu không muốn có thêm thẻ div bọc ngoài */}
            {isVisible && (
                // Sử dụng thẻ button thông thường, hoặc CButton nếu bạn muốn style CoreUI
                <button
                    onClick={scrollToTop} // Gán hàm xử lý click
                    style={{
                        // Style để đặt nút cố định ở góc dưới bên phải
                        position: 'fixed',
                        bottom: '20px', // Cách đáy 20px
                        right: '20px', // Cách lề phải 20px
                        zIndex: 1000, // Đảm bảo nút nằm trên các phần tử khác
                        // Style hiển thị của nút
                        backgroundColor: "rgba(0, 113, 188, 0.6)", // Màu nền (ví dụ, bạn có thể thay đổi)
                        color: 'white', // Màu chữ/icon
                        width: '60px', // Kích thước ngang
                        height: '60px', // Kích thước dọc
                        borderRadius: '50%', // Làm tròn thành hình tròn
                        border: 'none', // Bỏ viền
                        cursor: 'pointer', // Biến đổi con trỏ thành pointer khi rê chuột
                        display: 'flex', // Dùng flex để căn giữa nội dung bên trong
                        justifyContent: 'center', // Căn giữa theo chiều ngang
                        alignItems: 'center', // Căn giữa theo chiều dọc
                        fontSize: '20px', // Kích thước font cho ký hiệu mũi tên
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Đổ bóng nhẹ (tùy chọn)
                    }}
                >
                    &uarr; {/* Ký tự mũi tên lên */}
                    {/* Hoặc bạn có thể dùng text "Top" hoặc một icon từ CoreUI Icon */}
                    {/* Ví dụ nếu dùng CoreUI Icon: <CIcon icon={cilArrowCircleTop} size="lg" /> */}
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;