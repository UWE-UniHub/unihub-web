import { create } from 'zustand';
import {Profile} from "../types/domain.ts";

type OwnProfileStore = {
    profile: Profile | null;
    setProfile: (p: Profile | null) => void
};

export const useOwnProfile = create<OwnProfileStore>((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile })
}));