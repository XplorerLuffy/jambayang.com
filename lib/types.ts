export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  process: string;
  result: string;
  tech_tags: string[];
  image_url: string | null;
  live_url: string | null;
  display_order: number;
};

export type Skill = {
  id: string;
  category: string;
  name: string;
  display_order: number;
};

export type ProofPoint = {
  id: string;
  text: string;
  display_order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role_company: string;
  quote: string;
  is_published: boolean;
  display_order: number;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type HeroSetting = {
  tagline: string;
  photo_url: string | null;
};
