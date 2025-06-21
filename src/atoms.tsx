import { atom } from "jotai";

export const rpmAtom = atom(1200);
export const speedCruiseAtom = atom<number | undefined>(undefined);
export const speedCruiseEnableAtom = atom(true);
export const speedCruiseActiveAtom = atom(true);
export const speedAtom = atom(40);
export const speedLimitAtom = atom(70);

export const speedSettingsAtom = atom({
  MajorTickRate: 10,
  MinorTickRate: 5,
  VeryMinorTickRate: 1,
  MaxDialSpeed: 120,
  MaxDialAngle: 270,
  scaleTickLabels: true,
});

export const rpmSettingsAtom = atom({
  MajorTickRate: 1000,
  MinorTickRate: 100,
  MaxDialRPM: 8000,
  MaxDialAngle: 270,
  RedlineRPM: 6500,
  showGear: true,
});

export const fuelAtom = atom(40);

export const gearAtom = atom<number | "P" | "R" | "N" | "D">(1);
