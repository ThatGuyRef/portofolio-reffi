import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import useSectionVisibilityLifecycle from "../hooks/useSectionVisibilityLifecycle";

const projects = [
  {
    code: "PRJ-001",
    title: "SI-PANDU",
    type: "Web Application",
    status: "Completed",
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    desc: "A citizen administrative service platform designed to support digital letter requests, document submission, request tracking, and admin-side verification for Kelurahan Jati.",
    highlight: "Citizen & Admin Service System",
    cover: "/projects/Dashboard-warga.png",
    accent: "#35c9ff",
    roadmap: [
      {
        step: "01",
        group: "Citizen Dashboard",
        title: "Citizen Dashboard",
        desc: "The citizen dashboard provides quick access to public service features, including creating new requests, viewing submitted requests, and navigating the service workflow.",
        image: "/projects/Dashboard-warga.png",
      },
      {
        step: "02",
        group: "Citizen Dashboard",
        title: "Main Dashboard Overview",
        desc: "The main dashboard summarizes available services and gives citizens a clear starting point before submitting administrative letter requests.",
        image: "/projects/MainDashboard-warga.png",
      },
      {
        step: "03",
        group: "Citizen Dashboard",
        title: "Select Letter Service",
        desc: "Citizens choose the administrative service they want to request, such as birth certificate creation, certificate renewal, marriage certificate, or death certificate.",
        image: "/projects/Permohonan.png",
      },
      {
        step: "04",
        group: "Citizen Dashboard",
        title: "Fill Personal Details",
        desc: "Citizens fill in personal information such as national ID number, full name, address, and phone number. This data becomes the main identity record for the request.",
        image: "/projects/Permohonan2.png",
      },
      {
        step: "05",
        group: "Citizen Dashboard",
        title: "Upload Supporting Documents",
        desc: "Citizens upload the required documents based on the selected letter type. The system provides a structured upload area to simplify document submission.",
        image: "/projects/Permohonan3.png",
      },
      {
        step: "06",
        group: "Citizen Dashboard",
        title: "Request Submitted Successfully",
        desc: "After the request is submitted, the system displays a confirmation page with a reference number that can be used to track the request status.",
        image: "/projects/BuktiPermohonan.png",
      },
      {
        step: "07",
        group: "Citizen Dashboard",
        title: "Track My Requests",
        desc: "Citizens can view all submitted requests, including request ID, submission time, current status, and access to request details.",
        image: "/projects/Record.png",
      },
      {
        step: "08",
        group: "Citizen Dashboard",
        title: "Request Detail & Document Status",
        desc: "The request detail page displays applicant data, document status, supporting documents, and request history to help citizens monitor the service process transparently.",
        image: "/projects/Record2.png",
      },
      {
        step: "09",
        group: "Admin Dashboard",
        title: "Admin Login",
        desc: "The admin login page secures access to the SI-PANDU management system. Administrators must authenticate before entering the internal dashboard and managing citizen service requests.",
        image: "/projects/AdminLogin.png",
      },
      {
        step: "10",
        group: "Admin Dashboard",
        title: "Admin Dashboard Overview",
        desc: "The admin dashboard provides a summary of citizen data, processed requests, completed requests, and the latest letter submissions that require administrative attention.",
        image: "/projects/AdminDashboard.png",
      },
      {
        step: "11",
        group: "Admin Dashboard",
        title: "Request Management",
        desc: "Administrators can manage incoming letter requests through search, status filters, service type filters, and action controls for viewing, approving, rejecting, or printing request data.",
        image: "/projects/AdminRequest.png",
      },
      {
        step: "12",
        group: "Admin Dashboard",
        title: "Request Review & Admin Action",
        desc: "The request detail page allows administrators to review applicant information, verify attached documents, add internal notes, upload final documents, and approve, revise, or reject citizen requests.",
        image: "/projects/AdminRequestDetail.png",
      },
    ],
  },
  {
    code: "PRJ-002",
    title: "ETLE Plate Detection",
    type: "Computer Vision",
    status: "Research",
    stack: ["YOLOv8", "EasyOCR", "Python", "OpenCV"],
    desc: "A computer vision-based license plate detection system for electronic traffic law enforcement using object detection and OCR processing.",
    highlight: "AI Detection System",
    cover: "/ETLE/RTD.png",
    accent: "#ff4fd8",
    roadmap: [
      {
        step: "01",
        group: "System Design",
        title: "System Workflow",
        desc: "The ETLE system begins by capturing an image, processing it with OpenCV, detecting violations and license plates using YOLOv8, reading plate characters with EasyOCR, and producing a final decision based on whether a violation is detected.",
        image: "/ETLE/Flow.png",
      },
      {
        step: "02",
        group: "Model Development",
        title: "Training Result",
        desc: "The YOLOv8 model was trained to detect helmet, no_helmet, and plate number objects. The training result shows the model performance across object classes using precision, recall, and mAP metrics.",
        image: "/ETLE/Eval_Train.png",
      },
      {
        step: "03",
        group: "Model Development",
        title: "Evaluation Curves",
        desc: "The model was evaluated using F1-confidence, precision-confidence, precision-recall, and recall-confidence curves to measure detection consistency and model reliability.",
        image: "/ETLE/Eval_Model.png",
      },
      {
        step: "04",
        group: "Detection System",
        title: "Real-World Detection",
        desc: "The trained model was tested on real road scenes to detect riders, helmet usage, and vehicle license plates in practical traffic conditions.",
        image: "/ETLE/Eval_Helm.png",
      },
      {
        step: "05",
        group: "Violation Detection",
        title: "No-Helmet Violation Detection",
        desc: "The system identifies riders who are not wearing helmets and marks them as traffic violators while also detecting the associated license plate region.",
        image: "/ETLE/Eval_NoH.png",
      },
      {
        step: "06",
        group: "Violation Detection",
        title: "Helmet Compliance Detection",
        desc: "The model is also able to detect riders who are properly wearing helmets, helping the system distinguish between compliant and violating road users.",
        image: "/ETLE/HELMET.png",
      },
      {
        step: "07",
        group: "OCR Process",
        title: "No-Helmet Detection Output",
        desc: "The system displays a no-helmet detection result with a red bounding box, indicating that the rider is classified as a traffic violator.",
        image: "/ETLE/NO_HELMET.png",
      },
      {
        step: "08",
        group: "OCR Process",
        title: "License Plate OCR Result",
        desc: "After the license plate is detected, EasyOCR extracts the alphanumeric characters from the plate image and converts them into readable text.",
        image: "/ETLE/B_Plate.png",
      },
      {
        step: "09",
        group: "OCR Process",
        title: "Plate Recognition Result",
        desc: "The OCR result is used to identify the vehicle plate number and support the violation recording process.",
        image: "/ETLE/W_Plate.png",
      },
      {
        step: "10",
        group: "Final Output",
        title: "Final Monitoring Output",
        desc: "The final output combines license plate detection, helmet compliance detection, no-helmet violation detection, and OCR reading into a unified ETLE monitoring display.",
        image: "/ETLE/RTD.png",
      },
    ],
  },
  {
    code: "PRJ-003",
    title: "ForzaAutoHall",
    type: "Inventory Website",
    status: "Development",
    stack: ["CodeIgniter 4", "PHP", "MySQL", "Tailwind"],
    desc: "A vehicle showroom inventory system with CRUD features, image upload, detail page, and structured MVC implementation.",
    highlight: "Vehicle Inventory",
    cover: "/FAH/Details.png",
    accent: "#ffe45c",
    roadmap: [
      {
        step: "01",
        group: "Dashboard",
        title: "Dashboard Overview",
        desc: "The dashboard provides a summary of the vehicle inventory, including total vehicles, categories, and recent additions. It serves as the main control panel for managing the showroom's inventory.",
        image: "/FAH/DASHBOARD.png",
      },
      {
        step: "02",
        group: "inventory Management",
        title: "Inventory List & CRUD",
        desc: "The inventory management section allows users to view a list of all vehicles, edit, and delete vehicles. Each vehicle entry includes information such as make, model, year, price, and an image.",
        image: "/FAH/Inventory.png",
      },
      {
        step: "03",
        group: "Add Vehicle Unit",
        title: "Add Vehicle Form",
        desc: "The add vehicle form enables users to input new vehicle data, including make, model, year, price, and an image upload feature. This form is essential for expanding the showroom's inventory.",
        image: "/FAH/AddUnit.png",
      },
      {
        step: "04",
        group: "Detail Page Overview",
        title: "Vehicle Detail Page",
        desc: "The vehicle detail page displays comprehensive information about a specific vehicle, including its specifications, price, and a larger image. This page provides potential buyers with all the necessary details to make an informed decision.",
        image: "/FAH/Details.png",
      },
    ],
  },
];

