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
    roadmap: [],
  },
  {
    code: "PRJ-004",
    title: "HUD Portfolio",
    type: "Personal Website",
    status: "Active",
    stack: ["React", "Tailwind", "GSAP", "Vite"],
    desc: "A futuristic portfolio website built with interactive motion, HUD-inspired interface, smooth transitions, and responsive layout.",
    highlight: "Interactive Interface",
    roadmap: [],
  },
];

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-5 py-6 backdrop-blur-md">
      <div className="relative flex h-[86vh] w-full max-w-7xl flex-col overflow-hidden border border-[#00f5ff]/30 bg-[#0b1114] shadow-[0_0_70px_rgba(0,245,255,0.16)]">
        <div className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-[#00f5ff]" />
        <div className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-[#00f5ff]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-[#00f5ff]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[#00f5ff]" />

        <div className="flex shrink-0 items-center justify-between gap-6 border-b border-[#00f5ff]/15 bg-[#101417]/95 px-6 py-4">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.4em] text-[#00f5ff]">
              Project Roadmap
            </p>

            <h3 className="truncate font-headline text-2xl font-black uppercase italic tracking-[-0.04em] text-white md:text-4xl">
              {selectedProject.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="shrink-0 border border-[#00f5ff]/25 bg-[#00f5ff]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#00f5ff] transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#101417]"
          >
            Close
          </button>
        </div>

        {currentRoadmap.length > 0 ? (
          <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[390px_1fr]">
            <aside className="min-h-0 overflow-y-auto border-r border-[#00f5ff]/15 bg-[#0d1316] p-5">
              <div className="sticky top-0 z-10 mb-4 border-b border-[#00f5ff]/10 bg-[#0d1316]/95 pb-4 backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#b9caca]/60">
                  Development Sequence
                </p>
              </div>

              <div className="space-y-3">
                {currentRoadmap.map((item, index) => (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={`group relative w-full border p-4 text-left transition-all duration-300 ${
                      activeStep === index
                        ? "border-[#00f5ff]/70 bg-[#00f5ff]/10 shadow-[0_0_24px_rgba(0,245,255,0.08)]"
                        : "border-[#00f5ff]/15 bg-white/[0.02] hover:border-[#00f5ff]/45 hover:bg-[#00f5ff]/5"
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#00f5ff]">
                          Step {item.step}
                        </span>

                        {item.group && (
                          <span
                            className={`mt-1 block text-[9px] font-black uppercase tracking-[0.22em] ${
                              item.group === "Admin Dashboard"
                                ? "text-[#ffb693]/65"
                                : "text-[#b9caca]/45"
                            }`}
                          >
                            {item.group}
                          </span>
                        )}
                      </div>

                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                          activeStep === index
                            ? "bg-[#00f5ff] shadow-[0_0_12px_rgba(0,245,255,0.9)]"
                            : "bg-[#00f5ff]/25"
                        }`}
                      />
                    </div>

                    <h4 className="mb-2 text-sm font-black uppercase tracking-[0.13em] text-white">
                      {item.title}
                    </h4>

                    <p className="line-clamp-3 text-xs leading-relaxed text-[#b9caca]/70">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </aside>

            <main className="min-h-0 overflow-hidden p-5">
              <div className="flex h-full flex-col">
                <div className="mb-4 flex shrink-0 items-center justify-between gap-4 border-b border-[#00f5ff]/10 pb-4">
                  <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.35em] text-[#00f5ff]/80">
                      Active Preview
                    </p>

                    <h4 className="truncate text-xl font-black uppercase italic tracking-[-0.03em] text-white md:text-2xl">
                      {currentStep.title}
                    </h4>

                    {currentStep.group && (
                      <p
                        className={`mt-1 text-[10px] font-black uppercase tracking-[0.25em] ${
                          currentStep.group === "Admin Dashboard"
                            ? "text-[#ffb693]/70"
                            : "text-[#b9caca]/50"
                        }`}
                      >
                        {currentStep.group}
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 text-[10px] font-black uppercase tracking-[0.3em] text-[#b9caca]/50">
                    {activeStep + 1}/{currentRoadmap.length}
                  </p>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden border border-[#00f5ff]/20 bg-black/35">
                  <div className="relative flex h-full min-h-[360px] items-center justify-center overflow-hidden">
                    <img
                      src={currentStep.image}
                      alt={currentStep.title}
                      className="h-full w-full object-contain"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent,rgba(0,245,255,0.04),transparent)]" />
                  </div>
                </div>

                <div className="mt-4 shrink-0 border border-[#00f5ff]/10 bg-[#00f5ff]/[0.03] p-4">
                  <p className="text-sm leading-relaxed text-[#b9caca]/75">
                    {currentStep.desc}
                  </p>
                </div>

                <div className="mt-4 flex shrink-0 items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStep((prev) =>
                        prev === 0 ? currentRoadmap.length - 1 : prev - 1
                      )
                    }
                    className="border border-[#00f5ff]/25 bg-[#00f5ff]/5 px-5 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#00f5ff] transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#101417]"
                  >
                    Prev
                  </button>

                  <div className="hidden flex-1 items-center gap-2 md:flex">
                    {currentRoadmap.map((item, index) => (
                      <button
                        key={item.step}
                        type="button"
                        onClick={() => setActiveStep(index)}
                        className={`h-1.5 flex-1 transition-all duration-300 ${
                          activeStep === index
                            ? item.group === "Admin Dashboard"
                              ? "bg-[#ffb693] shadow-[0_0_10px_rgba(255,182,147,0.75)]"
                              : "bg-[#00f5ff] shadow-[0_0_10px_rgba(0,245,255,0.8)]"
                            : "bg-[#00f5ff]/15 hover:bg-[#00f5ff]/35"
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
                    className="border border-[#00f5ff]/25 bg-[#00f5ff]/5 px-5 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#00f5ff] transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#101417]"
                  >
                    Next
                  </button>
                </div>
              </div>
            </main>
          </div>
        ) : (
          <div className="p-8">
            <p className="text-sm leading-relaxed text-[#b9caca]/75">
              Roadmap preview for this project has not been added yet.
            </p>
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
      rotateX: 12,
      scale: 0.94,
      transformPerspective: 900,
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
          ease: "power3.out",
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
          rotateX: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
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
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 lg:px-12"
    >
      <div ref={gridRef} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,245,255,0.12),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(255,182,147,0.1),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-[-12rem] top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[#00f5ff]/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p
            ref={eyebrowRef}
            className="mb-5 text-xs font-black uppercase tracking-[0.45em] text-[#00f5ff]"
          >
            PROJECT HANGAR
          </p>

          <h2
            ref={titleRef}
            className="font-headline text-4xl font-black uppercase italic tracking-[-0.07em] text-white md:text-7xl"
          >
            Selected builds, systems, and experiments.
          </h2>

          <p
            ref={descRef}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-[#b9caca]/75 md:text-base"
          >
            A collection of web applications, AI-based research, and interface
            experiments built through frontend engineering, backend integration,
            and motion-focused UI development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.code}
              ref={(element) => (cardsRef.current[index] = element)}
              className="group relative overflow-hidden border border-[#00f5ff]/20 bg-[#101417]/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#00f5ff]/70 hover:bg-[#00f5ff]/[0.06]"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#00f5ff]" />
              <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-[#00f5ff]" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#00f5ff]" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#00f5ff]" />

              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f5ff]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-7 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#00f5ff]/80">
                    {project.code}
                  </p>

                  <h3 className="font-headline text-2xl font-black uppercase italic tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[#00f5ff] md:text-3xl">
                    {project.title}
                  </h3>
                </div>

                <div className="shrink-0 border border-[#00f5ff]/25 bg-[#00f5ff]/5 px-3 py-2 text-right">
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#b9caca]/60">
                    Status
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#00f5ff]">
                    {project.status}
                  </p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                <span className="border border-[#ffb693]/25 bg-[#ffb693]/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb693]">
                  {project.type}
                </span>

                <span className="border border-[#00f5ff]/25 bg-[#00f5ff]/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#00f5ff]">
                  {project.highlight}
                </span>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-[#b9caca]/78">
                {project.desc}
              </p>

              <div className="mb-7 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#b9caca]/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-[#00f5ff]/10 pt-5">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#b9caca]/50">
                  Local Archive
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveStep(0);
                  }}
                  className="border border-[#00f5ff]/25 bg-[#00f5ff]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#00f5ff] transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#101417]"
                >
                  Inspect Unit
                </button>
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