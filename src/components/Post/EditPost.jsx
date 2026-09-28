import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PostEditor from "./PostEditor";
import ImageUploader from "./ImageUpload";
import TagsInput from "./TagInput";
import ProjectLink from "./ProjectLink";
import PublishButton from "./PublishButton";
import { database, storage } from "../../BackendServices/AppWrite";
import { toast } from "react-toastify";
import { ID } from "appwrite";
export default function EditPost() {
    const navigate=useNavigate()
    const { id } = useParams();

    const initialState = {
        description: "",
        projectlink: "",
        tags: [],
        postimage: null,
        userid:"",
        postimagePreview: "",
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {

        // Replace this with Appwrite ge
        // tDocument()
        const fetchData = async () => {
            console.log(id,'check id')
            const editpost = await database.getDocument(
                import.meta.env.VITE_DATABASE,
                import.meta.env.VITE_POST,
                id
            )
            const postimg = await storage.getFileView(
                import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
                editpost.postimage
            )
            console.log("response from edit post", editpost, postimg);
            setFormData({
                userid:editpost.userid||"",
                description: editpost.description || "",
                projectlink: editpost.projectlink || "",
                tags: editpost.tags || [],
                postimage: editpost.postimage || '',
                postimagePreview: postimg || "",
            })
        }
        fetchData()
        const dummyPost = {
            description:
                "Built a Full Stack Healthcare Application using React, Node.js and Appwrite.",
            projectlink: "https://github.com/demo",
            tags: ["React", "Node", "Appwrite"],
            postimagePreview: "https://picsum.photos/600/300"
        };

        setFormData(dummyPost);

    }, [id]);

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleUpdate = async() => {
        try {
            console.log(formData,"latest values here")
            let postimgid=""
            if(formData.postimage instanceof File){
                const postimg=await storage.createFile(
                import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
                ID.unique(),
                formData.postimage
            )
                postimgid=postimg.$id
            }
            const updatepost={...formData,postimage:postimgid||formData.postimage}
            delete updatepost.postimagePreview
            console.log(updatepost,'latest data')
            const dbpostupdate=await database.updateDocument(
                 import.meta.env.VITE_DATABASE,
                import.meta.env.VITE_POST,
                id,
                updatepost
            )
            console.log("update result here: ",updatepost)
            toast.success("Post updated sucessfully")
            navigate('/mypost',{replace:true})
        } catch (error) {
            console.log(error,'error')
            toast.error(error.message)
        }
    };

    return (

        <div className="bg-[#0F172A] min-h-screen p-8">

            <h1 className="text-4xl font-bold text-white mb-8">

                Edit Post

            </h1>

            <PostEditor
                formData={formData}
                handleChange={handleChange}
            />

            <ProjectLink
                formData={formData}
                handleChange={handleChange}
            />

            <TagsInput
                formData={formData}
                setFormData={setFormData}
            />

            <ImageUploader
                formData={formData}
                setFormData={setFormData}
            />

            <PublishButton
                text="Update Post"
                handleSubmit={handleUpdate}
            />

        </div>

    );

}