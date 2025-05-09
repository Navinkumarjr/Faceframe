import React from "react";
function Footer() {
    let date = new Date();
    let currentyear = date.getFullYear();
    return (
        <>
            <div className="row">
                <div className="col footer">
                    <p>&copy; {currentyear} Naveen kumar</p>
                    <p>Connect with me,</p>
                    <h5 className="footer-link">
                        <a href="https://instagram.com/naveen_jr.7"><i className="connect text-secondary bi-instagram text"></i></a><a href="https://www.linkedin.com/in/naveenkumarj2005/"><i className="connect bi bi-linkedin text-secondary"></i></a><a href="https://github.com/Navinkumarjr"><i className="connect bi-github text-secondary"></i></a>
                    </h5>
                </div>
            </div></>
    );
}
export default Footer;