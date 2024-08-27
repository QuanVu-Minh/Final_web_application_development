document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn form gửi theo cách mặc định
      let valid = true;
      let errorMessages = [];

      // Kiểm tra trường tên
      const name = document.getElementById("name");
      if (name.value.trim() === "") {
        errorMessages.push("Tên không được để trống.");
        name.classList.add("error");
        valid = false;
      } else {
        name.classList.remove("error");
      }

      // Kiểm tra trường email
      const email = document.getElementById("email");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        errorMessages.push("Email không hợp lệ, phải có @ và .com.");
        email.classList.add("error");
        valid = false;
      } else {
        email.classList.remove("error");
      }

      // Kiểm tra trường số điện thoại
      const phone = document.getElementById("phone");
      const phonePattern = /^(?:\+84|0)(?:\d{9}|\d{10})$/;
      if (!phonePattern.test(phone.value)) {
        errorMessages.push(
          "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng."
        );
        phone.classList.add("error");
        valid = false;
      } else {
        phone.classList.remove("error");
      }

      // Kiểm tra trường địa chỉ
      const address = document.getElementById("address");
      if (address.value.trim() === "") {
        errorMessages.push("Địa chỉ không được để trống.");
        address.classList.add("error");
        valid = false;
      } else {
        address.classList.remove("error");
      }

      // Nếu có lỗi thì hiển thị alert thông báo lỗi và không gửi email
      if (!valid) {
        alert(errorMessages.join("\n"));
        return; // Dừng lại và không gửi email nếu form không hợp lệ
      }

      // Nếu form hợp lệ, tiến hành gửi email
      emailjs.init({
        publicKey: "B86ZECEEQ4GNplbIH", // Thay bằng publicKey của bạn từ EmailJS
      });

      emailjs
        .send("service_1v9va84", "template_9sw2p48", {
          to_name: "Cửa hàng",
          from_name: name.value,
          from_email: email.value,
          phone_number: phone.value,
          address: address.value,
        })
        .then(function (response) {
          // Hiển thị thông báo thành công
          alert("Thông tin mua hàng của bạn đã được gửi đi!");

          // Xóa các trường input sau khi gửi thành công
          name.value = "";
          email.value = "";
          phone.value = "";
          address.value = "";
        })
        .catch(function (error) {
          alert("Đã xảy ra lỗi khi gửi email.");
        });
    });
});
