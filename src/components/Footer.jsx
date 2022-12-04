import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
      <footer role="contentinfo" className='footer d-flex border-top py-3 px-4'>
          <div className='container-fluid d-flex'>
            <div className='d-block'>
              <a
                className="d-block"
                href={config.LMS_BASE_URL}
                aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
              >
                <img className='logo' src={ logo || config.LOGO_TRADEMARK_URL } alt={ intl.formatMessage(messages['footer.logo.altText']) } />
              </a>
              <h4>Universitas Sumatera Utara</h4>
              <p>
                Jalan Dr. T. Mansur No. 9, Padang Bulan,
                <br />
                Kec. Medan Baru, Kota Medan,
                <br />
                Sumatera Utara 20222
              </p>
            </div>

            <div className='d-block footer-column'>
              <h4>Links</h4>
              <ul className='col-count'>
                <li>
                  <a href="https://usu.ac.id">USU Website</a>
                </li>
                <li>
                  <a href="https://mbkm.usu.ac.id"> MBKM USU Website</a>
                </li>
                <li>
                  <a href="https://akun.usu.ac.id">Single Sign On</a>
                </li>
                <li>
                  <a href="https://repositori.usu.ac.id">Repository</a>
                </li>
                <li>
                  <a href="https://mbkm.usu.ac.id">MBKM Portal</a>
                </li>
                <li>
                  <a href="https://direktori.usu.ac.id">Directory</a>
                </li>
                <li>
                  <a href="https://survei.usu.ac.id">Survey</a>
                </li>
                <li>
                  <a href="https://simabdimas.usu.ac.id">Simabdimas</a>
                </li>
                <li>
                  <a href="https://sipustaha.usu.ac.id">Sipustaha</a>
                </li>
              </ul>
            </div>

            <div class="d-block footer-column">
              <h4>Others</h4>
              <ul>
                <li>
                  <a>Feedback and Suggestions</a>
                </li>
                <li>
                  <a>Tutorials</a>
                </li>
                <li>
                  <a>Credential Manager</a>
                </li>
                <li>
                  <a>Available Courses</a>
                </li>
              </ul>
            </div>

            <div class="d-block footer-column">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <a href="mailto:info@usu.ac.id">info@usu.ac.id</a>
                </li>
                <li>
                  <a href="tel:0618226737">061 8226737</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex-grow-1" />
          {showLanguageSelector && (
            <LanguageSelector
              options={supportedLanguages}
              onSubmit={onLanguageSelected}
            />
          )}

          <div class="footer-bottom">
            <p class="copyright">
              Copyright ©2022 Universitas Sumatera Utara.
              <br />
              © Smart Class USU. All rights reserved except where noted. edX, Open edX and their respective logos are registered trademarks of edX Inc.
            </p>
            <p>
              <a href="https://docs.tutor.overhang.io" rel="noopener" target="_blank">
                <img src="https://ik.imagekit.io/8i5ytn4vl/tutor-logo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670137142558" height="42" />
              </a>
              <a href="${footer['openedx_link']['url']}" rel="noopener" target="_blank">
                <img src="https://ik.imagekit.io/8i5ytn4vl/openedx-logo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670137164727" alt="open edx" width="140" />
              </a>
              <a href="https://usu.ac.id" target="_blank">
                <img src="https://ik.imagekit.io/8i5ytn4vl/usu-logo-black.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670137103744" alt="USU" height="42" />
              </a>
            </p>
          </div>
        </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
