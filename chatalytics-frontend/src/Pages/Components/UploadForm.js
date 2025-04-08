import reCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import Sea from "../../assets/lp7-sonoran-hero1.jpg"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function UploadForm () {
    const themes = {
        "default": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"],
        "light": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"],
        "jungle": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"]
    }
    const captchaRef = useRef(null)

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

    return (
        <div class="wp-block-group alignfull superbthemes-navigation-004 is-layout-flow wp-block-group-is-layout-flow" style={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}>
            <div class="wp-block-cover" style={{ marginTop: 0, marginBottom: 0, paddingTop: 'var(--wp--preset--spacing--superbspacing-xxlarge)', paddingRight: 0, paddingBottom: 'var(--wp--preset--spacing--superbspacing-xxlarge)', paddingLeft: 0, minHeight: 100, aspectRatio: 'unset' }}>
                <span aria-hidden="true" class="wp-block-cover__background has-background-dim-10 has-background-dim" style={{ backgroundColor: '#667b8d' }}></span>
                <img fetchpriority="high" decoding="async" width="1700" height="1134" class="wp-block-cover__image-background wp-image-38" alt="" src={Sea} data-object-fit="cover" sizes="(max-width: 1700px) 100vw, 1700px" />
                <div class="wp-block-cover__inner-container is-layout-flow wp-container-core-cover-is-layout-1 wp-block-cover-is-layout-flow" style={{position: 'absolute', top: '37%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <div class="wp-block-group alignwide has-global-padding is-layout-constrained wp-container-core-group-is-layout-3 wp-block-group-is-layout-constrained" style={{ paddingTop: 'var(--wp--preset--spacing--superbspacing-small)', paddingRight: 'var(--wp--preset--spacing--superbspacing-medium)', paddingBottom: 'var(--wp--preset--spacing--superbspacing-medium)', paddingLeft: 'var(--wp--preset--spacing--superbspacing-medium)' }}>
                        <h1 class="wp-block-heading alignwide has-text-align-center has-contrast-light-color has-text-color has-superbfont-xxlarge-font-size" style={{ paddingRight: 'var(--wp--preset--spacing--superbspacing-small)', paddingBottom: 'var(--wp--preset--spacing--superbspacing-xxsmall)', paddingLeft: 'var(--wp--preset--spacing--superbspacing-small)', fontStyle: 'normal', fontWeight: 700 }}>Get Started</h1>
                        <div id="loader" class="loader">
                            <Spinner animation="border" />
                            <span>Analyzing your chat, please wait&#8230;</span>
                        </div>

                        <Form id="uploadForm" onSubmit={handleSubmit}>
                            <label for="zip-file">Upload Zip File (with txt inside):</label>
                            <div class="upload-zone" onclick="document.getElementById('zip-file').click()">
                                <svg class="upload-icon" viewbox="0 0 24 24">
                                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
                                </svg>
                                <p class="upload-text">Drag &#038; drop your ZIP file here or click to browse</p>
                            </div>
                            <input type="file" id="zip-file" class="upload-input" accept=".zip" onChange={(event) => {showFileName(event)}}/>
                            <div id="selectedFile" class="selected-file"></div>
                            <p>Please select your theme</p>
                            <div class="radio">
                                <Form.Check inline label='Default'type="radio" id="default" name="theme" value="Default"/>
                                <Form.Check inline label='Jungle 'type="radio" id="jungle" name="theme" value="jungle" />
                                <Form.Check inline label='Light' type="radio" id="light" name="theme" value="Light" />
                            </div>
                            <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
                            <Button id="submit-button" type="submit">Upload and Display Image</Button>
                        </Form>

                        <img id="imageDisplay" style={{ display: 'none' }} />

                        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadForm;