import Navigationbar from "./Components/Navigationbar";
import Footer from "./Components/Footer";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Screenshot from '../assets/picture-1-1024x579.png';
import Person from "./Components/Person";
import joostie from '../assets/IMG_3935-scaled.jpg';

function Home() {
    return (
        <div className="home">
            <Navigationbar />
            <Container>
            <div class="wp-block-group alignfull has-global-padding is-layout-constrained wp-container-core-group-is-layout-6 wp-block-group-is-layout-constrained" style={{ marginTop: 0, marginBottom: 0 }}>
                <Container className="wp-block-group alignwide is-vertical is-content-justification-center is-layout-flex wp-container-core-group-is-layout-4 wp-block-group-is-layout-flex"
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
                </Container>

                <Container class="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
                    <figure class="wp-block-image aligncenter size-large"><img width="1024" height="579"
                        src={Screenshot} /></figure>
                </Container>
            </div>
            <div class="wp-block-group alignfull column-parent-border-radius has-global-padding is-layout-constrained wp-container-core-group-is-layout-8 wp-block-group-is-layout-constrained"
                style={{marginTop:0,marginBottom:0}}>
                <Container
                    class="wp-block-group alignwide has-global-padding is-layout-constrained wp-container-core-group-is-layout-7 wp-block-group-is-layout-constrained">
                    <h3
                        class="wp-block-heading has-text-align-center has-primary-color has-text-color has-superbfont-small-font-size">
                        Service</h3>



                    <h2
                        class="wp-block-heading has-text-align-center has-contrast-color has-text-color has-superbfont-xlarge-font-size">
                        What We Offer</h2>



                    <p class="has-text-align-center has-mono-2-color has-text-color has-superbfont-small-font-size"></p>
                </Container>



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
                    class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-5 wp-block-columns-is-layout-flex" style={{justifyContent: 'center'}}>
                    <Person name="Tim Angevare" pic="https://media.licdn.com/dms/image/v2/D4D03AQGNV6PghxEYGA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727981911155?e=1749686400&v=beta&t=05o16QAbmjhvOtalab2aE15ZdQnt7UwMsg2IoxStWfk"
                        description="Business & IT student @ University of Twente" linkedin="https://www.linkedin.com/in/tim-angevare-460471165/" github="github.com/timangevare/"/>
                    <Person name="Joost Liebeton" pic='https://media.licdn.com/dms/image/v2/D4E03AQE8MjuF5tfBPw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726583882078?e=1749686400&v=beta&t=6qgr4bEXrFWGB5NXiuqxK56fpT2aI_UbZ0AprN8PqT8'
                        description="Business & IT student @ University of Twente" linkedin="https://www.linkedin.com/in/joost-liebeton-4342ab263/" github="https://github.com/joostliebeton"/>
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
            </Container>
            <Footer></Footer>


        </div>
    );
}

export default Home;