function ProjectCover({ project }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative mb-5 overflow-hidden rounded-[24px] border-4 border-black bg-[#f7f4ea]">
      {!hasError ? (
        <img
          src={project.cover}
          alt={project.title}
          className="h-52 w-full object-cover transition-all duration-500 group-hover:scale-105 md:h-64"
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className="flex h-52 items-center justify-center px-4 text-center text-4xl font-black uppercase tracking-[-0.07em] md:h-64 md:text-5xl"
          style={{ backgroundColor: project.accent }}
        >
          {project.title}
        </div>
      )}
    </div>
  );
}

function ProjectRoadmapModal({
  selectedProject,
  activeStep,
  setActiveStep,
  closeModal,
}) {
  const currentRoadmap = selectedProject?.roadmap || [];
  const currentStep = currentRoadmap[activeStep];

  if (!selectedProject) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-3 py-3 backdrop-blur-md md:px-5 md:py-6">
      <div className="relative flex h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border-4 border-black bg-[#f7f4ea] shadow-[10px_10px_0_#0b0b0b] md:h-[88vh] md:rounded-[36px] md:shadow-[14px_14px_0_#0b0b0b]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b-4 border-black bg-white px-4 py-4 md:px-7 md:py-5">
          <div className="min-w-0">
            <p className="mb-1 text-[8px] font-black uppercase tracking-[0.22em] text-black/50 md:text-[10px] md:tracking-[0.35em]">
              Project Overview
            </p>

            <h3 className="truncate text-xl font-black uppercase italic tracking-[-0.05em] text-black md:text-4xl">
              {selectedProject.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="shrink-0 rounded-full border-4 border-black bg-[#ff4fd8] px-4 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-black shadow-[3px_3px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ffe45c] hover:shadow-[2px_2px_0_#0b0b0b] md:px-5 md:py-3 md:text-[10px]"
          >
            Close
          </button>
        </div>

        {currentRoadmap.length > 0 ? (
          <main className="min-h-0 flex-1 overflow-y-auto bg-[#f7f4ea]">
            <div className="mx-auto flex min-h-full max-w-5xl flex-col px-4 py-5 md:px-8 md:py-7">
              <section className="rounded-[28px] border-4 border-black bg-white p-4 shadow-[7px_7px_0_#0b0b0b] md:rounded-[34px] md:p-6 md:shadow-[10px_10px_0_#0b0b0b]">
                <div className="mb-4 flex items-start justify-between gap-4 md:mb-6">
                  <div className="min-w-0">
                    <div className="mb-3 inline-flex rounded-full border-4 border-black bg-[#ffe45c] px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-black shadow-[3px_3px_0_#0b0b0b] md:text-[10px]">
                      Step {currentStep.step}
                    </div>

                    <p className="mb-1 text-[8px] font-black uppercase tracking-[0.22em] text-black/50 md:text-[10px] md:tracking-[0.3em]">
                      {currentStep.group}
                    </p>

                    <h4 className="text-2xl font-black uppercase italic leading-none tracking-[-0.05em] text-black md:text-5xl">
                      {currentStep.title}
                    </h4>
                  </div>

                  <div className="shrink-0 rounded-full border-4 border-black bg-[#b7ff4a] px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-black shadow-[3px_3px_0_#0b0b0b] md:px-5 md:text-xs">
                    {activeStep + 1}/{currentRoadmap.length}
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border-4 border-black bg-[#f7f4ea] p-3 shadow-[5px_5px_0_#0b0b0b] md:rounded-[30px] md:p-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border-4 border-black bg-white md:aspect-[16/9]">
                    <img
                      src={currentStep.image}
                      alt={currentStep.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </section>

              <section className="mt-5 rounded-[24px] border-4 border-black bg-[#ffe45c] p-4 shadow-[6px_6px_0_#0b0b0b] md:mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-black md:text-[10px]">
                    Development Flow
                  </p>

                  <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-black/55 md:block">
                    Swipe / Select Step
                  </p>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {currentRoadmap.map((item, index) => (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`shrink-0 rounded-full border-4 border-black px-4 py-2 text-[9px] font-black uppercase tracking-[0.14em] shadow-[3px_3px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0b0b0b] md:px-5 md:text-[10px] ${
                        activeStep === index
                          ? "bg-[#35c9ff] text-black"
                          : "bg-white text-black hover:bg-[#b7ff4a]"
                      }`}
                    >
                      {item.step}
                    </button>
                  ))}
                </div>
              </section>

              <section className="mt-5 grid gap-5 md:mt-6 md:grid-cols-[1fr_260px]">
                <div className="rounded-[24px] border-4 border-black bg-white p-5 shadow-[6px_6px_0_#0b0b0b] md:p-6">
                  <p className="mb-3 text-[9px] font-black uppercase tracking-[0.24em] text-black/45 md:text-[10px]">
                    Overview
                  </p>

                  <p className="text-sm font-bold leading-7 text-black/75 md:text-base md:leading-8">
                    {currentStep.desc}
                  </p>
                </div>

                <div className="rounded-[24px] border-4 border-black bg-[#35c9ff] p-5 shadow-[6px_6px_0_#0b0b0b]">
                  <p className="mb-3 text-[9px] font-black uppercase tracking-[0.22em] text-black/60">
                    Current Module
                  </p>

                  <h5 className="text-xl font-black uppercase italic leading-none tracking-[-0.04em] text-black">
                    {currentStep.group || "Project Step"}
                  </h5>

                  <p className="mt-4 text-xs font-bold leading-6 text-black/70">
                    This preview highlights one part of the project flow, showing
                    how the interface supports the main user journey.
                  </p>
                </div>
              </section>

              <section className="mt-5 flex items-center justify-between gap-3 pb-3 md:mt-6">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((prev) =>
                      prev === 0 ? currentRoadmap.length - 1 : prev - 1
                    )
                  }
                  className="rounded-full border-4 border-black bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#35c9ff] hover:shadow-[2px_2px_0_#0b0b0b]"
                >
                  Prev
                </button>

                <div className="hidden flex-1 items-center gap-2 md:flex">
                  {currentRoadmap.map((item, index) => (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`h-3 flex-1 rounded-full border-2 border-black transition-all duration-300 ${
                        activeStep === index
                          ? "bg-[#ff4fd8]"
                          : "bg-white hover:bg-[#ffe45c]"
                      }`}
                      aria-label={`Go to step ${item.step}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((prev) =>
                      prev === currentRoadmap.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="rounded-full border-4 border-black bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#b7ff4a] hover:shadow-[2px_2px_0_#0b0b0b]"
                >
                  Next
                </button>
              </section>
            </div>
          </main>
        ) : (
          <div className="p-4 md:p-8">
            <div className="rounded-[24px] border-4 border-black bg-white p-6 shadow-[6px_6px_0_#0b0b0b]">
              <p className="text-sm font-bold leading-relaxed text-black/70">
                Roadmap preview for this project has not been added yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function Hangar() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const sectionRef = useRef(null);
  const sectionAnimationsRef = useRef([]);

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const glowRef = useRef(null);
  const gridRef = useRef(null);

  const resetHangarAnimation = useCallback(() => {
    gsap.set([eyebrowRef.current, titleRef.current, descRef.current], {
      autoAlpha: 0,
      y: 36,
    });

    gsap.set(cardsRef.current.filter(Boolean), {
      autoAlpha: 0,
      y: 70,
      rotate: (index) => (index % 2 === 0 ? -2.5 : 2.5),
      scale: 0.94,
      transformOrigin: "50% 100%",
    });

    gsap.set(glowRef.current, {
      autoAlpha: 0,
      scale: 0.8,
    });

    gsap.set(gridRef.current, {
      autoAlpha: 0,
    });
  }, []);

  const startHangarAnimation = useCallback((controller) => {
    const cards = cardsRef.current.filter(Boolean);
    const introTimeline = gsap.timeline();

    introTimeline
      .to(gridRef.current, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        glowRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.45"
      )
      .to(
        eyebrowRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.75"
      )
      .to(
        titleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "back.out(1.35)",
        },
        "-=0.35"
      )
      .to(
        descRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.45"
      )
      .to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "back.out(1.35)",
        },
        "-=0.25"
      );

    controller.add(introTimeline);

    controller.add(
      gsap.to(glowRef.current, {
        yPercent: -10,
        xPercent: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );

    controller.add(
      gsap.to(cards, {
        y: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
        ease: "sine.inOut",
      })
    );
  }, []);

  useSectionVisibilityLifecycle(sectionRef, sectionAnimationsRef, {
    onEnter: startHangarAnimation,
    onReset: resetHangarAnimation,
  });

  const closeModal = () => {
    setSelectedProject(null);
    setActiveStep(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hangar"
      className="neo-page relative flex min-h-screen items-center overflow-hidden px-5 pb-32 pt-28 text-black md:px-6 md:py-24 lg:px-12"
    >
      <div ref={gridRef} className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-7rem] top-24 hidden h-72 w-72 rounded-full border-4 border-black bg-[#b7ff4a] shadow-[8px_8px_0_#0b0b0b] md:block" />
        <div className="absolute bottom-20 right-[-7rem] hidden h-72 w-72 rounded-full border-4 border-black bg-[#35c9ff] shadow-[8px_8px_0_#0b0b0b] md:block" />
        <div className="absolute left-[48%] top-28 hidden h-24 w-24 rotate-12 rounded-[24px] border-4 border-black bg-[#ff4fd8] shadow-[6px_6px_0_#0b0b0b] md:block" />
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-[-12rem] top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[#ffe45c]/45 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-10 max-w-5xl md:mb-14">
          <p ref={eyebrowRef} className="neo-label mb-5 md:mb-6">
            Projects
          </p>

          <h2
            ref={titleRef}
            className="neo-title text-5xl sm:text-6xl md:text-8xl"
          >
            SELECTED
            <span className="neo-highlight-pink block italic">BUILDS,</span>
            <span className="neo-highlight-cyan block">SYSTEMS.</span>
          </h2>

          <p
            ref={descRef}
            className="mt-5 max-w-2xl text-sm font-bold leading-7 text-black/70 md:mt-7 md:text-lg md:leading-8"
          >
            A collection of web applications, AI-based research, and interface
            experiments built through frontend engineering, backend integration,
            and motion-focused UI development.
          </p>
        </div>

        <div className="grid gap-8 pb-20 md:grid-cols-2 md:pb-0">
          {projects.map((project, index) => (
            <article
              key={project.code}
              ref={(element) => (cardsRef.current[index] = element)}
              className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border-4 border-black bg-white p-4 shadow-[8px_8px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[5px_5px_0_#0b0b0b] md:rounded-[32px] md:shadow-[10px_10px_0_#0b0b0b]"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <div
                className="absolute -right-3 -top-3 z-20 rotate-6 rounded-2xl border-4 border-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] shadow-[4px_4px_0_#0b0b0b] md:-right-4 md:-top-4 md:px-5 md:py-3 md:text-xs md:tracking-[0.16em]"
                style={{ backgroundColor: project.accent }}
              >
                {project.code}
              </div>

              <ProjectCover project={project} />

              <div className="flex flex-1 flex-col p-1 md:p-2">
                <div className="mb-5 flex flex-wrap gap-2">
                  <span
                    className="rounded-full border-4 border-black px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] shadow-[3px_3px_0_#0b0b0b] md:px-4 md:text-[10px] md:tracking-[0.18em]"
                    style={{ backgroundColor: project.accent }}
                  >
                    {project.type}
                  </span>

                  <span className="rounded-full border-4 border-black bg-[#f7f4ea] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] shadow-[3px_3px_0_#0b0b0b] md:px-4 md:text-[10px] md:tracking-[0.18em]">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-3xl font-black uppercase italic leading-none tracking-[-0.06em] text-black transition-colors duration-300 group-hover:text-[#ff4fd8] md:text-5xl">
                  {project.title}
                </h3>

                <p className="mt-4 text-sm font-bold leading-7 text-black/70 md:min-h-[112px]">
                  {project.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto border-t-4 border-black pt-5">
                  <p className="mb-4 text-[10px] font-black uppercase leading-5 tracking-[0.18em] text-black/45 md:tracking-[0.22em]">
                    {project.highlight}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveStep(0);
                    }}
                    className="inline-flex w-full items-center justify-center rounded-full border-4 border-black bg-black px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[4px_4px_0_#35c9ff] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#35c9ff] sm:w-auto"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectRoadmapModal
          selectedProject={selectedProject}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          closeModal={closeModal}
        />
      )}
    </section>
  );
}