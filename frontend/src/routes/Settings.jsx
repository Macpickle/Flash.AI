import { LuShield, LuEye, LuUser } from "react-icons/lu";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";  
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useContext } from "react";
import { ThemeContext } from "@/utils/contexts/ThemeContext";

import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"

// sample user for now
const user = {
    username: localStorage.getItem("username") || "User",
    image: "https://blackwonder.tf/attachments/1673671146282-png.31249/",
  };

function Settings() {
    const [privacy, setPrivacy] = useState(false);
    const [dataCollection, setDataCollection] = useState(false);
    const [thirdPartyData, setThirdPartyData] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const { toggleTheme } = useContext(ThemeContext);

    const handleSettingChange = (setting, setter, value) => {
        setter(value);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full px-4 overflow-y-scroll no-scrollbar">
            <div className="text-center w-full mt-4">
                <h1 className="text-4xl font-bold tracking-tight mb-4 animate-fade-down">Settings</h1>
                <p className="text-neutral-500">Manage your account settings</p>
            </div>

            <Tabs className="mt-4 w-full sm:px-16 px-4" defaultValue="account">
                <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger className="data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground" value="account">
                        <LuUser className="text-xl mr-1" />
                        Account
                    </TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground" value="privacy">
                        <LuEye className="text-xl mr-1" />
                        Privacy
                    </TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground" value="security">
                        <LuShield className="text-xl mr-1" />
                        Security
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="animate-reveal">
                    <Card className="w-full bg-white dark:bg-neutral-900 min-h-[500px]">
                        <CardHeader>
                            <div className="flex flex-row items-center space-x-2 text-primary-500 dark:text-primary-400">
                                <LuUser className="text-3xl" />
                                <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
                            </div>

                            <p className="text-neutral-500">Update your account settings</p>
                        </CardHeader>
                        
                        <CardContent>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-row items-center space-x-2 w-full">
                                    <img
                                        src={user.image}
                                        alt="profile"
                                        className="w-16 h-16 rounded-full object-cover object-center"
                                    />
                                    <div>
                                        <h1 className="text-xl font-semibold">{user.username}</h1>
                                        <input type="file" className="border rounded-md p-2 mt-1" />
                                    </div>
                                </div>

                                <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start">
                                    <div>
                                        <Label htmlFor="email" className="font-semibold tracking-tight text-md">
                                            Email
                                            <p className="tracking-tight text-neutral-500 font-normal">
                                                Change your email address
                                            </p>
                                        </Label>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        className="border rounded-md p-2 sm:w-1/3 w-full mt-1 dark:bg-neutral-800"
                                        placeholder="Enter new email"
                                    />
                                </div>

                                <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start">
                                    <div>
                                        <Label htmlFor="username" className="font-semibold tracking-tight text-md">
                                            Username
                                            <p className="tracking-tight text-neutral-500 font-normal">
                                                Change your username
                                            </p>
                                        </Label>
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        className="border rounded-md p-2 sm:w-1/3 w-full mt-1 dark:bg-neutral-800"
                                        placeholder="Enter new username"
                                    />
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <div>
                                        <Label htmlFor="darkMode" className="font-semibold tracking-tight text-md">
                                            Dark Mode
                                            <p className="tracking-tight text-neutral-500 font-normal">
                                                Enable dark mode
                                            </p>
                                        </Label>
                                    </div>
                                    <Switch
                                        id="darkMode"
                                        className="transform scale-125"
                                        checked={darkMode}
                                        onCheckedChange={(checked) => {
                                            toggleTheme();
                                            handleSettingChange("darkMode", setDarkMode, checked);
                                        }}
                                    />
                                </div>

                                <Button className="mt-4">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="privacy" className="animate-reveal">
                    <Card className="w-full bg-white dark:bg-neutral-900 min-h-[500px]">
                        <CardHeader>
                            <div className="flex flex-row items-center space-x-2">
                                <LuEye className="text-3xl text-primary-500" />
                                <h1 className="text-2xl font-bold tracking-tight">Privacy Settings</h1>
                            </div>

                            <p className="text-neutral-500">Update your privacy settings</p>
                        </CardHeader>
                    
                        <CardContent className="space-y-4">
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <Label htmlFor="privacy" className="font-semibold tracking-tight text-md">
                                        Account Privacy
                                        <p className="tracking-tight text-neutral-500 font-normal">
                                            Make your account private
                                        </p>
                                    </Label>
                                </div>
                                <Switch    
                                    id="privacy" 
                                    className="transform scale-125"        
                                    checked={privacy}
                                    onCheckedChange={(checked) => handleSettingChange("privacy", setPrivacy, checked)}
                                />
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <Label htmlFor="dataCollection" className="font-semibold tracking-tight text-md">
                                        Data Collection
                                        <p className="tracking-tight text-neutral-500 font-normal">
                                            Allow data collection
                                        </p>
                                    </Label>
                                </div>
                                <Switch
                                    id="dataCollection"
                                    className="transform scale-125"
                                    checked={dataCollection}
                                    onCheckedChange={(checked) => handleSettingChange("dataCollection", setDataCollection, checked)}
                                />
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <Label htmlFor="thirdPartyData" className="font-semibold tracking-tight text-md">
                                        Third-party Data Sharing
                                        <p className="tracking-tight text-neutral-500 font-normal">
                                            Allow third-party data sharing
                                        </p>
                                    </Label>
                                </div>
                                <Switch
                                    id="thirdPartyData"
                                    className="transform scale-125"
                                    checked={thirdPartyData}
                                    onCheckedChange={(checked) => handleSettingChange("thirdPartyData", setThirdPartyData, checked)}
                                />
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <Label htmlFor="analytics" className="font-semibold tracking-tight text-md">
                                        Analytics
                                        <p className="tracking-tight text-neutral-500 font-normal">
                                            Allow analytics tracking for performance monitoring
                                        </p>
                                    </Label>
                                </div>
                                <Switch
                                    id="analytics"
                                    className="transform scale-125"
                                    checked={analytics}
                                    onCheckedChange={(checked) => handleSettingChange("analytics", setAnalytics, checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>    

                <TabsContent value="security" className="animate-reveal">
                    <Card className="w-full bg-white dark:bg-neutral-900 min-h-[500px]">
                        <CardHeader>
                            <div className="flex flex-row items-center space-x-2">
                                <LuShield className="text-3xl text-primary-500" />
                                <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
                            </div>

                            <p className="text-neutral-500">Update your security settings</p>
                        </CardHeader>
                    
                        <CardContent>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-col space-y-4 w-full">
                                    <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start">
                                        <div>
                                            <Label htmlFor="currentPassword" className="font-semibold tracking-tight text-md">
                                                Current Password
                                                <p className="tracking-tight text-neutral-500 font-normal">
                                                    Enter your current password
                                                </p>
                                            </Label>
                                        </div>
                                        <input
                                            id="currentPassword"
                                            type="password"
                                            className="border rounded-md p-2 sm:w-1/3 w-full mt-1 dark:bg-neutral-800"
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start">
                                        <div>
                                            <Label htmlFor="newPassword" className="font-semibold tracking-tight text-md">
                                                New Password
                                                <p className="tracking-tight text-neutral-500 font-normal">
                                                    Enter your new password
                                                </p>
                                            </Label>
                                        </div>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            className="border rounded-md p-2 sm:w-1/3 w-full mt-1 dark:bg-neutral-800"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start">
                                        <div>
                                            <Label htmlFor="confirmPassword" className="font-semibold tracking-tight text-md">
                                                Confirm New Password
                                                <p className="tracking-tight text-neutral-500 font-normal">
                                                    Confirm your new password
                                                </p>
                                            </Label>
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            className="border rounded-md p-2 sm:w-1/3 w-full mt-1 dark:bg-neutral-800"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    <Button className="mt-4">Save Changes</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    );  
}

export default Settings;
