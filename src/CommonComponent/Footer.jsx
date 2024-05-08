import React from 'react';

const Footer = () => {
  // Define style objects
  const footerStyle = {
    backgroundColor: '#007bff', // Blue background color
    color: 'white', // Text color
    padding: '40px 0',
    marginTop:"2rem"
  };

  const footerTopStyle = {
    padding: '40px 0',
  };

  const copyrightStyle = {
    marginBottom: '10px',
  };

  const creditsStyle = {
    marginBottom: '10px',
  };

  const socialLinkStyle = {
    margin: '0 5px',
    color: 'white',
  };

  return (
    <footer id="footer" style={footerStyle}>

      {/* Footer Top */}
      <div className="footer-top" style={footerTopStyle}>
        <div className="container">
          <div className="row">

            {/* Company Contact Information */}
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>Company</h3>
              <p>
                A108 Adam Street <br />
                New York, NY 535022<br />
                United States <br /><br />
                <strong>Phone:</strong> +1 5589 55488 55<br />
                <strong>Email:</strong> info@example.com<br />
              </p>
            </div>

            {/* Useful Links */}
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About us</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Services</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of service</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy policy</a></li>
              </ul>
            </div>

            {/* Our Services */}
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Web Design</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Web Development</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Product Management</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Marketing</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Graphic Design</a></li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Join Our Newsletter</h4>
              <p>Subscribe to stay updated with our latest news and offers!</p>
              <form action="" method="post">
                <input type="email" name="email" placeholder="Your email" style={{ padding: '5px', marginRight: '10px', border: 'none', borderRadius: '5px' }} />
                <input type="submit" value="Subscribe" style={{ padding: '5px 10px', backgroundColor: '#f8f9fa', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container d-md-flex py-4 footer-bottom">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright" style={copyrightStyle}>
            &copy; Copyright <strong><span>Company</span></strong>. All Rights Reserved.
          </div>
          <div className="credits" style={creditsStyle}>
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>

        <div className="social-links text-center text-md-right pt-3 pt-md-0">
          <a href="#" className="twitter" style={socialLinkStyle}><i className="bx bxl-twitter"></i></a>
          <a href="#" className="facebook" style={socialLinkStyle}><i className="bx bxl-facebook"></i></a>
          <a href="#" className="instagram" style={socialLinkStyle}><i className="bx bxl-instagram"></i></a>
          <a href="#" className="linkedin" style={socialLinkStyle}><i className="bx bxl-linkedin"></i></a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
