import React from 'react';
import './Contactsec2.css';
import officeimg from './office.png';

function Contactsec2() {
    return (
        <div className='Contactsec2main'>
            <h1>Visit Us</h1>
            <div className="Contactsec2conflex">
                <div className="constcattsec2left">
                    <img src={officeimg} alt="Office" />
                </div>
                <div className="contactsec2right">
                    <div className='contactsec2rightcon'>
                        <h3>Mumbai</h3>
                        <p>Tiny Tiaraa</p>
                        <div className='flex justify-center'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7539.227470998889!2d72.86813600017196!3d19.124594023259718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c90071c06cc9%3A0x301cff455d8de28f!2sOffice%20MIDC!5e0!3m2!1sen!2sin!4v1718170611759!5m2!1sen!2sin"
                                width="300"
                                height="260"
                                style={{ border: "1px solid gray" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Office Location"
                            />
                        </div>
                        <div className='contactbtncenter'>
                            <button
                                onClick={() => window.open('https://www.google.com/maps/place/Office+MIDC/@19.124594,72.868136,15z/data=!4m5!3m4!1s0x3be7c90071c06cc9:0x301cff455d8de28f!8m2!3d19.124594!4d72.868136', '_blank')}
                            >
                                Visit Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contactsec2;
