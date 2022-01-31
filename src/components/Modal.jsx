import React, { useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, selectedItem }) => {
  const [email, setNewEmail] = useState('');
  const alertAndClose = () => {
    setIsOpen(false)
    componentDidMount()
  }

  const componentDidMount = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: [{ fields: { "Event": [selectedItem[2]], "Email": email } }] })
    };
    fetch('https://api.airtable.com/v0/appD9YFLSX3Kflhy6/Clients?api_key=keyhPyeleDSLqACg1', requestOptions)
        .then(response => response.json())
        .then(data => alert(email));
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{selectedItem[0]}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            {selectedItem[1]}
          </div>
          <input type="text" placeholder="Type your email here..." style={{ width: "60%", marginRight: "1px", marginTop: "10px", borderRadius: "8px" }} value={email} onChange={(e) => setNewEmail(e.target.value)}/>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => alertAndClose()}>
                Book
              </button>
              {/* <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;