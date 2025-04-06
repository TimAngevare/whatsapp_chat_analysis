
function Navbar() {
    return (<header class="wp-block-template-part">
        <div class="wp-block-group alignfull superbthemes-navigation-three has-global-padding is-layout-constrained wp-container-core-group-is-layout-2 wp-block-group-is-layout-constrained"
            style={{borderStyle:'none',borderWidth:0,paddingTop:20,paddingBottom:10}}>
            <div class="wp-block-group alignwide has-mono-4-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-1 wp-block-group-is-layout-constrained"
                style={{borderRadius:100,paddingTop:15,paddingRight:25,paddingBottom:15,paddingLeft:25}}>
                <div class="wp-block-columns alignwide are-vertically-aligned-center is-not-stacked-on-mobile superbthemes-navigation-three-columns-wrapper is-layout-flex wp-container-core-columns-is-layout-1 wp-block-columns-is-layout-flex"
                    style={{borderBottomStyle:'none',borderBottomWidth:0,paddingRight:0,paddingLeft:0}}>
                    <div class="wp-block-column is-vertically-aligned-center superbthemes-navigation-three-columns-logo is-layout-flow wp-block-column-is-layout-flow"
                        style={{flexBasis:'25%'}}>
                        <figure class="wp-block-image size-full is-resized"><img decoding="async" width="455"
                            height="106" src="src/assets/logoFull.png"
                            alt="" class="wp-image-168" style={{width:249,height:'auto'}}
                            srcset="/wp-content/uploads/2024/10/logoFull.png 455w, /wp-content/uploads/2024/10/logoFull-300x70.png 300w"
                            sizes="(max-width: 455px) 100vw, 455px" /></figure>
                    </div>



                    <div class="wp-block-column is-vertically-aligned-center superbthemes-navigation-three-columns-nav is-layout-flow wp-block-column-is-layout-flow"
                        style={{flexBasis:'50%'}}>
                        <nav style={{fontWeight:700}}
                            class="has-text-color has-mono-1-color has-superbfont-xsmall-font-size is-responsive items-justified-center wp-block-navigation is-content-justification-center is-layout-flex wp-container-core-navigation-is-layout-1 wp-block-navigation-is-layout-flex"
                            aria-label="Navigation - Superb Addons - Theme Designer"
                            data-wp-interactive="core/navigation"
                            data-wp-context='{"overlayOpenedBy":{"click":false,"hover":false,"focus":false},"type":"overlay","roleAttribute":"","ariaLabel":"Menu"}'>
                            <button aria-haspopup="dialog" aria-label="Open menu"
                                class="wp-block-navigation__responsive-container-open "
                                data-wp-on-async--click="actions.openMenuOnClick"
                                data-wp-on--keydown="actions.handleMenuKeydown"><svg width="24" height="24"
                                    xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24">
                                    <path d="M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"></path>
                                </svg></button>
                            <div class="wp-block-navigation__responsive-container  " id="modal-1"
                                data-wp-class--has-modal-open="state.isMenuOpen"
                                data-wp-class--is-menu-open="state.isMenuOpen" data-wp-watch="callbacks.initMenu"
                                data-wp-on--keydown="actions.handleMenuKeydown"
                                data-wp-on-async--focusout="actions.handleMenuFocusout" tabindex="-1">
                                <div class="wp-block-navigation__responsive-close" tabindex="-1">
                                    <div class="wp-block-navigation__responsive-dialog"
                                        data-wp-bind--aria-modal="state.ariaModal"
                                        data-wp-bind--aria-label="state.ariaLabel"
                                        data-wp-bind--role="state.roleAttribute">
                                        <button aria-label="Close menu"
                                            class="wp-block-navigation__responsive-container-close"
                                            data-wp-on-async--click="actions.closeMenuOnClick"><svg
                                                xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24"
                                                height="24" aria-hidden="true" focusable="false">
                                                <path
                                                    d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z">
                                                </path>
                                            </svg></button>
                                        <div class="wp-block-navigation__responsive-container-content"
                                            data-wp-watch="callbacks.focusFirstElement" id="modal-1-content">
                                            <ul style={{fontWeight:700}}
                                                class="wp-block-navigation__container has-text-color has-mono-1-color has-superbfont-xsmall-font-size is-responsive items-justified-center wp-block-navigation has-superbfont-xsmall-font-size">
                                                <li
                                                    class="has-text-color has-mono-1-color has-superbfont-xsmall-font-size wp-block-navigation-item current-menu-item wp-block-home-link">
                                                    <a class="wp-block-home-link__content wp-block-navigation-item__content"
                                                        href="/" rel="home" aria-current="page">Home</a></li>
                                                <li
                                                    class="has-superbfont-xsmall-font-size wp-block-navigation-item wp-block-navigation-link">
                                                    <a class="wp-block-navigation-item__content"
                                                        href="https://chatalytics.nl/contact/"><span
                                                            class="wp-block-navigation-item__label">About
                                                            Us</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>



                    <div class="wp-block-column is-vertically-aligned-center superbthemes-navigation-three-columns-button is-layout-flow wp-block-column-is-layout-flow"
                        style={{flexBasis:'25%'}}>
                        <div
                            class="wp-block-buttons is-content-justification-right is-layout-flex wp-container-core-buttons-is-layout-1 wp-block-buttons-is-layout-flex">
                            <div
                                class="wp-block-button has-custom-font-size is-style-fill has-superbfont-xxsmall-font-size">
                                <a class="wp-block-button__link wp-element-button" href="/get-started/">Get
                                    started!</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>);
}

export default Navbar;