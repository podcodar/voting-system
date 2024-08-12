"use client";
import { addElection } from "@packages/DAO/elections.dao";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@packages/shadcn-ui/ui/dialog";
import Button from "../Button";
import CreateElection from "./CreateElection";

export default function ModalCreateElection() {
  const formAction = async (formData: FormData) => {
    await addElection(formData);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Criar Eleição</Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-50">
        <DialogHeader>
          <DialogTitle>Crie uma eleição</DialogTitle>

          <DialogDescription>
            <CreateElection onAction={formAction} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
