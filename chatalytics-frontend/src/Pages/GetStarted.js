import Footer from "./Components/Footer";
import Navigationbar from "./Components/Navigationbar";
import React from "react";
import FeedbackModal from "./Components/FeedbackModal";
import UploadForm from "./Components/UploadForm";
import Waves from "../assets/stacked-waves-haikei.svg";


function GetStarted() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="wp-site-blocks">
            <Navigationbar />
            <FeedbackModal isOpen={isOpen} onClose={() => {
                const modal = document.getElementById('form-modal');
                modal.style.display = 'none';
            }} />
            <main className="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-26 wp-block-group-is-layout-constrained" style={{ marginTop: 'var(--wp--preset--spacing--50)', paddingTop: 'var(--wp--preset--spacing--superbspacing-small)', paddingRight: 'var(--wp--preset--spacing--superbspacing-small)', paddingBottom: 'var(--wp--preset--spacing--superbspacing-small)', paddingLeft: 'var(--wp--preset--spacing--superbspacing-small)' }}>
                <div className="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-23 wp-block-group-is-layout-constrained">
                    <h1
                        className="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-superbfont-xxlarge-font-size">
                        Insights within a minute!</h1>
                    <div className="entry-content alignwide wp-elements-28c78b71729f9208f2794ac9c056b66e wp-block-post-content has-text-color has-mono-2-color has-superbfont-xsmall-font-size has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained">
                        <div className="wp-block-group alignfull is-layout-flow wp-block-group-is-layout-flow">
                            <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
                                <img
                                    src={Waves}
                                    alt="Waves background"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 2,
                                    width: '90%',
                                    maxWidth: '600px',
                                    padding: '30px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                    <h1 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>Get Started</h1>
                                    <UploadForm setIsOpen={setIsOpen}/>
                                </div>
                            </div>

                            <div className="wp-block-group alignfull has-global-padding is-layout-constrained wp-container-core-group-is-layout-13 wp-block-group-is-layout-constrained" style={{ borderBottomColor: 'var(--wp--preset--color--mono-3)', borderBottomWidth: 1, marginTop: 0, marginBottom: 0, paddingTop: 'var(--wp--preset--spacing--superbspacing-small)', paddingRight: 'var(--wp--preset--spacing--superbspacing-small)', paddingBottom: 'var(--wp--preset--spacing--superbspacing-small)', paddingLeft: 'var(--wp--preset--spacing--superbspacing-small)' }}>
                                <div className="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-2 wp-block-columns-is-layout-flex" style={{ borderRadius: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                    <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-4 wp-block-column-is-layout-flow" style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                        <div className="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-6 wp-block-group-is-layout-flex" style={{ borderStyle: 'none', borderWidth: 0, borderRadius: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                            <div className="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-5 wp-block-group-is-layout-flex">
                                                <h3 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Start</h3>



                                                <h3 className="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Go to your Chat</h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-5 wp-block-column-is-layout-flow" style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                        <div className="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-8 wp-block-group-is-layout-flex" style={{ borderStyle: 'none', borderWidth: 0, borderRadius: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                            <div className="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-7 wp-block-group-is-layout-flex">
                                                <h3 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Export chat</h3>



                                                <h3 className="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Click on export chat without media </h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-6 wp-block-column-is-layout-flow" style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                        <div className="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-10 wp-block-group-is-layout-flex" style={{ borderStyle: 'none', borderWidth: 0, borderRadius: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                            <div className="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-9 wp-block-group-is-layout-flex">
                                                <h3 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Save</h3>



                                                <h3 className="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Save the file to a preferred location</h3>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-7 wp-block-column-is-layout-flow" style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                        <div className="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-12 wp-block-group-is-layout-flex" style={{ borderStyle: 'none', borderWidth: 0, borderRadius: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                            <div className="wp-block-group is-vertical is-layout-flex wp-container-core-group-is-layout-11 wp-block-group-is-layout-flex">
                                                <h3 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-xsmall-font-size">Upload</h3>



                                                <h3 className="wp-block-heading has-text-align-left has-superbfont-xsmall-font-size">Upload to Zipfile here!</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="wp-block-group alignfull has-base-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-17 wp-block-group-is-layout-constrained" style={{ marginTop: 0, marginBottom: 0, paddingTop: 'var(--wp--preset--spacing--superbspacing-xxlarge)', paddingRight: 'var(--wp--preset--spacing--superbspacing-small)', paddingBottom: 'var(--wp--preset--spacing--superbspacing-xxlarge)', paddingLeft: 'var(--wp--preset--spacing--superbspacing-small)' }}>
                                <div className="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex">
                                    <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-8 wp-block-column-is-layout-flow">
                                        <div className="wp-block-group has-mono-4-background-color has-background has-global-padding is-content-justification-left is-layout-constrained wp-container-core-group-is-layout-16 wp-block-group-is-layout-constrained" style={{ borderRadius: 8, paddingTop: 'var(--wp--preset--spacing--superbspacing-medium)', paddingRight: 'var(--wp--preset--spacing--superbspacing-medium)', paddingBottom: 'var(--wp--preset--spacing--superbspacing-medium)', paddingLeft: 'var(--wp--preset--spacing--superbspacing-medium)' }}>
                                            <div className="wp-block-group is-nowrap is-layout-flex wp-container-core-group-is-layout-14 wp-block-group-is-layout-flex">
                                                <figure className="wp-block-image aligncenter size-large is-resized"><img decoding="async" src="https://chatalytics.nl/wp-content/uploads/2024/12/lp7-sonoran-wechat-logo.png" alt="" style={{ width: 48, height: 48 }} /></figure>
                                            </div>



                                            <div className="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-15 wp-block-group-is-layout-constrained">
                                                <h3 className="wp-block-heading has-text-align-left has-contrast-color has-text-color has-alegreya-font-family has-superbfont-medium-font-size">Contact us</h3>



                                                <p className="has-text-align-left has-secondary-color has-text-color has-superbfont-xsmall-font-size">Feel free to contact us if you have any questions!</p>
                                            </div>



                                            <h3 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-small-font-size">info@chatalytics.nl</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>

    );
}

export default GetStarted;