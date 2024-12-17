import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./Freq.css";
import freq1 from "./images/freq1.svg";
import freq2 from "./images/freq2.svg";
import freq3 from "./images/freq3.svg";
import freq4 from "./images/freq4.svg";
import freq5 from "./images/freq5.svg";
import freq6 from "./images/freq6.svg";
import freq7 from "./images/freq7.svg";
import freq8 from "./images/freq8.svg";
import freq9 from "./images/freq9.svg";
import freq10 from "./images/freq10.svg";
import thankuimg from "./images/thanku.svg";
import swal from "sweetalert";

import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  margin: "10px",
  fontFamily: "Poppins",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)",

  flexDirection: "coloumn-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  padding: "20px 25px",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [opendone, setOpenDone] = React.useState(false);

  const [showMore, setShowMore] = React.useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="freqques">
      <h1>Frequently Asked Questions</h1>
      <p>
        See some common questions and answers below, or call us at +91 86570
        62511
      </p>
      <div className="accordiansmain">
        <div className="accordiansleft">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <img src={freq1} alt="" />
              <Typography>
                What is Unique about Tiny Tiaraa Jewelry?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our Jewelry is made from hypoallergenic and non-toxic
                materials, ensuring safety and comfort for kids and infants.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <img src={freq2} alt="" />

              <Typography>
                Can I find jewelry for special occasions?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, we offer a variety of designs perfect for birthdays, naming
                ceremonies, and other special moments.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <img src={freq3} alt="" />

              <Typography>Are there adjustable sizes available?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Many of our pieces come with adjustable features to grow with
                your child.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <img src={freq4} alt="" />

              <Typography>How do I place an order online?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Simply select the items you wish to purchase, add them to your
                cart, and follow the checkout process on our website.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
            >
              <img src={freq5} alt="" />

              <Typography>What is your policy on exchanges?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Exchanges can be made within 7 days of delivery for items in their original condition.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={`accordiansright ${showMore ? "show" : "hide"}`}>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
            >
              <img src={freq6} alt="" />

              <Typography>
                What should I do if I receive a defective product?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Contact our customer service immediately to arrange for a
                replacement or refund.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
          >
            <AccordionSummary
              aria-controls="panel7d-content"
              id="panel7d-header"
            >
              <img src={freq7} alt="" />

              <Typography>Timely Shipping and Delivery</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Experience reliable and prompt shipping services to ensure your orders arrive on time.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel8"}
            onChange={handleChange("panel8")}
          >
            <AccordionSummary
              aria-controls="panel8d-content"
              id="panel8d-header"
            >
              <img src={freq8} alt="" />

              <Typography>How often do you introduce new designs?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              We introduce new collections for monthly festivals, seasonally, and on special occasions.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel9"}
            onChange={handleChange("panel9")}
          >
            <AccordionSummary
              aria-controls="panel9d-content"
              id="panel9d-header"
            >
              <img src={freq9} alt="" />
              <Typography>
                Can I get jewelry customized for my child?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, we offer customization Services, Just upload the design you
                want to get manufactured and we will bring it to you in reality.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel10"}
            onChange={handleChange("panel10")}
          >
            <AccordionSummary
              aria-controls="panel10d-content"
              id="panel10d-header"
            >
              <img src={freq10} alt="" />

              <Typography>
                How can I find out about promotions and new releases?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Subscribe to our newsletter or follow us on social media for
                updates on promotions and new arrivals.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <button onClick={toggleShowMore} className="view-more-btn">
          {showMore ? "View Less" : "View More"}
        </button>
      </div>
      <div className="flex justify-center mobfaqbtn">
        <button
          className="freqbtn"
          onClick={() => {
            navigate("/products");
          }}
        >
          Shop Now
        </button>
      </div>

      <div className="moreques">
        <div>
          <h3>Did you find information on this page useful?</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={() => setOpenDone(true)}>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15.4023" cy="15.4023" r="15.4023" fill="#006B18" />
              <path
                d="M6.16089 22.3332H9.52139V12.1676H6.16089V22.3332ZM24.6436 13.0148C24.6436 12.0829 23.8875 11.3205 22.9634 11.3205H17.6622L18.4603 7.44914L18.4855 7.17806C18.4855 6.83074 18.3427 6.50883 18.1159 6.28011L17.2253 5.39062L11.6973 10.9732C11.3865 11.2782 11.2016 11.7017 11.2016 12.1676V20.6389C11.2016 21.5707 11.9578 22.3332 12.8819 22.3332H20.443C21.1403 22.3332 21.7368 21.9096 21.9889 21.2997L24.526 15.3274C24.6016 15.1326 24.6436 14.9293 24.6436 14.709V13.0148Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="cursor-pointer" onClick={() => setOpen(true)}>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15.4023" cy="15.4023" r="15.4023" fill="#E13939" />
              <path
                d="M17.9226 8.47119H10.3615C9.66421 8.47119 9.06772 8.89475 8.81569 9.50469L6.27851 15.4769C6.20289 15.6718 6.16089 15.8751 6.16089 16.0953V17.7896C6.16089 18.7214 6.917 19.4838 7.84114 19.4838H13.1423L12.3442 23.3552L12.319 23.6263C12.319 23.9736 12.4618 24.2955 12.6887 24.5242L13.5792 25.4137L19.1156 19.8312C19.4181 19.5262 19.6029 19.1026 19.6029 18.6367V10.1654C19.6029 9.23361 18.8468 8.47119 17.9226 8.47119ZM21.2831 8.47119V18.6367H24.6436V8.47119H21.2831Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Thankupopup */}

          {opendone && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#0000006c] z-[1000] flex justify-center items-center">
              <div className="morequespop bg-white rounded-md shadow ">
                <div className="w-full pt-4 pr-4 flex justify-end">
                  <RxCross2
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpenDone(false)}
                  />
                </div>
                <div className="morequespopcon morequespopconthanku">
                  <div className="flex justify-center mb-2">
                    <img src={thankuimg} alt="" />
                  </div>
                  <h3>Thank you </h3>
                  <p>Your message has been received </p>

                  <div className="mt-5 flex justify-center">
                    <button onClick={() => setOpenDone(false)}>Ok</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MoreQuespopup */}

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#0000006c] z-[1000] flex justify-center items-center">
              <div className="morequespop bg-white rounded-md shadow ">
                <div className="w-full pt-4 pr-4 flex justify-end">
                  <RxCross2
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    swal({
                      title: "Thank you !",
                      text: "Your message has been received !",
                      icon: "success",
                    });
                  }}
                >
                  <div className="morequespopcon">
                    <h3>What can we do better?</h3>

                    <textarea
                      required
                      name=""
                      id=""
                      placeholder="Enter your feedback here.Note: This is an anonymized feedback. if yo would like us to contact you , please mention your number and email ID "
                    ></textarea>

                    <div className="mt-4 flex justify-center">
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomizedAccordions;
