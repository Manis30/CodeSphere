import { useState,useEffect } from "react";
import PostCard from '../Post/PostCard'
export default function RecentPosts(
  {data,isOwnProfile,post}
) {

  return (
   <div className="mt-6 space-y-5">

{
post.map(post => (

<PostCard
key={post.$id}
post={post}
User={data}
compact={true}
isOwnProfile={false}
/>

))
}

</div>
  );
}