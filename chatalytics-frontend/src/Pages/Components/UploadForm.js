import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState, useEffect } from "react";
import Waves from "../../assets/stacked-waves-haikei.svg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function UploadForm() {
    const themes = {
        "default": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"],
        "light": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"],
        "jungle": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"]
    }
    const captchaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [fileError, setFileError] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaError, setCaptchaError] = useState("");

    useEffect(() => {
        setIsSubmitDisabled(!(selectedFile && captchaVerified));
    }, [selectedFile, captchaVerified]);

    const handleCaptchaChange = (value) => {
        if (value) {
            setCaptchaVerified(true);
            setCaptchaError("");
        } else {
            setCaptchaVerified(false);
            setCaptchaError("Please complete the captcha verification");
        }
    };
    // Function to handle file selection with validation
    const handleFileChange = (event) => {
        setFileError("");
        
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            
            // Check if file is a ZIP
            if (file.type !== 'application/zip' && file.name.split('.').pop().toLowerCase() !== 'zip') {
                setFileError("Only .zip files are allowed.");
                setSelectedFile(null);
                setIsSubmitDisabled(true);
                event.target.value = null; // Reset file input
                return;
            }
            
            // Check file size (100MB max)
            const maxFileSize = 100 * 1024 * 1024;
            if (file.size > maxFileSize) {
                setFileError("File size exceeds 100 MB.");
                setSelectedFile(null);
                setIsSubmitDisabled(true);
                event.target.value = null; // Reset file input
                return;
            }
            
            setSelectedFile(file);
            setIsSubmitDisabled(false);
        } else {
            setSelectedFile(null);
            setIsSubmitDisabled(true);
        }
    };

    // Function to trigger file input click
    const handleUploadZoneClick = () => {
        fileInputRef.current.click();
    };

    // Handle drag events
    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            // Set files to file input to trigger onChange event
            fileInputRef.current.files = event.dataTransfer.files;
            // Manually trigger the onChange event
            handleFileChange({ target: { files: event.dataTransfer.files } });
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();

        var radioButtons = document.getElementsByName('theme');
        var selectedTheme = "default"; // Set default value
        for (var i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                selectedTheme = radioButtons[i].value;
                break;
            }
        }
        
        const loader = document.getElementById('loader');
        const button = document.getElementById('submit-button');
        const token = captchaRef.current.getValue();

        if (!selectedFile) {
            setFileError("Please select a zip file.");
            return;
        }

        if (!token) {
            alert("Are you sure you are a human? Please complete the captcha in order to prove it.");
            return;
        }

        const formData = new FormData();
        formData.append('zip-file', selectedFile);
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
                if (modal) {
                    modal.style.display = 'flex'; // Show the modal
                }
                
                // Reset form after successful upload
                setSelectedFile(null);
                setIsSubmitDisabled(true);
                fileInputRef.current.value = null;
                captchaRef.current.reset();
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
        <div className="wp-block-group alignfull superbthemes-navigation-004 is-layout-flow wp-block-group-is-layout-flow" style={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}>
            <div className="wp-block-cover" style={{ marginTop: 0, marginBottom: 0, paddingTop: 'var(--wp--preset--spacing--superbspacing-xxlarge)', paddingRight: 0, paddingBottom: 'var(--wp--preset--spacing--superbspacing-xxlarge)', paddingLeft: 0, minHeight: 100, aspectRatio: 'unset' }}>
                <span aria-hidden="true" className="wp-block-cover__background has-background-dim-10 has-background-dim" style={{ backgroundColor: '#667b8d' }}></span>
        
                <div className="wp-block-cover__inner-container is-layout-flow wp-container-core-cover-is-layout-1 wp-block-cover-is-layout-flow" style={{
                    
                }}>
                    <div className="wp-block-group alignwide has-global-padding is-layout-constrained wp-container-core-group-is-layout-3 wp-block-group-is-layout-constrained" style={{
                        paddingTop: 'var(--wp--preset--spacing--superbspacing-small)',
                        paddingRight: 'var(--wp--preset--spacing--superbspacing-medium)',
                        paddingBottom: 'var(--wp--preset--spacing--superbspacing-medium)',
                        paddingLeft: 'var(--wp--preset--spacing--superbspacing-medium)',
                        backgroundColor: 'rgba(36, 33, 33, 0.6)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <h1 className="wp-block-heading alignwide has-text-align-center has-contrast-light-color has-text-color has-superbfont-xxlarge-font-size" style={{ paddingRight: 'var(--wp--preset--spacing--superbspacing-small)', paddingBottom: 'var(--wp--preset--spacing--superbspacing-xxsmall)', paddingLeft: 'var(--wp--preset--spacing--superbspacing-small)', fontStyle: 'normal', fontWeight: 700, color: '#333' }}>Get Started</h1>
                        <div id="loader" className="loader" style={{ display: 'none', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px', margin: '20px 0' }}>
                            <Spinner animation="border" />
                            <span>Analyzing your chat, please wait&#8230;</span>
                        </div>

                        <Form id="uploadForm" onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="zip-file" style={{ fontWeight: 500 }}>Upload Zip File (with txt inside):</Form.Label>
                                <div 
                                    className="upload-zone" 
                                    onClick={handleUploadZoneClick}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    style={{
                                        border: `2px dashed ${selectedFile ? '#16a34a' : fileError ? '#dc2626' : '#ccc'}`,
                                        borderRadius: '5px',
                                        padding: '20px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        marginBottom: '15px',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: selectedFile ? 'rgba(22, 163, 74, 0.1)' : fileError ? 'rgba(220, 38, 38, 0.1)' : 'white'
                                    }}
                                >
                                    {selectedFile ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#16a34a" style={{ marginBottom: '10px' }}>
                                                <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 10h-3v3h-2v-3h-3v-2h3V11h2v3h3v2z"/>
                                            </svg>
                                            <p style={{ margin: 0, fontWeight: 'bold', color: '#16a34a' }}>
                                                {selectedFile.name}
                                            </p>
                                            <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666' }}>
                                                {(selectedFile.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="upload-icon" viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: fileError ? '#dc2626' : '#666', margin: '0 auto 10px' }}>
                                                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
                                            </svg>
                                            <p className="upload-text" style={{ margin: 0, color: fileError ? '#dc2626' : '#666' }}>
                                                {fileError ? fileError : "Drag & drop your ZIP file here or click to browse"}
                                            </p>
                                            <p style={{ margin: '5px 0 0', fontSize: '0.8em', color: '#666' }}>
                                                Only .zip files up to 100MB are accepted
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input 
                                    type="file" 
                                    id="zip-file" 
                                    className="upload-input" 
                                    accept=".zip" 
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontWeight: 500 }}>Select your theme:</Form.Label>
                                <div className="radio" style={{ display: 'flex', gap: '15px', margin: '10px 0' }}>
                                    <Form.Check inline label='Default' type="radio" id="default" name="theme" value="default" defaultChecked />
                                    <Form.Check inline label='Jungle' type="radio" id="jungle" name="theme" value="jungle" />
                                    <Form.Check inline label='Light' type="radio" id="light" name="theme" value="light" />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontWeight: 500 }}>Verify you're human:</Form.Label>
                                <div style={{ margin: '10px 0' }}>
                                    <ReCAPTCHA 
                                        sitekey={process.env.REACT_APP_SITE_KEY} 
                                        ref={captchaRef}
                                        onChange={handleCaptchaChange}
                                    />
                                    {captchaError && (
                                        <div style={{ color: '#dc2626', fontSize: '0.85em', marginTop: '5px' }}>
                                            {captchaError}
                                        </div>
                                    )}
                                </div>
                            </Form.Group>

                            <Button 
                                id="submit-button" 
                                type="submit" 
                                disabled={isSubmitDisabled}
                                style={{ 
                                    width: '100%', 
                                    marginTop: '15px',
                                    background: isSubmitDisabled ? '#ccc' : '#4f46e5',
                                    borderColor: isSubmitDisabled ? '#bbb' : '#4338ca',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {!selectedFile 
                                    ? 'Select a ZIP File First' 
                                    : !captchaVerified 
                                        ? 'Complete Captcha Verification' 
                                        : 'Upload and Analyze'}
                            </Button>
                            
                            {/* Form Requirements Summary */}
                            <div style={{ 
                                margin: '20px 0 0', 
                                padding: '10px', 
                                backgroundColor: '#f8f9fa', 
                                borderRadius: '5px',
                                fontSize: '0.85em'
                            }}>
                                <p style={{ margin: '0 0 8px', fontWeight: 'bold', color : 'black' }}>Form requirements:</p>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    <li style={{ 
                                        color: selectedFile ? '#16a34a' : '#666',
                                        marginBottom: '5px'
                                    }}>
                                        {selectedFile ? '✓' : '○'} Select a ZIP file (max 100MB)
                                    </li>
                                    <li style={{ 
                                        color: captchaVerified ? '#16a34a' : '#666' 
                                    }}>
                                        {captchaVerified ? '✓' : '○'} Complete the captcha verification
                                    </li>
                                </ul>
                            </div>
                        </Form>

                        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadForm;