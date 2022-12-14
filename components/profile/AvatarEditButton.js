import { useState, useRef, useEffect } from "react";
import { GrEdit } from "react-icons/gr";
import useOutsideClick from "hooks/useOutsideClick";
import { nanoid } from "nanoid";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function AvatarEditButton({ profile, setRerender }) {
  const ref = useRef();
  const [isExpanded, setIsExpanded] = useState(false);

  useOutsideClick(ref, () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  });

  const changeHandler = async (e) => {
    setIsExpanded(false);
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          upload(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const upload = async (image) => {
    const res = await fetch("/api/profile/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image, profile }),
    });
    const avatarURL = await res.json();
    setRerender(nanoid());
  };

  const removePhoto = async () => {
    if (
      window.confirm("Are you sure? This will set your picture to the default.")
    ) {
      setIsExpanded(false);
      const res = await fetch("/api/profile/avatar", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile }),
      });
      setRerender(nanoid());
    }
  };

  return (
    <div ref={ref}>
      <button
        className="flex absolute bottom-6 left-8 px-2 py-1 bg-white  rounded-md border items-center shadow-xl"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <GrEdit className="pr-1" />
        Edit
      </button>
      {isExpanded && (
        <div className="absolute bottom-4 left-6 w-40">
          <ul className="absolute py-1 border rounded bg-white shadow-xl">
            <li className="hover:bg-blue-500 hover:text-white cursor-pointer py-1 pl-2 pr-8">
              <label htmlFor="file-upload">Upload a photo</label>
            </li>
            <li
              className="hover:bg-blue-500 hover:text-white cursor-pointer py-1 pl-2 pr-8"
              onClick={removePhoto}
            >
              Remove photo
            </li>
          </ul>
          <div className="absolute -bottom-1 left-4 border-l border-t rotate-45 w-2 h-2 bg-white"></div>
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={changeHandler}
          />
        </div>
      )}
    </div>
  );
}
