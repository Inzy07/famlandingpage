import React, { useState, useEffect } from 'react';
import EnquireForm from './EnquireForm';
import { useRouter } from 'next/router';
import { Button, Modal, ModalBody} from "reactstrap";

export default function ModalComp() {
  const [transLabels, settransLabels] = useState([]);
  const [modalDefaultOpen, setModalDefaultOpen] = React.useState(false);
  const router = useRouter();
  const cat = router.query.cat;
  const lang = router.query.lang;
  useEffect(() => {
      fetch('https://fam-erp.com/property/website/FamLandingPageTranslation/'+cat+'/'+lang) 
        .then((res) => res.json())
        .then((data) => settransLabels(data.items[0]));
  }, []);
  return (
    <>
      <Button
        className="t-Button"
        type="button"
        onClick={() => setModalDefaultOpen(!modalDefaultOpen)}
      >
        {transLabels.learn_more}
      </Button>
      <Modal toggle={() => setModalDefaultOpen(!modalDefaultOpen)} isOpen={modalDefaultOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
          {transLabels.enquire_title}
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalDefaultOpen(!modalDefaultOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody><EnquireForm/></ModalBody>
      </Modal>
    </>
  );
}
