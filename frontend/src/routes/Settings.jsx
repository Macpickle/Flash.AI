import { LuMoon, LuSun, LuComputer } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

const PrivacySettingsDropdown = [
    {
        Label: 'Private Account',
        Value: '',
        PlaceHolder: 'Select Privacy',
        Options: ['Public', 'Private'],
    },
    {
        Label: 'Two Factor Authentication',
        Value: '',
        PlaceHolder: 'Select Privacy',
        Options: ['Enabled', 'Disabled'],
    },
    {
        Label: 'Data Collection',
        Value: '',
        PlaceHolder: 'Select Privacy',
        Options: ['Enabled', 'Disabled'],
    },
    {
        Label: 'Data Sharing',
        Value: '',
        PlaceHolder: 'Select Privacy',
        Options: ['Enabled', 'Disabled'],
    },
];

// sample user for now
const user = {
    username: "the Goat",
    image: "https://blackwonder.tf/attachments/1673671146282-png.31249/",
};

function Settings() {
    return (
        <div className="flex w-screen h-screen overflow-x-hidden flex-col p-4">
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-neutral-500">Manage your account settings</p>
            <Button className="mt-4 w-48">Save Changes</Button>
            <hr className="mt-2" />

            <div className="m-4 flex items-center space-x-4">
                <img src={user.image} alt={user.username} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex flex-col items-start">
                    <h2 className="text-xl font-semibold">{user.username}</h2>
                    <p className="text-sm text-neutral-600">no subscription</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold">Account Settings</h2>
                    <p className="text-neutral-500">Update your account details</p>

                    <div className="mt-4">
                        <div className="flex flex-col space-y-1 mb-2">
                            <label className="text-sm text-neutral-600">Theme</label>
                            <Select className="w-full">
                                <SelectTrigger className="max-w-64">
                                    <SelectValue placeholder="Select Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">
                                        <div className="flex items-center">
                                            <LuSun className="mr-2" />
                                            Light
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="dark">
                                        <div className="flex items-center">
                                            <LuMoon className="mr-2" />
                                            Dark
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="system">
                                        <div className="flex items-center">
                                            <LuComputer className="mr-2" />
                                            System
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {GeneralSettingsInput.map(({ Label, Value }) => (
                            <div key={Label} className="flex flex-col space-y-1 mb-2">
                                <label htmlFor={Label} className="text-sm text-neutral-600">{Label}</label>
                                <input
                                    type={Label === 'Password' || Label === 'Confirm Password' ? 'password' : 'text'}
                                    id={Label}
                                    name={Label}
                                    placeholder={Label}
                                    className="px-4 py-2 max-w-96 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary dark:bg-neutral-800 dark:border-neutral-700"
                                    defaultValue={Value}
                                    onChange={() => {}}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-semibold">Privacy Settings</h2>
                    <p className="text-neutral-500">Update your privacy settings</p>

                        {PrivacySettingsDropdown.map(({ Label, Value, Options }) => (
                            <div key={Label} className="flex flex-col space-y-1 mb-2">
                                <label htmlFor={Label} className="text-sm text-neutral-600">{Label}</label>
                                <Select className="w-full">
                                    <SelectTrigger className="max-w-64">
                                        <SelectValue placeholder={Label} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Options.map(option => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}
                    </div>
                </div>                     
            </div>
    );  
}

export default Settings;
