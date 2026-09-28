import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import {account,database,storage} from '../../BackendServices/AppWrite'
import ProfileImages from "./ProfileImage";
import BasicInfo from "./BasicInfo";
import SkillsInput from "./SkillsInput";
import SocialLinks from "./SocialLinks";
import SaveButton from "./SaveButton";
import { ID } from "appwrite";
import { useNavigate } from "react-router";

export default function EditProfile() {
  const [documentid,setDocumentId]=useState("");
  const navigate=useNavigate()
  useEffect(()=>{
      const fetchData=async()=>{
        const data=await account.get()
        console.log("Response: ",data);
        const userdata=await database.getDocument(
           import.meta.env.VITE_DATABASE,
          import.meta.env.VITE_USER,
          data.$id
        )
        setDocumentId(data.$id)
        console.log("userdata: ",userdata)
        const fetchProfileImagePreview=userdata.profileimage?await storage.getFileView(import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
        userdata.profileimage
        ):""
         const fetchCoverImagePreview=userdata.coverimage?await storage.getFileView(import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
        userdata.coverimage
        ):""
        console.log(fetchCoverImagePreview,fetchProfileImagePreview,'response data')
        setFormData({
           name: userdata.name || "",
  username: userdata.username || "",
  location: userdata.location || "",
  bio: userdata.bio || "",
  designation: userdata.designation || "",
  github: userdata.github || "",
  linkedin: userdata.linkedin || "",
  portfolio: userdata.portfolio || "",
  skills: userdata.skills || [],
  profileimage: userdata.profileimage || "",
  coverimage: userdata.coverimage || "",
  profileimagePreview:fetchProfileImagePreview||"",
  coverimagePreview:fetchCoverImagePreview||"",
        })
      }
      fetchData()
  },[])
  const initialState = {
    name: "",
    username: "",
    location: "",
    bio: "",
    designation:"",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: [],
    profileimage: "",
    followers:0,
    following:0,
    coverimage: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    validate(updatedData);

    setFormData(updatedData);
  };

  const validate = (data) => {

    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!data.designation.trim()) {
      newErrors.role = "Designation is required";
    }

    if (!data.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!data.bio.trim()) {
      newErrors.bio = "Bio is required";
    }

    if (
      data.github &&
      !/^https?:\/\/.+/.test(data.github)
    ) {
      newErrors.github = "Invalid Github URL";
    }

    if (
      data.linkedin &&
      !/^https?:\/\/.+/.test(data.linkedin)
    ) {
      newErrors.linkedin = "Invalid LinkedIn URL";
    }

    if (
      data.portfolio &&
      !/^https?:\/\/.+/.test(data.portfolio)
    ) {
      newErrors.portfolio = "Invalid Portfolio URL";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    if (!validate(formData)) {

      toast.error("Please fix all errors");

      return;
    }

    try {
      console.log(formData,'from edit form')
      let profileImageId="";
      let coverImageId="";
      if(formData.profileimage instanceof File){
        profileImageId=await storage.createFile(
          import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
          ID.unique(),
          formData.profileimage
        )
        console.log(profileImageId,'profile respo')
      }
      if(formData.coverimage instanceof File){
        coverImageId=await storage.createFile(
          import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
          ID.unique(),
          formData.coverimage
        )
        console.log(coverImageId,'profile respo')
      }
      const updateduserdata={...formData,"profileimage":profileImageId?.$id||formData.profileimage,"coverimage":coverImageId?.$id||formData.coverimage}
     delete updateduserdata.coverimagePreview;
     delete updateduserdata.profileimagePreview;
      const updateuser=await database.updateDocument(
          import.meta.env.VITE_DATABASE,
          import.meta.env.VITE_USER,
          documentid,
          updateduserdata
      )
      console.log("updated response: ",updateuser)
      toast.success("Profile Updated Successfully");
      navigate("/profile",{replace:true})
    } catch (error) {

      toast.error(error.message);

    }

  };

  return (
    <div className="bg-[#0F172A] p-8">

      <h1 className="text-4xl font-bold text-white mb-8">

        Edit Profile

      </h1>

      <ProfileImages
        formData={formData}
        setFormData={setFormData}
      />

      <BasicInfo
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <SkillsInput
        formData={formData}
        setFormData={setFormData}
      />

      <SocialLinks
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <SaveButton
        handleSubmit={handleSubmit}
      />

    </div>
  );
}