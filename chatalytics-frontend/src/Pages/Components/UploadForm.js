
function uploadForm () {
    const themes = {
        "default": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"],
        "light": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"],
        "jungle": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"]
    }

    function showFileName(input) {
        const fileNameDiv = document.getElementById('selectedFile');
        const submitButton = document.getElementById('submit-button');
        if (input.files && input.files[0]) {
            fileNameDiv.style.display = 'block';
            fileNameDiv.textContent = 'Selected file: ' + input.files[0].name;
            submitButton.disabled = false;
        } else {
            fileNameDiv.style.display = 'none';
            submitButton.disabled = true;
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();

        var radioButtons = document.getElementsByName('theme');
        var selectedTheme = ""
        for (var i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                selectedTheme = radioButtons[i].value;
            }
        }
        console.log(selectedTheme);
        const loader = document.getElementById('loader');
        const button = document.getElementById('submit-button');
        const fileInput = document.getElementById('zip-file');
        const token = captchaRef.current.getValue();

        if (fileInput.files.length === 0) {
            alert("Please select a zip file.");
            return;
        }

        if (token === '') {
            alert("Are you sure you are a human? Please complete the captcha in order to prove it.");
            return;
        }

        const file = fileInput.files[0];
        if (file.type !== 'application/zip' && file.name.split('.').pop().toLowerCase() !== 'zip') {
            alert("Only .zip files are allowed.");
            return;
        }

        const maxFileSize = 10 * 1024 * 1024; // 10 MB
        if (file.size > maxFileSize) {
            alert("File size exceeds 10 MB.");
            return;
        }

        const formData = new FormData();
        formData.append('zip-file', file);
        formData.append('g-recaptcha-response', token);

        loader.style.display = 'flex';
        button.disabled = true;

        try {
            const response = await fetch('https://chatalytics.nl/wp-json/myplugin/v1/upload', {
                method: 'POST',
                body: formData,
                headers: { 'Primary': themes[selectedTheme][0], 'Secondary': themes[selectedTheme][1], 'Tertiary': themes[selectedTheme][2], 'Fourth': themes[selectedTheme][3] }
            });
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.image) {
                const imageBase64 = data.image;
                const link = document.createElement('a');
                link.href = `data:image/png;base64,${imageBase64}`;
                link.download = 'image.png';
                link.click();

                const modal = document.getElementById('form-modal');
                modal.style.display = 'flex'; // Show the modal
            } else {
                console.error("Image key not found in the response.", data);
                alert("Failed to retrieve image.");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("An error occurred during the upload.");
        } finally {
            loader.style.display = 'none';
            button.disabled = false;
        }
    }
}