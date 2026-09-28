import { useEffect, useState } from "react";
import { account, database, storage } from "../../BackendServices/AppWrite";
import { Query } from "appwrite";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import profileimg from '../../assets/profileimg.jpeg'

export default function SuggestedDevelopers() {

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

                                profileimagepreview,

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

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold text-white">

                    Suggested Developers

                </h2>

                <button

                    onClick={() => navigate("/explore")}

                    className="text-violet-400 hover:text-violet-300 text-sm"

                >

                    View All

                </button>

            </div>

            <div className="mt-6 space-y-5">

                {

                    developers.map(user => (

                        <div

                            key={user.$id}

                            className="flex justify-between items-center"

                        >

                            <div className="flex gap-3">

                                <img

                                    src={

                                        user.profileimagepreview ||

                                        profileimg

                                    }

                                    className="w-12 h-12 rounded-full object-cover"

                                />

                                <div>

                                    <h3 className="text-white font-semibold capitalize">

                                        {user.name}

                                    </h3>

                                    <p className="text-slate-400 text-xs capitalize">

                                        {user.designation}

                                    </p>

                                </div>

                            </div>

                            <button

                                onClick={() => navigate(`/view-profile/${user.$id}`)}

                                className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center"

                            >

                                <FaArrowRight />

                            </button>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}