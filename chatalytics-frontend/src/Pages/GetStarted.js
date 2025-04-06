import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import React, { useRef } from "react";
import reCAPTCHA from "react-google-recaptcha";

function GetStarted() {
    const captchaRef = useRef(null)

    // const style = document.createElement('style');
    // style.appendChild(document.createTextNode('#wpforms-133-field_3-container {position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-133-field_3-container input {visibility: hidden; } #wpforms-conversational-form-page #wpforms-133-field_3-container label {counter - increment: none; }'));
    // document.head.appendChild(style);
    // document.currentScript?.remove();

    // Ensure modal is hidden on page load
    const modal = document.getElementById('form-modal');
    console.log(modal);
    modal.style.display = 'none';
    const fileInput = document.getElementById('zip-file');
    fileInput.addEventListener('change', function () {
        showFileName(this);
    });

    document.getElementById('uploadForm').addEventListener('submit', handleSubmit);
    document.getElementById('uploadForm').addEventListener('submit', handleSubmit);

    return (
        <div class="wp-site-blocks">
            <Navbar />
            <FeedbackModel isOpen={false} onClose={() => {
                const modal = document.getElementById('form-modal');
                modal.style.display = 'none';}}/>
            <main class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-26 wp-block-group-is-layout-constrained" style={{marginTop:'var(--wp--preset--spacing--50)',paddingTop:'var(--wp--preset--spacing--superbspacing-small)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-small)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>

                <div class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-23 wp-block-group-is-layout-constrained">
                    <h1 style={{fontStyle:'normal',fontWeight:600, marginBottom:'var(--wp--preset--spacing--40)'}} class="wp-block-post-title has-superbfont-xlarge-font-size">Insights within a minute!</h1>

                    <div class="entry-content alignwide wp-elements-28c78b71729f9208f2794ac9c056b66e wp-block-post-content has-text-color has-mono-2-color has-superbfont-xsmall-font-size has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained">
                        <div class="wp-block-group alignfull is-layout-flow wp-block-group-is-layout-flow">
                            <div class="wp-block-group alignfull superbthemes-navigation-004 is-layout-flow wp-block-group-is-layout-flow" style={{marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0}}>
                                <div class="wp-block-cover" style={{marginTop:0,marginBottom:0,paddingTop:'var(--wp--preset--spacing--superbspacing-xxlarge)',paddingRight:0,paddingBottom:'var(--wp--preset--spacing--superbspacing-xxlarge)',paddingLeft:0,minHeight:100,aspectRatio:'unset'}}>
                                    <span aria-hidden="true" class="wp-block-cover__background has-background-dim-10 has-background-dim" style={{backgroundColor:'#667b8d'}}></span>
                                    <img fetchpriority="high" decoding="async" width="1700" height="1134" class="wp-block-cover__image-background wp-image-38" alt="" src="https://chatalytics.nl/wp-content/uploads/2024/12/lp7-sonoran-hero1.jpg" data-object-fit="cover" srcset="/wp-content/uploads/2024/12/lp7-sonoran-hero1.jpg 1700w, /wp-content/uploads/2024/12/lp7-sonoran-hero1-300x200.jpg 300w, /wp-content/uploads/2024/12/lp7-sonoran-hero1-1024x683.jpg 1024w, /wp-content/uploads/2024/12/lp7-sonoran-hero1-768x512.jpg 768w, /wp-content/uploads/2024/12/lp7-sonoran-hero1-1536x1025.jpg 1536w" sizes="(max-width: 1700px) 100vw, 1700px" />
                                    <div class="wp-block-cover__inner-container is-layout-flow wp-container-core-cover-is-layout-1 wp-block-cover-is-layout-flow">
                                        <div class="wp-block-group alignwide has-global-padding is-layout-constrained wp-container-core-group-is-layout-3 wp-block-group-is-layout-constrained" style={{paddingTop:'var(--wp--preset--spacing--superbspacing-small)',paddingRight:'var(--wp--preset--spacing--superbspacing-medium)',paddingBottom:'var(--wp--preset--spacing--superbspacing-medium)',paddingLeft:'var(--wp--preset--spacing--superbspacing-medium)'}}>
                                            <h1 class="wp-block-heading alignwide has-text-align-center has-contrast-light-color has-text-color has-superbfont-xxlarge-font-size" style={{paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-xxsmall)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)',fontStyle:'normal',fontWeight:700}}>Get Started</h1>
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

                                            <img id="imageDisplay" style={{display: 'none'}} />

                                            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="wp-block-group alignfull superbthemes-features-005 has-global-padding is-layout-constrained wp-container-core-group-is-layout-13 wp-block-group-is-layout-constrained" style={{borderBottomColor:'var(--wp--preset--color--mono-3)',borderBottomWidth:1,marginTop:0,marginBottom:0,paddingTop:'var(--wp--preset--spacing--superbspacing-small)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-small)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>
                                <div class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-2 wp-block-columns-is-layout-flex" style={{borderRadius:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-4 wp-block-column-is-layout-flow" style={{paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                        <div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-6 wp-block-group-is-layout-flex" style={{borderStyle:'none',borderWidth:0,borderRadius:0,marginTop:0,marginBottom:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                            <div class="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-5 wp-block-group-is-layout-flex">
                                                <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Start</h3>



                                                <h3 class="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Go to your Chat</h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-5 wp-block-column-is-layout-flow" style={{paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                        <div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-8 wp-block-group-is-layout-flex" style={{borderStyle:'none',borderWidth:0,borderRadius:0,marginTop:0,marginBottom:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                            <div class="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-7 wp-block-group-is-layout-flex">
                                                <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Export chat</h3>



                                                <h3 class="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Click on export chat without media </h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-6 wp-block-column-is-layout-flow" style={{paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                        <div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-10 wp-block-group-is-layout-flex" style={{borderStyle:'none',borderWidth:0,borderRadius:0,marginTop:0,marginBottom:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                            <div class="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-9 wp-block-group-is-layout-flex">
                                                <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Save</h3>



                                                <h3 class="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Save the file to a preferred location</h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-7 wp-block-column-is-layout-flow" style={{paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                        <div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-12 wp-block-group-is-layout-flex" style={{borderStyle:'none',borderWidth:0,borderRadius:0,marginTop:0,marginBottom:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                                            <div class="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-11 wp-block-group-is-layout-flex">
                                                <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Upload</h3>



                                                <h3 class="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Upload to Zipfile here!</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="wp-block-group alignfull has-base-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-17 wp-block-group-is-layout-constrained" style={{marginTop:0,marginBottom:0,paddingTop:'var(--wp--preset--spacing--superbspacing-xxlarge)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-xxlarge)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>
                                <div class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex">
                                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-8 wp-block-column-is-layout-flow">
                                        <div class="wp-block-group has-mono-4-background-color has-background has-global-padding is-content-justification-left is-layout-constrained wp-container-core-group-is-layout-16 wp-block-group-is-layout-constrained" style={{borderRadius:8,paddingTop:'var(--wp--preset--spacing--superbspacing-medium)',paddingRight:'var(--wp--preset--spacing--superbspacing-medium)',paddingBottom:'var(--wp--preset--spacing--superbspacing-medium)',paddingLeft:'var(--wp--preset--spacing--superbspacing-medium)'}}>
                                            <div class="wp-block-group is-nowrap is-layout-flex wp-container-core-group-is-layout-14 wp-block-group-is-layout-flex">
                                                <figure class="wp-block-image aligncenter size-large is-resized"><img decoding="async" src="https://chatalytics.nl/wp-content/uploads/2024/12/lp7-sonoran-wechat-logo.png" alt="" style={{width:48,height:48}} /></figure>
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