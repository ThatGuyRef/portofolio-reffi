import { FaInstagram, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import SectionHeader from "./SectionHeader";

const MAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=navarrorevi@gmail.com&su=Portfolio%20Inquiry&body=Hello%20Navarro,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.";

const channels = [
  {
    label: "EMAIL",
    value: "navarrorevi@gmail.com",
    href: MAIL_URL,
    icon: MdMail,
    tone: "yellow",
  },
  {
    label: "GITHUB",
    value: "ThatGuyRef",
    href: "https://github.com/ThatGuyRef",
    icon: FaGithub,
    tone: "cyan",
  },
  {
    label: "LINKEDIN",
    value: "NAVARRO REFFI",
    href: "https://www.linkedin.com/in/navarro-reffi-54271a374?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: FaLinkedin,
    tone: "cyan",
  },
  {
    label: "INSTAGRAM",
    value: "@reffiref_",
    href: "https://www.instagram.com/reffiref_",
    icon: FaInstagram,
    tone: "magenta",
  },
  {
    label: "WHATSAPP",
    value: "AVAILABLE ON REQUEST",
    href: "https://wa.me/6285156246190?text=Hello%20Navarro,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
    icon: FaWhatsapp,
    tone: "green",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section section--yellow section--void">
      <div className="shell shell--prose">
        <SectionHeader
          title="CONTACT / RESUME"
          intro="Open for collaboration, frontend work, interface design, and project discussions. Pick a channel — all of them reach me."
        />

        <div className="card card--raised mb-6" data-reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="pix-meta" style={{ marginBottom: 10 }}>
                CURRENT STATUS
              </p>

              <p className="pix" style={{ fontSize: 13, color: "var(--green)" }}>
                ● AVAILABLE NOW
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-4 sm:w-auto sm:gap-5">
              <a
                href={MAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn-block-sm"
              >
                SEND MESSAGE
              </a>

            <button
              type="button"
              className="btn btn--primary btn-block-sm"
              onClick={() => {
            const a = document.createElement("a");
            a.href = "/CV_ATS_Navarro%20Reffi%20Kamal.pdf";
            a.download = "Navarro-Reffi-Kamal-CV.pdf";
            a.click();
          }}
          >
            RESUME
          </button> 
            </div>
          </div>

          <p className="body-copy" style={{ marginTop: 22 }}>
            Best fit for web interface builds, React frontends, UI motion systems,
            and database-backed products that need a front end someone can actually
            use.
          </p>
        </div>

        <div className="grid-auto--tight grid-auto">
          {channels.map((channel) => {
            const Icon = channel.icon;

            return (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex items-center gap-4"
                data-reveal
                style={{
                  "--accent": `var(--${channel.tone})`,
                  textDecoration: "none",
                  padding: 16,
                }}
              >
                <span
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    fontSize: 19,
                    color: `var(--${channel.tone})`,
                    border: "2px solid var(--border-muted)",
                    background: "var(--void)",
                  }}
                >
                  <Icon />
                </span>

                <span className="min-w-0">
                  <span className="pix-meta block" style={{ marginBottom: 6 }}>
                    {channel.label}
                  </span>

                  <span
                    className="block truncate"
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: 20,
                      color: "var(--ink)",
                    }}
                  >
                    {channel.value}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
