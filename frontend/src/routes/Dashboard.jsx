import { useEffect } from "react"
import AxiosRequest from "@/utils/Axios"

function Dashboard() {
    useEffect(() => {
        AxiosRequest({
            url: "/api/docs/",
            method: "get",
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    });

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}   

export default Dashboard;