import HomeClient from "@/components/home/HomeClient";
import {
  getHeroSetting,
  getWorkedWithBadges,
  getProjects,
  getSkills,
  getProofPoints,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [hero, badges, projects, skills, proofPoints] = await Promise.all([
    getHeroSetting(),
    getWorkedWithBadges(),
    getProjects(),
    getSkills(),
    getProofPoints(),
  ]);

  return (
    <HomeClient
      hero={hero}
      badges={badges}
      projects={projects}
      skills={skills}
      proofPoints={proofPoints}
    />
  );
}
