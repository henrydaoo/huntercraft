import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ImageGalleryModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  images,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-80  overflow-x-hidden overflow-y-auto cursor-zoom-out`}
      onClick={() => {
        onClose();
      }}
    >
      <button
        className="fixed top-4 right-4 lg:top-6 lg:right-8 z-50 text-white bg-black bg-opacity-100 rounded-full p-2 hover:bg-white hover:bg-opacity-30 transition"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-4 h-4 lg:w-7 lg:h-7 text-white" />
      </button>
      <div className="w-full h-full flex flex-col justify-around items-center z-40">
        <div className="w-full flex flex-col items-center lg:p-16 lg:max-w-screen-2xl">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Preview ${idx + 1}`}
              className="object-contain w-full"
              style={{ cursor: "default" }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
