import { useEffect, useState } from "react";
import { account, database, storage } from "../../BackendServices/AppWrite";
import { Query } from "appwrite";
import { FaCircle, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router";
import profileimg from '../../assets/profileimg.jpeg'

export default function ActiveDevelopers() {

    const navigate = useNavigate();

    const [developers, setDevelopers] = useState([]);

    useEffect(() => {

        const fetchDevelopers = async () => {

            try {

                const currentUser = await account.get();

                const response = await database.listDocuments(

                    import.meta.env.VITE_DATABASE,

                    import.meta.env.VITE_USER,

                    [

                        Query.equal("isonline", true),

                        Query.limit(5)

                    ]

                );

                const users = await Promise.all(

                    response.documents

                        .filter(user => user.$id !== currentUser.$id)

                        .map(async user => {

                            let profileimagepreview = "";

                            if (user.profileimage) {

                                profileimagepreview = storage.getFileView(

                                    import.meta.env.VITE_BUCKET_PROFILE_IMAGE,

                                    user.profileimage

                                );

                            }

                            return {

                                ...user,

                                profileimagepreview

                            };

                        })

                );

                setDevelopers(users);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchDevelopers();

    }, []);

    return (

        <section className="bg-[#111827] rounded-2xl border border-slate-700 p-6">

            <h2 className="text-xl font-bold text-white">

                Active Developers

            </h2>

            <p className="text-slate-400 text-sm mt-1">

                Currently Online

            </p>

            <div className="mt-6 space-y-5">

                {

                    developers.length === 0 ?

                    (

                        <p className="text-slate-500">

                            No developers online

                        </p>

                    )

                    :

                    developers.map(user => (

                        <div

                            key={user.$id}

                            className="flex justify-between items-center"

                        >

                            <div className="flex gap-3">

                                <div className="relative">

                                    <img

                                        src={

                                            user.profileimagepreview ||

                                            profileimg

                                        }

                                        className="w-12 h-12 rounded-full object-cover"

                                    />

                                    <FaCircle

                                        className="absolute bottom-0 right-0 text-[11px] text-green-500 border-2 border-[#111827] rounded-full"

                                    />

                                </div>

                                <div>

                                    <h3 className="text-white text-sm font-semibold capitalize">

                                        {user.name}

                                    </h3>

                                    <p className="text-slate-400 text-xs capitalize">

                                        {user.designation}

                                    </p>

                                </div>

                            </div>

                            <button

                                onClick={() => navigate(`/chat/${user.$id}`)}

                                className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-500 flex justify-center items-center transition"

                            >

                                <FaEnvelope />

                            </button>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}