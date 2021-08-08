import React, { useState, useEffect , useCallback} from 'react';
import ImageViewer from "react-simple-image-viewer";
import { useRouter } from 'next/router';
import EnquireForm from "../components/EnquireForm";
import { Button, Modal, ModalBody} from "reactstrap";
export default function Projects({proj}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalDefaultOpen, setModalDefaultOpen] = React.useState(false);
  const [modalVideoOpen, setModalVideoOpen] = React.useState(false);
  const { project_name,area,price,downpayment,images,video_url } = proj;
  const [transLabels, settransLabels] = useState([]);
  const router = useRouter();
  const cat = router.query.cat;
  const lang = router.query.lang;
  const imagesSrc = images.map((src, index) => (
    src.image
  ));
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  useEffect(() => {
      fetch('https://fam-erp.com/property/website/FamLandingPageTranslation/'+cat+'/'+lang) 
        .then((res) => res.json())
        .then((data) => settransLabels(data.items[0]));
  }, []);
  return (
    <li className="t-Card-items">
    <div className="t-Card">
          <div className="t-Card-wrap">
          <div className="cards-image">
          {images.map((src, index) => (
        <img
          src={src.image}
          onClick={() => openImageViewer(index)}
          width="100%"
          height="250px"
          key={index}
          alt=""
        />
      ))}
       {isViewerOpen && (
        <ImageViewer
        src={imagesSrc}
        currentIndex={currentImage}
        onClose={closeImageViewer}
        disableScroll={false}
        backgroundStyle={{
          backgroundColor: "rgba(0,0,0,0.9)",
          width:'100%',
        }}
      />)}
          </div>
          <div className="card-body">
            <h2 className="margin-none">{project_name}</h2>
            <p className="margin-none">At {area}</p>
            <ul className="card-info">
              <li>{ transLabels.currency_symbol} {abbreviateNumber(price)}<span>{transLabels.starting_price}</span></li>
              <li>{downpayment}<span>{ transLabels.downpayment}</span></li>
            </ul>
            <ul className="card-buttons">
              <li><a href="javascript:void(0)"  onClick={() => openImageViewer(0)}>{ transLabels.view_photos}</a></li>
              <li><a href="javascript:void(0)" type="button" onClick={() => setModalVideoOpen(!modalVideoOpen)}>{ transLabels.video_title}</a></li>
              <li><a href="javascript:void(0)" type="button" className="t-Button" onClick={() => setModalDefaultOpen(!modalDefaultOpen)}>{ transLabels.learn_more}</a></li>
            </ul>
            </div>
          </div>
     </div>
     {/*Form Modal Starts*/}
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
      {/*Form Modal Ends*/}
      {/*Video Modal Starts*/}
     <Modal toggle={() => setModalVideoOpen(!modalVideoOpen)} isOpen={modalVideoOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
          {project_name} {transLabels.video_title}
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalVideoOpen(!modalVideoOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody><iframe width="420px" height="450px" src={`https://www.youtube.com/embed/`+video_url}></iframe></ModalBody>
        </Modal>
      {/*Video Modal Ends*/}
     </li>
  );
}
let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
function abbreviateNumber(number){
    // what tier? (determines SI symbol)
    let tier = Math.log10(Math.abs(number)) / 3 | 0;
    // if zero, we don't need a suffix
    if(tier == 0) return number;
    // get suffix and determine scale
    let suffix = SI_SYMBOL[tier];
    let scale = Math.pow(10, tier * 3);
    // scale the number
    let scaled = number / scale;
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}
