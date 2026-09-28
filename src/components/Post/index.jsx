import { useState } from "react";
import { toast } from "react-toastify";
import { account, database, storage } from "../../BackendServices/AppWrite";
import { ID } from "appwrite";
import PostEditor from "./PostEditor";
import ImageUploader from "./ImageUpload";
import TagsInput from "./TagInput";
import ProjectLink from "./ProjectLink";
import PublishButton from "./PublishButton";
import { useNavigate } from "react-router";

export default function CreatePost() {
const navigate=useNavigate()
    const initialState = {
        description: "",
        projectlink: "",
        tags: [],
        postimage: null,
        postimagePreview: "",
        likes: 0,
        comments: 0,
        isedit: false
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleSubmit = async () => {

        if (!formData.description.trim()) {

            toast.error("Description is required");

            return;
        }

        try {

            const user = await account.get();

            let imageId = "";
            console.log(user, "response", formData)
            if (formData.postimage instanceof File) {
                const response = await storage.createFile(
                    import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
                    ID.unique(),
                    formData.postimage
                );

                imageId = response.$id;
            }
            const updatedPostdata = {
                ...formData, postimage: imageId, userid: user.$id, likes: 0,
                comments: 0,
                isedit: false
            };
            delete updatedPostdata.postimagePreview
            console.log(updatedPostdata, 'new data 6a704003002a1b3623f1')
            const dbpost = await database.createDocument(
                import.meta.env.VITE_DATABASE,
                import.meta.env.VITE_POST,
                ID.unique(),
                updatedPostdata
            );
            console.log(dbpost, "check result")
            toast.success("Post Published");
            setFormData(initialState);
             navigate('/mypost',{replace:true})

        } catch (error) {
            console.log(error, 'error')
            toast.error(error.message);

        }

    };

    return (

        <div className="bg-[#0F172A] min-h-screen p-8">

            <h1 className="text-4xl font-bold text-white mb-8">

                Create New Post

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
            
                 text="Create Post"
                handleSubmit={handleSubmit}
            />

        </div>

    );

}