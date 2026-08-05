import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import {
    getProfile,
    updateProfile,
    uploadPhoto,
    uploadResume,
} from "../../services/profileService";

function Profile() {
    const { updateUser } = useAuth();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        memberSince: "",
        profilePhoto: "",
        targetCompany: "",
        targetRole: "",
        github: "",
        linkedin: "",
        dailyGoal: "",
        weeklyGoal: "",
        resume: "",
    });

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {

            const res = await getProfile();

            setProfile({
                name: res.profile.name,
                email: res.profile.email,
                memberSince: new Date(
                    res.profile.memberSince
                ).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                }),

                profilePhoto: res.profile.profilePhoto?.url,
                targetCompany: res.profile.targetCompany,
                targetRole: res.profile.targetRole,
                github: res.profile.github,
                linkedin: res.profile.linkedin,
                dailyGoal: res.profile.dailyGoal,
                weeklyGoal: res.profile.weeklyGoal,
                resume: res.profile.resume?.url,
            });

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSave = async () => {

        setSaving(true);

        try {

            await updateProfile({
                targetCompany: profile.targetCompany,
                targetRole: profile.targetRole,
                github: profile.github,
                linkedin: profile.linkedin,
                dailyGoal: profile.dailyGoal,
                weeklyGoal: profile.weeklyGoal,
            });

            updateUser({
                targetCompany: profile.targetCompany,
                targetRole: profile.targetRole,
                github: profile.github,
                linkedin: profile.linkedin,
                dailyGoal: profile.dailyGoal,
                weeklyGoal: profile.weeklyGoal,
            });

            toast.success("Profile Updated Successfully!");

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message || "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }

    };


    const handlePhotoUpload = async () => {

        if (!selectedPhoto) return;

        try {

            const formData = new FormData();

            formData.append("photo", selectedPhoto);

            const res = await uploadPhoto(formData);

            setProfile((prev) => ({
                ...prev,
                profilePhoto: res.profilePhoto.url,
            }));

            toast.success("Photo Updated Successfully!");

        } catch (err) {

            console.log(err);

            toast.error("Photo Upload Failed");

        }

    };


    const handleResumeUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("resume", file);

        try {

            const res = await uploadResume(formData);

            setProfile((prev) => ({
                ...prev,
                resume: res.resume.url,
            }));

            toast.success("Resume Uploaded Successfully!");

        } catch (err) {

            console.log(err);

            toast.error("Resume Upload Failed!");

        }

    };




    return (

        <div className="space-y-8">

            {/* Hero */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">

                <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">

                    {/* Avatar */}

                    <div className="relative flex flex-col items-center">

                        <div className="absolute h-36 w-36 rounded-full bg-blue-500/20 blur-3xl"></div>

                        <img
                            src={
                                profile.profilePhoto ||
                                "https://ui-avatars.com/api/?name=User"
                            }
                            alt="Profile"
                            className="relative h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
                        />

                        <button
                            onClick={() => document.getElementById("photoUpload").click()}
                            className="mt-5 rounded-xl bg-blue-600 px-5 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
                        >
                            Update Photo
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            id="photoUpload"
                            hidden
                            onChange={async (e) => {

                                const file = e.target.files[0];

                                if (!file) return;

                                const formData = new FormData();
                                formData.append("photo", file);

                                try {

                                    const res = await uploadPhoto(formData);

                                    setProfile((prev) => ({
                                        ...prev,
                                        profilePhoto: res.profilePhoto.url,
                                    }));

                                    toast.success("Photo Updated Successfully!");

                                } catch (err) {

                                    const message =
                                        err.response?.data?.message ||
                                        "Failed to upload profile photo.";

                                    toast.error(message);

                                }

                            }}
                        />

                    </div>


                    {/* User Info */}

                    <div className="flex-1">

                        <h1 className="text-4xl font-bold text-white">

                            {profile.name || "Your Name"}

                        </h1>

                        <p className="mt-2 text-base text-slate-400">

                            {profile.email || "your@email.com"}

                        </p>
                        <p className="mt-6 text-slate-500">

                            🗓 Member Since • {profile.memberSince}

                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">

                            <span className="rounded-full bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-300">
                                🎯 {profile.targetCompany || "No Target Company"}
                            </span>

                            <span className="rounded-full bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-300">
                                💼 {profile.targetRole || "No Target Role"}
                            </span>

                        </div>

                    </div>

                </div>


            </div>

            {/* Career Preferences */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">

                <h2 className="mb-8 text-3xl font-bold text-white">

                    Career Preferences

                </h2>

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Target Company */}

                    <div>

                        <label className="mb-2 block text-slate-400">

                            Target Company

                        </label>

                        <input
                            type="text"
                            name="targetCompany"
                            value={profile.targetCompany}
                            onChange={handleChange}
                            placeholder="Google"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Target Role */}

                    <div>

                        <label className="mb-2 block text-slate-400">

                            Target Role

                        </label>

                        <input
                            type="text"
                            name="targetRole"
                            value={profile.targetRole}
                            onChange={handleChange}
                            placeholder="Software Engineer"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Github */}

                    <div>

                        <label className="mb-2 block text-slate-400">

                            GitHub

                        </label>

                        <input
                            type="text"
                            name="github"
                            value={profile.github}
                            onChange={handleChange}
                            placeholder="https://github.com/username"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* LinkedIn */}

                    <div>

                        <label className="mb-2 block text-slate-400">

                            LinkedIn

                        </label>

                        <input
                            type="text"
                            name="linkedin"
                            value={profile.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>

                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >
                    {saving ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </button>

            </div>


            {/* Study Preferences */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">

                <h2 className="mb-8 text-3xl font-bold text-white">

                    Study Preferences

                </h2>

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Daily Goal */}

                    <div>

                        <label className="mb-2 block text-slate-400">

                            Daily Goal

                        </label>

                        <input
                            type="number"
                            name="dailyGoal"
                            value={profile.dailyGoal}
                            onChange={handleChange}
                            placeholder="3"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Weekly Goal */}

                    <div>

                        <label className="mb-2 block text-slate-400">

                            Weekly Goal

                        </label>

                        <input
                            type="number"
                            name="weeklyGoal"
                            value={profile.weeklyGoal}
                            onChange={handleChange}
                            placeholder="15"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>

                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        "Update Goals"
                    )}
                </button>

            </div>

            {/* Resume */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30">

                <h2 className="mb-6 text-3xl font-bold text-white">

                    Resume

                </h2>

                <p className="mb-6 text-slate-400">

                    Upload your latest resume. AI Mentor will use it for personalized interview guidance.

                </p>

                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="block w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
                />

                {profile.resume && (
                    <a
                        href={profile.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-green-700"
                    >
                        View Uploaded Resume →
                    </a>
                )}

            </div>

        </div >

    );
}

export default Profile;