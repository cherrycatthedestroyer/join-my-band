import React, { ReactNode } from "react";
import { useRef, useState } from "react";

const titleStylingActive =
  "block uppercase tracking-wide text-m font-bold text-stone-700";
const headerStylingActive =
  "flex justify-between mb-2 w-full bg-stone-200 rounded p-5 items-center";
const headerStyling =
  "flex justify-between mb-2 w-full hover:bg-stone-100 rounded p-5 items-center hover-header";
const titleStyling =
  "block uppercase tracking-wide text-m font-bold text-stone-400";
const chevronStyleActive = "rotate-180 fill-stone-700";
const chevronStyle = "-rotate-90 fill-stone-400";

const FormSectionWrapper: React.FC<{
  sectionTitle: string;
  sectionName: string;
  initialIsOpen: boolean;
  isOptional: boolean;
  children: ReactNode;
}> = ({ sectionTitle, initialIsOpen, sectionName, children, isOptional }) => {
  const sectionDiv = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen);
  function handleClick() {
    setIsOpen((prevIsOpen) => {
      prevIsOpen === false
        ? sectionDiv.current!.scrollIntoView({ behavior: "smooth" })
        : undefined;
      return !prevIsOpen;
    });
  }

  return (
    <section className="mb-2" ref={sectionDiv}>
      <button
        type="button"
        onClick={handleClick}
        className={isOpen ? headerStylingActive : headerStyling}
      >
        <h2 className={isOpen ? titleStylingActive : titleStyling}>
          <span className="flex gap-2">
            {sectionTitle}
            {isOptional && (
              <p className="leading-tight tracking-tighter text-xs font-normal">
                optional
              </p>
            )}
          </span>
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width={15}
          height={15}
          className={isOpen ? chevronStyleActive : chevronStyle}
        >
          <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
        </svg>
      </button>
      {isOpen && children}
    </section>
  );
};

export default FormSectionWrapper;
