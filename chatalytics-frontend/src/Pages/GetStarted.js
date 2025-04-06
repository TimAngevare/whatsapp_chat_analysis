import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import React, { useRef } from "react";
import reCAPTCHA from "react-google-recaptcha"

function GetStarted() {
    const captchaRef = useRef(null)

    const themes = {
        "default": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"],
        "light": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"],
        "jungle": ["#9333ea", "#4f46e5", "#16a34a", "#db2777"]
    }

    const style = document.createElement('style');
    style.appendChild(document.createTextNode('#wpforms-133-field_3-container {position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-133-field_3-container input {visibility: hidden; } #wpforms-conversational-form-page #wpforms-133-field_3-container label {counter - increment: none; }'));
    document.head.appendChild(style);
    document.currentScript?.remove();

    // Ensure modal is hidden on page load
    const modal = document.getElementById('form-modal');
    modal.style.display = 'none';
    const fileInput = document.getElementById('zip-file');
    fileInput.addEventListener('change', function () {
        showFileName(this);
    });

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

    document.getElementById('close-modal').addEventListener('click', function () {
        document.getElementById('form-modal').style.display = 'none';
    });
    document.getElementById('uploadForm').addEventListener('submit', handleSubmit);
    document.getElementById('uploadForm').addEventListener('submit', handleSubmit);

    return (
        <div class="wp-site-blocks">
            <Navbar />
            <main class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-26 wp-block-group-is-layout-constrained" style="margin-top:var(--wp--preset--spacing--50);padding-top:var(--wp--preset--spacing--superbspacing-small);padding-right:var(--wp--preset--spacing--superbspacing-small);padding-bottom:var(--wp--preset--spacing--superbspacing-small);padding-left:var(--wp--preset--spacing--superbspacing-small)">


                <div class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-23 wp-block-group-is-layout-constrained">
                    <h1 style="font-style:normal;font-weight:600; margin-bottom:var(--wp--preset--spacing--40);" class="wp-block-post-title has-superbfont-xlarge-font-size">Insights within a minute!</h1>

                    <div class="entry-content alignwide wp-elements-28c78b71729f9208f2794ac9c056b66e wp-block-post-content has-text-color has-mono-2-color has-superbfont-xsmall-font-size has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained">
                        <div id="form-modal" class="modal">
                            <div class="modal-content">
                                <span id="close-modal" class="close-button">&times;</span>
                                <div id="modal-form-content">
                                    <div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-133"><form id="wpforms-form-133" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="133" method="post" enctype="multipart/form-data" action="/get-started/?simply_static_page=66" data-token="514b7afed9309827a806519e0512ecbb" data-token-time="1743766224">
                                        <noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript>
                                        <div class="wpforms-hidden" id="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</div>
                                        <div class="wpforms-field-container">
                                            <div id="wpforms-133-field_3-container" class="wpforms-field wpforms-field-text" data-field-type="text" data-field-id="3">
                                                <label class="wpforms-field-label" for="wpforms-133-field_3">any Do feedback</label>
                                                <input type="text" id="wpforms-133-field_3" class="wpforms-field-medium" name="wpforms[fields][3]" />
                                            </div>
                                            <div id="wpforms-133-field_1-container" class="wpforms-field wpforms-field-text" data-field-id="1">
                                                <label class="wpforms-field-label" for="wpforms-133-field_1">Do you have any feedback on our product</label><input type="text" id="wpforms-133-field_1" class="wpforms-field-medium" name="wpforms[fields][1]" aria-errormessage="wpforms-133-field_1-error" />
                                            </div>
                                            <div id="wpforms-133-field_2-container" class="wpforms-field wpforms-field-radio wpforms-list-inline" data-field-id="2">
                                                <fieldset>
                                                    <legend class="wpforms-field-label">Grade our product <span class="wpforms-required-label" aria-hidden="true">*</span>
                                                    </legend>
                                                    <ul id="wpforms-133-field_2" class="wpforms-field-required">
                                                        <li class="choice-1 depth-1">
                                                            <input type="radio" id="wpforms-133-field_2_1" name="wpforms[fields][2]" value="1" aria-errormessage="wpforms-133-field_2_1-error" required /><label class="wpforms-field-label-inline" for="wpforms-133-field_2_1">1</label>
                                                        </li>
                                                        <li class="choice-4 depth-1">
                                                            <input type="radio" id="wpforms-133-field_2_4" name="wpforms[fields][2]" value="2" aria-errormessage="wpforms-133-field_2_4-error" required /><label class="wpforms-field-label-inline" for="wpforms-133-field_2_4">2</label>
                                                        </li>
                                                        <li class="choice-2 depth-1">
                                                            <input type="radio" id="wpforms-133-field_2_2" name="wpforms[fields][2]" value="3" aria-errormessage="wpforms-133-field_2_2-error" required /><label class="wpforms-field-label-inline" for="wpforms-133-field_2_2">3</label>
                                                        </li>
                                                        <li class="choice-3 depth-1">
                                                            <input type="radio" id="wpforms-133-field_2_3" name="wpforms[fields][2]" value="4" aria-errormessage="wpforms-133-field_2_3-error" required /><label class="wpforms-field-label-inline" for="wpforms-133-field_2_3">4</label>
                                                        </li>
                                                        <li class="choice-5 depth-1">
                                                            <input type="radio" id="wpforms-133-field_2_5" name="wpforms[fields][2]" value="5" aria-errormessage="wpforms-133-field_2_5-error" required /><label class="wpforms-field-label-inline" for="wpforms-133-field_2_5">5</label>
                                                        </li>
                                                    </ul>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="wpforms-submit-container">
                                            <input type="hidden" name="wpforms[id]" value="133" />
                                            <input type="hidden" name="page_title" value="Insights within a minute!" />
                                            <input type="hidden" name="page_url" value="/get-started/?simply_static_page=66" />
                                            <input type="hidden" name="url_referer" value="" />
                                            <input type="hidden" name="page_id" value="37" />
                                            <input type="hidden" name="wpforms[post_id]" value="37" />
                                            <button type="submit" name="wpforms[submit]" id="wpforms-submit-133" class="wpforms-submit" data-alt-text="Sending..." data-submit-text="Submit" aria-live="assertive" value="wpforms-submit">Submit</button>
                                            <img decoding="async" src="/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading" />
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wp-block-group alignfull is-layout-flow wp-block-group-is-layout-flow">
                            <div class="wp-block-group alignfull superbthemes-navigation-004 is-layout-flow wp-block-group-is-layout-flow" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0">
                                <div class="wp-block-cover" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--superbspacing-xxlarge);padding-right:0;padding-bottom:var(--wp--preset--spacing--superbspacing-xxlarge);padding-left:0;min-height:100px;aspect-ratio:unset;">
                                    <span aria-hidden="true" class="wp-block-cover__background has-background-dim-10 has-background-dim" style="background-color:#667b8d"></span>
                                    <img fetchpriority="high" decoding="async" width="1700" height="1134" class="wp-block-cover__image-background wp-image-38" alt="" src="https://chatalytics.nl/wp-content/uploads/2024/12/lp7-sonoran-hero1.jpg" data-object-fit="cover" srcset="/wp-content/uploads/2024/12/lp7-sonoran-hero1.jpg 1700w, /wp-content/uploads/2024/12/lp7-sonoran-hero1-300x200.jpg 300w, /wp-content/uploads/2024/12/lp7-sonoran-hero1-1024x683.jpg 1024w, /wp-content/uploads/2024/12/lp7-sonoran-hero1-768x512.jpg 768w, /wp-content/uploads/2024/12/lp7-sonoran-hero1-1536x1025.jpg 1536w" sizes="(max-width: 1700px) 100vw, 1700px" />
                                    <div class="wp-block-cover__inner-container is-layout-flow wp-container-core-cover-is-layout-1 wp-block-cover-is-layout-flow">
                                        <div class="wp-block-group alignwide has-global-padding is-layout-constrained wp-container-core-group-is-layout-3 wp-block-group-is-layout-constrained" style="padding-top:var(--wp--preset--spacing--superbspacing-small);padding-right:var(--wp--preset--spacing--superbspacing-medium);padding-bottom:var(--wp--preset--spacing--superbspacing-medium);padding-left:var(--wp--preset--spacing--superbspacing-medium)">
                                            <h1 class="wp-block-heading alignwide has-text-align-center has-contrast-light-color has-text-color has-superbfont-xxlarge-font-size" style="padding-right:var(--wp--preset--spacing--superbspacing-small);padding-bottom:var(--wp--preset--spacing--superbspacing-xxsmall);padding-left:var(--wp--preset--spacing--superbspacing-small);font-style:normal;font-weight:700">Get Started</h1>
                                            <div id="loader" class="loader">
                                                <div class="spinner"></div>
                                                <span>Analyzing your chat, please wait&#8230;</span>
                                            </div>

                                            <form id="uploadForm">
                                                <label for="zip-file">Upload Zip File (with txt inside):</label>
                                                <div class="upload-zone" onclick="document.getElementById('zip-file').click()">
                                                    <svg class="upload-icon" viewbox="0 0 24 24">
                                                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
                                                    </svg>
                                                    <p class="upload-text">Drag &#038; drop your ZIP file here or click to browse</p>
                                                </div>
                                                <input type="file" id="zip-file" class="upload-input" accept=".zip" />
                                                <div id="selectedFile" class="selected-file"></div>
                                                <p>Please select your theme</p>
                                                <div class="radio">
                                                    <input type="radio" id="default" name="theme" value="Default" checked />
                                                    <label for="html">Default</label><br />
                                                    <input type="radio" id="jungle" name="theme" value="jungle" />
                                                    <label for="jungle">Jungle</label><br />
                                                    <input type="radio" id="light" name="theme" value="Light" />
                                                    <label for="light">Light</label><br />
                                                </div>
                                                <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef}/>
                                                <button id="submit-button" type="submit">Upload and Display Image</button>
                                            </form>

                                            <img id="imageDisplay" style="display: none;" />

                                            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="wp-block-group alignfull superbthemes-features-005 has-global-padding is-layout-constrained wp-container-core-group-is-layout-13 wp-block-group-is-layout-constrained" style="border-bottom-color:var(--wp--preset--color--mono-3);border-bottom-width:1px;margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--superbspacing-small);padding-right:var(--wp--preset--spacing--superbspacing-small);padding-bottom:var(--wp--preset--spacing--superbspacing-small);padding-left:var(--wp--preset--spacing--superbspacing-small)">
                                <div class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-2 wp-block-columns-is-layout-flex" style="border-radius:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-4 wp-block-column-is-layout-flow" style="padding-top:0;padding-right:0px;padding-bottom:0;padding-left:0px">
                                        <div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-6 wp-block-group-is-layout-flex" style="border-style:none;border-width:0px;border-radius:0px;margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                                            <div class="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-5 wp-block-group-is-layout-flex">
                                                <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Start</h3>



                                                <h3 class="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Go to your Chat</h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-5 wp-block-column-is-layout-flow" style="padding-top:0;padding-right:0px;padding-bottom:0;padding-left:0px">
                                        <div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-8 wp-block-group-is-layout-flex" style="border-style:none;border-width:0px;border-radius:0px;margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                                            <div class="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-7 wp-block-group-is-layout-flex">
                                                <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Export chat</h3>



                                                <h3 class="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Click on export chat without media </h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-6 wp-block-column-is-layout-flow" style="padding-top:0;padding-right:0px;padding-bottom:0;padding-left:0px">
                                        <div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-10 wp-block-group-is-layout-flex" style="border-style:none;border-width:0px;border-radius:0px;margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                                            <div class="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-9 wp-block-group-is-layout-flex">
                                                <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Save</h3>



                                                <h3 class="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Save the file to a preferred location</h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-7 wp-block-column-is-layout-flow" style="padding-top:0;padding-right:0px;padding-bottom:0;padding-left:0px">
                                        <div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-12 wp-block-group-is-layout-flex" style="border-style:none;border-width:0px;border-radius:0px;margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                                            <div class="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-11 wp-block-group-is-layout-flex">
                                                <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Upload</h3>



                                                <h3 class="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Upload to Zipfile here!</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="wp-block-group alignfull has-base-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-17 wp-block-group-is-layout-constrained" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--superbspacing-xxlarge);padding-right:var(--wp--preset--spacing--superbspacing-small);padding-bottom:var(--wp--preset--spacing--superbspacing-xxlarge);padding-left:var(--wp--preset--spacing--superbspacing-small)">
                                <div class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex">
                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-8 wp-block-column-is-layout-flow">
                                        <div class="wp-block-group has-mono-4-background-color has-background has-global-padding is-content-justification-left is-layout-constrained wp-container-core-group-is-layout-16 wp-block-group-is-layout-constrained" style="border-radius:8px;padding-top:var(--wp--preset--spacing--superbspacing-medium);padding-right:var(--wp--preset--spacing--superbspacing-medium);padding-bottom:var(--wp--preset--spacing--superbspacing-medium);padding-left:var(--wp--preset--spacing--superbspacing-medium)">
                                            <div class="wp-block-group is-nowrap is-layout-flex wp-container-core-group-is-layout-14 wp-block-group-is-layout-flex">
                                                <figure class="wp-block-image aligncenter size-large is-resized"><img decoding="async" src="https://chatalytics.nl/wp-content/uploads/2024/12/lp7-sonoran-wechat-logo.png" alt="" style="width:48px;height:48px" /></figure>
                                            </div>



                                            <div class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-15 wp-block-group-is-layout-constrained">
                                                <h3 class="wp-block-heading has-text-align-left has-contrast-color has-text-color has-alegreya-font-family has-superbfont-medium-font-size">Contact us</h3>



                                                <p class="has-text-align-left has-secondary-color has-text-color has-superbfont-xsmall-font-size">Feel free to contact us if you have any questions!</p>
                                            </div>



                                            <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-small-font-size">info@chatalytics.nl</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

                );
            }

export default GetStarted;