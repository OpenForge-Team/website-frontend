import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
export default function GithubPill() {
  return (
    <Badge
      variant="default"
      onClick={() =>
        window.open(
          "https://github.com/OpenForge-Team/website-frontend",
          "_blank"
        )
      }
    >
      <Github />
    </Badge>
  );
}
