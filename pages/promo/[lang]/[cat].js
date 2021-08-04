import { useGetprojects, useGetTranslations } from "../../../useRequest";
import Projects from "../../../components/Projects";
import Image from 'next/image';
import { useRouter } from 'next/router';


export default function IndexPage({trans}) {
  const router = useRouter();
  const pid = router.query;
  const {projects,error,} = useGetprojects("/"+pid.cat);
  if (error) return <h1>Something went wrong!</h1>;
  if (!projects) return <h1>Loading...</h1>;
  const registerUser = event => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
  }
  return (
    <div>
    {/*Banner Section Starts*/}
    <div className="container">  
    <div className="row padding-top-lg margin-bottom-lg">
      <div className="col col-5 banner-text">
      <a href="#">
      <Image src="/fam-logo-grey.png" width="190px" height="60px" alt="fäm Properties"/>
      </a>
      <h1 className="margin-top-lg">{trans.handover}</h1>
      <p className="margin-top-lg">{trans.post_handvoer}</p>
      <a href="#" className="t-Button t-Button--icon t-Button--large  t-Button--iconLeft margin-top-lg"><span aria-hidden="true" className="t-Icon t-Icon--left fa fa-envelope"></span>{trans.enquire_title}</a>
      </div>
      <div className="col col-7 padding-top-md">
      <Image src="/banner.png" width="1380px" height="1228px" alt="fäm Properties Banner"/>
      </div>
    </div>
    </div>
    {/*Banner Section Ends*/}
    {/*Wrapper Section Starts*/}
    <div className="wrapper-line margin-top-lg padding-top-lg padding-bottom-md">
      <div className="container">
        <div className="row wrapper-bg">
          <div className="wrapper-cont">
          <div className="fa">
          <Image src="/1.png" width="40px" height="40px" alt="fäm Properties"/>
          </div>
          <p>{trans.pay_cash}</p>
          </div>
          <div className="wrapper-cont">
          <div className="fa">
          <Image src="/5.png" width="40px" height="40px" alt="fäm Properties"/>
          </div>
          <p>{trans.bitcoin}</p>
          </div>
          <div className="wrapper-cont">
          <div className="fa">
          <Image src="/2.png" width="40px" height="40px" alt="fäm Properties"/>
          </div>
          <p>{trans.credit_card}</p>
          </div>
          <div className="wrapper-cont">
          <div className="fa">
          <Image src="/3.png" width="40px" height="40px" alt="fäm Properties"/>
          </div>
          <p>{trans.bank_transfer}</p>
          </div>
          <div className="wrapper-cont">
          <div className="fa">
          <Image src="/4.png" width="40px" height="40px" alt="fäm Properties"/>
          </div>
          <p>{trans.cheques}</p>
          </div>
        </div>
      </div>
    </div>
    {/*Wrapper Section Ends*/}
    {/*Projects Cards Starts*/}
    <div className="container">
      <div className="row padding-top-lg">
        <h2 className="text-center">{trans.title}</h2 >
        <ul className="cards-bg">
        {projects.items.map((proj) => (
            <Projects proj={proj} title="test" key={proj.id}  />
        ))}
        </ul>
      </div>
    </div>
    {/*Projects Cards Ends*/}
    {/*Footer Banner Starts*/}
    <div className="banner-bg margin-top-lg">
    <div className="overlay wrapper-bg">
      <div className="container text-center">
      <h2>{trans.wrapper_left_title}</h2>
      <p>{trans.footer_text}</p>
      <a href="#" className="t-Button t-Button--icon t-Button--large  t-Button--iconLeft margin-top-md"><span aria-hidden="true" className="t-Icon t-Icon--left fa fa-envelope"></span>{trans.enquire_title}</a>
      </div>
    </div>
    </div>
    <div className="w-100 u-left text-center">
      <div className="hidden-xs-down">
      <img src={trans.why_dubai_image} width="100%"/>
      </div>
      <div className="hidden-sm-up">
      <img src={trans.why_dubai_image_mobile} width="100%"/>
      </div>
    </div>
    {/*Footer Banners Ends*/}
    {/*Video Starts*/}
    <div className="container video-bg">
      <div className="text-center w-100 u-left">  
      <h2>{trans.wrapper_right_title}</h2>
      <iframe width="55%" height="400" src="https://www.youtube.com/embed/UFu1o34xl-o?rel=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
      </div>
    </div>
    {/*Video Ends*/}
    {/* Form Starts */}
    <div className="container padding-top-lg  padding-bottom-lg">
    <div className="w-100 u-left">
    <form onSubmit={registerUser}>
      <div>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" autoComplete="name" required />
      </div>
      <div>
      <label htmlFor="email">Email</label>
      <input id="email" type="text" autoComplete="email" required />
      </div>
      <div>
      <label htmlFor="mobile">Mobile</label>
      <input id="mobile" type="text" autoComplete="mobile" required />
      </div>
      <div>
      <label htmlFor="message">Message</label>
      <textarea id="message" type="text" autoComplete="message"></textarea>
      </div>
      <div>
      <button type="submit" className="t-Button t-Button--icon t-Button--large  t-Button--iconLeft margin-top-md"><span aria-hidden="true" className="t-Icon t-Icon--left fa fa-envelope"></span>{trans.enquire_title}</button>
      </div>
    </form>
    </div>
    </div>
    {/* Form Ends */}
    {/*Footer Starts*/}
    <div className="footer-bg margin-top-lg w-100 u-left">
    <iframe width="100%" height="500" frameBorder="0" src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d14441.51425854612!2d55.264190490750444!3d25.190452937957833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!1i0!3e6!4m0!4m5!1s0x3e5f69d439783743%3A0x64b7bc4ca8ecb767!2sFAM+Properties+-+Dubai+Real+Estate+Brokers+-+Sheikh+Zayed+Road+-+Business+Bay+-+Downtown+Dubai%2C+Executive+Towers+-+Tower+D+-+Aspect+Tower+%232404+-+Dubai+-+United+Arab+Emirates!3m2!1d25.191952!2d55.266079!5e0!3m2!1sen!2sae!4v1398320050802"></iframe>
      <div className="w-100 u-left t-Footer">
      <div className="container">  
      <div className="ft-copy-txt text-center">
      <p>© 2021,<a href="https://famproperties.com"></a> Real Estate Brokers </p>
      </div>
      </div>
    </div>
    </div>
    {/*Footer Ends*/}
  </div>
  );
}
IndexPage.getInitialProps = async ({query}) => {
  const category = query.cat;
  const lang = query.lang;
  const res = await fetch('https://fam-erp.com/property/website/FamLandingPageTranslation/'+category+'/'+lang)
  const proj = await res.json()
  return { trans: proj.items[0]}
}