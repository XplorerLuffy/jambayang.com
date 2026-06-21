import { getSupabaseClient } from "./supabase";
import {
  Project,
  Skill,
  ProofPoint,
  Testimonial,
  HeroSetting,
} from "./types";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await getSupabaseClient()
    .from("projects")
    .select("*")
    .order("display_order");
  if (error) throw error;
  return data as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await getSupabaseClient()
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as Project | null;
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await getSupabaseClient()
    .from("skills")
    .select("*")
    .order("display_order");
  if (error) throw error;
  return data as Skill[];
}

export async function getProofPoints(): Promise<ProofPoint[]> {
  const { data, error } = await getSupabaseClient()
    .from("proof_points")
    .select("*")
    .order("display_order");
  if (error) throw error;
  return data as ProofPoint[];
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await getSupabaseClient()
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("display_order");
  if (error) throw error;
  return data as Testimonial[];
}

export async function getSetting<T>(key: string): Promise<T | null> {
  const { data, error } = await getSupabaseClient()
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return (data?.value as T) ?? null;
}

export async function getHeroSetting(): Promise<HeroSetting | null> {
  return getSetting<HeroSetting>("hero");
}

export async function getWorkedWithBadges(): Promise<string[]> {
  const value = await getSetting<string[]>("worked_with_badges");
  return value ?? [];
}

export async function submitContactMessage(input: {
  name: string;
  email: string;
  message: string;
}) {
  const { error } = await getSupabaseClient()
    .from("contact_submissions")
    .insert([{ name: input.name, email: input.email, message: input.message }]);
  if (error) throw error;
}
