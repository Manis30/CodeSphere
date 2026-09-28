import { useState,useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { data, useNavigate } from "react-router";
import MyPostCard from "./PostCard";
import EmptyPosts from "./EmptyPosts";
import {account,storage,database} from '../../BackendServices/AppWrite'
import { Query } from "appwrite";
import Loading from '../Loader'
export default function MyPosts() {
    const [post,setPost]=useState([])
    const [user,setUser]=useState({})
    const [loader,setLoader]=useState(false)
    const navigate = useNavigate();
    const handleDelete=async(postid,imageid)=>{
    const confirmDelete = window.confirm(
  "Are you sure you want to delete this post?"
);

if (!confirmDelete) return; 
const deletepost=await database.deleteDocument(
  import.meta.env.VITE_DATABASE,
  import.meta.env.VITE_POST,
  postid              
)
const deletefile=await storage.deleteFile(
  import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
  imageid            
)
setPost(prev=>prev.filter(item=>item.$id!=postid))
  }
    useEffect(()=>{
        const fetchData=async()=>{
            const user=await account.get();
            const userdata=await database.getDocument(
                 import.meta.env.VITE_DATABASE,
                import.meta.env.VITE_USER,
                user.$id
            )
            const userimage=await storage.getFileView(
                 import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
                 userdata.profileimage
            )
            userdata.profileImagePreview=userimage
            setUser(userdata)
            const postData=await database.listDocuments(
                 import.meta.env.VITE_DATABASE,
                import.meta.env.VITE_POST,
                [
                    Query.equal("userid",user.$id)
                ]
            )
            const postimagepreview=await Promise.all(
                postData.documents.map(async(item)=>{
                    let imagepreview=await storage.getFileView(
                        import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
                        item.postimage
                    )
                    return {...item,imagepreview}
                })
            )
            setPost(postimagepreview)
            setLoader(false)
        }
        fetchData();
    },[])
      if(loader)
    return <Loading/>
    return (

        <div className="bg-[#0F172A] min-h-screen p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        My Posts

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Manage all your published posts.

                    </p>

                </div>

                <button
                    onClick={() => navigate("/create-post")}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 px-5 py-3 rounded-xl"
                >
                    <FaPlus />
                    Create Post
                </button>

            </div>

            {

                post.length === 0 ?

                    <EmptyPosts />

                    :

                    <div className="space-y-6">

                        {

                            post.map(post => (

                                <MyPostCard
                                    key={post.id}
                                    post={post}
                                    User={user}
                                    Delete={handleDelete}
                                />

                            ))

                        }

                    </div>

            }

        </div>

    );

}