import Navigationbar from "./Components/Navigationbar";
import Footer from "./Components/Footer";
import Person from "./Components/Person";
import Map from '../assets/image.png'
import joostie from '../assets/IMG_3935-scaled.jpg';

function Contact() {
    return (
        <div>
            <Navigationbar />

            <div class="wp-site-blocks">
                <div class="wp-block-group alignfull has-global-padding is-layout-constrained wp-container-core-group-is-layout-6 wp-block-group-is-layout-constrained" style={{marginTop:0,marginBottom:0,paddingTop:'var(--wp--preset--spacing--superbspacing-medium)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-large)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>
                    <div class="wp-block-group alignwide is-vertical is-content-justification-center is-layout-flex wp-container-core-group-is-layout-4 wp-block-group-is-layout-flex" style={{borderRadius:20,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                        <div class="wp-block-group has-global-padding is-content-justification-center is-layout-constrained wp-container-core-group-is-layout-3 wp-block-group-is-layout-constrained">
                            <h1 class="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-superbfont-xxlarge-font-size">Uncover Hidden Insights in Your Conversations</h1>



                            <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-small-font-size">Explore the power of chat analysis with tools to visualize, analyze, and understand your messaging patterns. Let’s bring your data to life.</p>
                        </div>
                    </div>



                    <div class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-5 wp-block-group-is-layout-constrained" style={{paddingTop:'var(--wp--preset--spacing--superbspacing-small)'}}>
                        <div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-2 wp-block-columns-is-layout-flex">
                            <div class="wp-block-column has-mono-4-background-color has-background is-layout-flow wp-block-column-is-layout-flow" style={{paddingTop:'var(--wp--preset--spacing--superbspacing-small)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-small)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>
                                <h3 class="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-link-color has-superbfont-medium-font-size wp-elements-77315b3afd6c40b32cd5c1c1f8559aa0" style={{marginTop:0,marginBottom:0}}>Email Support</h3>



                                <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-xsmall-font-size" style={{marginTop:'var(--wp--preset--spacing--superbspacing-xxsmall)',marginBottom:0}}>info@chatalytics.nl</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="wp-block-group alignfull has-mono-4-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-12 wp-block-group-is-layout-constrained" style={{marginTop:0,marginBottom:0,paddingTop:'var(--wp--preset--spacing--superbspacing-large)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-large)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>
                    <div class="wp-block-group alignwide is-vertical is-content-justification-center is-layout-flex wp-container-core-group-is-layout-7 wp-block-group-is-layout-flex">
                        <h3 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-small-font-size">Passionate And Experienced</h3>



                        <h2 class="wp-block-heading has-text-align-center has-contrast-color has-text-color has-superbfont-xlarge-font-size">Meet our Talented Team</h2>



                        <p class="has-text-align-center has-secondary-color has-text-color has-superbfont-small-font-size">Get to know the talented individuals behind our agency</p>
                    </div>



                    <div class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex" style={{justifyContent: 'center'}}>
                    <Person name="Tim Angevare" pic="https://media.licdn.com/dms/image/v2/D4D03AQGNV6PghxEYGA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727981911155?e=1749686400&v=beta&t=05o16QAbmjhvOtalab2aE15ZdQnt7UwMsg2IoxStWfk"
                        description="Business & IT student @ University of Twente" linkedin="https://www.linkedin.com/in/tim-angevare-460471165/" github="github.com/timangevare/"/>
                    <Person name="Joost Liebeton" pic={joostie}
                        description="Business & IT student @ University of Twente" linkedin="https://www.linkedin.com/in/joost-liebeton-4342ab263/" github="https://github.com/joostliebeton"/>
                    </div>
                </div>



                <div class="wp-block-group alignfull has-global-padding is-layout-constrained wp-container-core-group-is-layout-14 wp-block-group-is-layout-constrained" style={{marginTop:0,marginBottom:0,paddingTop:'var(--wp--preset--spacing--superbspacing-large)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-xlarge)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>
                    <div class="wp-block-group alignwide has-global-padding is-layout-constrained wp-container-core-group-is-layout-13 wp-block-group-is-layout-constrained">
                        <h3 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-superbfont-small-font-size">Originated In</h3>



                        <h2 class="wp-block-heading has-text-align-center has-contrast-color has-text-color has-superbfont-xlarge-font-size">Enschede</h2>



                        <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-small-font-size"></p>
                    </div>



                    <figure class="wp-block-image size-large is-resized"><img width="1024" height="658" src={Map} alt="" class="wp-image-32" style={{width:1107,height:'auto'}}  sizes="(max-width: 1024px) 100vw, 1024px"/></figure>
                </div>



                <div class="wp-block-group alignfull has-global-padding is-layout-constrained wp-container-core-group-is-layout-17 wp-block-group-is-layout-constrained has-background" style={{marginTop:0,marginBottom:0,paddingTop:'var(--wp--preset--spacing--superbspacing-xxlarge)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-xxlarge)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)',backgroundImage:'url(http://3.65.199.250/wp-content/themes/idea-flow/assets/images/cta/cta-4.jpg)',backgroundSize:'cover'}}>
                    <div class="wp-block-group alignwide has-global-padding is-content-justification-center is-layout-constrained wp-container-core-group-is-layout-16 wp-block-group-is-layout-constrained">
                        <div class="wp-block-group has-contrast-light-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-15 wp-block-group-is-layout-constrained" style={{borderRadius:24,paddingTop:'var(--wp--preset--spacing--superbspacing-medium)',paddingRight:'var(--wp--preset--spacing--superbspacing-medium)',paddingBottom:'var(--wp--preset--spacing--superbspacing-medium)',paddingLeft:'var(--wp--preset--spacing--superbspacing-medium)'}}>
                            <h3 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-superbfont-small-font-size">Get started</h3>



                            <h2 class="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-superbfont-xlarge-font-size">Analyze your chat today!</h2>



                            <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-small-font-size">And figure out how your friends and loved ones chat with you</p>



                            <div class="wp-block-buttons wp-container-content-1 is-content-justification-center is-nowrap is-layout-flex wp-container-core-buttons-is-layout-2 wp-block-buttons-is-layout-flex">
                                <div class="wp-block-button has-custom-font-size has-superbfont-small-font-size"><a class="wp-block-button__link wp-element-button">Get started!</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;