import { useSocialLinks } from "@/hooks/useContactInfo";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "./Icon";

const Footer = () => {
  const { data: socialLinks } = useSocialLinks();

  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Technologies", id: "technologies" },
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
              Hunter
            </button>
            <p className="text-sm">Build. Craft. Impact.</p>
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
              <li className="flex items-center">
                <Icon
                  path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                  className="w-4 h-4 mr-2"
                />
                Ho Chi Minh City, Vietnam
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 lg:pt-8 border-t border-gray-700 text-center text-sm  lg:mt-12">
          <p>&copy; {currentYear} Hunter. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
