import WelcomeBanner from "./WelcomeBanner";
import StatsCards from "./StatsCard";
import QuickActions from "./QuickActions";
import SuggestedDevelopers from "./TrendingDevelopers";
import ActiveDevelopers from "./ActiveDevelopers";
import RecentChats from "./RecentChat";
import DeveloperFeed from "./DeveloperFeed";

export default function Dashboard() {

    return (

        <div className="min-h-full bg-[#0F172A] p-8">

            {/* Welcome */}

            <WelcomeBanner />

            {/* Stats */}

            <StatsCards />

            {/* Quick Actions */}

            <QuickActions />

            {/* Main Layout */}

            <div className="grid grid-cols-12 gap-8 mt-8">

                {/* Left Sidebar */}

                <div className="col-span-3 space-y-6">

                    <SuggestedDevelopers />

                </div>

                {/* Feed */}

                <div className="col-span-6">

                    <DeveloperFeed />

                </div>

                {/* Right Sidebar */}

                <div className="col-span-3 space-y-6">

                    <ActiveDevelopers />

                    <RecentChats />

                </div>

            </div>

        </div>

    );

}