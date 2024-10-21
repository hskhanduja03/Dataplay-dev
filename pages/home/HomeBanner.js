"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { DISCORD_LINK } from "../../utilities/constants";

const HomeBanner = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(DISCORD_LINK); 
  };

  return (
    <section className="home-banner">
      <div className="container home-container my-4">
        <div className="d-lg-flex align-items-center">
          <div className="col-lg-7 col-12">
            <div className="banner-content">
              <h5 data-aos="fade-right">
                Never Stop
                <span className="text-white font-bold pe-3 position-relative">
                  <span className="learning pe-sm-3 pe-2">Learning</span>
                  <Image
                    src="/learning-vector.svg"
                    width={176}
                    height={50}
                    alt="Learning Vector"
                    className="img1 img-fluid"
                    loading="lazy" // Lazy loading non-critical images
                  />
                  <Image
                    src="/learning-vector2.svg"
                    width={53}
                    height={53}
                    alt="Learning Vector 2"
                    className="img2 img-fluid"
                    loading="lazy"
                  />
                </span>
              </h5>
              <h3 className="me-sm-0 pe-sm-0 pe-3" data-aos="fade-right">
                Empowering Data Science Career At
                <span className="ms-sm-3 ms-2 position-relative font-weight-bold">
                  All levels
                  <Image
                    src="/level-vector.svg"
                    width={220}
                    height={50}
                    alt="Level Vector"
                    className="img-fluid img-3 d-lg-flex d-none position-absolute"
                    loading="lazy"
                  />
                </span>
              </h3>
              <p
                className="banner-des me-sm-0 me-5 mb-4 pe-sm-0 pe-5"
                data-aos="fade-right"
              >
                Let&apos;s sculpt YOUR path to success, YOUR way !
              </p>
              <div
                className="d-flex align-items-center mb-5"
                data-aos="fade-up"
              >
                <div className="bg-outer rounded-pill bg-purple me-4 mb-sm-0 mb-3 w-fit">
                  <div className="bg-inner rounded-pill py-2 bg-lightpurple">
                    <Link
                      className="m-0 px-4 text-white fw-medium py-2 h6 cursor-pointer"
                      href="/course"
                    >
                      <small>Get Started</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-5 col-12 px-lg-0 px-sm-5 px-4 pt-lg-0 pt-sm-5 pt-4"
            data-aos="fade-left"
          >
            <div className="banner-img-section d-flex justify-content-end ps-sm-4">
              <Image
                src="/hero-img.png"
                alt="banner-img"
                height={520}
                width={580}
                className="img-fluid"
                priority // Ensure this is a critical image
              />
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/hero-vector1.svg"
        height={345}
        width={120}
        alt="Hero Vector"
        className="d-sm-flex d-none position-absolute"
        style={{ top: "45%" }}
        loading="lazy"
      />
    </section>
  );
};

export default HomeBanner;
