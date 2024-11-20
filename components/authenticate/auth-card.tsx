import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import Logo from "../navigation/logo";
import { BackButton } from "./back-button";

type AuthCardProps = {
  children: React.ReactNode;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
};

const AuthCard = ({
  children,
  title,
  backButtonHref,
  backButtonLabel,
}: AuthCardProps) => {
  return (
    <Card className="w-full md:w-[500px] justify-center items-center">
      <CardHeader className="items-center gap-5">
        <Logo />
      <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton  href={backButtonHref} label={backButtonLabel}/>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;