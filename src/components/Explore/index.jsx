import { useState,useEffect } from "react";
import ExploreHeader from "./ExploreHeader";
import SearchBar from "./SearchBar";
import DeveloperCard from "./DevCard";
import EmptyState from "./EmptyState";
import {Query } from 'appwrite'
import { account,storage,database } from "../../BackendServices/AppWrite";
import Loading from "../Loader";
import profileimg from '../../assets/profileimg.jpeg'
export default function Explore() {
    const [developer,setDeveloper]=useState([])
    const [loader,setLoader]=useState(true)
    const [search, setSearch] = useState("");
    useEffect(()=>{
        const fetchData=async()=>{
            const user=await account.get();
            const devdata=await database.listDocuments(
                import.meta.env.VITE_DATABASE,
                import.meta.env.VITE_USER,
                [
                    Query.notEqual("$id",user.$id)

                ]
            )
            const updatedDevdata=await Promise.all(
                devdata.documents.map(async(item)=>{
                    let profileimagepreview=""
                    if(item.profileimage){
                        profileimagepreview=await storage.getFileView(
                        import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
                        item.profileimage
                    )
                    }
                    else{
                        profileimagepreview=profileimg
                    }
                    
                    return {...item,profileimagepreview}
                })
            )
            setDeveloper(updatedDevdata)
            setLoader(false)
        }
        fetchData()
    },[])
    if(loader)
    return <Loading/>
    return (

        <div className="bg-[#0F172A] min-h-screen p-8">

            <ExploreHeader />

            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            {

                developer.length === 0 ?

                    <EmptyState />

                    :

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">

                        {

                            developer.map((developer) => (

                                <DeveloperCard
                                    key={developer.$id}
                                    developer={developer}
                                />

                            ))

                        }

                    </div>

            }

        </div>

    );

}