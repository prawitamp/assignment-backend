export async function GET() {
  const profile = {
    name: "Prawita Mepilianti",
    role: "peserta bootcamp",
    favoriteTech: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
    bio: "Peserta Bootcamp AI Fullstack Web Development Perempuan Inovasi x IBM SkillsBuild x Markoding",
    email: "prawita@gmail.com",
    location: "Serang, Banten"
  };

  return Response.json(profile);
}
