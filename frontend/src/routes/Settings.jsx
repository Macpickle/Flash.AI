import { LuMoon, LuSun, LuComputer } from "react-icons/lu";
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";  
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"


const GeneralSettingsInput = [
    {
        Label: 'Username',
        Value: '',
        PlaceHolder: 'Enter your username',
    },
    {
        Label: 'Email',
        Value: '',
        PlaceHolder: 'Enter your email',
    },
    {
        Label: 'Password',
        Value: '',
        PlaceHolder: 'Enter your password',
    },
    {
        Label: 'Confirm Password',
        Value: '',
        PlaceHolder: 'Confirm your password',
    },
]

function Settings() {
    const [privacy, setPrivacy] = useState(false);
    const [dataCollection, setDataCollection] = useState(false);
    const [thirdPartyData, setThirdPartyData] = useState(false);
    const [analytics, setAnalytics] = useState(false);

    const handleSettingChange = (setting, setter, value) => {
        setter(value);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full px-4 overflow-y-scroll no-scrollbar">
            <div className="text-center w-full mt-4">
                <h1 className="text-4xl font-bold tracking-tight mb-4 animate-fade-down">Settings</h1>
                <p className="text-neutral-500">Manage your account settings</p>
            </div>

            <Tabs className="mt-4 w-full sm:px-16 px-4" defaultValue="general">
                <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger className="data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground" value="general">General</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground" value="privacy">Privacy</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground" value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="animate-reveal">
                    <Card className="w-full bg-white dark:bg-neutral-900">
                        <CardHeader>
                            <div className = "flex flex-row items-center space-x-2 text-primary-500 dark:text-primary-400">
                                <LuComputer className="text-3xl" />
                                <h1 className="text-2xl font-bold tracking-tight">General Settings</h1>
                            </div>

                            <p className="text-neutral-500">Update your general account settings</p>
                        </CardHeader>
                        
                        <CardContent>
                            {GeneralSettingsInput.map((input, index) => (
                                <div key={index} className="mb-4">
                                    <label className="block text-neutral-500 mb-2">{input.Label}</label>
                                    <input
                                        type="text"
                                        className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:border-primary-500"
                                        placeholder={input.PlaceHolder}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="privacy" className="animate-reveal">
                    <Card className="w-full bg-white dark:bg-neutral-900 min-h-[500px]">
                        <CardHeader>
                            <div className = "flex flex-row items-center space-x-2">
                                <LuMoon className="text-3xl text-primary-500" />
                                <h1 className="text-2xl font-bold tracking-tight">Privacy Settings</h1>
                            </div>

                            <p className="text-neutral-500">Update your privacy settings</p>
                        </CardHeader>
                    
                        <CardContent className="space-y-4">
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <Label htmlFor="privacy" className="font-semibold tracking-tight text-md">
                                        Account Privacy
                                        <p className="tracking-tight text-neutral-500 font-normal" >
                                            Make your account private
                                        </p>
                                    </Label>
                                </div>
                                <Switch    
                                    id = "privacy" 
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
            </Tabs>

        </div>
    );  
}

export default Settings;
