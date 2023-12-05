import {FaUserFriends} from "react-icons/fa";
import {MdDashboardCustomize} from "react-icons/md";
import {TbBrandBooking} from "react-icons/tb";
import {MdDesignServices} from "react-icons/md";
import {CgPlayListAdd} from "react-icons/cg";
import {AiOutlineHome} from "react-icons/ai";


export const SideNavLayoutData = [

    {
        title:"Dashboard",
        icons :<MdDashboardCustomize/>,
        link :"/"
    },
    {
        title:"Users",
        icons :<FaUserFriends/>,
        link :"/users"
    },
    {
        title:"Providers",
        icons :<AiOutlineHome/>,
        link :"/providers"
    },

    {
        title:"Bookings",
        icons :<TbBrandBooking/>,
        link :"/bookings"
    },
     
    {
        title:"Services",
        icons :<MdDesignServices className="text-whitw"/>,
        link :"/services"
    }, 
    {
        title:"Add-Ons",
        icons :<CgPlayListAdd/>,
        link :"/addons"
    },
    {
        title:"Logout",
        icons :<TbBrandBooking/>,
        link :"/login"
    },

 
]