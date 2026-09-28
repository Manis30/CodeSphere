import { useEffect, useState } from "react";
import { database } from "../../BackendServices/AppWrite";
import { Query } from "appwrite";
import Loading from "../Loader";
import FeedPostCard from "./PostCard";
import profileimg from '../../assets/profileimg.jpeg'

export default function DeveloperFeed() {

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const response = await database.listDocuments(

                    import.meta.env.VITE_DATABASE,

                    import.meta.env.VITE_POST,

                    [

                        Query.orderDesc("$createdAt")

                    ]

                );

                setPosts(response.documents);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        };

        fetchPosts();

    }, []);

    if (loading)

        return <Loading fullScreen={false} />;

    return (

        <section>

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Developer Feed

                </h2>

                <span className="text-slate-400">

                    {posts.length} Posts

                </span>

            </div>

            <div className="space-y-6">

                {

                    posts.length === 0 ?

                    (

                        <div className="bg-[#111827] rounded-2xl border border-slate-700 p-10 text-center">

                            <h3 className="text-white text-xl font-semibold">

                                No Posts Yet

                            </h3>

                            <p className="text-slate-400 mt-3">

                                Be the first developer to share something 🚀

                            </p>

                        </div>

                    )

                    :

                    posts.map(post => (

                        <FeedPostCard

                            key={post.$id}

                            post={post}

                        />

                    ))

                }

            </div>

        </section>

    );

}