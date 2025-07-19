import { useWebsiteInfo } from "@/hooks/useWebsiteInfo";
import { useContactInfo, useSocialLinks } from "@/hooks/useContactInfo";
import { usePersonalInfo } from "@/hooks";

import { useNavigate, useLocation } from "react-router-dom";
import Icon from "./Icon";

const Footer = () => {
  const { data: websiteInfo } = useWebsiteInfo();
  const { data: contactInfo } = useContactInfo();
  const { data: socialLinks } = useSocialLinks();
  const { data: personalInfo } = usePersonalInfo();

  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-400">
      <div className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <button
              onClick={() => handleNavClick("home")}
              className="text-lg font-bold text-white mb-4 hover:text-blue-400 transition-colors duration-200 text-left"
            >
              {websiteInfo?.site_name || ""}
            </button>
            <p className="text-sm">
              {websiteInfo?.site_description ||
                "Thank you for visiting my personal portfolio"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            {socialLinks && socialLinks.length > 0 && (
              <ul className="space-y-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center"
                    >
                      <img
                        src={link.icon}
                        alt={`${link.name} icon`}
                        className="w-4 h-4 mr-2"
                      />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              {contactInfo?.email && (
                <li className="flex items-center">
                  <Icon
                    path="M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z m18 2L12 10 3 5v14h18V5z"
                    className="w-4 h-4 mr-2"
                  />
                  {contactInfo.email}
                </li>
              )}
              {contactInfo?.phone && (
                <li className="flex items-center">
                  <Icon
                    path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    className="w-4 h-4 mr-2"
                  />
                  {contactInfo.phone}
                </li>
              )}
              {personalInfo?.location && (
                <li className="flex items-center">
                  <Icon
                    path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                    className="w-4 h-4 mr-2"
                  />
                  {personalInfo.location}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 lg:pt-8 border-t border-gray-700 text-center text-sm  lg:mt-12">
          <p>
            &copy; {currentYear} {websiteInfo?.site_name || ""}. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
