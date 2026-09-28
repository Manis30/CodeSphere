import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import SkillsSection from "./SkillsSection";
import SocialLinks from "./SocialLinks";
import AboutSection from "./AboutSection";
import RecentPosts from "./RecentPost";
import { useState,useEffect } from "react";
import Loading from "../Loader";
import profileimg from '../../assets/profileimg.jpeg'
import coverimg from '../../assets/coverimg.jpeg'
import { Query } from "appwrite";
import { account,database,storage } from "../../BackendServices/AppWrite";
export default function Profile({userid=null,isownprofile=true}) {
  const [documentid,setDocumentId]=useState("");
  const [loader,setLoader]=useState(false)
  const initialState = {
      name: "",
      id:"",
      username: "",
      location: "",
      bio: "",
      designation:"",
      github: "",
      linkedin: "",
      portfolio: "",
      skills: [],
      profileimage: "",
      coverimage: "",
      followerws:"",
      following:"",
      profileimagePreview:'',
      coverimagePreview:""
    };
  
    const [formData, setFormData] = useState(initialState);
    useEffect(()=>{
        const fetchData=async()=>{
          const data=await account.get()
          const profileId=userid||data.$id
          const userdata=await database.getDocument(
             import.meta.env.VITE_DATABASE,
            import.meta.env.VITE_USER,
            profileId
          )
          setDocumentId(profileId)
          let fetchProfileImagePreview
          if(userdata.profileimage){
             fetchProfileImagePreview=await storage.getFileView(import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
          userdata.profileimage
          )
          }
          let fetchCoverImagePreview=""
          if(userdata.coverimage){
             fetchCoverImagePreview=await storage.getFileView(import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
          userdata.coverimage
          )
          }
           
          setFormData({
            id:profileId||"",
             name: userdata.name || "",
    username: userdata.username || "",
    location: userdata.location || "",
    bio: userdata.bio || "",
    designation: userdata.designation || "",
    github: userdata.github || "",
    linkedin: userdata.linkedin || "",
    portfolio: userdata.portfolio || "",
    skills: userdata.skills || [],
    profileimage: userdata.profileimage || profileimg,
    coverimage: userdata.coverimage || coverimg,
     followers:userdata.followers||0,
      following:userdata.following||0,
    profileimagePreview:fetchProfileImagePreview||profileimg,
    coverimagePreview:fetchCoverImagePreview||coverimg,
          })
          setLoader(false)
        }
        fetchData()
    },[])
     const[post,setPost]=useState([])
       useEffect(()=>{
        if(!formData.id)
        return 
              const fetchData=async()=>{
                console.log(formData,'use effect')
                const userdata={...formData}
                  const userimage=await storage.getFileView(
                       import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
                       userdata.profileimage
                  )
                  userdata.profileImagePreview=userimage
                  const postData=await database.listDocuments(
                       import.meta.env.VITE_DATABASE,
                      import.meta.env.VITE_POST,
                      [
                          Query.equal("userid",formData.id),
                          Query.orderDesc('$createdAt')
                      ]
                  )
                  console.log("user posts: ",postData)
                  const postimagepreview=await Promise.all(
                      postData.documents.map(async(item)=>{
                          let imagepreview=await storage.getFileView(
                              import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
                              item.postimage
                          )
                          return {...item,imagepreview}
                      })
                  )
                  console.log(postimagepreview,'check from profile')
                  setPost(postimagepreview)
              }
              fetchData();
          },[formData.id])
      if(loader)
    return <Loading/>
  return (
    <div className="bg-[#0F172A] p-8">

      <ProfileHeader  data={formData}  isOwnProfile={isownprofile} />
      <ProfileStats  data={formData} postlen={post.length} />

      <SkillsSection  data={formData} />

      <SocialLinks   data={formData}/>

      <AboutSection  data={formData}/>

      <RecentPosts  data={formData}  isOwnProfile={isownprofile} post={post}/>

    </div>
  );
}