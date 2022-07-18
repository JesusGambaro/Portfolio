import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import emailjs from "emailjs-com";
import {useForm} from "react-hook-form";
import "./contact.scss";
const boxVariant = {
  visible: {opacity: 1, y: "0"},
  hidden: {opacity: 1, y: "-100%"},
};
const Contact = () => {
  const navigate = useNavigate();
  const form = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const sendEmail = () => {
    setLoading(true);
    emailjs
      .sendForm(
        "service_mfsoqjt",
        "template_3xzcsjv",
        form.current,
        "78YKZhvNkQHSYOHXZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSend(true);
          setLoading(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  useEffect(() => {
    const elmt = document.getElementsByClassName("contact-container")[0];
    const listener = (e) => {
      if (e.deltaY < 0) {
        navigate("/AboutMe");
        elmt.removeEventListener("wheel", listener);
      }
    };
    elmt.addEventListener("wheel", listener);
  }, [navigate]);
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("Copy?");
  return (
    <motion.section
      className="contact-container"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      transition={{
        x: {type: "spring", stiffness: 50},
        y: {type: "spring", stiffness: 50},
        default: {duration: ".75"},
      }}
    >
      <div className="form-container">
        <h1>Contact Me</h1>
        <form ref={form} onSubmit={handleSubmit(sendEmail)}>
          <span>
            <div className="input">
              <input
                className="input-field"
                placeholder="Name"
                type="text"
                name="from_name"
                autoComplete="off"
                {...register("from_name", {required: true})}
              />
              <span className="input-border"></span>
              {errors.from_name && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div className="input">
              <input
                className="input-field"
                placeholder="Email"
                {...register("from_email", {required: true})}
                autoComplete="off"
                name="from_email"
                type="email"
              />
              <span className="input-border"></span>
              {errors.from_email && (
                <span className="errors">This field is required</span>
              )}
            </div>
          </span>
          <div className="input">
            <input
              className="input-field"
              placeholder="Subject"
              autoComplete="off"
              name="subject"
              type="text"
            />
            <span className="input-border"></span>
          </div>
          <div className="input">
            <textarea
              className="input-field"
              name="message"
              cols="30"
              rows={window.screen.width > 600 ? "8" : "5"}
              maxLength={2000}
              placeholder="Message"
              {...register("message", {required: true})}
              autoComplete="off"
            ></textarea>
            {errors.message && (
              <span className="errors">This field is required</span>
            )}
            <span className="input-border"></span>
          </div>
          <button
            type="submit"
            className={send ? "send" : loading ? "loading" : ""}
            disabled={send || loading}
          >
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                {send ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-send-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                )}
              </div>
            </div>
            <span>Send message</span>
          </button>
        </form>
      </div>
      <div className="map-container">
        <span className="wrapper">
          <p>
            If you are starting a business or stuck in the middle and looking
            for a creative Full Stack Developer to help develop your business,
            you are at the right place at the right time.
          </p>
          <p>Fill up the form with details and I will contact you. 😊</p>
          <span>
            <p
              className="phone"
              onTouchStart={() =>
                (window.location.href = "tel: +54-2614726608")
              }
            >
              <i className="bi bi-phone"></i> +54 - 2614726608
            </p>
            <p
              className="email"
              id="box"
              onClick={() => {
                navigator.clipboard.writeText("gambaropablo4@gmail.com");
                console.log(window.screen.width);
                setCopied("Copied!");
              }}
              onMouseMove={(e) => {
                document.getElementById("tooltip").style.left =
                  e.clientX - 24 + "px";
                document.getElementById("tooltip").style.top =
                  e.clientY + 32 + "px";
              }}
              onMouseLeave={() => setCopied("Copy?")}
              onTouchStart={() =>
                (window.location.href = "mailto: gambaropablo4@gmail.com")
              }
            >
              <i className="bi bi-envelope-open-fill"></i>
              gambaropablo4gmail.com
              <i id="tooltip">{copied}</i>
            </p>
          </span>
        </span>
        <iframe
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=Guaymallen%20department&t=&z=11&ie=UTF8&iwloc=&output=embed"
          title="Guaymallen department"
          onLoad={() => {
            console.clear();
          }}
        ></iframe>
      </div>
    </motion.section>
  );
};

export default Contact;
