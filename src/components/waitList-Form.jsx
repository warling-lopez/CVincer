import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/supabase/supabase";

export function DialogDemo(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("username");

    if (email && email.includes("@")) {
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            emailRedirectTo: "https://cvincer.vercel.app/waitlist",
          },
        });

        if (error) {
          console.error("Error sending magic link:", error.message);
          alert("Error sending magic link. Please try again.");
        } else {
          alert("Magic link sent! Please check your email.");
          // Opcional: cerrar el dialog después del éxito
          // document.querySelector('[data-dialog-close]')?.click();
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={props.variant} size={props.size}>
          {props.text}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.desc}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">{props.labelName}</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">{props.labelMail}</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div> <br />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{props.labelCancel}</Button>
            </DialogClose>
            <Button type="submit" onSubmit={handleSubmit}>
              {props.labelSave}
            </Button>            
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
