import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <Navbar />
            <div class="wp-block-group alignfull has-global-padding is-layout-constrained wp-container-core-group-is-layout-6 wp-block-group-is-layout-constrained" style={{ marginTop: 0, marginBottom: 0 }}>
                <div class="wp-block-group alignwide is-vertical is-content-justification-center is-layout-flex wp-container-core-group-is-layout-4 wp-block-group-is-layout-flex"
                    style={{ borderRadius: 20, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
                    <div
                        class="wp-block-group has-global-padding is-content-justification-center is-layout-constrained wp-container-core-group-is-layout-3 wp-block-group-is-layout-constrained">
                        <h1
                            class="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-superbfont-xxlarge-font-size">
                            Chatalytics</h1>



                        <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-small-font-size">Get
                            stunning visual insights into your whatsapp chats with your loved ones or friend group. Try it,
                            its free!</p>
                    </div>



                    <div
                        class="wp-block-buttons wp-container-content-1 is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-2 wp-block-buttons-is-layout-flex">
                        <div
                            class="wp-block-button has-custom-font-size is-style-outline has-superbfont-small-font-size is-style-outline--2">
                            <Link className="wp-block-button__link has-mono-2-color has-text-color has-link-color wp-element-button"
                                to="/contact">About Us</Link></div>



                        <div class="wp-block-button has-custom-font-size is-style-fill has-superbfont-small-font-size">
                            <Link className="wp-block-button__link has-contrast-light-color has-text-color has-link-color wp-element-button"
                            to="/get-started">Get started!</Link></div>
                    </div>
                </div>



                <div class="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
                    <figure class="wp-block-image aligncenter size-large"><img width="1024" height="579"
                        src="./picture-1-1024x579.png" alt=""
                        class="wp-image-92"
                        srcset="/wp-content/uploads/2024/12/picture-1-1024x579.png 1024w, /wp-content/uploads/2024/12/picture-1-300x170.png 300w, /wp-content/uploads/2024/12/picture-1-768x435.png 768w, /wp-content/uploads/2024/12/picture-1-1536x869.png 1536w, /wp-content/uploads/2024/12/picture-1.png 1792w"
                        sizes="(max-width: 1024px) 100vw, 1024px" /></figure>
                </div>
            </div>
            <div class="wp-block-group alignfull column-parent-border-radius has-global-padding is-layout-constrained wp-container-core-group-is-layout-8 wp-block-group-is-layout-constrained"
                style={{marginTop:0,marginBottom:0}}>
                <div
                    class="wp-block-group alignwide has-global-padding is-layout-constrained wp-container-core-group-is-layout-7 wp-block-group-is-layout-constrained">
                    <h3
                        class="wp-block-heading has-text-align-center has-primary-color has-text-color has-superbfont-small-font-size">
                        Service</h3>



                    <h2
                        class="wp-block-heading has-text-align-center has-contrast-color has-text-color has-superbfont-xlarge-font-size">
                        What We Offer</h2>



                    <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-small-font-size"></p>
                </div>



                <div
                    class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-2 wp-block-columns-is-layout-flex">
                    <div class="wp-block-column has-mono-4-background-color has-background is-layout-flow wp-block-column-is-layout-flow">
                        <figure class="wp-block-image aligncenter size-large is-resized"><img
                            src="https://chatalytics.nl/wp-content/themes/idea-flow/inc/superbthemes-info-content/icons/img-icon-7.png"
                            alt="" style={{objectFit:'cover',Width:48,height:'auto'}}/></figure>



                        <h3 class="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-link-color has-superbfont-medium-font-size wp-elements-1c26ac76c3eeb9a452fdd9741d2f1bb5"
                            style={{marginTop:0,marginBottom:0}}>Customization</h3>



                        <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-xsmall-font-size"
                            style={{marginBottom:0}}>You can
                            customize the template of the infographic so it will fit your style!</p>
                    </div>



                    <div class="wp-block-column has-mono-4-background-color has-background is-layout-flow wp-block-column-is-layout-flow">
                        <figure class="wp-block-image aligncenter size-large is-resized"><img
                            src="https://chatalytics.nl/wp-content/themes/idea-flow/inc/superbthemes-info-content/icons/img-icon-5.png"
                            alt="" style={{objectFit:'cover',width:48,height:48}}/></figure>



                        <h3 class="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-link-color has-superbfont-medium-font-size wp-elements-1a3ce49f75ebece28c5324b5115aefb7"
                            style={{marginTop:0,marginBottom:0}}>Privacy</h3>



                        <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-xsmall-font-size"
                            style={{marginBottom:0}}>Following
                            GDPR standards your chat history will solely be used to generate the infographic. After you have
                            downloaded the infographic, all data will be deleted.</p>
                    </div>



                    <div class="wp-block-column has-mono-4-background-color has-background is-layout-flow wp-block-column-is-layout-flow"
                        style={{paddingTop:'var(--wp--preset--spacing--superbspacing-small)',paddingRight:'var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-small)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>
                        <figure class="wp-block-image aligncenter size-large is-resized"><img
                            src="https://chatalytics.nl/wp-content/themes/idea-flow/inc/superbthemes-info-content/icons/img-icon-6.png"
                            alt="" style={{objectFit:'cover',width:48,height:48}}/></figure>



                        <h3 class="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-superbfont-medium-font-size"
                            style={{marginTop:0,marginBottom:0}}>Visualisations</h3>



                        <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-xsmall-font-size"
                            style={{marginTop:'var(--wp--preset--spacing--superbspacing-xxsmall)',marginBottom:0}}>Stunning
                            visualisations can offer interesting new insights into your whatsapp behaviour with your loved
                            ones.</p>
                    </div>
                </div>
            </div>



            <div class="wp-block-group alignfull has-mono-4-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-10 wp-block-group-is-layout-constrained"
                style={{marginTop:0,marginBottom:0,paddingTop:'var(--wp--preset--spacing--superbspacing-large);padding-right:var(--wp--preset--spacing--superbspacing-small)',paddingBottom:'var(--wp--preset--spacing--superbspacing-large)',paddingLeft:'var(--wp--preset--spacing--superbspacing-small)'}}>
                <div
                    class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex">
                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-7 wp-block-column-is-layout-flow"
                        style={{paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                        <div
                            class="wp-block-group is-layout-flow wp-container-core-group-is-layout-9 wp-block-group-is-layout-flow">
                            <h3 class="wp-block-heading has-text-align-left has-superbfont-xlarge-font-size"
                                style={{lineHeight:1.2}}>Data can be insightful &amp; beautiful</h3>



                            <p class="has-text-align-left has-mono-2-color has-text-color has-superbfont-small-font-size">
                                Visualisations and statistics can pinpoint areas in which we are strong as well as what we
                                can improve in order to build healthier relationships. This can be with a significant other,
                                family member, or a friend. ChatAlytics wants to deliver you these results in a beautiful
                                manner so you can see what your whatsapp relationship is like.</p>
                        </div>
                    </div>



                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-8 wp-block-column-is-layout-flow"
                        style={{paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                        <figure class="wp-block-image size-large has-custom-border"><img
                            src="https://chatalytics.nl/wp-content/uploads/2024/10/pexels-olly-853151-1024x683.jpg"
                            alt="" style={{borderRadius:8}}/></figure>
                    </div>
                </div>
            </div>



            <div class="wp-block-group alignfull has-global-padding is-layout-constrained wp-container-core-group-is-layout-12 wp-block-group-is-layout-constrained"
                style={{marginTop:0,marginBottom:0}}>
                <div
                    class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-4 wp-block-columns-is-layout-flex">
                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-9 wp-block-column-is-layout-flow"
                        style={{paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                        <figure class="wp-block-image size-large is-resized has-custom-border"><img
                            src="https://chatalytics.nl/wp-content/uploads/2024/10/whatsapp-logo-whatsapp-logo-transparent-whatsapp-icon-transparent-free-free-png.webp"
                            alt="" style={{borderRadius:8,width:471,height:'auto'}}/></figure>
                    </div>



                    <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-10 wp-block-column-is-layout-flow"
                        style={{paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0}}>
                        <div
                            class="wp-block-group is-layout-flow wp-container-core-group-is-layout-11 wp-block-group-is-layout-flow">
                            <h3 class="wp-block-heading has-text-align-left has-superbfont-xlarge-font-size"
                                style={{lineHeight:1.2}}>Why Whatsapp?</h3>



                            <p class="has-text-align-left has-mono-2-color has-text-color has-superbfont-small-font-size">
                                More than 2.9 billion people use Whatsapp, of which 80% open the app on a daily basis. On
                                average each user spends 34 minutes a day on the app. This all totals to 100+ billion
                                messages sent each day. In conclusion, this single app is the medium of most of our
                                interactions with other people. This makes it the perfect source of data in order to get
                                insight into our behaviour.</p>
                        </div>
                    </div>
                </div>
            </div>



            <div class="wp-block-group alignfull has-mono-4-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-18 wp-block-group-is-layout-constrained"
                style={{marginTop:0,marginBottom:0}}>
                <div
                    class="wp-block-group alignwide is-vertical is-content-justification-center is-layout-flex wp-container-core-group-is-layout-13 wp-block-group-is-layout-flex">
                    <h3
                        class="wp-block-heading has-text-align-left has-primary-color has-text-color has-superbfont-small-font-size">
                        Our Work</h3>



                    <h2
                        class="wp-block-heading has-text-align-center has-contrast-color has-text-color has-superbfont-xlarge-font-size">
                        The team</h2>



                    <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-small-font-size">We are
                        students with an Idea and a vision which we want to share with the world!</p>
                </div>



                <div
                    class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-5 wp-block-columns-is-layout-flex">
                    <div
                        class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-11 wp-block-column-is-layout-flow">
                        <div
                            class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-15 wp-block-group-is-layout-constrained">
                            <div
                                class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-14 wp-block-group-is-layout-constrained">
                                <h3
                                    class="wp-block-heading has-text-align-center has-contrast-color has-text-color has-superbfont-medium-font-size">
                                    Tim Angevare</h3>



                                <ul
                                    class="wp-block-social-links is-content-justification-center is-layout-flex wp-container-core-social-links-is-layout-1 wp-block-social-links-is-layout-flex">
                                    <li class="wp-social-link wp-social-link-github  wp-block-social-link"><a
                                        href="https://github.com/TimAngevare" class="wp-block-social-link-anchor"><svg
                                            width="24" height="24" viewbox="0 0 24 24" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                            <path
                                                d="M12,2C6.477,2,2,6.477,2,12c0,4.419,2.865,8.166,6.839,9.489c0.5,0.09,0.682-0.218,0.682-0.484 c0-0.236-0.009-0.866-0.014-1.699c-2.782,0.602-3.369-1.34-3.369-1.34c-0.455-1.157-1.11-1.465-1.11-1.465 c-0.909-0.62,0.069-0.608,0.069-0.608c1.004,0.071,1.532,1.03,1.532,1.03c0.891,1.529,2.341,1.089,2.91,0.833 c0.091-0.647,0.349-1.086,0.635-1.337c-2.22-0.251-4.555-1.111-4.555-4.943c0-1.091,0.39-1.984,1.03-2.682 C6.546,8.54,6.202,7.524,6.746,6.148c0,0,0.84-0.269,2.75,1.025C10.295,6.95,11.15,6.84,12,6.836 c0.85,0.004,1.705,0.114,2.504,0.336c1.909-1.294,2.748-1.025,2.748-1.025c0.546,1.376,0.202,2.394,0.1,2.646 c0.64,0.699,1.026,1.591,1.026,2.682c0,3.841-2.337,4.687-4.565,4.935c0.359,0.307,0.679,0.917,0.679,1.852 c0,1.335-0.012,2.415-0.012,2.741c0,0.269,0.18,0.579,0.688,0.481C19.138,20.161,22,16.416,22,12C22,6.477,17.523,2,12,2z">
                                            </path>
                                        </svg><span
                                            class="wp-block-social-link-label screen-reader-text">GitHub</span></a></li>

                                    <li class="wp-social-link wp-social-link-linkedin  wp-block-social-link"><a
                                        href="https://www.linkedin.com/in/tim-angevare-460471165/"
                                        class="wp-block-social-link-anchor"><svg width="24" height="24"
                                            viewbox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true" focusable="false">
                                            <path
                                                d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z">
                                            </path>
                                        </svg><span
                                            class="wp-block-social-link-label screen-reader-text">LinkedIn</span></a>
                                    </li>
                                </ul>
                            </div>



                            <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-xsmall-font-size">
                                Business &amp; IT student @ University of Twente</p>
                        </div>
                    </div>



                    <div
                        class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-12 wp-block-column-is-layout-flow">
                        <div
                            class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-17 wp-block-group-is-layout-constrained">
                            <div
                                class="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-16 wp-block-group-is-layout-constrained">
                                <h3
                                    class="wp-block-heading has-text-align-center has-contrast-color has-text-color has-superbfont-medium-font-size">
                                    Joost Liebeton</h3>



                                <ul
                                    class="wp-block-social-links is-content-justification-center is-layout-flex wp-container-core-social-links-is-layout-2 wp-block-social-links-is-layout-flex">
                                    <li class="wp-social-link wp-social-link-github  wp-block-social-link"><a
                                        href="https://github.com/TimAngevare" class="wp-block-social-link-anchor"><svg
                                            width="24" height="24" viewbox="0 0 24 24" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                            <path
                                                d="M12,2C6.477,2,2,6.477,2,12c0,4.419,2.865,8.166,6.839,9.489c0.5,0.09,0.682-0.218,0.682-0.484 c0-0.236-0.009-0.866-0.014-1.699c-2.782,0.602-3.369-1.34-3.369-1.34c-0.455-1.157-1.11-1.465-1.11-1.465 c-0.909-0.62,0.069-0.608,0.069-0.608c1.004,0.071,1.532,1.03,1.532,1.03c0.891,1.529,2.341,1.089,2.91,0.833 c0.091-0.647,0.349-1.086,0.635-1.337c-2.22-0.251-4.555-1.111-4.555-4.943c0-1.091,0.39-1.984,1.03-2.682 C6.546,8.54,6.202,7.524,6.746,6.148c0,0,0.84-0.269,2.75,1.025C10.295,6.95,11.15,6.84,12,6.836 c0.85,0.004,1.705,0.114,2.504,0.336c1.909-1.294,2.748-1.025,2.748-1.025c0.546,1.376,0.202,2.394,0.1,2.646 c0.64,0.699,1.026,1.591,1.026,2.682c0,3.841-2.337,4.687-4.565,4.935c0.359,0.307,0.679,0.917,0.679,1.852 c0,1.335-0.012,2.415-0.012,2.741c0,0.269,0.18,0.579,0.688,0.481C19.138,20.161,22,16.416,22,12C22,6.477,17.523,2,12,2z">
                                            </path>
                                        </svg><span
                                            class="wp-block-social-link-label screen-reader-text">GitHub</span></a></li>

                                    <li class="wp-social-link wp-social-link-linkedin  wp-block-social-link"><a
                                        href="https://www.linkedin.com/in/joost-liebeton-4342ab263/"
                                        class="wp-block-social-link-anchor"><svg width="24" height="24"
                                            viewbox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true" focusable="false">
                                            <path
                                                d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z">
                                            </path>
                                        </svg><span
                                            class="wp-block-social-link-label screen-reader-text">LinkedIn</span></a>
                                    </li>
                                </ul>
                            </div>



                            <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-xsmall-font-size">
                                Business &amp; IT student @ University of Twente</p>
                        </div>
                    </div>
                </div>
            </div>



            <div class="wp-block-group alignfull has-global-padding is-layout-constrained wp-container-core-group-is-layout-21 wp-block-group-is-layout-constrained has-background"
                style={{marginTop:0,marginBottom:0,backgroundImage:'url(http://3.65.199.250/wp-content/themes/idea-flow/assets/images/cta/cta-4.jpg)',backgroundSize:'cover'}}>
                <div
                    class="wp-block-group alignwide has-global-padding is-content-justification-center is-layout-constrained wp-container-core-group-is-layout-20 wp-block-group-is-layout-constrained">
                    <div class="wp-block-group has-contrast-light-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-19 wp-block-group-is-layout-constrained"
                        style={{borderRadius:24}}>
                        <h3
                            class="wp-block-heading has-text-align-center has-primary-color has-text-color has-superbfont-small-font-size">
                            Start Your Journey</h3>



                        <h2
                            class="wp-block-heading has-text-align-center has-mono-1-color has-text-color has-superbfont-xlarge-font-size">
                            What are you waiting for?</h2>



                        <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-small-font-size">Now
                            you have read what we can do, what are you waiting for? Get started today and you can receive
                            your insights within 1 minute!</p>



                        <div
                            class="wp-block-buttons wp-container-content-2 is-content-justification-center is-nowrap is-layout-flex wp-container-core-buttons-is-layout-3 wp-block-buttons-is-layout-flex">
                            <div class="wp-block-button has-custom-font-size has-superbfont-small-font-size"><a
                                class="wp-block-button__link wp-element-button" href="/get-started/">Get started!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>


        </div>
    );
}

export default Home;