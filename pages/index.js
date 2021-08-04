import { useGetprojects } from "../useRequest";
import Projects from "../components/Projects";
import Image from 'next/image';

export default function IndexPage() {
  const {
    projects,
    error
  } = useGetprojects("/apartments");

  if (error) return <h1>Something went wrong!</h1>;
  if (!projects) return <h1>Loading...</h1>;

  return (
    <div class="container">
      <div class="row padding-top-lg">
        <div class="col col-5 banner-text">
        <a href="javascript:openModal('enquireModal')">
        <Image src="/fam-logo-grey.png" width="190px" height="60px" alt="fäm Properties"/>
        </a>
        <h1 class="margin-top-lg">Dubai, the home you need</h1>
        <p class="margin-top-lg">Own your home starting from $350K</p>
        <a href="javascript:openModal('enquireModal')" class="t-Button t-Button--icon t-Button--large  t-Button--iconLeft margin-top-lg"><span aria-hidden="true" class="t-Icon t-Icon--left fa fa-envelope"></span>Book a Free Consultation</a>
        </div>
        <div class="col col-7 padding-top-md">
        <Image src="/banner.png" width="1380px" height="1228px" alt="fäm Properties Banner"/>
        </div>
      </div>
      <div class="row wrapper-bg">
        <div class="wrapper-cont">
        <div class="fa">
        <Image src="/fam-logo-grey.png" width="190px" height="60px" alt="fäm Properties"/>
        </div>
        <p>Dubai residency</p>
        </div>
        <div class="wrapper-cont">
        <div class="fa">
        <Image src="/fam-logo-grey.png" width="190px" height="60px" alt="fäm Properties"/>
        </div>
        <p>Tax free</p>
        </div>
        <div class="wrapper-cont">
        <div class="fa">
        <Image src="/fam-logo-grey.png" width="190px" height="60px" alt="fäm Properties"/>
        </div>
        <p>Service fee waiver</p>
        </div>
        <div class="wrapper-cont">
        <div class="fa">
        <Image src="/fam-logo-grey.png" width="190px" height="60px" alt="fäm Properties"/>
        </div>
        <p>Zero commission</p>
        </div>
        <div class="wrapper-cont">
        <div class="fa">
        <Image src="/fam-logo-grey.png" width="190px" height="60px" alt="fäm Properties"/>
        </div>
        <p>Zero financing cost</p>
        </div>
      </div>
      <div class="row padding-top-lg">
        <h1 class="text-center">Featured projects in Dubai</h1>
        <ul class="cards-bg">
        {projects.items.map((proj) => (
            <Projects proj={proj} key={proj.id} />
        ))}
        </ul>
      </div>
    </div>
  );
}
