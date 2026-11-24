"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const handleGoogleLogin = () => {
    // Redireciona para a página de envio do histórico escolar
    router.push("/primeiro-acesso");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-red-800 text-white flex items-center justify-center font-bold text-lg">
            UFJF
          </div>
          <CardTitle className="text-2xl font-bold">Monitorias UFJF</CardTitle>
          <CardDescription>
            Plataforma de comunicação e materiais de apoio das monitorias
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-11 text-base font-medium gap-3 cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            Continuar com Google Institucional
          </Button>
        </CardContent>

        <CardFooter className="justify-center border-t">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Exclusivo para contas @estudante.ufjf.br e @ufjf.br
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
