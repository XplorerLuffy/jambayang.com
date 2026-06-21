import { getSupabaseBrowserClient } from "./supabase-browser";
import { Project, Skill, ProofPoint, Testimonial, ContactSubmission } from "./types";

const sb = () => getSupabaseBrowserClient();

export async function upsertProject(input: Partial<Project>) {
  const { error } = await sb().from("projects").upsert(input);
  if (error) throw error;
}

export async function deleteProject(id: string) {
  const { error } = await sb().from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertSkill(input: Partial<Skill>) {
  const { error } = await sb().from("skills").upsert(input);
  if (error) throw error;
}

export async function deleteSkill(id: string) {
  const { error } = await sb().from("skills").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertProofPoint(input: Partial<ProofPoint>) {
  const { error } = await sb().from("proof_points").upsert(input);
  if (error) throw error;
}

export async function deleteProofPoint(id: string) {
  const { error } = await sb().from("proof_points").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertTestimonial(input: Partial<Testimonial>) {
  const { error } = await sb().from("testimonials").upsert(input);
  if (error) throw error;
}

export async function deleteTestimonial(id: string) {
  const { error } = await sb().from("testimonials").delete().eq("id", id);
  if (error) throw error;
}

export async function markContactRead(id: string, isRead: boolean) {
  const { error } = await sb()
    .from("contact_submissions")
    .update({ is_read: isRead } satisfies Partial<ContactSubmission>)
    .eq("id", id);
  if (error) throw error;
}

export async function upsertSetting(key: string, value: unknown) {
  const { error } = await sb().from("site_settings").upsert({ key, value });
  if (error) throw error;
}
