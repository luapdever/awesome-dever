import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import styles from "../../../../../styles/specific/portfolio/windows/contact.module.css";

function Contact() {
  const path1 = useRef();
  const path2 = useRef();
  const path3 = useRef();
  const path4 = useRef();
	const btnSend = useRef();

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    body: "",
  });

  const handleFieldValue = (e) => {
    let nameField = e.target.name;
    let valueField = e.target.value;
    
    setFormValues({ ...formValues, [nameField]: valueField });

    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/g;
    if(reg.test(formValues.email)) {
      path1.current.style.opacity = 1;
    } else {
      path1.current.style.opacity = 0;
    }
    if(formValues.name != "") {
      path2.current.style.opacity = 1;
    } else {
      path2.current.style.opacity = 0;
    }
    if(formValues.body != "") {
      path3.current.style.opacity = 1;
      path4.current.style.opacity = 1;
    } else {
      path3.current.style.opacity = 0;
      path4.current.style.opacity = 0;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if(sent) return;

    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/g;

    const test =
      reg.test(formValues.email) &&
      formValues.name != "" &&
      formValues.body != "";
    if (test) {
			setLoading(true)
      axios
        .post("https://dever-backend.herokuapp.com/api/contact", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text-plain, */*",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
          email: formValues.email,
          name: formValues.name,
          body: formValues.body,
        })
        .then((res) => {
          // this.sending = null;
          toast.success("Mail sent to Luap Dever");
					setLoading(false)
          setSent(true);
					btnSend.current.style.display = "none";
        })
        .catch((err) => {
          toast.error(err);
					setLoading(false)
        });
      console.log(formValues);
    }
  };

  return (
    <div className={styles.contact}>
      <div>
        <div className={styles.luapImg}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="400"
            // height="592"
            version="1"
            viewBox="0 0 499 444"
          >
            <path 
              ref={path1}
              style={{opacity: 0}}
              d="M0 2220V0l163 1 162 1 103 206c56 114 102 212 102 219 0 6 24 36 53 66 49 52 220 160 447 285 78 42 189 85 250 97 19 3 62 15 95 25s83 23 110 28c28 6 98 27 157 47 82 29 119 48 158 81 42 36 59 44 90 44 21 0 42-5 46-12 4-6 3-8-3-5-14 9-93-31-93-47 0-25 23-81 50-121 38-55 120-145 132-145s9 4-84 126c-63 81-84 128-56 121 6-1 17 9 24 22s18 27 26 32c7 5 13 12 13 16s11 25 24 46l23 38-16 177c-9 97-16 211-16 252 0 57-5 83-20 108-20 32-29 72-10 42 5-8 10-10 10-4 0 18-12 24-26 13-21-17-38 25-25 62 6 16 6 27 2 24-5-2-11 4-14 15-5 20 0 23 35 23 9 0 16 4 15 10s4 12 11 13c6 1 14 3 17 4s9 3 14 4c5 0 12 4 16 8 9 9-16 5-33-5-7-5-12-3-12 3 0 15 26 41 33 34 3-4 11-3 17 1 8 5 8 11-1 21-9 11-8 14 5 14 10 0 14 4 11 10s1 7 9 4c9-4 18 0 22 10 5 12 11 13 24 6 15-8 22-5 35 12 10 15 33 27 68 34 43 10 48 13 30 19-13 4-23 11-23 14 0 4-7 8-15 8s-15-6-15-14c0-18-25-16-44 3-9 8-16 13-16 10s-14 0-31 6c-27 9-33 8-41-6-5-9-14-13-20-10-7 5-9-2-4-20 4-18 3-25-3-21-7 4-8 0-5-10 5-13 2-15-21-9-24 6-27 4-22-9 3-9 1-19-5-23-7-5-8-2-3 6 6 10 4 12-8 7-9-3-16-3-16 1 3 21-2 32-13 26-10-6-10-4 0 7 6 7 12 18 12 24 0 5-5 3-10-5-8-12-10-9-10 13 0 18-4 26-11 21-8-5-8-1 0 14 7 13 7 23 1 27-5 3-6 13-3 22 4 9 2 14-3 10-5-3-10 7-9 21 0 20-5 26-17 24-23-4-32 16-16 36 12 15 11 16-4 3-15-11-19-11-24 3-4 10-13 15-20 12-8-3-14-1-14 4s-12 2-27-5c-25-13-29-13-35 3-4 11-7 4-7-20-1-21 4-38 10-38 5 0 8 4 5 9s0 14 8 20c10 9 15 8 20-4 3-9-1-18-9-21-8-4-13-10-10-14 3-5 1-11-5-15s-7-13-1-23c4-9 6-23 4-30-3-6 6-16 19-21 12-6 17-10 11-10-16-1-17-31-2-31 5 0 7 6 3 13-5 8-2 7 9-2 10-7 17-19 16-25-3-22 1-33 21-54l21-22-23 3c-16 3-23 11-24 27-1 13-10 29-19 37-30 21-63 127-44 138 7 5 6 11-3 18-29 25-48 115-62 297-8 102-18 196-22 209-5 16-4 22 4 17 6-4 11 1 12 11 0 10 2 110 4 223 3 199 18 304 40 283 5-4 6 1 2 12-4 14 4 31 28 57 19 20 36 35 39 32s4 1 4 8c-1 7 8 45 20 83 12 39 25 86 28 106 7 35 17 45 70 65 11 4 23 6 28 6 4-1 7 5 7 13s4 15 10 15c5 0 7-7 4-15-4-8-2-15 4-15 5 0 12-7 15-14 4-11 1-13-10-9-10 4-14 2-10-4s0-16-8-23-15-18-15-24-10-17-22-25c-20-12-20-14-4-23 10-5 19-8 20-6 1 1 7 14 14 28 10 22 11 23 9 3-2-11-9-29-17-38-17-21-22-45-8-45 6 0 7 7 4 16-4 12-2 15 9 10 8-3 15-1 15 3 0 5 7 12 16 15 8 3 12 2 9-4s2-9 12-8c34 3 54-2 49-11-4-5 5-8 19-7 14 2 33-3 42-11 10-8 12-12 6-8-7 3-13 1-13-5 0-7 6-10 13-7 6 2 20 0 29-4 11-6 19-5 24 3 4 7 3 8-4 4s-12-2-12 3c0 6 8 11 18 11 14 0 15 2 2 10-8 5-10 10-4 10 5 0 15-5 21-11s38-13 72-14c47-2 61 1 63 12 2 12 9 10 29-9 14-13 31-22 37-20 7 2 12-5 12-15 0-14 2-15 9-5 6 11 10 10 15-4 8-22 5-25-34-26-17-1-26-4-19-8 6-4 23-4 38 0 21 6 26 12 24 36-1 16 0 24 3 17 4-8 12-8 31 2 14 7 34 12 45 10 10-2 22 2 25 10s9 15 14 15c4 0 5-7 2-17-4-11-3-14 5-9 7 4 12 3 12-3 0-5 10-11 23-13 12-2 21-9 19-17s1-17 5-20 14-17 21-30c10-17 10-21 1-15-9 5-10 2-6-10 4-10 3-15-3-11-6 3-10-1-10-9 0-21-43-21-60-1-18 22-32 18-18-4 7-11 16-17 20-15 4 3 8-4 8-16s-4-19-9-16-12-1-15-10c-7-17 22-46 37-37 4 2 13-8 20-24 8-18 20-28 35-29 12-1 22 2 22 7 0 11 23 7 72-11 29-11 37-19 36-36-1-12-5-21-9-18-4 2-9-3-13-11-3-8-13-15-23-15-28 0-85-39-77-52 4-6 3-8-4-4-14 9-84-33-75-47 3-5 1-7-5-4-14 9-42-2-42-18 0-6-9-20-20-30s-17-22-14-26c3-5-1-12-9-15-14-5-16-12-20-67-2-29-5-33-26-29-16 3-22 1-17-7 4-6 11-9 16-6 4 3 14-3 21-12 12-14 12-16-1-8-12 7-13 6-4-6 6-8 14-29 18-48 5-30 4-32-11-20-11 9-14 10-9 2 4-7 16-18 26-23 18-10 19-8 10 14-5 14-6 27-2 30 4 2 12-11 18-29 8-27 8-35-3-39-7-3-13-1-13 4 0 14-27 12-33-2-4-10-6-10-6 0-1 7-5 10-11 7-11-7 15-65 28-65 5 0 16-6 26-13 16-12 17-14 2-15-47-5-46-5-34-20 10-11 8-17-7-28-10-8-16-17-12-20 3-3-7-30-24-59l-30-53 31-10c24-9 30-8 30 4 0 16 1 16 53 19 20 1 37-2 37-7s-5-6-11-3c-6 4-13-2-16-14-4-16-11-19-29-15-21 5-24 3-24-21 0-14 4-24 8-21 4 2 8-4 8-14 0-11-2-17-5-14-2 2-15-5-27-17-18-17-29-20-61-14-67 12-107 13-133 2-22-9-18-11 40-20 36-5 88-9 117-8h52l-20-20c-11-11-17-24-14-29 3-6-1-7-9-4-9 3-16 1-16-5s-6-11-12-11c-17-1-58-35-58-48s53-10 63 3c5 6 12 4 21-7 9-12 27-18 55-18 23 0 54-6 69-14 17-8 35-10 47-5 32 12 35 11 33-20-1-16-5-29-8-28-12 3-50-15-50-24 0-6-4-8-9-5-5 4-11 2-13-3-1-5-14-11-28-13-13-1-33-11-42-21-18-17-31-17-90-2-16 4-28 3-28-2s-21-10-47-12c-26-1-52-6-59-11-6-6-14-7-17-3-4 3-7 1-7-5 0-11 13-16 33-13 4 0 7-6 7-15 0-14 3-14 15-4s15 10 15-1c0-9 3-10 8-4 9 13 46 19 38 6-4-5 7-3 24 5 24 13 32 13 43 2 12-11 12-16-1-38-9-14-12-22-7-18 4 4 15 2 23-5 11-8 14-8 9 0-4 6-3 14 3 18 5 3 10-1 10-9 0-17 20-17 32-1 4 6 8-2 8-17 0-16-5-28-11-28-5 0-7 5-3 12s3 8-5 4c-9-6-8-14 4-33 10-14 12-22 6-19-10 7-16-6-12-28 1-4-6-15-16-23s-11-11-3-7 11 3 7-1c-4-5-14-10-22-12s-23-5-32-7c-10-2-23 1-30 6s-14 5-18-2c-3-5 0-10 7-11 7 0-5-6-27-13-39-12-71-4-60 14 3 5-6 7-20 5-14-1-28 2-31 6-11 19-50-22-62-66-11-42-10-48 10-75 20-28 37-42 23-20-3 5-1 10 4 10 6 0 11-5 11-11 0-8 6-7 17 2 10 8 14 9 10 2-4-6-2-15 5-20 24-15 83-33 110-33 14 0 29-6 31-12 4-10 6-9 6 1 1 11 4 11 16 1 8-7 15-10 15-7s13 1 30-4c30-11 41-29 17-29-7 0-14-12-15-27-1-16-7-29-12-31-6-2-10-8-10-13 0-6 4-7 10-4s7-1 4-9c-3-9-2-16 4-16s18-3 28-7c11-4 15-3 11 4-5 7 1 9 15 5 21-5 21-5-3-14-23-9-23-10-6-23 10-7 17-15 15-18s1-9 6-14c5-4 6-3 3 3-4 7 1 18 10 25 14 12 16 12 8 0-6-11-3-13 14-8 17 4 21 2 17-8-3-10 0-12 11-8 9 4 14 2 11-3s10-9 30-10c21 0 31 1 25 3-7 3-13 9-13 15 0 11 38 1 60-16 17-14 49-15 68-2 7 4 25 5 40 2l27-6-25 15c-23 13-23 14-4 15 11 0 26-6 33-12 11-10 12-10 7-1s1 11 22 7c17-4 32-1 36 5s12 8 18 5c7-4 8-2 4 5-4 6-11 9-16 6-4-3-11 2-14 11-9 24-7 36 4 29 6-4 8-11 5-16-4-5 1-9 10-9 8 0 19-10 24-22l8-23 7 23 7 22 19-22c19-23 19-23 15-1s7 24 40 6c11-5 26-8 34-5s11 0 7-7c-5-7-1-9 10-4 14 5 14 7 1 15-14 7-12 12 9 35 24 26 24 28 7 42-16 12-16 13 0 8 22-8 22 2 0 20-10 8-12 11-4 7 11-5 13-2 8 16-3 13-2 31 3 41 8 13 5 18-13 23-20 6-20 8-6 19 10 8 14 19 9 31-8 24-1 66 11 66 5 0 7 11 5 24-2 14 1 27 7 29 8 3 6 7-5 12-14 5-15 11-6 31 9 19 8 32-5 60-10 19-13 33-7 29 5-3 10-1 10 4 0 6-5 11-11 11-5 0-7 5-4 10 9 14-1 12-17-3-18-17-148-107-155-107-3 0 10 13 30 29 20 15 33 32 29 35-4 4 0 6 8 4 10-2 14 3 12 16-2 11 1 15 7 11 6-3 11-1 11 5s5 8 11 4c7-4 9 2 7 17-2 17 2 24 12 23 11-1 16 7 15 24 0 17 6 26 18 28 23 3 36 14 17 14-10 0-10 3 0 15 7 9 10 18 6 22-3 4-13-2-22-13-15-18-15-17-2 5 21 36 38 38 39 4 0-27 1-27 9-5 5 12 14 22 20 22s8 5 4 11c-4 8-9 7-15-2-5-8-9-9-9-3 0 5 5 15 12 22 9 9 9 15 0 24s-12 9-12-1c0-7-5-9-11-5-8 5-8 8 0 13 6 4 12 16 14 26 1 11 6 26 10 33 5 7 3 12-5 12-10 0-10 2 1 9 9 6 10 11 2 15-6 4-11 12-11 17 0 6 4 8 9 5 15-10 18 86 3 101-8 7-12 20-9 27 7 17-36 59-49 49-5-5-6-4-2 1s4 14-1 20c-13 17-22 48-12 42 5-3 11 0 13 7 7 17-2 38-12 32-5-3-12 0-16 6-4 7-3 9 4 5 19-12 30 21 39 119 3 33 5 70 5 83 0 12 6 22 14 22 17 0 41 48 39 77-1 12 2 21 8 20 9-2 11 14 8 72-1 11-13 33-27 50l-26 31 26-10c41-15 31-3-25 31-29 18-48 37-45 44 3 8-2 11-15 8-14-4-19 0-19 13 0 16 2 17 11 4 9-12 10-11 4 5-12 36-14 56-4 50 5-4 9-1 9 5 0 7 7 9 16 6 11-4 15-2 11 7-3 8-1 20 4 28 6 10 2 19-13 31-19 14-20 18-8 33 7 9 19 14 27 11s11-2 8 3 0 13 6 16c7 5 0 14-18 26-15 10-22 19-15 19s10 5 7 11c-4 6-14 8-22 5s-11-2-8 3c3 6-2 14-11 19s-16 12-16 15c0 21-12 47-22 47-14 0-13 64 1 100 6 14 9 35 7 48-3 12 0 22 6 22s9 4 6 9 2 12 11 15c12 5 14 9 5 18-16 16-15 31 1 22 8-6 8-3-1 9-8 9-11 21-7 27 3 5 2 10-3 10s-14 11-19 23c-10 22-9 24 22 24s33-3 33-30c-1-16 4-32 11-37 7-4 13-11 13-16-1-5 5-8 12-6 9 1 12-6 9-22-3-15 1-32 11-41 11-11 14-25 9-43-5-23-4-25 8-15 17 14 28 14 52 1 13-6 23-6 33 3 10 8 14 8 14 0 0-6-5-11-12-11-6 0-3-8 8-18 21-21 45-25 43-8-3 26 2 35 16 30 8-4 12-10 9-15-5-9 1-11 36-13 9-1 15-12 16-26 2-44 4-50 14-50 7 0 7 8-1 23-9 17-9 20 1 10 24-23 51-207 44-304-2-35-11-104-20-152s-14-96-11-107 1-23-4-26-9-9-9-14c0-15 68 30 89 58 16 23 21 24 35 13 24-20 19-36-18-53-19-9-41-31-50-49-20-40-20-39 2-39 31 0 53-35 62-101 10-67-1-111-33-138-29-23-19-48 16-42 11 2 8-12-7-31-7-10-27-21-44-24-25-5-35-1-53 20-12 14-25 26-29 26-13 0-38-77-44-135-4-33-20-112-37-175l-31-115 6-205c7-226 18-320 45-365 27-46 30-69 20-145-9-75-40-146-72-169-11-8-29-25-40-38-11-12-27-23-34-23s-13-7-13-16c0-8-4-12-10-9-5 3-10 1-10-5 0-7-7-9-16-6-14 5-15 4-5-8 9-11 9-16 0-22-7-4-10-3-7 2s-1 16-10 24c-14 13-15 12-9-3 4-10 2-17-5-17s-3-6 7-14c11-8 24-12 28-9 15 9-10-31-38-59-14-16-22-28-16-28 12 0 125 127 180 203 59 80 78 129 87 215 7 73 24 83 24 15 0-17 4-34 9-37 12-8 1-56-13-56-6 0-4-5 4-10 9-6 10-10 3-10s-17-9-23-20c-9-16-8-19 6-13 14 5 15 3 5-15-8-15-8-21 0-24s6-9-4-20c-9-8-13-19-9-23 4-5 2-5-5-1-15 8-56-31-48-45 4-5 1-8-7-7-7 2-12-2-11-8s-5-11-13-11c-11 0-11 4 3 19 9 10 14 21 11 23-3 3-35-28-72-68-45-51-64-80-60-91s2-15-7-11c-16 5-30-5-74-54l-30-32 60 21c97 36 219 97 302 152 69 45 253 218 253 237 0 4-28 15-61 26-49 14-58 20-44 27 10 6 45 7 81 3 50-5 75-14 114-41 37-26 74-39 143-54 108-22 375-92 432-113 147-54 425-205 504-274 42-37 61-66 114-176 35-73 71-154 80-182 22-69 57-273 57-335 0-38 4-50 15-50 13 0 15 253 15 2220v2220H0V2220zm1977 1411c-1-16-4-18-17-8-25 19-26 20-7 14 9-4 17-2 17 3 0 6 2 10 4 10 3 0 4-9 3-19zm283-171c0-5-5-10-11-10-5 0-7 5-4 10 3 6 8 10 11 10 2 0 4-4 4-10zm217-12c0-13-1-17-4-10-3 6-9 12-14 12-6 0-7-5-3-11 5-8 1-8-13 0-11 6-24 7-28 3-5-4-5-1-1 6 5 7 14 11 20 9 7-3 19-1 27 4s14 9 14 9c1 0 1-10 2-22zm355-447c19 10 24 5 30-35 3-17-6-22-54-31-32-7-58-10-58-8s-9-1-21-7c-11-7-27-9-36-6-13 5-13 8 1 21 8 8 20 15 26 15s9 4 6 9c-5 8 42 36 57 33 4-1 7 3 7 10 0 9 3 9 12 0 8-8 17-8 30-1zm-189-92c18-4 18-5-2-28-13-15-26-21-37-17-12 4-15 2-10-9 6-17-19-21-29-5-3 6-1 10 5 10s8 4 5 10c-8 13 14 52 26 45 5-4 9 0 9 7 0 9 2 10 8 2 4-7 15-13 25-15zm147-18c0-8-61-22-69-15-2 1 12 7 30 13 19 5 35 10 37 10 1 1 2-3 2-8zm184-32c15-12 25-23 22-26-5-6-46 15-64 34-23 22 11 16 42-8zm-223-28c-7-5-6-16 4-35 8-16 15-29 15-31 0-1-27 3-60 10-32 7-62 10-66 6-4-3-5 1-2 9 6 19 87 60 106 53 9-4 10-8 3-12zm52 2c-7-2-19-2-25 0-7 3-2 5 12 5s19-2 13-5zm121-12c20-22 8-35-39-46-25-6-28-5-17 6 6 7 12 23 12 36 0 28 21 30 44 4zm61-52c-4-6 2-13 14-16s21-12 21-20-4-12-9-8c-5 3-12 1-15-4-3-4-17-8-31-8-32 0-44 33-18 52 21 17 47 20 38 4zm-295-8c12-1 13-3 1-10-10-6-3-12 25-21 55-18 56-18 39-51-13-24-18-27-29-17-8 7-11 17-8 22s-3 6-14 2c-10-4-16-4-12-1 3 3-12 23-35 44l-40 38 29-2c16-2 36-4 44-4zm99-27c9-8-45-2-64 6-14 7-8 8 20 3 22-3 42-7 44-9zm-310-91c-3-20 2-34 11-28 6 3 10 2 10-4 0-15-16-22-34-15-9 3-13 11-9 18 4 6 8 14 9 19 3 15 4 17 9 17 3 0 4-3 4-7zm281-39c0-12-4-14-12-7-7 6-20 13-28 16-9 3-3 6 13 6 19 1 27-4 27-15zm-65-18c11 1 23 2 28 3 13 2 22-4 19-12-1-5 2-6 8-2 5 3 10 0 11-7 0-7 4-4 9 7 8 19 8 19 18-5 6-14 11-22 11-17 1 4 19-2 42-13 27-15 39-26 37-38-3-9-10-16-17-14-7 1-9-2-6-8 4-6 13-9 20-6 8 3 12-5 10-25-1-16 1-26 6-23s9-2 9-10 6-16 13-19c6-2 5-3-4-2s-22-6-30-16c-7-10-16-16-20-13-4 2-10 0-14-6-3-5-1-10 5-10s-3-12-22-27c-54-45-60-52-52-64 4-8 3-9-4-5s-12 2-12-5-8-2-19 9c-10 12-21 19-24 16s-16 0-29 7c-12 7-27 12-33 10-5-2-21-4-35-6-21-2-26 3-28 21-1 13 3 24 10 24 6 0 8 3 5 6-9 9 12 46 22 40 11-7 4 75-9 108-7 19-5 36 9 67 11 25 21 36 24 27 3-8 6-5 6 7 1 11 5 16 9 10 4-5 16-9 27-9zm-165-29c0-8-3-8-9 1-4 8-11 13-15 13-20-3-26 0-21 9 8 13 45-6 45-23zm-20-84c0-14 2-15 9-5 10 16 60 6 68-14 12-31-4-36-30-8-15 16-27 24-27 18 0-5 6-16 13-23 6-8 0-6-15 4-16 9-28 22-28 27s-4 6-10 3c-5-3-10-1-10 4 0 6 7 11 15 11s15-8 15-17zm10-93c0-5-8-10-17-10-15 0-16 2-3 10 19 12 20 12 20 0zm525-130c3-5 2-10-4-10-5 0-13 5-16 10-3 6-2 10 4 10 5 0 13-4 16-10zm-435-120c13-9 13-10 0-10-8 0-22 5-30 10-13 9-13 10 0 10 8 0 22-5 30-10zm425-170c3-5 1-10-4-10-6 0-11 5-11 10 0 6 2 10 4 10 3 0 8-4 11-10zm-1120-48c-8-2-12-9-9-15 4-7 3-9-1-4-5 4-9 16-10 26-1 16 1 17 17 7 16-9 16-12 3-14zm-35-12c0-5-7-10-16-10-8 0-12 5-9 10 3 6 10 10 16 10 5 0 9-4 9-10zm573-95c-3-9-8-14-10-11-3 3-2 9 2 15 9 16 15 13 8-4zm325-97c-12-33-30-38-24-5 3 12 5 25 5 28 1 3 7 6 15 6 11 0 12-6 4-29zm112 28c0-2-8-10-17-17-16-13-17-12-4 4s21 21 21 13zm86-420c1-14-5-27-14-31-12-4-12-2-4 8 7 8 9 17 6 20-5 5 3 27 9 27 1 0 3-11 3-24zm-36 4c0-5-5-10-11-10-5 0-7 5-4 10 3 6 8 10 11 10 2 0 4-4 4-10zm379-57c2-2-6-3-18-3s-19 4-16 10 1 10-4 10c-6 0-11 5-11 12 0 6 10 3 23-8 12-10 24-20 26-21zm-509-8c0-5-60 2-66 8-3 3-3 10 0 16 5 8 66-13 66-24zm-360 15c0-5-7-7-15-4-8 4-15 8-15 10s7 4 15 4 15-4 15-10zm90-20c0-5-5-10-11-10-5 0-7 5-4 10 3 6 8 10 11 10 2 0 4-4 4-10zm597-352c2-15-3-19-17-15-12 3-20-1-22-11-4-18-48-24-48-6 0 6 14 17 31 23 20 7 29 16 26 25-4 9 0 12 12 9 9-2 18-13 18-25z"
              transform="matrix(.1 0 0 -.1 0 444)"
            ></path>
            <path
              ref={path2}
              style={{opacity: 0}}
              d="M2730 2679c0-5 5-7 10-4 6 3 10 8 10 11 0 2-4 4-10 4-5 0-10-5-10-11zM1888 3598c2-10 6-18 7-18s5 8 7 18c3 11 0 19-7 19s-10-8-7-19zM3012 3451c-11-7-11-9 0-14 9-3 15 1 15 9s-1 14-1 14c-1 0-7-4-14-9zM3086 3411c-4-6 4-13 19-17 14-3 25-12 25-18 0-7 7-13 15-13s15 4 15 8c0 9-50 41-50 32 0-5-4-2-9 6-6 9-11 10-15 2zM2304 3388c10-6 22-6 26-2 5 5-3 10-18 11-22 1-24 0-8-9zM3045 3390c3-5 16-10 28-9 21 0 21 1 2 9-28 12-37 12-30 0zM2530 3330c0-5 5-10 11-10 5 0 7 5 4 10-3 6-8 10-11 10-2 0-4-4-4-10zM1710 3304c0-8 5-12 10-9 6 3 10 10 10 16 0 5-4 9-10 9-5 0-10-7-10-16zM3010 3275c0-9-7-15-16-13-22 4-29-18-9-26 9-3 13-2 10 4s-1 10 4 10c6 0 11-5 11-12 0-6 6-3 14 7 14 19 11 45-5 45-5 0-9-7-9-15zM1952 3230c-9-14-9-21 0-26 6-4 8-3 4 4-3 6 1 15 10 20s12 12 7 15-14-3-21-13zM2033 3239c-18-3-33-4-33-1s-11-8-25-24c-29-33-32-49-9-40 10 4 18 0 21-13 4-15 12-18 35-15 17 2 36 8 42 14 7 5 15 7 19 4 9-9 47 16 47 31 0 8-5 15-11 15-5 0-8 4-5 8 8 14-47 28-81 21zM3291 3234c0-11 3-14 6-6 3 7 2 16-1 19-3 4-6-2-5-13z"
              transform="matrix(.1 0 0 -.1 0 444)"
            ></path>
            <path
              ref={path3}
              style={{opacity: 0}}
              d="M1971 3162c-1-8-6-10-13-6-10 5-10 4-1-6 15-16 28-8 20 12-4 11-6 11-6 0zM1815 3104c-49-50-86-97-81-101 3-3 12 0 20 6 29 24 171 7 206-24 9-8 20-13 23-10 4 3 5 2 3-1-6-8 32-44 47-44 9 0 8-3-2-9-7-5-45-9-85-10-100-2-135-9-178-38-32-22-37-30-35-62 2-33 5-36 32-36 17-1 52-11 78-24 39-18 59-21 105-17l57 5-45-10c-25-6-49-15-55-21-15-16 93-2 113 14 12 10 14 10 8 1-5-9 0-13 14-13 12 0 19 4 15 9-7 12 34 41 58 41 11 0 17-5 14-12-2-7-10-12-16-10-6 1-11-3-11-9s-7-9-15-5c-13 4-13 2-5-14 15-27 22-29 54-16 31 13 43 41 20 50-8 3-14 19-14 38 0 21-9 43-25 60l-25 27 28 3c35 4 30 24-5 21-24-2-25-1-11 13s19 14 56-5c34-17 42-18 52-7 9 11 7 16-9 21-12 3-21 12-21 20s-9 17-20 20-20 11-20 16-9 9-19 9c-25 0-38 20-14 21 11 0 6 5-12 11-43 14-49 16-56 14-4 0-16 7-28 18-15 13-29 17-50 13-24-5-29-3-24 8 4 11 1 13-11 9-11-4-16-2-14 7 2 8-3 13-9 12-7-2-13 4-13 13 0 8-4 12-10 9-5-3-10-2-10 2 0 16-35 8-55-13zm22-241c-9-9-20-13-24-9s-1 11 7 16c25 16 35 11 17-7zm65-63c16-40 16-40-6-40-27 0-66 26-66 45 0 14 26 34 45 35 6 0 18-18 27-40zm203-10c3-5-2-10-12-11-10 0-30-2-45-4-25-3-26-2-16 26s11 28 38 14c16-8 32-19 35-25zM2340 2666c0-2 7-7 16-10 8-3 12-2 9 4-6 10-25 14-25 6zM3283 2643c-4-9 1-37 10-62 13-38 14-48 3-61-19-21-28-57-21-80 5-16 10-18 24-10 10 5 22 6 26 2 5-4 6-2 2 3-3 6-2 17 3 25 7 11 12 11 23 2 11-10 17-6 32 21 23 44 14 115-19 146-31 29-74 37-83 14z"
              transform="matrix(.1 0 0 -.1 0 444)"
            ></path>
            <path
              ref={path4}
              style={{opacity: 0}}
              d="M3260 2538c1-38 2-41 14-25 14 18 11 53-5 63-5 3-9-14-9-38zM2145 2520c-20-23-17-24 19-10 14 5 26 14 26 20 0 17-26 11-45-10zM2361 2454c0-11 3-14 6-6 3 7 2 16-1 19-3 4-6-2-5-13zM2150 2442c-14-11-22-30-23-52-2-33 0-35 33-38 28-3 33-1 23 9-21 21-15 29 21 29 38 0 66 8 66 19 0 4-9 17-20 29-25 27-70 29-100 4zM2307 1833c-10-9-9-23 1-23 5 0 9 7 9 15 0 17-1 18-10 8zM1970 1690c0-5 5-10 11-10 5 0 7 5 4 10-3 6-8 10-11 10-2 0-4-4-4-10zM2936 1245c4-8 10-15 15-15s9-8 9-17c0-12 3-14 11-6s6 17-7 32c-21 24-36 28-28 6zM2904 1226c11-9 24-16 30-16 12 0 7 5-24 19-24 11-24 11-6-3zM2684 1209c-3-6-15-9-25-6-11 3-17 2-15-2 3-4 1-13-3-20-7-11-13-9-29 7-11 11-23 18-26 14-3-3 6-13 21-23 26-17 27-17 58 7 17 13 35 21 38 17 4-3 7-1 7 5 0 15-17 16-26 1zM2906 1197c3-10 9-15 12-12s0 11-7 18c-10 9-11 8-5-6zM2636 1133c-6-14-5-15 5-6 7 7 10 15 7 18s-9-2-12-12zM2965 1139c-4-6-5-12-2-15 2-3 7 2 10 11 7 17 1 20-8 4zM2915 1131c-3-5-1-12 5-16 5-3 10 1 10 9 0 18-6 21-15 7zM2655 1101c-3-5-2-12 3-15s9 1 9 9c0 17-3 19-12 6zM2575 1090c3-5 8-10 11-10 2 0 4 5 4 10 0 6-5 10-11 10-5 0-7-4-4-10zM2600 1095c0-7 30-13 34-7 3 4-4 9-15 9-10 1-19 0-19-2zM2583 1054c-7-19 0-26 21-18 20 8 21 20 1 28-9 3-18-1-22-10zM2745 909c-5-7-4-10 3-5 6 3 13 2 17-4 3-5 0-10-7-10-9 0-9-3 2-11 12-8 12-10-5-8-33 2-41-1-25-11 13-8 13-10-2-10-10 0-15-6-13-12 3-7-14-33-38-57-23-25-41-47-40-50s-7-17-18-29c-19-22-19-23-2-19 10 3 74 18 143 33 120 25 152 39 170 75 10 17 3 18-62 5-20-5-50-9-67-10-29-2-30-1-13 17 16 18 16 20-1 32s-25 31-9 21c15-9 6 34-10 50-12 12-17 13-23 3zM2010 904c0-25 31-84 51-94 18-10 19-10 9 7-6 10-22 36-35 58-14 22-25 35-25 29zM2050 765c0-25 58-53 158-76 83-19 117-20 100-3-7 6-53 15-83 15-20 0-20 0-1 15 19 13 19 14-6 12-15-1-25-5-22-9 2-4-8-6-21-6-14 0-25 5-25 13s-12 16-27 20c-16 4-38 13-50 20-20 13-23 13-23-1zM2373 700c0-18 5-26 13-23 7 2 21 0 31-5s23-7 30-5c16 6-12 35-48 50-24 10-26 9-26-17zM2106 607c3-10 9-15 12-12s0 11-7 18c-10 9-11 8-5-6zM2380 185c0-3 11-10 25-15 22-8 23-12 13-40-5-17-8-34-4-37 8-8 26 43 26 73 0 20-5 24-30 24-16 0-30-2-30-5z"
              transform="matrix(.1 0 0 -.1 0 444)"
            ></path>
          </svg>
        </div>
        <form onSubmit={(e) => sendMessage(e)}>
          <div>
            <label htmlFor="email">Your E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email here"
              onChange={(e) => handleFieldValue(e)}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Your full name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name here"
              onChange={(e) => handleFieldValue(e)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Your message</label>
            <textarea
              name="body"
              id="body"
              placeholder="Your message here"
              onChange={(e) => handleFieldValue(e)}
              required
            ></textarea>
          </div>
          <div>
            <button ref={btnSend} type="submit" disabled={loading}>
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    margin: "auto",
                    WebkitAnimationPlayState: "running",
                    animationPlayState: "running",
                    WebkitAnimationDelay: "0s",
                    animationDelay: "0s",
                  }}
                  width="20"
                  height="20"
                  display="block"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 100 100"
                >
                  <path
                    fill="none"
                    stroke="#fff"
                    strokeDasharray="42.76482137044271 42.76482137044271"
                    strokeLinecap="round"
                    strokeWidth="6.4"
                    d="M19.44 24C9.12 24 4 34.64 4 40s5.12 16 15.44 16c15.44 0 25.68-32 41.12-32C70.88 24 76 34.64 76 40s-5.12 16-15.44 16c-15.44 0-25.68-32-41.12-32z"
                    style={{
                      WebkitTransformOrigin: 50,
                      MsTransformOrigin: 50,
                      transformOrigin: 50,
                      WebkitAnimationPlayState: "running",
                      animationPlayState: "running",
                      WebkitAnimationDelay: "0s",
                      animationDelay: "0s",
                    }}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      dur="1s"
                      keyTimes="0;1"
                      repeatCount="indefinite"
                      values="0;256.58892822265625"
                    ></animate>
                  </path>
                </svg>
              ) : (
                "Send message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;