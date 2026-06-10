document.getElementById("contact_form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Initialize EmailJS with your Public Key
    emailjs.init("ZtrPvmZzYP3PNJiUr"); // Replace with your EmailJS Public Key

    // Get form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Validate form fields
    if (!name || !email || !subject || !message) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill out all fields.",
        });
        return;
    }

    // Send email using EmailJS
    emailjs.send("service_ox9ikza", "template_z6fp345", {
        Name: name,
        Email: email,
        Subject: subject,
        Message: message,
        date: new Date().toLocaleString(), // Adds the current date/time
    })
    .then(response => {
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your message has been successfully sent.",
            confirmButtonColor: "#3085d6",
        });

        document.getElementById("contact_form").reset(); // Clear form after submission
    })
    .catch(error => {
        console.error("EmailJS Error:", error);
        Swal.fire({
            icon: "error",
            title: "Failed to Send",
            text: "There was an issue sending your message. Please try again.",
        });
    });
});
